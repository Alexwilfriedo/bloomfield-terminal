import { useState } from "react";
import { Zap, ExternalLink, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";

const C = {
  surface: "#000430",
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

interface NewsItem {
  id: number;
  time: string;
  headline: string;
  country: string;
  countryColor: string;
  tag: string;
  tagColor: string;
  sentiment: "up" | "down" | "neutral";
  source: string;
  isBreaking?: boolean;
  isNew?: boolean;
  impactAssets?: string[];
  criticality?: "FORT" | "MODÉRÉ" | "FAIBLE";
}

const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    time: "14:32",
    headline: "BCEAO maintient son taux directeur à 3,5% — stabilité monétaire confirmée pour le T2 2026",
    country: "UEMOA",
    countryColor: C.accent,
    tag: "BCEAO",
    tagColor: C.accent,
    sentiment: "neutral",
    source: "Communiqué officiel",
    isBreaking: true,
    isNew: true,
    impactAssets: ["OAT CIV", "XOF/EUR", "Liquidité bancaire"],
    criticality: "FORT",
  },
  {
    id: 2,
    time: "13:58",
    headline: "SONATEL SA annonce un résultat net FY2025 de 243,7 Mds XOF, en hausse de 11,4% — dividende proposé : 1 800 XOF/action",
    country: "Sénégal",
    countryColor: C.gold,
    tag: "RÉSULTATS",
    tagColor: C.green,
    sentiment: "up",
    source: "Bloomfield Research",
    isNew: true,
    impactAssets: ["SONATEL BRVM", "SEN Télécom"],
    criticality: "FORT",
  },
  {
    id: 3,
    time: "13:45",
    headline: "Côte d'Ivoire : émission obligataire souveraine 7 ans sur le marché UMOA-Titres — taux facial 6,40% · taux de couverture 138%",
    country: "Côte d'Ivoire",
    countryColor: C.orange,
    tag: "DETTE SOUV.",
    tagColor: C.orange,
    sentiment: "neutral",
    source: "UMOA-Titres",
    isNew: true,
    impactAssets: ["OAT CIV 7Y", "Courbe taux UEMOA"],
    criticality: "MODÉRÉ",
  },
  {
    id: 4,
    time: "13:12",
    headline: "BRVM Composite clôture en hausse de 0,73% — PALM CI et BOLLORE CI parmi les principales hausses de la séance",
    country: "BRVM",
    countryColor: C.accent,
    tag: "MARCHÉS",
    tagColor: C.accent,
    sentiment: "up",
    source: "BRVM",
    impactAssets: ["PALM CI", "BOLLORE CI", "BRVM Composite"],
    criticality: "MODÉRÉ",
  },
  {
    id: 5,
    time: "12:44",
    headline: "FMI relève ses prévisions de croissance pour la zone UEMOA à 6,8% pour 2026, soulignant la résilience budgétaire",
    country: "UEMOA",
    countryColor: C.accent,
    tag: "MACRO",
    tagColor: C.purple,
    sentiment: "up",
    source: "FMI · World Economic Outlook",
    impactAssets: ["Zone XOF", "Tous pays UEMOA"],
    criticality: "MODÉRÉ",
  },
  {
    id: 6,
    time: "12:07",
    headline: "Le cacao à 8 245 USD/tonne sur ICE — les producteurs ivoiriens bénéficient d'un effet prix favorable sur les recettes d'exportation",
    country: "Côte d'Ivoire",
    countryColor: C.orange,
    tag: "MATIÈRES P.",
    tagColor: C.purple,
    sentiment: "up",
    source: "ICE Futures Europe",
    impactAssets: ["Cacao ICE", "CIV Balance commerciale"],
    criticality: "MODÉRÉ",
  },
  {
    id: 7,
    time: "11:30",
    headline: "Bank of Africa CI publie ses résultats semestriels — PNB en progression de 8,2% malgré une hausse du coût du risque",
    country: "Côte d'Ivoire",
    countryColor: C.orange,
    tag: "BANQUE",
    tagColor: C.gold,
    sentiment: "neutral",
    source: "Bloomfield Research",
    impactAssets: ["BOA CI BRVM"],
    criticality: "FAIBLE",
  },
  {
    id: 8,
    time: "10:55",
    headline: "Burkina Faso : le déficit budgétaire prévisionnel 2026 se dégrade à 5,2% du PIB selon les nouvelles projections du MFB",
    country: "Burkina Faso",
    countryColor: C.red,
    tag: "BUDGET",
    tagColor: C.red,
    sentiment: "down",
    source: "Ministère des Finances",
    impactAssets: ["OAT BFA", "Notation souveraine BFA"],
    criticality: "FORT",
  },
  {
    id: 9,
    time: "10:20",
    headline: "Sénégal : les réserves de change s'établissent à 5,3 mois d'importations — confort externe confirmé",
    country: "Sénégal",
    countryColor: C.gold,
    tag: "RÉSERVES",
    tagColor: C.green,
    sentiment: "up",
    source: "BCEAO · Bulletin Mensuel",
    impactAssets: ["XOF stabilité", "SEN notation"],
    criticality: "FAIBLE",
  },
  {
    id: 10,
    time: "09:48",
    headline: "Togo : TOGOCOM maintient sa position dominante sur les services data · part de marché estimée à 42% au T1 2026",
    country: "Togo",
    countryColor: C.green,
    tag: "TÉLÉCOM",
    tagColor: C.accent,
    sentiment: "up",
    source: "ARCEP Togo",
    impactAssets: ["TOGOCOM BRVM"],
    criticality: "FAIBLE",
  },
];

