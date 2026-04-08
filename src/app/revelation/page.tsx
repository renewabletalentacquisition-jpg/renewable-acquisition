"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "$10k–$20k+", label: "Top closer monthly" },
  { value: "$5k–$15k+", label: "Top setter monthly" },
  { value: "Sunrun", label: "#1 residential solar company" },
];

const truths = [
  "This is commission-only. There is no salary.",
  "This is door-to-door. In person, every day.",
  "Travel and relocation are required for the summer.",
  "We filter hard. Not everyone makes it through.",
  "The people who are built for this make real money.",
];

const values = [
  {
    title: "Standard",
    body: "We hold a high bar. Every rep is expected to show up, work the system, and perform. No passengers.",
  },
  {
    title: "Brotherhood",
    body: "This team operates as a unit. You work with people who push you, compete with you, and have your back.",
  },
  {
    title: "Growth",
    body: "The path from setter to closer to leader exists here. People have done it. It is available to you.",
  },
  {
    title: "Proof",
    body: "We work with Sunrun — the largest residential solar company in the US. The product sells itself to the right homes.",
  },
];

const opportunity = [
  {
    role: "Setter",
    earn: "$5,000–$15,000+/mo",
    description: "You knock doors, qualify homeowners, and set appointments for closers. The volume you create determines what you earn.",
  },
  {
    role: "Closer",
    earn: "$10,000–$20,000+/mo",
    description: "You run appointments, present the proposal, and close the deal. Top closers in this company earn $400k+ per year.",
  },
];

