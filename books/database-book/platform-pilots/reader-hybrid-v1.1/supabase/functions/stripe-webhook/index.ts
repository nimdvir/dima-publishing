/// <reference types="https://deno.land/x/deno/cli/types/dts/index.d.ts" />

import Stripe from "npm:stripe@^17";
import { createClient } from "npm:@supabase/supabase-js@^2";

const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

if (!STRIPE_SECRET) throw new Error("Missing STRIPE_SECRET_KEY");
if (!STRIPE_WEBHOOK_SECRET) throw new Error("Missing STRIPE_WEBHOOK_SECRET");

const stripe = new Stripe(STRIPE_SECRET);
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req: Request) => {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  try {
    const body = await req.text();
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET,
    );

    // ── Idempotency: skip already-processed events ──
    const { data: alreadyProcessed } = await supabase
      .from("processed_stripe_events")
      .select("event_id")
      .eq("event_id", event.id)
      .maybeSingle();

    if (alreadyProcessed) {
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ── Handle checkout.session.completed ──
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Resolve user ID: prefer metadata from checkout, fall back to email
      let userId: string | undefined =
        session.metadata?.supabase_user_id ?? undefined;

      if (!userId) {
        const customerEmail =
          session.customer_email ?? session.customer_details?.email;

        if (customerEmail) {
          const { data: users } = await supabase
            .from("auth.users")
            .select("id")
            .eq("email", customerEmail)
            .limit(1);

          userId = users?.[0]?.id;
        }
      }

      if (userId) {
        // Extract line items to get product info
        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 5 },
        );

        const productId =
          lineItems.data[0]?.price?.product ??
          session.metadata?.product_id ??
          "book-access";

        // Record the purchase (uses existing purchases table schema)
        await supabase.from("purchases").insert({
          user_id: userId,
          product_id: String(productId),
          amount_total: session.amount_total ?? 0,
          currency: session.currency ?? "usd",
          status: "completed",
          stripe_session_id: session.id,
          stripe_customer_id: session.customer as string,
        });

        // Grant access for 1 year from purchase date
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        await supabase.from("access_grants").upsert(
          {
            user_id: userId,
            product_id: String(productId),
            status: "active",
            start_date: new Date().toISOString(),
            end_date: oneYearFromNow.toISOString(),
            stripe_session_id: session.id,
            stripe_customer_id: session.customer as string,
          },
          { onConflict: "user_id, product_id" },
        );
      }
    }

    // Record event as processed for idempotency
    await supabase.from("processed_stripe_events").insert({
      event_id: event.id,
      type: event.type,
    });

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(
      JSON.stringify({ error: "Webhook processing failed" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
});
