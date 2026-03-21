"use client";

import { useActionState } from "react";
import { sendAthleteApplication } from "@/app/actions";

const initialState = {
  success: false,
  message: "",
};

export default function AthletesPage() {
  const [state, formAction, isPending] = useActionState(sendAthleteApplication, initialState);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl font-bold uppercase tracking-tighter sm:text-6xl mb-8">
          Join the Roster
        </h1>
        <p className="text-lg text-white/50 mb-16">
          We’re looking for athletes who lead from the front. If you breathe your sport 
          and care about the details, we want you representing Final Touch. 
          Tell us your story.
        </p>

        {state.success ? (
          <div className="bg-zinc-900 border border-accent p-8 rounded-xl text-center fade-in">
             <div className="h-12 w-12 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
             </div>
             <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-2">Application Received</h2>
             <p className="text-white/60">We'll review your profile and get in touch if it's a fit.</p>
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
                  className="w-full border-b-2 border-white/10 bg-transparent py-3 focus:border-accent focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="sport" className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                  Sport
                </label>
                <input
                  type="text"
                  id="sport"
                  name="sport"
                  required
                  placeholder="e.g. Boxing, Baseball"
                  className="w-full border-b-2 border-white/10 bg-transparent py-3 focus:border-accent focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="handle" className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                  Social Handle
                </label>
                <input
                  type="text"
                  id="handle"
                  name="handle"
                  required
                  placeholder="@yourhandle"
                  className="w-full border-b-2 border-white/10 bg-transparent py-3 focus:border-accent focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40">
                Why Final Touch?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
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
              {isPending ? "Submitting..." : "Apply Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
