"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssetRegistryPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [uiMsg, setUiMessage] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);

  // 📋 Asset Intake States
  const [assetTitle, setAssetTitle] = useState<string>("");
  const [assetType, setAssetType] = useState<string>("REAL_ESTATE");
  const [district, setDistrict] = useState<string>("Kampala");
  const [valuation, setValuation] = useState<string>("");
  const [titleNumber, setTitleNumber] = useState<string>("");

  useEffect(() => {
    const hasActiveSession = document.cookie.includes("kika_session_active=true");
    setIsLoggedIn(hasActiveSession);

    const activeCookies = document.cookie.split("; ");
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    if (emailCookie) {
      setUserEmail(decodeURIComponent(emailCookie.split("=")[1]));
    } else {
      setUserEmail("audit02@kikaglobal.com");
    }
  }, []);

  const handleAssetRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("🔒 Authorization Refused: Please sign in to declare national asset properties.");
      router.push("/login");
      return;
    }

    setIsPending(true);
    setUiMessage("⏳ Logging property configurations onto secure asset ledger rows...");

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "REGISTER_DIASPORA_ASSET",
          email: userEmail,
          assetTitle: assetTitle.trim(),
          assetType, district: district.trim(), valuation, titleNumber: titleNumber.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        setUiMessage(`` + data.message);
        alert(`🎉 Success! "${assetTitle}" successfully queued for national certification audit verification.`);
        setAssetTitle("");
        setValuation("");
        setTitleNumber("");
      } else {
        setUiMessage(`❌ Intake Drop: ${data.error}`);
      }
    } catch (err: any) {
      setUiMessage(`🚧 Link circuit fail: ${err.message}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "#ffffff", fontFamily: "Arial, sans-serif" }}>
      
      {/* HEADER NAVIGATION HUB */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "16px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🛡️ DIASPORA NATIONAL ASSET SHIELD</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "6px 14px", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: "bold", outline: "none" }}>⬅️ Home Base</button>
      </header>

      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>National Asset Declaration Vault</h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>Immutably audit, shield, and register your cross-border capital holdings, lands, and investments straight to the official database network ledger [1.5].</p>
        </div>

        {uiMsg && (
          <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#020617", border: "1px solid #34d399", borderRadius: "6px", color: "#34d399", textAlign: "center", fontFamily: "monospace", fontSize: "12.5px", fontWeight: "bold" }}>{uiMsg}</div>
        )}

        <form onSubmit={handleAssetRegistration} style={{ backgroundColor: "#1e293b", padding: "30px", borderRadius: "12px", border: "1px solid #334155", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div>
            <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Asset Title Declaration Title</label>
            <input required type="text" value={assetTitle} onChange={(e) => setAssetTitle(e.target.value)} placeholder="e.g. 5-Acre Commercial Vanilla Orchard" style={{ width: "100%", padding: "11px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Asset Property Classification</label>
              <select value={assetType} onChange={(e) => setAssetType(e.target.value)} style={{ width: "100%", padding: "11px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", cursor: "pointer", outline: "none" }}>
                <option value="REAL_ESTATE">🏢 Real Estate / Commercial Housing</option>
                <option value="LAND">🌱 Agricultural Land / Plots</option>
                <option value="AGRICULTURAL_FARM">🌾 Active Crop Production Blocks</option>
                <option value="COMMERCIAL">⚙️ Industrial Machinery & Business Assets</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Location District (Uganda Base)</label>
              <input required type="text" value={district} onChange={(e) => setDistrict(e.target.value)} placeholder="e.g. Wakiso / Mukono / Gulu" style={{ width: "100%", padding: "11px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Estimated Asset Valuation (\$ USD)</label>
              <input required type="number" min="1" value={valuation} onChange={(e) => setValuation(e.target.value)} placeholder="e.g. 45000" style={{ width: "100%", padding: "11px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", color: "#94a3b8", fontWeight: "bold", marginBottom: "6px" }}>Official Ministry Land Title Number (Optional)</label>
              <input type="text" value={titleNumber} onChange={(e) => setTitleNumber(e.target.value)} placeholder="e.g. Instrument No. WAK-45920" style={{ width: "100%", padding: "11px", background: "#0f172a", border: "1px solid #334155", borderRadius: "6px", color: "#ffffff", fontSize: "13px", boxSizing: "border-box", outline: "none" }} />
            </div>
          </div>

          <button type="submit" disabled={isPending} style={{ width: "100%", padding: "12px", backgroundColor: "#34d399", color: "#0f172a", border: "none", borderRadius: "6px", fontWeight: "bold", fontSize: "13px", cursor: isPending ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "0.5px", outline: "none", marginTop: "10px" }}>Authorize & Commit Property to Registry Shield</button>

        </form>
      </div>
    </div>
  );
}
