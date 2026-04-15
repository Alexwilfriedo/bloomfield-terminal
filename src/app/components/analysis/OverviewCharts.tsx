import {
  ComposedChart,
  Bar,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { WidgetShell } from "../widgets/WidgetShell";

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
  orange: "#fb923c",
};

const REVENUE_DATA = [
  { year: "FY2020", PNB: 112.4, "RBE": 44.2, "Résultat Net": 24.8 },
  { year: "FY2021", PNB: 124.7, "RBE": 50.4, "Résultat Net": 29.4 },
  { year: "FY2022", PNB: 138.2, "RBE": 58.1, "Résultat Net": 35.1 },
  { year: "FY2023", PNB: 154.6, "RBE": 67.8, "Résultat Net": 41.2 },
  { year: "FY2024E", PNB: 168.3, "RBE": 75.1, "Résultat Net": 46.5 },
];

const MARGIN_DATA = [
  { year: "FY2020", "Marge Nette": 22.1, "ROE": 14.2, "CIR": 60.7 },
  { year: "FY2021", "Marge Nette": 23.6, "ROE": 15.8, "CIR": 59.6 },
  { year: "FY2022", "Marge Nette": 25.4, "ROE": 16.9, "CIR": 58.0 },
  { year: "FY2023", "Marge Nette": 26.7, "ROE": 18.3, "CIR": 56.2 },
  { year: "FY2024E", "Marge Nette": 27.6, "ROE": 19.1, "CIR": 55.1 },
];

const ASSET_DATA = [
  { year: "FY2020", "Total Actif": 184.2, "Dépôts": 135.7, "Prêts": 102.5 },
  { year: "FY2021", "Total Actif": 201.5, "Dépôts": 148.9, "Prêts": 114.5 },
  { year: "FY2022", "Total Actif": 223.9, "Dépôts": 164.8, "Prêts": 128.7 },
  { year: "FY2023", "Total Actif": 248.7, "Dépôts": 182.5, "Prêts": 144.4 },
  { year: "FY2024E", "Total Actif": 272.0, "Dépôts": 198.0, "Prêts": 159.8 },
];

const RevenueTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#000430", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px" }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, marginBottom: 5 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", gap: 10, marginBottom: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
            <span style={{ fontSize: 9, color: C.dim }}>{p.name}</span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.text, marginLeft: "auto" }}>{p.value.toFixed(1)} Mds</span>
        </div>
      ))}
    </div>
  );
};

const MarginTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#000430", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px" }}>
      <div style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, marginBottom: 5 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ display: "flex", gap: 10, marginBottom: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 2, background: p.color, borderRadius: 1 }} />
            <span style={{ fontSize: 9, color: C.dim }}>{p.name}</span>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.text, marginLeft: "auto" }}>{p.value.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
};

export function OverviewCharts() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, height: "100%" }}>
      {/* Revenue & Profitability */}
      <WidgetShell
        title="Revenus & Résultats"
        subtitle="PNB, RBE, Résultat Net · Mds XOF"
        accentColor={C.accent}
        noPadding={false}
      >
        <div style={{ height: "100%", minHeight: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={REVENUE_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" stroke={C.border} />
              <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 8 }} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis tick={{ fill: C.muted, fontSize: 8 }} tickLine={false} axisLine={false} />
              <Tooltip content={<RevenueTooltip />} />
              <Bar key="bar-PNB" dataKey="PNB" fill={C.accent} fillOpacity={0.5} radius={[2, 2, 0, 0]} name="PNB" />
              <Bar key="bar-RBE" dataKey="RBE" fill={C.purple} fillOpacity={0.5} radius={[2, 2, 0, 0]} name="RBE" />
              <Line key="line-net" dataKey="Résultat Net" stroke={C.gold} strokeWidth={2} dot={{ fill: C.gold, r: 3 }} type="monotone" name="Résultat Net" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </WidgetShell>

      {/* Margins */}
      <WidgetShell
        title="Marges & Rentabilité"
        subtitle="Marge Nette, ROE, CIR · %"
        accentColor={C.gold}
        noPadding={false}
      >
        <div style={{ height: "100%", minHeight: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MARGIN_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" stroke={C.border} />
              <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 8 }} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis tick={{ fill: C.muted, fontSize: 8 }} tickLine={false} axisLine={false} />
              <Tooltip content={<MarginTooltip />} />
              <Area key="area-marge" type="monotone" dataKey="Marge Nette" stroke={C.gold} fill={C.gold} fillOpacity={0.12} strokeWidth={2} dot={{ fill: C.gold, r: 2 }} name="Marge Nette" />
              <Area key="area-roe" type="monotone" dataKey="ROE" stroke={C.green} fill={C.green} fillOpacity={0.1} strokeWidth={2} dot={{ fill: C.green, r: 2 }} name="ROE" />
              <Area key="area-cir" type="monotone" dataKey="CIR" stroke={C.red} fill={C.red} fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 2" dot={false} name="CIR" />
              <ReferenceLine y={60} stroke={C.muted} strokeDasharray="3 3" strokeOpacity={0.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetShell>

      {/* Balance Sheet */}
      <WidgetShell
        title="Structure Bilan"
        subtitle="Total Actif, Dépôts, Prêts · Mds XOF (÷10)"
        accentColor={C.purple}
        noPadding={false}
      >
        <div style={{ height: "100%", minHeight: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ASSET_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 2" stroke={C.border} />
              <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 8 }} tickLine={false} axisLine={{ stroke: C.border }} />
              <YAxis tick={{ fill: C.muted, fontSize: 8 }} tickLine={false} axisLine={false} />
              <Tooltip content={<RevenueTooltip />} />
              <Area key="area-actif" type="monotone" dataKey="Total Actif" stroke={C.purple} fill={C.purple} fillOpacity={0.1} strokeWidth={2} name="Total Actif" />
              <Area key="area-depots" type="monotone" dataKey="Dépôts" stroke={C.accent} fill={C.accent} fillOpacity={0.1} strokeWidth={2} name="Dépôts" />
              <Area key="area-prets" type="monotone" dataKey="Prêts" stroke={C.gold} fill={C.gold} fillOpacity={0.08} strokeWidth={1.5} name="Prêts" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </WidgetShell>
    </div>
  );
}