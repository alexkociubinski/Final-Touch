import { getStripe } from "@/lib/stripe";
import { getResend } from "@/lib/resend";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;

    try {
      // Send confirmation email via Resend
      if (customerEmail) {
        const resend = getResend();
        await resend.emails.send({
          from: "Final Touch <orders@finaltouchsports.com>",
          to: customerEmail,
          subject: "Order Confirmation - Final Touch",
          text: `Hi ${customerName},\n\nThank you for your order! We've received it and are preparing your decals for shipment.\n\nEnjoy the game.\n\n- The Final Touch Team`,
        });
      }
    } catch (emailError) {
      console.error("Error sending order confirmation email:", emailError);
    }
  }

  return NextResponse.json({ received: true });
}
