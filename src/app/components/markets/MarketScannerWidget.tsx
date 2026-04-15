import { useState } from "react";
import { WidgetShell } from "../widgets/WidgetShell";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
  Star,
  GitCompare,
  ArrowUpDown,
  ShoppingCart,
} from "lucide-react";
import { useTerminal } from "../../context/TerminalContext";

const C = {
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
  orange: "#fb923c",
};

type SortKey = "ticker" | "price" | "pct" | "vol" | "w52" | "rsi" | "pe";
type SortDir = "asc" | "desc";

const SECTORS = ["Tous", "Finance", "Télécom", "Agriculture", "Énergie", "Transport", "Distribution", "Industrie"] as const;

interface Stock {
  rank: number;
  ticker: string;
  company: string;
  sector: string;
  price: string;
  priceNum: number;
  pct: number;
  vol: string;
  volNum: number;
  w52: number;
  rsi: number;
  pe: number | null;
  spark: number[];
  alert: boolean;
  starred: boolean;
}

const STOCKS: Stock[] = [
  { rank: 1, ticker: "SONATEL", company: "Sonatel SA", sector: "Télécom", price: "16 800", priceNum: 16800, pct: 5.21, vol: "8 234", volNum: 8234, w52: 24.3, rsi: 65, pe: 18.4, spark: [13500,14200,14800,15100,15600,15900,16200,16500,16800], alert: false, starred: true },
  { rank: 2, ticker: "PALM CI", company: "Palmci CI", sector: "Agriculture", price: "7 295", priceNum: 7295, pct: 7.35, vol: "12 580", volNum: 12580, w52: 42.1, rsi: 72, pe: 12.8, spark: [5100,5400,5800,6100,6500,6700,6900,7100,7295], alert: true, starred: true },
  { rank: 3, ticker: "ETI", company: "Ecobank Transnat.", sector: "Finance", price: "18.50", priceNum: 18.5, pct: 3.78, vol: "42 100", volNum: 42100, w52: 8.5, rsi: 58, pe: 9.2, spark: [17.0,17.1,17.3,17.5,17.6,17.8,17.9,18.2,18.5], alert: false, starred: false },
  { rank: 4, ticker: "BOA CI", company: "Bank of Africa CI", sector: "Finance", price: "6 850", priceNum: 6850, pct: 1.23, vol: "5 420", volNum: 5420, w52: 15.6, rsi: 52, pe: 7.8, spark: [5900,6000,6100,6250,6400,6550,6650,6780,6850], alert: false, starred: true },
  { rank: 5, ticker: "BOLLORE CI", company: "Bolloré CI", sector: "Transport", price: "3 200", priceNum: 3200, pct: 4.92, vol: "5 820", volNum: 5820, w52: 32.8, rsi: 61, pe: 14.1, spark: [2400,2500,2600,2700,2800,2900,3000,3100,3200], alert: false, starred: false },
  { rank: 6, ticker: "ONATEL BF", company: "ONATEL Burkina", sector: "Télécom", price: "5 850", priceNum: 5850, pct: 3.12, vol: "3 450", volNum: 3450, w52: 11.2, rsi: 57, pe: 13.6, spark: [5200,5300,5380,5450,5540,5600,5680,5760,5850], alert: false, starred: false },
  { rank: 7, ticker: "TRACTAFRIC", company: "Tractafric Motors", sector: "Distribution", price: "3 750", priceNum: 3750, pct: 0.27, vol: "1 820", volNum: 1820, w52: 3.8, rsi: 51, pe: 19.2, spark: [3600,3620,3640,3670,3690,3710,3730,3740,3750], alert: false, starred: false },
  { rank: 8, ticker: "SGB CI", company: "SocGen Côte d'Ivoire", sector: "Finance", price: "10 500", priceNum: 10500, pct: 0.85, vol: "2 340", volNum: 2340, w52: 6.4, rsi: 53, pe: 8.1, spark: [9800,9900,10000,10100,10200,10300,10380,10450,10500], alert: false, starred: false },
  { rank: 9, ticker: "CIE", company: "CIE Côte d'Ivoire", sector: "Énergie", price: "1 580", priceNum: 1580, pct: -1.95, vol: "7 830", volNum: 7830, w52: -8.3, rsi: 38, pe: 11.2, spark: [1720,1700,1680,1660,1640,1620,1610,1595,1580], alert: false, starred: true },
  { rank: 10, ticker: "SMB CI", company: "SMB Côte d'Ivoire", sector: "Industrie", price: "14 250", priceNum: 14250, pct: -1.63, vol: "2 100", volNum: 2100, w52: -5.2, rsi: 44, pe: 16.3, spark: [15100,15000,14900,14800,14700,14600,14500,14400,14250], alert: false, starred: false },
  { rank: 11, ticker: "SOLIBRA", company: "Solibra CI", sector: "Distribution", price: "89 000", priceNum: 89000, pct: -2.78, vol: "450", volNum: 450, w52: -12.5, rsi: 32, pe: 22.4, spark: [102000,100000,98000,96000,94000,92500,91000,90000,89000], alert: false, starred: false },
  { rank: 12, ticker: "SAPH CI", company: "SAPH Côte d'Ivoire", sector: "Agriculture", price: "4 195", priceNum: 4195, pct: -3.42, vol: "9 120", volNum: 9120, w52: -18.7, rsi: 29, pe: 8.5, spark: [5100,4900,4800,4700,4600,4500,4400,4300,4195], alert: true, starred: true },
  { rank: 13, ticker: "AIR SEN.", company: "Air Sénégal", sector: "Transport", price: "340", priceNum: 340, pct: -1.42, vol: "18 600", volNum: 18600, w52: -22.1, rsi: 36, pe: null, spark: [440,420,400,390,380,370,360,350,340], alert: false, starred: false },
  { rank: 14, ticker: "BIIC", company: "BIIC Côte d'Ivoire", sector: "Finance", price: "7 900", priceNum: 7900, pct: 1.46, vol: "1 950", volNum: 1950, w52: 9.8, rsi: 55, pe: 10.3, spark: [7100,7200,7350,7450,7550,7650,7750,7830,7900], alert: false, starred: false },
  { rank: 15, ticker: "CROWN CI", company: "Crown Siem CI", sector: "Industrie", price: "780", priceNum: 780, pct: -0.64, vol: "4 560", volNum: 4560, w52: -14.2, rsi: 41, pe: null, spark: [920,900,880,860,840,830,820,790,780], alert: false, starred: false },
];

