import { useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { WidgetShell } from "../widgets/WidgetShell";
import { useThemeColors } from "../../hooks/useThemeColors";

const YEARS = ["FY2020", "FY2021", "FY2022", "FY2023", "FY2024E"];

// Income Statement data (in millions XOF)
const INCOME_STATEMENT = [
  { metric: "Produit Net Bancaire (PNB)", "FY2020": 112_400, "FY2021": 124_700, "FY2022": 138_200, "FY2023": 154_600, "FY2024E": 168_300, growth: "+12.0%", isKey: true },
  { metric: "Charges Générales d'Exploitation", "FY2020": -68_200, "FY2021": -74_300, "FY2022": -80_100, "FY2023": -86_800, "FY2024E": -93_200, growth: "+8.5%", isKey: false },
  { metric: "Résultat Brut d'Exploitation (RBE)", "FY2020": 44_200, "FY2021": 50_400, "FY2022": 58_100, "FY2023": 67_800, "FY2024E": 75_100, growth: "+16.7%", isKey: true },
  { metric: "Coût du Risque", "FY2020": -9_800, "FY2021": -10_200, "FY2022": -11_500, "FY2023": -12_800, "FY2024E": -13_500, growth: "+11.3%", isKey: false },
  { metric: "Résultat d'Exploitation", "FY2020": 34_400, "FY2021": 40_200, "FY2022": 46_600, "FY2023": 55_000, "FY2024E": 61_600, growth: "+18.1%", isKey: false },
  { metric: "Résultat Net (part du groupe)", "FY2020": 24_800, "FY2021": 29_400, "FY2022": 35_100, "FY2023": 41_200, "FY2024E": 46_500, growth: "+17.4%", isKey: true },
  { metric: "Résultat par action (XOF)", "FY2020": "1 580", "FY2021": "1 874", "FY2022": "2 238", "FY2023": "2 628", "FY2024E": "2 966", growth: "+17.4%", isKey: false },
];

// Balance Sheet data (in billions XOF)
const BALANCE_SHEET = [
  { metric: "Total Actif", "FY2020": 1_842_300, "FY2021": 2_015_400, "FY2022": 2_238_700, "FY2023": 2_487_100, "FY2024E": 2_720_400, growth: "+11.1%", isKey: true },
  { metric: "Prêts & Créances Clientèle", "FY2020": 1_024_500, "FY2021": 1_145_200, "FY2022": 1_287_300, "FY2023": 1_443_600, "FY2024E": 1_598_200, growth: "+12.1%", isKey: true },
  { metric: "Placements interbancaires", "FY2020": 312_400, "FY2021": 342_100, "FY2022": 378_500, "FY2023": 408_200, "FY2024E": 442_300, growth: "+7.9%", isKey: false },
  { metric: "Portefeuille Titres", "FY2020": 245_600, "FY2021": 278_300, "FY2022": 308_700, "FY2023": 348_100, "FY2024E": 382_400, growth: "+12.7%", isKey: false },
  { metric: "Dépôts Clientèle", "FY2020": 1_356_700, "FY2021": 1_489_200, "FY2022": 1_648_400, "FY2023": 1_824_700, "FY2024E": 1_980_200, growth: "+10.7%", isKey: true },
  { metric: "Capitaux Propres", "FY2020": 188_200, "FY2021": 207_400, "FY2022": 228_600, "FY2023": 248_300, "FY2024E": 271_400, growth: "+8.6%", isKey: true },
];

// Cash Flow data
const CASH_FLOW = [
  { metric: "Flux des Activités Opérationnelles", "FY2020": 38_400, "FY2021": 44_200, "FY2022": 51_800, "FY2023": 59_300, "FY2024E": 67_200, growth: "+14.4%", isKey: true },
  { metric: "Flux des Activités d'Investissement", "FY2020": -12_300, "FY2021": -14_200, "FY2022": -16_800, "FY2023": -19_400, "FY2024E": -21_800, growth: "+15.5%", isKey: false },
  { metric: "Flux des Activités de Financement", "FY2020": -18_200, "FY2021": -20_400, "FY2022": -23_100, "FY2023": -26_800, "FY2024E": -30_200, growth: "+16.1%", isKey: false },
  { metric: "Variation Nette de Trésorerie", "FY2020": 7_900, "FY2021": 9_600, "FY2022": 11_900, "FY2023": 13_100, "FY2024E": 15_200, growth: "+10.1%", isKey: false },
  { metric: "Trésorerie Nette de Fin de Période", "FY2020": 47_200, "FY2021": 56_800, "FY2022": 68_700, "FY2023": 81_800, "FY2024E": 97_000, growth: "+19.1%", isKey: true },
];

const CHART_DATA = [
  { year: "FY2020", PNB: 112.4, "Résultat Net": 24.8, Dépôts: 1356.7 / 10, "Total Actif": 1842.3 / 10 },
  { year: "FY2021", PNB: 124.7, "Résultat Net": 29.4, Dépôts: 1489.2 / 10, "Total Actif": 2015.4 / 10 },
  { year: "FY2022", PNB: 138.2, "Résultat Net": 35.1, Dépôts: 1648.4 / 10, "Total Actif": 2238.7 / 10 },
  { year: "FY2023", PNB: 154.6, "Résultat Net": 41.2, Dépôts: 1824.7 / 10, "Total Actif": 2487.1 / 10 },
  { year: "FY2024E", PNB: 168.3, "Résultat Net": 46.5, Dépôts: 1980.2 / 10, "Total Actif": 2720.4 / 10 },
];

const SUB_TABS = ["Compte de Résultat", "Bilan", "Flux de Trésorerie"] as const;
type SubTab = (typeof SUB_TABS)[number];

function formatNum(v: number | string): string {
  if (typeof v === "string") return v;
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}T`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(1)}Mds`;
  return `${v}M`;
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#000117", border: `1px solid var(--bt-border-a32)`, borderRadius: 6, padding: "8px 12px" }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#6b96b8", marginBottom: 6 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          <span style={{ fontSize: 11.5, color: "#6b96b8" }}>{p.name}</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#ddeaf8", marginLeft: "auto" }}>{p.value.toFixed(1)} Mds</span>
        </div>
      ))}
    </div>
  );
};

