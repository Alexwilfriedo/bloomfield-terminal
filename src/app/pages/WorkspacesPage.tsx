import { useState, type ReactNode } from "react";
import type { Layout } from "react-grid-layout";

import { WorkspaceRightPanel } from "../components/workspaces/WorkspaceRightPanel";
import { MarketMonitorWidget } from "../components/workspaces/MarketMonitorWidget";
import { MacroWatchWidget } from "../components/workspaces/MacroWatchWidget";
import { SovereignDebtWidget } from "../components/workspaces/SovereignDebtWidget";
import { AlertsPanelWidget } from "../components/workspaces/AlertsPanelWidget";
import { FlashInsightsWidget } from "../components/workspaces/FlashInsightsWidget";
import { QuickCompareWidget } from "../components/workspaces/QuickCompareWidget";
import { EventsCalendarWidget } from "../components/workspaces/EventsCalendarWidget";
import { WorkspaceLibraryWidget } from "../components/workspaces/WorkspaceLibraryWidget";
import { OrdersTrackingWidget } from "../components/workspaces/OrdersTrackingWidget";
import { ActionControlWidget } from "../components/workspaces/ActionControlWidget";
import { WatchlistWidget } from "../components/widgets/WatchlistWidget";
import { LiveTicker } from "../components/terminal/LiveTicker";
import { WidgetGrid } from "../components/shared/WidgetGrid";
import { TrendingUp, TrendingDown, Target, Zap, BarChart2 } from "lucide-react";

const C = {
  surface: "#000117",
  elevated: "#000117",
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  orange: "#fb923c",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  dark: "#000117",
  purple: "#a78bfa",
};

const WORKSPACES_STORAGE_KEY = "bloomfield.workspaces.layout.v1";

/**
 * Workspaces LG layout — reproduces the original 3-column CSS grid.
 *   row 1 (h=12) : Market Monitor (5) · Macro Watch (4) · Sovereign Debt (3)
 *   row 2 (h=10) : Watchlist (4) · Alerts (4) · Flash Insights (4)
 *   row 3 (h=10) : Quick Compare (4) · Events Calendar (4) · Portfolio Signals (4)
 *   row 4 (h=12) : Orders Tracking (8) · Action Control (4)
 *   row 5 (h=8)  : Workspace Library (12)
 */
const WORKSPACES_LG_LAYOUT: Layout[] = [
  { i: "marketMonitor",   x: 0,  y: 0,  w: 5,  h: 12, minW: 4, minH: 8 },
  { i: "macroWatch",      x: 5,  y: 0,  w: 4,  h: 12, minW: 3, minH: 8 },
  { i: "sovereignDebt",   x: 9,  y: 0,  w: 3,  h: 12, minW: 3, minH: 8 },

  { i: "watchlist",       x: 0,  y: 12, w: 4,  h: 10, minW: 3, minH: 6 },
  { i: "alerts",          x: 4,  y: 12, w: 4,  h: 10, minW: 3, minH: 6 },
  { i: "flashInsights",   x: 8,  y: 12, w: 4,  h: 10, minW: 3, minH: 6 },

  { i: "quickCompare",    x: 0,  y: 22, w: 4,  h: 10, minW: 3, minH: 6 },
  { i: "eventsCalendar",  x: 4,  y: 22, w: 4,  h: 10, minW: 3, minH: 6 },
  { i: "portfolioSignals",x: 8,  y: 22, w: 4,  h: 10, minW: 3, minH: 6 },

  { i: "ordersTracking",  x: 0,  y: 32, w: 8,  h: 12, minW: 5, minH: 8 },
  { i: "actionControl",   x: 8,  y: 32, w: 4,  h: 12, minW: 3, minH: 8 },

  { i: "workspaceLibrary",x: 0,  y: 44, w: 12, h: 8,  minW: 8, minH: 5 },
];

