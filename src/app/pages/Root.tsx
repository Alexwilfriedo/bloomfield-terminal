import { Outlet, useNavigate, useLocation } from "react-router";
import { Sidebar } from "../components/terminal/Sidebar";
import { OrderTicketPanel } from "../components/orders/OrderTicketPanel";
import { AIPanelAssistant } from "../components/ai/AIPanelAssistant";
import { useBloomfieldTheme } from "../context/ThemeContext";

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
      {/* Body — sidebar (vertical nav) + page content (each page renders its own TopBar) */}
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
