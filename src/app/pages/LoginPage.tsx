import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { Lock, User, AlertCircle, ArrowRight } from "lucide-react";

import logoUrl from "../../assets/logo-bloomfield-login.png";
import { useAuth } from "../auth/AuthContext";
import { useThemeColors } from "../hooks/useThemeColors";

/** Keys not present in useThemeColors — kept inline */
const LOGIN_COLORS = {
  bg: "#000117",
  borderSoft: "var(--bt-border-a32)",
  danger: "#f43860",
} as const;

interface LocationState {
  from?: { pathname?: string };
}

export function LoginPage() {
  const C = useThemeColors();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const redirectTo =
    (location.state as LocationState | null)?.from?.pathname ?? "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectTo]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Identifiants requis");
      return;
    }
    setError(null);
    setSubmitting(true);
    const result = login(username, password);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(redirectTo, { replace: true });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: LOGIN_COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient radial glow behind the card */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, var(--bt-accent-a08) 0%, transparent 55%), " +
            "radial-gradient(circle at 80% 80%, var(--bt-border-a25) 0%, transparent 45%), " +
            "radial-gradient(circle at 20% 85%, var(--bt-accent-a06) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle dot grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(84, 103, 141, 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Login card */}
      <div
        style={{
          position: "relative",
          width: 420,
          maxWidth: "calc(100vw - 48px)",
          background:
            "linear-gradient(180deg, var(--bt-overlay-92) 0%, var(--bt-overlay-98) 100%)",
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "36px 36px 28px",
          boxShadow:
            "0 24px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(214, 182, 141, 0.05), inset 0 1px 0 var(--bt-accent-a08)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Accent top stripe */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${C.accent} 50%, transparent 100%)`,
            opacity: 0.8,
          }}
        />

        {/* Logo — vertical mark (B icon + TERMINAL wordmark) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <img
            src={logoUrl}
            alt="Bloomfield Terminal"
            style={{
              height: 96,
              width: "auto",
              display: "block",
              objectFit: "contain",
              filter: "drop-shadow(0 6px 24px rgba(214, 82, 82, 0.25))",
            }}
            draggable={false}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            textAlign: "center",
            fontSize: 11,
            fontWeight: 600,
            color: C.muted,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Intelligence des Marchés · BRVM · UEMOA
        </div>

        {/* Subheading */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: C.dim }}>
            Identifiez-vous pour accéder à votre cockpit analyste
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} autoComplete="off">
          <InputField
            icon={<User size={14} />}
            label="Identifiant"
            type="text"
            value={username}
            onChange={setUsername}
            placeholder="admin"
            autoFocus
          />

          <div style={{ height: 14 }} />

          <InputField
            icon={<Lock size={14} />}
            label="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />

          {/* Error */}
          <div style={{ minHeight: 20, marginTop: 12 }}>
            {error && (
              <div
                role="alert"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 10px",
                  background: "rgba(244, 56, 96, 0.08)",
                  border: `1px solid rgba(244, 56, 96, 0.35)`,
                  borderRadius: 5,
                  fontSize: 12.5,
                  color: LOGIN_COLORS.danger,
                  fontWeight: 600,
                }}
              >
                <AlertCircle size={12} />
                {error}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              marginTop: 10,
              width: "100%",
              height: 42,
              borderRadius: 6,
              border: "none",
              background: `linear-gradient(180deg, ${C.accent} 0%, #b6966f 100%)`,
              color: LOGIN_COLORS.bg,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: submitting ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow:
                "0 8px 22px rgba(214, 182, 141, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
              transition: "transform 0.1s ease, opacity 0.15s ease",
              opacity: submitting ? 0.7 : 1,
            }}
            onMouseDown={(e) => {
              if (!submitting) e.currentTarget.style.transform = "translateY(1px)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Se connecter
            <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </form>

        {/* Footer — credentials hint + status */}
        <div
          style={{
            marginTop: 22,
            paddingTop: 16,
            borderTop: `1px solid ${LOGIN_COLORS.borderSoft}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 11,
            color: C.muted,
            letterSpacing: "0.04em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.green,
                boxShadow: `0 0 6px ${C.green}`,
              }}
            />
            <span style={{ color: C.green, fontWeight: 700 }}>SYSTÈME EN LIGNE</span>
          </div>
          <span>v0.0.1 · Bloomfield Intelligence</span>
        </div>
      </div>

      {/* Bottom credit line */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 11,
          color: C.muted,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        © 2026 Bloomfield Intelligence · Accès Restreint
      </div>
    </div>
  );
}

/* ─── InputField — themed text input ───────────────────────── */

function InputField({
  icon,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  icon: React.ReactNode;
  label: string;
  type: "text" | "password";
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const C = useThemeColors();
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: C.muted,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          height: 42,
          background: "var(--bt-overlay-70)",
          border: `1px solid ${focused ? C.accent : C.border}`,
          borderRadius: 6,
          paddingLeft: 12,
          paddingRight: 12,
          boxShadow: focused
            ? "0 0 0 3px var(--bt-accent-a08), inset 0 1px 0 var(--bt-accent-a08)"
            : "inset 0 1px 0 var(--bt-border-a20)",
          transition: "all 0.15s ease",
        }}
      >
        <span
          style={{
            color: focused ? C.accent : C.muted,
            display: "flex",
            alignItems: "center",
            marginRight: 10,
            transition: "color 0.15s",
          }}
        >
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={type === "password" ? "current-password" : "username"}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: C.text,
            fontSize: 15,
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
        />
      </div>
    </div>
  );
}
