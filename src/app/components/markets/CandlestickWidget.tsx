import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Activity,
  ChevronDown,
} from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

type Period = "1S" | "1M" | "3M" | "6M" | "1A";

interface OHLCData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Generate BRVM Composite OHLC data
function generateData(period: Period): OHLCData[] {
  const counts: Record<Period, number> = { "1S": 5, "1M": 22, "3M": 66, "6M": 130, "1A": 252 };
  const n = counts[period];
  const data: OHLCData[] = [];
  let price = period === "1A" ? 258 : period === "6M" ? 265 : period === "3M" ? 272 : period === "1M" ? 279 : 282;
  const volatility = 1.8;
  const drift = 0.04;

  const monthLabels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

  for (let i = 0; i < n; i++) {
    const dayOfMonth = (i % 22) + 1;
    const month = Math.floor(i / 22);
    const dateLabel = n <= 5
      ? ["Lun", "Mar", "Mer", "Jeu", "Ven"][i % 5]
      : n <= 22
      ? `${dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth} Mar`
      : `${monthLabels[month % 12]}`;

    const change = (Math.random() - 0.48) * volatility + drift;
    const open = price;
    const close = +(price + change).toFixed(2);
    const range = Math.abs(change) * 1.8;
    const high = +(Math.max(open, close) + Math.random() * range).toFixed(2);
    const low = +(Math.min(open, close) - Math.random() * range).toFixed(2);
    const volume = Math.floor(800000 + Math.random() * 1200000);
    data.push({ date: dateLabel, open, high, low, close, volume });
    price = close;
  }
  return data;
}

const SECURITIES = [
  { code: "BRVM-COMP", name: "BRVM Composite", color: "#d6b68d" },
  { code: "BRVM-10", name: "BRVM 10", color: "#10c87a" },
  { code: "SONATEL", name: "Sonatel SA", color: "#a78bfa" },
  { code: "ETI", name: "Ecobank Transnat.", color: "#f4b942" },
  { code: "PALM CI", name: "Palmci CI", color: "#fb923c" },
];

