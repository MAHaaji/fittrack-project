import { Link } from "react-router-dom";

const colWrap = { display: "flex", flexDirection: "column", gap: "11px" };
const colHeading = {
  fontFamily: "'Anton', serif",
  fontSize: "12px",
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#6ebc67",
  marginBottom: "10px",
};
const linkStyle = {
  fontSize: "14px",
  color: "#999",
  textDecoration: "none",
  transition: "color 0.15s",
};
const techRow = {
  fontSize: "13px",
  color: "#777",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};
const dot = {
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  background: "#6ebc67",
  display: "inline-block",
  flexShrink: 0,
};

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}
    >
      {children}
    </Link>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#1a1a1a", color: "#999", fontFamily: "'DM Sans', sans-serif" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 32px 48px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "320px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "10px", height: "10px", background: "#6ebc67", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontFamily: "'Anton', serif", fontSize: "20px", letterSpacing: "1px", color: "#fff" }}>
              FitTrack
            </span>
          </div>
          <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#888" }}>
            Workout tracking, progress analytics, leaderboards, and your full fitness history — all in one place.
          </p>
        </div>

        {/* Menu links */}
        <div style={colWrap}>
          <p style={colHeading}>Menu</p>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/activities">Activities</FooterLink>
          <FooterLink to="/workout-log">Workout Log</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
          <FooterLink to="/competitions">Competitions</FooterLink>
        </div>

        {/* Support links */}
        <div style={colWrap}>
          <p style={colHeading}>Support</p>
          <FooterLink to="/pricing">Pricing</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
          <FooterLink to="/login">Login</FooterLink>
          <FooterLink to="/register">Register</FooterLink>
        </div>

        {/* Tech stack */}
        <div style={colWrap}>
          <p style={colHeading}>Built With</p>
          <div style={techRow}><span style={dot} />React frontend</div>
          <div style={techRow}><span style={dot} />Express API</div>
          <div style={techRow}><span style={dot} />PostgreSQL database</div>
          <div style={techRow}><span style={dot} />Stripe (test-mode prototype)</div>
        </div>
      </div>

      {/* Bottom strip */}
      <div style={{ borderTop: "1px solid #2e2e2e" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "#666" }}>© 2026 FitTrack. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms</FooterLink>
            <FooterLink to="/cookie-policy">Cookie Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
