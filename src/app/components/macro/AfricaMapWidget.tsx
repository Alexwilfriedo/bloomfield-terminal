import { useState } from "react";
import { MapPin, TrendingUp, TrendingDown, Globe2, ChevronRight, Info } from "lucide-react";

const C = {
  surface: "#000430",
  elevated: "#000430",
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  orange: "#fb923c",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
};

type MetricKey = "growth" | "inflation" | "debt" | "risk";
type LayerKey = "continent" | "west" | "uemoa";

interface Country {
  code: string;
  name: string;
  flag: string;
  x: number;
  y: number;
  growth: number;
  inflation: number;
  debtGdp: number;
  riskLevel: "stable" | "moderate" | "elevated" | "high";
  uemoa?: boolean;
  region: "north" | "west" | "central" | "east" | "southern";
}

const COUNTRIES: Country[] = [
  // North Africa
  { code: "MAR", name: "Maroc", flag: "🇲🇦", x: 80, y: 38, growth: 3.4, inflation: 1.8, debtGdp: 72, riskLevel: "stable", region: "north" },
  { code: "DZA", name: "Algérie", flag: "🇩🇿", x: 158, y: 52, growth: 3.8, inflation: 4.2, debtGdp: 55, riskLevel: "moderate", region: "north" },
  { code: "TUN", name: "Tunisie", flag: "🇹🇳", x: 183, y: 22, growth: 1.8, inflation: 9.2, debtGdp: 82, riskLevel: "elevated", region: "north" },
  { code: "LBY", name: "Libye", flag: "🇱🇾", x: 220, y: 48, growth: 2.1, inflation: 8.5, debtGdp: 38, riskLevel: "high", region: "north" },
  { code: "EGY", name: "Égypte", flag: "🇪🇬", x: 278, y: 42, growth: 4.0, inflation: 26.5, debtGdp: 88, riskLevel: "elevated", region: "north" },
  // West Africa - UEMOA
  { code: "SEN", name: "Sénégal", flag: "🇸🇳", x: 18, y: 103, growth: 7.1, inflation: 3.8, debtGdp: 74, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "MLI", name: "Mali", flag: "🇲🇱", x: 95, y: 98, growth: 4.2, inflation: 5.4, debtGdp: 52, riskLevel: "elevated", uemoa: true, region: "west" },
  { code: "BFA", name: "Burkina Faso", flag: "🇧🇫", x: 95, y: 115, growth: 3.2, inflation: 4.9, debtGdp: 48, riskLevel: "high", uemoa: true, region: "west" },
  { code: "CIV", name: "Côte d'Ivoire", flag: "🇨🇮", x: 72, y: 143, growth: 6.3, inflation: 4.2, debtGdp: 58, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "TGO", name: "Togo", flag: "🇹🇬", x: 112, y: 141, growth: 5.2, inflation: 4.5, debtGdp: 69, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "BEN", name: "Bénin", flag: "🇧🇯", x: 125, y: 133, growth: 6.2, inflation: 2.8, debtGdp: 49, riskLevel: "stable", uemoa: true, region: "west" },
  { code: "GNB", name: "Guinée-Bissau", flag: "🇬🇼", x: 15, y: 122, growth: 3.8, inflation: 5.1, debtGdp: 78, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "NER", name: "Niger", flag: "🇳🇪", x: 162, y: 100, growth: 3.1, inflation: 3.2, debtGdp: 45, riskLevel: "high", uemoa: true, region: "west" },
  // Other West Africa
  { code: "MRT", name: "Mauritanie", flag: "🇲🇷", x: 42, y: 80, growth: 4.5, inflation: 5.8, debtGdp: 58, riskLevel: "moderate", region: "west" },
  { code: "GIN", name: "Guinée", flag: "🇬🇳", x: 38, y: 132, growth: 5.2, inflation: 10.8, debtGdp: 44, riskLevel: "elevated", region: "west" },
  { code: "SLE", name: "Sierra Leone", flag: "🇸🇱", x: 34, y: 148, growth: 3.8, inflation: 54.0, debtGdp: 72, riskLevel: "high", region: "west" },
  { code: "LBR", name: "Libéria", flag: "🇱🇷", x: 52, y: 155, growth: 4.8, inflation: 10.2, debtGdp: 56, riskLevel: "elevated", region: "west" },
  { code: "GHA", name: "Ghana", flag: "🇬🇭", x: 93, y: 141, growth: 4.0, inflation: 23.2, debtGdp: 84, riskLevel: "elevated", region: "west" },
  { code: "NGA", name: "Nigéria", flag: "🇳🇬", x: 155, y: 142, growth: 3.2, inflation: 28.9, debtGdp: 39, riskLevel: "elevated", region: "west" },
  { code: "CMR", name: "Cameroun", flag: "🇨🇲", x: 178, y: 158, growth: 4.0, inflation: 6.5, debtGdp: 45, riskLevel: "moderate", region: "west" },
  // Central Africa
  { code: "TCD", name: "Tchad", flag: "🇹🇩", x: 218, y: 108, growth: 4.5, inflation: 5.2, debtGdp: 44, riskLevel: "high", region: "central" },
  { code: "SDN", name: "Soudan", flag: "🇸🇩", x: 280, y: 105, growth: 1.2, inflation: 62.0, debtGdp: 184, riskLevel: "high", region: "central" },
  { code: "CAF", name: "RCA", flag: "🇨🇫", x: 232, y: 132, growth: 3.2, inflation: 6.8, debtGdp: 52, riskLevel: "high", region: "central" },
  { code: "COG", name: "Congo", flag: "🇨🇬", x: 188, y: 172, growth: 3.5, inflation: 4.8, debtGdp: 88, riskLevel: "elevated", region: "central" },
  { code: "COD", name: "Rép. Dém. Congo", flag: "🇨🇩", x: 245, y: 180, growth: 6.2, inflation: 18.5, debtGdp: 22, riskLevel: "elevated", region: "central" },
  { code: "GAB", name: "Gabon", flag: "🇬🇦", x: 168, y: 170, growth: 2.8, inflation: 3.5, debtGdp: 65, riskLevel: "moderate", region: "central" },
  // East Africa
  { code: "ETH", name: "Éthiopie", flag: "🇪🇹", x: 340, y: 130, growth: 6.5, inflation: 28.0, debtGdp: 24, riskLevel: "elevated", region: "east" },
  { code: "SOM", name: "Somalie", flag: "🇸🇴", x: 368, y: 155, growth: 3.2, inflation: 8.0, debtGdp: 68, riskLevel: "high", region: "east" },
  { code: "KEN", name: "Kenya", flag: "🇰🇪", x: 325, y: 165, growth: 5.5, inflation: 6.8, debtGdp: 68, riskLevel: "moderate", region: "east" },
  { code: "UGA", name: "Ouganda", flag: "🇺🇬", x: 302, y: 160, growth: 5.8, inflation: 5.8, debtGdp: 52, riskLevel: "moderate", region: "east" },
  { code: "TZA", name: "Tanzanie", flag: "🇹🇿", x: 312, y: 192, growth: 5.2, inflation: 4.5, debtGdp: 45, riskLevel: "moderate", region: "east" },
  { code: "RWA", name: "Rwanda", flag: "🇷🇼", x: 272, y: 168, growth: 7.8, inflation: 5.2, debtGdp: 72, riskLevel: "moderate", region: "east" },
  // Southern Africa
  { code: "AGO", name: "Angola", flag: "🇦🇴", x: 205, y: 218, growth: 3.2, inflation: 25.8, debtGdp: 65, riskLevel: "elevated", region: "southern" },
  { code: "ZMB", name: "Zambie", flag: "🇿🇲", x: 265, y: 230, growth: 4.2, inflation: 14.5, debtGdp: 122, riskLevel: "elevated", region: "southern" },
  { code: "ZWE", name: "Zimbabwe", flag: "🇿🇼", x: 282, y: 248, growth: 3.5, inflation: 55.0, debtGdp: 85, riskLevel: "high", region: "southern" },
  { code: "MOZ", name: "Mozambique", flag: "🇲🇿", x: 318, y: 250, growth: 4.5, inflation: 6.5, debtGdp: 95, riskLevel: "elevated", region: "southern" },
  { code: "NAM", name: "Namibie", flag: "🇳🇦", x: 198, y: 268, growth: 3.5, inflation: 5.8, debtGdp: 68, riskLevel: "moderate", region: "southern" },
  { code: "BWA", name: "Botswana", flag: "🇧🇼", x: 258, y: 268, growth: 4.0, inflation: 5.5, debtGdp: 18, riskLevel: "stable", region: "southern" },
  { code: "ZAF", name: "Afrique du Sud", flag: "🇿🇦", x: 252, y: 298, growth: 1.2, inflation: 5.8, debtGdp: 73, riskLevel: "moderate", region: "southern" },
  { code: "MDG", name: "Madagascar", flag: "🇲🇬", x: 368, y: 252, growth: 4.8, inflation: 10.2, debtGdp: 55, riskLevel: "elevated", region: "southern" },
];

