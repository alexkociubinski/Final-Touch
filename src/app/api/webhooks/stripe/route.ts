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
    const customerName = session.customer_details?.name || "there";
    const shippingAddress = session.shipping_details?.address;

    // Pull order summary from session metadata
    const orderItems = session.metadata?.order_items || "No item details available";
    const amountTotal = session.amount_total ? `$${(session.amount_total / 100).toFixed(2)}` : "";

    // Format shipping address if available
    const addressLines = shippingAddress
      ? [
          shippingAddress.line1,
          shippingAddress.line2,
          `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}`,
          shippingAddress.country,
        ]
          .filter(Boolean)
          .join("\n")
      : "Not provided";

    try {
      const resend = getResend();

      // ── Customer confirmation email ──────────────────
      if (customerEmail) {
        await resend.emails.send({
          from: "Final Touch <orders@finaltouchsports.com>",
          to: customerEmail,
          subject: "Order Confirmed — Final Touch",
          html: `
            <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
              <h2 style="letter-spacing: -0.5px;">Thanks for your order, ${customerName}.</h2>
              <p>Your decals are confirmed. We'll get them prepared and shipped your way.</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666;">What you ordered</h3>
              <p style="font-size: 15px; font-weight: bold;">${orderItems.replace(/ \| /g, "<br/>")}</p>
              <p style="color: #555; font-size: 14px;">Total: <strong>${amountTotal}</strong></p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
              <p style="font-size: 13px; color: #999;">Questions? Reply to this email.</p>
              <p style="font-size: 13px; color: #999;">— The Final Touch Team</p>
            </div>
          `,
        });
      }

      // ── Internal notification to business owner ──────
      await resend.emails.send({
        from: "Final Touch <orders@finaltouchsports.com>",
        to: "orders@finaltouchsports.com",
        subject: `New Order${amountTotal ? ` — ${amountTotal}` : ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #111;">
            <h2>New Order Received</h2>
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Customer</h3>
            <p>${customerName} &lt;${customerEmail || "No email"}&gt;</p>
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Items Ordered</h3>
            <p style="font-weight: bold;">${orderItems.replace(/ \| /g, "<br/>")}</p>
            <p>Total: <strong>${amountTotal}</strong></p>
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #666;">Ship To</h3>
            <pre style="font-size: 13px;">${addressLines}</pre>
          </div>
        `,
      });

    } catch (emailError) {
      console.error("Error sending order confirmation email:", emailError);
    }
  }

  return NextResponse.json({ received: true });
}
