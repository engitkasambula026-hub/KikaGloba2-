"use client";
import React from "react";
import SaccoForm from "../../components/SaccoForm";

export default function CoopSavingsPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", color: "#1e293b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "650px", margin: "0 auto" }}>
        
        {/* HOMEPAGE ROUTING RETURN BUTTON */}
        <button onClick={() => { window.location.href = "/"; }} style={{ background: "none", border: "none", color: "#2563eb", fontSize: "16px", fontWeight: "bold", cursor: "pointer", padding: "0", marginBottom: "25px" }}>
          ← Return to KIKA Global Homepage
        </button>

        <h1 style={{ fontSize: "32px", color: "#0f172a", marginBottom: "10px", fontWeight: "800" }}>💼 Cooperative SACCO Savings Grid</h1>
        <p style={{ color: "#64748b", marginBottom: "30px", lineHeight: "1.5" }}>Securely pool capital into verified Ugandan Savings & Credit Cooperatives to build local production infrastructure.</p>
        
        {/* Mapped perfectly to your components directory folder asset */}
        <SaccoForm />

      </div>
    </div>
  );
}
