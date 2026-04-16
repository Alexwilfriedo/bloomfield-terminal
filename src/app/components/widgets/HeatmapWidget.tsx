import { WidgetShell } from "./WidgetShell";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

const sectors = [
  { name: "Télécoms", pct: 2.14, cap: "2 840" },
  { name: "Finance", pct: 1.82, cap: "2 120" },
  { name: "Mines/Énergie", pct: 1.45, cap: "480" },
  { name: "Agriculture", pct: 0.95, cap: "1 840" },
  { name: "Eau/Électricité", pct: 0.45, cap: "320" },
  { name: "Distribution", pct: 0.34, cap: "740" },
  { name: "BTP/Immo", pct: -0.12, cap: "185" },
  { name: "Transport", pct: -0.28, cap: "215" },
  { name: "Industries", pct: -0.67, cap: "560" },
];

const chartData = [
  { d: "L-1", v: 281.2 },
  { d: "Ma-1", v: 282.1 },
  { d: "Me", v: 281.8 },
  { d: "Je", v: 283.4 },
  { d: "Ve", v: 282.6 },
  { d: "L-2", v: 283.8 },
  { d: "Ma-2", v: 283.2 },
  { d: "Auj", v: 284.12 },
];

function getHeatColor(pct: number) {
  if (pct >= 1.5) return { bg: "rgba(16,200,122,0.25)", text: "#10c87a", border: "rgba(16,200,122,0.35)" };
  if (pct >= 0.5) return { bg: "rgba(16,200,122,0.12)", text: "#10c87a", border: "rgba(16,200,122,0.2)" };
  if (pct > 0) return { bg: "rgba(16,200,122,0.06)", text: "#10c87a", border: "rgba(16,200,122,0.12)" };
  if (pct > -0.5) return { bg: "rgba(244,56,96,0.06)", text: "#f43860", border: "rgba(244,56,96,0.12)" };
  if (pct > -1.5) return { bg: "rgba(244,56,96,0.12)", text: "#f43860", border: "rgba(244,56,96,0.2)" };
  return { bg: "rgba(244,56,96,0.25)", text: "#f43860", border: "rgba(244,56,96,0.35)" };
}

export function HeatmapWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell
      title="Performance Sectorielle"
      subtitle="BRVM — Capitalisation pondérée"
      lastUpdate="Clôture 15:30 GMT"
      accentColor="#a78bfa"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}>
        {/* Sector grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 6,
          }}
        >
          {sectors.map((s) => {
            const colors = getHeatColor(s.pct);
            return (
              <div
                key={s.name}
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  padding: "8px 10px",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ fontSize: 12, color: "#a0bcd4", fontWeight: 600, letterSpacing: "0.01em" }}>
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: colors.text,
                    fontVariantNumeric: "tabular-nums",
                    marginTop: 3,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.pct > 0 ? "+" : ""}
                  {s.pct.toFixed(2)}%
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  Cap: {s.cap} Mds
                </div>
              </div>
            );
          })}
        </div>

        {/* Mini BRVM chart */}
        <div
          style={{
            flex: 1,
            background: "var(--bt-overlay-45)",
            borderRadius: 6,
            border: `1px solid ${C.border}`,
            padding: "8px 8px 4px",
            minHeight: 80,
          }}
        >
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 4 }}>
            BRVM Composite — 8 séances
          </div>
          <ResponsiveContainer width="100%" height={70}>
            <AreaChart data={chartData} margin={{ top: 2, bottom: 2, left: -20, right: 4 }}>
              <defs>
                <linearGradient id="brvm-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.accent} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={C.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--bt-border-a20)" vertical={false} />
              <XAxis
                dataKey="d"
                tick={{ fontSize: 10, fill: C.muted }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: C.muted }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                  fontSize: 12,
                  color: C.text,
                }}
                formatter={(v: number) => [v.toFixed(2), "BRVM Composite"]}
                itemStyle={{ color: C.accent }}
              />
              <Area
                type="monotone"
                dataKey="v"
                stroke={C.accent}
                strokeWidth={2}
                fill="url(#brvm-grad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </WidgetShell>
  );
}