"use client";

import React from "react";
import Link from "next/link";

interface SectionProps {
  form: any;
  setForm: (state: any) => void;
  loading: boolean;
  setStatusMsg: (msg: string) => void;
}

export default function RegistryFormBodySections({ form, setForm, loading, setStatusMsg }: SectionProps) {
  
  const captureGpsCoordinates = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          setForm((prev: any) => ({ ...prev, gpsLocation: coords }));
          setStatusMsg(`🟢 GPS Coordinates Synchronized: ${coords}`);
        },
        () => { setStatusMsg("⚠️ Geolocation access denied. Defaulting to system fallback."); }
      );
    } else {
      setStatusMsg("❌ Geolocation is not supported by this browser engine.");
    }
  };

  return (
    <>
      <div style={sectionDividerTitleStyle}>1. Primary Access Intent & Personal Info</div>

      <div style={{ margin: "12px 0 20px 0" }}>
        <label style={labelStyle}>Primary Goal of Registration</label>
        <select value={form.registrationReason} onChange={e => setForm({...form, registrationReason: e.target.value})} style={{ ...inputStyle, border: "1px solid #34d399", background: "rgba(52, 211, 153, 0.02)" }}>
          <option value="AGRIBUSINESS_OWC">🌾 Access OWC Poultry, Cattle & Crop Processing Programs</option>
          <option value="COOPERATIVE_PDM">🏛️ Subscribe to Parish Development Model (PDM) Sacco Savings</option>
          <option value="INDUSTRIAL_ONC">🏭 Invest in Industrial Value-Addition & Micro-Manufacturing</option>
          <option value="REAL_ESTATE_ESCROW">🏢 Fund Managed Diaspora Real Estate & Housing Escrow Pools</option>
          <option value="COMMERCIAL_LOANS">📉 Secure Low-Rate National Development Financing Lines</option>
        </select>
      </div>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Full Legal Name (As in Passport)</label>
          <input type="text" placeholder="Johnathan Mukasa" required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Primary Secure Email Address</label>
          <input type="email" placeholder="mukasa@diaspora.ug" required value={form.emailAddress} onChange={e => setForm({...form, emailAddress: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={sectionDividerTitleStyle}>2. Locational Boundaries & Spatial Tracking</div>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Country of Origin</label>
          <input type="text" value={form.originCountry} required onChange={e => setForm({...form, originCountry: e.target.value})} style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Current Host Country of Residence</label>
          <input type="text" value={form.hostCountry} required onChange={e => setForm({...form, hostCountry: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={formRowGridStyle}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Residential / Domicile Status</label>
          <select value={form.domicileStatus} onChange={e => setForm({...form, domicileStatus: e.target.value})} style={inputStyle}>
            <option value="TEMPORARY">Temporary Domicile Visa Node</option>
            <option value="PERMANENT">Permanent Domicile Resident Visa</option>
            <option value="STUDENT">Student Residency Permission</option>
            <option value="CITIZEN">Dual National / Sovereign Citizen</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>International Passport / ID Number</label>
          <input type="text" placeholder="A00000000" required value={form.passportNumber} onChange={e => setForm({...form, passportNumber: e.target.value})} style={inputStyle} />
        </div>
      </div>

      <div style={{ margin: "14px 0" }}>
        <label style={labelStyle}>Current Professional Domain / Sector</label>
        <input type="text" placeholder="Agribusiness Exporter / Mechanical Engineering Contractor" required value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} style={inputStyle} />
      </div>

      <button type="button" onClick={captureGpsCoordinates} style={gpsBtnStyle}>📍 Sync System Coordinates with Live Google Maps GPS</button>

      <div style={sectionDividerTitleStyle}>3. Core Account Access Protocol</div>

      <div style={{ margin: "14px 0" }}>
        <label style={labelStyle}>Secure Account Access Password</label>
        <input type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />
      </div>
      
      <button type="submit" disabled={loading} style={submitBtnStyle}>
        {loading ? "Synchronizing Matrix Parameters..." : "Authorize Gateway Account & Verify KYC"}
      </button>

      <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#94a3b8", fontFamily: "Arial" }}>
        Already Have Active Access Permissions? <Link href="/login" style={{ color: "#34d399", fontWeight: "bold", textDecoration: "none", marginLeft: "4px" }}>Sign In</Link>
      </p>
    </>
  );
}

const sectionDividerTitleStyle = { color: "#34d399", fontSize: "12px", fontWeight: "bold" as const, textTransform: "uppercase" as const, letterSpacing: "1.5px", marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid #334155", paddingBottom: "6px" };
const formRowGridStyle = { display: "flex", gap: "16px", margin: "12px 0" };
const labelStyle = { display: "block", fontSize: "11px", fontWeight: "bold" as const, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px", fontFamily: "Arial" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
const gpsBtnStyle = { width: "100%", padding: "12px", background: "rgba(52, 211, 153, 0.05)", border: "1px dashed #34d399", borderRadius: "8px", fontWeight: "bold" as const, fontSize: "12px", cursor: "pointer", marginTop: "16px", color: "#34d399", transition: "all 0.2s" };
const submitBtnStyle = { width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "15px", marginTop: "24px", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.3)" };
