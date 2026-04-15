import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Download,
  GitCompare,
  ScanLine,
  RefreshCw,
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
  red: "#f43860",
};

const ASSET_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "eq", label: "Équités" },
  { key: "bonds", label: "Obligations" },
  { key: "fx", label: "FX" },
  { key: "cmd", label: "Matières Pr." },
  { key: "idx", label: "Indices" },
];

const MARKET_FILTERS = [
  { key: "brvm", label: "BRVM" },
  { key: "umoa", label: "UEMOA-Titres" },
  { key: "intl", label: "Marchés Intl." },
];

const TIMEFRAMES = ["1J", "1S", "1M", "3M", "1A", "YTD"];

const SESSION_STATUS = [
  { label: "BRVM", status: "open", hours: "09:00–15:30" },
  { label: "FOREX", status: "open", hours: "24h/24" },
  { label: "NYSE", status: "closed", hours: "Fermé" },
  { label: "BCEAO", status: "closed", hours: "Fermé" },
];

export function MarketsTopBar() {
  const [search, setSearch] = useState("");
  const [activeAsset, setActiveAsset] = useState("all");
  const [activeMarket, setActiveMarket] = useState("brvm");
  const [activeTf, setActiveTf] = useState("1J");

  return (
    <div
      style={{
        flexShrink: 0,
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        zIndex: 50,
      }}
    >
      {/* ── Row 1: Brand + Search + Timeframe + Actions ── */}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>
              BT
            </span>
          </div>
          <div>
            <div
              style={{
                color: C.text,
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.01em",
              }}
            >
              BLOOMFIELD
            </div>
            <div
              style={{
                color: C.accent,
                fontSize: 8,
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 1,
              }}
            >
              TERMINAL
            </div>
          </div>
        </div>

        {/* Page label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            paddingLeft: 10,
            borderLeft: `1px solid ${C.border}`,
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: C.text,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              MARCHÉS
            </div>
            <div
              style={{
                fontSize: 8,
                color: C.muted,
                marginTop: 1,
                letterSpacing: "0.03em",
              }}
            >
              Espace Analyse de Marché
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            background: C.border,
            flexShrink: 0,
          }}
        />

        {/* Smart Search */}
        <div
          style={{
            flex: 1,
            maxWidth: 520,
            position: "relative",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search
            size={13}
            style={{
              position: "absolute",
              left: 10,
              color: C.dim,
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher titres, ISIN, secteur, pays, indice..."
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
              letterSpacing: "0.05em",
              pointerEvents: "none",
            }}
          >
            ⌘K
          </span>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Live + Date */}
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
          <span
            style={{
              fontSize: 9,
              color: "#10c87a",
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            LIVE
          </span>
        </div>
        <div style={{ fontSize: 10, color: C.dim, fontWeight: 500 }}>
          Mer 08 Avr 2026
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            background: C.border,
            flexShrink: 0,
          }}
        />

        {/* Timeframe */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexShrink: 0,
          }}
        >
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTf(tf)}
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                border: "none",
                background:
                  activeTf === tf
                    ? "rgba(214, 182, 141,0.15)"
                    : "transparent",
                color: activeTf === tf ? C.accent : C.muted,
                fontSize: 10,
                fontWeight: activeTf === tf ? 700 : 500,
                cursor: "pointer",
                letterSpacing: "0.03em",
                transition: "all 0.12s",
                borderBottom:
                  activeTf === tf
                    ? `2px solid ${C.accent}`
                    : "2px solid transparent",
              }}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            background: C.border,
            flexShrink: 0,
          }}
        />

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            flexShrink: 0,
          }}
        >
          <ActionBtn
            icon={<GitCompare size={12} />}
            label="Comparer"
            accent
          />
          <ActionBtn icon={<ScanLine size={12} />} label="Screener" />
          <ActionBtn icon={<Download size={12} />} label="Export" />
          <ActionBtn icon={<RefreshCw size={12} />} />
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            background: C.border,
            flexShrink: 0,
          }}
        />

        {/* Alerts */}
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
              background:
                "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
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
            <div
              style={{
                fontSize: 10,
                color: C.text,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              Adjoua Koné
            </div>
            <div
              style={{ fontSize: 8, color: C.dim, lineHeight: 1, marginTop: 2 }}
            >
              Analyste Senior
            </div>
          </div>
          <ChevronDown size={11} color={C.muted} />
        </button>
      </div>

      {/* ── Row 2: Market scope + Asset class + Session status ── */}
      <div
        style={{
          height: 34,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 6,
          background: "rgba(0, 1, 23,0.4)",
        }}
      >
        {/* Market scope label */}
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          MARCHÉ
        </span>

        {MARKET_FILTERS.map((m) => (
          <FilterPill
            key={m.key}
            label={m.label}
            active={activeMarket === m.key}
            onClick={() => setActiveMarket(m.key)}
            color={C.accent}
          />
        ))}

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 18,
            background: C.border,
            margin: "0 6px",
            flexShrink: 0,
          }}
        />

        {/* Asset class label */}
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          CLASSE
        </span>

        {ASSET_FILTERS.map((a) => (
          <FilterPill
            key={a.key}
            label={a.label}
            active={activeAsset === a.key}
            onClick={() => setActiveAsset(a.key)}
            color={C.gold}
          />
        ))}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Session status */}
        {SESSION_STATUS.map((s) => (
          <SessionDot key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  accent,
}: {
  icon: React.ReactNode;
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
        color: accent ? "#d6b68d" : "#6b96b8",
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
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 9px",
        borderRadius: 4,
        border: `1px solid ${active ? color + "40" : "rgba(44, 61, 127,0.22)"}`,
        background: active ? color + "14" : "transparent",
        color: active ? color : "#6b96b8",
        fontSize: 10,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        letterSpacing: "0.02em",
        transition: "all 0.1s",
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

function SessionDot({
  label,
  status,
  hours,
}: {
  label: string;
  status: string;
  hours: string;
}) {
  const open = status === "open";
  const dot = open ? "#10c87a" : "#54678d";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        borderRadius: 4,
        background: open ? "rgba(16,200,122,0.07)" : "rgba(44, 61, 127,0.08)",
        border: `1px solid ${open ? "rgba(16,200,122,0.18)" : "rgba(44, 61, 127,0.18)"}`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: dot,
          boxShadow: open ? `0 0 4px ${dot}` : "none",
        }}
      />
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: open ? "#10c87a" : "#54678d",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 8, color: "#54678d" }}>{hours}</span>
    </div>
  );
}
