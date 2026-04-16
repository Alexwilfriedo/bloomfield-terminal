import { useNavigate } from "react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  Search, Bell, ChevronDown, Download, Share2, Plus,
  RefreshCw, Layers, Save, LayoutGrid, Settings2, Lock,
  Sun,
  Moon,
} from "lucide-react";
import logoUrl from "../../../assets/logo-bloomfield-terminal.png";
import { useThemeColors } from "../../hooks/useThemeColors";
import { useBloomfieldTheme } from "../../context/ThemeContext";

const WORKSPACES = [
  { id: "premium", label: "Mon Workspace Premium", icon: "⭐", active: true },
  { id: "trader", label: "Trader Workspace", icon: "📈" },
  { id: "macro", label: "Macro Intelligence", icon: "🌍" },
  { id: "sovereign", label: "Sovereign Risk", icon: "🏛️" },
  { id: "pension", label: "Gestion Pension", icon: "📊" },
];

function VDivider() {
  const C = useThemeColors();
  return <div style={{ width: 1, height: 20, background: C.border, flexShrink: 0, margin: "0 4px" }} />;
}

function ActionBtn({ icon, label, accent, gold }: { icon: ReactNode; label?: string; accent?: boolean; gold?: boolean }) {
  const C = useThemeColors();
  const bg = accent ? "var(--bt-accent-a10)" : gold ? "rgba(244,185,66,0.1)" : "var(--bt-overlay-50)";
  const border = accent ? "var(--bt-accent-a30)" : gold ? "rgba(244,185,66,0.3)" : C.border;
  const color = accent ? C.accent : gold ? C.gold : C.dim;
  return (
    <button
      style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: label ? "5px 10px" : "5px 8px",
        background: bg, border: `1px solid ${border}`, borderRadius: 5,
        color, fontSize: 12, fontWeight: 600, cursor: "pointer",
        letterSpacing: "0.02em", whiteSpace: "nowrap", flexShrink: 0,
      }}
    >
      {icon}{label}
    </button>
  );
}

