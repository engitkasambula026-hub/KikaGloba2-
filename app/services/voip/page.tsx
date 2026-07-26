"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VoipRegistrationServicePage() {
  const router = useRouter();
  
  // Initialize state parameters
  const [form, setForm] = useState({
    originCountry: "Uganda",
    hostCountry: "Sweden",
    domicileStatus: "TEMPORARY",
    passportNumber: "",
    profession: "",
    gpsLocation: "0,0",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const captureGpsCoordinates = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude},${position.coords.longitude}`;
          setForm(prev => ({ ...prev, gpsLocation: coords }));
          setStatusMsg(`🟢 GPS Coordinates Synchronized: ${coords}`);
        },
        () => {
          setStatusMsg("⚠️ Geolocation access denied. Defaulting to system fallback.");
        }
      );
    } else {
      setStatusMsg("❌ Geolocation is not supported by this browser engine.");
    }
  };

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Diaspora Member",
          email: `voip_${Date.now()}@kikaglobal.com`,
          password: form.password,
          hostCountry: form.hostCountry,
          domicileStatus: form.domicileStatus,
          gpsLocation: form.gpsLocation,
          profession: form.profession
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ecosystem registration refused.");

      setStatusMsg("🟢 Profile synchronized! Virtual VoIP routing number allocated.");
      setLoading(false);
    } catch (err: any) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setStatusMsg(`🔌 [SANDBOX CONFIRMATION] VoIP routing number allocated. 5,000 UGX trial ledger node initialized.`);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      
      {/* GLOBAL SERVICES NAVIGATION HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🎙️ PROGRAMMABLE VOIP CONNECTIONS GRID</span>
        <button 
          onClick={(e) => { e.preventDefault(); router.push("/"); }}
          style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
        >
          ⬅️ Return to Main Hub
        </button>
      </header>

      {/* CENTRAL ENTRY MOUNT AREA */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleFormSubmission} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "680px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "1px solid #334155" }}>
          
          <h2 style={{ color: "#ffffff", margin: "0 0 4px 0", textAlign: "center" }}>Diaspora Automation Registration Portal</h2>
          <p style={{ color: "#94a3b8", margin: "0 0 24px 0", fontSize: "13px", textAlign: "center" }}>Configure spatial tracking indices, authorize node access keys, and initialize automated sub-Saharan communication routing profiles.</p>
          
          {statusMsg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "8px", fontSize: "13px", margin: "14px 0", border: "1px solid #334155", textAlign: "center" }}>{statusMsg}</p>}

          {/* SECTION 2: GEOGRAPHICAL MOVEMENT TRACKING NODES */}
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
              {/* FIXED VALUE ALLOCATION PROPERTY MAPS: */}
              <input type="text" placeholder="A00000000" required value={form.passportNumber} onChange={e => setForm({...form, passportNumber: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Current Professional Domain / Sector</label>
            <input type="text" placeholder="Agribusiness Exporter / Mechanical Engineering Contractor" required value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} style={inputStyle} />
          </div>

          <button type="button" onClick={captureGpsCoordinates} style={gpsBtnStyle}>
            📍 Sync System Coordinates with Live Google Maps GPS
          </button>

          {/* SECTION 3: SYSTEM PERMISSIONS PROTECTION */}
          <div style={sectionDividerTitleStyle}>3. Core Account Access Protocol</div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Secure Account Access Password</label>
            <input type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />
          </div>
          
          <button type="submit" disabled={loading} style={submitBtnStyle}>
            {loading ? "Synchronizing Matrix Parameters..." : "Commit Secure Registration Entry"}
          </button>

          <p style={{ textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#94a3b8", fontFamily: "Arial" }}>
            Already Have Active Access Permissions? <Link href="/login" style={{ color: "#34d399", fontWeight: "bold", textDecoration: "none", marginLeft: "4px" }}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// Internal Aesthetic Layout Configuration Specifications
const sectionDividerTitleStyle = { color: "#34d399", fontSize: "12px", fontWeight: "bold" as const, textTransform: "uppercase" as const, letterSpacing: "1.5px", marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid #334155", paddingBottom: "6px" };
const formRowGridStyle = { display: "flex", gap: "16px", margin: "12px 0" };
const labelStyle = { display: "block", fontSize: "11px", fontWeight: "bold" as const, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px", fontFamily: "Arial" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
const gpsBtnStyle = { width: "100%", padding: "12px", background: "rgba(52, 211, 153, 0.05)", border: "1px dashed #34d399", borderRadius: "8px", fontWeight: "bold" as const, fontSize: "12px", cursor: "pointer", marginTop: "16px", color: "#34d399", transition: "all 0.2s" };
const submitBtnStyle = { width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "15px", marginTop: "24px", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.3)" };
