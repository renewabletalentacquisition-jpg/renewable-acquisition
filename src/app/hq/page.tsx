"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type FilterKey = "all" | "active" | "onboarding" | "flight" | "needs-work";
type StatusKey = "active" | "onboarding" | "pitch-sent" | "flight-booked" | "needs-follow-up" | "inactive";

type WeeklyStatus = {
  label: string;
  value: string;
};

type RepRecord = {
  id: number;
  name: string;
  state: string;
  phone: string;
  position: string;
  owner: string;
  pitchSent: string;
  onboardingComplete: string;
  flightBooked: string;
  status: StatusKey;
  weekly: WeeklyStatus[];
  notes: string;
};

const initialRecords: RepRecord[] = [
  {
    id: 1,
    name: "Joseph",
    state: "NV",
    phone: "—",
    position: "Leader / Closer",
    owner: "Chase",
    pitchSent: "Yes",
    onboardingComplete: "Yes",
    flightBooked: "Yes",
    status: "active",
    weekly: [
      { label: "Oct 12-22", value: "Yes" },
      { label: "Nov 12-22", value: "Yes" },
      { label: "Dec 7-17", value: "Yes" },
      { label: "Jan 4-14", value: "Yes" },
    ],
    notes: "Leadership lane. Already active and part of the core team structure.",
  },
  {
    id: 2,
    name: "Expert",
    state: "CA",
    phone: "—",
    position: "Setter",
    owner: "Team",
    pitchSent: "Yes",
    onboardingComplete: "No",
    flightBooked: "No",
    status: "onboarding",
    weekly: [
      { label: "Oct 12-22", value: "Kinda" },
      { label: "Nov 12-22", value: "Yes" },
      { label: "Dec 7-17", value: "No" },
      { label: "Jan 4-14", value: "No" },
    ],
    notes: "Needs cleaner follow-up and onboarding pressure.",
  },
  {
    id: 3,
    name: "Athlete",
    state: "AZ",
    phone: "—",
    position: "Setter",
    owner: "Joseph",
    pitchSent: "Yes",
    onboardingComplete: "No",
    flightBooked: "No",
    status: "pitch-sent",
    weekly: [
      { label: "Oct 12-22", value: "Yes" },
      { label: "Nov 12-22", value: "Kinda" },
      { label: "Dec 7-17", value: "No" },
      { label: "Jan 4-14", value: "No" },
    ],
    notes: "Good archetype. Not fully activated yet.",
  },
  {
    id: 4,
    name: "Rep 4",
    state: "TX",
    phone: "—",
    position: "Setter",
    owner: "Unassigned",
    pitchSent: "No",
    onboardingComplete: "No",
    flightBooked: "No",
    status: "needs-follow-up",
    weekly: [
      { label: "Oct 12-22", value: "No" },
      { label: "Nov 12-22", value: "No" },
      { label: "Dec 7-17", value: "No" },
      { label: "Jan 4-14", value: "No" },
    ],
    notes: "Needs immediate cleanup or removal after review.",
  },
  {
    id: 5,
    name: "Rep 5",
    state: "NV",
    phone: "—",
    position: "Closer",
    owner: "Chase",
    pitchSent: "Yes",
    onboardingComplete: "Yes",
    flightBooked: "No",
    status: "onboarding",
    weekly: [
      { label: "Oct 12-22", value: "Yes" },
      { label: "Nov 12-22", value: "Yes" },
      { label: "Dec 7-17", value: "Yes" },
      { label: "Jan 4-14", value: "Kinda" },
    ],
    notes: "Strong upside. Travel logistics still open.",
  },
  {
    id: 6,
    name: "Rep 6",
    state: "CA",
    phone: "—",
    position: "Setter",
    owner: "Joseph",
    pitchSent: "No",
    onboardingComplete: "No",
    flightBooked: "No",
    status: "inactive",
    weekly: [
      { label: "Oct 12-22", value: "No" },
      { label: "Nov 12-22", value: "No" },
      { label: "Dec 7-17", value: "No" },
      { label: "Jan 4-14", value: "No" },
    ],
    notes: "Inactive lane. Keep visible for reference, but not priority.",
  },
];

