import { getStripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

interface CheckoutItem {
  stripePriceId: string;
  quantity: number;
  name: string;
  size: string;
  variation: Record<string, string | undefined>;
}

export async function POST(req: Request) {
  try {
    const { items }: { items: CheckoutItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    // Build a human-readable summary of all items + variations for Stripe metadata
    const orderSummary = items.map((item) => {
      const varParts: string[] = [];
      if (item.variation.country) varParts.push(item.variation.country);
      if (item.variation.digit !== undefined) varParts.push(`#${item.variation.digit}`);
      if (item.variation.color) varParts.push(item.variation.color);
      const varLabel = varParts.length > 0 ? ` (${varParts.join(", ")})` : "";
      return `${item.quantity}x ${item.name}${varLabel} [${item.size}]`;
    });

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      metadata: {
        order_items: orderSummary.join(" | "),
        items_detail: JSON.stringify(
          items.map((item) => ({
            name: item.name,
            size: item.size,
            variation: item.variation,
            quantity: item.quantity,
          }))
        ).slice(0, 500), // Stripe metadata value limit is 500 chars
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
