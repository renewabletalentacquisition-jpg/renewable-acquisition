"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type LaneKey = "TAIYOU" | "REC" | "MARK" | "REF";

type LaneCard = {
  key: LaneKey;
  title: string;
  subtitle: string;
  badge: string;
  accent: string;
  prompts: string[];
};

type Activity = {
  lane: string;
  action: string;
  time: string;
};

const laneCards: LaneCard[] = [
  {
    key: "TAIYOU",
    title: "TAIYOU",
    subtitle: "Main hub · priorities · sequencing · synthesis",
    badge: "Hub",
    accent: "#f0d7a1",
    prompts: [
      "Taiyou: Review all active business lanes, prioritize what matters most, and give me the clearest execution order.",
      "Taiyou: Coordinate REC, MARK, and REF under one plan and push the business forward without making me manage the lanes manually.",
      "Taiyou: Decide the next highest-leverage actions and protect my time by focusing only on what moves the business fastest.",
    ],
  },
  {
    key: "REC",
    title: "REC",
    subtitle: "Recruiting machine · applicants · interviews · onboarding",
    badge: "Recruiting",
    accent: "#c9a96e",
    prompts: [
      "REC: Review current recruiting state and execute the next highest-leverage recruiting task.",
      "REC: Increase applicant volume and tighten the recruiting pipeline from lead to interview.",
      "REC: Clean the team/recruiting operations structure and reduce backend chaos.",
    ],
  },
  {
    key: "MARK",
    title: "MARK",
    subtitle: "Brand engine · REVELATION · website · Instagram",
    badge: "Brand",
    accent: "#8dd6c9",
    prompts: [
      "MARK: Build the REVELATION brand system and define the next highest-leverage brand deliverable.",
      "MARK: Structure the REVELATION site so it strengthens recruiting and credibility fast.",
      "MARK: Turn the visual references into a clean elite identity and Instagram direction.",
    ],
  },
  {
    key: "REF",
    title: "REF",
    subtitle: "Referral machine · installs · reactivation · appointments",
    badge: "Referrals",
    accent: "#d98db8",
    prompts: [
      "REF: Build the referral engine from installed customers and define the first outreach sequence.",
      "REF: Turn the customer list into appointments through a clean referral pipeline.",
      "REF: Create the highest-leverage referral and follow-up actions right now.",
    ],
  },
];

const quickModes = [
  {
    label: "Morning Brief",
    prompt: "Taiyou: Give me a morning brief across REC, MARK, and REF. Tell me what matters most today and what order to attack it in.",
  },
  {
    label: "Recruiting Push",
    prompt: "REC: Focus only on increasing recruiting volume and speeding up the applicant-to-interview pipeline.",
  },
  {
    label: "Brand Sprint",
    prompt: "MARK: Focus only on the REVELATION site, brand system, and strongest public-facing assets.",
  },
  {
    label: "Referral Sprint",
    prompt: "REF: Focus only on installed-customer follow-up, referral requests, and appointment generation.",
  },
  {
    label: "Parallel Command",
    prompt: "Taiyou: Run a coordinated pass across REC, MARK, and REF. Have each lane identify its highest-leverage next actions, then merge the result into one execution order.",
  },
];

const timeStamp = () =>
  new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

