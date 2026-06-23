import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [moreOpen, setMoreOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/search");
    }
    setQuery("");
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const mainLinks = [
    { to: "/home", label: "Home" },
    { to: "/activities", label: "Activities" },
    { to: "/workout-log", label: "Workout Log" },
    { to: "/competitions", label: "Compete" },
  ];

  const moreLinks = [
    { to: "/pricing", label: "Pricing" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e3", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>

      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link to="/home" style={{ fontFamily: "'Anton', serif", fontSize: "22px", letterSpacing: "1px", color: "#1a1a1a", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", background: "#6ebc67", borderRadius: "50%", display: "inline-block" }} />
          FitTrack
        </Link>

        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {mainLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: pathname === to ? "#6ebc67" : "#1a1a1a", textDecoration: "none", padding: "6px 12px", borderRadius: "6px", whiteSpace: "nowrap" }}
            >
              {label}
            </Link>
          ))}

          {/* More dropdown */}
          <div style={{ position: "relative" }} onMouseEnter={() => setMoreOpen(true)} onMouseLeave={() => setMoreOpen(false)}>
            <button
              style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: moreLinks.some(l => l.to === pathname) ? "#6ebc67" : "#1a1a1a", background: "none", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
            >
              More
              <span style={{ fontSize: "10px", color: "#aaa" }}>▾</span>
            </button>
            {moreOpen && (
              <div style={{ position: "absolute", top: "100%", left: 0, background: "#fff", border: "1px solid #ebebeb", borderRadius: "10px", padding: "6px", minWidth: "140px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", zIndex: 200 }}>
                {moreLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    style={{ display: "block", fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: pathname === to ? "#6ebc67" : "#1a1a1a", textDecoration: "none", padding: "8px 12px", borderRadius: "6px", transition: "background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8f8f5"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "6px", borderBottom: "1.5px solid #6ebc67", padding: "4px 0" }}>
          <button type="button" onClick={() => navigate("/search")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: "14px", padding: 0, display: "flex", alignItems: "center" }}>
            ⌕
          </button>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exercises…"
            style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", width: "140px", color: "#1a1a1a" }}
          />
        </form>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="/dashboard" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#6ebc67", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </Link>
            <button onClick={handleLogout} style={{ background: "none", border: "none", fontSize: "12px", color: "#aaa", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link to="/login" style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a", textDecoration: "none", padding: "8px 14px", border: "1px solid #e0e0d8", borderRadius: "8px" }}>
              Login
            </Link>
            <Link to="/register" style={{ background: "#6ebc67", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
