"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const chapters = [
  {
    id: "why-sunrun",
    number: "01",
    label: "Why Sunrun",
    headline: "Start with the company behind the home.",
    caption: "Sunrun reports $1.3B+ in customer savings and 659,000+ outage events powered through.",
    visual: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1400&q=82",
    frame: "Trust first.",
    talk: "This is not just panels. It is the company, service path, monitoring, and long-term energy plan.",
    bridge: "Then compare that against the utility path they already pay.",
    proof: [
      { label: "$1.3B", detail: "Customer savings." },
      { label: "659K+", detail: "Outages backed up." },
      { label: "32.4B kWh", detail: "Solar generated." },
    ],
  },
  {
    id: "utility-rates",
    number: "02",
    label: "Utility Rates",
    headline: "The utility bill is the competitor.",
    caption: "Average residential rates climbed from 15.0c/kWh in 2012 to 45.0c/kWh in 2024.",
    visual: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=82",
    frame: "The bill moves.",
    talk: "Even with the recent pullback, the long-term path is still sharply higher than where homeowners started.",
    bridge: "Now break the bill into energy, delivery, and fees.",
    proof: [
      { label: "+200%", detail: "2012 to 2024." },
      { label: "45.0c", detail: "2024 peak." },
      { label: "3X", detail: "Starting rate." },
    ],
  },
  {
    id: "delivery-charges",
    number: "03",
    label: "Delivery Charges",
    headline: "They pay for power and the pipeline.",
    caption: "Grid upkeep, transmission, distribution, taxes, and riders can stack beyond usage.",
    visual: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1400&q=82",
    frame: "Show the layers.",
    talk: "Point at supply, delivery, taxes, riders, and extra bill lines.",
    bridge: "Then show how batteries add another layer of control.",
    proof: [
      { label: "Usage", detail: "What they use." },
      { label: "Delivery", detail: "How it arrives." },
      { label: "Fees", detail: "What stacks." },
    ],
  },
  {
    id: "batteries",
    number: "04",
    label: "Batteries",
    headline: "Batteries make solar feel like control.",
    caption: "Sunrun: use more of your own energy and less of the utility's.",
    visual: "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=1400&q=82",
    frame: "Control the home.",
    talk: "Battery storage changes the close from bill savings to comfort, backup, and independence.",
    bridge: "Now show the timing window created by incentives.",
    proof: [
      { label: "Backup", detail: "Essentials on." },
      { label: "Storage", detail: "Use more solar." },
      { label: "Ready", detail: "Rates and outages." },
    ],
  },
  {
    id: "incentives",
    number: "05",
    label: "Incentives",
    headline: "Incentives create the timing window.",
    caption: "If they qualify, available programs can improve the move-now logic.",
    visual: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=82",
    frame: "Verify eligibility.",
    talk: "Explain credits and programs cleanly without overpromising.",
    bridge: "Then move from market opportunity to their exact home design.",
    proof: [
      { label: "Federal", detail: "Eligibility based." },
      { label: "Local", detail: "Market specific." },
      { label: "Timing", detail: "Rules change." },
    ],
  },
  {
    id: "design",
    number: "06",
    label: "Design",
    headline: "Now it becomes their home.",
    caption: "The roof, shade, usage, and battery fit make the plan personal.",
    visual: "https://images.unsplash.com/photo-1655300283246-1ef0317a565d?auto=format&fit=crop&w=1400&q=82",
    frame: "Custom design.",
    talk: "Show why panels go where they go and what the system is built to offset.",
    bridge: "Then use their actual bill as the baseline.",
    proof: [
      { label: "Roof Fit", detail: "Placement." },
      { label: "Production", detail: "Offset target." },
      { label: "Goals", detail: "Savings + backup." },
    ],
  },
  {
    id: "bill-analysis",
    number: "07",
    label: "Bill Analysis",
    headline: "The bill becomes the baseline.",
    caption: "Current monthly average. High months. Annual spend.",
    visual: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1400&q=82",
    frame: "Turn pain into math.",
    talk: "Show what they pay now before showing the solar payment.",
    bridge: "Now the proposal becomes the alternative path.",
    proof: [
      { label: "Average", detail: "Simple compare." },
      { label: "Annual", detail: "Full-year cost." },
      { label: "Spikes", detail: "Pain months." },
    ],
  },
  {
    id: "proposal",
    number: "08",
    label: "Proposal",
    headline: "The proposal frames the decision.",
    caption: "Current utility path versus the recommended solar path.",
    visual: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=82",
    frame: "Make it obvious.",
    talk: "Show system, production, payment, savings, and protection in that order.",
    bridge: "Then zoom out to long-term rate protection.",
    proof: [
      { label: "System", detail: "What fits." },
      { label: "Payment", detail: "Monthly compare." },
      { label: "Value", detail: "Over time." },
    ],
  },
  {
    id: "rate-protection",
    number: "09",
    label: "Rate Protection",
    headline: "Control over time beats guessing.",
    caption: "Grid costs, outages, and peak demand are the pain. Home energy is the alternative.",
    visual: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?auto=format&fit=crop&w=1400&q=82",
    frame: "Reduce exposure.",
    talk: "The more rates move, the more control matters.",
    bridge: "Now remove fear with warranties and service.",
    proof: [
      { label: "Predictable", detail: "Clearer plan." },
      { label: "Protected", detail: "Less exposure." },
      { label: "Compounding", detail: "Years matter." },
    ],
  },
  {
    id: "warranties",
    number: "10",
    label: "Warranties",
    headline: "Protection removes the final fear.",
    caption: "What is covered, who handles it, and what happens after install.",
    visual: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=82",
    frame: "Answer the silent worry.",
    talk: "Explain coverage in plain English and keep the service path simple.",
    bridge: "Then show the process after today.",
    proof: [
      { label: "Equipment", detail: "Covered parts." },
      { label: "Workmanship", detail: "Install confidence." },
      { label: "Service", detail: "Who to call." },
    ],
  },
  {
    id: "installation-process",
    number: "11",
    label: "Installation Process",
    headline: "Predictability makes yes easier.",
    caption: "Survey. Design. Permits. Install. Inspection. Activation.",
    visual: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?auto=format&fit=crop&w=1400&q=82",
    frame: "Make it feel normal.",
    talk: "A big project becomes a clean sequence they do not have to manage alone.",
    bridge: "Now confirm the home and customer qualify.",
    proof: [
      { label: "Survey", detail: "Confirm home." },
      { label: "Permits", detail: "Approvals." },
      { label: "Activation", detail: "System on." },
    ],
  },
  {
    id: "qualifications",
    number: "12",
    label: "Qualifications",
    headline: "Confirm this can actually work.",
    caption: "Home fit, customer fit, project fit.",
    visual: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=82",
    frame: "Due diligence.",
    talk: "Check ownership, roof, utility, usage, approval, and final design.",
    bridge: "If it qualifies and makes sense, choose the next step.",
    proof: [
      { label: "Home", detail: "Roof + utility." },
      { label: "Customer", detail: "Approval fit." },
      { label: "Project", detail: "Solves enough." },
    ],
  },
  {
    id: "next-steps",
    number: "13",
    label: "Next Steps",
    headline: "End with a clear, calm decision.",
    caption: "If the plan qualifies, saves, and protects, start the project file.",
    visual: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=82",
    frame: "No new pitch.",
    talk: "Confirm the utility path, the design, the payment, and the next step.",
    bridge: "The presentation ends. The project begins.",
    proof: [
      { label: "Approve", detail: "Start file." },
      { label: "Survey", detail: "Verify home." },
      { label: "Install", detail: "Move forward." },
    ],
  },
];

