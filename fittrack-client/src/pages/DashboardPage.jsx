import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";

function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/api/dashboard")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load dashboard");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("Could not load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  function formatMinutes(mins) {
    if (!mins) return "0 min";
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });
  }

  const stats = [
    { label: "Total Workouts", value: data?.total_workouts ?? 0 },
    { label: "Total Time", value: formatMinutes(data?.total_duration) },
    { label: "Avg Duration", value: formatMinutes(data?.avg_duration) },
  ];

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "48px 32px" }}>

      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
        Overview
      </p>
      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "32px", color: "#1a1a1a", marginBottom: "6px" }}>
        Dashboard
      </h1>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "36px" }}>
        {user?.name ? `Good to see you, ${user.name}.` : "Welcome back."} Here's your activity summary.
      </p>
      
         <WeatherWidget />

      {loading && (
        <p style={{ fontSize: "14px", color: "#aaa" }}>Loading...</p>
      )}

      {error && (
        <div style={{ background: "#fff0f0", border: "1px solid #ffc5c5", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#c0392b", marginBottom: "24px" }}>
          {error}
        </div>
      )}

      {data && (
        <>
          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {stats.map(({ label, value }) => (
              <div key={label} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", padding: "24px" }}>
                <p style={{ fontSize: "12px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  {label}
                </p>
                <p style={{ fontFamily: "'Anton', serif", fontSize: "28px", color: "#1a1a1a" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* RECENT WORKOUTS */}
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #f0f0ea", marginBottom: "4px" }}>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a" }}>
                Recent Workouts
              </p>
              <Link to="/workout-log" style={{ fontSize: "12px", color: "#6ebc67", textDecoration: "none" }}>
                View all →
              </Link>
            </div>

            {data.recent_workouts?.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#aaa", padding: "24px 0", textAlign: "center" }}>
                No workouts logged yet.{" "}
                <Link to="/workout-log" style={{ color: "#6ebc67", textDecoration: "none" }}>Log one now</Link>
              </p>
            ) : (
              data.recent_workouts?.map((w, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < data.recent_workouts.length - 1 ? "1px solid #f0f0ea" : "none" }}>
                  <div>
                    <p style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", letterSpacing: "0.3px" }}>
                      {w.activity}
                    </p>
                    <p style={{ fontSize: "12px", color: "#aaa", marginTop: "2px" }}>
                      {formatDate(w.date_completed)}
                    </p>
                  </div>
                  {w.duration && (
                    <span style={{ background: "#f0faf0", color: "#3b7a35", borderRadius: "99px", padding: "3px 10px", fontSize: "11px" }}>
                      {w.duration} min
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}
    </main>
  );
}

export default DashboardPage;