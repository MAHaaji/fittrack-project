import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE from "../config";
import { useAuth } from "../context/AuthContext";

const featured = {
  title: "Monthly Activity Challenge",
  description:
    "Complete the most total workout time during the current month. Every workout you log contributes towards your leaderboard position.",
  recognition: "Community recognition",
  category: "All Activities",
};

const upcoming = [
  {
    title: "30-Day Streak Challenge",
    category: "Consistency",
    starts: "1 Jul",
    difficulty: "Medium",
    desc: "Log at least one workout every day for 30 days straight.",
    img: "/images/stretching.avif",
  },
  {
    title: "Summer 5K Blitz",
    category: "Running",
    starts: "15 Jul",
    difficulty: "Hard",
    desc: "Complete a 5K workout and submit your best recorded time.",
    img: "/images/happy.jpg",
  },
  {
    title: "Gym Warrior Cup",
    category: "Strength",
    starts: "1 Aug",
    difficulty: "Hard",
    desc: "Log the most strength and conditioning sessions during the month.",
    img: "/images/gym.avif",
  },
  {
    title: "Wellness Week",
    category: "Mixed",
    starts: "7 Aug",
    difficulty: "Easy",
    desc: "Complete five different activity types during a single week.",
    img: "/images/workout.jpg",
  },
];

const difficultyColor = {
  Easy:   { bg: "#f0faf0", color: "#27682a" },
  Medium: { bg: "#fff8e6", color: "#a16207" },
  Hard:   { bg: "#fff0f0", color: "#c0392b" },
};

function formatCompetitionDuration(totalSeconds) {
  const seconds = Number(totalSeconds) || 0;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
}

function getInitial(name) {
  if (!name || typeof name !== "string") return "?";
  return name.trim().charAt(0).toUpperCase();
}

function getMedal(rank) {
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return null;
}

