"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the rule blueprint matrix for dynamic crop criteria switching
interface ComplianceRule {
  tier1A: string;
  tier1B: string;
  tier2A: string;
  tier2B: string;
  tier3A: string;
  tier3B: string;
}

export default function SupplyChainCompliancePage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [formMsg, setFormMessage] = useState<string>("");

  // 📋 Core Questionnaire State Elements
  const [batchId, setBatchId] = useState<string>("");
  const [productName, setProductName] = useState<string>("Premium Organic Vanilla Yield Nodes");
  const [collectionCenter, setCollectionCenter] = useState<string>("Kasese Central Hub");
  const [productClass, setProductClass] = useState<string>("Grade AAA (Export Premium)");
  
  // 🗹 Active UI Checkbox Binds
  const [moistureCheck, setMoistureCheck] = useState<boolean>(false);
  const [moldCheck, setMoldCheck] = useState<boolean>(false);
  const [traceCheck, setTraceCheck] = useState<boolean>(false);
  const [storageCheck, setStorageCheck] = useState<boolean>(false);
  const [customsCheck, setCustomsCheck] = useState<boolean>(false);
  const [bolCheck, setBolCheck] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");

  // 🤖 CROP-AWARE REGULATORY RULE DICTIONARY
  const cropRuleMatrix: { [key: string]: ComplianceRule } = {
    "Premium Organic Vanilla Yield Nodes": {
      tier1A: "Tier 1: Blanket Curing Pass & Aroma Check",
      tier1B: "Tier 1: Pods Length Verified (>15cm Premium)",
      tier2A: "Tier 2: Source Farm Ingestion Traceability Logged",
      tier2B: "Tier 2: Vanilla Wooden conditioning Rack Storage Verified",
      tier3A: "Tier 3: Phyto-Sanitary Export Permit Certified",
      tier3B: "Tier 3: Entebbe Air-Freight Bill of Lading Signed"
    },
    "AAA Grade Drugar Arabica Coffee Blocks": {
      tier1A: "Tier 1: Safe Moisture Scale Confirmed (<12%)",
      tier1B: "Tier 1: AAA Grade Screen 17/18 Flotation Sort Pass",
      tier2A: "Tier 2: Smallholder Cooperative Registry Node Verified",
      tier2B: "Tier 2: Wet-Milling Dry Parchment Hulling Certification",
      tier3A: "Tier 3: Uganda Coffee Development Authority (UCDA) Clearance",
      tier3B: "Tier 3: Mombasa Sea Freight Cargo Bill of Lading Signed"
    },
    "Artisanal Gold Refining Allocation Units": {
      tier1A: "Tier 1: Assay Office Carat Fineness Purity Test Passed",
      tier1B: "Tier 1: Fire Assay Smelting Density Verification Complete",
      tier2A: "Tier 2: OECD Conflict-Free Sourcing Compliance Documented",
      tier2B: "Tier 2: High-Security Insured Vault Receipt Registered",
      tier3A: "Tier 3: Ministry of Energy & Mineral Development Export License",
      tier3B: "Tier 3: Cryptographic Bullion Custody Ledger Sign-Off"
    },
    "Hass Avocado Volcanic Soil Plantations": {
      tier1A: "Tier 1: Oil Content Analysis Complete (Min 12%)",
      tier1B: "Tier 1: Optical Sorting & Uniform Calibration Pass",
      tier2A: "Tier 2: Cold-Chain Traceability Trace Logs Synchronized",
      tier2B: "Tier 2: Refrigerated Reefer Storage Vault Engaged (5°C)",
      tier3A: "Tier 3: Kenya/Uganda Boundary Port Authority Transit Pass",
      tier3B: "Tier 3: Controlled Atmosphere Ocean Bill of Lading Signed"
    }
  };

  // Recover current rule set based on user's active dropdown selection item
  const currentRules = cropRuleMatrix[productName] || cropRuleMatrix["Premium Organic Vanilla Yield Nodes"];

    useEffect(() => {
    const hasActiveSession = document.cookie.includes("kika_session_active=true");
    setIsLoggedIn(hasActiveSession);

    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    if (emailCookie && emailCookie.includes("=")) {
      // 🟢 FIXED: Extracted the exact array string index [1] to satisfy type safety parameters
      setUserEmail(decodeURIComponent(emailCookie.split("=")[1]));
    } else {
      setUserEmail("audit02@kikaglobal.com");
    }
  }, []);

  
    const handleComplianceSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchId) {
      alert("❌ Operational Input Error: Batch Registry ID required.");
      return;
    }

    setFormMessage("⏳ Committing dynamic compliance parameters to cloud ledger...");

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SUBMIT_SUPPLY_CHAIN_COMPLIANCE",
          email: userEmail,
          batchId, productName, collectionCenter, productClass,
          moistureCheck, moldCheck, traceCheck, storageCheck, customsCheck, bolCheck, notes
        })
      });

      const data = await res.json();
      if (res.ok) {
        setFormMessage(`✅ Success! Batch ${batchId} certified cleanly onto Neon SQL.`);
        alert(`🎉 Verified! Batch ${batchId} meets full international regulatory compliance benchmarks.`);
        setBatchId("");
        setNotes("");
        setMoistureCheck(false);
        setMoldCheck(false);
        setTraceCheck(false);
        setStorageCheck(false);
        setCustomsCheck(false);
        setBolCheck(false);
      } else {
        setFormMessage(`❌ Intake Drop: ${data.error}`);
      }
    } catch (err: any) {
      setFormMessage(`🚧 Corridor Link Failure: ${err.message}`);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER NAVBAR CONTAINER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "16px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🏗️ 3-TIER OPERATIONAL LOGISTICS PORTAL</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold", outline: "none" }}>⬅️ Home Base</button>
      </header>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>Supply Chain Quality & Grade Audit</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>Onboard local co-op crops into international markets by validating milestones down our structural blockchain network ledger [1.5].</p>
        </div>

        {/* FEEDBACK PROMPT CONTAINER */}
        {formMsg && (
          <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#020617", border: "1px solid #34d399", borderRadius: "6px", color: "#34d399", textAlign: "center", fontFamily: "monospace", fontSize: "12.5px", fontWeight: "bold" }}>{formMsg}</div>
        )}

        <form onSubmit={handleComplianceSubmission} style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "12px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* SECTION 1: CORE COOP FIELD ASSIGNMENTS */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Unique Tracking Batch ID Code</label>
              <input required type="text" value={batchId} onChange={(e) => setBatchId(e.target.value)} placeholder="e.g. KIKA-COF-2026-09" style={{ width: "100%", padding: "10px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Select Resource Commodity Token</label>
              <select value={productName} onChange={(e) => { setProductName(e.target.value); }} style={{ width: "100%", padding: "10px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                <option value="Premium Organic Vanilla Yield Nodes">Premium Organic Vanilla Yield Nodes</option>
                <option value="AAA Grade Drugar Arabica Coffee Blocks">AAA Grade Drugar Arabica Coffee Blocks</option>
                <option value="Artisanal Gold Refining Allocation Units">Artisanal Gold Refining Allocation Units</option>
                <option value="Hass Avocado Volcanic Soil Plantations">Hass Avocado Volcanic Soil Plantations</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Regional Collection Center / District</label>
              <input required type="text" value={collectionCenter} onChange={(e) => setCollectionCenter(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Inspected Quality Class Grade</label>
              <input required type="text" value={productClass} onChange={(e) => setProductClass(e.target.value)} style={{ width: "100%", padding: "10px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
            </div>
          </div>

          {/* SECTION 2: 🌊 DYNAMIC RECALCULATING MULTI-CHECK REGULATORY PARAMETERS */}
          <div style={{ borderTop: "1px solid #334155", paddingTop: "16px" }}>
            <h3 style={{ fontSize: "14px", color: "#34d399", fontWeight: "bold", marginBottom: "4px" }}>📋 Specialized Regulatory Parameters Matrix</h3>
            <p style={{ color: "#94a3b8", fontSize: "11px", margin: "0 0 14px 0" }}>Rules dynamically re-bind instantly to match international compliance tracks for the chosen commodity [1.5].</p>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {/* TIER 1 Checkboxes */}
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", cursor: "pointer", color: "#cbd5e1" }}>
                <input type="checkbox" checked={moistureCheck} onChange={(e) => setMoistureCheck(e.target.checked)} style={{ transform: "scale(1.2)", cursor: "pointer" }} />
                <span>{currentRules.tier1A}</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", cursor: "pointer", color: "#cbd5e1" }}>
                <input type="checkbox" checked={moldCheck} onChange={(e) => setMoldCheck(e.target.checked)} style={{ transform: "scale(1.2)", cursor: "pointer" }} />
                <span>{currentRules.tier1B}</span>
              </label>

              {/* TIER 2 Checkboxes */}
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", cursor: "pointer", color: "#cbd5e1" }}>
                <input type="checkbox" checked={traceCheck} onChange={(e) => setTraceCheck(e.target.checked)} style={{ transform: "scale(1.2)", cursor: "pointer" }} />
                <span>{currentRules.tier2A}</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", cursor: "pointer", color: "#cbd5e1" }}>
                <input type="checkbox" checked={storageCheck} onChange={(e) => setStorageCheck(e.target.checked)} style={{ transform: "scale(1.2)", cursor: "pointer" }} />
                <span>{currentRules.tier2B}</span>
              </label>

              {/* TIER 3 Checkboxes */}
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", cursor: "pointer", color: "#cbd5e1" }}>
                <input type="checkbox" checked={customsCheck} onChange={(e) => setCustomsCheck(e.target.checked)} style={{ transform: "scale(1.2)", cursor: "pointer" }} />
                <span>{currentRules.tier3A}</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", cursor: "pointer", color: "#cbd5e1" }}>
                <input type="checkbox" checked={bolCheck} onChange={(e) => setBolCheck(e.target.checked)} style={{ transform: "scale(1.2)", cursor: "pointer" }} />
                <span>{currentRules.tier3B}</span>
              </label>
            </div>
          </div>

          {/* SECTION 3: MANIFEST NOTES ELEMENT */}
          <div style={{ borderTop: "1px solid #334155", paddingTop: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Additional Compliance Manifest Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Add shipment routing or tracking context metrics..." style={{ width: "100%", padding: "10px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none", resize: "none" }}></textarea>
          </div>


  <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.5px", outline: "none" }}>Commit Batch Certification Manifest</button>

        </form>
      </div>
    </div>
  ); //  parent layout block wrapped correctly
}    // main SupplyChainCompliancePage function block closed safely
