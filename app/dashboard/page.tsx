'use client';
import React, { useState } from 'react';

export default function DashboardPage() {
  // Balance State Management
  const [balance, setBalance] = useState(2500000); // UGX balance example
  const [transactions, setTransactions] = useState([
    { id: 'TXN-102', target: 'Alice Namubiru', amount: '- UGX 150,000', status: 'Completed', date: 'Today' },
    { id: 'TXN-101', target: 'Kika Jobs Escrow', amount: '+ UGX 500,000', status: 'Completed', date: 'Yesterday' },
  ]);

  // Form State
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!recipient || isNaN(numAmount) || numAmount <= 0) return;

    // Deduct money updates
    setBalance(prev => prev - numAmount);
    // Log new dynamic row entry
    setTransactions([
      {
        id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
        target: recipient,
        amount: `- UGX ${numAmount.toLocaleString()}`,
        status: 'Processing',
        date: 'Just now'
      },
      ...transactions
    ]);
    // Clear Form inputs safely
    setRecipient('');
    setAmount('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Workspace Dashboard</h1>
        <p className="text-sm text-gray-500">Central command interface for jobs and financial flows.</p>
      </div>

      {/* Main Grid Layout layout panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Financial Vault Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card Module 1: Live Balances */}
          <div className="bg-gradient-to-br from-indigo-700 to-blue-600 text-white p-6 rounded-2xl shadow">
            <p className="text-indigo-200 text-xs font-semibold tracking-wider uppercase">Available Liquidity Vault</p>
            <h2 className="text-4xl font-extrabold mt-1">UGX {balance.toLocaleString()}</h2>
            <div className="mt-4 flex gap-4 text-xs text-indigo-100">
              <div>📈 Daily Limit: Max Base</div>
              <div>🔒 Encrypted Node Secure</div>
            </div>
          </div>

          {/* Card Module 2: Send Money Execution Engine */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Execute Kika Rapid Remittance</h3>
            <form onSubmit={handleTransfer} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Recipient Name / Account Node</label>
                <input required type="text" value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full border p-2 rounded-md" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Amount (UGX)</label>
                <input required type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border p-2 rounded-md" placeholder="Amount value" />
              </div>
              <button type="submit" className="md:col-span-2 bg-gray-900 text-white font-medium py-2 rounded-md hover:bg-black transition text-sm">
                Authorize Immediate Liquidity Release
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Operational Tracking Ledger Panels */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Live Transaction Ledger</h3>
          <div className="space-y-4">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex justify-between items-center pb-3 border-b last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{txn.target}</p>
                  <p className="text-xs text-gray-400">{txn.id} • {txn.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.amount}
                  </p>
                  <span className="inline-block text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-0.5">
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
