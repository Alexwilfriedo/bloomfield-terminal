import { useState } from "react";
import { WidgetShell } from "./WidgetShell";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  AlertTriangle,
  CheckCircle,
  Activity,
} from "lucide-react";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

// Market sentiment score 0-100
const SENTIMENT_SCORE = 68;

const signals: {
  ticker: string;
  name: string;
  signal: "BUY" | "SELL" | "NEUTRAL";
  rsi: number;
  momentum: number;
  ma20: "ABOVE" | "BELOW";
  strength: number;
}[] = [
  { ticker: "PALM CI", name: "Palmci", signal: "BUY", rsi: 72, momentum: 4.8, ma20: "ABOVE", strength: 85 },
  { ticker: "SONATEL", name: "Sonatel SA", signal: "BUY", rsi: 65, momentum: 3.2, ma20: "ABOVE", strength: 78 },
  { ticker: "BOLLORE CI", name: "Bolloré CI", signal: "BUY", rsi: 61, momentum: 2.9, ma20: "ABOVE", strength: 71 },
  { ticker: "BOA CI", name: "Bank of Africa", signal: "NEUTRAL", rsi: 52, momentum: 0.8, ma20: "ABOVE", strength: 52 },
  { ticker: "CIE", name: "CIE / CI", signal: "SELL", rsi: 38, momentum: -1.9, ma20: "BELOW", strength: 28 },
  { ticker: "SAPH", name: "SAPH CI", signal: "SELL", rsi: 29, momentum: -3.4, ma20: "BELOW", strength: 18 },
];

const sentimentIndicators = [
  { label: "Advance/Decline", value: "32 / 18", sub: "+14 nette", color: "#10c87a", icon: TrendingUp },
  { label: "New Highs", value: "12", sub: "52 semaines", color: "#d6b68d", icon: Activity },
  { label: "Volume BUY/SELL", value: "62% / 38%", sub: "Flux acheteur", color: "#f4b942", icon: Zap },
  { label: "Volatilité BRVM", value: "Faible", sub: "VIX proxy: 14.2", color: "#a78bfa", icon: AlertTriangle },
];

function SentimentGauge({ score }: { score: number }) {
  const C = useThemeColors();
  // Gauge going from 0 (extreme fear) to 100 (extreme greed)
  const color =
    score >= 70 ? C.green : score >= 50 ? C.gold : score >= 30 ? C.orange : C.red;
  const label =
    score >= 70 ? "Optimisme" : score >= 50 ? "Neutre haussier" : score >= 30 ? "Prudence" : "Pessimisme";

  // Arc chart data
  const data = [
    { name: "score", value: score, fill: color },
    { name: "rest", value: 100 - score, fill: "var(--bt-border-a16)" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div style={{ width: 120, height: 72, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="85%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            data={data}
          >
            <RadialBar dataKey="value" cornerRadius={4} background={false} />
            <Tooltip contentStyle={{ display: "none" }} />
          </RadialBarChart>
        </ResponsiveContainer>
        {/* Score label in center */}
        <div
          style={{
            position: "absolute",
            bottom: 2,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {score}
          </div>
        </div>
      </div>
      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 2 }}>
        <span style={{ fontSize: 10, color: C.red, fontWeight: 600 }}>PEUR</span>
        <span style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: "0.02em" }}>
          {label}
        </span>
        <span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>AVIDITÉ</span>
      </div>
      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: "var(--bt-border-a20)",
          borderRadius: 4,
          marginTop: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: `linear-gradient(90deg, ${C.red}, ${C.gold}, ${C.green})`,
            borderRadius: 4,
            transition: "width 0.5s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -1,
            left: `${score}%`,
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
            border: `1px solid ${C.surface}`,
          }}
        />
      </div>
    </div>
  );
}

function SignalBadge({ signal }: { signal: "BUY" | "SELL" | "NEUTRAL" }) {
  const C = useThemeColors();
  const cfg = {
    BUY: { color: C.green, bg: "rgba(16,200,122,0.12)", border: "rgba(16,200,122,0.3)", icon: TrendingUp },
    SELL: { color: C.red, bg: "rgba(244,56,96,0.12)", border: "rgba(244,56,96,0.3)", icon: TrendingDown },
    NEUTRAL: { color: C.dim, bg: "rgba(107,150,184,0.1)", border: "rgba(107,150,184,0.2)", icon: Minus },
  }[signal];
  const Icon = cfg.icon;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 3,
        padding: "2px 6px",
        borderRadius: 4,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        width: "fit-content",
      }}
    >
      <Icon size={8} />
      {signal}
    </div>
  );
}

