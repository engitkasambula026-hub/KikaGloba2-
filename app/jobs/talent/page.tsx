"use client";

import React, { useState } from "react";

export default function TalentRegisterPage() {
  // Candidate Metrics States
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");
  
  // Professional Competency States
  const [academicLevel, setAcademicLevel] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [attributes, setAttributes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Talent Matrix Profile Logged!\nCandidate: ${candidateName}\nSpecialization: ${specialization}`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", color: "#1e293b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "650px", margin: "0 auto" }}>
        
        {/* BULLETPROOF RETURN POINTER LINK */}
        <button 
          onClick={() => window.location.href = "/"} 
          style={{ background: "none", border: "none", color: "#2563eb", fontSize: "16px", fontWeight: "bold", cursor: "pointer", padding: "0", marginBottom: "25px", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          ← Return to KIKA Global Homepage
        </button>

        <h1 style={{ fontSize: "32px", color: "#0f172a", marginBottom: "10px", fontWeight: "800" }}>👥 Technical Talent Matrix</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", lineHeight: "1.5" }}>Map your identity parameters, mechanical skills, and scientific credentials directly into the continental allocation pool.</p>
        
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          
          <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section I: Personal Identity Records</h3>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Full Candidate Name</label>
            <input type="text" placeholder="Enter legal first and last name" required value={candidateName} onChange={(e) => setCandidateName(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Email Address</label>
              <input type="email" placeholder="name@example.com" required value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Phone Contact</label>
              <input type="tel" placeholder="+1 (555) 000-0000" required value={candidatePhone} onChange={(e) => setCandidatePhone(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Postal Address / Current Location Residence</label>
            <input type="text" placeholder="City, Country or standard mailing text..." required value={candidateAddress} onChange={(e) => setCandidateAddress(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>

          <h3 style={{ marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section II: Credentials & Competency Vectors</h3>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Highest Academic Tier</label>
            <input type="text" placeholder="BSc, MSc, PhD, Advanced Trade Certification" required value={academicLevel} onChange={(e) => setAcademicLevel(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Primary Scientific Specialization</label>
            <input type="text" placeholder="e.g., Civil Systems, Applied Mathematics, Metallurgy" required value={specialization} onChange={(e) => setSpecialization(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          
          <div style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Mechanical & Technical Attribute Logs</label>
            <textarea rows={5} placeholder="Enumerate professional asset systems, mechanical instruments, design software, or specific processing technologies you control..." required value={attributes} onChange={(e) => setAttributes(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontFamily: "Arial, sans-serif", resize: "vertical" }} />
          </div>
          
          <button type="submit" style={{ width: "100%", backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "14px", fontSize: "16px", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", boxShadow: "0 4px 6px rgba(22,163,74,0.2)" }}>
            Index Credentials Into Global Pool
          </button>
        </form>
      </div>
    </div>
  );
}