const rateHistory = [
  { year: 2012, rate: 15.0 },
  { year: 2013, rate: 15.5 },
  { year: 2014, rate: 16.0 },
  { year: 2015, rate: 17.0 },
  { year: 2016, rate: 18.0 },
  { year: 2017, rate: 19.0 },
  { year: 2018, rate: 20.0 },
  { year: 2019, rate: 22.0 },
  { year: 2020, rate: 24.0 },
  { year: 2021, rate: 27.0 },
  { year: 2022, rate: 31.0 },
  { year: 2023, rate: 36.0 },
  { year: 2024, rate: 45.0 },
];

const rateMilestoneYears = new Set([2012, 2017, 2022, 2024]);
const maxRate = Math.max(...rateHistory.map((item) => item.rate));
const minRate = Math.min(...rateHistory.map((item) => item.rate));
const firstRate = rateHistory[0].rate;
const graphWidth = 1000;
const graphTop = 34;
const graphBottom = 252;
const rateGraphPoints = rateHistory.map((item, index) => {
  const x = (index / (rateHistory.length - 1)) * graphWidth;
  const y = graphBottom - ((item.rate - minRate) / (maxRate - minRate)) * (graphBottom - graphTop);
  return { ...item, x, y };
});
const fullRatePath = rateGraphPoints.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

