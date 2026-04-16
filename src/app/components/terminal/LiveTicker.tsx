import { useEffect, useRef } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TickerItem {
  symbol: string;
  value: string;
  change: string;
  pct: string;
  up: boolean;
  category?: string;
}

const TICKER_DATA: TickerItem[] = [
  { symbol: "BRVM Composite", value: "284.12", change: "+2.06", pct: "+0.73%", up: true, category: "IDX" },
  { symbol: "BRVM 10", value: "437.80", change: "+1.96", pct: "+0.45%", up: true, category: "IDX" },
  { symbol: "BRVM Prestige", value: "158.34", change: "-0.35", pct: "-0.22%", up: false, category: "IDX" },
  { symbol: "PALM CI", value: "7 295", change: "+500", pct: "+7.35%", up: true, category: "EQ" },
  { symbol: "SONATEL", value: "16 800", change: "+835", pct: "+5.21%", up: true, category: "EQ" },
  { symbol: "BOLLORE CI", value: "3 200", change: "+150", pct: "+4.92%", up: true, category: "EQ" },
  { symbol: "SAPH", value: "4 195", change: "-149", pct: "-3.42%", up: false, category: "EQ" },
  { symbol: "XOF/USD", value: "596.42", change: "+0.71", pct: "+0.12%", up: true, category: "FX" },
  { symbol: "XOF/EUR", value: "655.96", change: "0.00", pct: "0.00%", up: true, category: "FX" },
  { symbol: "CACAO ICE", value: "8 245", change: "+188", pct: "+2.34%", up: true, category: "CMD" },
  { symbol: "OR COMEX", value: "2 347", change: "+20.6", pct: "+0.89%", up: true, category: "CMD" },
  { symbol: "PÉTROLE WTI", value: "71.84", change: "+0.80", pct: "+1.12%", up: true, category: "CMD" },
  { symbol: "CAFÉ ROBUSTA", value: "3 842", change: "-17.3", pct: "-0.45%", up: false, category: "CMD" },
  { symbol: "CI 7Y 2031", value: "6.89%", change: "+2bp", pct: "", up: false, category: "OBL" },
  { symbol: "SN 10Y 2034", value: "7.34%", change: "+3bp", pct: "", up: false, category: "OBL" },
  { symbol: "BOA CI", value: "6 850", change: "+83", pct: "+1.23%", up: true, category: "EQ" },
  { symbol: "SOLIBRA", value: "89 000", change: "-2 531", pct: "-2.78%", up: false, category: "EQ" },
  { symbol: "CIE", value: "1 580", change: "-31", pct: "-1.95%", up: false, category: "EQ" },
  { symbol: "COTON", value: "0.846", change: "-0.006", pct: "-0.67%", up: false, category: "CMD" },
  { symbol: "PIB CIV 2024", value: "+6.5%", change: "", pct: "", up: true, category: "MCR" },
];

const CATEGORY_COLORS: Record<string, string> = {
  IDX: "#d6b68d",
  EQ: "#a0c4e0",
  FX: "#f4b942",
  CMD: "#c084fc",
  OBL: "#fb923c",
  MCR: "#34d399",
};

export function LiveTicker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId: number;
    let x = 0;
    const speed = 0.5;

    const animate = () => {
      x -= speed;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(x) >= halfWidth) x = 0;
      track.style.transform = `translateX(${x}px)`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const doubled = [...TICKER_DATA, ...TICKER_DATA];

  return (
    <div
      style={{
        height: 32,
        background: "var(--bt-surface-card, #000117)",
        borderBottom: "1px solid var(--bt-border-a32)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Left fade gradient */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 60,
          height: "100%",
          background: "linear-gradient(to right, #000117, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Market status label */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: 72,
          background: "var(--bt-surface-card, #000117)",
          borderRight: "1px solid var(--bt-border-a32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          zIndex: 5,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#10c87a",
            boxShadow: "0 0 5px #10c87a",
            animation: "pulse 2s infinite",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "#10c87a",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          LIVE
        </span>
      </div>

      {/* Scrolling track */}
      <div style={{ marginLeft: 72, overflow: "hidden", flex: 1 }}>
        <div
          ref={trackRef}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {doubled.map((item, i) => (
            <TickerItem key={i} item={item} />
          ))}
        </div>
      </div>

      {/* Right fade gradient */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 40,
          height: "100%",
          background: "linear-gradient(to left, #000117, transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function TickerItem({ item }: { item: TickerItem }) {
  const catColor = CATEGORY_COLORS[item.category ?? "EQ"] ?? "#a0c4e0";
  const changeColor = item.up ? "#10c87a" : "#f43860";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "0 14px",
        borderRight: "1px solid var(--bt-border-a20)",
        height: 32,
      }}
    >
      {item.category && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: catColor,
            letterSpacing: "0.08em",
            opacity: 0.8,
          }}
        >
          {item.category}
        </span>
      )}
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#c5dff0",
          letterSpacing: "0.01em",
        }}
      >
        {item.symbol}
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#ddeaf8",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {item.value}
      </span>
      <span
        style={{
          fontSize: 12,
          color: changeColor,
          display: "flex",
          alignItems: "center",
          gap: 2,
          fontWeight: 600,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {item.pct || item.change ? (
          item.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />
        ) : null}
        {item.pct || item.change}
      </span>
    </div>
  );
}
