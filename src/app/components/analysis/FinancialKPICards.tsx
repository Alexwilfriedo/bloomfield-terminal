import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

interface KPI {
  key: string;
  label: string;
  category: string;
  categoryColor: string;
  value: string;
  unit: string;
  change: string;
  changeVal: number;
  prev: string;
  spark: number[];
  invertGood?: boolean;
  accentColor: string;
}

const KPIS: KPI[] = [
  {
    key: "pnb",
    label: "PNB",
    category: "Revenus",
    categoryColor: "#d6b68d",
    value: "154.6",
    unit: "Mds XOF",
    change: "+12.0%",
    changeVal: 12.0,
    prev: "137.9 · FY2022",
    spark: [95.4, 108.7, 124.3, 137.9, 154.6],
    accentColor: "#d6b68d",
  },
  {
    key: "ebitda",
    label: "EBITDA",
    category: "Performance",
    categoryColor: "#10c87a",
    value: "74.3",
    unit: "Mds XOF",
    change: "+14.2%",
    changeVal: 14.2,
    prev: "65.1 · FY2022",
    spark: [42.1, 51.8, 60.4, 65.1, 74.3],
    accentColor: "#10c87a",
  },
  {
    key: "ni",
    label: "Résultat Net",
    category: "Rentabilité",
    categoryColor: "#f4b942",
    value: "41.2",
    unit: "Mds XOF",
    change: "+17.4%",
    changeVal: 17.4,
    prev: "35.1 · FY2022",
    spark: [24.8, 29.4, 35.1, 35.1, 41.2],
    accentColor: "#f4b942",
  },
  {
    key: "margin",
    label: "Marge Nette",
    category: "Marges",
    categoryColor: "#a78bfa",
    value: "26.7",
    unit: "%",
    change: "+1.2pp",
    changeVal: 1.2,
    prev: "25.5% · FY2022",
    spark: [22.1, 23.8, 25.1, 25.5, 26.7],
    accentColor: "#a78bfa",
  },
  {
    key: "roe",
    label: "ROE",
    category: "Efficacité",
    categoryColor: "#10c87a",
    value: "18.3",
    unit: "%",
    change: "+1.4pp",
    changeVal: 1.4,
    prev: "16.9% · FY2022",
    spark: [14.2, 15.8, 16.4, 16.9, 18.3],
    accentColor: "#10c87a",
  },
  {
    key: "roa",
    label: "ROA",
    category: "Efficacité",
    categoryColor: "#d6b68d",
    value: "1.65",
    unit: "%",
    change: "+0.12pp",
    changeVal: 0.12,
    prev: "1.53% · FY2022",
    spark: [1.21, 1.38, 1.48, 1.53, 1.65],
    accentColor: "#d6b68d",
  },
  {
    key: "tier1",
    label: "Tier 1",
    category: "Solvabilité",
    categoryColor: "#fb923c",
    value: "11.8",
    unit: "%",
    change: "+0.3pp",
    changeVal: 0.3,
    prev: "11.5% · FY2022",
    spark: [10.8, 11.1, 11.3, 11.5, 11.8],
    accentColor: "#fb923c",
  },
  {
    key: "npl",
    label: "Taux NPL",
    category: "Risque",
    categoryColor: "#f43860",
    value: "4.2",
    unit: "%",
    change: "−0.4pp",
    changeVal: -0.4,
    prev: "4.6% · FY2022",
    spark: [6.1, 5.5, 5.0, 4.6, 4.2],
    invertGood: true,
    accentColor: "#f43860",
  },
];

function SVGSparkline({ data, color }: { data: number[]; color: string }) {
  const w = 52;
  const h = 24;
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 2 - ((v - min) / range) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last dot */}
      {(() => {
        const lastIdx = data.length - 1;
        const lx = w;
        const ly = h - 2 - ((data[lastIdx] - min) / range) * (h - 4);
        return <circle cx={lx} cy={ly} r={2.5} fill={color} />;
      })()}
    </svg>
  );
}

function getChangeColor(val: number, invertGood?: boolean): string {
  if (val === 0) return "#54678d";
  const positive = val > 0;
  if (invertGood) return positive ? "#f43860" : "#10c87a";
  return positive ? "#10c87a" : "#f43860";
}

export function FinancialKPICards() {
  const C = useThemeColors();
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "var(--bt-overlay-40)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.gold }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: C.dim, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Indicateurs Financiers Clés
          </span>
          <span
            style={{
              fontSize: 10,
              color: C.gold,
              background: "rgba(244,185,66,0.1)",
              border: "1px solid rgba(244,185,66,0.2)",
              borderRadius: 3,
              padding: "1px 6px",
              fontWeight: 600,
            }}
          >
            SGBCI · FY2023
          </span>
        </div>
        <span style={{ fontSize: 10, color: C.muted }}>vs. FY2022 · Consolidé · XOF</span>
      </div>

      {/* KPI grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 0,
        }}
      >
        {KPIS.map((kpi, i) => {
          const changeColor = getChangeColor(kpi.changeVal, kpi.invertGood);
          return (
            <div
              key={kpi.key}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "10px 12px 10px",
                borderRight: i < KPIS.length - 1 ? `1px solid ${C.border}` : "none",
                cursor: "pointer",
                transition: "background 0.15s",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bt-accent-a06)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Accent top bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: kpi.accentColor,
                  opacity: 0.7,
                }}
              />

              {/* Category + sparkline */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: kpi.categoryColor,
                      background: kpi.categoryColor + "14",
                      border: `1px solid ${kpi.categoryColor}28`,
                      borderRadius: 3,
                      padding: "1px 5px",
                      letterSpacing: "0.03em",
                      textTransform: "uppercase",
                    }}
                  >
                    {kpi.category}
                  </span>
                  <div style={{ fontSize: 11, fontWeight: 600, color: C.dim, marginTop: 4 }}>{kpi.label}</div>
                </div>
                <SVGSparkline data={kpi.spark} color={kpi.accentColor} />
              </div>

              {/* Value */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: C.text,
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {kpi.value}
                </span>
                <span style={{ fontSize: 10.5, color: C.muted, fontWeight: 500 }}>{kpi.unit}</span>
              </div>

              {/* Change badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    padding: "2px 5px",
                    borderRadius: 4,
                    background: changeColor + "14",
                    border: `1px solid ${changeColor}28`,
                  }}
                >
                  {kpi.changeVal > 0 ? (
                    <TrendingUp size={8} color={changeColor} />
                  ) : kpi.changeVal < 0 ? (
                    <TrendingDown size={8} color={changeColor} />
                  ) : (
                    <Minus size={8} color={changeColor} />
                  )}
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: changeColor, fontVariantNumeric: "tabular-nums" }}>
                    {kpi.change}
                  </span>
                </div>
              </div>

              {/* Prev */}
              <div style={{ fontSize: 9.5, color: C.muted, marginTop: 3 }}>{kpi.prev}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
