"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function SearchJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Simulated placeholder database entries for registered vacancies
  const mockJobs = [
    { id: 1, title: "Remote DevOps Infrastructure Engineer", company: "KIKA Eco-Tech Hub", location: "Global / Remote" },
    { id: 2, title: "Data Integration Analyst", company: "Continental Registry Corp", location: "New York / Hybrid" }
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "40px 20px", color: "#1e293b", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold", display: "inline-block", marginBottom: "20px" }}>← Back to Global Homepage</Link>
        <h1 style={{ fontSize: "32px", color: "#0f172a", marginBottom: "10px" }}>🔍 Search Global Openings</h1>
        <p style={{ color: "#64748b", marginBottom: "30px" }}>Connecting registered talent arrays to verified local and international vacancies.</p>
        
        <input 
          type="text" 
          placeholder="Filter by mechanical, scientific, or digital skills..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "16px", marginBottom: "30px", boxSizing: "border-box" }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {mockJobs.map(job => (
            <div key={job.id} style={{ backgroundColor: "#ffffff", padding: "25px", borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#0f172a" }}>{job.title}</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>🏢 {job.company} • 📍 {job.location}</p>
              <button onClick={() => alert(`Initiating pipeline application for Job ID: ${job.id}`)} style={{ marginTop: "15px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}>Apply via KIKA Pass</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
