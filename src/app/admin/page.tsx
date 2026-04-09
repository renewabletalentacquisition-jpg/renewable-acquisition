"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getHoursSince, getPriorityColor, getPriorityLabel, rankApplicant } from "@/lib/applicant-ops";

type SortMode = "score" | "recent";

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
  source?: string;
  source_detail?: string;
  heard_about?: string;
  booking_status?: string;
  applicant_status?: string;
  priority_bucket?: string;
  next_action?: string;
  last_contact_at?: string;
};

const OUTCOME_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  qualified: { bg: "rgba(201,169,110,0.15)", color: "#c9a96e", label: "Qualified" },
  review: { bg: "rgba(96,165,250,0.12)", color: "#60a5fa", label: "Review" },
  disqualified: { bg: "rgba(248,113,113,0.1)", color: "#f87171", label: "DQ" },
};

function Badge({ outcome }: { outcome: string }) {
  const style = OUTCOME_COLORS[outcome] || { bg: "rgba(255,255,255,0.08)", color: "var(--fg-muted)", label: outcome };
  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, padding: "4px 12px", borderRadius: 9999, background: style.bg, color: style.color, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {style.label}
    </span>
  );
}

function PriorityBadge({ priorityBucket }: { priorityBucket?: string }) {
  const style = getPriorityColor(priorityBucket);
  return (
    <span style={{ fontSize: 11.5, fontWeight: 600, padding: "4px 12px", borderRadius: 9999, background: style.bg, color: style.color, letterSpacing: "0.04em", textTransform: "uppercase" }}>
      {getPriorityLabel(priorityBucket)}
    </span>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [filter, setFilter] = useState<"all" | "qualified" | "review" | "disqualified">("all");
  const [sortMode, setSortMode] = useState<SortMode>("score");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const hasLocalAccess = typeof window !== "undefined" && window.localStorage.getItem("admin-auth") === "ok";

    if (!hasLocalAccess) {
      supabase.auth.getUser().then(({ data }) => {
        if (!data.user) router.push("/admin/login");
      });
    }

    void fetchApplicants();
  }, [router]);

  async function fetchApplicants() {
    setLoading(true);
    const { data } = await supabase.from("applicants").select("*").order("created_at", { ascending: false });
    setApplicants((data as Applicant[]) || []);
    setLoading(false);
  }

  function toggleSelectedId(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function toggleAllVisible() {
    const visibleIds = filtered.map((a) => a.id);
    const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));
    setSelectedIds((current) => allVisibleSelected ? current.filter((id) => !visibleIds.includes(id)) : Array.from(new Set([...current, ...visibleIds])));
  }

  async function handleBulkDelete() {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(`Delete ${selectedIds.length} selected applicants?`);
    if (!confirmed) return;

    setDeletingId("bulk");
    const { error } = await supabase.from("applicants").delete().in("id", selectedIds);

    if (error) {
      window.alert(`Could not delete selected applicants: ${error.message}`);
      setDeletingId(null);
      return;
    }

    setApplicants((current) => current.filter((a) => !selectedIds.includes(a.id)));
    if (selected && selectedIds.includes(selected.id)) setSelected(null);
    setSelectedIds([]);
    setDeletingId(null);
  }

  async function handleDeleteApplicant(applicant: Applicant) {
    const confirmed = window.confirm(`Delete ${applicant.first_name} ${applicant.last_name} from the applicant list?`);
    if (!confirmed) return;

    setDeletingId(applicant.id);
    const { error } = await supabase.from("applicants").delete().eq("id", applicant.id);

    if (error) {
      window.alert(`Could not delete applicant: ${error.message}`);
      setDeletingId(null);
      return;
    }

    setApplicants((current) => current.filter((a) => a.id !== applicant.id));
    setSelectedIds((current) => current.filter((id) => id !== applicant.id));
    if (selected?.id === applicant.id) setSelected(null);
    setDeletingId(null);
  }

  async function handleSignOut() {
    if (typeof window !== "undefined") window.localStorage.removeItem("admin-auth");
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const filteredBase = filter === "all" ? applicants : applicants.filter((a) => a.outcome === filter);

  const filtered = useMemo(() => {
    const list = [...filteredBase];

    if (sortMode === "score") {
      list.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      return list;
    }

    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return list;
  }, [filteredBase, sortMode]);

  const stats = {
    total: applicants.length,
    qualified: applicants.filter((a) => a.outcome === "qualified").length,
    review: applicants.filter((a) => a.outcome === "review").length,
    dq: applicants.filter((a) => a.outcome === "disqualified").length,
    speedToLead: applicants.filter((a) => (a.priority_bucket || (a.outcome === "qualified" ? "speed-to-lead" : "standard")) === "speed-to-lead").length,
  };

  const hotList = useMemo(
    () => [...applicants]
      .filter((a) => a.outcome !== "disqualified")
      .sort((a, b) => rankApplicant(b.created_at, b.outcome, b.priority_bucket) - rankApplicant(a.created_at, a.outcome, a.priority_bucket))
      .slice(0, 5),
    [applicants],
  );

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--fg)" }}>
      <header style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: "1px solid var(--border)", background: "rgba(8,8,10,0.85)", backdropFilter: "blur(20px)", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, textDecoration: "none", color: "var(--fg)", transition: "opacity 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
          Renewable <span style={{ color: "var(--accent)" }}>Acquisition</span>
          <span style={{ fontSize: 12, color: "var(--fg-dim)", fontFamily: "var(--font-body)", fontWeight: 400, marginLeft: 10 }}>Admin</span>
        </a>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <a href="/" target="_blank" style={{ fontSize: 13, color: "var(--fg-muted)" }}>View Site ↗</a>
          <button onClick={handleSignOut} className="btn-ghost" style={{ padding: "7px 18px", fontSize: 13 }}>Sign Out</button>
        </div>
      </header>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total Applicants", value: stats.total },
            { label: "Qualified", value: stats.qualified, color: "#c9a96e" },
            { label: "Under Review", value: stats.review, color: "#60a5fa" },
            { label: "Disqualified", value: stats.dq, color: "#f87171" },
            { label: "Speed to Lead", value: stats.speedToLead, color: "#f5d08a" },
          ].map((s) => (
            <div key={s.label} className="card" style={{ padding: "22px 20px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.04em", color: s.color || "var(--fg)" }}>{s.value}</div>
              <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 380px", gap: 20, marginBottom: 24 }}>
          <div className="card" style={{ padding: "22px 22px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
              <div>
                <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg-dim)", margin: 0 }}>Morning control tower</p>
                <h2 style={{ margin: "8px 0 0", fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "-0.03em" }}>Work these first</h2>
              </div>
              <button onClick={() => void fetchApplicants()} style={{ padding: "8px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid var(--border-strong)", background: "var(--bg-panel)", color: "var(--fg-muted)", fontFamily: "var(--font-body)" }}>↻ Refresh</button>
            </div>
            <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
              {loading ? (
                <div style={{ color: "var(--fg-muted)", padding: "12px 0" }}>Loading priority queue…</div>
              ) : hotList.length === 0 ? (
                <div style={{ color: "var(--fg-muted)", padding: "12px 0" }}>No live applicants yet.</div>
              ) : (
                hotList.map((applicant, index) => (
                  <button key={applicant.id} onClick={() => setSelected(applicant)} style={{ textAlign: "left", border: "1px solid var(--border)", background: "var(--bg-panel)", borderRadius: 18, padding: "14px 16px", cursor: "pointer" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12, color: "var(--fg-dim)", marginBottom: 4 }}>#{index + 1} priority</div>
                        <div style={{ fontWeight: 600 }}>{applicant.first_name} {applicant.last_name}</div>
                        <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginTop: 4 }}>{applicant.source || "direct"} · {Math.round(getHoursSince(applicant.created_at) * 10) / 10}h old</div>
                      </div>
                      <PriorityBadge priorityBucket={applicant.priority_bucket || (applicant.outcome === "qualified" ? "speed-to-lead" : applicant.outcome === "review" ? "review-fast" : "archive")} />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="card" style={{ padding: "22px" }}>
            <p style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg-dim)", margin: 0 }}>Operator rule</p>
            <h3 style={{ margin: "8px 0 12px", fontFamily: "var(--font-display)", fontSize: 26 }}>Qualified non-bookers first.</h3>
            <div style={{ color: "var(--fg-muted)", lineHeight: 1.7, fontSize: 14 }}>
              <div>1. Call, text, and email within 15 minutes when possible.</div>
              <div>2. Push straight to Calendly while urgency is highest.</div>
              <div>3. Clean up strong review candidates the same morning.</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(["all", "qualified", "review", "disqualified"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 18px", borderRadius: 9999, fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid", fontFamily: "var(--font-body)", transition: "all 0.15s", background: filter === f ? "var(--accent)" : "var(--bg-panel)", color: filter === f ? "#0d0b08" : "var(--fg-muted)", borderColor: filter === f ? "var(--accent)" : "var(--border-strong)" }}>
                {f === "all" ? "All" : f === "disqualified" ? "Disqualified" : f.charAt(0).toUpperCase() + f.slice(1)} <span style={{ opacity: 0.7 }}>({f === "all" ? stats.total : f === "qualified" ? stats.qualified : f === "review" ? stats.review : stats.dq})</span>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-dim)" }}>View</span>
            <div style={{ position: "relative", display: "inline-flex", padding: 4, borderRadius: 9999, border: "1px solid var(--border-strong)", background: "var(--bg-panel)", minWidth: 290 }}>
              <div style={{ position: "absolute", top: 4, bottom: 4, left: sortMode === "score" ? 4 : "calc(50% + 2px)", width: "calc(50% - 6px)", borderRadius: 9999, background: "var(--accent)", transition: "all 0.2s ease" }} />
              <button onClick={() => setSortMode("score")} style={{ position: "relative", zIndex: 1, flex: 1, padding: "10px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: "transparent", fontFamily: "var(--font-body)", color: sortMode === "score" ? "#0d0b08" : "var(--fg-muted)", transition: "color 0.2s ease" }}>
                Top qualified
              </button>
              <button onClick={() => setSortMode("recent")} style={{ position: "relative", zIndex: 1, flex: 1, padding: "10px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: "transparent", fontFamily: "var(--font-body)", color: sortMode === "recent" ? "#0d0b08" : "var(--fg-muted)", transition: "color 0.2s ease" }}>
                Most recently applied
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>
            {selectedIds.length > 0 ? `${selectedIds.length} selected` : "Select multiple applicants to bulk delete"}
          </div>
          <button onClick={() => void handleBulkDelete()} disabled={selectedIds.length === 0 || deletingId === "bulk"} style={{ padding: "10px 16px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: selectedIds.length === 0 || deletingId === "bulk" ? "not-allowed" : "pointer", border: "1px solid rgba(248,113,113,0.28)", background: selectedIds.length === 0 ? "rgba(255,255,255,0.04)" : "rgba(248,113,113,0.1)", color: selectedIds.length === 0 ? "var(--fg-dim)" : "#f87171", fontFamily: "var(--font-body)" }}>
            {deletingId === "bulk" ? "Deleting selected..." : "Delete Selected"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 400px" : "1fr", gap: 20, alignItems: "start" }}>
          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-panel)" }}>
                  <th style={{ padding: "12px 16px", textAlign: "left" }}>
                    <input type="checkbox" checked={filtered.length > 0 && filtered.every((a) => selectedIds.includes(a.id))} onChange={toggleAllVisible} />
                  </th>
                  {["", "Priority", "Score", "Name", "Source", "Where / who from", "Start", "Outcome", "Applied"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11.5, fontWeight: 600, color: "var(--fg-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={9} style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>Loading…</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={9} style={{ padding: 40, textAlign: "center", color: "var(--fg-muted)" }}>No applicants yet.</td></tr>
                ) : (
                  filtered.map((a, i) => (
                    <tr key={a.id} onClick={() => setSelected(selected?.id === a.id ? null : a)} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer", background: selected?.id === a.id ? "var(--bg-panel-strong)" : "transparent", transition: "background 0.15s" }} onMouseEnter={(e) => { if (selected?.id !== a.id) (e.currentTarget as HTMLElement).style.background = "var(--bg-panel)"; }} onMouseLeave={(e) => { if (selected?.id !== a.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                      <td style={{ padding: "14px 16px" }} onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={selectedIds.includes(a.id)} onChange={() => toggleSelectedId(a.id)} />
                      </td>
                      <td style={{ padding: "14px 16px" }}><PriorityBadge priorityBucket={a.priority_bucket || (a.outcome === "qualified" ? "speed-to-lead" : a.outcome === "review" ? "review-fast" : "archive")} /></td>
                      <td style={{ padding: "14px 16px" }}><span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600, color: a.score >= 20 ? "var(--accent)" : a.score >= 12 ? "#60a5fa" : "var(--fg-dim)", letterSpacing: "-0.02em" }}>{a.score}</span></td>
                      <td style={{ padding: "14px 16px", fontWeight: 500, color: "var(--fg)" }}>{a.first_name} {a.last_name}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{a.source || "direct"}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)", maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.heard_about || "—"}</td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-muted)" }}>{a.start_timing || "—"}</td>
                      <td style={{ padding: "14px 16px" }}><Badge outcome={a.outcome} /></td>
                      <td style={{ padding: "14px 16px", color: "var(--fg-dim)", fontSize: 12.5 }}>{new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {selected && (
            <div style={{ border: "1px solid var(--border-strong)", borderRadius: "var(--radius-lg)", background: "var(--bg-panel)", padding: "28px 24px", position: "sticky", top: 76 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--fg)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>{selected.first_name} {selected.last_name}</h2>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Badge outcome={selected.outcome} />
                    <PriorityBadge priorityBucket={selected.priority_bucket || (selected.outcome === "qualified" ? "speed-to-lead" : selected.outcome === "review" ? "review-fast" : "archive")} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 600, color: selected.score >= 20 ? "var(--accent)" : selected.score >= 12 ? "#60a5fa" : "var(--fg-dim)", letterSpacing: "-0.04em", lineHeight: 1 }}>{selected.score}</div>
                  <div style={{ fontSize: 11, color: "var(--fg-dim)", marginTop: 4 }}>SCORE</div>
                </div>
              </div>

              <div style={{ marginBottom: 18, padding: "14px 16px", borderRadius: 18, background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.12)" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: 8 }}>Next action</div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg)" }}>{selected.next_action || "Call, text, and email fast."}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {[
                  { label: "Email", value: selected.email },
                  { label: "Phone", value: selected.phone },
                  { label: "Location", value: selected.city },
                  { label: "Source", value: selected.source || "direct" },
                  { label: "Lead category", value: selected.source_detail || "—" },
                  { label: "Where / who from", value: selected.heard_about || "—" },
                  { label: "Start timing", value: selected.start_timing },
                  { label: "Applicant status", value: selected.applicant_status || "new" },
                  { label: "Booking status", value: selected.booking_status || "not_booked" },
                  { label: "Last contact", value: selected.last_contact_at ? new Date(selected.last_contact_at).toLocaleString() : "—" },
                  { label: "Commission-only OK", value: selected.commission_only },
                  { label: "D2D OK", value: selected.door_to_door },
                  { label: "Will relocate", value: selected.relocate },
                  { label: "Team housing OK", value: selected.team_housing },
                  { label: "Coachable", value: selected.coachable },
                  { label: "Financial runway", value: selected.financial_stability },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>{row.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 500, color: row.value === "Yes" ? "#86efac" : row.value === "No" ? "#f87171" : "var(--fg)", textAlign: "right" }}>{row.value || "—"}</span>
                  </div>
                ))}

                {selected.background?.length > 0 && (
                  <div style={{ paddingTop: 12 }}>
                    <div style={{ fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 10 }}>Background</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {selected.background.map((b) => (
                        <span key={b} style={{ fontSize: 11.5, padding: "4px 10px", borderRadius: 9999, background: "var(--bg-panel-strong)", border: "1px solid var(--border)", color: "var(--fg-muted)" }}>{b}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ paddingTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a href={`mailto:${selected.email}`} className="btn-gold" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>Email →</a>
                  <a href={`tel:${selected.phone}`} className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>Call</a>
                  {selected.outcome === "qualified" && (
                    <a href="https://calendly.com/chasepinedawow/interview" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "11px 0", fontSize: 13 }}>Calendly</a>
                  )}
                </div>

                <div style={{ paddingTop: 10 }}>
                  <button onClick={() => void handleDeleteApplicant(selected)} disabled={deletingId === selected.id} style={{ width: "100%", padding: "11px 0", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: deletingId === selected.id ? "wait" : "pointer", border: "1px solid rgba(248,113,113,0.28)", background: "rgba(248,113,113,0.1)", color: "#f87171", fontFamily: "var(--font-body)" }}>
                    {deletingId === selected.id ? "Deleting..." : "Delete Applicant"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
