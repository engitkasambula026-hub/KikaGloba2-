"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface JobObject {
  id: number;
  title: string;
  country?: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const savedUserSession = localStorage.getItem("kika_user");
    if (savedUserSession) {
      setUserId(JSON.parse(savedUserSession).id);
    }

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs && data.jobs.length > 0) {
          setJobs(data.jobs);
        } else {
          setJobs([
            { id: 1, title: "Software Engineer", country: "Canada" },
            { id: 2, title: "Registered Nurse", country: "United Kingdom" },
            { id: 3, title: "Construction Worker", country: "UAE" }
          ]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleApplyClick = async (jobTitle: string) => {
    if (!userId) {
      alert("Please sign in or register an account to record your application interest!");
      return;
    }

    try {
      await fetch("/api/track/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: `Applied for: ${jobTitle}` }),
      });
      alert(`Success! Your interest in "${jobTitle}" has been synchronized to your Dashboard stream.`);
    } catch (err) {
      alert("Synchronization delayed due to network communications.");
    }
  };

  return (
    <main style={{ padding: "50px 30px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto 20px auto" }}>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: "bold" }}>
          ← Back to KIKA Homepage
        </Link>
      </div>

      <h1 style={{ fontSize: "42px", marginBottom: "40px", textAlign: "center", color: "#0f172a" }}>
        Global Job Opportunities
      </h1>

      {loading ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>Synchronizing opportunities map...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "25px", maxWidth: "1100px", margin: "0 auto" }}>
          {jobs.map((job, index) => (
            <div key={job.id || index} style={{ background: "white", padding: "25px", borderRadius: "18px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}>
              <h2 style={{ color: "#2563eb", marginBottom: "10px" }}>{job.title}</h2>
              <p style={{ color: "#475569", marginBottom: "20px" }}>Location: {job.country || "International hub"}</p>
              <button onClick={() => handleApplyClick(job.title)} style={{ background: "#2563eb", color: "white", border: "none", padding: "12px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" }}>
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
