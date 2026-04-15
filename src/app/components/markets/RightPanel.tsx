import { useState } from "react";
import {
  Star,
  TrendingUp,
  TrendingDown,
  Bell,
  BellRing,
  Plus,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
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

const watchlist = [
  { ticker: "SONATEL", full: "Sonatel SA / SN", price: "16 800", pct: "+5.21%", up: true, sector: "Télécom" },
  { ticker: "PALM CI", full: "Palmci / CI", price: "7 295", pct: "+7.35%", up: true, sector: "Agri" },
  { ticker: "ETI", full: "Ecobank Transnat.", price: "18.50", pct: "+3.78%", up: true, sector: "Finance" },
  { ticker: "BOA CI", full: "Bank of Africa CI", price: "6 850", pct: "+1.23%", up: true, sector: "Finance" },
  { ticker: "BOLLORE CI", full: "Bolloré CI", price: "3 200", pct: "+4.92%", up: true, sector: "Transport" },
  { ticker: "CIE", full: "CIE / CI", price: "1 580", pct: "-1.95%", up: false, sector: "Énergie" },
  { ticker: "SAPH", full: "SAPH CI", price: "4 195", pct: "-3.42%", up: false, sector: "Agri" },
];

const alerts = [
  { ticker: "PALM CI", condition: "Cours > 7 000 FCFA", type: "price", triggered: true, ago: "il y a 12 min" },
  { ticker: "SONATEL", condition: "Cours > 17 000 FCFA", type: "price", triggered: false, ago: "" },
  { ticker: "SAPH", condition: "Cours < 4 000 FCFA", type: "price", triggered: false, ago: "" },
  { ticker: "BRVM Comp.", condition: "Indice > 285", type: "index", triggered: false, ago: "" },
];

const news = [
  {
    id: 1,
    tag: "BCEAO",
    tagColor: C.accent,
    headline: "BCEAO maintient son taux directeur à 3,50% — Décision du Comité de Politique Monétaire",
    source: "BCEAO / Bloomfield",
    time: "il y a 15 min",
    priority: true,
  },
  {
    id: 2,
    tag: "DETTES",
    tagColor: C.gold,
    headline: "CIV : émission obligataire 200 Mds FCFA — sursouscrit ×2.4",
    source: "UMOA-Titres",
    time: "il y a 1 h",
    priority: true,
  },
  {
    id: 3,
    tag: "RÉSULTATS",
    tagColor: C.green,
    headline: "SONATEL publie S1 2024 : bénéfice net +8,3% à 183 Mds FCFA",
    source: "SONATEL IR",
    time: "il y a 2 h",
  },
  {
    id: 4,
    tag: "FMI",
    tagColor: C.purple,
    headline: "FMI relève prévisions UEMOA à 6,1% pour 2025 (WEO)",
    source: "FMI World Economic Outlook",
    time: "il y a 3 h",
  },
  {
    id: 5,
    tag: "BRVM",
    tagColor: C.accent,
    headline: "BRVM : capitalisation record à 7 843 Mds FCFA — nouveau sommet historique",
    source: "BRVM / Bloomfield",
    time: "il y a 4 h",
  },
  {
    id: 6,
    tag: "AGRI",
    tagColor: "#34d399",
    headline: "Cacao CI : production 2023/24 estimée à 2,2 Mt selon le CCC",
    source: "CCC Abidjan",
    time: "il y a 5 h",
  },
  {
    id: 7,
    tag: "PÉTROLE",
    tagColor: C.orange,
    headline: "WTI recule à 71,84 USD/bl sur craintes demande Asie",
    source: "Reuters / Bloomfield",
    time: "il y a 6 h",
  },
];

export function RightPanel() {
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
            background: "rgba(214, 182, 141,0.08)",
            border: `1px solid rgba(214, 182, 141,0.2)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.accent,
          }}
        >
          <ChevronLeft size={12} />
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: 272,
        background: C.surface,
        borderLeft: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* ── Panel header ── */}
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
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Panneau Contextuel
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

      {/* ── WATCHLIST Section ── */}
      <div
        style={{
          flexShrink: 0,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <SectionHeader
          title="Watchlist"
          count={watchlist.length}
          icon={<Star size={10} color={C.gold} fill={C.gold} />}
          action={
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "2px 6px",
                borderRadius: 3,
                border: `1px solid ${C.border}`,
                background: "transparent",
                color: C.dim,
                fontSize: 8,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              <Plus size={8} />
              Ajouter
            </button>
          }
        />
        <div style={{ padding: "4px 0" }}>
          {watchlist.map((item) => (
            <div
              key={item.ticker}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 52px",
                alignItems: "center",
                padding: "4px 10px",
                cursor: "pointer",
                transition: "background 0.1s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                <Star
                  size={8}
                  color={C.gold}
                  fill={C.gold}
                  style={{ flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: C.text,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.ticker}
                  </div>
                  <div style={{ fontSize: 7, color: C.muted }}>{item.sector}</div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.text,
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "right",
                }}
              >
                {item.price}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 2,
                  fontSize: 10,
                  fontWeight: 700,
                  color: item.up ? C.green : C.red,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {item.up ? (
                  <TrendingUp size={8} />
                ) : (
                  <TrendingDown size={8} />
                )}
                {item.pct}
              </div>
            </div>
          ))}
        </div>
        {/* Watchlist summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "5px 10px 8px",
            borderTop: `1px solid ${C.border}20`,
          }}
        >
          <MiniStat
            value={watchlist.filter((w) => w.up).length}
            label="Hausses"
            color={C.green}
          />
          <MiniStat
            value={watchlist.filter((w) => !w.up).length}
            label="Baisses"
            color={C.red}
          />
          <MiniStat value="+2.77%" label="Perf. moy." color={C.gold} />
        </div>
      </div>

      {/* ── ALERTS Section ── */}
      <div
        style={{
          flexShrink: 0,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <SectionHeader
          title="Alertes Actives"
          count={alerts.length}
          icon={<Bell size={10} color={C.gold} />}
          badge={
            alerts.filter((a) => a.triggered).length > 0
              ? alerts.filter((a) => a.triggered).length
              : undefined
          }
        />
        <div style={{ padding: "4px 0 6px" }}>
          {alerts.map((alert, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 6,
                padding: "4px 10px",
                cursor: "pointer",
                transition: "background 0.1s",
                background: alert.triggered
                  ? "rgba(244,185,66,0.04)"
                  : "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = alert.triggered
                  ? "rgba(244,185,66,0.07)"
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
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: alert.triggered ? C.gold : C.text,
                    }}
                  >
                    {alert.ticker}
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
                      DÉCLENCHÉ
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 9, color: C.dim, marginTop: 1 }}>
                  {alert.condition}
                </div>
                {alert.triggered && (
                  <div
                    style={{
                      fontSize: 8,
                      color: C.gold,
                      marginTop: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Clock size={8} />
                    {alert.ago}
                  </div>
                )}
              </div>
              {!alert.triggered && (
                <CheckCircle size={10} color={C.muted} style={{ flexShrink: 0, marginTop: 2 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── NEWS Section ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <SectionHeader
          title="Flash Info"
          icon={
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10c87a",
                boxShadow: "0 0 4px #10c87a",
              }}
            />
          }
          sub="Flux temps réel"
        />
        <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
          {news.map((item, i) => (
            <div
              key={item.id}
              style={{
                padding: "6px 10px",
                borderBottom: `1px solid ${C.border}15`,
                cursor: "pointer",
                transition: "background 0.1s",
                position: "relative",
                background:
                  i === 0 ? "rgba(214, 182, 141,0.03)" : "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "rgba(214, 182, 141,0.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  i === 0 ? "rgba(214, 182, 141,0.03)" : "transparent")
              }
            >
              {/* Priority stripe */}
              {item.priority && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 5,
                    bottom: 5,
                    width: 2,
                    borderRadius: 2,
                    background: item.tagColor,
                  }}
                />
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 7,
                    fontWeight: 700,
                    color: item.tagColor,
                    background: item.tagColor + "15",
                    border: `1px solid ${item.tagColor}30`,
                    borderRadius: 3,
                    padding: "1px 4px",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {item.tag}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: i === 0 ? C.text : "#a8c8e0",
                      fontWeight: i === 0 ? 600 : 400,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.headline}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 3,
                    }}
                  >
                    <span style={{ fontSize: 8, color: C.muted }}>
                      {item.source}
                    </span>
                    <span style={{ fontSize: 8, color: C.muted }}>·</span>
                    <span style={{ fontSize: 8, color: C.muted }}>
                      {item.time}
                    </span>
                  </div>
                </div>
                <ExternalLink
                  size={9}
                  color={C.muted}
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  count,
  icon,
  action,
  badge,
  sub,
}: {
  title: string;
  count?: number;
  icon?: React.ReactNode;
  action?: React.ReactNode;
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
        background: "rgba(0, 4, 48,0.3)",
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {icon}
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.dim,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {title}
        </span>
        {count !== undefined && (
          <span
            style={{
              fontSize: 8,
              color: C.muted,
              background: "rgba(44, 61, 127,0.2)",
              borderRadius: 8,
              padding: "0px 5px",
            }}
          >
            {count}
          </span>
        )}
        {badge !== undefined && (
          <span
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: "#000430",
              background: C.gold,
              borderRadius: 8,
              padding: "0px 5px",
            }}
          >
            {badge}
          </span>
        )}
        {sub && (
          <span style={{ fontSize: 8, color: C.muted }}>{sub}</span>
        )}
      </div>
      {action}
    </div>
  );
}

function MiniStat({
  value,
  label,
  color,
}: {
  value: number | string;
  label: string;
  color: string;
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 7, color: C.muted }}>{label}</div>
    </div>
  );
}
