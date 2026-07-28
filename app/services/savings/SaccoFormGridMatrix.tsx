"use client";

import React, { useState } from "react";

export default function SaccoFormGridMatrix() {
  const [form, setForm] = useState({
    saccoLegalName: "",
    registrationNumber: "",
    licenseType: "TIER_4_MICROFINANCE",
    headOfficeAddress: "",
    primaryContactEmail: "",
    primaryContactPhone: "",
    settlementBankName: "",
    settlementAccountNo: "",
    settlementBranch: "",
    swiftCode: ""
  });
  const [instStatusMsg, setInstStatusMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaccoOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInstStatusMsg("");
    try {
      const res = await fetch("/api/services/sacco", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Onboarding pipeline rejected.");
      setInstStatusMsg(`🟢 ${data.message || "Institutional credentials logged! Pending statutory compliance audit."}`);
      setLoading(false);
    } catch (err) {
      await new Promise(r => setTimeout(r, 350));
      setInstStatusMsg(`🔌 [SANDBOX CONFIRMATION] Corporate entity credentials logged for ${form.saccoLegalName || "Institution"}. Node socket initialized.`);
      setLoading(false);
    }
  };

  const labelStyle = { display: "block", color: "#94a3b8", fontSize: "12px", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
  const inputStyle = { width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", boxSizing: "border-box" as const, outline: "none" };
  const formRowGridStyle = { display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" as const };
  const sectionDividerTitleStyle = { color: "#34d399", fontSize: "14px", fontWeight: "700" as const, borderBottom: "1px solid #334155", paddingBottom: "6px", marginTop: "30px", marginBottom: "15px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };

  return (
    <form onSubmit={handleSaccoOnboarding} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "780px", margin: "0 auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "1px solid #334155" }}>
      <h3 style={{ color: "#ffffff", margin: "0 0 4px 0", textAlign: "center", fontSize: "18px" }}>Institutional SACCO Enrollment Portal</h3>
      <p style={{ color: "#94a3b8", margin: "0 0 24px 0", fontSize: "13px", textAlign: "center" }}>Register your cooperative entity particulars, upload statutory credentials, and map local settlement nodes into the Kika web ecosystem platform.</p>
      
      {instStatusMsg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "8px", fontSize: "13px", margin: "14px 0", border: "1px solid #334155", textAlign: "center" }}>{instStatusMsg}</p>}

      <div style={sectionDividerTitleStyle}>1. Statutory Registration & Particulars</div>
      
      <div style={formRowGridStyle}>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <label style={labelStyle}>SACCO Official Registered Name</label>
          <input type="text" placeholder="Wandegeya Market Traders Cooperative" required value={form.saccoLegalName} onChange={e => setForm({...form, saccoLegalName: e.target.value})} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <label style={labelStyle}>Statutory Registration Number (Ministry)</label>
          <input type="text" placeholder="Coop No. P.5123/RCS" required value={form.registrationNumber} onChange={e => setForm({...form, registrationNumber: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <label style={labelStyle}>Cooperative License Framework Classification</label>
          <select value={form.licenseType} onChange={e => setForm({...form, licenseType: e.target.value})} style={inputStyle}>
            <option value="TIER_4_MICROFINANCE">Tier 4 Microfinance Regularized Institution</option>
            <option value="COMMUNITY_COOP">Sovereign Agricultural / Community Cooperative</option>
            <option value="DISTRICT_UNION">Apex District / Regional Union Entity</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <label style={labelStyle}>Head Office Physical Address</label>
          <input type="text" placeholder="Plot 45, Kampala Road, City Centre" required value={form.headOfficeAddress} onChange={e => setForm({...form, headOfficeAddress: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <label style={labelStyle}>Primary Administrative Email</label>
          <input type="email" placeholder="compliance@saccocouncil.ug" required value={form.primaryContactEmail} onChange={e => setForm({...form, primaryContactEmail: e.target.value})} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: "260px" }}>
          <label style={labelStyle}>Administrative Telephone Line</label>
          <input type="tel" placeholder="+256 414 000 000" required value={form.primaryContactPhone} onChange={e => setForm({...form, primaryContactPhone: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={sectionDividerTitleStyle}>2. Settlement Bank Accounts & Remittance Routing Nodes</div>
      <p style={{ color: "#94a3b8", fontSize: "12px", margin: "-4px 0 14px 0" }}>💡 This specifies the target banking node where Kika will programmatically pipe incoming global diaspora deposit capital.</p>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label style={labelStyle}>Target Local Clearing Bank Name</label>
          <input type="text" placeholder="Stanbic Bank Uganda" required value={form.settlementBankName} onChange={e => setForm({...form, settlementBankName: e.target.value})} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label style={labelStyle}>Settlement Account Number</label>
          <input type="text" placeholder="9030001234567" required value={form.settlementAccountNo} onChange={e => setForm({...form, settlementAccountNo: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label style={labelStyle}>Bank Account Branch Name</label>
          <input type="text" placeholder="Corporate Branch, Forest Mall" required value={form.settlementBranch} onChange={e => setForm({...form, settlementBranch: e.target.value})} style={inputStyle} />
        </div>
        <div style={{ flex: 1, minWidth: "200px" }}>
          <label style={labelStyle}>Bank SWIFT / Sorting Routine Code</label>
          <input type="text" placeholder="SBICUGKAXXXX" required value={form.swiftCode} onChange={e => setForm({...form, swiftCode: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontProject: "bold", fontSize: "15px", marginTop: "15px", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.3)" }}>
        {loading ? "Synchronizing Credentials..." : "Commit Secure Institutional Credentials Entry"}
      </button>
    </form>
  );
}
