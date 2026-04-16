import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, MapPin, BarChart3 } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

interface Country {
  code: string;
  name: string;
  flag: string;
  gdp: string;
  growth: number;
  inflation: number;
  debtGdp: number;
  extBalance: number;
  rating: string;
  riskScore: number; // 1=low 5=high
  riskLevel: "stable" | "moderate" | "elevated" | "high";
  active?: boolean;
}

const COUNTRIES: Country[] = [
  {
    code: "CIV",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    gdp: "6 850",
    growth: 6.3,
    inflation: 4.2,
    debtGdp: 57.8,
    extBalance: -2.3,
    rating: "Ba3/B+",
    riskScore: 2,
    riskLevel: "moderate",
    active: true,
  },
  {
    code: "SEN",
    name: "Sénégal",
    flag: "🇸🇳",
    gdp: "3 280",
    growth: 7.1,
    inflation: 3.8,
    debtGdp: 74.2,
    extBalance: -13.2,
    rating: "Ba3/B+",
    riskScore: 2,
    riskLevel: "moderate",
  },
  {
    code: "MLI",
    name: "Mali",
    flag: "🇲🇱",
    gdp: "2 420",
    growth: 4.2,
    inflation: 5.4,
    debtGdp: 52.1,
    extBalance: -8.9,
    rating: "Caa1/B-",
    riskScore: 4,
    riskLevel: "elevated",
  },
  {
    code: "BFA",
    name: "Burkina Faso",
    flag: "🇧🇫",
    gdp: "1 980",
    growth: 3.2,
    inflation: 4.9,
    debtGdp: 48.3,
    extBalance: -9.1,
    rating: "Caa2/CCC+",
    riskScore: 5,
    riskLevel: "high",
  },
  {
    code: "NER",
    name: "Niger",
    flag: "🇳🇪",
    gdp: "1 540",
    growth: 3.1,
    inflation: 3.2,
    debtGdp: 44.7,
    extBalance: -12.8,
    rating: "N/N (suspendu)",
    riskScore: 5,
    riskLevel: "high",
  },
  {
    code: "TGO",
    name: "Togo",
    flag: "🇹🇬",
    gdp: "980",
    growth: 5.2,
    inflation: 4.5,
    debtGdp: 68.9,
    extBalance: -7.3,
    rating: "B3/B-",
    riskScore: 2,
    riskLevel: "moderate",
  },
  {
    code: "BEN",
    name: "Bénin",
    flag: "🇧🇯",
    gdp: "1 320",
    growth: 6.2,
    inflation: 2.8,
    debtGdp: 48.5,
    extBalance: -6.2,
    rating: "B1/B",
    riskScore: 2,
    riskLevel: "stable",
  },
  {
    code: "GNB",
    name: "Guinée-Bissau",
    flag: "🇬🇼",
    gdp: "180",
    growth: 3.8,
    inflation: 5.1,
    debtGdp: 78.4,
    extBalance: -5.8,
    rating: "N/A",
    riskScore: 3,
    riskLevel: "moderate",
  },
];

const RISK_COLORS: Record<string, string> = {
  stable: "#10c87a",
  moderate: "#f4b942",
  elevated: "#fb923c",
  high: "#f43860",
};

const RISK_LABELS: Record<string, string> = {
  stable: "Stable",
  moderate: "Modéré",
  elevated: "Élevé",
  high: "Risque",
};

type SortKey = "gdp" | "growth" | "inflation" | "debtGdp" | "extBalance" | "riskScore";

function RiskDots({ score, max = 5 }: { score: number; max?: number }) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < score;
        const color =
          score <= 2 ? C.green : score === 3 ? C.gold : score === 4 ? C.orange : C.red;
        return (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: filled ? color : "var(--bt-border-a25)",
              boxShadow: filled ? `0 0 3px ${color}60` : "none",
            }}
          />
        );
      })}
    </div>
  );
}

