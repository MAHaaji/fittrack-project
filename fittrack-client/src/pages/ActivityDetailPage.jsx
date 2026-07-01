import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE from "../config";


const categoryContent = {
  Running: {
    img: "/images/running.jpg",
    imgPos: "center 30%",
    color: "#e8f4f8",
    accent: "#2d7dd2",
    tips: [
      "Warm up with 5 minutes of brisk walking before your run.",
      "Keep a steady pace — you should be able to hold a conversation.",
      "Land midfoot, not heel-first, to reduce impact on your joints.",
      "Cool down and stretch your calves, hamstrings and hip flexors after.",
    ],
    muscles: ["Quadriceps", "Hamstrings", "Calves", "Core", "Glutes"],
    difficulty: "Beginner friendly",
    calories: "~400–600 kcal/hr",
  },
  Gym: {
    img: "/images/gym.avif",
    imgPos: "center top",
    color: "#f0f4f0",
    accent: "#6ebc67",
    tips: [
      "Always warm up with light cardio or dynamic stretching.",
      "Focus on form over weight — quality reps beat heavy, sloppy lifts.",
      "Rest 60–90 seconds between sets for hypertrophy, longer for strength.",
      "Log your weights each session so you can track progressive overload.",
    ],
    muscles: ["Chest", "Back", "Shoulders", "Arms", "Core", "Legs"],
    difficulty: "All levels",
    calories: "~300–500 kcal/hr",
  },
  Football: {
    img: null,
    imgPos: "center",
    color: "#f0f8f0",
    accent: "#27ae60",
    tips: [
      "Develop both feet — being two-footed makes you far harder to defend.",
      "Always know where your nearest teammates are before you receive the ball.",
      "Work on explosive sprint intervals to simulate match intensity.",
      "Study set pieces — goals from corners and free kicks win matches.",
    ],
    muscles: ["Quadriceps", "Hamstrings", "Calves", "Hip Flexors", "Core"],
    difficulty: "All levels",
    calories: "~500–700 kcal/hr",
  },
  Basketball: {
    img: null,
    imgPos: "center",
    color: "#fff8f0",
    accent: "#e67e22",
    tips: [
      "Dribble without looking at the ball — keep your eyes up to read the game.",
      "Box out on every rebound, not just the ones you think you'll get.",
      "Shoot with the same form every time; muscle memory is everything.",
      "Work on your weak hand — most defenders will force you that way.",
    ],
    muscles: ["Legs", "Core", "Shoulders", "Arms", "Calves"],
    difficulty: "All levels",
    calories: "~450–650 kcal/hr",
  },
  Cycling: {
    img: null,
    imgPos: "center",
    color: "#f0f0f8",
    accent: "#8e44ad",
    tips: [
      "Set your saddle height so your knee has a slight bend at the bottom of the pedal stroke.",
      "Maintain a cadence of 80–100 rpm for efficient, joint-friendly cycling.",
      "Fuel every 45 minutes on longer rides — don't wait until you're hungry.",
      "Practice braking early and smoothly, especially on descents.",
    ],
    muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Core"],
    difficulty: "All levels",
    calories: "~400–800 kcal/hr",
  },
};

const defaultContent = {
  img: "/images/workout.jpg",
  imgPos: "center",
  color: "#f8f8f5",
  accent: "#6ebc67",
  tips: [
    "Warm up properly before starting.",
    "Focus on quality of movement over speed or load.",
    "Stay hydrated throughout your session.",
    "Cool down and stretch when you finish.",
  ],
  muscles: ["Full body"],
  difficulty: "All levels",
  calories: "~300–500 kcal/hr",
};