export function WorkspacesTopBar() {
  const C = useThemeColors();
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useBloomfieldTheme();
  const [search, setSearch] = useState("");
  const [wsOpen, setWsOpen] = useState(false);
  const [activeWs, setActiveWs] = useState("premium");

  const current = WORKSPACES.find((w) => w.id === activeWs) ?? WORKSPACES[0];

  return (
    <div style={{ flexShrink: 0, background: C.surface, borderBottom: `1px solid ${C.border}`, zIndex: 50 }}>
      {/* Row 1 */}
      <div style={{ height: 52, display: "flex", alignItems: "center", padding: "0 16px", gap: 8, borderBottom: `1px solid ${C.border}` }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", minWidth: 160, flexShrink: 0 }}>
          <img src={logoUrl} alt="Bloomfield Terminal" onClick={() => navigate("/")} style={{ height: 28, width: "auto", display: "block", objectFit: "contain", cursor: "pointer" }} draggable={false} />
        </div>

        {/* Page label */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, paddingLeft: 10, borderLeft: `1px solid ${C.border}`, flexShrink: 0 }}>
          <LayoutGrid size={14} color={C.purple} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1 }}>WORKSPACES</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 1, letterSpacing: "0.03em" }}>Bureau d'Intelligence Personnalisé</div>
          </div>
        </div>

        <VDivider />

        {/* Workspace Selector */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <button
            onClick={() => setWsOpen(!wsOpen)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "5px 10px", borderRadius: 5,
              background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.25)",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: 14 }}>{current.icon}</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, lineHeight: 1 }}>{current.label}</div>
              <div style={{ fontSize: 9.5, color: C.muted, marginTop: 1 }}>Workspace actif</div>
            </div>
            <ChevronDown size={10} color={C.muted} />
          </button>
          {wsOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 100,
              background: C.surface, border: `1px solid ${C.border}`, borderRadius: 6,
              minWidth: 220, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", overflow: "hidden",
            }}>
              {WORKSPACES.map((ws) => (
                <button key={ws.id} onClick={() => { setActiveWs(ws.id); setWsOpen(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 12px", background: ws.id === activeWs ? "rgba(167,139,250,0.1)" : "transparent",
                    border: "none", borderBottom: `1px solid var(--bt-border-a16)`, cursor: "pointer",
                    color: ws.id === activeWs ? C.purple : C.dim, fontSize: 12, fontWeight: ws.id === activeWs ? 700 : 500,
                    textAlign: "left",
                  }}>
                  <span style={{ fontSize: 13 }}>{ws.icon}</span>
                  {ws.label}
                  {ws.id === activeWs && <span style={{ marginLeft: "auto", fontSize: 9.5, color: C.purple, fontWeight: 700 }}>ACTIF</span>}
                </button>
              ))}
              <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "transparent", border: "none", cursor: "pointer", color: C.accent, fontSize: 12, fontWeight: 600 }}>
                <Plus size={10} />Nouveau Workspace
              </button>
            </div>
          )}
        </div>

        {/* Smart Search */}
        <div style={{ flex: 1, maxWidth: 460, position: "relative", display: "flex", alignItems: "center" }}>
          <Search size={13} style={{ position: "absolute", left: 10, color: C.dim, pointerEvents: "none" }} />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher widgets, marchés, sociétés, indicateurs…"
            style={{
              width: "100%", height: 32, background: "var(--bt-overlay-70)", border: `1px solid ${C.border}`,
              borderRadius: 6, paddingLeft: 32, paddingRight: 48, color: C.text, fontSize: 13, outline: "none",
            }}
          />
          <span style={{ position: "absolute", right: 8, fontSize: 11, color: C.muted, background: "var(--bt-border-a25)", border: `1px solid ${C.border}`, borderRadius: 4, padding: "1px 5px", fontWeight: 500, pointerEvents: "none" }}>⌘K</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Live */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
          <span style={{ fontSize: 11, color: C.green, fontWeight: 700, letterSpacing: "0.08em" }}>LIVE</span>
        </div>
        <div style={{ fontSize: 12, color: C.dim, fontWeight: 500 }}>Mer 08 Avr 2026</div>

        <VDivider />

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <ActionBtn icon={<Plus size={12} />} label="Widget" accent />
          <ActionBtn icon={<Save size={12} />} label="Sauvegarder" />
          <ActionBtn icon={<Share2 size={12} />} label="Partager" />
          <ActionBtn icon={<Download size={12} />} />
          <ActionBtn icon={<RefreshCw size={12} />} />
        </div>

        <VDivider />
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Mode clair" : "Mode sombre"}
          style={{
            width: 32, height: 32, borderRadius: 6,
            background: isDark ? "rgba(244,185,66,0.08)" : "rgba(44,61,127,0.08)",
            border: `1px solid ${isDark ? "rgba(244,185,66,0.22)" : "rgba(44,61,127,0.18)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: isDark ? C.gold : "#4a6480",
            transition: "all 0.2s", flexShrink: 0,
          }}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </button>


        {/* Bell */}
        <button style={{ position: "relative", width: 32, height: 32, borderRadius: 6, background: "var(--bt-overlay-50)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.dim, flexShrink: 0 }}>
          <Bell size={14} />
          <div style={{ position: "absolute", top: 4, right: 4, minWidth: 14, height: 14, borderRadius: 7, background: C.red, border: `1.5px solid ${C.surface}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff" }}>5</div>
        </button>

        {/* User */}
        <button style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 8px", borderRadius: 6, background: "var(--bt-overlay-50)", border: `1px solid ${C.border}`, cursor: "pointer", flexShrink: 0 }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>AK</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 12, color: C.text, fontWeight: 600, lineHeight: 1 }}>Adjoua Koné</div>
            <div style={{ fontSize: 10, color: C.muted, lineHeight: 1, marginTop: 2 }}>Premium · Analyste Senior</div>
          </div>
          <ChevronDown size={11} color={C.muted} />
        </button>
      </div>

      {/* Row 2 — workspace metadata bar */}
      <div style={{ height: 32, display: "flex", alignItems: "center", padding: "0 16px", gap: 10, background: "var(--bt-overlay-50)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Layers size={9} color={C.purple} />
          <span style={{ fontSize: 11, color: C.muted }}>8 widgets actifs</span>
        </div>
        <VDivider />
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <Lock size={8} color={C.muted} />
          <span style={{ fontSize: 11, color: C.muted }}>Disposition verrouillée</span>
          <button style={{ fontSize: 10, color: C.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Modifier</button>
        </div>
        <VDivider />
        <span style={{ fontSize: 11, color: C.muted }}>Dernière sauvegarde : 14h30</span>
        <VDivider />
        <div style={{ display: "flex", gap: 5 }}>
          {["Marchés", "BCEAO", "Obligations", "Watchlist", "Macro"].map((tag) => (
            <span key={tag} style={{ padding: "1px 6px", borderRadius: 10, background: "var(--bt-accent-a08)", border: "1px solid var(--bt-accent-a15)", fontSize: 10, color: C.accent, fontWeight: 500 }}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Settings2 size={11} color={C.muted} style={{ cursor: "pointer" }} />
        <span style={{ fontSize: 10.5, color: C.muted, cursor: "pointer" }}>Paramètres du workspace</span>
      </div>
    </div>
  );
}
