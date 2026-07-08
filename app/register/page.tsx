"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    sex: "MALE",
    dateOfBirth: "",
    placeOfBirth: "",
    maritalStatus: "SINGLE",
    originCountry: "Uganda",
    hostCountry: "Sweden",
    domicileStatus: "TEMPORARY",
    passportNumber: "",
    gpsLocation: "0,0",
    profession: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Programmatic GPS Coordinate Resolver Block
  const captureGpsCoordinates = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLongStr = `${position.coords.latitude},${position.coords.longitude}`;
          setForm(prev => ({ ...prev, gpsLocation: latLongStr }));
          alert(`📍 GPS Spatial Anchor Synchronized with Google Maps: ${latLongStr}`);
        },
        () => alert("⚠️ GPS validation timed out. Falling back to default system coordinate maps.")
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Try again.");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Unable to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      
      {/* 🚀 FIXED TOP NAVIGATION HEADER HUB WITH RETURN OPTIONS */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🚀 KIKA REGISTRY HUB</span>
        <button 
          onClick={(e) => { e.preventDefault(); router.push("/"); }}
          style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold", transition: "all 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(52, 211, 153, 0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          ⬅️ Return to Main Page
        </button>
      </header>

      {/* CENTRAL ENTRY PLATFORM SCREEN PORTAL */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleSubmit} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "680px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "1px solid #334155" }}>
          
          <h2 style={{ color: "#ffffff", margin: "0 0 4px 0", textAlign: "center" }}>Diaspora National Registry Setup</h2>
          <p style={{ color: "#94a3b8", margin: "0 0 24px 0", fontSize: "13px", textAlign: "center" }}>Automating global documentation indexes, physical residences, and cross-border identities.</p>
          
          {error && <p style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px", fontSize: "14px", margin: "10px 0", border: "1px solid rgba(239, 68, 68, 0.2)", textAlign: "center" }}>{error}</p>}
          
          {/* SECTION 1: PRIMARY VITAL STATISTICS */}
          <div style={sectionDividerTitleStyle}>1. Personal Identity Details</div>
          
          <div style={formRowGridStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Full Legal Name</label>
              <input type="text" placeholder="John Doe" required onChange={e => setForm({...form, name: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Global Email Address</label>
              <input type="email" placeholder="john.doe@global.com" required onChange={e => setForm({...form, email: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={formRowGridStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Biological Sex Classification</label>
              <select value={form.sex} onChange={e => setForm({...form, sex: e.target.value})} style={inputStyle}>
                <option value="MALE">Male Gender Node</option>
                <option value="FEMALE">Female Gender Node</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Date of Birth</label>
              <input type="date" required onChange={e => setForm({...form, dateOfBirth: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={formRowGridStyle}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Place of Birth / Municipality</label>
              <input type="text" placeholder="Kampala Hospital" required onChange={e => setForm({...form, placeOfBirth: e.target.value})} style={inputStyle} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Marital Status Index</label>
              <select value={form.maritalStatus} onChange={e => setForm({...form, maritalStatus: e.target.value})} style={inputStyle}>
                <option value="SINGLE">Single Status</option>
                <option value="MARRIED">Married Status</option>
                <option value="DIVORCED">Divorced Status</option>
                <option value="WIDOWED">Widowed Status</option>
              </select>
            </div>
          </div>
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
              <input type="text" placeholder="A00000000" required onChange={e => setForm({...form, passportNumber: e.target.value})} style={inputStyle} />
            </div>
          </div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Current Professional Domain / Sector</label>
            <input type="text" placeholder="Agribusiness Exporter / Mechanical Engineering Contractor" required onChange={e => setForm({...form, profession: e.target.value})} style={inputStyle} />
          </div>

          <button type="button" onClick={captureGpsCoordinates} style={gpsBtnStyle}>
            📍 Sync System Coordinates with Live Google Maps GPS
          </button>

          {/* SECTION 3: SYSTEM PERMISSIONS PROTECTION */}
          <div style={sectionDividerTitleStyle}>3. Core Account Access Protocol</div>

          <div style={{ margin: "14px 0" }}>
            <label style={labelStyle}>Secure Account Access Password</label>
            <input type="password" placeholder="••••••••" required onChange={e => setForm({...form, password: e.target.value})} style={inputStyle} />
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
const sectionDividerTitleStyle = { color: "#34d399", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "1.5px", marginTop: "24px", marginBottom: "12px", borderBottom: "1px solid #334155", paddingBottom: "6px" };
const formRowGridStyle = { display: "flex", gap: "16px", margin: "12px 0" };
const labelStyle = { display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px", fontFamily: "Arial" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
const gpsBtnStyle = { width: "100%", padding: "12px", background: "rgba(52, 211, 153, 0.05)", border: "1px dashed #34d399", borderRadius: "8px", fontWeight: "bold" as const, fontSize: "12px", cursor: "pointer", marginTop: "16px", color: "#34d399", transition: "all 0.2s" };
const submitBtnStyle = { width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "15px", marginTop: "24px", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.3)" };
