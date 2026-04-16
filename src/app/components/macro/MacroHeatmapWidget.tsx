import { useState } from "react";
import { BarChart3, ArrowUpDown } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

interface CountryRow {
  code: string;
  name: string;
  flag: string;
  uemoa: boolean;
  gdpGrowth: number;
  inflation: number;
  debtGdp: number;
  fiscalBalance: number;
  currentAccount: number;
  foreignReserves: number; // months of imports
  riskScore: number; // 1-5
  trend: "up" | "stable" | "down";
}

const COUNTRIES: CountryRow[] = [
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", uemoa: true, gdpGrowth: 6.3, inflation: 4.2, debtGdp: 57.8, fiscalBalance: -3.8, currentAccount: -2.3, foreignReserves: 4.2, riskScore: 2, trend: "up" },
  { code: "SEN", name: "Sénégal", flag: "🇸🇳", uemoa: true, gdpGrowth: 7.1, inflation: 3.8, debtGdp: 74.2, fiscalBalance: -4.2, currentAccount: -13.2, foreignReserves: 3.8, riskScore: 2, trend: "up" },
  { code: "BEN", name: "Bénin", flag: "🇧🇯", uemoa: true, gdpGrowth: 6.2, inflation: 2.8, debtGdp: 48.5, fiscalBalance: -2.8, currentAccount: -6.2, foreignReserves: 3.5, riskScore: 2, trend: "up" },
  { code: "TGO", name: "Togo", flag: "🇹🇬", uemoa: true, gdpGrowth: 5.2, inflation: 4.5, debtGdp: 68.9, fiscalBalance: -3.2, currentAccount: -7.3, foreignReserves: 3.2, riskScore: 2, trend: "stable" },
  { code: "MLI", name: "Mali", flag: "🇲🇱", uemoa: true, gdpGrowth: 4.2, inflation: 5.4, debtGdp: 52.1, fiscalBalance: -4.8, currentAccount: -8.9, foreignReserves: 2.8, riskScore: 4, trend: "down" },
  { code: "GNB", name: "Guinée-Bissau", flag: "🇬🇼", uemoa: true, gdpGrowth: 3.8, inflation: 5.1, debtGdp: 78.4, fiscalBalance: -3.5, currentAccount: -5.8, foreignReserves: 2.5, riskScore: 3, trend: "stable" },
  { code: "BFA", name: "Burkina Faso", flag: "🇧🇫", uemoa: true, gdpGrowth: 3.2, inflation: 4.9, debtGdp: 48.3, fiscalBalance: -5.4, currentAccount: -9.1, foreignReserves: 2.2, riskScore: 5, trend: "down" },
  { code: "NER", name: "Niger", flag: "🇳🇪", uemoa: true, gdpGrowth: 3.1, inflation: 3.2, debtGdp: 44.7, fiscalBalance: -5.8, currentAccount: -12.8, foreignReserves: 2.0, riskScore: 5, trend: "down" },
  // Comparison countries
  { code: "NGA", name: "Nigéria", flag: "🇳🇬", uemoa: false, gdpGrowth: 3.2, inflation: 28.9, debtGdp: 39.4, fiscalBalance: -5.8, currentAccount: -0.8, foreignReserves: 5.5, riskScore: 3, trend: "stable" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", uemoa: false, gdpGrowth: 4.0, inflation: 23.2, debtGdp: 84.0, fiscalBalance: -6.2, currentAccount: -3.2, foreignReserves: 2.8, riskScore: 4, trend: "up" },
  { code: "KEN", name: "Kenya", flag: "🇰🇪", uemoa: false, gdpGrowth: 5.5, inflation: 6.8, debtGdp: 68.0, fiscalBalance: -5.8, currentAccount: -5.2, foreignReserves: 4.0, riskScore: 3, trend: "stable" },
];

const INDICATORS = [
  { key: "gdpGrowth", label: "Croissance", unit: "%", better: "high" as const },
  { key: "inflation", label: "Inflation", unit: "%", better: "low" as const },
  { key: "debtGdp", label: "Dette/PIB", unit: "%", better: "low" as const },
  { key: "fiscalBalance", label: "Sol. Fiscal", unit: "% PIB", better: "high" as const },
  { key: "currentAccount", label: "Cpt. Courant", unit: "% PIB", better: "high" as const },
  { key: "foreignReserves", label: "Réserves", unit: "mois", better: "high" as const },
  { key: "riskScore", label: "Score Risque", unit: "/5", better: "low" as const },
];

function getCellColor(value: number, key: string): { bg: string; text: string } {
  const thresholds: Record<string, { green: number[]; gold: number[]; orange: number[] }> = {
    gdpGrowth: { green: [5, Infinity], gold: [3, 5], orange: [1, 3] },
    inflation: { green: [-Infinity, 4], gold: [4, 7], orange: [7, 15] },
    debtGdp: { green: [-Infinity, 50], gold: [50, 70], orange: [70, 90] },
    fiscalBalance: { green: [-2, Infinity], gold: [-5, -2], orange: [-8, -5] },
    currentAccount: { green: [-3, Infinity], gold: [-8, -3], orange: [-15, -8] },
    foreignReserves: { green: [4, Infinity], gold: [2.5, 4], orange: [1.5, 2.5] },
    riskScore: { green: [-Infinity, 2], gold: [2, 3], orange: [3, 4] },
  };

  const t = thresholds[key];
  if (!t) return { bg: "transparent", text: "#54678d" };

  const inRange = (v: number, [lo, hi]: number[]) => v >= lo && v < hi;
  const check = (range: number[]) => inRange(value, range);

  if (check(t.green)) return { bg: "rgba(16,200,122,0.18)", text: "#10c87a" };
  if (check(t.gold)) return { bg: "rgba(244,185,66,0.18)", text: "#f4b942" };
  if (check(t.orange)) return { bg: "rgba(251,146,60,0.18)", text: "#fb923c" };
  return { bg: "rgba(244,56,96,0.15)", text: "#f43860" };
}

function TrendIcon({ trend }: { trend: "up" | "stable" | "down" }) {
  const C = useThemeColors();
  if (trend === "up") return <span style={{ fontSize: 10, color: C.green }}>▲</span>;
  if (trend === "down") return <span style={{ fontSize: 10, color: C.red }}>▼</span>;
  return <span style={{ fontSize: 10, color: C.muted }}>→</span>;
}

export function MacroHeatmapWidget() {
  const C = useThemeColors();
  const [showComparison, setShowComparison] = useState(false);

  const rows = showComparison ? COUNTRIES : COUNTRIES.filter((c) => c.uemoa);

  return (
    <div
      style={{
        height: "100%",
        background: C.surface,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "var(--bt-overlay-40)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.purple }} />
          <BarChart3 size={11} color={C.purple} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Heatmap Macro Comparative
          </span>
          <span style={{ fontSize: 9.5, color: C.muted }}>· UEMOA & Comparaison Régionale 2025</span>
        </div>
        <button
          onClick={() => setShowComparison(!showComparison)}
          style={{
            padding: "2px 8px",
            borderRadius: 3,
            border: `1px solid ${showComparison ? C.accent + "50" : C.border}`,
            background: showComparison ? "var(--bt-accent-a10)" : "transparent",
            color: showComparison ? C.accent : C.muted,
            fontSize: 10.5,
            fontWeight: showComparison ? 700 : 500,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ArrowUpDown size={9} />
          {showComparison ? "UEMOA seulement" : "+ Comparaison"}
        </button>
      </div>

      {/* Heatmap table */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        {/* Header row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "130px repeat(7, 1fr) 60px",
            padding: "5px 10px",
            background: "var(--bt-overlay-50)",
            position: "sticky",
            top: 0,
            zIndex: 2,
            borderBottom: `1px solid ${C.border}`,
            gap: 3,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            PAYS
          </div>
          {INDICATORS.map((ind) => (
            <div
              key={ind.key}
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                color: C.muted,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              {ind.label}
              <div style={{ fontSize: 8.5, color: C.muted, opacity: 0.7, fontWeight: 400 }}>{ind.unit}</div>
            </div>
          ))}
          <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.04em", textTransform: "uppercase", textAlign: "center" }}>
            TEND.
          </div>
        </div>

        {/* Data rows */}
        {rows.map((country, i) => {
          const isUemoa = country.uemoa;
          const isComparison = !country.uemoa;
          return (
            <div
              key={country.code}
              style={{
                display: "grid",
                gridTemplateColumns: "130px repeat(7, 1fr) 60px",
                padding: "4px 10px",
                gap: 3,
                background: isComparison
                  ? "rgba(167,139,250,0.04)"
                  : i % 2 === 0
                  ? "var(--bt-overlay-10)"
                  : "transparent",
                borderBottom: `1px solid ${C.border}10`,
                borderLeft: isUemoa ? `2px solid rgba(244,185,66,0.25)` : isComparison ? `2px solid rgba(167,139,250,0.25)` : "2px solid transparent",
                alignItems: "center",
              }}
            >
              {/* Country */}
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 15 }}>{country.flag}</span>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 700, color: isUemoa ? C.gold : isComparison ? C.purple : C.text }}>
                    {country.name}
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    <span style={{ fontSize: 9, color: C.muted }}>{country.code}</span>
                    {isUemoa && (
                      <span style={{ fontSize: 8.5, color: C.gold, fontWeight: 700 }}>UEMOA</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Indicator cells */}
              {INDICATORS.map((ind) => {
                const val = country[ind.key as keyof CountryRow] as number;
                const { bg, text } = getCellColor(val, ind.key);
                return (
                  <div
                    key={ind.key}
                    style={{
                      background: bg,
                      borderRadius: 3,
                      padding: "3px 4px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: text,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {ind.key === "riskScore" ? val + "/5" : (val > 0 && (ind.key === "fiscalBalance" || ind.key === "currentAccount")) ? `+${val}` : val}
                    </span>
                  </div>
                );
              })}

              {/* Trend */}
              <div style={{ textAlign: "center" }}>
                <TrendIcon trend={country.trend} />
              </div>
            </div>
          );
        })}

        {/* UEMOA Average row */}
        {(() => {
          const uemoa = COUNTRIES.filter((c) => c.uemoa);
          const avg = (key: keyof CountryRow) =>
            +(uemoa.reduce((sum, c) => sum + (c[key] as number), 0) / uemoa.length).toFixed(1);
          return (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px repeat(7, 1fr) 60px",
                padding: "5px 10px",
                gap: 3,
                borderTop: `1px solid ${C.border}`,
                background: "rgba(214, 182, 141,0.05)",
                alignItems: "center",
                position: "sticky",
                bottom: 0,
              }}
            >
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.accent, letterSpacing: "0.04em" }}>MOY. UEMOA</div>
              {INDICATORS.map((ind) => {
                const val = avg(ind.key as keyof CountryRow);
                const { bg, text } = getCellColor(val, ind.key);
                return (
                  <div key={ind.key} style={{ background: bg, borderRadius: 3, padding: "3px 4px", textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: text, fontVariantNumeric: "tabular-nums" }}>
                      {val}
                    </span>
                  </div>
                );
              })}
              <div />
            </div>
          );
        })()}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "4px 12px",
          borderTop: `1px solid ${C.border}`,
          background: "var(--bt-overlay-30)",
          display: "flex",
          gap: 12,
          flexShrink: 0,
        }}
      >
        {[
          { color: C.green, label: "Favorable" },
          { color: C.gold, label: "Modéré" },
          { color: C.orange, label: "Vigilance" },
          { color: C.red, label: "Critique" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color, opacity: 0.8 }} />
            <span style={{ fontSize: 9.5, color: C.muted }}>{item.label}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 9.5, color: C.muted }}>Sources : BCEAO · FMI · Banque Mondiale · 2025</span>
      </div>
    </div>
  );
}
