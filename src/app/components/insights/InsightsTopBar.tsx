import { useNavigate } from "react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Download,
  Share2,
  Bookmark,
  Plus,
  RefreshCw,
  Lightbulb,
  AlertCircle,
  FileDown,
  Filter,
  Sun,
  Moon,
} from "lucide-react";
import logoDarkUrl from "../../../assets/logo-bloomfield-terminal.png";
import logoLightUrl from "../../../assets/logo-bloomfield-terminal-light.png";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useBloomfieldTheme } from "../../context/ThemeContext";

const COUNTRIES = ["Tous", "Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Togo", "Bénin", "Niger", "Guinée-Bissau"];
const TOPICS = ["Tous", "Marchés", "Macro", "Obligations", "Change", "Matières Premières", "Secteurs", "Politique Monétaire"];
const CONTENT_TYPES = ["Tous", "Analyses", "Vidéos", "Rapports", "Données", "Alertes", "Formation"];
const TIMEFRAMES = ["24h", "7J", "1M", "3M", "6M", "1A"];

function FilterPill({
  label,
  active,
  onClick,
  color,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  color: string;
}) {
  const C = useThemeColors();
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 8px",
        borderRadius: 4,
        border: `1px solid ${active ? color + "50" : "var(--bt-border-a22)"}`,
        background: active ? color + "14" : "transparent",
        color: active ? color : C.muted,
        fontSize: 11.5,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        letterSpacing: "0.02em",
        flexShrink: 0,
        transition: "all 0.1s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function FilterLabel({ children }: { children: ReactNode }) {
  const C = useThemeColors();
  return (
    <span
      style={{
        fontSize: 10.5,
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

function ActionBtn({
  icon,
  label,
  accent,
}: {
  icon: ReactNode;
  label?: string;
  accent?: boolean;
}) {
  const C = useThemeColors();
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: label ? "4px 9px" : "5px 7px",
        background: accent ? "var(--bt-accent-a10)" : "var(--bt-overlay-50)",
        border: `1px solid ${accent ? "var(--bt-accent-a30)" : C.border}`,
        borderRadius: 5,
        color: accent ? C.accent : C.dim,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function VDivider() {
  const C = useThemeColors();
  return (
    <div
      style={{
        width: 1,
        height: 20,
        background: C.border,
        flexShrink: 0,
        margin: "0 4px",
      }}
    />
  );
}

export function InsightsTopBar() {
  const C = useThemeColors();
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useBloomfieldTheme();
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("Tous");
  const [activeTopic, setActiveTopic] = useState("Tous");
  const [activeType, setActiveType] = useState("Tous");
  const [activeTimeframe, setActiveTimeframe] = useState("7J");

  return (
    <div
      style={{
        flexShrink: 0,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        zIndex: 50,
      }}
    >
      {/* Row 1: Main toolbar */}
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
        <div style={{ display: "flex", alignItems: "center", minWidth: 160, flexShrink: 0 }}>
          <img src={isDark ? logoDarkUrl : logoLightUrl} alt="Bloomfield Terminal" onClick={() => navigate("/")} style={{ height: 28, width: "auto", display: "block", objectFit: "contain", cursor: "pointer" }} draggable={false} />
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
          <Lightbulb size={14} color={C.gold} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>
              INSIGHTS
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1, letterSpacing: "0.03em" }}>
              Intelligence & Éducation Financière
            </div>
          </div>
        </div>

        <VDivider />

        {/* Live badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 8px",
            borderRadius: 4,
            background: "rgba(16,200,122,0.08)",
            border: "1px solid rgba(16,200,122,0.22)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.green,
              boxShadow: `0 0 6px ${C.green}`,
            }}
          />
          <span style={{ fontSize: 11, color: C.green, fontWeight: 700, letterSpacing: "0.08em" }}>EN DIRECT</span>
          <span style={{ fontSize: 10, color: C.muted, marginLeft: 2 }}>47 alertes</span>
        </div>

        {/* Smart Search */}
        <div style={{ flex: 1, maxWidth: 520, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={13} style={{ position: "absolute", left: 10, color: C.dim, pointerEvents: "none" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher analyses, rapports, formations, événements... ex: BCEAO taux, BRVM rendement, obligation souveraine"
            style={{
              width: "100%",
              height: 32,
              background: "var(--bt-overlay-70)",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              paddingLeft: 32,
              paddingRight: 52,
              color: C.text,
              fontSize: 13,
              outline: "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              right: 8,
              fontSize: 11,
              color: C.muted,
              background: "var(--bt-border-a25)",
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

        {/* Date */}
        <div style={{ fontSize: 12, color: C.dim, fontWeight: 500 }}>Mer 08 Avr 2026</div>

        <VDivider />

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <ActionBtn icon={<Bookmark size={12} />} label="Sauvegarder" />
          <ActionBtn icon={<Share2 size={12} />} label="Partager" />
          <ActionBtn icon={<FileDown size={12} />} label="Export PDF" accent />
          <ActionBtn icon={<Plus size={12} />} label="Alerte" />
          <ActionBtn icon={<RefreshCw size={12} />} />
        </div>

        <VDivider />
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Mode clair" : "Mode sombre"}
          style={{
            width: 32, height: 32, borderRadius: 6,
            background: isDark ? "rgba(244,185,66,0.08)" : "rgba(44,61,127,0.08)",
            border: `1px solid ${isDark ? "rgba(244,185,66,0.22)" : "rgba(44,61,127,0.18)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: isDark ? C.gold : "#4a6480",
            transition: "all 0.2s", flexShrink: 0,
          }}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>


        {/* Bell */}
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
              border: `1.5px solid ${C.surface}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            7
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
            background: "var(--bt-overlay-50)",
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
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            AK
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, color: C.text, fontWeight: 600, lineHeight: 1 }}>Adjoua Koné</div>
            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1, marginTop: 2 }}>Analyste Senior · Premium</div>
          </div>
          <ChevronDown size={11} color={C.muted} />
        </button>
      </div>

      {/* Row 2: Filters */}
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 5,
          background: "var(--bt-overlay-50)",
          overflowX: "auto",
        }}
      >
        <Filter size={10} color={C.muted} style={{ flexShrink: 0 }} />

        <FilterLabel>PAYS</FilterLabel>
        {COUNTRIES.slice(0, 5).map((c) => (
          <FilterPill key={c} label={c} active={activeCountry === c} onClick={() => setActiveCountry(c)} color={C.gold} />
        ))}

        <VDivider />
        <FilterLabel>THÈME</FilterLabel>
        {TOPICS.slice(0, 5).map((t) => (
          <FilterPill key={t} label={t} active={activeTopic === t} onClick={() => setActiveTopic(t)} color={C.accent} />
        ))}

        <VDivider />
        <FilterLabel>TYPE</FilterLabel>
        {CONTENT_TYPES.map((ct) => (
          <FilterPill key={ct} label={ct} active={activeType === ct} onClick={() => setActiveType(ct)} color={C.purple} />
        ))}

        <VDivider />
        <FilterLabel>PÉRIODE</FilterLabel>
        {TIMEFRAMES.map((tf) => (
          <FilterPill key={tf} label={tf} active={activeTimeframe === tf} onClick={() => setActiveTimeframe(tf)} color={C.green} />
        ))}

        <div style={{ flex: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <AlertCircle size={10} color={C.gold} />
          <span style={{ fontSize: 10.5, color: C.gold, fontWeight: 600 }}>3 nouvelles publications premium</span>
        </div>

        <div
          style={{
            marginLeft: 8,
            padding: "2px 8px",
            borderRadius: 3,
            background: "var(--bt-accent-a10)",
            border: "1px solid var(--bt-accent-a25)",
            fontSize: 10.5,
            color: C.accent,
            fontWeight: 700,
            letterSpacing: "0.06em",
            flexShrink: 0,
          }}
        >
          <Download size={8} style={{ display: "inline", marginRight: 3 }} />
          EXPORT
        </div>
      </div>
    </div>
  );
}
