"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Applicant = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: string;
  start_timing: string;
  commission_only: string;
  door_to_door: string;
  relocate: string;
  team_housing: string;
  background: string[];
  coachable: string;
  financial_stability: string;
  score: number;
  outcome: string;
};

const OUTCOME_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  qualified:    { bg: "rgba(201,169,110,0.15)", color: "#c9a96e", label: "Qualified" },
  review:       { bg: "rgba(96,165,250,0.12)",  color: "#60a5fa", label: "Review" },
  disqualified: { bg: "rgba(248,113,113,0.1)",  color: "#f87171", label: "DQ" },
};

function Badge({ outcome }: { outcome: string }) {
  const style = OUTCOME_COLORS[outcome] || { bg: "rgba(255,255,255,0.08)", color: "var(--fg-muted)", label: outcome };
  return (
    <span style={{
      fontSize: 11.5,
      fontWeight: 600,
      padding: "4px 12px",
      borderRadius: 9999,
      background: style.bg,
      color: style.color,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    }}>
      {style.label}
    </span>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [filter, setFilter] = useState<"all" | "qualified" | "review" | "disqualified">("all");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/admin/login");
    });
    fetchApplicants();
  }, [router]);

  async function fetchApplicants() {
    setLoading(true);
    const { data } = await supabase
      .from("applicants")
      .select("*")
      .order("score", { ascending: false });
    setApplicants((data as Applicant[]) || []);
    setLoading(false);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const filtered = filter === "all" ? applicants : applicants.filter(a => a.outcome === filter);

  const stats = {
    total: applicants.length,
    qualified: applicants.filter(a => a.outcome === "qualified").length,
    review: applicants.filter(a => a.outcome === "review").length,
    dq: applicants.filter(a => a.outcome === "disqualified").length,
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>

      {/* Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border)",
        background: "rgba(8,8,10,0.85)",
        backdropFilter: "blur(20px)",
        padding: "0 32px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600 }}>
          Renewable <span style={{ color: "var(--accent)" }}>Acquisition</span>
          <span style={{ fontSize: 12, color: "var(--fg-dim)", fontFamily: "var(--font-body)", fontWeight: 400, marginLeft: 10 }}>Admin</span>
        </span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/" target="_blank" style={{ fontSize: 13, color: "var(--fg-muted)" }}>View Site ↗</a>
          <button onClick={handleSignOut} className="btn-ghost" style={{ padding: "7px 18px", fontSize: 13 }}>
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 40 }}>
          {[
            { label: "Total Applicants", value: stats.total },
            { label: "Qualified", value: stats.qualified, color: "#c9a96e" },
            { label: "Under Review", value: stats.review, color: "#60a5fa" },
            { label: "Disqualified", value: stats.dq, color: "#f87171" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding: "22px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em", color: s.color || "var(--fg)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {(["all", "qualified", "review", "disqualified"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "8px 18px",
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              border: "1px solid",
              fontFamily: "var(--font-body)",
              transition: "all 0.15s",
              background: filter === f ? "var(--accent)" : "var(--bg-panel)",
              color: filter === f ? "#0d0b08" : "var(--fg-muted)",
              borderColor: filter === f ? "var(--accent)" : "var(--border-strong)",
            }}>
              {f === "all" ? "All" : f === "disqualified" ? "Disqualified" : f.charAt(0).toUpperCase() + f.slice(1)}
              {" "}
              <span style={{ opacity: 0.7 }}>
                ({f === "all" ? stats.total : f === "qualified" ? stats.qualified : f === "review" ? stats.review : stats.dq})
              </span>
            </button>
          ))}
          <button onClick={fetchApplicants} style={{
            marginLeft: "auto",
            padding: "8px 18px",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            border: "1px solid var(--border-strong)",
            background: "var(--bg-panel)",
            color: "var(--fg-muted)",
            fontFamily: "var(--font-body)",
          }}>
            ↻ Refresh
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 400px" : "1fr", gap: 20, alignItems: "start" }}>

          {/* Table */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
                  {["Score", "Name", "Email", "Location", "Start", "Outcome", "Applied"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--fg-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>Loading…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>No applicants yet.</td></tr>
                ) : (
                  filtered.map((a, i) => (
                    <tr
                      key={a.id}
                      onClick={() => setSelected(selected?.id === a.id ? null : a)}
                      style={{
                        borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                        cursor: "pointer",
                        background: selected?.id === a.id ? "var(--bg-panel-strong)" : "transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => { if (selected?.id !== a.id) (e.currentTarget as HTMLElement).style.background = "var(--bg-panel)"; }}
                      onMouseLeave={e => { if (selected?.id !== a.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 22,
                          fontWeight: 600,
                          color: a.score >= 20 ? "var(--accent)" : a.score >= 12 ? "#60a5fa" : "var(--fg-dim)",
                          letterSpacing: "-0.02em",
                        }}>
                          {a.score}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 500, color: "var(--fg)" }}>
                        {a.first_name} {a.last_name}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{a.email}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{a.city || "—"}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{a.start_timing || "—"}</td>
                      <td style={{ padding: "14px 16px" }}><Badge outcome={a.outcome} /></td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-dim)", fontSize: 12.5 }}>
                        {new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          {selected && (
            <div style={{
              border: "1px solid var(--border-strong)",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-panel)",
              padding: "28px 24px",
              position: "sticky",
              top: 76,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--fg)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                    {selected.first_name} {selected.last_name}
                  </h2>
                  <Badge outcome={selected.outcome} />
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 600, color: selected.score >= 20 ? "var(--accent)" : selected.score >= 12 ? "#60a5fa" : "var(--fg-dim)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                    {selected.score}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--fg-dim)", marginTop: 4 }}>SCORE</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { label: "Email", value: selected.email },
                  { label: "Phone", value: selected.phone },
                  { label: "Location", value: selected.city },
                  { label: "Start timing", value: selected.start_timing },
                  { label: "Commission-only OK", value: selected.commission_only },
                  { label: "D2D OK", value: selected.door_to_door },
                  { label: "Will relocate", value: selected.relocate },
                  { label: "Team housing OK", value: selected.team_housing },
                  { label: "Coachable", value: selected.coachable },
                  { label: "Financial runway", value: selected.financial_stability },
                ].map(row => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{row.label}</span>
                    <span style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: row.value === "Yes" ? "#86efac" : row.value === "No" ? "#f87171" : "var(--fg)",
                    }}>
                      {row.value || "—"}
                    </span>
                  </div>
                ))}

                {selected.background?.length > 0 && (
                  <div style={{ paddingTop: 12 }}>
                    <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 10 }}>Background</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {selected.background.map(b => (
                        <span key={b} style={{
                          fontSize: 11.5,
                          padding: "4px 10px",
                          borderRadius: 9999,
                          background: "var(--bg-panel-strong)",
                          border: "1px solid var(--border)",
                          color: "var(--fg-muted)",
                        }}>
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ paddingTop: 20, display: "flex", gap: 10 }}>
                  <a href={`mailto:${selected.email}`} className="btn-gold" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>
                    Email →
                  </a>
                  {selected.outcome === "qualified" && (
                    <a href="https://calendly.com/chasepinedawow/30min" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>
                      Calendly
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