const RISK_COLORS: Record<string, string> = {
  stable: C.green,
  moderate: C.gold,
  elevated: C.orange,
  high: C.red,
};

function getMetricColor(country: Country, metric: MetricKey): string {
  if (metric === "growth") {
    if (country.growth >= 6) return C.green;
    if (country.growth >= 4) return "#86efac";
    if (country.growth >= 2) return C.gold;
    return C.red;
  }
  if (metric === "inflation") {
    if (country.inflation <= 3) return C.green;
    if (country.inflation <= 6) return C.gold;
    if (country.inflation <= 15) return C.orange;
    return C.red;
  }
  if (metric === "debt") {
    if (country.debtGdp <= 40) return C.green;
    if (country.debtGdp <= 65) return C.gold;
    if (country.debtGdp <= 90) return C.orange;
    return C.red;
  }
  return RISK_COLORS[country.riskLevel];
}

function getMetricValue(country: Country, metric: MetricKey): string {
  if (metric === "growth") return `+${country.growth}%`;
  if (metric === "inflation") return `${country.inflation}%`;
  if (metric === "debt") return `${country.debtGdp}%`;
  return country.riskLevel.charAt(0).toUpperCase() + country.riskLevel.slice(1);
}

const LAYER_FILTERS: Record<LayerKey, (c: Country) => boolean> = {
  continent: () => true,
  west: (c) => ["north", "west"].includes(c.region),
  uemoa: (c) => !!c.uemoa,
};

