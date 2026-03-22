import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export const getStripe = () => {
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
      // @ts-expect-error Stripe version type may lag behind latest API
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return stripeClient;
};