function ActivityDetailPage() {
  const { categoryName, activityName } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(all => {
        // Match by name (URL-decoded)
        const decoded = decodeURIComponent(activityName);
        const match = all.find(a =>
          (a.name ?? a.activity_name)?.toLowerCase() === decoded.toLowerCase()
        );
        setActivity(match ?? null);
      })
      .catch(err => console.error("Error loading activity:", err))
      .finally(() => setLoading(false));
  }, [activityName]);

  if (loading) return <p style={{ padding: "48px 32px", fontFamily: "'DM Sans', sans-serif", color: "#888" }}>Loading...</p>;

  // If not found, still show a helpful page with the name from the URL
  const displayName = decodeURIComponent(activityName);
  const displayCategory = activity?.category ?? categoryName;
  const content = categoryContent[displayCategory] ?? defaultContent;

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh" }}>

      {/* Hero image banner */}
      <div style={{ position: "relative", height: "260px", overflow: "hidden", background: "#1a1a1a" }}>
        {content.img && (
          <img
            src={content.img}
            alt={displayName}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: content.imgPos }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)" }} />

        {/* Breadcrumb */}
        <div style={{ position: "absolute", top: "20px", left: "32px", display: "flex", alignItems: "center", gap: "8px", fontSize: "13px" }}>
          <Link to="/activities" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>Categories</Link>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
          <Link to={`/activities/${displayCategory}`} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{displayCategory}</Link>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>›</span>
          <span style={{ color: "#6ebc67" }}>{displayName}</span>
        </div>

        {/* Title */}
        <div style={{ position: "absolute", bottom: "28px", left: "32px", right: "32px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(110,188,103,0.2)", border: "1px solid rgba(110,188,103,0.4)", borderRadius: "99px", padding: "3px 12px", fontSize: "11px", color: "#6ebc67", marginBottom: "10px", letterSpacing: "0.5px", textTransform: "uppercase", fontFamily: "'Anton', serif" }}>
            <span style={{ width: "5px", height: "5px", background: "#6ebc67", borderRadius: "50%", display: "inline-block" }} />
            {content.difficulty}
          </div>
          <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(28px, 4vw, 40px)", color: "#fff", lineHeight: 1.1 }}>
            {displayName}
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginTop: "6px" }}>
            {displayCategory}
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "32px", display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px", alignItems: "start", maxWidth: "1100px" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Tips */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: "14px", padding: "24px" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "6px" }}>
              Coach Tips
            </p>
            <h2 style={{ fontFamily: "'Anton', serif", fontSize: "20px", color: "#1a1a1a", marginBottom: "20px" }}>
              How to get the most from {displayName}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {content.tips.map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#f0faf0", border: "1px solid #c5e8c3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Anton', serif", fontSize: "11px", color: "#6ebc67" }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65, paddingTop: "2px" }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Log CTA */}
          <Link
            to="/workout-log"
            style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", borderRadius: "12px", fontFamily: "'Anton', serif", fontSize: "15px", letterSpacing: "0.5px", textTransform: "uppercase", padding: "18px", textDecoration: "none" }}
          >
            Log This Workout →
          </Link>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Stats card */}
          <div style={{ background: "#1a1a1a", borderRadius: "14px", padding: "20px", color: "#fff" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "16px" }}>
              At a Glance
            </p>
            {[
              { label: "Category",   value: displayCategory },
              { label: "Level",      value: content.difficulty },
              { label: "Est. Burn",  value: content.calories },
            ].map(({ label, value }) => (
              <div key={label} style={{ borderBottom: "1px solid #2a2a2a", padding: "10px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
                <span style={{ fontFamily: "'Anton', serif", fontSize: "14px", color: "#fff" }}>{value}</span>
              </div>
            ))}
          </div>

          {/* Muscles */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: "14px", padding: "20px" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "14px" }}>
              Muscles Worked
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {content.muscles.map(m => (
                <span key={m} style={{ background: "#f0faf0", color: "#27682a", border: "1px solid #c5e8c3", borderRadius: "99px", padding: "5px 12px", fontSize: "12px", fontWeight: 500 }}>
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Explore more */}
          <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: "14px", padding: "20px" }}>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#aaa", marginBottom: "12px" }}>
              More in {displayCategory}
            </p>
            <Link
              to={`/activities/${displayCategory}`}
              style={{ display: "block", textAlign: "center", border: "1.5px solid #ebebeb", color: "#1a1a1a", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", padding: "11px", textDecoration: "none" }}
            >
              Browse {displayCategory} →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ActivityDetailPage;
