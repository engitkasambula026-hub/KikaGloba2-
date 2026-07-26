"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function TermsAndConditionsPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#ffffff", fontFamily: "Arial, sans-serif", paddingBottom: "6px" }}>
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>⚖️ LEGAL COMPLIANCE CHARTER</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>
          ⬅️ Return Home
        </button>
      </header>

      {/* CORE TERMS PANEL */}
      <div style={{ maxWidth: "800px", margin: "40px auto", background: "#1e293b", padding: "40px", borderRadius: "16px", border: "1px solid #334155", lineHeight: "1.6" }}>
        <h1 style={{ color: "#ffffff", marginBottom: "4px" }}>Terms of Service & Ecosystem Rules</h1>
        <p style={{ color: "#94a3b8", fontSize: "14px", marginBottom: "30px" }}>Last Updated: July 2026 | KiKa Global Services Limited, Kampala, Uganda</p>

        <h3 style={sectionHeaderStyle}>1. Legal Definitions and Entity Structure</h3>
        <p style={paragraphStyle}>This website and its associated backend software modules are owned and operated by <strong>KiKa Global Services Limited</strong>, a commercial entity duly incorporated under the laws of the Republic of Uganda via the Uganda Registration Services Bureau (URSB).</p>

        <h3 style={sectionHeaderStyle}>2. Nature of Service (The Technology Interface Shield)</h3>
        <p style={{ ...paragraphStyle, color: "#f87171", fontWeight: "600" }}>
          ⚠️ CRITICAL REGULATORY DISCLOSURE: KiKa Global Services Limited operates strictly as a Software Infrastructure Interface Provider. KiKa is NOT a bank, NOT a licensed Tier-1 remittance operator, and NOT a microfinance institution. 
        </p>
        <p style={paragraphStyle}>
          All actual fund collections, international debit/credit card clearing, cross-border currency conversions, and local Mobile Money (MTN/Airtel Uganda) payouts are executed exclusively by our fully authorized and licensed partner payment aggregators (including but not limited to Flutterwave and Paystack) in compliance with the National Payment Systems (NPS) Act, 2020. At no point does diaspora capital land or sit inside KiKa's proprietary corporate bank account during transactional routing sequences.
        </p>

        <h3 style={sectionHeaderStyle}>3. Cooperative SACCO Subscription Rules</h3>
        <p style={paragraphStyle}>
          Existing established Savings and Credit Cooperative Organizations (SACCOs) subscribing to the KiKa platform must maintain valid registration with the Ministry of Trade, Industry and Cooperatives (MTIC) or hold an active operating license from the Uganda Microfinance Regulatory Authority (UMRA). KiKa reserves the absolute right to suspend or block any Sacco database routing node if regulatory compliance violations, money laundering flags, or fraudulent pooling acts are identified during audit sequences.
        </p>

        <h3 style={sectionHeaderStyle}>4. User Verification and Anti-Money Laundering (AML)</h3>
        <p style={paragraphStyle}>
          By submitting credentials via the KiKa Diaspora Registry Form, you warrant that all information—including host country residential statuses, passport serial registries, and employment data—is true and accurate. In accordance with the Anti-Money Laundering Act, 2013 of Uganda, any suspicious routing behaviors, artificial data inputs, or transaction pooling anomalies will result in immediate profile termination and escalation to the Financial Intelligence Authority (FIA).
        </p>

        <h3 style={sectionHeaderStyle}>5. Limitation of Liability</h3>
        <p style={paragraphStyle}>
          KiKa Global Services Limited shall not be liable for any operational delays, cellular network dropouts, unfulfilled push-PIN alerts, or transaction delivery anomalies caused by external telecommunication network operators, third-party banking failures, or localized regulatory policy adjustments.
        </p>

        <h3 style={sectionHeaderStyle}>6. Governing Law & Dispute Resolution</h3>
        <p style={paragraphStyle}>
          These Terms are governed strictly by the laws of the Republic of Uganda. Any structural disputes arising out of the execution of these services shall be settled via amicable mediation, failing which they shall be submitted to the exclusive jurisdiction of the High Court (Commercial Division) in Kampala, Uganda.
        </p>
      </div>
    </div>
  );
}

const sectionHeaderStyle = { color: "#34d399", fontSize: "16px", marginTop: "25px", borderBottom: "1px solid #334155", paddingBottom: "4px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
const paragraphStyle = { color: "#cbd5e1", fontSize: "14px", margin: "10px 0" };
