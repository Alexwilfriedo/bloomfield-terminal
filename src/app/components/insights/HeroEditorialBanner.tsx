import { ArrowRight, Bookmark, Share2, TrendingUp, Clock, Tag, AlertCircle, ChevronRight } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const HERO_IMAGE = "https://images.unsplash.com/photo-1773869804179-42dcadb5e437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZmluYW5jaWFsJTIwZGlzdHJpY3QlMjBza3lsaW5lJTIwY2l0eXxlbnwxfHx8fDE3NzU2OTEwODV8MA&ixlib=rb-4.1.0&q=80&w=1080";

const MARKET_IMPACTS = [
  { type: "MARCHÉ", label: "BRVM Obligataire", impact: "direct", direction: "up", change: "+3-8bp rendements" },
  { type: "PAYS", label: "CIV · SEN · BEN · TGO", impact: "direct", direction: "neutral", change: "Tous les 8 États" },
  { type: "SECTEUR", label: "Banques & Assurances", impact: "fort", direction: "up", change: "Coût refinancement ↓" },
  { type: "DEVISE", label: "XOF / Zone CFA", impact: "modéré", direction: "neutral", change: "Ancrage EUR stable" },
  { type: "ACTIF", label: "OAT CIV 7Y · SEN 10Y", impact: "direct", direction: "down", change: "Rendements -5 à -12bp" },
];

const CRITICALITY = {
  level: "FORT",
  color: "#f4b942",
  bg: "rgba(244,185,66,0.12)",
  border: "rgba(244,185,66,0.35)",
  icon: "⚡",
};

