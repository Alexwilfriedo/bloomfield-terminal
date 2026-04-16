import { useState } from "react";
import { InsightsRightPanel } from "../components/insights/InsightsRightPanel";
import { HeroEditorialBanner } from "../components/insights/HeroEditorialBanner";
import { FlashNewsFeed } from "../components/insights/FlashNewsFeed";
import { VideoSection } from "../components/insights/VideoSection";
import { ResearchNotesSection } from "../components/insights/ResearchNotesSection";
import { ReportsSection } from "../components/insights/ReportsSection";
import { EducationSection } from "../components/insights/EducationSection";
import { ZoomableSection } from "../components/insights/ZoomableSection";
import { LiveTicker } from "../components/terminal/LiveTicker";
import { useThemeColors } from "../hooks/useThemeColors";
import {
  Newspaper,
  TrendingUp,
  Globe2,
  Tv2,
  FileText,
  GraduationCap,
} from "lucide-react";

const TABS = [
  { id: "top-stories", label: "À La Une", icon: Newspaper },
  { id: "markets", label: "Marchés", icon: TrendingUp },
  { id: "macro", label: "Macro", icon: Globe2 },
  { id: "videos", label: "Vidéos", icon: Tv2 },
  { id: "reports", label: "Rapports", icon: FileText },
  { id: "education", label: "Formation", icon: GraduationCap },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function InsightsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("top-stories");
  const C = useThemeColors();

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
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
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
                    borderBottom: `2px solid ${isActive ? C.accent : "transparent"}`,
                    color: isActive ? C.accent : C.muted,
                    fontSize: 12.5,
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
                </button>
              );
            })}

            <div style={{ flex: 1 }} />

            {/* Premium badge */}
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
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: C.gold,
                  boxShadow: `0 0 5px ${C.gold}`,
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 700, color: C.gold }}>PREMIUM</span>
              <span style={{ fontSize: 9.5, color: C.muted }}>· Accès Complet</span>
            </div>
          </div>

          {/* Scrollable content */}
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "12px 14px 20px",
              minHeight: 0,
              background: C.dark,
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* TOP STORIES TAB */}
            {activeTab === "top-stories" && (
              <>
                <ZoomableSection title="Analyse Phare">
                  <HeroEditorialBanner />
                </ZoomableSection>

                {/* Two-column layout: flash news + video */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <ZoomableSection title="Flash Info">
                    <FlashNewsFeed />
                  </ZoomableSection>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <ZoomableSection title="Note de Recherche à la Une">
                      <FeaturedResearchTeaser />
                    </ZoomableSection>
                    <ZoomableSection title="Market Pulse">
                      <MarketPulseWidget />
                    </ZoomableSection>
                  </div>
                </div>

                <ZoomableSection title="Vidéos · Analyses Bloomfield">
                  <VideoSection />
                </ZoomableSection>

                <ZoomableSection title="Notes de Recherche">
                  <ResearchNotesSection />
                </ZoomableSection>
              </>
            )}

            {/* MARKETS TAB */}
            {activeTab === "markets" && (
              <>
                <ZoomableSection title="Analyse Phare">
                  <HeroEditorialBanner />
                </ZoomableSection>
                <ZoomableSection title="Flash Info">
                  <FlashNewsFeed />
                </ZoomableSection>
                <ZoomableSection title="Notes de Recherche">
                  <ResearchNotesSection />
                </ZoomableSection>
              </>
            )}

            {/* MACRO TAB */}
            {activeTab === "macro" && (
              <>
                <ZoomableSection title="Analyse Phare">
                  <HeroEditorialBanner />
                </ZoomableSection>
                <ZoomableSection title="Notes de Recherche">
                  <ResearchNotesSection />
                </ZoomableSection>
                <ZoomableSection title="Rapports">
                  <ReportsSection />
                </ZoomableSection>
              </>
            )}

            {/* VIDEOS TAB */}
            {activeTab === "videos" && (
              <>
                <ZoomableSection title="Vidéos · Analyses">
                  <VideoSection />
                </ZoomableSection>
                <ZoomableSection title="Vidéos · Formation">
                  <VideoSection />
                </ZoomableSection>
              </>
            )}

            {/* REPORTS TAB */}
            {activeTab === "reports" && (
              <>
                <ZoomableSection title="Rapports Sectoriels">
                  <ReportsSection />
                </ZoomableSection>
                <ZoomableSection title="Rapports Macro">
                  <ReportsSection />
                </ZoomableSection>
              </>
            )}

            {/* EDUCATION TAB */}
            {activeTab === "education" && (
              <>
                <ZoomableSection title="Formation">
                  <EducationSection />
                </ZoomableSection>
              </>
            )}
          </div>
        </div>

        {/* Right panel */}
        <InsightsRightPanel />
      </div>
    </div>
  );
}