const WORKSPACES_WIDGETS: Record<string, { element: ReactNode; title: string }> = {
  marketMonitor:    { title: "Moniteur de Marché",     element: <MarketMonitorWidget /> },
  macroWatch:       { title: "Veille Macro",           element: <MacroWatchWidget /> },
  sovereignDebt:    { title: "Dettes Souveraines",     element: <SovereignDebtWidget /> },
  watchlist:        { title: "Watchlist",              element: <WatchlistWidget /> },
  alerts:           { title: "Alertes",                element: <AlertsPanelWidget /> },
  flashInsights:    { title: "Flash Insights",         element: <FlashInsightsWidget /> },
  quickCompare:     { title: "Comparaison Rapide",     element: <QuickCompareWidget /> },
  eventsCalendar:   { title: "Calendrier Événements",  element: <EventsCalendarWidget /> },
  portfolioSignals: { title: "Signaux Décisionnels",   element: <PortfolioSignalsWidget /> },
  ordersTracking:   { title: "Suivi des Ordres",       element: <OrdersTrackingWidget /> },
  actionControl:    { title: "Centre d'Action",        element: <ActionControlWidget /> },
  workspaceLibrary: { title: "Bibliothèque",           element: <WorkspaceLibraryWidget /> },
};

export function WorkspacesPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        background: C.dark,
      }}
    >
      <LiveTicker />

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            padding: "10px 12px 16px",
            display: "flex",
            background: C.dark,
          }}
        >
          <WidgetGrid
            storageKey={WORKSPACES_STORAGE_KEY}
            widgets={WORKSPACES_WIDGETS}
            defaultLayout={WORKSPACES_LG_LAYOUT}
          />
        </div>

        <WorkspaceRightPanel />
      </div>
    </div>
  );
}

/* ─── Portfolio Decision Signals Widget ────────────────────────────────────── */

const SIGNALS = [
  {
    ticker: "SONATEL",
    name: "Sonatel SA",
    rec: "ACHAT",
    recColor: C.green,
    target: "19 500",
    current: "16 800",
    upside: "+16.1%",
    signal: "HAUSSIER",
    signalColor: C.green,
    catalyst: "Résultats FY2025 supra-consensus",
    rsi: 65,
    flag: "🇸🇳",
    sector: "Télécom",
  },
  {
    ticker: "PALM CI",
    name: "Palmci CI",
    rec: "ACHAT",
    recColor: C.green,
    target: "9 200",
    current: "7 295",
    upside: "+26.1%",
    signal: "MOMENTUM",
    signalColor: C.accent,
    catalyst: "Boom cours cacao +42% YTD",
    rsi: 72,
    flag: "🇨🇮",
    sector: "Agricole",
  },
  {
    ticker: "SGBCI",
    name: "SocGen CI",
    rec: "ACHAT",
    recColor: C.green,
    target: "17 500",
    current: "13 750",
    upside: "+27.3%",
    signal: "ACHAT FORT",
    signalColor: C.gold,
    catalyst: "P/BV décote 18% vs pairs",
    rsi: 48,
    flag: "🇨🇮",
    sector: "Banque",
  },
  {
    ticker: "SAPH CI",
    name: "SAPH CI",
    rec: "VENDRE",
    recColor: C.red,
    target: "3 200",
    current: "4 195",
    upside: "-23.7%",
    signal: "BAISSIER",
    signalColor: C.red,
    catalyst: "Coût de production élevé, marges compressées",
    rsi: 29,
    flag: "🇨🇮",
    sector: "Agricole",
  },
  {
    ticker: "ETI",
    name: "Ecobank Transnat.",
    rec: "CONSERVER",
    recColor: C.gold,
    target: "19.50",
    current: "18.50",
    upside: "+5.4%",
    signal: "NEUTRE",
    signalColor: C.muted,
    catalyst: "Résultats mitigés selon géographie",
    rsi: 58,
    flag: "🌍",
    sector: "Banque",
  },
];

const PORTFOLIO_STATS = [
  { label: "Signaux ACHAT", value: "3", color: C.green },
  { label: "Signaux VENTE", value: "1", color: C.red },
  { label: "Upside moyen", value: "+18.4%", color: C.accent },
  { label: "Score Confiance", value: "4.1/5", color: C.gold },
];

