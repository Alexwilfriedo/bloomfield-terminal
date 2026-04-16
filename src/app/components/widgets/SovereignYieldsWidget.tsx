import { WidgetShell } from "./WidgetShell";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { useThemeColors } from "../../hooks/useThemeColors";

const yields = [
  {
    country: "Côte d'Ivoire",
    iso: "CI",
    y2: "5.82%",
    y5: "6.45%",
    y7: "6.89%",
    y10: "7.12%",
    rating: "B+",
    outlook: "Stable",
    spread: "+312bp",
    change: "+2bp",
    up: true,
    ratingColor: "#f4b942",
  },
  {
    country: "Sénégal",
    iso: "SN",
    y2: "5.95%",
    y5: "6.62%",
    y7: "7.05%",
    y10: "7.34%",
    rating: "B+",
    outlook: "Stable",
    spread: "+334bp",
    change: "+3bp",
    up: true,
    ratingColor: "#f4b942",
  },
  {
    country: "Bénin",
    iso: "BJ",
    y2: "6.42%",
    y5: "7.08%",
    y7: "7.52%",
    y10: "7.89%",
    rating: "B",
    outlook: "Positive",
    spread: "+389bp",
    change: "+1bp",
    up: true,
    ratingColor: "#fb923c",
  },
  {
    country: "Togo",
    iso: "TG",
    y2: "6.78%",
    y5: "7.45%",
    y7: "7.92%",
    y10: "8.24%",
    rating: "B",
    outlook: "Stable",
    spread: "+424bp",
    change: "0bp",
    up: false,
    ratingColor: "#fb923c",
  },
  {
    country: "Burkina Faso",
    iso: "BF",
    y2: "7.85%",
    y5: "8.54%",
    y7: "9.12%",
    y10: "9.78%",
    rating: "CCC+",
    outlook: "Négatif",
    spread: "+578bp",
    change: "+8bp",
    up: true,
    ratingColor: "#f43860",
  },
  {
    country: "Mali",
    iso: "ML",
    y2: "8.12%",
    y5: "8.92%",
    y7: "9.45%",
    y10: "10.12%",
    rating: "B-",
    outlook: "Négatif",
    spread: "+612bp",
    change: "+5bp",
    up: true,
    ratingColor: "#f43860",
  },
  {
    country: "Niger",
    iso: "NE",
    y2: "7.45%",
    y5: "8.18%",
    y7: "8.74%",
    y10: "9.25%",
    rating: "B-",
    outlook: "Stable",
    spread: "+525bp",
    change: "+4bp",
    up: true,
    ratingColor: "#f43860",
  },
];

const chartData = yields.map((y) => ({
  name: y.iso,
  y10: parseFloat(y.y10),
  color: y.ratingColor,
}));

const cols = [
  { key: "country", label: "Pays", w: "1fr" },
  { key: "rating", label: "Note", w: "50px" },
  { key: "y2", label: "2 ans", w: "55px" },
  { key: "y5", label: "5 ans", w: "55px" },
  { key: "y7", label: "7 ans", w: "55px" },
  { key: "y10", label: "10 ans", w: "55px" },
  { key: "spread", label: "Spread/UST", w: "70px" },
  { key: "change", label: "Var. 1j", w: "55px" },
];

export function SovereignYieldsWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell
      title="Dettes Souveraines UEMOA"
      subtitle="Rendements obligataires — Marché régional BCEAO"
      lastUpdate="08 Avr 2026 · 16:00 GMT"
      accentColor={C.gold}
      noPadding
    >
      <div style={{ display: "flex", height: "100%" }}>
        {/* Yield curve bar chart */}
        <div
          style={{
            width: 140,
            borderRight: `1px solid ${C.border}`,
            padding: "10px 8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
            Taux 10 ans (%)
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, bottom: 0, left: 0, right: 12 }}
                barSize={10}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--bt-border-a16)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[4, 11]}
                  tick={{ fontSize: 10, fill: C.muted }}
                  axisLine={false}
                  tickLine={false}
                  tickCount={4}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: C.dim }}
                  axisLine={false}
                  tickLine={false}
                  width={22}
                />
                <Tooltip
                  contentStyle={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    borderRadius: 4,
                    fontSize: 12,
                    color: C.text,
                  }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, "Taux 10 ans"]}
                  itemStyle={{ color: C.gold }}
                />
                <Bar dataKey="y10" radius={[0, 3, 3, 0]} isAnimationActive={false}>
                  {chartData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} opacity={0.75} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: cols.map((c) => c.w).join(" "),
              padding: "6px 12px",
              borderBottom: `1px solid ${C.border}`,
              position: "sticky",
              top: 0,
              background: "#070f1d",
              zIndex: 2,
            }}
          >
            {cols.map((col) => (
              <div
                key={col.key}
                style={{
                  fontSize: 11,
                  color: C.muted,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {yields.map((row, i) => (
            <div
              key={row.iso}
              style={{
                display: "grid",
                gridTemplateColumns: cols.map((c) => c.w).join(" "),
                padding: "6px 12px",
                background: i % 2 === 0 ? "var(--bt-overlay-10)" : "transparent",
                borderBottom: `1px solid ${C.border}20`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = i % 2 === 0 ? "var(--bt-overlay-10)" : "transparent")
              }
            >
              {/* Country */}
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <CountryFlag iso={row.iso} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{row.country}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{row.outlook}</div>
                </div>
              </div>
              {/* Rating */}
              <div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: row.ratingColor,
                    background: row.ratingColor + "15",
                    padding: "2px 5px",
                    borderRadius: 4,
                    border: `1px solid ${row.ratingColor}30`,
                  }}
                >
                  {row.rating}
                </span>
              </div>
              {/* Yields */}
              {(["y2", "y5", "y7", "y10"] as const).map((k) => (
                <div
                  key={k}
                  style={{
                    fontSize: 13,
                    fontWeight: k === "y10" ? 700 : 500,
                    color: k === "y10" ? C.gold : C.dim,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {row[k]}
                </div>
              ))}
              {/* Spread */}
              <div style={{ fontSize: 13, color: C.dim, fontVariantNumeric: "tabular-nums" }}>
                {row.spread}
              </div>
              {/* Change */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: row.up ? C.red : C.green,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {row.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

function CountryFlag({ iso }: { iso: string }) {
  const flags: Record<string, string> = {
    CI: "🇨🇮",
    SN: "🇸🇳",
    BJ: "🇧🇯",
    TG: "🇹🇬",
    BF: "🇧🇫",
    ML: "🇲🇱",
    NE: "🇳🇪",
    GW: "🇬🇼",
  };
  return <span style={{ fontSize: 18, lineHeight: 1 }}>{flags[iso] ?? "🏳️"}</span>;
}