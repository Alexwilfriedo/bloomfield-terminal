import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";
import { WidgetShell } from "../widgets/WidgetShell";
import { AlertTriangle, TrendingDown, Shield, Zap } from "lucide-react";

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
  surface: "#000117",
  orange: "#fb923c",
};

const SCENARIOS = [
  {
    id: "rate",
    icon: <Zap size={13} color={C.gold} />,
    title: "Choc Taux d'Intérêt",
    subtitle: "+200 bps BCEAO (choc parallèle)",
    impact: "−8.4%",
    impactVal: -8.4,
    roe_post: "16.8%",
    tier1_post: "11.2%",
    severity: "Modéré",
    severityColor: C.gold,
    probability: "28%",
    timeline: "12–18 mois",
    details: "Impact NII: −12.3 Mds XOF. Effet sur obligations souveraines en portefeuille.",
  },
  {
    id: "fx",
    icon: <TrendingDown size={13} color={C.orange} />,
    title: "Choc Change XOF/USD",
    subtitle: "Dévaluation CFA de 15%",
    impact: "−5.1%",
    impactVal: -5.1,
    roe_post: "17.4%",
    tier1_post: "11.5%",
    severity: "Modéré",
    severityColor: C.orange,
    probability: "12%",
    timeline: "6–12 mois",
    details: "Exposition nette en devises: 4.2 Mds XOF. Impact passif en devises.",
  },
  {
    id: "credit",
    icon: <AlertTriangle size={13} color={C.red} />,
    title: "Choc Crédit (NPL +5pp)",
    subtitle: "Dégradation portefeuille sectoriel",
    impact: "−21.3%",
    impactVal: -21.3,
    roe_post: "14.4%",
    tier1_post: "10.2%",
    severity: "Sévère",
    severityColor: C.red,
    probability: "8%",
    timeline: "24 mois",
    details: "Provisions supplémentaires: 42.8 Mds XOF. Impact RN significatif.",
  },
  {
    id: "crisis",
    icon: <Shield size={13} color={C.purple} />,
    title: "Scénario Crise Systémique",
    subtitle: "Crise régionale type 2008",
    impact: "−38.7%",
    impactVal: -38.7,
    roe_post: "11.2%",
    tier1_post: "8.9%",
    severity: "Extrême",
    severityColor: C.purple,
    probability: "3%",
    timeline: "3–5 ans",
    details: "Tier 1 proche seuil réglementaire. Plan de recapitalisation requis.",
  },
];

// Loss curve data
const LOSS_CURVE = [
  { prob: "0%", base: 0, adverse: 0, severe: 0 },
  { prob: "5%", base: -2.1, adverse: -4.8, severe: -12.4 },
  { prob: "10%", base: -3.8, adverse: -8.7, severe: -21.8 },
  { prob: "20%", base: -6.2, adverse: -14.2, severe: -35.6 },
  { prob: "30%", base: -8.4, adverse: -19.8, severe: -48.3 },
  { prob: "50%", base: -12.1, adverse: -27.4, severe: -62.8 },
  { prob: "80%", base: -18.7, adverse: -38.6, severe: -82.4 },
  { prob: "95%", base: -24.3, adverse: -48.2, severe: -98.7 },
  { prob: "99%", base: -31.8, adverse: -61.4, severe: -118.2 },
];

// Sensitivity table
const SENSITIVITY = [
  { factor: "Taux directeur BCEAO", base: "3.50%", scenarios: ["+25bps", "+50bps", "+100bps", "+200bps"], impacts: ["-1.2%", "-2.4%", "-4.8%", "-8.4%"], colors: [C.green, C.gold, C.orange, C.red] },
  { factor: "NPL Ratio", base: "4.2%", scenarios: ["+1pp", "+2pp", "+3pp", "+5pp"], impacts: ["-4.3%", "-8.7%", "-13.2%", "-21.3%"], colors: [C.gold, C.orange, C.red, C.red] },
  { factor: "Cours XOF/EUR", base: "655.96", scenarios: ["−5%", "−10%", "−15%", "−25%"], impacts: ["-1.7%", "-3.4%", "-5.1%", "-8.9%"], colors: [C.green, C.gold, C.orange, C.red] },
  { factor: "Prix Matières 1ères", base: "Référence", scenarios: ["−10%", "−20%", "−30%", "−50%"], impacts: ["-0.8%", "-2.1%", "-3.8%", "-7.2%"], colors: [C.green, C.green, C.gold, C.orange] },
];

const LossTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#000117", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px" }}>
      <div style={{ fontSize: 9, color: C.muted, marginBottom: 4 }}>Percentile VaR: {label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
          <div style={{ width: 8, height: 2, background: p.color }} />
          <span style={{ fontSize: 9, color: C.dim }}>{p.name}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: p.color, marginLeft: "auto" }}>
            {p.value}%
          </span>
        </div>
      ))}
    </div>
  );
};

export function ScenarioStressWidget() {
  return (
    <WidgetShell
      title="Scénarios & Tests de Résistance"
      subtitle="Stress testing réglementaire · BCEAO/BCE · SGBCI FY2023"
      accentColor={C.orange}
      noPadding
    >
      <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
        {/* Left: scenario cards + sensitivity */}
        <div style={{ flex: 1, overflow: "auto", minWidth: 0, display: "flex", flexDirection: "column" }}>
          {/* Scenario cards */}
          <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
              Scénarios Stress Test
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {SCENARIOS.map((s) => (
                <div
                  key={s.id}
                  style={{
                    background: "rgba(0, 1, 23,0.4)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 7,
                    padding: "10px 12px",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = s.severityColor + "50";
                    (e.currentTarget as HTMLDivElement).style.background = s.severityColor + "08";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(0, 1, 23,0.4)";
                  }}
                >
                  {/* Severity accent */}
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: s.severityColor, opacity: 0.6 }} />

                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      {s.icon}
                      <div>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{s.title}</div>
                        <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>{s.subtitle}</div>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 7.5,
                        fontWeight: 700,
                        color: s.severityColor,
                        background: s.severityColor + "14",
                        border: `1px solid ${s.severityColor}28`,
                        borderRadius: 3,
                        padding: "1px 5px",
                        flexShrink: 0,
                      }}
                    >
                      {s.severity}
                    </span>
                  </div>

                  {/* Impact */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                    <div>
                      <div style={{ fontSize: 7, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>Impact RN</div>
                      <div style={{ fontSize: 14, fontWeight: 900, color: C.red, lineHeight: 1 }}>{s.impact}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 7, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>ROE Post</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, lineHeight: 1 }}>{s.roe_post}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 7, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>Tier 1 Post</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, lineHeight: 1 }}>{s.tier1_post}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: 8, color: C.muted, lineHeight: 1.4 }}>{s.details}</div>

                  <div style={{ display: "flex", gap: 8, marginTop: 5 }}>
                    <span style={{ fontSize: 7.5, color: C.muted }}>⏱ {s.timeline}</span>
                    <span style={{ fontSize: 7.5, color: C.muted }}>P(scénario): {s.probability}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sensitivity analysis table */}
          <div style={{ padding: "10px 12px", flex: 1 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>
              Analyse de Sensibilité — Impact sur Résultat Net
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
              <thead>
                <tr style={{ background: "rgba(0, 1, 23,0.5)" }}>
                  <th style={{ padding: "5px 10px", textAlign: "left", color: C.muted, fontSize: 8.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: `1px solid ${C.border}` }}>
                    Facteur de Risque
                  </th>
                  <th style={{ padding: "5px 10px", textAlign: "center", color: C.muted, fontSize: 8.5, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Base</th>
                  <th style={{ padding: "5px 10px", textAlign: "center", color: C.green, fontSize: 8.5, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Scén. 1</th>
                  <th style={{ padding: "5px 10px", textAlign: "center", color: C.gold, fontSize: 8.5, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Scén. 2</th>
                  <th style={{ padding: "5px 10px", textAlign: "center", color: C.orange, fontSize: 8.5, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Scén. 3</th>
                  <th style={{ padding: "5px 10px", textAlign: "center", color: C.red, fontSize: 8.5, fontWeight: 700, borderBottom: `1px solid ${C.border}` }}>Scén. 4</th>
                </tr>
              </thead>
              <tbody>
                {SENSITIVITY.map((row, i) => (
                  <tr
                    key={i}
                    style={{ background: i % 2 === 0 ? "rgba(0, 1, 23,0.2)" : "transparent", borderBottom: `1px solid ${C.border}15` }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "rgba(0, 1, 23,0.2)" : "transparent")}
                  >
                    <td style={{ padding: "6px 10px", fontSize: 9.5, fontWeight: 600, color: C.text }}>{row.factor}</td>
                    <td style={{ padding: "6px 10px", textAlign: "center", fontSize: 9, color: C.muted }}>{row.base}</td>
                    {row.scenarios.map((scen, si) => (
                      <td key={si} style={{ padding: "6px 10px", textAlign: "center" }}>
                        <div style={{ fontSize: 8, color: C.muted, marginBottom: 1 }}>{scen}</div>
                        <div style={{ fontSize: 9.5, fontWeight: 700, color: row.colors[si] }}>{row.impacts[si]}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Loss curve */}
        <div
          style={{
            width: 280,
            borderLeft: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            background: "rgba(0, 1, 23,0.2)",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 2 }}>
              Courbes de Perte (VaR)
            </div>
            <div style={{ fontSize: 7.5, color: C.muted }}>Impact sur RN en % — Base, Adverse, Sévère</div>
          </div>
          <div style={{ flex: 1, padding: "8px 6px 8px 8px", minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LOSS_CURVE} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke={C.border} />
                <XAxis
                  dataKey="prob"
                  tick={{ fill: C.muted, fontSize: 7.5 }}
                  tickLine={false}
                  axisLine={{ stroke: C.border }}
                  label={{ value: "Percentile", position: "insideBottom", offset: -2, fill: C.muted, fontSize: 7 }}
                />
                <YAxis
                  tick={{ fill: C.muted, fontSize: 7.5 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<LossTooltip />} />
                <ReferenceLine y={0} stroke={C.border} strokeDasharray="3 3" />
                <Area type="monotone" dataKey="base" stroke={C.green} fill={C.green} fillOpacity={0.12} strokeWidth={1.5} name="Scén. Base" />
                <Area type="monotone" dataKey="adverse" stroke={C.gold} fill={C.gold} fillOpacity={0.1} strokeWidth={1.5} name="Adverse" />
                <Area type="monotone" dataKey="severe" stroke={C.red} fill={C.red} fillOpacity={0.08} strokeWidth={1.5} name="Sévère" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* VaR summary */}
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${C.border}`, background: "rgba(0, 1, 23,0.3)" }}>
            <div style={{ fontSize: 8, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              Valeur à Risque (VaR 99%)
            </div>
            {[
              { label: "VaR 95% — Base", value: "−24.3%", color: C.green },
              { label: "VaR 95% — Adverse", value: "−48.2%", color: C.gold },
              { label: "VaR 99% — Sévère", value: "−118.2%", color: C.red },
            ].map((v) => (
              <div key={v.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <span style={{ fontSize: 8.5, color: C.muted }}>{v.label}</span>
                <span style={{ fontSize: 10, fontWeight: 800, color: v.color, fontVariantNumeric: "tabular-nums" }}>
                  {v.value}
                </span>
              </div>
            ))}

            {/* Capital buffer */}
            <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 6, background: "rgba(16,200,122,0.06)", border: "1px solid rgba(16,200,122,0.18)" }}>
              <div style={{ fontSize: 8, color: C.green, fontWeight: 700, marginBottom: 3 }}>Buffer Capital Disponible</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: C.green }}>+72.4 Mds XOF</div>
              <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>Au-dessus du seuil réglementaire minimum</div>
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}