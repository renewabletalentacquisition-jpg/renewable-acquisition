"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type FilterKey = "all" | "closers" | "athletes" | "onboarding" | "needs-work";
type StatusKey = "active" | "onboarding" | "pitch-sent" | "needs-follow-up" | "not-started";

type RepRecord = {
  id: number;
  name: string;
  state: string;
  phone: string;
  position: string;
  pitchSent: string;
  onboardingComplete: string;
  status: StatusKey;
  notes: string;
};

const closerNames = new Set([
  "Rudy Cortez",
  "Joseph Gomez",
  "Meech",
  "Nicholas Bowman",
  "Dylan (TJ) Slaughter",
  "Sophia Salazar",
  "Sage (Maleek)",
]);

const initialRecords: RepRecord[] = [
  { id: 1, name: "Chase Pineda", state: "California", phone: "(951)588-9080", position: "Expert", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Leadership / owner lane." },
  { id: 2, name: "Rudy Cortez", state: "California", phone: "(702)373-125", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer." },
  { id: 3, name: "Joseph Gomez", state: "California", phone: "(951)349-520", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer. Has his own people." },
  { id: 4, name: "Meech", state: "California", phone: "(619)371-130", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer." },
  { id: 5, name: "Nicholas Bowman", state: "", phone: "9512168180", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer." },
  { id: 6, name: "Dylan (TJ) Slaughter", state: "", phone: "8138615593", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer." },
  { id: 7, name: "Sophia Salazar", state: "New Mexico", phone: "(575)208-934", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer." },
  { id: 8, name: "Hall Brock", state: "Canada", phone: "(916)260-711", position: "Athlete", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Strong athlete lane." },
  { id: 9, name: "Frank Quezada", state: "California", phone: "(408)799-00", position: "Athlete", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Athlete lane." },
  { id: 10, name: "Sage (Maleek)", state: "California", phone: "(951)3190126", position: "Closer", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Confirmed closer." },
  { id: 11, name: "Angel Miramont", state: "California", phone: "(323)723-792", position: "Athlete", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Athlete lane." },
  { id: 12, name: "savannah", state: "", phone: "", position: "Athlete", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Needs missing info filled in." },
  { id: 13, name: "Brennan Conlee", state: "California", phone: "(760)518-141", position: "Athlete", pitchSent: "Yes", onboardingComplete: "Yes", status: "active", notes: "Athlete lane." },
  { id: 14, name: "Angel Martinez", state: "California", phone: "9513806506", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 15, name: "Jose Rosas", state: "California", phone: "2096584920", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 16, name: "Adam Nunez", state: "California", phone: "7143957930", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 17, name: "Ezra Cousin", state: "", phone: "6196460998", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 18, name: "Austin Vanklompenberg", state: "", phone: "6164208500", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 19, name: "jaborie Moore", state: "", phone: "4433386996", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 20, name: "Nathaniel nowland", state: "", phone: "9517647828", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 21, name: "Isabella Enriquez", state: "", phone: "7865861757", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 22, name: "josh preciado", state: "", phone: "6196356543", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 23, name: "Eric osorio", state: "", phone: "9515702185", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 24, name: "Ryan Gibbs", state: "", phone: "9513496364", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 25, name: "luc piechowski", state: "", phone: "8054332202", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 26, name: "will naylor", state: "", phone: "9512399943", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Needs follow-up." },
  { id: 27, name: "Jacob Delaney (Joseph's)", state: "", phone: "9517183697", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "needs-follow-up", notes: "Joseph's person." },
  { id: 28, name: "Gavin Baker (Joseph's)", state: "", phone: "9514903312", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "needs-follow-up", notes: "Joseph's person." },
  { id: 29, name: "Brian Salazar (Joseph's)", state: "", phone: "9518371356", position: "Athlete", pitchSent: "No", onboardingComplete: "No", status: "needs-follow-up", notes: "Joseph's person." },
  { id: 30, name: "MD Garcia", state: "", phone: "7073456501", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 31, name: "Zach Ott", state: "", phone: "9512670631", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 32, name: "Robert Chavez", state: "", phone: "6573489912", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 33, name: "Harrison Green", state: "", phone: "6504655363", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 34, name: "Karlie Hayes", state: "", phone: "9513801541", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 35, name: "Kylie Kremer", state: "", phone: "2489108891", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 36, name: "Zachary Marquis Hudson", state: "", phone: "8134463251", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "not-started", notes: "Lower roster / bench list." },
  { id: 37, name: "Adrian Ventura", state: "", phone: "Instagram", position: "Prospect", pitchSent: "No", onboardingComplete: "No", status: "needs-follow-up", notes: "Instagram source lead." },
];

const statusMeta: Record<StatusKey, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "#4ade80", bg: "rgba(74,222,128,0.14)" },
  onboarding: { label: "Onboarding", color: "#a78bfa", bg: "rgba(167,139,250,0.14)" },
  "pitch-sent": { label: "Pitch Sent", color: "#c9a96e", bg: "rgba(201,169,110,0.15)" },
  "needs-follow-up": { label: "Needs Follow-Up", color: "#f59e0b", bg: "rgba(245,158,11,0.14)" },
  "not-started": { label: "Not Started", color: "#9ca3af", bg: "rgba(156,163,175,0.12)" },
};

function StatusBadge({ status }: { status: StatusKey }) {
  const meta = statusMeta[status];
  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, padding: "5px 12px", borderRadius: 9999, background: meta.bg, color: meta.color, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {meta.label}
    </span>
  );
}

function ValuePill({ value }: { value: string }) {
  const clean = value.toLowerCase();
  const color = clean === "yes" ? "#4ade80" : clean === "no" ? "#f87171" : "var(--fg-muted)";
  const bg = clean === "yes" ? "rgba(74,222,128,0.12)" : clean === "no" ? "rgba(248,113,113,0.10)" : "rgba(255,255,255,0.04)";
  return <span style={{ fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 9999, background: bg, color }}>{value}</span>;
}

export default function HQDashboardPage() {
  const router = useRouter();
  const [records, setRecords] = useState<RepRecord[]>(initialRecords);
  const [selectedId, setSelectedId] = useState<number>(initialRecords[0].id);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRep, setNewRep] = useState<Omit<RepRecord, "id">>({
    name: "",
    state: "",
    phone: "",
    position: "Prospect",
    pitchSent: "No",
    onboardingComplete: "No",
    status: "not-started",
    notes: "",
  });

  useEffect(() => {
    const hasLocalAccess = typeof window !== "undefined" && window.localStorage.getItem("hq-auth") === "ok";
    if (hasLocalAccess) return;
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/hq/login");
    });
  }, [router]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "closers"
            ? closerNames.has(record.name)
            : filter === "athletes"
              ? record.position === "Athlete"
              : filter === "onboarding"
                ? record.onboardingComplete === "No" || record.status === "onboarding"
                : ["needs-follow-up", "not-started"].includes(record.status);

      const q = search.trim().toLowerCase();
      const haystack = [record.name, record.state, record.phone, record.position, record.notes].join(" ").toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [records, filter, search]);

  const selected = filteredRecords.find((record) => record.id === selectedId) || records.find((record) => record.id === selectedId) || filteredRecords[0] || records[0];

  const stats = {
    total: records.length,
    closers: records.filter((r) => closerNames.has(r.name)).length,
    athletes: records.filter((r) => r.position === "Athlete").length,
    onboarding: records.filter((r) => r.onboardingComplete === "No").length,
  };

  function updateSelected(patch: Partial<RepRecord>) {
    if (!selected) return;
    setRecords((prev) => prev.map((record) => (record.id === selected.id ? { ...record, ...patch } : record)));
  }

  function addRep() {
    if (!newRep.name.trim()) return;
    const nextId = Math.max(...records.map((r) => r.id), 0) + 1;
    const created = { ...newRep, id: nextId };
    setRecords((prev) => [...prev, created]);
    setSelectedId(nextId);
    setShowAddForm(false);
    setNewRep({
      name: "",
      state: "",
      phone: "",
      position: "Prospect",
      pitchSent: "No",
      onboardingComplete: "No",
      status: "not-started",
      notes: "",
    });
  }

  function deleteSelected() {
    if (!selected) return;
    const remaining = records.filter((record) => record.id !== selected.id);
    setRecords(remaining);
    if (remaining.length > 0) {
      setSelectedId(remaining[0].id);
    }
  }

  async function handleSignOut() {
    if (typeof window !== "undefined") window.localStorage.removeItem("hq-auth");
    await supabase.auth.signOut();
    router.push("/hq/login");
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--border)", background: "rgba(8,8,10,0.88)", backdropFilter: "blur(20px)", padding: "0 24px", minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--fg)" }}>Team <span style={{ color: "var(--accent)" }}>HQ</span></span>
            <span className="lane-badge" style={{ color: "var(--accent)", borderColor: "rgba(201,169,110,0.28)", background: "rgba(201,169,110,0.12)" }}>Internal Ops</span>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--fg-dim)", marginTop: 4 }}>Roster structured from your current team sheet, with closers separated from the broader rep bench.</div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <a href="/warroom" className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12.5 }}>WarRoom</a>
          <button onClick={handleSignOut} className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12.5 }}>Sign Out</button>
        </div>
      </header>

      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "34px 24px 56px" }}>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginBottom: 26 }}>
          {[
            { label: "Total Team Records", value: stats.total, color: "var(--fg)" },
            { label: "Closers", value: stats.closers, color: "#c9a96e" },
            { label: "Athletes", value: stats.athletes, color: "#60a5fa" },
            { label: "Need Onboarding", value: stats.onboarding, color: "#f59e0b" },
          ].map((card) => (
            <div key={card.label} className="card" style={{ padding: "22px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em", color: card.color }}>{card.value}</div>
              <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 6 }}>{card.label}</div>
            </div>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: selected ? "minmax(0, 1.15fr) 440px" : "1fr", gap: 20, alignItems: "start" }}>
          <div>
            <div className="card" style={{ padding: 18, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {([
                    { key: "all", label: "All" },
                    { key: "closers", label: "Closers" },
                    { key: "athletes", label: "Athletes" },
                    { key: "onboarding", label: "Onboarding" },
                    { key: "needs-work", label: "Needs Work" },
                  ] as { key: FilterKey; label: string }[]).map((tab) => (
                    <button key={tab.key} type="button" onClick={() => setFilter(tab.key)} style={{ padding: "8px 16px", borderRadius: 9999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "1px solid", fontFamily: "var(--font-body)", transition: "all 0.15s ease", background: filter === tab.key ? "var(--accent)" : "var(--bg-panel)", color: filter === tab.key ? "#0d0b08" : "var(--fg-muted)", borderColor: filter === tab.key ? "var(--accent)" : "var(--border-strong)" }}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", width: "min(480px, 100%)", justifyContent: "flex-end" }}>
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search names, phone, notes..." style={{ flex: 1, minWidth: 180, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 9999, padding: "10px 16px", color: "var(--fg)", fontSize: 13.5, outline: "none", fontFamily: "var(--font-body)", boxSizing: "border-box" }} />
                  <button type="button" className="btn-gold" style={{ padding: "10px 16px", fontSize: 12.5 }} onClick={() => setShowAddForm((v) => !v)}>
                    + Add Person
                  </button>
                </div>
              </div>
            </div>

            {showAddForm && (
              <div className="card" style={{ padding: 18, marginBottom: 16 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 14 }}>Add Team Member</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, marginBottom: 12 }}>
                  <input value={newRep.name} onChange={(e) => setNewRep({ ...newRep, name: e.target.value })} placeholder="Name" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none" }} />
                  <input value={newRep.state} onChange={(e) => setNewRep({ ...newRep, state: e.target.value })} placeholder="State" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none" }} />
                  <input value={newRep.phone} onChange={(e) => setNewRep({ ...newRep, phone: e.target.value })} placeholder="Phone" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none" }} />
                  <input value={newRep.position} onChange={(e) => setNewRep({ ...newRep, position: e.target.value })} placeholder="Position" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none" }} />
                  <select value={newRep.pitchSent} onChange={(e) => setNewRep({ ...newRep, pitchSent: e.target.value })} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none" }}><option>Yes</option><option>No</option></select>
                  <select value={newRep.onboardingComplete} onChange={(e) => setNewRep({ ...newRep, onboardingComplete: e.target.value })} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none" }}><option>Yes</option><option>No</option></select>
                </div>
                <textarea value={newRep.notes} onChange={(e) => setNewRep({ ...newRep, notes: e.target.value })} placeholder="Notes" style={{ width: "100%", minHeight: 90, resize: "vertical", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 18, padding: "14px 16px", color: "var(--fg)", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12 }} />
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button type="button" className="btn-ghost" style={{ padding: "10px 16px", fontSize: 12.5 }} onClick={() => setShowAddForm(false)}>Cancel</button>
                  <button type="button" className="btn-gold" style={{ padding: "10px 16px", fontSize: 12.5 }} onClick={addRep}>Save Person</button>
                </div>
              </div>
            )}

            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
                    {["Rep Name", "State", "Phone", "Position", "Pitch", "Onboarding", "Status"].map((heading) => (
                      <th key={heading} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--fg-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{heading}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={record.id} onClick={() => setSelectedId(record.id)} style={{ borderBottom: index < filteredRecords.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", background: selected?.id === record.id ? "var(--bg-panel-strong)" : "transparent", transition: "background 0.15s ease" }}>
                      <td style={{ padding: "14px 16px", color: "var(--fg)", fontWeight: 600 }}>{record.name}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.state || "—"}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.phone || "—"}</td>
                      <td style={{ padding: "14px 16px", color: closerNames.has(record.name) ? "var(--accent)" : "var(--fg-muted)", fontWeight: closerNames.has(record.name) ? 700 : 500 }}>{record.position}</td>
                      <td style={{ padding: "14px 16px" }}><ValuePill value={record.pitchSent} /></td>
                      <td style={{ padding: "14px 16px" }}><ValuePill value={record.onboardingComplete} /></td>
                      <td style={{ padding: "14px 16px" }}>
                        <select
                          value={record.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            setRecords((prev) => prev.map((item) => item.id === record.id ? { ...item, status: e.target.value as StatusKey } : item));
                          }}
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 12, padding: "8px 10px", color: "var(--fg)", fontSize: 12.5, outline: "none", fontFamily: "var(--font-body)" }}
                        >
                          {Object.entries(statusMeta).map(([key, meta]) => (
                            <option key={key} value={key}>{meta.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selected && (
            <aside style={{ border: "1px solid var(--border-strong)", borderRadius: "var(--radius-lg)", background: "var(--bg-panel)", padding: "28px 24px", position: "sticky", top: 86 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 22 }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--fg)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>{selected.name}</h2>
                  <StatusBadge status={selected.status} />
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--fg-dim)", marginBottom: 6 }}>Role</div>
                  <div style={{ color: closerNames.has(selected.name) ? "var(--accent)" : "#60a5fa", fontWeight: 700, fontSize: 14 }}>{selected.position}</div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { label: "State", value: selected.state || "—" },
                  { label: "Phone", value: selected.phone || "—" },
                  { label: "Position", value: selected.position },
                  { label: "Closer", value: closerNames.has(selected.name) ? "Yes" : "No" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}><span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>Pitch Sent</span><ValuePill value={selected.pitchSent} /></div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}><span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>Onboarding Complete</span><ValuePill value={selected.onboardingComplete} /></div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 10 }}>Status</div>
                <select value={selected.status} onChange={(e) => updateSelected({ status: e.target.value as StatusKey })} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 14, padding: "12px 14px", color: "var(--fg)", fontSize: 14, outline: "none", fontFamily: "var(--font-body)" }}>
                  {Object.entries(statusMeta).map(([key, meta]) => (
                    <option key={key} value={key}>{meta.label}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8 }}>Notes</div>
                <textarea value={selected.notes} onChange={(e) => updateSelected({ notes: e.target.value })} style={{ width: "100%", minHeight: 120, resize: "vertical", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-strong)", borderRadius: 18, padding: "14px 16px", color: "var(--fg)", fontSize: 14, outline: "none", fontFamily: "var(--font-body)", boxSizing: "border-box", lineHeight: 1.65 }} />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                <button type="button" className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }} onClick={() => updateSelected({ status: "needs-follow-up" })}>Mark Needs Follow-Up</button>
                <button type="button" className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13, color: "#f87171", borderColor: "rgba(248,113,113,0.25)" }} onClick={deleteSelected}>Delete Person</button>
              </div>
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}
