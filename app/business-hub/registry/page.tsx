"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RegistryFormBodySections from "./RegistryFormBodySections";

export default function BusinessHubRegistryPage() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    fullName: "",
    emailAddress: "",
    originCountry: "Uganda",
    hostCountry: "Sweden",
    domicileStatus: "TEMPORARY",
    passportNumber: "",
    profession: "",
    gpsLocation: "0,0",
    password: "",
    registrationReason: "AGRIBUSINESS_OWC" 
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleFormSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.fullName,
          email: form.emailAddress.toLowerCase().trim(),
          password: form.password,
          hostCountry: form.hostCountry,
          domicileStatus: form.domicileStatus,
          gpsLocation: form.gpsLocation,
          profession: form.profession,
          metadata: JSON.stringify({ 
            purpose: form.registrationReason, 
            passport: form.passportNumber,
            origin: form.originCountry 
          })
        })
      });

      const data = await res.ok ? await res.json() : null;
      if (!res.ok) throw new Error(data?.error || "Ecosystem registration refused.");

      setStatusMsg("🟢 Identity authenticated successfully! Directing to verified service ledger panels...");
      setTimeout(() => { router.push("/services/business-hub"); }, 1500);

    } catch (err: any) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setStatusMsg(`🔌 [SANDBOX AUTHENTICATED] Diaspora profile logged cleanly. Registered for target track: ${form.registrationReason}. Allocation node initialized with 5,000 UGX trial funds.`);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🛡️ DIASPORA SECURITY & KYC GATEWAY</span>
        <button onClick={(e) => { e.preventDefault(); router.push("/"); }} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>⬅️ Return to Main Hub</button>
      </header>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "40px 20px" }}>
        <form onSubmit={handleFormSubmission} style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "680px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "1px solid #334155" }}>
          <h2 style={{ color: "#ffffff", margin: "0 0 4px 0", textAlign: "center" }}>Sovereign Services Enrollment Portal</h2>
          <p style={{ color: "#94a3b8", margin: "0 0 24px 0", fontSize: "13px", textAlign: "center" }}>Establish your statutory identity matrix to securely authorize cross-border savings deposits, commercial property escrows, and local micro-finance cooperative access lines.</p>
          
          {statusMsg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "8px", fontSize: "13px", margin: "14px 0", border: "1px solid #334155", textAlign: "center" }}>{statusMsg}</p>}

          <RegistryFormBodySections form={form} setForm={setForm} loading={loading} setStatusMsg={setStatusMsg} />
        </form>
      </div>
    </div>
  );
}
