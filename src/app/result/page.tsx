"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CALENDLY_URL = "https://calendly.com/chasepinedawow/30min";

function ResultContent() {
  const params = useSearchParams();
  const outcome = params.get("outcome");

  if (outcome === "qualified") {
    return (
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-amber-200/20 bg-white/5 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10">
          <span className="text-2xl">☀️</span>
        </div>
        <p className="text-xs uppercase tracking-[0.32em] text-amber-200/70">You look like a strong fit</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          You're cleared to book an interview.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-stone-300">
          We move fast with serious candidates. Grab a time slot that works for you — same-day may be available.
          Show up on time and be ready.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-200 px-8 py-4 text-sm font-semibold text-stone-950 transition hover:bg-amber-100"
        >
          Book Your Interview Now
        </a>
        <p className="mt-5 text-xs text-stone-500">
          Only book if you are serious and can commit. We respect your time and expect the same.
        </p>
      </div>
    );
  }

  if (outcome === "review") {
    return (
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-stone-400">Application received</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          We're reviewing your application.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-stone-300">
          Thanks for applying. We're looking through your application now. If we decide to move forward, we'll be in touch shortly.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-stone-400">Application received</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        Thanks for applying.
      </h1>
      <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-stone-300">
        At this time we are moving forward with candidates who are a closer fit for the current opportunity. We appreciate your interest.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Back to Home
      </a>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="flex min-h-screen items-center bg-[#0b0b0d] px-6 py-16 lg:px-10">
      <Suspense fallback={<div className="text-stone-400">Loading...</div>}>
        <ResultContent />
      </Suspense>
    </main>
  );
}
