import { LiveTicker } from "../components/terminal/LiveTicker";
import { TopBar } from "../components/terminal/TopBar";
import { Dashboard } from "../components/dashboard/Dashboard";

export function DashboardPage() {
  return (
    <>
      <TopBar />
      <LiveTicker />
      <Dashboard />
    </>
  );
}
