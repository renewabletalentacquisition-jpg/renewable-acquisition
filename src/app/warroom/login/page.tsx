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
    <main className="warroom-shell">
      <div className="warroom-login-wrap">
        <div className="warroom-login-head">
          <div className="warroom-kicker">Private command layer</div>
          <h1 className="warroom-title">WarRoom.</h1>
          <p className="warroom-subtitle">
            Taiyou at the center. Specialist lanes underneath. Built for private execution.
          </p>
        </div>

        <form onSubmit={handleLogin} className="warroom-login-card">
          <div className="warroom-field-block">
            <label className="warroom-field-label">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="warroom-input"
              placeholder="CPF"
              required
            />
          </div>

          <div className="warroom-field-block">
            <label className="warroom-field-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="warroom-input"
              placeholder="••••••••••"
              required
            />
          </div>

          {error && <p className="warroom-error">{error}</p>}

          <button type="submit" className="warroom-primary-btn" disabled={loading}>
            {loading ? "Entering…" : "Enter WarRoom →"}
          </button>
        </form>
      </div>
    </main>
  );
}