// Simplified schematic UEMOA map using SVG
function UEMOAMap({
  countries,
  selected,
  onSelect,
}: {
  countries: Country[];
  selected: string;
  onSelect: (code: string) => void;
}) {
  const C = useThemeColors();
  // Schematic layout positions (cx, cy, w, h, rx) for each country
  const shapes: Record<string, { x: number; y: number; w: number; h: number }> = {
    SEN: { x: 8, y: 22, w: 72, h: 48 },
    GNB: { x: 8, y: 74, w: 36, h: 28 },
    MLI: { x: 84, y: 8, w: 106, h: 86 },
    BFA: { x: 96, y: 96, w: 88, h: 52 },
    NER: { x: 194, y: 8, w: 112, h: 86 },
    CIV: { x: 22, y: 104, w: 96, h: 72 },
    TGO: { x: 168, y: 98, w: 26, h: 70 },
    BEN: { x: 196, y: 88, w: 36, h: 80 },
  };

  const getColor = (c: Country) => {
    const base = RISK_COLORS[c.riskLevel];
    if (c.code === selected) return base;
    return base + "60";
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox="0 0 308 180"
        width="100%"
        style={{ display: "block" }}
      >
        {/* Background ocean */}
        <rect width="308" height="180" fill="var(--bt-overlay-80)" rx="6" />
        {/* Grid */}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={45 * i}
            x2="308"
            y2={45 * i}
            stroke="var(--bt-border-a12)"
            strokeWidth="0.5"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={`v${i}`}
            x1={76 * i}
            y1="0"
            x2={76 * i}
            y2="180"
            stroke="var(--bt-border-a12)"
            strokeWidth="0.5"
          />
        ))}

        {/* Country shapes */}
        {countries.map((country) => {
          const s = shapes[country.code];
          if (!s) return null;
          const col = RISK_COLORS[country.riskLevel];
          const isSelected = country.code === selected;
          return (
            <g
              key={country.code}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(country.code)}
            >
              <rect
                x={s.x}
                y={s.y}
                width={s.w}
                height={s.h}
                rx={4}
                fill={col + (isSelected ? "30" : "15")}
                stroke={isSelected ? col : col + "50"}
                strokeWidth={isSelected ? 1.5 : 0.8}
              />
              {/* Country code label */}
              <text
                x={s.x + s.w / 2}
                y={s.y + s.h / 2 - (s.h > 50 ? 6 : 0)}
                textAnchor="middle"
                fill={isSelected ? "#ddeaf8" : col}
                fontSize={s.w > 60 ? 8 : 7}
                fontWeight={isSelected ? "700" : "600"}
                fontFamily="'Inter', system-ui, sans-serif"
              >
                {country.code}
              </text>
              {/* Growth rate */}
              {s.h > 40 && (
                <text
                  x={s.x + s.w / 2}
                  y={s.y + s.h / 2 + (s.h > 50 ? 8 : 4)}
                  textAnchor="middle"
                  fill={col}
                  fontSize={7}
                  fontFamily="'Inter', system-ui, sans-serif"
                >
                  {country.growth > 0 ? "+" : ""}
                  {country.growth}%
                </text>
              )}
              {/* Selected glow effect */}
              {isSelected && (
                <rect
                  x={s.x - 2}
                  y={s.y - 2}
                  width={s.w + 4}
                  height={s.h + 4}
                  rx={6}
                  fill="none"
                  stroke={col}
                  strokeWidth={1}
                  opacity={0.4}
                />
              )}
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(8, 158)">
          {[
            { label: "Stable", color: C.green },
            { label: "Modéré", color: C.gold },
            { label: "Élevé", color: C.orange },
            { label: "Risque", color: C.red },
          ].map((l, i) => (
            <g key={l.label} transform={`translate(${i * 72}, 0)`}>
              <rect width="8" height="8" rx="2" fill={l.color + "40"} stroke={l.color + "60"} strokeWidth="0.8" />
              <text x="11" y="7" fill="#54678d" fontSize="6.5" fontFamily="'Inter', system-ui, sans-serif">
                {l.label}
              </text>
            </g>
          ))}
        </g>

        {/* "UEMOA" watermark */}
        <text x="154" y="92" textAnchor="middle" fill="var(--bt-border-a12)" fontSize="30" fontWeight="800" fontFamily="'Inter', system-ui, sans-serif">
          UEMOA
        </text>
      </svg>
    </div>
  );
}

export function RegionalAnalysisWidget() {
  const C = useThemeColors();
  const [sortKey, setSortKey] = useState<SortKey>("riskScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedCountry, setSelectedCountry] = useState("CIV");

  const sorted = [...COUNTRIES].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (typeof av === "string" && typeof bv === "string") {
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    const an = av as number;
    const bn = bv as number;
    return sortDir === "asc" ? an - bn : bn - an;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const topPerformers = [...COUNTRIES].sort((a, b) => b.growth - a.growth).slice(0, 3);
  const selected = COUNTRIES.find((c) => c.code === selectedCountry)!;

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
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.purple }} />
          <BarChart3 size={11} color={C.purple} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Analyse Comparative Régionale — UEMOA 2023
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 10, color: C.muted }}>8 États membres · Données INS · FMI · BCEAO</span>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: C.purple,
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.2)",
              borderRadius: 3,
              padding: "1px 6px",
            }}
          >
            Classement dynamique
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Left: Comparison table */}
        <div style={{ overflow: "auto", borderRight: `1px solid ${C.border}` }}>
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 70px 64px 64px 72px 70px 90px 80px",
              padding: "5px 12px",
              background: "var(--bt-overlay-50)",
              position: "sticky",
              top: 0,
              zIndex: 2,
              borderBottom: `1px solid ${C.border}`,
              gap: 4,
            }}
          >
            {[
              { label: "PAYS", key: null },
              { label: "PIB (Mds)", key: "gdp" as SortKey },
              { label: "CROISS.", key: "growth" as SortKey },
              { label: "INFLAT.", key: "inflation" as SortKey },
              { label: "DETTE/PIB", key: "debtGdp" as SortKey },
              { label: "SOL. EXT.", key: "extBalance" as SortKey },
              { label: "RATING", key: null },
              { label: "RISQUE", key: "riskScore" as SortKey },
            ].map((col) => (
              <div
                key={col.label}
                onClick={() => col.key && handleSort(col.key)}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: sortKey === col.key ? C.accent : C.muted,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: col.key ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  userSelect: "none",
                }}
              >
                {col.label}
                {col.key && sortKey === col.key && (
                  <span style={{ fontSize: 10 }}>{sortDir === "asc" ? "↑" : "↓"}</span>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((c, i) => {
            const isSelected = c.code === selectedCountry;
            const rColor = RISK_COLORS[c.riskLevel];
            const growthColor = c.growth >= 6 ? C.green : c.growth >= 4 ? C.gold : C.red;
            const infColor = c.inflation <= 3 ? C.green : c.inflation <= 5 ? C.gold : C.red;
            const debtColor = c.debtGdp <= 50 ? C.green : c.debtGdp <= 70 ? C.gold : C.red;
            return (
              <div
                key={c.code}
                onClick={() => setSelectedCountry(c.code)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 70px 64px 64px 72px 70px 90px 80px",
                  padding: "6px 12px",
                  gap: 4,
                  background: isSelected
                    ? "var(--bt-accent-a08)"
                    : i % 2 === 0
                    ? "var(--bt-overlay-10)"
                    : "transparent",
                  borderBottom: `1px solid ${C.border}10`,
                  borderLeft: isSelected ? `2px solid ${C.accent}` : "2px solid transparent",
                  cursor: "pointer",
                  transition: "background 0.1s",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  !isSelected && (e.currentTarget.style.background = "var(--bt-accent-a06)")
                }
                onMouseLeave={(e) =>
                  !isSelected &&
                  (e.currentTarget.style.background =
                    i % 2 === 0 ? "var(--bt-overlay-10)" : "transparent")
                }
              >
                {/* Country */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                  <span style={{ fontSize: 15 }}>{c.flag}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isSelected ? C.accent : C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.name}
                    </div>
                    <div style={{ fontSize: 9.5, color: C.muted }}>{c.code}</div>
                  </div>
                </div>

                {/* GDP */}
                <div style={{ fontSize: 12, fontWeight: 600, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                  {c.gdp}
                </div>

                {/* Growth */}
                <ValueCell value={c.growth} suffix="%" color={growthColor} showArrow />

                {/* Inflation */}
                <ValueCell value={c.inflation} suffix="%" color={infColor} />

                {/* Debt/GDP */}
                <ValueCell value={c.debtGdp} suffix="%" color={debtColor} />

                {/* External balance */}
                <ValueCell value={c.extBalance} suffix="%" color={c.extBalance >= 0 ? C.green : C.red} />

                {/* Rating */}
                <div style={{ fontSize: 11, fontWeight: 600, color: C.dim, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.rating}
                </div>

                {/* Risk dots */}
                <RiskDots score={c.riskScore} />
              </div>
            );
          })}

          {/* Footer: UEMOA averages */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "140px 70px 64px 64px 72px 70px 90px 80px",
              padding: "6px 12px",
              gap: 4,
              borderTop: `1px solid ${C.border}`,
              background: "var(--bt-accent-a06)",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: 10.5, fontWeight: 700, color: C.accent, letterSpacing: "0.04em" }}>MOY. UEMOA</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums" }}>2 444</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.green, fontVariantNumeric: "tabular-nums" }}>5.0%</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums" }}>4.2%</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums" }}>59.1%</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.red, fontVariantNumeric: "tabular-nums" }}>-8.2%</div>
            <div style={{ fontSize: 10.5, color: C.muted }}>—</div>
            <RiskDots score={3} />
          </div>
        </div>

        {/* Right: Map + detail */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            padding: "10px 12px",
            gap: 10,
          }}
        >
          {/* Map title */}
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            <MapPin size={10} color={C.purple} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Carte Risque UEMOA
            </span>
          </div>

          {/* Schematic map */}
          <div style={{ flexShrink: 0 }}>
            <UEMOAMap
              countries={COUNTRIES}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>

          {/* Selected country quick stats */}
          {selected && (
            <div
              style={{
                background: C.elevated,
                borderRadius: 6,
                border: `1px solid ${C.border}`,
                padding: "8px 10px",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>{selected.flag}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{selected.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: RISK_COLORS[selected.riskLevel],
                        background: RISK_COLORS[selected.riskLevel] + "14",
                        border: `1px solid ${RISK_COLORS[selected.riskLevel]}28`,
                        borderRadius: 3,
                        padding: "1px 5px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {RISK_LABELS[selected.riskLevel].toUpperCase()}
                    </span>
                    <span style={{ fontSize: 10, color: C.muted }}>{selected.rating}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                <QuickStat label="Croissance" value={`${selected.growth > 0 ? "+" : ""}${selected.growth}%`} color={selected.growth >= 5 ? C.green : C.gold} />
                <QuickStat label="Inflation" value={`${selected.inflation}%`} color={selected.inflation <= 4 ? C.green : C.gold} />
                <QuickStat label="Dette/PIB" value={`${selected.debtGdp}%`} color={selected.debtGdp <= 60 ? C.gold : C.red} />
                <QuickStat label="Sol. ext." value={`${selected.extBalance}% PIB`} color={selected.extBalance >= 0 ? C.green : C.red} />
              </div>
            </div>
          )}

          {/* Top performers strip */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 5 }}>
              Top Croissance
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {topPerformers.map((c, i) => (
                <div
                  key={c.code}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                  onClick={() => setSelectedCountry(c.code)}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, width: 10 }}>{i + 1}</span>
                  <span style={{ fontSize: 13 }}>{c.flag}</span>
                  <span style={{ fontSize: 11, color: C.dim, flex: 1 }}>{c.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.green, fontVariantNumeric: "tabular-nums" }}>
                    +{c.growth}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCell({
  value,
  suffix,
  color,
  showArrow,
}: {
  value: number;
  suffix: string;
  color: string;
  showArrow?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {showArrow && (
        value > 0 ? (
          <TrendingUp size={8} color={color} />
        ) : value < 0 ? (
          <TrendingDown size={8} color={color} />
        ) : (
          <Minus size={8} color={color} />
        )
      )}
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value > 0 && suffix === "%" && !showArrow ? "" : ""}
        {value}
        {suffix}
      </span>
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  const C = useThemeColors();
  return (
    <div>
      <div style={{ fontSize: 9.5, color: C.muted }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color, fontVariantNumeric: "tabular-nums", marginTop: 1 }}>
        {value}
      </div>
    </div>
  );
}
