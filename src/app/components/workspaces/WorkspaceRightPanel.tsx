import { useState } from "react";
import type { ReactNode } from "react";
import {
  Bell, ChevronRight, ChevronLeft, Settings2, Plus,
  LayoutGrid, TrendingUp, Globe2, Landmark, Star,
  BarChart3, BookOpen, Calendar, Zap, AlertTriangle, CheckCircle2,
  X, Sliders, Eye, EyeOff, GripVertical,
} from "lucide-react";

const C = {
  surface: "#000117", elevated: "#000117",
  accent: "#d6b68d", gold: "#f4b942", green: "#10c87a",
  red: "#f43860", text: "#ddeaf8", dim: "#6b96b8",
  muted: "#54678d", border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa", orange: "#fb923c",
};

const WIDGET_LIBRARY = [
  { id: "market", label: "Market Monitor", icon: <TrendingUp size={10} />, color: C.accent, added: true },
  { id: "macro", label: "Macro Watch", icon: <Globe2 size={10} />, color: C.gold, added: true },
  { id: "sovereign", label: "Sovereign Debt", icon: <Landmark size={10} />, color: C.orange, added: true },
  { id: "watchlist", label: "Watchlist", icon: <Star size={10} />, color: C.gold, added: true },
  { id: "alerts", label: "Alertes Panel", icon: <Bell size={10} />, color: C.red, added: true },
  { id: "insights", label: "Flash Insights", icon: <Zap size={10} />, color: C.purple, added: true },
  { id: "compare", label: "Comparaison", icon: <BarChart3 size={10} />, color: C.purple, added: true },
  { id: "calendar", label: "Calendrier", icon: <Calendar size={10} />, color: C.purple, added: true },
  { id: "heatmap", label: "Heatmap", icon: <LayoutGrid size={10} />, color: C.accent, added: false },
  { id: "fx", label: "FX & Matières P.", icon: <Globe2 size={10} />, color: C.green, added: false },
  { id: "news", label: "Fil d'actualité", icon: <BookOpen size={10} />, color: C.dim, added: false },
  { id: "reports", label: "Rapports Récents", icon: <BookOpen size={10} />, color: C.gold, added: false },
];

const LIVE_ALERTS = [
  { id: 1, type: "critical", msg: "PALM CI +7.35% — seuil dépassé", time: "14:32", color: C.red },
  { id: 2, type: "warning", msg: "OAT CI 7Y → 6.89% (+2bp)", time: "13:58", color: C.gold },
  { id: 3, type: "info", msg: "Note BFD : SONATEL BUY · 19 500 XOF", time: "13:45", color: C.accent },
  { id: 4, type: "success", msg: "BCEAO taux inchangé — 3.50%", time: "12:30", color: C.green },
];

const ALERT_ICONS: Record<string, ReactNode> = {
  critical: <AlertTriangle size={9} />,
  warning: <AlertTriangle size={9} />,
  info: <Bell size={9} />,
  success: <CheckCircle2 size={9} />,
};

const LAYOUT_SETTINGS = [
  { id: "lock", label: "Disposition verrouillée", state: true },
  { id: "compact", label: "Mode compact", state: false },
  { id: "autorefresh", label: "Actualisation auto", state: true },
  { id: "tooltips", label: "Infobulles", state: true },
];

type PanelTab = "alerts" | "widgets" | "settings";

function PanelSection({ title, icon, color, children }: { title: string; icon: ReactNode; color: string; children: ReactNode }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "rgba(0, 1, 23,0.3)", borderBottom: `1px solid rgba(44, 61, 127,0.16)` }}>
        <span style={{ color }}>{icon}</span>
        <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</span>
        <div style={{ flex: 1 }} />
        <ChevronRight size={9} color={C.muted} />
      </div>
      {children}
    </div>
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <div onClick={onChange} style={{ width: 28, height: 14, borderRadius: 7, background: on ? C.accent : "rgba(44, 61, 127,0.4)", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 2, left: on ? 14 : 2, width: 10, height: 10, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
    </div>
  );
}

