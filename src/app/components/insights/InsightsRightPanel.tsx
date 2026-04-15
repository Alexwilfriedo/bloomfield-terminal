import { useState } from "react";
import type { ReactNode } from "react";
import {
  Bookmark,
  Bell,
  Calendar,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Info,
  Clock,
  Star,
  X,
  ChevronLeft,
} from "lucide-react";

const C = {
  surface: "#000430",
  elevated: "#000430",
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
  orange: "#fb923c",
};

const SAVED_ITEMS = [
  { id: 1, title: "BCEAO : Taux directeur Q1 2026 — Décryptage", type: "ANALYSE", date: "Auj.", color: C.accent },
  { id: 2, title: "Rapport Trimestriel UEMOA — T1 2026", type: "RAPPORT", date: "05 Avr", color: C.gold },
  { id: 3, title: "Module : Valorisation DCF — 35% complété", type: "FORMATION", date: "Hier", color: C.purple },
  { id: 4, title: "SONATEL Upgrade BUY — Note Bloomfield", type: "NOTE", date: "08 Avr", color: C.green },
];

const RECOMMENDED = [
  { id: 1, title: "Analyse: Pétrole — Impact sur les économies importatrices UEMOA", type: "ANALYSE", score: 98, color: C.accent },
  { id: 2, title: "Vidéo: Construction de portefeuille en XOF — Stratégie 2026", type: "VIDÉO", score: 94, color: C.orange },
  { id: 3, title: "Rapport: Perspectives du secteur télécom Afrique subsaharienne", type: "RAPPORT", score: 91, color: C.gold },
  { id: 4, title: "Module: Analyse des Risques Souverains Avancés", type: "FORMATION", score: 87, color: C.purple },
];

const EVENTS = [
  { id: 1, date: "09 Avr", time: "10:00", title: "BCEAO : Publication du Bulletin Mensuel de Statistiques Monétaires", type: "BCEAO", typeColor: C.accent, isToday: false },
  { id: 2, date: "10 Avr", time: "—", title: "BRVM : Clôture des souscriptions OAT Côte d'Ivoire 7 ans — Tranche 2026-A", type: "OBLIGATIONS", typeColor: C.gold, isToday: false },
  { id: 3, date: "12 Avr", time: "14:00", title: "Webinaire Bloomfield : Stratégie Obligataire UEMOA — T2 2026", type: "WEBINAIRE", typeColor: C.purple, isToday: false },
  { id: 4, date: "15 Avr", time: "—", title: "SONATEL : Date limite de versement dividende FY2025", type: "DIVIDENDE", typeColor: C.green, isToday: false },
  { id: 5, date: "17 Avr", time: "09:00", title: "BCEAO : Résultats adjudication BAT 26 semaines — SN, CI, ML", type: "ADJUDICATION", typeColor: C.accent, isToday: false },
  { id: 6, date: "22 Avr", time: "11:00", title: "Conférence BRVM : Résultats annuels SGBCI FY2025 — AGO 2026", type: "AGO", typeColor: C.orange, isToday: false },
];

const LIVE_ALERTS = [
  { id: 1, type: "info", message: "BRVM Composite franchit 285 points — premier passage en 18 mois", time: "14:27", color: C.accent },
  { id: 2, type: "warning", message: "PALM CI : fort volume inhabituellement élevé sur les 30 dernières minutes", time: "13:58", color: C.gold },
  { id: 3, type: "success", message: "SONATEL résultats FY2025 : dividende confirmé 1 800 XOF/action", time: "13:45", color: C.green },
  { id: 4, type: "error", message: "XOF/USD : franchissement du seuil d'alerte 598 — surveillance renforcée", time: "12:30", color: C.red },
];

const ALERT_ICONS: Record<string, ReactNode> = {
  info: <Info size={10} />,
  warning: <AlertTriangle size={10} />,
  success: <CheckCircle2 size={10} />,
  error: <AlertTriangle size={10} />,
};

