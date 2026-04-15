import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import { TrendingDown, TrendingUp, AlertTriangle, ShieldCheck } from "lucide-react";

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
  orange: "#fb923c",
};

const EXPORTS_DATA = [
  { name: "Cacao & prod.", value: 4840, pct: 38.4, color: "#a67c52" },
  { name: "Pétrole brut", value: 2580, pct: 20.5, color: C.orange },
  { name: "Or & métaux", value: 1620, pct: 12.9, color: C.gold },
  { name: "Caoutchouc", value: 980, pct: 7.8, color: "#34d399" },
  { name: "Bois & sciages", value: 720, pct: 5.7, color: "#6ee7b7" },
  { name: "Coton", value: 580, pct: 4.6, color: "#93c5fd" },
  { name: "Autres", value: 1260, pct: 10.1, color: C.muted },
];

const IMPORTS_DATA = [
  { name: "Produits pétroliers", value: 2950, pct: 25.8, color: C.orange },
  { name: "Équipements", value: 2240, pct: 19.6, color: C.accent },
  { name: "Alimentation", value: 1890, pct: 16.5, color: "#34d399" },
  { name: "Produits chimiques", value: 1420, pct: 12.4, color: C.purple },
  { name: "Véhicules", value: 980, pct: 8.6, color: "#60a5fa" },
  { name: "Autres", value: 1960, pct: 17.1, color: C.muted },
];

const TRADE_BALANCE = [
  { year: "2019", balance: -1.8, exports: 11.2, imports: 13.0 },
  { year: "2020", balance: -2.1, exports: 10.8, imports: 12.9 },
  { year: "2021", balance: -2.5, exports: 11.9, imports: 14.4 },
  { year: "2022", balance: -2.7, exports: 12.4, imports: 15.1 },
  { year: "2023", balance: -2.3, exports: 12.6, imports: 14.9 },
];

const VULNERABILITY = [
  { label: "Concentration exports", score: 72, level: "ÉLEVÉ", color: C.red },
  { label: "Dépendance cacao", score: 38, level: "MODÉRÉ", color: C.gold },
  { label: "Couverture imports", score: 85, level: "FAIBLE", color: C.green },
  { label: "Vulnérabilité pétrolière", score: 58, level: "MODÉRÉ", color: C.gold },
];

const TABS = ["Balance", "Exports", "Imports", "Vulnérabilité"] as const;
type Tab = (typeof TABS)[number];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#000117",
        border: `1px solid ${C.border}`,
        borderRadius: 5,
        padding: "6px 10px",
        fontSize: 10,
        color: C.text,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 3 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color || C.dim }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  );
};