function PortfolioSignalsWidget() {
  const [activeFilter, setActiveFilter] = useState<string>("Tous");
  const filters = ["Tous", "ACHAT", "VENDRE", "CONSERVER"];

  const filtered =
    activeFilter === "Tous"
      ? SIGNALS
      : SIGNALS.filter((s) => s.rec === activeFilter);

  return (
    <div
      style={{
        height: "100%",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 2, background: `linear-gradient(90deg, ${C.gold} 0%, ${C.accent} 60%, transparent 100%)`, flexShrink: 0 }} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.4)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.gold }} />
          <Target size={11} color={C.gold} />
          <span style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
            Signaux Décisionnels
          </span>
          <span style={{ fontSize: 7.5, color: C.muted }}>· Coverage BRVM</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Zap size={9} color={C.gold} />
          <span style={{ fontSize: 8, color: C.gold, fontWeight: 700 }}>{SIGNALS.length} titres</span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        {PORTFOLIO_STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "6px 10px",
              textAlign: "center",
              borderRight: i < 3 ? `1px solid rgba(44, 61, 127,0.2)` : "none",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800, color: stat.color, fontVariantNumeric: "tabular-nums" }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "6px 10px",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        {filters.map((f) => {
          const fColor = f === "ACHAT" ? C.green : f === "VENDRE" ? C.red : f === "CONSERVER" ? C.gold : C.accent;
          const isActive = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "2px 8px",
                borderRadius: 3,
                border: `1px solid ${isActive ? fColor + "50" : C.border}`,
                background: isActive ? fColor + "14" : "transparent",
                color: isActive ? fColor : C.muted,
                fontSize: 8.5,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        {filtered.map((sig, i) => (
          <div
            key={sig.ticker}
            style={{
              padding: "8px 10px",
              borderBottom: i < filtered.length - 1 ? `1px solid rgba(44, 61, 127,0.12)` : "none",
              cursor: "pointer",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>{sig.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>{sig.ticker}</span>
                  <span style={{ fontSize: 7.5, color: C.muted }}>{sig.sector}</span>
                </div>
                <span style={{ fontSize: 8, color: C.muted }}>{sig.name}</span>
              </div>

              <span
                style={{
                  padding: "2px 6px",
                  borderRadius: 3,
                  background: sig.recColor + "18",
                  border: `1px solid ${sig.recColor}30`,
                  fontSize: 8,
                  fontWeight: 800,
                  color: sig.recColor,
                  letterSpacing: "0.06em",
                }}
              >
                {sig.rec}
              </span>

              <span
                style={{
                  fontSize: 8.5,
                  fontWeight: 700,
                  color: sig.signalColor,
                }}
              >
                {sig.signal}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "baseline", flex: 1 }}>
                <span style={{ fontSize: 8, color: C.muted }}>Cours:</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                  {sig.current}
                </span>
                <span style={{ fontSize: 8, color: C.muted }}>Obj:</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums" }}>
                  {sig.target} XOF
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                {sig.upside.startsWith("+") ? (
                  <TrendingUp size={9} color={C.green} />
                ) : (
                  <TrendingDown size={9} color={C.red} />
                )}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: sig.upside.startsWith("+") ? C.green : C.red,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {sig.upside}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
              <Zap size={8} color={C.muted} />
              <span style={{ fontSize: 8, color: C.dim, fontStyle: "italic" }}>{sig.catalyst}</span>
              <div style={{ flex: 1 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <span style={{ fontSize: 7.5, color: C.muted }}>RSI</span>
                <div style={{ width: 32, height: 3, background: "rgba(44, 61, 127,0.2)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${sig.rsi}%`,
                      background: sig.rsi >= 70 ? C.red : sig.rsi <= 30 ? C.green : C.gold,
                      borderRadius: 2,
                    }}
                  />
                </div>
                <span style={{ fontSize: 7.5, fontWeight: 700, color: sig.rsi >= 70 ? C.red : sig.rsi <= 30 ? C.green : C.gold }}>
                  {sig.rsi}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "5px 10px",
          borderTop: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <BarChart2 size={9} color={C.muted} />
        <span style={{ fontSize: 7.5, color: C.muted }}>
          Bloomfield Intelligence Research · Coverage BRVM · Mis à jour 08 Avr 2026
        </span>
      </div>
    </div>
  );
}

export default WorkspacesPage;
