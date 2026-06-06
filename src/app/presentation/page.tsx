"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const chapters = [
  {
    id: "why-sunrun",
    number: "01",
    label: "Why Sunrun",
    headline: "Start with trust before numbers.",
    copy: "The homeowner is not just choosing panels. They are choosing who will design, install, monitor, service, and stand behind the system for years.",
    frame: "Before we compare bills, make the company decision feel safe. Sunrun gives the customer a national name, a service infrastructure, and a simple point of accountability after install.",
    talk: "Position this as the foundation: if the company is not strong enough to trust, the savings do not matter yet. Once trust is established, the customer can listen to the utility and proposal conversation without feeling exposed.",
    bridge: "Once the company feels safe, shift to the reason they are even looking at solar: the utility path they are already on.",
    proof: [
      { label: "Company Confidence", detail: "A known national solar provider makes the decision feel less like a gamble." },
      { label: "One System Partner", detail: "Design, installation, monitoring, and support should feel connected." },
      { label: "Long-Term Help", detail: "Homeowners need to know who answers after the sale." },
    ],
  },
  {
    id: "utility-rates",
    number: "02",
    label: "Utility Rates",
    headline: "The utility bill is the real competitor.",
    copy: "Solar should be compared against the path they are already paying for: a monthly utility bill that can move without the homeowner's permission.",
    frame: "This section makes doing nothing visible. The customer is already committed to buying power every month. The question is whether they want that cost controlled by the utility forever.",
    talk: "Walk them through how rates, seasons, usage, and utility decisions affect the bill. Keep the tone calm: they do not need to hate the utility, they just need to see that the utility is not a stable plan.",
    bridge: "After they understand rates, separate the bill into what they use and what they are charged to receive it.",
    proof: [
      { label: "Moving Price", detail: "The rate can change even if the home does not." },
      { label: "Seasonal Exposure", detail: "Hot months create the highest emotional pain and the strongest contrast." },
      { label: "No Ownership", detail: "Every payment disappears into the utility path without building control." },
    ],
  },
  {
    id: "delivery-charges",
    number: "03",
    label: "Delivery Charges",
    headline: "They are paying for power and the pipeline.",
    copy: "Most homeowners look at the total bill. This section slows it down and shows that energy, delivery, fees, and rate structure all stack together.",
    frame: "Delivery charges help the homeowner understand why the bill can feel unfair. They are not only paying for electricity; they are paying the utility to move and manage it.",
    talk: "Use their bill as the visual. Point to supply, delivery, riders, taxes, and fees if present. The goal is not to over-explain the utility bill; the goal is to show that the current system is layered and hard to control.",
    bridge: "Once the customer sees the utility layers, introduce batteries as another layer of control, not just an add-on.",
    proof: [
      { label: "Usage Charge", detail: "What the home consumes." },
      { label: "Delivery Charge", detail: "What the utility charges to deliver and maintain the grid path." },
      { label: "Utility Fees", detail: "Extra bill lines make the total harder for homeowners to predict." },
    ],
  },
  {
    id: "batteries",
    number: "04",
    label: "Batteries",
    headline: "Batteries make solar feel like control.",
    copy: "Panels reduce dependence. Batteries add protection, flexibility, and a clearer sense that the home has its own energy plan.",
    frame: "A battery is not only a technical product. It is emotional: keeping essentials on, using stored power strategically, and feeling prepared when the grid is unreliable.",
    talk: "Match the battery conversation to the homeowner. For families, talk comfort and essentials. For high-bill homes, talk control. For outage-sensitive homes, talk security and predictability.",
    bridge: "Once the customer sees the control side, show how incentives can help make the project easier to justify.",
    proof: [
      { label: "Backup Power", detail: "Keeps important loads protected when the grid goes down." },
      { label: "Stored Solar", detail: "Lets the home use more of what the system produces." },
      { label: "Future Ready", detail: "Prepares the home for changing rates, outages, and usage needs." },
    ],
  },
  {
    id: "incentives",
    number: "05",
    label: "Incentives",
    headline: "Incentives create the timing window.",
    copy: "The project should stand on its own, but available incentives can improve the economics and make waiting less attractive.",
    frame: "This section should feel responsible. Explain incentives as something to verify and apply where eligible, not as a vague promise.",
    talk: "Keep the wording clean: if the home and customer qualify, available programs can reduce the effective cost or improve the value of moving now. Make clear that eligibility and tax specifics must be confirmed.",
    bridge: "After incentives, move from market-level opportunity into the specific design for their home.",
    proof: [
      { label: "Federal Credit", detail: "A major value lever when the customer is eligible." },
      { label: "Local Programs", detail: "Some markets add extra reasons to act while programs are open." },
      { label: "Timing Risk", detail: "Programs and rules can change, so delay can carry opportunity cost." },
    ],
  },
  {
    id: "design",
    number: "06",
    label: "Design",
    headline: "Now the conversation becomes personal.",
    copy: "The design section turns solar from an idea into a plan for this exact roof, this bill, and this household's usage.",
    frame: "Customers need to feel that the recommendation is engineered, not guessed. Roof planes, shade, production, panel count, battery fit, and usage all matter.",
    talk: "Show the layout visually. Explain why panels are placed where they are, how the system production relates to their usage, and where the design is conservative or optimized.",
    bridge: "Once the design is credible, use their actual bill to show what the system is designed to solve.",
    proof: [
      { label: "Roof Fit", detail: "Panel placement should make sense when they see the home." },
      { label: "Production Target", detail: "The design should connect to annual usage and offset." },
      { label: "Home Goals", detail: "Savings, backup, and aesthetics all shape the final recommendation." },
    ],
  },
  {
    id: "bill-analysis",
    number: "07",
    label: "Bill Analysis",
    headline: "The bill becomes the baseline.",
    copy: "The homeowner should see their current cost clearly before they compare it to the proposal. This prevents the close from feeling like a random payment pitch.",
    frame: "Bill analysis turns emotion into math. It captures what they pay now, when the bill spikes, and what happens if they stay on the same utility path.",
    talk: "Use simple language: current monthly average, high months, yearly spend, and future exposure. The point is to make their current bill feel like the option they are already buying.",
    bridge: "After the baseline is clear, the proposal can be shown as the alternative path, not a separate expense.",
    proof: [
      { label: "Monthly Average", detail: "Gives the customer one simple number to compare against." },
      { label: "Annual Spend", detail: "Shows the size of the problem over a full year." },
      { label: "High-Bill Months", detail: "Connects the proposal to the moments they feel the most pain." },
    ],
  },
  {
    id: "proposal",
    number: "08",
    label: "Proposal",
    headline: "The proposal is the decision frame.",
    copy: "This is where the full recommendation comes together: system, payment, savings, protection, and what changes after installation.",
    frame: "A strong proposal does not overwhelm the homeowner. It makes the comparison obvious: current utility path versus solar path.",
    talk: "Lead with the simplest comparison first, then support it with system size, production, battery option, payment, savings, and process. Do not bury the customer in every technical detail at once.",
    bridge: "Once they understand the proposal, return to the long-term reason it matters: protection from utility rate movement.",
    proof: [
      { label: "System Recommendation", detail: "What is being installed and why it fits the home." },
      { label: "Monthly Comparison", detail: "How the solar path compares against the current bill." },
      { label: "Projected Value", detail: "Where savings, control, and protection show up over time." },
    ],
  },
  {
    id: "rate-protection",
    number: "09",
    label: "Rate Protection",
    headline: "Savings today is good. Control over time is better.",
    copy: "Rate protection is the long-term logic of the close. It shows why the decision matters beyond the first monthly comparison.",
    frame: "This section helps the customer understand that solar is a hedge against the utility path. The more rates move over time, the more valuable control can become.",
    talk: "Bring it back to choice. They can keep renting power from a price path they do not control, or they can move more of that power decision onto the home.",
    bridge: "After the long-term value is clear, remove fear by showing what is protected and who stands behind it.",
    proof: [
      { label: "Predictability", detail: "A clearer energy plan makes future bills easier to understand." },
      { label: "Reduced Exposure", detail: "Less dependence on the utility can reduce rate increase risk." },
      { label: "Long-Term Spread", detail: "The difference between paths can matter more each year." },
    ],
  },
  {
    id: "warranties",
    number: "10",
    label: "Warranties",
    headline: "Protection removes the final fear.",
    copy: "Warranties and service explain what happens if something goes wrong. This keeps the decision from feeling risky.",
    frame: "The homeowner's silent concern is simple: what if this becomes my problem later? This section answers that directly.",
    talk: "Explain coverage in plain English. What is covered, who handles service, what happens after install, and how the customer gets help. Keep it simple and confidence-building.",
    bridge: "Once protection is clear, show the process so the homeowner can picture what happens after today.",
    proof: [
      { label: "Equipment Coverage", detail: "Panels, inverter, battery, and related equipment should be explained clearly." },
      { label: "Workmanship", detail: "The install and roof work need a simple protection story." },
      { label: "Service Path", detail: "The customer should know exactly who to contact." },
    ],
  },
  {
    id: "installation-process",
    number: "11",
    label: "Installation Process",
    headline: "Predictability makes yes easier.",
    copy: "The process section turns a big home project into a sequence of normal steps the customer can understand.",
    frame: "Customers hesitate when the next step feels vague. A clean timeline lowers anxiety and makes moving forward feel organized.",
    talk: "Walk through site survey, design finalization, permitting, installation, inspection, utility approval, and activation. Keep it calm: the homeowner does not need to manage every detail.",
    bridge: "After the process feels manageable, confirm the home and customer qualify so the plan can actually move.",
    proof: [
      { label: "Site Survey", detail: "Confirms roof, electrical, and final design details." },
      { label: "Permits & Utility", detail: "The project moves through required approvals." },
      { label: "Install & Activation", detail: "The home moves from equipment install to permission to operate." },
    ],
  },
  {
    id: "qualifications",
    number: "12",
    label: "Qualifications",
    headline: "Now confirm this can actually work.",
    copy: "Qualifications create a natural close checkpoint. The question becomes: if the home qualifies and the numbers work, are we moving forward?",
    frame: "This section should feel like due diligence, not pressure. The homeowner sees that approval depends on real criteria.",
    talk: "Review the practical checks: homeowner status, roof condition, utility territory, credit/financing approval, usage, and final design approval. This makes the close conditional and professional.",
    bridge: "If the customer qualifies and the recommendation makes sense, the only thing left is choosing the next step.",
    proof: [
      { label: "Home Fit", detail: "Roof, shade, electrical, and design feasibility." },
      { label: "Customer Fit", detail: "Ownership, usage, and approval requirements." },
      { label: "Project Fit", detail: "The plan must save, protect, or solve a clear problem." },
    ],
  },
  {
    id: "next-steps",
    number: "13",
    label: "Next Steps",
    headline: "End with a clear, calm decision.",
    copy: "The close should feel like the natural result of the presentation: if the plan qualifies, saves, and protects the home, the next step is to start.",
    frame: "Do not make the ending feel like a new pitch. Bring back the full story: trusted company, rising utility path, custom design, better comparison, protection, and simple process.",
    talk: "Ask for agreement in pieces: Does the utility path make sense to keep? Does the design solve the bill? Does the payment make sense? If yes, move into approval and site survey.",
    bridge: "This is where the presentation ends and the project begins.",
    proof: [
      { label: "Approve Plan", detail: "Lock in the recommendation and begin the project file." },
      { label: "Site Survey", detail: "Confirm the home details and final design." },
      { label: "Install Path", detail: "Move through approvals, installation, and activation." },
    ],
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
            Homeowner Solar Close <span>Built To Flow</span>
          </h1>
          <p>A live iPad presentation that moves from trust to utility pressure, then into design, proposal, protection, and the next step.</p>
        </div>
        <p className="pitch-hero-note reveal visible">
          Each chapter gives you the homeowner frame, the talk track, the proof, and the bridge into the next decision.
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
          min-height: min(920px, 98svh);
          scroll-margin-top: 184px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(300px, 0.46fr);
          gap: clamp(24px, 4.8vw, 66px);
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
          left: calc(50% - 12px);
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
          left: calc(50% - 1px);
          top: calc(50% + 28px);
          bottom: -1px;
          width: 2px;
          background: linear-gradient(180deg, rgba(243, 179, 56, 0.52), rgba(21, 51, 66, 0));
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
          font-size: clamp(44px, 5.9vw, 88px);
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

        .pitch-section-body {
          max-width: 780px;
          margin-top: clamp(26px, 4vw, 42px);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .pitch-section-body div {
          min-height: 158px;
          display: grid;
          align-content: start;
          gap: 12px;
          padding: 18px;
          border: 1px solid rgba(21, 51, 66, 0.15);
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.2);
        }

        .pitch-section-body .pitch-bridge {
          grid-column: 1 / -1;
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
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 600;
          line-height: 1.48;
          letter-spacing: 0;
        }

        .pitch-proof {
          display: grid;
          gap: 14px;
        }

        .pitch-proof div {
          min-height: 150px;
          display: grid;
          align-content: start;
          gap: 10px;
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
          font-size: clamp(28px, 3vw, 42px);
          line-height: 0.96;
          letter-spacing: 0;
        }

        .pitch-proof span {
          display: block;
          max-width: 320px;
          color: rgba(21, 51, 66, 0.66);
          font-size: 14px;
          font-weight: 600;
          line-height: 1.42;
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
          .pitch-section::after,
          .pitch-sections::before {
            display: none;
          }

          .pitch-proof {
            grid-template-columns: repeat(3, 1fr);
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

          .pitch-section-body div,
          .pitch-proof div {
            min-height: auto;
          }
        }
      `}</style>
    </main>
  );
}
