import { useState } from "react";
import { ChevronDown, ArrowRightLeft } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";

const C = {
  accent: "#d6b68d", gold: "#f4b942", green: "#10c87a",
  red: "#f43860", text: "#ddeaf8", dim: "#6b96b8",
  muted: "#54678d", border: "rgba(44, 61, 127,0.32)", purple: "#a78bfa",
};

type CompareMode = "countries" | "sectors" | "companies";

const MODES: { id: CompareMode; label: string }[] = [
  { id: "countries", label: "Pays" },
  { id: "sectors", label: "Secteurs" },
  { id: "companies", label: "Sociétés" },
];

const COMPARE_DATA: Record<CompareMode, { cols: [string, string]; metrics: Array<{ label: string; a: string; b: string; winner: "a" | "b" | "tie" }> }> = {
  countries: {
    cols: ["Côte d'Ivoire 🇨🇮", "Sénégal 🇸🇳"],
    metrics: [
      { label: "Croissance PIB 2026", a: "+6.8%", b: "+7.1%", winner: "b" },
      { label: "Inflation IPC", a: "2.4%", b: "2.6%", winner: "a" },
      { label: "Déficit / PIB", a: "−3.2%", b: "−3.8%", winner: "a" },
      { label: "Dette Publique / PIB", a: "52.4%", b: "67.8%", winner: "a" },
      { label: "Réserves (mois imp.)", a: "5.1M", b: "5.3M", winner: "b" },
      { label: "Rendement OAT 7Y", a: "6.89%", b: "7.05%", winner: "a" },
      { label: "Notation S&P", a: "B+", b: "B+", winner: "tie" },
      { label: "IDE entrants 2025 (Mds)", a: "1.84", b: "0.97", winner: "a" },
    ],
  },
  sectors: {
    cols: ["Banques 🏦", "Télécoms 📡"],
    metrics: [
      { label: "ROE Moyen", a: "14.2%", b: "22.8%", winner: "b" },
      { label: "Croissance CA 2025", a: "+8.1%", b: "+11.4%", winner: "b" },
      { label: "Marge Nette", a: "18.5%", b: "26.3%", winner: "b" },
      { label: "P/E moyen (BRVM)", a: "8.2×", b: "14.7×", winner: "a" },
      { label: "Dividende Yield", a: "4.8%", b: "3.2%", winner: "a" },
      { label: "Perf. YTD BRVM", a: "+3.4%", b: "+12.1%", winner: "b" },
      { label: "Capitalisation totale", a: "1 840 Mds", b: "420 Mds", winner: "a" },
      { label: "Ratio Cost/Income", a: "62%", b: "44%", winner: "b" },
    ],
  },
  companies: {
    cols: ["SONATEL", "BOLLORE CI"],
    metrics: [
      { label: "Capitalisation (Mds)", a: "2 842", b: "385", winner: "a" },
      { label: "Cours actuel (XOF)", a: "16 800", b: "3 200", winner: "a" },
      { label: "P/E", a: "14.7×", b: "9.2×", winner: "b" },
      { label: "Var. YTD", a: "+22.4%", b: "+8.6%", winner: "a" },
      { label: "Dividende (XOF)", a: "1 800", b: "150", winner: "a" },
      { label: "ROE", a: "24.1%", b: "16.4%", winner: "a" },
      { label: "Marge EBITDA", a: "38.2%", b: "12.8%", winner: "a" },
      { label: "Recommendation BFD", a: "BUY", b: "HOLD", winner: "a" },
    ],
  },
};

export function QuickCompareWidget() {
  const [mode, setMode] = useState<CompareMode>("countries");
  const { cols, metrics } = COMPARE_DATA[mode];

  const aWins = metrics.filter((m) => m.winner === "a").length;
  const bWins = metrics.filter((m) => m.winner === "b").length;

  return (
    <WidgetShell title="Comparaison Rapide" subtitle="Pays · Secteurs · Sociétés" accentColor={C.purple}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Mode selector */}
        <div style={{ display: "flex", gap: 4 }}>
          {MODES.map((m) => (
            <button key={m.id} onClick={() => setMode(m.id)}
              style={{
                padding: "3px 10px", borderRadius: 4, border: `1px solid ${mode === m.id ? C.purple + "50" : "rgba(44, 61, 127,0.22)"}`,
                background: mode === m.id ? "rgba(167,139,250,0.12)" : "transparent",
                color: mode === m.id ? C.purple : C.muted,
                fontSize: 9, fontWeight: mode === m.id ? 700 : 500, cursor: "pointer",
              }}>
              {m.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button style={{ display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 4, border: `1px solid ${C.border}`, background: "rgba(0, 1, 23,0.5)", color: C.dim, fontSize: 8.5, fontWeight: 600, cursor: "pointer" }}>
            <ChevronDown size={9} />Changer
          </button>
        </div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: 0, padding: "0 4px" }}>
          <div />
          {cols.map((col, i) => (
            <div key={`col-${i}`} style={{ textAlign: "center", padding: "5px 4px", background: i === 0 ? "rgba(214, 182, 141,0.08)" : "rgba(244,185,66,0.08)", borderRadius: i === 0 ? "4px 4px 0 0" : "4px 4px 0 0", border: `1px solid ${i === 0 ? "rgba(214, 182, 141,0.2)" : "rgba(244,185,66,0.2)"}`, borderBottom: "none" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: i === 0 ? C.accent : C.gold }}>{col}</div>
            </div>
          ))}
        </div>

        {/* Metrics rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {metrics.map((m, i) => (
            <div key={`metric-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 90px 90px", gap: 0, borderBottom: `1px solid rgba(44, 61, 127,0.12)`, alignItems: "center" }}>
              <div style={{ fontSize: 9, color: C.muted, padding: "4px 4px" }}>{m.label}</div>
              <div style={{ textAlign: "center", padding: "4px 4px", background: m.winner === "a" ? "rgba(16,200,122,0.06)" : "transparent" }}>
                <span style={{ fontSize: 10, fontWeight: m.winner === "a" ? 700 : 400, color: m.winner === "a" ? C.green : C.dim, fontVariantNumeric: "tabular-nums" }}>{m.a}</span>
                {m.winner === "a" && <span style={{ marginLeft: 3, fontSize: 8, color: C.green }}>✓</span>}
              </div>
              <div style={{ textAlign: "center", padding: "4px 4px", background: m.winner === "b" ? "rgba(16,200,122,0.06)" : "transparent" }}>
                <span style={{ fontSize: 10, fontWeight: m.winner === "b" ? 700 : 400, color: m.winner === "b" ? C.green : C.dim, fontVariantNumeric: "tabular-nums" }}>{m.b}</span>
                {m.winner === "b" && <span style={{ marginLeft: 3, fontSize: 8, color: C.green }}>✓</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Score bar */}
        <div style={{ display: "flex", gap: 6, padding: "5px 8px", background: "rgba(0, 1, 23,0.4)", borderRadius: 5, border: `1px solid ${C.border}`, alignItems: "center" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.accent }}>{cols[0].split(" ")[0]}</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: aWins > bWins ? C.green : C.dim }}>{aWins}</span>
          <ArrowRightLeft size={9} color={C.muted} style={{ margin: "0 2px" }} />
          <span style={{ fontSize: 11, fontWeight: 800, color: bWins > aWins ? C.green : C.dim }}>{bWins}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.gold }}>{cols[1].split(" ")[0]}</span>
          <span style={{ marginLeft: "auto", fontSize: 8, color: C.muted }}>{metrics.filter((m) => m.winner === "tie").length} ex-aequo</span>
        </div>
      </div>
    </WidgetShell>
  );
}