export function FinancialStatementsWidget() {
  const C = useThemeColors();
  const [subTab, setSubTab] = useState<SubTab>("Compte de Résultat");

  const rows =
    subTab === "Compte de Résultat"
      ? INCOME_STATEMENT
      : subTab === "Bilan"
      ? BALANCE_SHEET
      : CASH_FLOW;

  return (
    <WidgetShell
      title="États Financiers"
      subtitle="Comparaison pluriannuelle consolidée · SGBCI · 2020–2024E"
      accentColor={C.accent}
      noPadding
    >
      {/* Sub-tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          borderBottom: `1px solid ${C.border}`,
          background: "var(--bt-overlay-30)",
          padding: "0 12px",
          flexShrink: 0,
        }}
      >
        {SUB_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setSubTab(t)}
            style={{
              padding: "7px 14px",
              fontSize: 12,
              fontWeight: subTab === t ? 700 : 500,
              color: subTab === t ? C.accent : C.muted,
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${subTab === t ? C.accent : "transparent"}`,
              cursor: "pointer",
              letterSpacing: "0.02em",
              transition: "all 0.15s",
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 10, color: C.muted, fontStyle: "italic" }}>En millions XOF sauf indication contraire</span>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
        {/* Table */}
        <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12.5,
            }}
          >
            <thead>
              <tr style={{ background: "var(--bt-overlay-50)" }}>
                <th
                  style={{
                    padding: "8px 14px",
                    textAlign: "left",
                    color: C.muted,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    borderBottom: `1px solid ${C.border}`,
                    position: "sticky",
                    left: 0,
                    background: C.surface,
                    minWidth: 240,
                    zIndex: 2,
                  }}
                >
                  Ligne Financière
                </th>
                {YEARS.map((y) => (
                  <th
                    key={y}
                    style={{
                      padding: "8px 12px",
                      textAlign: "right",
                      color: y === "FY2024E" ? C.gold : C.muted,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      borderBottom: `1px solid ${C.border}`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {y}
                    {y === "FY2024E" && (
                      <span style={{ fontSize: 9, marginLeft: 3, color: C.gold, opacity: 0.7 }}>EST.</span>
                    )}
                  </th>
                ))}
                <th
                  style={{
                    padding: "8px 12px",
                    textAlign: "right",
                    color: C.green,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  Var. A/A
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const isNeg = typeof row["FY2023"] === "number" && (row["FY2023"] as number) < 0;
                return (
                  <tr
                    key={i}
                    style={{
                      background: row.isKey ? "var(--bt-accent-a06)" : i % 2 === 0 ? "var(--bt-overlay-20)" : "transparent",
                      borderBottom: `1px solid ${C.border}20`,
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bt-accent-a08)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = row.isKey
                        ? "var(--bt-accent-a06)"
                        : i % 2 === 0
                        ? "var(--bt-overlay-20)"
                        : "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "7px 14px",
                        color: row.isKey ? C.text : C.dim,
                        fontWeight: row.isKey ? 700 : 400,
                        fontSize: 12,
                        position: "sticky",
                        left: 0,
                        background: "inherit",
                        borderRight: `1px solid ${C.border}`,
                      }}
                    >
                      {row.isKey && (
                        <span
                          style={{
                            display: "inline-block",
                            width: 3,
                            height: 3,
                            borderRadius: "50%",
                            background: C.accent,
                            marginRight: 6,
                            verticalAlign: "middle",
                          }}
                        />
                      )}
                      {row.metric}
                    </td>
                    {YEARS.map((y) => {
                      const val = row[y as keyof typeof row];
                      const isEst = y === "FY2024E";
                      return (
                        <td
                          key={y}
                          style={{
                            padding: "7px 12px",
                            textAlign: "right",
                            fontVariantNumeric: "tabular-nums",
                            fontSize: 12,
                            fontWeight: row.isKey ? 700 : 400,
                            color: isEst ? C.gold : isNeg ? C.red : C.dim,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {typeof val === "number" ? formatNum(val) : val}
                        </td>
                      );
                    })}
                    <td
                      style={{
                        padding: "7px 12px",
                        textAlign: "right",
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: parseFloat(row.growth) > 0 ? C.green : C.red,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.growth}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mini chart */}
        <div
          style={{
            width: 260,
            borderLeft: `1px solid ${C.border}`,
            padding: "10px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            flexShrink: 0,
            background: "var(--bt-overlay-20)",
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Évolution — Mds XOF
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={CHART_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 10 }} tickLine={false} axisLine={{ stroke: C.border }} />
                <YAxis tick={{ fill: C.muted, fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="PNB" fill={C.accent} fillOpacity={0.7} radius={[2, 2, 0, 0]} name="PNB" />
                <Line dataKey="Résultat Net" stroke={C.gold} strokeWidth={2} dot={{ fill: C.gold, r: 3 }} type="monotone" name="Résultat Net" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
