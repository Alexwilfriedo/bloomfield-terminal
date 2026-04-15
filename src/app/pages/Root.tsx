import { Outlet, useNavigate, useLocation } from "react-router";
import { TopBar } from "../components/terminal/TopBar";
import { Sidebar } from "../components/terminal/Sidebar";
import { OrderTicketPanel } from "../components/orders/OrderTicketPanel";
import { AIPanelAssistant } from "../components/ai/AIPanelAssistant";

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();

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
        background: "#000430",
        fontFamily: "'Inter', 'SF Pro Text', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Main terminal topbar — spans full width, logo at the leftmost edge */}
      <TopBar />

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
