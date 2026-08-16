"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function KikaCloudGatepassPage() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const verifyGatepassToken = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // This must match the secret token code hardcoded inside your middleware file exactly
    const TARGET_SECRET = "KikaGlobalStaging2026";

    if (passkey === TARGET_SECRET) {
      // 🟢 COOKIE ALLOCATION: Writes an explicit 7-day browser pass cookie to unlock the ecosystem
      document.cookie = `kika_gatepass_approved=${TARGET_SECRET}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict; Secure`;
      router.push("/");
    } else {
      setErrorMsg("❌ Unauthorized Credentials: Clear security tokens match loop failed.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#020617", fontFamily: "sans-serif", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      <form onSubmit={verifyGatepassToken} style={{ background: "#0f172a", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "440px", boxSizing: "border-box", border: "1px solid #1e293b", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
          <span style={{ fontSize: "28px" }}>🛡️</span>
        </div>
        
        <h2 style={{ color: "#ffffff", margin: "0 0 6px 0", textAlign: "center", fontSize: "22px", fontWeight: "bold" }}>KiKa Global Infrastructure Gatepass</h2>
        <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "12.5px", textAlign: "center", lineHeight: "1.5" }}>
          You are attempting to access an active development workspace trial node. Please present your authorized master gateway passphrase to authorize your browser device session.
        </p>
        
        {errorMsg && <p style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.05)", padding: "12px", borderRadius: "8px", fontSize: "12.5px", margin: "0 0 20px 0", border: "1px solid #334155", textAlign: "center", fontWeight: "bold" }}>{errorMsg}</p>}

        <label style={{ display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>Master Gateway Secret Passphrase</label>
        <input 
          type="password" 
          placeholder="Enter Staging Passphrase Key" 
          required 
          value={passkey} 
          onChange={e => setPasskey(e.target.value)} 
          style={{ width: "100%", padding: "14px 16px", background: "#020617", border: "1px solid #1e293b", borderRadius: "8px", color: "#ffffff", fontSize: "14px", marginBottom: "25px", boxSiders: "border-box", outline: "none" }} 
        />

        <button type="submit" style={{ width: "100%", padding: "14px", background: "#3b82f6", color: "#ffffff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)" }}>
          Authorize Security Clearance
        </button>

      </form>
    </div>
  );
}
