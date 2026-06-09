import React from "react";
import type { Metadata, Viewport } from "next";

// Global SEO and Web Application Identity Metadata System
export const metadata: Metadata = {
  title: "KIKA Global Web-Calling Platform",
  description: "Secure diaspora WebRTC calling gateway node terminal.",
};

// Fixed Viewport Matrix: Stops smartphones from zooming in when clicking keypad numbers
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        style={{ 
          margin: 0, 
          padding: 0, 
          backgroundColor: "#0f172a", 
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          minHeight: "100vh",
          WebkitFontSmoothing: "antialiased"
        }}
      >
        {children}
      </body>
    </html>
  );
}
