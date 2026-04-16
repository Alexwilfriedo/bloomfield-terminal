import { useState } from "react";
import { FileText, ArrowUpRight, Bookmark, Share2, ChevronRight, TrendingUp, TrendingDown, Minus, Star, Lock } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

interface ResearchNote {
  id: number;
  title: string;
  summary: string;
  type: string;
  typeColor: string;
  rating?: "BUY" | "HOLD" | "SELL" | "NEUTRAL";
  target?: string;
  company?: string;
  country: string;
  countryColor: string;
  sector?: string;
  author: string;
  authorInitials: string;
  date: string;
  readTime: string;
  isPremium: boolean;
  isNew?: boolean;
  stars?: number;
}

const NOTES: ResearchNote[] = [
  {
    id: 1,
    title: "SONATEL : Upgrade vers BUY — Cible 19 500 XOF | Momentum bénéficiaire supérieur aux attentes",
    summary: "Suite aux résultats FY2025, nous relevons notre recommandation sur SONATEL à BUY avec un objectif de cours de 19 500 XOF. Le groupe affiche une résilience opérationnelle remarquable malgré un environnement concurrentiel intense au Sénégal.",
    type: "NOTE ANALYSTE",
    typeColor: "#d6b68d",
    rating: "BUY",
    target: "19 500 XOF",
    company: "SONATEL",
    country: "Sénégal",
    countryColor: "#f4b942",
    sector: "Télécoms",
    author: "Issa Diabaté",
    authorInitials: "ID",
    date: "08 Avr 2026",
    readTime: "12 min",
    isPremium: true,
    isNew: true,
    stars: 5,
  },
  {
    id: 2,
    title: "BCEAO Q1 2026 — Implications de la pause monétaire pour la liquidité bancaire UEMOA",
    summary: "Le maintien du taux directeur à 3,5% consolide un environnement de financement favorable pour les établissements de crédit de la zone. Analyse des effets de transmission et implications pour les marges d'intérêt nettes du secteur bancaire régional.",
    type: "MACRO BRIEF",
    typeColor: "#a78bfa",
    country: "UEMOA",
    countryColor: "#d6b68d",
    sector: "Politique Monétaire",
    author: "Moussa Ouédraogo",
    authorInitials: "MO",
    date: "08 Avr 2026",
    readTime: "9 min",
    isPremium: true,
    isNew: true,
    stars: 4,
  },
  {
    id: 3,
    title: "PALM CI : Neutral maintenu — La flambée des prix du cacao soutient le résultat mais crée un risque sur les marges",
    summary: "Malgré un niveau record du cacao à 8 245 USD/tonne, les dépenses d'intrants et la pression salariale en Côte d'Ivoire pourraient comprimer les marges brutes de PALM CI au S1 2026. Nous maintenons NEUTRAL avec cible 8 500 XOF.",
    type: "NOTE ANALYSTE",
    typeColor: "#d6b68d",
    rating: "NEUTRAL",
    target: "8 500 XOF",
    company: "PALM CI",
    country: "Côte d'Ivoire",
    countryColor: "#fb923c",
    sector: "Agroalimentaire",
    author: "Adjoua Koné",
    authorInitials: "AK",
    date: "07 Avr 2026",
    readTime: "7 min",
    isPremium: false,
    isNew: false,
    stars: 4,
  },
  {
    id: 4,
    title: "Obligations Souveraines UEMOA — Analyse de la courbe des taux et opportunités de positionnement T2 2026",
    summary: "La courbe souveraine UEMOA présente des opportunités de valeur relative sur le segment 5-7 ans. Les spreads CI-SN s'élargissent légèrement en faveur d'une surpondération des titres sénégalais malgré la dégradation récente du solde budgétaire.",
    type: "OBLIGATIONS",
    typeColor: "#f4b942",
    country: "UEMOA",
    countryColor: "#d6b68d",
    sector: "Marchés Obligataires",
    author: "Aissatou Bah",
    authorInitials: "AB",
    date: "06 Avr 2026",
    readTime: "15 min",
    isPremium: true,
    isNew: false,
    stars: 5,
  },
  {
    id: 5,
    title: "Secteur Bancaire BRVM — Bilan T1 2026 : Rentabilité, risques et perspectives de dividendes",
    summary: "Le secteur bancaire coté sur la BRVM affiche une rentabilité solide au T1 2026. ROE moyen de 14,2%, ratio coût du risque stable à 1,2%, et perspectives de distributions attractives pour les actionnaires en 2026-2027.",
    type: "SECTEUR",
    typeColor: "#10c87a",
    country: "BRVM",
    countryColor: "#d6b68d",
    sector: "Banques",
    author: "Issa Diabaté",
    authorInitials: "ID",
    date: "05 Avr 2026",
    readTime: "11 min",
    isPremium: false,
    isNew: false,
    stars: 4,
  },
];

const RATING_COLORS: Record<string, string> = {
  BUY: "#10c87a",
  SELL: "#f43860",
  HOLD: "#f4b942",
  NEUTRAL: "#54678d",
};

