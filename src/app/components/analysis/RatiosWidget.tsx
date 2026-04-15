import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { WidgetShell } from "../widgets/WidgetShell";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const C = {
  accent: "#d6b68d",
  border: "rgba(44, 61, 127,0.32)",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  purple: "#a78bfa",
  surface: "#000430",
  orange: "#fb923c",
};

interface Ratio {
  label: string;
  value: string;
  numericValue: number;
  benchmark: string;
  trend: "up" | "down" | "flat";
  trendVal: string;
  status: "good" | "watch" | "bad";
  description: string;
}

const PROFITABILITY: Ratio[] = [
  { label: "ROE", value: "18.3%", numericValue: 18.3, benchmark: "Secteur: 14.1%", trend: "up", trendVal: "+1.4pp", status: "good", description: "Rendement des capitaux propres" },
  { label: "ROA", value: "1.65%", numericValue: 1.65, benchmark: "Secteur: 1.28%", trend: "up", trendVal: "+0.12pp", status: "good", description: "Rendement total des actifs" },
  { label: "Marge Nette", value: "26.7%", numericValue: 26.7, benchmark: "Secteur: 22.4%", trend: "up", trendVal: "+1.2pp", status: "good", description: "Résultat net / PNB" },
  { label: "NIM", value: "4.82%", numericValue: 4.82, benchmark: "Secteur: 4.15%", trend: "up", trendVal: "+0.21pp", status: "good", description: "Marge d'intérêt nette" },
  { label: "CIR", value: "56.2%", numericValue: 56.2, benchmark: "Secteur: 61.3%", trend: "down", trendVal: "−1.8pp", status: "good", description: "Coefficient d'exploitation" },
];

const QUALITY: Ratio[] = [
  { label: "Taux NPL", value: "4.2%", numericValue: 4.2, benchmark: "Secteur: 6.8%", trend: "down", trendVal: "−0.4pp", status: "good", description: "Prêts non-performants / Total prêts" },
  { label: "Taux Couverture", value: "82.4%", numericValue: 82.4, benchmark: "Req: ≥ 80%", trend: "up", trendVal: "+2.1pp", status: "good", description: "Provisions / Créances douteuses" },
  { label: "Coût Risque", value: "0.89%", numericValue: 0.89, benchmark: "Secteur: 1.2%", trend: "up", trendVal: "−0.06pp", status: "good", description: "Coût du risque / Encours" },
  { label: "L/D Ratio", value: "79.1%", numericValue: 79.1, benchmark: "Opt: 70–85%", trend: "up", trendVal: "+1.4pp", status: "good", description: "Prêts / Dépôts" },
];

const SOLVENCY: Ratio[] = [
  { label: "Tier 1", value: "11.8%", numericValue: 11.8, benchmark: "Min. Basel III: 8%", trend: "up", trendVal: "+0.3pp", status: "good", description: "Capital Tier 1 / RWA" },
  { label: "CAR Total", value: "14.2%", numericValue: 14.2, benchmark: "Min. BCEAO: 11.5%", trend: "up", trendVal: "+0.5pp", status: "good", description: "Capital total / RWA" },
  { label: "Levier", value: "7.8x", numericValue: 7.8, benchmark: "Secteur: 9.2x", trend: "down", trendVal: "−0.4x", status: "good", description: "Actifs / Capitaux propres" },
  { label: "LCR", value: "124.3%", numericValue: 124.3, benchmark: "Min.: 100%", trend: "up", trendVal: "+3.2pp", status: "good", description: "Ratio de liquidité à court terme" },
];

