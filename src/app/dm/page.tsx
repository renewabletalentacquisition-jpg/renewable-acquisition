"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Stage = "scraped" | "qualified" | "messaged" | "replied" | "interview_scheduled" | "hired" | "rejected";

type Prospect = {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  full_name: string;
  platform: string;
  profile_url: string;
  phone: string;
  email: string;
  location: string;
  stage: Stage;
  bio: string;
  scraped_from: string;
  notes: string;
  score: number;
  signals: string;
  message_sent: string;
  message_sent_at: string;
  interview_date: string;
};

const STAGES: { id: Stage; label: string; color: string; accent: string }[] = [
  { id: "scraped",             label: "Scraped",            color: "rgba(255,255,255,0.04)", accent: "rgba(255,255,255,0.3)" },
  { id: "qualified",           label: "Qualified",          color: "rgba(201,169,110,0.08)", accent: "#c9a96e" },
  { id: "messaged",            label: "Message Sent",       color: "rgba(96,165,250,0.08)",  accent: "#60a5fa" },
  { id: "replied",             label: "Replied",            color: "rgba(167,243,208,0.08)", accent: "#6ee7b7" },
  { id: "interview_scheduled", label: "Interview Scheduled",color: "rgba(167,139,250,0.08)", accent: "#a78bfa" },
  { id: "hired",               label: "Hired",              color: "rgba(134,239,172,0.08)", accent: "#86efac" },
  { id: "rejected",            label: "Rejected",           color: "rgba(248,113,113,0.06)", accent: "#f87171" },
];

const DAILY_DM_LIMIT = 30;
const DM_STORAGE_KEY = "dm-templates-v1";

const DEFAULT_DM_TEMPLATES = [
  `Hey [name], hope you're doing well. What are you doing for work right now, and would you be open to hearing about a sales opportunity?`,
  `Hey [name], hope all is well. Just curious, what are you currently doing for work, and are you at all open to a sales opportunity?`,
  `What's up [name], hope you're doing good. What are you doing for work right now, and would you be open to exploring a sales opportunity?`,
  `Hey [name], wanted to reach out and ask what you're currently doing for work. Also, are you closed off to sales, or would you be open to hearing about an opportunity?`,
  `Yo [name], hope you're doing well. What are you currently doing for work, and are you open to a sales opportunity if it made sense?`,
  `Hey [name], quick question, what are you doing for work right now, and would you be open to hearing about a sales position?`,
  `What's going on [name], hope everything's been good. Are you working right now, and would you be open to a sales opportunity?`,
  `Hey [name], hope your week's going well. What are you currently doing for work, and are you open to hearing about a possible sales opportunity?`,
  `Hey [name], random question, what are you doing for work right now, and are you completely closed off to sales or open to hearing more?`,
  `Hey [name], hope all is well with you. I wanted to ask what you're currently doing for work, and whether you'd be open to a sales opportunity.`,
];

