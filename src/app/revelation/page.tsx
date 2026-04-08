"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "$10k–$20k+", label: "Top closer monthly" },
  { value: "$5k–$15k+", label: "Top setter monthly" },
  { value: "Sunrun", label: "#1 residential solar" },
];

const truths = [
  "This is commission-only. There is no salary.",
  "This is door-to-door. In person, every day.",
  "Travel and relocation are required for the summer.",
  "We filter hard. Not everyone makes it through.",
  "The people who are built for this make real money.",
];

const values = [
  { title: "Standard", body: "We hold a high bar. Every rep is expected to show up, work the system, and perform. No passengers." },
  { title: "Brotherhood", body: "This team operates as a unit. You work with people who push you, compete with you, and have your back." },
  { title: "Growth", body: "The path from setter to closer to leader exists here. People have done it. It is available to you." },
  { title: "Proof", body: "We operate under Sunrun — the largest residential solar company in the US. The product sells itself to the right homes." },
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

  const link = (label: string, href: string, gold = false) => (
    <a href={href} style={{
      fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
      color: gold ? "#0d0b08" : "rgba(255,255,255,0.55)",
      background: gold ? "#c9a96e" : "rgba(255,255,255,0.06)",
      textDecoration: "none", padding: "10px 22px", borderRadius: 9999,
      border: gold ? "none" : "1px solid rgba(255,255,255,0.14)",
      fontWeight: gold ? 700 : 500,
      transition: "all 0.2s ease",
      whiteSpace: "nowrap" as const,
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = gold ? "#e8cfa0" : "rgba(255,255,255,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = gold ? "#c9a96e" : "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
    >{label}</a>
  );

  return (
    <div style={{ background: "#050507", color: "#f4f3f0", fontFamily: "var(--font-body)", overflowX: "hidden" }}>

      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>

        {/* Saint Michael painting — parallax */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage: "url('/saint-michael.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
            transform: `translate(${mouse.x * -16}px, ${mouse.y * -16}px)`,
            transition: "transform 0.14s ease-out",
            opacity: 0.32,
            filter: "sepia(10%) contrast(1.08) brightness(0.85)",
          }}
        />

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,7,0.7) 0%, rgba(5,5,7,0.35) 45%, rgba(5,5,7,0.96) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,169,110,0.1), transparent)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(5,5,7,0.8), transparent)" }} />

        {/* Nav */}
        <nav style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "0 clamp(16px, 4vw, 40px)",
          height: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(5,5,7,0.7)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          gap: 16,
        }}>
          <div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 3vw, 22px)", fontWeight: 600, letterSpacing: "0.08em", color: "#fff" }}>
              REVELATION
            </span>
            <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(201,169,110,0.6)", marginLeft: 10, display: "none" }}>× Sunrun</span>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {link("The Opportunity", "#opportunity")}
            {link("Apply", "/apply", true)}
          </div>
        </nav>

        {/* Hero content — centered */}
        <div style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "clamp(80px, 12vw, 120px) clamp(20px, 5vw, 40px) clamp(100px, 15vw, 140px)",
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
          opacity: loaded ? 1 : 0,
          transform: loaded ? `translate(${mouse.x * 5}px, ${mouse.y * 5}px)` : "translateY(24px)",
          transition: loaded ? "opacity 0.9s ease, transform 0.1s ease-out" : "opacity 0.9s ease, transform 0.9s ease",
        }}>
          <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.75)", marginBottom: 24 }}>
            SUNRUN × REVELATION · Door to Door Sales · Summer 2026
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 18vw, 200px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.88,
            margin: "0 0 clamp(18px, 3vw, 28px)",
            color: "#fff",
            textShadow: "0 0 140px rgba(201,169,110,0.12)",
          }}>
            REVELATION.
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2.5vw, 20px)",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto clamp(36px, 5vw, 52px)",
          }}>
            A high-performance door-to-door solar sales team under Sunrun. Built for those who perform.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/apply" style={{
              fontSize: "clamp(13px, 1.8vw, 15px)", fontWeight: 700, letterSpacing: "0.04em",
              color: "#0d0b08", background: "#c9a96e",
              textDecoration: "none", padding: "clamp(13px, 2vw, 17px) clamp(24px, 4vw, 40px)", borderRadius: 9999,
              transition: "all 0.2s ease", whiteSpace: "nowrap" as const,
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#e8cfa0"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 8px 28px rgba(201,169,110,0.3)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "#c9a96e"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
              Apply to Join the Team →
            </a>
            <a href="#opportunity" style={{
              fontSize: "clamp(13px, 1.8vw, 15px)", fontWeight: 500,
              color: "rgba(255,255,255,0.65)", background: "rgba(255,255,255,0.06)",
              textDecoration: "none", padding: "clamp(13px, 2vw, 17px) clamp(24px, 4vw, 40px)", borderRadius: 9999,
              border: "1px solid rgba(255,255,255,0.15)", whiteSpace: "nowrap" as const,
              transition: "all 0.2s ease",
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.35)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "rgba(255,255,255,0.65)"; el.style.borderColor = "rgba(255,255,255,0.15)"; }}>
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
          background: "rgba(5,5,7,0.8)",
          backdropFilter: "blur(20px)",
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          padding: "clamp(16px, 3vw, 28px) clamp(16px, 4vw, 40px)",
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              padding: "0 12px",
            }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 4vw, 38px)", fontWeight: 600, color: "#c9a96e", letterSpacing: "-0.03em" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "clamp(9px, 1.5vw, 12px)", color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Who we are ── */}
      <section style={{ padding: "clamp(64px, 10vw, 120px) clamp(20px, 5vw, 60px)", background: "#050507" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(40px, 8vw, 80px)", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 20 }}>Who We Are</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", margin: "0 0 24px" }}>
              Not for everyone.<br />
              <em style={{ color: "rgba(255,255,255,0.35)", fontStyle: "italic" }}>That&apos;s the point.</em>
            </h2>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 16 }}>
              REVELATION is a named high-performance sales team operating under <strong style={{ color: "rgba(255,255,255,0.8)" }}>Sunrun</strong> — the largest residential solar company in the United States.
            </p>
            <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              We grow fast, earn real, and we do not carry people who don&apos;t produce. The standard is high because the upside is real.
            </p>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {truths.map((truth, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                padding: "clamp(14px, 2vw, 18px) clamp(14px, 2vw, 20px)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
              }}>
                <span style={{ color: "#c9a96e", fontSize: 16, marginTop: 2, flexShrink: 0 }}>—</span>
                <span style={{ fontSize: "clamp(13px, 1.8vw, 14.5px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{truth}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Opportunity ── */}
      <section id="opportunity" style={{ padding: "clamp(64px, 10vw, 100px) clamp(20px, 5vw, 60px)", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 64px)" }}>
            <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 18 }}>The Opportunity</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 7vw, 72px)", fontWeight: 600, letterSpacing: "-0.035em", color: "#fff", margin: 0 }}>
              Two paths. Both earn real money.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: "clamp(32px, 5vw, 48px)" }}>
            {opportunity.map((role) => (
              <div key={role.role} style={{
                padding: "clamp(28px, 4vw, 44px) clamp(22px, 4vw, 40px)",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 24,
                transition: "all 0.25s ease",
              }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(201,169,110,0.07)"; el.style.borderColor = "rgba(201,169,110,0.25)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.03)"; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 14 }}>{role.role}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 600, color: "#c9a96e", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 18 }}>{role.earn}</div>
                <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>{role.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="/apply" style={{
              fontSize: "clamp(13px, 1.8vw, 14px)", fontWeight: 700, letterSpacing: "0.04em",
              color: "#0d0b08", background: "#c9a96e",
              textDecoration: "none", padding: "clamp(14px, 2vw, 18px) clamp(28px, 5vw, 44px)", borderRadius: 9999,
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
      <section style={{ padding: "clamp(64px, 10vw, 100px) clamp(20px, 5vw, 60px)", background: "#050507" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
            <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 18 }}>What We Stand For</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
              The standard is non-negotiable.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
            {values.map((v) => (
              <div key={v.title} style={{ padding: "clamp(28px, 4vw, 44px) clamp(20px, 3vw, 40px)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3vw, 32px)", fontWeight: 600, color: "#c9a96e", letterSpacing: "-0.02em", marginBottom: 14 }}>{v.title}</div>
                <p style={{ fontSize: "clamp(13px, 1.8vw, 15px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{
        padding: "clamp(80px, 12vw, 120px) clamp(20px, 5vw, 60px)",
        textAlign: "center",
        background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,169,110,0.1), transparent), #050507",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: "clamp(9px, 1.5vw, 11px)", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 22 }}>Ready?</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px, 11vw, 96px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.92, color: "#fff", margin: "0 0 20px" }}>
            Spots are limited.<br />
            <em style={{ color: "#c9a96e", fontStyle: "italic" }}>Don&apos;t wait.</em>
          </h2>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 40px" }}>
            We interview fast and move faster. Summer starts April 27. Qualified people are joining the team now.
          </p>
          <a href="/apply" style={{
            fontSize: "clamp(13px, 1.8vw, 15px)", fontWeight: 700, letterSpacing: "0.04em",
            color: "#0d0b08", background: "#c9a96e",
            textDecoration: "none", padding: "clamp(14px, 2vw, 18px) clamp(32px, 5vw, 48px)", borderRadius: 9999,
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
        padding: "clamp(20px, 3vw, 28px) clamp(20px, 5vw, 40px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 14,
        background: "#050507",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(15px, 2vw, 18px)", fontWeight: 600, letterSpacing: "0.06em", color: "rgba(255,255,255,0.35)" }}>REVELATION</span>
        <div style={{ display: "flex", gap: "clamp(14px, 3vw, 24px)", alignItems: "center", flexWrap: "wrap" }}>
          <a href="/apply" style={{ fontSize: "clamp(10px, 1.5vw, 12px)", color: "rgba(255,255,255,0.3)", textDecoration: "none", letterSpacing: "0.06em", textTransform: "uppercase" }}>Apply</a>
          <span style={{ fontSize: "clamp(10px, 1.5vw, 12px)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>SUNRUN × REVELATION</span>
        </div>
      </footer>

    </div>
  );
}
