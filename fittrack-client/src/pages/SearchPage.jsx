import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API_BASE from "../config";

const categoryStyle = {
  Running:    { bg: "#e8f4f8", color: "#2d7dd2", img: "/images/running.jpg",    imgPos: "center 30%",  },
  Gym:        { bg: "#f0faf0", color: "#27682a", img: "/images/gym.avif",        imgPos: "center top",  },
  Football:   { bg: "#f0f8f0", color: "#27ae60", img: "/images/football.jpg",                     imgPos: "center",      },
  Basketball: { bg: "#fff8f0", color: "#e67e22", img: "/images/basketball.jpg",                     imgPos: "center",      },

};

const defaultStyle = { bg: "#f8f8f5", color: "#6ebc67", img: "/images/workout.jpg", imgPos: "center", };

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [input, setInput] = useState(query);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(setAllActivities)
      .catch(err => console.error("Error loading activities:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...new Set(allActivities.map(a => a.category).filter(Boolean))];

  const results = allActivities.filter(a => {
    const matchesQuery = !query.trim() ||
      a.name?.toLowerCase().includes(query.toLowerCase()) ||
      a.category?.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || a.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams(input.trim() ? { q: input.trim() } : {});
  }

  function handleClear() {
    setInput("");
    setSearchParams({});
  }

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "48px 32px" }}>

      {/* Header */}
      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
        Search
      </p>
      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(24px, 4vw, 36px)", color: "#1a1a1a", marginBottom: "24px" }}>
        {query ? `Results for "${query}"` : "All Activities"}
      </h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #6ebc67", borderRadius: "10px", padding: "0 14px", maxWidth: "520px", marginBottom: "24px" }}>
        <span style={{ color: "#aaa", fontSize: "16px" }}>⌕</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search exercises…"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1a1a1a", padding: "12px 0" }}
        />
        {input && (
          <button type="button" onClick={handleClear} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "16px" }}>✕</button>
        )}
      </form>

      {/* Category filter pills */}
      {!loading && (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {categories.map(cat => {
            const style = categoryStyle[cat] ?? defaultStyle;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", padding: "7px 16px", borderRadius: "99px", border: isActive ? "none" : "1px solid #e0e0d8", cursor: "pointer", background: isActive ? "#1a1a1a" : "#fff", color: isActive ? "#fff" : "#555", transition: "all 0.15s" }}
              >
                {cat !== "All" && <span style={{ marginRight: "5px" }}>{style.emoji}</span>}
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {loading ? (
        <p style={{ color: "#888", fontSize: "14px" }}>Loading...</p>
      ) : (
        <>
          <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "24px" }}>
            {results.length} activit{results.length !== 1 ? "ies" : "y"}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", background: "#fff", borderRadius: "16px", border: "1px solid #ebebeb" }}>
              <p style={{ fontSize: "32px", marginBottom: "12px" }}>🔍</p>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "20px", color: "#1a1a1a", marginBottom: "8px" }}>No results found</p>
              <p style={{ fontSize: "14px", color: "#aaa" }}>Try a different search term or browse all categories.</p>
              <button onClick={handleClear} style={{ marginTop: "16px", background: "#6ebc67", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer" }}>
                Clear search
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {results.map(activity => {
                const cat = activity.category;
                const cs = categoryStyle[cat] ?? defaultStyle;
                return (
                  <Link
                    key={activity.id}
                    to={`/activities/${activity.category}/${activity.name}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div
                      style={{ background: "#fff", borderRadius: "14px", border: "1px solid #ebebeb", overflow: "hidden", transition: "transform 0.18s, box-shadow 0.18s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      {/* Image or coloured fallback */}
                      <div style={{ height: "120px", overflow: "hidden", position: "relative", background: cs.bg }}>
                        {cs.img ? (
                          <>
                            <img src={cs.img} alt={activity.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: cs.imgPos }} />
                            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
                          </>
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
                            {cs.emoji}
                          </div>
                        )}
                        {/* Category badge */}
                        <span style={{ position: "absolute", bottom: "8px", left: "8px", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "10px", padding: "3px 8px", borderRadius: "99px", fontFamily: "'Anton', serif", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                          {cat}
                        </span>
                      </div>

                      <div style={{ padding: "14px 14px 16px" }}>
                        <h3 style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", marginBottom: "10px", letterSpacing: "0.3px", lineHeight: 1.2 }}>
                          {activity.name}
                        </h3>
                        <div style={{ background: cs.bg, color: cs.color, borderRadius: "6px", padding: "7px 10px", fontSize: "11px", fontWeight: 500, textAlign: "center", fontFamily: "'Anton', serif", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                          View Activity →
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default SearchPage;
