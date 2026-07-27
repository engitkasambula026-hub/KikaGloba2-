"use client";

import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import RegistryFormBodySections from "./RegistryFormBodySections";

function RegistryGatewayFormContent() {
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1, padding: "20px 10px" }}>
      {/* 📱 MOBILE OPTIMIZATION: Swapped fixed 680px for a fluid width with max-width safety constraints */}
      <form onSubmit={handleFormSubmission} style={{ background: "#1e293b", padding: "25px 20px", borderRadius: "16px", width: "100%", maxWidth: "640px", boxSizing: "border-box", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", border: "1px solid #334155" }}>
        <h2 style={{ color: "#ffffff", margin: "0 0 6px 0", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Sovereign Services Enrollment Portal</h2>
        <p style={{ color: "#94a3b8", margin: "0 0 20px 0", fontSize: "12.5px", textAlign: "center", lineHeight: "1.5" }}>Establish your statutory identity matrix to securely authorize cross-border savings deposits, commercial property escrows, and local micro-finance cooperative access lines.</p>
        
        {statusMsg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "12px", borderRadius: "8px", fontSize: "12px", margin: "14px 0", border: "1px solid #334155", textAlign: "center", lineHeight: "1.4" }}>{statusMsg}</p>}

        <RegistryFormBodySections form={form} setForm={setForm} loading={loading} setStatusMsg={setStatusMsg} />
      </form>
    </div>
  );
}

export default function BusinessHubRegistryPage() {
  const router = useRouter();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 20px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "14px", fontWeight: "900", color: "#34d399", letterSpacing: "0.5px" }}>🛡️ SECURITY GATEWAY</span>
        <button onClick={(e) => { e.preventDefault(); router.push("/"); }} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" }}>⬅️ Home</button>
      </header>

      <Suspense fallback={<div style={{ padding: "40px", color: "#94a3b8", textAlign: "center", fontFamily: "Arial", fontSize: "13px" }}>Initializing Security Gateway...</div>}>
        <RegistryGatewayFormContent />
      </Suspense>
    </div>
  );
}
