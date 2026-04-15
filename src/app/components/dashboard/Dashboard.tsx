import { RotateCcw } from "lucide-react";
import { MetricsBar } from "./MetricsBar";
import { DashboardGrid, resetDashboardLayout } from "./DashboardGrid";

const C = {
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  accent: "#d6b68d",
  border: "rgba(44, 61, 127,0.32)",
};

export function Dashboard() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#000430",
        minWidth: 0,
      }}
    >
      <MetricsBar />

      {/* Section header */}
      <div
        style={{
          padding: "8px 16px 6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: C.text,
              letterSpacing: "0.01em",
            }}
          >
            Tableau de Bord · Cockpit Principal
          </div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>
            Marchés BRVM · UEMOA · Afrique — Session du Mercredi 08 Avril 2026
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <SessionTag label="BRVM" status="open" />
            <SessionTag label="FOREX" status="open" />
            <SessionTag label="OBL UEMOA" status="open" />
            <SessionTag label="NYSE" status="closed" />
          </div>
          <button
            type="button"
            onClick={resetDashboardLayout}
            title="Réinitialiser la disposition des widgets"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 8px",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: C.dim,
              background: "rgba(214, 182, 141,0.06)",
              border: `1px solid ${C.border}`,
              borderRadius: 4,
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            <RotateCcw size={10} />
            Reset
          </button>
        </div>
      </div>

      {/* Grid widget area — drag handle bar to move, bottom-right corner to resize */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: "0 12px 12px",
          display: "flex",
        }}
      >
        <DashboardGrid />
      </div>
    </div>
  );
}

function SessionTag({
  label,
  status,
}: {
  label: string;
  status: "open" | "closed";
}) {
  const isOpen = status === "open";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "3px 8px",
        borderRadius: 4,
        background: isOpen
          ? "rgba(16,200,122,0.08)"
          : "rgba(100,120,150,0.08)",
        border: `1px solid ${
          isOpen ? "rgba(16,200,122,0.2)" : "rgba(100,120,150,0.2)"
        }`,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: isOpen ? "#10c87a" : "#54678d",
          boxShadow: isOpen ? "0 0 4px #10c87a" : "none",
        }}
      />
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: isOpen ? "#10c87a" : "#54678d",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
