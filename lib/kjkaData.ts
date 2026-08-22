export interface Office { id: string; flag: string; region: string; address: string; support: string; }
export interface Option { id: string; name: string; description: string; targetPath: string; }
export interface Category { categoryName: string; options: Option[]; }

export const kikaGlobalOffices: Office[] = [
  { id: "kla", flag: "🇺🇬", region: "East Africa Operational HQ (Kampala)", address: "Plot 12-14, Nakasero Road, Nakasero, Kampala, Uganda", support: "📞 Core Support Line: +256 414 kika_voip_trunk" },
  { id: "ldn", flag: "🇬🇧", region: "United Kingdom Diaspora Hub (London)", address: "Level 4, Canary Wharf Technology Switchboards, London, UK", support: "📞 Virtual Trunk Link: +44 20 7946 0192" }
];

export const foundersLegacyData = {
  title: "📜 KiKa Sovereign Foundational Legacy Charter & Regional History",
  charterText: "Honoring the historical vision of the KiKa co-founders, the platform is engineered as an immutable community automation baseline. Designed to structurally bridge the macroeconomic wealth imbalances transiting between global diaspora hubs and local East African savings societies, KiKa serves as a continuous, reliable technical trust port.",
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
      { id: "reg-m", name: "Diaspora Membership Enrollment", description: "Statutory profile configuration pipeline synchronizing your verified identity parameters (Name, Passport Data, Host Country Domicile, GPS Coordinates) straight inside the secure Neon database ledger.", targetPath: "/login" }, 
      { id: "reg-s", name: "Sacco Corporate Grouping", description: "Initialize multi-signatory asset pooling profiles to authorize combined cooperative savings tracks and joint remittance pipelines.", targetPath: "/login" }
    ] 
  },
  { 
    categoryName: "Financial Hub Services", 
    options: [
      { id: "fin-w", name: "Available Wallet Capital", description: "Real-time ledger overview tracking your available transactional balances and liquid investment liquidity lines mapped cleanly to cloud SQL database fields with full bank reconciliation footprints.", targetPath: "/services/ledger" }, 
      { id: "fin-s", name: "Cooperative Sacco Shares", description: "Automated wealth accumulation trackers displaying your accumulated asset shares valued natively at a statutory 10,000 UGX per unit allocation point.", targetPath: "/services/ledger" }, 
      { id: "fin-e", name: "Trust Escrow Reserves", description: "Automated compliance buffer systems securing 25% of transiting remittance capital from cellular network fraud vectors and instant liquidity overrides.", targetPath: "/services/ledger" }
    ] 
  },
  { 
    categoryName: "Business & Commerce", 
    options: [
      { id: "biz-t", name: "Cross-Border Trade Matrix Corridor", description: "Direct B2B import/export clearinghouse routers enabling diaspora entrepreneurs to track physical goods manifests across sub-Saharan freight corridors and custom checkpoints.", targetPath: "/login" }, 
      { id: "biz-s", name: "Micro-SME Capital Funding", description: "Automated credit underwriting pipelines linking verified cooperative savings accounts straight to low-interest commercial trade financing pools.", targetPath: "/login" }
    ] 
  },
  { 
    categoryName: "Ecosystem Portals", 
    options: [
      { id: "port-v", name: "Low-Tariff Full-Duplex VoIP Link", description: "Disrupting traditional telecom tariffs. High-velocity PCM sound wave streaming delivering ultra-cheap voice tunnels directly to KiKa diaspora membership networks.", targetPath: "/services/voip" }, 
      { id: "port-j", name: "Job Matchmaker Engine", description: "Aggregated international job vacancy search node seamlessly linking skilled diaspora professionals straight to cross-border institutional career lines.", targetPath: "/login" },
      { id: "port-legacy", name: "Legacy Foundation Charter History", description: "The complete structural founding roadmap, charter variables, and social vision honoring the Kika co-founder legacy and cross-border milestones.", targetPath: "/login" }
    ] 
  }
];
