import { GraduationCap, BookOpen, Play, ChevronRight, Clock, Award, Lock } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

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

interface Module {
  id: number;
  title: string;
  description: string;
  type: "explainer" | "course" | "glossary" | "video";
  typeLabel: string;
  typeColor: string;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  category: string;
  lessons?: number;
  progress?: number;
  isPremium: boolean;
  isCertified?: boolean;
  isNew?: boolean;
}

const MODULES: Module[] = [
  {
    id: 1,
    title: "Introduction aux Marchés Financiers Africains — BRVM, NSE, EGX",
    description: "Découvrez le fonctionnement des principales bourses africaines, les instruments cotés, les règles de marché et les acteurs institutionnels clés.",
    type: "course",
    typeLabel: "MODULE",
    typeColor: C.accent,
    duration: "3h 20min",
    level: "Débutant",
    category: "Marchés",
    lessons: 12,
    progress: 0,
    isPremium: false,
    isCertified: true,
  },
  {
    id: 2,
    title: "Analyse Fondamentale des Entreprises Cotées en Afrique de l'Ouest",
    description: "Maîtrisez les techniques d'analyse financière appliquées aux marchés africains : lecture des comptes, calcul de ratios, valorisation DCF et comparables.",
    type: "course",
    typeLabel: "MODULE",
    typeColor: C.accent,
    duration: "5h 45min",
    level: "Intermédiaire",
    category: "Analyse",
    lessons: 18,
    progress: 35,
    isPremium: true,
    isCertified: true,
    isNew: false,
  },
  {
    id: 3,
    title: "Comprendre la Politique Monétaire de la BCEAO",
    description: "Explainer complet sur les mécanismes de la BCEAO : instruments, canaux de transmission, impact sur la liquidité bancaire et les taux de marché.",
    type: "explainer",
    typeLabel: "EXPLAINER",
    typeColor: C.purple,
    duration: "25 min",
    level: "Intermédiaire",
    category: "Macro",
    isPremium: false,
    isNew: true,
  },
  {
    id: 4,
    title: "Glossaire Financier UEMOA — 420+ Termes Clés avec Définitions",
    description: "Référentiel terminologique complet couvrant la finance de marché, la macro-économie, les dettes souveraines, la réglementation bancaire et les changes.",
    type: "glossary",
    typeLabel: "GLOSSAIRE",
    typeColor: C.gold,
    duration: "Référence",
    level: "Débutant",
    category: "Référence",
    isPremium: false,
  },
  {
    id: 5,
    title: "Investir en Obligations Souveraines UEMOA — Stratégies & Risques",
    description: "Cours avancé sur l'investissement en dette souveraine UEMOA : structure du marché primaire, duration, convexité, spreads et construction de portefeuilles obligataires.",
    type: "course",
    typeLabel: "MODULE",
    typeColor: C.accent,
    duration: "4h 10min",
    level: "Avancé",
    category: "Obligations",
    lessons: 14,
    progress: 0,
    isPremium: true,
    isCertified: true,
    isNew: true,
  },
  {
    id: 6,
    title: "Courte Vidéo : Qu'est-ce que le Taux de Change XOF/USD et comment le lire ?",
    description: "Vidéo pédagogique de 8 minutes expliquant le mécanisme de parité du franc CFA, la convertibilité, et les implications pratiques pour les investisseurs.",
    type: "video",
    typeLabel: "VIDÉO ÉDUCATIVE",
    typeColor: C.orange,
    duration: "8 min",
    level: "Débutant",
    category: "Change",
    isPremium: false,
    isNew: true,
  },
];

const LEVEL_COLORS: Record<string, string> = {
  "Débutant": C.green,
  "Intermédiaire": C.gold,
  "Avancé": C.red,
};

const TYPE_ICONS: Record<string, ReactNode> = {
  explainer: <BookOpen size={12} />,
  course: <GraduationCap size={12} />,
  glossary: <BookOpen size={12} />,
  video: <Play size={12} />,
};

