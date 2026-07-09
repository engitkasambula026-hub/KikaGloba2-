"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", sex: "MALE", dateOfBirth: "",
    placeOfBirth: "", maritalStatus: "SINGLE", hostCountry: "Sweden",
    domicileStatus: "TEMPORARY", passportNumber: "", gpsLocation: "0,0", profession: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const syncGps = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
        setForm(prev => ({ ...prev, gpsLocation: coords }));
        alert(`📍 GPS Coordinates Bound with Google Maps: ${coords}`);
      });
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
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
        setError(data.error || "Onboarding transaction rejected.");
        setLoading(false);
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Ecosystem pipeline offline. Connection failed.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399" }}>🚀 KIKA REGISTRATION HUB</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>⬅️ Return to Main Page</button>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleSignupSubmit} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "650px", border: "1px solid #334155", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
          <h2 style={{ color: "#ffffff", textAlign: "center", margin: "0" }}>Diaspora National Registry Setup</h2>
          <p style={{ color: "#94a3b8", textAlign: "center", fontSize: "13px", margin: "4px 0 24px 0" }}>Automating global documentation indexes, physical residences, and cross-border identities.</p>
          
          {error && <p style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "12px", borderRadius: "8px", fontSize: "14px", border: "1px solid rgba(239, 68, 68, 0.2)", textAlign: "center" }}>{error}</p>}
          
          <div style={hdrStyle}>1. Personal Identity Details</div>
          <div style={rowStyle}>
            <div style={{ flex: 1 }}><label style={lblStyle}>Full Legal Name</label><input type="text" placeholder="John Doe" required onChange={e => setForm({...form, name: e.target.value})} style={iptStyle} /></div>
            <div style={{ flex: 1 }}><label style={lblStyle}>Global Email Address</label><input type="email" placeholder="john.doe@global.com" required onChange={e => setForm({...form, email: e.target.value})} style={iptStyle} /></div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Biological Sex</label>
              <select value={form.sex} onChange={e => setForm({...form, sex: e.target.value})} style={iptStyle}>
                <option value="MALE">Male Gender Node</option>
                <option value="FEMALE">Female Gender Node</option>
              </select>
            </div>
            <div style={{ flex: 1 }}><label style={lblStyle}>Date of Birth</label><input type="date" required onChange={e => setForm({...form, dateOfBirth: e.target.value})} style={iptStyle} /></div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}><label style={lblStyle}>Place of Birth / Municipality</label><input type="text" placeholder="Kampala Hospital" required onChange={e => setForm({...form, placeOfBirth: e.target.value})} style={iptStyle} /></div>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Marital Status Index</label>
              <select value={form.maritalStatus} onChange={e => setForm({...form, maritalStatus: e.target.value})} style={iptStyle}>
                <option value="SINGLE">Single Status</option>
                <option value="MARRIED">Married Status</option>
              </select>
            </div>
          </div>

          <div style={hdrStyle}>2. Locational Boundaries & Spatial Tracking</div>
          <div style={rowStyle}>
            <div style={{ flex: 1 }}><label style={lblStyle}>Country of Origin</label><input type="text" value={form.originCountry} required onChange={e => setForm({...form, originCountry: e.target.value})} style={iptStyle} /></div>
            <div style={{ flex: 1 }}><label style={lblStyle}>Current Host Country</label><input type="text" value={form.hostCountry} required onChange={e => setForm({...form, hostCountry: e.target.value})} style={iptStyle} /></div>
          </div>

          <div style={rowStyle}>
            <div style={{ flex: 1 }}>
              <label style={lblStyle}>Domicile Status</label>
              <select value={form.domicileStatus} onChange={e => setForm({...form, domicileStatus: e.target.value})} style={iptStyle}>
                <option value="TEMPORARY">Temporary Domicile Visa Node</option>
                <option value="PERMANENT">Permanent Domicile Resident Visa</option>
                <option value="CITIZEN">Dual National / Sovereign Citizen</option>
              </select>
            </div>
            <div style={{ flex: 1 }}><label style={lblStyle}>Passport / ID Number</label><input type="text" placeholder="A00000000" required onChange={e => setForm({...form, passportNumber: e.target.value})} style={iptStyle} /></div>
          </div>

          <div style={{ margin: "14px 0" }}><label style={lblStyle}>Current Professional Domain / Sector</label><input type="text" placeholder="Software Architect / Agro-Exporter" required onChange={e => setForm({...form, profession: e.target.value})} style={iptStyle} /></div>
          <button type="button" onClick={syncGps} style={{ width: "100%", padding: "12px", background: "rgba(52, 211, 153, 0.05)", border: "1px dashed #34d399", color: "#34d399", borderRadius: "8px", fontWeight: "bold", fontSize: "12px", cursor: "pointer", marginBottom: "14px" }}>📍 Sync Coordinates with Live GPS Map</button>

          <div style={hdrStyle}>3. Core Account Access Protocol</div>
          <div style={{ margin: "14px 0" }}><label style={lblStyle}>Secure Password</label><input type="password" placeholder="••••••••" required onChange={e => setForm({...form, password: e.target.value})} style={iptStyle} /></div>
          
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "15px", marginTop: "14px", boxShadow: "0 4px 14px rgba(52, 211, 153, 0.3)" }}>
            {loading ? "Synchronizing Matrix Parameters..." : "Commit Secure Registration Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}

const hdrStyle = { color: "#34d399", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase" as const, letterSpacing: "1.5px", marginTop: "20px", marginBottom: "10px", borderBottom: "1px solid #334155", paddingBottom: "6px" };
const rowStyle = { display: "flex", gap: "16px", margin: "12px 0" };
const lblStyle = { display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, marginBottom: "6px" };
const iptStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