function timeAgo(ts: string) {
  if (!ts) return "—";
  const diff = Date.now() - new Date(ts).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ago`;
  if (h > 0) return `${h}h ago`;
  return "just now";
}

export default function PipelinePage() {
  const router = useRouter();
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Prospect | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editInterview, setEditInterview] = useState("");
  const [saving, setSaving] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newProspect, setNewProspect] = useState({ username: "", full_name: "", profile_url: "", location: "", bio: "", scraped_from: "instagram" });
  const [dragId, setDragId] = useState<string | null>(null);
  const [templateIdx, setTemplateIdx] = useState(0);
  const [dmTemplates, setDmTemplates] = useState<string[]>(DEFAULT_DM_TEMPLATES);
  const [editingTemplateIdx, setEditingTemplateIdx] = useState<number | null>(null);
  const [editingTemplateText, setEditingTemplateText] = useState("");

  useEffect(() => {
    const ok = typeof window !== "undefined" && window.localStorage.getItem("admin-auth") === "ok";
    if (!ok) {
      supabase.auth.getUser().then(({ data }) => {
        if (!data.user) router.push("/admin/login");
      });
    }

    if (typeof window !== "undefined") {
      const savedTemplates = window.localStorage.getItem(DM_STORAGE_KEY);
      if (savedTemplates) {
        try {
          const parsed = JSON.parse(savedTemplates);
          if (Array.isArray(parsed) && parsed.length) {
            setDmTemplates(parsed);
          }
        } catch {}
      }
    }

    void fetchProspects();
  }, [router]);

  async function fetchProspects() {
    setLoading(true);
    const { data } = await supabase.from("prospects").select("*").order("created_at", { ascending: false });
    setProspects((data as Prospect[]) || []);
    setLoading(false);
  }

  async function moveStage(prospect: Prospect, newStage: Stage) {
    const { error } = await supabase.from("prospects").update({ stage: newStage, stage_updated_at: new Date().toISOString() }).eq("id", prospect.id);
    if (!error) {
      setProspects(prev => prev.map(p => p.id === prospect.id ? { ...p, stage: newStage } : p));
      if (selected?.id === prospect.id) setSelected({ ...selected, stage: newStage });
    }
  }

  async function saveSelected() {
    if (!selected) return;
    setSaving(true);
    const updates: Record<string, string> = { notes: editNotes };
    if (editPhone) updates.phone = editPhone;
    if (editInterview) updates.interview_date = editInterview;
    const { error } = await supabase.from("prospects").update(updates).eq("id", selected.id);
    if (!error) {
      setProspects(prev => prev.map(p => p.id === selected.id ? { ...p, ...updates } : p));
      setSelected({ ...selected, ...updates });
    }
    setSaving(false);
  }

  async function addProspect() {
    if (!newProspect.username) return;
    const { data, error } = await supabase.from("prospects").insert({ ...newProspect, stage: "scraped", score: 0 }).select().single();
    if (!error && data) {
      setProspects(prev => [data as Prospect, ...prev]);
      setNewProspect({ username: "", full_name: "", profile_url: "", location: "", bio: "", scraped_from: "instagram" });
      setAddOpen(false);
    }
  }

  async function deleteProspect(id: string) {
    if (!window.confirm("Delete this prospect?")) return;
    await supabase.from("prospects").delete().eq("id", id);
    setProspects(prev => prev.filter(p => p.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function openSelected(p: Prospect) {
    setSelected(p);
    setEditNotes(p.notes || "");
    setEditPhone(p.phone || "");
    setEditInterview(p.interview_date || "");
  }

  function handleDragStart(id: string) { setDragId(id); }
  function handleDragOver(e: React.DragEvent) { e.preventDefault(); }
  function handleDrop(e: React.DragEvent, stage: Stage) {
    e.preventDefault();
    if (!dragId) return;
    const p = prospects.find(x => x.id === dragId);
    if (p && p.stage !== stage) void moveStage(p, stage);
    setDragId(null);
  }

  function saveTemplateEdit() {
    if (editingTemplateIdx === null) return;
    const next = [...dmTemplates];
    next[editingTemplateIdx] = editingTemplateText.trim() || DEFAULT_DM_TEMPLATES[editingTemplateIdx];
    setDmTemplates(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DM_STORAGE_KEY, JSON.stringify(next));
    }
    setEditingTemplateIdx(null);
    setEditingTemplateText("");
  }

  function resetTemplates() {
    setDmTemplates(DEFAULT_DM_TEMPLATES);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DM_STORAGE_KEY, JSON.stringify(DEFAULT_DM_TEMPLATES));
    }
    setEditingTemplateIdx(null);
    setEditingTemplateText("");
    setTemplateIdx(0);
  }

  const byStage = (stage: Stage) => prospects.filter(p => p.stage === stage);
  const counts = Object.fromEntries(STAGES.map(s => [s.id, byStage(s.id).length]));
  const total = prospects.length;
  const dm = dmTemplates[templateIdx] || DEFAULT_DM_TEMPLATES[0];

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)", display: "flex", flexDirection: "column" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--border)", background: "rgba(8,8,10,0.88)", backdropFilter: "blur(20px)", padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <a href="/" style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, textDecoration: "none", color: "var(--fg)" }}>
            Renewable <span style={{ color: "var(--accent)" }}>Acquisition</span>
          </a>
          <div style={{ display: "flex", gap: 4 }}>
            <a href="/admin" style={{ fontSize: 12.5, color: "var(--fg-muted)", padding: "6px 12px", borderRadius: 9999, textDecoration: "none", border: "1px solid var(--border)" }}>Applicants</a>
            <span style={{ fontSize: 12.5, padding: "6px 12px", borderRadius: 9999, background: "var(--accent)", color: "#0d0b08", fontWeight: 600 }}>DM</span>
            <a href="/hq" style={{ fontSize: 12.5, color: "var(--fg-muted)", padding: "6px 12px", borderRadius: 9999, textDecoration: "none", border: "1px solid var(--border)" }}>Team HQ</a>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 12.5, color: "var(--fg-dim)" }}>{total} prospects</span>
          <button onClick={() => void fetchProspects()} style={{ padding: "7px 14px", borderRadius: 9999, fontSize: 12.5, cursor: "pointer", border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>↻</button>
          <button onClick={() => setAddOpen(true)} className="btn-gold" style={{ padding: "8px 18px", fontSize: 12.5 }}>+ Add Prospect</button>
        </div>
      </header>

      {/* Stats bar */}
      <div style={{ borderBottom: "1px solid var(--border)", padding: "12px 28px", background: "rgba(8,8,10,0.5)", display: "flex", gap: 24, overflowX: "auto" }}>
        {STAGES.map(s => (
          <div key={s.id} style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.accent, display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>{s.label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: s.accent, fontFamily: "var(--font-display)" }}>{counts[s.id] || 0}</span>
          </div>
        ))}
      </div>

      <section style={{ padding: "20px 28px 0", borderBottom: "1px solid var(--border)", background: "linear-gradient(180deg, rgba(201,169,110,0.05), rgba(8,8,10,0))" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>DM Library</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, letterSpacing: "-0.03em", marginTop: 6 }}>10 rotating opener scripts</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ padding: "10px 14px", borderRadius: 9999, border: "1px solid rgba(201,169,110,0.25)", background: "rgba(201,169,110,0.08)", color: "var(--accent-soft)", fontSize: 12.5, fontWeight: 600 }}>
              Daily cap: {DAILY_DM_LIMIT} DMs
            </div>
            <button onClick={resetTemplates} style={{ padding: "10px 14px", borderRadius: 9999, border: "1px solid var(--border-strong)", background: "rgba(255,255,255,0.04)", color: "var(--fg-muted)", fontSize: 12.5, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body)" }}>
              Reset scripts
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12, paddingBottom: 20 }}>
          {dmTemplates.map((template, i) => (
            <div
              key={i}
              style={{ textAlign: "left", padding: "16px 18px", borderRadius: 20, border: `1px solid ${templateIdx === i ? "rgba(201,169,110,0.4)" : "var(--border)"}`, background: templateIdx === i ? "rgba(201,169,110,0.08)" : "rgba(255,255,255,0.03)", color: "var(--fg)", transition: "all 0.18s ease" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, gap: 10 }}>
                <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: templateIdx === i ? "var(--accent-soft)" : "var(--fg-dim)", fontWeight: 700 }}>Version {i + 1}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button onClick={() => {
                    setTemplateIdx(i);
                    navigator.clipboard.writeText(template.replace("[name]", selected?.full_name?.split(" ")[0] || selected?.username || "First Name")).catch(() => {});
                  }} style={{ fontSize: 11.5, color: "var(--fg-muted)", background: "transparent", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)" }}>Copy</button>
                  <button onClick={() => {
                    setEditingTemplateIdx(i);
                    setEditingTemplateText(template);
                  }} style={{ fontSize: 11.5, color: "var(--accent-soft)", background: "transparent", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)" }}>Edit</button>
                </div>
              </div>
              <button
                onClick={() => setTemplateIdx(i)}
                style={{ display: "block", width: "100%", textAlign: "left", fontSize: 13, lineHeight: 1.7, color: "var(--fg-muted)", background: "transparent", border: "none", cursor: "pointer", padding: 0, fontFamily: "var(--font-body)" }}
              >
                {template.replace("[name]", selected?.full_name?.split(" ")[0] || selected?.username || "First Name")}
              </button>
            </div>
          ))}
        </div>
      </section>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Kanban board */}
        <div style={{ flex: 1, overflowX: "auto", padding: "20px 28px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          {STAGES.filter(s => s.id !== "rejected").map(stage => (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={e => handleDrop(e, stage.id)}
              style={{ width: 240, flexShrink: 0, background: stage.color, border: `1px solid ${stage.accent}22`, borderRadius: 20, padding: "14px 12px", minHeight: 300 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, padding: "0 4px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: stage.accent }}>{stage.label}</div>
                <div style={{ fontSize: 12, color: "var(--fg-dim)", fontFamily: "var(--font-display)", fontWeight: 600 }}>{counts[stage.id] || 0}</div>
              </div>

              {loading ? (
                <div style={{ fontSize: 12, color: "var(--fg-dim)", padding: "12px 4px" }}>Loading…</div>
              ) : byStage(stage.id).length === 0 ? (
                <div style={{ fontSize: 11.5, color: "var(--fg-dim)", padding: "12px 4px", opacity: 0.5, textAlign: "center" }}>Empty</div>
              ) : (
                byStage(stage.id).map(p => (
                  <div
                    key={p.id}
                    draggable
                    onDragStart={() => handleDragStart(p.id)}
                    onClick={() => openSelected(p)}
                    style={{ padding: "12px 14px", marginBottom: 8, borderRadius: 16, border: `1px solid ${selected?.id === p.id ? stage.accent : "rgba(255,255,255,0.08)"}`, background: selected?.id === p.id ? `${stage.accent}18` : "rgba(8,8,10,0.6)", cursor: "grab", transition: "all 0.15s" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 4 }}>
                      <div style={{ fontWeight: 600, fontSize: 13.5, color: "var(--fg)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>
                        {p.full_name || `@${p.username}`}
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          void deleteProspect(p.id);
                        }}
                        style={{ border: "1px solid rgba(248,113,113,0.22)", background: "rgba(248,113,113,0.08)", color: "#f87171", width: 24, height: 24, borderRadius: 9999, cursor: "pointer", fontSize: 12, lineHeight: 1, flexShrink: 0 }}
                        title="Delete prospect"
                      >
                        ×
                      </button>
                    </div>
                    {p.username && <div style={{ fontSize: 11.5, color: "var(--fg-dim)", marginBottom: 6 }}>@{p.username}</div>}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {p.location && <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 9999, background: "rgba(255,255,255,0.06)", color: "var(--fg-muted)" }}>{p.location}</span>}
                      {p.score > 0 && <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 9999, background: `${stage.accent}22`, color: stage.accent }}>score {p.score}</span>}
                    </div>
                    {(p.profile_url || p.username) && (
                      <a
                        href={p.profile_url || `https://instagram.com/${p.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, fontSize: 10.5, color: stage.accent, textDecoration: "none" }}
                      >
                        Open profile ↗
                      </a>
                    )}
                    <div style={{ fontSize: 10.5, color: "var(--fg-dim)", marginTop: 6 }}>{timeAgo(p.created_at)}</div>
                  </div>
                ))
              )}
            </div>
          ))}

          {/* Rejected column compact */}
          <div
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, "rejected")}
            style={{ width: 160, flexShrink: 0, background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.1)", borderRadius: 20, padding: "14px 12px", minHeight: 300, opacity: 0.7 }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f87171", marginBottom: 14, padding: "0 4px" }}>Rejected <span style={{ marginLeft: 6, fontFamily: "var(--font-display)", fontSize: 12 }}>{counts["rejected"] || 0}</span></div>
            {byStage("rejected").map(p => (
              <div key={p.id} draggable onDragStart={() => handleDragStart(p.id)} onClick={() => openSelected(p)} style={{ padding: "10px 12px", marginBottom: 6, borderRadius: 14, border: "1px solid rgba(248,113,113,0.12)", background: "rgba(8,8,10,0.5)", cursor: "grab" }}>
                <div style={{ fontSize: 12, color: "var(--fg-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.full_name || `@${p.username}`}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ width: 360, borderLeft: "1px solid var(--border)", background: "var(--bg-subtle)", overflowY: "auto", padding: "24px 22px", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--fg)", letterSpacing: "-0.02em" }}>{selected.full_name || `@${selected.username}`}</div>
                {selected.username && <a href={selected.profile_url || `https://instagram.com/${selected.username}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "var(--fg-dim)", textDecoration: "none" }}>@{selected.username} ↗</a>}
              </div>
              <button onClick={() => setSelected(null)} style={{ padding: "6px 12px", borderRadius: 9999, fontSize: 12, cursor: "pointer", border: "1px solid var(--border)", background: "var(--bg-panel)", color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>✕</button>
            </div>

            {/* Stage mover */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 10 }}>Move to Stage</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {STAGES.map(s => (
                  <button key={s.id} onClick={() => void moveStage(selected, s.id)} style={{ padding: "6px 12px", borderRadius: 9999, fontSize: 11.5, fontWeight: 600, cursor: "pointer", border: `1px solid ${selected.stage === s.id ? s.accent : "var(--border)"}`, background: selected.stage === s.id ? `${s.accent}22` : "var(--bg-panel)", color: selected.stage === s.id ? s.accent : "var(--fg-muted)", fontFamily: "var(--font-body)", transition: "all 0.15s" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Info rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 18 }}>
              {[
                { label: "Platform", value: selected.platform || "instagram" },
                { label: "Location", value: selected.location || "—" },
                { label: "Scraped from", value: selected.scraped_from || "—" },
                { label: "Score", value: selected.score?.toString() || "0" },
                { label: "Signals", value: selected.signals || "—" },
                { label: "Added", value: timeAgo(selected.created_at) },
                { label: "Interview", value: selected.interview_date ? new Date(selected.interview_date).toLocaleString() : "—" },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{row.label}</span>
                  <span style={{ fontSize: 12.5, color: "var(--fg)", textAlign: "right", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis" }}>{row.value}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            {selected.bio && (
              <div style={{ marginBottom: 16, padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", fontSize: 12.5, color: "var(--fg-muted)", lineHeight: 1.7 }}>
                {selected.bio}
              </div>
            )}

            {/* Phone */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 6 }}>Phone</div>
              <input value={editPhone} onChange={e => setEditPhone(e.target.value)} placeholder="Add phone number" style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg)", fontSize: 13, fontFamily: "var(--font-body)", outline: "none" }} />
            </div>

            {/* Interview date */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 6 }}>Interview Date</div>
              <input type="datetime-local" value={editInterview} onChange={e => setEditInterview(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg)", fontSize: 13, fontFamily: "var(--font-body)", outline: "none" }} />
            </div>

            {/* Notes */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 6 }}>Notes</div>
              <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={3} placeholder="Add notes…" style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg)", fontSize: 13, fontFamily: "var(--font-body)", resize: "vertical", outline: "none" }} />
            </div>

            <button onClick={() => void saveSelected()} disabled={saving} className="btn-gold" style={{ width: "100%", justifyContent: "center", marginBottom: 10 }}>
              {saving ? "Saving…" : "Save Changes"}
            </button>

            {/* DM template */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)" }}>DM Script</div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {dmTemplates.map((_, i) => (
                    <button key={i} onClick={() => setTemplateIdx(i)} style={{ minWidth: 22, height: 22, padding: "0 6px", borderRadius: 9999, fontSize: 10, fontWeight: 600, cursor: "pointer", border: `1px solid ${templateIdx === i ? "var(--accent)" : "var(--border)"}`, background: templateIdx === i ? "var(--accent)" : "var(--bg-panel)", color: templateIdx === i ? "#0d0b08" : "var(--fg-muted)", fontFamily: "var(--font-body)" }}>{i + 1}</button>
                  ))}
                </div>
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", fontSize: 12.5, color: "var(--fg-muted)", lineHeight: 1.75 }}>
                {dm.replace("[name]", selected.full_name?.split(" ")[0] || selected.username || "[name]")}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(dm.replace("[name]", selected.full_name?.split(" ")[0] || selected.username || "[name]")); }} style={{ marginTop: 8, width: "100%", padding: "9px 0", borderRadius: 9999, fontSize: 12.5, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>
                Copy DM v{templateIdx + 1}
              </button>
            </div>

            <button onClick={() => void deleteProspect(selected.id)} style={{ marginTop: 12, width: "100%", padding: "10px 0", borderRadius: 9999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "1px solid rgba(248,113,113,0.28)", background: "rgba(248,113,113,0.08)", color: "#f87171", fontFamily: "var(--font-body)" }}>
              Delete Prospect
            </button>
          </div>
        )}
      </div>

      {editingTemplateIdx !== null && (
        <div style={{ position: "fixed", inset: 0, zIndex: 220, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={() => setEditingTemplateIdx(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", borderRadius: 28, padding: "28px 24px", width: "100%", maxWidth: 680 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>Edit script</div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "-0.02em", margin: "6px 0 0" }}>Version {editingTemplateIdx + 1}</h2>
              </div>
              <button onClick={() => setEditingTemplateIdx(null)} style={{ padding: "6px 12px", borderRadius: 9999, fontSize: 12, cursor: "pointer", border: "1px solid var(--border)", background: "var(--bg-panel)", color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>✕</button>
            </div>
            <textarea value={editingTemplateText} onChange={e => setEditingTemplateText(e.target.value)} rows={8} style={{ width: "100%", padding: "14px 16px", borderRadius: 18, border: "1px solid var(--border-strong)", background: "rgba(255,255,255,0.03)", color: "var(--fg)", fontSize: 14, lineHeight: 1.7, fontFamily: "var(--font-body)", resize: "vertical", outline: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
              <div style={{ fontSize: 12, color: "var(--fg-dim)" }}>Use [name] where you want the first name inserted.</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setEditingTemplateText(DEFAULT_DM_TEMPLATES[editingTemplateIdx])} className="btn-ghost" style={{ padding: "10px 16px" }}>Restore default</button>
                <button onClick={saveTemplateEdit} className="btn-gold" style={{ padding: "10px 16px" }}>Save script</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add prospect modal */}
      {addOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setAddOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "var(--bg-subtle)", border: "1px solid var(--border-strong)", borderRadius: 28, padding: "32px 28px", width: "100%", maxWidth: 460 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em", margin: "0 0 22px" }}>Add Prospect</h2>
            {[
              { key: "username", label: "Instagram Username", placeholder: "@username" },
              { key: "full_name", label: "Full Name", placeholder: "First Last" },
              { key: "profile_url", label: "Profile URL", placeholder: "https://instagram.com/..." },
              { key: "location", label: "Location", placeholder: "Riverside, CA" },
              { key: "bio", label: "Bio", placeholder: "Their Instagram bio…" },
              { key: "scraped_from", label: "Scraped From", placeholder: "#fratlife, sunrun followers…" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 12, color: "var(--fg-muted)", display: "block", marginBottom: 5 }}>{f.label}</label>
                <input value={(newProspect as Record<string, string>)[f.key]} onChange={e => setNewProspect(prev => ({ ...prev, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg)", fontSize: 13.5, fontFamily: "var(--font-body)", outline: "none" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button onClick={() => setAddOpen(false)} className="btn-ghost" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={() => void addProspect()} className="btn-gold" style={{ flex: 1, justifyContent: "center" }}>Add to Pipeline</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
