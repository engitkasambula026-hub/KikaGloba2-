"use client";
import Link from "next/link";

export default function Page() {
  const cardStyle = {
    background: "white",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    transition: "0.3s",
  }};

  return (
    
<main
  style={{
    fontFamily: "Arial, sans-serif",
    background: "#f8fafc",
    minHeight: "100vh",
  }}
>
  <h1 style={{ color: "red" }}>
    REAL NAVBAR FOUND
  </h1>
  <div style={{ position: "relative", display: "inline-block" }}>
  <button
    style={{
      background: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Login ▼
  </button>
  </div>
     
   <div  

style={{
    background: "#0f172a",
    padding: "16px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  }}
 
  style={{ fontWeight: "bold", fontSize: "22px" }}>
    KIKA
  </div>

  <div
  style={{
    position: "relative",
    display: "inline-block",
    marginRight: "15px",
  }}
>
  <button
    style={{
      background: "transparent",
      border: "none",
      color: "white",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    }}
  >
    Login ▼
  </button>

  <div
    style={{
      position: "absolute",
      top: "35px",
      left: "0",
      background: "white",
      minWidth: "220px",
      boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
      borderRadius: "8px",
      padding: "10px",
      zIndex: 1000,
    }}
  >
    <a
      href="/login"
      style={{
        display: "block",
        padding: "10px",
        color: "black",
        textDecoration: "none",
      }}
    >
      Existing User Login
    </a>

    <a
      href="/register"
      style={{
        display: "block",
        padding: "10px",
        color: "black",
        textDecoration: "none",
      }}
    >
      Create New Account
    </a>
  </div>
</div>

    <Link href="/register">Register</Link>
    <Link
  href="/register"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold" }}
>
  Register
</Link>

    

    <Link href="/dashboard">Dashboard</Link>
    <Link
  href="/dashboard"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold" }}
>
  Dashboard 
</Link>

    <Link href="/jobs">Jobs</Link>
    <Link
  href="/jobs"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold"}}
>
  Jobs 
</Link>

    <Link href="/apply">Apply</Link>
    <Link
  href="/apply"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold"}}
>
  Apply
</Link>

    <Link href="/applications">Applications</Link>
<Link
  href="/applications"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold" }}
>
  Applications 
</Link>
    <Link href="/services">Services</Link>
    <Link
  href="/services"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold" }}
>
  Services
</Link>
    <Link href="/networks">Networks</Link>
    <Link
  href="/networks"
  style={{ color: "white", textDecoration: "none",
  fontWeight: "bold" }}
>
  Networks
</Link>
  
      {/* HERO */}
      <section
        style={{
          background:
            "linear-gradient(120deg, #0f172a 0%, #2563eb 55%, #16a34a 100%)",
          color: "white",
          padding: "90px 30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "58px",
              marginBottom: "20px",
              lineHeight: 1.1,
            }}
          >
            KIKA Global Outreach
          </h1>

          <p
            style={{
              fontSize: "22px",
              opacity: 0.95,
              marginBottom: "40px",
              lineHeight: 1.6,
            }}
          >
            Connecting Diaspora Communities to Jobs, Global Opportunities,
            Business Networks and Smart Services Across Continents.
          </p>

          <div> 

  
</div> <div>
              <Link href="/join networks">
  <button
    style={{
      background: "white",
      color: "#2563eb",
      border: "none",
      padding: "14px 30px",
      borderRadius: "10px",
      fontWeight: "bold",
      marginRight: "14px",
      cursor: "pointer",
      fontSize: "16px",
    }}
  >
    Join Networks
  </button>
</Link>
    

            <Link href="/jobs">
              <button
                style={{
                  background: "#f59e0b",
                  color: "#0f172a",
                  border: "none",
                  padding: "14px 30px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Explore Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        style={{
          padding: "70px 30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginBottom: "50px",
            color: "#0f172a",
          }}
        >
          Our Core Services
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: "25px",
          }}
        >
          <div style={cardStyle}>
            <h2>💼 Jobs Portal</h2>
            <p>
              Upload CVs, discover international opportunities and connect with trusted recruiters, Call Center Outsourcing
jobs.                       </p>
          </div>

          <div style={cardStyle}>
            <h2>🌍 Diaspora Registry</h2>
            <p>
              Connect communities from Africa, Middle East Asia Europe and the world under one platform.
            </p>
          </div>

          <div style={cardStyle}>
            <h2>💸 Global Services</h2>
            <p>
              Future-ready remittance, support and communication tools for global families.
            </p>
          </div>

          <div style={cardStyle}>
            <h2>📞 Smart Connectivity</h2>
            <p>
              Affordable communication and digital access solutions for diaspora communities.
            </p>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section
        style={{
          background: "#e2e8f0",
          padding: "80px 30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "42px",
              marginBottom: "20px",
              color: "#0f172a",
            }}
          >
            Why KIKA?
          </h2>

          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.8,
              color: "#334155",
            }}
          >
            KIKA Global Outreach is building a digital bridge between Africa
 and the world — empowering professionals, families, through Cooperative savings businesses and
 partnerships. Openning oportunities for the diaspora communities through technology-driven global access.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0f172a",
          color: "white",
          textAlign: "center",
          padding: "28px",
          marginTop: "40px",
        }}
      >
        © 2026 KIKA Global Outreach • Global Reach. African Roots.
      </footer>
    </main>
  );
 