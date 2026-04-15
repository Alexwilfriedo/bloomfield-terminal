import { Bell, AlertTriangle, CheckCircle2, Info, X, TrendingUp, FileText, Calendar } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";
import type { ReactNode } from "react";

const C = {
  accent: "#d6b68d", gold: "#f4b942", green: "#10c87a",
  red: "#f43860", text: "#ddeaf8", dim: "#6b96b8",
  muted: "#54678d", border: "rgba(44, 61, 127,0.32)", orange: "#fb923c", purple: "#a78bfa",
};

interface Alert {
  id: number;
  severity: "critical" | "warning" | "info" | "success";
  category: "threshold" | "publication" | "event" | "signal";
  title: string;
  detail: string;
  time: string;
  source: string;
  dismissed?: boolean;
}

const ALERTS: Alert[] = [
  { id: 1, severity: "critical", category: "threshold", title: "PALM CI — Franchissement +7% en séance", detail: "Seuil de surveillance (+5%) dépassé. Volume 3× la moyenne 30J", time: "14:32", source: "Système", dismissed: false },
  { id: 2, severity: "warning", category: "threshold", title: "OAT CI 7Y — Rendement 6.89% (+2bp)", detail: "Spread vs benchmark BCEAO : +339bp. Surveillance active", time: "13:58", source: "Marchés", dismissed: false },
  { id: 3, severity: "info", category: "publication", title: "Nouvelle note Bloomfield : SONATEL BUY", detail: "Mise à jour recommandation · Cible 19 500 XOF · Rapport disponible", time: "13:45", source: "Research", dismissed: false },
  { id: 4, severity: "success", category: "event", title: "BCEAO — Taux directeur maintenu à 3.50%", detail: "Comité de Politique Monétaire · Décision sans surprise · Stable Q2", time: "12:30", source: "BCEAO", dismissed: false },
  { id: 5, severity: "warning", category: "signal", title: "XOF/USD — Approche du seuil 598", detail: "Signal de surveillance déclenché · Niveau précédent 595.80", time: "11:48", source: "Change", dismissed: false },
  { id: 6, severity: "info", category: "event", title: "Résultats SGBCI FY2025 — Publication demain", detail: "AGO + publication annuelle confirmées pour le 09 Avr à 10h00", time: "09:00", source: "BRVM", dismissed: false },
];

const SEVERITY_COLORS = { critical: C.red, warning: C.gold, info: C.accent, success: C.green };
const SEVERITY_ICONS: Record<string, ReactNode> = {
  critical: <AlertTriangle size={10} />,
  warning: <AlertTriangle size={10} />,
  info: <Info size={10} />,
  success: <CheckCircle2 size={10} />,
};
const CATEGORY_ICONS: Record<string, ReactNode> = {
  threshold: <TrendingUp size={9} />,
  publication: <FileText size={9} />,
  event: <Calendar size={9} />,
  signal: <Bell size={9} />,
};

export function AlertsPanelWidget() {
  const critCount = ALERTS.filter((a) => a.severity === "critical").length;

  return (
    <WidgetShell
      title="Alertes Actives"
      subtitle="Seuils · Publications · Événements"
      lastUpdate="Temps réel"
      accentColor={C.red}
      actions={
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 7px", borderRadius: 3, background: "rgba(244,56,96,0.1)", border: "1px solid rgba(244,56,96,0.25)" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.red, boxShadow: `0 0 4px ${C.red}` }} />
          <span style={{ fontSize: 8, fontWeight: 700, color: C.red }}>{critCount} CRITIQUES</span>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginBottom: 2 }}>
          {[
            { label: "Critiques", count: ALERTS.filter((a) => a.severity === "critical").length, color: C.red },
            { label: "Warnings", count: ALERTS.filter((a) => a.severity === "warning").length, color: C.gold },
            { label: "Infos", count: ALERTS.filter((a) => a.severity === "info").length, color: C.accent },
            { label: "Succès", count: ALERTS.filter((a) => a.severity === "success").length, color: C.green },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "4px 6px", background: "rgba(0, 4, 48,0.4)", borderRadius: 4, border: `1px solid ${s.color}22` }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ fontSize: 7.5, color: C.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Alert items */}
        {ALERTS.map((alert) => {
          const severityColor = SEVERITY_COLORS[alert.severity];
          return (
            <div key={alert.id} style={{
              display: "flex", gap: 8, padding: "7px 9px", borderRadius: 5,
              background: severityColor + "08", border: `1px solid ${severityColor}22`,
              position: "relative", cursor: "pointer",
            }}>
              {/* Left severity indicator */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flexShrink: 0 }}>
                <span style={{ color: severityColor }}>{SEVERITY_ICONS[alert.severity]}</span>
                <span style={{ color: C.muted, marginTop: 2 }}>{CATEGORY_ICONS[alert.category]}</span>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                  <span style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: severityColor + "18", border: `1px solid ${severityColor}35`, color: severityColor, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {alert.severity}
                  </span>
                  <span style={{ fontSize: 7.5, color: C.muted }}>{alert.source}</span>
                  <span style={{ fontSize: 7.5, color: C.muted, marginLeft: "auto" }}>{alert.time}</span>
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 2 }}>{alert.title}</div>
                <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{alert.detail}</div>
              </div>

              {/* Dismiss */}
              <button style={{ position: "absolute", top: 5, right: 5, background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 2 }}>
                <X size={8} />
              </button>
            </div>
          );
        })}

        {/* Footer */}
        <button style={{ width: "100%", padding: "5px 0", borderRadius: 4, background: "rgba(214, 182, 141,0.06)", border: "1px dashed rgba(214, 182, 141,0.2)", color: C.accent, fontSize: 9, fontWeight: 600, cursor: "pointer", letterSpacing: "0.04em" }}>
          + Configurer les alertes de seuil
        </button>
      </div>
    </WidgetShell>
  );
}
