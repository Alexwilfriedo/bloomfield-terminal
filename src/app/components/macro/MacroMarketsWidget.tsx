import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { Landmark, Minus, Activity } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const RATE_HISTORY = [
  { date: "Jan 22", rate: 2.25, reserve: 3.0 },
  { date: "Jui 22", rate: 2.25, reserve: 3.5 },
  { date: "Jan 23", rate: 2.75, reserve: 3.5 },
  { date: "Jui 23", rate: 3.25, reserve: 4.0 },
  { date: "Jan 24", rate: 3.50, reserve: 4.0 },
  { date: "Mar 24", rate: 3.50, reserve: 4.0 },
];

const MONETARY_STATS = [
  { label: "Taux directeur BCEAO", value: "3.50%", change: "Stable", delta: 0, detail: "Depuis Jan 2024" },
  { label: "Taux facilité de prêt", value: "5.50%", change: "+25bp", delta: 1, detail: "Couloir haut" },
  { label: "Taux facilité de dépôt", value: "1.00%", change: "Stable", delta: 0, detail: "Couloir bas" },
  { label: "Réserves obligatoires", value: "4.00%", change: "Stable", delta: 0, detail: "Depuis 2010" },
];

const LIQUIDITY_DATA = [
  { date: "Oct", credit: 6.2, m2: 8.1 },
  { date: "Nov", credit: 6.5, m2: 8.4 },
  { date: "Déc", credit: 6.8, m2: 8.8 },
  { date: "Jan", credit: 7.1, m2: 9.0 },
  { date: "Fév", credit: 7.0, m2: 9.3 },
  { date: "Mar", credit: 7.3, m2: 9.6 },
];

type SignalLevel = "positif" | "neutre" | "attention" | "risque";

const MACRO_SIGNALS: {
  category: string;
  label: string;
  level: SignalLevel;
  detail: string;
}[] = [
  { category: "Monétaire", label: "Inflation sous-jacente", level: "attention", detail: "4.2% · en baisse" },
  { category: "Monétaire", label: "Croissance M3", level: "positif", detail: "+9.6% AoA" },
  { category: "Fiscal", label: "Consolidation budgétaire", level: "attention", detail: "Déficit 4.2% vs cible 3%" },
  { category: "Fiscal", label: "Mobilisation recettes", level: "positif", detail: "Ratio 16.8% PIB" },
  { category: "Externe", label: "Pression devises", level: "neutre", detail: "XOF/USD stable" },
  { category: "Externe", label: "Réserves BCEAO", level: "positif", detail: "4.2 mois imports" },
  { category: "Financier", label: "Crédit secteur privé", level: "positif", detail: "+7.3% AoA" },
  { category: "Financier", label: "NPL secteur bancaire", level: "attention", detail: "8.4% (hausse)" },
];

const SIGNAL_COLORS: Record<SignalLevel, string> = {
  positif: "#10c87a",
  neutre: "#6b96b8",
  attention: "#f4b942",
  risque: "#f43860",
};

