"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const chapters = [
  {
    id: "why-sunrun",
    number: "01",
    label: "Why Sunrun",
    headline: "Start with the company behind the system.",
    copy: "Before the homeowner looks at numbers, they need confidence in who is installing, monitoring, and backing the project long term.",
    proof: ["National scale", "Local install teams", "Long-term support"],
  },
  {
    id: "utility-rates",
    number: "02",
    label: "Utility Rates",
    headline: "The current path keeps moving.",
    copy: "Frame the utility as the comparison point. The bill is not fixed, and the homeowner does not control what the power company charges next.",
    proof: ["Rate history", "Future exposure", "No control"],
  },
  {
    id: "delivery-charges",
    number: "03",
    label: "Delivery Charges",
    headline: "They are not just paying for power.",
    copy: "Separate energy usage from delivery and utility fees so the customer sees where the bill is really coming from.",
    proof: ["Energy", "Delivery", "Fees"],
  },
  {
    id: "batteries",
    number: "04",
    label: "Batteries",
    headline: "Backup power changes the conversation.",
    copy: "Show the battery as protection, control, and future-proofing, especially when the home needs stability during outages or peak-rate windows.",
    proof: ["Backup", "Peak control", "Resilience"],
  },
  {
    id: "incentives",
    number: "05",
    label: "Incentives",
    headline: "Use the available programs while they exist.",
    copy: "Make incentives feel concrete and time-sensitive without overpromising. The homeowner should understand what helps the project pencil.",
    proof: ["Federal credit", "Local programs", "Timing"],
  },
  {
    id: "design",
    number: "06",
    label: "Design",
    headline: "The system is built around this home.",
    copy: "Move from concept to custom design. Roof planes, usage, sunlight, and the homeowner's goals all shape the recommendation.",
    proof: ["Roof fit", "Production", "Offset"],
  },
  {
    id: "bill-analysis",
    number: "07",
    label: "Bill Analysis",
    headline: "Turn the current bill into the baseline.",
    copy: "Walk through usage, seasonal spikes, and current monthly cost so the homeowner sees the real before-and-after comparison.",
    proof: ["Usage", "Average cost", "Seasonality"],
  },
  {
    id: "proposal",
    number: "08",
    label: "Proposal",
    headline: "Bring the recommendation into one clear view.",
    copy: "Present the plan cleanly: system, payment, savings, and what changes after install. The customer should not feel buried in details.",
    proof: ["System", "Payment", "Savings"],
  },
  {
    id: "rate-protection",
    number: "09",
    label: "Rate Protection",
    headline: "The value is control over time.",
    copy: "Tie the proposal back to the utility path. Solar is not only about today's bill; it is about reducing exposure to future increases.",
    proof: ["Predictability", "Control", "Long-term spread"],
  },
  {
    id: "warranties",
    number: "10",
    label: "Warranties",
    headline: "The protection needs to be simple.",
    copy: "Cover what is backed, who handles it, and how the homeowner gets help after the project is installed.",
    proof: ["Panels", "Roof work", "Service"],
  },
  {
    id: "installation-process",
    number: "11",
    label: "Installation Process",
    headline: "Make the next few weeks feel predictable.",
    copy: "Show the path from agreement to permission to operate so the customer knows what happens after saying yes.",
    proof: ["Survey", "Permits", "Install"],
  },
  {
    id: "qualifications",
    number: "12",
    label: "Qualifications",
    headline: "Confirm the home and customer qualify.",
    copy: "Use this as the calm checkpoint: roof, utility, credit, ownership, and any final details that determine whether the plan can move forward.",
    proof: ["Home fit", "Utility fit", "Approval"],
  },
  {
    id: "next-steps",
    number: "13",
    label: "Next Steps",
    headline: "If it qualifies and saves, move forward.",
    copy: "Finish with a clean decision frame. Confirm the advantage, answer the final concern, and move the project into the next step.",
    proof: ["Approve plan", "Site survey", "Install path"],
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
          <a href="#next-steps" className="pitch-start">
            <span />
            Next Step
          </a>
          <a href="#chapters" className="pitch-menu" aria-label="Presentation menu">
            <span />
            <span />
          </a>
        </div>
      </header>

      <aside className="pitch-side-nav" aria-label="Close presentation menu">
        <div className="pitch-side-nav-inner">
          <p>Close Menu</p>
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
        </div>
      </aside>

      <section className="pitch-hero">
        <div className="pitch-sky" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="pitch-hero-main reveal visible">
          <h1>
            Solar Close Built For <span>Homeowners</span>
          </h1>
          <p>A live iPad presentation for walking the customer from bill pressure to a clear solar decision.</p>
        </div>
        <p className="pitch-hero-note reveal visible">
          Flow through the close in order: trust, utility pressure, design, proposal, protection, and next step.
          No clutter on screen.
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

      <section className="pitch-visual" aria-label="Solar home energy landscape">
        <div className="pitch-orbit" />
        <div className="pitch-sun" />
        <div className="pitch-panel-grid pitch-panel-grid-a" />
        <div className="pitch-panel-grid pitch-panel-grid-b" />
        <div className="pitch-house" />
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
          background:
            linear-gradient(180deg, rgba(255, 247, 224, 0.84), rgba(239, 214, 174, 0.78) 34%, rgba(197, 221, 205, 0.66) 70%, rgba(19, 56, 68, 0.96) 100%),
            repeating-linear-gradient(112deg, rgba(23, 72, 87, 0.07) 0 2px, transparent 2px 54px),
            #f3dfbc;
          color: #153342;
          --cream: #f5e2bf;
          --sand: #f8ecd4;
          --ink: #153342;
          --ink-soft: rgba(21, 51, 66, 0.72);
          --solar: #f3b338;
          --solar-bright: #ffd973;
          --leaf: #2d8a78;
          --panel: #173e51;
          --line: rgba(21, 51, 66, 0.17);
        }

        .pitch-progress {
          position: fixed;
          inset: 0 auto auto 0;
          z-index: 300;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--solar), var(--leaf), var(--panel));
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
          background: rgba(248, 236, 212, 0.84);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .pitch-side-nav {
          position: fixed;
          left: clamp(14px, 2vw, 28px);
          top: 116px;
          z-index: 150;
          width: 224px;
          max-height: calc(100svh - 142px);
          padding: 10px;
          border: 1px solid rgba(21, 51, 66, 0.16);
          border-radius: 6px;
          background: rgba(248, 236, 212, 0.86);
          box-shadow: 0 28px 80px rgba(21, 51, 66, 0.14);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .pitch-side-nav-inner {
          max-height: calc(100svh - 164px);
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(21, 51, 66, 0.32) transparent;
        }

        .pitch-side-nav p {
          margin: 2px 8px 10px;
          color: rgba(21, 51, 66, 0.58);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pitch-side-nav a {
          min-height: 40px;
          display: grid;
          grid-template-columns: 32px minmax(0, 1fr);
          align-items: center;
          gap: 8px;
          padding: 7px 8px;
          border-radius: 4px;
          color: rgba(21, 51, 66, 0.7);
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }

        .pitch-side-nav a + a {
          margin-top: 2px;
        }

        .pitch-side-nav a.active,
        .pitch-side-nav a:hover {
          background: rgba(255, 217, 115, 0.58);
          color: var(--ink);
          transform: translateX(2px);
        }

        .pitch-side-nav span {
          width: 28px;
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          border: 1px solid rgba(21, 51, 66, 0.16);
          border-radius: 50%;
          font-size: 10px;
          font-weight: 800;
        }

        .pitch-side-nav strong {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0;
        }

        .pitch-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: clamp(15px, 2.4vw, 24px);
          font-weight: 800;
          letter-spacing: 0;
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
            radial-gradient(circle at center, var(--solar) 0 23%, transparent 24%);
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
          border: 1px solid rgba(21, 51, 66, 0.1);
          background: var(--solar-bright);
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
          border-radius: 999px;
          background: var(--ink);
        }

        .pitch-menu span {
          width: 22px;
          height: 2px;
          display: block;
          background: var(--sand);
        }

        .pitch-hero {
          position: relative;
          min-height: 520px;
          padding: clamp(136px, 16vw, 174px) clamp(22px, 4vw, 80px) clamp(104px, 12vw, 156px) clamp(270px, 24vw, 340px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 380px);
          gap: clamp(30px, 8vw, 110px);
          align-items: start;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background:
            radial-gradient(circle at 18% 18%, rgba(255, 217, 115, 0.72) 0 9%, transparent 10%),
            linear-gradient(180deg, rgba(143, 197, 212, 0.56), rgba(248, 236, 212, 0.78) 56%, rgba(245, 226, 191, 0.98));
        }

        .pitch-hero::after {
          content: "";
          position: absolute;
          left: -8%;
          right: -8%;
          bottom: -86px;
          height: 190px;
          background:
            repeating-linear-gradient(101deg, rgba(21, 51, 66, 0.82) 0 18px, rgba(31, 83, 99, 0.94) 18px 24px, rgba(255,255,255,0.18) 24px 27px, rgba(21,51,66,0.76) 27px 58px),
            #173e51;
          transform: rotate(-3deg);
          box-shadow: 0 -28px 80px rgba(21, 51, 66, 0.13);
        }

        .pitch-sky {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .pitch-sky span {
          position: absolute;
          left: 15%;
          top: 20%;
          width: 72vw;
          height: 2px;
          background: rgba(21, 51, 66, 0.16);
          transform-origin: left center;
        }

        .pitch-sky span:nth-child(1) { transform: rotate(13deg); }
        .pitch-sky span:nth-child(2) { transform: rotate(22deg); top: 25%; opacity: 0.6; }
        .pitch-sky span:nth-child(3) { transform: rotate(31deg); top: 30%; opacity: 0.38; }

        .pitch-hero-main,
        .pitch-hero-note {
          position: relative;
          z-index: 2;
        }

        .pitch-hero-main h1 {
          max-width: 1040px;
          margin: 0;
          color: var(--ink);
          font-family: var(--font-display);
          font-size: clamp(58px, 7.8vw, 118px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 0.9;
        }

        .pitch-hero-main h1 span {
          display: inline-block;
          padding: 0 10px 6px;
          background: rgba(255, 217, 115, 0.42);
          outline: 5px solid var(--solar);
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
          letter-spacing: 0;
        }

        .pitch-hero-note {
          margin-top: 8px;
          max-width: 380px;
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.45;
        }

        .pitch-chapters {
          position: sticky;
          top: 90px;
          z-index: 120;
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          background: var(--solar-bright);
          border-bottom: 1px solid rgba(21, 51, 66, 0.16);
          padding-left: clamp(260px, 23vw, 330px);
          scrollbar-width: thin;
        }

        .pitch-chapters a {
          flex: 0 0 clamp(170px, 18vw, 240px);
          min-height: 76px;
          display: grid;
          align-content: center;
          gap: 14px;
          padding: 16px clamp(18px, 3vw, 48px);
          color: var(--ink);
          border-right: 1px solid rgba(21, 51, 66, 0.14);
          scroll-snap-align: start;
          transition: background 0.2s ease;
        }

        .pitch-chapters a.active,
        .pitch-chapters a:hover {
          background: rgba(255, 255, 255, 0.26);
        }

        .pitch-chapters span {
          font-size: 15px;
          color: rgba(21, 51, 66, 0.8);
        }

        .pitch-chapters strong {
          font-size: clamp(14px, 1.5vw, 18px);
          font-weight: 500;
        }

        .pitch-chapters strong::before {
          content: ". ";
        }

        .pitch-visual {
          position: relative;
          min-height: min(660px, 60vw);
          margin-left: clamp(236px, 21vw, 300px);
          overflow: hidden;
          background:
            radial-gradient(circle at 20% 18%, rgba(255, 226, 132, 0.96) 0 10%, rgba(255, 226, 132, 0.24) 11% 21%, transparent 22%),
            linear-gradient(180deg, #89bfd0 0%, #f4d49a 42%, #d5c47a 61%, #337f72 100%);
        }

        .pitch-visual::before {
          content: "";
          position: absolute;
          inset: 44% -8% auto;
          height: 36%;
          background:
            repeating-linear-gradient(94deg, rgba(21, 51, 66, 0.86) 0 24px, rgba(30, 77, 94, 0.96) 24px 31px, rgba(255,255,255,0.16) 31px 34px, rgba(21,51,66,0.88) 34px 76px),
            var(--panel);
          transform: rotate(-4deg);
          box-shadow: 0 -24px 70px rgba(21, 51, 66, 0.18);
        }

        .pitch-orbit {
          position: absolute;
          left: 11%;
          top: 12%;
          width: 25vw;
          aspect-ratio: 1;
          border-radius: 50%;
          border: 1px solid rgba(255, 247, 224, 0.72);
          box-shadow: 0 0 0 28px rgba(255, 217, 115, 0.16), 0 0 120px rgba(255, 217, 115, 0.42);
        }

        .pitch-sun {
          position: absolute;
          left: 6%;
          top: 8%;
          width: 20vw;
          aspect-ratio: 1;
          border-radius: 50%;
          background:
            radial-gradient(circle at 38% 36%, #fff7d9 0 13%, transparent 14%),
            radial-gradient(circle at center, #ffd973 0 50%, #f3b338 51% 100%);
          opacity: 0.96;
          box-shadow: 0 26px 90px rgba(242, 181, 61, 0.42);
        }

        .pitch-panel-grid {
          position: absolute;
          width: 31vw;
          aspect-ratio: 1.2;
          border-radius: 6px;
          background:
            repeating-linear-gradient(0deg, rgba(244, 228, 204, 0.16) 0 2px, transparent 2px 36px),
            repeating-linear-gradient(90deg, rgba(244, 228, 204, 0.2) 0 2px, transparent 2px 52px),
            #143342;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.25);
        }

        .pitch-panel-grid-a {
          right: 10%;
          top: 20%;
          transform: rotate(8deg);
        }

        .pitch-panel-grid-b {
          right: 38%;
          bottom: 10%;
          width: 26vw;
          transform: rotate(-8deg);
        }

        .pitch-house {
          position: absolute;
          right: 9%;
          bottom: 7%;
          width: 22vw;
          aspect-ratio: 1.35;
          background:
            linear-gradient(135deg, transparent 0 34%, #f7ead5 35% 48%, transparent 49%),
            linear-gradient(225deg, transparent 0 34%, #f7ead5 35% 48%, transparent 49%),
            linear-gradient(#f7ead5, #e2c083);
          clip-path: polygon(10% 47%, 50% 10%, 90% 47%, 84% 47%, 84% 92%, 16% 92%, 16% 47%);
          filter: drop-shadow(0 28px 48px rgba(21, 51, 66, 0.28));
        }

        .pitch-home-card {
          position: absolute;
          left: clamp(22px, 4vw, 80px);
          bottom: clamp(22px, 4vw, 52px);
          min-width: min(420px, calc(100% - 44px));
          padding: 26px;
          border: 1px solid rgba(255, 255, 255, 0.46);
          border-radius: 6px;
          background: rgba(248, 236, 212, 0.8);
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
          letter-spacing: 0;
        }

        .pitch-sections {
          position: relative;
          display: grid;
          margin-left: clamp(236px, 21vw, 300px);
          background:
            linear-gradient(90deg, transparent calc(50% - 1px), rgba(21, 51, 66, 0.16) calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px)),
            linear-gradient(180deg, var(--cream), #f3dfbc);
        }

        .pitch-sections::before {
          content: "";
          position: sticky;
          top: 174px;
          z-index: 4;
          width: 13px;
          height: 13px;
          margin-left: calc(50% - 6px);
          border-radius: 50%;
          background: var(--solar);
          box-shadow: 0 0 0 9px rgba(243, 179, 56, 0.18);
        }

        .pitch-section {
          position: relative;
          z-index: 2;
          min-height: min(820px, 92svh);
          scroll-margin-top: 184px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(290px, 0.56fr);
          gap: clamp(26px, 6vw, 80px);
          align-items: center;
          padding: clamp(70px, 10vw, 132px) clamp(22px, 4vw, 72px);
          border-bottom: 1px solid rgba(21, 51, 66, 0.1);
          background:
            radial-gradient(circle at 8% 18%, rgba(255, 217, 115, 0.17), transparent 28%),
            linear-gradient(180deg, rgba(245, 226, 191, 0.84), rgba(248, 236, 212, 0.9));
        }

        .pitch-section:nth-child(even) {
          background:
            radial-gradient(circle at 90% 20%, rgba(45, 138, 120, 0.17), transparent 28%),
            linear-gradient(180deg, rgba(236, 209, 159, 0.92), rgba(245, 226, 191, 0.9));
        }

        .pitch-section::before {
          content: "";
          position: absolute;
          left: calc(50% - 12px);
          top: 50%;
          width: 24px;
          height: 24px;
          border: 3px solid var(--solar);
          border-radius: 50%;
          background: var(--sand);
          box-shadow: 0 0 0 10px rgba(243, 179, 56, 0.16);
        }

        .pitch-section-copy p,
        .pitch-close p {
          margin: 0 0 24px;
          color: rgba(21, 51, 66, 0.74);
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
          letter-spacing: 0;
          line-height: 0.92;
        }

        .pitch-section-copy span {
          display: block;
          max-width: 620px;
          margin-top: 28px;
          color: var(--ink-soft);
          font-size: clamp(17px, 2vw, 22px);
          line-height: 1.48;
          letter-spacing: 0;
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
          border: 1px solid rgba(21, 51, 66, 0.18);
          border-radius: 6px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12)),
            repeating-linear-gradient(90deg, transparent 0 26px, rgba(21, 51, 66, 0.05) 26px 28px);
        }

        .pitch-proof small {
          color: rgba(21, 51, 66, 0.55);
          font-size: 13px;
        }

        .pitch-proof strong {
          font-family: var(--font-display);
          color: var(--ink);
          font-size: clamp(30px, 3.7vw, 48px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .pitch-close {
          margin-left: clamp(236px, 21vw, 300px);
          padding: clamp(70px, 10vw, 132px) clamp(22px, 4vw, 80px);
          background:
            radial-gradient(circle at 18% 0%, rgba(255, 217, 115, 0.18), transparent 30%),
            linear-gradient(180deg, #153342, #0c222c);
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
          border: 1px solid rgba(245, 226, 191, 0.18);
          border-radius: 6px;
          background: rgba(245, 226, 191, 0.06);
        }

        .pitch-close-grid span {
          color: rgba(245, 226, 191, 0.66);
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
          letter-spacing: 0;
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

        @media (max-width: 1100px) {
          .pitch-side-nav {
            display: none;
          }

          .pitch-hero {
            padding-left: clamp(22px, 4vw, 80px);
          }

          .pitch-chapters {
            padding-left: 0;
          }

          .pitch-visual,
          .pitch-sections,
          .pitch-close {
            margin-left: 0;
          }
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
            top: 82px;
          }

          .pitch-chapters a {
            min-width: 42vw;
            scroll-snap-align: start;
          }

          .pitch-visual {
            min-height: 520px;
          }

          .pitch-orbit {
            width: 48vw;
          }

          .pitch-sun {
            width: 34vw;
          }

          .pitch-panel-grid {
            width: 48vw;
          }

          .pitch-panel-grid-b {
            width: 42vw;
          }

          .pitch-house {
            width: 32vw;
          }

          .pitch-section {
            min-height: auto;
            grid-template-columns: 1fr;
          }

          .pitch-section::before,
          .pitch-sections::before {
            display: none;
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
