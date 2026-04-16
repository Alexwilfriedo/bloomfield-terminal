import { useState } from "react";
import { Globe2, TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";
import { Sparkline } from "./Sparkline";
import { useThemeColors } from "../../hooks/useThemeColors";

const COUNTRIES = ["UEMOA", "CIV", "SEN", "MLI", "BKF", "TGO"];

const MACRO_DATA: Record<string, Array<{ label: string; value: string; change: string; dir: "up" | "down" | "flat"; color: string; trend: number[] }>> = {
  UEMOA: [
    { label: "Taux Directeur BCEAO", value: "3.50%", change: "Stable", dir: "flat", color: "#f4b942", trend: [3.5, 3.5, 3.5, 3.0, 3.0, 3.25, 3.5, 3.5] },
    { label: "Inflation (IHPC)", value: "2.8%", change: "−0.3pp", dir: "down", color: "#10c87a", trend: [4.1, 3.8, 3.5, 3.2, 3.1, 2.9, 2.8, 2.8] },
    { label: "Croissance PIB", value: "+6.5%", change: "+0.4pp", dir: "up", color: "#10c87a", trend: [5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5] },
    { label: "Déficit Budgétaire", value: "−3.8%", change: "+0.2pp", dir: "up", color: "#f43860", trend: [-4.5, -4.2, -4.0, -3.9, -3.8, -3.7, -3.8, -3.8] },
    { label: "Dette / PIB", value: "54.2%", change: "+1.1pp", dir: "down", color: "#f4b942", trend: [50, 51, 52, 52.5, 53, 53.5, 54, 54.2] },
    { label: "Réserves (mois imp.)", value: "4.8M", change: "+0.2", dir: "up", color: "#d6b68d", trend: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.7, 4.8] },
  ],
  CIV: [
    { label: "Taux de croissance", value: "+6.8%", change: "+0.3pp", dir: "up", color: "#10c87a", trend: [6.0, 6.1, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8] },
    { label: "Inflation IPC", value: "2.4%", change: "−0.5pp", dir: "down", color: "#10c87a", trend: [3.5, 3.2, 2.9, 2.8, 2.7, 2.6, 2.5, 2.4] },
    { label: "Déficit / PIB", value: "−3.2%", change: "−0.3pp", dir: "up", color: "#10c87a", trend: [-4.0, -3.8, -3.6, -3.5, -3.4, -3.3, -3.2, -3.2] },
    { label: "Exportations cacao", value: "+18%", change: "+18%", dir: "up", color: "#f4b942", trend: [8, 10, 11, 13, 14, 16, 17, 18] },
    { label: "Recettes fiscales/PIB", value: "15.8%", change: "+0.4pp", dir: "up", color: "#d6b68d", trend: [14.5, 14.8, 15.0, 15.2, 15.4, 15.5, 15.7, 15.8] },
    { label: "IDE entrants (Mds)", value: "1.84", change: "+12%", dir: "up", color: "#a78bfa", trend: [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.84] },
  ],
};

// Use UEMOA data for other country tabs as well (demo)
COUNTRIES.slice(2).forEach((c) => { MACRO_DATA[c] = MACRO_DATA["CIV"]; });
MACRO_DATA["SEN"] = MACRO_DATA["UEMOA"];

const ALERTS = [
  { msg: "Inflation CIV sous 2,5% — point bas de 18 mois", color: "#10c87a" },
  { msg: "Dette MLI dépasse seuil UEMOA 70% PIB", color: "#f43860" },
];

export function MacroWatchWidget() {
  const C = useThemeColors();
  const [activeCountry, setActiveCountry] = useState("UEMOA");
  const data = MACRO_DATA[activeCountry] ?? MACRO_DATA["UEMOA"];

  return (
    <WidgetShell title="Macro Watch" subtitle="Indicateurs Macroéconomiques Clés" lastUpdate="T1 2026" accentColor={C.gold}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Country tabs */}
        <div style={{ display: "flex", gap: 3 }}>
          {COUNTRIES.map((c) => (
            <button key={c} onClick={() => setActiveCountry(c)}
              style={{
                padding: "3px 8px", borderRadius: 4, border: `1px solid ${activeCountry === c ? C.gold + "50" : "var(--bt-border-a22)"}`,
                background: activeCountry === c ? "rgba(244,185,66,0.12)" : "transparent",
                color: activeCountry === c ? C.gold : C.muted,
                fontSize: 10.5, fontWeight: activeCountry === c ? 700 : 500, cursor: "pointer",
              }}>
              {c}
            </button>
          ))}
        </div>

        {/* Indicators grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
          {data.map((item, i) => (
            <div key={`${activeCountry}-${i}`} style={{ padding: "7px 9px", background: "var(--bt-overlay-45)", borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{item.label}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{item.value}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: item.color, display: "flex", alignItems: "center", gap: 1 }}>
                    {item.dir === "up" ? <TrendingUp size={8} /> : item.dir === "down" ? <TrendingDown size={8} /> : <Minus size={8} />}
                    {item.change}
                  </span>
                </div>
              </div>
              <Sparkline data={item.trend} color={item.color} width={48} height={24} id={`macro-${activeCountry}-${i}`} />
            </div>
          ))}
        </div>

        {/* Macro alerts */}
        {ALERTS.map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 8px", borderRadius: 4, background: a.color + "0c", border: `1px solid ${a.color}25` }}>
            <AlertTriangle size={9} color={a.color} />
            <span style={{ fontSize: 11, color: C.dim }}>{a.msg}</span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}
