import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../config";
import { useAuth } from "../context/AuthContext";

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
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: "#f8f8f5", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{
        position: "relative",
        color: "#fff",
        padding: "80px 32px 72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        flexWrap: "wrap",
        overflow: "hidden",
        backgroundImage: "url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",

      }}>

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(0,0,0,0.75), rgba(0,0,0,0.5))",
          }}
        />

        <div style={{ maxWidth: "560px", position: "relative", zIndex: 1 }}></div>
        <div style={{ maxWidth: "560px", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "'Anton', serif",
            fontSize: "12px",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#6ebc67",
            marginBottom: "16px",
          }}>
            Your Fitness Companion
          </p>

          <h1
            style={{
              fontFamily: "'Anton', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1,
              marginBottom: "20px",
              color: "#6ebc67",
            }}
          >
            Welcome to FitTrack
          </h1>

          <p style={{
            fontSize: "15px",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.65)",
            maxWidth: "440px",
            marginBottom: "28px",
          }}>
            Discover exercises, track your progress, and achieve your fitness
            goals. Built for beginners and enthusiasts alike.
          </p>

          {/* API status pill */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${statusColor}44`,
            borderRadius: "999px",
            padding: "4px 12px",
            fontSize: "12px",
            color: statusColor,
            marginBottom: "28px",
          }}>
            <span style={{
              width: "6px", height: "6px",
              background: statusColor,
              borderRadius: "50%",
              display: "inline-block",
            }} />
            API {apiStatus}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/activities" style={{
              background: "#6ebc67",
              color: "#fff",
              padding: "12px 28px",
              borderRadius: "8px",
              fontFamily: "'Anton', serif",
              fontSize: "14px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.15s",
            }}>
              Browse Fitness
            </Link>

            <Link
              to={isLoggedIn ? "/workout-log" : "/login"}
              style={{
                background: "transparent",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.3)",
                padding: "12px 28px",
                borderRadius: "8px",
                fontFamily: "'Anton', serif",
                fontSize: "14px",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "border-color 0.15s",
              }}
            >
              Track Workouts
            </Link>
          </div>
        </div>

        {/* Stats cluster */}
        <div style={{
          display: "flex",
          gap: "36px",
          position: "relative",
          zIndex: 1,
        }}>
          {[
            { num: "200+", label: "Exercises" },
            { num: "50+", label: "Categories" },
            { num: "∞", label: "Progress" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Anton', serif",
                fontSize: "32px",
                color: "#6ebc67",
                lineHeight: 1,
              }}>
                {num}
              </div>
              <div style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                marginTop: "4px",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CARDS */}
      <section style={{ padding: "64px 32px" }}>
        <p style={{
          fontFamily: "'Anton', serif",
          fontSize: "12px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#6ebc67",
          marginBottom: "8px",
        }}>
          Get Started
        </p>
        <h2 style={{
          fontFamily: "'Anton', serif",
          fontSize: "28px",
          marginBottom: "40px",
          color: "#1a1a1a",
        }}>
          What would you like to do?
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {[
            {
              emoji: "",
              bg: "linear-gradient(135deg, #1a1a1a 0%, #2e2e2e 100%)",
              title: "Are you trying to get FIT?",
              body: "Well you're in the right place! Browse a wide range of fitness categories and exercises tailored to every level.",
              cta: "Browse Fitness",
              to: "/activities",
            },
            {
              emoji: "",
              bg: "linear-gradient(135deg, #1a3318 0%, #2d5926 100%)",
              title: "Are you trying to track your fitness?",
              body: "Log workouts, visualise progress over time, and build your personal activity history — all in one place.",
              cta: "Track It Here",
             to: isLoggedIn ? "/workout-log" : "/login",
            },
          ].map(({ emoji, bg, title, body, cta, to }) => (
            <div key={title} style={{
              background: "#fff",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #ebebeb",
              display: "flex",
              flexDirection: "column",
            }}>
              <div style={{
                height: "180px",
                background: bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
              }}>
                {emoji}
              </div>
              <div style={{ padding: "24px", flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Anton', serif",
                  fontSize: "20px",
                  marginBottom: "8px",
                  color: "#1a1a1a",
                }}>
                  {title}
                </h3>
                <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>{body}</p>
              </div>
              <div style={{ padding: "0 24px 24px" }}>
                <Link to={to} style={{
                  display: "block",
                  textAlign: "center",
                  background: "#6ebc67",
                  color: "#fff",
                  padding: "12px",
                  borderRadius: "8px",
                  fontFamily: "'Anton', serif",
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}>
                  {cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;