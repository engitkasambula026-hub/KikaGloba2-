import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kika Global Ventures Hub",
  description: "Cross-Border Diaspora Ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "#ffffff" }}>
      <body style={{ margin: 0, backgroundColor: "#ffffff", color: "#0f172a" }}>
        {children}
      </body>
    </html>
  );
}
