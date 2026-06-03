import Stripe from "stripe";

/**
 * Server-only Stripe client. The secret key must never reach the browser.
 */
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
