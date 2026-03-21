import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-expect-error Stripe version type may lag behind latest API
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});
