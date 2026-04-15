import { WidgetShell } from "./WidgetShell";
import { Star, TrendingUp, TrendingDown, Plus } from "lucide-react";

const C = {
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
};

const watchlist = [
  { ticker: "SONATEL", name: "Sonatel SA / SN", price: "16 800", pct: "+5.21%", up: true, sector: "Télécom" },
  { ticker: "PALM CI", name: "Palmci / CI", price: "7 295", pct: "+7.35%", up: true, sector: "Agri" },
  { ticker: "BOA CI", name: "Bank of Africa CI", price: "6 850", pct: "+1.23%", up: true, sector: "Finance" },
  { ticker: "BOLLORE CI", name: "Bolloré CI", price: "3 200", pct: "+4.92%", up: true, sector: "Transport" },
  { ticker: "CIE", name: "CIE / Côte d'Ivoire", price: "1 580", pct: "-1.95%", up: false, sector: "Énergie" },
  { ticker: "TRACTAFRIC", name: "Tractafric Motors", price: "3 750", pct: "+0.27%", up: true, sector: "Dist." },
  { ticker: "SAPH", name: "SAPH / CI", price: "4 195", pct: "-3.42%", up: false, sector: "Agri" },
  { ticker: "ECOBANK", name: "Ecobank CI", price: "7 120", pct: "+2.18%", up: true, sector: "Finance" },
];

export function WatchlistWidget() {
  return (
    <WidgetShell
      title="Watchlist"
      subtitle="Portefeuille de suivi personnalisé"
      lastUpdate="Temps réel"
      accentColor={C.gold}
      actions={
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "2px 7px",
            borderRadius: 4,
            border: `1px solid ${C.border}`,
            background: "rgba(0, 4, 48,0.5)",
            color: C.dim,
            fontSize: 9,
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.03em",
          }}
        >
          <Plus size={9} />
          Ajouter
        </button>
      }
    >
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 65px 55px",
          padding: "2px 4px",
          marginBottom: 4,
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: 5,
        }}
      >
        {["Titre", "Cours", "Var."].map((h) => (
          <div key={h} style={{ fontSize: 9, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {watchlist.map((item, i) => (
          <div
            key={item.ticker}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 65px 55px",
              padding: "4px 4px",
              borderRadius: 5,
              cursor: "pointer",
              transition: "background 0.1s",
              background: i % 2 === 0 ? "rgba(0, 4, 48,0.12)" : "transparent",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.06)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = i % 2 === 0 ? "rgba(0, 4, 48,0.12)" : "transparent")
            }
          >
            {/* Ticker + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Star
                size={9}
                color={C.gold}
                fill={C.gold}
                style={{ flexShrink: 0 }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{item.ticker}</div>
                <div style={{ fontSize: 8, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </div>
              </div>
              <SectorBadge label={item.sector} />
            </div>

            {/* Price */}
            <div style={{ fontSize: 11, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
              {item.price}
            </div>

            {/* Change */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                fontSize: 11,
                fontWeight: 700,
                color: item.up ? C.green : C.red,
              }}
            >
              {item.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {item.pct}
            </div>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div
        style={{
          marginTop: 8,
          padding: "6px 8px",
          background: "rgba(0, 4, 48,0.4)",
          borderRadius: 5,
          border: `1px solid ${C.border}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.green }}>
            {watchlist.filter((w) => w.up).length}
          </div>
          <div style={{ fontSize: 8, color: C.muted }}>Hausses</div>
        </div>
        <div style={{ width: 1, height: 28, background: C.border }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.red }}>
            {watchlist.filter((w) => !w.up).length}
          </div>
          <div style={{ fontSize: 8, color: C.muted }}>Baisses</div>
        </div>
        <div style={{ width: 1, height: 28, background: C.border }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
            {watchlist.length}
          </div>
          <div style={{ fontSize: 8, color: C.muted }}>Valeurs</div>
        </div>
        <div style={{ width: 1, height: 28, background: C.border }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>+2.34%</div>
          <div style={{ fontSize: 8, color: C.muted }}>Perf. moy.</div>
        </div>
      </div>
    </WidgetShell>
  );
}

function SectorBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        fontSize: 7,
        fontWeight: 600,
        color: C.muted,
        background: "rgba(44, 61, 127,0.2)",
        border: `1px solid rgba(44, 61, 127,0.3)`,
        borderRadius: 3,
        padding: "1px 4px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}
