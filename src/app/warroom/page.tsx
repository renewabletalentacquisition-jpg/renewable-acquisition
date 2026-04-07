"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type LaneKey = "TAIYOU" | "REC" | "MARK" | "REF";

type Lane = {
  key: LaneKey;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  accent: string;
  glow: string;
  emoji: string;
  prompt: string;
};

const lanes: Lane[] = [
  {
    key: "REC",
    title: "Recruiting",
    subtitle: "Recruiting machine",
    description: "Applicants · funnels · interviews · onboarding · rep ops",
    badge: "Recruiting",
    accent: "#c9a96e",
    glow: "rgba(201,169,110,0.18)",
    emoji: "🎯",
    prompt: "You are the Recruiting specialist working under Sunny. You own the recruiting machine: renewableacquisition.com, applicant funnel, qualification logic, interview routing, onboarding, rep tracking, and recruiting outreach. Stay in the recruiting lane. Be direct, execution-focused, and practical. Chase is 'Sir'. What do you want to work on?",
  },
  {
    key: "MARK",
    title: "Marketing",
    subtitle: "Brand + marketing lane",
    description: "REVELATION · website · Instagram · visual identity · team brand",
    badge: "Marketing",
    accent: "#8dd6c9",
    glow: "rgba(141,214,201,0.18)",
    emoji: "✦",
    prompt: "You are the Marketing specialist working under Sunny. You own the REVELATION team brand: website, Instagram, logo direction, visual identity, and marketing assets. Stay in the brand lane. Be sharp, creative, and execution-focused. Chase is 'Sir'. What do you want to work on?",
  },
  {
    key: "REF",
    title: "Referrals",
    subtitle: "Referral + lead machine",
    description: "Installed customers · referrals · reactivation · appointments",
    badge: "Referrals",
    accent: "#d98db8",
    glow: "rgba(217,141,184,0.18)",
    emoji: "🔗",
    prompt: "You are the Referrals specialist working under Sunny. You own referral generation, installed-customer follow-up, reactivation outreach, local lead generation, and appointment-pipeline support. Stay in the referral lane. Be direct, practical, and execution-focused. Chase is 'Sir'. What do you want to work on?",
  },
];

const quickActions = [
  { label: "Morning Brief", prompt: "Sunny: Give me a morning brief. Review Recruiting, Marketing, and Referrals — what matters most today and what order do I attack it in?" },
  { label: "Recruiting Push", prompt: "Recruiting: Focus only on increasing recruiting volume and speeding up the applicant-to-interview pipeline. What are the next 3 highest-leverage actions?" },
  { label: "Marketing Sprint", prompt: "Marketing: Focus only on REVELATION. What is the highest-leverage brand action I can take today?" },
  { label: "Referral Sprint", prompt: "Referrals: Focus only on installed-customer referrals and appointment generation. What is the fastest path to new appointments today?" },
  { label: "Parallel Command", prompt: "Sunny: Coordinate Recruiting, Marketing, and Referrals in parallel. Have each lane identify its top action, then merge into one execution order for Sir." },
  { label: "20 in 20 Plan", prompt: "Sunny: The goal is 20 new reps in 20 days before April 27. Build the exact plan: what funnels, what actions, what order, what gets done today." },
];

const TAIYOU_PROMPT = "Sunny: You are the main hub. Review everything in motion across Recruiting, Marketing, and Referrals. Identify the highest-leverage next actions and give Sir the clearest execution order. What do you want to work on?";

