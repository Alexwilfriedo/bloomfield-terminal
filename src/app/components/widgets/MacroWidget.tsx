import { useState } from "react";
import { WidgetShell } from "./WidgetShell";
import { ChevronDown, ChevronUp } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

const countries = [
  {
    id: "civ",
    name: "Côte d'Ivoire",
    iso: "CI",
    gdp: "70.4",
    gdpGrowth: "+6.5%",
    inflation: "4.2%",
    debt: "56.8%",
    currentAccount: "-4.2%",
    reserves: "9.8 Mds",
    rating: "B+",
    pop: "27.5M",
    budgetDef: "-4.5%",
    radarData: [
      { axis: "Croissance", val: 82 },
      { axis: "Stabilité", val: 68 },
      { axis: "Compétitivité", val: 61 },
      { axis: "Dette", val: 58 },
      { axis: "Réserves", val: 74 },
    ],
  },
  {
    id: "sen",
    name: "Sénégal",
    iso: "SN",
    gdp: "27.8",
    gdpGrowth: "+7.2%",
    inflation: "3.8%",
    debt: "72.4%",
    currentAccount: "-6.8%",
    reserves: "5.2 Mds",
    rating: "B+",
    pop: "17.2M",
    budgetDef: "-6.1%",
    radarData: [
      { axis: "Croissance", val: 88 },
      { axis: "Stabilité", val: 72 },
      { axis: "Compétitivité", val: 55 },
      { axis: "Dette", val: 42 },
      { axis: "Réserves", val: 58 },
    ],
  },
  {
    id: "gha",
    name: "Ghana",
    iso: "GH",
    gdp: "76.4",
    gdpGrowth: "+3.1%",
    inflation: "22.4%",
    debt: "92.7%",
    currentAccount: "-2.1%",
    reserves: "4.8 Mds",
    rating: "CCC+",
    pop: "33.5M",
    budgetDef: "-3.8%",
    radarData: [
      { axis: "Croissance", val: 45 },
      { axis: "Stabilité", val: 30 },
      { axis: "Compétitivité", val: 48 },
      { axis: "Dette", val: 18 },
      { axis: "Réserves", val: 42 },
    ],
  },
];

export function MacroWidget() {
  const C = useThemeColors();
  const [selectedId, setSelectedId] = useState("civ");
  const country = countries.find((c) => c.id === selectedId)!;

  return (
    <WidgetShell
      title="Tableau de Bord Macro"
      subtitle="Indicateurs macroéconomiques clés"
      lastUpdate="FMI/Banque Mondiale 2024"
      accentColor={C.purple}
    >
      {/* Country selector */}
      <div style={{ display: "flex", gap: 5, marginBottom: 8 }}>
        {countries.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            style={{
              flex: 1,
              padding: "4px 6px",
              borderRadius: 5,
              border: `1px solid ${selectedId === c.id ? C.purple + "60" : C.border}`,
              background: selectedId === c.id ? C.purple + "15" : "transparent",
              color: selectedId === c.id ? C.purple : C.dim,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {/* Left: KPIs */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
          <MacroKPI
            label="PIB nominal"
            value={`${country.gdp} Mds USD`}
            change={country.gdpGrowth}
            up={country.gdpGrowth.startsWith("+")}
          />
          <MacroKPI
            label="Inflation (IHPC)"
            value={country.inflation}
            change=""
            warning={parseFloat(country.inflation) > 5}
          />
          <MacroKPI
            label="Dette / PIB"
            value={country.debt}
            change=""
            warning={parseFloat(country.debt) > 70}
          />
          <MacroKPI
            label="Solde courant"
            value={country.currentAccount}
            change=""
            up={!country.currentAccount.startsWith("-")}
          />
          <MacroKPI
            label="Réserves ext."
            value={country.reserves}
            change=""
          />
          <MacroKPI
            label="Déficit budgétaire"
            value={country.budgetDef}
            change=""
            warning
          />
        </div>

        {/* Right: Radar chart */}
        <div
          style={{
            width: 140,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>
            Profil Macro
          </div>
          <div style={{ width: 130, height: 110 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={country.radarData} cx="50%" cy="50%">
                <PolarGrid stroke="var(--bt-border-a32)" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fontSize: 9, fill: C.muted }}
                />
                <Radar
                  key={`radar-${selectedId}`}
                  dataKey="val"
                  stroke={C.purple}
                  fill={C.purple}
                  fillOpacity={0.2}
                  strokeWidth={1.5}
                />
                <Tooltip
                  contentStyle={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 4,
                    fontSize: 12,
                    color: C.text,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Rating badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              background: "var(--bt-overlay-50)",
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              marginTop: 4,
            }}
          >
            <div>
              <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Notation S&P
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: country.rating.startsWith("CCC") ? C.red : C.gold,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {country.rating}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}

function MacroKPI({
  label,
  value,
  change,
  up,
  warning,
}: {
  label: string;
  value: string;
  change: string;
  up?: boolean;
  warning?: boolean;
}) {
  const C2 = {
    green: "#10c87a",
    red: "#f43860",
    gold: "#f4b942",
    text: "#ddeaf8",
    dim: "#6b96b8",
    muted: "#54678d",
    border: "var(--bt-border-a32)",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        background: "var(--bt-overlay-40)",
        borderRadius: 5,
        border: `1px solid ${C2.border}`,
      }}
    >
      <span style={{ fontSize: 12, color: C2.dim, fontWeight: 500 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: warning ? C2.gold : C2.text,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </span>
        {change && (
          <span
            style={{
              fontSize: 12,
              color: up ? C2.green : C2.red,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            {up ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}