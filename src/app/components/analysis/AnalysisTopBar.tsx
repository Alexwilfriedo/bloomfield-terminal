import { useState } from "react";
import type { ReactNode } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Download,
  BarChart3,
  Users,
  FileText,
  RefreshCw,
  Plus,
  Bookmark,
  AlertCircle,
} from "lucide-react";

const C = {
  surface: "#000430",
  accent: "#d6b68d",
  border: "rgba(44, 61, 127,0.32)",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  purple: "#a78bfa",
};

const SECTORS = ["Tous", "Banques", "Télécoms", "Pétrole & Gaz", "Ciment & BTP", "Agroalimentaire", "Assurances", "Commerce"];
const MARKETS = ["BRVM", "NSE", "GSE", "EGX", "JSE", "DSE"];
const TIMEFRAMES = ["T", "6M", "1A", "3A", "5A", "10A"];
const STATUSES = ["Tous", "Publié", "En cours", "Estimé", "Alertes"];

function FilterPill({
  label,
  active,
  onClick,
  color,
  prefix,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
  prefix?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 8px",
        borderRadius: 4,
        border: `1px solid ${active ? color + "50" : "rgba(44, 61, 127,0.22)"}`,
        background: active ? color + "14" : "transparent",
        color: active ? color : C.muted,
        fontSize: 9.5,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        letterSpacing: "0.02em",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 3,
        transition: "all 0.1s",
      }}
    >
      {prefix && <span style={{ fontSize: 10 }}>{prefix}</span>}
      {label}
    </button>
  );
}

