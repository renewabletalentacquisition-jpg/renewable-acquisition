"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const CALENDLY_URL = "https://calendly.com/chasepinedawow/30min";

function RealisticSun() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const safeCtx = ctx;

    const W = canvas.width = 500;
    const H = canvas.height = 500;
    const cx = W / 2;
    const cy = H / 2;
    let frame = 0;
    let rafId: number;

    function draw() {
      safeCtx.clearRect(0, 0, W, H);

      // Outer atmosphere glow
      const atm = safeCtx.createRadialGradient(cx, cy, 60, cx, cy, 240);
      atm.addColorStop(0, "rgba(255, 200, 80, 0.18)");
      atm.addColorStop(0.4, "rgba(255, 140, 20, 0.09)");
      atm.addColorStop(0.75, "rgba(255, 90, 0, 0.04)");
      atm.addColorStop(1, "rgba(255, 60, 0, 0)");
      safeCtx.fillStyle = atm;
      safeCtx.fillRect(0, 0, W, H);

      const rayCount = 16;
      safeCtx.save();
      safeCtx.translate(cx, cy);
      safeCtx.rotate(frame * 0.003);
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const len = 95 + Math.sin(frame * 0.04 + i * 0.7) * 14;
        const width = 3.5 + Math.sin(frame * 0.03 + i) * 1.2;
        const opacity = 0.22 + Math.sin(frame * 0.05 + i * 0.5) * 0.08;
        safeCtx.save();
        safeCtx.rotate(angle);
        const rayGrad = safeCtx.createLinearGradient(0, 58, 0, 58 + len);
        rayGrad.addColorStop(0, `rgba(255, 215, 100, ${opacity})`);
        rayGrad.addColorStop(1, "rgba(255, 150, 30, 0)");
        safeCtx.fillStyle = rayGrad;
        safeCtx.beginPath();
        safeCtx.moveTo(-width / 2, 58);
        safeCtx.lineTo(0, 58 + len);
        safeCtx.lineTo(width / 2, 58);
        safeCtx.closePath();
        safeCtx.fill();
        safeCtx.restore();
      }
      safeCtx.restore();

      const corona = safeCtx.createRadialGradient(cx, cy, 44, cx, cy, 90);
      corona.addColorStop(0, "rgba(255, 200, 60, 0.55)");
      corona.addColorStop(0.5, "rgba(255, 160, 20, 0.15)");
      corona.addColorStop(1, "rgba(255, 100, 0, 0)");
      safeCtx.fillStyle = corona;
      safeCtx.beginPath();
      safeCtx.arc(cx, cy, 90, 0, Math.PI * 2);
      safeCtx.fill();

      const disk = safeCtx.createRadialGradient(cx - 10, cy - 14, 2, cx, cy, 55);
      disk.addColorStop(0, "#fff7e0");
      disk.addColorStop(0.12, "#ffe680");
      disk.addColorStop(0.28, "#ffcc33");
      disk.addColorStop(0.52, "#ff9a00");
      disk.addColorStop(0.72, "#e06000");
      disk.addColorStop(0.88, "#b84000");
      disk.addColorStop(1, "#8b2500");
      safeCtx.beginPath();
      safeCtx.arc(cx, cy, 55, 0, Math.PI * 2);
      safeCtx.fillStyle = disk;
      safeCtx.fill();

      for (let i = 0; i < 7; i++) {
        const px = cx + Math.cos(frame * 0.012 + i * 1.1) * 20;
        const py = cy + Math.sin(frame * 0.015 + i * 0.9) * 16;
        const g = safeCtx.createRadialGradient(px, py, 0, px, py, 14 + i * 2);
        g.addColorStop(0, "rgba(255, 220, 80, 0.18)");
        g.addColorStop(1, "rgba(255, 180, 20, 0)");
        safeCtx.fillStyle = g;
        safeCtx.beginPath();
        safeCtx.arc(px, py, 14 + i * 2, 0, Math.PI * 2);
        safeCtx.fill();
      }

      const spec = safeCtx.createRadialGradient(cx - 16, cy - 18, 0, cx - 16, cy - 18, 26);
      spec.addColorStop(0, "rgba(255, 255, 230, 0.65)");
      spec.addColorStop(0.4, "rgba(255, 255, 200, 0.18)");
      spec.addColorStop(1, "rgba(255, 255, 200, 0)");
      safeCtx.fillStyle = spec;
      safeCtx.beginPath();
      safeCtx.arc(cx - 16, cy - 18, 26, 0, Math.PI * 2);
      safeCtx.fill();

      const limb = safeCtx.createRadialGradient(cx, cy, 38, cx, cy, 56);
      limb.addColorStop(0, "rgba(0,0,0,0)");
      limb.addColorStop(1, "rgba(80, 20, 0, 0.32)");
      safeCtx.fillStyle = limb;
      safeCtx.beginPath();
      safeCtx.arc(cx, cy, 56, 0, Math.PI * 2);
      safeCtx.fill();

      frame++;
      rafId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 340, height: 340, display: "block", margin: "0 auto" }}
    />
  );
}

