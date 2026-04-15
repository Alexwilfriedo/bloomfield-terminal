import { TrendingUp, TrendingDown, Globe2 } from "lucide-react";

const C = {
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  surface: "#000430",
};

interface MarketItem {
  code: string;
  name: string;
  value: string;
  change: number;
  region: string;
  color: string;
}

const MARKETS: MarketItem[] = [
  { code: "BRVM-C", name: "BRVM Composite", value: "284.12", change: +0.73, region: "Africa", color: "#d6b68d" },
  { code: "BRVM-10", name: "BRVM 10", value: "437.80", change: +0.45, region: "Africa", color: "#d6b68d" },
  { code: "NSE-ASI", name: "Nigeria NSE", value: "98 234", change: +1.12, region: "Africa", color: "#10c87a" },
  { code: "GSE-CI", name: "Ghana GSE", value: "4 128", change: -0.38, region: "Africa", color: "#10c87a" },
  { code: "NBI-20", name: "Nairobi NSE 20", value: "1 842", change: +0.62, region: "Africa", color: "#10c87a" },
  { code: "S&P 500", name: "S&P 500", value: "5 274.31", change: -0.28, region: "US", color: "#a78bfa" },
  { code: "NASDAQ", name: "Nasdaq Comp.", value: "16 482", change: -0.55, region: "US", color: "#a78bfa" },
  { code: "CAC 40", name: "CAC 40 (Paris)", value: "7 921", change: +0.34, region: "EUR", color: "#60a5fa" },
  { code: "EURO STOXX", name: "Euro Stoxx 50", value: "4 928", change: +0.18, region: "EUR", color: "#60a5fa" },
  { code: "FTSE 100", name: "FTSE 100 (London)", value: "8 125", change: -0.12, region: "EUR", color: "#60a5fa" },
  { code: "NIKKEI", name: "Nikkei 225", value: "38 420", change: +0.82, region: "ASIA", color: "#fb923c" },
  { code: "HANG SENG", name: "Hang Seng", value: "17 284", change: -1.28, region: "ASIA", color: "#fb923c" },
  { code: "XAU/USD", name: "Or / Gold", value: "3 182", change: +0.42, region: "CMD", color: "#f4b942" },
  { code: "BRENT", name: "Brent Crude", value: "74.28", change: -0.85, region: "CMD", color: "#f4b942" },
  { code: "COCOA", name: "Cacao ICE", value: "8 245", change: +2.34, region: "CMD", color: "#f4b942" },
  { code: "COFFEE", name: "Café Robusta", value: "4 128", change: +1.18, region: "CMD", color: "#f4b942" },
];

const REGION_LABELS: Record<string, string> = {
  Africa: "AFRIQUE",
  US: "AMÉRIQUES",
  EUR: "EUROPE",
  ASIA: "ASIE",
  CMD: "COMMODITÉS",
};

const REGION_COLORS: Record<string, string> = {
  Africa: "#d6b68d",
  US: "#a78bfa",
  EUR: "#60a5fa",
  ASIA: "#fb923c",
  CMD: "#f4b942",
};

export function InternationalMarketsWidget() {
  const groups = Array.from(new Set(MARKETS.map((m) => m.region)));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        borderRadius: "8px 8px 0 0",
        overflow: "hidden",
        flexShrink: 0,
        height: 58,
      }}
    >
      {/* Label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "0 12px",
          background: "rgba(0, 4, 48,0.5)",
          borderRight: `1px solid ${C.border}`,
          flexShrink: 0,
          minWidth: 88,
        }}
      >
        <Globe2 size={11} color={C.accent} />
        <div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: 1 }}>
            MARCHÉS
          </div>
          <div style={{ fontSize: 8.5, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>
            MONDIAUX
          </div>
        </div>
      </div>

      {/* Markets scroll */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          overflowX: "auto",
          gap: 0,
        }}
      >
        {groups.map((region, gi) => (
          <div key={region} style={{ display: "flex", alignItems: "stretch" }}>
            {/* Region separator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                background: `${REGION_COLORS[region]}08`,
                borderRight: `1px solid ${C.border}`,
                borderLeft: gi > 0 ? `1px solid ${C.border}` : "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  writingMode: "vertical-lr",
                  transform: "rotate(180deg)",
                  fontSize: 7,
                  fontWeight: 700,
                  color: REGION_COLORS[region],
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                {REGION_LABELS[region]}
              </div>
            </div>

            {/* Market items in this region */}
            {MARKETS.filter((m) => m.region === region).map((market, i, arr) => {
              const isUp = market.change >= 0;
              return (
                <div
                  key={market.code}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 12px",
                    borderRight: i < arr.length - 1 ? `1px solid rgba(44, 61, 127,0.15)` : "none",
                    cursor: "pointer",
                    transition: "background 0.12s",
                    minWidth: 96,
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <div style={{ fontSize: 7.5, color: C.muted, fontWeight: 600, letterSpacing: "0.03em", marginBottom: 2 }}>
                    {market.code}
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.text,
                        fontVariantNumeric: "tabular-nums",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {market.value}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    {isUp ? (
                      <TrendingUp size={8} color={C.green} />
                    ) : (
                      <TrendingDown size={8} color={C.red} />
                    )}
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: isUp ? C.green : C.red,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {isUp ? "+" : ""}
                      {market.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Live indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "0 12px",
          borderLeft: `1px solid ${C.border}`,
          flexShrink: 0,
          background: "rgba(0, 4, 48,0.3)",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.green,
            boxShadow: `0 0 6px ${C.green}`,
            animation: "pulse 2s infinite",
          }}
        />
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: C.green, letterSpacing: "0.06em" }}>EN DIRECT</div>
          <div style={{ fontSize: 7, color: C.muted }}>15:47 GMT</div>
        </div>
      </div>
    </div>
  );
}