const researchCards = [
  {
    source: "Sunrun Impact",
    quote: "Power through more than 659,000 outages",
    detail: "Sunrun says solar-plus-storage systems helped customers power through more than 659,000 outages.",
  },
  {
    source: "Sunrun Battery",
    quote: "Use more of your own energy",
    detail: "Battery storage lets homeowners use more stored solar before pulling from the grid.",
  },
  {
    source: "DOE Grid",
    quote: "Generated right where it is used",
    detail: "DOE describes distributed energy as power generated where it is used, with batteries helping when solar is not producing.",
  },
  {
    source: "EIA / FERC",
    quote: "The system is constantly challenged",
    detail: "2024 brought major outage hours, while retail electricity costs vary heavily by state and utility territory.",
  },
];

export default function PresentationPage() {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const [navOpen, setNavOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rateIndex, setRateIndex] = useState(rateHistory.length - 1);

  const activeIndex = useMemo(
    () => Math.max(0, chapters.findIndex((chapter) => chapter.id === activeChapter)),
    [activeChapter]
  );
  const selectedRate = rateHistory[rateIndex];
  const selectedRateIncrease = Math.round(((selectedRate.rate - firstRate) / firstRate) * 100);
  const selectedRatePath = useMemo(
    () => rateGraphPoints.slice(0, rateIndex + 1).map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" "),
    [rateIndex]
  );

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, (window.scrollY / maxScroll) * 100) : 0);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (window.innerWidth <= 1100) {
        return;
      }

      const distanceFromRight = window.innerWidth - event.clientX;

      if (distanceFromRight < 88) {
        setNavOpen(true);
      } else if (distanceFromRight > 380) {
        setNavOpen(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.hasAttribute("data-presentation-section")) {
              setActiveChapter(entry.target.id);
            }
          }
        });
      },
      { rootMargin: "-34% 0px -44% 0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((section) => {
      observer.observe(section);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="pitch">
      <div className="pitch-progress" style={{ transform: `scaleX(${progress / 100})` }} />

      <header className="pitch-header">
        <Link href="/" className="pitch-brand" aria-label="Renewable Acquisition home">
          <span>Renewable Acquisition</span>
        </Link>

        <div className="pitch-actions">
          <a href="#next-steps" className="pitch-start">
            <span />
            Next Step
          </a>
          <button
            className="pitch-menu"
            type="button"
            aria-label="Presentation menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="pitch-side-hotzone" aria-hidden="true" onMouseEnter={() => setNavOpen(true)} />

      <aside
        className={`pitch-side-nav${navOpen ? " open" : ""}`}
        aria-label="Close presentation menu"
        onMouseEnter={() => setNavOpen(true)}
        onMouseLeave={() => setNavOpen(false)}
      >
        <div className="pitch-side-nav-inner">
          <p>Close Menu</p>
          {chapters.map((chapter) => (
            <a
              href={`#${chapter.id}`}
              key={chapter.id}
              className={chapter.id === activeChapter ? "active" : ""}
              onClick={() => setNavOpen(false)}
            >
              <span>{chapter.number}</span>
              <strong>{chapter.label}</strong>
            </a>
          ))}
        </div>
      </aside>

      <section className="pitch-hero">
        <div className="pitch-hero-photo" aria-hidden="true" />
        <div className="pitch-sky" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="pitch-hero-main reveal visible">
          <h1>
            Home Solar Close <span>Built On Proof</span>
          </h1>
          <p>A live iPad close that shows the homeowner the roof, the bill, the grid problem, and why Sunrun solar plus storage is the alternative.</p>
        </div>
        <p className="pitch-hero-note reveal visible">
          Real research. Real pain points. Quick captions.
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

      <section className="pitch-research reveal" aria-label="Solar and grid research">
        <div className="pitch-research-copy">
          <p>Research Frame</p>
          <h2>The grid is the pain. The home is the opportunity.</h2>
        </div>
        <div className="pitch-research-grid">
          {researchCards.map((card) => (
            <div key={card.source}>
              <small>{card.source}</small>
              <strong>{card.quote}</strong>
              <span>{card.detail}</span>
            </div>
          ))}
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
            <figure className="pitch-section-visual">
              <div
                className="pitch-section-image"
                role="img"
                aria-label={`${chapter.label} solar close visual`}
                style={{ backgroundImage: `url(${chapter.visual})` }}
              />
              <figcaption>
                <span>{chapter.number}</span>
                {chapter.caption}
              </figcaption>
            </figure>

            <div className="pitch-section-copy">
              <p>{chapter.number} · {chapter.label}</p>
              <h2>{chapter.headline}</h2>
              <div className="pitch-section-body">
                <div>
                  <small>Homeowner Frame</small>
                  <strong>{chapter.frame}</strong>
                </div>
                <div>
                  <small>Talk Track</small>
                  <strong>{chapter.talk}</strong>
                </div>
                <div className="pitch-bridge">
                  <small>Bridge</small>
                  <strong>{chapter.bridge}</strong>
                </div>
              </div>
            </div>

            <div className="pitch-proof">
              {chapter.proof.map((item, index) => (
                <div key={item.label}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>

            {chapter.id === "utility-rates" ? (
              <div className="pitch-rate-history" aria-label="Sliding average residential electric rate graph from 2012 to 2024">
                <div className="pitch-rate-history-head">
                  <div>
                    <small>Approx. Average Residential Rate</small>
                    <strong>Rates breaking away</strong>
                  </div>
                  <div>
                    <span>{selectedRate.rate.toFixed(1)}c</span>
                    <small>{selectedRate.year} average</small>
                  </div>
                </div>

                <div className="pitch-rate-graph">
                  <svg viewBox="0 0 1000 320" role="img" aria-label={`Residential rate increased from 15.0 cents in 2012 to ${selectedRate.rate.toFixed(1)} cents in ${selectedRate.year}`}>
                    <defs>
                      <linearGradient id="rateSurgeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop offset="0%" stopColor="#2d8a78" />
                        <stop offset="52%" stopColor="#f3b338" />
                        <stop offset="100%" stopColor="#d8441f" />
                      </linearGradient>
                    </defs>
                    <path className="pitch-rate-grid-line" d="M 0 252 L 1000 252" />
                    <path className="pitch-rate-grid-line" d="M 0 143 L 1000 143" />
                    <path className="pitch-rate-grid-line" d="M 0 34 L 1000 34" />
                    <path className="pitch-rate-path-base" d={fullRatePath} />
                    <path className="pitch-rate-path-live" d={selectedRatePath} />
                    {rateGraphPoints.map((point, index) => (
                      <g key={point.year}>
                        <circle
                          className={index <= rateIndex ? "pitch-rate-dot active" : "pitch-rate-dot"}
                          cx={point.x}
                          cy={point.y}
                          r={index === rateIndex ? 10 : 6}
                        />
                        {rateMilestoneYears.has(point.year) ? (
                          <text x={Math.min(Math.max(point.x, 40), 960)} y="296" className="pitch-rate-year">
                            {point.year}
                          </text>
                        ) : null}
                        {index === rateIndex ? (
                          <text x={Math.min(point.x + 20, 830)} y={Math.max(point.y - 18, 28)} className="pitch-rate-label">
                            {point.year} - {point.rate.toFixed(1)}c/kWh
                          </text>
                        ) : null}
                      </g>
                    ))}
                  </svg>
                  <div className="pitch-rate-callout">
                    <small>2012 to {selectedRate.year}</small>
                    <strong>{selectedRateIncrease}%</strong>
                    <span>increase from starting rate</span>
                  </div>
                </div>

                <div className="pitch-rate-slider">
                  <span>{rateHistory[0].year}</span>
                  <input
                    aria-label="Select electric rate year"
                    max={rateHistory.length - 1}
                    min={0}
                    onChange={(event) => setRateIndex(Number(event.target.value))}
                    step={1}
                    type="range"
                    value={rateIndex}
                  />
                  <span>{rateHistory[rateHistory.length - 1].year}</span>
                </div>
              </div>
            ) : null}
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
          right: clamp(12px, 1.8vw, 24px);
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
          opacity: 0;
          pointer-events: none;
          transform: translateX(calc(100% + 28px));
          transition: opacity 0.2s ease, transform 0.28s ease;
        }

        .pitch-side-nav.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }

        .pitch-side-hotzone {
          position: fixed;
          top: 92px;
          right: 0;
          bottom: 0;
          z-index: 140;
          width: 42px;
          pointer-events: auto;
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
          transform: translateX(-2px);
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
          gap: 0;
          color: var(--ink);
          font-family: var(--font-body);
          font-size: clamp(15px, 2.4vw, 24px);
          font-weight: 800;
          letter-spacing: 0;
          text-transform: uppercase;
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
          border: 0;
          background: var(--ink);
          cursor: pointer;
        }

        .pitch-menu span {
          width: 22px;
          height: 2px;
          display: block;
          background: var(--sand);
        }

        .pitch-hero {
          position: relative;
          min-height: 640px;
          padding: clamp(136px, 16vw, 174px) clamp(22px, 4vw, 80px) clamp(104px, 12vw, 156px);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(260px, 380px);
          gap: clamp(30px, 8vw, 110px);
          align-items: start;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
          background:
            linear-gradient(90deg, rgba(245, 226, 191, 0.98) 0 42%, rgba(245, 226, 191, 0.78) 58%, rgba(21, 51, 66, 0.18) 100%),
            linear-gradient(180deg, rgba(143, 197, 212, 0.36), rgba(248, 236, 212, 0.62) 56%, rgba(245, 226, 191, 0.98));
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

        .pitch-hero-photo {
          position: absolute;
          inset: 90px 0 0 auto;
          width: min(58vw, 920px);
          background:
            linear-gradient(90deg, rgba(245, 226, 191, 0.42), rgba(21, 51, 66, 0.12) 35%, rgba(21, 51, 66, 0.38)),
            url("https://images.unsplash.com/photo-1655300283246-1ef0317a565d?auto=format&fit=crop&w=1800&q=84");
          background-position: center;
          background-size: cover;
          filter: saturate(1.04) contrast(1.02);
        }

        .pitch-hero-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, transparent 0 64%, rgba(21, 51, 66, 0.62)),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 64px);
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
          max-width: 980px;
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
          padding: 18px;
          border: 1px solid rgba(21, 51, 66, 0.14);
          border-radius: 6px;
          background: rgba(248, 236, 212, 0.72);
          backdrop-filter: blur(10px);
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

        .pitch-research {
          display: grid;
          grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          gap: clamp(24px, 5vw, 72px);
          padding: clamp(62px, 8vw, 104px) clamp(22px, 4vw, 72px);
          background:
            linear-gradient(135deg, rgba(21, 51, 66, 0.96), rgba(18, 71, 74, 0.92)),
            #153342;
          color: var(--cream);
        }

        .pitch-research-copy p {
          margin: 0 0 20px;
          color: rgba(255, 217, 115, 0.82);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .pitch-research-copy h2 {
          max-width: 560px;
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(44px, 5.4vw, 86px);
          line-height: 0.92;
          letter-spacing: 0;
        }

        .pitch-research-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .pitch-research-grid div {
          min-height: 190px;
          display: grid;
          align-content: space-between;
          gap: 16px;
          padding: 22px;
          border: 1px solid rgba(245, 226, 191, 0.18);
          border-radius: 6px;
          background:
            linear-gradient(135deg, rgba(255, 217, 115, 0.12), rgba(245, 226, 191, 0.04)),
            rgba(245, 226, 191, 0.06);
        }

        .pitch-research-grid small {
          color: rgba(245, 226, 191, 0.62);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .pitch-research-grid strong {
          color: var(--solar-bright);
          font-family: var(--font-display);
          font-size: clamp(34px, 4vw, 58px);
          line-height: 0.95;
          letter-spacing: 0;
        }

        .pitch-research-grid span {
          color: rgba(245, 226, 191, 0.76);
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 650;
          line-height: 1.34;
          letter-spacing: 0;
        }

        .pitch-sections {
          position: relative;
          display: grid;
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
          min-height: min(860px, 96svh);
          scroll-margin-top: 184px;
          display: grid;
          grid-template-columns: minmax(0, 0.58fr) minmax(320px, 0.42fr);
          gap: clamp(18px, 3.8vw, 52px);
          align-items: center;
          padding: clamp(64px, 8vw, 104px) clamp(22px, 4vw, 72px);
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
          left: clamp(22px, 4vw, 72px);
          top: 50%;
          width: 24px;
          height: 24px;
          border: 3px solid var(--solar);
          border-radius: 50%;
          background: var(--sand);
          box-shadow: 0 0 0 10px rgba(243, 179, 56, 0.16);
        }

        .pitch-section::after {
          content: "";
          position: absolute;
          left: calc(clamp(22px, 4vw, 72px) + 11px);
          top: calc(50% + 28px);
          bottom: -1px;
          width: 2px;
          background: linear-gradient(180deg, rgba(243, 179, 56, 0.52), rgba(21, 51, 66, 0));
        }

        .pitch-section-visual {
          position: relative;
          min-height: clamp(430px, 54vw, 660px);
          margin: 0;
          overflow: hidden;
          border: 1px solid rgba(21, 51, 66, 0.16);
          border-radius: 6px;
          background: #173e51;
          box-shadow: 0 34px 90px rgba(21, 51, 66, 0.18);
        }

        .pitch-section-visual::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(21, 51, 66, 0.02), rgba(21, 51, 66, 0.68)),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 54px);
          pointer-events: none;
        }

        .pitch-section-image {
          width: 100%;
          height: 100%;
          min-height: inherit;
          display: block;
          background-position: center;
          background-size: cover;
          filter: saturate(1.05) contrast(1.02);
        }

        .pitch-section-visual figcaption {
          position: absolute;
          left: clamp(18px, 3vw, 32px);
          right: clamp(18px, 3vw, 32px);
          bottom: clamp(18px, 3vw, 32px);
          z-index: 2;
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          align-items: center;
          gap: 16px;
          color: #f8ecd4;
          font-size: clamp(20px, 2.4vw, 34px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: 0;
          text-shadow: 0 12px 30px rgba(0, 0, 0, 0.42);
        }

        .pitch-section-visual figcaption span {
          width: 58px;
          aspect-ratio: 1;
          display: grid;
          place-items: center;
          border: 1px solid rgba(248, 236, 212, 0.58);
          border-radius: 50%;
          background: rgba(21, 51, 66, 0.36);
          color: var(--solar-bright);
          font-size: 16px;
          text-shadow: none;
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
          max-width: 720px;
          margin: 0;
          color: var(--ink);
          font-family: var(--font-display);
          font-size: clamp(42px, 5.2vw, 82px);
          font-weight: 700;
          letter-spacing: 0;
          line-height: 0.92;
        }

        .pitch-section-body {
          max-width: 620px;
          margin-top: clamp(22px, 3vw, 34px);
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .pitch-section-body div {
          min-height: auto;
          display: grid;
          align-content: start;
          gap: 8px;
          padding: 16px 18px;
          border: 1px solid rgba(21, 51, 66, 0.15);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.2);
        }

        .pitch-section-body .pitch-bridge {
          min-height: auto;
          background:
            linear-gradient(90deg, rgba(255, 217, 115, 0.42), rgba(45, 138, 120, 0.12)),
            rgba(255, 255, 255, 0.14);
        }

        .pitch-section-body small {
          color: rgba(21, 51, 66, 0.62);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pitch-section-body strong {
          color: rgba(21, 51, 66, 0.82);
          font-size: clamp(15px, 1.35vw, 18px);
          font-weight: 750;
          line-height: 1.28;
          letter-spacing: 0;
        }

        .pitch-proof {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .pitch-proof div {
          min-height: 118px;
          display: grid;
          align-content: start;
          gap: 8px;
          padding: 18px 20px;
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
          font-size: clamp(28px, 2.8vw, 40px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .pitch-proof span {
          display: block;
          max-width: 320px;
          color: rgba(21, 51, 66, 0.66);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.22;
          letter-spacing: 0;
        }

        .pitch-rate-history {
          grid-column: 1 / -1;
          display: grid;
          gap: 22px;
          padding: clamp(18px, 3vw, 30px);
          border: 1px solid rgba(21, 51, 66, 0.18);
          border-radius: 6px;
          background:
            radial-gradient(circle at 92% 12%, rgba(216, 68, 31, 0.24), transparent 26%),
            linear-gradient(135deg, rgba(255, 217, 115, 0.52), rgba(216, 68, 31, 0.16) 58%, rgba(45, 138, 120, 0.12)),
            rgba(255, 255, 255, 0.18);
        }

        .pitch-rate-history-head {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 18px;
        }

        .pitch-rate-history-head small {
          color: rgba(21, 51, 66, 0.58);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .pitch-rate-history-head strong,
        .pitch-rate-history-head span {
          display: block;
          color: var(--ink);
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 58px);
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: 0;
        }

        .pitch-rate-history-head div:last-child {
          text-align: right;
        }

        .pitch-rate-graph {
          position: relative;
          min-height: 290px;
          overflow: hidden;
          border: 1px solid rgba(21, 51, 66, 0.13);
          border-radius: 6px;
          background:
            linear-gradient(110deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08)),
            linear-gradient(90deg, rgba(45, 138, 120, 0.1), rgba(243, 179, 56, 0.12) 54%, rgba(216, 68, 31, 0.2)),
            repeating-linear-gradient(90deg, rgba(21, 51, 66, 0.05) 0 1px, transparent 1px 84px);
        }

        .pitch-rate-graph svg {
          display: block;
          width: 100%;
          min-width: 720px;
          height: 320px;
        }

        .pitch-rate-grid-line {
          fill: none;
          stroke: rgba(21, 51, 66, 0.12);
          stroke-width: 2;
        }

        .pitch-rate-path-base,
        .pitch-rate-path-live {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .pitch-rate-path-base {
          stroke: rgba(21, 51, 66, 0.18);
          stroke-width: 9;
        }

        .pitch-rate-path-live {
          stroke: url("#rateSurgeGradient");
          stroke-width: 15;
          filter: drop-shadow(0 10px 14px rgba(119, 52, 13, 0.24));
        }

        .pitch-rate-dot {
          fill: rgba(21, 51, 66, 0.26);
          stroke: rgba(245, 226, 191, 0.8);
          stroke-width: 4;
          transition: r 0.2s ease, fill 0.2s ease;
        }

        .pitch-rate-dot.active {
          fill: #d8441f;
        }

        .pitch-rate-label {
          fill: #8f2d19;
          font-size: 34px;
          font-weight: 900;
          letter-spacing: 0;
        }

        .pitch-rate-year {
          fill: rgba(21, 51, 66, 0.66);
          font-size: 26px;
          font-weight: 950;
          letter-spacing: 0;
          text-anchor: middle;
        }

        .pitch-rate-callout {
          position: absolute;
          left: clamp(16px, 3vw, 30px);
          bottom: clamp(16px, 3vw, 28px);
          display: grid;
          gap: 2px;
          padding: 14px 18px;
          border: 1px solid rgba(21, 51, 66, 0.15);
          border-radius: 6px;
          background: rgba(248, 236, 212, 0.82);
          backdrop-filter: blur(12px);
        }

        .pitch-rate-callout small,
        .pitch-rate-callout span {
          color: rgba(21, 51, 66, 0.62);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .pitch-rate-callout strong {
          color: var(--ink);
          font-family: var(--font-display);
          font-size: clamp(38px, 5vw, 68px);
          line-height: 0.9;
          letter-spacing: 0;
        }

        .pitch-rate-slider {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
        }

        .pitch-rate-slider span {
          color: rgba(21, 51, 66, 0.66);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .pitch-rate-slider input {
          width: 100%;
          height: 36px;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        .pitch-rate-slider input::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--leaf), var(--solar), #d8441f);
        }

        .pitch-rate-slider input::-webkit-slider-thumb {
          width: 28px;
          height: 28px;
          margin-top: -10px;
          appearance: none;
          border: 3px solid var(--ink);
          border-radius: 999px;
          background: #ffcf5f;
          box-shadow: 0 8px 18px rgba(21, 51, 66, 0.2);
        }

        .pitch-rate-slider input::-moz-range-track {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--leaf), var(--solar), #d8441f);
        }

        .pitch-rate-slider input::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border: 3px solid var(--ink);
          border-radius: 999px;
          background: #ffcf5f;
          box-shadow: 0 8px 18px rgba(21, 51, 66, 0.2);
        }

        .pitch-close {
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
          .pitch-side-nav,
          .pitch-side-hotzone {
            display: none;
          }

          .pitch-visual,
          .pitch-research,
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

          .pitch-hero-photo {
            inset: 78px 0 auto;
            width: 100%;
            height: 44%;
            opacity: 0.42;
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

          .pitch-research {
            grid-template-columns: 1fr;
          }

          .pitch-section::before,
          .pitch-section::after,
          .pitch-sections::before {
            display: none;
          }

          .pitch-proof {
            grid-template-columns: repeat(3, 1fr);
          }

          .pitch-rate-graph {
            overflow-x: auto;
          }

          .pitch-section-body {
            grid-template-columns: 1fr;
          }

          .pitch-section-body .pitch-bridge {
            grid-column: auto;
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
            min-height: 610px;
          }

          .pitch-hero-main h1 {
            font-size: clamp(48px, 15vw, 70px);
          }

          .pitch-chapters a {
            min-width: 74vw;
          }

          .pitch-research-grid {
            grid-template-columns: 1fr;
          }

          .pitch-rate-history-head {
            align-items: start;
            flex-direction: column;
          }

          .pitch-rate-history-head div:last-child {
            text-align: left;
          }

          .pitch-rate-graph {
            min-height: 250px;
            overflow-x: auto;
          }

          .pitch-rate-graph svg {
            min-width: 660px;
            height: 280px;
          }

          .pitch-rate-callout {
            position: relative;
            left: auto;
            bottom: auto;
            margin: 0 14px 14px;
          }

          .pitch-proof {
            grid-template-columns: 1fr;
          }

          .pitch-section-body div,
          .pitch-proof div {
            min-height: auto;
          }
        }
      `}</style>
    </main>
  );
}