export function HeroEditorialBanner() {
  const C = useThemeColors();
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        background: C.surface,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: 0.22,
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--bt-overlay-98) 0%, var(--bt-overlay-88) 55%, var(--bt-overlay-60) 100%)",
        }}
      />

      {/* Left: editorial stripe accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: "linear-gradient(180deg, #d6b68d 0%, #f4b942 100%)",
        }}
      />

      {/* Top: Criticality banner */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 20px",
          background: "var(--bt-overlay-50)",
          borderBottom: "1px solid rgba(244,185,66,0.15)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "2px 8px",
            borderRadius: 3,
            background: CRITICALITY.bg,
            border: `1px solid ${CRITICALITY.border}`,
          }}
        >
          <span style={{ fontSize: 11 }}>{CRITICALITY.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: CRITICALITY.color, letterSpacing: "0.08em" }}>
            CRITICITÉ {CRITICALITY.level}
          </span>
        </div>
        <span style={{ fontSize: 10.5, color: C.muted }}>Cette analyse affecte directement les actifs UEMOA suivants :</span>
        <div style={{ display: "flex", gap: 5, flex: 1 }}>
          {MARKET_IMPACTS.slice(0, 3).map((imp) => (
            <span
              key={imp.label}
              style={{
                padding: "1px 7px",
                borderRadius: 3,
                background: "var(--bt-accent-a10)",
                border: "1px solid var(--bt-accent-a20)",
                fontSize: 9.5,
                color: C.accent,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              {imp.type}: {imp.label}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
          <AlertCircle size={9} color={C.gold} />
          <span style={{ fontSize: 10, color: C.gold, fontWeight: 600 }}>
            {MARKET_IMPACTS.length} actifs · marchés concernés
          </span>
          <ChevronRight size={9} color={C.gold} />
        </div>
      </div>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          padding: "16px 20px",
          gap: 20,
        }}
      >
        {/* Editorial content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, maxWidth: 580 }}>
          {/* Tags row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                padding: "2px 7px",
                borderRadius: 3,
                background: "rgba(244,185,66,0.15)",
                border: "1px solid rgba(244,185,66,0.4)",
                fontSize: 10.5,
                fontWeight: 800,
                color: C.gold,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ANALYSE PHARE
            </span>
            <span
              style={{
                padding: "2px 7px",
                borderRadius: 3,
                background: "var(--bt-accent-a12)",
                border: "1px solid var(--bt-accent-a30)",
                fontSize: 10.5,
                fontWeight: 700,
                color: C.accent,
                letterSpacing: "0.08em",
              }}
            >
              POLITIQUE MONÉTAIRE
            </span>
            <span
              style={{
                padding: "2px 7px",
                borderRadius: 3,
                background: "rgba(16,200,122,0.1)",
                border: "1px solid rgba(16,200,122,0.25)",
                fontSize: 10.5,
                fontWeight: 700,
                color: C.green,
                letterSpacing: "0.06em",
              }}
            >
              UEMOA
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 4 }}>
              <Clock size={9} color={C.muted} />
              <span style={{ fontSize: 11, color: C.muted }}>Il y a 2h · Mer 08 Avr 2026</span>
            </div>
          </div>

          {/* Headline */}
          <h1
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 800,
              color: C.text,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              maxWidth: 560,
            }}
          >
            BCEAO : Maintien du taux directeur à 3,5% — Décryptage des implications pour les marchés obligataires UEMOA et la trajectoire de croissance 2026
          </h1>

          {/* Summary */}
          <p
            style={{
              margin: 0,
              fontSize: 13,
              color: C.dim,
              lineHeight: 1.55,
              maxWidth: 520,
            }}
          >
            Le Comité de Politique Monétaire de la BCEAO a maintenu son taux directeur inchangé lors de sa réunion du 27 mars 2026, signalant une pause dans le cycle d'ajustement. Notre équipe décrypte les conséquences sur les rendements obligataires souverains, la liquidité bancaire et les perspectives d'investissement UEMOA.
          </p>

          {/* Author + CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                MO
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>Moussa Ouédraogo</div>
                <div style={{ fontSize: 9.5, color: C.muted }}>Chef Économiste · Bloomfield Intelligence</div>
              </div>
            </div>

            <div style={{ width: 1, height: 18, background: C.border }} />
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={10} color={C.accent} />
              <span style={{ fontSize: 10.5, color: C.accent, fontWeight: 600 }}>1 247 lectures · ~8 min</span>
            </div>

            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "6px 14px",
                borderRadius: 5,
                background: "linear-gradient(90deg, #d6b68d 0%, #d6b68d 100%)",
                border: "none",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.03em",
                marginLeft: 2,
              }}
            >
              Lire l'analyse
              <ArrowRight size={10} />
            </button>

            <button
              style={{
                display: "flex", alignItems: "center", gap: 4, padding: "6px 9px",
                borderRadius: 5, background: "var(--bt-overlay-50)",
                border: `1px solid ${C.border}`, color: C.dim, fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}
            >
              <Bookmark size={10} />
              Sauvegarder
            </button>

            <button
              style={{
                display: "flex", alignItems: "center", gap: 4, padding: "6px 9px",
                borderRadius: 5, background: "var(--bt-overlay-50)",
                border: `1px solid ${C.border}`, color: C.dim, fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}
            >
              <Share2 size={10} />
              Partager
            </button>
          </div>
        </div>

        {/* Right: Market Impact Panel — ENHANCED */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 210 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.muted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 2,
            }}
          >
            IMPACT MARCHÉS BLOOMFIELD
          </div>

          {/* Impact items */}
          {MARKET_IMPACTS.map((imp) => {
            const dirColor = imp.direction === "up" ? C.green : imp.direction === "down" ? C.red : C.gold;
            return (
              <div
                key={imp.label}
                style={{
                  padding: "7px 9px",
                  borderRadius: 5,
                  background: "var(--bt-overlay-60)",
                  border: `1px solid ${C.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: dirColor,
                      background: dirColor + "14",
                      border: `1px solid ${dirColor}28`,
                      borderRadius: 2,
                      padding: "0 4px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {imp.type}
                  </span>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: dirColor,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {imp.change}
                  </span>
                </div>
                <span style={{ fontSize: 10.5, color: C.dim, fontWeight: 600 }}>{imp.label}</span>
              </div>
            );
          })}

          {/* Bloomfield intel badge */}
          <div
            style={{
              padding: "6px 9px",
              borderRadius: 5,
              background: "rgba(244,185,66,0.08)",
              border: "1px solid rgba(244,185,66,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 5,
              cursor: "pointer",
              marginTop: 2,
            }}
          >
            <Tag size={9} color={C.gold} />
            <span style={{ fontSize: 10.5, color: C.gold, fontWeight: 600 }}>Intelligence Propriétaire Bloomfield</span>
          </div>
        </div>
      </div>
    </div>
  );
}