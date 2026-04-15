import {
  Zap,
  TrendingUp,
  TrendingDown,
  Target,
  ShoppingCart,
  Bot,
  Bell,
  AlertTriangle,
  BarChart3,
  Globe2,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { useTerminal } from "../../context/TerminalContext";

const C = {
  surface: "#000430",
  elevated: "#000430",
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  orange: "#fb923c",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
  dark: "#000430",
};

const DECISION_SIGNALS = [
  {
    type: "signal",
    icon: <Zap size={9} />,
    color: C.gold,
    label: "Signal du Jour",
    title: "PALM CI — Momentum HAUSSIER",
    detail: "RSI 72 · Volume +38% · Cacao +42% YTD",
    criticite: "HAUTE",
    critColor: C.gold,
  },
  {
    type: "opportunite",
    icon: <Target size={9} />,
    color: C.green,
    label: "Opportunité",
    title: "SGBCI — Décote 18% vs pairs",
    detail: "P/BV 0.92x · Objectif +27.3%",
    criticite: "FORTE",
    critColor: C.green,
  },
  {
    type: "vigilance",
    icon: <AlertTriangle size={9} />,
    color: C.orange,
    label: "Zone de Vigilance",
    title: "SAPH CI — Pression marges",
    detail: "RSI 29 · Coûts +18% · Révision -23.7%",
    criticite: "MODÉRÉE",
    critColor: C.orange,
  },
  {
    type: "recommandation",
    icon: <Shield size={9} />,
    color: C.accent,
    label: "Recommandation",
    title: "OAT UEMOA — Fenêtre d'entrée",
    detail: "Rendements 6.8–7.2% · Prochaine émission 15 Mai",
    criticite: "INFO",
    critColor: C.accent,
  },
];

const COMPLIANCE_STATUS = [
  { label: "Limite journalière", status: "OK", detail: "17.5% utilisé", color: C.green },
  { label: "Contrôleur disponible", status: "OK", detail: "Diallo Mamadou", color: C.green },
  { label: "Validation en attente", status: "1 ordre", detail: "PALM CI", color: C.gold },
  { label: "Mandats actifs", status: "3", detail: "BRVM Equity · Souverain · Mixte", color: C.accent },
];

export function ActionControlWidget() {
  const { openOrderPanel, openAIPanel } = useTerminal();

  return (
    <div
      style={{
        height: "100%",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${C.gold} 0%, ${C.accent} 60%, transparent 100%)`,
          flexShrink: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.4)",
          flexShrink: 0,
        }}
      >
        <div style={{ width: 3, height: 14, borderRadius: 2, background: C.gold }} />
        <Zap size={11} color={C.gold} />
        <span
          style={{
            fontSize: 9.5,
            fontWeight: 700,
            color: C.dim,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          Centre d'Action
        </span>
      </div>

      <div style={{ flex: 1, overflow: "auto", minHeight: 0, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Quick action shortcuts */}
        <div>
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: C.muted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 7,
            }}
          >
            Raccourcis d'Action
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {[
              {
                icon: <ShoppingCart size={13} />,
                label: "Passer un Ordre",
                sublabel: "BRVM · UMOA-Titres",
                color: C.accent,
                bg: "rgba(214, 182, 141,0.1)",
                border: `1px solid rgba(214, 182, 141,0.25)`,
                onClick: () => openOrderPanel(),
              },
              {
                icon: <Bot size={13} />,
                label: "Bloomfield AI",
                sublabel: "Analyse & assistance",
                color: C.purple,
                bg: "rgba(167,139,250,0.08)",
                border: `1px solid rgba(167,139,250,0.2)`,
                onClick: () => openAIPanel(),
              },
              {
                icon: <BarChart3 size={13} />,
                label: "Analyse Titre",
                sublabel: "Analyse fondamentale",
                color: C.gold,
                bg: "rgba(244,185,66,0.08)",
                border: `1px solid rgba(244,185,66,0.2)`,
                onClick: () => {},
              },
              {
                icon: <Bell size={13} />,
                label: "Créer Alerte",
                sublabel: "Cours · Volume · Événement",
                color: C.green,
                bg: "rgba(16,200,122,0.08)",
                border: `1px solid rgba(16,200,122,0.2)`,
                onClick: () => {},
              },
            ].map((action) => (
              <button
                key={action.label}
                onClick={action.onClick}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 4,
                  padding: "10px 10px",
                  background: action.bg,
                  border: action.border,
                  borderRadius: 6,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ color: action.color }}>{action.icon}</span>
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text }}>
                    {action.label}
                  </div>
                  <div style={{ fontSize: 7.5, color: C.muted }}>{action.sublabel}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Decision blocks */}
        <div>
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: C.muted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Signaux Décisionnels
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {DECISION_SIGNALS.map((sig) => (
              <div
                key={sig.type}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  padding: "7px 9px",
                  background: `${sig.color}08`,
                  border: `1px solid ${sig.color}22`,
                  borderRadius: 5,
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `${sig.color}12`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = `${sig.color}08`)
                }
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <span style={{ color: sig.color }}>{sig.icon}</span>
                  <span
                    style={{
                      fontSize: 6.5,
                      fontWeight: 700,
                      color: sig.critColor,
                      background: `${sig.critColor}14`,
                      borderRadius: 2,
                      padding: "0 3px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {sig.criticite}
                  </span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 7.5,
                      fontWeight: 700,
                      color: sig.color,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    {sig.label}
                  </div>
                  <div
                    style={{ fontSize: 9, fontWeight: 700, color: C.text, marginBottom: 2 }}
                  >
                    {sig.title}
                  </div>
                  <div style={{ fontSize: 7.5, color: C.muted }}>{sig.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance status */}
        <div>
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: C.muted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Statut Conformité & Contrôle
          </div>
          <div
            style={{
              background: C.elevated,
              border: `1px solid ${C.border}`,
              borderRadius: 5,
              overflow: "hidden",
            }}
          >
            {COMPLIANCE_STATUS.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 10px",
                  borderBottom:
                    i < COMPLIANCE_STATUS.length - 1
                      ? `1px solid rgba(44, 61, 127,0.15)`
                      : "none",
                }}
              >
                <CheckCircle2 size={10} color={item.color} />
                <span style={{ fontSize: 9, color: C.dim, flex: 1 }}>{item.label}</span>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: item.color,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {item.status}
                  </div>
                  <div style={{ fontSize: 7.5, color: C.muted }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact attendu summary */}
        <div
          style={{
            padding: "8px 10px",
            background: "rgba(214, 182, 141,0.05)",
            border: "1px solid rgba(214, 182, 141,0.2)",
            borderRadius: 5,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 6,
            }}
          >
            <Globe2 size={10} color={C.accent} />
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: C.accent,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Impact Marché Attendu
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { label: "Actifs concernés", value: "PALM CI · SGBCI · OAT CIV", icon: <TrendingUp size={8} color={C.green} /> },
              { label: "Pays concernés", value: "🇨🇮 CIV · 🇸🇳 SEN · Zone UEMOA", icon: <Globe2 size={8} color={C.accent} /> },
              { label: "Criticité globale", value: "MODÉRÉE — Surveillance active", icon: <AlertTriangle size={8} color={C.gold} /> },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: "flex", alignItems: "center", gap: 5 }}
              >
                {item.icon}
                <span style={{ fontSize: 8, color: C.muted, minWidth: 90 }}>{item.label}</span>
                <span style={{ fontSize: 8.5, color: C.dim, fontWeight: 600 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
