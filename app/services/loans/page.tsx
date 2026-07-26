"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import LoanApplicationActionForm from "./LoanApplicationActionForm";

export interface LoanProduct {
  id: string;
  name: string;
  interestRateAnnual: number;
  maxAmountUGX: number;
  minSaccoShares: number;
  repaymentTermMonths: number;
  description: string;
}

const sandboxMockLoans: LoanProduct[] = [
  {
    id: "loan-1",
    name: "🌾 OWC Poultry & Livestock Mechanization Fund",
    interestRateAnnual: 5.5,
    maxAmountUGX: 20000000,
    minSaccoShares: 5000000,
    repaymentTermMonths: 24,
    description: "Low-rate capitalization credit lines to purchase commercial egg incubators, feed processing systems, or high-yield stock layers. Managed in alignment with Operation Wealth Creation frameworks."
  },
  {
    id: "loan-2",
    name: "🏛️ PDM Value-Addition & Micro-Processing Line",
    interestRateAnnual: 6.0,
    maxAmountUGX: 15000000,
    minSaccoShares: 3000000,
    repaymentTermMonths: 18,
    description: "Financing lines allocated for community-level manufacturing, packaging plants, milling equipment, and raw agricultural distribution pipelines backed by the Parish Development Model."
  },
  {
    id: "loan-3",
    name: "🏢 Diaspora Commercial Housing Construction Escrow",
    interestRateAnnual: 8.5,
    maxAmountUGX: 75000000,
    minSaccoShares: 20000000,
    repaymentTermMonths: 60,
    description: "Long-term infrastructural credit pools leveraging verified diaspora group savings records to finance commercial housing construction directly inside Uganda, fully audited by KiKa Global Services."
  }
];

function LoanHubContent() {
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<LoanProduct | null>(null);

  useEffect(() => {
    setProducts(sandboxMockLoans);
  }, []);

  return (
    <div style={{ display: "flex", flex: 1, gap: "30px", maxWidth: "1200px", margin: "20px auto", width: "100%", padding: "0 20px" }}>
      
      {/* LEFT COLUMN: LOAN PRESENTATION CARDS LOOP */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
        {products.map(loan => (
          <div key={loan.id} onClick={() => setSelectedProduct(loan)} style={{ background: "#1e293b", padding: "24px", borderRadius: "12px", border: selectedProduct?.id === loan.id ? "2px solid #34d399" : "1px solid #334155", cursor: "pointer", transition: "border 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ color: "#34d399", fontSize: "12px", fontWeight: "bold" }}>🚀 {loan.interestRateAnnual}% ANNUAL INTEREST</span>
              <span style={{ color: "#94a3b8", fontSize: "12px" }}>⏳ {loan.repaymentTermMonths} Months</span>
            </div>
            <h3 style={{ color: "#ffffff", margin: "0 0 6px 0", fontSize: "18px" }}>{loan.name}</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "0 0 12px 0", lineHeight: "1.4" }}>{loan.description.substring(0, 110)}...</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
              <span style={{ background: "rgba(52, 211, 153, 0.08)", color: "#34d399", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>Limit: {loan.maxAmountUGX.toLocaleString()} UGX</span>
              <span style={{ color: "#34d399", fontWeight: "bold" }}>Apply Parameters →</span>
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT COLUMN: ACTION COMPONENT */}
      <div style={{ flex: 1 }}>
        <LoanApplicationActionForm selectedProduct={selectedProduct} />
      </div>

    </div>
  );
}

export default function LoansServiceDashboardHub() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>📉 NATIONAL LOAN ACCESS HUB & REPAYMENT SYSTEM</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>⬅️ Return to Main Page</button>
      </header>
      <Suspense fallback={<div style={{ color: "#94a3b8", padding: "40px", textAlign: "center" }}>Loading Loan Allocation Arrays...</div>}>
        <LoanHubContent />
      </Suspense>
    </div>
  );
}