function getCurrentMonthLabel() {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getDaysRemainingInMonth() {
  const today = new Date();
  const finalDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const difference = finalDay.getTime() - today.getTime();
  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
}

export default function CompetitionsPage() {
  const { token, user } = useAuth();

  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState("");

  const monthLabel = getCurrentMonthLabel();
  const daysRemaining = getDaysRemainingInMonth();

  useEffect(() => {
    if (!token) {
      setLeaderboard([]);
      setLeaderboardLoading(false);
      return;
    }

    let cancelled = false;

    async function loadLeaderboard() {
      try {
        setLeaderboardLoading(true);
        setLeaderboardError("");

        const response = await fetch(`${API_BASE}/api/competitions/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load the leaderboard.");
        }

        if (!cancelled) {
          setLeaderboard(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error("Leaderboard loading failed:", err);
        if (!cancelled) {
          setLeaderboardError(err.message || "Unable to load the leaderboard.");
        }
      } finally {
        if (!cancelled) setLeaderboardLoading(false);
      }
    }

    loadLeaderboard();
    return () => { cancelled = true; };
  }, [token]);

  const participantCount = leaderboard.length;

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "56px 32px 80px" }}>

      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
        Community
      </p>

      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#1a1a1a", marginBottom: "6px" }}>
        Competitions
      </h1>

      <p style={{ fontSize: "14px", color: "#888", marginBottom: "40px", maxWidth: "540px", lineHeight: 1.7 }}>
        Compare your monthly workout activity with other FitTrack users. Every valid workout logged during the current month automatically contributes towards the leaderboard.
      </p>

      {!user && (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ebebeb", padding: "16px 20px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>🏆</span>
            <span style={{ fontSize: "14px", color: "#555" }}>
              Log in to view the live leaderboard and participate by recording workouts.
            </span>
          </div>
          <Link to="/login" style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#fff", background: "#6ebc67", padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>
            Log In
          </Link>
        </div>
      )}

      {/* FEATURED + LEADERBOARD */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px", marginBottom: "40px", alignItems: "start" }}>

        {/* Featured card */}
        <div style={{ borderRadius: "18px", overflow: "hidden", position: "relative", minHeight: "480px", display: "flex", flexDirection: "column" }}>
          <img
            src="/images/running.jpg"
            alt="Runner taking part in the monthly activity challenge"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)" }} />

          <div style={{ position: "relative", zIndex: 1, padding: "28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "6px" }}>
              Featured · Live Now
            </p>
            <h2 style={{ fontFamily: "'Anton', serif", fontSize: "24px", color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>
              {featured.title}
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "20px" }}>
              {featured.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Ends in", value: daysRemaining === 0 ? "Ends today" : `${daysRemaining} day${daysRemaining === 1 ? "" : "s"}` },
                { label: "Recognition", value: featured.recognition },
                { label: "Category", value: featured.category },
                { label: "Active participants", value: token ? (leaderboardLoading ? "Loading..." : participantCount) : "Log in to view" },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#fff" }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {user ? (
              <div style={{ width: "100%", background: "rgba(110,188,103,0.14)", color: "#8ed087", border: "1px solid #6ebc67", borderRadius: "10px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", textAlign: "center" }}>
                Your logged workouts automatically count
              </div>
            ) : (
              <Link to="/login" style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", borderRadius: "10px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
                Log in to participate
              </Link>
            )}
          </div>
        </div>

        {/* Leaderboard card */}
        <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #ebebeb", padding: "28px", minHeight: "480px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a" }}>
              Live Leaderboard
            </p>
            <span style={{ fontSize: "12px", color: "#aaa" }}>
              {monthLabel} · Total workout time
            </span>
          </div>

          {!token ? (
            <div style={{ minHeight: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "30px" }}>
              <span style={{ fontSize: "34px", marginBottom: "12px" }}>🔒</span>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "16px", color: "#1a1a1a", marginBottom: "8px" }}>
                Log in to view the leaderboard
              </p>
              <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "18px", maxWidth: "280px" }}>
                The leaderboard is generated from real workouts recorded by FitTrack users.
              </p>
              <Link to="/login" style={{ background: "#6ebc67", color: "#fff", borderRadius: "8px", padding: "9px 18px", textDecoration: "none", fontFamily: "'Anton', serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Log In
              </Link>
            </div>

          ) : leaderboardLoading ? (
            <div style={{ minHeight: "350px", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontSize: "13px" }}>
              Loading leaderboard...
            </div>

          ) : leaderboardError ? (
            <div style={{ background: "#fff0f0", border: "1px solid #ffc5c5", borderRadius: "9px", padding: "14px", color: "#c0392b", fontSize: "13px" }}>
              {leaderboardError}
            </div>

          ) : leaderboard.length === 0 ? (
            <div style={{ minHeight: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "30px" }}>
              <span style={{ fontSize: "34px", marginBottom: "12px" }}>🏃</span>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "16px", color: "#1a1a1a", marginBottom: "8px" }}>
                No workouts recorded this month
              </p>
              <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, marginBottom: "18px", maxWidth: "290px" }}>
                Record a workout to become the first person on the leaderboard.
              </p>
              <Link to="/workout-log" style={{ background: "#6ebc67", color: "#fff", borderRadius: "8px", padding: "9px 18px", textDecoration: "none", fontFamily: "'Anton', serif", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Log a Workout
              </Link>
            </div>

          ) : (
            <>
              {leaderboard.map((entry, index) => {
                const rank = Number(entry.rank) || index + 1;
                const medal = getMedal(rank);
                return (
                  <div key={entry.user_id}
                    style={{ display: "grid", gridTemplateColumns: "24px 34px minmax(0, 1fr) auto", alignItems: "center", gap: "12px", padding: "12px 8px", borderBottom: index < leaderboard.length - 1 ? "1px solid #f0f0ea" : "none", background: entry.is_current_user ? "#f0faf0" : "transparent", borderRadius: entry.is_current_user ? "9px" : "0" }}>
                    <span style={{ fontFamily: "'Anton', serif", fontSize: "13px", color: rank <= 3 ? "#6ebc67" : "#bbb", textAlign: "center" }}>
                      {rank}
                    </span>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: rank <= 3 ? "#6ebc67" : "#f0f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, color: rank <= 3 ? "#fff" : "#888", flexShrink: 0 }}>
                      {getInitial(entry.name)}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: "14px", color: "#1a1a1a", fontWeight: entry.is_current_user ? 700 : 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {entry.name}{entry.is_current_user ? " (You)" : ""}
                      </p>
                      <p style={{ fontSize: "11px", color: "#aaa", marginTop: "3px" }}>
                        {entry.total_workouts} workout{Number(entry.total_workouts) === 1 ? "" : "s"}
                      </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                      {medal && <span aria-label={`Position ${rank}`} style={{ fontSize: "16px" }}>{medal}</span>}
                      <span style={{ fontFamily: "'Anton', serif", fontSize: "14px", color: "#1a1a1a", whiteSpace: "nowrap" }}>
                        {formatCompetitionDuration(entry.total_duration)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <p style={{ fontSize: "12px", color: "#aaa", textAlign: "center", marginTop: "18px" }}>
                Calculated from workouts logged during the current month
              </p>
            </>
          )}
        </div>
      </div>

      {/* UPCOMING */}
      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
        Coming Soon
      </p>
      <h2 style={{ fontFamily: "'Anton', serif", fontSize: "24px", color: "#1a1a1a", marginBottom: "20px" }}>
        Upcoming Challenge Concepts
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
        {upcoming.map((competition) => {
          const difficulty = difficultyColor[competition.difficulty];
          return (
            <div key={competition.title}
              style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ height: "110px", overflow: "hidden", position: "relative" }}>
                <img src={competition.img} alt={competition.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
                <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "11px", fontWeight: 500, padding: "3px 8px", borderRadius: "99px", background: difficulty.bg, color: difficulty.color }}>
                  {competition.difficulty}
                </span>
              </div>
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {competition.category}
                </span>
                <h3 style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", lineHeight: 1.3 }}>
                  {competition.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, flex: 1 }}>
                  {competition.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", paddingTop: "10px", borderTop: "1px solid #f0f0ea" }}>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>Starts {competition.starts}</span>
                  <span style={{ fontSize: "11px", color: "#888", fontWeight: 500 }}>Planned feature</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </main>
  );
}