function RSIBar({ value }: { value: number }) {
  const C = useThemeColors();
  const color = value >= 70 ? C.red : value <= 30 ? C.green : C.gold;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div
        style={{
          width: 52,
          height: 5,
          background: "var(--bt-border-a20)",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: color,
            borderRadius: 3,
          }}
        />
        {/* Overbought line at 70 */}
        <div style={{ position: "absolute", left: "70%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.2)" }} />
        {/* Oversold line at 30 */}
        <div style={{ position: "absolute", left: "30%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.2)" }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontVariantNumeric: "tabular-nums", minWidth: 18 }}>
        {value}
      </span>
    </div>
  );
}

export function SentimentWidget() {
  const C = useThemeColors();
  const [view, setView] = useState<"signals" | "indicators">("signals");

  const buyCount = signals.filter((s) => s.signal === "BUY").length;
  const sellCount = signals.filter((s) => s.signal === "SELL").length;
  const neutralCount = signals.filter((s) => s.signal === "NEUTRAL").length;

  return (
    <WidgetShell
      title="Sentiment & Signaux"
      subtitle="Analyse technique — BRVM en temps réel"
      lastUpdate="Mis à jour: 15:47 GMT"
      accentColor={C.green}
      noPadding
    >
      <div style={{ display: "flex", height: "100%" }}>
        {/* Left: Sentiment Gauge */}
        <div
          style={{
            width: 190,
            borderRight: `1px solid ${C.border}`,
            padding: "10px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Baromètre BRVM
          </div>
          <SentimentGauge score={SENTIMENT_SCORE} />

          {/* Signal summary */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              marginTop: 4,
            }}
          >
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 2 }}>
              Résumé des signaux
            </div>
            <SignalRow label="Achats" count={buyCount} total={signals.length} color={C.green} />
            <SignalRow label="Neutres" count={neutralCount} total={signals.length} color={C.dim} />
            <SignalRow label="Ventes" count={sellCount} total={signals.length} color={C.red} />
          </div>

          {/* BRVM Market Status */}
          <div
            style={{
              marginTop: 8,
              padding: "6px 8px",
              background: "rgba(16,200,122,0.06)",
              border: "1px solid rgba(16,200,122,0.18)",
              borderRadius: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <CheckCircle size={10} color={C.green} />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
                MARCHÉ OUVERT
              </span>
            </div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>
              Session: 09:00 – 15:30 GMT
            </div>
          </div>
        </div>

        {/* Right: Tabs view */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              gap: 0,
              borderBottom: `1px solid ${C.border}`,
              padding: "0 12px",
              flexShrink: 0,
            }}
          >
            <TabButton
              label="Signaux Techniques"
              active={view === "signals"}
              onClick={() => setView("signals")}
            />
            <TabButton
              label="Indicateurs de Marché"
              active={view === "indicators"}
              onClick={() => setView("indicators")}
            />
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: "auto", padding: "8px 12px", minHeight: 0 }}>
            {view === "signals" ? (
              <SignalsTable signals={signals} />
            ) : (
              <IndicatorsView />
            )}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

function SignalRow({
  label,
  count,
  total,
  color,
}: {
  label: string;
  count: number;
  total: number;
  color: string;
}) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: color,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 11, color: C.dim, flex: 1 }}>{label}</span>
      <div
        style={{
          flex: 1,
          height: 4,
          background: "var(--bt-border-a20)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(count / total) * 100}%`,
            background: color,
            borderRadius: 2,
            opacity: 0.8,
          }}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color,
          minWidth: 14,
          textAlign: "right",
        }}
      >
        {count}
      </span>
    </div>
  );
}

