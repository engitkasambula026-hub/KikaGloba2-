export interface Office { id: string; flag: string; region: string; address: string; support: string; }
export interface Option { id: string; name: string; description: string; targetPath: string; }
export interface Category { categoryName: string; options: Option[]; }

export const kikaGlobalOffices: Office[] = [
  { id: "kla", flag: "🇺🇬", region: "East Africa Operational HQ (Kampala)", address: "Plot 12-14, Nakasero Road, Kampala, Uganda", support: "📞 Support Line: +256 414 kika_voip_trunk" },
  { id: "ldn", flag: "🇬🇧", region: "United Kingdom Diaspora Hub (London)", address: "Level 4, Canary Wharf Switchboards, London, UK", support: "📞 Trunk Link: +44 20 7946 0192" }
];

export const foundersLegacyData = {
  title: "📜 KiKa Sovereign Foundational Legacy Charter & Regional History",
  charterText: "Honoring the visionary milestones established by the KiKa co-founders, this ecosystem operates as a permanent bridge across cross-border financial canyons. The platform is strategically engineered to eliminate the macroeconomic wealth vulnerabilities transiting between international diaspora nodes and local East African savings societies (SACCOs). KiKa stands as a reliable, continuous trust framework protecting community wealth streams natively.",
  nodes: [
    { label: "📍 REGIONAL DATA SOVEREIGNTY", detail: "Multi-tenant database isolation mapped dynamically over serverless Neon PostgreSQL pooling rows." },
    { label: "📋 NITA-U FRAMEWORK COMPLIANCE", detail: "Strict Uganda PDPO data privacy laws, data encryption protocols, and sovereign storage parameters." },
    { label: "🔐 MASTER VALIDATION HOOKS", detail: "System policing layers anchored exclusively by verified Admin Master Profile nodes." }
  ]
};

export const ecosystemMenu: Category[] = [
  { 
    categoryName: "Registering Hub", 
    options: [
      { id: "reg-m", name: "Diaspora Membership Enrollment", description: "Initialize your comprehensive diaspora profile parameters (Passport Data, Host Country Domicile, GPS Coordinates) straight inside the live Neon database ledger.", targetPath: "/login" }, 
      { id: "reg-s", name: "Sacco Corporate Grouping", description: "Configure multi-signatory asset pooling accounts to clear joint cross-border investment tracks natively.", targetPath: "/login" }
    ] 
  },
  { 
    categoryName: "Financial Hub Services", 
    options: [
      { id: "fin-w", name: "Available Wallet Capital", description: "Monitor your transiting remittance assets and liquid capital values live with integrated clearinghouse bank reconciliation footprints.", targetPath: "/services/ledger" }, 
      { id: "fin-s", name: "Cooperative Sacco Shares", description: "Track your accumulated wealth accumulation share points valued natively at a statutory 10,000 UGX per unit allocation.", targetPath: "/services/ledger" }, 
      { id: "fin-e", name: "Trust Escrow Reserves", description: "Enforce automated compliance holds securing 25% of transiting remittance capital from network fraud vectors.", targetPath: "/services/ledger" }
    ] 
  },
  { 
    categoryName: "Business & Commerce", 
    options: [
      { id: "biz-t", name: "Cross-Border Trade Matrix", description: "Direct B2B import/export cargo clearinghouse routers enabling diaspora entrepreneurs to track physical freight manifests live.", targetPath: "/login" }, 
      { id: "biz-s", name: "Micro-SME Capital Funding", description: "Automated credit underwriting engines linking verified Sacco savings pools directly to low-interest commercial trade finance lines.", targetPath: "/login" }
    ] 
  },
  { 
    categoryName: "Ecosystem Portals", 
    options: [
      { id: "port-v", name: "Low-Tariff Full-Duplex VoIP Link", description: "Stream ultra-cheap voice tunnels directly to East African mobile networks over un-restricted, hardware-free WebRTC channels.", targetPath: "/services/voip" }, 
      { id: "port-j", name: "Job Matchmaker Engine", description: "Aggregated vacancy search node seamlessly connecting skilled diaspora professionals directly to cross-border institutional career paths.", targetPath: "/login" }
    ] 
  }
];
