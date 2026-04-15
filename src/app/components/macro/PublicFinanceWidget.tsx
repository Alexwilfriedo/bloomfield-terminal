import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

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

const DEBT_DATA = [
  { year: "2019", debt: 44.2, deficit: -3.0 },
  { year: "2020", debt: 48.2, deficit: -5.6 },
  { year: "2021", debt: 52.1, deficit: -4.9 },
  { year: "2022", debt: 55.7, deficit: -4.5 },
  { year: "2023", debt: 57.8, deficit: -4.2 },
  { year: "2024p", debt: 59.1, deficit: -4.0 },
];

const UPCOMING_ISSUANCES = [
  {
    date: "14 Avr",
    type: "OAT",
    label: "Bon UMOA-Titres",
    country: "🇨🇮 CIV",
    amount: "40 Mds",
    maturity: "91j",
    status: "upcoming",
    days: 6,
  },
  {
    date: "22 Avr",
    type: "OAT",
    label: "Obligation du Trésor",
    country: "🇸🇳 SEN",
    amount: "75 Mds",
    maturity: "5 ans",
    status: "upcoming",
    days: 14,
  },
  {
    date: "30 Avr",
    type: "SUKUK",
    label: "Sukuk Souverain",
    country: "🇨🇮 CIV",
    amount: "150 Mds",
    maturity: "7 ans",
    status: "planned",
    days: 22,
  },
];

const DEBT_METRICS = [
  { label: "Déficit fiscal / PIB", value: "-4.2%", change: "+0.3pp", good: true, threshold: "Cible UEMOA : -3%" },
  { label: "Service de la dette / Recettes", value: "24.3%", change: "+1.8pp", good: false, threshold: "Seuil risque : 22%" },
  { label: "Réserves (mois d'imports)", value: "4.2m", change: "+0.2m", good: true, threshold: "Min BCEAO : 3m" },
  { label: "Solde primaire / PIB", value: "-1.8%", change: "+0.4pp", good: true, threshold: "En amélioration" },
];

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
        <div key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value}%
        </div>
      ))}
    </div>
  );
};

