"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function JobApplicationPage() {
  // 1. DYNAMIC ROUTE INTEGRATION: Safely pulls the job node ID directly from your URL cascade
  const params = useParams();
  const jobId = params?.id ? String(params.id) : "UNKNOWN-JOB-NODE";

  // Form input state trackers
  const [coverLetter, setCoverLetter] = useState("");
  const [candidateExperience, setCandidateExperience] = useState("1-3_YEARS");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [statusText, setStatusText] = useState("Status: Ready to Apply");

  const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusText("Status: Transmitting matchmaking parameters...");

    // Packages candidate parameters securely into a unified tracking object
    const payload = {
      userId: "1", // Hardcoded index fallback until active auth session context is bound
      jobId: jobId,
      coverLetter: coverLetter,
      experienceTier: candidateExperience,
      expectedSalary: expectedSalary
    };

    try {
      // 🔗 DIRECT PATH CONDUIT: Routes application payloads cleanly to your isolated submit folder
      const response = await fetch(`/explore-jobs/${jobId}/apply/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setStatusText("✅ Matchmaking Complete! Profile successfully transmitted to employer dashboard.");
      } else {
        setStatusText(`❌ Transmission Rejected: ${data.error || "Server Rejection"}`);
      }
    } catch (err) {
      setStatusMsg("Status: Network transmission routing timeout");
    }
  };

  return (
    <main style={{
      minHeight: "100vh", backgroundColor: "#0F172A", color: "#F8FAFC",
      padding: "40px 20px", fontFamily: "sans-serif", display: "flex",
      flexDirection: "column", alignItems: "center", justifyContent: "center", boxSizing: "border-box"
    }}>
      
      {/* ⬅️ RETURN TO HOME SAFETY ANCHOR BUTTON */}
      <div style={{ width: "100%", maxWidth: "500px", marginBottom: "14px", textAlign: "left" }}>
        <Link href="/" style={{
          textDecoration: "none", color: "#60A5FA", fontSize: "14px", fontWeight: "600",
          backgroundColor: "#1E293B", padding: "10px 16px", borderRadius: "8px",
          border: "1px solid #334155", display: "inline-flex", alignItems: "center", gap: "6px"
        }}>
          <span>⬅</span> Back to Kika Home
        </Link>
      </div>

      <div style={{
        width: "100%", maxWidth: "500px", backgroundColor: "#0B1528",
        border: "1px solid #1E293B", padding: "28px", borderRadius: "16px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4)", boxSizing: "border-box",
        display: "flex", flexDirection: "column", gap: "16px"
      }}>
        <div style={{ marginBottom: "4px" }}>
          <h2 style={{ fontSize: "21px", fontWeight: "bold", margin: "0 0 4px 0", color: "#FFF" }}>Kika Global Job Hub</h2>
          <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0" }}>
            Applying for active recruitment placement node ID: <span style={{ color: "#60A5FA", fontFamily: "monospace", fontWeight: "bold" }}>{jobId}</span>
          </p>
        </div>

        <div style={{
          backgroundColor: "#020617", border: "1px solid #1E293B", color: "#E2E8F0",
          fontSize: "12px", padding: "10px", borderRadius: "8px", textAlign: "center",
          fontFamily: "monospace", fontWeight: "bold"
        }}>
          {statusText}
        </div>

        <form onSubmit={handleFormSubmission} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Experience Tier Selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1" }}>PROFESSIONAL EXPERIENCE TIER</label>
            <select value={candidateExperience} onChange={(e) => setCandidateExperience(e.target.value)} style={{ width: "100%", backgroundColor: "#020617", border: "1px solid #334155", padding: "10px", borderRadius: "8px", color: "#FFF", outline: "none", cursor: "pointer" }}>
              <option value="ENTRY_LEVEL">Junior / Entry Level (0-1 Years)</option>
              <option value="1-3_YEARS">Intermediate Professional (1-3 Years)</option>
              <option value="MID_SENIOR">Mid-Senior Consultant (3-5 Years)</option>
              <option value="EXECUTIVE">Executive / Director Level (5+ Years)</option>
            </select>
          </div>

          {/* Expected Salary Input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1" }}>EXPECTED MONTHLY SALARY (USD / EQUIVALENT)</label>
            <input type="text" required placeholder="e.g. $2,500" value={expectedSalary} onChange={(e) => setExpectedSalary(e.target.value)} style={{ width: "100%", backgroundColor: "#020617", border: "1px solid #334155", padding: "10px", borderRadius: "8px", color: "#FFF", outline: "none", boxSizing: "border-box", fontFamily: "monospace" }} />
          </div>

          {/* Cover Letter Text Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: "600", color: "#CBD5E1" }}>CANDIDATE COVER LETTER / PROFILE BRIEF</label>
            <textarea
              required
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce your cross-border skills and background parameters to potential recruitment nodes..."
              style={{
                width: "100%", boxSizing: "border-box", backgroundColor: "#020617",
                border: "1px solid #334155", borderRadius: "8px", padding: "12px",
                fontSize: "14px", color: "#F8FAFC", outline: "none", resize: "none"
              }}
            />
          </div>

          {/* Form Action Submit Panel Button */}
          <div style={{ paddingTop: "4px" }}>
            <button
              type="submit"
              style={{
                width: "100%", backgroundColor: "#2563EB", color: "#FFFFFF",
                fontWeight: "bold", padding: "12px", borderRadius: "8px",
                fontSize: "14px", border: "none", cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
              }}
            >
              🔒 Submit Professional Profile Request
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
