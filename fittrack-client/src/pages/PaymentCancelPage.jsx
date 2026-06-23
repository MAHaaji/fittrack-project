import { Link } from "react-router-dom";

export default function PaymentCancelPage() {
  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
      <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #ebebeb", padding: "48px 40px", maxWidth: "440px", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fff0f0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "26px" }}>
          ✕
        </div>

        <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#c0392b", marginBottom: "8px" }}>
          Checkout Cancelled
        </p>

        <h1 style={{ fontFamily: "'Anton', serif", fontSize: "26px", color: "#1a1a1a", marginBottom: "14px" }}>
          No charge was made
        </h1>

        <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.7, marginBottom: "28px" }}>
          You left Stripe Checkout before completing payment. Your card was
          never charged, and FitTrack never had access to your card details
          at any point — that page is hosted entirely by Stripe.
        </p>

        <Link
          to="/pricing"
          style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", borderRadius: "10px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}
        >
          Back to Pricing
        </Link>
      </div>
    </main>
  );
}