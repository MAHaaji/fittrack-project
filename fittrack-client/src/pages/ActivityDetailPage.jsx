import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ActivityDetailPage() {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/activities/${activityId}`)
      .then(r => r.json())
      .then(setActivity)
      .finally(() => setLoading(false));
  }, [activityId]);

  if (loading) return <p style={{ padding: "48px 32px", color: "#888" }}>Loading...</p>;
  if (!activity) return <p style={{ padding: "48px 32px", color: "#888" }}>Activity not found.</p>;

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "48px 32px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#888", marginBottom: "24px" }}>
        <Link to="/activities" style={{ color: "#888", textDecoration: "none" }}>Categories</Link>
        <span style={{ color: "#ccc" }}>›</span>
        <Link to={`/activities/${activity.category_id}`} style={{ color: "#888", textDecoration: "none" }}>
          {activity.category_name}
        </Link>
        <span style={{ color: "#ccc" }}>›</span>
        <span style={{ color: "#6ebc67", fontWeight: 500 }}>{activity.activity_name}</span>
      </div>

      {/* Hero */}
      <div style={{
        background: "#1a1a1a", borderRadius: "16px",
        padding: "32px 28px", color: "#fff",
        display: "flex", alignItems: "center", gap: "20px",
        marginBottom: "20px",
      }}>
        <img
          src={`/activity-images/${activity.activity_image}`}
          alt={activity.activity_name}
          style={{ width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }}
          onError={e => { e.target.style.display = "none"; }}
        />
        <div>
          <h1 style={{ fontFamily: "'Anton', serif", fontSize: "28px", marginBottom: "4px" }}>
            {activity.activity_name}
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)" }}>
            {activity.category_name}
          </p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            background: "rgba(110,188,103,0.15)", border: "1px solid rgba(110,188,103,0.3)",
            borderRadius: "99px", padding: "3px 12px",
            fontSize: "12px", color: "#6ebc67", marginTop: "10px",
          }}>
            <span style={{ width: "6px", height: "6px", background: "#6ebc67", borderRadius: "50%", display: "inline-block" }} />
            Beginner friendly
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{
        background: "#fff", border: "1px solid #ebebeb",
        borderRadius: "14px", padding: "20px", marginBottom: "16px",
      }}>
        <h2 style={{ fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a", marginBottom: "10px" }}>
          About this activity
        </h2>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>
          {activity.activity_description ?? "Full details coming soon."}
        </p>
      </div>

      {/* Log CTA */}
      <Link
        to="/workout-log"
        style={{
          display: "block", textAlign: "center",
          background: "#6ebc67", color: "#fff",
          borderRadius: "10px",
          fontFamily: "'Anton', serif", fontSize: "15px",
          letterSpacing: "0.5px", textTransform: "uppercase",
          padding: "16px", textDecoration: "none",
        }}
      >
        Log This Workout
      </Link>
    </main>
  );
}

export default ActivityDetailPage;