export function PublicFinanceWidget() {
  const debtPct = (57.8 / 100) * 100;

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
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.gold }} />
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: C.dim,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Finances Publiques & Dette Souveraine
          </span>
        </div>
        <span style={{ fontSize: 8, color: C.muted }}>CIV · 2023</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: "auto", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Debt gauge + key metrics */}
        <div style={{ display: "flex", gap: 10 }}>
          {/* Debt-to-GDP gauge */}
          <div
            style={{
              flex: 1,
              background: C.elevated,
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              padding: "10px 12px",
            }}
          >
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              Dette / PIB
            </div>
            {/* Progress bar with zones */}
            <div style={{ position: "relative", marginBottom: 8 }}>
              <div
                style={{
                  height: 8,
                  background: "rgba(44, 61, 127,0.2)",
                  borderRadius: 4,
                  overflow: "visible",
                  position: "relative",
                }}
              >
                {/* Zones */}
                <div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", background: "rgba(16,200,122,0.15)", borderRadius: "4px 0 0 4px" }} />
                <div style={{ position: "absolute", left: "50%", top: 0, width: "20%", height: "100%", background: "rgba(244,185,66,0.15)" }} />
                <div style={{ position: "absolute", left: "70%", top: 0, width: "30%", height: "100%", background: "rgba(244,56,96,0.15)", borderRadius: "0 4px 4px 0" }} />
                {/* Actual value */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: `${debtPct}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${C.gold} 0%, ${C.red} 100%)`,
                    borderRadius: 4,
                    opacity: 0.8,
                  }}
                />
                {/* Threshold marker at 70% */}
                <div
                  style={{
                    position: "absolute",
                    left: "70%",
                    top: -4,
                    bottom: -4,
                    width: 1.5,
                    background: C.red,
                    opacity: 0.7,
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 7.5, color: C.muted }}>0%</span>
                <span style={{ fontSize: 7.5, color: C.gold }}>Seuil UEMOA 70%</span>
                <span style={{ fontSize: 7.5, color: C.muted }}>100%</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: C.gold, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>57.8</span>
              <span style={{ fontSize: 10, color: C.muted }}>%</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "rgba(244,56,96,0.12)",
                  border: "1px solid rgba(244,56,96,0.25)",
                  marginLeft: 4,
                }}
              >
                <TrendingUp size={8} color={C.red} />
                <span style={{ fontSize: 9, fontWeight: 700, color: C.red }}>+2.1pp</span>
              </div>
            </div>
            <div style={{ fontSize: 8, color: C.muted, marginTop: 3 }}>vs 55.7% en 2022</div>
          </div>

          {/* Deficit */}
          <div
            style={{
              flex: 1,
              background: C.elevated,
              borderRadius: 6,
              border: `1px solid ${C.border}`,
              padding: "10px 12px",
            }}
          >
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
              Déficit Fiscal / PIB
            </div>
            {/* Visual gauge arcs-style */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 800, color: C.red, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>−4.2</span>
              <span style={{ fontSize: 10, color: C.muted }}>%</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "2px 6px",
                  borderRadius: 4,
                  background: "rgba(16,200,122,0.12)",
                  border: "1px solid rgba(16,200,122,0.25)",
                  marginLeft: 4,
                }}
              >
                <TrendingDown size={8} color={C.green} />
                <span style={{ fontSize: 9, fontWeight: 700, color: C.green }}>+0.3pp</span>
              </div>
            </div>
            <div style={{ fontSize: 8, color: C.muted }}>Cible UEMOA : −3.0% · Écart : 1.2pp</div>
            {/* Mini bar */}
            <div style={{ marginTop: 8 }}>
              <div style={{ height: 4, background: "rgba(44, 61, 127,0.2)", borderRadius: 2, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "70%",
                    height: "100%",
                    background: "rgba(244,56,96,0.6)",
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: -2,
                    bottom: -2,
                    width: 1.5,
                    background: C.green,
                    opacity: 0.8,
                  }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span style={{ fontSize: 7, color: C.muted }}>0%</span>
                <span style={{ fontSize: 7, color: C.green }}>Cible 3%</span>
                <span style={{ fontSize: 7, color: C.muted }}>6%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Debt trajectory chart */}
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
            Trajectoire de la Dette (% PIB)
          </div>
          <div style={{ height: 70 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DEBT_DATA} margin={{ top: 2, right: 4, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(44, 61, 127,0.2)" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis domain={[40, 65]} tick={{ fill: C.muted, fontSize: 8 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={70} stroke={C.red} strokeDasharray="4 3" strokeOpacity={0.5} />
                <Bar dataKey="debt" name="Dette/PIB" fill={C.gold} radius={[2, 2, 0, 0]} opacity={0.7} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Debt metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {DEBT_METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: C.elevated,
                borderRadius: 5,
                border: `1px solid ${C.border}`,
                padding: "6px 9px",
              }}
            >
              <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>{m.label}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                  {m.value}
                </span>
                <span
                  style={{
                    fontSize: 8.5,
                    fontWeight: 600,
                    color: m.good ? C.green : C.red,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {m.change}
                </span>
              </div>
              <div style={{ fontSize: 7.5, color: C.muted, marginTop: 2 }}>{m.threshold}</div>
            </div>
          ))}
        </div>

        {/* Upcoming issuances calendar */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 6,
            }}
          >
            <Calendar size={10} color={C.accent} />
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 700,
                color: C.muted,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Calendrier des Émissions
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {UPCOMING_ISSUANCES.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 9px",
                  background: C.elevated,
                  borderRadius: 5,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    minWidth: 32,
                    textAlign: "center",
                    padding: "2px 4px",
                    borderRadius: 4,
                    background: "rgba(214, 182, 141,0.1)",
                    border: `1px solid rgba(214, 182, 141,0.2)`,
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 700, color: C.accent, display: "block" }}>
                    {ev.date.split(" ")[0]}
                  </span>
                  <span style={{ fontSize: 7, color: C.muted, display: "block" }}>
                    {ev.date.split(" ")[1]}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      style={{
                        fontSize: 7.5,
                        fontWeight: 700,
                        color: C.gold,
                        background: "rgba(244,185,66,0.12)",
                        border: "1px solid rgba(244,185,66,0.2)",
                        borderRadius: 3,
                        padding: "1px 4px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {ev.type}
                    </span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: C.text }}>{ev.label}</span>
                    <span style={{ fontSize: 10 }}>{ev.country.split(" ")[0]}</span>
                  </div>
                  <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>
                    {ev.country.split(" ")[1]} · Montant : {ev.amount} FCFA · Durée : {ev.maturity}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 8,
                    fontWeight: 600,
                    color: C.dim,
                    background: "rgba(44, 61, 127,0.2)",
                    borderRadius: 3,
                    padding: "2px 6px",
                    whiteSpace: "nowrap",
                  }}
                >
                  J−{ev.days}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}