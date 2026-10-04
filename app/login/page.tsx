"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function KikaUnifiedAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAuthenticationLoop = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // 🚀 TRANSMITS DATA DIRECTLY TO YOUR UPDATED NATIVE SQL LOGIN ENDPOINT
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("🟢 Session authorized successfully! Redirecting...");
        // 🛡️ Redirects your validated user straight into your core cockpit dashboard path
        setTimeout(() => {
          router.push("/dashboard"); 
        }, 1000);
      } else {
        setMessage(`❌ Access Denied: ${data.error || "Invalid credentials."}`);
      }
    } catch (err) {
      setMessage("🚧 Network timeout. Database local link stable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", color: "#0f172a", fontFamily: "sans-serif", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <div style={{ backgroundColor: "#0f172a", padding: "35px", borderRadius: "12px", border: "1px solid #3b82f6", maxWidth: "#400px", width: "100%", boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}>
        
        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#3b82f6", fontSize: "12px", fontWeight: "bold", letterSpacing: "1px" }}>
            🌍 KIKA GLOBAL VENTURES
          </Link>
          <h2 style={{ color: "#ffffff", fontSize: "22px", fontWeight: "bold", margin: "10px 0 0 0" }}>🔐 Portal Account Login</h2>
          <p style={{ color: "#94a3b8", fontSize: "12px", marginTop: "5px" }}>
            Enter your diaspora security credentials to authenticate your active session.
          </p>
        </div>

        <form onSubmit={handleAuthenticationLoop} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "12px", fontWeight: "600" }}>Global Email Address</label>
            <input type="email" placeholder="name@domain.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "12px", fontWeight: "600" }}>Private Security Key / Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "12px", background: "#020617", border: "1px solid #1e293b", borderRadius: "6px", color: "#fff", fontSize: "13px", outline: "none" }} />
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", backgroundColor: "#3b82f6", border: "none", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", fontSize: "14px", cursor: "pointer", marginTop: "10px", transition: "opacity 0.2s" }}>
            {loading ? "⏳ Authorizing Identity..." : "🔐 Secure Sign In"}
          </button>
        </form>

        {message && (
          <div style={{ marginTop: "20px", padding: "12px", borderRadius: "6px", backgroundColor: "#020617", border: "1px solid #1e293b", fontSize: "12px", color: "#cbd5e1", textAlign: "center", fontFamily: "monospace" }}>
            {message}
          </div>
        )}

        <div style={{ borderTop: "1px solid #1e293b", marginTop: "25px", paddingTop: "20px", textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ color: "#94a3b8", fontSize: "12px" }}>
            New to the ecosystem?{" "}
            <Link href="/signup" style={{ color: "#10b981", textDecoration: "none", fontWeight: "bold" }}>
              Enroll Here
            </Link>
          </span>
          <Link href="/" style={{ color: "#64748b", fontSize: "12px", textDecoration: "none", fontWeight: "500" }}>
            ← Return to Main Landing Grid
          </Link>
        </div>

      </div>
    </div>
  );
}
