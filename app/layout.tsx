import React from 'react';
import './globals.css'; // 🚀 FORCES LINK: Connects Tailwind directly to the app tree root

export const metadata = {
  title: 'Kika Global Outreach Platform',
  description: 'Diaspora infrastructure ecosystem networks',
};

// 🟢 ORIGINAL RESTORATION: Removed all rigid maximumScale and overflow-X restrictions
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 min-h-screen text-white font-sans m-0 p-0">
        {children}
      </body>
    </html>
  );
}