function CandlestickChart({
  data,
  width,
  height,
  accentColor,
}: {
  data: OHLCData[];
  width: number;
  height: number;
  accentColor: string;
}) {
  const C = useThemeColors();
  if (!data.length) return null;

  const marginTop = 10;
  const marginBottom = 48;
  const marginLeft = 52;
  const marginRight = 12;
  const volHeight = 40;

  const innerW = width - marginLeft - marginRight;
  const innerH = height - marginTop - marginBottom - volHeight - 8;

  const allPrices = data.flatMap((d) => [d.high, d.low]);
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const padP = (maxP - minP) * 0.08;
  const lo = minP - padP;
  const hi = maxP + padP;

  const allVols = data.map((d) => d.volume);
  const maxVol = Math.max(...allVols);

  const xStep = innerW / data.length;
  const candleW = Math.max(2, xStep * 0.55);

  const px = (i: number) => marginLeft + i * xStep + xStep / 2;
  const py = (v: number) => marginTop + innerH - ((v - lo) / (hi - lo)) * innerH;
  const pvy = (v: number) => marginTop + innerH + 8 + volHeight - (v / maxVol) * volHeight;

  // MA20
  const ma20: (number | null)[] = data.map((_, i) => {
    if (i < 19) return null;
    const slice = data.slice(i - 19, i + 1);
    return slice.reduce((sum, d) => sum + d.close, 0) / 20;
  });

  // MA50
  const ma50: (number | null)[] = data.map((_, i) => {
    if (i < 49) return null;
    const slice = data.slice(i - 49, i + 1);
    return slice.reduce((sum, d) => sum + d.close, 0) / 50;
  });

  const yTicks = 5;
  const lastClose = data[data.length - 1].close;
  const firstClose = data[0].close;
  const overallChange = ((lastClose - firstClose) / firstClose) * 100;

  // Label spacing: show max 8 labels
  const labelStep = Math.max(1, Math.floor(data.length / 8));

  return (
    <svg width={width} height={height} style={{ display: "block", overflow: "visible" }}>
      {/* Y-axis grid lines and labels */}
      {Array.from({ length: yTicks }).map((_, i) => {
        const v = lo + ((hi - lo) * i) / (yTicks - 1);
        const y = py(v);
        return (
          <g key={`ytick-${i}`}>
            <line x1={marginLeft} x2={marginLeft + innerW} y1={y} y2={y}
              stroke="var(--bt-border-a16)" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={marginLeft - 5} y={y + 4} textAnchor="end"
              fill={C.muted} fontSize="8" fontFamily="'Inter', monospace">
              {v.toFixed(1)}
            </text>
          </g>
        );
      })}

      {/* Volume bars */}
      {data.map((d, i) => {
        const x = px(i);
        const isUp = d.close >= d.open;
        const barTop = pvy(d.volume);
        const barBot = marginTop + innerH + 8 + volHeight;
        return (
          <rect key={`vol-${i}`}
            x={x - candleW / 2}
            y={barTop}
            width={candleW}
            height={barBot - barTop}
            fill={isUp ? "rgba(16,200,122,0.35)" : "rgba(244,56,96,0.3)"}
            rx={0.5}
          />
        );
      })}

      {/* MA50 line */}
      {data.length >= 50 && (() => {
        const pts = data.map((_, i) => {
          const v = ma50[i];
          if (v === null) return null;
          return `${px(i).toFixed(1)},${py(v).toFixed(1)}`;
        }).filter(Boolean);
        if (pts.length < 2) return null;
        return (
          <polyline
            points={pts.join(" ")}
            fill="none"
            stroke={C.orange}
            strokeWidth={1}
            opacity={0.7}
            strokeDasharray="4,2"
          />
        );
      })()}

      {/* MA20 line */}
      {data.length >= 20 && (() => {
        const pts = data.map((_, i) => {
          const v = ma20[i];
          if (v === null) return null;
          return `${px(i).toFixed(1)},${py(v).toFixed(1)}`;
        }).filter(Boolean);
        if (pts.length < 2) return null;
        return (
          <polyline
            points={pts.join(" ")}
            fill="none"
            stroke={accentColor}
            strokeWidth={1}
            opacity={0.7}
          />
        );
      })()}

      {/* Candlesticks */}
      {data.map((d, i) => {
        const x = px(i);
        const isUp = d.close >= d.open;
        const color = isUp ? C.green : C.red;
        const bodyTop = py(Math.max(d.open, d.close));
        const bodyBot = py(Math.min(d.open, d.close));
        const bodyH = Math.max(1, bodyBot - bodyTop);

        return (
          <g key={`candle-${i}`}>
            {/* Wick */}
            <line
              x1={x} x2={x}
              y1={py(d.high)} y2={py(d.low)}
              stroke={color} strokeWidth={1} opacity={0.8}
            />
            {/* Body */}
            <rect
              x={x - candleW / 2}
              y={bodyTop}
              width={candleW}
              height={bodyH}
              fill={isUp ? "rgba(16,200,122,0.7)" : "rgba(244,56,96,0.7)"}
              stroke={color}
              strokeWidth={0.5}
              rx={0.5}
            />
          </g>
        );
      })}

      {/* Last price line */}
      <line
        x1={marginLeft} x2={marginLeft + innerW}
        y1={py(lastClose)} y2={py(lastClose)}
        stroke={overallChange >= 0 ? C.green : C.red}
        strokeWidth={0.8}
        strokeDasharray="4,3"
        opacity={0.6}
      />
      <rect
        x={marginLeft + innerW + 2}
        y={py(lastClose) - 7}
        width={48}
        height={14}
        rx={3}
        fill={overallChange >= 0 ? "rgba(16,200,122,0.2)" : "rgba(244,56,96,0.2)"}
        stroke={overallChange >= 0 ? C.green : C.red}
        strokeWidth={0.5}
      />
      <text
        x={marginLeft + innerW + 26}
        y={py(lastClose) + 4}
        textAnchor="middle"
        fill={overallChange >= 0 ? C.green : C.red}
        fontSize="8.5"
        fontWeight="700"
        fontFamily="'Inter', monospace"
      >
        {lastClose.toFixed(2)}
      </text>

      {/* X-axis labels */}
      {data.map((d, i) => {
        if (i % labelStep !== 0) return null;
        return (
          <text
            key={`xlabel-${i}`}
            x={px(i)}
            y={marginTop + innerH + 8 + volHeight + 14}
            textAnchor="middle"
            fill={C.muted}
            fontSize="7.5"
            fontFamily="'Inter', system-ui"
          >
            {d.date}
          </text>
        );
      })}

      {/* Volume label */}
      <text
        x={marginLeft - 5}
        y={marginTop + innerH + 8 + volHeight / 2}
        textAnchor="end"
        fill={C.muted}
        fontSize="7"
        fontFamily="'Inter', system-ui"
        transform={`rotate(-90, ${marginLeft - 5}, ${marginTop + innerH + 8 + volHeight / 2})`}
      >
        VOL
      </text>
    </svg>
  );
}