function PanelSection({
  title,
  icon,
  color,
  children,
  action,
}: {
  title: string;
  icon: ReactNode;
  color: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${C.border}`,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "9px 12px",
          background: "rgba(0, 4, 48,0.3)",
          borderBottom: `1px solid rgba(44, 61, 127,0.16)`,
        }}
      >
        <span style={{ color }}>{icon}</span>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {title}
        </span>
        <div style={{ flex: 1 }} />
        {action}
      </div>
      {children}
    </div>
  );
}

export function InsightsRightPanel() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div
        style={{
          width: 28,
          background: C.surface,
          borderLeft: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 10,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setCollapsed(false)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            background: "rgba(214, 182, 141,0.1)",
            border: "1px solid rgba(214, 182, 141,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.accent,
          }}
        >
          <ChevronLeft size={11} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 256,
        flexShrink: 0,
        background: C.surface,
        borderLeft: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          height: 40,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.4)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Panneau Intelligence
        </span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setCollapsed(true)}
          style={{
            width: 20,
            height: 20,
            borderRadius: 3,
            background: "rgba(0, 4, 48,0.5)",
            border: `1px solid ${C.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.muted,
          }}
        >
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        {/* Live Alerts */}
        <PanelSection
          title="Alertes Live"
          icon={<Bell size={10} />}
          color={C.red}
          action={
            <span style={{ fontSize: 8, color: C.red, fontWeight: 700 }}>
              {LIVE_ALERTS.length} actives
            </span>
          }
        >
          <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
            {LIVE_ALERTS.map((alert) => (
              <div
                key={alert.id}
                style={{
                  display: "flex",
                  gap: 6,
                  padding: "6px 8px",
                  borderRadius: 4,
                  background: alert.color + "0c",
                  border: `1px solid ${alert.color}25`,
                  cursor: "pointer",
                }}
              >
                <span style={{ color: alert.color, flexShrink: 0, marginTop: 1 }}>{ALERT_ICONS[alert.type]}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 9,
                      color: C.dim,
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {alert.message}
                  </p>
                  <span style={{ fontSize: 7.5, color: C.muted }}>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </PanelSection>

        {/* Saved Content */}
        <PanelSection
          title="Contenus Sauvegardés"
          icon={<Bookmark size={10} />}
          color={C.gold}
          action={
            <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex", alignItems: "center" }}>
              <ChevronRight size={10} />
            </button>
          }
        >
          <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
            {SAVED_ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "6px 8px",
                  borderRadius: 4,
                  background: "rgba(0, 4, 48,0.4)",
                  border: `1px solid rgba(44, 61, 127,0.16)`,
                  cursor: "pointer",
                  transition: "border-color 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214, 182, 141,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(44, 61, 127,0.16)";
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    background: item.color + "14",
                    border: `1px solid ${item.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bookmark size={9} color={item.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: C.text,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.title}
                  </div>
                  <div style={{ display: "flex", gap: 5, marginTop: 1 }}>
                    <span
                      style={{
                        fontSize: 7.5,
                        color: item.color,
                        fontWeight: 700,
                      }}
                    >
                      {item.type}
                    </span>
                    <span style={{ fontSize: 7.5, color: C.muted }}>{item.date}</span>
                  </div>
                </div>
                <X size={8} color={C.muted} style={{ flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </PanelSection>

        {/* AI Recommendations */}
        <PanelSection
          title="Recommandations IA"
          icon={<Star size={10} />}
          color={C.accent}
          action={
            <span style={{ fontSize: 8, color: C.muted }}>Basé sur votre profil</span>
          }
        >
          <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
            {RECOMMENDED.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 7,
                  padding: "7px 8px",
                  borderRadius: 4,
                  background: "rgba(0, 4, 48,0.4)",
                  border: `1px solid rgba(44, 61, 127,0.16)`,
                  cursor: "pointer",
                  transition: "border-color 0.1s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}30`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(44, 61, 127,0.16)";
                }}
              >
                <div
                  style={{
                    minWidth: 28,
                    height: 20,
                    borderRadius: 3,
                    background: item.color + "18",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 8.5, fontWeight: 800, color: item.color }}>{item.score}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: C.dim,
                      lineHeight: 1.4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.title}
                  </div>
                  <span
                    style={{
                      fontSize: 7.5,
                      color: item.color,
                      fontWeight: 700,
                    }}
                  >
                    {item.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </PanelSection>

        {/* Events Calendar */}
        <PanelSection
          title="Agenda & Événements"
          icon={<Calendar size={10} />}
          color={C.purple}
          action={
            <button style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", gap: 2, fontSize: 8 }}>
              Calendrier
              <ChevronRight size={8} />
            </button>
          }
        >
          <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
            {EVENTS.map((event) => (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  gap: 7,
                  cursor: "pointer",
                  padding: "5px 0",
                  borderBottom: `1px solid rgba(44, 61, 127,0.12)`,
                }}
              >
                {/* Date block */}
                <div
                  style={{
                    minWidth: 30,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "3px 4px",
                    borderRadius: 4,
                    background: event.typeColor + "12",
                    border: `1px solid ${event.typeColor}25`,
                  }}
                >
                  <span style={{ fontSize: 8, fontWeight: 800, color: event.typeColor, lineHeight: 1 }}>
                    {event.date.split(" ")[0]}
                  </span>
                  <span style={{ fontSize: 7, color: C.muted, lineHeight: 1 }}>
                    {event.date.split(" ")[1]}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: C.text,
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {event.title}
                  </div>
                  <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
                    <span
                      style={{
                        fontSize: 7.5,
                        color: event.typeColor,
                        fontWeight: 700,
                      }}
                    >
                      {event.type}
                    </span>
                    {event.time !== "—" && (
                      <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 7.5, color: C.muted }}>
                        <Clock size={7} />
                        {event.time}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add event CTA */}
          <div style={{ padding: "6px 10px 8px" }}>
            <button
              style={{
                width: "100%",
                padding: "5px 0",
                borderRadius: 4,
                background: "rgba(167,139,250,0.07)",
                border: "1px dashed rgba(167,139,250,0.3)",
                color: C.purple,
                fontSize: 9,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              + Ajouter au calendrier
            </button>
          </div>
        </PanelSection>

        {/* Related Intelligence */}
        <PanelSection
          title="Intelligence Liée"
          icon={<TrendingUp size={10} />}
          color={C.green}
        >
          <div style={{ padding: "8px 10px" }}>
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 5 }}>
                PAYS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {["Côte d'Ivoire", "Sénégal", "Mali", "Burkina Faso", "Togo"].map((c) => (
                  <span
                    key={c}
                    style={{
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: "rgba(214, 182, 141,0.08)",
                      border: "1px solid rgba(214, 182, 141,0.2)",
                      fontSize: 8,
                      color: C.accent,
                      cursor: "pointer",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 5 }}>
                SOCIÉTÉS LIÉES
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {["SONATEL", "SGBCI", "PALM CI", "BOA CI", "CIE", "SOLIBRA"].map((co) => (
                  <span
                    key={co}
                    style={{
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: "rgba(244,185,66,0.08)",
                      border: "1px solid rgba(244,185,66,0.2)",
                      fontSize: 8,
                      color: C.gold,
                      cursor: "pointer",
                    }}
                  >
                    {co}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 5 }}>
                INDICATEURS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {["Taux BCEAO", "Inflation", "PIB", "BRVM Composite", "XOF/USD"].map((ind) => (
                  <span
                    key={ind}
                    style={{
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: "rgba(167,139,250,0.08)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      fontSize: 8,
                      color: C.purple,
                      cursor: "pointer",
                    }}
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </PanelSection>
      </div>
    </div>
  );
}