const statusMeta: Record<StatusKey, { label: string; color: string; bg: string }> = {
  active: { label: "Active", color: "#4ade80", bg: "rgba(74,222,128,0.14)" },
  onboarding: { label: "Onboarding", color: "#a78bfa", bg: "rgba(167,139,250,0.14)" },
  "pitch-sent": { label: "Pitch Sent", color: "#c9a96e", bg: "rgba(201,169,110,0.15)" },
  "flight-booked": { label: "Flight Booked", color: "#60a5fa", bg: "rgba(96,165,250,0.12)" },
  "needs-follow-up": { label: "Needs Follow-Up", color: "#f59e0b", bg: "rgba(245,158,11,0.14)" },
  inactive: { label: "Inactive", color: "#9ca3af", bg: "rgba(156,163,175,0.12)" },
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

function ValuePill({ value }: { value: string }) {
  const clean = value.toLowerCase();
  const color = clean === "yes" ? "#4ade80" : clean === "no" ? "#f87171" : clean === "kinda" ? "#f59e0b" : "var(--fg-muted)";
  const bg = clean === "yes" ? "rgba(74,222,128,0.12)" : clean === "no" ? "rgba(248,113,113,0.10)" : clean === "kinda" ? "rgba(245,158,11,0.12)" : "rgba(255,255,255,0.04)";

  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 9999, background: bg, color }}>
      {value}
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
          : filter === "active"
            ? record.status === "active"
            : filter === "onboarding"
              ? record.status === "onboarding"
              : filter === "flight"
                ? record.flightBooked === "Yes"
                : ["needs-follow-up", "inactive", "pitch-sent"].includes(record.status);

      const q = search.trim().toLowerCase();
      const haystack = [
        record.name,
        record.state,
        record.phone,
        record.position,
        record.owner,
        record.notes,
        record.pitchSent,
        record.onboardingComplete,
        record.flightBooked,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [records, filter, search]);

  const selected = filteredRecords.find((record) => record.id === selectedId) || records.find((record) => record.id === selectedId) || filteredRecords[0] || records[0];

  const stats = {
    total: records.length,
    active: records.filter((r) => r.status === "active").length,
    onboarding: records.filter((r) => r.status === "onboarding").length,
    flights: records.filter((r) => r.flightBooked === "Yes").length,
  };

  function updateSelected(patch: Partial<RepRecord>) {
    if (!selected) return;
    setRecords((prev) => prev.map((record) => (record.id === selected.id ? { ...record, ...patch } : record)));
  }

  async function handleSignOut() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("hq-auth");
    }
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
            Rep readiness board reflecting your sheet structure, cleaned into a usable operating view.
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <a href="/warroom" className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12.5 }}>
            WarRoom
          </a>
          <button onClick={handleSignOut} className="btn-ghost" style={{ padding: "8px 16px", fontSize: 12.5 }}>
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1480, margin: "0 auto", padding: "34px 24px 56px" }}>
        <section style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 14, marginBottom: 26 }}>
          {[
            { label: "Total Team Records", value: stats.total, color: "var(--fg)" },
            { label: "Active", value: stats.active, color: "#4ade80" },
            { label: "Onboarding", value: stats.onboarding, color: "#a78bfa" },
            { label: "Flights Booked", value: stats.flights, color: "#60a5fa" },
          ].map((card) => (
            <div key={card.label} className="card" style={{ padding: "22px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em", color: card.color }}>
                {card.value}
              </div>
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
                    { key: "active", label: "Active" },
                    { key: "onboarding", label: "Onboarding" },
                    { key: "flight", label: "Flights" },
                    { key: "needs-work", label: "Needs Work" },
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
                  placeholder="Search names, owners, notes..."
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
                    {["Name", "State", "Position", "Pitch", "Onboarding", "Flight", "Status"].map((heading) => (
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
                    >
                      <td style={{ padding: "14px 16px", color: "var(--fg)", fontWeight: 600 }}>{record.name}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.state}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{record.position}</td>
                      <td style={{ padding: "14px 16px" }}><ValuePill value={record.pitchSent} /></td>
                      <td style={{ padding: "14px 16px" }}><ValuePill value={record.onboardingComplete} /></td>
                      <td style={{ padding: "14px 16px" }}><ValuePill value={record.flightBooked} /></td>
                      <td style={{ padding: "14px 16px" }}><StatusBadge status={record.status} /></td>
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
                  <div style={{ fontSize: 11, color: "var(--fg-dim)", marginBottom: 6 }}>Owner</div>
                  <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: 14 }}>{selected.owner}</div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {[
                  { label: "Phone", value: selected.phone },
                  { label: "State", value: selected.state },
                  { label: "Position", value: selected.position },
                  { label: "Owner", value: selected.owner },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>Pitch Sent</span>
                  <ValuePill value={selected.pitchSent} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>Onboarding Complete</span>
                  <ValuePill value={selected.onboardingComplete} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>Flight Booked</span>
                  <ValuePill value={selected.flightBooked} />
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 10 }}>Status</div>
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

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 10 }}>Weekly History</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {selected.weekly.map((entry) => (
                    <div key={entry.label} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 14, border: "1px solid var(--border)", background: "rgba(255,255,255,0.025)" }}>
                      <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{entry.label}</span>
                      <ValuePill value={entry.value} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8 }}>Notes</div>
                <textarea
                  value={selected.notes}
                  onChange={(e) => updateSelected({ notes: e.target.value })}
                  style={{
                    width: "100%",
                    minHeight: 120,
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
            </aside>
          )}
        </section>
      </div>
    </main>
  );
}