function SignalsTable({
  signals,
}: {
  signals: {
    ticker: string;
    name: string;
    signal: "BUY" | "SELL" | "NEUTRAL";
    rsi: number;
    momentum: number;
    ma20: "ABOVE" | "BELOW";
    strength: number;
  }[];
}) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 80px 72px 55px 56px",
          padding: "2px 4px 5px",
          borderBottom: `1px solid ${C.border}`,
          marginBottom: 2,
        }}
      >
        {["Titre", "Signal", "RSI (14)", "Mom.", "Force"].map((h) => (
          <div
            key={h}
            style={{
              fontSize: 11,
              color: C.muted,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {signals.map((s, i) => (
        <div
          key={s.ticker}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 72px 55px 56px",
            padding: "5px 4px",
            borderRadius: 5,
            background: i % 2 === 0 ? "var(--bt-overlay-12)" : "transparent",
            cursor: "pointer",
            transition: "background 0.1s",
            alignItems: "center",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bt-accent-a06)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              i % 2 === 0 ? "var(--bt-overlay-12)" : "transparent")
          }
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>
              {s.ticker}
            </div>
            <div style={{ fontSize: 10, color: C.muted }}>{s.name}</div>
          </div>
          <div>
            <SignalBadge signal={s.signal} />
          </div>
          <div>
            <RSIBar value={s.rsi} />
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: s.momentum > 0 ? C.green : C.red,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {s.momentum > 0 ? "+" : ""}
            {s.momentum.toFixed(1)}%
          </div>
          <div>
            <StrengthBar value={s.strength} />
          </div>
        </div>
      ))}

      {/* Legend */}
      <div
        style={{
          marginTop: 8,
          padding: "5px 8px",
          background: "var(--bt-overlay-40)",
          border: `1px solid ${C.border}`,
          borderRadius: 5,
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 10, color: C.muted }}>
          RSI:{" "}
          <span style={{ color: C.red }}>{"≥70"} Surach.</span> ·{" "}
          <span style={{ color: C.green }}>{"≤30"} Surv.</span>
        </span>
        <span style={{ fontSize: 10, color: C.muted }}>
          Mom. = Variation 5 séances
        </span>
        <span style={{ fontSize: 10, color: C.muted }}>
          Force = Score composite 0–100
        </span>
      </div>
    </div>
  );
}

function StrengthBar({ value }: { value: number }) {
  const C = useThemeColors();
  const color = value >= 70 ? C.green : value >= 40 ? C.gold : C.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 32,
          height: 5,
          background: "var(--bt-border-a20)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: color,
            borderRadius: 3,
          }}
        />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
    </div>
  );
}

function IndicatorsView() {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {/* 4 sentiment indicators */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {sentimentIndicators.map((ind) => {
          const Icon = ind.icon;
          return (
            <div
              key={ind.label}
              style={{
                padding: "8px 10px",
                background: "var(--bt-overlay-45)",
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                borderLeft: `2px solid ${ind.color}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                <Icon size={10} color={ind.color} />
                <span style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.03em" }}>
                  {ind.label}
                </span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: ind.color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>
                {ind.value}
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{ind.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Macro risk signals */}
      <div>
        <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 5 }}>
          Signaux de risque macroéconomique
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { label: "Risque politique UEMOA", level: "Modéré", color: C.gold, value: 42 },
            { label: "Pression sur la dette souveraine", level: "Élevé", color: C.orange, value: 65 },
            { label: "Liquidité du marché BRVM", level: "Bon", color: C.green, value: 72 },
            { label: "Risque de change XOF/USD", level: "Faible", color: C.accent, value: 22 },
          ].map((r) => (
            <div
              key={r.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "4px 8px",
                background: "var(--bt-overlay-40)",
                border: `1px solid ${C.border}`,
                borderRadius: 5,
              }}
            >
              <span style={{ fontSize: 12, color: C.dim, flex: 1 }}>{r.label}</span>
              <div
                style={{
                  width: 80,
                  height: 5,
                  background: "var(--bt-border-a20)",
                  borderRadius: 3,
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${r.value}%`,
                    background: r.color,
                    borderRadius: 3,
                    opacity: 0.85,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: r.color,
                  minWidth: 48,
                  textAlign: "right",
                  letterSpacing: "0.02em",
                }}
              >
                {r.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const C = useThemeColors();
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 12px",
        background: "transparent",
        border: "none",
        borderBottom: `2px solid ${active ? C.green : "transparent"}`,
        color: active ? C.text : C.muted,
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        cursor: "pointer",
        letterSpacing: "0.02em",
        transition: "color 0.15s",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}