const AFRICA_PATH =
  "M 82,10 L 162,2 L 213,18 L 258,22 L 295,28 L 342,82 L 358,112 L 380,150 " +
  "L 322,195 L 308,248 L 278,290 L 215,322 L 188,315 L 162,295 L 148,270 " +
  "L 140,228 L 135,185 L 155,168 L 128,148 L 108,142 L 72,138 L 48,148 " +
  "L 22,130 L 8,100 L 5,75 L 8,48 L 82,10 Z";

// Approximate UEMOA region hull for highlight overlay
const UEMOA_HULL =
  "M 5,88 L 18,90 L 22,100 L 8,102 L 5,120 L 12,125 L 15,118 L 20,128 " +
  "L 50,135 L 72,148 L 95,148 L 118,148 L 128,138 L 130,128 L 162,108 " +
  "L 175,92 L 162,88 L 120,85 L 95,85 L 42,76 L 20,82 Z";

export function AfricaMapWidget() {
  const [selected, setSelected] = useState<string>("CIV");
  const [metric, setMetric] = useState<MetricKey>("growth");
  const [layer, setLayer] = useState<LayerKey>("continent");

  const visible = COUNTRIES.filter(LAYER_FILTERS[layer]);
  const selectedCountry = COUNTRIES.find((c) => c.code === selected);

  const metrics: { key: MetricKey; label: string }[] = [
    { key: "growth", label: "Croissance" },
    { key: "inflation", label: "Inflation" },
    { key: "debt", label: "Dette/PIB" },
    { key: "risk", label: "Risque" },
  ];
  const layers: { key: LayerKey; label: string }[] = [
    { key: "continent", label: "Afrique" },
    { key: "west", label: "Afrique de l'Ouest" },
    { key: "uemoa", label: "UEMOA" },
  ];

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
          padding: "6px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.4)",
          flexShrink: 0,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.accent }} />
          <Globe2 size={11} color={C.accent} />
          <span style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Carte Économique Afrique
          </span>
          <span style={{ fontSize: 7.5, color: C.muted }}>· FMI · Banque Mondiale · 2025</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Layer selector */}
          <div style={{ display: "flex", gap: 3 }}>
            {layers.map((l) => (
              <button
                key={l.key}
                onClick={() => setLayer(l.key)}
                style={{
                  padding: "2px 8px",
                  borderRadius: 3,
                  border: `1px solid ${layer === l.key ? C.gold + "50" : C.border}`,
                  background: layer === l.key ? "rgba(244,185,66,0.12)" : "transparent",
                  color: layer === l.key ? C.gold : C.muted,
                  fontSize: 8.5,
                  fontWeight: layer === l.key ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ width: 1, height: 14, background: C.border }} />

          {/* Metric selector */}
          <div style={{ display: "flex", gap: 3 }}>
            {metrics.map((m) => (
              <button
                key={m.key}
                onClick={() => setMetric(m.key)}
                style={{
                  padding: "2px 8px",
                  borderRadius: 3,
                  border: `1px solid ${metric === m.key ? C.accent + "50" : C.border}`,
                  background: metric === m.key ? "rgba(214, 182, 141,0.1)" : "transparent",
                  color: metric === m.key ? C.accent : C.muted,
                  fontSize: 8.5,
                  fontWeight: metric === m.key ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body: map + detail */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* SVG Map */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <svg
            viewBox="0 0 400 330"
            width="100%"
            height="100%"
            style={{ display: "block" }}
          >
            {/* Ocean background */}
            <rect width="400" height="330" fill="rgba(0, 4, 48,0.85)" />

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`h${i}`}
                x1="0" y1={66 * i} x2="400" y2={66 * i}
                stroke="rgba(44, 61, 127,0.08)" strokeWidth="0.5"
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`v${i}`}
                x1={80 * i} y1="0" x2={80 * i} y2="330"
                stroke="rgba(44, 61, 127,0.08)" strokeWidth="0.5"
              />
            ))}

            {/* Africa continent fill */}
            <path
              d={AFRICA_PATH}
              fill="rgba(0, 4, 48,0.35)"
              stroke="rgba(44, 61, 127,0.5)"
              strokeWidth="1"
            />

            {/* UEMOA zone highlight */}
            {(layer === "continent" || layer === "uemoa" || layer === "west") && (
              <path
                d={UEMOA_HULL}
                fill="rgba(244,185,66,0.05)"
                stroke="rgba(244,185,66,0.2)"
                strokeWidth="0.8"
                strokeDasharray="3,2"
              />
            )}

            {/* UEMOA label */}
            {(layer === "continent" || layer === "west") && (
              <text
                x="90" y="128"
                textAnchor="middle"
                fill="rgba(244,185,66,0.18)"
                fontSize="9"
                fontWeight="700"
                letterSpacing="3"
                fontFamily="'Inter', system-ui, sans-serif"
              >
                UEMOA
              </text>
            )}

            {/* Country tiles */}
            {visible.map((country) => {
              const isSelected = country.code === selected;
              const color = getMetricColor(country, metric);
              const tileW = country.uemoa ? 22 : 18;
              const tileH = country.uemoa ? 14 : 12;

              return (
                <g
                  key={country.code}
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelected(country.code)}
                >
                  {/* Glow for selected */}
                  {isSelected && (
                    <rect
                      x={country.x - tileW / 2 - 3}
                      y={country.y - tileH / 2 - 3}
                      width={tileW + 6}
                      height={tileH + 6}
                      rx={4}
                      fill="none"
                      stroke={color}
                      strokeWidth="1.5"
                      opacity={0.5}
                    />
                  )}

                  {/* Tile body */}
                  <rect
                    x={country.x - tileW / 2}
                    y={country.y - tileH / 2}
                    width={tileW}
                    height={tileH}
                    rx={2}
                    fill={color + (isSelected ? "28" : "18")}
                    stroke={isSelected ? color : country.uemoa ? C.gold + "60" : color + "50"}
                    strokeWidth={isSelected ? 1.5 : country.uemoa ? 0.8 : 0.6}
                  />

                  {/* Country code label */}
                  <text
                    x={country.x}
                    y={country.y + 3.5}
                    textAnchor="middle"
                    fill={isSelected ? C.text : color}
                    fontSize={country.uemoa ? 6.5 : 6}
                    fontWeight={isSelected ? "800" : "600"}
                    fontFamily="'Inter', system-ui, sans-serif"
                  >
                    {country.code}
                  </text>
                </g>
              );
            })}

            {/* Selected country pulse ring */}
            {(() => {
              const c = COUNTRIES.find((c) => c.code === selected);
              if (!c) return null;
              const color = getMetricColor(c, metric);
              return (
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={14}
                  fill="none"
                  stroke={color}
                  strokeWidth="1"
                  opacity="0.25"
                />
              );
            })()}

            {/* Continent label */}
            <text x="25" y="318" fill="rgba(44, 61, 127,0.3)" fontSize="7" fontFamily="'Inter', system-ui, sans-serif">
              © Bloomfield Intelligence · Données FMI/BM 2025
            </text>
          </svg>
        </div>

        {/* Right: Country detail */}
        <div
          style={{
            width: 158,
            flexShrink: 0,
            borderLeft: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            padding: "10px",
            gap: 10,
          }}
        >
          {selectedCountry ? (
            <>
              {/* Country header */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{selectedCountry.flag}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: C.text, lineHeight: 1 }}>
                      {selectedCountry.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                      <span
                        style={{
                          padding: "1px 5px",
                          borderRadius: 3,
                          fontSize: 7.5,
                          fontWeight: 700,
                          color: RISK_COLORS[selectedCountry.riskLevel],
                          background: RISK_COLORS[selectedCountry.riskLevel] + "18",
                          border: `1px solid ${RISK_COLORS[selectedCountry.riskLevel]}28`,
                        }}
                      >
                        {selectedCountry.riskLevel.toUpperCase()}
                      </span>
                      {selectedCountry.uemoa && (
                        <span
                          style={{
                            padding: "1px 5px",
                            borderRadius: 3,
                            fontSize: 7.5,
                            fontWeight: 700,
                            color: C.gold,
                            background: "rgba(244,185,66,0.12)",
                            border: "1px solid rgba(244,185,66,0.25)",
                          }}
                        >
                          UEMOA
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <DetailStat
                    label="Croissance PIB"
                    value={`${selectedCountry.growth > 0 ? "+" : ""}${selectedCountry.growth}%`}
                    color={selectedCountry.growth >= 5 ? C.green : selectedCountry.growth >= 3 ? C.gold : C.red}
                    icon={selectedCountry.growth >= 0 ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  />
                  <DetailStat
                    label="Inflation"
                    value={`${selectedCountry.inflation}%`}
                    color={selectedCountry.inflation <= 5 ? C.green : selectedCountry.inflation <= 15 ? C.gold : C.red}
                  />
                  <DetailStat
                    label="Dette / PIB"
                    value={`${selectedCountry.debtGdp}%`}
                    color={selectedCountry.debtGdp <= 60 ? C.gold : selectedCountry.debtGdp <= 90 ? C.orange : C.red}
                  />
                </div>
              </div>

              {/* Score bar */}
              <div
                style={{
                  background: C.elevated,
                  borderRadius: 5,
                  border: `1px solid ${C.border}`,
                  padding: "8px",
                }}
              >
                <div style={{ fontSize: 7.5, color: C.muted, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 700 }}>
                  Score Macro Bloomfield
                </div>
                {[
                  { label: "Croissance", pct: Math.min(100, (selectedCountry.growth / 10) * 100), color: C.green },
                  { label: "Stabilité", pct: Math.max(0, 100 - selectedCountry.inflation * 3), color: C.gold },
                  { label: "Solvabilité", pct: Math.max(0, 100 - selectedCountry.debtGdp * 0.8), color: C.accent },
                ].map((bar) => (
                  <div key={bar.label} style={{ marginBottom: 5 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                      <span style={{ fontSize: 7.5, color: C.muted }}>{bar.label}</span>
                      <span style={{ fontSize: 7.5, color: bar.color, fontWeight: 700 }}>{Math.round(bar.pct)}</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(44, 61, 127,0.2)", borderRadius: 2, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${bar.pct}%`,
                          background: bar.color,
                          borderRadius: 2,
                          opacity: 0.85,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick link */}
              <button
                onClick={() => {}}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  borderRadius: 5,
                  border: `1px solid rgba(214, 182, 141,0.2)`,
                  background: "rgba(214, 182, 141,0.06)",
                  cursor: "pointer",
                  color: C.accent,
                  fontSize: 8.5,
                  fontWeight: 600,
                }}
              >
                <span>Fiche pays complète</span>
                <ChevronRight size={10} />
              </button>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 6 }}>
              <MapPin size={18} color={C.muted} />
              <span style={{ fontSize: 9, color: C.muted, textAlign: "center" }}>
                Cliquez sur un pays pour voir les détails
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "5px 12px",
          borderTop: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.3)",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {metric === "growth" && (
          <>
            <LegendItem color={C.green} label="≥ 6%" />
            <LegendItem color="#86efac" label="4–6%" />
            <LegendItem color={C.gold} label="2–4%" />
            <LegendItem color={C.red} label="< 2%" />
          </>
        )}
        {metric === "inflation" && (
          <>
            <LegendItem color={C.green} label="≤ 3%" />
            <LegendItem color={C.gold} label="3–6%" />
            <LegendItem color={C.orange} label="6–15%" />
            <LegendItem color={C.red} label="> 15%" />
          </>
        )}
        {metric === "debt" && (
          <>
            <LegendItem color={C.green} label="≤ 40%" />
            <LegendItem color={C.gold} label="40–65%" />
            <LegendItem color={C.orange} label="65–90%" />
            <LegendItem color={C.red} label="> 90%" />
          </>
        )}
        {metric === "risk" && (
          <>
            <LegendItem color={C.green} label="Stable" />
            <LegendItem color={C.gold} label="Modéré" />
            <LegendItem color={C.orange} label="Élevé" />
            <LegendItem color={C.red} label="Risqué" />
          </>
        )}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 14,
              height: 8,
              borderRadius: 2,
              border: "1px solid rgba(244,185,66,0.4)",
              background: "rgba(244,185,66,0.1)",
            }}
          />
          <span style={{ fontSize: 7.5, color: C.muted }}>Zone UEMOA</span>
        </div>
        <span style={{ fontSize: 7.5, color: C.muted }}>· {COUNTRIES.filter(LAYER_FILTERS[layer]).length} pays affichés</span>
      </div>
    </div>
  );
}

function DetailStat({
  label,
  value,
  color,
  icon,
}: {
  label: string;
  value: string;
  color: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 7px",
        borderRadius: 4,
        background: "rgba(0, 4, 48,0.4)",
        border: `1px solid ${C.border}`,
      }}
    >
      <span style={{ fontSize: 8, color: C.muted }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        {icon && <span style={{ color }}>{icon}</span>}
        <span style={{ fontSize: 11, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: color,
          opacity: 0.9,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 7.5, color: C.muted }}>{label}</span>
    </div>
  );
}
