import { useState } from "react";
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
} from "lucide-react";
import logoUrl from "../../../assets/logo-bloomfield-terminal.png";

const C = {
  surface: "#000430",
  elevated: "#000430",
  accent: "#d6b68d",
  border: "rgba(44, 61, 127,0.32)",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  gold: "#f4b942",
};

export function TopBar() {
  const [searchValue, setSearchValue] = useState("");

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
          style={{
            height: 28,
            width: "auto",
            display: "block",
            objectFit: "contain",
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
            background: "rgba(0, 4, 48,0.7)",
            border: `1px solid ${C.border}`,
            borderRadius: 6,
            paddingLeft: 32,
            paddingRight: 90,
            color: C.text,
            fontSize: 12,
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
              fontSize: 9,
              color: C.muted,
              background: "rgba(44, 61, 127,0.25)",
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
          background: "rgba(214, 182, 141,0.08)",
          border: `1px solid rgba(214, 182, 141,0.25)`,
          borderRadius: 6,
          color: C.accent,
          fontSize: 11,
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
        <span style={{ fontSize: 10, color: "#10c87a", fontWeight: 600, letterSpacing: "0.08em" }}>
          LIVE
        </span>
      </div>

      {/* Date */}
      <div style={{ fontSize: 11, color: C.dim, fontWeight: 500 }}>
        Mer 08 Avr 2026
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

      {/* Alerts */}
      <button
        style={{
          position: "relative",
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "rgba(0, 4, 48,0.5)",
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
            border: "1.5px solid #000430",
          }}
        />
      </button>

      {/* Watchlist */}
      <button
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: "rgba(0, 4, 48,0.5)",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 8px",
          borderRadius: 6,
          background: "rgba(0, 4, 48,0.5)",
          border: `1px solid ${C.border}`,
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 9,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          AK
        </div>
        <div>
          <div style={{ fontSize: 11, color: C.text, fontWeight: 600, lineHeight: 1 }}>
            Adjoua Koné
          </div>
          <div style={{ fontSize: 9, color: C.dim, lineHeight: 1, marginTop: 2 }}>
            Analyste Senior
          </div>
        </div>
        <ChevronDown size={11} color={C.muted} />
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
        background: accent ? "rgba(214, 182, 141,0.1)" : "rgba(0, 4, 48,0.5)",
        border: `1px solid ${accent ? "rgba(214, 182, 141,0.3)" : "rgba(44, 61, 127,0.32)"}`,
        borderRadius: 6,
        color: accent ? "#d6b68d" : "#6b96b8",
        fontSize: 11,
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
