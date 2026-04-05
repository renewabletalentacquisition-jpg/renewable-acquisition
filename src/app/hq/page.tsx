"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type FilterKey = "all" | "lead" | "interview" | "onboarding" | "active";
type StatusKey = "lead" | "contacted" | "interview-booked" | "interview-complete" | "onboarding" | "active" | "hold";

type RepRecord = {
  id: number;
  name: string;
  phone: string;
  state: string;
  source: string;
  track: string;
  status: StatusKey;
  owner: string;
  nextAction: string;
  notes: string;
  priority: "High" | "Medium" | "Low";
};

const initialRecords: RepRecord[] = [
  {
    id: 1,
    name: "Malik Thompson",
    phone: "(702) 555-0192",
    state: "NV",
    source: "Indeed",
    track: "Setter",
    status: "interview-booked",
    owner: "Chase",
    nextAction: "Interview Monday at 2:00 PM",
    notes: "Athletic background. Good energy. Strong upside if coachable.",
    priority: "High",
  },
  {
    id: 2,
    name: "Joshua Bell",
    phone: "(602) 555-0184",
    state: "AZ",
    source: "Website",
    track: "Setter",
    status: "contacted",
    owner: "Joseph",
    nextAction: "Push toward interview booking",
    notes: "Interested, but needs urgency and tighter follow-up.",
    priority: "High",
  },
  {
    id: 3,
    name: "Andres Ruiz",
    phone: "(909) 555-0144",
    state: "CA",
    source: "Referral",
    track: "Closer",
    status: "onboarding",
    owner: "Chase",
    nextAction: "Confirm training docs + first field day",
    notes: "Warm referral. Strong talker. Wants path to leadership.",
    priority: "Medium",
  },
  {
    id: 4,
    name: "Isaiah Brooks",
    phone: "(702) 555-0111",
    state: "NV",
    source: "DM Funnel",
    track: "Setter",
    status: "lead",
    owner: "Unassigned",
    nextAction: "Initial outreach",
    notes: "Need first contact and qualification.",
    priority: "Medium",
  },
  {
    id: 5,
    name: "Eric Salazar",
    phone: "(480) 555-0138",
    state: "AZ",
    source: "Indeed",
    track: "Setter",
    status: "active",
    owner: "Team",
    nextAction: "Track first week performance",
    notes: "Recently activated. Needs accountability and daily rhythm.",
    priority: "Low",
  },
];

