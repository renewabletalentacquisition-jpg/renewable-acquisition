"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const CALENDLY_URL = "https://calendly.com/chasepinedawow/30min";

function ResultContent() {
  const params = useSearchParams();
  const outcome = params.get("outcome");

  if (outcome === "qualified") {
    return (
      <div style={{ maxWidth: 580, width: "100%", textAlign: "center" }}>
        <div style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "1px solid rgba(201,169,110,0.3)",
          background: "rgba(201,169,110,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          margin: "0 auto 32px",
          boxShadow: "0 0 40px rgba(201,169,110,0.12)",
        }}>
          ☀️
        </div>

        <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>
          Strong fit
        </p>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)", margin: "0 0 20px", lineHeight: 1.05 }}>
          You&apos;re cleared to book<br />
          <em style={{ color: "var(--accent)", fontStyle: "italic" }}>your interview.</em>
        </h1>

        <p style={{ fontSize: 15.5, color: "var(--fg-muted)", lineHeight: 1.72, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
          We move fast with serious candidates. Grab a time slot now — same-day may be available. Show up on time and ready.
        </p>

        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
           className="btn-gold" style={{ fontSize: 15, padding: "16px 40px" }}>
          Book Interview Now →
        </a>

        <p style={{ marginTop: 24, fontSize: 12.5, color: "var(--fg-dim)" }}>
          Only book if you are serious and can commit. We respect your time.
        </p>
      </div>
    );
  }

  if (outcome === "review") {
    return (
      <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)", fontWeight: 500, marginBottom: 16 }}>
          Application received
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)", margin: "0 0 20px", lineHeight: 1.05 }}>
          We&apos;re reviewing<br />your application.
        </h1>
        <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.72, marginBottom: 48 }}>
          Thanks for applying. We&apos;ll follow up shortly if we decide to move to the next step.
        </p>
        <a href="/" className="btn-ghost">← Back to Home</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 540, width: "100%", textAlign: "center" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)", fontWeight: 500, marginBottom: 16 }}>
        Application received
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)", margin: "0 0 20px", lineHeight: 1.05 }}>
        Thanks for applying.
      </h1>
      <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.72, marginBottom: 48 }}>
        At this time we&apos;re moving forward with candidates who are a closer fit for the current opportunity.
        We appreciate your time.
      </p>
      <a href="/" className="btn-ghost">← Back to Home</a>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 32px",
      background: `
        radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.07), transparent),
        var(--bg)
      `,
    }}>
      <Suspense fallback={<div style={{ color: "var(--fg-muted)" }}>Loading…</div>}>
        <ResultContent />
      </Suspense>
    </main>
  );
}
