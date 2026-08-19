"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function KikaUnifiedAuthPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAuthenticationLoop = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Automatically assigns the correct endpoint route based on interaction state
    const targetEndpoint = isRegistering ? "/api/register" : "/api/login";
    const payload = isRegistering 
      ? { name: name.trim(), email: email.toLowerCase().trim(), password: password.trim() }
      : { email: email.toLowerCase().trim(), password: password.trim() };

    try {
      const res = await fetch(targetEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.error || "Authentication validation drop."}`);
      } else {
        if (isRegistering) {
          setMessage("✅ Profile successfully written to Neon SQL Db! Toggling login fields...");
          setIsRegistering(false);
          setPassword("");
        } else {
          setMessage("🟢 Session approved! Allocating secure network cookie passes...");
          
          // 🟢 INTENTIONAL CLIENT COOKIE ALLOCATION: Bypasses middleware cache limitations entirely
          document.cookie = "kika_session_active=true; path=/; max-age=604800; SameSite=Lax; Secure";
          
          // Triggers a hard device hydration clear and routes user inside your internal internal internal trunks
          window.location.href = "/";
        }
      }
    } catch (err: any) {
      setMessage(`❌ Network Link Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = { display: "flex", flexDirection: "column" as const, minHeight: "100vh", background: "#020617", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", padding: "20px" };
  const cardStyle = { background: "#0f172a", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "440px", boxSizing: "border-box" as const, border: "1px solid #1e293b", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" };
  const inputStyle = { width: "100%", padding: "14px 16px", background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#ffffff", fontSize: "14px", marginBottom: "20px", boxSizing: "border-box" as const, outline: "none" };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px", fontSize: "28px" }}>
          {isRegistering ? "📝" : "🛡️"}
        </div>
        
        <h2 style={{ color: "#ffffff", margin: "0 0 6px 0", textAlign: "center", fontSize: "22px", fontWeight: "bold" }}>
          {isRegistering ? "Enroll Member Profile" : "Authorize System Entry"}
        </h2>
        
        <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "12.5px", textAlign: "center", lineHeight: "1.5" }}>
          {isRegistering 
            ? "Enroll your diaspora profile matrix parameters directly into the live serverless Neon PostgreSQL cluster ledger."
            : "Present your verified statutory credentials to unblock your un-restricted full-duplex communication and remittance trunks."}
        </p>

        {message && (
          <div style={{ padding: "12px", borderRadius: "8px", fontSize: "13px", margin: "0 0 20px 0", textAlign: "center", background: message.startsWith("❌") ? "rgba(239,68,68,0.05)" : "rgba(16,185,129,0.05)", border: "1px solid #334155", color: message.startsWith("❌") ? "#ef4444" : "#10b981", fontWeight: "bold" }}>
            {message}
          </div>
        )}

        <form onSubmit={handleAuthenticationLoop}>
          {isRegistering && (
            <>
              <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px" }}>Full Name</label>
              <input type="text" placeholder="Enter full name" required value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
            </>
          )}

          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px" }}>Registered Email Address</label>
          <input type="email" placeholder="name@kikaglobal.com" required value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />

          <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", marginBottom: "6px" }}>Private Secure Access Password</label>
          <input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: "#10b981", color: "#020617", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)", outline: "none" }}>
            {loading ? "Processing database lookup..." : isRegistering ? "Register Account Node" : "Authorize Security Entrance"}
          </button>
        </form>

        <div style={{ marginTop: "25px", textAlign: "center", fontSize: "13px" }}>
          <button onClick={() => { setIsRegistering(!isRegistering); setMessage(""); }} style={{ background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", fontWeight: "bold", outline: "none" }}>
            {isRegistering ? "Already registered? Sign In Here" : "New member? Enroll in Registry Here"}
          </button>
        </div>

      </div>
    </div>
  );
}
