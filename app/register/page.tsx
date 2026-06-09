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
      // ✅ This sends user data directly to your newly renamed app/register/route.ts file!
      const res = await fetch("/register", {
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

      // If database reports success, seamlessly slide them to login!
      router.push("/login");
    } catch (err) {
      setError("Unable to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#f1f5f9" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", padding: "40px", borderRadius: "16px", width: "100%", maxWidth: "400px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#0f172a", margin: "0 0 20px 0", fontFamily: "Arial, sans-serif" }}>Create KIKA Account</h2>
        
        {error && <p style={{ color: "#b91c1c", background: "#fef2f2", padding: "10px", borderRadius: "6px", fontSize: "14px" }}>{error}</p>}
        
        <input 
          type="text" 
          placeholder="Full Name" 
          required 
          onChange={e => setForm({...form, name: e.target.value})} 
          style={{ width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required 
          onChange={e => setForm({...form, email: e.target.value})} 
          style={{ width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required 
          onChange={e => setForm({...form, password: e.target.value})} 
          style={{ width: "100%", padding: "12px", margin: "8px 0", borderRadius: "8px", border: "1px solid #cbd5e1" }} 
        />
        
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: "#2563eb", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          {loading ? "Registering profile..." : "Sign Up"}
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#475569", fontFamily: "Arial" }}>
          Already have an account? <Link href="/login" style={{ color: "#2563eb", fontWeight: "bold" }}>Sign In</Link>
        </p>
      </form>
    </div>
  );
}
