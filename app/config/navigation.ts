// config/navigation.ts

export interface NavigationSubmenu {
  name: string;
  path: string; 
  desc?: string; 
}

export interface NavigationSection {
  name: string; 
  submenus: NavigationSubmenu[];
}

// 🌟 THE ULTIMATE KIKA ECOSYSTEM COMPLIANCE MATRIX
export const navigationTraffic: NavigationSection[] = [
  {
    name: "📋 Registering Hub",
    submenus: [
      { 
        name: "1. Login for Registered Users", 
        path: "/login", 
        desc: "Secure entry portal for authorized cross-border network members." 
      },
      { 
        name: "2. Register for New Users", 
        path: "/signup", // 🟢 FIXED: Linked directly to your conflict-free app/signup path
        desc: "Create a basic ecosystem portal node to access services." 
      },
      { 
        name: "3. Diaspora Demographical Registry", 
        path: "/registry", // 🟢 FIXED: Linked directly to your root demographic dashboard directory
        desc: "Enroll as a certified national asset in the global directory." 
      }
    ]
  },
  {
    name: "Financial Hub Services",
    submenus: [
      { 
        name: "📱 Send Money Trunk", 
        path: "/services/send-money", 
        desc: "Tunnel capital securely back to mobile wallets or bank accounts." 
      },
      { 
        name: "🏛️ Cooperative SACCO Savings", 
        path: "/services/savings", 
        desc: "Initialize institutional corporate SACCO registrations." 
      },
      { 
        name: "🎙️ Diaspora VoIP Dialer Node", 
        path: "/services/voip", 
        desc: "Active circular layout keypad to dial cross-border phone networks." 
      }
    ]
  },
  {
    name: "Business & Commerce",
    submenus: [
      { 
        name: "💼 Portfolio Investments Fund", 
        path: "/business/investments", 
        desc: "Explore synchronized country-by-country resource commodity assets." 
      },
      
      {
        name: "🌾 OWC & PDM Agribusiness Cooperatives",
        path: "/business-hub/registry?category=agribusiness", // Updated to point directly to your folder
        desc: "Enroll in audited corporate Sacco savings pools for Poultry, Cattle, and Crop processing networks linked to Operation Wealth Creation."
      },
      {
        name: "🏭 Simple Industrial & Value-Addition Nodes",
        path: "/business-hub/registry?category=industrial", // Updated to point directly to your folder
        desc: "Partner with local micro-manufacturing lines, packaging hubs, and milling plants backed by national financial support lines."
      },
      {
        name: "🏢 Managed Diaspora Real Estate Escrow",
        path: "/business-hub/registry?category=real-estate", // Updated to point directly to your folder
        desc: "Securely fund trust escrow accounts for verified housing and land development assets managed by KiKa Global Services."
      },
      
        // 🟢 PASTE THIS EXACT ROW RIGHT HERE BEFORE THE SUBMENU ARRAY CLOSES:
    {
      name: "📉 Low-Rate National Loan Access Hub",
      path: "/services/loans", 
      desc: "Leverage group diaspora Sacco balances to clear statutory criteria for low-interest development financing lines."
    }
  ]
},

    {
    name: "Ecosystem Portals",
    submenus: [
      // PRESERVED: Your original project service modules
      { 
        name: "🌍 Job Matchmaker Engine", 
        path: "/explore-jobs", 
        desc: "Aggregated international job vacancy search node (Indeed, Monster)." 
      },
      {
        name: "💡 Technical Innovation Board",
        path: "/innovation-board",
        desc: "Regional tech incubation indices and project development trackers."
      },
      
      // PRESERVED: Your diaspora production corridors
      { 
        name: "📊 Placements & Scholarships Matrix", 
        path: "/services/job-portal", 
        desc: "Connect university researchers to dissertation data nodes, internships, and global placements." 
      },
      { 
        name: "⚖️ Ecosystem Rules & Terms", 
        path: "/terms", 
        desc: "Statutory multi-tenant regulatory guidelines and user service parameters." 
      },
      { 
        name: "🔒 Data Privacy Policy", 
        path: "/privacy-policy", 
        desc: "Uganda PDPO and NITA-U data sovereignty and encryption compliance rules." 
      },

      // 🟢 ADDED: The Co-Founder Memorial & Historical Foundation Node
      {
        name: "🏛️ Legacy Foundation History",
        path: "/foundation-history",
        desc: "The founding roadmap, charter variables, and social vision honoring the KiKa co-founder legacy."
      }
    ]
  }

];

// 🛡️ RE-ADDED COMPLIANCE LAYER: Satisfies the static Navbar dropdown variable mappings
export const navigationData = {
  name: "Registering Hub",
  submenus: [
    { 
      name: "1. Login for Registered Users", 
      path: "/login", 
      desc: "Secure entry portal for authorized cross-border network members." 
    },
    { 
      name: "2. Register for New Users", 
      path: "/signup", 
      desc: "Create a basic ecosystem portal node to access services." 
    },
    { 
      name: "3. Diaspora Demographical Registry", 
      path: "/registry", 
      desc: "Enroll as a certified national asset in the global directory." 
    }
  ]
};

export const outreachLink = {
  name: "Outreach Offices",
  path: "/contact"
};