const SIGNAL_LABELS: Record<SignalLevel, string> = {
  positif: "✓",
  neutre: "—",
  attention: "△",
  risque: "✗",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#000117",
        border: `1px solid var(--bt-border-a32)`,
        borderRadius: 5,
        padding: "6px 10px",
        fontSize: 12,
        color: "#ddeaf8",
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

export function MacroMarketsWidget() {
  const C = useThemeColors();
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
          background: "var(--bt-overlay-40)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.accent }} />
          <Landmark size={11} color={C.accent} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Politique Monétaire BCEAO & Signaux Macro-Financiers
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              borderRadius: 4,
              background: "var(--bt-accent-a10)",
              border: "1px solid var(--bt-accent-a25)",
            }}
          >
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, boxShadow: `0 0 4px ${C.green}` }} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: C.accent }}>CPM Mars 2024</span>
          </div>
          <span style={{ fontSize: 10, color: C.muted }}>UEMOA</span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "220px 1fr 1fr",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Column 1: BCEAO key rates */}
        <div
          style={{
            borderRight: `1px solid ${C.border}`,
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
            overflow: "auto",
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
            Taux BCEAO
          </div>

          {/* Big rate display */}
          <div
            style={{
              background: "var(--bt-accent-a06)",
              border: "1px solid var(--bt-accent-a20)",
              borderRadius: 6,
              padding: "10px 12px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 10, color: C.dim, marginBottom: 4, letterSpacing: "0.05em" }}>TAUX DIRECTEUR</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: C.accent, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
              3.50
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>%</div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                marginTop: 6,
                padding: "2px 8px",
                borderRadius: 4,
                background: "rgba(107,150,184,0.1)",
                border: "1px solid rgba(107,150,184,0.2)",
              }}
            >
              <Minus size={9} color={C.dim} />
              <span style={{ fontSize: 11, fontWeight: 600, color: C.dim }}>Inchangé · CPM Mar 24</span>
            </div>
          </div>

          {/* Rate list */}
          {MONETARY_STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 8px",
                background: C.elevated,
                borderRadius: 4,
                border: `1px solid ${C.border}`,
              }}
            >
              <div>
                <div style={{ fontSize: 10, color: C.muted }}>{stat.label}</div>
                <div style={{ fontSize: 9.5, color: C.muted, marginTop: 1 }}>{stat.detail}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: stat.delta === 0 ? C.muted : stat.delta > 0 ? C.red : C.green,
                  }}
                >
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Rate history + M2/Credit */}
        <div
          style={{
            borderRight: `1px solid ${C.border}`,
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            overflow: "auto",
          }}
        >
          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Historique Taux Directeur
          </div>
          <div style={{ height: 90 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RATE_HISTORY} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--bt-border-a20)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 9.5 }} axisLine={false} tickLine={false} />
                <YAxis domain={[1.5, 4.5]} tick={{ fill: C.muted, fontSize: 9.5 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={3.5} stroke={C.accent} strokeDasharray="4 2" strokeOpacity={0.6} />
                <Line
                  type="stepAfter"
                  dataKey="rate"
                  name="Taux dir."
                  stroke={C.accent}
                  strokeWidth={2}
                  dot={{ r: 3, fill: C.accent, stroke: "#000117", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Agrégats Monétaires (% croissance AoA)
          </div>
          <div style={{ height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={LIQUIDITY_DATA} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
                <defs>
                  <linearGradient id="m2grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.purple} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={C.purple} stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="credGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.green} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={C.green} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke="var(--bt-border-a20)" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: C.muted, fontSize: 9.5 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: C.muted, fontSize: 9.5 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area key="area-m2" dataKey="m2" name="M3" stroke={C.purple} fill="url(#m2grad)" strokeWidth={1.8} dot={false} />
                <Area key="area-credit" dataKey="credit" name="Crédit privé" stroke={C.green} fill="url(#credGrad)" strokeWidth={1.8} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 2, background: C.purple, borderRadius: 1 }} />
              <span style={{ fontSize: 10, color: C.muted }}>M3 UEMOA</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 2, background: C.green, borderRadius: 1 }} />
              <span style={{ fontSize: 10, color: C.muted }}>Crédit sect. privé</span>
            </div>
          </div>
        </div>

        {/* Column 3: Macro-financial signals */}
        <div style={{ padding: "10px 12px", overflow: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
            <Activity size={10} color={C.gold} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Signaux Macro-Financiers
            </span>
          </div>

          {/* Signal legend */}
          <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            {Object.entries(SIGNAL_COLORS).map(([k, col]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: col }} />
                <span style={{ fontSize: 9.5, color: C.muted, textTransform: "capitalize" }}>{k}</span>
              </div>
            ))}
          </div>

          {/* Signals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {MACRO_SIGNALS.map((sig, i) => {
              const color = SIGNAL_COLORS[sig.level];
              const symbol = SIGNAL_LABELS[sig.level];
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "5px 8px",
                    background: color + "08",
                    borderRadius: 4,
                    border: `1px solid ${color}20`,
                    cursor: "pointer",
                    transition: "all 0.1s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = color + "15")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = color + "08")}
                >
                  {/* Signal dot */}
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: color + "25",
                      border: `1.5px solid ${color}60`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color }}>{symbol}</span>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 600,
                          color: C.muted,
                          background: "var(--bt-border-a20)",
                          borderRadius: 3,
                          padding: "1px 4px",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {sig.category.toUpperCase()}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{sig.label}</span>
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{sig.detail}</div>
                  </div>

                  {/* Level badge */}
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color,
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                    }}
                  >
                    {sig.level}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Summary score */}
          <div
            style={{
              marginTop: 8,
              padding: "7px 10px",
              background: "rgba(244,185,66,0.06)",
              border: "1px solid rgba(244,185,66,0.2)",
              borderRadius: 5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: C.gold }}>Score Macro-Financier UEMOA</div>
              <div style={{ fontSize: 9.5, color: C.muted, marginTop: 1 }}>5 positifs · 3 attention · 0 risque</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.gold, fontVariantNumeric: "tabular-nums" }}>62</div>
              <div style={{ fontSize: 9.5, color: C.muted }}>/100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}