"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid sign-in combination.");
        setLoading(false);
        return;
      }

      // SUCCESS: Save user metadata locally to maintain dashboard states
      localStorage.setItem("kika_user", JSON.stringify(data.user));
      
      // Redirect straight onto the personal Dashboard stream page!
      router.push("/dashboard");
    } catch (err) {
      setError("Server communications failed.");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formCardStyle}>
        <h2 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>Welcome Back</h2>
        <p style={{ color: "#64748b", margin: "0 0 20px 0", fontSize: "14px" }}>Sign in to look through your activities.</p>

        {error && <p style={errorStyle}>{error}</p>}

        <label style={labelStyle}>Email Address</label>
        <input 
          type="email" 
          placeholder="yourname@domain.com" 
          required 
          onChange={e => setForm({...form, email: e.target.value})} 
          style={inputStyle} 
        />

        <label style={labelStyle}>Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          required 
          onChange={e => setForm({...form, password: e.target.value})} 
          style={inputStyle} 
        />

        <button type="submit" disabled={loading} style={{ ...btnStyle, background: "#16a34a" }}>
          {loading ? "Authenticating profile..." : "Sign In"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#475569" }}>
          New to the outreach? <Link href="/register" style={{ color: "#2563eb", fontWeight: "bold" }}>Create Account</Link>
        </p>
      </form>
    </div>
  );
}

// Styling mapping constants automatically pull attributes declared on step 1 mapping.
const containerStyle = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f1f5f9" };
const formCardStyle = { background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" };
const labelStyle = { display: "block", fontSize: "14px", fontWeight: "bold", color: "#334155", marginTop: "12px", marginBottom: "4px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", boxSizing: "border-box" as const };
const btnStyle = { width: "100%", padding: "14px", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "16px", marginTop: "20px" };
const errorStyle = { background: "#fef2f2", color: "#b91c1c", padding: "10px", borderRadius: "6px", border: "1px solid #fee2e2", fontSize: "14px", margin: "10px 0" };
