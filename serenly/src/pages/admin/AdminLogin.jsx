import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import assets from "../../assets/assets";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-brand-black)",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          top: "-10%",
          left: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239,105,5,0.16) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          bottom: "-15%",
          right: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,85,218,0.16) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 400,
          background: "rgba(245,245,245,0.04)",
          border: "1px solid rgba(245,245,245,0.1)",
          borderRadius: 20,
          padding: "2.75rem 2.25rem",
          backdropFilter: "blur(20px)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: "2rem",
            textDecoration: "none",
          }}
        >
          <img src={assets.logo} alt="Serenly" style={{ height: 32, width: 32 }} />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.4rem",
              color: "#F5F5F5",
            }}
          >
            Serenly
          </span>
        </Link>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.75rem",
            color: "#F5F5F5",
            marginBottom: "0.4rem",
          }}
        >
          Admin sign in
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "rgba(245,245,245,0.55)",
            marginBottom: "2rem",
            lineHeight: 1.6,
          }}
        >
          Sign in to view and manage contact form submissions.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.5)",
                marginBottom: 8,
              }}
            >
              <Mail size={12} /> Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@serenlydm.com"
              autoComplete="email"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: 10,
                background: "rgba(245,245,245,0.06)",
                border: "1.5px solid rgba(245,245,245,0.14)",
                color: "#F5F5F5",
                fontSize: "0.9375rem",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.5)",
                marginBottom: 8,
              }}
            >
              <Lock size={12} /> Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                borderRadius: 10,
                background: "rgba(245,245,245,0.06)",
                border: "1.5px solid rgba(245,245,245,0.14)",
                color: "#F5F5F5",
                fontSize: "0.9375rem",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: "0.8125rem",
                color: "#E2725B",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              marginTop: "0.5rem",
              borderRadius: 10,
              padding: "0.9rem 1.5rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Signing in…
              </>
            ) : (
              <>
                Sign in <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
