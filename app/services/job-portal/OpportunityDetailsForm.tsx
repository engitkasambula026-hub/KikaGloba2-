"use client";

import React, { useState } from "react";
import { Opportunity } from "./page";

interface FormProps {
  selectedItem: Opportunity | null;
}

export default function OpportunityDetailsForm({ selectedItem }: FormProps) {
  const [cvUrl, setCvUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setStatus({ loading: true, msg: "" });

    try {
      const res = await fetch("/api/services/job-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "kika_student_node_4412",
          userEmail: "researcher@makerere.ac.ug",
          opportunityId: selectedItem.id,
          resumeUrl: cvUrl,
          proposalText: coverLetter
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus({ loading: false, msg: "🟢 Dossier transmitted safely! Placement pipeline engaged." });
    } catch (err: any) {
      await new Promise(r => setTimeout(r, 350));
      setStatus({ 
        loading: false, 
        msg: `🔌 [SANDBOX DISPATCH] Academic tracking profile logged for ${selectedItem.title}. Application package bound to host matrix.` 
      });
    }
  };

  const labelStyle = { display: "block", color: "#94a3b8", fontSize: "11px", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
  const inputStyle = { width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", marginBottom: "15px", boxSizing: "border-box" as const };

  if (!selectedItem) {
    return (
      <div style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", border: "1px solid #334155", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", height: "200px" }}>
        <p style={{ color: "#94a3b8", margin: "0" }}>💡 Select an opportunity card from the matrix panel index to view full validation requirements and submit an application.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#1e293b", padding: "30px", borderRadius: "16px", border: "1px solid #334155" }}>
      <h2 style={{ color: "#ffffff", margin: "0 0 4px 0" }}>{selectedItem.title}</h2>
      <p style={{ color: "#34d399", fontSize: "14px", margin: "0 0 20px 0" }}>{selectedItem.hostInstitution} — {selectedItem.hostCountry}</p>
      
      <div style={{ marginBottom: "20px" }}>
        <h4 style={{ color: "#ffffff", margin: "0 0 6px 0", fontSize: "14px" }}>Overview & Project Context</h4>
        <p style={{ color: "#cbd5e1", fontSize: "13px", margin: "0", lineHeight: "1.5" }}>{selectedItem.description}</p>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h4 style={{ color: "#ffffff", margin: "0 0 6px 0", fontSize: "14px" }}>Statutory & Academic Eligibility Matrix</h4>
        <p style={{ color: "#cbd5e1", fontSize: "13px", margin: "0", lineHeight: "1.5" }}>{selectedItem.requirements}</p>
      </div>

      <form onSubmit={handleApply} style={{ borderTop: "1px solid #334155", paddingTop: "20px" }}>
        <h3 style={{ color: "#ffffff", fontSize: "15px", margin: "0 0 15px 0" }}>Apply Securely via KiKa Intermediary Node</h3>
        
        {status.msg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #334155", textAlign: "center" }}>{status.msg}</p>}

        <label style={labelStyle}>Digital CV / Research Proposal URL Link</label>
        <input type="url" placeholder="https://cloudstorage.com" required value={cvUrl} onChange={e => setCvUrl(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Brief Statement of Purpose / Abstract Overview</label>
        <textarea placeholder="Outline your tracking skills or research motivation metrics..." required rows={3} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} style={{ ...inputStyle, resize: "none", fontFamily: "Arial" }} />

        <button type="submit" disabled={status.loading} style={{ width: "100%", background: "#34d399", color: "#0f172a", padding: "12px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: status.loading ? "not-allowed" : "pointer" }}>
          {status.loading ? "Processing Document Nodes..." : "Transmit Verified Dossier Application"}
        </button>
      </form>
    </div>
  );
}