const statusMeta: Record<StatusKey, { label: string; color: string; bg: string }> = {
  lead: { label: "Lead", color: "#9ca3af", bg: "rgba(156,163,175,0.12)" },
  contacted: { label: "Contacted", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  "interview-booked": { label: "Interview Booked", color: "#c9a96e", bg: "rgba(201,169,110,0.15)" },
  "interview-complete": { label: "Interview Complete", color: "#f59e0b", bg: "rgba(245,158,11,0.14)" },
  onboarding: { label: "Onboarding", color: "#a78bfa", bg: "rgba(167,139,250,0.14)" },
  active: { label: "Active", color: "#4ade80", bg: "rgba(74,222,128,0.14)" },
  hold: { label: "Hold", color: "#f87171", bg: "rgba(248,113,113,0.12)" },
};

function StatusBadge({ status }: { status: StatusKey }) {
  const meta = statusMeta[status];
  return (
    <span
      style={{
        fontSize: 11.5,
        fontWeight: 600,
        padding: "5px 12px",
        borderRadius: 9999,
        background: meta.bg,
        color: meta.color,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      {meta.label}
    </span>
  );
}

export default function HQDashboardPage() {
  const router = useRouter();
  const [records, setRecords] = useState<RepRecord[]>(initialRecords);
  const [selectedId, setSelectedId] = useState<number>(initialRecords[0].id);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/hq/login");
    });
  }, [router]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "lead"
            ? ["lead", "contacted"].includes(record.status)
            : filter === "interview"
              ? ["interview-booked", "interview-complete"].includes(record.status)
              : filter === "onboarding"
                ? record.status === "onboarding"
                : record.status === "active";

      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        [record.name, record.phone, record.state, record.source, record.track, record.owner, record.notes]
          .join(" ")
          .toLowerCase()
          .includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [records, filter, search]);

  const selected = filteredRecords.find((record) => record.id === selectedId) || records.find((record) => record.id === selectedId) || filteredRecords[0] || records[0];

  const stats = {
    total: records.length,
    pipeline: records.filter((r) => ["lead", "contacted", "interview-booked", "interview-complete"].includes(r.status)).length,
    onboarding: records.filter((r) => r.status === "onboarding").length,
    active: records.filter((r) => r.status === "active").length,
  };

  function updateSelected(patch: Partial<RepRecord>) {
    if (!selected) return;
    setRecords((prev) => prev.map((record) => (record.id === selected.id ? { ...record, ...patch } : record)));
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/hq/login");
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border)",
          background: "rgba(8,8,10,0.88)",
          backdropFilter: "blur(20px)",
          padding: "0 24px",
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: "var(--fg)" }}>
              Team <span style={{ color: "var(--accent)" }}>HQ</span>
            </span>
            <span className="lane-badge" style={{ color: "var(--accent)", borderColor: "rgba(201,169,110,0.28)", background: "rgba(201,169,110,0.12)" }}>
              Internal Ops
            </span>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--fg-dim)", marginTop: 4 }}>
            Private recruiting and rep-management board for closers and leadership.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <a href="/" target="_blank" className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12.5 }}>
            Public Site ↗
          </a>
          <button onClick={handleSignOut} className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12.5 }}>
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "34px 24px 56px" }}>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginBottom: 26 }}>
          {[
            { label: "Total Reps / Prospects", value: stats.total, color: "var(--fg)" },
            { label: "Pipeline", value: stats.pipeline, color: "#c9a96e" },
            { label: "Onboarding", value: stats.onboarding, color: "#a78bfa" },
            { label: "Active", value: stats.active, color: "#4ade80" },
          ].map((card) => (
            <div key={card.label} className="card" style={{ padding: "22px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em", color: card.color }}>
                {card.value}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 6 }}>{card.label}</div>
            </div>
          ))}
        </section>

        <section style={{ display: "grid", gridTemplateColumns: selected ? "minmax(0, 1.2fr) 420px" : "1fr", gap: 20, alignItems: "start" }}>
          <div>
            <div className="card" style={{ padding: 18, marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {([
                    { key: "all", label: "All" },
                    { key: "lead", label: "Lead Flow" },
                    { key: "interview", label: "Interviews" },
                    { key: "onboarding", label: "Onboarding" },
                    { key: "active", label: "Active" },
                  ] as { key: FilterKey; label: string }[]).map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setFilter(tab.key)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 9999,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        border: "1px solid",
                        fontFamily: "var(--font-body)",
                        transition: "all 0.15s ease",
                        background: filter === tab.key ? "var(--accent)" : "var(--bg-panel)",
                        color: filter === tab.key ? "#0d0b08" : "var(--fg-muted)",
                        borderColor: filter === tab.key ? "var(--accent)" : "var(--border-strong)",
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search reps, sources, notes..."
                  style={{
                    width: "min(320px, 100%)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: 9999,
                    padding: "10px 16px",
                    color: "var(--fg)",
                    fontSize: 13.5,
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
                    {["Name", "Track", "Source", "Status", "Owner", "Next Action", "Priority"].map((heading) => (
                      <th key={heading} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--fg-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr
                      key={record.id}
                      onClick={() => setSelectedId(record.id)}
                      style={{
                        borderBottom: index < filteredRecords.length - 1 ? "1px solid var(--border)" : "none",
                        cursor: "pointer",
                        background: selected?.id === record.id ? "var(--bg-panel-strong)" : "transparent",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (selected?.id !== record.id) (e.currentTarget as HTMLElement).style.background = "var(--bg-panel)";
                      }}
                      onMouseLeave={(e) => {
                        if (selected?.id !== record.id) (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <td style={{ padding: "14px 16px", color: "var(--fg)", fontWeight: 600 }}>{record.name}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.track}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.source}</td>
                      <td style={{ padding: "14px 16px" }}><StatusBadge status={record.status} /></td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.owner}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)", maxWidth: 260 }}>{record.nextAction}</td>
                      <td style={{ padding: "14px 16px", color: record.priority === "High" ? "#f59e0b" : record.priority === "Medium" ? "#60a5fa" : "var(--fg-dim)", fontWeight: 600 }}>
                        {record.priority}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selected && (
            <aside
              style={{
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-panel)",
                padding: "28px 24px",
                position: "sticky",
                top: 86,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", marginBottom: 22 }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: "var(--fg)", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
                    {selected.name}
                  </h2>
                  <StatusBadge status={selected.status} />
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--fg-dim)", marginBottom: 6 }}>Priority</div>
                  <div style={{ color: selected.priority === "High" ? "#f59e0b" : selected.priority === "Medium" ? "#60a5fa" : "var(--fg-dim)", fontWeight: 700, fontSize: 14 }}>
                    {selected.priority}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { label: "Phone", value: selected.phone },
                  { label: "State", value: selected.state },
                  { label: "Source", value: selected.source },
                  { label: "Track", value: selected.track },
                  { label: "Owner", value: selected.owner },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8 }}>Status</div>
                <select
                  value={selected.status}
                  onChange={(e) => updateSelected({ status: e.target.value as StatusKey })}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: 14,
                    padding: "12px 14px",
                    color: "var(--fg)",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {Object.entries(statusMeta).map(([key, meta]) => (
                    <option key={key} value={key}>
                      {meta.label}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8 }}>Next action</div>
                <input
                  value={selected.nextAction}
                  onChange={(e) => updateSelected({ nextAction: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: 14,
                    padding: "12px 14px",
                    color: "var(--fg)",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8 }}>Notes</div>
                <textarea
                  value={selected.notes}
                  onChange={(e) => updateSelected({ notes: e.target.value })}
                  style={{
                    width: "100%",
                    minHeight: 130,
                    resize: "vertical",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: 18,
                    padding: "14px 16px",
                    color: "var(--fg)",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "var(--font-body)",
                    boxSizing: "border-box",
                    lineHeight: 1.65,
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                <a href={`tel:${selected.phone}`} className="btn-gold" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>
                  Call
                </a>
                <button className="btn-ghost" type="button" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>
                  Save Update
                </button>
              </div>

              <div style={{ marginTop: 16, fontSize: 12.5, color: "var(--fg-dim)", lineHeight: 1.65 }}>
                This first HQ build is structured for clean manual updating. Next step is wiring these updates into persistent backend storage so closers can use it live.
              </div>
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}
