import { WidgetShell } from "./WidgetShell";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const C = {
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
};

const fxData = [
  { pair: "XOF / USD", value: "596.42", change: "+0.71", pct: "+0.12%", up: true, fixed: false },
  { pair: "XOF / EUR", value: "655.96", change: "0.00", pct: "0.00%", up: null, fixed: true, note: "Ancrage fixe" },
  { pair: "XOF / GBP", value: "768.34", change: "+1.75", pct: "+0.23%", up: true, fixed: false },
  { pair: "XOF / CNY", value: "82.45", change: "-0.13", pct: "-0.15%", up: false, fixed: false },
  { pair: "USD / EUR", value: "1.0998", change: "+0.0009", pct: "+0.08%", up: true, fixed: false },
];

const commodities = [
  {
    name: "Cacao ICE",
    ticker: "COCOA",
    value: "8 245",
    unit: "USD/t",
    change: "+2.34%",
    up: true,
    icon: "🍫",
    sparkData: [7840, 7920, 8050, 8100, 8010, 8180, 8245],
  },
  {
    name: "Café Robusta",
    ticker: "COFFEE",
    value: "3 842",
    unit: "USD/t",
    change: "-0.45%",
    up: false,
    icon: "☕",
    sparkData: [3910, 3895, 3870, 3880, 3855, 3860, 3842],
  },
  {
    name: "Or COMEX",
    ticker: "GOLD",
    value: "2 347",
    unit: "USD/oz",
    change: "+0.89%",
    up: true,
    icon: "⬡",
    sparkData: [2290, 2310, 2320, 2335, 2330, 2340, 2347],
    color: C.gold,
  },
  {
    name: "Pétrole WTI",
    ticker: "OIL",
    value: "71.84",
    unit: "USD/bl",
    change: "+1.12%",
    up: true,
    icon: "◉",
    sparkData: [70.2, 70.5, 70.8, 71.2, 71.5, 71.7, 71.84],
  },
  {
    name: "Coton",
    ticker: "COTTON",
    value: "0.846",
    unit: "USD/lb",
    change: "-0.67%",
    up: false,
    icon: "◌",
    sparkData: [0.861, 0.858, 0.856, 0.852, 0.850, 0.848, 0.846],
  },
];

function Spark({ data, color }: { data: number[]; color: string }) {
  const d = data.map((v, i) => ({ v, i }));
  return (
    <ResponsiveContainer width={60} height={24}>
      <LineChart data={d} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          contentStyle={{ display: "none" }}
          cursor={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FXWidget() {
  return (
    <WidgetShell
      title="Taux de Change"
      subtitle="Marché des changes — temps réel"
      lastUpdate="15:47 GMT"
      accentColor={C.gold}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 70px 55px",
            padding: "2px 6px",
            marginBottom: 2,
          }}
        >
          {["Paire", "Cours", "Var."].map((h) => (
            <div key={h} style={{ fontSize: 9, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {h}
            </div>
          ))}
        </div>

        {fxData.map((row) => (
          <div
            key={row.pair}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 70px 55px",
              padding: "5px 6px",
              borderRadius: 5,
              background: "rgba(0, 1, 23,0.4)",
              border: `1px solid ${C.border}`,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                {row.pair}
              </div>
              {row.note && (
                <div style={{ fontSize: 8, color: C.accent, opacity: 0.8 }}>{row.note}</div>
              )}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
              {row.value}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                fontSize: 10,
                fontWeight: 600,
                color: row.fixed ? C.muted : row.up ? C.green : C.red,
              }}
            >
              {row.fixed ? (
                <Minus size={10} />
              ) : row.up ? (
                <TrendingUp size={10} />
              ) : (
                <TrendingDown size={10} />
              )}
              {row.pct}
            </div>
          </div>
        ))}

        {/* BCEAO note */}
        <div
          style={{
            marginTop: 4,
            padding: "5px 8px",
            background: "rgba(214, 182, 141,0.06)",
            border: `1px solid rgba(214, 182, 141,0.15)`,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: C.accent,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 9, color: C.dim }}>
            <strong style={{ color: C.accent }}>BCEAO</strong> — Taux directeur:{" "}
            <strong style={{ color: C.text }}>3.50%</strong> · Réserves UEMOA:{" "}
            <strong style={{ color: C.text }}>$32.4 Mds</strong>
          </span>
        </div>
      </div>
    </WidgetShell>
  );
}

export function CommoditiesWidget() {
  return (
    <WidgetShell
      title="Matières Premières"
      subtitle="Marchés africains clés"
      lastUpdate="15:47 GMT"
      accentColor={C.purple}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {commodities.map((c) => {
          const lineColor = c.color ?? (c.up ? C.green : C.red);
          return (
            <div
              key={c.ticker}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 8px",
                background: "rgba(0, 1, 23,0.4)",
                border: `1px solid ${C.border}`,
                borderRadius: 6,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 5,
                  background: "rgba(44, 61, 127,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{c.name}</span>
                  <span style={{ fontSize: 8, color: C.muted, letterSpacing: "0.04em" }}>{c.ticker}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                    {c.value}
                  </span>
                  <span style={{ fontSize: 9, color: C.muted }}>{c.unit}</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <Spark data={c.sparkData} color={lineColor} />
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: c.up ? C.green : C.red,
                  minWidth: 50,
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {c.change}
              </div>
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
}