function ModuleCard({ module }: { module: Module }) {
  const levelColor = LEVEL_COLORS[module.level] || C.muted;

  return (
    <div
      style={{
        background: "rgba(0, 4, 48,0.5)",
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
      {/* Top accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${module.typeColor} 0%, transparent 70%)`,
          borderRadius: "7px 7px 0 0",
        }}
      />

      {/* Type & tags row */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 6px",
            borderRadius: 3,
            background: module.typeColor + "14",
            border: `1px solid ${module.typeColor}30`,
            fontSize: 7.5,
            fontWeight: 700,
            color: module.typeColor,
            letterSpacing: "0.06em",
          }}
        >
          {TYPE_ICONS[module.type]}
          {module.typeLabel}
        </span>
        <span
          style={{
            padding: "2px 6px",
            borderRadius: 3,
            background: levelColor + "12",
            border: `1px solid ${levelColor}30`,
            fontSize: 7.5,
            fontWeight: 600,
            color: levelColor,
          }}
        >
          {module.level}
        </span>
        {module.isNew && (
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
        {module.isPremium && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              padding: "1px 5px",
              borderRadius: 2,
              background: "rgba(244,185,66,0.1)",
              border: "1px solid rgba(244,185,66,0.25)",
              fontSize: 7.5,
              fontWeight: 700,
              color: C.gold,
            }}
          >
            <Lock size={7} />
            PREMIUM
          </span>
        )}
        {module.isCertified && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              padding: "1px 5px",
              borderRadius: 2,
              background: "rgba(167,139,250,0.1)",
              border: "1px solid rgba(167,139,250,0.25)",
              fontSize: 7.5,
              fontWeight: 700,
              color: C.purple,
            }}
          >
            <Award size={7} />
            CERTIFIÉ
          </span>
        )}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: C.text,
          lineHeight: 1.4,
        }}
      >
        {module.title}
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
        {module.description}
      </p>

      {/* Progress bar (if started) */}
      {module.progress !== undefined && module.progress > 0 && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 8, color: C.muted }}>Progression</span>
            <span style={{ fontSize: 8, color: C.accent, fontWeight: 600 }}>{module.progress}%</span>
          </div>
          <div
            style={{
              height: 3,
              background: "rgba(44, 61, 127,0.3)",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${module.progress}%`,
                background: `linear-gradient(90deg, ${C.accent} 0%, #d6b68d 100%)`,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: "auto" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 8.5, color: C.muted }}>
          <Clock size={8} />
          {module.duration}
        </span>
        {module.lessons && (
          <span style={{ fontSize: 8.5, color: C.muted }}>{module.lessons} leçons</span>
        )}
        <span
          style={{
            padding: "1px 5px",
            borderRadius: 2,
            background: "rgba(44, 61, 127,0.2)",
            fontSize: 8,
            color: C.muted,
          }}
        >
          {module.category}
        </span>
        <div style={{ flex: 1 }} />
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "4px 10px",
            borderRadius: 4,
            background: module.progress && module.progress > 0
              ? "rgba(214, 182, 141,0.12)"
              : "rgba(214, 182, 141,0.08)",
            border: "1px solid rgba(214, 182, 141,0.22)",
            color: C.accent,
            fontSize: 9,
            fontWeight: 700,
            cursor: "pointer",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {module.progress && module.progress > 0 ? "Continuer" : "Commencer"}
          <ChevronRight size={9} />
        </button>
      </div>
    </div>
  );
}

export function EducationSection() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const categories = ["Tous", "Marchés", "Macro", "Obligations", "Analyse", "Change", "Référence"];

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
        <GraduationCap size={13} color={C.purple} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>Bibliothèque Éducative</span>
        <span style={{ fontSize: 9, color: C.muted }}>· Explainers, Modules & Formations Certifiantes</span>
        <div style={{ flex: 1 }} />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "3px 8px",
              borderRadius: 3,
              border: `1px solid ${activeCategory === cat ? "rgba(167,139,250,0.4)" : "rgba(44, 61, 127,0.22)"}`,
              background: activeCategory === cat ? "rgba(167,139,250,0.1)" : "transparent",
              color: activeCategory === cat ? C.purple : C.muted,
              fontSize: 9,
              fontWeight: activeCategory === cat ? 700 : 500,
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            borderRadius: 4,
            background: "rgba(167,139,250,0.08)",
            border: "1px solid rgba(167,139,250,0.2)",
            color: C.purple,
            fontSize: 9,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Tout voir
          <ChevronRight size={10} />
        </button>
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          padding: "8px 14px",
          borderBottom: `1px solid rgba(44, 61, 127,0.16)`,
          background: "rgba(0, 4, 48,0.2)",
        }}
      >
        {[
          { label: "Modules disponibles", value: "47", color: C.accent },
          { label: "Explainers", value: "83", color: C.purple },
          { label: "Vidéos éducatives", value: "124", color: C.orange },
          { label: "Apprenants actifs", value: "2 847", color: C.green },
          { label: "Certifications délivrées", value: "394", color: C.gold },
        ].map((stat) => (
          <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: stat.color }}>{stat.value}</span>
            <span style={{ fontSize: 8, color: C.muted }}>{stat.label}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "4px 10px",
            borderRadius: 4,
            background: "rgba(167,139,250,0.08)",
            border: "1px solid rgba(167,139,250,0.2)",
          }}
        >
          <Award size={10} color={C.purple} />
          <span style={{ fontSize: 9, color: C.purple, fontWeight: 600 }}>
            Mon parcours : 35% complété — Module 2/5
          </span>
        </div>
      </div>

      {/* Modules grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          padding: 12,
        }}
      >
        {MODULES.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}