function QualifiedResult() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 32px",
      background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(201,169,110,0.11), transparent), var(--bg)",
      flexDirection: "column",
      textAlign: "center",
    }}>

      {/* Sun */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <RealisticSun />

        {/* Pulsing ring */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.20)",
            animation: "pulse-ring 2.8s ease-out infinite",
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse-ring {
          0%   { transform: scale(0.88); opacity: 0.7; }
          70%  { transform: scale(1.18); opacity: 0; }
          100% { transform: scale(1.18); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        border: "1px solid rgba(201,169,110,0.25)",
        background: "rgba(201,169,110,0.08)",
        borderRadius: 9999,
        padding: "7px 18px",
        marginBottom: 28,
        animation: "fadeUp 0.5s ease-out 0.1s both",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a96e", boxShadow: "0 0 8px #c9a96e", display: "inline-block" }} />
        <span style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#e8cfa0", fontWeight: 600 }}>
          Strong Fit · You&apos;re Cleared
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(44px, 7vw, 88px)",
        fontWeight: 600,
        letterSpacing: "-0.03em",
        lineHeight: 1.0,
        color: "#f4f3f0",
        margin: "0 0 24px",
        animation: "fadeUp 0.55s ease-out 0.2s both",
      }}>
        You&apos;re in.<br />
        <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Book your interview.</em>
      </h1>

      {/* Sub */}
      <p style={{
        fontSize: 17,
        color: "#9e9893",
        lineHeight: 1.72,
        maxWidth: 520,
        margin: "0 auto 52px",
        animation: "fadeUp 0.55s ease-out 0.3s both",
      }}>
        We move fast with serious candidates. Grab a time slot now —
        same-day may be available. Show up on time. Be ready.
      </p>

      {/* CTA */}
      <div style={{ animation: "fadeUp 0.55s ease-out 0.4s both" }}>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          style={{ fontSize: 16, padding: "18px 48px", boxShadow: "0 0 40px rgba(201,169,110,0.2)" }}
        >
          Book Interview Now →
        </a>
      </div>

      <p style={{
        marginTop: 24,
        fontSize: 12.5,
        color: "#5c5751",
        animation: "fadeUp 0.5s ease-out 0.5s both",
      }}>
        Only book if you are serious and can commit. We respect your time and expect the same.
      </p>

    </div>
  );
}

function ReviewResult() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 32px",
      background: "var(--bg)",
      flexDirection: "column",
      textAlign: "center",
    }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)", fontWeight: 500, marginBottom: 20, animation: "fadeUp 0.5s ease-out both" }}>
        Application received
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)", margin: "0 0 24px", lineHeight: 1.05, animation: "fadeUp 0.5s ease-out 0.1s both" }}>
        We&apos;re reviewing<br />your application.
      </h1>
      <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.72, maxWidth: 460, marginBottom: 52, animation: "fadeUp 0.5s ease-out 0.2s both" }}>
        Thanks for applying. We&apos;ll follow up shortly if we decide to move to the next step.
      </p>
      <a href="/" className="btn-ghost" style={{ animation: "fadeUp 0.5s ease-out 0.3s both" }}>← Back to Home</a>
    </div>
  );
}

function DQResult() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 32px",
      background: "var(--bg)",
      flexDirection: "column",
      textAlign: "center",
    }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--fg-muted)", fontWeight: 500, marginBottom: 20, animation: "fadeUp 0.5s ease-out both" }}>
        Application received
      </p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)", margin: "0 0 24px", lineHeight: 1.05, animation: "fadeUp 0.5s ease-out 0.1s both" }}>
        Thanks for applying.
      </h1>
      <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.72, maxWidth: 460, marginBottom: 52, animation: "fadeUp 0.5s ease-out 0.2s both" }}>
        At this time we&apos;re moving forward with candidates who are a closer fit for the current opportunity. We appreciate your time.
      </p>
      <a href="/" className="btn-ghost" style={{ animation: "fadeUp 0.5s ease-out 0.3s both" }}>← Back to Home</a>
    </div>
  );
}

function ResultContent() {
  const params = useSearchParams();
  const outcome = params.get("outcome");

  if (outcome === "qualified") return <QualifiedResult />;
  if (outcome === "review") return <ReviewResult />;
  return <DQResult />;
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", color: "var(--fg-muted)" }}>
        Loading…
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