export default function WarRoomPage() {
  const router = useRouter();
  const [selectedLane, setSelectedLane] = useState<LaneKey>("TAIYOU");
  const [draft, setDraft] = useState(laneCards[0].prompts[0]);
  const [status, setStatus] = useState("WarRoom online. Awaiting command.");
  const [activity, setActivity] = useState<Activity[]>([
    { lane: "TAIYOU", action: "WarRoom initialized", time: timeStamp() },
  ]);

  useEffect(() => {
    const hasAccess = typeof window !== "undefined" && window.localStorage.getItem("warroom-auth") === "ok";
    if (!hasAccess) router.push("/warroom/login");
  }, [router]);

  const current = useMemo(
    () => laneCards.find((lane) => lane.key === selectedLane) ?? laneCards[0],
    [selectedLane]
  );

  function addActivity(lane: string, action: string) {
    setActivity((prev) => [{ lane, action, time: timeStamp() }, ...prev].slice(0, 8));
  }

  function selectLane(lane: LaneCard) {
    setSelectedLane(lane.key);
    setDraft(lane.prompts[0]);
    setStatus(`${lane.title} selected.`);
    addActivity(lane.title, "Lane selected");
  }

  function copyPrompt() {
    navigator.clipboard.writeText(draft).then(() => {
      setStatus(`${current.title} prompt copied.`);
      addActivity(current.title, "Prompt copied");
    });
  }

  function sendToChat(prompt: string, lane = current.title, label = "Prompt sent to chat") {
    setStatus(`${lane} prompt sent into chat.`);
    addActivity(lane, label);
    window.location.href = `/?prompt=${encodeURIComponent(prompt)}`;
  }

  function signOut() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("warroom-auth");
    }
    router.push("/warroom/login");
  }

  return (
    <main className="warroom-shell">
      <div className="warroom-container">
        <header className="warroom-header">
          <div>
            <div className="warroom-kicker">Private command layer</div>
            <h1 className="warroom-title">WarRoom.</h1>
            <p className="warroom-subtitle">
              Taiyou at the center. REC, MARK, and REF underneath. Shared continuity. Cleaner execution.
            </p>
          </div>
          <div className="warroom-top-actions">
            <a href="/hq" className="warroom-secondary-btn">Open HQ</a>
            <button className="warroom-secondary-btn" onClick={signOut}>Sign Out</button>
          </div>
        </header>

        <section className="warroom-hub-wrap">
          <button className="warroom-hub-card" onClick={() => selectLane(laneCards[0])}>
            <div>
              <div className="warroom-hub-badge">Main Hub</div>
              <div className="warroom-hub-name">Taiyou</div>
              <div className="warroom-hub-copy">
                Central operator. Owns prioritization, sequencing, coordination, and final synthesis across every lane.
              </div>
            </div>
            <div className="warroom-hub-mark">☀️</div>
          </button>
        </section>

        <section className="warroom-lanes-grid">
          {laneCards.slice(1).map((lane) => (
            <button
              key={lane.key}
              className="warroom-lane-card"
              onClick={() => selectLane(lane)}
              style={{ borderColor: selectedLane === lane.key ? `${lane.accent}80` : undefined, boxShadow: selectedLane === lane.key ? `0 0 0 1px ${lane.accent}30` : undefined }}
            >
              <div className="warroom-lane-top">
                <div>
                  <div className="warroom-lane-title">{lane.title}</div>
                  <div className="warroom-lane-subtitle">{lane.subtitle}</div>
                </div>
                <span className="warroom-mini-badge" style={{ color: lane.accent, borderColor: `${lane.accent}40`, background: `${lane.accent}14` }}>
                  {lane.badge}
                </span>
              </div>
            </button>
          ))}
        </section>

        <section className="warroom-main-grid">
          <div className="warroom-panel">
            <div className="warroom-mode-grid">
              {quickModes.map((mode) => (
                <button
                  key={mode.label}
                  className="warroom-mode-chip"
                  onClick={() => {
                    setDraft(mode.prompt);
                    setStatus(`${mode.label} loaded.`);
                    addActivity("SYSTEM", `${mode.label} loaded`);
                  }}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <div className="warroom-toolbar">
              <div>
                <div className="warroom-section-label">Command Draft</div>
                <div className="warroom-section-copy">Select a lane, load a preset, edit the prompt, then run it through Taiyou.</div>
              </div>
              <div className="warroom-toolbar-actions">
                <button className="warroom-secondary-btn" onClick={copyPrompt}>Copy</button>
                <button className="warroom-secondary-btn" onClick={() => sendToChat(draft, current.title, "Run current lane")}>Run Lane</button>
                <button className="warroom-primary-btn" onClick={() => sendToChat(draft)}>Send →</button>
              </div>
            </div>

            <textarea
              className="warroom-draft"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setStatus("Command updated.");
              }}
            />

            <div className="warroom-status-card">
              <div className="warroom-section-label">Status</div>
              <div className="warroom-status-copy">{status}</div>
            </div>
          </div>

          <div className="warroom-side-stack">
            <div className="warroom-panel">
              <div className="warroom-section-label">{current.title} Quick Actions</div>
              <div className="warroom-action-stack">
                {current.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="warroom-action-row"
                    onClick={() => {
                      setDraft(prompt);
                      setStatus(`${current.title} quick action loaded.`);
                      addActivity(current.title, "Quick action loaded");
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="warroom-panel">
              <div className="warroom-section-label">Recent Activity</div>
              <div className="warroom-activity-stack">
                {activity.map((item, index) => (
                  <div key={`${item.time}-${item.lane}-${index}`} className="warroom-activity-row">
                    <div>
                      <div className="warroom-activity-lane">{item.lane}</div>
                      <div className="warroom-activity-action">{item.action}</div>
                    </div>
                    <div className="warroom-activity-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
