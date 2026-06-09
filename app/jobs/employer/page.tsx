"use client";

import React, { useState } from "react";

export default function EmployerRegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Corporate Profile Registered:\nEntity: ${companyName}\nSector: ${industrySector}`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", color: "#1e293b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        
        {/* BULLETPROOF RETURN POINTER LINK */}
        <button 
          onClick={() => window.location.href = "/"} 
          style={{ background: "none", border: "none", color: "#2563eb", fontSize: "16px", fontWeight: "bold", cursor: "pointer", padding: "0", marginBottom: "25px", display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          ← Return to KIKA Global Homepage
        </button>

        <h1 style={{ fontSize: "32px", color: "#0f172a", marginBottom: "10px", fontWeight: "800" }}>📤 Employer Corporate Registry</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", lineHeight: "1.5" }}>Establish your enterprise parameters to publish verified global vacancies into our networks.</p>
        
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Registered Corporate Title</label>
            <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Industry Operational Sector</label>
            <input type="text" placeholder="e.g., Mechanical Engineering, Applied Sciences" required value={industrySector} onChange={(e) => setIndustrySector(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Physical Headquarters & GPS Coordinates</label>
            <input type="text" placeholder="City, Country or GPS Coordinates" required value={headquarters} onChange={(e) => setHeadquarters(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Operations Contact Email Channel</label>
            <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
          </div>
          <button type="submit" style={{ width: "100%", backgroundColor: "#0f172a", color: "#ffffff", border: "none", padding: "14px", fontSize: "16px", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", boxShadow: "0 4px 6px rgba(15,23,42,0.15)" }}>
            Finalize Enterprise Profile
          </button>
        </form>
      </div>
    </div>
  );
}
