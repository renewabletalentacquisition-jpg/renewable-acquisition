"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type LaneKey = "RECRUITING" | "MARKETING" | "REFERRALS";

type Lane = {
  key: LaneKey;
  title: string;
  role: string;
  accent: string;
  glow: string;
  emoji: string;
  sessionKey: string;
  prompt: string;
  status: string;
};

const lanes: Lane[] = [
  {
    key: "RECRUITING",
    title: "Recruiting",
    role: "Rep acquisition · funnels · onboarding",
    accent: "#c9a96e",
    glow: "rgba(201,169,110,0.3)",
    emoji: "🎯",
    sessionKey: "agent:main:explicit:warroom-rec",
    prompt: "You are Recruiting, a specialist under Sunny ☀️. You own the recruiting machine: renewableacquisition.com, applicant funnel, qualification, interview routing, onboarding, rep tracking. Goal: 20 reps in 20 days before April 27. Stay in the recruiting lane. What do you want to work on?",
    status: "Standing by",
  },
  {
    key: "MARKETING",
    title: "Marketing",
    role: "REVELATION · brand · website · Instagram",
    accent: "#8dd6c9",
    glow: "rgba(141,214,201,0.3)",
    emoji: "✦",
    sessionKey: "agent:main:explicit:warroom-mark",
    prompt: "You are Marketing, a specialist under Sunny ☀️. You own REVELATION brand, website, Instagram, visual identity, logo direction. Everything you build should increase team attractiveness. What do you want to work on?",
    status: "Standing by",
  },
  {
    key: "REFERRALS",
    title: "Referrals",
    role: "Installs · referrals · warm appointments",
    accent: "#d98db8",
    glow: "rgba(217,141,184,0.3)",
    emoji: "🔗",
    sessionKey: "agent:main:explicit:warroom-ref",
    prompt: "You are Referrals, a specialist under Sunny ☀️. You own installed-customer follow-up, referral generation, reactivation, and appointment pipeline. Sir has 65+ installs. What do you want to work on?",
    status: "Standing by",
  },
];

const SUNNY_SESSION = "agent:main:explicit:warroom-taiyou";
const SUNNY_PROMPT = "You are Sunny ☀️, the main hub orchestrator for Sir (Chase). You coordinate Recruiting, Marketing, and Referrals. You own priorities, sequencing, coordination, and synthesis. What do you want to work on?";
const TOKEN = "4585c4d851a3d2918c549530c8b234e5563f53389aaa78c6";
const BASE_URL = "http://127.0.0.1:18789";

type Activity = { lane: string; action: string; time: string; accent: string };

const initialActivity: Activity[] = [
  { lane: "SUNNY", action: "WarRoom initialized", time: "just now", accent: "#f0d7a1" },
  { lane: "RECRUITING", action: "Session ready", time: "just now", accent: "#c9a96e" },
  { lane: "MARKETING", action: "Session ready", time: "just now", accent: "#8dd6c9" },
  { lane: "REFERRALS", action: "Session ready", time: "just now", accent: "#d98db8" },
];

