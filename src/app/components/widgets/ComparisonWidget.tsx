import { WidgetShell } from "./WidgetShell";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

const comparisonData = [
  { indicator: "Croissance PIB", civ: 6.5, sen: 7.2, unit: "%" },
  { indicator: "Inflation", civ: 4.2, sen: 3.8, unit: "%" },
  { indicator: "Dette/PIB", civ: 56.8, sen: 72.4, unit: "%" },
  { indicator: "Déficit budg.", civ: 4.5, sen: 6.1, unit: "%" },
];

const barData = [
  { name: "Croissance", civ: 6.5, sen: 7.2 },
  { name: "Inflation", civ: 4.2, sen: 3.8 },
  { name: "Dette÷10", civ: 5.68, sen: 7.24 },
  { name: "Déficit", civ: 4.5, sen: 6.1 },
];

export function ComparisonWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell
      title="Comparaison Rapide"
      subtitle="Analyse comparative — CIV vs SEN"
      lastUpdate="FMI WEO 2024"
      accentColor={C.purple}
    >
      {/* Country headers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          gap: 6,
        }}
      >
        <CountryCard
          name="Côte d'Ivoire"
          code="CIV"
          color={C.accent}
          gdp="70.4 Mds"
          growth="+6.5%"
          rating="B+"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            vs
          </div>
        </div>
        <CountryCard
          name="Sénégal"
          code="SEN"
          color={C.gold}
          gdp="27.8 Mds"
          growth="+7.2%"
          rating="B+"
          right
        />
      </div>

      {/* Metric rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {comparisonData.map((row) => {
          const civWins = row.indicator.includes("Inflation") || row.indicator.includes("Déficit")
            ? row.civ < row.sen
            : row.indicator.includes("Croissance")
            ? row.civ > row.sen
            : row.civ < row.sen;
          const maxVal = Math.max(row.civ, row.sen);

          return (
            <div key={row.indicator}>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  marginBottom: 3,
                }}
              >
                {row.indicator}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {/* CIV bar */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      height: 8,
                      width: `${(row.civ / maxVal) * 100}%`,
                      background: civWins ? C.accent : "var(--bt-accent-a30)",
                      borderRadius: "3px 0 0 3px",
                      transition: "width 0.3s",
                    }}
                  />
                </div>

                {/* Center labels */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    minWidth: 90,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: civWins ? C.accent : C.dim,
                      minWidth: 32,
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {row.civ}{row.unit}
                  </span>
                  <span style={{ fontSize: 10, color: C.muted }}>|</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: !civWins ? C.gold : C.dim,
                      minWidth: 32,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {row.sen}{row.unit}
                  </span>
                </div>

                {/* SEN bar */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      height: 8,
                      width: `${(row.sen / maxVal) * 100}%`,
                      background: !civWins ? C.gold : "rgba(244,185,66,0.3)",
                      borderRadius: "0 3px 3px 0",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini bar chart */}
      <div
        style={{
          marginTop: 10,
          background: "var(--bt-overlay-40)",
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          padding: "6px 6px 4px",
          height: 80,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData} margin={{ top: 0, bottom: 0, left: -20, right: 0 }} barSize={8}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: C.muted, textAnchor: "middle" }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 4,
                fontSize: 12,
                color: C.text,
              }}
            />
            <Bar key="bar-civ" dataKey="civ" name="CIV" fill={C.accent} opacity={0.8} radius={[2, 2, 0, 0]} />
            <Bar key="bar-sen" dataKey="sen" name="SEN" fill={C.gold} opacity={0.8} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 5 }}>
        <LegendItem color={C.accent} label="Côte d'Ivoire" />
        <LegendItem color={C.gold} label="Sénégal" />
      </div>
    </WidgetShell>
  );
}

function CountryCard({
  name,
  code,
  color,
  gdp,
  growth,
  rating,
  right,
}: {
  name: string;
  code: string;
  color: string;
  gdp: string;
  growth: string;
  rating: string;
  right?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        background: color + "0d",
        border: `1px solid ${color}25`,
        borderRadius: 6,
        padding: "6px 8px",
        textAlign: right ? "right" : "left",
      }}
    >
      <div style={{ fontSize: 11, color: color, fontWeight: 700, letterSpacing: "0.04em" }}>{code}</div>
      <div style={{ fontSize: 12, color: "#ddeaf8", fontWeight: 600, marginTop: 1 }}>{name}</div>
      <div style={{ fontSize: 13, color, fontWeight: 700, fontVariantNumeric: "tabular-nums", marginTop: 3 }}>
        {growth}
      </div>
      <div style={{ fontSize: 10, color: "#6b96b8" }}>PIB: {gdp} · Note: {rating}</div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
      <span style={{ fontSize: 11, color: C.muted }}>{label}</span>
    </div>
  );
}