export default function RevelationPage() {
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 80);

    const fn = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div style={{ background: "#050507", color: "#f4f3f0", fontFamily: "var(--font-body)", overflow: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Parallax dramatic background */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            inset: "-10%",
            background: `
              radial-gradient(ellipse 60% 80% at 30% 40%, rgba(139,90,43,0.35), transparent),
              radial-gradient(ellipse 50% 60% at 70% 60%, rgba(80,50,20,0.25), transparent),
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.12), transparent),
              linear-gradient(160deg, #0a0805 0%, #12090a 30%, #0d0a06 60%, #080508 100%)
            `,
            transform: `translate(${mouse.x * -18}px, ${mouse.y * -18}px)`,
            transition: "transform 0.14s ease-out",
          }}
        />
        {/* Dramatic light rays effect */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `
            conic-gradient(from 200deg at 35% 25%, transparent 0deg, rgba(201,169,110,0.06) 15deg, transparent 30deg),
            conic-gradient(from 220deg at 65% 35%, transparent 0deg, rgba(180,130,60,0.05) 12deg, transparent 25deg)
          `,
          transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)`,
          transition: "transform 0.1s ease-out",
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,7,0.5) 0%, transparent 40%, rgba(5,5,7,0.95) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,169,110,0.1), transparent)" }} />

        {/* Nav */}
        <nav style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "22px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(5,5,7,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, letterSpacing: "0.08em", color: "#fff" }}>
            REVELATION
          </span>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="#opportunity" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, transition: "all 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}>
              The Opportunity
            </a>
            <a href="/apply" style={{
              fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#0d0b08", background: "#c9a96e",
              textDecoration: "none", padding: "10px 22px", borderRadius: 9999,
              fontWeight: 700, transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#e8cfa0"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#c9a96e"}>
              Apply
            </a>
          </div>
        </nav>

        {/* Hero content */}
        <div style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "80px 32px 40px",
          maxWidth: 900,
          opacity: loaded ? 1 : 0,
          transform: loaded ? `translate(${mouse.x * 6}px, ${mouse.y * 6}px)` : "translateY(20px)",
          transition: loaded ? "opacity 0.9s ease, transform 0.1s ease-out" : "opacity 0.9s ease, transform 0.9s ease",
        }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 26 }}>
            SUNRUN × REVELATION · Summer Program 2026
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px, 16vw, 200px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.88,
            margin: "0 0 24px",
            color: "#fff",
            textShadow: "0 0 140px rgba(201,169,110,0.1)",
          }}>
            REVELATION.
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 600, margin: "0 auto 48px" }}>
            A high-performance solar sales team under Sunrun. Built for those who perform.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/apply" style={{
              fontSize: 14, fontWeight: 700, letterSpacing: "0.04em",
              color: "#0d0b08", background: "#c9a96e",
              textDecoration: "none", padding: "16px 36px", borderRadius: 9999,
              transition: "all 0.2s ease", border: "none",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#e8cfa0"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a96e"; el.style.transform = "translateY(0)"; }}>
              Apply to Join the Team →
            </a>
            <a href="#opportunity" style={{
              fontSize: 14, fontWeight: 500,
              color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.06)",
              textDecoration: "none", padding: "16px 36px", borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.15)",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.35)"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.7)"; el.style.borderColor = "rgba(255,255,255,0.15)"; el.style.transform = "translateY(0)"; }}>
              See the Opportunity
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          borderTop: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(5,5,7,0.7)",
          backdropFilter: "blur(20px)",
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          padding: "28px 40px",
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              padding: "0 20px",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "#c9a96e", letterSpacing: "-0.03em" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Identity statement ── */}
      <section style={{ padding: "120px 40px", background: "#050507" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 24 }}>
              Who We Are
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", margin: "0 0 28px" }}>
              Not for everyone.<br />
              <em style={{ color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>That&apos;s the point.</em>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 20 }}>
              REVELATION is a named high-performance sales team under Sunrun — the largest residential solar company in the United States.
            </p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 20 }}>
              We grow fast, earn real, and we do not carry people who don&apos;t produce. The standard is high because the upside is real.
            </p>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              If you are competitive, coachable, and willing to work — this is the most direct path to building the income you want.
            </p>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {truths.map((truth, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "18px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
              }}>
                <span style={{ color: "#c9a96e", fontSize: 16, marginTop: 2, flexShrink: 0 }}>—</span>
                <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>{truth}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opportunity ── */}
      <section id="opportunity" style={{ padding: "100px 40px", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 20 }}>
              The Opportunity
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.035em", color: "#fff", margin: 0 }}>
              Two paths. Both earn real money.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {opportunity.map((role) => (
              <div key={role.role} style={{
                padding: "44px 40px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 24,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(201,169,110,0.07)"; el.style.borderColor = "rgba(201,169,110,0.25)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.03)"; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 14 }}>
                  {role.role}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "#c9a96e", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 20 }}>
                  {role.earn}
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
                  {role.description}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href="/apply" style={{
              fontSize: 14, fontWeight: 700, letterSpacing: "0.04em",
              color: "#0d0b08", background: "#c9a96e",
              textDecoration: "none", padding: "18px 44px", borderRadius: 9999,
              display: "inline-flex", alignItems: "center",
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#e8cfa0"; el.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a96e"; el.style.transform = "translateY(0)"; }}>
              Start Your Application →
            </a>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: "100px 40px", background: "#050507" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 20 }}>
              What We Stand For
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
              The standard is non-negotiable.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
            {values.map((v) => (
              <div key={v.title} style={{ padding: "44px 40px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, color: "#c9a96e", letterSpacing: "-0.02em", marginBottom: 16 }}>
                  {v.title}
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{
        padding: "120px 40px",
        textAlign: "center",
        background: `radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,169,110,0.1), transparent), #050507`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 24 }}>
            Ready?
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.92, color: "#fff", margin: "0 0 24px" }}>
            Spots are limited.<br />
            <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Don&apos;t wait.</em>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            We interview fast and move faster. Qualified people are joining the team now. Summer starts April 27.
          </p>
          <a href="/apply" style={{
            fontSize: 15, fontWeight: 700, letterSpacing: "0.04em",
            color: "#0d0b08", background: "#c9a96e",
            textDecoration: "none", padding: "18px 48px", borderRadius: 9999,
            display: "inline-flex", alignItems: "center",
            transition: "all 0.2s ease",
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#e8cfa0"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 12px 32px rgba(201,169,110,0.25)"; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a96e"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
            Apply to Join REVELATION →
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: "28px 40px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        background: "#050507",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>
          REVELATION
        </span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/apply" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>Apply</a>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>SUNRUN × REVELATION</span>
        </div>
      </footer>

    </div>
  );
}
