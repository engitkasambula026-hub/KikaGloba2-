"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CommodityStock {
  id: string;
  name: string;
  category: "AGRICULTURE" | "MINERALS" | "HORTICULTURE" | "OIL_GAS";
  countryOfOrigin: string;
  producingDistrict: string;
  unitPriceUSD: number; // Base full-share asset unit index cost
  projectedAnnualYield: string;
  availableVolumeFraction: string;
  riskRating: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN_FOR_INVESTMENT" | "FULLY_FUNDED" | "HARVESTING";
  aiSignal: "BUY_SIGNAL" | "HOLD" | "SELL_HIGH"; // 🤖 Automated AI Momentum Track
  currentBuyUSD: number;
  currentSellUSD: number;
}

export default function CommodityShowcasePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  
  // 🔒 Session & Investment Transaction States
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [tradeAmount, setTradeAmount] = useState<{ [key: string]: string }>({});
  const [txMessage, setTxMessage] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  // Read active session cookie to protect trading gates on mount
  useEffect(() => {
    const hasActiveSession = document.cookie.includes("kika_session_active=true");
    setIsLoggedIn(hasActiveSession);

    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    if (emailCookie) {
      setUserEmail(decodeURIComponent(emailCookie.split("=")[1]));
    } else {
      setUserEmail("audit02@kikaglobal.com"); // Fallback validation anchor node
    }
  }, []);

  // 🌟 DYNAMIC DATA MATRIX: Inbound National Resources Portfolio with AI Arbitrage Signals
  const commodityLedger: CommodityStock[] = [
    {
      id: "COM-UG-VAN-01",
      name: "Premium Organic Vanilla Yield Nodes",
      category: "AGRICULTURE",
      countryOfOrigin: "Uganda",
      producingDistrict: "Kasese & Mukono",
      unitPriceUSD: 250,
      projectedAnnualYield: "14.2% ROI",
      availableVolumeFraction: "42% Shares Remaining",
      riskRating: "MEDIUM",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "BUY_SIGNAL",
      currentBuyUSD: 245.00,
      currentSellUSD: 255.50
    },
    {
      id: "COM-UG-COF-02",
      name: "AAA Grade Drugar Arabica Coffee Blocks",
      category: "AGRICULTURE",
      countryOfOrigin: "Uganda",
      producingDistrict: "Mount Elgon Region (Mbale)",
      unitPriceUSD: 150,
      projectedAnnualYield: "11.8% ROI",
      availableVolumeFraction: "18% Shares Remaining",
      riskRating: "LOW",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "HOLD",
      currentBuyUSD: 148.50,
      currentSellUSD: 152.00
    },
    {
      id: "COM-TZ-GLD-03",
      name: "Artisanal Gold Refining Allocation Units",
      category: "MINERALS",
      countryOfOrigin: "Tanzania",
      producingDistrict: "Geita Gold Mining Zone",
      unitPriceUSD: 1200,
      projectedAnnualYield: "19.5% ROI",
      availableVolumeFraction: "65% Shares Remaining",
      riskRating: "HIGH",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "BUY_SIGNAL",
      currentBuyUSD: 1190.00,
      currentSellUSD: 1215.00
    },
    {
      id: "COM-UG-OIL-04",
      name: "Albertine Graben Crude Storage Portfolios",
      category: "OIL_GAS",
      countryOfOrigin: "Uganda",
      producingDistrict: "Hoima Oil Basin",
      unitPriceUSD: 500,
      projectedAnnualYield: "15.7% ROI",
      availableVolumeFraction: "0% Sold Out",
      riskRating: "MEDIUM",
      status: "FULLY_FUNDED",
      aiSignal: "SELL_HIGH",
      currentBuyUSD: 510.00,
      currentSellUSD: 540.00
    },
    {
      id: "COM-KE-AVO-05",
      name: "Hass Avocado Volcanic Soil Plantations",
      category: "HORTICULTURE",
      countryOfOrigin: "Kenya",
      producingDistrict: "Murang'a County",
      unitPriceUSD: 100,
      projectedAnnualYield: "13.1% ROI",
      availableVolumeFraction: "29% Shares Remaining",
      riskRating: "LOW",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "BUY_SIGNAL",
      currentBuyUSD: 98.20,
      currentSellUSD: 104.10
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
  // 🦾 FRACTIONAL ACQUISITION TRANSACTION GATEKEEPER
  const executeFractionalTrade = async (stock: CommodityStock) => {
    const amountStr = tradeAmount[stock.id];
    const usdValue = parseFloat(amountStr);

    if (!isLoggedIn) {
      alert("🔒 Authorization Refused: Please sign in or enroll to execute live asset trades.");
      router.push("/login");
      return;
    }

    if (isNaN(usdValue) || usdValue < 1) {
      alert("❌ Trade Rule Validation Drop: Minimum fractional order investment is \$1 USD.");
      return;
    }

    setIsPending(true);
    setTxMessage(`⏳ Transiting $${usdValue} trade request to Neon SQL Ledger...`);

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "INVEST_FRACTIONAL_STOCK",
          email: userEmail,
          ticker: stock.id,
          usdAmount: usdValue
        })
      });

      const data = await res.json();
      if (res.ok) {
        setTxMessage(`✅ Trade Settled! ${data.message}`);
        setTradeAmount(prev => ({ ...prev, [stock.id]: "" }));
        alert(`🎉 Success! Fractional equity position created for ${stock.name}.`);
      } else {
        setTxMessage(`❌ Order Dropped: ${data.error}`);
        alert(`❌ Order Execution Exception: ${data.error}`);
      }
    } catch (err: any) {
      setTxMessage(`🚧 Network circuit drop: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER CONTROLS NAVIGATION LINK HUB */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b", zIndex: 10 }}>
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>📊 KIKA INBOUND ASSET PORTFOLIOS</span>
        <button 
          onClick={(e) => { e.preventDefault(); router.push("/"); }}
          style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold", outline: "none" }}
        >
          ⬅️ Return to Main Page
        </button>
      </header>

      {/* 🚀 LIVE COMMODITY TRANSACTIONAL TICKER TAPE BAR */}
      <div style={{ background: "#020617", borderBottom: "1px solid #334155", padding: "10px 20px", display: "flex", overflow: "hidden", gap: "40px", whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: "30px", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
          <span>🔥 LIVE CORRIDOR STATS:</span>
          <span>☕ COFFEE (UGX/KG): 11,400 <span style={{ color: "#34d399" }}>▲ +1.2%</span></span>
          <span>🍦 VANILLA (USD/KG): 245 <span style={{ color: "#ef4444" }}>▼ -0.4%</span></span>
          <span>🟡 GOLD (USD/OZ): 2,340 <span style={{ color: "#34d399" }}>▲ +2.8%</span></span>
          <span>🛢️ CRUDE OIL (BBL): \$74.20 <span style={{ color: "#94a3b8" }}>◀ 0.0%</span></span>
        </div>
      </div>
      {/* MAIN CONTAINER WORKSPACE SECTION */}
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "40px 20px", flex: 1 }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "#ffffff", fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>Inbound National Stock Showcase</h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "700px", margin: "0 auto", lineHeight: "1.5" }}>
            Directly secure verified real-economy production units across East Africa. Route diaspora investment capital straight into agricultural yields, oil pipelines, and raw mineral processing syndicates down to **\$1 USD fractional allocations** [1.5].
          </p>
        </div>

        {/* FEEDBACK STATUS BANNER BAR */}
        {txMessage && (
          <div style={{ margin: "0 0 24px 0", padding: "14px", backgroundColor: "#020617", border: "1px solid #34d399", borderRadius: "8px", color: "#34d399", textAlign: "center", fontWeight: "bold", fontSize: "13px", fontFamily: "monospace" }}>
            {txMessage}
          </div>
        )}

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
            <option value="Uganda">Uganda</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Kenya">Kenya</option>
          </select>
        </div>

        {/* 🗺️ DYNAMIC PORTFOLIO EXCHANGE CARDS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filteredStocks.map((stock) => {
            const signalColor = stock.aiSignal === "BUY_SIGNAL" ? "#10b981" : stock.aiSignal === "SELL_HIGH" ? "#f59e0b" : "#94a3b8";
            
            return (
              <div key={stock.id} style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                
                {/* 🤖 AUTOMATED AI MONITOR TRACK BADGE */}
                <div style={{ position: "absolute", top: "16px", right: "16px", padding: "4px 8px", backgroundColor: "rgba(15,23,42,0.6)", border: `1px solid ${signalColor}`, color: signalColor, borderRadius: "4px", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace" }}>
                  🤖 AI: {stock.aiSignal}
                </div>

                <div>
                  <span style={{ fontSize: "10px", color: "#34d399", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>{stock.category} • {stock.countryOfOrigin}</span>
                  <h3 style={{ color: "#ffffff", fontSize: "18px", fontWeight: "bold", margin: "6px 0 12px 0" }}>{stock.name}</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #334155", borderBottom: "1px solid #334155", padding: "12px 0", margin: "12px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>📍 Producing Hub:</span>
                      <span style={{ color: "#cbd5e1", fontWeight: "600" }}>{stock.producingDistrict}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>💵 Index Full Price:</span>
                      <span style={{ color: "#ffffff", fontWeight: "bold" }}>\${stock.unitPriceUSD} USD</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>📈 Target Yield Rate:</span>
                      <span style={{ color: "#10b981", fontWeight: "bold" }}>{stock.projectedAnnualYield}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>📊 Inventory Volume:</span>
                      <span style={{ color: "#94a3b8" }}>{stock.availableVolumeFraction}</span>
                    </div>
                    
                    {/* Live Arbitrage Price Spreads */}
                    <div style={{ display: "flex", gap: "10px", marginTop: "6px", backgroundColor: "#0f172a", padding: "8px", borderRadius: "6px" }}>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>BID (BUY)</div>
                        <div style={{ fontSize: "12px", color: "#10b981", fontWeight: "bold" }}>\${stock.currentBuyUSD}</div>
                      </div>
                      <div style={{ flex: 1, textAlign: "center", borderLeft: "1px solid #1e293b" }}>
                        <div style={{ fontSize: "10px", color: "#64748b" }}>ASK (SELL)</div>
                        <div style={{ fontSize: "12px", color: "#f59e0b", fontWeight: "bold" }}>\${stock.currentSellUSD}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 💳 ACTION PANEL CORRIDOR: Fractional Order Ingestion Room */}
                <div style={{ marginTop: "12px" }}>
                  {stock.status === "OPEN_FOR_INVESTMENT" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                          <span style={{ position: "absolute", left: "10px", top: "10px", color: "#64748b", fontSize: "13px", fontWeight: "bold" }}>\$</span>
                          <input 
                            type="number" 
                            min="1" 
                            placeholder="Amount (Min \$1)" 
                            value={tradeAmount[stock.id] || ""} 
                            onChange={(e) => setTradeAmount({ ...tradeAmount, [stock.id]: e.target.value })}
                            style={{ width: "100%", padding: "10px 10px 10px 24px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                        <button 
                          onClick={() => executeFractionalTrade(stock)}
                          disabled={isPending}
                          style={{ padding: "10px 16px", backgroundColor: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: isPending ? "not-allowed" : "pointer" }}
                        >
                          Buy Equity
                        </button>
                      </div>
                      <span style={{ fontSize: "10.5px", color: "#64748b", textAlign: "center" }}>1 USD converts to ~3,700 UGX deducted natively from wallet.</span>
                    </div>
                  ) : (
                    <button disabled style={{ width: "100%", padding: "12px", backgroundColor: "#334155", color: "#64748b", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: "not-allowed" }}>
                      🔒 {stock.status.replace("_", " ")}
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
