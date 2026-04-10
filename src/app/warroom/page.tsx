"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type LaneKey = "RECRUITING" | "MARKETING" | "REFERRALS";

type Lane = {
  key: LaneKey;
  title: string;
  role: string;
  detail: string;
  accent: string;
  glow: string;
  emoji: string;
  sessionKey: string;
  prompt: string;
};

const lanes: Lane[] = [
  {
    key: "RECRUITING",
    title: "Recruiting",
    role: "Recruiting machine",
    detail: "Applicants · funnels · interviews · onboarding · rep ops",
    accent: "#c9a96e",
    glow: "rgba(201,169,110,0.25)",
    emoji: "🎯",
    sessionKey: "agent:main:explicit:warroom-rec",
    prompt: "You are Recruiting, a specialist under Sunny ☀️. You own the recruiting machine: renewableacquisition.com, applicant funnel, qualification, interview routing, onboarding, rep tracking. Goal: 20 reps in 20 days before April 27. Stay in the recruiting lane. What do you want to work on?",
  },
  {
    key: "MARKETING",
    title: "Marketing",
    role: "Brand + marketing lane",
    detail: "REVELATION · website · Instagram · visual identity · team brand",
    accent: "#8dd6c9",
    glow: "rgba(141,214,201,0.25)",
    emoji: "✦",
    sessionKey: "agent:main:explicit:warroom-mark",
    prompt: "You are Marketing, a specialist under Sunny ☀️. You own REVELATION brand, website, Instagram, visual identity, logo direction. Everything you build should increase team attractiveness and recruiting conversion. What do you want to work on?",
  },
  {
    key: "REFERRALS",
    title: "Referrals",
    role: "Referral + lead machine",
    detail: "Installed customers · referrals · reactivation · appointments",
    accent: "#d98db8",
    glow: "rgba(217,141,184,0.25)",
    emoji: "🔗",
    sessionKey: "agent:main:explicit:warroom-ref",
    prompt: "You are Referrals, a specialist under Sunny ☀️. You own installed-customer follow-up, referral generation, reactivation, and appointment pipeline. Sir has 65+ installs. What do you want to work on?",
  },
];

const SUNNY_SESSION = "agent:main:explicit:warroom-taiyou";
const SUNNY_PROMPT = "You are Sunny ☀️, the main hub orchestrator for Sir (Chase). You coordinate Recruiting, Marketing, and Referrals. You own priorities, sequencing, coordination, and synthesis. What do you want to work on?";
const TOKEN = "4585c4d851a3d2918c549530c8b234e5563f53389aaa78c6";
const BASE_URL = "http://127.0.0.1:18789";

const quickActions = [
  { label: "☀️ Morning Brief", lane: "SUNNY", prompt: "Sunny: Give me a morning brief. What matters most today across Recruiting, Marketing, and Referrals? Priority order only." },
  { label: "🎯 Recruiting Push", lane: "RECRUITING", prompt: "Recruiting: Top 3 actions to push toward 20 reps before April 27. Go." },
  { label: "✦ Brand Sprint", lane: "MARKETING", prompt: "Marketing: Highest-leverage brand action for REVELATION today. Go." },
  { label: "🔗 Referral Sprint", lane: "REFERRALS", prompt: "Referrals: Fastest path to new appointments from my install base today. Go." },
  { label: "⚡ Parallel Command", lane: "SUNNY", prompt: "Sunny: Dispatch top task to Recruiting, Marketing, and Referrals simultaneously. Merge results into one execution order for Sir." },
  { label: "🏆 20 in 20 Plan", lane: "SUNNY", prompt: "Sunny: 20 reps in 20 days before April 27. Build the exact execution plan now." },
];

type Activity = { lane: string; action: string; time: string; accent: string };

