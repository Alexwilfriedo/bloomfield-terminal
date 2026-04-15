import { useState } from "react";
import { Plus, Copy, Trash2, Share2, CheckCircle2, Layers } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";

const C = {
  accent: "#d6b68d", gold: "#f4b942", green: "#10c87a",
  red: "#f43860", text: "#ddeaf8", dim: "#6b96b8",
  muted: "#54678d", border: "rgba(44, 61, 127,0.32)", purple: "#a78bfa", orange: "#fb923c",
};

const WORKSPACES = [
  {
    id: "premium",
    name: "Mon Workspace Premium",
    description: "Vue consolidée : marchés, macro, obligations, watchlist, alertes",
    icon: "⭐",
    widgets: 8,
    tags: ["BRVM", "Macro", "Obligations"],
    color: C.purple,
    lastUsed: "Aujourd'hui",
    isActive: true,
    isDefault: true,
  },
  {
    id: "trader",
    name: "Trader Workspace",
    description: "Focus marché actions BRVM — temps réel, signaux techniques, flux",
    icon: "📈",
    widgets: 6,
    tags: ["BRVM", "Signaux", "Volume"],
    color: C.accent,
    lastUsed: "Hier",
    isActive: false,
    isDefault: false,
  },
  {
    id: "macro",
    name: "Macro Intelligence",
    description: "Tableau de bord macroéconomique UEMOA — indicateurs, BCEAO, prévisions",
    icon: "🌍",
    widgets: 7,
    tags: ["PIB", "Inflation", "BCEAO"],
    color: C.green,
    lastUsed: "06 Avr",
    isActive: false,
    isDefault: false,
  },
  {
    id: "sovereign",
    name: "Sovereign Risk Workspace",
    description: "Surveillance dette souveraine — spreads, notation, adjudications, risque pays",
    icon: "🏛️",
    widgets: 5,
    tags: ["OAT", "Spreads", "Notation"],
    color: C.gold,
    lastUsed: "05 Avr",
    isActive: false,
    isDefault: false,
  },
  {
    id: "pension",
    name: "Gestion de Portefeuille",
    description: "Suivi portefeuille institutionnel — allocation, performance, risque, reporting",
    icon: "📊",
    widgets: 9,
    tags: ["Allocation", "Perf.", "Risque"],
    color: C.orange,
    lastUsed: "01 Avr",
    isActive: false,
    isDefault: false,
  },
  {
    id: "ci",
    name: "Focus Côte d'Ivoire",
    description: "Intelligence marché CI — actions, obligations, macro, secteurs cotés",
    icon: "🇨🇮",
    widgets: 6,
    tags: ["CIV", "BRVM", "Macro CI"],
    color: "#f97316",
    lastUsed: "28 Mar",
    isActive: false,
    isDefault: false,
  },
];

export function WorkspaceLibraryWidget() {
  const [activeWs, setActiveWs] = useState("premium");
  const [hoveredWs, setHoveredWs] = useState<string | null>(null);

  return (
    <WidgetShell
      title="Bibliothèque de Workspaces"
      subtitle="Mes espaces de travail sauvegardés"
      accentColor={C.purple}
      actions={
        <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 4, border: `1px solid rgba(214, 182, 141,0.3)`, background: "rgba(214, 182, 141,0.08)", color: C.accent, fontSize: 9, fontWeight: 700, cursor: "pointer" }}>
          <Plus size={10} />Nouveau
        </button>
      }
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {WORKSPACES.map((ws) => {
          const isActive = ws.id === activeWs;
          const isHovered = ws.id === hoveredWs;
          return (
            <div
              key={ws.id}
              onClick={() => setActiveWs(ws.id)}
              onMouseEnter={() => setHoveredWs(ws.id)}
              onMouseLeave={() => setHoveredWs(null)}
              style={{
                padding: "10px 11px", borderRadius: 6, cursor: "pointer",
                background: isActive ? ws.color + "12" : isHovered ? "rgba(214, 182, 141,0.04)" : "rgba(0, 1, 23,0.45)",
                border: `1px solid ${isActive ? ws.color + "40" : C.border}`,
                position: "relative", transition: "all 0.15s",
              }}
            >
              {/* Active badge */}
              {isActive && (
                <div style={{ position: "absolute", top: 6, right: 6 }}>
                  <CheckCircle2 size={12} color={ws.color} />
                </div>
              )}
              {ws.isDefault && !isActive && (
                <div style={{ position: "absolute", top: 6, right: 6, fontSize: 7, padding: "1px 4px", borderRadius: 2, background: "rgba(244,185,66,0.12)", border: "1px solid rgba(244,185,66,0.25)", color: C.gold, fontWeight: 700 }}>
                  DÉF.
                </div>
              )}

              {/* Icon + name */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: ws.color + "18", border: `1px solid ${ws.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                  {ws.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: isActive ? ws.color : C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ws.name}</div>
                  <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{ws.widgets} widgets · {ws.lastUsed}</div>
                </div>
              </div>

              {/* Description */}
              <p style={{ margin: "0 0 6px", fontSize: 8.5, color: C.dim, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {ws.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 7 }}>
                {ws.tags.map((tag) => (
                  <span key={tag} style={{ padding: "1px 5px", borderRadius: 2, background: ws.color + "12", border: `1px solid ${ws.color}22`, fontSize: 7, color: ws.color, fontWeight: 600 }}>{tag}</span>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 3 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveWs(ws.id); }}
                  style={{
                    flex: 1, padding: "4px 0", borderRadius: 4, border: `1px solid ${isActive ? ws.color + "40" : C.border}`,
                    background: isActive ? ws.color + "18" : "rgba(0, 1, 23,0.5)",
                    color: isActive ? ws.color : C.dim,
                    fontSize: 8.5, fontWeight: 700, cursor: "pointer",
                  }}
                >
                  {isActive ? "Actif" : "Ouvrir"}
                </button>
                <button onClick={(e) => e.stopPropagation()} style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(0, 1, 23,0.5)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}>
                  <Copy size={8} />
                </button>
                <button onClick={(e) => e.stopPropagation()} style={{ width: 24, height: 24, borderRadius: 4, background: "rgba(0, 1, 23,0.5)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}>
                  <Share2 size={8} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add new card */}
        <div style={{ padding: "10px 11px", borderRadius: 6, cursor: "pointer", background: "rgba(0, 1, 23,0.3)", border: `1px dashed rgba(214, 182, 141,0.25)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6, minHeight: 120 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(214, 182, 141,0.04)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0, 1, 23,0.3)"; }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(214, 182, 141,0.08)", border: "1px solid rgba(214, 182, 141,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={12} color={C.accent} />
          </div>
          <span style={{ fontSize: 8.5, color: C.accent, fontWeight: 600, textAlign: "center" }}>Nouveau Workspace</span>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8, padding: "6px 10px", background: "rgba(0, 1, 23,0.4)", borderRadius: 5, border: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Layers size={10} color={C.purple} />
          <span style={{ fontSize: 9, color: C.muted }}>{WORKSPACES.length} workspaces sauvegardés</span>
        </div>
        <div style={{ width: 1, height: 14, background: C.border }} />
        <span style={{ fontSize: 9, color: C.muted }}>38 widgets configurés au total</span>
        <div style={{ flex: 1 }} />
        <button style={{ fontSize: 8.5, color: C.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Gérer les workspaces →</button>
      </div>
    </WidgetShell>
  );
}
