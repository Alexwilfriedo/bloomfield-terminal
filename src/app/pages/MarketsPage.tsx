import type { ReactNode } from "react";
import type { Layout } from "react-grid-layout";

import { LiveTicker } from "../components/terminal/LiveTicker";
import { RightPanel } from "../components/markets/RightPanel";
import { MarketScannerWidget } from "../components/markets/MarketScannerWidget";
import { CandlestickWidget } from "../components/markets/CandlestickWidget";
import { InternationalMarketsWidget } from "../components/markets/InternationalMarketsWidget";
import { BRVMWidget } from "../components/widgets/BRVMWidget";
import { HeatmapWidget } from "../components/widgets/HeatmapWidget";
import { TopMoversWidget } from "../components/widgets/TopMoversWidget";
import { SovereignYieldsWidget } from "../components/widgets/SovereignYieldsWidget";
import { FXWidget, CommoditiesWidget } from "../components/widgets/FXCommoditiesWidget";
import { WidgetGrid } from "../components/shared/WidgetGrid";
import { useTerminal } from "../context/TerminalContext";
import {
  ShoppingCart,
  Bot,
  Zap,
  AlertTriangle,
  Target,
  Shield,
} from "lucide-react";

const C = {
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  orange: "#fb923c",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  surface: "#000117",
  dark: "#000117",
};

const MARKETS_STORAGE_KEY = "bloomfield.markets.layout.v1";

/**
 * Markets LG layout — reproduces the original hardcoded grid:
 *   row 1 (h=8)  : BRVM (3) · Heatmap (6) · Top Movers (3)
 *   row 2 (h=7)  : Candlestick (9) · Sovereign Yields (3)
 *   row 3 (h=7)  : FX (3) · Commodities (9)
 *   row 4 (h=10) : Market Scanner (12)
 */
const MARKETS_LG_LAYOUT: Layout[] = [
  { i: "brvm",        x: 0, y: 0,  w: 3, h: 8, minW: 3, minH: 5 },
  { i: "heatmap",     x: 3, y: 0,  w: 6, h: 8, minW: 4, minH: 5 },
  { i: "topMovers",   x: 9, y: 0,  w: 3, h: 8, minW: 3, minH: 5 },

  { i: "candlestick", x: 0, y: 8,  w: 9, h: 7, minW: 6, minH: 5 },
  { i: "sovereign",   x: 9, y: 8,  w: 3, h: 7, minW: 3, minH: 5 },

  { i: "fx",          x: 0, y: 15, w: 3, h: 7, minW: 2, minH: 4 },
  { i: "commodities", x: 3, y: 15, w: 9, h: 7, minW: 5, minH: 4 },

  { i: "scanner",     x: 0, y: 22, w: 12, h: 10, minW: 8, minH: 6 },
];

const MARKETS_WIDGETS: Record<string, { element: ReactNode; title: string }> = {
  brvm:        { title: "Indices BRVM",             element: <BRVMWidget /> },
  heatmap:     { title: "Performance Sectorielle",  element: <HeatmapWidget /> },
  topMovers:   { title: "Top Mouvements",           element: <TopMoversWidget /> },
  candlestick: { title: "Graphique Bougies",        element: <CandlestickWidget /> },
  sovereign:   { title: "Dettes Souveraines UEMOA", element: <SovereignYieldsWidget /> },
  fx:          { title: "Taux de Change",           element: <FXWidget /> },
  commodities: { title: "Matières Premières",       element: <CommoditiesWidget /> },
  scanner:     { title: "Scanner de Marché",        element: <MarketScannerWidget /> },
};

function MarketsActionBar() {
  const { openOrderPanel, openAIPanel } = useTerminal();

  const DECISION_BLOCKS = [
    {
      icon: <Zap size={9} />,
      color: C.gold,
      label: "Signal du Jour",
      value: "PALM CI +7.35%",
      detail: "RSI 72 · Momentum HAUSSIER",
      bg: "rgba(244,185,66,0.07)",
      border: "rgba(244,185,66,0.22)",
    },
    {
      icon: <Target size={9} />,
      color: C.green,
      label: "Opportunité Détectée",
      value: "SGBCI · Décote 18%",
      detail: "P/BV 0.92x · Cible +27.3%",
      bg: "rgba(16,200,122,0.07)",
      border: "rgba(16,200,122,0.22)",
    },
    {
      icon: <AlertTriangle size={9} />,
      color: C.orange,
      label: "Zone de Vigilance",
      value: "SAPH CI -3.42%",
      detail: "RSI 29 · Pression marges",
      bg: "rgba(251,146,60,0.07)",
      border: "rgba(251,146,60,0.22)",
    },
    {
      icon: <Shield size={9} />,
      color: C.accent,
      label: "Souverains UEMOA",
      value: "OAT CIV 6.89%",
      detail: "Fenêtre d'entrée favorable",
      bg: "rgba(214, 182, 141,0.06)",
      border: "rgba(214, 182, 141,0.2)",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 12px",
        background: "rgba(0, 1, 23,0.6)",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
        overflowX: "auto",
      }}
    >
      {DECISION_BLOCKS.map((block) => (
        <div
          key={block.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "5px 10px",
            background: block.bg,
            border: `1px solid ${block.border}`,
            borderRadius: 5,
            flexShrink: 0,
            cursor: "pointer",
            transition: "opacity 0.1s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <span style={{ color: block.color }}>{block.icon}</span>
          <div>
            <div style={{ fontSize: 7.5, color: block.color, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {block.label}
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text, marginTop: 1 }}>
              {block.value}
            </div>
            <div style={{ fontSize: 7.5, color: C.muted }}>{block.detail}</div>
          </div>
        </div>
      ))}

      <div style={{ flex: 1 }} />

      <button
        onClick={() => openAIPanel("Résumer la situation BRVM aujourd'hui")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "6px 12px",
          borderRadius: 5,
          border: "1px solid rgba(167,139,250,0.3)",
          background: "rgba(167,139,250,0.08)",
          color: "#a78bfa",
          fontSize: 9.5,
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.02em",
          flexShrink: 0,
          transition: "all 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(167,139,250,0.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(167,139,250,0.08)")}
      >
        <Bot size={11} />
        IA Marché
      </button>
      <button
        onClick={() => openOrderPanel()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "6px 14px",
          borderRadius: 5,
          border: "none",
          background: `linear-gradient(90deg, ${C.accent} 0%, #d6b68d 100%)`,
          color: "#fff",
          fontSize: 9.5,
          fontWeight: 800,
          cursor: "pointer",
          letterSpacing: "0.04em",
          flexShrink: 0,
          transition: "opacity 0.15s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <ShoppingCart size={11} />
        Passer un Ordre
      </button>
    </div>
  );
}

export function MarketsPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <LiveTicker />
      <MarketsActionBar />

      {/* Content row: main grid + right panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* Main column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            minHeight: 0,
            background: "#000117",
          }}
        >
          {/* International markets strip — fixed above the grid */}
          <div
            style={{
              padding: "10px 12px 0",
              flexShrink: 0,
            }}
          >
            <InternationalMarketsWidget />
          </div>

          {/* Draggable / resizable widget grid */}
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
              padding: "8px 10px 14px 12px",
              display: "flex",
            }}
          >
            <WidgetGrid
              storageKey={MARKETS_STORAGE_KEY}
              widgets={MARKETS_WIDGETS}
              defaultLayout={MARKETS_LG_LAYOUT}
            />
          </div>
        </div>

        <RightPanel />
      </div>
    </div>
  );
}
