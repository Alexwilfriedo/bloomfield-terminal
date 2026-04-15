import { FileDown, BookOpen, ChevronRight, Download, Calendar, Globe2, Building2, BarChart3 } from "lucide-react";
import type { ReactNode } from "react";

const C = {
  surface: "#000117",
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

interface Report {
  id: number;
  title: string;
  type: string;
  typeColor: string;
  typeIcon: ReactNode;
  description: string;
  publisher: string;
  date: string;
  pages?: number;
  downloads: string;
  fileSize?: string;
  country?: string;
  countryColor?: string;
  tags: string[];
  isPremium: boolean;
  isNew?: boolean;
}

const REPORTS: Report[] = [
  {
    id: 1,
    title: "Perspectives Économiques UEMOA — T2 2026 · Rapport Trimestriel Bloomfield",
    type: "RAPPORT TRIMESTRIEL",
    typeColor: C.accent,
    typeIcon: <BarChart3 size={10} />,
    description: "Analyse approfondie des dynamiques macroéconomiques de la zone UEMOA pour le deuxième trimestre 2026 : croissance, inflation, balance des paiements, marchés financiers et perspectives.",
    publisher: "Bloomfield Intelligence",
    date: "01 Avr 2026",
    pages: 48,
    downloads: "3 241",
    fileSize: "4,2 Mo",
    country: "UEMOA",
    countryColor: C.accent,
    tags: ["PIB", "Inflation", "Marchés", "BCEAO"],
    isPremium: true,
    isNew: true,
  },
  {
    id: 2,
    title: "Revue du Marché Obligataire UMOA — Mars 2026 · Taux, Flux & Tendances",
    type: "REVUE MARCHÉ",
    typeColor: C.gold,
    typeIcon: <Globe2 size={10} />,
    description: "Panorama complet des émissions souveraines et corporate sur le marché UMOA-Titres en mars 2026 : volumes, taux de couverture, adjudications, courbe des taux et recommandations d'allocation.",
    publisher: "Bloomfield Fixed Income",
    date: "04 Avr 2026",
    pages: 32,
    downloads: "1 876",
    fileSize: "2,8 Mo",
    country: "UEMOA",
    countryColor: C.accent,
    tags: ["OAT", "Souverain", "Rendements", "Adjudication"],
    isPremium: true,
    isNew: true,
  },
  {
    id: 3,
    title: "BRVM Annual Market Review 2025 — Performance, Valorisation, Secteurs",
    type: "REVUE ANNUELLE",
    typeColor: C.green,
    typeIcon: <BookOpen size={10} />,
    description: "Bilan complet de la performance des marchés actions BRVM en 2025 : palmarès des valeurs, flux net des investisseurs institutionnels, valorisations sectorielles et perspectives 2026.",
    publisher: "Bloomfield Equity Research",
    date: "28 Jan 2026",
    pages: 76,
    downloads: "8 540",
    fileSize: "7,1 Mo",
    country: "BRVM",
    countryColor: C.green,
    tags: ["BRVM", "Actions", "Secteurs", "Flux"],
    isPremium: false,
  },
  {
    id: 4,
    title: "Stratégie d'Investissement Côte d'Ivoire 2026 — Opportunités & Risques",
    type: "STRATÉGIE",
    typeColor: C.orange,
    typeIcon: <Building2 size={10} />,
    description: "Cadre stratégique pour l'investissement en Côte d'Ivoire en 2026 : environnement macro, secteurs porteurs, risques géopolitiques et recommandations de portefeuille pour investisseurs institutionnels.",
    publisher: "Bloomfield Strategy",
    date: "15 Mar 2026",
    pages: 55,
    downloads: "2 134",
    fileSize: "5,6 Mo",
    country: "Côte d'Ivoire",
    countryColor: C.orange,
    tags: ["IDE", "Infrastructure", "Énergie", "Finance"],
    isPremium: true,
  },
  {
    id: 5,
    title: "Panorama Sectoriel Bancaire UEMOA 2025 — Solidité, Rentabilité & Risques",
    type: "ÉTUDE SECTORIELLE",
    typeColor: C.purple,
    typeIcon: <BarChart3 size={10} />,
    description: "Analyse comparée des 28 principaux établissements bancaires de la zone UEMOA : ratios prudentiels, rentabilité, qualité des actifs, digitalisation et perspectives de consolidation.",
    publisher: "Bloomfield Banking",
    date: "20 Fév 2026",
    pages: 92,
    downloads: "5 892",
    fileSize: "8,4 Mo",
    country: "UEMOA",
    countryColor: C.accent,
    tags: ["Banques", "ROE", "NPL", "Bâle III"],
    isPremium: true,
  },
  {
    id: 6,
    title: "Note Spéciale : Impact des Réformes Fiscales CEDEAO sur les Flux d'Investissement",
    type: "NOTE SPÉCIALE",
    typeColor: C.red,
    typeIcon: <FileDown size={10} />,
    description: "Analyse des nouvelles dispositions fiscales adoptées par la CEDEAO et leur impact estimé sur les flux d'investissements directs étrangers et l'intégration économique régionale.",
    publisher: "Bloomfield Policy",
    date: "25 Mar 2026",
    pages: 24,
    downloads: "1 204",
    fileSize: "1,9 Mo",
    tags: ["Fiscalité", "CEDEAO", "IDE", "Intégration"],
    isPremium: false,
  },
];

export function ReportsSection() {
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
          background: "rgba(0, 1, 23,0.4)",
        }}
      >
        <FileDown size={13} color={C.accent} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Rapports & Publications</span>
        <span style={{ fontSize: 9, color: C.muted }}>· Études, Revues & Bulletins Officiels</span>
        <div style={{ flex: 1 }} />
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
          PDF · XLS · PPTX
        </div>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            borderRadius: 4,
            background: "rgba(214, 182, 141,0.08)",
            border: "1px solid rgba(214, 182, 141,0.2)",
            color: C.accent,
            fontSize: 9,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Bibliothèque complète
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Reports grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          padding: 12,
        }}
      >
        {REPORTS.map((report) => (
          <div
            key={report.id}
            style={{
              background: "rgba(0, 1, 23,0.5)",
              border: `1px solid ${C.border}`,
              borderRadius: 7,
              padding: "12px 13px",
              cursor: "pointer",
              transition: "border-color 0.15s",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              position: "relative",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(214, 182, 141,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = C.border;
            }}
          >
            {/* Document type bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, ${report.typeColor} 0%, transparent 100%)`,
                borderRadius: "7px 7px 0 0",
              }}
            />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              {/* PDF icon */}
              <div
                style={{
                  width: 36,
                  height: 44,
                  borderRadius: 5,
                  background: `linear-gradient(135deg, ${report.typeColor}22 0%, rgba(0, 1, 23,0.8) 100%)`,
                  border: `1px solid ${report.typeColor}30`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  flexShrink: 0,
                }}
              >
                <div style={{ color: report.typeColor }}>{report.typeIcon}</div>
                <span style={{ fontSize: 7, fontWeight: 800, color: report.typeColor, letterSpacing: "0.04em" }}>PDF</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
                  <span
                    style={{
                      padding: "1px 5px",
                      borderRadius: 2,
                      background: report.typeColor + "14",
                      border: `1px solid ${report.typeColor}30`,
                      fontSize: 7.5,
                      fontWeight: 700,
                      color: report.typeColor,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {report.type}
                  </span>
                  {report.isNew && (
                    <span
                      style={{
                        padding: "1px 5px",
                        borderRadius: 2,
                        background: "rgba(16,200,122,0.12)",
                        border: "1px solid rgba(16,200,122,0.3)",
                        fontSize: 7.5,
                        fontWeight: 800,
                        color: C.green,
                      }}
                    >
                      NOUVEAU
                    </span>
                  )}
                  {report.isPremium && (
                    <span
                      style={{
                        padding: "1px 5px",
                        borderRadius: 2,
                        background: "rgba(244,185,66,0.1)",
                        border: "1px solid rgba(244,185,66,0.25)",
                        fontSize: 7.5,
                        fontWeight: 700,
                        color: C.gold,
                      }}
                    >
                      PREMIUM
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 10.5,
                    fontWeight: 700,
                    color: C.text,
                    lineHeight: 1.35,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {report.title}
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontSize: 9.5,
                color: C.dim,
                lineHeight: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {report.description}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {report.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "1px 5px",
                    borderRadius: 2,
                    background: "rgba(44, 61, 127,0.2)",
                    border: "1px solid rgba(44, 61, 127,0.3)",
                    fontSize: 7.5,
                    color: C.muted,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 8.5, color: C.muted, fontWeight: 600 }}>{report.publisher}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 8, color: C.muted }}>
                    <Calendar size={7} />
                    {report.date}
                  </span>
                  {report.pages && (
                    <span style={{ fontSize: 8, color: C.muted }}>{report.pages} pages</span>
                  )}
                  <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 8, color: C.muted }}>
                    <Download size={7} />
                    {report.downloads}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }} />
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "5px 9px",
                  borderRadius: 4,
                  background: report.isPremium
                    ? "rgba(244,185,66,0.1)"
                    : "rgba(214, 182, 141,0.08)",
                  border: `1px solid ${report.isPremium ? "rgba(244,185,66,0.25)" : "rgba(214, 182, 141,0.2)"}`,
                  color: report.isPremium ? C.gold : C.accent,
                  fontSize: 9,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={9} />
                {report.isPremium ? "Premium" : "Télécharger"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}