"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ForexPair {
  pair_id: string;
  base_currency: string;
  quote_currency: string;
  live_bid_rate: number;
  live_ask_rate: number;
  daily_change_pct: string;
}

export default function WorldCurrencyMarketPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [txMessage, setTxMessage] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [tradeAmount, setTradeAmount] = useState<{ [key: string]: string }>({});

  // 🌟 STATIC FOREX LEDGER MATRIX WITH ACTIVE DIASPORA REMITTANCE PAIRS
  const forexLedger: ForexPair[] = [
    { pair_id: "EUR/USD", base_currency: "EUR", quote_currency: "USD", live_bid_rate: 1.0852, live_ask_rate: 1.0894, daily_change_pct: "+0.14%" },
    { pair_id: "GBP/USD", base_currency: "GBP", quote_currency: "USD", live_bid_rate: 1.2925, live_ask_rate: 1.2968, daily_change_pct: "+0.32%" },
    { pair_id: "USD/UGX", base_currency: "USD", quote_currency: "UGX", live_bid_rate: 3682.00, live_ask_rate: 3712.50, daily_change_pct: "+0.45%" },
    { pair_id: "USD/KES", base_currency: "USD", quote_currency: "KES", live_bid_rate: 128.40, live_ask_rate: 129.90, daily_change_pct: "-0.08%" },
    { pair_id: "JPY/USD", base_currency: "JPY", quote_currency: "USD", live_bid_rate: 0.0065, live_ask_rate: 0.0068, daily_change_pct: "-0.22%" }
  ];

  useEffect(() => {
    const hasActiveSession = document.cookie.includes("kika_session_active=true");
    setIsLoggedIn(hasActiveSession);

    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    if (emailCookie && emailCookie.includes("=")) {
      setUserEmail(decodeURIComponent(emailCookie.split("=")[1]));
    } else {
      setUserEmail("audit02@kikaglobal.com");
    }
  }, []);

  const handleForexTrade = async (pair: ForexPair) => {
    const amountStr = tradeAmount[pair.pair_id];
    const usdValue = parseFloat(amountStr);

    if (!isLoggedIn) {
      alert("🔒 Authorization Refused: Please log in to complete currency conversions.");
      router.push("/login");
      return;
    }

    if (isNaN(usdValue) || usdValue < 1) {
      alert("❌ Forex Rule Drop: Minimum order volume threshold is \$1 USD.");
      return;
    }

    setIsPending(true);
    setTxMessage(`⏳ Routing allocation request down cross-border currency channels...`);

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "TRADE_FOREX_PAIR",
          email: userEmail,
          pairId: pair.pair_id,
          tradeType: "BUY",
          usdAmount: usdValue
        })
      });

      const data = await res.json();
      if (res.ok) {
        setTxMessage(`✅ Settle Complete! ${data.message}`);
        setTradeAmount(prev => ({ ...prev, [pair.pair_id]: "" }));
        alert(`🎉 Confirmed! Currency exchange transaction safely processed on Neon SQL Ledger.`);
      } else {
        setTxMessage(`❌ Transaction Dropped: ${data.error}`);
      }
    } catch (err: any) {
      setTxMessage(`🚧 Network corridor link fail: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER CONTROL BAR NAVIGATION NODE */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b", zIndex: 10 }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>💱 KIKA GLOBAL FOREX EXCHANGE INTERCOM</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold", outline: "none" }}>⬅️ Home Base</button>
      </header>

      {/* FOREX INTERNET VOLUME TICKER TAPE BANNER */}
      <div style={{ background: "#020617", borderBottom: "1px solid #334155", padding: "10px 20px", display: "flex", overflow: "hidden", gap: "40px", whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", gap: "30px", color: "#94a3b8", fontSize: "11px", fontWeight: "bold", fontFamily: "monospace" }}>
          <span>📈 LIVE FOREX TICKER CORRIDOR:</span>
          <span>🇺🇸 USD index: 104.20 <span style={{ color: "#10b981" }}>▲ +0.12%</span></span>
          <span>🇪🇺 EUR/USD: 1.0852 <span style={{ color: "#ef4444" }}>▼ -0.04%</span></span>
          <span>🇬🇧 GBP/USD: 1.2925 <span style={{ color: "#10b981" }}>▲ +0.32%</span></span>
          <span>🇺🇬 USD/UGX: 3,682.00 <span style={{ color: "#10b981" }}>▲ +15.5%</span></span>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", width: "100%", margin: "0 auto", padding: "40px 20px", flex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{ color: "#ffffff", fontSize: "30px", fontWeight: "800", marginBottom: "8px" }}>World Currency & Remittance Market</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "#650px", margin: "0 auto", lineHeight: "1.5" }}>Trade major cross-border currency assets down to $1 fractional entry slots. Swap liquidity cushions seamlessly to complete remittance paths into East African mobile corridors instantly [1.5].</p>
        </div>

        {/* FEEDBACK SYSTEM RENDER PANEL BAR */}
        {txMessage && (
          <div style={{ margin: "0 0 24px 0", padding: "14px", backgroundColor: "#020617", border: "1px solid #34d399", borderRadius: "8px", color: "#34d399", textAlign: "center", fontWeight: "bold", fontSize: "12.5px", fontFamily: "monospace" }}>{txMessage}</div>
        )}

        {/* 🗺️ DYNAMIC FOREIGN EXCHANGE GRID DISPLAY BOARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {forexLedger.map((pair) => {
            const isUp = !pair.daily_change_pct.includes("-");
            const changeColor = isUp ? "#10b981" : "#ef4444";

            return (
              <div key={pair.pair_id} style={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "11px", color: "#34d399", fontWeight: "bold", fontFamily: "monospace" }}>TRADING CORRIDOR ACTIVE</span>
                    <span style={{ fontSize: "11px", color: changeColor, fontWeight: "bold", backgroundColor: "rgba(15,23,42,0.4)", padding: "2px 6px", borderRadius: "4px" }}>{pair.daily_change_pct}</span>
                  </div>
                  <h3 style={{ color: "#ffffff", fontSize: "22px", fontWeight: "black", margin: "10px 0 16px 0", fontFamily: "monospace" }}>{pair.pair_id}</h3>
                  
                  <div style={{ display: "flex", gap: "10px", backgroundColor: "#0f172a", padding: "10px", borderRadius: "8px", marginBottom: "14px", border: "1px solid #1e293b" }}>
                    <div style={{ flex: 1, textAlign: "center" }}>
                      <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "bold" }}>BID (BUY RATE)</div>
                      <div style={{ fontSize: "14px", color: "#10b981", fontWeight: "black", fontFamily: "monospace" }}>{pair.live_bid_rate}</div>
                    </div>
                    <div style={{ flex: 1, textAlign: "center", borderLeft: "1px solid #1e293b" }}>
                      <div style={{ fontSize: "9px", color: "#64748b", fontWeight: "bold" }}>ASK (SELL RATE)</div>
                      <div style={{ fontSize: "14px", color: "#f59e0b", fontWeight: "black", fontFamily: "monospace" }}>{pair.live_ask_rate}</div>
                    </div>
                  </div>
                </div>

                {/* TRANSACTION ORDER PANEL TUNNEL */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <span style={{ position: "absolute", left: "10px", top: "10px", color: "#64748b", fontSize: "13px", fontWeight: "bold" }}>$</span>
                    <input 
                      type="number" 
                      min="1" 
                      placeholder="Order volume" 
                      value={tradeAmount[pair.pair_id] || ""} 
                      onChange={(e) => setTradeAmount({ ...tradeAmount, [pair.pair_id]: e.target.value })}
                      style={{ width: "100%", padding: "10px 10px 10px 24px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <button 
                    onClick={() => handleForexTrade(pair)}
                    disabled={isPending}
                    style={{ padding: "10px 14px", backgroundColor: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "12.5px", cursor: isPending ? "not-allowed" : "pointer", outline: "none" }}
                  >
                    Convert
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
