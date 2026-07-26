"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import OpportunityDetailsForm from "./OpportunityDetailsForm";

export interface Opportunity {
  id: string;
  title: string;
  type: string;
  category: string;
  hostInstitution: string;
  hostCountry: string;
  description: string;
  requirements: string;
  compensation: string;
}

export default function InternationalJobPortalPage() {
  const [activeTab, setActiveTab] = useState("JOB"); 
  const [items, setItems] = useState<Opportunity[]>([]);
  const [selectedItem, setSelectedItem] = useState<Opportunity | null>(null);
  const router = useRouter();

  const sandboxMockItems: Opportunity[] = [
    {
      id: "mock-1",
      title: "Global Talent Systems Engineer",
      type: "JOB",
      category: "TECH",
      hostInstitution: "Ericsson HQ",
      hostCountry: "Sweden",
      description: "Develop global cloud communication routing architectures.",
      requirements: "BSc Computer Science, proficiency in Node.js & Go.",
      compensation: "65,000 SEK / Month"
    },
    {
      id: "mock-2",
      title: "MSc Renewable Energy Research Grant",
      type: "SCHOLARSHIP",
      category: "ACADEMIC",
      hostInstitution: "Stuttgart University",
      hostCountry: "Germany",
      description: "Fully funded research track targeting sub-Saharan smart grid integrations.",
      requirements: "First Class Degree in Electrical/Mechanical Engineering from a recognized Ugandan university.",
      compensation: "FULLY_FUNDED (Tuition + Stipend)"
    },
    {
      id: "mock-3",
      title: "Biomedical Dissertation Field Internship",
      type: "RESEARCH_INTERNSHIP",
      category: "HEALTHCARE",
      hostInstitution: "Karolinska Institutet",
      hostCountry: "Sweden",
      description: "Research placement for final year university students working on tropical disease desertion data nodes.",
      requirements: "Current enrollment in an accredited Ugandan University honors program.",
      compensation: "Travel Stipend + Living Allowance"
    }
  ];

  useEffect(() => {
    setItems(sandboxMockItems.filter(i => i.type === activeTab));
  }, [activeTab]);

  const tabStyle = (id: string) => ({ 
    padding: "12px 24px", 
    background: activeTab === id ? "#34d399" : "#1e293b", 
    color: activeTab === id ? "#0f172a" : "#94a3b8", 
    border: "none", borderRadius: "8px", fontWeight: "bold" as const, cursor: "pointer" 
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: "#0f172a", fontFamily: "Arial, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", borderBottom: "1px solid #1e293b", background: "#1e293b" }}>
        <span style={{ fontSize: "17px", fontWeight: "900", color: "#34d399", letterSpacing: "1px" }}>🌍 GLOBAL PLACEMENTS MATRIX</span>
        <button onClick={() => router.push("/")} style={{ background: "transparent", border: "1px solid #34d399", color: "#34d399", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>⬅️ Return Home</button>
      </header>

      <div style={{ display: "flex", justifyContent: "center", gap: "15px", padding: "30px 20px 10px 20px" }}>
        <button onClick={() => { setActiveTab("JOB"); setSelectedItem(null); }} style={tabStyle("JOB")}>💼 Employment</button>
        <button onClick={() => { setActiveTab("SCHOLARSHIP"); setSelectedItem(null); }} style={tabStyle("SCHOLARSHIP")}>🎓 Scholarships</button>
        <button onClick={() => { setActiveTab("RESEARCH_INTERNSHIP"); setSelectedItem(null); }} style={tabStyle("RESEARCH_INTERNSHIP")}>🔬 Research Internships</button>
      </div>

      <div style={{ display: "flex", flex: 1, gap: "30px", maxWidth: "1200px", margin: "20px auto", width: "100%", padding: "0 20px" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "15px" }}>
          {items.map(item => (
            <div key={item.id} onClick={() => setSelectedItem(item)} style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: selectedItem?.id === item.id ? "2px solid #34d399" : "1px solid #334155", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}><span style={{ color: "#34d399", fontSize: "12px", fontWeight: "bold" }}>{item.category}</span><span style={{ color: "#94a3b8", fontSize: "12px" }}>📍 {item.hostCountry}</span></div>
              <h3 style={{ color: "#ffffff", margin: "0 0 6px 0", fontSize: "18px" }}>{item.title}</h3>
              <p style={{ color: "#94a3b8", margin: "0 0 10px 0", fontSize: "13px" }}>Institution: {item.hostInstitution}</p>
              <span style={{ fontSize: "12px", background: "rgba(52, 211, 153, 0.1)", color: "#34d399", padding: "4px 8px", borderRadius: "4px", fontWeight: "bold" }}>{item.compensation}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <OpportunityDetailsForm selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}
