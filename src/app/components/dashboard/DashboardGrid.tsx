import type { ReactNode } from "react";
import type { Layout } from "react-grid-layout";

import { WidgetGrid, resetWidgetGridLayout } from "../shared/WidgetGrid";

import { BRVMWidget } from "../widgets/BRVMWidget";
import { TopMoversWidget } from "../widgets/TopMoversWidget";
import { HeatmapWidget } from "../widgets/HeatmapWidget";
import { MacroWidget } from "../widgets/MacroWidget";
import { FXWidget, CommoditiesWidget } from "../widgets/FXCommoditiesWidget";
import { SovereignYieldsWidget } from "../widgets/SovereignYieldsWidget";
import { NewsWidget } from "../widgets/NewsWidget";
import { WatchlistWidget } from "../widgets/WatchlistWidget";
import { ComparisonWidget } from "../widgets/ComparisonWidget";
import { SentimentWidget } from "../widgets/SentimentWidget";

const STORAGE_KEY = "bloomfield.dashboard.layout.v7";

/**
 * Default large-screen layout — mirrors the Figma Cockpit Principal PDF:
 *   row 1 (h=10) : Indices BRVM (3) · Performance Sectorielle (6) · Top Mouvements (3)
 *   row 2 (h=7)  : Taux de Change (3) · Matières Premières (3) · Tableau Macro (4) · Comparaison (2)
 *   row 3 (h=7)  : Dettes Souveraines UEMOA (8) · Watchlist (4)
 *   row 4 (h=9)  : Sentiment & Signaux (6) · Flash Info & Actualités (6)
 *
 * Row 1 uses h=10 — tuned after the +2px font bump (commit 4df1ecdb).
 */
const LG_LAYOUT: Layout[] = [
  { i: "brvm",        x: 0,  y: 0,  w: 3, h: 10, minW: 3, minH: 7 },
  { i: "heatmap",     x: 3,  y: 0,  w: 6, h: 10, minW: 4, minH: 7 },
  { i: "topMovers",   x: 9,  y: 0,  w: 3, h: 10, minW: 3, minH: 7 },

  { i: "fx",          x: 0,  y: 10, w: 3, h: 7, minW: 2, minH: 4 },
  { i: "commodities", x: 3,  y: 10, w: 3, h: 7, minW: 2, minH: 4 },
  { i: "macro",       x: 6,  y: 10, w: 4, h: 7, minW: 3, minH: 4 },
  { i: "comparison",  x: 10, y: 10, w: 2, h: 7, minW: 2, minH: 4 },

  { i: "sovereign",   x: 0,  y: 17, w: 8, h: 7, minW: 5, minH: 4 },
  { i: "watchlist",   x: 8,  y: 17, w: 4, h: 7, minW: 3, minH: 4 },

  { i: "sentiment",   x: 0,  y: 24, w: 6, h: 9, minW: 5, minH: 7 },
  { i: "news",        x: 6,  y: 24, w: 6, h: 9, minW: 4, minH: 4 },
];

const WIDGETS: Record<string, { element: ReactNode; title: string }> = {
  brvm:        { title: "Indices BRVM",             element: <BRVMWidget /> },
  heatmap:     { title: "Performance Sectorielle",  element: <HeatmapWidget /> },
  topMovers:   { title: "Top Mouvements",           element: <TopMoversWidget /> },
  fx:          { title: "Taux de Change",           element: <FXWidget /> },
  commodities: { title: "Matières Premières",       element: <CommoditiesWidget /> },
  macro:       { title: "Tableau de Bord Macro",    element: <MacroWidget /> },
  comparison:  { title: "Comparaison Rapide",       element: <ComparisonWidget /> },
  sovereign:   { title: "Dettes Souveraines UEMOA", element: <SovereignYieldsWidget /> },
  watchlist:   { title: "Watchlist",                element: <WatchlistWidget /> },
  sentiment:   { title: "Sentiment & Signaux",      element: <SentimentWidget /> },
  news:        { title: "Flash Info & Actualités",  element: <NewsWidget /> },
};

export function DashboardGrid() {
  return (
    <WidgetGrid
      storageKey={STORAGE_KEY}
      widgets={WIDGETS}
      defaultLayout={LG_LAYOUT}
    />
  );
}

export function resetDashboardLayout() {
  resetWidgetGridLayout(STORAGE_KEY);
}
