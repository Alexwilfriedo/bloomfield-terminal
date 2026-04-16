import { useState } from "react";
import { WidgetShell } from "./WidgetShell";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const gainers = [
  { ticker: "PALM CI", name: "PALMCI", price: "7 295", pct: "+7.35%", vol: "12 580" },
  { ticker: "SONATEL", name: "Sonatel SA", price: "16 800", pct: "+5.21%", vol: "8 234" },
  { ticker: "BOLLORE CI", name: "Bolloré CI", price: "3 200", pct: "+4.92%", vol: "5 820" },
  { ticker: "ETI", name: "Ecobank Transnl.", price: "18.50", pct: "+3.78%", vol: "42 100" },
  { ticker: "ONATEL", name: "ONATEL BF", price: "5 850", pct: "+3.12%", vol: "3 450" },
];

const losers = [
  { ticker: "SAPH", name: "SAPH CI", price: "4 195", pct: "-3.42%", vol: "9 120" },
  { ticker: "SOLIBRA", name: "Solibra CI", price: "89 000", pct: "-2.78%", vol: "450" },
  { ticker: "CIE", name: "CIE CI", price: "1 580", pct: "-1.95%", vol: "7 830" },
  { ticker: "SMB", name: "SMB CI", price: "14 250", pct: "-1.63%", vol: "2 100" },
  { ticker: "AIR SEN.", name: "Air Sénégal", price: "340", pct: "-1.42%", vol: "18 600" },
];

export function TopMoversWidget() {
  const C = useThemeColors();
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");

  const data = tab === "gainers" ? gainers : losers;

  return (
    <WidgetShell
      title="Top Mouvements"
      subtitle="Session du jour — BRVM"
      lastUpdate="15:47 GMT"
      accentColor={tab === "gainers" ? C.green : C.red}
    >
      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <TabBtn
          active={tab === "gainers"}
          label="Hausses"
          icon={<TrendingUp size={11} />}
          color={C.green}
          onClick={() => setTab("gainers")}
        />
        <TabBtn
          active={tab === "losers"}
          label="Baisses"
          icon={<TrendingDown size={11} />}
          color={C.red}
          onClick={() => setTab("losers")}
        />
      </div>

      {/* Table header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 80px 60px 60px",
          padding: "4px 8px",
          borderBottom: `1px solid ${C.border}`,
          marginBottom: 2,
        }}
      >
        {["Titre", "Cours", "Var.", "Vol."].map((h) => (
          <div key={h} style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {h}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data.map((row, i) => (
        <div
          key={row.ticker}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 60px 60px",
            padding: "5px 8px",
            borderRadius: 5,
            cursor: "pointer",
            transition: "background 0.1s",
            background: i % 2 === 0 ? "var(--bt-overlay-15)" : "transparent",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bt-accent-a06)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = i % 2 === 0 ? "var(--bt-overlay-15)" : "transparent")
          }
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{row.ticker}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{row.name}</div>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
            {row.price}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: tab === "gainers" ? C.green : C.red,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {row.pct}
          </div>
          <div style={{ fontSize: 12, color: C.dim, fontVariantNumeric: "tabular-nums" }}>
            {row.vol}
          </div>
        </div>
      ))}

      {/* Mini bar chart */}
      <div style={{ marginTop: 8, display: "flex", gap: 3, alignItems: "flex-end", height: 24 }}>
        {data.map((row, i) => {
          const pctNum = Math.abs(parseFloat(row.pct));
          const maxPct = Math.max(...data.map((r) => Math.abs(parseFloat(r.pct))));
          const h = Math.max(4, (pctNum / maxPct) * 24);
          const color = tab === "gainers" ? C.green : C.red;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div
                style={{
                  width: "100%",
                  height: h,
                  background: color,
                  opacity: 0.7 - i * 0.1,
                  borderRadius: "3px 3px 0 0",
                }}
              />
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}

function TabBtn({
  active,
  label,
  icon,
  color,
  onClick,
}: {
  active: boolean;
  label: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "4px 10px",
        borderRadius: 5,
        border: `1px solid ${active ? color + "40" : "var(--bt-border-a32)"}`,
        background: active ? color + "15" : "transparent",
        color: active ? color : "#6b96b8",
        fontSize: 13,
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
