"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const GLOBAL_VOIP_RATES: Record<string, { region: string; prefix: string; rateMinSEK: number }> = {
  "Sweden": { region: "Europe", prefix: "+46", rateMinSEK: 0.35 },
  "Uganda": { region: "Africa", prefix: "+256", rateMinSEK: 2.40 },
  "Kenya": { region: "Africa", prefix: "+254", rateMinSEK: 1.80 },
  "Tanzania": { region: "Africa", prefix: "+255", rateMinSEK: 2.10 },
  "Rwanda": { region: "Africa", prefix: "+250", rateMinSEK: 2.20 },
  "Nigeria": { region: "Africa", prefix: "+234", rateMinSEK: 1.50 },
  "South Africa": { region: "Africa", prefix: "+27", rateMinSEK: 0.95 },
  "United Kingdom": { region: "Europe", prefix: "+44", rateMinSEK: 0.45 },
  "Germany": { region: "Europe", prefix: "+49", rateMinSEK: 0.48 },
  "France": { region: "Europe", prefix: "+33", rateMinSEK: 0.48 },
  "United States": { region: "North America", prefix: "+1", rateMinSEK: 0.30 },
  "Canada": { region: "North America", prefix: "+1", rateMinSEK: 0.30 },
  "United Arab Emirates": { region: "Middle East", prefix: "+971", rateMinSEK: 1.90 },
  "India": { region: "Asia", prefix: "+91", rateMinSEK: 0.55 }
};

