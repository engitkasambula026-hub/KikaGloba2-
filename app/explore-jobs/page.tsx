"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  sourceProvider: "INDEED" | "MONSTER" | "KIKA_INTERNAL";
  externalLink: string;
}

export default function JobMatchmakerPage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const globalJobsLedger: JobPost[] = [
    { id: "JOB-01", title: "Cloud Security Solutions Architect", company: "Scania Group", location: "Stockholm, Sweden", salaryRange: "$85,000 - $110,000", sourceProvider: "MONSTER", externalLink: "https://monster.se" },
    { id: "JOB-02", title: "Agro-Processing Systems Engineer", company: "Kika Agro-Logistics", location: "Kampala, Uganda", salaryRange: "UGX 4,500,000/mo", sourceProvider: "KIKA_INTERNAL", externalLink: "#local" },
    { id: "JOB-03", title: "Renewable Energy Grid Consultant", company: "Vattenfall", location: "Gothenburg, Sweden", salaryRange: "€70,000 - €90,000", sourceProvider: "INDEED", externalLink: "https://indeed.com" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🌍 INTERNATIONAL JOB MATCHMAKER ENGINE</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>⬅️ Return to Main Page</button>
      </header>

      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "40px 20px", flex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "#ffffff", fontSize: "32px", fontWeight: "800" }}>Global Employment Matchmaker</h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "650px", margin: "8px auto 0 auto", lineHeight: "1.5" }}>Connecting diaspora talent nodes directly with active corporate vacancies. Access internally whitelisted positions or search aggregated external pipelines.</p>
        </div>

        <input type="text" placeholder="🔍 Search by job title, core skillset keyword, or hosting country location..." onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "14px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "15px", outline: "none", marginBottom: "30px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {globalJobsLedger.filter(j => j.title.toLowerCase().includes(search.toLowerCase()) || j.location.toLowerCase().includes(search.toLowerCase())).map((job) => (
            <div key={job.id} style={{ background: "#1e293b", borderRadius: "12px", border: "1px solid #334155", padding: "24px", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "#34d399", background: "rgba(52, 211, 153, 0.08)", padding: "4px 8px", borderRadius: "4px" }}>{job.sourceProvider} ENGINE</span>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>ID: {job.id}</span>
              </div>
              <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 6px 0" }}>{job.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0 0 12px 0" }}>🏢 {job.company} | 📍 {job.location}</p>
              <div style={{ background: "#0f172a", padding: "10px 14px", borderRadius: "6px", color: "#ffffff", fontWeight: "bold", fontSize: "13px", marginBottom: "20px" }}>💰 Comp Rate: {job.salaryRange}</div>
              
              {job.sourceProvider === "KIKA_INTERNAL" ? (
                <button onClick={() => router.push(`/explore-jobs/${job.id}/apply`)} style={{ width: "100%", padding: "12px", background: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", marginTop: "auto" }}>🚀 Apply on Kika Ecosystem</button>
              ) : (
                <a href={job.externalLink} target="_blank" rel="noopener noreferrer" style={{ width: "100%", padding: "12px", background: "transparent", border: "1px solid #94a3b8", color: "#94a3b8", borderRadius: "6px", fontWeight: "bold", textDecoration: "none", textAlign: "center", fontSize: "14px", marginTop: "auto", display: "block" }}>🔗 Cross-Route to {job.sourceProvider}</a>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
