import { useState } from "react";
import { AnalysisRightPanel } from "../components/analysis/AnalysisRightPanel";
import { CompanySnapshotCard } from "../components/analysis/CompanySnapshotCard";
import { FinancialKPICards } from "../components/analysis/FinancialKPICards";
import { FinancialStatementsWidget } from "../components/analysis/FinancialStatementsWidget";
import { RatiosWidget } from "../components/analysis/RatiosWidget";
import { SectorBenchmarkWidget } from "../components/analysis/SectorBenchmarkWidget";
import { ScenarioStressWidget } from "../components/analysis/ScenarioStressWidget";
import { OverviewCharts } from "../components/analysis/OverviewCharts";
import { ReportSummaryWidget } from "../components/analysis/ReportSummaryWidget";
import { LiveTicker } from "../components/terminal/LiveTicker";
import { useTerminal } from "../context/TerminalContext";
import {
  LayoutDashboard,
  FileBarChart2,
  PieChart,
  BarChart2,
  Zap,
  FileText,
  ShoppingCart,
  Bot,
  TrendingUp,
  AlertTriangle,
  Target,
} from "lucide-react";

const C = {
  surface: "#000117",
  accent: "#d6b68d",
  border: "rgba(44, 61, 127,0.32)",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  dark: "#000117",
  purple: "#a78bfa",
};

const TABS = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "statements", label: "États Financiers", icon: FileBarChart2 },
  { id: "ratios", label: "Ratios", icon: PieChart },
  { id: "benchmark", label: "Benchmark Sectoriel", icon: BarChart2 },
  { id: "scenarios", label: "Scénarios & Stress Tests", icon: Zap },
  { id: "report", label: "Bilan de Rapport", icon: FileText },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function AnalysisPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const { openOrderPanel, openAIPanel } = useTerminal();

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
      {/* Live ticker */}
      <LiveTicker />

      {/* Content row */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Main workspace */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
          {/* Secondary tab bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 40,
              background: C.surface,
              borderBottom: `1px solid ${C.border}`,
              padding: "0 14px",
              gap: 0,
              flexShrink: 0,
              overflowX: "auto",
            }}
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              const isReport = tab.id === "report";
              const activeColor = C.gold;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "0 14px",
                    height: "100%",
                    background: "transparent",
                    border: "none",
                    borderBottom: `2px solid ${isActive ? activeColor : "transparent"}`,
                    color: isActive ? activeColor : C.muted,
                    fontSize: 10.5,
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                    marginBottom: -1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = C.dim;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color = C.muted;
                    }
                  }}
                >
                  <Icon size={12} strokeWidth={1.8} />
                  {tab.label}
                  {isReport && (
                    <span
                      style={{
                        fontSize: 7,
                        fontWeight: 800,
                        color: "#000117",
                        background: C.gold,
                        borderRadius: 3,
                        padding: "1px 4px",
                        letterSpacing: "0.04em",
                        marginLeft: 2,
                      }}
                    >
                      PDF
                    </span>
                  )}
                </button>
              );
            })}

            <div style={{ flex: 1 }} />

            {/* AI Analyst shortcut */}
            <button
              onClick={() => openAIPanel("Synthèse investissement SGBCI")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px",
                borderRadius: 4,
                border: "1px solid rgba(167,139,250,0.3)",
                background: "rgba(167,139,250,0.08)",
                color: C.purple,
                fontSize: 9,
                fontWeight: 700,
                cursor: "pointer",
                marginRight: 6,
                whiteSpace: "nowrap",
              }}
            >
              <Bot size={10} />
              IA Analyst
            </button>

            {/* Order CTA */}
            <button
              onClick={() => openOrderPanel({ assetCode: "SGBCI", assetName: "SocGen Banques CI", market: "BRVM" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 12px",
                borderRadius: 4,
                border: "none",
                background: `linear-gradient(90deg, ${C.green} 0%, #0aa560 100%)`,
                color: "#fff",
                fontSize: 9,
                fontWeight: 800,
                cursor: "pointer",
                marginRight: 8,
                whiteSpace: "nowrap",
                letterSpacing: "0.03em",
              }}
            >
              <ShoppingCart size={10} />
              Initier un Ordre
            </button>

            {/* Context badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 4,
                background: "rgba(244,185,66,0.08)",
                border: "1px solid rgba(244,185,66,0.2)",
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 700, color: C.gold }}>SGBCI</span>
              <span style={{ fontSize: 7.5, color: C.muted }}>· FY2023 · BRVM</span>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.gold, opacity: 0.8, marginLeft: 2 }} />
            </div>
          </div>

          {/* Scrollable content */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "10px 12px 16px",
              minHeight: 0,
              background: C.dark,
            }}
          >
            {activeTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* Company snapshot */}
                <CompanySnapshotCard />

                {/* Decision interpretation panel */}
                <InvestmentInterpretationPanel />

                {/* KPI cards */}
                <FinancialKPICards />

                {/* Charts row - fixed height */}
                <div style={{ height: 220 }}>
                  <OverviewCharts />
                </div>
              </div>
            )}

            {activeTab === "statements" && (
              <div style={{ height: "calc(100vh - 220px)", minHeight: 480 }}>
                <FinancialStatementsWidget />
              </div>
            )}

            {activeTab === "ratios" && (
              <div style={{ height: "calc(100vh - 220px)", minHeight: 500 }}>
                <RatiosWidget />
              </div>
            )}

            {activeTab === "benchmark" && (
              <div style={{ height: "calc(100vh - 220px)", minHeight: 500 }}>
                <SectorBenchmarkWidget />
              </div>
            )}

            {activeTab === "scenarios" && (
              <div style={{ height: "calc(100vh - 220px)", minHeight: 560 }}>
                <ScenarioStressWidget />
              </div>
            )}

            {activeTab === "report" && (
              <div style={{ height: "calc(100vh - 200px)", minHeight: 640 }}>
                <ReportSummaryWidget />
              </div>
            )}
          </div>
        </div>

        {/* Right panel */}
        <AnalysisRightPanel />
      </div>
    </div>
  );
}

