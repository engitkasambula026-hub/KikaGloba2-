export interface SubmenuItem {
  name: string;
  path: string;
  desc: string;
}

export interface NavItem {
  name: string;
  submenus: SubmenuItem[];
}

// Fixed absolute lowercase map routes sync layout matrices perfectly
export const navigationData: NavItem = {
  name: "Core Services",
  submenus: [
    { name: "Coop Savings", path: "/services/coop-savings", desc: "Cooperative savings vault management" },
    { name: "VOIP Calls", path: "/services/voip-calls", desc: "Enterprise communication logs" },
    { name: "Send Money", path: "/services/global-money", desc: "Global asset remittance portal" }
  ]
};
