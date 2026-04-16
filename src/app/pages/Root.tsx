import { Outlet, useNavigate, useLocation } from "react-router";
import { Sidebar } from "../components/terminal/Sidebar";
import { TopBar } from "../components/terminal/TopBar";
import { MarketsTopBar } from "../components/markets/MarketsTopBar";
import { MacroTopBar } from "../components/macro/MacroTopBar";
import { AnalysisTopBar } from "../components/analysis/AnalysisTopBar";
import { InsightsTopBar } from "../components/insights/InsightsTopBar";
import { WorkspacesTopBar } from "../components/workspaces/WorkspacesTopBar";
import { OrderTicketPanel } from "../components/orders/OrderTicketPanel";
import { AIPanelAssistant } from "../components/ai/AIPanelAssistant";
import { useBloomfieldTheme } from "../context/ThemeContext";

function RouteTopBar({ pathname }: { pathname: string }) {
  if (pathname.startsWith("/markets")) return <MarketsTopBar />;
  if (pathname.startsWith("/macro")) return <MacroTopBar />;
  if (pathname.startsWith("/analysis")) return <AnalysisTopBar />;
  if (pathname.startsWith("/insights")) return <InsightsTopBar />;
  if (pathname.startsWith("/workspaces")) return <WorkspacesTopBar />;
  return <TopBar />;
}

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useBloomfieldTheme();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: isDark ? "#000117" : "#f5f6fa",
        fontFamily: "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      {/* TopBar — full width, above sidebar + content */}
      <RouteTopBar pathname={location.pathname} />

      {/* Body — sidebar (vertical nav) + page content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <Sidebar onNavigate={navigate} isActive={isActive} />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Global overlays */}
      <OrderTicketPanel />
      <AIPanelAssistant />
    </div>
  );
}
