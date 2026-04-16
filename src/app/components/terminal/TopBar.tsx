import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Bell,
  ChevronDown,
  RefreshCw,
  Download,
  BookMarked,
  Plus,
  Star,
  SlidersHorizontal,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import logoUrl from "../../../assets/logo-bloomfield-terminal.png";
import { useAuth } from "../../auth/AuthContext";
import { useBloomfieldTheme } from "../../context/ThemeContext";
import { useThemeColors } from "../../hooks/useThemeColors";

export function TopBar() {
  const C = useThemeColors();
  const [searchValue, setSearchValue] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { user, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useBloomfieldTheme();
  const navigate = useNavigate();

  // Close the user menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/login", { replace: true });
  };

  const displayName = user?.name ?? "Adjoua Koné";
  const displayRole = user?.role ?? "Analyste Senior";
  const initials = displayName
    .split(/\s+/)
    .map((s) => s[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        height: 52,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 12,
        flexShrink: 0,
        zIndex: 50,
      }}
    >
      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          minWidth: 160,
          flexShrink: 0,
        }}
      >
        <img
          src={logoUrl}
          alt="Bloomfield Terminal"
          onClick={() => navigate("/")}
          style={{
            height: 28,
            width: "auto",
            display: "block",
            objectFit: "contain",
            cursor: "pointer",
          }}
          draggable={false}
        />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

      {/* Smart Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 580,
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Search
          size={14}
          style={{ position: "absolute", left: 10, color: C.dim, pointerEvents: "none" }}
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Recherche par ISIN, société, pays, secteur, indicateur..."
          style={{
            width: "100%",
            height: 32,
            background: "var(--bt-overlay-70)",
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            paddingLeft: 32,
            paddingRight: 90,
            color: C.text,
            fontSize: 14,
            outline: "none",
            fontWeight: 400,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: C.muted,
              background: "var(--bt-border-a25)",
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: "1px 5px",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            ⌘K
          </span>
        </div>
      </div>

      {/* Workspace selector */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "4px 10px",
          background: "var(--bt-accent-a08)",
          border: `1px solid var(--bt-accent-a25)`,
          borderRadius: 6,
          color: C.accent,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        <BookMarked size={12} />
        Cockpit Principal
        <ChevronDown size={11} />
      </button>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <TopAction icon={<Plus size={13} />} label="Widget" accent />
        <TopAction icon={<SlidersHorizontal size={13} />} label="Filtres" />
        <TopAction icon={<Download size={13} />} label="Export" />
        <TopAction icon={<RefreshCw size={13} />} label="Sync" />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

      {/* Live status */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#10c87a",
            boxShadow: "0 0 6px #10c87a",
          }}
        />
        <span style={{ fontSize: 12, color: "#10c87a", fontWeight: 600, letterSpacing: "0.08em" }}>
          LIVE
        </span>
      </div>

      {/* Date */}
      <div style={{ fontSize: 13, color: C.dim, fontWeight: 500 }}>
        Mer 08 Avr 2026
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={isDark ? "Mode clair" : "Mode sombre"}
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: isDark ? "rgba(244,185,66,0.08)" : "var(--bt-border-a08)",
          border: `1px solid ${isDark ? "rgba(244,185,66,0.22)" : "var(--bt-border-a20)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: isDark ? C.gold : "#4a6480",
          transition: "all 0.2s",
        }}
      >
        {isDark ? <Sun size={14} /> : <Moon size={14} />}
      </button>

      {/* Alerts */}
      <button
        style={{
          position: "relative",
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "var(--bt-overlay-50)",
          border: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: C.dim,
        }}
      >
        <Bell size={14} />
        <div
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: C.gold,
            border: `1.5px solid ${C.surface}`,
          }}
        />
      </button>

      {/* Watchlist */}
      <button
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "var(--bt-overlay-50)",
          border: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: C.dim,
        }}
      >
        <Star size={14} />
      </button>

      {/* User profile */}
      <div ref={menuRef} style={{ position: "relative" }}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 8px",
            borderRadius: 6,
            background: menuOpen ? "var(--bt-accent-a08)" : "var(--bt-overlay-50)",
            border: `1px solid ${menuOpen ? "var(--bt-accent-a35)" : C.border}`,
            cursor: "pointer",
            transition: "background 0.15s, border-color 0.15s",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #d6b68d 0%, #b6966f 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#000117",
            }}
          >
            {initials}
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 13, color: C.text, fontWeight: 600, lineHeight: 1 }}>
              {displayName}
            </div>
            <div style={{ fontSize: 11, color: C.dim, lineHeight: 1, marginTop: 2 }}>
              {displayRole}
            </div>
          </div>
          <ChevronDown
            size={11}
            color={C.muted}
            style={{
              transform: menuOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.15s",
            }}
          />
        </button>

        {menuOpen && (
          <div
            role="menu"
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              right: 0,
              minWidth: 200,
              background: "var(--bt-overlay-98)",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              boxShadow: "0 12px 32px rgba(0, 0, 0, 0.55), inset 0 1px 0 var(--bt-accent-a06)",
              zIndex: 100,
              overflow: "hidden",
              backdropFilter: "blur(8px)",
            }}
          >
            <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
                {displayName}
              </div>
              <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>
                {displayRole}
                {user?.username ? ` · @${user.username}` : ""}
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                background: "transparent",
                border: "none",
                color: "#f43860",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
                textAlign: "left",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(244, 56, 96, 0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <LogOut size={13} />
              Se déconnecter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TopAction({
  icon,
  label,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  accent?: boolean;
}) {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 9px",
        background: accent ? "var(--bt-accent-a10)" : "var(--bt-overlay-50)",
        border: `1px solid ${accent ? "var(--bt-accent-a30)" : "var(--bt-border-a32)"}`,
        borderRadius: 6,
        color: accent ? "#d6b68d" : "#6b96b8",
        fontSize: 13,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.01em",
      }}
    >
      {icon}
      {label}
    </button>
  );
}
