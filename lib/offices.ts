export interface OfficeFootprint {
  id: string;
  flag: string;
  region: string;
  address: string;
  support: string;
}

export const kikaGlobalOffices: OfficeFootprint[] = [
  {
    id: "kla-hq",
    flag: "🇺🇬",
    region: "East Africa Operational HQ (Kampala)",
    address: "Plot 12-14, Nakasero Road, Nakasero, Kampala, Uganda",
    support: "📞 Core Support Line: +256 414 kika_voip_trunk"
  },
  {
    id: "ldn-hub",
    flag: "🇬🇧",
    region: "United Kingdom Diaspora Hub (London)",
    address: "Level 4, Canary Wharf Technology Switchboards, London, UK",
    support: "📞 Virtual Trunk Link: +44 20 7946 0192"
  }
];