export default function WarRoomPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activity, setActivity] = useState<Activity[]>([
    { lane: "SYSTEM", action: "WarRoom initialized", time: now(), accent: "#f0d7a1" },
    { lane: "SUNNY", action: "Hub standing by", time: now(), accent: "#f0d7a1" },
    { lane: "RECRUITING", action: "Session ready", time: now(), accent: "#c9a96e" },
    { lane: "MARKETING", action: "Session ready", time: now(), accent: "#8dd6c9" },
    { lane: "REFERRALS", action: "Session ready", time: now(), accent: "#d98db8" },
  ]);

  useEffect(() => {
    const ok = typeof window !== "undefined" && window.localStorage.getItem("warroom-auth") === "ok";
    if (!ok) { router.push("/warroom/login"); return; }
    setTimeout(() => setLoaded(true), 80);
  }, [router]);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  function openSession(sessionKey: string, prompt: string, label: string, accent: string) {
    const url = `${BASE_URL}/#token=${TOKEN}&session=${encodeURIComponent(sessionKey)}`;
    window.open(url, "_blank", "noopener");
    navigator.clipboard.writeText(prompt).catch(() => {});
    log(label.toUpperCase(), "Session opened", accent);
  }

  function log(lane: string, action: string, accent: string) {
    setActivity(prev => [{ lane, action, time: now(), accent }, ...prev].slice(0, 12));
  }

  function signOut() {
    typeof window !== "undefined" && window.localStorage.removeItem("warroom-auth");
    router.push("/warroom/login");
  }

  const bgShift = `translate(${mouse.x * -22}px, ${mouse.y * -22}px)`;
  const midShift = `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`;
  const cardShift = `translate(${mouse.x * 4}px, ${mouse.y * 4}px)`;
  const feedShift = `translate(${mouse.x * -3}px, ${mouse.y * -3}px)`;

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#050507", overflow: "hidden", fontFamily: "var(--font-body)", color: "#f4f3f0" }}>

      {/* ── Parallax painting ── */}
      <div style={{
        position: "fixed",
        inset: "-10%",
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Guido_Reni_-_St_Michael_the_Archangel_defeating_Satan_%281636%29.jpg/800px-Guido_Reni_-_St_Michael_the_Archangel_defeating_Satan_%281636%29.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        transform: bgShift,
        transition: "transform 0.14s ease-out",
        opacity: 0.25,
        zIndex: 0,
        filter: "sepia(20%) contrast(1.08)",
      }} />

      {/* ── Overlays ── */}
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(180deg, rgba(5,5,7,0.78) 0%, rgba(5,5,7,0.45) 45%, rgba(5,5,7,0.92) 100%)", zIndex: 1 }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(201,169,110,0.1), transparent)", zIndex: 1 }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(5,5,7,0.95), transparent)", zIndex: 1 }} />

      {/* ── Content ── */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: 1420,
        margin: "0 auto",
        padding: "0 36px 80px",
        opacity: loaded ? 1 : 0,
        transform: loaded ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>

        {/* ── Nav ── */}
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "26px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
            Private Command Layer
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {[
              { label: "Team HQ", href: "/hq" },
              { label: "Applicants", href: "/admin" },
              { label: "DM", href: "/dm" },
            ].map(link => (
              <a key={link.href} href={link.href} style={{
                fontSize: 12,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                padding: "8px 16px",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
              >{link.label}</a>
            ))}
            <button onClick={signOut} style={{
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 16px",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >Sign Out</button>
          </div>
        </nav>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", padding: "64px 0 48px", transform: midShift, transition: "transform 0.1s ease-out" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(201,169,110,0.65)", marginBottom: 24 }}>
            Revelation · Solar Sales Command
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px, 15vw, 190px)",
            fontWeight: 600,
            letterSpacing: "-0.045em",
            lineHeight: 0.88,
            margin: "0 0 18px",
            color: "#fff",
            textShadow: "0 0 120px rgba(201,169,110,0.12)",
          }}>
            WarRoom.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
            Sunny at the center · Specialists underneath
          </p>
        </div>

        {/* ── Main layout ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, alignItems: "start" }}>

          {/* ── Left: agents ── */}
          <div style={{ transform: cardShift, transition: "transform 0.12s ease-out" }}>

            {/* ── Sunny centered hub ── */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <button
                type="button"
                onClick={() => openSession(SUNNY_SESSION, SUNNY_PROMPT, "Sunny", "#f0d7a1")}
                style={{
                  width: "100%",
                  maxWidth: 720,
                  textAlign: "left",
                  padding: "38px 44px",
                  background: "linear-gradient(135deg, rgba(240,215,161,0.13) 0%, rgba(240,215,161,0.05) 100%)",
                  border: "1px solid rgba(240,215,161,0.28)",
                  borderRadius: 28,
                  cursor: "pointer",
                  backdropFilter: "blur(24px)",
                  transition: "all 0.28s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = "linear-gradient(135deg, rgba(240,215,161,0.22) 0%, rgba(240,215,161,0.1) 100%)";
                  el.style.borderColor = "rgba(240,215,161,0.55)";
                  el.style.transform = "translateY(-5px)";
                  el.style.boxShadow = "0 30px 80px rgba(0,0,0,0.5), 0 0 100px rgba(240,215,161,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = "linear-gradient(135deg, rgba(240,215,161,0.13) 0%, rgba(240,215,161,0.05) 100%)";
                  el.style.borderColor = "rgba(240,215,161,0.28)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Subtle glow behind */}
                <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 300, height: 200, background: "radial-gradient(ellipse, rgba(240,215,161,0.12), transparent)", borderRadius: "50%", pointerEvents: "none" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "rgba(240,215,161,0.7)", padding: "5px 12px", border: "1px solid rgba(240,215,161,0.3)", borderRadius: 9999 }}>
                        Main Hub
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 10px #4ade80", display: "inline-block" }} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>LIVE</span>
                      </span>
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(46px, 6vw, 72px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1, marginBottom: 14 }}>
                      Sunny ☀️
                    </div>
                    <div style={{ fontSize: 14.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 520 }}>
                      Orchestrator · Priority engine · Synthesizer. Give Sunny a goal — she routes it to the right specialists, tracks every lane, and returns one clear execution order.
                    </div>
                  </div>
                  <div style={{ fontSize: 32, color: "rgba(240,215,161,0.25)", flexShrink: 0, marginLeft: 20 }}>↗</div>
                </div>
              </button>
            </div>

            {/* ── 3 specialist cards ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 14 }}>
              {lanes.map(lane => (
                <button
                  key={lane.key}
                  type="button"
                  onClick={() => openSession(lane.sessionKey, lane.prompt, lane.title, lane.accent)}
                  style={{
                    textAlign: "left",
                    padding: "28px 24px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 22,
                    cursor: "pointer",
                    backdropFilter: "blur(20px)",
                    transition: "all 0.26s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.background = `${lane.accent}10`;
                    el.style.borderColor = `${lane.accent}55`;
                    el.style.transform = "translateY(-5px)";
                    el.style.boxShadow = `0 24px 60px rgba(0,0,0,0.45), 0 0 50px ${lane.accent}08`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "rgba(255,255,255,0.09)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: lane.accent, padding: "4px 10px", border: `1px solid ${lane.accent}40`, borderRadius: 9999, background: `${lane.accent}14` }}>
                      {lane.emoji} {lane.title}
                    </span>
                    <span style={{ color: `${lane.accent}55`, fontSize: 18 }}>↗</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 600, letterSpacing: "-0.025em", color: "#fff", lineHeight: 1, marginBottom: 10 }}>
                    {lane.title}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                    {lane.role}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 16 }}>
                    {lane.detail}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 7px #4ade80", display: "inline-block" }} />
                    <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Standing by</span>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Quick commands ── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 }}>
              {quickActions.map(cmd => (
                <button
                  key={cmd.label}
                  type="button"
                  onClick={() => {
                    const sessionKey = cmd.lane === "SUNNY" ? SUNNY_SESSION : lanes.find(l => l.key === cmd.lane as LaneKey)?.sessionKey || SUNNY_SESSION;
                    const accent = cmd.lane === "SUNNY" ? "#f0d7a1" : lanes.find(l => l.key === cmd.lane as LaneKey)?.accent || "#f0d7a1";
                    openSession(sessionKey, cmd.prompt, cmd.label, accent);
                  }}
                  style={{
                    textAlign: "left",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 12.5,
                    fontFamily: "var(--font-body)",
                    transition: "all 0.2s ease",
                    lineHeight: 1.4,
                  }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.06)"; el.style.color = "#fff"; el.style.borderColor = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.025)"; el.style.color = "rgba(255,255,255,0.55)"; el.style.borderColor = "rgba(255,255,255,0.07)"; }}
                >
                  {cmd.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: activity feed ── */}
          <div style={{
            background: "rgba(0,0,0,0.65)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 22,
            padding: "24px 20px",
            backdropFilter: "blur(24px)",
            position: "sticky",
            top: 24,
            transform: feedShift,
            transition: "transform 0.18s ease-out",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block" }} />
              <span style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>Live Activity</span>
            </div>

            <div style={{ display: "grid", gap: 12, marginBottom: 24 }}>
              {activity.map((item, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "8px 1fr", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.accent, boxShadow: `0 0 6px ${item.accent}`, marginTop: 5 }} />
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: item.accent, marginBottom: 2, letterSpacing: "0.04em" }}>{item.lane}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>{item.action}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 2 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18 }}>
              <div style={{ fontSize: 10.5, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 14 }}>Agent Status</div>
              {[
                { name: "Sunny ☀️", accent: "#f0d7a1", role: "Hub" },
                { name: "Recruiting", accent: "#c9a96e", role: "Specialist" },
                { name: "Marketing", accent: "#8dd6c9", role: "Specialist" },
                { name: "Referrals", accent: "#d98db8", role: "Specialist" },
              ].map(agent => (
                <div key={agent.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: agent.accent }}>{agent.name}</div>
                    <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.25)" }}>{agent.role}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 6px #4ade80" }} />
                    <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", letterSpacing: "0.04em" }}>Ready</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ marginTop: 56, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, color: "rgba(255,255,255,0.25)" }}>
            Revelation <span style={{ color: "#c9a96e" }}>Solar</span>
          </span>
          <span style={{ fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
            Powered by Sunny ☀️ · OpenClaw
          </span>
        </div>

      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
