import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const featured = {
  title: "May Distance Challenge",
  description: "Log the most total kilometres across any activity in May. Running, cycling, swimming — everything counts.",
  endsIn: "9 days",
  prize: "3 months Elite free",
  category: "All Activities",
  participants: 142,
};

const leaderboard = [
  { rank: 1, name: "James W.", value: "187 km", avatar: "J", badge: "🥇" },
  { rank: 2, name: "Priya S.", value: "164 km", avatar: "P", badge: "🥈" },
  { rank: 3, name: "Marcus T.", value: "151 km", avatar: "M", badge: "🥉" },
  { rank: 4, name: "Aoife R.", value: "138 km", avatar: "A", badge: null },
  { rank: 5, name: "Daniel K.", value: "124 km", avatar: "D", badge: null },
  { rank: 6, name: "Sofia L.", value: "119 km", avatar: "S", badge: null },
  { rank: 7, name: "Theo B.",  value: "97 km",  avatar: "T", badge: null },
];

const upcoming = [
  { title: "30-Day Streak Challenge", category: "Consistency", starts: "1 Jun",  difficulty: "Medium", desc: "Log at least one workout every day for 30 days straight.",     img: "/images/stretching.avif" },
  { title: "Summer 5K Blitz",         category: "Running",     starts: "15 Jun", difficulty: "Hard",   desc: "Run 5K in the fastest time. Submit your best recorded time.",  img: "/images/happy.jpg" },
  { title: "Gym Warrior Cup",         category: "Strength",    starts: "1 Jul",  difficulty: "Hard",   desc: "Most gym sessions logged in July. Strength & conditioning only.", img: "/images/gym.avif" },
  { title: "Wellness Week",           category: "Mixed",       starts: "7 Jul",  difficulty: "Easy",   desc: "Complete 5 different activity types in a single week.",         img: "/images/workout.jpg" },
];

const difficultyColor = {
  Easy:   { bg: "#f0faf0", color: "#27682a" },
  Medium: { bg: "#fff8e6", color: "#a16207" },
  Hard:   { bg: "#fff0f0", color: "#c0392b" },
};

export default function CompetitionsPage() {
  const { user } = useAuth();
  const [joined, setJoined] = useState(false);

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "56px 32px 80px" }}>

      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>Community</p>
      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(28px, 4vw, 42px)", color: "#1a1a1a", marginBottom: "6px" }}>Competitions</h1>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "40px", maxWidth: "480px", lineHeight: 1.7 }}>
        Compete with the FitTrack community. Join monthly challenges, climb the leaderboard, and earn rewards.
      </p>

      {!user && (
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #ebebeb", padding: "16px 20px", marginBottom: "32px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "18px" }}>🏆</span>
            <span style={{ fontSize: "14px", color: "#555" }}>Competitions require a <strong>Pro or Elite</strong> plan. Sign up to explore.</span>
          </div>
          <Link to="/pricing" style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#fff", background: "#6ebc67", padding: "8px 16px", borderRadius: "8px", textDecoration: "none" }}>See Plans</Link>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "40px", alignItems: "start" }}>

        {/* Featured card — running.jpg as background */}
        <div style={{ borderRadius: "18px", overflow: "hidden", position: "relative", minHeight: "480px", display: "flex", flexDirection: "column" }}>
          <img src="/images/running.jpg" alt="Runner at sunset" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.92) 40%, rgba(0,0,0,0.4) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, padding: "28px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "6px" }}>Featured · Live Now</p>
            <h2 style={{ fontFamily: "'Anton', serif", fontSize: "24px", color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>{featured.title}</h2>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "20px" }}>{featured.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Ends in",      value: featured.endsIn },
                { label: "Prize",        value: featured.prize },
                { label: "Category",     value: featured.category },
                { label: "Participants", value: featured.participants },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 14px" }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>{label}</p>
                  <p style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#fff" }}>{value}</p>
                </div>
              ))}
            </div>
            {user ? (
              <button onClick={() => setJoined(!joined)} style={{ width: "100%", background: joined ? "rgba(255,255,255,0.1)" : "#6ebc67", color: joined ? "#6ebc67" : "#fff", border: joined ? "1px solid #6ebc67" : "none", borderRadius: "10px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
                {joined ? "✓ Joined" : "Join Challenge"}
              </button>
            ) : (
              <Link to="/login" style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", borderRadius: "10px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}>
                Log in to join
              </Link>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #ebebeb", padding: "28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a" }}>Leaderboard</p>
            <span style={{ fontSize: "12px", color: "#aaa" }}>May · Distance</span>
          </div>
          {leaderboard.map((entry, i) => (
            <div key={entry.rank} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 0", borderBottom: i < leaderboard.length - 1 ? "1px solid #f0f0ea" : "none" }}>
              <span style={{ fontFamily: "'Anton', serif", fontSize: "13px", color: i < 3 ? "#6ebc67" : "#ccc", width: "20px", textAlign: "center" }}>{entry.rank}</span>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: i < 3 ? "#6ebc67" : "#f0f0ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 600, color: i < 3 ? "#fff" : "#888", flexShrink: 0 }}>{entry.avatar}</div>
              <span style={{ flex: 1, fontSize: "14px", color: "#1a1a1a" }}>{entry.name}</span>
              {entry.badge && <span style={{ fontSize: "16px" }}>{entry.badge}</span>}
              <span style={{ fontFamily: "'Anton', serif", fontSize: "14px", color: "#1a1a1a" }}>{entry.value}</span>
            </div>
          ))}
          <p style={{ fontSize: "12px", color: "#aaa", textAlign: "center", marginTop: "16px" }}>Updated every 24 hours</p>
        </div>
      </div>

      {/* Upcoming — each card has a real image */}
      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>Coming Soon</p>
      <h2 style={{ fontFamily: "'Anton', serif", fontSize: "24px", color: "#1a1a1a", marginBottom: "20px" }}>Upcoming Challenges</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
        {upcoming.map((comp) => {
          const dc = difficultyColor[comp.difficulty];
          return (
            <div key={comp.title} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ height: "110px", overflow: "hidden", position: "relative" }}>
                <img src={comp.img} alt={comp.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
                <span style={{ position: "absolute", top: "10px", right: "10px", fontSize: "11px", fontWeight: 500, padding: "3px 8px", borderRadius: "99px", background: dc.bg, color: dc.color }}>{comp.difficulty}</span>
              </div>
              <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px" }}>{comp.category}</span>
                <h3 style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", lineHeight: 1.3 }}>{comp.title}</h3>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.6, flex: 1 }}>{comp.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #f0f0ea" }}>
                  <span style={{ fontSize: "12px", color: "#aaa" }}>Starts {comp.starts}</span>
                  <span style={{ fontSize: "12px", color: "#6ebc67", fontWeight: 500 }}>Notify me →</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
