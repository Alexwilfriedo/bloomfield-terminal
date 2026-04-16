import { TrendingUp, TrendingDown, Activity, GripHorizontal } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";
import { Sparkline } from "./Sparkline";
import { useThemeColors } from "../../hooks/useThemeColors";

const INDICES = [
  { id: "brvm-c", name: "BRVM Composite", value: "284.12", change: "+2.06", pct: "+0.73%", up: true, color: "#d6b68d", data: [281.1, 281.8, 282.5, 282.0, 283.2, 283.8, 284.0, 284.12] },
  { id: "brvm-10", name: "BRVM 10", value: "437.80", change: "+1.96", pct: "+0.45%", up: true, color: "#10c87a", data: [435.0, 435.5, 436.1, 435.8, 436.5, 437.0, 437.4, 437.80] },
  { id: "brvm-p", name: "BRVM Prestige", value: "158.34", change: "−0.35", pct: "−0.22%", up: false, color: "#f43860", data: [159.1, 158.9, 158.7, 158.9, 158.6, 158.5, 158.4, 158.34] },
];

const TOP_MOVERS = [
  { ticker: "PALM CI", price: "7 295", pct: "+7.35%", up: true, vol: "148K" },
  { ticker: "SONATEL", price: "16 800", pct: "+5.21%", up: true, vol: "62K" },
  { ticker: "BOLLORE CI", price: "3 200", pct: "+4.92%", up: true, vol: "205K" },
  { ticker: "SAPH", price: "4 195", pct: "−3.42%", up: false, vol: "77K" },
  { ticker: "SOLIBRA", price: "89 000", pct: "−2.78%", up: false, vol: "9K" },
];

const MARKET_STATS = [
  { label: "Capitalisation", value: "7 843", unit: "Mds XOF" },
  { label: "Volume", value: "1,28M", unit: "titres" },
  { label: "Valeur éch.", value: "4,82", unit: "Mds XOF" },
  { label: "Hausses / Baisses", value: "24 / 11", unit: "" },
];

const SIGNALS = [
  { label: "Volume inhabituel", target: "PALM CI", color: "#f4b942", dot: "🔶" },
  { label: "Nouveau sommet 52S", target: "SONATEL", color: "#10c87a", dot: "🟢" },
  { label: "Signal vendeur", target: "SOLIBRA", color: "#f43860", dot: "🔴" },
];

export function MarketMonitorWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell
      title="Market Monitor"
      subtitle="BRVM · Indices, Mouvements, Signaux"
      lastUpdate="15:47 GMT"
      accentColor={C.accent}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Drag handle hint */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: -4 }}>
          <GripHorizontal size={10} color={C.muted} style={{ opacity: 0.4 }} />
        </div>

        {/* Indices */}
        {INDICES.map((idx) => (
          <div key={idx.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "var(--bt-overlay-45)", borderRadius: 6, border: `1px solid ${C.border}` }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: C.dim, fontWeight: 500 }}>{idx.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 1 }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{idx.value}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: idx.up ? C.green : C.red }}>{idx.pct}</span>
                <span style={{ fontSize: 11, color: idx.up ? C.green : C.red, opacity: 0.7 }}>({idx.change})</span>
              </div>
            </div>
            <Sparkline data={idx.data} color={idx.color} width={72} height={28} id={idx.id} />
          </div>
        ))}

        {/* Market stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
          {MARKET_STATS.map((s) => (
            <div key={s.label} style={{ background: "var(--bt-overlay-45)", border: `1px solid ${C.border}`, borderRadius: 5, padding: "5px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums", lineHeight: 1.2 }}>{s.value}</div>
              {s.unit && <div style={{ fontSize: 9.5, color: C.muted, marginTop: 1 }}>{s.unit}</div>}
              <div style={{ fontSize: 9.5, color: C.muted, opacity: 0.7 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Top movers */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Principaux Mouvements</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {TOP_MOVERS.map((m) => (
              <div key={m.ticker} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 6px", borderRadius: 4, background: "var(--bt-overlay-30)", cursor: "pointer" }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: m.up ? "rgba(16,200,122,0.12)" : "rgba(244,56,96,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {m.up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text, flex: 1 }}>{m.ticker}</span>
                <span style={{ fontSize: 11, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{m.price}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: m.up ? C.green : C.red, minWidth: 46, textAlign: "right" }}>{m.pct}</span>
                <span style={{ fontSize: 10, color: C.muted, minWidth: 32, textAlign: "right" }}>{m.vol}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intraday signals */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
            <Activity size={9} color={C.accent} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Signaux Intrajournaliers</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {SIGNALS.map((sig) => (
              <div key={sig.target} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 8px", borderRadius: 4, background: "var(--bt-overlay-30)", border: `1px solid var(--bt-border-a16)` }}>
                <span style={{ fontSize: 11 }}>{sig.dot}</span>
                <span style={{ fontSize: 11, color: sig.color, fontWeight: 600 }}>{sig.label}</span>
                <span style={{ fontSize: 11, color: C.dim, marginLeft: "auto" }}>{sig.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
