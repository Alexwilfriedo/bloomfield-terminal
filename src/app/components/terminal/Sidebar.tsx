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

const NAV_ITEMS = [
  { key: "dashboard", path: "/", icon: LayoutDashboard },
  { key: "markets", path: "/markets", icon: TrendingUp },
  { key: "macro", path: "/macro", icon: Globe2 },
  { key: "analysis", path: "/analysis", icon: BarChart3 },
  { key: "insights", path: "/insights", icon: Lightbulb },
  { key: "workspaces", path: "/workspaces", icon: Layers },
  { key: "presentation", path: "/presentation", icon: MonitorPlay },
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
      >
        {/* Nav items */}
        <div className="flex flex-col items-center gap-2 w-full">
          {NAV_ITEMS.map(({ key, path, icon: Icon }) => (
            <SidebarButton
              key={key}
              icon={<Icon className="size-full" strokeWidth={1.5} />}
              active={active(path)}
              onClick={() => onNavigate?.(path)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex flex-col items-center gap-2 w-full">
          <div style={{ position: "relative" }}>
            <SidebarButton
              icon={<ClipboardList className="size-full" strokeWidth={1.5} />}
              onClick={() => openOrderPanel()}
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
          <SidebarButton
            icon={<Bot className="size-full" strokeWidth={1.5} />}
            onClick={() => openAIPanel()}
          />
          <SidebarButton
            icon={<Settings className="size-full" strokeWidth={1.5} />}
          />
          <Avatar
            type="initials"
            initials="AK"
            size="medium"
            shape="circle"
          />
        </div>
      </nav>
    </div>
  );
}