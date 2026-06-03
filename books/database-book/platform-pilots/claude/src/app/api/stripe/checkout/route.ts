import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { BOOK_PRODUCT_ID } from "@/lib/book";
import { hasBookAccess } from "@/lib/access";

/**
 * Creates a Stripe Checkout Session for the signed-in user.
 *
 * Security notes:
 *   - Runs server-side only; the secret key and price ID never reach the client.
 *   - Requires an authenticated user; the user id is stored in session metadata
 *     and client_reference_id so the webhook can grant access to the right user.
 *   - Access is NOT granted here. It is granted only after the webhook confirms
 *     payment.
 */
export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Already paid: send them straight to the book.
  if (await hasBookAccess()) {
    return NextResponse.json({ alreadyOwned: true });
  }

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_ID is not configured" },
      { status: 500 },
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cancel`,
    client_reference_id: user.id,
    customer_email: user.email ?? undefined,
    metadata: {
      user_id: user.id,
      product_id: BOOK_PRODUCT_ID,
    },
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }

  return NextResponse.json({ url: session.url });
}
