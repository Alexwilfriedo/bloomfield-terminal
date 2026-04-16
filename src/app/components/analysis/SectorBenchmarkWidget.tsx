import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { WidgetShell } from "../widgets/WidgetShell";
import { TrendingUp, Award } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const PEERS = [
  {
    ticker: "SGBCI",
    name: "Soc. Générale CI",
    flag: "🇨🇮",
    mktCap: "487.3",
    pnb: "154.6",
    rn: "41.2",
    roe: "18.3",
    roa: "1.65",
    pe: "11.8",
    pb: "2.14",
    tier1: "11.8",
    npl: "4.2",
    rank: 1,
    isSelf: true,
  },
  {
    ticker: "BICICI",
    name: "BIC Côte d'Ivoire",
    flag: "🇨🇮",
    mktCap: "342.1",
    pnb: "118.3",
    rn: "28.7",
    roe: "15.2",
    roa: "1.38",
    pe: "11.9",
    pb: "1.82",
    tier1: "12.1",
    npl: "5.8",
    rank: 2,
    isSelf: false,
  },
  {
    ticker: "ORABK",
    name: "Orabank CIV",
    flag: "🇨🇮",
    mktCap: "198.4",
    pnb: "84.2",
    rn: "18.4",
    roe: "13.8",
    roa: "1.21",
    pe: "10.8",
    pb: "1.49",
    tier1: "11.2",
    npl: "7.1",
    rank: 3,
    isSelf: false,
  },
  {
    ticker: "BOA-CI",
    name: "Bank of Africa CI",
    flag: "🇨🇮",
    mktCap: "156.8",
    pnb: "67.4",
    rn: "14.2",
    roe: "12.4",
    roa: "1.08",
    pe: "11.0",
    pb: "1.37",
    tier1: "10.8",
    npl: "8.3",
    rank: 4,
    isSelf: false,
  },
  {
    ticker: "SIB",
    name: "Soc. Ivoirienne de Banque",
    flag: "🇨🇮",
    mktCap: "132.5",
    pnb: "58.1",
    rn: "12.8",
    roe: "11.9",
    roa: "0.98",
    pe: "10.3",
    pb: "1.22",
    tier1: "10.4",
    npl: "9.1",
    rank: 5,
    isSelf: false,
  },
  {
    ticker: "CBAO",
    name: "CBAO Groupe Attijariwafa",
    flag: "🇸🇳",
    mktCap: "412.8",
    pnb: "138.4",
    rn: "36.8",
    roe: "16.8",
    roa: "1.48",
    pe: "11.2",
    pb: "1.88",
    tier1: "11.6",
    npl: "5.2",
    rank: 3,
    isSelf: false,
  },
];

const ROE_DATA = PEERS.map((p) => ({ name: p.ticker, ROE: parseFloat(p.roe), fill: p.isSelf ? "#f4b942" : "#d6b68d" }));

function BarTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  const C = useThemeColors();
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 10px" }}>
      <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text }}>{label}</div>
      {payload.map((p) => (
        <div key={p.name} style={{ fontSize: 11, color: C.dim }}>
          {p.name}: <strong style={{ color: C.text }}>{p.value}%</strong>
        </div>
      ))}
    </div>
  );
}

const SECTOR_METRICS = [
  { label: "Croissance PNB sectorielle", value: "+9.8%", period: "FY2023", color: "#10c87a" },
  { label: "Marge nette moyenne", value: "21.4%", period: "Secteur BRVM", color: "#d6b68d" },
  { label: "ROE médian sectoriel", value: "14.1%", period: "Banques CIV", color: "#f4b942" },
  { label: "NPL moyen", value: "6.8%", period: "UEMOA", color: "#f43860" },
];

