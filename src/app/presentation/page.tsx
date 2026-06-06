"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const sections = [
  {
    id: "opening",
    eyebrow: "01 · Opening",
    title: "A clearer path for your home energy.",
    body: "Today is simple: understand what you pay now, compare it against a cleaner long-term option, and decide whether the numbers make sense for your home.",
    visualTitle: "Current bill review",
    visualMeta: "Utility baseline · homeowner profile · usage pattern",
  },
  {
    id: "problem",
    eyebrow: "02 · The Problem",
    title: "Utility costs are designed to keep moving.",
    body: "Most homeowners are not looking for another bill. They are looking for control. The question is whether staying fully dependent on the utility is still the best financial decision.",
    visualTitle: "Rate pressure",
    visualMeta: "Historical increases · seasonal usage · future exposure",
  },
  {
    id: "solution",
    eyebrow: "03 · The Solution",
    title: "Solar shifts the power conversation.",
    body: "Instead of renting power month after month, the home can produce energy on-site and reduce dependence on rising utility rates.",
    visualTitle: "System design",
    visualMeta: "Panels · production · offset · battery options",
  },
  {
    id: "numbers",
    eyebrow: "04 · The Numbers",
    title: "The close is in the comparison.",
    body: "We look at what the utility path costs, what the solar path costs, and whether the monthly and long-term math creates a clear advantage.",
    visualTitle: "Payment comparison",
    visualMeta: "Monthly payment · avoided utility cost · long-term savings",
  },
  {
    id: "trust",
    eyebrow: "05 · Trust",
    title: "Backed by a real installation standard.",
    body: "The decision should feel clear, documented, and supported. The homeowner should know who is involved, what happens next, and how the project moves from approval to install.",
    visualTitle: "Company proof",
    visualMeta: "Sunrun backing · project timeline · installation support",
  },
  {
    id: "close",
    eyebrow: "06 · Recommendation",
    title: "If the numbers are better, the next step is simple.",
    body: "When the home qualifies and the proposal creates a better path than the utility, the recommendation is to lock in the plan and move the project forward.",
    visualTitle: "Next step",
    visualMeta: "Approval · site survey · install path · homeowner decision",
  },
];