export function CandlestickWidget() {
  const C = useThemeColors();
  const [period, setPeriod] = useState<Period>("3M");
  const [secIdx, setSecIdx] = useState(0);

  const sec = SECURITIES[secIdx];
  const data = generateData(period);
  const lastClose = data[data.length - 1].close;
  const firstClose = data[0].close;
  const overallChange = ((lastClose - firstClose) / firstClose) * 100;
  const lastCandle = data[data.length - 1];

  const PERIODS: Period[] = ["1S", "1M", "3M", "6M", "1A"];

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
          padding: "7px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "var(--bt-overlay-40)",
          flexShrink: 0,
          gap: 8,
        }}
      >
        <div style={{ width: 3, height: 14, borderRadius: 2, background: sec.color, flexShrink: 0 }} />
        <Activity size={11} color={sec.color} />

        {/* Security selector */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              background: "var(--bt-overlay-50)",
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              padding: "3px 8px",
              color: C.text,
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {sec.code}
            <ChevronDown size={10} color={C.muted} />
          </button>
        </div>

        <span style={{ fontSize: 11, color: C.muted }}>{sec.name}</span>

        {/* Price + change */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginLeft: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>
            {lastClose.toFixed(2)}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            {overallChange >= 0 ? (
              <TrendingUp size={12} color={C.green} />
            ) : (
              <TrendingDown size={12} color={C.red} />
            )}
            <span style={{ fontSize: 14, fontWeight: 700, color: overallChange >= 0 ? C.green : C.red, fontVariantNumeric: "tabular-nums" }}>
              {overallChange >= 0 ? "+" : ""}{overallChange.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* OHLC strip */}
        <div style={{ display: "flex", gap: 10, marginLeft: 8, borderLeft: `1px solid ${C.border}`, paddingLeft: 10 }}>
          {[
            { label: "O", value: lastCandle.open.toFixed(2), color: C.dim },
            { label: "H", value: lastCandle.high.toFixed(2), color: C.green },
            { label: "L", value: lastCandle.low.toFixed(2), color: C.red },
            { label: "C", value: lastCandle.close.toFixed(2), color: C.text },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", gap: 3, alignItems: "baseline" }}>
              <span style={{ fontSize: 10, color: C.muted, fontWeight: 700 }}>{item.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: item.color, fontVariantNumeric: "tabular-nums" }}>{item.value}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* MA legend */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", borderRight: `1px solid ${C.border}`, paddingRight: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 16, height: 1.5, background: sec.color }} />
            <span style={{ fontSize: 10, color: C.muted }}>MM20</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 16, height: 1.5, background: C.orange, borderTop: "1px dashed" }} />
            <span style={{ fontSize: 10, color: C.muted }}>MM50</span>
          </div>
        </div>

        {/* Period selector */}
        <div style={{ display: "flex", gap: 3 }}>
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: "3px 8px",
                borderRadius: 3,
                border: `1px solid ${period === p ? sec.color + "50" : C.border}`,
                background: period === p ? sec.color + "15" : "transparent",
                color: period === p ? sec.color : C.muted,
                fontSize: 11.5,
                fontWeight: period === p ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <span style={{ fontSize: 10, color: C.muted, borderLeft: `1px solid ${C.border}`, paddingLeft: 8 }}>
          BRVM · Cours XOF
        </span>
      </div>

      {/* Chart area */}
      <div style={{ flex: 1, overflow: "hidden", padding: "6px 4px 0" }}>
        <div style={{ width: "100%", height: "100%" }}>
          <ChartContainer data={data} accentColor={sec.color} />
        </div>
      </div>

      {/* Footer: Security selector buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "5px 12px",
          borderTop: `1px solid ${C.border}`,
          background: "var(--bt-overlay-30)",
          flexShrink: 0,
          overflowX: "auto",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0 }}>
          TITRE
        </span>
        {SECURITIES.map((s, i) => (
          <button
            key={s.code}
            onClick={() => setSecIdx(i)}
            style={{
              padding: "2px 8px",
              borderRadius: 3,
              border: `1px solid ${secIdx === i ? s.color + "50" : C.border}`,
              background: secIdx === i ? s.color + "14" : "transparent",
              color: secIdx === i ? s.color : C.muted,
              fontSize: 11,
              fontWeight: secIdx === i ? 700 : 500,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {s.code}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <BarChart2 size={9} color={C.muted} />
          <span style={{ fontSize: 10, color: C.muted }}>Vol. {(lastCandle.volume / 1000).toFixed(0)}K titres</span>
        </div>
        <span style={{ fontSize: 9.5, color: C.muted }}>· Session 08 Avr 2026 · 15h30 GMT · Clôture</span>
      </div>
    </div>
  );
}

function ChartContainer({ data, accentColor }: { data: OHLCData[]; accentColor: string }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div
        ref={(el) => {
          if (el && el.getBoundingClientRect) {
            // Dynamic size is handled by the SVG viewBox approach
          }
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <svg
          viewBox={`0 0 860 200`}
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          style={{ display: "block" }}
        >
          <CandlestickChartInline data={data} accentColor={accentColor} />
        </svg>
      </div>
    </div>
  );
}

function CandlestickChartInline({ data, accentColor }: { data: OHLCData[]; accentColor: string }) {
  const C = useThemeColors();
  const width = 860;
  const height = 200;
  const marginTop = 8;
  const marginBottom = 38;
  const marginLeft = 50;
  const marginRight = 58;
  const volHeight = 32;

  const innerW = width - marginLeft - marginRight;
  const innerH = height - marginTop - marginBottom - volHeight - 6;

  const allPrices = data.flatMap((d) => [d.high, d.low]);
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const padP = (maxP - minP) * 0.1;
  const lo = minP - padP;
  const hi = maxP + padP;

  const allVols = data.map((d) => d.volume);
  const maxVol = Math.max(...allVols);

  const xStep = innerW / data.length;
  const candleW = Math.max(1.5, xStep * 0.5);

  const px = (i: number) => marginLeft + i * xStep + xStep / 2;
  const py = (v: number) => marginTop + innerH - ((v - lo) / (hi - lo)) * innerH;
  const pvy = (v: number) => marginTop + innerH + 6 + volHeight - (v / maxVol) * volHeight;

  const lastClose = data[data.length - 1].close;
  const firstClose = data[0].close;
  const overallChange = lastClose >= firstClose;

  const labelStep = Math.max(1, Math.floor(data.length / 8));

  // MA20
  const ma20Pts: string[] = [];
  for (let i = 19; i < data.length; i++) {
    const avg = data.slice(i - 19, i + 1).reduce((s, d) => s + d.close, 0) / 20;
    ma20Pts.push(`${px(i).toFixed(1)},${py(avg).toFixed(1)}`);
  }

  const yTicks = 4;

  return (
    <>
      {/* Grid */}
      {Array.from({ length: yTicks }).map((_, i) => {
        const v = lo + ((hi - lo) * i) / (yTicks - 1);
        const y = py(v);
        return (
          <g key={`yt${i}`}>
            <line x1={marginLeft} x2={marginLeft + innerW} y1={y} y2={y}
              stroke="var(--bt-border-a12)" strokeWidth="0.5" strokeDasharray="3,3" />
            <text x={marginLeft - 4} y={y + 3} textAnchor="end"
              fill={C.muted} fontSize="7.5" fontFamily="monospace">{v.toFixed(1)}</text>
          </g>
        );
      })}

      {/* Volume bars */}
      {data.map((d, i) => {
        const x = px(i);
        const isUp = d.close >= d.open;
        const barTop = pvy(d.volume);
        const barBot = marginTop + innerH + 6 + volHeight;
        return (
          <rect key={`v${i}`} x={x - candleW / 2} y={barTop} width={candleW} height={barBot - barTop}
            fill={isUp ? "rgba(16,200,122,0.28)" : "rgba(244,56,96,0.25)"} rx={0.5} />
        );
      })}

      {/* MA20 */}
      {ma20Pts.length >= 2 && (
        <polyline points={ma20Pts.join(" ")} fill="none" stroke={accentColor} strokeWidth={1.2} opacity={0.75} />
      )}

      {/* Candles */}
      {data.map((d, i) => {
        const x = px(i);
        const isUp = d.close >= d.open;
        const color = isUp ? C.green : C.red;
        const bodyTop = py(Math.max(d.open, d.close));
        const bodyBot = py(Math.min(d.open, d.close));
        const bodyH = Math.max(1, bodyBot - bodyTop);
        return (
          <g key={`c${i}`}>
            <line x1={x} x2={x} y1={py(d.high)} y2={py(d.low)} stroke={color} strokeWidth={0.8} opacity={0.8} />
            <rect x={x - candleW / 2} y={bodyTop} width={candleW} height={bodyH}
              fill={isUp ? "rgba(16,200,122,0.65)" : "rgba(244,56,96,0.65)"}
              stroke={color} strokeWidth={0.4} rx={0.5} />
          </g>
        );
      })}

      {/* Last price */}
      <line x1={marginLeft} x2={marginLeft + innerW} y1={py(lastClose)} y2={py(lastClose)}
        stroke={overallChange ? C.green : C.red} strokeWidth={0.8} strokeDasharray="3,3" opacity={0.65} />
      <rect x={marginLeft + innerW + 2} y={py(lastClose) - 7} width={52} height={14} rx={3}
        fill={overallChange ? "rgba(16,200,122,0.18)" : "rgba(244,56,96,0.18)"}
        stroke={overallChange ? C.green : C.red} strokeWidth={0.5} />
      <text x={marginLeft + innerW + 28} y={py(lastClose) + 4} textAnchor="middle"
        fill={overallChange ? C.green : C.red} fontSize="8" fontWeight="700" fontFamily="monospace">
        {lastClose.toFixed(2)}
      </text>

      {/* X labels */}
      {data.map((d, i) => {
        if (i % labelStep !== 0) return null;
        return (
          <text key={`xl${i}`} x={px(i)} y={marginTop + innerH + 6 + volHeight + 14}
            textAnchor="middle" fill={C.muted} fontSize="7" fontFamily="system-ui">
            {d.date}
          </text>
        );
      })}
    </>
  );
}
