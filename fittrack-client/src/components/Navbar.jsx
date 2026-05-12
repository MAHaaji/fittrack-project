import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");

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
    navigate("/");
  }

  return (
    <nav style={{ background: "#fff", borderBottom: "1px solid #e8e8e3", padding: "0 32px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>

      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <Link to="/" style={{ fontFamily: "'Anton', serif", fontSize: "22px", letterSpacing: "1px", color: "#1a1a1a", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", background: "#6ebc67", borderRadius: "50%", display: "inline-block" }} />
          FitTrack
        </Link>

        <div style={{ display: "flex", gap: "4px" }}>
          {[
            { to: "/", label: "Home" },
            { to: "/activities", label: "Activities" },
            { to: "/workout-log", label: "Workout Log" },
          ].map(({ to, label }) => (
            <Link key={to} to={to} style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: pathname === to ? "#6ebc67" : "#1a1a1a", textDecoration: "none", padding: "6px 12px", borderRadius: "6px" }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: "6px", borderBottom: "1.5px solid #6ebc67", padding: "4px 0" }}>
          <button type="button" onClick={() => navigate("/search")} style={{ background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: "14px", padding: 0, display: "flex", alignItems: "center" }}>
            ⌕
          </button>
          <input
            type="text" value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exercises…"
            style={{ border: "none", outline: "none", background: "transparent", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", width: "140px", color: "#1a1a1a" }}
          />
        </form>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="/account" style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#6ebc67", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </Link>
            <button onClick={handleLogout} style={{ background: "none", border: "none", fontSize: "12px", color: "#aaa", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ background: "#6ebc67", color: "#fff", border: "none", padding: "8px 18px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;