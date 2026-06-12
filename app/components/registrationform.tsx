"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const router = useRouter();

  // Field States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [originCountry, setOriginCountry] = useState("Uganda");
  const [hostCountry, setHostCountry] = useState("");
  const [domicileStatus, setDomicileStatus] = useState("");
  const [gpsLocation, setGpsLocation] = useState("");
  const [maritalStatus, setMaritalStatus] = useState<string | null>(null);
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profession, setProfession] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!maritalStatus) return alert("Please select Marital Status.");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fullName, email, password, passportNumber, originCountry, hostCountry, domicileStatus, gpsLocation, maritalStatus, placeOfBirth, dateOfBirth, profession }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed.");
      alert("Registration Successful!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = { width: "100%", padding: "11px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" as const, marginBottom: "15px" };
  const labelStyle = { display: "block", fontWeight: "bold", marginBottom: "8px", color: "#334155" };
  const headingStyle = { marginBottom: "20px", color: "#1e293b", borderBottom: "2px solid #f1f5f9", paddingBottom: "10px", fontSize: "18px" };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "#ffffff", padding: "35px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
      <h3 style={headingStyle}>Section I: Identity & Vital Statistics</h3>
      {error && <div style={{ color: "red", padding: "10px", backgroundColor: "#fef2f2", borderRadius: "6px", marginBottom: "15px" }}>{error}</div>}

      <label style={labelStyle}>Full Legal Name</label>
      <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Place of Birth</label>
      <input type="text" required value={placeOfBirth} onChange={(e) => setPlaceOfBirth(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Date of Birth</label>
      <input type="date" required value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Marital Status</label>
      <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
        <label><input type="radio" name="marital" checked={maritalStatus === "Single"} onChange={() => setMaritalStatus("Single")} /> Single</label>
        <label><input type="radio" name="marital" checked={maritalStatus === "Married"} onChange={() => setMaritalStatus("Married")} /> Married</label>
      </div>

      <h3 style={headingStyle}>Section II: Domicile & Structural Alignment</h3>
      <label style={labelStyle}>Ancestral Origin</label>
      <input type="text" required value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Current Domicile Country</label>
      <input type="text" required value={hostCountry} onChange={(e) => setHostCountry(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Domicile Status</label>
      <select required value={domicileStatus} onChange={(e) => setDomicileStatus(e.target.value)} style={inputStyle}>
        <option value="">-- Select Status --</option>
        <option value="Work Permit">💼 Work Permit Vector</option>
        <option value="Student">🎓 Student Track</option>
        <option value="Permanent Residence">🏡 Permanent Residence Node</option>
        <option value="Citizen">🛡️ Sovereign Citizen Status</option>
      </select>

      <label style={labelStyle}>Passport / National ID</label>
      <input type="text" required value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>GPS Pointer Coordinates</label>
      <input type="text" required value={gpsLocation} onChange={(e) => setGpsLocation(e.target.value)} style={inputStyle} />

      <h3 style={headingStyle}>Section III: Professional & Security</h3>
      <label style={labelStyle}>Primary Profession</label>
      <input type="text" required value={profession} onChange={(e) => setProfession(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Secure Email Channel</label>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />

      <label style={labelStyle}>Account Password</label>
      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />

      <button type="submit" disabled={isLoading} style={{ width: "100%", padding: "14px", background: isLoading ? "#93c5fd" : "#2563eb", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer" }}>
        {isLoading ? "Processing..." : "Submit Registration"}
      </button>
    </form>
  );
}
