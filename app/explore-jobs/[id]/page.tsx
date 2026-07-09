"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobApplicationFormPage() {
  const [form, setForm] = useState({ fullName: "", email: "", coverLetter: "", resumeName: "", portfolioLink: "" });
  const [status, setStatus] = useState({ loading: false, msg: "" });
  const router = useRouter();

  const handleDocumentSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, resumeName: e.target.files![0].name }));
      alert(`📎 Profile CV Node Attached: ${e.target.files[0].name}`);
    }
  };

  const handleApplicationSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "" });
    await new Promise(r => setTimeout(r, 450));
    setStatus({ loading: false, msg: "🟢 Application dossier successfully routed to corporate recruitment ledger!" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399" }}>🚀 SECURE JOB APPLICATION ENTRY</span>
        <button onClick={() => router.push("/explore-jobs")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>⬅️ Back to Job Board</button>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleApplicationSubmission} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "600px", border: "1px solid #334155" }}>
          <h2 style={{ color: "#ffffff", margin: "0 0 6px 0" }}>Submit Professional Profile Dossier</h2>
          <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 24px 0" }}>Upload credentials, link tracking achievements, and declare experience indexes.</p>
          
          {status.msg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "6px", fontSize: "13px", border: "1px solid #334155", textAlign: "center" }}>{status.msg}</p>}

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Full Applicant Name</label>
              <input type="text" placeholder="John Doe" required onChange={e => setForm({...form, fullName: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Global Contact Email</label>
              <input type="email" placeholder="john.doe@global.com" required onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
            </div>
          </div>
          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Personal Achievements Letter & Career Pitch</label>
            <textarea rows={5} placeholder="Detail your core technical achievements, project executions, and cross-border value contributions..." required onChange={e => setForm({...form, coverLetter: e.target.value})} style={{ ...inputStyle, fontFamily: "Arial", resize: "vertical" }} />
          </div>

          <div style={{ background: "#0f172a", padding: "20px", borderRadius: "10px", margin: "20px 0", border: "1px solid #334155" }}>
            <label style={{ ...labelStyle, color: "#34d399" }}>📄 Upload Professional CV / Resume (PDF / Word)</label>
            <input type="file" accept=".pdf,.doc,.docx" required onChange={handleDocumentSelection} style={{ color: "#ffffff", fontSize: "13px", marginTop: "8px" }} />
            {form.resumeName && <p style={{ color: "#94a3b8", fontSize: "11px", margin: "8px 0 0 0" }}>Attached: {form.resumeName}</p>}
          </div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Professional Portfolio / LinkedIn Link Reference</label>
            <input type="url" placeholder="https://linkedin.com" onChange={e => setForm({...form, portfolioLink: e.target.value})} style={inputStyle} />
          </div>

          <button type="submit" disabled={status.loading} style={{ width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer", marginTop: "14px" }}>
            {status.loading ? "Streaming Profile Matrix..." : "Transmit Application Dossier"}
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
