"use client";

import { useEffect } from "react";

const framework = [
  "Rapport, create relationship",
  "Ask them questions",
  "Repitch the set and set expectations for price",
  "I’m assuming I’m not the first solar guy to come by, what didn’t make sense last time?",
  "Introduce Sunrun",
  "Show neighbors map",
  "Explain why Sunrun is the best",
  "3 ways Sunrun helps you out",
  "1. Drop and protect the rate for 25 years",
  "Show rates from Edison",
  "Explain how they go up",
  "Prime and show the rate we get them at (below 35 cents)",
  "Pause, any questions so far or is it pretty straightforward?",
  "2. Eliminate delivery charges",
  "Explain delivery, distribution, and transmission charges",
  "Explain how they go up every year",
  "Pause, any questions so far or is it pretty straightforward?",
  "3. Battery",
  "Show picture",
  "Explain Powerwall 3 vs Powerwall 2",
  "Blackout protection",
  "Pull from battery at night",
  "Eliminate peak pricing",
  "Pause, any questions so far or is it pretty straightforward?",
  "Break down their bill, kill bill",
  "Calculate average, multiply by last year’s rate increase",
  "Compare to previous years",
  "Show design",
  "Show price",
  "Tee up rate",
  "Show them rate",
  "This is the best part",
  "Pause, any questions on anything so far or is it pretty fair for the most part?",
  "Warranties",
  "Any questions on anything so far or is it pretty straightforward?",
  "Pullback extremely hard",
  "Go through qualifications",
  "Prime for today’s site survey",
  "Assume the close",
  "Don’t hesitate",
  "What’s a good email for you?",
  "While signing: if everything I said is accurate, the home passed inspection, nothing out of pocket, would there be any reason you’d prefer to stay with Edison?",
  "You are the product and the company",
  "They want to go with Chase, not Sunrun",
];

const pillars = [
  {
    title: "Control the room",
    body: "Closer training starts with certainty. You are not winging it. You are walking them through a sequence that creates trust, clarity, and momentum.",
  },
  {
    title: "Simplify the economics",
    body: "The homeowner does not need more complexity. They need the utility problem made obvious, the Sunrun solution made clear, and the value anchored hard.",
  },
  {
    title: "Close with conviction",
    body: "No hesitation. No weird energy. No asking for permission to help them. If the deal makes sense, lead them through the finish line like it’s normal.",
  },
];

export default function ExpertTrainingPage() {
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
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(201,169,110,0.12), transparent), #050507",
        color: "#f4f3f0",
        padding: "40px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="reveal visible" style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(201,169,110,0.22)",
              background: "rgba(201,169,110,0.07)",
              borderRadius: 9999,
              padding: "7px 18px",
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c9a96e",
                display: "inline-block",
                boxShadow: "0 0 8px #c9a96e",
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.8)",
                fontWeight: 500,
              }}
            >
              Closing Framework · CPF
            </span>
          </div>

          <h1
            className="display reveal visible"
            style={{
              fontSize: "clamp(44px, 8vw, 92px)",
              margin: "0 0 18px",
              color: "#fff",
            }}
          >
            Expert Training by <em style={{ color: "#c9a96e", fontStyle: "italic" }}>CPF</em>
          </h1>

          <p
            className="reveal visible"
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.72,
              color: "rgba(255,255,255,0.58)",
              maxWidth: 740,
              margin: 0,
            }}
          >
            A clean intro page for your closer framework, built around rapport, rate control, utility pain, battery positioning, and a no-hesitation close.
          </p>
        </div>

        <section
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="card"
              style={{
                padding: "28px 24px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 28,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                {pillar.title}
              </div>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", lineHeight: 1.72, fontSize: 15 }}>
                {pillar.body}
              </p>
            </div>
          ))}
        </section>

        <section
          className="reveal"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 32,
            padding: "clamp(26px, 4vw, 42px)",
          }}
        >
          <div style={{ marginBottom: 22 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(201,169,110,0.78)",
                marginBottom: 10,
              }}
            >
              Intro Framework
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(32px, 5vw, 56px)",
                letterSpacing: "-0.035em",
                color: "#fff",
                margin: 0,
              }}
            >
              Opening sequence, utility breakdown, and close path.
            </h2>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {framework.map((item, index) => (
              <div
                key={`${index}-${item}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: 14,
                  alignItems: "start",
                  padding: "16px 18px",
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: index % 2 === 0 ? "rgba(255,255,255,0.02)" : "rgba(201,169,110,0.03)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(201,169,110,0.12)",
                    border: "1px solid rgba(201,169,110,0.22)",
                    color: "#c9a96e",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.04em",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div style={{ paddingTop: 6 }}>
                  <div style={{ fontSize: "clamp(14px, 1.8vw, 16px)", lineHeight: 1.65, color: "rgba(255,255,255,0.72)" }}>
                    {item}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