/* ─── Supplementary sub-components ───────────────────────────────────────── */

function FeaturedResearchTeaser() {
  const C = useThemeColors();

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 7,
        padding: "13px 14px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, #f4b942 0%, #d6b68d 100%)",
        }}
      />
      <div style={{ paddingLeft: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
          <span
            style={{
              padding: "2px 6px",
              borderRadius: 3,
              background: "rgba(244,185,66,0.12)",
              border: "1px solid rgba(244,185,66,0.3)",
              fontSize: 10,
              fontWeight: 800,
              color: C.gold,
              letterSpacing: "0.08em",
            }}
          >
            NOTE ANALYSTE
          </span>
          <span style={{ fontSize: 10, color: C.muted }}>08 Avr 2026 · 12 min</span>
        </div>
        <h3
          style={{
            margin: "0 0 6px",
            fontSize: 15,
            fontWeight: 800,
            color: C.text,
            lineHeight: 1.3,
          }}
        >
          SONATEL : Upgrade BUY · Cible 19 500 XOF
        </h3>
        <p style={{ margin: "0 0 10px", fontSize: 12, color: C.dim, lineHeight: 1.5 }}>
          Résultats FY2025 au-dessus des attentes. ARPU données en hausse de 14%. Nous relevons la cible de cours et maintenons notre conviction constructive sur le titre.
        </p>
        <div style={{ display: "flex", gap: 6 }}>
          {["SONATEL", "Sénégal", "Télécoms", "BUY"].map((tag, i) => (
            <span
              key={tag}
              style={{
                padding: "2px 6px",
                borderRadius: 3,
                background: i === 3 ? "rgba(16,200,122,0.12)" : "var(--bt-border-a20)",
                border: `1px solid ${i === 3 ? "rgba(16,200,122,0.3)" : "var(--bt-border-a32)"}`,
                fontSize: 10,
                color: i === 3 ? "#10c87a" : C.muted,
                fontWeight: i === 3 ? 700 : 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketPulseWidget() {
  const C = useThemeColors();

  const metrics = [
    { label: "BRVM Composite", value: "284.12", change: "+0.73%", up: true },
    { label: "BRVM 10", value: "437.80", change: "+0.45%", up: true },
    { label: "Taux BCEAO", value: "3.50%", change: "→ Stable", up: null },
    { label: "XOF/USD", value: "596.42", change: "+0.12%", up: true },
    { label: "OAT CI 7Y", value: "6.89%", change: "+2bp", up: false },
    { label: "Cacao ICE", value: "8 245", change: "+2.34%", up: true },
  ];

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "var(--bt-overlay-40)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#10c87a",
            boxShadow: "0 0 6px #10c87a",
          }}
        />
        <span style={{ fontSize: 11.5, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Pouls des Marchés
        </span>
        <span style={{ fontSize: 10, color: C.muted }}>· Temps réel</span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={m.label}
            style={{
              padding: "8px 12px",
              borderRight: i % 2 === 0 ? `1px solid var(--bt-border-a16)` : "none",
              borderBottom: i < metrics.length - 2 ? `1px solid var(--bt-border-a16)` : "none",
            }}
          >
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>{m.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                {m.value}
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: m.up === null ? C.muted : m.up ? "#10c87a" : "#f43860",
                }}
              >
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsightsPage;
