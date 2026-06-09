// app/components/RemittanceForm.tsx
"use client";

import React, { useState, useEffect } from "react";

export default function RemittanceForm() {
  // Transfer Context States
  const [senderId, setSenderId] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientCountry, setRecipientCountry] = useState("UG");
  const [payoutMethod, setPayoutMethod] = useState("mobile_money");
  
  // Dynamic Payment Routing Parameters
  const [walletNumber, setWalletNumber] = useState("");
  const [walletOperator, setWalletOperator] = useState("mtn");
  const [cardNumber, setCardNumber] = useState("");
  const [bankName, setBankName] = useState("");

  // SACCO Interconnect Parameters
  const [depositToSacco, setDepositToSacco] = useState(false);
  const [saccoIdString, setSaccoIdString] = useState("");

  // Financial Value Calculation Metrics
  const [sendAmount, setSendAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [calculatedPayout, setCalculatedPayout] = useState(0);

  // UX Status Trackers
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // FX Spread Constants (Buying vs Selling relative to baseline UGX)
  const fxBook: Record<string, { buying: number; selling: number }> = {
    USD: { buying: 3680, selling: 3740 },
    GBP: { buying: 4680, selling: 4760 },
    EUR: { buying: 3950, selling: 4030 },
    KES: { buying: 27.8, selling: 28.9 },
  };

  // Automated FX Conversion Observer Hook
  useEffect(() => {
    const amt = parseFloat(sendAmount);
    if (!amt || isNaN(amt)) {
      setCalculatedPayout(0);
      return;
    }
    const rate = fxBook[sourceCurrency]?.selling || 1;
    setCalculatedPayout(amt * rate);
  }, [sendAmount, sourceCurrency]);

  const handleTransferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const paymentTargetString = depositToSacco 
      ? `INTERNAL_SACCO_POOL`
      : payoutMethod === "mobile_money" 
        ? `${walletOperator.toUpperCase()}:${walletNumber}` 
        : `${bankName}:${cardNumber}`;

    try {
      const response = await fetch("/api/remittance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId,
          recipientName,
          recipientCountry,
          payoutMethod: depositToSacco ? "sacco_deposit" : payoutMethod,
          recipientAccount: paymentTargetString,
          amount: parseFloat(sendAmount),
          currency: sourceCurrency,
          gateway: depositToSacco ? "kika_ledger" : (payoutMethod === "mobile_money" ? "mobile_aggregator" : "stripe_banking"),
          localPayoutEst: calculatedPayout,
          isSaccoDeposit: depositToSacco,
          saccoSubscriptionId: depositToSacco ? saccoIdString : null
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Handshake rejected.");

      if (depositToSacco) {
        setSuccessMessage(`Success! Capital deposited to SACCO. New Balance Pool: ${data.currentAccountPool?.toLocaleString()} UGX`);
      } else {
        setSuccessMessage(`Handshake Approved! Ledger Block Index: ${data.transactionId}`);
      }
      
      setSenderId("");
      setRecipientName("");
      setWalletNumber("");
      setCardNumber("");
      setSaccoIdString("");
      setSendAmount("");
      setDepositToSacco(false);
    } catch (err: any) {
      setErrorMessage(err.message || "Ecosystem routing channel timeout.");
    } finally {
      setLoading(false);
    }
  };

  const cssInput = {
    width: "100%", padding: "11px", marginTop: "5px", marginBottom: "14px",
    border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px",
    color: "#0f172a", boxSizing: "border-box" as const, backgroundColor: "#f8fafc"
  };

  const cssLabel = {
    fontSize: "11px", fontWhite: "700", fontWeight: "700", textTransform: "uppercase" as const,
    color: "#475569", letterSpacing: "0.6px", display: "block"
  };
  return (
    <div style={{ background: "#ffffff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)", border: "1px solid #e2e8f0" }}>
      <h2 style={{ margin: "0 0 5px 0", fontSize: "20px", fontWeight: "800", color: "#0f172a" }}>💸 Global Settlement Interface</h2>
      <p style={{ margin: "0 0 20px 0", fontSize: "13px", color: "#64748b" }}>Dispatch multi-currency payloads across global banking, mobile money, or SACCO equity pools.</p>

      {successMessage && <div style={{ padding: "12px", marginBottom: "15px", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#166534", borderRadius: "8px", fontSize: "13px", fontWeight: "500" }}>{successMessage}</div>}
      {errorMessage && <div style={{ padding: "12px", marginBottom: "15px", backgroundColor: "#fff1f2", border: "1px solid #fecdd3", color: "#991b1b", borderRadius: "8px", fontSize: "13px", fontWeight: "500" }}>{errorMessage}</div>}

      <form onSubmit={handleTransferSubmit}>
        
        <label style={cssLabel}>Sender Passport Reference / ID String</label>
        <input type="text" value={senderId} onChange={(e) => setSenderId(e.target.value)} required style={cssInput} placeholder="e.g. KIKA-USR-882" />

        <label style={cssLabel}>Beneficiary Full Legal Name</label>
        <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required style={cssInput} placeholder="Must match recipient documentation exactly" />

        {/* SACCO INTEGRATION CHECKBOX ELEMENT */}
        <div style={{ padding: "15px", backgroundColor: "#f8fafc", borderRadius: "10px", border: "1px solid #cbd5e1", marginBottom: "14px" }}>
          <label style={{ display: "inline-flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>
            <input 
              type="checkbox" 
              checked={depositToSacco} 
              onChange={() => setDepositToSacco(!depositToSacco)} 
              style={{ width: "16px", height: "16px", cursor: "pointer" }} 
            />
            <span style={{ color: "#2563eb" }}>Direct Capital Injection Into Registered SACCO Balance Pool</span>
          </label>

          {depositToSacco && (
            <div style={{ marginTop: "12px" }}>
              <label style={cssLabel}>Your Active SACCO Subscription Member ID (UUID String)</label>
              <input 
                type="text" 
                value={saccoIdString} 
                onChange={(e) => setSaccoIdString(e.target.value)} 
                required={depositToSacco} 
                style={cssInput} 
                placeholder="Paste account ID token from SACCO registry confirmation" />
              <span style={{ fontSize: "11px", color: "#16a34a", fontWeight: "500" }}>✨ Capital volume will bypass wallet arrays and hit your cooperative equity ledger directly.</span>
            </div>
          )}
        </div>

        {/* CONDITIONALLY CONCEAL REMITTANCE CHANNELS IF DEPOSITING TO SACCO */}
        {!depositToSacco && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={cssLabel}>Destination Country</label>
              <select value={recipientCountry} onChange={(e) => setRecipientCountry(e.target.value)} style={cssInput}>
                <option value="UG">🇺🇬 Uganda</option>
                <option value="KE">🇰🇪 Kenya</option>
                <option value="TZ">🇹🇿 Tanzania</option>
                <option value="RW">🇷🇼 Rwanda</option>
              </select>
            </div>
            <div>
              <label style={cssLabel}>Payout Infrastructure Node</label>
              <select value={payoutMethod} onChange={(e) => setPayoutMethod(e.target.value)} style={cssInput}>
                <option value="mobile_money">📱 Mobile Wallet Platform</option>
                <option value="bank_card">💳 International Bank / Card</option>
              </select>
            </div>
          </div>
        )}

        {/* CONDITIONALLY RENDERED CHANNELS */}
        {!depositToSacco && (
          payoutMethod === "mobile_money" ? (
            <div style={{ padding: "15px", backgroundColor: "#f0fdf4", borderRadius: "8px", border: "1px solid #dcfce7", marginBottom: "14px" }}>
              <label style={cssLabel}>Wallet Telecom Network Operator</label>
              <select value={walletOperator} onChange={(e) => setWalletOperator(e.target.value)} style={cssInput}>
                <option value="mtn">MTN MoMo Gateway</option>
                <option value="airtel">Airtel Money Vector</option>
                <option value="mpesa">Safaricom M-Pesa Hook</option>
              </select>
              <label style={cssLabel}>Registered Mobile Wallet Number</label>
              <input type="text" value={walletNumber} onChange={(e) => setWalletNumber(e.target.value)} required={payoutMethod === "mobile_money" && !depositToSacco} style={cssInput} placeholder="e.g. +256772000000" />
            </div>
          ) : (
            <div style={{ padding: "15px", backgroundColor: "#eff6ff", borderRadius: "8px", border: "1px solid #dbeafe", marginBottom: "14px" }}>
              <label style={cssLabel}>Clearing Bank Institution</label>
              <select value={bankName} onChange={(e) => setBankName(e.target.value)} style={cssInput}>
                <option value="">-- Select Destination Bank Node --</option>
                <option value="Stanbic">Stanbic Bank Uganda Ltd</option>
                <option value="Centenary">Centenary Rural Development Bank</option>
              </select>
              <label style={cssLabel}>Account Number / IBAN / Card String</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required={payoutMethod === "bank_card" && !depositToSacco} style={cssInput} placeholder="Enter physical execution string" />
            </div>
          )
        )}

        {/* REMITTANCE PRICING CORE */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={cssLabel}>Funding Capital Asset Amount</label>
            <input type="number" min="1" step="0.01" value={sendAmount} onChange={(e) => setSendAmount(e.target.value)} required style={cssInput} placeholder="0.00" />
          </div>
          <div>
            <label style={cssLabel}>Funding Currency Unit</label>
            <select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)} style={cssInput}>
              <option value="USD">USD (\$)</option>
              <option value="GBP">GBP (£)</option>
              <option value="EUR">EUR (€)</option>
              <option value="KES">KES (Ksh)</option>
            </select>
          </div>
        </div>

        {calculatedPayout > 0 && (
          <div style={{ padding: "14px", backgroundColor: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "8px", marginBottom: "20px", textAlign: "center" }}>
            <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>Guaranteed Settlement Volume</span>
            <div style={{ fontSize: "22px", fontWeight: "900", color: "#16a34a", marginTop: "4px" }}>
              {calculatedPayout.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} UGX
            </div>
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>Calculated at Kika Corporate Selling Spread Rate</span>
          </div>
        )}

        <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", backgroundColor: "#2563eb", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "16px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, transition: "background 0.2s", boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)" }}>
          {loading ? "Authorizing Structural Clearing Operations..." : "Execute Financial Transaction"}
        </button>
      </form>
    </div>
  );
}
