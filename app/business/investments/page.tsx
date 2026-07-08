"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Comprehensive cross-border commodity ledger definitions
interface CommodityStock {
  id: string;
  name: string;
  category: "AGRICULTURE" | "MINERALS" | "HORTICULTURE" | "OIL_GAS";
  countryOfOrigin: string;
  producingDistrict: string;
  unitPriceUSD: number;
  minimumInvestmentUSD: number;
  projectedAnnualYield: string;
  availableVolumeFraction: string;
  riskRating: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN_FOR_INVESTMENT" | "FULLY_FUNDED" | "HARVESTING";
}

export default function CommodityShowcasePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCountry, setSelectedCountry] = useState("ALL");

  // 🌟 STATIC DATA MATRIX: Inbound National Resources Portfolio
  const commodityLedger: CommodityStock[] = [
    {
      id: "COM-UG-VAN-01",
      name: "Premium Organic Vanilla Yield Nodes",
      category: "AGRICULTURE",
      countryOfOrigin: "Uganda",
      producingDistrict: "Kasese & Mukono",
      unitPriceUSD: 250,
      minimumInvestmentUSD: 1000,
      projectedAnnualYield: "14.2% ROI",
      availableVolumeFraction: "42% Shares Remaining",
      riskRating: "MEDIUM",
      status: "OPEN_FOR_INVESTMENT"
    },
    {
      id: "COM-UG-COF-02",
      name: "AAA Grade Drugar Arabica Coffee Blocks",
      category: "AGRICULTURE",
      countryOfOrigin: "Uganda",
      producingDistrict: "Mount Elgon Region (Mbale)",
      unitPriceUSD: 150,
      minimumInvestmentUSD: 750,
      projectedAnnualYield: "11.8% ROI",
      availableVolumeFraction: "18% Shares Remaining",
      riskRating: "LOW",
      status: "OPEN_FOR_INVESTMENT"
    },
    {
      id: "COM-TZ-GLD-03",
      name: "Artisanal Gold Refining Allocation Units",
      category: "MINERALS",
      countryOfOrigin: "Tanzania",
      producingDistrict: "Geita Gold Mining Zone",
      unitPriceUSD: 1200,
      minimumInvestmentUSD: 4800,
      projectedAnnualYield: "19.5% ROI",
      availableVolumeFraction: "65% Shares Remaining",
      riskRating: "HIGH",
      status: "OPEN_FOR_INVESTMENT"
    },
    {
      id: "COM-UG-OIL-04",
      name: "Albertine Graben Crude Storage Portfolios",
      category: "OIL_GAS",
      countryOfOrigin: "Uganda",
      producingDistrict: "Hoima Oil Basin",
      unitPriceUSD: 500,
      minimumInvestmentUSD: 2500,
      projectedAnnualYield: "15.7% ROI",
      availableVolumeFraction: "0% Sold Out",
      riskRating: "MEDIUM",
      status: "FULLY_FUNDED"
    },
    {
      id: "COM-KE-AVO-05",
      name: "Hass Avocado Volcanic Soil Plantations",
      category: "HORTICULTURE",
      countryOfOrigin: "Kenya",
      producingDistrict: "Murang'a County",
      unitPriceUSD: 100,
      minimumInvestmentUSD: 500,
      projectedAnnualYield: "13.1% ROI",
      availableVolumeFraction: "29% Shares Remaining",
      riskRating: "LOW",
      status: "OPEN_FOR_INVESTMENT"
    }
  ];

  // Dynamic search and multi-filtering logic matrix components
  const filteredStocks = commodityLedger.filter((stock) => {
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stock.producingDistrict.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || stock.category === selectedCategory;
    const matchesCountry = selectedCountry === "ALL" || stock.countryOfOrigin === selectedCountry;
    return matchesSearch && matchesCategory && matchesCountry;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER CONTROLS NAVIGATION LINK HUB */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b", zIndex: 10 }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>📊 KIKA INBOUND ASSET PORTFOLIOS</span>
        <button 
          onClick={(e) => { e.preventDefault(); router.push("/"); }}
          style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}
        >
          ⬅️ Return to Main Page
        </button>
      </header>

      {/* 🚀 LIVE COMMODITY TRANSACTIONAL TICKER TAPE BAR */}
      <div style={{ background: "#020617", borderBottom: "1px solid #334155", padding: "10px 20px", display: "flex", overflow: "hidden", gap: "40px", whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: "30px", animation: "none", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
          <span>🔥 LIVE CORRIDOR STATS:</span>
          <span>☕ COFFEE (UGX/KG): 11,400 <span style={{ color: "#34d399" }}>▲ +1.2%</span></span>
          <span>🍦 VANILLA (USD/KG): 245 <span style={{ color: "#ef4444" }}>▼ -0.4%</span></span>
          <span>🟡 GOLD (USD/OZ): 2,340 <span style={{ color: "#34d399" }}>▲ +2.8%</span></span>
          <span>🛢️ CRUDE OIL (BBL): $74.20 <span style={{ color: "#94a3b8" }}>◀ 0.0%</span></span>
        </div>
      </div>

      {/* MAIN CONTAINER WORKSPACE SECTION */}
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "40px 20px", flex: 1 }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "#ffffff", fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>Inbound National Stock Showcase</h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "700px", margin: "0 auto", lineHeight: "1.5" }}>
            Directly secure verified real-economy production units across East Africa. Route diaspora investment capital straight into agricultural yields, oil pipelines, and raw mineral processing syndicates.
          </p>
        </div>

        {/* COMPREHENSIVE FILTER AND SEARCH ENGINE HUB BAR */}
        <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155", display: "flex", flexWrap: "wrap", gap: "16px", marginBottom: "30px", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="🔍 Search commodities, assets, regions or producing districts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 2, minWidth: "260px", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none" }}
          />
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ flex: 1, minWidth: "160px", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", cursor: "pointer" }}
          >
            <option value="ALL">All Asset Categories</option>
            <option value="AGRICULTURE">🌾 Agriculture Yields</option>
            <option value="MINERALS">💎 Mineral Allocations</option>
            <option value="OIL_GAS">🛢️ Oil & Gas Assets</option>
            <option value="HORTICULTURE">🌹 Horticultural Yields</option>
          </select>

          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ flex: 1, minWidth: "160px", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", cursor: "pointer" }}
          >
            <option value="ALL">All Countries of Origin</option>
            <option value="Uganda">Uganda Corridor</option>
            <option value="Kenya">Kenya Corridor</option>
            <option value="Tanzania">Tanzania Corridor</option>
          </select>
        </div>
        {/* DYNAMIC COMMODITY CARD SELECTION GRID MATRIX */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filteredStocks.map((stock) => (
            <div 
              key={stock.id} 
              style={{ background: "#1e293b", borderRadius: "14px", border: "1px solid #334155", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)", transition: "transform 0.2s" }}
            >
              {/* CARD BANNER TAG LEVEL */}
              <div style={{ padding: "16px 20px", background: "#162235", borderBottom: "1px solid #24334a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", fontWeight: "bold", color: "#34d399", letterSpacing: "1.2px", background: "rgba(52, 211, 153, 0.08)", padding: "4px 8px", borderRadius: "4px" }}>
                  {stock.id}
                </span>
                <span style={{ fontSize: "11px", fontWeight: "900", color: stock.status === "OPEN_FOR_INVESTMENT" ? "#34d399" : "#94a3b8" }}>
                  ● {stock.status.replace(/_/g, " ")}
                </span>
              </div>

              {/* CARD CORE BODY INFORMATION BLOCKS */}
              <div style={{ padding: "24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", margin: "0 0 8px 0", lineHeight: "1.4" }}>
                  {stock.name}
                </h3>
                
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 16px 0" }}>
                  📍 <strong>Origin Corridor:</strong> {stock.countryOfOrigin} ({stock.producingDistrict})
                </p>

                {/* STRUCTURAL METRICS DOUBLE DATAFRAME */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#0f172a", padding: "14px", borderRadius: "10px", border: "1px solid #24334a", marginBottom: "16px" }}>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.5px" }}>Fraction Price</span>
                    <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "900" }}>${stock.unitPriceUSD} <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "normal" }}>/ Share</span></span>
                  </div>
                  <div>
                    <span style={{ display: "block", fontSize: "10px", color: "#64748b", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.5px" }}>Annual Yield Target</span>
                    <span style={{ fontSize: "16px", color: "#34d399", fontWeight: "900" }}>{stock.projectedAnnualYield}</span>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#94a3b8", borderBottom: "1px solid #24334a", paddingBottom: "10px", marginBottom: "16px" }}>
                  <span>Minimum Capital Stake:</span>
                  <span style={{ color: "#ffffff", fontWeight: "bold" }}>${stock.minimumInvestmentUSD} USD</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "#94a3b8", marginBottom: "20px" }}>
                  <span>Risk Parameter:</span>
                  <span style={{ 
                    fontWeight: "bold", 
                    color: stock.riskRating === "LOW" ? "#34d399" : stock.riskRating === "MEDIUM" ? "#f59e0b" : "#ef4444" 
                  }}>
                    🚨 {stock.riskRating} RISK
                  </span>
                </div>

                {/* DYNAMIC PIPELINE CAPTURE TRANSACTIONAL PLUG SOCKET BUTTON */}
                <button
                  onClick={() => {
                    if (stock.status === "OPEN_FOR_INVESTMENT") {
                      alert(`🚀 Redirecting to Core Remittance Payment Trunk to acquire equity stake in: ${stock.name}\nMinimum Threshold requirement: $${stock.minimumInvestmentUSD} USD.`);
                      router.push("/services/send-money");
                    }
                  }}
                  disabled={stock.status !== "OPEN_FOR_INVESTMENT"}
                  style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "bold", fontSize: "14px", cursor: stock.status === "OPEN_FOR_INVESTMENT" ? "pointer" : "not-allowed", transition: "all 0.15s", background: stock.status === "OPEN_FOR_INVESTMENT" ? "#34d399" : "#475569", color: stock.status === "OPEN_FOR_INVESTMENT" ? "#0f172a" : "#94a3b8", marginTop: "auto", boxShadow: stock.status === "OPEN_FOR_INVESTMENT" ? "0 4px 12px rgba(52, 211, 153, 0.2)" : "none" }}
                >
                  {stock.status === "OPEN_FOR_INVESTMENT" ? "🔒 Acquire Investment Shares" : "🔒 Asset Pool Capitalized"}
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* MOCK LOG MATRIX FALLBACK PROTECTION SAFEGUARD FOR EMPTY SEARCH MATRIX RESULTS */}
        {filteredStocks.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "#1e293b", borderRadius: "14px", border: "1px solid #334155" }}>
            <span style={{ fontSize: "40px", display: "block", marginBottom: "14px" }}>🔍</span>
            <h3 style={{ color: "#ffffff", fontSize: "18px", margin: "0 0 6px 0" }}>No Inbound Commodity Asset Nodes Match Filter Parameters</h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", margin: "0" }}>Modify search variables or select an alternative regional production corridor corridor.</p>
          </div>
        )}

      </div>
    </div>
  );
}

// Inline Layout Configuration Safeguards to Prevent Extraction Typos
const labelStyle = { display: "block", fontSize: "11px", fontWeight: "bold", color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.5px", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #334155", background: "#0f172a", color: "#ffffff", boxSizing: "border-box" as const, fontSize: "14px", outline: "none" };
