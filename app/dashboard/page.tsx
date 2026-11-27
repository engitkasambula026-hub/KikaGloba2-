"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { STRIPE_PAYMENT_METHODS, AZ_COUNTRY_VOIP_RATES } from "../../lib/kika-directory";



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
const [paymentProvider, setPaymentProvider] = useState("Visa / Mastercard");
const [topupAmountSEK, setTopupAmountSEK] = useState("10");
const [voucherAmount, setVoucherAmount] = useState("5");
  const [rateSearch, setRateSearch] = useState("");
  const [selectedCorridor, setSelectedCorridor] = useState("ALL");
  const [gpsLocation, setGpsLocation] = useState<{ lat: string; lng: string; status: string }>({
    lat: "",
    lng: "",
    status: "Pin Ready"
  });

  function detectUserGpsPin() {
    if (!navigator.geolocation) {
      setGpsLocation({ lat: "", lng: "", status: "GPS Unsupported" });
      return;
    }
    setGpsLocation({ lat: "", lng: "", status: "Locating..." });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocation({
          lat: pos.coords.latitude.toFixed(5),
          lng: pos.coords.longitude.toFixed(5),
          status: "GPS Verified"
        });
      },
      () => {
        setGpsLocation({ lat: "", lng: "", status: "Permission Denied" });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
  const [remitChannel, setRemitChannel] = useState<"INTERNAL_MEMBER" | "MOBILE_MONEY" | "BANK_ACCOUNT">("MOBILE_MONEY");
  const [remitRecipientName, setRemitRecipientName] = useState("");
  const [remitRecipientId, setRemitRecipientId] = useState("");
  const [remitProviderBank, setRemitProviderBank] = useState("MTN MoMo Uganda (+256)");
  const [remitCurrency, setRemitCurrency] = useState("UGX");
  const [remitUsdAmount, setRemitUsdAmount] = useState("5");
  const [remitReceipt, setRemitReceipt] = useState<string>("");

  const LIVE_FX_PREVIEW: Record<string, number> = {
    UGX: 3720.0,
    KES: 129.5,
    SEK: 10.5,
    EUR: 0.92,
    GBP: 0.79,
    USD: 1.0
  };

  async function handleSendRemittance(e: React.FormEvent) {
    e.preventDefault();
    setProcessing(true);
    setRemitReceipt("");
    try {
      const res = await fetch("/api/remittance/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: userEmail,
          transferChannel: remitChannel,
          recipientName: remitRecipientName,
          recipientIdentifier: remitRecipientId,
          providerOrBank: remitProviderBank,
          targetCurrency: remitCurrency,
          amountUSD: remitUsdAmount
        })
      });
      const data = await res.json();
      setProcessing(false);
      if (data.success) {
        setRemitReceipt(
          `✅ Ref ${data.txReference} (${data.status}): Sent $${parseFloat(remitUsdAmount).toFixed(2)} USD → ${data.convertedAmount.toLocaleString()} ${data.targetCurrency}. New Wallet Balance: $${data.newBalanceUSD.toFixed(2)} USD`
        );
        loadCockpitData(userEmail);
      } else {
        alert(data.error || "Remittance transfer failed.");
      }
    } catch (err: any) {
      setProcessing(false);
      alert(err.message || "Network error during remittance.");
    }
  }

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
<div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "16px", padding: "22px", marginTop: "20px" }}>
  <h3 style={{ margin: "0 0 6px 0", color: "#38bdf8", fontSize: "17px" }}>
    💸 3. Continental Remittance & Linked Bank / Mobile Money Payouts (USD Base)
  </h3>
  <p style={{ margin: "0 0 16px 0", color: "#94a3b8", fontSize: "13px" }}>
    Send funds instantly from your USD Wallet to another KiKa Member (0% fee), Mobile Money (MTN MoMo / Airtel / M-Pesa), or Bank IBAN.
  </p>

  <form onSubmit={handleSendRemittance} style={{ display: "grid", gap: "12px" }}>
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <select
        value={remitChannel}
        onChange={(e) => {
          const val = e.target.value as "INTERNAL_MEMBER" | "MOBILE_MONEY" | "BANK_ACCOUNT";
          setRemitChannel(val);
          if (val === "INTERNAL_MEMBER") {
            setRemitProviderBank("KiKa Internal Wallet");
            setRemitCurrency("USD");
          } else if (val === "MOBILE_MONEY") {
            setRemitProviderBank("MTN MoMo Uganda (+256)");
            setRemitCurrency("UGX");
          } else {
            setRemitProviderBank("Swedbank / SEPA IBAN");
            setRemitCurrency("SEK");
          }
        }}
        style={{ flex: 1, minWidth: "200px", padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}
      >
        <option value="MOBILE_MONEY">📱 Mobile Money Wallet (MTN MoMo / Airtel / M-Pesa)</option>
        <option value="BANK_ACCOUNT">🏦 Bank Account / IBAN (Swedbank / Stanbic / SEPA)</option>
        <option value="INTERNAL_MEMBER">⚡ KiKa Member-to-Member Instant Transfer (0% Fee)</option>
      </select>

      <select
        value={remitProviderBank}
        onChange={(e) => setRemitProviderBank(e.target.value)}
        style={{ flex: 1, minWidth: "200px", padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}
      >
        {remitChannel === "MOBILE_MONEY" && (
          <>
            <option value="MTN MoMo Uganda (+256)">MTN MoMo Uganda (+256)</option>
            <option value="Airtel Money Uganda (+256)">Airtel Money Uganda (+256)</option>
            <option value="Safaricom M-Pesa Kenya (+254)">Safaricom M-Pesa Kenya (+254)</option>
          </>
        )}
        {remitChannel === "BANK_ACCOUNT" && (
          <>
            <option value="Swedbank Sweden (IBAN / Clearing)">Swedbank Sweden (IBAN / Clearing)</option>
            <option value="SEPA Eurozone Bank (IBAN)">SEPA Eurozone Bank (IBAN)</option>
            <option value="Stanbic Bank Uganda (SWIFT / Acct)">Stanbic Bank Uganda (SWIFT / Acct)</option>
            <option value="Equity Bank East Africa">Equity Bank East Africa</option>
          </>
        )}
        {remitChannel === "INTERNAL_MEMBER" && (
          <option value="KiKa Instant Ledger">KiKa Instant Ledger (Zero Fee)</option>
        )}
      </select>
    </div>

    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <input
        type="text"
        required
        placeholder="Beneficiary Full Name (e.g. Adam Kasambula)"
        value={remitRecipientName}
        onChange={(e) => setRemitRecipientName(e.target.value)}
        style={{ flex: 1, minWidth: "200px", padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}
      />
      <input
        type="text"
        required
        placeholder={
          remitChannel === "INTERNAL_MEMBER"
            ? "Recipient KiKa Email (e.g. subscriber01@kika-ecosystem.com)"
            : remitChannel === "MOBILE_MONEY"
            ? "Mobile Money Number (e.g. +256770000000)"
            : "Bank IBAN or Account Number (e.g. SE45 8000...)"
        }
        value={remitRecipientId}
        onChange={(e) => setRemitRecipientId(e.target.value)}
        style={{ flex: 1, minWidth: "220px", padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}
      />
    </div>

    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
      <input
        type="number"
        min="1"
        step="0.01"
        required
        value={remitUsdAmount}
        onChange={(e) => setRemitUsdAmount(e.target.value)}
        placeholder="Amount in USD"
        style={{ flex: 1, minWidth: "140px", padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}
      />
      <select
        value={remitCurrency}
        onChange={(e) => setRemitCurrency(e.target.value)}
        style={{ width: "130px", padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}
      >
        <option value="UGX">UGX (Uganda)</option>
        <option value="KES">KES (Kenya)</option>
        <option value="SEK">SEK (Sweden)</option>
        <option value="EUR">EUR (Europe)</option>
        <option value="GBP">GBP (UK)</option>
        <option value="USD">USD (Dollar)</option>
      </select>
      <div style={{ flex: 1, minWidth: "200px", fontSize: "13px", color: "#10b981", fontWeight: 700 }}>
        Recipient Gets: {((parseFloat(remitUsdAmount || "0")) * (LIVE_FX_PREVIEW[remitCurrency] || 1)).toLocaleString()} {remitCurrency}
      </div>
    </div>

    <button
      type="submit"
      disabled={processing}
      style={{ padding: "13px", borderRadius: "10px", background: "linear-gradient(90deg, #06b6d4, #10b981)", color: "#020617", fontWeight: 800, border: "none", cursor: "pointer" }}
    >
      {processing ? "Processing Transfer..." : `Execute Remittance ($${parseFloat(remitUsdAmount || "0").toFixed(2)} USD)`}
    </button>
  </form>

  {remitReceipt && (
    <div style={{ marginTop: "14px", padding: "12px", borderRadius: "8px", background: "#064e3b", border: "1px solid #10b981", color: "#a7f3d0", fontSize: "13px", fontWeight: 600 }}>
      {remitReceipt}
    </div>
  )}
</div>


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
    if (!saccoAmount || parseFloat(saccoAmount) <= 0) return alert("Enter a valid USD amount.");
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
    if (!remitAmountSEK || parseFloat(remitAmountSEK) <= 0) return alert("Enter a valid USD amount.");
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
<button
  type="button"
  onClick={detectUserGpsPin}
  style={{ padding: "8px 14px", borderRadius: "999px", background: "#0f172a", border: "1px solid #06b6d4", color: "#38bdf8", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
>
  📍 {gpsLocation.lat ? `${gpsLocation.lat}, ${gpsLocation.lng}` : gpsLocation.status}
</button>

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
      alert(`📞 Call Ended (${data.billedSeconds}s). Billed: ${data.totalChargeSEK.toFixed(4)} USD. Remaining VoIP Balance: ${data.remainingVoipSEK.toFixed(2)} USD`);
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
          <span style={{ fontSize: "11px", color: "#34d399", fontWeight: "bold", fontFamily: "monospace" }}>[ SWEDEN USD SPRINGBOARD NODE ]</span>
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
              🟢 {profile?.account_status || "ACTIVE"} | Base: Sweden (USD)
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            <div style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Cooperative SACCO & Cash Balance</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#10b981", marginTop: "6px" }}>
                {parseFloat(profile?.savings_balance_sek || "0").toFixed(2)} <span style={{ fontSize: "14px" }}>USD</span>
              </div>
            </div>
            <div style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "8px", border: "1px solid #334155" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>Low-Tariff VoIP Calling Credit</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f59e0b", marginTop: "6px" }}>
                {currentVoipWallet.toFixed(2)} <span style={{ fontSize: "14px" }}>USD</span>
                

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
            <option value="VOIP_VOUCHER">💳 2. Wallet Payment Top-Up & 50 USD / 100 USD VoIP Vouchers</option>
            <option value="SACCO_POOL">🏦 3. Cooperative SACCO Savings & Capital Deposits (USD)</option>
            <option value="GLOBAL_REMITTANCE">🌐 4. Global Continental Remittance (Springboard: Sweden USD)</option>
          </select>

          {/* MODULE 1: WEBRTC PER-SECOND DIALER & DESTINATION RATE DRAWER */}
          {selectedService === "WEBRTC_DIALER" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ margin: 0, color: "#34d399" }}>📞 WebRTC Per-Second Browser Dialer</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Select your current location and destination country to inspect live per-second USD tariffs before dialing.</p>
         {rateDrawerOpen && (
           <div style={{ backgroundColor: "#0f172a", padding: "16px", borderRadius: "10px", border: "1px solid #38bdf8", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
             <div>
               <div style={{ fontSize: "11px", color: "#38bdf8", fontWeight: "bold", textTransform: "uppercase" }}>
                 📊 Active Corridor Rate: {originCountry} ➔ {callDestCountry} ({selectedCallTariff.region})
               </div>
               <div style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", marginTop: "4px" }}>
                 {ratePerSecSEK.toFixed(4)} USD / second
               </div>
               <div style={{ fontSize: "12px", color: "#34d399", marginTop: "4px" }}>
                 ⏱️ Available Calling Credit: <strong>{currentVoipWallet.toFixed(2)} USD</strong>
               </div>
             </div>
             <details style={{ marginTop: "18px", background: "#090d16", border: "1px solid #1e293b", borderRadius: "12px", padding: "14px" }}>
  <summary style={{ cursor: "pointer", fontWeight: 700, color: "#38bdf8", fontSize: "14px" }}>
    🌍 A–Z Global Country Calling Directory & Twilio Per-Minute Rates ({AZ_COUNTRY_VOIP_RATES.length} Countries)
  </summary>
  <div style={{ marginTop: "12px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
    <input
      type="text"
      placeholder="Search A–Z country or +code (e.g. Uganda, Sweden, +256)..."
      value={rateSearch}
      onChange={(e) => setRateSearch(e.target.value)}
      style={{ flex: 2, minWidth: "200px", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "#f8fafc", fontSize: "13px" }}
    />
    <select
      value={selectedCorridor}
      onChange={(e) => setSelectedCorridor(e.target.value)}
      style={{ flex: 1, minWidth: "150px", padding: "10px", borderRadius: "8px", background: "#0f172a", border: "1px solid #334155", color: "#f8fafc", fontSize: "13px" }}
    >
      <option value="ALL">All Regions (A–Z)</option>
      <option value="Africa">Africa</option>
      <option value="Europe">Europe</option>
      <option value="North America">North America</option>
      <option value="Asia & Middle East">Asia & Middle East</option>
      <option value="Oceania & Americas">Oceania & Americas</option>
    </select>
  </div>
  <div style={{ marginTop: "12px", maxHeight: "260px", overflowY: "auto", display: "grid", gap: "6px" }}>
    {AZ_COUNTRY_VOIP_RATES.filter((c) => {
      const matchesRegion = selectedCorridor === "ALL" || c.corridor === selectedCorridor;
      const q = rateSearch.toLowerCase().trim();
      const matchesQuery = !q || c.country.toLowerCase().includes(q) || c.dialPrefix.includes(q);
      return matchesRegion && matchesQuery;
    }).map((item) => (
      <div
        key={item.code}
        onClick={() => setDialPhoneNumber(item.dialPrefix)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", background: "#0f172a", border: "1px solid #1e293b", cursor: "pointer", fontSize: "13px" }}
      >
        <span>
          <strong style={{ color: "#f8fafc" }}>{item.country}</strong>{" "}
          <span style={{ color: "#38bdf8", fontWeight: 700 }}>({item.dialPrefix})</span>{" "}
          <span style={{ color: "#64748b", fontSize: "11px" }}>• {item.corridor}</span>
        </span>
        <span style={{ color: "#10b981", fontWeight: 700 }}>
          ${item.ratePerMinUSD.toFixed(2)} USD/min (${(item.ratePerMinUSD / 60).toFixed(4)}/sec)
        </span>
      </div>
    ))}
  </div>
</details>

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
                      {ratePerSecSEK.toFixed(4)} USD / second <span style={{ fontSize: "13px", color: "#94a3b8", fontWeight: "normal" }}>({selectedCallTariff.rateMinSEK.toFixed(2)} USD / min)</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "#34d399", marginTop: "4px" }}>
                      ⏱️ Your {currentVoipWallet.toFixed(2)} USD VoIP Credit covers ~<strong>{maxMinutesAvailable} mins</strong> to {callDestCountry}
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
                    🔴 Hang Up ({callSeconds}s • {(callSeconds * ratePerSecSEK).toFixed(3)} USD)
                  </button>
                )}
              </div>
              <div style={{ fontSize: "12px", color: callActive ? "#34d399" : "#94a3b8", fontFamily: "monospace" }}>
                Status: {callStatusText}
              </div>
            </div>
          )}
          {/* MODULE 2: WALLET TOP-UP & 50 USD / 100 USD VOIP VOUCHERS */}
          {selectedService === "VOIP_VOUCHER" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* STEP A: EXTERNAL WALLET PAYMENT TO KIKA ACCOUNT */}
              <form onSubmit={handleWalletTopup} style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "10px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ margin: 0, color: "#38bdf8", fontSize: "16px" }}>💳 Step A: Fund KiKa Account from External Wallet Provider</h3>
                <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Transfer funds from your mobile money, Swish, or bank card into your KiKa USD balance.</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <select value={paymentProvider} onChange={(e) => setPaymentProvider(e.target.value)} style={{ padding: "12px", backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                    <option value="Swish Sweden">🇸🇪 Swish Sweden (USD Instant)</option>
                    <option value="MTN / Airtel Mobile Money">🇺🇬 MTN / Airtel Mobile Money</option>
                    <option value="Visa / Mastercard">💳 Visa / Mastercard Global</option>
                    <option value="SEPA / Nordic Bank">🏦 SEPA / Nordic Bank Transfer</option>
                  </select>
                  <select value={topupAmountSEK} onChange={(e) => setTopupAmountSEK(e.target.value)} style={{ flex: 1, padding: "12px", backgroundColor: "#1e293b", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
               <option value="5">$5.00 USD Global Credit Top-Up</option>
<option value="10">$10.00 USD Global Credit Top-Up</option>
<option value="25">$25.00 USD Diaspora Bundle Top-Up</option>
<option value="50">$50.00 USD Enterprise Credit Top-Up</option>

                  </select>
                  <button type="submit" disabled={processing} style={{ padding: "12px 22px", backgroundColor: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                    {processing ? "Processing..." : "Deposit Wallet Credit"}
                  </button>
                </div>
              </form>

              {/* STEP B: PURCHASE 50 USD / 100 USD CALLING VOUCHER */}
              <form onSubmit={handleVoucherPurchase} style={{ backgroundColor: "#0f172a", padding: "18px", borderRadius: "10px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "12px" }}>
                <h3 style={{ margin: 0, color: "#f59e0b", fontSize: "16px" }}>🎙️ Step B: Convert USD Balance into VoIP Calling Vouchers</h3>
                <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>Allocate 50 USD or 100 USD vouchers from your KiKa balance directly into your per-second calling wallet.</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <select value={voucherAmount} onChange={(e) => setVoucherAmount(e.target.value)} style={{ flex: 1, padding: "12px", borderRadius: "8px", background: "#090d16", border: "1px solid #334155", color: "#f8fafc" }}>
  <option value="5">$5.00 USD Standard VoIP Calling Voucher</option>
  <option value="10">$10.00 USD Extended VoIP Calling Voucher</option>
  <option value="25">$25.00 USD Executive Corridor Voucher</option>
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
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Deposits automatically increase your USD pool balance and raise your algorithmic credit score.</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <select value={saccoType} onChange={(e) => setSaccoType(e.target.value)} style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                  <option value="DEPOSIT">📥 Deposit Funds (USD)</option>
                  <option value="WITHDRAWAL">📤 Withdraw Funds (USD)</option>
                </select>
                <input type="number" placeholder="Amount in USD (e.g. 500)" value={saccoAmount} onChange={(e) => setSaccoAmount(e.target.value)} required style={{ flex: 1, padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }} />
                <button type="submit" disabled={processing} style={{ padding: "12px 24px", backgroundColor: "#10b981", color: "#022c22", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                  {processing ? "Settling..." : "Execute SACCO Entry"}
                </button>
              </div>
            </form>
          )}

          {/* MODULE 4: GLOBAL CONTINENTAL REMITTANCE */}
          {selectedService === "GLOBAL_REMITTANCE" && (
            <form onSubmit={handleRemittanceSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ margin: 0, color: "#38bdf8" }}>🌐 Global Continental Remittance (Springboard: Sweden USD)</h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>Send instant cross-border transfers from your USD balance to major countries across all continents.</p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
                <select value={destCountry} onChange={(e) => setDestCountry(e.target.value)} style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }}>
                  <optgroup label="🌍 Africa">
                    <option value="Uganda">Uganda (UGX)</option>
                    <option value="Kenya">Kenya (KES)</option>
                    <option value="Nigeria">Nigeria (NGN)</option>
                    <option value="South Africa">South Africa (ZAR)</option>
                  </optgroup>
                  <optgroup label="🇪🇺 Europe">
                    <option value="Sweden (Local)">Sweden (USD)</option>
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
                <input type="number" placeholder="Send Amount (USD)" value={remitAmountSEK} onChange={(e) => setRemitAmountSEK(e.target.value)} required style={{ padding: "12px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #475569", borderRadius: "8px" }} />
              </div>

              <div style={{ padding: "12px", backgroundColor: "#0f172a", borderRadius: "8px", border: "1px dashed #38bdf8", fontSize: "13px", color: "#bae6fd" }}>
                💱 <strong>Live Springboard Conversion ({activeCorridor.region} – {destCountry}):</strong> Recipient receives <strong>{previewConverted} {activeCorridor.currency}</strong> (Rate: 1 USD = {activeCorridor.rateFromSEK} {activeCorridor.currency})
              </div>

              <button type="submit" disabled={processing} style={{ padding: "14px", backgroundColor: "#38bdf8", color: "#0f172a", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}>
                {processing ? "Dispatching..." : `Send Remittance from Sweden (USD) to ${destCountry}`}
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
                  <span>🌐 [{r.continental_region} / {r.destination_country}] Sent <strong>{parseFloat(r.amount_sek).toFixed(2)} USD</strong> → <strong>{parseFloat(r.converted_amount).toLocaleString()} {r.target_currency}</strong> ({r.recipient_name})</span>
                  <span style={{ color: "#38bdf8" }}>{r.tx_reference}</span>
                </div>
              ))}
              {ledger.map((tx: any, idx: number) => (
                <div key={`tx-${idx}`} style={{ padding: "10px", backgroundColor: "#0f172a", borderRadius: "6px", border: "1px solid #334155", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <span>💳 [{tx.tx_type}] {parseFloat(tx.amount_sek).toFixed(2)} USD | Balance Snapshot: {parseFloat(tx.balance_snapshot_sek).toFixed(2)} USD</span>
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
