import { useMemo, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Globe2, ChevronRight } from "lucide-react";

import africaGeoJSONUrl from "../../../assets/africa.geojson";

const C = {
  surface: "#000117",
  elevated: "#000117",
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
  growth: number;
  inflation: number;
  debtGdp: number;
  riskLevel: "stable" | "moderate" | "elevated" | "high";
  uemoa?: boolean;
  region: "north" | "west" | "central" | "east" | "southern";
}

const COUNTRIES: Country[] = [
  // North Africa
  { code: "MAR", name: "Maroc",       flag: "🇲🇦", growth: 3.4, inflation: 1.8,  debtGdp: 72,  riskLevel: "stable",   region: "north" },
  { code: "DZA", name: "Algérie",     flag: "🇩🇿", growth: 3.8, inflation: 4.2,  debtGdp: 55,  riskLevel: "moderate", region: "north" },
  { code: "TUN", name: "Tunisie",     flag: "🇹🇳", growth: 1.8, inflation: 9.2,  debtGdp: 82,  riskLevel: "elevated", region: "north" },
  { code: "LBY", name: "Libye",       flag: "🇱🇾", growth: 2.1, inflation: 8.5,  debtGdp: 38,  riskLevel: "high",     region: "north" },
  { code: "EGY", name: "Égypte",      flag: "🇪🇬", growth: 4.0, inflation: 26.5, debtGdp: 88,  riskLevel: "elevated", region: "north" },
  // West Africa — UEMOA
  { code: "SEN", name: "Sénégal",        flag: "🇸🇳", growth: 7.1, inflation: 3.8, debtGdp: 74, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "MLI", name: "Mali",           flag: "🇲🇱", growth: 4.2, inflation: 5.4, debtGdp: 52, riskLevel: "elevated", uemoa: true, region: "west" },
  { code: "BFA", name: "Burkina Faso",   flag: "🇧🇫", growth: 3.2, inflation: 4.9, debtGdp: 48, riskLevel: "high",     uemoa: true, region: "west" },
  { code: "CIV", name: "Côte d'Ivoire",  flag: "🇨🇮", growth: 6.3, inflation: 4.2, debtGdp: 58, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "TGO", name: "Togo",           flag: "🇹🇬", growth: 5.2, inflation: 4.5, debtGdp: 69, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "BEN", name: "Bénin",          flag: "🇧🇯", growth: 6.2, inflation: 2.8, debtGdp: 49, riskLevel: "stable",   uemoa: true, region: "west" },
  { code: "GNB", name: "Guinée-Bissau",  flag: "🇬🇼", growth: 3.8, inflation: 5.1, debtGdp: 78, riskLevel: "moderate", uemoa: true, region: "west" },
  { code: "NER", name: "Niger",          flag: "🇳🇪", growth: 3.1, inflation: 3.2, debtGdp: 45, riskLevel: "high",     uemoa: true, region: "west" },
  // Other West Africa
  { code: "MRT", name: "Mauritanie",   flag: "🇲🇷", growth: 4.5, inflation: 5.8,  debtGdp: 58, riskLevel: "moderate", region: "west" },
  { code: "GIN", name: "Guinée",       flag: "🇬🇳", growth: 5.2, inflation: 10.8, debtGdp: 44, riskLevel: "elevated", region: "west" },
  { code: "SLE", name: "Sierra Leone", flag: "🇸🇱", growth: 3.8, inflation: 54.0, debtGdp: 72, riskLevel: "high",     region: "west" },
  { code: "LBR", name: "Libéria",      flag: "🇱🇷", growth: 4.8, inflation: 10.2, debtGdp: 56, riskLevel: "elevated", region: "west" },
  { code: "GHA", name: "Ghana",        flag: "🇬🇭", growth: 4.0, inflation: 23.2, debtGdp: 84, riskLevel: "elevated", region: "west" },
  { code: "NGA", name: "Nigéria",      flag: "🇳🇬", growth: 3.2, inflation: 28.9, debtGdp: 39, riskLevel: "elevated", region: "west" },
  { code: "CMR", name: "Cameroun",     flag: "🇨🇲", growth: 4.0, inflation: 6.5,  debtGdp: 45, riskLevel: "moderate", region: "west" },
  // Central Africa
  { code: "TCD", name: "Tchad",            flag: "🇹🇩", growth: 4.5, inflation: 5.2,  debtGdp: 44,  riskLevel: "high",     region: "central" },
  { code: "SDN", name: "Soudan",           flag: "🇸🇩", growth: 1.2, inflation: 62.0, debtGdp: 184, riskLevel: "high",     region: "central" },
  { code: "CAF", name: "RCA",              flag: "🇨🇫", growth: 3.2, inflation: 6.8,  debtGdp: 52,  riskLevel: "high",     region: "central" },
  { code: "COG", name: "Congo",            flag: "🇨🇬", growth: 3.5, inflation: 4.8,  debtGdp: 88,  riskLevel: "elevated", region: "central" },
  { code: "COD", name: "Rép. Dém. Congo",  flag: "🇨🇩", growth: 6.2, inflation: 18.5, debtGdp: 22,  riskLevel: "elevated", region: "central" },
  { code: "GAB", name: "Gabon",            flag: "🇬🇦", growth: 2.8, inflation: 3.5,  debtGdp: 65,  riskLevel: "moderate", region: "central" },
  // East Africa
  { code: "ETH", name: "Éthiopie", flag: "🇪🇹", growth: 6.5, inflation: 28.0, debtGdp: 24, riskLevel: "elevated", region: "east" },
  { code: "SOM", name: "Somalie",  flag: "🇸🇴", growth: 3.2, inflation: 8.0,  debtGdp: 68, riskLevel: "high",     region: "east" },
  { code: "KEN", name: "Kenya",    flag: "🇰🇪", growth: 5.5, inflation: 6.8,  debtGdp: 68, riskLevel: "moderate", region: "east" },
  { code: "UGA", name: "Ouganda",  flag: "🇺🇬", growth: 5.8, inflation: 5.8,  debtGdp: 52, riskLevel: "moderate", region: "east" },
  { code: "TZA", name: "Tanzanie", flag: "🇹🇿", growth: 5.2, inflation: 4.5,  debtGdp: 45, riskLevel: "moderate", region: "east" },
  { code: "RWA", name: "Rwanda",   flag: "🇷🇼", growth: 7.8, inflation: 5.2,  debtGdp: 72, riskLevel: "moderate", region: "east" },
  // Southern Africa
  { code: "AGO", name: "Angola",         flag: "🇦🇴", growth: 3.2, inflation: 25.8, debtGdp: 65,  riskLevel: "elevated", region: "southern" },
  { code: "ZMB", name: "Zambie",         flag: "🇿🇲", growth: 4.2, inflation: 14.5, debtGdp: 122, riskLevel: "elevated", region: "southern" },
  { code: "ZWE", name: "Zimbabwe",       flag: "🇿🇼", growth: 3.5, inflation: 55.0, debtGdp: 85,  riskLevel: "high",     region: "southern" },
  { code: "MOZ", name: "Mozambique",     flag: "🇲🇿", growth: 4.5, inflation: 6.5,  debtGdp: 95,  riskLevel: "elevated", region: "southern" },
  { code: "NAM", name: "Namibie",        flag: "🇳🇦", growth: 3.5, inflation: 5.8,  debtGdp: 68,  riskLevel: "moderate", region: "southern" },
  { code: "BWA", name: "Botswana",       flag: "🇧🇼", growth: 4.0, inflation: 5.5,  debtGdp: 18,  riskLevel: "stable",   region: "southern" },
  { code: "ZAF", name: "Afrique du Sud", flag: "🇿🇦", growth: 1.2, inflation: 5.8,  debtGdp: 73,  riskLevel: "moderate", region: "southern" },
  { code: "MDG", name: "Madagascar",     flag: "🇲🇬", growth: 4.8, inflation: 10.2, debtGdp: 55,  riskLevel: "elevated", region: "southern" },
];

