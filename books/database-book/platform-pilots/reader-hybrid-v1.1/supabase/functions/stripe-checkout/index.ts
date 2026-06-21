/// <reference types="https://deno.land/x/deno/cli/types/dts/index.d.ts" />

import Stripe from "npm:stripe@^17";
import { createClient } from "npm:@supabase/supabase-js@^2";

const STRIPE_SECRET = Deno.env.get("STRIPE_SECRET_KEY");
const STRIPE_PRICE_ID = Deno.env.get("STRIPE_PRICE_ID");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

if (!STRIPE_SECRET) throw new Error("Missing STRIPE_SECRET_KEY");
if (!STRIPE_PRICE_ID) throw new Error("Missing STRIPE_PRICE_ID");

const stripe = new Stripe(STRIPE_SECRET);

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Authenticate user from Supabase auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create Stripe Checkout session with user identity for webhook matching
    const origin =
      req.headers.get("origin") ?? "https://dima-publishing.vercel.app";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email, // So webhook can match by email
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${origin}/book?purchase=success`,
      cancel_url: `${origin}/pricing`,
      metadata: {
        supabase_user_id: user.id,
        source: "reader-checkout",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create checkout session" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
});
