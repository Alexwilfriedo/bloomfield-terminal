import { useState } from "react";
import type { ReactNode } from "react";
import {
  Calendar,
  Bell,
  BellRing,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Clock,
  FileText,
} from "lucide-react";

const C = {
  surface: "#000117",
  elevated: "#000117",
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

const SOVEREIGN_EVENTS = [
  {
    date: "14 Avr",
    daysLeft: 6,
    type: "ÉMISSION",
    typeColor: C.accent,
    flag: "🇨🇮",
    country: "CIV",
    label: "Bon UMOA-Titres 91j",
    amount: "40 Mds FCFA",
    status: "confirmed",
  },
  {
    date: "18 Avr",
    daysLeft: 10,
    type: "NOTATION",
    typeColor: C.gold,
    flag: "🇸🇳",
    country: "SEN",
    label: "Révision notation Moody's",
    amount: null,
    status: "planned",
  },
  {
    date: "22 Avr",
    daysLeft: 14,
    type: "ÉMISSION",
    typeColor: C.accent,
    flag: "🇸🇳",
    country: "SEN",
    label: "OAT 5 ans Sénégal",
    amount: "75 Mds FCFA",
    status: "planned",
  },
  {
    date: "28 Avr",
    daysLeft: 20,
    type: "RAPPORT",
    typeColor: C.purple,
    flag: "🌍",
    country: "UEMOA",
    label: "Bulletin BCEAO T1 2024",
    amount: null,
    status: "scheduled",
  },
  {
    date: "30 Avr",
    daysLeft: 22,
    type: "SUKUK",
    typeColor: C.orange,
    flag: "🇨🇮",
    country: "CIV",
    label: "Sukuk Souverain 7 ans",
    amount: "150 Mds FCFA",
    status: "planned",
  },
];

const MACRO_ALERTS = [
  {
    id: 1,
    flag: "🇨🇮",
    country: "CIV",
    indicator: "Inflation IHPC",
    condition: "> 5.0%",
    current: "4.2%",
    triggered: false,
    type: "threshold",
    dir: "down" as const,
    detail: "Sous le seuil — en baisse",
  },
  {
    id: 2,
    flag: "🇸🇳",
    country: "SEN",
    indicator: "Dette/PIB",
    condition: "> 75%",
    current: "74.2%",
    triggered: true,
    type: "debt",
    dir: "up" as const,
    detail: "Approche seuil critique",
    ago: "il y a 2 h",
  },
  {
    id: 3,
    flag: "🌍",
    country: "UEMOA",
    indicator: "Taux directeur BCEAO",
    condition: "Décision CPM",
    current: "3.50%",
    triggered: false,
    type: "rate",
    dir: "neutral" as const,
    detail: "Prochain CPM : Juin 2024",
  },
  {
    id: 4,
    flag: "🇧🇫",
    country: "BFA",
    indicator: "Risque pays",
    condition: "Dégradation rating",
    current: "CCC+",
    triggered: true,
    type: "rating",
    dir: "down" as const,
    detail: "S&P a dégradé en nov. 23",
    ago: "Passé",
  },
];

const PUBLICATIONS = [
  {
    id: 1,
    source: "BCEAO",
    sourceColor: C.accent,
    flag: "🌍",
    title: "Note de Conjoncture Économique UEMOA — T4 2023",
    type: "Bulletin",
    date: "Mar 2024",
    tag: "OFFICIEL",
    tagColor: C.accent,
    featured: true,
  },
  {
    id: 2,
    source: "FMI",
    sourceColor: C.purple,
    flag: "🇨🇮",
    title: "Article IV — Côte d'Ivoire 2024 : Consultations & Recommandations",
    type: "Rapport",
    date: "Fév 2024",
    tag: "FMI",
    tagColor: C.purple,
    featured: true,
  },
  {
    id: 3,
    source: "Bloomfield",
    sourceColor: C.gold,
    flag: "🇸🇳",
    title: "UEMOA Debt Outlook 2024 : Risques & Opportunités de financement",
    type: "Research",
    date: "Avr 2024",
    tag: "RESEARCH",
    tagColor: C.gold,
    featured: false,
  },
  {
    id: 4,
    source: "Banque Mondiale",
    sourceColor: "#60a5fa",
    flag: "🌍",
    title: "Africa's Pulse — Growth Prospects in Sub-Saharan Africa Q1 2024",
    type: "Rapport",
    date: "Avr 2024",
    tag: "BM",
    tagColor: "#60a5fa",
    featured: false,
  },
  {
    id: 5,
    source: "UMOA-Titres",
    sourceColor: C.accent,
    flag: "🌍",
    title: "Rapport Mensuel Marché des Titres UMOA — Mars 2024",
    type: "Bulletin",
    date: "Mar 2024",
    tag: "OFFICIEL",
    tagColor: C.accent,
    featured: false,
  },
  {
    id: 6,
    source: "INS-CI",
    sourceColor: C.green,
    flag: "🇨🇮",
    title: "Note de conjoncture CIV — PIB T3 2024 : +6.3%",
    type: "Note",
    date: "Nov 2023",
    tag: "INS",
    tagColor: C.green,
    featured: false,
  },
  {
    id: 7,
    source: "Bloomfield",
    sourceColor: C.gold,
    flag: "🇧🇫",
    title: "Burkina Faso : Risque politique & impact sur financement souverain",
    type: "Analyse",
    date: "Jan 2024",
    tag: "RESEARCH",
    tagColor: C.gold,
    featured: false,
  },
];

function SectionHeader({
  icon,
  title,
  count,
  badge,
  sub,
}: {
  icon: ReactNode;
  title: string;
  count?: number;
  badge?: number;
  sub?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 10px 5px",
        background: "rgba(0, 1, 23,0.3)",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {icon}
        <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          {title}
        </span>
        {count !== undefined && (
          <span style={{ fontSize: 8, color: C.muted, background: "rgba(44, 61, 127,0.2)", borderRadius: 8, padding: "0 5px" }}>
            {count}
          </span>
        )}
        {badge !== undefined && badge > 0 && (
          <span style={{ fontSize: 8, fontWeight: 700, color: "#000117", background: C.gold, borderRadius: 8, padding: "0 5px" }}>
            {badge}
          </span>
        )}
        {sub && <span style={{ fontSize: 8, color: C.muted }}>{sub}</span>}
      </div>
    </div>
  );
}

export function MacroRightPanel() {
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
            background: "rgba(167,139,250,0.08)",
            border: "1px solid rgba(167,139,250,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.purple,
          }}
        >
          <ChevronLeft size={12} />
        </button>
      </div>
    );
  }

  const triggeredAlerts = MACRO_ALERTS.filter((a) => a.triggered).length;

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
          background: "rgba(0, 1, 23,0.4)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Panneau Souverain
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

      {/* ── Sovereign Calendar ── */}
      <div style={{ flexShrink: 0, borderBottom: `1px solid ${C.border}` }}>
        <SectionHeader
          icon={<Calendar size={10} color={C.accent} />}
          title="Calendrier Souverain"
          count={SOVEREIGN_EVENTS.length}
          sub="30j"
        />
        <div style={{ padding: "5px 0 5px" }}>
          {SOVEREIGN_EVENTS.map((ev, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 7,
                padding: "4px 10px",
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {/* Date block */}
              <div
                style={{
                  minWidth: 30,
                  textAlign: "center",
                  padding: "3px 3px",
                  borderRadius: 4,
                  background: "rgba(214, 182, 141,0.08)",
                  border: "1px solid rgba(214, 182, 141,0.18)",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: C.accent, lineHeight: 1 }}>
                  {ev.date.split(" ")[0]}
                </div>
                <div style={{ fontSize: 7, color: C.muted, lineHeight: 1 }}>
                  {ev.date.split(" ")[1]}
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 7.5,
                      fontWeight: 700,
                      color: ev.typeColor,
                      background: ev.typeColor + "14",
                      border: `1px solid ${ev.typeColor}28`,
                      borderRadius: 3,
                      padding: "1px 4px",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ev.type}
                  </span>
                  <span style={{ fontSize: 10 }}>{ev.flag}</span>
                  <span style={{ fontSize: 8.5, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {ev.label}
                  </span>
                </div>
                {ev.amount && (
                  <div style={{ fontSize: 8, color: C.muted, marginTop: 1 }}>
                    Montant : {ev.amount}
                  </div>
                )}
              </div>

              {/* Days left */}
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: ev.daysLeft <= 7 ? C.gold : C.muted,
                  background: ev.daysLeft <= 7 ? "rgba(244,185,66,0.1)" : "rgba(44, 61, 127,0.15)",
                  borderRadius: 3,
                  padding: "2px 5px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                J−{ev.daysLeft}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Macro Alerts ── */}
      <div style={{ flexShrink: 0, borderBottom: `1px solid ${C.border}` }}>
        <SectionHeader
          icon={<Bell size={10} color={C.gold} />}
          title="Alertes Macro"
          count={MACRO_ALERTS.length}
          badge={triggeredAlerts}
        />
        <div style={{ padding: "4px 0 5px" }}>
          {MACRO_ALERTS.map((alert) => (
            <div
              key={alert.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                padding: "4px 10px",
                cursor: "pointer",
                background: alert.triggered ? "rgba(244,185,66,0.04)" : "transparent",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = alert.triggered
                  ? "rgba(244,185,66,0.08)"
                  : "rgba(214, 182, 141,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = alert.triggered
                  ? "rgba(244,185,66,0.04)"
                  : "transparent")
              }
            >
              {alert.triggered ? (
                <BellRing size={11} color={C.gold} style={{ flexShrink: 0, marginTop: 1 }} />
              ) : (
                <Bell size={11} color={C.muted} style={{ flexShrink: 0, marginTop: 1 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10 }}>{alert.flag}</span>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: alert.triggered ? C.gold : C.text }}>
                    {alert.country} · {alert.indicator}
                  </span>
                  {alert.triggered && (
                    <span
                      style={{
                        fontSize: 7,
                        fontWeight: 700,
                        color: C.gold,
                        background: "rgba(244,185,66,0.15)",
                        border: "1px solid rgba(244,185,66,0.3)",
                        borderRadius: 3,
                        padding: "1px 4px",
                        letterSpacing: "0.04em",
                      }}
                    >
                      ACTIF
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                  <span style={{ fontSize: 8.5, fontWeight: 600, color: C.dim }}>
                    {alert.condition}
                  </span>
                  <span style={{ fontSize: 8, color: C.muted }}>·</span>
                  <span style={{ fontSize: 8.5, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                    Actuel : {alert.current}
                  </span>
                </div>
                <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{alert.detail}</div>
                {alert.ago && (
                  <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
                    <Clock size={8} color={C.gold} />
                    <span style={{ fontSize: 7.5, color: C.gold }}>{alert.ago}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Publications & Research ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minHeight: 0 }}>
        <SectionHeader
          icon={<BookOpen size={10} color={C.purple} />}
          title="Publications & Recherche"
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
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = pub.featured
                  ? "rgba(214, 182, 141,0.03)"
                  : "transparent")
              }
            >
              {/* Featured stripe */}
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
                {/* Source badge */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 12 }}>{pub.flag}</span>
                  <span
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: pub.sourceColor,
                      background: pub.sourceColor + "14",
                      border: `1px solid ${pub.sourceColor}28`,
                      borderRadius: 3,
                      padding: "1px 4px",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pub.tag}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 9.5,
                      color: i < 2 ? C.text : "#a8c8e0",
                      fontWeight: i < 2 ? 600 : 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {pub.title}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 3 }}>
                    <FileText size={8} color={C.muted} />
                    <span style={{ fontSize: 8, color: C.muted }}>{pub.type}</span>
                    <span style={{ fontSize: 8, color: C.muted }}>·</span>
                    <span style={{ fontSize: 8, color: C.muted }}>{pub.source}</span>
                    <span style={{ fontSize: 8, color: C.muted }}>·</span>
                    <span style={{ fontSize: 8, color: C.muted }}>{pub.date}</span>
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