export function SectorBenchmarkWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell
      title="Analyse Sectorielle & Benchmarking"
      subtitle="Comparaison pairs BRVM/UEMOA · Banques · FY2023"
      accentColor={C.gold}
      noPadding
    >
      <div style={{ display: "flex", height: "100%", overflow: "hidden", flexDirection: "column" }}>
        {/* Sector metrics strip */}
        <div
          style={{
            display: "flex",
            gap: 0,
            borderBottom: `1px solid ${C.border}`,
            background: "var(--bt-overlay-30)",
            flexShrink: 0,
          }}
        >
          {SECTOR_METRICS.map((m, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "6px 14px",
                borderRight: i < SECTOR_METRICS.length - 1 ? `1px solid ${C.border}` : "none",
              }}
            >
              <div style={{ fontSize: 9.5, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                {m.label}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: m.color, marginTop: 2, lineHeight: 1 }}>{m.value}</div>
              <div style={{ fontSize: 9.5, color: C.muted, marginTop: 1 }}>{m.period}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden", minHeight: 0 }}>
          {/* Left: peer table */}
          <div style={{ flex: 1.2, overflow: "auto", minWidth: 0 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
              <thead>
                <tr style={{ background: "var(--bt-overlay-50)" }}>
                  {["#", "Société", "Mkt Cap", "PNB", "RN", "ROE", "ROA", "P/E", "P/B", "Tier1", "NPL"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "7px 10px",
                        textAlign: h === "Société" ? "left" : "right",
                        color: C.muted,
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        borderBottom: `1px solid ${C.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PEERS.map((p, i) => (
                  <tr
                    key={p.ticker}
                    style={{
                      background: p.isSelf ? "rgba(244,185,66,0.06)" : i % 2 === 0 ? "var(--bt-overlay-20)" : "transparent",
                      borderBottom: `1px solid ${C.border}20`,
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bt-accent-a08)")}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = p.isSelf
                        ? "rgba(244,185,66,0.06)"
                        : i % 2 === 0
                        ? "var(--bt-overlay-20)"
                        : "transparent")
                    }
                  >
                    <td style={{ padding: "7px 10px", textAlign: "center" }}>
                      {i === 0 ? <Award size={11} color={C.gold} /> : <span style={{ fontSize: 11, color: C.muted }}>{i + 1}</span>}
                    </td>
                    <td style={{ padding: "7px 10px", minWidth: 150 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 14 }}>{p.flag}</span>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: p.isSelf ? 800 : 600, color: p.isSelf ? C.gold : C.text }}>
                            {p.ticker}
                          </div>
                          <div style={{ fontSize: 10, color: C.muted }}>{p.name}</div>
                        </div>
                        {p.isSelf && (
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: C.gold,
                              background: "rgba(244,185,66,0.12)",
                              border: "1px solid rgba(244,185,66,0.25)",
                              borderRadius: 3,
                              padding: "1px 5px",
                              letterSpacing: "0.04em",
                            }}
                          >
                            FOCUS
                          </span>
                        )}
                      </div>
                    </td>
                    {[
                      { v: p.mktCap, unit: "Mds" },
                      { v: p.pnb, unit: "Mds" },
                      { v: p.rn, unit: "Mds" },
                      { v: p.roe + "%", color: parseFloat(p.roe) > 16 ? C.green : C.dim },
                      { v: p.roa + "%", color: parseFloat(p.roa) > 1.5 ? C.green : C.dim },
                      { v: p.pe + "x" },
                      { v: p.pb + "x" },
                      { v: p.tier1 + "%", color: parseFloat(p.tier1) > 11.5 ? C.green : C.gold },
                      { v: p.npl + "%", color: parseFloat(p.npl) < 6 ? C.green : parseFloat(p.npl) < 8 ? C.gold : C.red },
                    ].map((cell, ci) => (
                      <td
                        key={ci}
                        style={{
                          padding: "7px 10px",
                          textAlign: "right",
                          fontSize: 12,
                          fontWeight: p.isSelf ? 700 : 400,
                          color: (cell as { v: string; color?: string }).color ?? (p.isSelf ? C.gold : C.dim),
                          fontVariantNumeric: "tabular-nums",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {cell.v}
                        {"unit" in cell && <span style={{ fontSize: 10, color: C.muted, marginLeft: 2 }}>{(cell as { v: string; unit: string }).unit}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: charts */}
          <div
            style={{
              width: 280,
              borderLeft: `1px solid ${C.border}`,
              display: "flex",
              flexDirection: "column",
              background: "var(--bt-overlay-20)",
              flexShrink: 0,
            }}
          >
            {/* ROE comparison */}
            <div style={{ flex: 1, padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>
                ROE Comparé (%)
              </div>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={ROE_DATA} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke={C.border} horizontal={false} />
                  <XAxis type="number" tick={{ fill: C.muted, fontSize: 9 }} tickLine={false} axisLine={false} domain={[0, 22]} />
                  <YAxis type="category" dataKey="name" tick={{ fill: C.dim, fontSize: 10 }} tickLine={false} axisLine={false} width={42} />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="ROE" radius={[0, 3, 3, 0]}>
                    {ROE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance ranking */}
            <div style={{ flex: 1, padding: "8px 10px" }}>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                Classement Performance / Risque
              </div>
              {PEERS.slice(0, 4).map((p, i) => (
                <div key={p.ticker} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: C.muted, width: 12, flexShrink: 0 }}>#{i + 1}</span>
                  <span style={{ fontSize: 10, fontWeight: p.isSelf ? 700 : 500, color: p.isSelf ? C.gold : C.dim, width: 42, flexShrink: 0 }}>
                    {p.ticker}
                  </span>
                  <div style={{ flex: 1, position: "relative" }}>
                    <div style={{ height: 4, background: "var(--bt-border-a20)", borderRadius: 3 }}>
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          height: "100%",
                          width: `${(parseFloat(p.roe) / 20) * 100}%`,
                          background: p.isSelf ? C.gold : C.accent,
                          borderRadius: 3,
                          opacity: p.isSelf ? 1 : 0.6,
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                    <TrendingUp size={8} color={C.green} />
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: p.isSelf ? C.gold : C.dim }}>
                      {p.roe}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}