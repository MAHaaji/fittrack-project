import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { apiFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import WeatherWidget from "../components/WeatherWidget";

function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Chart controls
  const [chartMetric, setChartMetric] = useState("count");  // "count" | "duration"
  const [chartPeriod, setChartPeriod] = useState("week");   // "week" | "month"

  useEffect(() => {
    // Fetch dashboard stats + recent workouts
    apiFetch("/api/dashboard")
      .then(res => {
        if (!res.ok) throw new Error("Failed to load dashboard");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("Could not load dashboard data."))
      .finally(() => setLoading(false));

    // Fetch all workouts for the chart
    apiFetch("/api/workouts")
      .then(res => res.ok ? res.json() : [])
      .then(setAllWorkouts)
      .catch(() => setAllWorkouts([]));
  }, []);

  // ── Formatters ────────────────────────────────────────────────────────────

  // Individual workout display: seconds → "26:33" or "1:04:21"
  function formatDuration(seconds) {
    if (seconds == null || seconds === "") return null;
    const totalSecs = Number(seconds);
    if (isNaN(totalSecs)) return null;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  // Stat cards: total seconds → "2h 11m" or "26m 33s"
  function formatSeconds(totalSecs) {
    if (!totalSecs) return "0:00";
    const secs = Number(totalSecs);
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });
  }

  // ── Chart data ────────────────────────────────────────────────────────────

  const chartData = useMemo(() => {
    if (!allWorkouts.length) return [];

    const buckets = {};

    allWorkouts.forEach(log => {
      if (!log.date_completed) return;
      const d = new Date(log.date_completed);
      let key;

      if (chartPeriod === "week") {
        const tmp = new Date(d);
        tmp.setHours(0, 0, 0, 0);
        tmp.setDate(tmp.getDate() - ((tmp.getDay() + 6) % 7)); // back to Monday
        key = tmp.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      } else {
        key = d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
      }

      if (!buckets[key]) buckets[key] = { label: key, count: 0, duration: 0 };
      buckets[key].count += 1;
      buckets[key].duration += log.duration ? Math.round(log.duration / 60) : 0; // minutes
    });

    // allWorkouts is newest-first; reverse so chart reads left→right chronologically
    return Object.values(buckets).reverse();
  }, [allWorkouts, chartPeriod]);

  // ── Custom tooltip ────────────────────────────────────────────────────────

  function CustomTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    const val = payload[0].value;
    return (
      <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", color: "#1a1a1a" }}>
        <p style={{ fontWeight: 600, marginBottom: "2px" }}>{label}</p>
        <p style={{ color: "#6ebc67" }}>
          {chartMetric === "count" ? `${val} workout${val !== 1 ? "s" : ""}` : `${val} min`}
        </p>
      </div>
    );
  }

  // ── Stats ─────────────────────────────────────────────────────────────────

  const stats = [
    { label: "Total Workouts", value: data?.total_workouts ?? 0 },
    { label: "Total Time",     value: formatSeconds(data?.total_duration) },
    { label: "Avg Duration",   value: formatSeconds(data?.avg_duration) },
  ];

  // ─────────────────────────────────────────────────────────────────────────

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

      {loading && <p style={{ fontSize: "14px", color: "#aaa" }}>Loading...</p>}

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

          {/* PROGRESS CHART */}
          <div style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", padding: "24px", marginBottom: "24px" }}>

            {/* Chart header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #f0f0ea", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a" }}>
                {chartMetric === "count" ? "Workouts" : "Duration (min)"} per {chartPeriod === "week" ? "week" : "month"}
              </p>

              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {/* Metric toggles */}
                {[
                  { key: "count",    label: "No. of Workouts" },
                  { key: "duration", label: "Duration" },
                ].map(({ key, label }) => (
                  <button key={key} type="button" onClick={() => setChartMetric(key)}
                    style={{
                      padding: "5px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 600, cursor: "pointer",
                      border: "1px solid",
                      borderColor: chartMetric === key ? "#6ebc67" : "#e0e0d8",
                      background:  chartMetric === key ? "#f0faf0" : "#fafaf8",
                      color:       chartMetric === key ? "#3b7a35" : "#888",
                    }}>
                    {label}
                  </button>
                ))}

                {/* Period toggles */}
                {[
                  { key: "week",  label: "Weekly" },
                  { key: "month", label: "Monthly" },
                ].map(({ key, label }) => (
                  <button key={key} type="button" onClick={() => setChartPeriod(key)}
                    style={{
                      padding: "5px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 600, cursor: "pointer",
                      border: "1px solid",
                      borderColor: chartPeriod === key ? "#1a1a1a" : "#e0e0d8",
                      background:  chartPeriod === key ? "#1a1a1a" : "#fafaf8",
                      color:       chartPeriod === key ? "#fff"    : "#888",
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {chartData.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#aaa", textAlign: "center", padding: "32px 0" }}>
                No data yet — log some workouts to see your progress.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0ea" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#aaa" }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#aaa" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0faf0" }} />
                  <Bar dataKey={chartMetric} fill="#6ebc67" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
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
                      {formatDuration(w.duration)}
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
