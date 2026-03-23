import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Animated Success Icon Container */}
        <div className="relative mb-12">
          <div className="absolute -inset-4 rounded-full bg-accent/10 animate-pulse" />
          <div className="relative h-24 w-24 bg-accent/20 text-accent rounded-full flex items-center justify-center border border-accent/30">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-in zoom-in duration-500"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        </div>

        {/* Messaging */}
        <h1 className="font-display text-5xl font-bold uppercase tracking-tighter sm:text-7xl mb-6 bg-gradient-to-r from-white via-white/80 to-accent bg-clip-text text-transparent italic">
          Welcome to the Team.
        </h1>
        
        <div className="max-w-xl space-y-6 mb-16">
          <p className="text-xl text-white font-medium tracking-tight">
            Order confirmed. You're officially part of the Final Touch roster.
          </p>
          <p className="text-white/50 text-base leading-relaxed">
            We've sent a confirmation email to your inbox. As soon as our lab finishes preparing your performance decals, we'll send another update with your tracking details.
          </p>
        </div>

        {/* Primary Action */}
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/shop"
            className="group relative inline-flex h-16 items-center justify-center bg-white px-12 text-[10px] font-black uppercase tracking-[0.3em] text-black transition-all hover:bg-accent hover:text-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-accent/40"
          >
            <span className="relative z-10 font-bold">Back to Shop</span>
          </Link>
          
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">
            #StepIntoTheLab
          </p>
        </div>
      </div>
    </div>
  );
}
