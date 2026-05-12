import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API_BASE from "../config";

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [input, setInput] = useState(query);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch ALL activities once on mount — same as PHP's searchActivities with no filter
  useEffect(() => {
    fetch(`${API_BASE}/api/activities`)
      .then(r => r.json())
      .then(setAllActivities)
      .catch(err => console.error("Error loading activities:", err))
      .finally(() => setLoading(false));
  }, []);

  // filter client-side — no extra backend endpoint needed
  const results = query.trim()
    ? allActivities.filter(a =>
        a.name?.toLowerCase().includes(query.toLowerCase()) ||
        a.category_name?.toLowerCase().includes(query.toLowerCase())
      )
    : allActivities;

  function handleSubmit(e) {
    e.preventDefault();
    setSearchParams(input.trim() ? { q: input.trim() } : {});
  }

  function handleClear() {
    setInput("");
    setSearchParams({});
  }

  const cardStyle = {
    background: "#fff",
    borderRadius: "14px",
    border: "1px solid #f0f0f0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
    overflow: "hidden",
    textDecoration: "none",
    display: "block",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "48px 32px" }}>

      <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
        Search
      </p>
      <h1 style={{ fontFamily: "'Anton', serif", fontSize: "32px", color: "#1a1a1a", marginBottom: "24px" }}>
        {query ? `Results for "${query}"` : "All Activities"}
      </h1>

      {/* Search bar */}
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1.5px solid #6ebc67", borderRadius: "10px", padding: "0 14px", maxWidth: "520px", marginBottom: "40px" }}>
        <span style={{ color: "#aaa", fontSize: "16px" }}>⌕</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search exercises…"
          style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1a1a1a", padding: "12px 0" }}
        />
        {input && (
          <button type="button" onClick={handleClear}
            style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", fontSize: "16px" }}>
            ✕
          </button>
        )}
      </form>

      {loading ? (
        <p style={{ color: "#888", fontSize: "14px" }}>Loading...</p>
      ) : (
        <>
          <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "24px" }}>
            {results.length} activit{results.length !== 1 ? "ies" : "y"}
          </p>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "20px", color: "#1a1a1a", marginBottom: "8px" }}>No results found</p>
              <p style={{ fontSize: "14px", color: "#aaa" }}>Try a different search term.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
              {results.map(activity => (
                <Link
                  key={activity.id}
                  to={`/activities/${activity.category_name ?? activity.category}/${activity.name}`}
                  style={cardStyle}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.08)"; }}
                >
                  <img
                    src={`/activity-images/${activity.activity_image ?? activity.image}`}
                    alt={activity.name}
                    style={{ width: "100%", height: "160px", objectFit: "cover", display: "block", borderRadius: "12px 12px 0 0" }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  <div style={{ padding: "14px", textAlign: "center" }}>
                    <h3 style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", marginBottom: "4px", letterSpacing: "0.3px" }}>
                      {activity.name}
                    </h3>
                    {(activity.category_name ?? activity.category) && (
                      <p style={{ fontSize: "11px", color: "#aaa" }}>
                        {activity.category_name ?? activity.category}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default SearchPage;