export default function WarRoomPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activity, setActivity] = useState<Activity[]>(initialActivity);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const hasAccess = typeof window !== "undefined" && window.localStorage.getItem("warroom-auth") === "ok";
    if (!hasAccess) { router.push("/warroom/login"); return; }
    setTimeout(() => setLoaded(true), 100);
  }, [router]);

  // Parallax mouse tracking
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  function openSession(sessionKey: string, prompt: string, laneName: string, accent: string) {
    const encoded = encodeURIComponent(sessionKey);
    const url = `${BASE_URL}/#token=${TOKEN}&session=${encoded}`;
    window.open(url, "_blank", "noopener");
    navigator.clipboard.writeText(prompt).catch(() => {});
    const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setActivity(prev => [{ lane: laneName.toUpperCase(), action: "Session opened", time: now, accent }, ...prev].slice(0, 10));
  }

  function signOut() {
    if (typeof window !== "undefined") window.localStorage.removeItem("warroom-auth");
    router.push("/warroom/login");
  }

  const bgX = mousePos.x * -18;
  const bgY = mousePos.y * -18;
  const fgX = mousePos.x * 8;
  const fgY = mousePos.y * 8;
  const cardX = mousePos.x * 4;
  const cardY = mousePos.y * 4;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#000",
        overflow: "hidden",
        fontFamily: "var(--font-body)",
        color: "#f4f3f0",
      }}
    >
      {/* ── Parallax background image ── */}
      <div
        ref={bgRef}
        style={{
          position: "fixed",
          inset: "-8%",
          backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Guido_Reni_-_St_Michael_the_Archangel_defeating_Satan_%281636%29.jpg/800px-Guido_Reni_-_St_Michael_the_Archangel_defeating_Satan_%281636%29.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          transform: `translate(${bgX}px, ${bgY}px)`,
          transition: "transform 0.12s ease-out",
          opacity: 0.22,
          zIndex: 0,
          filter: "grayscale(30%) contrast(1.1)",
        }}
      />

      {/* ── Dark gradient overlays ── */}
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.85) 100%)", zIndex: 1 }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,169,110,0.08), transparent)", zIndex: 1 }} />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 32px 80px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* ── Nav ── */}
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Private Command Layer
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="/hq" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#f4f3f0")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Team HQ</a>
            <a href="/admin" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
               onMouseEnter={e => (e.currentTarget.style.color = "#f4f3f0")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Applicants</a>
            <button onClick={signOut} style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s", padding: 0 }}
               onMouseEnter={e => (e.currentTarget.style.color = "#f4f3f0")}
               onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Sign Out</button>
          </div>
        </nav>

        {/* ── Hero title ── */}
        <div
          style={{
            textAlign: "center",
            padding: "72px 0 60px",
            transform: `translate(${fgX}px, ${fgY}px)`,
            transition: "transform 0.08s ease-out",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(201,169,110,0.7)", marginBottom: 28 }}>
            Revelation · Solar Sales Command
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 14vw, 180px)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: "0 0 20px",
              color: "#fff",
            }}
          >
            WarRoom.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
            Sunny at the center · Specialists underneath
          </p>
        </div>

        {/* ── Main layout: agent cards + activity ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, alignItems: "start" }}>
          <div>
            {/* ── Sunny hub card ── */}
            <div
              style={{
                transform: `translate(${cardX * 0.6}px, ${cardY * 0.6}px)`,
                transition: "transform 0.1s ease-out",
                marginBottom: 16,
              }}
            >
              <button
                type="button"
                onClick={() => openSession(SUNNY_SESSION, SUNNY_PROMPT, "Sunny", "#f0d7a1")}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "36px 40px",
                  background: "linear-gradient(135deg, rgba(240,215,161,0.12), rgba(240,215,161,0.04))",
                  border: "1px solid rgba(240,215,161,0.25)",
                  borderRadius: 24,
                  cursor: "pointer",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.25s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = "linear-gradient(135deg, rgba(240,215,161,0.2), rgba(240,215,161,0.08))";
                  el.style.borderColor = "rgba(240,215,161,0.5)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 24px 60px rgba(0,0,0,0.4), 0 0 80px rgba(240,215,161,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "linear-gradient(135deg, rgba(240,215,161,0.12), rgba(240,215,161,0.04))";
                  el.style.borderColor = "rgba(240,215,161,0.25)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                      <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(240,215,161,0.7)", padding: "5px 12px", border: "1px solid rgba(240,215,161,0.25)", borderRadius: 9999 }}>
                        Main Hub
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>LIVE</span>
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 5vw, 64px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1, marginBottom: 12 }}>
                      Sunny ☀️
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 600 }}>
                      Orchestrator · Priority engine · Synthesizer. Give Sunny a goal and she routes it to the right specialists, tracks all lanes, and delivers one clear execution order.
                    </div>
                  </div>
                  <div style={{ fontSize: 28, color: "rgba(240,215,161,0.3)", flexShrink: 0 }}>↗</div>
                </div>
              </button>
            </div>

            {/* ── Specialist lane cards ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 12,
                transform: `translate(${cardX * 0.3}px, ${cardY * 0.3}px)`,
                transition: "transform 0.14s ease-out",
              }}
            >
              {lanes.map((lane) => (
                <button
                  key={lane.key}
                  type="button"
                  onClick={() => openSession(lane.sessionKey, lane.prompt, lane.title, lane.accent)}
                  style={{
                    textAlign: "left",
                    padding: "26px 24px",
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid rgba(255,255,255,0.1)`,
                    borderRadius: 20,
                    cursor: "pointer",
                    backdropFilter: "blur(20px)",
                    transition: "all 0.25s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.background = `${lane.accent}12`;
                    el.style.borderColor = `${lane.accent}50`;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 40px ${lane.accent}10`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "rgba(255,255,255,0.1)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: lane.accent, padding: "4px 10px", border: `1px solid ${lane.accent}40`, borderRadius: 9999, background: `${lane.accent}12` }}>
                      {lane.emoji} {lane.title}
                    </span>
                    <span style={{ color: `${lane.accent}60`, fontSize: 16 }}>↗</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "#fff", marginBottom: 8, lineHeight: 1 }}>
                    {lane.title}
                  </div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                    {lane.role}
                  </div>
                  <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", display: "inline-block" }} />
                    <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{lane.status}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Quick commands ── */}
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
              {[
                { label: "☀️ Morning Brief", prompt: "Sunny: Give me a morning brief. What matters most today across Recruiting, Marketing, and Referrals? Give me the priority order." },
                { label: "🎯 Recruiting Push", prompt: "Recruiting: Focus only on increasing recruiting volume. What are the top 3 actions to push toward 20 reps before April 27?" },
                { label: "✦ Brand Sprint", prompt: "Marketing: What is the highest-leverage brand action I can take today for REVELATION?" },
                { label: "🔗 Referral Sprint", prompt: "Referrals: What is the fastest path to new appointments from my installed customer base today?" },
                { label: "⚡ Parallel Command", prompt: "Sunny: Run a coordinated pass. Route the top task to Recruiting, Marketing, and Referrals simultaneously. Merge results into one execution order." },
                { label: "🏆 20 in 20", prompt: "Sunny: The goal is 20 reps in 20 days before April 27. Build the exact plan right now." },
              ].map((cmd) => (
                <button
                  key={cmd.label}
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(cmd.prompt).catch(() => {});
                    const url = `${BASE_URL}/#token=${TOKEN}&session=${encodeURIComponent(SUNNY_SESSION)}`;
                    window.open(url, "_blank", "noopener");
                    const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
                    setActivity(prev => [{ lane: "SYSTEM", action: cmd.label, time: now, accent: "#f0d7a1" }, ...prev].slice(0, 10));
                  }}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.6)",
                    fontSize: 12.5,
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s ease",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={e => { (e.currentTarget).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget).style.color = "#fff"; (e.currentTarget).style.borderColor = "rgba(255,255,255,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget).style.background = "rgba(255,255,255,0.03)"; (e.currentTarget).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget).style.borderColor = "rgba(255,255,255,0.08)"; }}
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Live activity feed ── */}
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "22px 20px",
              backdropFilter: "blur(20px)",
              position: "sticky",
              top: 24,
              transform: `translate(${cardX * -0.2}px, ${cardY * -0.2}px)`,
              transition: "transform 0.16s ease-out",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Live Activity</span>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              {activity.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.accent, marginTop: 6, flexShrink: 0, boxShadow: `0 0 6px ${item.accent}` }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: item.accent, marginBottom: 2, letterSpacing: "0.04em" }}>{item.lane}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.action}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 12 }}>Agent Status</div>
              {[
                { name: "Sunny ☀️", accent: "#f0d7a1" },
                { name: "Recruiting", accent: "#c9a96e" },
                { name: "Marketing", accent: "#8dd6c9" },
                { name: "Referrals", accent: "#d98db8" },
              ].map((agent) => (
                <div key={agent.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 12.5, color: agent.accent, fontWeight: 600 }}>{agent.name}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 5px #4ade80" }} />
                    Ready
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 60, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.3)" }}>
            Revelation <span style={{ color: "#c9a96e" }}>Solar</span>
          </span>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
            Powered by Sunny ☀️
          </span>
        </div>
      </div>
    </div>
  );
}
