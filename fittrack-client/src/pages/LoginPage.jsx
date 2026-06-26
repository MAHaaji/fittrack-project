import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_BASE from "../config";
import Footer from "../components/Footer";

const fieldStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "1.5px solid #e0e0d8",
  borderRadius: "9px",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: "14px",
  color: "#1a1a1a",
  background: "#fafaf8",
  outline: "none",
};

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      setSuccess("");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Invalid email or password.");
        setIsSubmitting(false);
        return;
      }

      login(data.token, data.user);

      setSuccess(
        `Login successful. Welcome back${data.user?.name ? `, ${data.user.name}` : ""}!`
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 900);
    } catch {
      setError("Unable to connect. Please try again.");
      setIsSubmitting(false);
    }
  }

  const focusStyle = { borderColor: "#6ebc67" };

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 16px",
          background: "#f8f8f5",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid #ebebeb",
            padding: "40px 36px",
            width: "100%",
            maxWidth: "400px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {success && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,255,255,0.96)",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "32px",
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  background: "#eaf7e8",
                  border: "1px solid #bfe3bb",
                  color: "#4fa948",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "34px",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                ✓
              </div>

              <h2
                style={{
                  fontFamily: "'Anton', serif",
                  fontSize: "24px",
                  letterSpacing: "0.5px",
                  color: "#1a1a1a",
                  marginBottom: "8px",
                }}
              >
                Login Successful
              </h2>

              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {success} Redirecting you to your dashboard...
              </p>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "28px",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                background: "#6ebc67",
                borderRadius: "50%",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Anton', serif",
                fontSize: "22px",
                letterSpacing: "1px",
                color: "#1a1a1a",
              }}
            >
              FitTrack
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Anton', serif",
              fontSize: "26px",
              color: "#1a1a1a",
              textAlign: "center",
              marginBottom: "6px",
              letterSpacing: "0.5px",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              fontSize: "13px",
              color: "#aaa",
              textAlign: "center",
              marginBottom: "28px",
            }}
          >
            Sign in to access your FitTrack account
          </p>

          {error && (
            <div
              style={{
                background: "#fff0f0",
                border: "1px solid #ffc5c5",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "13px",
                color: "#c0392b",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#e24b4a",
                  flexShrink: 0,
                }}
              />
              {error}
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#555",
                marginBottom: "5px",
                letterSpacing: "0.3px",
              }}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              style={{
                ...fieldStyle,
                ...(focusedField === "email" ? focusStyle : {}),
                opacity: isSubmitting ? 0.7 : 1,
              }}
            />
          </div>

          <div style={{ marginBottom: "8px" }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 500,
                color: "#555",
                marginBottom: "5px",
                letterSpacing: "0.3px",
              }}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              disabled={isSubmitting}
              style={{
                ...fieldStyle,
                ...(focusedField === "password" ? focusStyle : {}),
                opacity: isSubmitting ? 0.7 : 1,
              }}
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <Link
              to="/forgot-password"
              style={{
                fontSize: "12px",
                color: "#6ebc67",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Link>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              width: "100%",
              background: isSubmitting ? "#94cf8f" : "#6ebc67",
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              padding: "13px",
              fontFamily: "'Anton', serif",
              fontSize: "14px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              marginBottom: "20px",
            }}
          >
            {isSubmitting ? "Signing In..." : "Log In"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "12px",
              color: "#ccc",
              marginBottom: "20px",
            }}
          >
            <span style={{ flex: 1, height: "1px", background: "#ebebeb" }} />
            or
            <span style={{ flex: 1, height: "1px", background: "#ebebeb" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#6ebc67",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default LoginPage;