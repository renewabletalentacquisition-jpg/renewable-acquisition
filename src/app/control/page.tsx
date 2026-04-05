"use client";

import { useMemo, useState } from "react";

type AgentKey = "TAIYOU" | "REC" | "MARK" | "REF";

type AgentCard = {
  key: AgentKey;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  glow: string;
  prompts: string[];
};

type ActivityEntry = {
  lane: string;
  action: string;
  time: string;
};

const agents: AgentCard[] = [
  {
    key: "TAIYOU",
    title: "TAIYOU",
    subtitle: "Main hub + executive coordinator",
    badge: "Hub · priorities · synthesis",
    color: "#f0d7a1",
    glow: "rgba(240,215,161,0.24)",
    prompts: [
      "Taiyou: Review everything in motion, identify the highest-leverage next actions across REC, MARK, and REF, and give me the clearest priority order.",
      "Taiyou: Coordinate the specialist lanes and turn their outputs into one practical execution plan for Sir.",
      "Taiyou: Act as the main hub, decide what matters most right now, and move the business forward without making me manage the lanes manually.",
    ],
  },
  {
    key: "REC",
    title: "REC",
    subtitle: "Recruiting machine",
    badge: "Funnels · applicants · onboarding",
    color: "#c9a96e",
    glow: "rgba(201,169,110,0.22)",
    prompts: [
      "REC: Review the recruiting machine and give me the next 3 highest-leverage actions.",
      "REC: Tighten the applicant funnel and define the exact follow-up logic for qualified, review, and DQ leads.",
      "REC: Build the onboarding stage system from applicant to active rep.",
    ],
  },
  {
    key: "MARK",
    title: "MARK",
    subtitle: "Brand + marketing lane",
    badge: "REVELATION · site · IG · assets",
    color: "#8dd6c9",
    glow: "rgba(141,214,201,0.20)",
    prompts: [
      "MARK: Build the REVELATION brand brief and define the visual direction.",
      "MARK: Map the separate team website structure for recruiting support and credibility.",
      "MARK: Create a clean content system for Instagram and recruiting-adjacent brand assets.",
    ],
  },
  {
    key: "REF",
    title: "REF",
    subtitle: "Referral + lead machine",
    badge: "Reactivation · referrals · pipeline",
    color: "#d98db8",
    glow: "rgba(217,141,184,0.20)",
    prompts: [
      "REF: Design the referral engine from past installs and reactivation outreach.",
      "REF: Build the local lead generation system and first source list.",
      "REF: Create an appointment-pipeline support structure for warm opportunities.",
    ],
  },
];

const workflowButtons = [
  {
    label: "Run Taiyou",
    description: "Main hub / executive operator",
    draft: "Taiyou: Review everything in motion, identify the highest-leverage next actions across REC, MARK, and REF, and take the lead from here.",
  },
  {
    label: "Run REC",
    description: "Focus recruiting work only",
    draft: "REC: Review current recruiting state and execute the next highest-leverage recruiting task.",
  },
  {
    label: "Run MARK",
    description: "Focus brand / marketing work",
    draft: "MARK: Review current brand state and execute the next highest-leverage brand task that supports growth.",
  },
  {
    label: "Run REF",
    description: "Focus referrals / lead systems",
    draft: "REF: Review current referral and lead-gen state and execute the next highest-leverage task.",
  },
  {
    label: "Run All Three",
    description: "Parallel specialist planning",
    draft: "Taiyou: Coordinate REC, MARK, and REF in parallel. Have each review its lane, identify top next actions, then merge the results into one priority order.",
  },
];

const timestamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

