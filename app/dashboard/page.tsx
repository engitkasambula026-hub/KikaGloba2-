"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MemberCockpitDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
  const [ledger, setLedger] = useState<any[]>([]);
  const [remittances, setRemittances] = useState<any[]>([]);
  const [corridors, setCorridors] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>("SACCO_POOL");

  const [saccoType, setSaccoType] = useState("DEPOSIT");
  const [saccoAmount, setSaccoAmount] = useState("");
  const [voucherAmount, setVoucherAmount] = useState("25");
  const [destCountry, setDestCountry] = useState("Uganda");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [remitAmountSEK, setRemitAmountSEK] = useState("");
  const [processing, setProcessing] = useState(false);

  async function loadCockpitData(emailToLoad: string) {
    try {
      const res = await fetch(`/api/user/cockpit?email=${encodeURIComponent(emailToLoad)}`);
      const data = await res.json();
      if (data.success) {
        setProfile(data.profile);
        setLedger(data.ledger || []);
        setRemittances(data.remittances || []);
        setCorridors(data.corridors || {});
      }
    } catch (err) {
      console.error("Failed loading cockpit data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const storedEmail =
      typeof window !== "undefined"
        ? localStorage.getItem("kika_user_email") || sessionStorage.getItem("kika_user_email") || ""
        : "";
    setUserEmail(storedEmail);
    if (storedEmail) {
      loadCockpitData(storedEmail);
    } else {
      setLoading(false);
    }
  }, []);

  async function handleSaccoAction(e: React.FormEvent) {
    e.preventDefault();
    if (!saccoAmount || parseFloat(saccoAmount) <= 0) return alert("Enter a valid SEK amount.");
    setProcessing(true);
    const res = await fetch("/api/sacco/engine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, actionType: saccoType, transactionAmountSEK: saccoAmount })
    });
    const data = await res.json();
    setProcessing(false);
    alert(data.message || data.error);
    if (data.success) {
      setSaccoAmount("");
      loadCockpitData(userEmail);
    }
  }

  async function handleVoucherPurchase(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    const res = await fetch("/api/user/cockpit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, action: "BUY_VOIP_VOUCHER", amountSEK: voucherAmount })
    });
    const data = await res.json();
    setProcessing(false);
    alert(data.message || data.error);
    if (data.success) loadCockpitData(userEmail);
  }

  async function handleRemittanceSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!remitAmountSEK || parseFloat(remitAmountSEK) <= 0) return alert("Enter a valid SEK amount.");
    setProcessing(true);
    const res = await fetch("/api/user/cockpit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        action: "SEND_REMITTANCE",
        amountSEK: remitAmountSEK,
        destinationCountry: destCountry,
        recipientName,
        recipientPhone
      })
    });
    const data = await res.json();
    setProcessing(false);
    alert(data.message || data.error);
    if (data.success) {
      setRemitAmountSEK("");
      setRecipientName("");
      setRecipientPhone("");
      loadCockpitData(userEmail);
    }
  }
  if (loading) {
    return <div style={{ padding: "40px", backgroundColor: "#0f172a", color: "#ffffff", minHeight: "100vh", fontFamily: "sans-serif" }}>⚡ Initializing Personalized KiKa Member Cockpit...</div>;
  }

  const activeCorridor = corridors[destCountry] || { region: "Africa", currency: "UGX", rateFromSEK: 350 };
  const previewConverted = remitAmountSEK ? (parseFloat(remitAmountSEK) * activeCorridor.rateFromSEK).toLocaleString() : "0.00";

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#ffffff", fontFamily: "sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 32px", backgroundColor: "#1e293b", borderBottom: "1px solid #334155" }}>
        <div>
          <span style={{ fontSize: "11px", color: "#34d399", fontWeight: "bold", fontFamily: "monospace" }}>[ SWEDEN SEK SPRINGBOARD NODE ]</span>
          <h1 style={{ margin: "2px 0 0 0", fontSize: "20px" }}>🌍 KiKa Member Cockpit</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => router.push("/")} style={{ padding: "8px 14px", backgroundColor: "transparent", border: "1px solid #475569", color: "#cbd5e1", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>🏠 Main Portal</button>
          <button onClick={() => { localStorage.clear(); sessionStorage.clear(); router.push("/login"); }} style={{ padding: "8px 14px", backgroundColor: "#dc2626", border: "none", color: "#ffffff", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold" }}>Sign Out</button>
        </div>
      </header>

      <main style={{ maxWidth: "1050px", margin: "0 auto", padding: "30px 20px" }}>
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Authenticated Member Profile</div>
              <h2 style={{ margin: "2px 0", fontSize: "22px" }}>{profile?.full_name || "KiKa Member"}</h2>
              <div style={{ fontSize: "12px", color: "#38bdf8" }}>{userEmail}</div>
            </div>
            <span style={{ padding: "6px 12px", backgroundColor: "#064e3b", color: "#34d399", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
              🟢 {profile?.account_status || "ACTIVE"} | Base: Sweden (SEK)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <div style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Cooperative SACCO Savings</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginTop: "6px" }}>
                {parseFloat(profile?.savings_balance_sek || "0").toFixed(2)} <span style={{ fontSize: "14px" }}>SEK</span>
              </div>
            </div>
            <div style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Low-Tariff VoIP Calling Wallet</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b", marginTop: "6px" }}>
                {parseFloat(profile?.voip_balance_sek || "0").toFixed(2)} <span style={{ fontSize: "14px" }}>SEK</span>
              </div>
            </div>
            <div style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>SACCO Credit Underwriting Score</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#a855f7", marginTop: "6px" }}>
                {profile?.credit_underwriting_score || 500} <span style={{ fontSize: "13px", color: "#64748b" }}>/ 850</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "28px" }}>
          <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            Select Ecosystem Service Module
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            style={{ width: "100%", padding: "14px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #a855f7", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", marginBottom: "24px" }}
          >
            <option value="SACCO_POOL">🏦 1. Cooperative SACCO Savings & Capital Deposits (SEK)</option>
            <option value="VOIP_VOUCHER">🎙️ 2. Purchase Low-Tariff Global VoIP Calling Vouchers</option>
            <option value="GLOBAL_REMITTANCE">🌐 3. Global Continental Remittance (Springboard: Sweden SEK)</option>
          </select>

          {selectedService === "SACCO_POOL" && (
            <form onSubmit={handleSaccoAction} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ margin: 0, color: "#34d399" }}>🏦 Cooperative SACCO Deposit & Liquidity Management</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Deposits automatically increase your SEK pool balance and raise your algorithmic credit score.</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <select value={saccoType} onChange={(e) => setSaccoType(e.target.value)} style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                  <option value="DEPOSIT">📥 Deposit Funds (SEK)</option>
                  <option value="WITHDRAWAL">📤 Withdraw Funds (SEK)</option>
                </select>
                <input type="number" placeholder="Amount in SEK (e.g. 500)" value={saccoAmount} onChange={(e) => setSaccoAmount(e.target.value)} required style={{ flex: 1, padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }} />
                <button type="submit" disabled={processing} style={{ padding: "12px 24px", backgroundColor: "#10b981", color: "#022c22", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  {processing ? "Settling..." : "Execute SACCO Entry"}
                </button>
              </div>
            </form>
          )}
          {selectedService === "VOIP_VOUCHER" && (
            <form onSubmit={handleVoucherPurchase} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ margin: 0, color: "#f59e0b" }}>🎙️ Buy Low-Tariff International VoIP Calling Voucher</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Convert SEK from your savings balance into instant per-second global calling credit.</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <select value={voucherAmount} onChange={(e) => setVoucherAmount(e.target.value)} style={{ flex: 1, padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                  <option value="10">10.00 SEK Starter Calling Voucher</option>
                  <option value="25">25.00 SEK Standard Diaspora Voucher</option>
                  <option value="50">50.00 SEK Extended Corridor Voucher</option>
                  <option value="100">100.00 SEK Enterprise Trunk Voucher</option>
                </select>
                <button type="submit" disabled={processing} style={{ padding: "12px 24px", backgroundColor: "#f59e0b", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  {processing ? "Issuing..." : "Purchase VoIP Voucher"}
                </button>
              </div>
            </form>
          )}

          {selectedService === "GLOBAL_REMITTANCE" && (
            <form onSubmit={handleRemittanceSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ margin: 0, color: "#38bdf8" }}>🌐 Global Continental Remittance (Springboard: Sweden SEK)</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Send instant cross-border transfers from your SEK balance to major countries across all continents.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                <select value={destCountry} onChange={(e) => setDestCountry(e.target.value)} style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                  <optgroup label="🌍 Africa">
                    <option value="Uganda">Uganda (UGX)</option>
                    <option value="Kenya">Kenya (KES)</option>
                    <option value="Nigeria">Nigeria (NGN)</option>
                    <option value="South Africa">South Africa (ZAR)</option>
                  </optgroup>
                  <optgroup label="🇪🇺 Europe">
                    <option value="Sweden (Local)">Sweden (SEK)</option>
                    <option value="United Kingdom">United Kingdom (GBP)</option>
                    <option value="Eurozone (DE/FR/NL)">Eurozone (EUR)</option>
                  </optgroup>
                  <optgroup label="🌎 North America">
                    <option value="United States">United States (USD)</option>
                    <option value="Canada">Canada (CAD)</option>
                  </optgroup>
                  <optgroup label="🌏 Middle East & Asia">
                    <option value="United Arab Emirates">United Arab Emirates (AED)</option>
                    <option value="India">India (INR)</option>
                  </optgroup>
                </select>

                <input type="text" placeholder="Recipient Full Name" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} required style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }} />
                <input type="text" placeholder="Recipient Mobile (+256...)" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} required style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }} />
                <input type="number" placeholder="Send Amount (SEK)" value={remitAmountSEK} onChange={(e) => setRemitAmountSEK(e.target.value)} required style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }} />
              </div>

              <div style={{ padding: "12px", backgroundColor: "#0f172a", borderRadius: "8px", border: "1px dashed #38bdf8", fontSize: "13px", color: "#bae6fd" }}>
                💱 <strong>Live Springboard Conversion ({activeCorridor.region} – {destCountry}):</strong> Recipient receives <strong>{previewConverted} {activeCorridor.currency}</strong> (Rate: 1 SEK = {activeCorridor.rateFromSEK} {activeCorridor.currency})
              </div>

              <button type="submit" disabled={processing} style={{ padding: "14px", backgroundColor: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}>
                {processing ? "Dispatching..." : `Send Remittance from Sweden (SEK) to ${destCountry}`}
              </button>
            </form>
          )}
        </section>

        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h3 style={{ margin: "0 0 14px 0", fontSize: "16px", color: "#cbd5e1" }}>📜 Recent Account Ledger & Remittance Receipts</h3>
          {ledger.length === 0 && remittances.length === 0 ? (
            <p style={{ color: "#64748b", fontSize: "13px" }}>No transactions recorded on your account yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontFamily: "monospace" }}>
              {remittances.map((r: any, idx: number) => (
                <div key={`remit-${idx}`} style={{ padding: "10px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <span>🌐 [{r.continental_region} / {r.destination_country}] Sent <strong>{parseFloat(r.amount_sek).toFixed(2)} SEK</strong> → <strong>{parseFloat(r.converted_amount).toLocaleString()} {r.target_currency}</strong> ({r.recipient_name})</span>
                  <span style={{ color: "#38bdf8" }}>{r.tx_reference}</span>
                </div>
              ))}
              {ledger.map((tx: any, idx: number) => (
                <div key={`tx-${idx}`} style={{ padding: "10px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <span>💳 [{tx.tx_type}] {parseFloat(tx.amount_sek).toFixed(2)} SEK | Balance Snapshot: {parseFloat(tx.balance_snapshot_sek).toFixed(2)} SEK</span>
                  <span style={{ color: "#10b981" }}>{tx.tx_reference}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
