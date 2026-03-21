import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tighter mb-8">
        Checkout Cancelled
      </h1>
      <p className="max-w-md text-lg text-white/50 mb-12">
        Something didn't go as planned. Your cart is still waiting for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/cart"
          className="inline-flex h-14 items-center justify-center bg-white px-10 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-accent hover:text-white"
        >
          Return to Cart
        </Link>
        <Link
          href="/shop"
          className="inline-flex h-14 items-center justify-center border border-white px-10 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
        >
          Back to Shop
        </Link>
      </div>
    </div>
  );
}
