"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface CommodityStock {
  id: string;
  name: string;
  category: "AGRICULTURE" | "MINERALS" | "HORTICULTURE" | "OIL_GAS" | "TECHNOLOGY" | "ELECTRONICS" | "INDUSTRIAL";
  countryOfOrigin: string;
  producingDistrict: string;
  unitPriceUSD: number; // Base full-share unit index cost
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

  // 🌟 GLOBAL EXPANDED DATA MATRIX: Preserves East Africa and appends the 5 requested world corridors
  const commodityLedger: CommodityStock[] = [
    {
      id: "STK-US-TECH-01",
      name: "Silicon Valley AI Cluster Equity",
      category: "TECHNOLOGY",
      countryOfOrigin: "USA",
      producingDistrict: "California (San Jose)",
      unitPriceUSD: 350,
      projectedAnnualYield: "24.5% ROI",
      availableVolumeFraction: "61% Shares Remaining",
      riskRating: "HIGH",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "BUY_SIGNAL",
      currentBuyUSD: 342.20,
      currentSellUSD: 358.90
    },
    {
      id: "STK-JP-ELEC-02",
      name: "Automotive Robotics & Next-Gen Components",
      category: "ELECTRONICS",
      countryOfOrigin: "Japan",
      producingDistrict: "Tokyo & Nagoya",
      unitPriceUSD: 180,
      projectedAnnualYield: "12.8% ROI",
      availableVolumeFraction: "39% Shares Remaining",
      riskRating: "LOW",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "HOLD",
      currentBuyUSD: 177.00,
      currentSellUSD: 182.40
    },
    {
      id: "STK-IN-SOFT-03",
      name: "Enterprise Software Clearinghouse Units",
      category: "TECHNOLOGY",
      countryOfOrigin: "India",
      producingDistrict: "Bangalore & Hyderabad",
      unitPriceUSD: 95,
      projectedAnnualYield: "18.2% ROI",
      availableVolumeFraction: "72% Shares Remaining",
      riskRating: "MEDIUM",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "BUY_SIGNAL",
      currentBuyUSD: 91.50,
      currentSellUSD: 97.10
    },
    {
      id: "STK-EU-IND-04",
      name: "Automated Heavy Machinery & Clean Industrial",
      category: "INDUSTRIAL",
      countryOfOrigin: "Europe",
      producingDistrict: "Germany (Stuttgart / Bavaria)",
      unitPriceUSD: 520,
      projectedAnnualYield: "10.4% ROI",
      availableVolumeFraction: "14% Shares Remaining",
      riskRating: "LOW",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "HOLD",
      currentBuyUSD: 512.00,
      currentSellUSD: 525.00
    },
    {
      id: "STK-ME-CRU-05",
      name: "Strategic Downstream Petroleum Vaults",
      category: "OIL_GAS",
      countryOfOrigin: "Middle East",
      producingDistrict: "UAE (Abu Dhabi / Dubai)",
      unitPriceUSD: 850,
      projectedAnnualYield: "21.3% ROI",
      availableVolumeFraction: "48% Shares Remaining",
      riskRating: "MEDIUM",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "SELL_HIGH",
      currentBuyUSD: 840.00,
      currentSellUSD: 865.00
    },
    {
      id: "COM-UG-VAN-06",
      name: "Premium Organic Vanilla Yield Nodes",
      category: "AGRICULTURE",
      countryOfOrigin: "Uganda",
      producingDistrict: "Kasese & Mukono",
      unitPriceUSD: 250,
      projectedAnnualYield: "14.2% ROI",
      availableVolumeFraction: "12% Sold Out",
      riskRating: "MEDIUM",
      status: "OPEN_FOR_INVESTMENT",
      aiSignal: "BUY_SIGNAL",
      currentBuyUSD: 245.00,
      currentSellUSD: 255.50
    }
  ];

  // Dynamic search and multi-filtering logic matrix components
  const filteredStocks = commodityLedger.filter((stock) => {
    const matchesSearch = stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stock.producingDistrict.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          stock.countryOfOrigin.toLowerCase().includes(searchQuery.toLowerCase());
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
    setTxMessage(`⏳ Transiting $${usdValue} global order request to Neon SQL Ledger...`);

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
        setTxMessage(`✅ Order Settled! ${data.message}`);
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
        <span style={{ fontSize: "18px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>📊 KIKA GLOBAL EXCHANGE CORRIDORS</span>
        <button 
          onClick={(e) => { e.preventDefault(); router.push("/"); }}
          style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold", outline: "none" }}
        >
          ⬅️ Return to Main Page
        </button>
      </header>

      {/* 🚀 LIVE INTERNATIONAL TRANSACTIONAL TICKER TAPE BAR */}
      <div style={{ background: "#020617", borderBottom: "1px solid #334155", padding: "10px 20px", display: "flex", overflow: "hidden", gap: "40px", whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: "30px", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
          <span>🔥 LIVE WORLD MARGINS:</span>
          <span>🇺🇸 TECH (NASDAQ): 19,420 <span style={{ color: "#34d399" }}>▲ +1.6%</span></span>
          <span>🇯🇵 NIKKEI (TYO): 38,900 <span style={{ color: "#ef4444" }}>▼ -0.3%</span></span>
          <span>🇮🇳 NIFTY (NSE): 24,150 <span style={{ color: "#34d399" }}>▲ +2.1%</span></span>
          <span>🛢️ BRENT CRUDE (MIDEAST): \$76.80 <span style={{ color: "#34d399" }}>▲ +0.9%</span></span>
        </div>
      </div>
      {/* MAIN CONTAINER WORKSPACE SECTION */}
      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", padding: "40px 20px", flex: 1 }}>
        
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ color: "#ffffff", fontSize: "32px", fontWeight: "800", marginBottom: "8px" }}>Global Production Stock Showcase</h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.5" }}>
            Directly secure verified real-economy production units across leading global markets [1.5]. Route diaspora investment capital straight into Silicon Valley software clusters, Japanese robotics, Indian tech centers, European heavy industry, and Middle Eastern petroleum basins down to **$1 USD fractional allocations** [1.5].
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
            placeholder="🔍 Search stocks, assets, global corporations or regions..." 
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
            <option value="TECHNOLOGY">💻 Technology Sockets</option>
            <option value="ELECTRONICS">📟 Advanced Electronics</option>
            <option value="INDUSTRIAL">⚙️ Heavy Manufacturing</option>
            <option value="OIL_GAS">🛢️ Oil & Energy Vaults</option>
            <option value="AGRICULTURE">🌾 Agriculture Yields</option>
          </select>

          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={{ flex: 1, minWidth: "160px", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", cursor: "pointer" }}
          >
            <option value="ALL">All Countries of Origin</option>
            <option value="USA">United States (USA)</option>
            <option value="Japan">Japan</option>
            <option value="India">India</option>
            <option value="Europe">Europe (EU)</option>
            <option value="Middle East">Middle East</option>
            <option value="Uganda">Uganda</option>
          </select>
        </div>

        {/* 🗺️ DYNAMIC PORTFOLIO EXCHANGE CARDS GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "24px" }}>
          {filteredStocks.map((stock) => {
            const signalColor = stock.aiSignal === "BUY_SIGNAL" ? "#10b981" : stock.aiSignal === "SELL_HIGH" ? "#f59e0b" : "#94a3b8";
            
            return (
              <div key={stock.id} style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
                
                {/* 🤖 AUTOMATED AI MONITOR TRACK BADGE */}
                <div style={{ position: "absolute", top: "16px", right: "16px", padding: "4px 8px", backgroundColor: "rgba(15,23,42,0.6)", border: `1px solid ${signalColor}`, color: signalColor, borderRadius: "4px", fontSize: "10px", fontWeight: "bold", fontFamily: "monospace", zIndex: 5 }}>
                  🤖 AI: {stock.aiSignal.replace("_", " ")}
                </div>

                <div>
                  <span style={{ fontSize: "10px", color: "#34d399", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>{stock.category} • {stock.countryOfOrigin}</span>
                  <h3 style={{ color: "#ffffff", fontSize: "17px", fontWeight: "bold", margin: "6px 0 12px 0", lineHeight: "1.3" }}>{stock.name}</h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid #334155", borderBottom: "1px solid #334155", padding: "12px 0", margin: "12px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>📍 Industrial Hub:</span>
                      <span style={{ color: "#cbd5e1", fontWeight: "600" }}>{stock.producingDistrict}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>💵 Fraction Price:</span>
                      <span style={{ color: "#ffffff", fontWeight: "bold" }}>\${stock.unitPriceUSD} / Share</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>📈 Target Yield Rate:</span>
                      <span style={{ color: "#10b981", fontWeight: "bold" }}>{stock.projectedAnnualYield}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px" }}>
                      <span style={{ color: "#94a3b8" }}>📊 Volume Remaining:</span>
                      <span style={{ color: "#94a3b8" }}>{stock.availableVolumeFraction}</span>
                    </div>
                    
                    {/* Live Arbitrage Price Spreads */}
                    <div style={{ display: "flex", gap: "10px", marginTop: "8px", backgroundColor: "#020617", padding: "10px", borderRadius: "8px", border: "1px solid #1e293b" }}>
                      <div style={{ flex: 1, textAlign: "center" }}>
                        <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "bold" }}>BID (BUY)</div>
                        <div style={{ fontSize: "13px", color: "#10b981", fontWeight: "black", fontFamily: "monospace" }}>\${stock.currentBuyUSD.toFixed(2)}</div>
                      </div>
                      <div style={{ flex: 1, textAlign: "center", borderLeft: "1px solid #1e293b" }}>
                        <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "bold" }}>ASK (SELL)</div>
                        <div style={{ fontSize: "13px", color: "#f59e0b", fontWeight: "black", fontFamily: "monospace" }}>\${stock.currentSellUSD.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 💳 ACTION PANEL CORRIDOR: Fractional Order Input Field Row */}
                <div style={{ marginTop: "12px" }}>
                  {stock.status === "OPEN_FOR_INVESTMENT" ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                          <span style={{ position: "absolute", left: "10px", top: "10px", color: "#64748b", fontSize: "13px", fontWeight: "bold" }}>\$</span>
                          <input 
                            type="number" 
                            min="1" 
                            placeholder="Buy slice (Min \$1)" 
                            value={tradeAmount[stock.id] || ""} 
                            onChange={(e) => setTradeAmount({ ...tradeAmount, [stock.id]: e.target.value })}
                            style={{ width: "100%", padding: "10px 10px 10px 24px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                          />
                        </div>
                        <button 
                          onClick={() => executeFractionalTrade(stock)}
                          disabled={isPending}
                          style={{ padding: "10px 16px", backgroundColor: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: isPending ? "not-allowed" : "pointer", outline: "none" }}
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

        {/* 📟 FEEDBACK BANNER CONSOLE CONTAINER RENDER ROW */}
        {txMessage && (
          <div style={{ marginTop: "24px", padding: "16px", borderRadius: "12px", textAlign: "center", fontWeight: "bold", fontSize: "14px", backgroundColor: "#020617", color: "#34d399", border: "1px solid #334155", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)", fontFamily: "monospace" }}>
            {txMessage}
          </div>
        )}

      </div>
    </div>
  ); // 🟢 FIXED: Wrapped parent layout block correctly
}    // 🟢 FIXED: Closed main CommodityShowcasePage function block safely


