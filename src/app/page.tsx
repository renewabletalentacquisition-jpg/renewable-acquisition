"use client";

import { useEffect } from "react";

const metrics = [
  { value: "$10k–$20k+", label: "Monthly top-rep upside" },
  { value: "$50k+", label: "Possible 4-month setter run" },
  { value: "Now", label: "Interviewing immediately" },
];

const credibilityPoints = [
  "Team operates under Sunrun",
  "REVELATION team brand live",
  "Fast interview funnel for serious applicants",
];

const fitCards = [
  {
    icon: "🏆",
    title: "Competitive people",
    body: "Athletes, gym-driven candidates, and anyone who has trained hard for something.",
  },
  {
    icon: "✈️",
    title: "Open to relocation",
    body: "We move fast and we move around. You need to be willing to go.",
  },
  {
    icon: "💰",
    title: "Commission-minded",
    body: "You want upside, not a ceiling. You understand performance-based income.",
  },
  {
    icon: "📈",
    title: "Hungry to grow",
    body: "Coachable, resilient, and ready to be held accountable to a real standard.",
  },
];

const processSteps = [
  { num: "01", title: "Apply", body: "Complete the short qualification flow. Serious candidates only." },
  { num: "02", title: "Get filtered", body: "We move fast and filter hard. No time wasted on bad fits." },
  { num: "03", title: "Interview", body: "Qualified candidates book directly into the interview schedule." },
  { num: "04", title: "Start", body: "Top applicants are reviewed and moved quickly. Spots are limited." },
];

const proofPoints = [
  {
    title: "Real standards",
    body: "In-person, commission-only, coachable, and open to travel. We say the hard parts early so the right people lean in.",
  },
  {
    title: "Fast movement",
    body: "Strong applicants can book directly into interview slots instead of waiting days for manual follow-up.",
  },
  {
    title: "Performance upside",
    body: "The offer is built for people who care more about upside, growth, and pace than comfort and predictability.",
  },
];

const candidateChecklist = [
  "You want a real income swing, not a safe base-pay routine.",
  "You can handle direct coaching, accountability, and repetition.",
  "You are open to door-to-door work, travel, and team movement.",
  "You want a team with urgency, standards, and a fast start.",
];

const faqs = [
  {
    question: "Is this remote?",
    answer: "No. This is an in-person, door-to-door sales role.",
  },
  {
    question: "Is this hourly or salary?",
    answer: "No. This opportunity is commission-only and built for people who want upside tied to performance.",
  },
  {
    question: "How fast do you move?",
    answer: "Fast. Qualified applicants can book directly into an interview slot as soon as they finish the application.",
  },
  {
    question: "Who usually does well here?",
    answer: "Competitive, coachable people with resilience, urgency, and enough stability to handle a ramp period.",
  },
];

