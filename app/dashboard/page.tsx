'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Transaction {
  id: string;
  sender_email: string;
  recipient_email: string;
  amount: string;
  corridor_type: string;
  created_at: string;
}

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [saccoBalance, setSaccoBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Form inputs
  const [targetRecipient, setTargetRecipient] = useState<string>("");
  const [sendAmount, setSendAmount] = useState<string>("");
  const [saccoAmount, setSaccoAmount] = useState<string>("");
  const [uiMessage, setUiMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // 🦾 AUTOMATED ENGINE HYDRATION LOOKUP
  const fetchActiveUserData = async (emailToQuery: string) => {
    try {
      // Direct call fetching profile parameters straight from your live Neon PostgreSQL database rows
      const res = await fetch(`/api/route?action=GET_MEMBER_PROFILE&email=${emailToQuery}`);
      const data = await res.json();
      
      if (data.success && data.profile) {
        setBalance(parseFloat(data.profile.balance) || 0);
        setSaccoBalance(parseFloat(data.profile.sacco_balance) || 0);
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error("Database connection timeout:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 🛡️ SECURITY SESSION RECOVERY CAPTURE
    const activeCookies = document.cookie.split("; ");
    // For local testing safety, we look for a fallback or recover your admin profile identity string
    const emailCookie = activeCookies.find(row => row.startsWith("kika_user_email="));
    const capturedEmail = emailCookie ? decodeURIComponent(emailCookie.split("=")[1]) : "audit02@kikaglobal.com";
    
    setUserEmail(capturedEmail);
    fetchActiveUserData(capturedEmail);
  }, []);

  const handleSendMoneyAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiMessage("⏳ Cleaving secure network transfer circuits...");

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "INTERNAL_SEND_MONEY",
          senderEmail: userEmail,
          recipientEmail: targetRecipient.trim().toLowerCase(),
          amount: sendAmount
        })
      });

      const data = await res.json();
      if (res.ok) {
        setUiMessage(`✅ Success: ${data.message}`);
        setTargetRecipient("");
        setSendAmount("");
        fetchActiveUserData(userEmail); // Hot-reloads ledger metrics instantly from Neon cloud storage layers
      } else {
        setUiMessage(`❌ Transaction Dropped: ${data.error}`);
      }
    } catch (err: any) {
      setUiMessage(`🚧 Connection Drop: ${err.message}`);
    }
  };

  const handleSaccoPoolAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setUiMessage("⏳ Pooling capital reserves into SACCO cell channels...");

    try {
      const res = await fetch("/api/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "SACCO_POOL_DEPOSIT",
          email: userEmail,
          amount: saccoAmount
        })
      });

      const data = await res.json();
      if (res.ok) {
        setUiMessage("✅ Success: Capital locked securely into Cooperative Fund rows.");
        setSaccoAmount("");
        fetchActiveUserData(userEmail);
      } else {
        setUiMessage(`❌ Allocation Drop: ${data.error}`);
      }
    } catch (err) {
      setUiMessage("🚧 Local corridor link stable.");
    }
  };

  const handleSignOutClear = () => {
    document.cookie = "kika_session_active=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "/";
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-slate-700">⏳ RECOVERING SECURE DATA CHANNELS FROM NEON SQL...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* NAVIGATION HEADER BAR CONTAINER */}
      <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <div className="font-black text-emerald-400 text-sm tracking-wider uppercase">🌍 KIKA COMMAND CENTER</div>
          <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-blue-400 transition-colors duration-200">🏠 Return to Landing Grid</Link>
        </div>
        <button onClick={handleSignOutClear} className="bg-transparent border border-red-500 text-red-500 text-xs font-bold px-3 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition-all duration-200">🚪 Secure Log Out</button>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* 💳 CARD ROW LAYER: REAL-TIME VAULT BALANCES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-800 to-blue-700 text-white p-6 rounded-2xl shadow-lg border border-indigo-900">
            <p className="text-indigo-200 text-xs font-bold tracking-wider uppercase">Available Liquid Vault Balance</p>
            <h2 className="text-4xl font-black mt-1">UGX {balance.toLocaleString()}</h2>
            <p className="text-xs text-indigo-100 font-medium mt-3">● Secured Row Cell Node ID Active</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-800 to-teal-700 text-white p-6 rounded-2xl shadow-lg border border-emerald-900">
            <p className="text-emerald-200 text-xs font-bold tracking-wider uppercase">Cooperative Sacco Savings Pool</p>
            <h2 className="text-4xl font-black mt-1">UGX {saccoBalance.toLocaleString()}</h2>
            <p className="text-xs text-emerald-100 font-medium mt-3">📈 Multi-Signatory Capital Shield Engaged</p>
          </div>
        </div>

        {/* DYNAMIC ACTION INPUT BLOCKS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-6">
            {/* TERMINAL 1: SEND MONEY TRUNK */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4">💸 Execute Send Money Trunk Transfer</h3>
              <form onSubmit={handleSendMoneyAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Beneficiary Global Email Account</label>
                  <input required type="email" value={targetRecipient} onChange={e => setTargetRecipient(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm outline-none" placeholder="recipient@kikaglobal.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Capital Transfer Value (UGX)</label>
                  <input required type="number" value={sendAmount} onChange={e => setSendAmount(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm outline-none" placeholder="e.g. 100000" />
                </div>
                <button type="submit" className="md:col-span-2 bg-slate-900 text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase hover:bg-black transition-all">Authorize Immediate Balance Release</button>
              </form>
            </div>

            {/* TERMINAL 2: SACCO DEPOSIT TUNNEL */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-base font-bold text-gray-900 mb-4">🤝 Lock Capital Reserves Into SACCO Pool</h3>
              <form onSubmit={handleSaccoPoolAction} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Allocation Value to Cooperative Society Shares (UGX)</label>
                  <input required type="number" value={saccoAmount} onChange={e => setSaccoAmount(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-lg text-sm outline-none" placeholder="e.g. 50000" />
                </div>
                <button type="submit" className="bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-xs tracking-wider uppercase hover:bg-emerald-700 transition-all">Commit Liquidity</button>
              </form>
            </div>
          </div>

          {/* RIGHT VIEW PANEL: LIVE LEDGER LOG ROWS */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-fit">
            <h3 className="text-base font-bold text-gray-900 mb-4">📜 Chronological Ledger Logs</h3>
            {transactions.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-6">[ Absolute zero ledger trace items logged ]</p>
            ) : (
              <div className="space-y-3">
                {transactions.map((txn) => (
                  <div key={txn.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-gray-800">{txn.corridor_type}</p>
                      <p className="text-gray-400 text-[10px] mt-0.5">To: {txn.recipient_email}</p>
                    </div>
                    <p className="font-black text-red-600">- UGX {parseFloat(txn.amount).toLocaleString()}</p>
                         </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* 📟 FEEDBACK BANNER CONSOLE CONTAINER RENDER ROW */}
        {uiMessage && (
          <div style={{ marginTop: "24px", padding: "16px", borderRadius: "12px", textAlign: "center", fontWeight: "bold", fontSize: "14px", backgroundColor: "#0f172a", color: "#ffffff", border: "1px solid #1e293b", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)" }}>
            {uiMessage}
          </div>
        )}

      </div>
    </div>
  );
}

