// app/services/voip/page.tsx
"use client";

import React from 'react';
// 🛠️ ALIGNED FIXED PATH: Points cleanly up to your main shared components folder!
import WebRTCDialer from '@/app/components/WebRTCDialer'; 

export default function VoipServicePage() {
  return (
    <main style={{
      minHeight: "100vh", 
      backgroundColor: "#0F172A",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "20px",
      boxSizing: "border-box"
    }}>
      {/* Dialer isolated cleanly inside its standalone service sub-route view space */}
      <WebRTCDialer />
    </main>
  );
}
