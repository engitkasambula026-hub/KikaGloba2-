"use client";
import React, { useState } from "react";

export default function RegistrationForm() {
  const [fullName, setFullName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [originCountry, setOriginCountry] = useState("Uganda");
  const [hostCountry, setHostCountry] = useState("");
  const [domicileStatus, setDomicileStatus] = useState("");
  const [email, setEmail] = useState("");
  const [gpsLocation, setGpsLocation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState<string | null>(null);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profession, setProfession] = useState("");

  const handleCheckboxChange = (status: string) => {
    setMaritalStatus(maritalStatus === status ? null : status);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!maritalStatus) {
      alert("Please select your Marital Status parameter before indexing.");
      return;
    }
    alert(`Success! Node Logged:\nName: ${fullName}\nStatus: ${domicileStatus}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
      
      <h3 style={{ marginTop: "0", marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section I: Identity & Vital Statistics</h3>
      
      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Full Legal Name</label>
        <input type="text" placeholder="Matching passport records" required value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Place of Birth</label>
          <input type="text" placeholder="City/District, Country" required value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Date of Birth</label>
          <input type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box", color: "#1e293b" }} />
        </div>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Marital Status Parameters</label>
        <div style={{ display: "flex", gap: "30px", backgroundColor: "#f8fafc", padding: "12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "15px", color: "#1e293b" }}>
            <input type="checkbox" checked={maritalStatus === "Single"} onChange={() => handleCheckboxChange("Single")} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
            Single Node
          </label>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "15px", color: "#1e293b" }}>
            <input type="checkbox" checked={maritalStatus === "Married"} onChange={() => handleCheckboxChange("Married")} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
            Married Matrix
          </label>
        </div>
      </div>

      <h3 style={{ marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section II: Domicile & Structural Alignment</h3>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Ancestral Origin</label>
          <input type="text" required value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
        </div>
        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Current Domicile Country</label>
          <input type="text" placeholder="e.g., United Kingdom, UAE" required value={hostCountry} onChange={(e) => setHostCountry(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Domicile Legal Status Classification</label>
        <select required value={domicileStatus} onChange={(e) => setDomicileStatus(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box", backgroundColor: "#ffffff", color: "#1e293b", fontSize: "15px", cursor: "pointer" }}>
          <option value="" disabled>-- Select Verified Status --</option>
          <option value="Work Permit">💼 Work Permit Vector</option>
          <option value="Student">🎓 Student Track</option>
          <option value="Permanent Residence">🏡 Permanent Residence Node</option>
          <option value="Citizen">🛡️ Sovereign Citizen Status</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Passport Number / National ID (NIN)</label>
        <input type="text" placeholder="Identification code" required value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <label style={{ fontWeight: "bold", color: "#334155" }}>Google Map Post Address Pointer</label>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>📍 Open Maps to Drop Pin</a>
        </div>
        <input type="text" placeholder="Paste coordinates or shared map link..." required value={gpsLocation} onChange={(e) => setGpsLocation(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
      </div>

      <h3 style={{ marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" }}>Section III: Technical & Professional Domain</h3>

      <div style={{ marginBottom: "25px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Primary Profession / Skill Specialization</label>
        <input type="text" placeholder="e.g., Mechanical Systems, Medical Specialist" required value={profession} onChange={(e) => setProfession(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" }}>Secure Communications Email Channel</label>
        <input type="email" placeholder="name@domain.com" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }} />
      </div>

      <button type="submit" style={{ width: "100%", backgroundColor: "#0f172a", color: "#ffffff", border: "none", padding: "14px", fontSize: "16px", fontWeight: "bold", borderRadius: "6px", cursor: "pointer", boxShadow: "0 4px 6px rgba(15,23,42,0.15)" }}>
        Index Parameters Into Registry Node
      </button>
    </form>
  );
}