export default function PresentationPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);

  const activeIndex = useMemo(
    () => sections.findIndex((section) => section.id === activeSection),
    [activeSection]
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.08 }
    );

    document.querySelectorAll("[data-close-section]").forEach((section) => observer.observe(section));
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="presentation-shell">
      <div className="presentation-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <nav className="presentation-nav" aria-label="Presentation sections">
        <Link className="presentation-brand" href="/">
          Renewable <span>Acquisition</span>
        </Link>
        <div className="presentation-steps">
          {sections.map((section, index) => (
            <a
              key={section.id}
              className={section.id === activeSection ? "active" : ""}
              href={`#${section.id}`}
              aria-label={section.title}
            >
              {String(index + 1).padStart(2, "0")}
            </a>
          ))}
        </div>
      </nav>

      <section className="presentation-hero" id="top">
        <div className="presentation-hero-copy reveal visible">
          <p className="presentation-kicker">Home Energy Presentation</p>
          <h1>Control the bill before the bill controls the home.</h1>
          <p>
            A clean, numbers-first walkthrough for comparing the current utility path
            against a solar-backed energy plan.
          </p>
        </div>
        <div className="presentation-status reveal visible">
          <p>Current Step</p>
          <strong>{String(Math.max(activeIndex + 1, 1)).padStart(2, "0")}</strong>
          <span>{sections[Math.max(activeIndex, 0)].title}</span>
        </div>
      </section>

      <div className="presentation-sections">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="presentation-section reveal"
            data-close-section
          >
            <div className="presentation-copy">
              <p className="presentation-kicker">{section.eyebrow}</p>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              <div className="presentation-talk-track">
                <span>Talk Track</span>
                <p>
                  This space is reserved for the exact words Sir uses in the home,
                  tightened into a clean closing sequence.
                </p>
              </div>
            </div>

            <div className="presentation-visual" aria-label={section.visualTitle}>
              <div className="presentation-visual-index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p>{section.visualTitle}</p>
                <span>{section.visualMeta}</span>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="presentation-final reveal">
        <p className="presentation-kicker">Decision Point</p>
        <h2>The right move is the one the numbers support.</h2>
        <div className="presentation-final-grid">
          <div>
            <span>Utility path</span>
            <strong>Variable</strong>
          </div>
          <div>
            <span>Solar path</span>
            <strong>Controlled</strong>
          </div>
          <div>
            <span>Next step</span>
            <strong>Approve</strong>
          </div>
        </div>
      </section>

      <style jsx>{`
        .presentation-shell {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(ellipse 75% 45% at 50% -10%, rgba(201, 169, 110, 0.14), transparent),
            linear-gradient(180deg, #08080a 0%, #0d0d10 42%, #08080a 100%);
          color: var(--fg);
        }

        .presentation-progress {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 250;
          width: 100%;
          height: 3px;
          background: var(--accent);
          transform-origin: left center;
          box-shadow: 0 0 18px rgba(201, 169, 110, 0.42);
        }

        .presentation-nav {
          position: fixed;
          top: 3px;
          left: 0;
          right: 0;
          z-index: 200;
          min-height: 68px;
          padding: 0 clamp(18px, 4vw, 42px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          border-bottom: 1px solid var(--border);
          background: rgba(8, 8, 10, 0.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .presentation-brand {
          font-family: var(--font-display);
          font-size: clamp(19px, 2.6vw, 25px);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--fg);
          white-space: nowrap;
        }

        .presentation-brand span {
          color: var(--accent);
        }

        .presentation-steps {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .presentation-steps a {
          width: clamp(38px, 5vw, 48px);
          height: clamp(38px, 5vw, 48px);
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          color: var(--fg-muted);
          font-size: 12px;
          font-weight: 600;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
        }

        .presentation-steps a.active,
        .presentation-steps a:hover {
          background: var(--accent);
          border-color: var(--accent);
          color: #0d0b08;
        }

        .presentation-hero {
          min-height: 94svh;
          padding: clamp(120px, 16vw, 180px) clamp(20px, 5vw, 56px) clamp(64px, 10vw, 110px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
          gap: clamp(30px, 6vw, 72px);
          align-items: end;
          max-width: 1380px;
          margin: 0 auto;
        }

        .presentation-hero-copy {
          max-width: 820px;
        }

        .presentation-kicker {
          margin: 0 0 18px;
          color: var(--accent-soft);
          font-size: clamp(10px, 1.5vw, 12px);
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .presentation-hero h1,
        .presentation-section h2,
        .presentation-final h2 {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 0.96;
          color: var(--fg);
        }

        .presentation-hero h1 {
          max-width: 860px;
          font-size: clamp(58px, 9vw, 126px);
        }

        .presentation-hero-copy > p:last-child {
          max-width: 670px;
          margin: 28px 0 0;
          color: var(--fg-muted);
          font-size: clamp(17px, 2.3vw, 22px);
          line-height: 1.62;
        }

        .presentation-status {
          border: 1px solid var(--border);
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.048);
          padding: 28px;
        }

        .presentation-status p,
        .presentation-status span {
          margin: 0;
          color: var(--fg-muted);
          font-size: 13px;
          line-height: 1.55;
        }

        .presentation-status strong {
          display: block;
          margin: 8px 0 10px;
          color: var(--accent);
          font-family: var(--font-display);
          font-size: 72px;
          line-height: 0.9;
        }

        .presentation-sections {
          display: grid;
          gap: clamp(26px, 4vw, 44px);
          max-width: 1380px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 56px) clamp(42px, 8vw, 90px);
        }

        .presentation-section {
          min-height: min(780px, calc(100svh - 92px));
          scroll-margin-top: 92px;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
          gap: clamp(24px, 5vw, 60px);
          align-items: stretch;
          padding: clamp(24px, 4vw, 46px);
          border: 1px solid var(--border);
          border-radius: 34px;
          background:
            linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.025)),
            rgba(255, 255, 255, 0.02);
        }

        .presentation-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        .presentation-section h2 {
          max-width: 580px;
          font-size: clamp(42px, 6vw, 82px);
        }

        .presentation-section .presentation-copy > p:not(.presentation-kicker) {
          max-width: 590px;
          margin: 24px 0 0;
          color: var(--fg-muted);
          font-size: clamp(17px, 2vw, 20px);
          line-height: 1.7;
        }

        .presentation-talk-track {
          margin-top: clamp(28px, 5vw, 56px);
          max-width: 560px;
          padding-top: 22px;
          border-top: 1px solid var(--border);
        }

        .presentation-talk-track span {
          color: var(--accent-soft);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .presentation-talk-track p {
          margin: 10px 0 0;
          color: rgba(244, 243, 240, 0.78);
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.68;
        }

        .presentation-visual {
          position: relative;
          min-height: 460px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: clamp(24px, 4vw, 36px);
          background:
            linear-gradient(180deg, transparent 0%, rgba(8, 8, 10, 0.2) 42%, rgba(8, 8, 10, 0.92) 100%),
            radial-gradient(ellipse 60% 60% at 50% 22%, rgba(201, 169, 110, 0.18), transparent),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 64px),
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 64px),
            #111114;
        }

        .presentation-visual-index {
          position: absolute;
          top: clamp(18px, 3vw, 30px);
          right: clamp(18px, 3vw, 30px);
          color: rgba(244, 243, 240, 0.08);
          font-family: var(--font-display);
          font-size: clamp(90px, 13vw, 160px);
          font-weight: 600;
          line-height: 0.8;
        }

        .presentation-visual p {
          position: relative;
          margin: 0 0 10px;
          font-family: var(--font-display);
          color: var(--fg);
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1;
        }

        .presentation-visual span {
          position: relative;
          display: block;
          max-width: 460px;
          color: var(--fg-muted);
          font-size: clamp(14px, 1.7vw, 17px);
          line-height: 1.6;
        }

        .presentation-final {
          max-width: 1380px;
          margin: 0 auto;
          padding: clamp(52px, 8vw, 96px) clamp(20px, 5vw, 56px) clamp(80px, 10vw, 130px);
        }

        .presentation-final h2 {
          max-width: 920px;
          font-size: clamp(46px, 7vw, 94px);
        }

        .presentation-final-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: clamp(28px, 5vw, 56px);
        }

        .presentation-final-grid div {
          min-height: 150px;
          padding: 24px;
          border: 1px solid var(--border);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.045);
        }

        .presentation-final-grid span {
          display: block;
          color: var(--fg-muted);
          font-size: 13px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .presentation-final-grid strong {
          display: block;
          margin-top: 20px;
          color: var(--fg);
          font-family: var(--font-display);
          font-size: clamp(38px, 5vw, 64px);
          line-height: 1;
        }

        @media (max-width: 900px) {
          .presentation-nav {
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            min-height: 104px;
            padding-top: 14px;
            padding-bottom: 14px;
          }

          .presentation-steps {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 2px;
          }

          .presentation-hero,
          .presentation-section {
            grid-template-columns: 1fr;
          }

          .presentation-hero {
            min-height: auto;
            padding-top: 150px;
          }

          .presentation-status {
            max-width: 420px;
          }

          .presentation-section {
            min-height: auto;
            border-radius: 28px;
          }

          .presentation-visual {
            min-height: 360px;
          }
        }

        @media (max-width: 640px) {
          .presentation-final-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
