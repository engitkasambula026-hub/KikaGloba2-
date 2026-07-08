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

// 🌟 THE ULTIMATE CONFIGURATION COMPLIANCE MATRIX
export const navigationTraffic: NavigationSection[] = [
  {
    name: "📋 Registering Hub",
    submenus: [
      {
        name: "1. Login for Registered Users",
        path: "/login", // 🟢 FIXED: Points to your actual file at app/login/page.tsx
        desc: "Secure entry portal for authorized cross-border network members."
      },
      {
        name: "2. Register for New Users",
        path: "/register", // 🟢 FIXED: Points to your actual file at app/register/page.tsx
        desc: "Create a basic ecosystem portal node to access services."
      },
      {
        name: "3. Diaspora Demographical Registry",
        path: "/registry", // 🟢 FIXED: Points to your actual file at app/registry/page.tsx
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
        desc: "Tunnel capital securely back to mobile wallets or savings ledgers."
      },
      { 
        name: "🏛️ Cooperative SACCO Savings", 
        path: "/services/savings",
        desc: "Initialize equity injections and track running cash dividends."
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
        name: "📊 Regional Markets Tracker", 
        path: "/business/markets",
        desc: "Track live trade vectors and cross-border currency movements."
      },
      { 
        name: "💼 Portfolio Investments Fund", 
        path: "/business/investments",
        desc: "Explore synchronized diaspora capital placement portfolios."
      }
    ]
  },
  {
    name: "Ecosystem Portals",
    submenus: [
      { 
        name: "🌍 Job Search Matchmaker", 
        path: "/explore-jobs",
        desc: "Match profile application nodes to open recruitment placements."
      }
    ]
  }
];

export const outreachLink = {
  name: "Outreach Offices",
  path: "/contact"
};
