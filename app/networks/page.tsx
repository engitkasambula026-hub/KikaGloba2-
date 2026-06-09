"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface MemberCard {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  postalCode: string;
  fullAddress: string;
  sector: string;
  businessName?: string;
}

export default function NetworksPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    postalCode: "",
    fullAddress: "",
    sector: "Technology",
    businessName: "",
  });
  const [members, setMembers] = useState<MemberCard[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Synchronize data lists directly from our backend SQLite route handler
  const fetchRegistryListings = () => {
    fetch("/api/networks")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setMembers(data.members || []);
      })
      .catch(() => console.log("Directory data synchronization offline."));
  };

  useEffect(() => {
    const savedUserSession = localStorage.getItem("kika_user");
    if (savedUserSession) {
      const parsed = JSON.parse(savedUserSession);
      setUserId(parsed.id);
      setForm((prev) => ({
        ...prev,
        fullName: parsed.name || "",
        email: parsed.email || "",
      }));
    }
    fetchRegistryListings();
  }, []);

  const handleJoinNetwork = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/networks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit registry details.");
        setLoading(false);
        return;
      }

      setMessage(data.message);
      setLoading(false);
      fetchRegistryListings();
      setForm({
        fullName: form.fullName,
        email: form.email,
        phone: "",
        country: "",
        city: "",
        postalCode: "",
        fullAddress: "",
        sector: "Technology",
        businessName: "",
      });
    } catch (err) {
      setError("Network sync bottleneck encountered.");
      setLoading(false);
    }
  };

  // Google Maps Dynamic Link Verification Parameter Compilation
  const mapsSearchQuery =
    form.fullAddress && form.city && form.country
      ? encodeURIComponent(`${form.fullAddress}, ${form.city}, ${form.country}`)
      : "";

  return (
    <main style={{ padding: "50px 30px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Navigation Return Arrow */}
      <div style={{ maxWidth: "1000px", margin: "0 auto 20px auto" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>
          ← Back to KIKA Homepage
        </Link>
      </div>

      {/* Main Container Core Registry Grid Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px", maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* LEFT COLUMN: REGISTRATION INPUT FORM */}
        <div style={{ background: "white", padding: "40px", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
          <h1 style={{ color: "#0f172a", fontSize: "28px", margin: "0 0 8px 0" }}>Verified Diaspora Registry</h1>
          <p style={{ color: "#64748b", margin: "0 0 25px 0", fontSize: "14px", lineHeight: 1.5 }}>
            Provide standardized contact information and physical maps parameters to connect your operations to cooperative business ecosystems.
          </p>

          {message && <p style={{ background: "#f0fdf4", color: "#15803d", padding: "12px", borderRadius: "8px", border: "1px solid #bbf7d0", fontWeight: "bold" }}>✅ {message}</p>}
          {error && <p style={{ background: "#fef2f2", color: "#b91c1c", padding: "12px", borderRadius: "8px", border: "1px solid #fee2e2" }}>❌ {error}</p>}

          <form onSubmit={handleJoinNetwork}>
            <h3 style={sectionHeadingStyle}>🏢 Identity & Sector</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Full Name / Contact</label>
                <input type="text" value={form.fullName} required onChange={(e) => setForm({ ...form, fullName: e.target.value })} style={inputStyle} placeholder="John Doe" />
              </div>
              <div>
                <label style={labelStyle}>Business / Entity Name</label>
                <input type="text" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} style={inputStyle} placeholder="e.g. KIKA Smart Services" />
              </div>
            </div>

            <label style={labelStyle}>Industry Sector Ecosystem</label>
            <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} style={inputStyle}>
              <option value="Technology">Technology & Digital Access</option>
              <option value="Cooperative Finance">Cooperative Savings & Remittance</option>
              <option value="Healthcare">Healthcare & Nursing Hubs</option>
              <option value="Logistics">Cross-Border Logistics & Trade</option>
              <option value="Outsourcing">Call Center & Business Support</option>
            </select>

            <h3 style={sectionHeadingStyle}>📞 Standard Contact Protocols</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Contact Email</label>
                <input type="email" value={form.email} required onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="name@domain.com" />
              </div>
              <div>
                <label style={labelStyle}>Telephone (Int'l Format)</label>
                <input type="tel" value={form.phone} required onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} placeholder="e.g. +44 20 7946 0192" />
              </div>
            </div>

            <h3 style={sectionHeadingStyle}>📍 Physical Location Standard</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={labelStyle}>Country</label>
                <input type="text" value={form.country} required onChange={(e) => setForm({ ...form, country: e.target.value })} style={inputStyle} placeholder="United Kingdom" />
              </div>
              <div>
                <label style={labelStyle}>City</label>
                <input type="text" value={form.city} required onChange={(e) => setForm({ ...form, city: e.target.value })} style={inputStyle} placeholder="London" />
              </div>
              <div>
                <label style={labelStyle}>Postal Code</label>
                <input type="text" value={form.postalCode} required onChange={(e) => setForm({ ...form, postalCode: e.target.value })} style={inputStyle} placeholder="E1 6AN" />
              </div>
            </div>

            <label style={labelStyle}>Street Address</label>
            <input type="text" value={form.fullAddress} required onChange={(e) => setForm({ ...form, fullAddress: e.target.value })} style={inputStyle} placeholder="Commercial Street 120" />

            {/* Live Verification Map Bridge Anchor Link */}
            {mapsSearchQuery && (
              <a href={`https://google.com{mapsSearchQuery}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "#2563eb", textDecoration: "none", fontSize: "14px", margin: "5px 0 15px 0", fontWeight: "bold" }}>
                🌐 Click to Verify Coordinates via Google Maps
              </a>
            )}

            <button type="submit" disabled={loading} style={btnStyle}>
              {loading ? "Synchronizing parameters..." : "Register Entity to Hub Network"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: ACTIVE VERIFIED PLATFORM LISTINGS DISPLAY FEED */}
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#0f172a", fontSize: "22px", marginBottom: "15px" }}>Registered Hub Ecosystem Network Profiles</h2>
          {members.length === 0 ? (
            <p style={{ color: "#64748b", background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>No registry listings published yet.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
              {members.map((member) => (
                <div key={member.id} style={{ background: "white", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <span style={{ fontSize: "12px", background: "#f1f5f9", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold", color: "#475569" }}>{member.sector}</span>
                  <h4 style={{ margin: "10px 0 4px 0", fontSize: "18px", color: "#0f172a" }}>{member.businessName || member.fullName}</h4>
                  <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#64748b" }}>Contact: {member.fullName}</p>
                  <div style={{ fontSize: "14px", borderTop: "1px solid #f1f5f9", paddingTop: "10px", color: "#334155" }}>
                    <div>📧 {member.email}</div>
                    <div>📞 {member.phone}</div>
                    <div style={{ marginTop: "5px", color: "#64748b", fontSize: "13px" }}>📍 {member.fullAddress}, {member.city}, {member.country}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

// Styling Definition Objects
const sectionHeadingStyle = { fontSize: "13px", color: "#0f172a", borderBottom: "1px solid #e2e8f0", paddingBottom: "4px", marginTop: "20px", marginBottom: "10px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
const labelStyle = { display: "block", fontSize: "12px", fontWeight: "bold", color: "#475569", marginBottom: "3px" };
const inputStyle = { width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" as const, marginBottom: "10px", background: "#ffffff" };
const btnStyle = { width: "100%", padding: "12px", background: "#0f172a", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" as const, fontSize: "15px", marginTop: "10px" };
