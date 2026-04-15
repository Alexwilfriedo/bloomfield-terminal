import { WidgetShell } from "./WidgetShell";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

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

const sparkData = [
  [282.1, 281.8, 283.0, 282.5, 283.8, 283.2, 284.1, 284.12],
  [435.0, 434.2, 435.8, 436.1, 436.8, 437.0, 437.5, 437.80],
  [158.9, 158.7, 159.1, 158.8, 158.5, 158.6, 158.4, 158.34],
].map((series) =>
  series.map((v, i) => ({ v, i }))
);

const indices = [
  {
    name: "BRVM Composite",
    value: "284.12",
    change: "+2.06",
    pct: "+0.73%",
    up: true,
    data: sparkData[0],
    color: C.accent,
  },
  {
    name: "BRVM 10",
    value: "437.80",
    change: "+1.96",
    pct: "+0.45%",
    up: true,
    data: sparkData[1],
    color: C.green,
  },
  {
    name: "BRVM Prestige",
    value: "158.34",
    change: "-0.35",
    pct: "-0.22%",
    up: false,
    data: sparkData[2],
    color: C.red,
  },
];

const marketStats = [
  { label: "Capitalisation", value: "7 843,2", unit: "Mds FCFA" },
  { label: "Volume", value: "1 284 750", unit: "titres" },
  { label: "Transactions", value: "1 248", unit: "ord. exéc." },
  { label: "Valeur échangée", value: "4,82", unit: "Mds FCFA" },
];

export function BRVMWidget() {
  const compositeIdx = indices[0];
  return (
    <WidgetShell
      title="Indices BRVM"
      subtitle="Bourse Régionale des Valeurs Mobilières"
      lastUpdate="Mis à jour: 15:47 GMT"
      accentColor={C.accent}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>

        {/* Featured Composite Index — PROMINENT */}
        <div
          style={{
            padding: "10px 12px",
            background: "linear-gradient(135deg, rgba(214, 182, 141,0.1) 0%, rgba(214, 182, 141,0.04) 100%)",
            borderRadius: 7,
            border: `1px solid rgba(214, 182, 141,0.3)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent bar */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 3,
              background: C.accent,
              borderRadius: "7px 0 0 7px",
            }}
          />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingLeft: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                <Activity size={10} color={C.accent} />
                <span style={{ fontSize: 8.5, fontWeight: 700, color: C.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  BRVM Composite
                </span>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    background: "rgba(16,200,122,0.12)",
                    border: "1px solid rgba(16,200,122,0.25)",
                    fontSize: 7.5,
                    fontWeight: 700,
                    color: C.green,
                  }}
                >
                  LIVE
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 800,
                    color: C.text,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {compositeIdx.value}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <TrendingUp size={13} color={C.green} />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: C.green,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {compositeIdx.pct}
                  </span>
                  <span style={{ fontSize: 11, color: C.green, opacity: 0.8 }}>
                    ({compositeIdx.change})
                  </span>
                </div>
              </div>
              <div style={{ fontSize: 8, color: C.muted, marginTop: 3 }}>
                Session 08 Avr 2026 · Clôture 15:30 GMT · BRVM Abidjan
              </div>
            </div>

            {/* Sparkline */}
            <div style={{ width: 88, height: 42, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={compositeIdx.data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
                  <defs>
                    <linearGradient id="spark-composite-featured" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={C.accent} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={C.accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={C.accent}
                    strokeWidth={2}
                    fill="url(#spark-composite-featured)"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#000117",
                      border: `1px solid ${C.border}`,
                      borderRadius: 4,
                      fontSize: 10,
                      color: C.text,
                    }}
                    formatter={(v: number) => [v.toFixed(2)]}
                    itemStyle={{ color: C.accent }}
                    labelFormatter={() => ""}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Other indices */}
        {indices.slice(1).map((idx) => (
          <div
            key={idx.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              background: "rgba(0, 1, 23,0.45)",
              borderRadius: 6,
              border: `1px solid ${C.border}`,
            }}
          >
            {/* Name + values */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 9.5, color: C.dim, fontWeight: 500, letterSpacing: "0.02em" }}>
                {idx.name}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 1 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: C.text,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {idx.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: idx.up ? C.green : C.red,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {idx.pct}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: idx.up ? C.green : C.red,
                    opacity: 0.8,
                  }}
                >
                  ({idx.change})
                </span>
              </div>
            </div>

            {/* Sparkline */}
            <div style={{ width: 68, height: 30, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={idx.data} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
                  <defs>
                    <linearGradient
                      id={`spark-${idx.name.replace(/\s/g, "")}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={idx.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={idx.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={idx.color}
                    strokeWidth={1.5}
                    fill={`url(#spark-${idx.name.replace(/\s/g, "")})`}
                    dot={false}
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}

        {/* Market stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 5,
            marginTop: 2,
          }}
        >
          {marketStats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(0, 1, 23,0.45)",
                border: `1px solid ${C.border}`,
                borderRadius: 5,
                padding: "5px 8px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.gold,
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1.2,
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1, fontWeight: 500, letterSpacing: "0.02em" }}>
                {s.unit}
              </div>
              <div style={{ fontSize: 7.5, color: C.muted, opacity: 0.75 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}