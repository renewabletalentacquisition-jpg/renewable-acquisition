"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HQLoginPage() {
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
      return;
    }

    router.push("/hq");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background:
          "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,169,110,0.12), transparent), var(--bg)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 34 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(201,169,110,0.22)",
              background: "rgba(201,169,110,0.07)",
              borderRadius: 9999,
              padding: "7px 18px",
              marginBottom: 22,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
            <span
              style={{
                fontSize: 11.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--accent-soft)",
                fontWeight: 500,
              }}
            >
              Internal Operations
            </span>
          </div>

          <h1 className="display" style={{ fontSize: "clamp(42px, 7vw, 70px)", margin: "0 0 10px", color: "var(--fg)" }}>
            Team HQ
          </h1>
          <p style={{ margin: 0, color: "var(--fg-muted)", fontSize: 14.5, lineHeight: 1.7 }}>
            Private team operations dashboard for recruiting, onboarding, rep tracking, and interview flow.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          style={{
            background: "var(--bg-panel)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-lg)",
            padding: "36px 32px",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8, fontWeight: 500 }}>
              Username
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="CPF"
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
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12.5, color: "var(--fg-muted)", marginBottom: 8, fontWeight: 500 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••"
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
            />
          </div>

          {error && <p style={{ color: "#f87171", fontSize: 13.5, marginBottom: 20, textAlign: "center" }}>{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold" style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.6 : 1 }}>
            {loading ? "Signing in…" : "Enter HQ →"}
          </button>
        </form>
      </div>
    </main>
  );
}