export function WorkspaceRightPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<PanelTab>("alerts");
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(LAYOUT_SETTINGS.map((s) => [s.id, s.state]))
  );
  const [widgetStates, setWidgetStates] = useState<Record<string, boolean>>(
    Object.fromEntries(WIDGET_LIBRARY.map((w) => [w.id, w.added]))
  );

  if (collapsed) {
    return (
      <div style={{ width: 28, background: C.surface, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, flexShrink: 0 }}>
        <button onClick={() => setCollapsed(false)} style={{ width: 22, height: 22, borderRadius: 4, background: "rgba(214, 182, 141,0.1)", border: "1px solid rgba(214, 182, 141,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.accent }}>
          <ChevronLeft size={11} />
        </button>
      </div>
    );
  }

  return (
    <div style={{ width: 264, flexShrink: 0, background: C.surface, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Panel header */}
      <div style={{ height: 40, display: "flex", alignItems: "center", padding: "0 12px", borderBottom: `1px solid ${C.border}`, background: "rgba(0, 1, 23,0.4)", flexShrink: 0 }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>Panneau Utilitaire</span>
        <div style={{ flex: 1 }} />
        <button onClick={() => setCollapsed(true)} style={{ width: 20, height: 20, borderRadius: 3, background: "rgba(0, 1, 23,0.5)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}>
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        {([
          { id: "alerts" as PanelTab, label: "Alertes", icon: <Bell size={9} />, count: LIVE_ALERTS.length },
          { id: "widgets" as PanelTab, label: "Widgets", icon: <LayoutGrid size={9} />, count: null },
          { id: "settings" as PanelTab, label: "Config", icon: <Settings2 size={9} />, count: null },
        ]).map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, height: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
              background: "transparent", border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? C.accent : "transparent"}`,
              color: activeTab === tab.id ? C.accent : C.muted,
              fontSize: 9, fontWeight: activeTab === tab.id ? 700 : 500, cursor: "pointer",
              marginBottom: -1,
            }}>
            {tab.icon}
            {tab.label}
            {tab.count !== null && (
              <span style={{ background: C.red, color: "#fff", fontSize: 7, fontWeight: 700, borderRadius: 8, padding: "0 4px", minWidth: 14, textAlign: "center" }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* ── ALERTS TAB ── */}
        {activeTab === "alerts" && (
          <>
            <PanelSection title="Alertes Live" icon={<Bell size={9} />} color={C.red}>
              <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                {LIVE_ALERTS.map((a) => (
                  <div key={a.id} style={{ display: "flex", gap: 6, padding: "5px 8px", borderRadius: 4, background: a.color + "0c", border: `1px solid ${a.color}22`, cursor: "pointer" }}>
                    <span style={{ color: a.color, flexShrink: 0, marginTop: 1 }}>{ALERT_ICONS[a.type]}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{a.msg}</div>
                      <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{a.time}</div>
                    </div>
                    <button onClick={(e) => e.stopPropagation()} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 0, flexShrink: 0 }}>
                      <X size={8} />
                    </button>
                  </div>
                ))}
                <button style={{ width: "100%", padding: "4px 0", borderRadius: 4, background: "rgba(244,56,96,0.06)", border: "1px dashed rgba(244,56,96,0.2)", color: C.red, fontSize: 8.5, fontWeight: 600, cursor: "pointer" }}>
                  + Configurer seuils d'alerte
                </button>
              </div>
            </PanelSection>

            <PanelSection title="Prochains Événements" icon={<Calendar size={9} />} color={C.purple}>
              <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
                {[
                  { d: "09 Avr", label: "Résultats SGBCI FY2025", color: C.green },
                  { d: "10 Avr", label: "Clôture OAT CI 7Y — 2026-A", color: C.gold },
                  { d: "12 Avr", label: "Webinaire Bloomfield — Obligations", color: C.purple },
                  { d: "15 Avr", label: "Dividende SONATEL — 1 800 XOF", color: C.green },
                  { d: "17 Avr", label: "BCEAO Adjudication BAT 26S", color: C.accent },
                ].map((ev, i) => (
                  <div key={`ev-${i}`} style={{ display: "flex", gap: 7, padding: "4px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, cursor: "pointer" }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: ev.color, minWidth: 40, flexShrink: 0 }}>{ev.d}</span>
                    <span style={{ fontSize: 8.5, color: C.dim, flex: 1 }}>{ev.label}</span>
                  </div>
                ))}
              </div>
            </PanelSection>

            <PanelSection title="Contenus Recommandés" icon={<Star size={9} />} color={C.accent}>
              <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
                {[
                  { label: "Stratégie Obligataire UEMOA T2 2026", type: "ANALYSE", score: 98, color: C.accent },
                  { label: "Secteur Bancaire — Bilan Q1 2026", type: "NOTE", score: 94, color: C.green },
                  { label: "Vidéo : BCEAO pause — impact marché", type: "VIDÉO", score: 91, color: C.orange },
                ].map((rec, i) => (
                  <div key={`rec-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 6, padding: "5px 7px", borderRadius: 4, background: "rgba(0, 1, 23,0.4)", border: `1px solid rgba(44, 61, 127,0.16)`, cursor: "pointer" }}>
                    <div style={{ minWidth: 24, height: 18, borderRadius: 3, background: rec.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 8, fontWeight: 800, color: rec.color }}>{rec.score}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.3 }}>{rec.label}</div>
                      <span style={{ fontSize: 7, color: rec.color, fontWeight: 700 }}>{rec.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </PanelSection>
          </>
        )}

        {/* ── WIDGETS TAB ── */}
        {activeTab === "widgets" && (
          <div style={{ padding: "10px 10px" }}>
            <div style={{ fontSize: 8.5, color: C.muted, marginBottom: 8, lineHeight: 1.5 }}>
              Glissez les widgets sur le canvas ou cliquez sur <strong style={{ color: C.accent }}>+</strong> pour les ajouter.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {WIDGET_LIBRARY.map((w) => {
                const isOn = widgetStates[w.id];
                return (
                  <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 9px", borderRadius: 5, background: isOn ? "rgba(0, 1, 23,0.5)" : "rgba(0, 1, 23,0.25)", border: `1px solid ${isOn ? C.border : "rgba(44, 61, 127,0.16)"}`, cursor: "grab" }}>
                    <GripVertical size={9} color={C.muted} style={{ flexShrink: 0 }} />
                    <div style={{ width: 22, height: 22, borderRadius: 4, background: w.color + "14", border: `1px solid ${w.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: w.color }}>
                      {w.icon}
                    </div>
                    <span style={{ flex: 1, fontSize: 9.5, color: isOn ? C.text : C.muted, fontWeight: isOn ? 600 : 400 }}>{w.label}</span>
                    <button
                      onClick={() => setWidgetStates((prev) => ({ ...prev, [w.id]: !prev[w.id] }))}
                      style={{ background: "none", border: "none", cursor: "pointer", color: isOn ? C.accent : C.muted, padding: 0, flexShrink: 0 }}
                    >
                      {isOn ? <Eye size={10} /> : <EyeOff size={10} />}
                    </button>
                    <button
                      style={{ width: 18, height: 18, borderRadius: 3, background: isOn ? "rgba(244,56,96,0.1)" : "rgba(214, 182, 141,0.1)", border: `1px solid ${isOn ? "rgba(244,56,96,0.2)" : "rgba(214, 182, 141,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: isOn ? C.red : C.accent, flexShrink: 0 }}
                      onClick={() => setWidgetStates((prev) => ({ ...prev, [w.id]: !prev[w.id] }))}
                    >
                      {isOn ? <X size={7} /> : <Plus size={7} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === "settings" && (
          <div style={{ padding: "10px 10px", display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Layout toggles */}
            <div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Disposition</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {LAYOUT_SETTINGS.map((setting) => (
                  <div key={setting.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ flex: 1, fontSize: 9.5, color: C.dim }}>{setting.label}</span>
                    <Toggle on={toggles[setting.id]} onChange={() => setToggles((prev) => ({ ...prev, [setting.id]: !prev[setting.id] }))} />
                  </div>
                ))}
              </div>
            </div>

            {/* Data settings */}
            <div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Données & Actualisation</div>
              {[
                { label: "Délai d'actualisation", value: "30 sec" },
                { label: "Source de données", value: "BRVM · BCEAO · BFD" },
                { label: "Fuseau horaire", value: "GMT (Abidjan)" },
                { label: "Devise d'affichage", value: "XOF (FCFA)" },
              ].map((item, i) => (
                <div key={`ds-${i}`} style={{ display: "flex", alignItems: "center", padding: "5px 0", borderBottom: `1px solid rgba(44, 61, 127,0.12)` }}>
                  <span style={{ flex: 1, fontSize: 9, color: C.muted }}>{item.label}</span>
                  <span style={{ fontSize: 9, color: C.accent, fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Theme */}
            <div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Apparence</div>
              <div style={{ display: "flex", gap: 5 }}>
                {[
                  { label: "Sombre", active: true, bg: "#000117", border: C.accent },
                  { label: "Neutre", active: false, bg: "#131a28", border: C.border },
                  { label: "Clair", active: false, bg: "#f0f4f8", border: C.border },
                ].map((theme) => (
                  <div key={theme.label} style={{ flex: 1, padding: "6px 4px", borderRadius: 5, background: theme.bg, border: `1px solid ${theme.active ? theme.border : C.border}`, textAlign: "center", cursor: "pointer" }}>
                    <div style={{ fontSize: 8, color: theme.active ? C.accent : C.muted, fontWeight: theme.active ? 700 : 400 }}>{theme.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <button style={{ width: "100%", padding: "7px 0", borderRadius: 5, background: "rgba(214, 182, 141,0.08)", border: "1px solid rgba(214, 182, 141,0.2)", color: C.accent, fontSize: 9.5, fontWeight: 700, cursor: "pointer" }}>
                Sauvegarder les paramètres
              </button>
              <button style={{ width: "100%", padding: "6px 0", borderRadius: 5, background: "transparent", border: `1px solid ${C.border}`, color: C.muted, fontSize: 9, cursor: "pointer" }}>
                Réinitialiser le workspace
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
