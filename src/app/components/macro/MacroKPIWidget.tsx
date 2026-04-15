import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const C = {
  surface: "#000117",
  elevated: "#000117",
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

interface KPI {
  key: string;
  label: string;
  sublabel: string;
  category: string;
  categoryColor: string;
  value: string;
  unit: string;
  period: string;
  change: string;
  changeVal: number;
  prevLabel: string;
  spark: number[];
  invertGood?: boolean;
  accentColor: string;
}

const KPIS: KPI[] = [
  {
    key: "gdp",
    label: "PIB Réel",
    sublabel: "Produit Intérieur Brut",
    category: "Croissance",
    categoryColor: C.green,
    value: "6 850",
    unit: "Mds FCFA",
    period: "Exercice 2023",
    change: "+6.3%",
    changeVal: 6.3,
    prevLabel: "2022 : 5 850 Mds",
    spark: [5200, 5500, 5780, 5850, 6850],
    accentColor: C.green,
  },
  {
    key: "inflation",
    label: "Inflation IHPC",
    sublabel: "Indice Harmonisé",
    category: "Prix",
    categoryColor: C.gold,
    value: "4.2",
    unit: "% / an",
    period: "T3 2024",
    change: "−0.8pp",
    changeVal: -0.8,
    prevLabel: "T2 2024 : 5.0%",
    spark: [2.8, 6.1, 7.8, 5.0, 4.2],
    invertGood: true,
    accentColor: C.gold,
  },
  {
    key: "unemployment",
    label: "Chômage",
    sublabel: "Taux de chômage",
    category: "Emploi",
    categoryColor: C.accent,
    value: "8.4",
    unit: "%",
    period: "Exercice 2023",
    change: "−0.3pp",
    changeVal: -0.3,
    prevLabel: "2022 : 8.7%",
    spark: [9.5, 9.1, 8.8, 8.7, 8.4],
    invertGood: true,
    accentColor: C.accent,
  },
  {
    key: "trade",
    label: "Solde Commercial",
    sublabel: "% du PIB",
    category: "Commerce",
    categoryColor: C.purple,
    value: "−2.3",
    unit: "% PIB",
    period: "Exercice 2023",
    change: "+0.4pp",
    changeVal: 0.4,
    prevLabel: "2022 : −2.7%",
    spark: [-3.5, -3.2, -3.0, -2.7, -2.3],
    accentColor: C.purple,
  },
  {
    key: "growth",
    label: "Croissance Réelle",
    sublabel: "Taux annuel",
    category: "Croissance",
    categoryColor: C.green,
    value: "6.3",
    unit: "%",
    period: "Exercice 2023",
    change: "+0.4pp",
    changeVal: 0.4,
    prevLabel: "2022 : 5.9%",
    spark: [3.2, 2.0, 7.1, 5.9, 6.3],
    accentColor: C.green,
  },
  {
    key: "debt",
    label: "Dette Publique",
    sublabel: "% du PIB",
    category: "Finances Pub.",
    categoryColor: C.red,
    value: "57.8",
    unit: "% PIB",
    period: "Exercice 2023",
    change: "+2.1pp",
    changeVal: 2.1,
    prevLabel: "2022 : 55.7%",
    spark: [48.2, 52.1, 54.3, 55.7, 57.8],
    invertGood: true,
    accentColor: C.red,
  },
];

function SVGSparkline({ data, color }: { data: number[]; color: string }) {
  const w = 56;
  const h = 26;
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
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0.0} />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getChangeColor(val: number, invertGood?: boolean): string {
  if (val === 0) return C.muted;
  const positive = val > 0;
  if (invertGood) return positive ? C.red : C.green;
  return positive ? C.green : C.red;
}

function getChangeIcon(val: number) {
  if (val === 0) return <Minus size={9} />;
  if (val > 0) return <TrendingUp size={9} />;
  return <TrendingDown size={9} />;
}

export function MacroKPIWidget() {
  return (
    <div
      style={{
        height: "100%",
        background: C.surface,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.4)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 3,
              height: 14,
              borderRadius: 2,
              background: C.purple,
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.dim,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Indicateurs Macroéconomiques Clés
          </span>
          <span
            style={{
              fontSize: 8,
              color: C.muted,
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: 3,
              padding: "1px 6px",
            }}
          >
            Côte d'Ivoire · UEMOA
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 8, color: C.muted }}>Dernière MAJ : Avr 2024</span>
          <span
            style={{
              fontSize: 8,
              fontWeight: 600,
              color: C.green,
              background: "rgba(16,200,122,0.1)",
              border: "1px solid rgba(16,200,122,0.2)",
              borderRadius: 3,
              padding: "1px 6px",
            }}
          >
            Sources : INS-CI · BCEAO · FMI
          </span>
        </div>
      </div>

      {/* KPI cards row */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
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
                padding: "10px 14px 10px",
                borderRight: i < KPIS.length - 1 ? `1px solid ${C.border}` : "none",
                cursor: "pointer",
                transition: "background 0.15s",
                overflow: "hidden",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(214, 182, 141,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {/* Accent glow top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: kpi.accentColor,
                  opacity: 0.6,
                }}
              />

              {/* Top row: category + sparkline */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "1px 5px",
                      borderRadius: 3,
                      background: kpi.categoryColor + "14",
                      border: `1px solid ${kpi.categoryColor}28`,
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 7.5,
                        fontWeight: 700,
                        color: kpi.categoryColor,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                      }}
                    >
                      {kpi.category}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: C.dim,
                      lineHeight: 1.2,
                    }}
                  >
                    {kpi.label}
                  </div>
                </div>
                <SVGSparkline data={kpi.spark} color={kpi.accentColor} />
              </div>

              {/* Value */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    marginBottom: 4,
                  }}
                >
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
                  <span
                    style={{
                      fontSize: 9,
                      color: C.muted,
                      fontWeight: 500,
                    }}
                  >
                    {kpi.unit}
                  </span>
                </div>

                {/* Change badge + period */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: changeColor + "14",
                      border: `1px solid ${changeColor}28`,
                    }}
                  >
                    <span style={{ color: changeColor }}>{getChangeIcon(kpi.changeVal)}</span>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: changeColor,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {kpi.change}
                    </span>
                  </div>
                  <span style={{ fontSize: 7.5, color: C.muted }}>{kpi.prevLabel}</span>
                </div>
              </div>

              {/* Period */}
              <div style={{ fontSize: 7.5, color: C.muted, marginTop: 4 }}>
                {kpi.period}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}