/* ─── Investment Interpretation Panel ─────────────────────────────────────── */
function InvestmentInterpretationPanel() {
  const { openOrderPanel, openAIPanel } = useTerminal();

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.gold}`,
        borderRadius: 7,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 1, 23,0.4)",
        }}
      >
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 3,
            background: "rgba(16,200,122,0.15)",
            border: "1px solid rgba(16,200,122,0.3)",
            fontSize: 9,
            fontWeight: 800,
            color: "#10c87a",
            letterSpacing: "0.08em",
          }}
        >
          ACHAT
        </span>
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 3,
            background: "rgba(244,185,66,0.1)",
            border: "1px solid rgba(244,185,66,0.3)",
            fontSize: 9,
            fontWeight: 700,
            color: C.gold,
            letterSpacing: "0.06em",
          }}
        >
          OBJECTIF : 17 500 XOF
        </span>
        <span style={{ fontSize: 9, color: "#10c87a", fontWeight: 700 }}>Potentiel +27,3%</span>
        <div style={{ width: 1, height: 14, background: C.border }} />
        <span style={{ fontSize: 8.5, fontWeight: 700, color: C.dim, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Interprétation Décisionnelle
        </span>
        <span style={{ fontSize: 7.5, color: C.muted }}>· Bloomfield Intelligence · 08 Avr 2026</span>

        <div style={{ flex: 1 }} />

        {/* Action buttons */}
        <button
          onClick={() => openAIPanel("Synthèse investissement SGBCI")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 9px",
            borderRadius: 4,
            border: "1px solid rgba(167,139,250,0.3)",
            background: "rgba(167,139,250,0.08)",
            color: "#a78bfa",
            fontSize: 8.5,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Bot size={9} />
          Analyse IA
        </button>
        <button
          onClick={() => openOrderPanel({ assetCode: "SGBCI", assetName: "SocGen Banques CI", market: "BRVM" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 10px",
            borderRadius: 4,
            border: "none",
            background: `linear-gradient(90deg, ${C.green} 0%, #0aa560 100%)`,
            color: "#fff",
            fontSize: 8.5,
            fontWeight: 800,
            cursor: "pointer",
            letterSpacing: "0.03em",
          }}
        >
          <ShoppingCart size={9} />
          Préparer Ordre ACHAT
        </button>
      </div>

      {/* Content row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          padding: "10px 14px",
          gap: 12,
        }}
      >
        {/* Thesis */}
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
            Thèse d'Investissement
          </div>
          <p style={{ margin: 0, fontSize: 9.5, color: C.dim, lineHeight: 1.5 }}>
            SGBCI affiche une dynamique de résultats en accélération portée par la hausse des marges d'intérêt dans un contexte de taux BCEAO accommodant, et une amélioration structurelle du coût du risque. Le titre se traite avec une décote significative de 18% par rapport à ses pairs régionaux.
          </p>
          {/* Impact attendu */}
          <div
            style={{
              marginTop: 8,
              padding: "6px 8px",
              background: "rgba(214, 182, 141,0.06)",
              border: "1px solid rgba(214, 182, 141,0.18)",
              borderRadius: 4,
            }}
          >
            <div style={{ fontSize: 7.5, fontWeight: 700, color: C.accent, letterSpacing: "0.05em", marginBottom: 3 }}>
              IMPACT ATTENDU
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { label: "Catalyseur", val: "Résultats T1 2026 · 28 Avr" },
                { label: "Actifs concernés", val: "SGBCI · Banques BRVM" },
                { label: "Pays", val: "🇨🇮 Côte d'Ivoire · Zone UEMOA" },
              ].map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 6 }}>
                  <span style={{ fontSize: 7.5, color: C.muted, minWidth: 80 }}>{item.label}</span>
                  <span style={{ fontSize: 7.5, color: C.dim }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key signals */}
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
            Signaux Clés
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              { label: "ROE 2023", value: "18,3%", status: "green", note: "> seuil 15%" },
              { label: "P/BV implicite", value: "0,92x", status: "green", note: "vs pairs 1,12x" },
              { label: "Couverture créances douteuses", value: "94,5%", status: "green", note: "Confortable" },
              { label: "Dividende YTD", value: "6,0%", status: "gold", note: "Sectoriel" },
            ].map((sig) => (
              <div
                key={sig.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 7px",
                  background: "rgba(0, 1, 23,0.4)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: sig.status === "green" ? "#10c87a" : C.gold,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 8.5, color: C.muted, flex: 1 }}>{sig.label}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: sig.status === "green" ? "#10c87a" : C.gold, fontVariantNumeric: "tabular-nums" }}>
                  {sig.value}
                </span>
                <span style={{ fontSize: 7.5, color: C.muted }}>{sig.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decision matrix */}
        <div>
          <div style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
            Matrice Décision
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {[
              { label: "Attractivité Valorisation", score: 4, max: 5 },
              { label: "Solidité Bilan", score: 5, max: 5 },
              { label: "Dynamique Résultats", score: 4, max: 5 },
              { label: "Liquidité Titre", score: 3, max: 5 },
              { label: "Gestion Risques", score: 4, max: 5 },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 8, color: C.muted }}>{item.label}</span>
                  <span style={{ fontSize: 8, fontWeight: 700, color: C.gold }}>{item.score}/{item.max}</span>
                </div>
                <div style={{ height: 4, background: "rgba(44, 61, 127,0.2)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(item.score / item.max) * 100}%`,
                      background: item.score >= 4 ? "#10c87a" : C.gold,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 8,
              padding: "5px 8px",
              borderRadius: 4,
              background: "rgba(16,200,122,0.08)",
              border: "1px solid rgba(16,200,122,0.2)",
              fontSize: 9,
              fontWeight: 700,
              color: "#10c87a",
              textAlign: "center",
            }}
          >
            Score Global : 4,0 / 5,0 · CONVICTION FORTE
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;