"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function TechnicalInnovationPage() {
  const [form, setForm] = useState({ innovatorName: "", domainSector: "SCIENCE_TECH", projectTitle: "", researchAbstract: "", requiredCapitalUSD: "5000" });
  const [status, setStatus] = useState({ loading: false, msg: "" });
  const router = useRouter();

  const handleInnovationOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "" });
    await new Promise(r => setTimeout(r, 400));
    setStatus({ loading: false, msg: "🔬 Innovation project profile locked! Linked to the active global diaspora investment dashboard board." });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>💡 INNOVATION & TALENT SHIELD</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>⬅️ Return to Main Page</button>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleInnovationOnboarding} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "650px", border: "1px solid #334155" }}>
          <h2 style={{ color: "#ffffff", textAlign: "center", margin: "0 0 4px 0" }}>Research & Talent Credentials Portal</h2>
          <p style={{ color: "#94a3b8", textAlign: "center", fontSize: "13px", margin: "0 0 24px 0" }}>Register technical innovations, dramatic initiatives, or scientific models to secure development grants.</p>

          {status.msg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "6px", fontSize: "13px", border: "1px solid #334155", textAlign: "center" }}>{status.msg}</p>}

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Innovator / Expert Legal Name</label>
              <input type="text" placeholder="Dr. Kasambula Engineering" required onChange={e => setForm({...form, innovatorName: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Expertise Domain Sector</label>
              <select value={form.domainSector} onChange={e => setForm({...form, domainSector: e.target.value})} style={inputStyle}>
                <option value="SCIENCE_TECH">🔬 Scientific & Technical Innovation</option>
                <option value="AGRO_INNOVATION">🌾 Value-Add Agro-Tech Node</option>
                <option value="ART_DRAMA">🎭 Creative Arts & Drama Venture</option>
              </select>
            </div>
          </div>
          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Project Core Working Title</label>
            <input type="text" placeholder="Decentralized Solar Extraction Unit Grid" required onChange={e => setForm({...form, projectTitle: e.target.value})} style={inputStyle} />
          </div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Research Abstract / Executive Venture Proposal</label>
            <textarea rows={5} placeholder="Provide an explicit operational breakdown of your prototype innovation, testing milestones, and market application vectors..." required onChange={e => setForm({...form, researchAbstract: e.target.value})} style={{ ...inputStyle, resize: "vertical" }} />
          </div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Target Development Venture Capital Requirement ($ USD)</label>
            <input type="number" min={500} placeholder="15000" required onChange={e => setForm({...form, requiredCapitalUSD: e.target.value})} style={inputStyle} />
          </div>

          <button type="submit" style={{ width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer", marginTop: "14px" }}>
            Synchronize Innovation Profile to Registry
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
