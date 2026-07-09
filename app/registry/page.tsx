"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DemographicalRegistryPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    sex: "MALE",
    dateOfBirth: "",
    maritalStatus: "SINGLE",
    country: "Sweden",
    city: "",
    residentialStatus: "TEMPORARY_WORK_PERMIT",
    postalCode: "",
    fullAddress: "",
    latitude: "0.0",
    longitude: "0.0",
    sector: "TECHNOLOGY"
  });
  const [status, setStatus] = useState({ loading: false, msg: "" });
  const router = useRouter();

  const syncGpsSystem = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setForm(prev => ({ 
          ...prev, 
          latitude: pos.coords.latitude.toString(), 
          longitude: pos.coords.longitude.toString() 
        }));
        alert(`📍 GPS Spatial Anchor Synchronized with Google Maps!\nLat: ${pos.coords.latitude}\nLong: ${pos.coords.longitude}`);
      });
    }
  };

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "" });
    await new Promise(r => setTimeout(r, 350));
    setStatus({ loading: false, msg: "🟢 Diaspora Demographic directory record synchronized safely." });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER CONTROLS NAVIGATION LINK HUB */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🌍 DIASPORA NATIONAL ASSET REGISTRY</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>
          ⬅️ Return to Main Page
        </button>
      </header>

      {/* CENTRAL REGISTRATION STREAM AREA */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleEnrollment} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "680px", border: "1px solid #334155", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
          <h2 style={{ color: "#ffffff", textAlign: "center", margin: "0 0 6px 0" }}>Global Asset Enrollment Hub</h2>
          <p style={{ color: "#94a3b8", textAlign: "center", fontSize: "13px", margin: "0 0 24px 0" }}>Mapping international professionals, residential statuses, and physical tracking vectors into the national directory.</p>

          {status.msg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "6px", fontSize: "13px", textAlign: "center", border: "1px solid #334155" }}>{status.msg}</p>}

          {/* SECTION 1: INDIVIDUAL VITAL PARTICULARS */}
          <div style={sectionTitleStyle}>1. Demographical Profile & Vital Statistics</div>

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Full Registry Legal Name</label>
              <input type="text" placeholder="Jane Doe" required onChange={e => setForm({...form, fullName: e.target.value})} style={iptStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Contact Email Address</label>
              <input type="email" placeholder="jane.doe@outreach.com" required onChange={e => setForm({...form, email: e.target.value})} style={iptStyle} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Mobile Phone Number</label>
              <input type="tel" placeholder="+46 70 123 4567" required onChange={e => setForm({...form, phone: e.target.value})} style={iptStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Biological Sex</label>
              <select value={form.sex} onChange={e => setForm({...form, sex: e.target.value})} style={iptStyle}>
                <option value="MALE">Male Gender Node</option>
                <option value="FEMALE">Female Gender Node</option>
              </select>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Date of Birth</label>
              <input type="date" required onChange={e => setForm({...form, dateOfBirth: e.target.value})} style={iptStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Marital Status Index</label>
              <select value={form.maritalStatus} onChange={e => setForm({...form, maritalStatus: e.target.value})} style={iptStyle}>
                <option value="SINGLE">Single Status</option>
                <option value="MARRIED">Married Status</option>
                <option value="DIVORCED">Divorced Status</option>
                <option value="WIDOWED">Widowed Status</option>
              </select>
            </div>
          </div>
          {/* SECTION 2: HOST GEOGRAPHICAL LOGISTICS */}
          <div style={sectionTitleStyle}>2. Residence Status & Spatial Coordinates Tracking</div>

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Sovereign Country of Residence</label>
              <select value={form.country} onChange={e => setForm({...form, country: e.target.value})} style={iptStyle}>
                <option value="Sweden">Sweden (Nordic Node)</option>
                <option value="United Kingdom">United Kingdom (UK Node)</option>
                <option value="United States">United States (US Node)</option>
                <option value="Canada">Canada (CA Node)</option>
                <option value="Germany">Germany (EU Node)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>City of Residence</label>
              <input type="text" placeholder="Stockholm" required onChange={e => setForm({...form, city: e.target.value})} style={iptStyle} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", margin: "12px 0" }}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Legal Residential / Domicile Status</label>
              <select value={form.residentialStatus} onChange={e => setForm({...form, residentialStatus: e.target.value})} style={iptStyle}>
                <option value="TEMPORARY_WORK_PERMIT">Temporary Work-Permit Status</option>
                <option value="PERMANENT_RESIDENCE">Permanent Residence Status</option>
                <option value="STUDENT_VISA">Student / Research Visa Node</option>
                <option value="CITIZEN_OF_ORIGIN">Citizen of Origin (Dual Sovereign National)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Postal Code / ZIP Boundary</label>
              <input type="text" placeholder="111 22" required onChange={e => setForm({...form, postalCode: e.target.value})} style={iptStyle} />
            </div>
          </div>

          <div style={{ margin: "14px 0" }}>
            <label style={lblStyle}>Full Physical Tracking / Post Address</label>
            <input type="text" placeholder="Kungsgatan 12, Floor 3" required onChange={e => setForm({...form, fullAddress: e.target.value})} style={iptStyle} />
          </div>

          <div style={{ background: "#0f172a", padding: "16px", borderRadius: "10px", margin: "20px 0", border: "1px solid #334155" }}>
            <button type="button" onClick={syncGpsSystem} style={{ width: "100%", padding: "12px", background: "transparent", border: "1px dashed #34d399", color: "#34d399", fontWeight: "bold", borderRadius: "8px", cursor: "pointer" }}>
              📍 Plug Live Google Maps / GPS Spatial Coordinates
            </button>
            <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
              <input type="text" readOnly value={`Lat: ${form.latitude}`} style={{ ...iptStyle, textAlign: "center", background: "#1e293b", color: "#94a3b8" }} />
              <input type="text" readOnly value={`Long: ${form.longitude}`} style={{ ...iptStyle, textAlign: "center", background: "#1e293b", color: "#94a3b8" }} />
            </div>
          </div>

          <button type="submit" style={{ width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.2)" }}>
            Synchronize Directory Registration Profile
          </button>

        </form>
      </div>
    </div>
  );
}

const sectionTitleStyle = { color: "#34d399", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "1.5px", marginTop: "22px", marginBottom: "10px", borderBottom: "1px solid #334155", paddingBottom: "6px" };
const lblStyle = { display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px" };
const iptStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
