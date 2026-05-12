import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE from "../config";

function CategoryPage() {
  const { categoryName } = useParams();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(all => {
        // filter to just this category
        const filtered = all.filter(a =>
          (a.category_name ?? a.category) === categoryName
        );
        setActivities(filtered);
      })
      .catch(err => console.error("Error loading activities:", err))
      .finally(() => setLoading(false));
  }, [categoryName]);

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "48px 32px" }}>

      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#888", marginBottom: "24px" }}>
        <Link to="/activities" style={{ color: "#888", textDecoration: "none" }}>Categories</Link>
        <span style={{ color: "#ccc" }}>›</span>
        <span style={{ color: "#6ebc67", fontWeight: 500 }}>{categoryName}</span>
      </div>

      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "32px", color: "#1a1a1a", marginBottom: "8px" }}>
        {categoryName}
      </h1>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "40px" }}>
        Browse our wide range of activities for this sport below.
      </p>

      {loading ? (
        <p style={{ color: "#888", fontSize: "14px" }}>Loading...</p>
      ) : activities.length === 0 ? (
        <p style={{ color: "#aaa", fontSize: "14px" }}>No activities found for this category.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {activities.map((activity) => (
            <div key={activity.id} style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", overflow: "hidden" }}>
              <img
                src={`/activity-images/${activity.activity_image ?? activity.image}`}
                alt={activity.name}
                style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
                onError={e => { e.target.style.display = "none"; }}
              />
              <div style={{ padding: "16px" }}>
                <h3 style={{ fontFamily: "'Anton', serif", fontSize: "16px", color: "#1a1a1a", marginBottom: "6px" }}>
                  {activity.name}
                </h3>
                <p style={{ fontSize: "13px", color: "#999", marginBottom: "14px" }}>
                  Explore this activity to learn more.
                </p>
                <Link
                  to={`/activities/${categoryName}/${activity.name}`}
                  style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", borderRadius: "8px", fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", padding: "10px", textDecoration: "none" }}
                >
                  Add to Workout
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default CategoryPage;