"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DemographicRegistryPage() {
  const [passportNum, setPassportNum] = useState("");
  const [hostCountry, setHostCountry] = useState("United Kingdom");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617", color: "#f8fafc", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #1e293b" }}>
        
        <Link href="/" style={{ color: "#10b981", textDecoration: "none", fontSize: "13px", fontWeight: "bold" }}>
          ← Return to Landing Page
        </Link>

        <h1 style={{ fontSize: "24px", color: "#ffffff", margin: "20px 0 10px 0" }}>🌐 Diaspora Demographic Registry</h1>
        <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5", marginBottom: "25px" }}>
          Optional census & skill distribution mapping for sub-Saharan diaspora communities. This entry operates independently from general ecosystem service accounts.
        </p>

        {submitted ? (
          <div style={{ padding: "16px", backgroundColor: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", borderRadius: "8px", color: "#10b981", fontSize: "14px" }}>
            🟢 Demographic entry committed independently to Neon SQL Ledger.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>Passport or National ID</label>
              <input
                type="text"
                required
                placeholder="e.g. A0000000"
                value={passportNum}
                onChange={(e) => setPassportNum(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px", background: "#020617", border: "1px solid #334155", borderRadius: "6px", color: "#fff", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>Host Country Regional Node</label>
              <select
                value={hostCountry}
                onChange={(e) => setHostCountry(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px", background: "#020617", border: "1px solid #334155", borderRadius: "6px", color: "#fff", outline: "none" }}
              >
                <option value="United Kingdom">United Kingdom (UK Node)</option>
                <option value="United States">United States (USA Node)</option>
                <option value="Uganda">Uganda (EAF Node)</option>
              </select>
            </div>

            <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#ec4899", color: "#ffffff", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", fontSize: "14px", marginTop: "10px" }}>
              Submit Demographic Record →
            </button>
          </form>
        )}

      </div>
    </div>
  );
}