function RatingBadge({ rating }: { rating: string }) {
  const C = useThemeColors();
  const color = RATING_COLORS[rating] || C.muted;
  return (
    <span
      style={{
        padding: "2px 6px",
        borderRadius: 3,
        background: color + "18",
        border: `1px solid ${color}40`,
        fontSize: 10.5,
        fontWeight: 800,
        color,
        letterSpacing: "0.06em",
        flexShrink: 0,
      }}
    >
      {rating}
    </span>
  );
}

function StarRating({ stars }: { stars: number }) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={8}
          color={i <= stars ? C.gold : C.muted}
          fill={i <= stars ? C.gold : "transparent"}
        />
      ))}
    </div>
  );
}

export function ResearchNotesSection() {
  const C = useThemeColors();
  const [activeFilter, setActiveFilter] = useState("Tous");

  const FILTERS = ["Tous", "Équité", "Macro", "Obligations", "Sectoriels"];

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
          background: "var(--bt-overlay-40)",
        }}
      >
        <FileText size={13} color={C.gold} />
        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Notes de Recherche</span>
        <span style={{ fontSize: 11, color: C.muted }}>· Analyses & Recommandations Bloomfield</span>
        <div style={{ flex: 1 }} />
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: "3px 8px",
              borderRadius: 3,
              border: `1px solid ${activeFilter === f ? "rgba(244,185,66,0.4)" : "var(--bt-border-a22)"}`,
              background: activeFilter === f ? "rgba(244,185,66,0.1)" : "transparent",
              color: activeFilter === f ? C.gold : C.muted,
              fontSize: 11,
              fontWeight: activeFilter === f ? 700 : 500,
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            borderRadius: 4,
            background: "rgba(244,185,66,0.08)",
            border: "1px solid rgba(244,185,66,0.2)",
            color: C.gold,
            fontSize: 11,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Toutes les notes
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Notes list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {NOTES.map((note, idx) => (
          <div
            key={note.id}
            style={{
              display: "flex",
              gap: 14,
              padding: "12px 14px",
              borderBottom: idx < NOTES.length - 1 ? `1px solid var(--bt-border-a16)` : "none",
              cursor: "pointer",
              transition: "background 0.1s",
              background: note.isNew ? "rgba(214, 182, 141,0.02)" : "transparent",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "var(--bt-accent-a06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = note.isNew
                ? "rgba(214, 182, 141,0.02)"
                : "transparent";
            }}
          >
            {/* Left: author avatar */}
            <div style={{ flexShrink: 0 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {note.authorInitials}
              </div>
            </div>

            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Tags row */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                {note.isNew && (
                  <span
                    style={{
                      padding: "1px 5px",
                      borderRadius: 2,
                      background: "rgba(16,200,122,0.12)",
                      border: "1px solid rgba(16,200,122,0.3)",
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: C.green,
                      letterSpacing: "0.06em",
                    }}
                  >
                    NOUVEAU
                  </span>
                )}
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    background: note.typeColor + "14",
                    border: `1px solid ${note.typeColor}35`,
                    fontSize: 10,
                    fontWeight: 700,
                    color: note.typeColor,
                    letterSpacing: "0.06em",
                  }}
                >
                  {note.type}
                </span>
                <span
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    background: note.countryColor + "14",
                    border: `1px solid ${note.countryColor}30`,
                    fontSize: 10,
                    fontWeight: 600,
                    color: note.countryColor,
                  }}
                >
                  {note.country}
                </span>
                {note.sector && (
                  <span style={{ fontSize: 10.5, color: C.muted }}>{note.sector}</span>
                )}
                {note.isPremium && (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "1px 5px",
                      borderRadius: 2,
                      background: "rgba(244,185,66,0.1)",
                      border: "1px solid rgba(244,185,66,0.25)",
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: C.gold,
                    }}
                  >
                    <Lock size={7} />
                    PREMIUM
                  </span>
                )}
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: C.text,
                  lineHeight: 1.35,
                  marginBottom: 5,
                }}
              >
                {note.title}
              </div>

              {/* Summary */}
              <p
                style={{
                  margin: "0 0 7px",
                  fontSize: 12.5,
                  color: C.dim,
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {note.summary}
              </p>

              {/* Footer row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {note.rating && <RatingBadge rating={note.rating} />}
                {note.target && (
                  <span style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>Cible : {note.target}</span>
                )}
                {note.stars && <StarRating stars={note.stars} />}
                <span style={{ fontSize: 10.5, color: C.muted }}>
                  {note.author} · {note.date}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    color: C.muted,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <FileText size={8} />
                  {note.readTime}
                </span>
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 4,
                      background: "var(--bt-overlay-50)",
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: C.muted,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Bookmark size={9} />
                  </button>
                  <button
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 4,
                      background: "var(--bt-overlay-50)",
                      border: `1px solid ${C.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: C.muted,
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 size={9} />
                  </button>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: "var(--bt-accent-a08)",
                      border: "1px solid var(--bt-accent-a20)",
                      color: C.accent,
                      fontSize: 10.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Lire
                    <ArrowUpRight size={9} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
