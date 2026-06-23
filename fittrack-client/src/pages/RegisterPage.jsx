import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE from "../config";
import Footer from "../components/Footer";

const fieldStyle = {
  width: "100%", padding: "11px 14px",
  border: "1.5px solid #e0e0d8", borderRadius: "9px",
  fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
  color: "#1a1a1a", background: "#fafaf8", outline: "none",
};

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Registration failed. Please try again.");
        return;
      }
      // account created — send them to login
      navigate("/login");
    } catch {
      setError("Unable to connect. Please try again.");
    }
  }

  const focusStyle = { borderColor: "#6ebc67" };

  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
    { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
    { name: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Repeat your password" },
  ];

  return (
    <>
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: "#f8f8f5" }}>
      <div style={{ background: "#fff", borderRadius: "20px", border: "1px solid #ebebeb", padding: "40px 36px", width: "100%", maxWidth: "400px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
          <span style={{ width: "10px", height: "10px", background: "#6ebc67", borderRadius: "50%", display: "inline-block" }} />
          <span style={{ fontFamily: "'Anton', serif", fontSize: "22px", letterSpacing: "1px", color: "#1a1a1a" }}>FitTrack</span>
        </div>

        <h1 style={{ fontFamily: "'Anton', serif", fontSize: "26px", color: "#1a1a1a", textAlign: "center", marginBottom: "6px", letterSpacing: "0.5px" }}>
          Create Account
        </h1>
        <p style={{ fontSize: "13px", color: "#aaa", textAlign: "center", marginBottom: "28px" }}>
          Join FitTrack and start your fitness journey
        </p>

        {error && (
          <div style={{ background: "#fff0f0", border: "1px solid #ffc5c5", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#c0392b", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#e24b4a", flexShrink: 0 }} />
            {error}
          </div>
        )}

        {fields.map(({ name, label, type, placeholder }) => (
          <div key={name} style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#555", marginBottom: "5px" }}>
              {label}
            </label>
            <input
              type={type} name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              style={{ ...fieldStyle, ...(focusedField === name ? focusStyle : {}) }}
            />
          </div>
        ))}

        {formData.password.length > 0 && (
          <div style={{ marginTop: "-8px", marginBottom: "16px", display: "flex", gap: "4px" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ flex: 1, height: "3px", borderRadius: "99px", background: formData.password.length >= i * 4 ? "#6ebc67" : "#e0e0d8", transition: "background 0.2s" }} />
            ))}
            <span style={{ fontSize: "11px", color: "#aaa", marginLeft: "6px", whiteSpace: "nowrap" }}>
              {formData.password.length < 4 ? "Weak" : formData.password.length < 8 ? "Fair" : "Strong"}
            </span>
          </div>
        )}

        <button onClick={handleSubmit} style={{ width: "100%", background: "#6ebc67", color: "#fff", border: "none", borderRadius: "9px", padding: "13px", fontFamily: "'Anton', serif", fontSize: "14px", letterSpacing: "0.5px", textTransform: "uppercase", cursor: "pointer", marginBottom: "20px", marginTop: "4px" }}>
          Create Account
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#ccc", marginBottom: "20px" }}>
          <span style={{ flex: 1, height: "1px", background: "#ebebeb" }} />
          or
          <span style={{ flex: 1, height: "1px", background: "#ebebeb" }} />
        </div>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#888" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#6ebc67", textDecoration: "none", fontWeight: 500 }}>
            Log in
          </Link>
        </p>
      </div>
    </main>
    <Footer />
    </>
  );
}

export default RegisterPage;