const EFFICIENCY: Ratio[] = [
  { label: "PNB / Employé", value: "83.7 M", numericValue: 83.7, benchmark: "Secteur: 68.4 M", trend: "up", trendVal: "+8.2%", status: "good", description: "PNB par employé (XOF)" },
  { label: "RN / Actif Prod.", value: "2.84%", numericValue: 2.84, benchmark: "Secteur: 2.41%", trend: "up", trendVal: "+0.18pp", status: "good", description: "Résultat net / Actifs productifs" },
  { label: "Turnover Actifs", value: "0.062", numericValue: 0.062, benchmark: "Secteur: 0.058", trend: "up", trendVal: "+0.003", status: "good", description: "PNB / Total actif" },
  { label: "Div. / RN", value: "41.2%", numericValue: 41.2, benchmark: "Politique: 40%", trend: "up", trendVal: "+1.2pp", status: "watch", description: "Taux de distribution dividendes" },
];

const RADAR_DATA = [
  { subject: "ROE", SGBCI: 85, Secteur: 65 },
  { subject: "ROA", SGBCI: 78, Secteur: 60 },
  { subject: "Marge", SGBCI: 82, Secteur: 68 },
  { subject: "Qualité", SGBCI: 88, Secteur: 55 },
  { subject: "Solvabilité", SGBCI: 72, Secteur: 75 },
  { subject: "Efficience", SGBCI: 79, Secteur: 62 },
];

