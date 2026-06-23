import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main style={{ background: "#f8f8f5", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px" }}>
      <div style={{ background: "#fff", borderRadius: "18px", border: "1px solid #ebebeb", padding: "48px 40px", maxWidth: "440px", textAlign: "center" }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#f0faf0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "26px" }}>
          ✓
        </div>

        <p style={{ fontFamily: "'Anton', serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#6ebc67", marginBottom: "8px" }}>
          Payment Complete
        </p>

        <h1 style={{ fontFamily: "'Anton', serif", fontSize: "26px", color: "#1a1a1a", marginBottom: "14px" }}>
          Thanks for upgrading
        </h1>

        <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.7, marginBottom: "8px" }}>
          Your Stripe Checkout session completed successfully. In this
          prototype, plan access isn't unlocked automatically yet — that
          step requires a backend webhook to confirm payment and update
          your account, which is planned as a follow-up.
        </p>

        {sessionId && (
          <p style={{ fontSize: "11px", color: "#bbb", marginBottom: "28px", wordBreak: "break-all" }}>
            Session ref: {sessionId}
          </p>
        )}

        <Link
          to="/dashboard"
          style={{ display: "block", textAlign: "center", background: "#6ebc67", color: "#fff", borderRadius: "10px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", textDecoration: "none" }}
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
