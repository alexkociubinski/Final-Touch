/**
 * Run once to create the two Stripe products/prices:
 *   npx ts-node --project tsconfig.json scripts/setup-stripe.ts
 *
 * Outputs the Price IDs to add to your .env.local
 */
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  // @ts-expect-error version lag
  apiVersion: "2025-02-24.acacia",
});

async function main() {
  console.log("Creating Stripe products...\n");

  // Small Decal — $5
  const smallProduct = await stripe.products.create({
    name: "Final Touch Small Decal",
    description: "Small adhesive decal for cleats and small gear surfaces.",
  });
  const smallPrice = await stripe.prices.create({
    product: smallProduct.id,
    unit_amount: 500,
    currency: "usd",
  });

  // Large Decal — $7
  const largeProduct = await stripe.products.create({
    name: "Final Touch Large Decal",
    description: "Large adhesive decal for bats, sticks, and large gear surfaces.",
  });
  const largePrice = await stripe.prices.create({
    product: largeProduct.id,
    unit_amount: 700,
    currency: "usd",
  });

  console.log("✅ Done! Add these to your .env.local:\n");
  console.log(`STRIPE_PRICE_SMALL=${smallPrice.id}`);
  console.log(`STRIPE_PRICE_LARGE=${largePrice.id}`);
}

main().catch(console.error);