function RatioRow({ r }: { r: Ratio }) {
  const statusColor = r.status === "good" ? C.green : r.status === "watch" ? C.gold : C.red;
  const trendColor = r.trend === "up" ? C.green : r.trend === "down" ? C.red : C.muted;
  // For some ratios "down" is better (CIR, NPL, Cost of risk)
  const isInverted = ["CIR", "Taux NPL", "Coût Risque", "Levier"].includes(r.label);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        borderBottom: `1px solid ${C.border}15`,
        cursor: "default",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.04)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Status dot */}
      <div
        style={{ width: 5, height: 5, borderRadius: "50%", background: statusColor, flexShrink: 0, boxShadow: `0 0 4px ${statusColor}` }}
      />

      {/* Label */}
      <div style={{ minWidth: 110, flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.text }}>{r.label}</div>
        <div style={{ fontSize: 7.5, color: C.muted, lineHeight: 1.2 }}>{r.description}</div>
      </div>

      {/* Value */}
      <div
        style={{
          minWidth: 54,
          fontSize: 12,
          fontWeight: 800,
          color: C.text,
          fontVariantNumeric: "tabular-nums",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {r.value}
      </div>

      {/* Trend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          minWidth: 56,
          flexShrink: 0,
        }}
      >
        {r.trend === "up" ? (
          <TrendingUp size={9} color={isInverted ? C.red : C.green} />
        ) : r.trend === "down" ? (
          <TrendingDown size={9} color={isInverted ? C.green : C.red} />
        ) : (
          <Minus size={9} color={C.muted} />
        )}
        <span style={{ fontSize: 9, fontWeight: 700, color: isInverted ? (r.trend === "down" ? C.green : C.red) : trendColor }}>
          {r.trendVal}
        </span>
      </div>

      {/* Benchmark bar */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: 7.5, color: C.muted }}>{r.benchmark}</span>
        </div>
        <div style={{ height: 3, background: "rgba(44, 61, 127,0.2)", borderRadius: 2, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, (r.numericValue / (r.numericValue * 1.3)) * 100)}%`,
              background: statusColor,
              borderRadius: 2,
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function RatioSection({ title, color, ratios }: { title: string; color: string; ratios: Ratio[] }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 12px",
          background: "rgba(0, 4, 48,0.4)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ width: 3, height: 12, borderRadius: 2, background: color }} />
        <span style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</span>
      </div>
      {ratios.map((r) => (
        <RatioRow key={r.label} r={r} />
      ))}
    </div>
  );
}

const RadarTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#000430", border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 10px" }}>
      {payload.map((p) => (
        <div key={p.name} style={{ fontSize: 9.5, color: C.text }}>
          <span style={{ color: C.dim }}>{p.name}: </span>
          <strong>{p.value}/100</strong>
        </div>
      ))}
    </div>
  );
};

export function RatiosWidget() {
  return (
    <WidgetShell
      title="Ratios Financiers"
      subtitle="Analyse multidimensionnelle · SGBCI FY2023 vs. benchmarks sectoriels"
      accentColor={C.purple}
      noPadding
    >
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
        {/* Left: ratio list */}
        <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
          <RatioSection title="Rentabilité" color={C.gold} ratios={PROFITABILITY} />
          <RatioSection title="Qualité du Portefeuille" color={C.accent} ratios={QUALITY} />
          <RatioSection title="Solvabilité & Liquidité" color={C.orange} ratios={SOLVENCY} />
          <RatioSection title="Efficience Opérationnelle" color={C.green} ratios={EFFICIENCY} />
        </div>

        {/* Right: radar + score */}
        <div
          style={{
            width: 230,
            borderLeft: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            background: "rgba(0, 4, 48,0.2)",
            flexShrink: 0,
          }}
        >
          {/* Bloomfield Score */}
          <div
            style={{
              padding: "12px 14px",
              borderBottom: `1px solid ${C.border}`,
              background: "rgba(0, 4, 48,0.3)",
            }}
          >
            <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              Score Bloomfield
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: C.green, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>82</span>
              <span style={{ fontSize: 12, color: C.muted }}>/100</span>
            </div>
            <div style={{ fontSize: 8.5, color: C.green, fontWeight: 600, marginTop: 3 }}>Solide · Surperformance sectorielle</div>
            <div
              style={{
                marginTop: 8,
                height: 5,
                background: "rgba(44, 61, 127,0.3)",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "82%",
                  background: `linear-gradient(90deg, ${C.green}, ${C.accent})`,
                  borderRadius: 3,
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
              <span style={{ fontSize: 7, color: C.muted }}>0 — Faible</span>
              <span style={{ fontSize: 7, color: C.muted }}>100 — Excellent</span>
            </div>
          </div>

          {/* Radar chart */}
          <div style={{ flex: 1, padding: "8px 6px 6px", minHeight: 0 }}>
            <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4, paddingLeft: 6 }}>
              Profil de Performance
            </div>
            <div style={{ height: 170 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke={C.border} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: C.muted, fontSize: 8 }} />
                  <Radar name="SGBCI" dataKey="SGBCI" stroke={C.accent} fill={C.accent} fillOpacity={0.2} strokeWidth={1.5} />
                  <Radar name="Secteur" dataKey="Secteur" stroke={C.muted} fill={C.muted} fillOpacity={0.1} strokeWidth={1} strokeDasharray="3 3" />
                  <Tooltip content={<RadarTooltip />} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 4 }}>
              <Legend label="SGBCI" color={C.accent} />
              <Legend label="Secteur" color={C.muted} dashed />
            </div>
          </div>

          {/* Rating summary */}
          <div style={{ padding: "10px 14px", borderTop: `1px solid ${C.border}`, background: "rgba(0, 4, 48,0.3)" }}>
            <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              Notation Bloomfield
            </div>
            {[
              { cat: "Rentabilité", note: "A", color: C.green },
              { cat: "Risque", note: "B+", color: C.gold },
              { cat: "Solvabilité", note: "A–", color: C.green },
              { cat: "Liquidité", note: "A", color: C.green },
            ].map((n) => (
              <div key={n.cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: C.dim }}>{n.cat}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: n.color,
                    background: n.color + "14",
                    border: `1px solid ${n.color}28`,
                    borderRadius: 4,
                    padding: "1px 8px",
                  }}
                >
                  {n.note}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

function Legend({ label, color, dashed }: { label: string; color: string; dashed?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 14,
          height: 2,
          background: color,
          borderRadius: 1,
          opacity: dashed ? 0.5 : 1,
          borderTop: dashed ? `1px dashed ${color}` : "none",
        }}
      />
      <span style={{ fontSize: 7.5, color: C.muted }}>{label}</span>
    </div>
  );
}
