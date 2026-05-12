import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE from "../config";

function ActivitiesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryStyles = {
    Running:    { emoji: "", bg: "#1a2e1a" },
    Football:   { emoji: "", bg: "#2e2a1a" },
    Gym:        { emoji: "", bg: "#1a1a2e" },
    Cycling:    { emoji: "", bg: "#2e1a1a" },
    Basketball: { emoji: "", bg: "#2e1e1a" },
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(activities => {
        // derive unique categories from the activities list
        const seen = new Set();
        const unique = [];
        activities.forEach(a => {
  if (a.category && !seen.has(a.category)) {
    seen.add(a.category);
    unique.push({ name: a.category, id: a.category });
          }
        });
        setCategories(unique);
      })
      .catch(err => console.error("Error loading activities:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "48px 32px" }}>
      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
        Explore
      </p>
      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "32px", color: "#1a1a1a", marginBottom: "8px" }}>
        Fitness Categories
      </h1>
      <p style={{ fontSize: "14px", color: "#888", marginBottom: "40px" }}>
        Choose a category to explore activities
      </p>

      {loading ? (
        <p style={{ color: "#888", fontSize: "14px" }}>Loading...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {categories.map((cat) => {
            const style = categoryStyles[cat.name] ?? { emoji: "🏅", bg: "#1a1a1a" };
            return (
              <Link key={cat.id} to={`/activities/${cat.name}`} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", overflow: "hidden", transition: "transform 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ height: "120px", background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
                    {style.emoji}
                  </div>
                  <div style={{ textAlign: "center", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", color: "#1a1a1a", padding: "14px 8px" }}>
                    {cat.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default ActivitiesPage;