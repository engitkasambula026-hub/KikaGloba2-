"use client";

import { useState } from "react";

export default function SaccoForm() {
  const [membershipType, setMembershipType] = useState("STANDARD");
  const [idNumber, setIdNumber] = useState("");
  const [sharesCapital, setSharesCapital] = useState("50000");
  const [statusText, setStatusText] = useState("Status: Ready to Enroll");

  const handleSaccoEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusText("Status: Activating Capital Ledger...");

    try {
      // Points directly to our structured SACCO background database API endpoint
      const response = await fetch("/api/sacco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "1", // Hardcoded test index until user session logic is linked
          membershipType,
          idNumber,
          sharesCapital,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusText(`Status: Co-op Account Active! ID: ${data.saccoId.substring(0, 10)}`);
      } else {
        setStatusText(`Status: Error - ${data.error}`);
      }
    } catch (err) {
      setStatusText("Status: Database connection timeout");
    }
  };

  return (
    <div style={{
      width: "100%", maxWidth: "450px", backgroundColor: "#0B1528",
      border: "1px solid #1E293B", padding: "24px", borderRadius: "16px",
      margin: "20px auto", color: "#F8FAFC", fontFamily: "sans-serif", boxSizing: "border-box"
    }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 4px 0" }}>Kika Co-op SACCO Registry</h2>
        <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0" }}>Initialize initial equity injections to unlock member dividends</p>
      </div>

      <div style={{
        backgroundColor: "#020617", border: "1px solid #1E293B", color: "#60A5FA",
        fontSize: "12px", padding: "8px", borderRadius: "8px", textAlign: "center",
        fontFamily: "monospace", marginBottom: "16px"
      }}>
        {statusText}
      </div>

      <form onSubmit={handleSaccoEnrollment} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1" }}>MEMBERSHIP TYPE</label>
          <select value={membershipType} onChange={(e) => setMembershipType(e.target.value)} style={{ width: "100%", backgroundColor: "#020617", border: "1px solid #334155", padding: "10px", borderRadius: "8px", color: "#FFF", outline: "none" }}>
            <option value="STANDARD">Standard Diaspora Member</option>
            <option value="PREMIUM">Premium Investment Tier</option>
            <option value="CORPORATE">Corporate Co-op Node</option>
          </select>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1" }}>IDENTITY PASSPORT NUMBER</label>
          <input type="text" required placeholder="e.g. A00123456" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} style={{ width: "100%", backgroundColor: "#020617", border: "1px solid #334155", padding: "10px", borderRadius: "8px", color: "#FFF", outline: "none", boxSizing: "border-box" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1" }}>INITIAL EQUITY INJECTION (UGX)</label>
          <input type="number" required value={sharesCapital} onChange={(e) => setSharesCapital(e.target.value)} style={{ width: "100%", backgroundColor: "#020617", border: "1px solid #334155", padding: "10px", borderRadius: "8px", color: "#FFF", outline: "none", boxSizing: "border-box" }} />
        </div>

        <button type="submit" style={{ width: "100%", backgroundColor: "#2563EB", color: "#FFF", fontWeight: "bold", padding: "12px", borderRadius: "8px", border: "none", cursor: "pointer", marginTop: "6px" }}>
          Submit Activation Request
        </button>
      </form>
    </div>
  );
}
