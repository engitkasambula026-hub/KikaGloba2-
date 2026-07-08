// app/login/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🟢 FIXED: Submits straight to your actual api route handler
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credential synchronization matrix.");
        setLoading(false);
        return;
      }

      // Preserve session context across the global ecosystem layout
      if (typeof window !== "undefined" && data.session) {
        localStorage.setItem("kika_session", JSON.stringify(data.session));
      }

      // Route the authenticated user straight into their central platform view dashboard
      router.push("/dashboard");
    } catch (err) {
      setError("Communication timeout: Unable to link to ecosystem authentication nodes.");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formCardStyle}>
        <h2 style={{ margin: "0 0 10px 0", color: "#0f172a", fontFamily: "Arial, sans-serif" }}>Portal Identification Entry</h2>
        <p style={{ color: "#64748b", margin: "0 0 20px 0", fontSize: "14px", fontFamily: "Arial, sans-serif" }}>Access your cross-border diaspora wallet and services.</p>
        
        {error && <p style={errorStyle}>{error}</p>}

        <label style={labelStyle}>Global Email Address</label>
        <input 
          type="email" 
          placeholder="yourname@domain.com" 
          required 
          onChange={e => setForm({...form, email: e.target.value})} 
          style={inputStyle} 
        />

        <label style={labelStyle}>Secure Account Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          required 
          onChange={e => setForm({...form, password: e.target.value})} 
          style={inputStyle} 
        />

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Decrypting Node Permissions..." : "Authorize Security Entry"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#475569", fontFamily: "Arial, sans-serif" }}>
          Unregistered Diaspora Profile? <Link href="/register" style={{ color: "#2563eb", fontWeight: "bold", textDecoration: "none" }}>Join Registry</Link>
        </p>
      </form>
    </div>
  );
}

// Visual Layout Styles Definitions
const containerStyle = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f1f5f9" };
const formCardStyle = { background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: "bold", color: "#334155", marginTop: "16px", marginBottom: "4px", fontFamily: "Arial, sans-serif" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", boxSizing: "border-box" as const, outlineColor: "#2563eb" };
const btnStyle = { width: "100%", padding: "14px", background: "#0f172a", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "15px", marginTop: "24px", transition: "background 0.2s" };
const errorStyle = { background: "#fef2f2", color: "#b91c1c", padding: "10px", borderRadius: "6px", border: "1px solid #fee2e2", fontSize: "13px", margin: "10px 0", fontFamily: "Arial, sans-serif" };
