import { useState, Suspense, lazy, startTransition } from "react";
import { useNavigate } from "react-router";
import { LayoutDashboard, TrendingUp, Globe2, BarChart3, Lightbulb, LayoutGrid, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import logoDarkUrl from "../../assets/logo-bloomfield-terminal.png";
import logoLightUrl from "../../assets/logo-bloomfield-terminal-light.png";
import { useThemeColors } from "../hooks/useThemeColors";
import { useBloomfieldTheme } from "../context/ThemeContext";

/* Lazy-load screen components for perf */
const S1 = lazy(() => import("../components/presentation/S1_Dashboard").then((m) => ({ default: m.S1_Dashboard })));
const S2 = lazy(() => import("../components/presentation/S2_Markets").then((m) => ({ default: m.S2_Markets })));
const S3 = lazy(() => import("../components/presentation/S3_Macro").then((m) => ({ default: m.S3_Macro })));
const S4 = lazy(() => import("../components/presentation/S4_Analysis").then((m) => ({ default: m.S4_Analysis })));
const S5 = lazy(() => import("../components/presentation/S5_Insights").then((m) => ({ default: m.S5_Insights })));
const S6 = lazy(() => import("../components/presentation/S6_Workspace").then((m) => ({ default: m.S6_Workspace })));

const SCREENS = [
  { id: 1, label: "Tableau de Bord", sublabel: "Vue d'ensemble & Orientation", icon: <LayoutDashboard size={11} />, color: "#d6b68d", Component: S1 },
  { id: 2, label: "Marchés", sublabel: "BRVM · Obligations · Change", icon: <TrendingUp size={11} />, color: "#10c87a", Component: S2 },
  { id: 3, label: "Intelligence Macro", sublabel: "UEMOA · BCEAO · Souverain", icon: <Globe2 size={11} />, color: "#f4b942", Component: S3 },
  { id: 4, label: "Analyse Financière", sublabel: "Sociétés cotées · Risque", icon: <BarChart3 size={11} />, color: "#a78bfa", Component: S4 },
  { id: 5, label: "Insights & Éducation", sublabel: "Éditorial · Web TV · Recherche", icon: <Lightbulb size={11} />, color: "#a78bfa", Component: S5 },
  { id: 6, label: "Workspace", sublabel: "Bureau personnalisé modulaire", icon: <LayoutGrid size={11} />, color: "#c084fc", Component: S6 },
];

function ScreenFallback({ label }: { label: string }) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", background: C.dark, color: C.dim, fontSize: 14 }}>
      Chargement de {label}…
    </div>
  );
}

export function PresentationPage() {
  const C = useThemeColors();
  const { isDark } = useBloomfieldTheme();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(1);
  const activeIdx = SCREENS.findIndex((s) => s.id === activeId);
  const active = SCREENS[activeIdx];
  const ActiveComponent = active.Component;

  const prev = () => startTransition(() => setActiveId(SCREENS[Math.max(0, activeIdx - 1)].id));
  const next = () => startTransition(() => setActiveId(SCREENS[Math.min(SCREENS.length - 1, activeIdx + 1)].id));

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: C.dark, fontFamily: "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif" }}>
      {/* ── Presentation navigation strip ─────────────────────────────────── */}
      <div style={{ height: 40, flexShrink: 0, background: C.surface, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", padding: "0 12px", gap: 0 }}>
        {/* BFD Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 12, borderRight: `1px solid ${C.border}`, flexShrink: 0 }}>
          <img src={isDark ? logoDarkUrl : logoLightUrl} alt="Bloomfield Terminal" onClick={() => navigate("/")} style={{ height: 22, width: "auto", display: "block", objectFit: "contain", cursor: "pointer" }} draggable={false} />
          <div>
            <span style={{ fontSize: 10, color: C.muted }}>Présentation Produit · v3.0</span>
          </div>
          <span style={{ marginLeft: 6, fontSize: 9.5, padding: "1px 6px", borderRadius: 2, background: "rgba(244,185,66,0.12)", border: "1px solid rgba(244,185,66,0.25)", color: C.gold, fontWeight: 700, display: "flex", alignItems: "center", gap: 3 }}>
            <Lock size={7} />CONFIDENTIEL
          </span>
        </div>

        {/* Prev arrow */}
        <button onClick={prev} disabled={activeIdx === 0} style={{ width: 24, height: 24, borderRadius: 4, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: activeIdx === 0 ? "not-allowed" : "pointer", color: activeIdx === 0 ? C.muted : C.dim, flexShrink: 0, marginLeft: 8 }}>
          <ChevronLeft size={14} />
        </button>

        {/* Screen tabs */}
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", gap: 2 }}>
          {SCREENS.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button key={s.id} onClick={() => startTransition(() => setActiveId(s.id))}
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "5px 11px", borderRadius: 5,
                  background: isActive ? s.color + "14" : "transparent",
                  border: `1px solid ${isActive ? s.color + "45" : "transparent"}`,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}>
                <span style={{ color: isActive ? s.color : C.muted }}>{s.icon}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 11, fontWeight: isActive ? 800 : 500, color: isActive ? s.color : C.muted, lineHeight: 1, whiteSpace: "nowrap" }}>
                    {s.id}. {s.label}
                  </div>
                  {isActive && <div style={{ fontSize: 9, color: s.color, opacity: 0.75, lineHeight: 1, marginTop: 1 }}>{s.sublabel}</div>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Next arrow */}
        <button onClick={next} disabled={activeIdx === SCREENS.length - 1} style={{ width: 24, height: 24, borderRadius: 4, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: activeIdx === SCREENS.length - 1 ? "not-allowed" : "pointer", color: activeIdx === SCREENS.length - 1 ? C.muted : C.dim, flexShrink: 0 }}>
          <ChevronRight size={14} />
        </button>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 4, marginLeft: 10, paddingLeft: 10, borderLeft: `1px solid ${C.border}`, flexShrink: 0 }}>
          {SCREENS.map((s) => (
            <button key={`dot-${s.id}`} onClick={() => startTransition(() => setActiveId(s.id))}
              style={{ width: s.id === activeId ? 14 : 6, height: 6, borderRadius: 3, background: s.id === activeId ? s.color : "var(--bt-border-a40)", border: "none", cursor: "pointer", transition: "all 0.2s", padding: 0 }} />
          ))}
        </div>

        {/* Screen indicator */}
        <div style={{ marginLeft: 10, paddingLeft: 10, borderLeft: `1px solid ${C.border}`, flexShrink: 0 }}>
          <span style={{ fontSize: 10.5, color: C.muted }}>{activeIdx + 1}</span>
          <span style={{ fontSize: 10.5, color: C.muted }}>/{SCREENS.length}</span>
        </div>
      </div>

      {/* ── Active screen ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: "hidden", minHeight: 0 }}>
        <Suspense fallback={<ScreenFallback label={active.label} />}>
          <ActiveComponent />
        </Suspense>
      </div>
    </div>
  );
}

export default PresentationPage;