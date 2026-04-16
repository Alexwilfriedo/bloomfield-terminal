import type { ReactNode } from "react";
import type { Layout } from "react-grid-layout";

import { LiveTicker } from "../components/terminal/LiveTicker";
import { MacroRightPanel } from "../components/macro/MacroRightPanel";
import { MacroKPIWidget } from "../components/macro/MacroKPIWidget";
import { PublicFinanceWidget } from "../components/macro/PublicFinanceWidget";
import { TradeWidget } from "../components/macro/TradeWidget";
import { MacroMarketsWidget } from "../components/macro/MacroMarketsWidget";
import { RegionalAnalysisWidget } from "../components/macro/RegionalAnalysisWidget";
import { AfricaMapWidget } from "../components/macro/AfricaMapWidget";
import { MacroHeatmapWidget } from "../components/macro/MacroHeatmapWidget";
import { WidgetGrid } from "../components/shared/WidgetGrid";

const MACRO_STORAGE_KEY = "bloomfield.macro.layout.v1";

/**
 * Macro LG layout — reproduces the original hardcoded grid:
 *   row 1 (h=4)  : KPI strip (12)
 *   row 2 (h=10) : Africa Map (6) · Macro Heatmap (6)
 *   row 3 (h=8)  : Public Finance (4) · Trade (8)
 *   row 4 (h=8)  : Macro Markets (12)
 *   row 5 (h=10) : Regional Analysis (12)
 */
const MACRO_LG_LAYOUT: Layout[] = [
  { i: "kpi",        x: 0, y: 0,  w: 12, h: 4,  minW: 8, minH: 3 },
  { i: "africaMap",  x: 0, y: 4,  w: 6,  h: 10, minW: 4, minH: 6 },
  { i: "heatmap",    x: 6, y: 4,  w: 6,  h: 10, minW: 4, minH: 6 },
  { i: "publicFin",  x: 0, y: 14, w: 4,  h: 8,  minW: 3, minH: 5 },
  { i: "trade",      x: 4, y: 14, w: 8,  h: 8,  minW: 5, minH: 5 },
  { i: "markets",    x: 0, y: 22, w: 12, h: 8,  minW: 8, minH: 5 },
  { i: "regional",   x: 0, y: 30, w: 12, h: 10, minW: 8, minH: 6 },
];

const MACRO_WIDGETS: Record<string, { element: ReactNode; title: string }> = {
  kpi:       { title: "Indicateurs Clés",          element: <MacroKPIWidget /> },
  africaMap: { title: "Carte Afrique",             element: <AfricaMapWidget /> },
  heatmap:   { title: "Heatmap Macro",             element: <MacroHeatmapWidget /> },
  publicFin: { title: "Finances Publiques",        element: <PublicFinanceWidget /> },
  trade:     { title: "Commerce Extérieur",        element: <TradeWidget /> },
  markets:   { title: "Signaux Macro-Financiers",  element: <MacroMarketsWidget /> },
  regional:  { title: "Analyse Régionale",         element: <RegionalAnalysisWidget /> },
};

export function MacroPage() {
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

      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            padding: "10px 10px 16px 12px",
            display: "flex",
            background: "var(--bt-surface-card, #000117)",
          }}
        >
          <WidgetGrid
            storageKey={MACRO_STORAGE_KEY}
            widgets={MACRO_WIDGETS}
            defaultLayout={MACRO_LG_LAYOUT}
          />
        </div>

        <MacroRightPanel />
      </div>
    </div>
  );
}
