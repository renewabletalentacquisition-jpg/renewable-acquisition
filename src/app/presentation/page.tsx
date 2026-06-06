"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const chapters = [
  {
    id: "bill",
    number: "01",
    label: "Current Bill",
    headline: "Start with the bill they already have.",
    copy: "The first decision point is not solar. It is whether the current utility path is still worth staying on.",
    proof: ["Monthly cost", "Usage pattern", "Future exposure"],
  },
  {
    id: "pressure",
    number: "02",
    label: "Rate Pressure",
    headline: "The utility path is variable by design.",
    copy: "A homeowner can ignore solar and still be making a decision. Staying with the utility means accepting future rate movement without control.",
    proof: ["Rate increases", "Seasonal swings", "No ownership"],
  },
  {
    id: "plan",
    number: "03",
    label: "Solar Plan",
    headline: "The home becomes the source.",
    copy: "The proposal should make the shift obvious: produce power at the home, reduce utility dependence, and create a cleaner long-term path.",
    proof: ["System size", "Offset", "Battery option"],
  },
  {
    id: "compare",
    number: "04",
    label: "Comparison",
    headline: "The math decides the recommendation.",
    copy: "When the solar payment beats the utility path and the customer understands the difference, the close becomes a clear comparison.",
    proof: ["Payment", "Savings", "Long-term value"],
  },
  {
    id: "decision",
    number: "05",
    label: "Decision",
    headline: "If it qualifies and saves, move forward.",
    copy: "The close is calm: confirm the homeowner sees the advantage, answer the final concern, then move the project into the next step.",
    proof: ["Approval", "Site survey", "Install path"],
  },
];

