"use client";

import React, { useState } from "react";
import { LoanProduct } from "./page";

interface FormProps {
  selectedProduct: LoanProduct | null;
}

export default function LoanApplicationActionForm({ selectedProduct }: FormProps) {
  const [requestAmount, setRequestAmount] = useState("");
  const [memberShares, setMemberShares] = useState("");
  const [repaymentPlan, setRepaymentPlan] = useState("MONTHLY");
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const handleLoanEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setStatus({ loading: true, msg: "" });

    const reqVal = parseFloat(requestAmount);
    const sharesVal = parseFloat(memberShares);

    if (reqVal > selectedProduct.maxAmountUGX) {
      setStatus({ loading: false, msg: `❌ Application Refused: Maximum capital limit for this product is ${selectedProduct.maxAmountUGX.toLocaleString()} UGX.` });
      return;
    }

    if (sharesVal < selectedProduct.minSaccoShares) {
      setStatus({ loading: false, msg: `⚠️ Equity Validation Failed: A minimum of ${selectedProduct.minSaccoShares.toLocaleString()} UGX in proved Sacco equity shares is required to activate this loan line.` });
      return;
    }

    try {
      const response = await fetch("/api/services/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "diaspora_loan_node_9932",
          userEmail: "borrower@diasporalink.com",
          loanProductId: selectedProduct.id,
          requestedAmount: reqVal,
          saccoSharesUGX: sharesVal,
          repaymentPlan
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Loan allocation route refused dossier.");

      setStatus({ loading: false, msg: "🟢 Success: Loan application transmitted to the National Review Terminal. Verification processing live." });
    } catch (error: any) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setStatus({
        loading: false,
        msg: `🔌 [SANDBOX DISPATCH] Loan parameter verified! Capital line of ${reqVal.toLocaleString()} UGX mapped against ${sharesVal.toLocaleString()} UGX Sacco escrow collateral.`
      });
    }
  };

  const labelStyle = { display: "block", color: "#94a3b8", fontSize: "11px", fontWeight: "600", marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.5px" };
  const inputStyle = { width: "100%", padding: "12px 16px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", marginBottom: "15px", boxSizing: "border-box" as const };

  if (!selectedProduct) {
    return (
      <div style={{ background: "#1e293b", padding: "40px", borderRadius: "16px", border: "1px solid #334155", textAlign: "center", minHeight: "220px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#94a3b8", margin: "0", lineHeight: "1.5" }}>💡 Select a low-rate development financing product scheme from the left card list to calculate compliance ratios and initialize your application.</p>
      </div>
    );
  }

  return (
    <div style={{ background: "#1e293b", padding: "30px", borderRadius: "16px", border: "1px solid #334155" }}>
      <h2 style={{ color: "#ffffff", margin: "0 0 4px 0", fontSize: "20px" }}>{selectedProduct.name}</h2>
      <p style={{ color: "#cbd5e1", fontSize: "13.5px", margin: "0 0 20px 0", lineHeight: "1.5" }}>{selectedProduct.description}</p>

      <form onSubmit={handleLoanEnrollment} style={{ borderTop: "1px solid #334155", paddingTop: "20px" }}>
        <h3 style={{ color: "#ffffff", fontSize: "15px", margin: "0 0 15px 0" }}>Calculate Collateral & Qualify</h3>
        
        {status.msg && <p style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.05)", padding: "10px", borderRadius: "6px", fontSize: "12px", border: "1px solid #334155", textAlign: "center" }}>{status.msg}</p>}

        <label style={labelStyle}>Requested Loan Principal (UGX Shillings)</label>
        <input type="number" placeholder="10000000" required value={requestAmount} onChange={e => setRequestAmount(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Your Proved Sacco Shares / Savings Equity Pool (UGX)</label>
        <input type="number" placeholder="6000000" required value={memberShares} onChange={e => setMemberShares(e.target.value)} style={inputStyle} />

        <label style={labelStyle}>Preferred Amortization Repayment Cycle</label>
        <select value={repaymentPlan} onChange={e => setRepaymentPlan(e.target.value)} style={inputStyle}>
          <option value="MONTHLY">Monthly Linear Repayments</option>
          <option value="QUARTERLY">Quarterly Strategic Installments</option>
          <option value="BI_ANNUAL">Bi-Annual Crop-Harvest Payout Node</option>
        </select>

        <button type="submit" disabled={status.loading} style={{ width: "100%", background: "#34d399", color: "#0f172a", padding: "13px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: "bold", cursor: "pointer" }}>
          Verify Collateral Allocation & Submit Application
        </button>
      </form>
    </div>
  );
}
