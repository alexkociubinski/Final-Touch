import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      <div className="h-20 w-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      </div>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-6xl mb-6">
        Step Into the Lab.
      </h1>
      <p className="max-w-md text-lg text-white/50 mb-12">
        Your order is confirmed. You'll receive an email shortly with tracking details. 
        Get your gear ready.
      </p>
      <Link
        href="/shop"
        className="inline-flex h-14 items-center justify-center bg-white px-10 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-accent hover:text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