const disclaimers = [
  "This is in-person and door-to-door. Not remote.",
  "This is commission-only. Not hourly.",
  "Travel or relocation may be required. You must be willing.",
  "Top performers earn significant income. Others may earn little early on.",
  "If comfort is the priority right now, this is the wrong fit.",
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Nav ───────────────────────────────────────────── */}
      <nav className="nav">
        <div className="site-nav-inner">
          <div className="site-nav-brand-wrap">
            <span className="site-nav-brand">
              Renewable <span style={{ color: "var(--accent)" }}>Acquisition</span>
            </span>
          </div>
          <div className="site-nav-links">
            <a href="#who" className="site-nav-link"
               onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
               onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}>
              Who It&apos;s For
            </a>
            <a href="#process" className="site-nav-link"
               onMouseEnter={e => (e.currentTarget.style.color = "var(--fg)")}
               onMouseLeave={e => (e.currentTarget.style.color = "var(--fg-muted)")}>
              Process
            </a>
            <a href="/apply" className="btn-gold site-nav-cta">
              Apply Now
            </a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: 60 }}>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section style={{
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          padding: "100px 32px 80px",
          background: `
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,169,110,0.12), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(201,169,110,0.04), transparent),
            var(--bg)
          `,
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
            <div style={{ maxWidth: 780 }}>

              <div className="reveal" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "1px solid rgba(201,169,110,0.22)",
                background: "rgba(201,169,110,0.07)",
                borderRadius: 9999,
                padding: "7px 18px",
                marginBottom: 36,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", boxShadow: "0 0 8px var(--accent)" }} />
                <span style={{ fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-soft)", fontFamily: "var(--font-body)", fontWeight: 500 }}>
                  Limited spots · Interviewing now
                </span>
              </div>

              <h1 className="reveal display" style={{
                fontSize: "clamp(52px, 8vw, 100px)",
                color: "var(--fg)",
                margin: "0 0 28px",
                transitionDelay: "0.08s",
              }}>
                Build a bigger life<br />
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>on your own terms.</em>
              </h1>

              <p className="reveal" style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: "var(--fg-muted)",
                lineHeight: 1.72,
                maxWidth: 580,
                margin: "0 0 48px",
                transitionDelay: "0.16s",
              }}>
                A commission-driven solar sales opportunity for competitive, coachable people
                who want real income upside — not a comfortable ceiling.
              </p>

              <div className="reveal" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 64, transitionDelay: "0.22s" }}>
                <a href="/apply" className="btn-gold">
                  Start Application →
                </a>
                <a href="#who" className="btn-ghost">
                  See if you fit
                </a>
              </div>

              <div className="reveal hero-metrics" style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
                transitionDelay: "0.3s",
              }}>
                {metrics.map((m) => (
                  <div key={m.label} className="card" style={{ padding: "22px 20px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)" }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 6, lineHeight: 1.5 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="reveal" style={{ transitionDelay: "0.36s", marginTop: 20 }}>
                <div className="card" style={{ padding: "18px 20px", display: "grid", gap: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                    <div>
                      <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", margin: "0 0 8px" }}>
                        Want to check the team first?
                      </p>
                      <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65, margin: 0, maxWidth: 520 }}>
                        View the REVELATION team page before you apply. It gives candidates a sharper trust check than a standard job post.
                      </p>
                    </div>
                    <a href="/revelation" className="btn-ghost" style={{ whiteSpace: "nowrap" }}>
                      View REVELATION →
                    </a>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {credibilityPoints.map((point) => (
                      <span key={point} style={{ border: "1px solid var(--border)", borderRadius: 9999, padding: "8px 12px", fontSize: 12, color: "var(--fg-muted)", background: "rgba(255,255,255,0.02)" }}>
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Reality Check ─────────────────────────────────── */}
        <section style={{ padding: "80px 32px", background: "var(--bg-subtle)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>

              <div className="reveal">
                <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 20 }}>
                  Before you apply
                </p>
                <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "var(--fg)", margin: "0 0 20px" }}>
                  This is not for everyone.<br />
                  <em style={{ color: "var(--fg-muted)", fontStyle: "italic" }}>That&apos;s the point.</em>
                </h2>
                <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                  We filter hard and move fast. The people who thrive here already know they want more.
                </p>
              </div>

              <div className="reveal" style={{
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-lg)",
                background: "linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))",
                padding: "32px 36px",
                transitionDelay: "0.1s",
              }}>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
                  {disclaimers.map((d, i) => (
                    <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--accent)", fontSize: 16, marginTop: 1, flexShrink: 0 }}>—</span>
                      <span style={{ fontSize: 14.5, color: "var(--fg-muted)", lineHeight: 1.6 }}>{d}</span>
                    </li>
                  ))}
                </ul>
                <a href="/apply" className="btn-gold" style={{ marginTop: 32, width: "100%", justifyContent: "center" }}>
                  Apply Anyway
                </a>
              </div>

            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Proof ─────────────────────────────────────────── */}
        <section style={{ padding: "90px 32px 84px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ marginBottom: 40, maxWidth: 700 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>
                Why this funnel works
              </p>
              <h2 className="display" style={{ fontSize: "clamp(34px, 5vw, 58px)", color: "var(--fg)", margin: "0 0 18px" }}>
                Clear expectations,
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}> higher intent.</em>
              </h2>
              <p style={{ fontSize: 15, color: "var(--fg-muted)", lineHeight: 1.72, margin: 0 }}>
                The site should help weak fits self-select out and make serious candidates feel momentum immediately.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {proofPoints.map((item, i) => (
                <div key={item.title} className="card reveal" style={{ padding: "30px 26px", transitionDelay: `${i * 0.08}s` }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--fg)", margin: "0 0 10px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* ── Who It's For ──────────────────────────────────── */}
        <section id="who" style={{ padding: "100px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>

            <div className="reveal" style={{ marginBottom: 64 }}>
              <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>
                Who this is for
              </p>
              <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)", color: "var(--fg)", maxWidth: 620, margin: 0 }}>
                People who perform when the pressure is real.
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {fitCards.map((card, i) => (
                <div key={card.title} className="card reveal" style={{ padding: "32px 28px", transitionDelay: `${i * 0.08}s` }}>
                  <div style={{ fontSize: 32, marginBottom: 20 }}>{card.icon}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--fg)", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <hr className="divider" />

        {/* ── Process ───────────────────────────────────────── */}
        <section id="process" style={{ padding: "clamp(72px, 10vw, 100px) clamp(20px, 5vw, 32px)", background: "var(--bg-subtle)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>

            <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(36px, 7vw, 64px)", flexWrap: "wrap", gap: 20 }}>
              <div style={{ maxWidth: 560 }}>
                <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>
                  How it works
                </p>
                <h2 className="display" style={{ fontSize: "clamp(34px, 8vw, 60px)", color: "var(--fg)", margin: 0 }}>
                  Fast funnel.<br />Hard filters.
                </h2>
              </div>
              <a href="/apply" className="btn-ghost process-cta">Begin Qualification →</a>
            </div>

            <div className="process-grid">
              {processSteps.map((step, i) => (
                <div key={step.num} className="reveal process-step" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 10vw, 52px)", fontWeight: 600, color: "var(--accent-dim)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 18 }}>
                    {step.num}
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--fg)", margin: "0 0 10px" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        <hr className="divider" />

        {/* ── Checklist + FAQ ───────────────────────────────── */}
        <section style={{ padding: "96px 32px", background: "var(--bg-subtle)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 28, alignItems: "start" }}>
            <div className="card reveal" style={{ padding: "34px 30px" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>
                Self-check before you apply
              </p>
              <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 52px)", color: "var(--fg)", margin: "0 0 18px" }}>
                If these feel true,
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}> apply now.</em>
              </h2>
              <div style={{ display: "grid", gap: 14, marginTop: 26 }}>
                {candidateChecklist.map((item, i) => (
                  <div key={item} className="reveal" style={{ display: "flex", gap: 14, alignItems: "flex-start", transitionDelay: `${i * 0.06}s` }}>
                    <span style={{ color: "var(--accent)", fontSize: 17, lineHeight: 1 }}>✓</span>
                    <span style={{ fontSize: 14.5, color: "var(--fg-muted)", lineHeight: 1.65 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card reveal" style={{ padding: "34px 30px", transitionDelay: "0.08s" }}>
              <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 16 }}>
                Quick answers
              </p>
              <div style={{ display: "grid", gap: 18 }}>
                {faqs.map((item, i) => (
                  <div key={item.question} style={{ paddingBottom: 18, borderBottom: i === faqs.length - 1 ? "none" : "1px solid var(--border)" }}>
                    <h3 style={{ fontSize: 15, color: "var(--fg)", margin: "0 0 8px", fontWeight: 600 }}>{item.question}</h3>
                    <p style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.7, margin: 0 }}>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────────── */}
        <section style={{
          padding: "120px 32px",
          background: `
            radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,169,110,0.09), transparent),
            var(--bg)
          `,
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div className="reveal">
              <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500, marginBottom: 24 }}>
                Ready?
              </p>
              <h2 className="display" style={{ fontSize: "clamp(40px, 6vw, 80px)", color: "var(--fg)", margin: "0 0 24px" }}>
                Spots are limited.<br />
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Don&apos;t wait.</em>
              </h2>
              <p style={{ fontSize: 16, color: "var(--fg-muted)", lineHeight: 1.7, marginBottom: 48 }}>
                We are actively interviewing and moving quickly with serious candidates.
                Qualified applicants may book an interview immediately.
              </p>
              <a href="/apply" className="btn-gold" style={{ fontSize: 15, padding: "16px 40px" }}>
                Start Your Application →
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────── */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--fg-muted)" }}>
              Renewable <span style={{ color: "var(--accent)" }}>Acquisition</span>
            </span>
            <span style={{ fontSize: 12.5, color: "var(--fg-dim)" }}>
              Commission-based · In-person · High-performance
            </span>
          </div>
        </footer>

      </main>
    </>
  );
}
