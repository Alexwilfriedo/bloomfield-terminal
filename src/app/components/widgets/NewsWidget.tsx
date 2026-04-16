import { WidgetShell } from "./WidgetShell";
import { ExternalLink, Tag } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

interface NewsItem {
  id: number;
  tag: string;
  tagColor: string;
  headline: string;
  source: string;
  time: string;
  priority?: "high" | "medium";
}

const news: NewsItem[] = [
  {
    id: 1,
    tag: "BCEAO",
    tagColor: "#d6b68d",
    headline: "BCEAO maintient son taux directeur à 3,50% — Décision du Comité de Politique Monétaire (CPM)",
    source: "BCEAO / Bloomfield",
    time: "il y a 15 min",
    priority: "high",
  },
  {
    id: 2,
    tag: "DETTES SVRN",
    tagColor: "#f4b942",
    headline: "Côte d'Ivoire : émission obligataire de 200 Mds FCFA sur le marché régional UEMOA — sursouscrit x2.4",
    source: "UMOA-Titres",
    time: "il y a 1 h",
    priority: "high",
  },
  {
    id: 3,
    tag: "RÉSULTATS",
    tagColor: "#10c87a",
    headline: "SONATEL publie ses résultats S1 2024 : bénéfice net en hausse de 8,3% à 183 Mds FCFA",
    source: "SONATEL IR",
    time: "il y a 2 h",
    priority: "medium",
  },
  {
    id: 4,
    tag: "FMI",
    tagColor: "#a78bfa",
    headline: "FMI relève les prévisions de croissance de l'UEMOA à 6,1% pour 2025 dans son rapport WEO",
    source: "FMI World Economic Outlook",
    time: "il y a 3 h",
  },
  {
    id: 5,
    tag: "BRVM",
    tagColor: "#d6b68d",
    headline: "BRVM : capitalisation boursière record à 7 843 Mds FCFA — nouveau sommet historique",
    source: "BRVM / Bloomfield",
    time: "il y a 4 h",
  },
  {
    id: 6,
    tag: "AGRI",
    tagColor: "#34d399",
    headline: "Cacao Côte d'Ivoire : production 2023/24 estimée à 2,2 Mt selon le CCC",
    source: "CCC Abidjan",
    time: "il y a 5 h",
  },
  {
    id: 7,
    tag: "POLITIQUE",
    tagColor: "#fb923c",
    headline: "Sénégal : premier budget pétrolier — revenus estimés à 1,2 Mds USD pour 2025",
    source: "Ministère des Finances SN",
    time: "il y a 6 h",
  },
];

export function NewsWidget() {
  const C = useThemeColors();
  return (
    <WidgetShell
      title="Flash Info & Actualités"
      subtitle="Flux temps réel — marchés & économie africaine"
      lastUpdate="Actualisé il y a 2 min"
      accentColor={C.accent}
      noPadding
    >
      <div style={{ overflow: "auto", height: "100%" }}>
        {news.map((item, i) => (
          <div
            key={item.id}
            style={{
              padding: "8px 12px",
              borderBottom: `1px solid ${C.border}20`,
              background: i === 0 ? "var(--bt-accent-a06)" : "transparent",
              cursor: "pointer",
              transition: "background 0.1s",
              position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(214, 182, 141,0.05)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = i === 0 ? "var(--bt-accent-a06)" : "transparent")
            }
          >
            {/* Priority stripe */}
            {item.priority === "high" && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 6,
                  bottom: 6,
                  width: 2,
                  borderRadius: 2,
                  background: item.tagColor,
                }}
              />
            )}

            <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
              {/* Tag */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: item.tagColor,
                  background: item.tagColor + "15",
                  border: `1px solid ${item.tagColor}30`,
                  borderRadius: 3,
                  padding: "2px 5px",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {item.tag}
              </span>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    color: i === 0 ? C.text : "#b0cce2",
                    fontWeight: i === 0 ? 600 : 500,
                    lineHeight: 1.45,
                  }}
                >
                  {item.headline}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginTop: 3,
                  }}
                >
                  <span style={{ fontSize: 11, color: C.muted }}>{item.source}</span>
                  <span style={{ fontSize: 11, color: C.muted }}>·</span>
                  <span style={{ fontSize: 11, color: C.muted }}>{item.time}</span>
                </div>
              </div>

              <ExternalLink size={10} color={C.muted} style={{ flexShrink: 0, marginTop: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}
