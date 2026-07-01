import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const categories = [
  {
    label: "General",
    faqs: [
      { q: "What is FitTrack?", a: "FitTrack is a fitness tracking platform that helps you discover exercises, log your workouts, track progress over time, and compete with a community of like-minded people. Whether you're just starting out or already training hard, FitTrack has tools for every level." },
      { q: "Is FitTrack free to use?", a: "Yes — FitTrack has a free Starter tier that gives you access to the activity library, search, and basic workout logging. For unlimited logging, charts, and competitions, you can upgrade to Pro or Elite." },
      { q: "Do I need to download an app?", a: "Not right now — FitTrack runs entirely in your browser on desktop and mobile. A native mobile app is on our roadmap." },
      { q: "What types of activities does FitTrack support?", a: "We currently support Running, Cycling, Gym, Football, and Basketball, with more categories being added regularly. You can also log any custom activity by typing in a name." },
    ],
  },
  {
    label: "Account",
    faqs: [
      { q: "How do I create an account?", a: "Click 'Register' in the navigation bar, enter your name, email, and a password of at least 8 characters. That's it — your account is ready immediately." },
      { q: "I forgot my password — what do I do?", a: "Password reset is coming soon. In the meantime, contact us at support@fittrack.io and we'll sort it within 24 hours." },
      { q: "Can I delete my account?", a: "Yes. Go to Account Settings and select 'Delete my account'. This permanently removes all your data and cannot be undone." },
      { q: "Is my data private?", a: "Yes. Your workout data is private by default and only visible to you. We do not sell personal data to third parties. See our Privacy Policy for full details." },
    ],
  },
  {
    label: "Workout Logging",
    faqs: [
      { q: "How do I log a workout?", a: "Go to Workout Log in the navigation, pick an activity from the dropdown, set the date and optional duration, add any notes, and hit 'Add Workout'. It's saved to your history immediately." },
      { q: "Can I edit a workout after saving it?", a: "Editing is on our near-term roadmap. For now, you can delete a logged entry and re-add it with the correct details." },
      { q: "Can I log workouts for past dates?", a: "Yes — the date picker on the workout log lets you choose any past date, so you can catch up on missed entries." },
      { q: "Is there a limit on how many workouts I can log?", a: "Free (Starter) accounts can log up to 5 workouts per month. Pro and Elite accounts have unlimited logging." },
    ],
  },
  {
    label: "Competitions",
    faqs: [
      { q: "How do competitions work?", a: "Each competition runs for a set period (usually one month) with a specific goal — most km run, most workouts completed, fastest 5K, etc. You join the challenge, log your relevant activities as normal, and your progress is automatically tracked on the leaderboard." },
      { q: "Which plan do I need to enter competitions?", a: "Competitions are available on the Pro and Elite plans. Elite members also get early access to new challenges." },
      { q: "Can I create my own challenge?", a: "Custom challenges for groups and clubs are on our roadmap for later this year. Follow our updates page to be notified when it launches." },
      { q: "Are the prizes real?", a: "Yes! Winners of our featured monthly challenges receive real prizes — typically free plan upgrades or branded FitTrack gear. Prize details are listed on each competition card." },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItem, setOpenItem] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = search.trim().length > 1
    ? categories.flatMap(c => c.faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).map(f => ({ ...f, _cat: c.label })))
    : null;

  return (
    <>
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "56px 32px 80px" }}>

      {/* Header */}
      <div style={{ maxWidth: "700px", margin: "0 auto 48px" }}>
        <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
          Help Centre
        </p>
        <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(28px, 4vw, 44px)", color: "#1a1a1a", marginBottom: "14px", lineHeight: 1.1 }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: "15px", color: "#888", marginBottom: "28px", lineHeight: 1.7 }}>
          Can't find what you're looking for? <Link to="/contact" style={{ color: "#6ebc67", textDecoration: "none" }}>Contact us</Link> and we'll get back to you within 24 hours.
        </p>

        {/* Search */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#fff", border: "1px solid #ebebeb", borderRadius: "10px", padding: "10px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
          <span style={{ color: "#bbb", fontSize: "16px" }}>⌕</span>
          <input
            type="text"
            placeholder="Search questions…"
            value={search}
            onChange={e => { setSearch(e.target.value); setOpenItem(null); }}
            style={{ flex: 1, border: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#1a1a1a", background: "transparent" }}
          />
          {search && (
            <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", fontSize: "16px" }}>×</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        {/* Search results */}
        {filtered !== null ? (
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <p style={{ fontFamily: "'Anton', serif", fontSize: "18px", color: "#1a1a1a", marginBottom: "8px" }}>No results found</p>
                <p style={{ fontSize: "14px", color: "#aaa" }}>Try different keywords or <Link to="/contact" style={{ color: "#6ebc67", textDecoration: "none" }}>ask us directly</Link>.</p>
              </div>
            ) : (
              <>
                <p style={{ fontSize: "13px", color: "#aaa", marginBottom: "16px" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"</p>
                <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ebebeb", overflow: "hidden" }}>
                  {filtered.map((item, i) => (
                    <AccordionItem key={i} item={item} index={`s-${i}`} openItem={openItem} setOpenItem={setOpenItem} tag={item._cat} />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px", alignItems: "start" }}>

            {/* Category sidebar */}
            <div style={{ position: "sticky", top: "84px" }}>
              {categories.map((cat, i) => (
                <button
                  key={cat.label}
                  onClick={() => { setActiveCategory(i); setOpenItem(null); }}
                  style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%", textAlign: "left", background: activeCategory === i ? "#fff" : "transparent", border: activeCategory === i ? "1px solid #ebebeb" : "1px solid transparent", borderRadius: "10px", padding: "11px 14px", marginBottom: "6px", cursor: "pointer", transition: "all 0.15s" }}
                >
                  <span style={{ fontSize: "16px" }}>{cat.icon}</span>
                  <span style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.3px", color: activeCategory === i ? "#1a1a1a" : "#888" }}>
                    {cat.label}
                  </span>
                  <span style={{ marginLeft: "auto", fontFamily: "'Anton', serif", fontSize: "11px", color: "#ccc" }}>
                    {cat.faqs.length}
                  </span>
                </button>
              ))}
            </div>

            {/* FAQ accordion */}
            <div>
              <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "6px" }}>
                {categories[activeCategory].icon} {categories[activeCategory].label}
              </p>
              <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ebebeb", overflow: "hidden" }}>
                {categories[activeCategory].faqs.map((item, i) => (
                  <AccordionItem
                    key={i}
                    item={item}
                    index={`${activeCategory}-${i}`}
                    openItem={openItem}
                    setOpenItem={setOpenItem}
                    isLast={i === categories[activeCategory].faqs.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Still need help */}
        <div style={{ marginTop: "60px", background: "#1a1a1a", borderRadius: "18px", padding: "36px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <p style={{ fontFamily: "'Anton', serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "6px" }}>
              Still stuck?
            </p>
            <h2 style={{ fontFamily: "'Anton', serif", fontSize: "22px", color: "#fff", marginBottom: "6px" }}>
              We're here to help
            </h2>
            <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.6 }}>
              Our support team replies within 24 hours on weekdays.
            </p>
          </div>
          <a
            href="mailto:support@fittrack.io"
            style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", background: "#6ebc67", color: "#fff", padding: "13px 24px", borderRadius: "10px", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            Email Support
          </a>
        </div>
      </div>
    </main>
     <Footer />
    </>
  );
}

function AccordionItem({ item, index, openItem, setOpenItem, isLast, tag }) {
  const isOpen = openItem === index;
  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid #f0f0ea" }}>
      <button
        onClick={() => setOpenItem(isOpen ? null : index)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "18px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}
      >
        <div>
          {tag && <span style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "4px" }}>{tag}</span>}
          <span style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", letterSpacing: "0.3px", display: "block" }}>{item.q}</span>
        </div>
        <span style={{ fontSize: "20px", color: "#6ebc67", flexShrink: 0, lineHeight: 1, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", display: "block", marginTop: "2px" }}>+</span>
      </button>
      {isOpen && (
        <div style={{ padding: "0 24px 20px", fontSize: "14px", color: "#555", lineHeight: 1.8, borderTop: "1px solid #f8f8f5" }}>
          {item.a}
        </div>
      )}
    </div>
  );
}