function SVGSparkline({ data, color }: { data: number[]; color: string }) {
  const w = 56;
  const h = 22;
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 2 - ((v - min) / range) * (h - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RSIBar({ value }: { value: number }) {
  const color =
    value >= 70 ? C.red : value <= 30 ? C.green : C.gold;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 44,
          height: 5,
          background: "rgba(44, 61, 127,0.2)",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${value}%`,
            background: color,
            borderRadius: 3,
          }}
        />
        <div style={{ position: "absolute", left: "70%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.18)" }} />
        <div style={{ position: "absolute", left: "30%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.18)" }} />
      </div>
      <span style={{ fontSize: 9, fontWeight: 700, color, fontVariantNumeric: "tabular-nums", minWidth: 20 }}>
        {value}
      </span>
    </div>
  );
}

function SectorBadge({ label }: { label: string }) {
  const colorMap: Record<string, string> = {
    Finance: C.accent,
    Télécom: C.purple,
    Agriculture: "#34d399",
    Énergie: C.gold,
    Transport: C.orange,
    Distribution: "#60a5fa",
    Industrie: C.muted,
  };
  const color = colorMap[label] ?? C.muted;
  return (
    <span
      style={{
        fontSize: 7.5,
        fontWeight: 600,
        color,
        background: color + "14",
        border: `1px solid ${color}28`,
        borderRadius: 3,
        padding: "1px 5px",
        letterSpacing: "0.02em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

const COLS = [
  { key: "rank", label: "#", w: "28px", sortable: false },
  { key: "ticker", label: "Titre", w: "1fr", sortable: true },
  { key: "sector", label: "Secteur", w: "80px", sortable: false },
  { key: "price", label: "Cours (FCFA)", w: "90px", sortable: true },
  { key: "pct", label: "Var. 1J", w: "66px", sortable: true },
  { key: "vol", label: "Volume", w: "72px", sortable: true },
  { key: "w52", label: "Perf. 52S", w: "68px", sortable: true },
  { key: "rsi", label: "RSI (14)", w: "90px", sortable: true },
  { key: "pe", label: "P/E", w: "40px", sortable: true },
  { key: "trend", label: "Tendance", w: "64px", sortable: false },
  { key: "actions", label: "", w: "96px", sortable: false },
];

const gridCols = COLS.map((c) => c.w).join(" ");

export function MarketScannerWidget() {
  const [sector, setSector] = useState<string>("Tous");
  const [sortKey, setSortKey] = useState<SortKey>("rank");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [starred, setStarred] = useState<Record<string, boolean>>(
    Object.fromEntries(STOCKS.map((s) => [s.ticker, s.starred]))
  );
  const { openOrderPanel } = useTerminal();

  const filtered =
    sector === "Tous" ? STOCKS : STOCKS.filter((s) => s.sector === sector);

  const sorted = [...filtered].sort((a, b) => {
    let av: number | string = 0;
    let bv: number | string = 0;
    if (sortKey === "ticker") { av = a.ticker; bv = b.ticker; }
    else if (sortKey === "price") { av = a.priceNum; bv = b.priceNum; }
    else if (sortKey === "pct") { av = a.pct; bv = b.pct; }
    else if (sortKey === "vol") { av = a.volNum; bv = b.volNum; }
    else if (sortKey === "w52") { av = a.w52; bv = b.w52; }
    else if (sortKey === "rsi") { av = a.rsi; bv = b.rsi; }
    else if (sortKey === "pe") { av = a.pe ?? -999; bv = b.pe ?? -999; }
    else { av = a.rank; bv = b.rank; }
    if (av < bv) return sortDir === "asc" ? -1 : 1;
    if (av > bv) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const toggleStar = (ticker: string) => {
    setStarred((prev) => ({ ...prev, [ticker]: !prev[ticker] }));
  };

  return (
    <WidgetShell
      title="Scanner de Marché BRVM"
      subtitle="Analyse complète des titres cotés — indicateurs techniques & fondamentaux"
      lastUpdate="Session 08 Avr 2026 · 15:47 GMT"
      accentColor={C.accent}
      noPadding
    >
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Sector filter bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 12px",
            borderBottom: `1px solid ${C.border}`,
            flexShrink: 0,
            overflowX: "auto",
          }}
        >
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: C.muted,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              flexShrink: 0,
            }}
          >
            SECTEUR
          </span>
          {SECTORS.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              style={{
                padding: "3px 10px",
                borderRadius: 4,
                border: `1px solid ${sector === s ? C.accent + "50" : C.border}`,
                background:
                  sector === s ? "rgba(214, 182, 141,0.12)" : "transparent",
                color: sector === s ? C.accent : C.dim,
                fontSize: 10,
                fontWeight: sector === s ? 700 : 500,
                cursor: "pointer",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.1s",
              }}
            >
              {s}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 9, color: C.muted, flexShrink: 0 }}>
            {sorted.length} titre{sorted.length !== 1 ? "s" : ""}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontSize: 8,
              color: C.muted,
              flexShrink: 0,
            }}
          >
            <ArrowUpDown size={9} color={C.muted} />
            Cliquer colonne pour trier
          </div>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: gridCols,
              padding: "5px 12px",
              borderBottom: `1px solid ${C.border}`,
              position: "sticky",
              top: 0,
              background: "#070f1d",
              zIndex: 2,
              gap: 4,
            }}
          >
            {COLS.map((col) => (
              <div
                key={col.key}
                onClick={() =>
                  col.sortable ? handleSort(col.key as SortKey) : undefined
                }
                style={{
                  fontSize: 8.5,
                  fontWeight: 700,
                  color:
                    sortKey === col.key ? C.accent : C.muted,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  cursor: col.sortable ? "pointer" : "default",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  userSelect: "none",
                  transition: "color 0.1s",
                }}
              >
                {col.label}
                {col.sortable && sortKey === col.key && (
                  <span style={{ fontSize: 8, color: C.accent }}>
                    {sortDir === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {sorted.map((stock, i) => {
            const isUp = stock.pct >= 0;
            const sparkColor = isUp ? C.green : C.red;
            const w52Color =
              stock.w52 >= 10 ? C.green : stock.w52 >= 0 ? C.dim : C.red;

            return (
              <div
                key={stock.ticker}
                style={{
                  display: "grid",
                  gridTemplateColumns: gridCols,
                  padding: "5px 12px",
                  gap: 4,
                  background:
                    i % 2 === 0
                      ? "rgba(0, 1, 23,0.1)"
                      : "transparent",
                  borderBottom: `1px solid ${C.border}10`,
                  cursor: "pointer",
                  transition: "background 0.1s",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "rgba(214, 182, 141,0.06)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    i % 2 === 0
                      ? "rgba(0, 1, 23,0.1)"
                      : "transparent")
                }
              >
                {/* Rank */}
                <div
                  style={{
                    fontSize: 9,
                    color: C.muted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stock.rank}
                </div>

                {/* Ticker + Company */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.text,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stock.ticker}
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: C.muted,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {stock.company}
                  </div>
                </div>

                {/* Sector */}
                <div>
                  <SectorBadge label={stock.sector} />
                </div>

                {/* Price */}
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.text,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stock.price}
                </div>

                {/* Pct change */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    fontSize: 11,
                    fontWeight: 700,
                    color: isUp ? C.green : C.red,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {isUp ? (
                    <TrendingUp size={10} />
                  ) : (
                    <TrendingDown size={10} />
                  )}
                  {isUp ? "+" : ""}
                  {stock.pct.toFixed(2)}%
                </div>

                {/* Volume */}
                <div
                  style={{
                    fontSize: 10,
                    color: C.dim,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stock.vol}
                </div>

                {/* 52W performance */}
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: w52Color,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stock.w52 >= 0 ? "+" : ""}
                  {stock.w52.toFixed(1)}%
                </div>

                {/* RSI */}
                <div>
                  <RSIBar value={stock.rsi} />
                </div>

                {/* P/E */}
                <div
                  style={{
                    fontSize: 10,
                    color: stock.pe ? C.dim : C.muted,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stock.pe !== null ? stock.pe.toFixed(1) : "—"}
                </div>

                {/* Sparkline */}
                <div>
                  <SVGSparkline data={stock.spark} color={sparkColor} />
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {/* ORDER button — primary CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openOrderPanel({
                        assetCode: stock.ticker,
                        assetName: stock.company,
                        market: "BRVM",
                      });
                    }}
                    title="Préparer un ordre"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "2px 6px",
                      borderRadius: 3,
                      border: `1px solid rgba(214, 182, 141,0.3)`,
                      background: "rgba(214, 182, 141,0.08)",
                      color: C.accent,
                      fontSize: 7.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                      transition: "all 0.1s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(214, 182, 141,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(214, 182, 141,0.08)";
                    }}
                  >
                    <ShoppingCart size={8} />
                    Ordre
                  </button>
                  <IconAction
                    icon={<Bell size={10} />}
                    color={stock.alert ? C.gold : C.muted}
                    title="Alerte"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(stock.ticker);
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 3,
                      background: "transparent",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <Star
                      size={10}
                      color={starred[stock.ticker] ? C.gold : C.muted}
                      fill={starred[stock.ticker] ? C.gold : "transparent"}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "5px 12px",
            borderTop: `1px solid ${C.border}`,
            background: "rgba(0, 1, 23,0.3)",
            flexShrink: 0,
          }}
        >
          <FooterLegendItem color={C.red} label="RSI ≥70 : Suracheté" />
          <FooterLegendItem color={C.gold} label="RSI 30–70 : Zone neutre" />
          <FooterLegendItem color={C.green} label="RSI ≤30 : Survendu" />
          <div style={{ width: 1, height: 12, background: C.border }} />
          <FooterLegendItem color={C.green} label="Perf. 52S > 0 : Momentum haussier" />
          <FooterLegendItem color={C.red} label="Perf. 52S < 0 : Tendance baissière" />
          <div style={{ flex: 1 }} />
          <span style={{ fontSize: 8, color: C.muted }}>
            Source : BRVM · Données de clôture 15:30 GMT
          </span>
        </div>
      </div>
    </WidgetShell>
  );
}

function IconAction({
  icon,
  color,
  title,
}: {
  icon: React.ReactNode;
  color: string;
  title: string;
}) {
  return (
    <button
      title={title}
      style={{
        width: 20,
        height: 20,
        borderRadius: 3,
        background: "transparent",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color,
        transition: "background 0.1s",
        padding: 0,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(214, 182, 141,0.1)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {icon}
    </button>
  );
}

function FooterLegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: 2,
          background: color,
          opacity: 0.8,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 8, color: C.muted }}>{label}</span>
    </div>
  );
}