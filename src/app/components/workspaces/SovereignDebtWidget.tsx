import { TrendingUp, TrendingDown, Calendar, Landmark } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";
import { Sparkline } from "./Sparkline";
import { useThemeColors } from "../../hooks/useThemeColors";

const YIELDS = [
  { country: "CIV", flag: "🇨🇮", y3: "5.82", y5: "6.12", y7: "6.89", y10: "7.24", spread: "+142bp", rating: "B+", spreadDir: "up" },
  { country: "SEN", flag: "🇸🇳", y3: "5.94", y5: "6.28", y7: "7.05", y10: "7.41", spread: "+158bp", rating: "B+", spreadDir: "up" },
  { country: "MLI", flag: "🇲🇱", y3: "6.45", y5: "6.90", y7: "7.52", y10: "7.95", spread: "+212bp", rating: "B", spreadDir: "up" },
  { country: "BKF", flag: "🇧🇫", y3: "6.82", y5: "7.24", y7: "7.89", y10: "8.32", spread: "+249bp", rating: "B−", spreadDir: "down" },
  { country: "TGO", flag: "🇹🇬", y3: "5.65", y5: "5.98", y7: "6.72", y10: "7.08", spread: "+125bp", rating: "B", spreadDir: "flat" },
  { country: "BEN", flag: "🇧🇯", y3: "5.71", y5: "6.04", y7: "6.78", y10: "7.15", spread: "+132bp", rating: "B", spreadDir: "down" },
];

const ISSUANCES = [
  { date: "10 Avr", country: "CIV 🇨🇮", type: "OAT 7Y", amount: "150 Mds", status: "En cours", color: "#d6b68d" },
  { date: "17 Avr", country: "SEN 🇸🇳", type: "BAT 26S", amount: "75 Mds", status: "Planifié", color: "#f4b942" },
  { date: "24 Avr", country: "MLI 🇲🇱", type: "OAT 5Y", amount: "100 Mds", status: "Planifié", color: "#6b96b8" },
];

const TREND_DATA = [6.4, 6.5, 6.7, 6.85, 6.89];

export function SovereignDebtWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell title="Sovereign Debt Monitor" subtitle="Courbe des taux UEMOA · Spreads · Adjudications" lastUpdate="Séance" accentColor={C.orange}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Benchmark rate */}
        <div style={{ padding: "6px 10px", background: "rgba(244,185,66,0.07)", border: "1px solid rgba(244,185,66,0.2)", borderRadius: 5, display: "flex", alignItems: "center", gap: 8 }}>
          <Landmark size={11} color={C.gold} />
          <span style={{ fontSize: 11, color: C.gold, fontWeight: 700 }}>Benchmark BCEAO</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.text, marginLeft: "auto" }}>3.50%</span>
          <span style={{ fontSize: 11, color: C.muted }}>→ Inchangé</span>
          <Sparkline data={TREND_DATA} color={C.gold} width={52} height={20} id="bceao-bench" />
        </div>

        {/* Yield table */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "60px 40px 40px 40px 40px 52px 36px", gap: 0, padding: "3px 4px", marginBottom: 3, borderBottom: `1px solid ${C.border}` }}>
            {["Pays", "3Y", "5Y", "7Y", "10Y", "Spread", "Note"].map((h, i) => (
              <div key={`hdr-${i}`} style={{ fontSize: 9.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", textAlign: i > 0 ? "right" : "left" }}>{h}</div>
            ))}
          </div>
          {YIELDS.map((y) => (
            <div key={y.country} style={{ display: "grid", gridTemplateColumns: "60px 40px 40px 40px 40px 52px 36px", gap: 0, padding: "5px 4px", borderBottom: `1px solid var(--bt-border-a12)`, alignItems: "center", cursor: "pointer" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--bt-accent-a06)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 12 }}>{y.flag}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{y.country}</span>
              </div>
              {[y.y3, y.y5, y.y7, y.y10].map((v, i) => (
                <div key={`${y.country}-${i}`} style={{ fontSize: 12, color: C.dim, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{v}%</div>
              ))}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                {y.spreadDir === "up" ? <TrendingUp size={8} color={C.red} /> : y.spreadDir === "down" ? <TrendingDown size={8} color={C.green} /> : null}
                <span style={{ fontSize: 11, color: y.spreadDir === "up" ? C.red : y.spreadDir === "down" ? C.green : C.muted, fontWeight: 600, textAlign: "right" }}>{y.spread}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, background: "var(--bt-accent-a10)", border: "1px solid var(--bt-accent-a20)", borderRadius: 3, padding: "1px 4px" }}>{y.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming issuances */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
            <Calendar size={9} color={C.accent} />
            <span style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Adjudications à venir</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {ISSUANCES.map((iss) => (
              <div key={`${iss.date}-${iss.country}`} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 8px", background: "var(--bt-overlay-40)", borderRadius: 4, border: `1px solid var(--bt-border-a20)` }}>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: iss.color, minWidth: 40 }}>{iss.date}</span>
                <span style={{ fontSize: 11, color: C.text, flex: 1 }}>{iss.country}</span>
                <span style={{ fontSize: 10.5, color: C.dim }}>{iss.type}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>{iss.amount}</span>
                <span style={{ fontSize: 9.5, padding: "1px 5px", borderRadius: 3, background: iss.color + "14", border: `1px solid ${iss.color}30`, color: iss.color, fontWeight: 700 }}>{iss.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
