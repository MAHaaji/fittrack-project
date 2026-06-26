import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utils/api";

const plans = [
  {
    name: "Starter",
    price: { monthly: "Free", annual: "Free" },
    tag: null,
    description: "Perfect for getting started with your fitness journey.",
    color: "#f8f8f5",
    border: "#ddd",
    cta: "Get Started",
    ctaTo: "/register",
    ctaStyle: "outline",
    features: [
      { label: "Browse all activities & categories", included: true },
      { label: "Search exercises", included: true },
      { label: "Workout log (up to 5 per month)", included: true },
      { label: "Basic dashboard stats", included: true },
      { label: "Progress charts", included: false },
      { label: "Competitions entry", included: false },
      { label: "Workout export (CSV)", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    planKey: "pro",
    price: { monthly: "£4.99", annual: "£3.99" },
    tag: "Most Popular",
    description: "For anyone serious about tracking and improving their fitness.",
    color: "#fff",
    border: "#6ebc67",
    cta: "Start Free Trial",
    ctaTo: "/register",
    ctaStyle: "filled",
    features: [
      { label: "Everything in Starter", included: true },
      { label: "Unlimited workout logging", included: true },
      { label: "Full dashboard & progress charts", included: true },
      { label: "Distance & pace tracking", included: true },
      { label: "Competitions entry", included: false },
      { label: "Workout export (CSV)", included: true },
      { label: "Priority support", included: false },
      { label: "Personal coaching tips", included: false },
    ],
  },
  {
    name: "Elite",
    planKey: "elite",
    price: { monthly: "£9.99", annual: "£7.99" },
    tag: null,
    description: "Compete, connect, and push your limits with the full FitTrack experience.",
    color: "#1a1a1a",
    border: "#1a1a1a",
    cta: "Go Elite",
    ctaTo: "/register",
    ctaStyle: "dark",
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Competitions entry & leaderboards", included: true },
      { label: "Personal coaching tips", included: true },
      { label: "Workout export (CSV & PDF)", included: true },
      { label: "Early access to new features", included: true },
      { label: "Priority support", included: true },
      { label: "Custom activity categories", included: true },
      { label: "Advanced analytics", included: true },
    ],
  },
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes — cancel whenever you like. You keep access until the end of your billing period, and we never charge you again after that." },
  { q: "Is there a free trial for Pro?", a: "Yes, Pro comes with a 14-day free trial. No card required to start." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, as well as PayPal. All payments are secured by Stripe." },
  { q: "Can I switch plans?", a: "Absolutely. You can upgrade or downgrade at any time from your account settings. Changes take effect immediately." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [checkoutLoadingPlan, setCheckoutLoadingPlan] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const { user } = useAuth();

  // Starts a Stripe Checkout session for a paid plan.
  //
  // What happens here:
  //   1. We ask OUR backend to create the session (the backend holds the
  //      Stripe secret key — it never touches this file or the browser).
  //   2. The backend replies with just a URL — no card fields, no secrets.
  //   3. We redirect the whole browser tab to that URL. From this point on
  //      the user is on a page hosted by Stripe, not by FitTrack — card
  //      details are typed there, not here.
  // This component never sees, stores, or transmits real card data.
  async function startCheckout(planKey) {
    setCheckoutError("");
    setCheckoutLoadingPlan(planKey);

    try {
      const response = await apiFetch("/api/payments/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ plan: planKey }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.message || "Unable to start checkout.");
      }

      // Full-page redirect to Stripe's hosted Checkout page.
      window.location.href = data.url;
    } catch (err) {
      console.error("Stripe checkout failed:", err);
      setCheckoutError(err.message || "Something went wrong starting checkout.");
      setCheckoutLoadingPlan(null);
    }
  }

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", padding: "56px 32px 80px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "10px" }}>
          Plans & Pricing
        </p>
        <h1 style={{ fontFamily: "'Anton', serif", fontSize: "clamp(32px, 5vw, 48px)", color: "#1a1a1a", marginBottom: "14px", lineHeight: 1.1 }}>
          Choose your plan
        </h1>
        <p style={{ fontSize: "15px", color: "#888", maxWidth: "460px", margin: "0 auto 28px", lineHeight: 1.7 }}>
          Start free and upgrade when you're ready. No hidden fees, no surprises.
        </p>

        {/* Billing toggle */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#fff", border: "1px solid #ebebeb", borderRadius: "99px", padding: "4px 6px" }}>
          <button
            onClick={() => setAnnual(false)}
            style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", padding: "6px 18px", borderRadius: "99px", border: "none", cursor: "pointer", background: !annual ? "#1a1a1a" : "transparent", color: !annual ? "#fff" : "#888", transition: "all 0.2s" }}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "0.5px", textTransform: "uppercase", padding: "6px 18px", borderRadius: "99px", border: "none", cursor: "pointer", background: annual ? "#1a1a1a" : "transparent", color: annual ? "#fff" : "#888", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "8px" }}
          >
            Annual
            <span style={{ background: "#6ebc67", color: "#fff", fontSize: "10px", padding: "2px 6px", borderRadius: "99px" }}>–20%</span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "0 auto 72px" }}>
        {plans.map((plan) => {
          const isPopular = plan.tag === "Most Popular";
          const isDark = plan.ctaStyle === "dark";
          return (
            <div
              key={plan.name}
              style={{
                background: isDark ? "#1a1a1a" : "#fff",
                borderRadius: "18px",
                border: `${isPopular ? "2px" : "1px"} solid ${plan.border}`,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              {plan.tag && (
                <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#6ebc67", color: "#fff", fontFamily: "'Anton', serif", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 14px", borderRadius: "99px", whiteSpace: "nowrap" }}>
                  {plan.tag}
                </div>
              )}

              <p style={{ fontFamily: "'Anton', serif", fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: isDark ? "#6ebc67" : "#6ebc67", marginBottom: "6px" }}>
                {plan.name}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                <span style={{ fontFamily: "'Anton', serif", fontSize: "36px", color: isDark ? "#fff" : "#1a1a1a" }}>
                  {annual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly !== "Free" && (
                  <span style={{ fontSize: "13px", color: isDark ? "#888" : "#aaa" }}>/mo</span>
                )}
              </div>
              <p style={{ fontSize: "13px", color: isDark ? "#888" : "#888", marginBottom: "24px", lineHeight: 1.6 }}>
                {plan.description}
              </p>

              <div style={{ borderTop: `1px solid ${isDark ? "#2e2e2e" : "#f0f0ea"}`, paddingTop: "20px", marginBottom: "24px", flex: 1 }}>
                {plan.features.map((f) => (
                  <div key={f.label} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", color: f.included ? "#6ebc67" : (isDark ? "#444" : "#ddd"), flexShrink: 0, marginTop: "1px" }}>
                      {f.included ? "✓" : "✕"}
                    </span>
                    <span style={{ fontSize: "13px", color: f.included ? (isDark ? "#ccc" : "#444") : (isDark ? "#555" : "#bbb"), lineHeight: 1.5 }}>
                      {f.label}
                    </span>
                  </div>
                ))}
              </div>

              {plan.planKey && user ? (
                // Logged-in user picking a paid plan → start Stripe Checkout
                <button
                  onClick={() => startCheckout(plan.planKey)}
                  disabled={checkoutLoadingPlan === plan.planKey}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "13px",
                    borderRadius: "10px",
                    fontFamily: "'Anton', serif",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    border: "none",
                    cursor: checkoutLoadingPlan === plan.planKey ? "default" : "pointer",
                    background: plan.ctaStyle === "filled" ? "#6ebc67" : plan.ctaStyle === "dark" ? "#6ebc67" : "transparent",
                    color: plan.ctaStyle === "outline" ? "#1a1a1a" : "#fff",
                    opacity: checkoutLoadingPlan === plan.planKey ? 0.7 : 1,
                    transition: "opacity 0.15s",
                  }}
                >
                  {checkoutLoadingPlan === plan.planKey ? "Redirecting to Stripe…" : plan.cta}
                </button>
              ) : (
                // Logged-out visitors (or the free Starter plan) just navigate
                <Link
                  to={user ? "/dashboard" : plan.ctaTo}
                  style={{
                    display: "block",
                    textAlign: "center",
                    padding: "13px",
                    borderRadius: "10px",
                    fontFamily: "'Anton', serif",
                    fontSize: "14px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    background: plan.ctaStyle === "filled" ? "#6ebc67" : plan.ctaStyle === "dark" ? "#6ebc67" : "transparent",
                    color: plan.ctaStyle === "outline" ? "#1a1a1a" : "#fff",
                    border: plan.ctaStyle === "outline" ? "1.5px solid #ddd" : "none",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  {plan.cta}
                </Link>
              )}

              {checkoutError && checkoutLoadingPlan === null && plan.planKey && (
                <p style={{ fontSize: "12px", color: "#c0392b", marginTop: "10px", textAlign: "center" }}>
                  {checkoutError}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* FAQ strip */}
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
          Questions
        </p>
        <h2 style={{ fontFamily: "'Anton', serif", fontSize: "26px", color: "#1a1a1a", marginBottom: "28px" }}>
          Pricing FAQ
        </h2>
        <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #ebebeb", overflow: "hidden" }}>
          {faqs.map((item, i) => (
            <div key={i} style={{ borderBottom: i < faqs.length - 1 ? "1px solid #f0f0ea" : "none" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "18px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
              >
                <span style={{ fontFamily: "'Anton', serif", fontSize: "15px", color: "#1a1a1a", letterSpacing: "0.3px" }}>{item.q}</span>
                <span style={{ fontSize: "18px", color: "#6ebc67", flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 18px", fontSize: "14px", color: "#666", lineHeight: 1.7 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
