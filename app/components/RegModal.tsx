"use client";
import React from "react";

interface ModalProps {
  selectedService: string | null;
  formName: string;
  setFormName: (val: string) => void;
  formPhone: string;
  setFormPhone: (val: string) => void;
  formAddress: string;
  setFormAddress: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function RegModal({
  selectedService,
  formName,
  setFormName,
  formPhone,
  setFormPhone,
  formAddress,
  setFormAddress,
  onSubmit,
  onClose,
}: ModalProps) {
  
  // 🛡️ SECURITY ESCAPE CLAUSE: Destroys the layout module layer instantly if inactive
  if (!selectedService) {
    return null;
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 6000, backdropFilter: "blur(4px)" }}>
      <div style={{ backgroundColor: "#1e293b", borderRadius: "16px", width: "100%", maxWidth: "480px", padding: "35px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "1px solid #334155" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0, color: "#ffffff" }}>Account Registration</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "28px", cursor: "pointer", color: "#94a3b8", padding: 0, lineHeight: 1 }}>&times;</button>
        </div>
        
        <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "20px", lineHeight: "1.5" }}>Setting up system parameters for your <strong style={{ color: "#38bdf8" }}>{selectedService}</strong> role profile.</p>
        
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px", color: "#94a3b8", textTransform: "uppercase" }}>Full Name / Corporate Title</label>
            <input type="text" required value={formName} onChange={(e) => setFormName(e.target.value)} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#ffffff", outline: "none" }} />
          </div>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", marginBottom: "6px", color: "#94a3b8", textTransform: "uppercase" }}>Verified Phone Contact</label>
            <input type="tel" required value={formPhone} onChange={(e) => setFormPhone(e.target.value)} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#ffffff", outline: "none" }} />
          </div>
          
          <div style={{ marginBottom: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" }}>Postal Address Location</label>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "#38bdf8", textDecoration: "none", fontWeight: "bold" }}>📍 Open Google Maps Pin</a>
            </div>
            <input type="text" required placeholder="Paste verified GPS coordinates or address text..." value={formAddress} onChange={(e) => setFormAddress(e.target.value)} style={{ width: "100%", padding: "12px", boxSizing: "border-box", borderRadius: "6px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#ffffff", outline: "none" }} />
          </div>
          
          <button type="submit" style={{ width: "100%", backgroundColor: "#38bdf8", color: "#0f172a", border: "none", padding: "14px", fontSize: "15px", fontWeight: "bold", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.2s" }}>Finalize Verification Entry</button>
        </form>
      </div>
    </div>
  );
}
