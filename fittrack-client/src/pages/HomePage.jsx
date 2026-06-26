import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../config";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

function HomePage() {
  const [apiStatus, setApiStatus] = useState("checking");
  const { user } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((res) => res.json())
      .then((data) => setApiStatus(data.status === "ok" ? "connected" : "degraded"))
      .catch(() => setApiStatus("disconnected"));
  }, []);

  const statusColor = {
    connected: "#6ebc67",
    checking: "#f0b429",
    degraded: "#f0b429",
    disconnected: "#e24b4a",
  }[apiStatus];

  return (
    <>
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f8f5", minHeight: "100vh" }}>

      {/* HERO — background.jpg */}
      <section style={{
        position: "relative",
        color: "#fff",
        padding: "90px 32px 80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
        overflow: "hidden",
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "480px",
      }}>
        {/* Dark overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.3) 100%)" }} />

        <div style={{ maxWidth: "560px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "16px" }}>
            Your Fitness Companion
          </p>
          <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(36px, 5vw, 58px)", lineHeight: 1, marginBottom: "20px", color: "#fff" }}>
            Welcome to{" "}
            <span style={{ color: "#6ebc67" }}>FitTrack</span>
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.65)", maxWidth: "440px", marginBottom: "28px" }}>
            Discover exercises, track your progress, and achieve your fitness goals. Built for beginners and enthusiasts alike.
          </p>

          {/* API status pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.06)", border: `1px solid ${statusColor}44`, borderRadius: "999px", padding: "4px 12px", fontSize: "12px", color: statusColor, marginBottom: "28px" }}>
            <span style={{ width: "6px", height: "6px", background: statusColor, borderRadius: "50%", display: "inline-block" }} />
            API {apiStatus}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/activities" style={{ background: "#6ebc67", color: "#fff", padding: "13px 28px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
              Browse Fitness
            </Link>
            <Link to={isLoggedIn ? "/workout-log" : "/login"} style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", padding: "13px 28px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
              Track Workouts
            </Link>
          </div>
        </div>

        {/* Stats cluster */}
        <div style={{ display: "flex", gap: "40px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
          {[
            { num: "200+", label: "Exercises" },
            { num: "50+",  label: "Categories" },
            { num: "∞",    label: "Progress" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Anton', serif", fontSize: "36px", color: "#6ebc67", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px", textTransform: "uppercase", letterSpacing: "1px" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS — stretching.avif + happy.jpg */}
      <section style={{ padding: "72px 32px" }}>
        <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
          Get Started
        </p>
        <h2 style={{ fontFamily: "'Anton', serif", fontSize: "28px", marginBottom: "40px", color: "#1a1a1a" }}>
          What would you like to do?
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
          {/* Card 1 — stretching.avif */}
          <div style={{ background: "#fff", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb", display: "flex", flexDirection: "column", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
              <img src="/images/stretching.avif" alt="Person doing a home workout stretch" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }} />
            </div>
            <div style={{ padding: "24px", flex: 1 }}>
              <h3 style={{ fontFamily: "'Anton', serif", fontSize: "20px", marginBottom: "8px", color: "#1a1a1a" }}>
                Are you trying to get FIT?
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.65 }}>
                Browse a wide range of fitness categories and exercises tailored to every level — from beginner to advanced.
              </p>
            </div>
            <div style={{ padding: "0 24px 24px" }}>
              <Link to="/activities" style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", padding: "12px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
                Browse Fitness
              </Link>
            </div>
          </div>

          {/* Card 2 — happy.jpg */}
          <div style={{ background: "#fff", borderRadius: "18px", overflow: "hidden", border: "1px solid #ebebeb", display: "flex", flexDirection: "column", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
              <img src="/images/happy.jpg" alt="Smiling runner with earphones" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.45), transparent)" }} />
            </div>
            <div style={{ padding: "24px", flex: 1 }}>
              <h3 style={{ fontFamily: "'Anton', serif", fontSize: "20px", marginBottom: "8px", color: "#1a1a1a" }}>
                Are you trying to track your fitness?
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.65 }}>
                Log workouts, visualise progress over time, and build your personal activity history — all in one place.
              </p>
            </div>
            <div style={{ padding: "0 24px 24px" }}>
              <Link to={isLoggedIn ? "/workout-log" : "/login"} style={{ display: "block", textAlign: "center", background: "#1a1a1a", color: "#fff", padding: "12px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
                Track It Here
              </Link>
            </div>
          </div>

          {/* Card 3 — competitions teaser */}
          <div style={{ background: "#1a1a1a", borderRadius: "18px", overflow: "hidden", border: "1px solid #2e2e2e", display: "flex", flexDirection: "column", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
              <img src="/images/running.jpg" alt="Runner at sunset" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2))" }} />
              <span style={{ position: "absolute", top: "14px", left: "14px", background: "#6ebc67", color: "#fff", fontFamily: "'Anton', serif", fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px", borderRadius: "99px" }}>
                Live Now
              </span>
            </div>
            <div style={{ padding: "24px", flex: 1 }}>
              <h3 style={{ fontFamily: "'Anton', serif", fontSize: "20px", marginBottom: "8px", color: "#fff" }}>
                Ready to compete?
              </h3>
              <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.65 }}>
                Join monthly challenges, climb the leaderboard, and win prizes against the FitTrack community.
              </p>
            </div>
            <div style={{ padding: "0 24px 24px" }}>
              <Link to="/competitions" style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", padding: "12px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
                View Competitions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF strip */}
      <section style={{ padding: "0 32px 80px" }}>
        <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #ebebeb", padding: "40px 36px", display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
              Real people. Real results.
            </p>
            <h2 style={{ fontFamily: "'Anton', serif", fontSize: "24px", color: "#1a1a1a", marginBottom: "12px" }}>
              Join thousands already training smarter.
            </h2>
            <Link to="/register" style={{ display: "inline-block", background: "#6ebc67", color: "#fff", padding: "12px 24px", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
              Start for free
            </Link>
          </div>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", flex: 1 }}>
            {[
              { img: "/images/happy.jpg",   name: "Marcus T.", quote: "Went from 0 to 5K in 8 weeks." },
              { img: "/images/smile.jpg",   name: "Priya S.",  quote: "Best workout tracker I've used." },
              { img: "/images/workout.jpg", name: "James W.",  quote: "Competitions keep me motivated.", isEquip: true },
            ].map(({ img, name, quote, isEquip }) => (
              <div key={name} style={{ flex: "1 1 180px", background: "#f8f8f5", borderRadius: "14px", padding: "16px", minWidth: "160px" }}>
                <div style={{ width: "100%", height: "100px", borderRadius: "10px", overflow: "hidden", marginBottom: "12px" }}>
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: isEquip ? "center" : "center 20%" }} />
                </div>
                <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", color: "#1a1a1a", marginBottom: "4px" }}>{name}</p>
                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.5, fontStyle: "italic" }}>"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
    <Footer />
    </>
  );
}

export default HomePage;