export default function MemberCockpitDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
    const [livePrefixRates, setLivePrefixRates] = useState<Record<string, number>>({});
  const [ledger, setLedger] = useState<any[]>([]);
  const [remittances, setRemittances] = useState<any[]>([]);
  const [corridors, setCorridors] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string>("WEBRTC_DIALER");

  // SACCO & Remittance States
  const [saccoType, setSaccoType] = useState("DEPOSIT");
  const [saccoAmount, setSaccoAmount] = useState("");
  const [destCountry, setDestCountry] = useState("Uganda");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [remitAmountSEK, setRemitAmountSEK] = useState("");

  // Wallet Payment Top-Up & Voucher States
  const [paymentProvider, setPaymentProvider] = useState("Swish Sweden");
  const [topupAmountSEK, setTopupAmountSEK] = useState("100");
  const [voucherAmount, setVoucherAmount] = useState("50");

  // WebRTC Dialer & Destination Rate Drawer States
  const [originCountry, setOriginCountry] = useState("Sweden");
  const [callDestCountry, setCallDestCountry] = useState("Uganda");
  const [rateDrawerOpen, setRateDrawerOpen] = useState(true);
  const [dialPhoneNumber, setDialPhoneNumber] = useState("+256");
  const [callActive, setCallActive] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [callStatusText, setCallStatusText] = useState("Ready for WebRTC Voice Trunk");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [processing, setProcessing] = useState(false);

  async function loadCockpitData(emailToLoad: string) {
    try {
      const res = await fetch(`/api/user/cockpit?email=${encodeURIComponent(emailToLoad)}`);
      
      const data = await res.json();
            const tariffRes = await fetch("/api/admin/tariffs");
      const tariffData = await tariffRes.json();
      if (tariffData.success && Array.isArray(tariffData.tariffs)) {
        const dynamicMap: Record<string, number> = {};
        tariffData.tariffs.forEach((t: any) => {
          dynamicMap[t.country_prefix] = parseFloat(t.retail_rate_sek_sec);
        });
        setLivePrefixRates(dynamicMap);
      }

      if (data.success) {
        setProfile(Array.isArray(data.profile) ? data.profile[0] : data.profile);
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
    if (!storedEmail) {
      router.push("/login");
      return;
    }
    setUserEmail(storedEmail);
    loadCockpitData(storedEmail);
  }, []);

    async function handleWalletTopup(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          amountSEK: topupAmountSEK,
          paymentProvider
        })
      });
      const data = await res.json();
      setProcessing(false);

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Unable to initialize Stripe Checkout.");
      }
    } catch (err: any) {
      setProcessing(false);
      alert(err.message || "Network error connecting to Stripe.");
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

  async function startWebRtcCall() {
    if (!dialPhoneNumber || dialPhoneNumber.length < 6) return alert("Enter a valid international phone number.");
    setProcessing(true);
    setCallStatusText("Authorizing VoIP Wallet & Generating WebRTC Token...");

    const res = await fetch(`/api/voip/engine?email=${encodeURIComponent(userEmail)}&to=${encodeURIComponent(dialPhoneNumber)}`);
    const data = await res.json();
    setProcessing(false);

    if (!data.success) {
      setCallStatusText("Call Blocked: Insufficient VoIP Credit");
      return alert(data.error);
    }

    setCallActive(true);
    setCallSeconds(0);
    setCallStatusText(`🔊 Connected to ${dialPhoneNumber} (${data.tariff.destination})`);

    timerRef.current = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);
  }

  async function endWebRtcCall() {
    if (timerRef.current) clearInterval(timerRef.current);
    const finalSeconds = Math.max(1, callSeconds);
    setCallActive(false);
    setCallStatusText("Settling Per-Second Call Detail Record...");

    const res = await fetch("/api/voip/engine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        dialedNumber: dialPhoneNumber,
        durationSeconds: finalSeconds
      })
    });
    const data = await res.json();
    setCallStatusText("Call Completed & Settled");
      const selectedCallTariff = GLOBAL_VOIP_RATES[callDestCountry] || { region: "Africa", prefix: "+256", rateMinSEK: 2.40 };
  const ratePerSecSEK = livePrefixRates[selectedCallTariff.prefix] ?? (selectedCallTariff.rateMinSEK / 60);

    if (data.success) {
      alert(`📞 Call Ended (${data.billedSeconds}s). Billed: ${data.totalChargeSEK.toFixed(4)} SEK. Remaining VoIP Balance: ${data.remainingVoipSEK.toFixed(2)} SEK`);
      loadCockpitData(userEmail);
    }
  }
  if (loading) {
    return <div style={{ padding: "40px", backgroundColor: "#0f172a", color: "#ffffff", minHeight: "100vh", fontFamily: "sans-serif" }}>⚡ Initializing Personalized KiKa Member Cockpit...</div>;
  }

  const activeCorridor = corridors[destCountry] || { region: "Africa", currency: "UGX", rateFromSEK: 350 };
  const previewConverted = remitAmountSEK ? (parseFloat(remitAmountSEK) * activeCorridor.rateFromSEK).toLocaleString() : "0.00";

  const selectedCallTariff = GLOBAL_VOIP_RATES[callDestCountry] || { region: "Africa", prefix: "+256", rateMinSEK: 2.40 };
  const ratePerSecSEK = selectedCallTariff.rateMinSEK / 60;
  const currentVoipWallet = parseFloat(profile?.voip_balance_sek || "0");
  const maxMinutesAvailable = ratePerSecSEK > 0 ? Math.floor(currentVoipWallet / selectedCallTariff.rateMinSEK) : 0;

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
        {/* LIVE MEMBER BALANCES CARD */}
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
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Cooperative SACCO & Cash Balance</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginTop: "6px" }}>
                {parseFloat(profile?.savings_balance_sek || "0").toFixed(2)} <span style={{ fontSize: "14px" }}>SEK</span>
              </div>
            </div>
            <div style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Low-Tariff VoIP Calling Credit</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b", marginTop: "6px" }}>
                {currentVoipWallet.toFixed(2)} <span style={{ fontSize: "14px" }}>SEK</span>
                

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

        {/* ECOSYSTEM SERVICE SELECTOR DROPDOWN */}
        <section style={{ backgroundColor: "#1e293b", padding: "24px", borderRadius: "12px", border: "1px solid #334155", marginBottom: "28px" }}>
          <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "8px", textTransform: "uppercase" }}>
            Select Ecosystem Service Module
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            style={{ width: "100%", padding: "14px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #a855f7", borderRadius: "8px", fontSize: "15px", fontWeight: "bold", marginBottom: "24px" }}
          >
            <option value="WEBRTC_DIALER">📞 1. Global WebRTC Per-Second VoIP Dialer & Live Rate Drawer</option>
            <option value="VOIP_VOUCHER">💳 2. Wallet Payment Top-Up & 50 SEK / 100 SEK VoIP Vouchers</option>
            <option value="SACCO_POOL">🏦 3. Cooperative SACCO Savings & Capital Deposits (SEK)</option>
            <option value="GLOBAL_REMITTANCE">🌐 4. Global Continental Remittance (Springboard: Sweden SEK)</option>
          </select>

          {/* MODULE 1: WEBRTC PER-SECOND DIALER & DESTINATION RATE DRAWER */}
          {selectedService === "WEBRTC_DIALER" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ margin: 0, color: "#34d399" }}>📞 WebRTC Per-Second Browser Dialer</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Select your current location and destination country to inspect live per-second SEK tariffs before dialing.</p>
         {rateDrawerOpen && (
           <div style={{ backgroundColor: "#0f172a", padding: "16px", borderRadius: "10px", border: "1px solid #38bdf8", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
             <div>
               <div style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "bold", textTransform: "uppercase" }}>
                 📊 Active Corridor Rate: {originCountry} ➔ {callDestCountry} ({selectedCallTariff.region})
               </div>
               <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                 {ratePerSecSEK.toFixed(4)} SEK / second
               </div>
               <div style={{ fontSize: "12px", color: "#34d399", marginTop: "4px" }}>
                 ⏱️ Available Calling Credit: <strong>{currentVoipWallet.toFixed(2)} SEK</strong>
               </div>
             </div>
             <button type="button" onClick={() => setRateDrawerOpen(false)} style={{ padding: "6px 10px", backgroundColor: "#1e293b", color: "#94a3b8", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "11px" }}>
               Hide Drawer
             </button>
           </div>
         )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>Your Current Location (Origin)</label>
                  <select value={originCountry} onChange={(e) => setOriginCountry(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                    {Object.keys(GLOBAL_VOIP_RATES).map((country) => (
                      <option key={`orig-${country}`} value={country}>📍 {country} ({GLOBAL_VOIP_RATES[country].region})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#94a3b8", display: "block", marginBottom: "4px" }}>Destination Country (Click to Open Rate Drawer)</label>
                  <select
                    value={callDestCountry}
                    onChange={(e) => {
                      const chosen = e.target.value;
                      setCallDestCountry(chosen);
                      setDialPhoneNumber(GLOBAL_VOIP_RATES[chosen]?.prefix || "+");
                      setRateDrawerOpen(true);
                    }}
                    style={{ width: "100%", padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #38bdf8", borderRadius: "8px" }}
                  >
                    {Object.keys(GLOBAL_VOIP_RATES).map((country) => (
                      <option key={`dest-${country}`} value={country}>🌍 {country} ({GLOBAL_VOIP_RATES[country].prefix})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* AUTOMATED PER-SECOND TARIFF DRAWER */}
              {rateDrawerOpen && (
                <div style={{ backgroundColor: "#0f172a", padding: "16px", borderRadius: "10px", border: "1px solid #38bdf8", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <div style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "bold", textTransform: "uppercase" }}>
                      📊 Live Corridor Tariff Drawer: {originCountry} ➔ {callDestCountry} ({selectedCallTariff.region})
                    </div>
                    <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                      {ratePerSecSEK.toFixed(4)} SEK / second <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "normal" }}>({selectedCallTariff.rateMinSEK.toFixed(2)} SEK / min)</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#34d399", marginTop: "4px" }}>
                      ⏱️ Your {currentVoipWallet.toFixed(2)} SEK VoIP Credit covers ~<strong>{maxMinutesAvailable} mins</strong> to {callDestCountry}
                    </div>
                  </div>
                  <button type="button" onClick={() => setRateDrawerOpen(false)} style={{ padding: "6px 10px", backgroundColor: "#1e293b", color: "#94a3b8", border: "1px solid #334155", borderRadius: "6px", cursor: "pointer", fontSize: "11px" }}>
                    Hide Drawer
                  </button>
                </div>
              )}

              {/* DIALPAD INPUT & CALL CONTROLS */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <input
                  type="tel"
                  value={dialPhoneNumber}
                  onChange={(e) => setDialPhoneNumber(e.target.value)}
                  placeholder="+256700000000"
                  disabled={callActive}
                  style={{ flex: 1, padding: "14px", fontSize: "18px", fontFamily: "monospace", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}
                />
                {!callActive ? (
                              <button type="button" onClick={startWebRtcCall} disabled={processing} style={{ padding: "14px 28px", backgroundColor: "#10b981", color: "#022c22", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>
               {processing ? "Connecting..." : "📞 Place Call"}
             </button>

                ) : (
                  <button type="button" onClick={endWebRtcCall} style={{ padding: "14px 28px", backgroundColor: "#dc2626", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}>
                    🔴 Hang Up ({callSeconds}s • {(callSeconds * ratePerSecSEK).toFixed(3)} SEK)
                  </button>
                )}
              </div>
              <div style={{ fontSize: "12px", color: callActive ? "#34d399" : "#94a3b8", fontFamily: "monospace" }}>
                Status: {callStatusText}
              </div>
            </div>
          )}
          {/* MODULE 2: WALLET TOP-UP & 50 SEK / 100 SEK VOIP VOUCHERS */}
          {selectedService === "VOIP_VOUCHER" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* STEP A: EXTERNAL WALLET PAYMENT TO KIKA ACCOUNT */}
              <form onSubmit={handleWalletTopup} style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "10px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "16px" }}>💳 Step A: Fund KiKa Account from External Wallet Provider</h3>
                <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Transfer funds from your mobile money, Swish, or bank card into your KiKa SEK balance.</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <select value={paymentProvider} onChange={(e) => setPaymentProvider(e.target.value)} style={{ padding: "12px", backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                    <option value="Swish Sweden">🇸🇪 Swish Sweden (SEK Instant)</option>
                    <option value="MTN / Airtel Mobile Money">🇺🇬 MTN / Airtel Mobile Money</option>
                    <option value="Visa / Mastercard">💳 Visa / Mastercard Global</option>
                    <option value="SEPA / Nordic Bank">🏦 SEPA / Nordic Bank Transfer</option>
                  </select>
                  <select value={topupAmountSEK} onChange={(e) => setTopupAmountSEK(e.target.value)} style={{ flex: 1, padding: "12px", backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                    <option value="50">50.00 SEK Wallet Credit Top-Up</option>
                    <option value="100">100.00 SEK Wallet Credit Top-Up</option>
                    <option value="250">250.00 SEK Diaspora Bundle Top-Up</option>
                    <option value="500">500.00 SEK Enterprise Credit Top-Up</option>
                  </select>
                  <button type="submit" disabled={processing} style={{ padding: "12px 22px", backgroundColor: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                    {processing ? "Processing..." : "Deposit Wallet Credit"}
                  </button>
                </div>
              </form>

              {/* STEP B: PURCHASE 50 SEK / 100 SEK CALLING VOUCHER */}
              <form onSubmit={handleVoucherPurchase} style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "10px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ margin: 0, color: "#f59e0b", fontSize: "16px" }}>🎙️ Step B: Convert SEK Balance into VoIP Calling Vouchers</h3>
                <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Allocate 50 SEK or 100 SEK vouchers from your KiKa balance directly into your per-second calling wallet.</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <select value={voucherAmount} onChange={(e) => setVoucherAmount(e.target.value)} style={{ flex: 1, padding: "12px", backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                    <option value="50">50.00 SEK Standard VoIP Calling Voucher</option>
                    <option value="100">100.00 SEK Extended VoIP Calling Voucher</option>
                    <option value="200">200.00 SEK Executive Corridor Voucher</option>
                  </select>
                  <button type="submit" disabled={processing} style={{ padding: "12px 22px", backgroundColor: "#f59e0b", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                    {processing ? "Issuing..." : "Buy Calling Voucher"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MODULE 3: SACCO SAVINGS */}
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

          {/* MODULE 4: GLOBAL CONTINENTAL REMITTANCE */}
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

        {/* RECENT TRANSACTION & REMITTANCE AUDIT LEDGER */}
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