export default function PresentationPage() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [progress, setProgress] = useState(0);

  const activeIndex = useMemo(
    () => Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter)),
    [activeChapter]
  );

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: "-34% 0px -44% 0px", threshold: 0.1 }
    );

    document.querySelectorAll("[data-presentation-section]").forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="pitch">
      <div className="pitch-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <header className="pitch-header">
        <Link href="/" className="pitch-brand" aria-label="Renewable Acquisition home">
          <span className="pitch-mark" />
          <span>Renewable Acquisition</span>
        </Link>

        <div className="pitch-actions">
          <a href="#decision" className="pitch-start">
            <span />
            Next Step
          </a>
          <a href="#chapters" className="pitch-menu" aria-label="Presentation menu">
            <span />
            <span />
          </a>
        </div>
      </header>

      <section className="pitch-hero">
        <div className="pitch-hero-main reveal visible">
          <h1>
            Reduce Bills Restore <span>Control</span>
          </h1>
          <p>Solar presentation dashboard for a clean homeowner close.</p>
        </div>
        <p className="pitch-hero-note reveal visible">
          Walk the customer through what they pay now, what keeps changing, and
          the cleaner path available if the home qualifies.
        </p>
      </section>

      <nav id="chapters" className="pitch-chapters" aria-label="Presentation chapters">
        {chapters.map((chapter) => (
          <a
            href={`#${chapter.id}`}
            key={chapter.id}
            className={chapter.id === activeChapter ? "active" : ""}
          >
            <span>{chapter.number}</span>
            <strong>{chapter.label}</strong>
          </a>
        ))}
      </nav>

      <section className="pitch-visual" aria-label="Solar energy landscape">
        <div className="pitch-sun" />
        <div className="pitch-panel-grid" />
        <div className="pitch-home-card">
          <span>Home Energy Plan</span>
          <strong>{chapters[activeIndex].label}</strong>
        </div>
      </section>

      <div className="pitch-sections">
        {chapters.map((chapter) => (
          <section
            id={chapter.id}
            key={chapter.id}
            className="pitch-section reveal"
            data-presentation-section
          >
            <div className="pitch-section-copy">
              <p>{chapter.number} · {chapter.label}</p>
              <h2>{chapter.headline}</h2>
              <span>{chapter.copy}</span>
            </div>

            <div className="pitch-proof">
              {chapter.proof.map((item, index) => (
                <div key={item}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="pitch-close reveal">
        <p>Final Frame</p>
        <h2>The best option should feel obvious before the signature.</h2>
        <div className="pitch-close-grid">
          <div>
            <span>Current path</span>
            <strong>Utility decides</strong>
          </div>
          <div>
            <span>Solar path</span>
            <strong>Home controls</strong>
          </div>
          <div>
            <span>Move forward</span>
            <strong>Approve plan</strong>
          </div>
        </div>
      </section>

      <style jsx>{`
        .pitch {
          min-height: 100vh;
          overflow-x: hidden;
          background: #f4e4cc;
          color: #183444;
          --cream: #f4e4cc;
          --cream-deep: #ecd4af;
          --ink: #183444;
          --ink-soft: rgba(24, 52, 68, 0.72);
          --yellow: #f2c54f;
          --lime: #74ff58;
          --line: rgba(24, 52, 68, 0.18);
        }

        .pitch-progress {
          position: fixed;
          inset: 0 auto auto 0;
          z-index: 300;
          width: 100%;
          height: 4px;
          background: var(--lime);
          transform-origin: left center;
        }

        .pitch-header {
          position: fixed;
          top: 4px;
          left: 0;
          right: 0;
          z-index: 200;
          height: 86px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 0 clamp(22px, 4vw, 48px);
          border-bottom: 1px solid var(--line);
          background: rgba(244, 228, 204, 0.86);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .pitch-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: clamp(15px, 2.4vw, 24px);
          font-weight: 800;
          letter-spacing: -0.03em;
          text-transform: uppercase;
        }

        .pitch-mark {
          width: clamp(25px, 3vw, 34px);
          aspect-ratio: 1;
          display: inline-block;
          border-radius: 50%;
          background:
            linear-gradient(90deg, transparent 42%, var(--ink) 42% 58%, transparent 58%),
            linear-gradient(0deg, transparent 42%, var(--ink) 42% 58%, transparent 58%),
            radial-gradient(circle at center, var(--yellow) 0 23%, transparent 24%);
          transform: rotate(45deg);
        }

        .pitch-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pitch-start {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px 8px 8px;
          border-radius: 999px;
          border: 1px solid rgba(24, 52, 68, 0.1);
          background: var(--yellow);
          color: var(--ink);
          font-size: 13px;
          font-weight: 800;
          box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.32);
        }

        .pitch-start span {
          width: 34px;
          aspect-ratio: 1;
          border-radius: 50%;
          background:
            radial-gradient(circle at 45% 42%, #fff 0 9%, transparent 10%),
            radial-gradient(circle at 58% 58%, #fff 0 7%, transparent 8%),
            #70481c;
        }

        .pitch-menu {
          width: 56px;
          height: 56px;
          display: grid;
          place-items: center;
          gap: 0;
          border-radius: 999px;
          background: var(--ink);
        }

        .pitch-menu span {
          width: 22px;
          height: 2px;
          display: block;
          background: #f7ead5;
        }

        .pitch-hero {
          min-height: 440px;
          padding: clamp(136px, 16vw, 174px) clamp(22px, 4vw, 80px) clamp(70px, 9vw, 108px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 380px);
          gap: clamp(30px, 8vw, 110px);
          align-items: start;
          border-bottom: 1px solid var(--line);
        }

        .pitch-hero-main h1 {
          max-width: 1000px;
          margin: 0;
          color: var(--ink);
          font-family: var(--font-display);
          font-size: clamp(58px, 7.8vw, 118px);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 0.9;
        }

        .pitch-hero-main h1 span {
          display: inline-block;
          padding: 0 10px 6px;
          background: rgba(116, 255, 88, 0.22);
          outline: 5px solid var(--lime);
          outline-offset: -4px;
          color: #163244;
        }

        .pitch-hero-main p,
        .pitch-hero-note {
          margin: 20px 0 0;
          color: var(--ink-soft);
          font-family: var(--font-body);
          font-size: clamp(17px, 2.1vw, 23px);
          line-height: 1.36;
          letter-spacing: -0.02em;
        }

        .pitch-hero-note {
          margin-top: 8px;
          max-width: 380px;
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.45;
        }

        .pitch-chapters {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          background: var(--yellow);
          border-bottom: 1px solid rgba(24, 52, 68, 0.16);
        }

        .pitch-chapters a {
          min-height: 76px;
          display: grid;
          align-content: center;
          gap: 14px;
          padding: 16px clamp(18px, 3vw, 48px);
          color: var(--ink);
          border-right: 1px solid rgba(24, 52, 68, 0.14);
          transition: background 0.2s ease;
        }

        .pitch-chapters a.active,
        .pitch-chapters a:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .pitch-chapters span {
          font-size: 15px;
          color: rgba(24, 52, 68, 0.8);
        }

        .pitch-chapters strong {
          font-size: clamp(14px, 1.5vw, 18px);
          font-weight: 500;
        }

        .pitch-chapters strong::before {
          content: "• ";
        }

        .pitch-visual {
          position: relative;
          min-height: min(620px, 58vw);
          overflow: hidden;
          background:
            radial-gradient(circle at 74% 24%, rgba(255, 255, 255, 0.72) 0 8%, transparent 9%),
            radial-gradient(circle at 82% 32%, rgba(255, 255, 255, 0.58) 0 11%, transparent 12%),
            radial-gradient(circle at 18% 70%, rgba(38, 119, 92, 0.95) 0 13%, transparent 14%),
            radial-gradient(circle at 28% 58%, rgba(102, 149, 77, 0.9) 0 14%, transparent 15%),
            radial-gradient(circle at 62% 48%, rgba(194, 145, 77, 0.65) 0 12%, transparent 13%),
            linear-gradient(135deg, #d3b070 0%, #ead29c 38%, #9d9f57 62%, #276d65 100%);
        }

        .pitch-sun {
          position: absolute;
          left: 8%;
          bottom: 10%;
          width: 34vw;
          aspect-ratio: 1.4;
          border-radius: 48%;
          background:
            repeating-linear-gradient(90deg, rgba(17, 52, 68, 0.62) 0 18px, rgba(17, 52, 68, 0.9) 18px 21px, rgba(255,255,255,0.18) 21px 23px);
          transform: rotate(-10deg);
          opacity: 0.92;
          box-shadow: 0 28px 80px rgba(24, 52, 68, 0.24);
        }

        .pitch-panel-grid {
          position: absolute;
          right: 11%;
          top: 20%;
          width: 30vw;
          aspect-ratio: 1.2;
          border-radius: 12px;
          background:
            repeating-linear-gradient(0deg, rgba(244, 228, 204, 0.16) 0 2px, transparent 2px 36px),
            repeating-linear-gradient(90deg, rgba(244, 228, 204, 0.2) 0 2px, transparent 2px 52px),
            #143342;
          transform: rotate(8deg);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
        }

        .pitch-home-card {
          position: absolute;
          left: clamp(22px, 4vw, 80px);
          bottom: clamp(22px, 4vw, 52px);
          min-width: min(420px, calc(100% - 44px));
          padding: 26px;
          border: 1px solid rgba(255, 255, 255, 0.38);
          border-radius: 28px;
          background: rgba(244, 228, 204, 0.76);
          backdrop-filter: blur(12px);
          color: var(--ink);
        }

        .pitch-home-card span {
          display: block;
          margin-bottom: 10px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .pitch-home-card strong {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(42px, 5vw, 70px);
          line-height: 0.92;
          letter-spacing: -0.04em;
        }

        .pitch-sections {
          display: grid;
        }

        .pitch-section {
          min-height: min(820px, 92svh);
          scroll-margin-top: 98px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(290px, 0.56fr);
          gap: clamp(26px, 6vw, 80px);
          align-items: center;
          padding: clamp(70px, 10vw, 132px) clamp(22px, 4vw, 80px);
          border-bottom: 1px solid var(--line);
          background: var(--cream);
        }

        .pitch-section:nth-child(even) {
          background: #efd9b9;
        }

        .pitch-section-copy p,
        .pitch-close p {
          margin: 0 0 24px;
          color: rgba(24, 52, 68, 0.74);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .pitch-section-copy h2,
        .pitch-close h2 {
          max-width: 880px;
          margin: 0;
          color: var(--ink);
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 104px);
          font-weight: 700;
          letter-spacing: -0.05em;
          line-height: 0.92;
        }

        .pitch-section-copy span {
          display: block;
          max-width: 620px;
          margin-top: 28px;
          color: var(--ink-soft);
          font-size: clamp(17px, 2vw, 22px);
          line-height: 1.48;
          letter-spacing: -0.02em;
        }

        .pitch-proof {
          display: grid;
          gap: 14px;
        }

        .pitch-proof div {
          min-height: 118px;
          display: grid;
          align-content: space-between;
          padding: 22px;
          border: 1px solid rgba(24, 52, 68, 0.18);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.22);
        }

        .pitch-proof small {
          color: rgba(24, 52, 68, 0.55);
          font-size: 13px;
        }

        .pitch-proof strong {
          font-family: var(--font-display);
          color: var(--ink);
          font-size: clamp(30px, 3.7vw, 48px);
          line-height: 0.96;
          letter-spacing: -0.04em;
        }

        .pitch-close {
          padding: clamp(70px, 10vw, 132px) clamp(22px, 4vw, 80px);
          background: var(--ink);
          color: var(--cream);
        }

        .pitch-close p,
        .pitch-close h2 {
          color: var(--cream);
        }

        .pitch-close h2 {
          max-width: 980px;
        }

        .pitch-close-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: clamp(38px, 6vw, 74px);
        }

        .pitch-close-grid div {
          min-height: 160px;
          display: grid;
          align-content: space-between;
          padding: 24px;
          border: 1px solid rgba(244, 228, 204, 0.18);
          border-radius: 28px;
          background: rgba(244, 228, 204, 0.06);
        }

        .pitch-close-grid span {
          color: rgba(244, 228, 204, 0.66);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pitch-close-grid strong {
          color: var(--cream);
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 58px);
          line-height: 0.95;
          letter-spacing: -0.04em;
        }

        .reveal {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 900px) {
          .pitch-header {
            height: 78px;
          }

          .pitch-brand {
            max-width: 58vw;
          }

          .pitch-hero {
            grid-template-columns: 1fr;
          }

          .pitch-chapters {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
          }

          .pitch-chapters a {
            min-width: 42vw;
            scroll-snap-align: start;
          }

          .pitch-visual {
            min-height: 520px;
          }

          .pitch-sun {
            width: 56vw;
          }

          .pitch-panel-grid {
            width: 48vw;
          }

          .pitch-section {
            min-height: auto;
            grid-template-columns: 1fr;
          }

          .pitch-proof {
            grid-template-columns: repeat(3, 1fr);
          }

          .pitch-close-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 620px) {
          .pitch-start {
            display: none;
          }

          .pitch-hero {
            padding-top: 124px;
          }

          .pitch-hero-main h1 {
            font-size: clamp(50px, 16vw, 72px);
          }

          .pitch-chapters a {
            min-width: 74vw;
          }

          .pitch-proof {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
