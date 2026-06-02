import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_BASE from "../config";

function ActivitiesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map each category to a real image and fallback colour
  const categoryStyles = {
    Running:    { img: "/images/running.jpg",    pos: "center 30%", emoji: "🏃" },
    Football:   { img: "/images/football.jpg",                     pos: "center",     emoji: "⚽", bg: "#2e2a1a" },
    Gym:        { img: "/images/gym.avif",        pos: "center top", emoji: "💪" },
    Basketball: { img: "/images/basketball.jpg",                     pos: "center",     emoji: "🏀", bg: "#2e1e1a" },
    Stretching: { img: "/images/stretching.avif", pos: "center",    emoji: "🧘" },
  };

  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(activities => {
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
    <main style={{ background: "#f8f8f5", minHeight: "100vh" }}>

      {/* Banner — stretch.avif wide gym landscape */}
      <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
        <img
          src="/images/stretch.avif"
          alt="Gym interior"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
          <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
            Explore
          </p>
          <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(24px, 4vw, 36px)", color: "#fff", lineHeight: 1.1 }}>
            Fitness Categories
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", marginTop: "6px" }}>
            Choose a category to explore activities
          </p>
        </div>
      </div>

      {/* Category grid */}
      <div style={{ padding: "40px 32px" }}>
        {loading ? (
          <p style={{ color: "#888", fontSize: "14px" }}>Loading...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {categories.map((cat) => {
              const style = categoryStyles[cat.name] ?? { emoji: "🏅", bg: "#1a1a1a" };
              return (
                <Link key={cat.id} to={`/activities/${cat.name}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", overflow: "hidden", transition: "transform 0.18s, box-shadow 0.18s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ height: "140px", position: "relative", background: style.bg ?? "#1a1a1a", overflow: "hidden" }}>
                      {style.img ? (
                        <>
                          <img
                            src={style.img}
                            alt={cat.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: style.pos }}
                          />
                          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
                        </>
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "44px" }}>
                          {style.emoji}
                        </div>
                      )}
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
      </div>
    </main>
  );
}

export default ActivitiesPage;