const COUNTRIES_BY_ISO: Record<string, Country> = COUNTRIES.reduce(
  (acc, c) => ({ ...acc, [c.code]: c }),
  {}
);

const UEMOA_CODES = new Set(
  COUNTRIES.filter((c) => c.uemoa).map((c) => c.code)
);

const WEST_CODES = new Set(
  COUNTRIES.filter((c) => c.region === "west" || c.region === "north").map(
    (c) => c.code
  )
);

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

function isCountryVisible(code: string, layer: LayerKey): boolean {
  if (layer === "continent") return true;
  if (layer === "uemoa") return UEMOA_CODES.has(code);
  if (layer === "west") return WEST_CODES.has(code);
  return true;
}

/* ─────────────────────────────────────────────────────────────
 * Map projection — geoMercator centered on Africa
 * ───────────────────────────────────────────────────────────── */
const PROJECTION_CONFIG = {
  scale: 340,
  center: [18, 3] as [number, number], // roughly the centroid of Africa
};

export function AfricaMapWidget() {
  const [selected, setSelected] = useState<string>("CIV");
  const [metric, setMetric] = useState<MetricKey>("growth");
  const [layer, setLayer] = useState<LayerKey>("continent");
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedCountry = COUNTRIES_BY_ISO[selected];

  const metrics = useMemo<{ key: MetricKey; label: string }[]>(
    () => [
      { key: "growth", label: "Croissance" },
      { key: "inflation", label: "Inflation" },
      { key: "debt", label: "Dette/PIB" },
      { key: "risk", label: "Risque" },
    ],
    []
  );

  const layers = useMemo<{ key: LayerKey; label: string }[]>(
    () => [
      { key: "continent", label: "Afrique" },
      { key: "west", label: "Afrique de l'Ouest" },
      { key: "uemoa", label: "UEMOA" },
    ],
    []
  );

  const legendItems =
    metric === "growth"
      ? [
          { color: C.green, label: "≥ 6%" },
          { color: "#86efac", label: "4–6%" },
          { color: C.gold, label: "2–4%" },
          { color: C.red, label: "< 2%" },
        ]
      : metric === "inflation"
      ? [
          { color: C.green, label: "≤ 3%" },
          { color: C.gold, label: "3–6%" },
          { color: C.orange, label: "6–15%" },
          { color: C.red, label: "> 15%" },
        ]
      : metric === "debt"
      ? [
          { color: C.green, label: "≤ 40%" },
          { color: C.gold, label: "40–65%" },
          { color: C.orange, label: "65–90%" },
          { color: C.red, label: "> 90%" },
        ]
      : [
          { color: C.green, label: "Stable" },
          { color: C.gold, label: "Modéré" },
          { color: C.orange, label: "Élevé" },
          { color: C.red, label: "Haut risque" },
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
          background: "rgba(0, 1, 23,0.4)",
          flexShrink: 0,
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.accent }} />
          <Globe2 size={11} color={C.accent} />
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: C.dim,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Carte Économique Afrique
          </span>
          <span style={{ fontSize: 7.5, color: C.muted }}>
            · FMI · Banque Mondiale · 2025
          </span>
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
        {/* Real geo map — react-simple-maps + Natural Earth Africa */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            background: "rgba(0, 1, 23,0.55)",
          }}
        >
          <ComposableMap
            projection="geoMercator"
            projectionConfig={PROJECTION_CONFIG}
            width={800}
            height={600}
            style={{ width: "100%", height: "100%" }}
          >
            <ZoomableGroup center={[18, 3]} zoom={1} minZoom={0.8} maxZoom={4}>
              <Geographies geography={africaGeoJSONUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const iso: string = geo.properties.iso_a3;
                    const country = COUNTRIES_BY_ISO[iso];
                    const visible = isCountryVisible(iso, layer);
                    const isSelected = iso === selected;
                    const isHovered = iso === hovered;
                    const isUemoa = UEMOA_CODES.has(iso);

                    // Every country gets a solid fill so its outline is
                    // always readable on the dark background. Countries
                    // without Bloomfield data fall back to a neutral navy.
                    const baseFill = country
                      ? getMetricColor(country, metric)
                      : "#1a2650";
                    const fill = baseFill;
                    // Dimming is applied *only* when the user narrows the
                    // layer to a sub-region — never on the full continent.
                    const opacity = visible
                      ? isSelected || isHovered
                        ? 1
                        : 0.95
                      : 0.25;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        fillOpacity={opacity}
                        stroke={
                          isSelected
                            ? C.accent
                            : isUemoa && visible
                            ? "rgba(244, 185, 66, 0.85)"
                            : "rgba(84, 103, 141, 0.85)"
                        }
                        strokeWidth={isSelected ? 1.8 : isUemoa && visible ? 1.2 : 0.7}
                        onMouseEnter={() => setHovered(iso)}
                        onMouseLeave={() => setHovered(null)}
                        onClick={() => {
                          if (country) setSelected(iso);
                        }}
                        style={{
                          default: { outline: "none", cursor: country ? "pointer" : "default" },
                          hover: {
                            outline: "none",
                            cursor: country ? "pointer" : "default",
                            fill: country ? baseFill : fill,
                            fillOpacity: 1,
                            stroke: C.accent,
                            strokeWidth: 1.4,
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Hover tooltip */}
          {hovered && COUNTRIES_BY_ISO[hovered] && (
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                padding: "6px 10px",
                background: "rgba(0, 1, 23, 0.92)",
                border: `1px solid ${C.accent}`,
                borderRadius: 6,
                fontSize: 10,
                color: C.text,
                pointerEvents: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 12 }}>{COUNTRIES_BY_ISO[hovered].flag}</span>
                <span style={{ fontWeight: 700 }}>{COUNTRIES_BY_ISO[hovered].name}</span>
              </div>
              <div style={{ color: C.dim, fontSize: 9 }}>
                {metrics.find((m) => m.key === metric)?.label}:{" "}
                <span style={{ color: getMetricColor(COUNTRIES_BY_ISO[hovered], metric), fontWeight: 700 }}>
                  {getMetricValue(COUNTRIES_BY_ISO[hovered], metric)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div
          style={{
            width: 180,
            borderLeft: `1px solid ${C.border}`,
            background: "rgba(0, 1, 23, 0.4)",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {selectedCountry && (
            <>
              <div style={{ padding: "10px 12px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                      {selectedCountry.name}
                    </div>
                    <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>
                      {selectedCountry.uemoa && (
                        <span
                          style={{
                            padding: "1px 5px",
                            borderRadius: 3,
                            background: "rgba(244,185,66,0.15)",
                            border: "1px solid rgba(244,185,66,0.3)",
                            color: C.gold,
                            fontSize: 7,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            marginRight: 4,
                          }}
                        >
                          UEMOA
                        </span>
                      )}
                      <span
                        style={{
                          padding: "1px 5px",
                          borderRadius: 3,
                          background: `${RISK_COLORS[selectedCountry.riskLevel]}20`,
                          border: `1px solid ${RISK_COLORS[selectedCountry.riskLevel]}40`,
                          color: RISK_COLORS[selectedCountry.riskLevel],
                          fontSize: 7,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {selectedCountry.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
                <DetailRow label="Croissance PIB" value={`+${selectedCountry.growth}%`} color={getMetricColor(selectedCountry, "growth")} />
                <DetailRow label="Inflation" value={`${selectedCountry.inflation}%`} color={getMetricColor(selectedCountry, "inflation")} />
                <DetailRow label="Dette / PIB" value={`${selectedCountry.debtGdp}%`} color={getMetricColor(selectedCountry, "debt")} />
              </div>

              <div style={{ padding: "8px 12px", borderTop: `1px solid ${C.border}` }}>
                <div style={{ fontSize: 7.5, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Score Macro Bloomfield
                </div>
                <ScoreBar label="Croissance" value={63} color={C.green} />
                <ScoreBar label="Stabilité"  value={87} color={C.gold} />
                <ScoreBar label="Solvabilité" value={54} color={C.accent} />
              </div>

              <div style={{ flex: 1 }} />

              <button
                style={{
                  margin: 10,
                  padding: "6px 10px",
                  background: "rgba(214, 182, 141, 0.1)",
                  border: `1px solid ${C.accent}40`,
                  borderRadius: 4,
                  color: C.accent,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                Fiche pays complète
                <ChevronRight size={12} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "5px 12px",
          borderTop: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23, 0.3)",
          flexShrink: 0,
          fontSize: 8,
          color: C.muted,
          flexWrap: "wrap",
        }}
      >
        {legendItems.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: item.color,
              }}
            />
            <span>{item.label}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              border: "1px solid rgba(244,185,66,0.75)",
              background: "transparent",
            }}
          />
          <span>Zone UEMOA</span>
        </div>
        <span>· {COUNTRIES.length} pays couverts</span>
      </div>
    </div>
  );
}

/* ─── Small helpers ───────────────────────────────────────── */

function DetailRow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 6px",
        borderRadius: 3,
        background: "rgba(44, 61, 127, 0.12)",
      }}
    >
      <span style={{ fontSize: 9, color: C.dim }}>{label}</span>
      <span style={{ fontSize: 10.5, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </span>
    </div>
  );
}

function ScoreBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 8, color: C.muted }}>{label}</span>
        <span style={{ fontSize: 8, fontWeight: 700, color, fontVariantNumeric: "tabular-nums" }}>
          {value}
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: "rgba(44, 61, 127, 0.25)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: color,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
}