function ActionBtn({
  icon,
  label,
  accent,
  danger,
}: {
  icon: ReactNode;
  label?: string;
  accent?: boolean;
  danger?: boolean;
}) {
  const bg = accent ? "rgba(214, 182, 141,0.1)" : danger ? "rgba(244,56,96,0.1)" : "rgba(0, 4, 48,0.5)";
  const border = accent ? "rgba(214, 182, 141,0.3)" : danger ? "rgba(244,56,96,0.3)" : "rgba(44, 61, 127,0.32)";
  const color = accent ? C.accent : danger ? C.red : C.dim;
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: label ? "4px 9px" : "4px 7px",
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 5,
        color,
        fontSize: 10,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function VDivider() {
  return (
    <div style={{ width: 1, height: 20, background: C.border, flexShrink: 0, margin: "0 4px" }} />
  );
}

export function AnalysisTopBar() {
  const [search, setSearch] = useState("");
  const [activeSector, setActiveSector] = useState("Banques");
  const [activeMarket, setActiveMarket] = useState("BRVM");
  const [activeTimeframe, setActiveTimeframe] = useState("5A");
  const [activeStatus, setActiveStatus] = useState("Tous");

  return (
    <div
      style={{
        flexShrink: 0,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        zIndex: 50,
      }}
    >
      {/* ── Row 1: Main toolbar ── */}
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>BT</span>
          </div>
          <div>
            <div style={{ color: C.text, fontSize: 12, fontWeight: 700, lineHeight: 1, letterSpacing: "0.01em" }}>
              BLOOMFIELD
            </div>
            <div style={{ color: C.accent, fontSize: 8, fontWeight: 600, lineHeight: 1, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 1 }}>
              TERMINAL
            </div>
          </div>
        </div>

        {/* Page label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            paddingLeft: 10,
            borderLeft: `1px solid ${C.border}`,
            flexShrink: 0,
          }}
        >
          <BarChart3 size={14} color={C.gold} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>
              ANALYSE
            </div>
            <div style={{ fontSize: 8, color: C.muted, marginTop: 1, letterSpacing: "0.03em" }}>
              Analyse Financière & Risque
            </div>
          </div>
        </div>

        <VDivider />

        {/* Active company context badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 5,
            background: "rgba(244,185,66,0.08)",
            border: "1px solid rgba(244,185,66,0.22)",
            flexShrink: 0,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: "linear-gradient(135deg, #1a4a7a 0%, #000430 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: C.accent,
            }}
          >
            SG
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.gold, lineHeight: 1 }}>SGBCI</div>
            <div style={{ fontSize: 7.5, color: C.muted, lineHeight: 1, marginTop: 1 }}>CI0000000046 · BRVM</div>
          </div>
          <ChevronDown size={10} color={C.muted} />
        </div>

        {/* Smart Search */}
        <div style={{ flex: 1, maxWidth: 500, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={13} style={{ position: "absolute", left: 10, color: C.dim, pointerEvents: "none" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher société, ISIN, secteur, pair... ex: BICICI, CI0000000053, Banques CIV"
            style={{
              width: "100%",
              height: 32,
              background: "rgba(0, 4, 48,0.7)",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              paddingLeft: 32,
              paddingRight: 52,
              color: C.text,
              fontSize: 11.5,
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 8,
              fontSize: 9,
              color: C.muted,
              background: "rgba(44, 61, 127,0.25)",
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: "1px 5px",
              fontWeight: 500,
              pointerEvents: "none",
            }}
          >
            ⌘K
          </span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Live indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
          <span style={{ fontSize: 9, color: C.green, fontWeight: 700, letterSpacing: "0.08em" }}>LIVE</span>
        </div>
        <div style={{ fontSize: 10, color: C.dim, fontWeight: 500 }}>Mer 08 Avr 2026</div>

        <VDivider />

        {/* Quick actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <ActionBtn icon={<Users size={12} />} label="Comparer" />
          <ActionBtn icon={<FileText size={12} />} label="Rapport" accent />
          <ActionBtn icon={<Plus size={12} />} label="Alerte" />
          <ActionBtn icon={<Bookmark size={12} />} label="Workspace" />
          <ActionBtn icon={<Download size={12} />} />
          <ActionBtn icon={<RefreshCw size={12} />} />
        </div>

        <VDivider />

        {/* Bell */}
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
            flexShrink: 0,
          }}
        >
          <Bell size={14} />
          <div
            style={{
              position: "absolute",
              top: 4,
              right: 4,
              minWidth: 14,
              height: 14,
              borderRadius: 7,
              background: C.red,
              border: "1.5px solid #000430",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            3
          </div>
        </button>

        {/* User */}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "4px 8px",
            borderRadius: 6,
            background: "rgba(0, 4, 48,0.5)",
            border: `1px solid ${C.border}`,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
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
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 10, color: C.text, fontWeight: 600, lineHeight: 1 }}>Adjoua Koné</div>
            <div style={{ fontSize: 8, color: C.muted, lineHeight: 1, marginTop: 2 }}>Analyste Senior</div>
          </div>
          <ChevronDown size={11} color={C.muted} />
        </button>
      </div>

      {/* ── Row 2: Filters ── */}
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 5,
          background: "rgba(0, 4, 48,0.5)",
          overflowX: "auto",
        }}
      >
        <FilterLabel>SECTEUR</FilterLabel>
        {SECTORS.map((s) => (
          <FilterPill key={s} label={s} active={activeSector === s} onClick={() => setActiveSector(s)} color={C.gold} />
        ))}

        <VDivider />
        <FilterLabel>MARCHÉ</FilterLabel>
        {MARKETS.map((m) => (
          <FilterPill key={m} label={m} active={activeMarket === m} onClick={() => setActiveMarket(m)} color={C.accent} />
        ))}

        <VDivider />
        <FilterLabel>PÉRIODE</FilterLabel>
        {TIMEFRAMES.map((t) => (
          <FilterPill key={t} label={t} active={activeTimeframe === t} onClick={() => setActiveTimeframe(t)} color={C.purple} />
        ))}

        <VDivider />
        <FilterLabel>STATUT</FilterLabel>
        {STATUSES.map((s) => (
          <FilterPill key={s} label={s} active={activeStatus === s} onClick={() => setActiveStatus(s)} color={C.green} />
        ))}

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <AlertCircle size={10} color={C.red} />
          <span style={{ fontSize: 8.5, color: C.red, fontWeight: 600 }}>3 signaux risque actifs</span>
        </div>
      </div>
    </div>
  );
}

function FilterLabel({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        fontSize: 8.5,
        fontWeight: 700,
        color: C.muted,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
