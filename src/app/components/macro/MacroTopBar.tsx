import { useState } from "react";
import type { ReactNode } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Download,
  FileBarChart2,
  Globe2,
  RefreshCw,
  BookOpen,
} from "lucide-react";

const C = {
  surface: "#000117",
  accent: "#d6b68d",
  border: "rgba(44, 61, 127,0.32)",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  gold: "#f4b942",
  green: "#10c87a",
  purple: "#a78bfa",
};

const COUNTRIES = [
  { code: "CIV", flag: "🇨🇮" },
  { code: "SEN", flag: "🇸🇳" },
  { code: "MLI", flag: "🇲🇱" },
  { code: "BFA", flag: "🇧🇫" },
  { code: "NER", flag: "🇳🇪" },
  { code: "TGO", flag: "🇹🇬" },
  { code: "BEN", flag: "🇧🇯" },
  { code: "GNB", flag: "🇬🇼" },
];

const REGIONS = ["UEMOA", "CEDEAO", "Afrique Sub.", "Zone CFA"];
const THEMES = ["Tous", "Croissance", "Finances Pub.", "Commerce", "Monétaire", "Compétitivité"];
const PERIODS = ["T", "1A", "5A", "10A", "Hist."];
const SOURCES = ["BCEAO", "BM", "FMI", "ONS", "Bloomfield"];

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
      {prefix && <span style={{ fontSize: 11 }}>{prefix}</span>}
      {label}
    </button>
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
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: label ? "4px 9px" : "4px 7px",
        background: accent ? "rgba(214, 182, 141,0.1)" : "rgba(0, 1, 23,0.5)",
        border: `1px solid ${accent ? "rgba(214, 182, 141,0.3)" : "rgba(44, 61, 127,0.32)"}`,
        borderRadius: 5,
        color: accent ? C.accent : C.dim,
        fontSize: 10,
        fontWeight: 600,
        cursor: "pointer",
        letterSpacing: "0.02em",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div
      style={{
        width: 1,
        height: 18,
        background: C.border,
        margin: "0 5px",
        flexShrink: 0,
      }}
    />
  );
}

export function MacroTopBar() {
  const [search, setSearch] = useState("");
  const [activeCountry, setActiveCountry] = useState("CIV");
  const [activeTheme, setActiveTheme] = useState("Tous");
  const [activeRegion, setActiveRegion] = useState("UEMOA");
  const [activePeriod, setActivePeriod] = useState("1A");
  const [activeSource, setActiveSource] = useState("BCEAO");

  return (
    <div
      style={{
        flexShrink: 0,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        zIndex: 50,
      }}
    >
      {/* ── Row 1 ── */}
      <div
        style={{
          height: 50,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 10,
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
          <Globe2 size={14} color={C.purple} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>
              MACRO
            </div>
            <div style={{ fontSize: 8, color: C.muted, marginTop: 1, letterSpacing: "0.03em" }}>
              Intelligence Macroéconomique
            </div>
          </div>
        </div>

        {/* V-divider */}
        <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

        {/* Context breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 10px",
            borderRadius: 5,
            background: "rgba(214, 182, 141,0.06)",
            border: `1px solid rgba(214, 182, 141,0.15)`,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 11 }}>🇨🇮</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.accent }}>Côte d'Ivoire</span>
          <span style={{ fontSize: 8, color: C.muted }}>· UEMOA · 2024</span>
        </div>

        {/* Smart Search */}
        <div style={{ flex: 1, maxWidth: 460, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={13} style={{ position: "absolute", left: 10, color: C.dim, pointerEvents: "none" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher indicateur, pays, publication, rapport macro..."
            style={{
              width: "100%",
              height: 32,
              background: "rgba(0, 1, 23,0.7)",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              paddingLeft: 32,
              paddingRight: 50,
              color: C.text,
              fontSize: 12,
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

        {/* Live + date */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
          <span style={{ fontSize: 9, color: C.green, fontWeight: 700, letterSpacing: "0.08em" }}>LIVE</span>
        </div>
        <div style={{ fontSize: 10, color: C.dim, fontWeight: 500 }}>Mer 08 Avr 2026</div>

        <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <ActionBtn icon={<FileBarChart2 size={12} />} label="Rapport" accent />
          <ActionBtn icon={<BookOpen size={12} />} label="Fiches" />
          <ActionBtn icon={<Download size={12} />} label="Export" />
          <ActionBtn icon={<RefreshCw size={12} />} />
        </div>

        <div style={{ width: 1, height: 28, background: C.border, flexShrink: 0 }} />

        {/* Alerts bell */}
        <button
          style={{
            position: "relative",
            width: 32,
            height: 32,
            borderRadius: 6,
            background: "rgba(0, 1, 23,0.5)",
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
              background: C.gold,
              border: "1.5px solid #000117",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              fontWeight: 700,
              color: "#000117",
            }}
          >
            4
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
            background: "rgba(0, 1, 23,0.5)",
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
            <div style={{ fontSize: 8, color: C.muted, lineHeight: 1, marginTop: 2 }}>Économiste Senior</div>
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
          background: "rgba(0, 1, 23,0.5)",
          overflowX: "auto",
        }}
      >
        <Label>PAYS</Label>
        {COUNTRIES.map((c) => (
          <FilterPill
            key={c.code}
            label={c.code}
            prefix={c.flag}
            active={activeCountry === c.code}
            onClick={() => setActiveCountry(c.code)}
            color={C.accent}
          />
        ))}

        <Divider />
        <Label>RÉGION</Label>
        {REGIONS.map((r) => (
          <FilterPill
            key={r}
            label={r}
            active={activeRegion === r}
            onClick={() => setActiveRegion(r)}
            color={C.gold}
          />
        ))}

        <Divider />
        <Label>THÈME</Label>
        {THEMES.map((t) => (
          <FilterPill
            key={t}
            label={t}
            active={activeTheme === t}
            onClick={() => setActiveTheme(t)}
            color={C.purple}
          />
        ))}

        <Divider />
        <Label>PÉRIODE</Label>
        {PERIODS.map((p) => (
          <FilterPill
            key={p}
            label={p}
            active={activePeriod === p}
            onClick={() => setActivePeriod(p)}
            color={C.accent}
          />
        ))}

        <div style={{ flex: 1 }} />

        <Label>SOURCE</Label>
        {SOURCES.map((s) => (
          <FilterPill
            key={s}
            label={s}
            active={activeSource === s}
            onClick={() => setActiveSource(s)}
            color={C.dim}
          />
        ))}
      </div>
    </div>
  );
}

function Label({ children }: { children: ReactNode }) {
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