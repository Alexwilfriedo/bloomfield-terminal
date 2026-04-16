import type { ReactNode } from "react";
import { SidebarButton, Avatar } from "@figma/astraui";
import {
  LayoutDashboard,
  TrendingUp,
  Globe2,
  BarChart3,
  Lightbulb,
  Layers,
  Settings,
  MonitorPlay,
  Bot,
  ClipboardList,
} from "lucide-react";
import { useTerminal } from "../../context/TerminalContext";
import { useThemeColors } from "../../hooks/useThemeColors";

const NAV_ITEMS = [
  { key: "dashboard", path: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { key: "markets", path: "/markets", icon: TrendingUp, label: "Marchés" },
  { key: "macro", path: "/macro", icon: Globe2, label: "Macro" },
  { key: "analysis", path: "/analysis", icon: BarChart3, label: "Analyse" },
  { key: "insights", path: "/insights", icon: Lightbulb, label: "Insights" },
  { key: "workspaces", path: "/workspaces", icon: Layers, label: "Espaces de travail" },
  { key: "presentation", path: "/presentation", icon: MonitorPlay, label: "Présentation" },
] as const;

interface SidebarProps {
  onNavigate?: (path: string) => void;
  isActive?: (path: string) => boolean;
}

export function Sidebar({ onNavigate, isActive }: SidebarProps) {
  const active = (path: string) => isActive?.(path) ?? false;
  const { openOrderPanel, openAIPanel, orders } = useTerminal();

  const pendingOrders = orders.filter((o) =>
    ["submitted", "under_review"].includes(o.status)
  ).length;

  return (
    <div style={{ position: "relative" }}>
      {/* Bloomfield branding stripe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, var(--bt-accent-a06) 0%, transparent 30%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/*
        Custom sidebar nav — mirrors the internal structure of
        @figma/astraui's SidebarNavigation, minus the hardcoded
        brand sparkle at the top (no prop to disable it upstream).
      */}
      <nav
        className="bg-surface-bg h-full w-[60px] border-r border-border-primary flex flex-col items-center py-3 relative z-10"
        style={{ overflow: "visible" }}
      >
        {/* Nav items */}
        <div className="flex flex-col items-center gap-2 w-full">
          {NAV_ITEMS.map(({ key, path, icon: Icon, label }) => (
            <SidebarTooltip key={key} label={label}>
              <SidebarButton
                icon={<Icon className="size-full" strokeWidth={1.5} />}
                active={active(path)}
                onClick={() => onNavigate?.(path)}
                aria-label={label}
              />
            </SidebarTooltip>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col items-center gap-2 w-full">
          <SidebarTooltip
            label={pendingOrders > 0 ? `Ordres (${pendingOrders} en attente)` : "Ordres"}
          >
            <div style={{ position: "relative" }}>
              <SidebarButton
                icon={<ClipboardList className="size-full" strokeWidth={1.5} />}
                onClick={() => openOrderPanel()}
                aria-label="Ordres"
              />
              {pendingOrders > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: "#f4b942",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 800,
                    color: "#000117",
                    pointerEvents: "none",
                  }}
                >
                  {pendingOrders}
                </div>
              )}
            </div>
          </SidebarTooltip>
          <SidebarTooltip label="Assistant IA">
            <SidebarButton
              icon={<Bot className="size-full" strokeWidth={1.5} />}
              onClick={() => openAIPanel()}
              aria-label="Assistant IA"
            />
          </SidebarTooltip>
          <SidebarTooltip label="Paramètres">
            <SidebarButton
              icon={<Settings className="size-full" strokeWidth={1.5} />}
              aria-label="Paramètres"
            />
          </SidebarTooltip>
          <SidebarTooltip label="Mon profil">
            <div style={{ display: "flex" }}>
              <Avatar type="initials" initials="AK" size="medium" shape="circle" />
            </div>
          </SidebarTooltip>
        </div>
      </nav>
    </div>
  );
}

function SidebarTooltip({ label, children }: { label: string; children: ReactNode }) {
  const C = useThemeColors();

  return (
    <div className="bt-sidebar-tooltip-wrap" style={{ position: "relative", display: "flex" }}>
      {children}
      <span
        className="bt-sidebar-tooltip"
        role="tooltip"
        style={{
          position: "absolute",
          left: "calc(100% + 10px)",
          top: "50%",
          padding: "5px 10px",
          background: C.surface,
          color: C.text,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          opacity: 0,
          transform: "translate(-4px, -50%)",
          transition: "opacity 0.12s ease, transform 0.12s ease",
          boxShadow: "0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 var(--bt-accent-a06)",
          zIndex: 200,
        }}
      >
        {label}
      </span>
    </div>
  );
}