export function TradeWidget() {
  const [tab, setTab] = useState<Tab>("Exports");

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
          padding: "7px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.4)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.orange }} />
          <span style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Commerce Extérieur & Matières Premières
          </span>
        </div>
        <span style={{ fontSize: 8, color: C.muted }}>CIV · 2023</span>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.2)",
          flexShrink: 0,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "7px 0",
              background: "transparent",
              border: "none",
              borderBottom: tab === t ? `2px solid ${C.accent}` : "2px solid transparent",
              color: tab === t ? C.accent : C.muted,
              fontSize: 9.5,
              fontWeight: tab === t ? 700 : 500,
              cursor: "pointer",
              letterSpacing: "0.04em",
              transition: "all 0.1s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "10px 12px", minHeight: 0 }}>
        {tab === "Balance" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Summary stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
              <StatCard label="Exportations" value="12 580" unit="Mds FCFA" change="+1.6%" up />
              <StatCard label="Importations" value="14 870" unit="Mds FCFA" change="-1.3%" up={false} />
              <StatCard label="Solde" value="-2 290" unit="Mds FCFA" change="+0.4pp" up />
            </div>
            {/* Balance chart */}
            <div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                Évolution Balance Commerciale (% PIB)
              </div>
              <div style={{ height: 90 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TRADE_BALANCE} margin={{ top: 4, right: 4, bottom: 0, left: -22 }}>
                    <defs>
                      <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={C.red} stopOpacity={0.25} />
                        <stop offset="100%" stopColor={C.red} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke="rgba(44, 61, 127,0.2)" vertical={false} />
                    <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 8 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: C.muted, fontSize: 8 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area key="area-balance" dataKey="balance" name="Balance" stroke={C.red} fill="url(#balGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Coverage rate */}
            <div style={{ background: C.elevated, borderRadius: 5, border: `1px solid ${C.border}`, padding: "8px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 8.5, color: C.muted }}>Taux de couverture imports/exports</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums" }}>84.6%</span>
              </div>
              <div style={{ height: 5, background: "rgba(44, 61, 127,0.2)", borderRadius: 3, marginTop: 6, position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: "84.6%", height: "100%", background: `linear-gradient(90deg, ${C.green} 0%, ${C.gold} 100%)`, borderRadius: 3 }} />
              </div>
            </div>
          </div>
        )}

        {(tab === "Exports" || tab === "Imports") && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ height: 130 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tab === "Exports" ? EXPORTS_DATA : IMPORTS_DATA}
                    layout="vertical"
                    margin={{ top: 0, right: 40, bottom: 0, left: 0 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fill: C.muted, fontSize: 8 }}
                      axisLine={false}
                      tickLine={false}
                      width={90}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Mds FCFA" radius={[0, 3, 3, 0]} maxBarSize={12}>
                      {(tab === "Exports" ? EXPORTS_DATA : IMPORTS_DATA).map((entry) => (
                        <Cell key={`cell-${entry.name}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Legend */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {(tab === "Exports" ? EXPORTS_DATA : IMPORTS_DATA).map((d, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 8, color: C.muted }}>{d.name}</span>
                  <span style={{ fontSize: 8, fontWeight: 600, color: C.dim }}>{d.pct}%</span>
                </div>
              ))}
            </div>
            {/* Top item callout */}
            <div
              style={{
                background: C.elevated,
                borderRadius: 5,
                border: `1px solid ${C.border}`,
                padding: "8px 10px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {tab === "Exports" ? (
                <AlertTriangle size={12} color={C.gold} />
              ) : (
                <TrendingDown size={12} color={C.orange} />
              )}
              <div>
                <span style={{ fontSize: 9, fontWeight: 600, color: C.text }}>
                  {tab === "Exports"
                    ? "Forte dépendance au cacao : 38.4% des exports"
                    : "Facture pétrolière : 25.8% des imports en 2023"}
                </span>
                <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>
                  {tab === "Exports"
                    ? "Risque de volatilité élevé — corrélation cours internationaux"
                    : "Vulnérabilité aux chocs pétroliers — couverture partielle"}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === "Vulnérabilité" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
              Analyse de Vulnérabilité Externe
            </div>
            {VULNERABILITY.map((v) => (
              <div
                key={v.label}
                style={{
                  background: C.elevated,
                  borderRadius: 5,
                  border: `1px solid ${C.border}`,
                  padding: "8px 10px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 9, color: C.dim }}>{v.label}</span>
                  <span
                    style={{
                      fontSize: 7.5,
                      fontWeight: 700,
                      color: v.color,
                      background: v.color + "14",
                      border: `1px solid ${v.color}28`,
                      borderRadius: 3,
                      padding: "1px 5px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {v.level}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 5, background: "rgba(44, 61, 127,0.2)", borderRadius: 3 }}>
                    <div
                      style={{
                        width: `${v.score}%`,
                        height: "100%",
                        background: v.color,
                        borderRadius: 3,
                        opacity: 0.75,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: v.color, fontVariantNumeric: "tabular-nums", minWidth: 28 }}>
                    {v.score}
                  </span>
                </div>
              </div>
            ))}

            {/* External balance summary */}
            <div
              style={{
                background: "rgba(16,200,122,0.05)",
                borderRadius: 5,
                border: "1px solid rgba(16,200,122,0.15)",
                padding: "8px 10px",
                marginTop: 2,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <ShieldCheck size={14} color={C.green} />
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: C.green }}>Résilience externe : Modérée</div>
                <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>
                  Réserves BCEAO 4.2 mois d'imports · Couverture partielle
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  change,
  up,
}: {
  label: string;
  value: string;
  unit: string;
  change: string;
  up: boolean;
}) {
  return (
    <div
      style={{
        background: C.elevated,
        borderRadius: 5,
        border: `1px solid ${C.border}`,
        padding: "7px 9px",
      }}
    >
      <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
      <div style={{ fontSize: 7.5, color: C.muted }}>{unit}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          marginTop: 3,
          fontSize: 9,
          fontWeight: 600,
          color: up ? C.green : C.red,
        }}
      >
        {up ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
        {change}
      </div>
    </div>
  );
}