import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stripe webhook handler.
 *
 * Security and correctness:
 *   - The raw request body is verified against the Stripe signature. An
 *     unverified or tampered request is rejected.
 *   - Idempotent: every event id is recorded in processed_stripe_events. A
 *     duplicate delivery is acknowledged but does nothing, so access cannot be
 *     granted twice.
 *   - Writes run through the service-role client (bypasses RLS). This route is
 *     excluded from the auth middleware matcher.
 */
export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing signature or webhook secret" },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json(
      { error: `Webhook verification failed: ${message}` },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  // Idempotency guard: claim the event id first. If it already exists, stop.
  const { error: insertError } = await admin
    .from("processed_stripe_events")
    .insert({ event_id: event.id, type: event.type });

  if (insertError) {
    // Unique violation => already processed. Acknowledge without reprocessing.
    if (insertError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    return NextResponse.json(
      { error: "Failed to record event" },
      { status: 500 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        await handleCheckoutCompleted(
          admin,
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      }
      case "charge.refunded": {
        await handleRefund(admin, event.data.object as Stripe.Charge);
        break;
      }
      default:
        // Unhandled event types are acknowledged so Stripe stops retrying.
        break;
    }
  } catch (err) {
    // Roll back the idempotency claim so Stripe's retry can reprocess.
    await admin
      .from("processed_stripe_events")
      .delete()
      .eq("event_id", event.id);
    const message = err instanceof Error ? err.message : "Handler error";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

type AdminClient = ReturnType<typeof createAdminClient>;

async function handleCheckoutCompleted(
  admin: AdminClient,
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status !== "paid") return;

  const userId = session.metadata?.user_id ?? session.client_reference_id;
  const productId = session.metadata?.product_id ?? "database-book";
  if (!userId) {
    throw new Error("checkout.session.completed missing user_id");
  }

  const customerId =
    typeof session.customer === "string" ? session.customer : null;

  // Audit row (unique on stripe_session_id keeps this idempotent too).
  await admin.from("purchases").upsert(
    {
      user_id: userId,
      product_id: productId,
      amount_total: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      stripe_session_id: session.id,
      stripe_customer_id: customerId,
    },
    { onConflict: "stripe_session_id" },
  );

  // Grant or refresh access.
  await admin.from("access_grants").upsert(
    {
      user_id: userId,
      product_id: productId,
      status: "active",
      start_date: new Date().toISOString(),
      end_date: null,
      stripe_customer_id: customerId,
      stripe_session_id: session.id,
    },
    { onConflict: "user_id,product_id" },
  );
}

async function handleRefund(admin: AdminClient, charge: Stripe.Charge) {
  const customerId =
    typeof charge.customer === "string" ? charge.customer : null;
  if (!customerId) return;

  // Revoke access for the refunded customer.
  await admin
    .from("access_grants")
    .update({ status: "refunded" })
    .eq("stripe_customer_id", customerId);
}