export default function WarRoomPage() {
  const router = useRouter();
  const [draft, setDraft] = useState(TAIYOU_PROMPT);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasAccess =
      typeof window !== "undefined" &&
      window.localStorage.getItem("warroom-auth") === "ok";
    if (!hasAccess) router.push("/warroom/login");
  }, [router]);

  const TOKEN = "4585c4d851a3d2918c549530c8b234e5563f53389aaa78c6";
  const BASE_URL = "http://127.0.0.1:18789";

  // Session keys for each dedicated lane — use the session= query param the Control UI reads
  const SESSION_KEYS: Record<string, string> = {
    TAIYOU: "agent:main:explicit:warroom-taiyou",
    REC:    "agent:main:explicit:warroom-rec",
    MARK:   "agent:main:explicit:warroom-mark",
    REF:    "agent:main:explicit:warroom-ref",
  };

  function openLane(prompt: string, lane: string) {
    const sessionKey = encodeURIComponent(SESSION_KEYS[lane]);
    const url = `${BASE_URL}/#token=${TOKEN}&session=${sessionKey}`;
    // Always use _blank — never reuse an existing tab
    window.open(url, "_blank", "noopener");
    navigator.clipboard.writeText(prompt).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function copyAndOpen(prompt: string) {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
    const sessionKey = encodeURIComponent(SESSION_KEYS["TAIYOU"]);
    const url = `${BASE_URL}/#token=${TOKEN}&session=${sessionKey}`;
    window.open(url, `warroom-draft-${Date.now()}`);
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

        {/* ── Header ─── */}
        <header className="warroom-header">
          <div>
            <div className="warroom-kicker">Private command layer</div>
            <h1 className="warroom-title">WarRoom.</h1>
            <p className="warroom-subtitle">
              Sunny at the center. Recruiting, Marketing, and Referrals underneath.<br />
              Click any lane — the prompt is copied, OpenClaw opens. Just paste and send.
            </p>
          </div>
          <div className="warroom-top-actions">
            <a href="/hq" className="warroom-secondary-btn">Team HQ</a>
            <a href="/admin" className="warroom-secondary-btn">Applicants</a>
            <button className="warroom-secondary-btn" onClick={signOut}>Sign Out</button>
          </div>
        </header>

        {/* ── Taiyou Hub ─── */}
        <section style={{ marginBottom: 18 }}>
          <button
            type="button"
            className="warroom-hub-card"
            onClick={() => openLane(TAIYOU_PROMPT, "TAIYOU")}
            style={{ cursor: "pointer", transition: "transform 0.18s ease, box-shadow 0.18s ease" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(240,215,161,0.35), 0 32px 72px rgba(0,0,0,0.30)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(240,215,161,0.18), 0 24px 60px rgba(0,0,0,0.22)";
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
                <span className="warroom-hub-badge">Main Hub</span>
                <span style={{ fontSize: 12, color: "rgba(240,215,161,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Click to open in new tab</span>
              </div>
              <div className="warroom-hub-name">Sunny ☀️</div>
              <div className="warroom-hub-copy">
                Central operator. Priorities, coordination, synthesis, and final execution direction across every lane. When you don't want to manage the lanes manually, this is the button.
              </div>
            </div>
            <div style={{ fontSize: 48, opacity: 0.18, flexShrink: 0 }}>→</div>
          </button>
        </section>

        {/* ── Specialist Lanes ─── */}
        <section className="warroom-lanes-grid" style={{ marginBottom: 28 }}>
          {lanes.map((lane) => (
            <button
              key={lane.key}
              type="button"
              onClick={() => openLane(lane.prompt, lane.key)}
              className="warroom-lane-card"
              style={{ cursor: "pointer", transition: "transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease", textAlign: "left" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.borderColor = `${lane.accent}80`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1px ${lane.glow}, 0 16px 40px rgba(0,0,0,0.22)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div className="warroom-lane-top">
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                    <span className="warroom-mini-badge" style={{ color: lane.accent, borderColor: `${lane.accent}40`, background: `${lane.accent}14` }}>
                      {lane.badge}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--fg-dim)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Opens in new tab</span>
                  </div>
                  <div className="warroom-lane-title" style={{ color: lane.accent }}>{lane.title} {lane.emoji}</div>
                  <div style={{ fontSize: 14, color: "var(--fg)", fontWeight: 600, marginBottom: 6 }}>{lane.subtitle}</div>
                  <div className="warroom-lane-subtitle">{lane.description}</div>
                </div>
                <div style={{ color: lane.accent, fontSize: 22, opacity: 0.5, flexShrink: 0 }}>↗</div>
              </div>
            </button>
          ))}
        </section>

        {/* ── Quick Actions + Draft ─── */}
        <section className="warroom-main-grid">
          <div className="warroom-panel">
            <div className="warroom-section-label" style={{ marginBottom: 14 }}>Quick Actions</div>
            <div className="warroom-mode-grid" style={{ marginBottom: 22 }}>
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="warroom-mode-chip"
                  onClick={() => setDraft(action.prompt)}
                >
                  {action.label}
                </button>
              ))}
            </div>

            <div className="warroom-toolbar">
              <div>
                <div className="warroom-section-label">Command Draft</div>
                <div className="warroom-section-copy">Edit the prompt below, then open it in a new tab.</div>
              </div>
              <div className="warroom-toolbar-actions">
                <button type="button" className="warroom-secondary-btn" onClick={() => {
                  navigator.clipboard.writeText(draft).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }).catch(() => {});
                }}>
                  {copied ? "Copied ✓" : "Copy"}
                </button>
                <button type="button" className="warroom-primary-btn" onClick={() => copyAndOpen(draft)}>
                  Open in Chat →
                </button>
              </div>
            </div>

            <textarea
              className="warroom-draft"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
          </div>

          <div className="warroom-side-stack">
            <div className="warroom-panel">
              <div className="warroom-section-label" style={{ marginBottom: 14 }}>How it works</div>
              <div style={{ display: "grid", gap: 12 }}>
                {[
                  { step: "01", title: "Click any lane", body: "The lane prompt is automatically copied to your clipboard. OpenClaw opens in a new tab." },
                  { step: "02", title: "Paste and send", body: "In the new OpenClaw tab, paste the prompt and send it. The lane context is already set." },
                  { step: "03", title: "Run all four", body: "Open Sunny, Recruiting, Marketing, and Referrals in separate tabs. Swap between them freely while each runs independently." },
                  { step: "04", title: "Use quick actions", body: "Load any preset into the draft below, then click Open in Chat. Same flow — prompt copies, tab opens." },
                ].map((item) => (
                  <div key={item.step} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "rgba(201,169,110,0.25)", letterSpacing: "-0.04em", lineHeight: 1, flexShrink: 0, width: 32 }}>{item.step}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--fg)", marginBottom: 4 }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.65 }}>{item.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="warroom-panel">
              <div className="warroom-section-label" style={{ marginBottom: 14 }}>Lane Overview</div>
              <div style={{ display: "grid", gap: 10 }}>
                {[
                  { label: "Sunny ☀️", role: "Main hub. Priorities + coordination.", color: "#f0d7a1" },
                  { label: "Recruiting", role: "Recruiting machine. Volume + pipeline.", color: "#c9a96e" },
                  { label: "Marketing", role: "REVELATION brand + marketing.", color: "#8dd6c9" },
                  { label: "Referrals", role: "Referrals + warm appointments.", color: "#d98db8" },
                ].map((item) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", padding: "12px 14px", borderRadius: 16, border: "1px solid var(--border)", background: "rgba(255,255,255,0.025)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: item.color, letterSpacing: "-0.02em" }}>{item.label}</div>
                    <div style={{ fontSize: 12.5, color: "var(--fg-muted)", textAlign: "right" }}>{item.role}</div>
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