export default function ControlPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentKey>("TAIYOU");
  const [draft, setDraft] = useState(workflowButtons[0].draft);
  const [status, setStatus] = useState("Idle — ready for command.");
  const [recentActivity, setRecentActivity] = useState<ActivityEntry[]>([
    { lane: "TAIYOU", action: "Hub initialized", time: timestamp() },
  ]);

  const current = useMemo(
    () => agents.find((agent) => agent.key === selectedAgent) ?? agents[0],
    [selectedAgent]
  );

  const hubAgent = agents[0];
  const specialistAgents = agents.slice(1);

  const addActivity = (lane: string, action: string) => {
    setRecentActivity((prev) => [{ lane, action, time: timestamp() }, ...prev].slice(0, 8));
  };

  const copyToClipboard = async (text: string, lane = "SYSTEM", label = "Prompt copied") => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`${label}. Ready to paste anywhere.`);
      addActivity(lane, label);
    } catch {
      setStatus("Clipboard failed. You can still copy manually.");
      addActivity("SYSTEM", "Clipboard failed");
    }
  };

  const openChat = (text: string, lane = current.title, label = "Sent to chat") => {
    setStatus(`${lane} prompt sent into chat.`);
    addActivity(lane, label);
    const encoded = encodeURIComponent(text);
    window.location.href = `/?prompt=${encoded}`;
  };

  const selectAgent = (agent: AgentCard) => {
    setSelectedAgent(agent.key);
    setDraft(agent.prompts[0]);
    setStatus(`${agent.title} selected.`);
    addActivity(agent.title, "Lane selected");
  };

  const runCurrentLane = () => {
    openChat(draft, current.title, "Run current lane");
  };

  const runParallel = () => {
    const text =
      "Taiyou: Run a coordinated multi-lane pass. REC should review recruiting priorities, MARK should review brand/marketing priorities, REF should review referral/lead priorities, then merge everything into one execution order for Sir.";
    setDraft(text);
    setSelectedAgent("TAIYOU");
    openChat(text, "TAIYOU", "Parallel run launched");
  };

  const quickFill = (prompt: string) => {
    setDraft(prompt);
    setStatus(`${current.title} quick action loaded.`);
    addActivity(current.title, "Quick action loaded");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(201,169,110,0.10), transparent), var(--bg)",
        padding: "48px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div className="reveal visible" style={{ marginBottom: 34 }}>
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
                background: "var(--accent)",
                display: "inline-block",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent-soft)",
                fontWeight: 500,
              }}
            >
              Agent Control Panel
            </span>
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(46px, 7vw, 84px)",
              margin: "0 0 18px",
              color: "var(--fg)",
            }}
          >
            Taiyou at the center.
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Specialists underneath.</em>
          </h1>

          <p
            style={{
              maxWidth: 820,
              margin: 0,
              color: "var(--fg-muted)",
              fontSize: 16,
              lineHeight: 1.75,
            }}
          >
            This puts Taiyou in the main hub position, with REC, MARK, and REF underneath as focused operators. Click the hub when you want full coordination. Click a specialist when you want one lane pushed hard.
          </p>
        </div>

        <section style={{ marginBottom: 18 }}>
          <button
            type="button"
            onClick={() => selectAgent(hubAgent)}
            className="agent-card-button"
            style={{
              width: "100%",
              padding: "28px 30px",
              borderColor: selectedAgent === hubAgent.key ? hubAgent.color : "rgba(240,215,161,0.32)",
              background:
                selectedAgent === hubAgent.key
                  ? "linear-gradient(135deg, rgba(240,215,161,0.18), rgba(240,215,161,0.08))"
                  : "linear-gradient(135deg, rgba(240,215,161,0.12), rgba(255,255,255,0.04))",
              boxShadow: `0 0 0 1px ${hubAgent.glow}, 0 24px 60px rgba(0,0,0,0.22)`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 5vw, 54px)", color: "var(--fg)" }}>
                    {hubAgent.title}
                  </span>
                  <span className="lane-badge" style={{ color: hubAgent.color, borderColor: `${hubAgent.color}50`, background: `${hubAgent.color}16` }}>
                    {hubAgent.badge}
                  </span>
                </div>
                <div style={{ fontSize: 17, color: "var(--fg)", marginBottom: 6, fontWeight: 600 }}>
                  {hubAgent.subtitle}
                </div>
                <div style={{ fontSize: 14.5, color: "var(--fg-muted)", lineHeight: 1.7, maxWidth: 760 }}>
                  Taiyou is the executive layer: priorities, coordination, synthesis, and final direction. When you do not want to manage the lanes manually, this is the button.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={(event) => {
                    event.stopPropagation();
                    copyToClipboard(hubAgent.prompts[0], "TAIYOU", "Taiyou prompt copied");
                  }}
                >
                  Copy Hub Prompt
                </button>
                <button
                  type="button"
                  className="btn-gold"
                  onClick={(event) => {
                    event.stopPropagation();
                    openChat(hubAgent.prompts[0], "TAIYOU", "Hub run launched");
                  }}
                >
                  Run Taiyou →
                </button>
              </div>
            </div>
          </button>
        </section>

        <section className="control-grid">
          <div className="card" style={{ padding: 22 }}>
            <div className="workflow-grid" style={{ marginBottom: 22 }}>
              {workflowButtons.map((item) => (
                <button
                  key={item.label}
                  className="panel-chip"
                  onClick={() => {
                    setDraft(item.draft);
                    setStatus(`${item.label} loaded.`);
                    addActivity("SYSTEM", `${item.label} preset loaded`);
                  }}
                  type="button"
                >
                  <span style={{ display: "block", color: "var(--fg)", fontWeight: 600 }}>
                    {item.label}
                  </span>
                  <span style={{ display: "block", color: "var(--fg-muted)", fontSize: 12, marginTop: 4 }}>
                    {item.description}
                  </span>
                </button>
              ))}
            </div>

            <div className="prompt-toolbar">
              <div>
                <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)" }}>
                  Prompt Builder
                </div>
                <div style={{ fontSize: 14, color: "var(--fg-muted)", marginTop: 4 }}>
                  Click the hub, a specialist, or a preset. Edit if needed. Then send it into chat.
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn-ghost" type="button" onClick={() => copyToClipboard(draft, current.title, "Prompt copied")}>
                  Copy Prompt
                </button>
                <button className="btn-ghost" type="button" onClick={runCurrentLane}>
                  Run Current Lane
                </button>
                <button className="btn-gold" type="button" onClick={runParallel}>
                  Parallel Run →
                </button>
              </div>
            </div>

            <textarea
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setStatus("Prompt edited.");
              }}
              style={{
                width: "100%",
                minHeight: 280,
                resize: "vertical",
                borderRadius: 28,
                border: "1px solid var(--border-strong)",
                background: "rgba(255,255,255,0.03)",
                color: "var(--fg)",
                padding: "20px 22px",
                fontSize: 14.5,
                lineHeight: 1.7,
                outline: "none",
              }}
            />

            <div className="status-panel" style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
                Status
              </div>
              <div style={{ color: "var(--fg)", fontSize: 14.5 }}>{status}</div>
            </div>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
                Specialist Lanes
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                {specialistAgents.map((agent) => {
                  const active = selectedAgent === agent.key;
                  return (
                    <button
                      key={agent.key}
                      type="button"
                      onClick={() => selectAgent(agent)}
                      className="agent-card-button"
                      style={{
                        borderColor: active ? agent.color : "var(--border)",
                        background: active ? agent.glow : "var(--bg-panel)",
                        boxShadow: active ? `0 0 0 1px ${agent.glow}` : "none",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start" }}>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--fg)" }}>{agent.title}</span>
                            <span className="lane-badge" style={{ color: agent.color, borderColor: `${agent.color}40`, background: `${agent.color}14` }}>
                              {agent.badge}
                            </span>
                          </div>
                          <div style={{ fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.65 }}>{agent.subtitle}</div>
                        </div>
                        <span style={{ color: agent.color, fontSize: 18 }}>↗</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: current.color, marginBottom: 14 }}>
                {current.title} Quick Actions
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {current.prompts.map((prompt) => (
                  <button key={prompt} type="button" className="quick-action" onClick={() => quickFill(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
                Recent Activity
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {recentActivity.map((entry, index) => (
                  <div key={`${entry.time}-${entry.lane}-${index}`} className="activity-row">
                    <div>
                      <div style={{ color: "var(--fg)", fontSize: 13.5, fontWeight: 600 }}>{entry.lane}</div>
                      <div style={{ color: "var(--fg-muted)", fontSize: 13 }}>{entry.action}</div>
                    </div>
                    <div style={{ color: "var(--fg-dim)", fontSize: 12 }}>{entry.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>
                Best Use
              </div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--fg-muted)", lineHeight: 1.75, fontSize: 14 }}>
                <li>Use Taiyou when you want the main hub to think, prioritize, and coordinate for you.</li>
                <li>Use one specialist when you want focused output from a single lane.</li>
                <li>Use “Parallel Run” when you want one coordinated multi-lane pass.</li>
                <li>Keep messages outcome-based: tell the lane what you want done, not just what to think about.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
