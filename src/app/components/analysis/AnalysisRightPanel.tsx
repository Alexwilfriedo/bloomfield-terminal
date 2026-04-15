import { useState } from "react";
import type { ReactNode } from "react";
import {
  Bell,
  BellRing,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Clock,
  FileText,
  AlertTriangle,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  TrendingDown,
  Info,
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

const PUBLICATIONS = [
  {
    id: 1,
    source: "SGBCI",
    sourceColor: C.gold,
    type: "Résultats Annuels",
    title: "Résultats Financiers FY2023 — SGBCI",
    date: "28 Fév 2024",
    tag: "OFFICIEL",
    tagColor: C.green,
    featured: true,
    icon: "📊",
  },
  {
    id: 2,
    source: "Bloomfield",
    sourceColor: C.accent,
    type: "Note Analyste",
    title: "SGBCI : Upgrade BUY · Cible 15 800 XOF · Momentum bénéficiaire solide",
    date: "05 Mar 2024",
    tag: "RESEARCH",
    tagColor: C.accent,
    featured: true,
    icon: "📈",
  },
  {
    id: 3,
    source: "BRVM",
    sourceColor: C.dim,
    type: "Avis Marché",
    title: "Convocation Assemblée Générale Ordinaire SGBCI — 25 Avr 2024",
    date: "12 Mar 2024",
    tag: "AGO",
    tagColor: C.purple,
    featured: false,
    icon: "📋",
  },
  {
    id: 4,
    source: "CREPMF",
    sourceColor: C.orange,
    type: "Dépôt Réglementaire",
    title: "Rapport Annuel 2023 SGBCI — Dépôt CREPMF conforme",
    date: "01 Mar 2024",
    tag: "RÉGL.",
    tagColor: C.orange,
    featured: false,
    icon: "📁",
  },
  {
    id: 5,
    source: "Soc. Générale",
    sourceColor: C.dim,
    type: "Groupe",
    title: "Résultats Groupe Société Générale T4 2023 — Branche Afrique",
    date: "18 Fév 2024",
    tag: "GROUPE",
    tagColor: C.dim,
    featured: false,
    icon: "🌍",
  },
];

const RISK_SIGNALS = [
  {
    id: 1,
    type: "Risque Crédit",
    icon: <TrendingDown size={11} color={C.gold} />,
    severity: "MODÉRÉ",
    severityColor: C.gold,
    title: "Concentration sectorielle — Immobilier",
    detail: "23.4% de l'encours total sur le secteur immobilier. Vigilance recommandée.",
    triggered: true,
    ago: "Mis à jour Fév 2024",
  },
  {
    id: 2,
    type: "Risque Taux",
    icon: <AlertTriangle size={11} color={C.orange} />,
    severity: "MODÉRÉ",
    severityColor: C.orange,
    title: "Duration gap portefeuille obligataire",
    detail: "Duration actif 3.8 ans vs passif 2.1 ans. Sensibilité aux hausses de taux.",
    triggered: true,
    ago: "Mis à jour Mar 2024",
  },
  {
    id: 3,
    type: "Risque Réglementaire",
    icon: <CheckCircle2 size={11} color={C.green} />,
    severity: "FAIBLE",
    severityColor: C.green,
    title: "Conformité Bâle III — sous contrôle",
    detail: "Tous ratios prudentiels au-dessus des minimums BCEAO. Prochaine revue en Jul 2024.",
    triggered: false,
    ago: "Avr 2024",
  },
  {
    id: 4,
    type: "Risque Marché",
    icon: <Info size={11} color={C.accent} />,
    severity: "FAIBLE",
    severityColor: C.accent,
    title: "Exposition souveraine CIV — Surveillance",
    detail: "31.2% du portefeuille titres en obligations souveraines CIV (OAT BCEAO).",
    triggered: false,
    ago: "Mar 2024",
  },
];

const ANALYST_NOTES = [
  {
    id: 1,
    analyst: "Kofi Asante",
    initials: "KA",
    color: "#a78bfa",
    role: "Analyste Senior Banques",
    note: "SGBCI confirme sa première place dans le secteur bancaire BRVM. La dynamique de croissance des dépôts (+10.7%) reste le pilier principal. Maintien de la recommandation ACHAT.",
    date: "08 Avr 2026",
    tag: "BUY",
    tagColor: C.green,
    target: "15 800 XOF",
  },
  {
    id: 2,
    analyst: "Aminata Diallo",
    initials: "AD",
    color: "#d6b68d",
    role: "Analyste Risque",
    note: "Le taux NPL à 4.2% — meilleur du secteur — témoigne d'une politique de crédit rigoureuse. Le coussin de provisions reste suffisant même en scénario adverse.",
    date: "05 Mar 2024",
    tag: "HOLD",
    tagColor: C.gold,
    target: "14 200 XOF",
  },
];

function SectionHeader({ icon, title, count, badge }: { icon: ReactNode; title: string; count?: number; badge?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 10px 5px",
        background: "rgba(0, 4, 48,0.3)",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {icon}
        <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</span>
        {count !== undefined && (
          <span style={{ fontSize: 8, color: C.muted, background: "rgba(44, 61, 127,0.2)", borderRadius: 8, padding: "0 5px" }}>{count}</span>
        )}
        {badge !== undefined && badge > 0 && (
          <span style={{ fontSize: 8, fontWeight: 700, color: "#000430", background: C.gold, borderRadius: 8, padding: "0 5px" }}>{badge}</span>
        )}
      </div>
    </div>
  );
}

export function AnalysisRightPanel() {
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
          paddingTop: 8,
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setCollapsed(false)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            background: "rgba(244,185,66,0.08)",
            border: "1px solid rgba(244,185,66,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.gold,
          }}
        >
          <ChevronLeft size={12} />
        </button>
      </div>
    );
  }

  const activeRisks = RISK_SIGNALS.filter((r) => r.triggered).length;

  return (
    <div
      style={{
        width: 274,
        background: C.surface,
        borderLeft: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Panel header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 10px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.4)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Panneau Analyse
        </span>
        <button
          onClick={() => setCollapsed(true)}
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            background: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.muted,
          }}
        >
          <ChevronRight size={12} />
        </button>
      </div>

      {/* ── Risk Signals ── */}
      <div style={{ flexShrink: 0, borderBottom: `1px solid ${C.border}` }}>
        <SectionHeader
          icon={<Bell size={10} color={C.red} />}
          title="Signaux de Risque"
          count={RISK_SIGNALS.length}
          badge={activeRisks}
        />
        <div style={{ padding: "4px 0 5px" }}>
          {RISK_SIGNALS.map((signal) => (
            <div
              key={signal.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                padding: "5px 10px",
                cursor: "pointer",
                background: signal.triggered ? signal.severityColor + "05" : "transparent",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = signal.triggered ? signal.severityColor + "0c" : "rgba(214, 182, 141,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = signal.triggered ? signal.severityColor + "05" : "transparent")
              }
            >
              {signal.triggered ? (
                <BellRing size={11} color={signal.severityColor} style={{ flexShrink: 0, marginTop: 1 }} />
              ) : (
                <Bell size={11} color={C.muted} style={{ flexShrink: 0, marginTop: 1 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 1 }}>
                  <span style={{ fontSize: 8, fontWeight: 700, color: C.muted }}>{signal.type}</span>
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: signal.severityColor,
                      background: signal.severityColor + "14",
                      border: `1px solid ${signal.severityColor}28`,
                      borderRadius: 3,
                      padding: "0 4px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {signal.severity}
                  </span>
                </div>
                <div style={{ fontSize: 9, fontWeight: 600, color: signal.triggered ? C.text : C.dim, lineHeight: 1.3 }}>
                  {signal.title}
                </div>
                <div style={{ fontSize: 7.5, color: C.muted, marginTop: 2, lineHeight: 1.3 }}>{signal.detail}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                  <Clock size={7} color={C.muted} />
                  <span style={{ fontSize: 7, color: C.muted }}>{signal.ago}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Analyst Notes ── */}
      <div style={{ flexShrink: 0, borderBottom: `1px solid ${C.border}` }}>
        <SectionHeader
          icon={<MessageSquare size={10} color={C.accent} />}
          title="Notes Analystes"
          count={ANALYST_NOTES.length}
        />
        <div style={{ padding: "4px 0 5px" }}>
          {ANALYST_NOTES.map((note) => (
            <div
              key={note.id}
              style={{
                padding: "6px 10px",
                borderBottom: `1px solid ${C.border}18`,
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: note.color + "22",
                    border: `1px solid ${note.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 700,
                    color: note.color,
                    flexShrink: 0,
                  }}
                >
                  {note.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.text }}>{note.analyst}</div>
                  <div style={{ fontSize: 7.5, color: C.muted }}>{note.role}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 800,
                      color: note.tagColor,
                      background: note.tagColor + "14",
                      border: `1px solid ${note.tagColor}28`,
                      borderRadius: 3,
                      padding: "1px 6px",
                    }}
                  >
                    {note.tag}
                  </span>
                  {note.target && (
                    <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>Cible: {note.target}</div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.45 }}>{note.note}</div>
              <div style={{ fontSize: 7.5, color: C.muted, marginTop: 3 }}>{note.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Publications & Filings ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        <SectionHeader
          icon={<BookOpen size={10} color={C.purple} />}
          title="Publications & Dépôts"
          count={PUBLICATIONS.length}
        />
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          {PUBLICATIONS.map((pub, i) => (
            <div
              key={pub.id}
              style={{
                padding: "6px 10px",
                borderBottom: `1px solid ${C.border}15`,
                cursor: "pointer",
                transition: "background 0.1s",
                position: "relative",
                background: pub.featured ? "rgba(214, 182, 141,0.03)" : "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.06)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = pub.featured ? "rgba(214, 182, 141,0.03)" : "transparent")
              }
            >
              {pub.featured && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 5,
                    bottom: 5,
                    width: 2,
                    borderRadius: 2,
                    background: pub.sourceColor,
                  }}
                />
              )}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontSize: 14, lineHeight: 1 }}>{pub.icon}</div>
                  <div
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: pub.tagColor,
                      background: pub.tagColor + "14",
                      border: `1px solid ${pub.tagColor}28`,
                      borderRadius: 3,
                      padding: "1px 3px",
                      marginTop: 3,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pub.tag}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 8, color: C.muted, marginBottom: 1 }}>
                    <span style={{ color: pub.sourceColor, fontWeight: 600 }}>{pub.source}</span>
                    {" · "}{pub.type}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      color: i < 2 ? C.text : C.dim,
                      fontWeight: i < 2 ? 600 : 400,
                      lineHeight: 1.35,
                    }}
                  >
                    {pub.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                    <FileText size={8} color={C.muted} />
                    <span style={{ fontSize: 7.5, color: C.muted }}>{pub.date}</span>
                  </div>
                </div>
                <ExternalLink size={9} color={C.muted} style={{ flexShrink: 0, marginTop: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
