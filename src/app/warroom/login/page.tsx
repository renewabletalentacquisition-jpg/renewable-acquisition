"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WarRoomLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (username.trim() === "CPF" && password.trim() === "CPF123") {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("warroom-auth", "ok");
      }
      router.push("/warroom");
      return;
    }

    setError("Invalid credentials. Try again.");
    setLoading(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050507",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,169,110,0.09), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(201,169,110,0.22)",
            background: "rgba(201,169,110,0.07)",
            borderRadius: 9999,
            padding: "7px 18px",
            marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#c9a96e", display: "inline-block", boxShadow: "0 0 8px #c9a96e" }} />
            <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(201,169,110,0.85)", fontFamily: "var(--font-body)" }}>
              Private Command Layer
            </span>
          </div>

          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 10vw, 84px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            margin: "0 0 14px",
            color: "#fff",
          }}>
            WarRoom.
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: 13.5, lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
            Sunny at the center. Specialists underneath.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24,
            padding: "34px 30px",
            backdropFilter: "blur(20px)",
          }}
        >
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="CPF"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "13px 16px",
                color: "#fff",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--font-body)",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", fontSize: 11.5, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
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
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 14,
                padding: "13px 16px",
                color: "#fff",
                fontSize: 14,
                outline: "none",
                fontFamily: "var(--font-body)",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,169,110,0.4)")}
              onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>

          {error && (
            <p style={{ color: "#f87171", fontSize: 13.5, marginBottom: 18, textAlign: "center", fontFamily: "var(--font-body)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#c9a96e",
              color: "#0d0b08",
              border: "none",
              borderRadius: 14,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: "var(--font-body)",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              letterSpacing: "0.04em",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "#e8cfa0"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#c9a96e"; }}
          >
            {loading ? "Entering…" : "Enter WarRoom →"}
          </button>
        </form>
      </div>
    </div>
  );
}
