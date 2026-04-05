"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid credentials. Try again.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      background: `radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.08), transparent), var(--bg)`,
    }}>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>

      <div style={{
        width: "100%",
        maxWidth: 420,
        animation: "fadeUp 0.45s ease-out",
      }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 600, color: "var(--fg)" }}>
            Renewable <span style={{ color: "var(--accent)" }}>Acquisition</span>
          </span>
          <p style={{ fontSize: 13.5, color: "var(--fg-muted)", marginTop: 8 }}>Admin Dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{
          background: "var(--bg-panel)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-lg)",
          padding: "36px 32px",
        }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8, fontWeight: 500 }}>
              Username
            </label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                color: "var(--fg)",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--font-body)",
                boxSizing: "border-box",
              }}
              placeholder="CPF"
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid var(--border-strong)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                color: "var(--fg)",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--font-body)",
                boxSizing: "border-box",
              }}
              placeholder="••••••••••"
            />
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: 13.5, marginBottom: 20, textAlign: "center" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>
    </main>
  );
}
