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
      }
    ]
  },
  {
    name: "Ecosystem Portals",
    submenus: [
      { 
        name: "🌍 Job Matchmaker Engine", 
        path: "/explore-jobs", 
        desc: "Aggregated international job vacancy search node (Indeed, Monster)." 
      },
      { 
        name: "🔬 Technical Innovation Board", 
        path: "/explore-talent", 
        desc: "Submit research credentials and look for project development funding." 
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
