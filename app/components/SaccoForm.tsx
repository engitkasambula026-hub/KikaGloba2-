"use client";
import React, { useState } from "react";

export default function SaccoForm() {
  const [memberSacco, setMemberSacco] = useState("");
  const [membershipType, setMembershipType] = useState("");
  const [sharesCapital, setSharesCapital] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Please confirm the SACCO compliance declaration.");
      return;
    }
    alert(`SACCO Node Initialized!\nCooperative: ${memberSacco}\nTier: ${membershipType}\nContribution: UGX ${sharesAmountFormatter(sharesCapital)}`);
  };

  const sharesAmountFormatter = (numStr: string) => {
    return numStr ? parseInt(numStr).toLocaleString() : "0";
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
      
      <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section I: Institutional Cooperative Selection</h3>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Target Savings Cooperative (SACCO)</label>
        <select required value={memberSacco} onChange={(e) => setMemberSacco(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#1e293b" }}>
          <option value="" disabled>-- Select Registered SACCO Vector --</option>
          <option value="Kampala Tech Diaspora SACCO">🏢 Kampala Tech Diaspora SACCO</option>
          <option value="East African Agricultural Production Cooperative">🌱 East African Agricultural Production Cooperative</option>
          <option value="Buganda Region Development Infrastructure Node">🏗️ Buganda Region Development Infrastructure Node</option>
          <option value="Uganda Diaspora Real Estate & Land Pool">🏡 Uganda Diaspora Real Estate & Land Pool</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Membership Class Subscription Tier</label>
        <select required value={membershipType} onChange={(e) => setMembershipType(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#1e293b" }}>
          <option value="" disabled>-- Select Allocation Class --</option>
          <option value="Standard Shareholder">🟢 Standard Shareholder (Voting Rights + Dividends)</option>
          <option value="Institutional Investor">🔵 Institutional Investor (Capital Asset Pool Placement)</option>
          <option value="Youth / Heritage Trust Account">🟡 Youth / Heritage Trust Node (Generational Capital)</option>
        </select>
      </div>

      <h3 style={{ marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section II: Regulatory Compliance Metrics</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Verification ID Document</label>
          <select required value={idType} onChange={(e) => setIdType(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#ffffff", color: "#1e293b" }}>
            <option value="" disabled>-- Select Type --</option>
            <option value="National ID">Ugandan National ID</option>
            <option value="Passport">International Passport</option>
            <option value="Dual Passport">Host Country Passport</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Document Code (NIN / Number)</label>
          <input type="text" placeholder="Enter identification string" required value={idNumber} onChange={(e) => setIdNumber(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        </div>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Initial Shares Capital Injection (UGX)</label>
        <input type="number" placeholder="Value in Uganda Shillings (e.g., 500000)" required value={sharesCapital} onChange={(e) => setSharesCapital(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1" }} />
        {sharesCapital && (
          <p style={{ margin: "5px 0 0 0", fontSize: "13px", color: "#16a34a", fontWeight: "bold" }}>Formatted Allocation: UGX {sharesAmountFormatter(sharesCapital)}</p>
        )}
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "inline-flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "14px", color: "#64748b", lineHeight: "1.4" }}>
          <input type="checkbox" checked={agreeTerms} onChange={() => setAgreeTerms(!agreeTerms)} style={{ width: "18px", height: "18px", marginTop: "2px", cursor: "pointer" }} />
          <span>I authorize KIKA Global to index this membership profile. I declare that the capital injections comply with the Anti-Money Laundering regulatory parameters enforced by the Financial Intelligence Authority (FIA) of Uganda.</span>
        </label>
      </div>

      <button type="submit" style={{ width: "100%", backgroundColor: "#0f172a", color: "#ffffff", border: "none", padding: "14px", fontSize: "16px", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", boxShadow: "0 4px 6px rgba(15,23,42,0.15)" }}>
        Finalize SACCO Shareholder Subscription
      </button>
    </form>
  );
}
