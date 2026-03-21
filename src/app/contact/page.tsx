"use client";

import { useActionState } from "react";
import { sendContactEmail } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
};

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-6xl mb-8">
          Contact Us
        </h1>
        <p className="text-lg text-white/50 mb-16">
          Questions about your order? Custom design requests? Or just want to talk shop? 
          Drop us a line and we'll get back to you within 24 hours.
        </p>

        {state.success ? (
          <div className="bg-zinc-900 border border-accent p-8 rounded-xl text-center fade-in">
             <div className="h-12 w-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">Message Sent</h2>
             <p className="text-white/60">Thank you for reaching out. We've received your inquiry.</p>
             <button 
               onClick={() => window.location.reload()}
               className="mt-8 text-xs font-bold uppercase tracking-widest underline underline-offset-4 hover:text-accent transition-colors"
             >
               Send another message
             </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="w-full border-b-2 border-white/10 bg-transparent py-3 focus:border-accent focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="w-full border-b-2 border-white/10 bg-transparent py-3 focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full border-b-2 border-white/10 bg-transparent py-3 focus:border-accent focus:outline-none transition-colors resize-none"
              />
            </div>

            {state.message && (
              <p className="text-sm font-bold text-red-500 uppercase tracking-widest">{state.message}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-16 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-accent hover:text-white disabled:bg-white/50"
            >
              {isPending ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
