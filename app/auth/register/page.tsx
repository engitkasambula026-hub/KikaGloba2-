"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      // If successful, push them straight to log in!
      router.push("/login");
    } catch (err) {
      setError("Unable to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formCardStyle}>
        <h2 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>Create KIKA Account</h2>
        <p style={{ color: "#64748b", margin: "0 0 20px 0", fontSize: "14px" }}>Join our diaspora global gateway.</p>
        
        {error && <p style={errorStyle}>{error}</p>}

        <label style={labelStyle}>Full Name</label>
        <input 
          type="text" 
          placeholder="John Doe" 
          required 
          onChange={e => setForm({...form, name: e.target.value})} 
          style={inputStyle} 
        />

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

        <button type="submit" disabled={loading} style={btnStyle}>
          {loading ? "Registering account..." : "Sign Up"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#475569" }}>
          Already have an account? <Link href="/login" style={{ color: "#2563eb", fontWeight: "bold" }}>Sign In</Link>
        </p>
      </form>
    </div>
  );
}

// Visual Layout Styles Definitions
const containerStyle = { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f1f5f9" };
const formCardStyle = { background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)", width: "100%", maxWidth: "400px" };
const labelStyle = { display: "block", fontSize: "14px", fontWeight: "bold", color: "#334155", marginTop: "12px", marginBottom: "4px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "15px", boxSizing: "border-box" as const };
const btnStyle = { width: "100%", padding: "14px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "16px", marginTop: "20px", transition: "background 0.2s" };
const errorStyle = { background: "#fef2f2", color: "#b91c1c", padding: "10px", borderRadius: "6px", border: "1px solid #fee2e2", fontSize: "14px", margin: "10px 0" };