function SentimentIcon({ sentiment }: { sentiment: "up" | "down" | "neutral" }) {
  if (sentiment === "up") return <TrendingUp size={9} color={C.green} />;
  if (sentiment === "down") return <TrendingDown size={9} color={C.red} />;
  return <Minus size={9} color={C.muted} />;
}

export function FlashNewsFeed() {
  const [expanded, setExpanded] = useState(false);
  const [showImpact, setShowImpact] = useState(true);

  const visibleItems = expanded ? NEWS_ITEMS : NEWS_ITEMS.slice(0, 6);

  const critColors: Record<string, string> = {
    FORT: C.red,
    MODÉRÉ: C.gold,
    FAIBLE: C.muted,
  };

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.4)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "2px 7px",
            borderRadius: 3,
            background: "rgba(244,56,96,0.1)",
            border: "1px solid rgba(244,56,96,0.3)",
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: C.red,
              boxShadow: `0 0 5px ${C.red}`,
            }}
          />
          <span style={{ fontSize: 8.5, fontWeight: 800, color: C.red, letterSpacing: "0.1em" }}>FLASH</span>
        </div>
        <Zap size={12} color={C.gold} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Actualités en Temps Réel</span>
        <span style={{ fontSize: 9, color: C.muted }}>· Marchés & Économie UEMOA</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setShowImpact(!showImpact)}
          style={{
            padding: "2px 7px",
            borderRadius: 3,
            background: showImpact ? "rgba(244,185,66,0.1)" : "transparent",
            border: `1px solid ${showImpact ? "rgba(244,185,66,0.3)" : C.border}`,
            color: showImpact ? C.gold : C.muted,
            fontSize: 8,
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          IMPACT MARCHÉ
        </button>
        <span style={{ fontSize: 9, color: C.muted }}>14:32</span>
        <div
          style={{
            padding: "2px 7px",
            borderRadius: 3,
            background: "rgba(214, 182, 141,0.08)",
            border: "1px solid rgba(214, 182, 141,0.2)",
            fontSize: 8.5,
            color: C.accent,
            fontWeight: 700,
          }}
        >
          {NEWS_ITEMS.length} titres
        </div>
      </div>

      {/* News items */}
      <div>
        {visibleItems.map((item, idx) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              padding: "9px 14px",
              borderBottom: idx < visibleItems.length - 1 ? `1px solid rgba(44, 61, 127,0.16)` : "none",
              background: item.isNew ? "rgba(214, 182, 141,0.025)" : "transparent",
              cursor: "pointer",
              transition: "background 0.1s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "rgba(214, 182, 141,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = item.isNew
                ? "rgba(214, 182, 141,0.025)"
                : "transparent";
            }}
          >
            {/* Time + sentiment */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                minWidth: 36,
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 9, fontWeight: 600, color: C.muted, fontVariantNumeric: "tabular-nums" }}>
                {item.time}
              </span>
              <SentimentIcon sentiment={item.sentiment} />
              {/* Criticality dot */}
              {item.criticality && (
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: critColors[item.criticality] ?? C.muted,
                    opacity: 0.8,
                  }}
                />
              )}
            </div>

            {/* Breaking indicator */}
            {item.isBreaking && (
              <div
                style={{
                  marginTop: 2,
                  flexShrink: 0,
                  padding: "2px 5px",
                  borderRadius: 2,
                  background: "rgba(244,56,96,0.12)",
                  border: "1px solid rgba(244,56,96,0.3)",
                  fontSize: 7.5,
                  fontWeight: 800,
                  color: C.red,
                  letterSpacing: "0.08em",
                  height: "fit-content",
                }}
              >
                URGENT
              </div>
            )}

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 11,
                  color: item.isNew ? C.text : "#a0b8d4",
                  lineHeight: 1.45,
                  fontWeight: item.isBreaking ? 600 : 400,
                }}
              >
                {item.headline}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    background: item.countryColor + "14",
                    border: `1px solid ${item.countryColor}30`,
                    fontSize: 8,
                    fontWeight: 700,
                    color: item.countryColor,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.country}
                </span>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    background: item.tagColor + "10",
                    border: `1px solid ${item.tagColor}25`,
                    fontSize: 8,
                    fontWeight: 700,
                    color: item.tagColor,
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.tag}
                </span>
                <span style={{ fontSize: 8.5, color: C.muted }}>{item.source}</span>

                {/* Impact assets */}
                {showImpact && item.impactAssets && item.impactAssets.length > 0 && (
                  <div style={{ display: "flex", gap: 4, marginLeft: 2 }}>
                    {item.impactAssets.map((asset) => (
                      <span
                        key={asset}
                        style={{
                          padding: "1px 5px",
                          borderRadius: 2,
                          background: "rgba(214, 182, 141,0.08)",
                          border: "1px solid rgba(214, 182, 141,0.18)",
                          fontSize: 7.5,
                          color: C.accent,
                          fontWeight: 600,
                        }}
                      >
                        {asset}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* External link */}
            <ExternalLink size={11} color={C.muted} style={{ marginTop: 2, flexShrink: 0, opacity: 0.5 }} />
          </div>
        ))}
      </div>

      {/* Expand footer */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: "100%",
          padding: "8px 14px",
          background: "rgba(0, 4, 48,0.3)",
          border: "none",
          borderTop: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          cursor: "pointer",
          color: C.dim,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        {expanded ? "Réduire" : `Voir tous les titres (${NEWS_ITEMS.length})`}
        <ChevronRight
          size={11}
          style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        />
      </button>
    </div>
  );
}