import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Bot,
  Sparkles,
  TrendingUp,
  Globe2,
  BarChart3,
  ShoppingCart,
  AlertTriangle,
  ChevronRight,
  RefreshCw,
  Copy,
  ThumbsUp,
  Zap,
  Clock,
  Shield,
} from "lucide-react";
import { useTerminal } from "../../context/TerminalContext";

const C = {
  surface: "#000430",
  elevated: "#000430",
  dark: "#000430",
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

type Category = "marché" | "entreprise" | "macro" | "signal" | "ordre";

interface Prompt {
  id: string;
  category: Category;
  label: string;
  icon: React.ReactNode;
  response: React.ReactNode;
}

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  content?: React.ReactNode;
  timestamp: string;
}

const DECISION_BLOCKS = [
  {
    type: "signal",
    label: "Signal du Jour",
    icon: <Zap size={10} />,
    color: C.gold,
    title: "PALM CI · Signal MOMENTUM HAUSSIER",
    detail: "RSI 72 + volume +42% · Cacao CI en forte hausse",
  },
  {
    type: "opportunite",
    label: "Opportunité Détectée",
    icon: <TrendingUp size={10} />,
    color: C.green,
    title: "SGBCI · Décote 18% vs pairs BRVM",
    detail: "P/BV 0.92x · ROE 18.3% · Potentiel +27.3%",
  },
  {
    type: "vigilance",
    label: "Zone de Vigilance",
    icon: <AlertTriangle size={10} />,
    color: C.orange,
    title: "SAPH CI · Pression sur marges",
    detail: "RSI 29 · Coûts production +18% · Révision -23.7%",
  },
  {
    type: "recommandation",
    label: "Recommandation",
    icon: <Shield size={10} />,
    color: C.accent,
    title: "Souverains CIV/SEN · Fenêtre d'entrée",
    detail: "Rendements 6.8–7.2% · Prochaine émission 15 Mai",
  },
];

const CATEGORY_CONFIG: Record<Category, { label: string; color: string; icon: React.ReactNode }> = {
  marché: { label: "Marché", color: C.accent, icon: <TrendingUp size={10} /> },
  entreprise: { label: "Entreprise", color: C.gold, icon: <BarChart3 size={10} /> },
  macro: { label: "Macro", color: C.purple, icon: <Globe2 size={10} /> },
  signal: { label: "Signal", color: C.green, icon: <Zap size={10} /> },
  ordre: { label: "Ordre", color: C.orange, icon: <ShoppingCart size={10} /> },
};

const PROMPTS: Prompt[] = [
  {
    id: "mkt-1",
    category: "marché",
    label: "Résumer la situation BRVM aujourd'hui",
    icon: <TrendingUp size={10} />,
    response: (
      <AIResponse
        title="Situation BRVM · 08 Avr 2026"
        sections={[
          {
            label: "Vue d'ensemble",
            content:
              "La BRVM affiche une séance positive avec le BRVM Composite en hausse de +1.23% à 282.4 pts, portée par les secteurs Télécom (+3.1%) et Agri-alimentaire (+2.8%). La capitalisation boursière atteint un nouveau sommet à 7 843 Mds FCFA.",
          },
          {
            label: "Mouvements remarquables",
            content:
              "PALM CI (+7.35%) et SONATEL (+5.21%) dominent les hausses sur fond de volumes élevés. En baisse, SAPH CI (-3.42%) subit des pressions de coûts persistantes. SOLIBRA recule (-2.78%) après publication de résultats décevants.",
          },
          {
            label: "Lecture institutionnelle",
            content:
              "La dynamique est soutenue par les flux d'achat étrangers (+12% vs moyenne 30J). Le positionnement sectoriel suggère une rotation vers les exportateurs de matières premières, cohérente avec le rallye cacao.",
          },
        ]}
        tags={["BRVM", "Séance +1.23%", "Télécom fort"]}
        confidence={92}
      />
    ),
  },
  {
    id: "mkt-2",
    category: "marché",
    label: "Expliquer le mouvement de PALM CI",
    icon: <TrendingUp size={10} />,
    response: (
      <AIResponse
        title="Analyse Mouvement · PALM CI"
        sections={[
          {
            label: "Catalyseur principal",
            content:
              "La hausse de +7.35% de PALM CI est directement corrélée au cours international du cacao qui a progressé de +42% depuis le début de l'année, atteignant 9 800 USD/tonne — un niveau record historique. Palmci, premier producteur ivoirien, bénéficie d'un effet de levier opérationnel significatif.",
          },
          {
            label: "Fondamentaux soutenant",
            content:
              "P/E 12.8x reste attractif pour le secteur agricole africain. Le RSI à 72 indique une zone de surachat technique à surveiller, mais le momentum fondamental compense. Volume anormalement élevé (+38% vs 30J) confirme l'intérêt institutionnel.",
          },
          {
            label: "Risques à surveiller",
            content:
              "Correction technique possible à court terme (RSI > 70). Sensibilité aux prix internationaux du cacao reste le principal risque. Météorologie et cycle de récolte 2026 à monitorer.",
          },
        ]}
        tags={["PALM CI", "+7.35%", "Cacao +42%", "RSI 72"]}
        confidence={88}
      />
    ),
  },
  {
    id: "ent-1",
    category: "entreprise",
    label: "Synthèse investissement SGBCI",
    icon: <BarChart3 size={10} />,
    response: (
      <AIResponse
        title="Synthèse Investissement · SGBCI"
        sections={[
          {
            label: "Thèse d'investissement",
            content:
              "SGBCI présente le profil risque/rendement le plus attractif du secteur bancaire BRVM. Le titre se traite avec une décote de 18% par rapport à ses pairs régionaux (P/BV 0.92x vs 1.12x médiane). La qualité du bilan (NPL 4.2%, couverture 94.5%) et le ROE de 18.3% justifient un reclassement.",
          },
          {
            label: "Score composite",
            content:
              "Attractivité Valorisation : 4/5 · Solidité Bilan : 5/5 · Dynamique Résultats : 4/5 · Liquidité : 3/5. Score global 4.0/5 — Conviction FORTE. Recommandation ACHAT avec objectif de cours 17 500 XOF (+27.3%).",
          },
          {
            label: "Catalyseurs attendus",
            content:
              "Résultats T1 2026 (publication 28 Avr), hausse dividende attendue à 7.5% de rendement, possible entrée dans l'indice BRVM 10 après recalcul de la capitalisation flottante.",
          },
        ]}
        tags={["SGBCI", "ACHAT", "Objectif 17 500 XOF", "+27.3%"]}
        confidence={91}
      />
    ),
  },
  {
    id: "ent-2",
    category: "entreprise",
    label: "Comparer SONATEL vs ETI",
    icon: <BarChart3 size={10} />,
    response: (
      <AIResponse
        title="Comparaison Sectorielle · SONATEL vs ETI"
        sections={[
          {
            label: "Valorisation",
            content:
              "SONATEL (P/E 18.4x, P/BV 3.2x) est plus chère mais justifiée par sa croissance supérieure (+8.3% bénéfices). ETI (P/E 9.2x) présente une valorisation discount liée à une volatilité géographique plus élevée et une dépendance à des marchés instables.",
          },
          {
            label: "Qualité opérationnelle",
            content:
              "SONATEL domine sur les marges EBITDA (42.1% vs 28.4% pour ETI) et la génération de cash-flow libre. ETI dispose d'un réseau panafricain unique (36 pays) qui constitue une option de croissance optionnelle mais difficile à valoriser.",
          },
          {
            label: "Verdict Bloomfield",
            content:
              "Préférence pour SONATEL en profil de conviction. ETI intéressant pour une allocation diversifiée panafricaine avec une tolérance aux chocs de marché. Pour un portefeuille concentré, SONATEL offre la meilleure visibilité.",
          },
        ]}
        tags={["SONATEL", "ETI", "Comparaison", "Télécom vs Finance"]}
        confidence={85}
      />
    ),
  },
  {
    id: "mac-1",
    category: "macro",
    label: "Synthèse macro UEMOA 2026",
    icon: <Globe2 size={10} />,
    response: (
      <AIResponse
        title="Macro UEMOA · Bilan & Perspectives 2026"
        sections={[
          {
            label: "Croissance & stabilité",
            content:
              "La zone UEMOA affiche une résilience remarquable avec une croissance moyenne de 5.8% en 2025 (FMI) et une révision à 6.1% pour 2026. La Côte d'Ivoire (+6.8%) et le Sénégal (+7.2% porté par les hydrocarbures) tirent la région. Le Burkina Faso demeure sous pression sécuritaire.",
          },
          {
            label: "Politique monétaire BCEAO",
            content:
              "La BCEAO maintient son taux directeur à 3.50% — décision attendue lors du prochain CPM en Mai 2026. L'inflation est contenue à 2.8% (en dessous du plafond communautaire de 3%). La gestion des réserves de change reste solide (4.8 mois d'importations).",
          },
          {
            label: "Risques & vigilances",
            content:
              "Dépendance aux matières premières (cacao, pétrole, coton) constitue le principal risque de volatilité. La pression des dettes souveraines reste modérée mais plusieurs États approchent des seuils d'alerte CREPMF. Transition politique au Sénégal à surveiller pour la stabilité des flux.",
          },
        ]}
        tags={["UEMOA", "BCEAO 3.5%", "Croissance 6.1%", "Inflation 2.8%"]}
        confidence={89}
      />
    ),
  },
  {
    id: "sig-1",
    category: "signal",
    label: "Détecter signaux anormaux du jour",
    icon: <Zap size={10} />,
    response: (
      <AIResponse
        title="Détection de Signaux Anormaux · 08 Avr 2026"
        sections={[
          {
            label: "Anomalies de volume détectées",
            content:
              "ETI : volume 3.2x la moyenne 30J sans catalyseur apparent — signal d'accumulation institutionnelle potentielle. CROWN CI : volume divisé par 5 — possible absence de market maker ou retrait d'un anchor investor.",
          },
          {
            label: "Divergences prix/volume",
            content:
              "SAPH CI affiche une divergence baissière classique : nouvelle clôture basse 52 semaines mais RSI en remontée depuis 25 → signal de retournement potentiel à surveiller à 3–5 séances. Pas d'action recommandée sans confirmation supplémentaire.",
          },
          {
            label: "Alertes Bloomfield AI",
            content:
              "1 alerte de seuil déclenchée : PALM CI > 7 000 FCFA il y a 12 min. Aucun mouvement de bloc détecté sur les souverains. Prochaine publication importante : OAT CIV 10Y — résultat adjudication 11 Avr 14h.",
          },
        ]}
        tags={["ETI volume ×3.2", "SAPH divergence", "PALM CI alerte"]}
        confidence={78}
        warning="Signaux basés sur données de marché temps réel. Validation analyste recommandée avant action."
      />
    ),
  },
  {
    id: "ord-1",
    category: "ordre",
    label: "Préparer un ordre SONATEL",
    icon: <ShoppingCart size={10} />,
    response: (
      <AIResponse
        title="Assistance Préparation Ordre · SONATEL"
        sections={[
          {
            label: "Paramétrage suggéré",
            content:
              "Sur la base du profil institutionnel standard et du signal ACHAT Bloomfield, les paramètres suivants sont suggérés : Type LIMIT · Cours 16 800 XOF (cours actuel) · Quantité 100–200 titres selon allocation mandat. Ordre LIMIT préféré au MARKET pour contrôle de glissement.",
          },
          {
            label: "Analyse risque/rendement",
            content:
              "Valorisation justifiée jusqu'à 18 500 XOF (P/E cible 20x). Stop implicite : 15 200 XOF (–9.5%). Ratio R/R : 2.8x avec objectif 19 500 XOF. Taille recommandée : max 15% de l'allocation sectorielle Télécom.",
          },
          {
            label: "Conformité & circuit",
            content:
              "Montant estimé 1.68–3.36 M XOF selon quantité. Si > 5M XOF, validation contrôleur Diallo Mamadou requise. Délai de règlement BRVM : J+3. Fenêtre optimale d'exécution : 09h30–11h00 GMT pour liquidité maximale.",
          },
        ]}
        tags={["SONATEL", "ACHAT", "Cours 16 800", "LIMIT suggéré"]}
        confidence={87}
        actionLabel="Ouvrir ticket d'ordre"
        actionAssetCode="SONATEL"
      />
    ),
  },
  {
    id: "ord-2",
    category: "ordre",
    label: "Identifier opportunités souveraines",
    icon: <ShoppingCart size={10} />,
    response: (
      <AIResponse
        title="Analyse Opportunités Souveraines UMOA-Titres"
        sections={[
          {
            label: "Fenêtre d'entrée actuelle",
            content:
              "Les OAT BCEAO offrent actuellement des rendements attractifs : OAT CIV 7Y à 6.89%, OAT SEN 10Y à 7.12%. Vs maturités comparables : spread de 320–350pb sur les T-Notes US. Dans un contexte de BCEAO accommodant, ces niveaux représentent une fenêtre d'entrée favorable.",
          },
          {
            label: "Profil institutionnel optimal",
            content:
              "Pour une allocation institutionnelle UEMOA : OAT CIV 7Y recommandé pour une duration cible de 4–5 ans. Lot minimum UMOA-Titres : 10 titres à 100 000 XOF nominal = 1 000 000 XOF. Couverture en cas de hausse de taux : considérer des OAT courtes (2–3 ans).",
          },
        ]}
        tags={["OAT CIV 6.89%", "OAT SEN 7.12%", "UMOA-Titres", "Fenêtre favorable"]}
        confidence={83}
        actionLabel="Préparer ordre OAT CIV"
        actionAssetCode="OAT CIV 7Y"
      />
    ),
  },
];

function AIResponse({
  title,
  sections,
  tags,
  confidence,
  warning,
  actionLabel,
  actionAssetCode,
}: {
  title: string;
  sections: { label: string; content: string }[];
  tags: string[];
  confidence: number;
  warning?: string;
  actionLabel?: string;
  actionAssetCode?: string;
}) {
  const { openOrderPanel } = useTerminal();
  return (
    <div>
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: C.text,
          marginBottom: 8,
          paddingBottom: 6,
          borderBottom: `1px solid rgba(214, 182, 141,0.15)`,
        }}
      >
        {title}
      </div>
      {sections.map((s, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: C.accent,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginBottom: 3,
            }}
          >
            {s.label}
          </div>
          <p style={{ margin: 0, fontSize: 9.5, color: C.dim, lineHeight: 1.55 }}>
            {s.content}
          </p>
        </div>
      ))}
      {warning && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 8px",
            background: "rgba(244,185,66,0.07)",
            border: "1px solid rgba(244,185,66,0.2)",
            borderRadius: 4,
            marginBottom: 8,
          }}
        >
          <AlertTriangle size={9} color={C.gold} />
          <span style={{ fontSize: 8, color: C.gold }}>{warning}</span>
        </div>
      )}
      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: actionLabel ? 8 : 0 }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 7.5,
              fontWeight: 600,
              color: C.dim,
              background: "rgba(214, 182, 141,0.08)",
              border: "1px solid rgba(214, 182, 141,0.15)",
              borderRadius: 3,
              padding: "1px 6px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      {/* Confidence */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
        <span style={{ fontSize: 7.5, color: C.muted }}>Confiance IA</span>
        <div
          style={{
            height: 3,
            width: 80,
            background: "rgba(44, 61, 127,0.2)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${confidence}%`,
              background:
                confidence >= 85 ? C.green : confidence >= 70 ? C.gold : C.orange,
              borderRadius: 2,
            }}
          />
        </div>
        <span
          style={{
            fontSize: 7.5,
            fontWeight: 700,
            color: confidence >= 85 ? C.green : confidence >= 70 ? C.gold : C.orange,
          }}
        >
          {confidence}%
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 7.5, color: C.muted }}>
          Bloomfield AI · {new Date().toLocaleDateString("fr-FR")}
        </span>
      </div>
      {actionLabel && actionAssetCode && (
        <button
          onClick={() => openOrderPanel({ assetCode: actionAssetCode })}
          style={{
            marginTop: 8,
            width: "100%",
            padding: "7px 12px",
            borderRadius: 5,
            border: `1px solid ${C.accent}40`,
            background: "rgba(214, 182, 141,0.1)",
            color: C.accent,
            fontSize: 9.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <ShoppingCart size={11} />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function formatTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function AIPanelAssistant() {
  const { isAIPanelOpen, aiInitialPrompt, closeAIPanel, openOrderPanel } = useTerminal();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle initial prompt
  useEffect(() => {
    if (isAIPanelOpen && aiInitialPrompt) {
      setMessages([]);
      // Simulate user sending the initial prompt
      const userMsg: Message = {
        id: Date.now().toString(),
        type: "user",
        text: aiInitialPrompt,
        timestamp: formatTime(),
      };
      setMessages([userMsg]);
      setIsTyping(true);
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          text: "",
          content: (
            <AIResponse
              title={`Analyse IA · ${aiInitialPrompt}`}
              sections={[
                {
                  label: "Réponse contextuelle",
                  content:
                    "L'analyse de la situation actuelle indique une dynamique positive sur les marchés BRVM avec des signaux de momentum sur les secteurs exportateurs. La configuration macroéconomique UEMOA reste favorable pour une allocation en actions locales.",
                },
                {
                  label: "Points clés",
                  content:
                    "Les indicateurs fondamentaux et techniques convergent vers une posture d'accumulation sélective. Priorité aux titres à fort potentiel de revalorisation : SGBCI, PALM CI, SONATEL selon les profils risque.",
                },
              ]}
              tags={["Analyse personnalisée", "BRVM", "Contexte favorable"]}
              confidence={82}
            />
          ),
          timestamp: formatTime(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1800);
    } else if (!isAIPanelOpen) {
      setMessages([]);
      setInputValue("");
    }
  }, [isAIPanelOpen, aiInitialPrompt]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handlePromptClick = (prompt: Prompt) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: prompt.label,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: "",
        content: prompt.response,
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  const handleSendCustom = () => {
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue("");
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text,
      timestamp: formatTime(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: "",
        content: (
          <AIResponse
            title={`Réponse à : "${text.slice(0, 40)}..."`}
            sections={[
              {
                label: "Analyse contextuelle",
                content:
                  "Sur la base des données disponibles en temps réel sur la BRVM et les marchés UEMOA, voici une analyse de votre question. Les conditions de marché actuelles sont globalement favorables avec des flux institutionnels positifs et une liquidité en amélioration.",
              },
              {
                label: "Recommandation",
                content:
                  "Pour une analyse plus approfondie sur ce sujet spécifique, l'équipe Bloomfield Intelligence Research peut vous fournir une note dédiée. Les données en temps réel suggèrent de surveiller l'évolution des indicateurs macro BCEAO pour le contexte de votre question.",
              },
            ]}
            tags={["Analyse personnalisée", "Bloomfield AI"]}
            confidence={74}
          />
        ),
        timestamp: formatTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1600);
  };

  const filteredPrompts =
    activeCategory === "all"
      ? PROMPTS
      : PROMPTS.filter((p) => p.category === activeCategory);

  if (!isAIPanelOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeAIPanel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 4, 48,0.55)",
          zIndex: 200,
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 460,
          height: "100vh",
          background: C.surface,
          borderLeft: `1px solid ${C.border}`,
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "-8px 0 48px rgba(0,0,0,0.5)",
        }}
      >
        {/* Accent top */}
        <div
          style={{
            height: 2,
            background: `linear-gradient(90deg, ${C.purple} 0%, ${C.accent} 60%, transparent 100%)`,
            flexShrink: 0,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "11px 16px",
            borderBottom: `1px solid ${C.border}`,
            background: "rgba(0, 4, 48,0.5)",
            flexShrink: 0,
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 7,
              background: `linear-gradient(135deg, ${C.purple}33 0%, ${C.accent}22 100%)`,
              border: `1px solid ${C.purple}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Bot size={14} color={C.purple} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: C.text,
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              BLOOMFIELD AI
              <span
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  color: C.purple,
                  background: `${C.purple}18`,
                  border: `1px solid ${C.purple}30`,
                  borderRadius: 3,
                  padding: "1px 5px",
                  letterSpacing: "0.05em",
                }}
              >
                ANALYST ASSISTANT
              </span>
            </div>
            <div style={{ fontSize: 8.5, color: C.muted, marginTop: 1 }}>
              Intelligence financière africaine · BRVM · UEMOA · BCEAO
            </div>
          </div>

          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.green,
                boxShadow: `0 0 6px ${C.green}`,
              }}
            />
            <span style={{ fontSize: 8, color: C.green, fontWeight: 600 }}>EN LIGNE</span>
          </div>

          <button
            onClick={closeAIPanel}
            style={{
              width: 28,
              height: 28,
              borderRadius: 5,
              background: "transparent",
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.muted,
              flexShrink: 0,
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Conversation area OR suggestions */}
        {messages.length === 0 ? (
          <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
            {/* Decision Support Blocks */}
            <div
              style={{
                padding: "12px 14px 8px",
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 8,
                  fontWeight: 700,
                  color: C.muted,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Sparkles size={9} color={C.gold} />
                Blocs Décisionnels du Jour
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {DECISION_BLOCKS.map((block) => (
                  <div
                    key={block.type}
                    style={{
                      padding: "8px 10px",
                      background: `${block.color}08`,
                      border: `1px solid ${block.color}25`,
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = `${block.color}12`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = `${block.color}08`)
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{ color: block.color }}>{block.icon}</span>
                      <span
                        style={{
                          fontSize: 7.5,
                          fontWeight: 700,
                          color: block.color,
                          letterSpacing: "0.05em",
                          textTransform: "uppercase",
                        }}
                      >
                        {block.label}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: C.text,
                        marginBottom: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {block.title}
                    </div>
                    <div style={{ fontSize: 8, color: C.dim }}>{block.detail}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div
              style={{
                padding: "8px 14px 6px",
                borderBottom: `1px solid ${C.border}`,
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setActiveCategory("all")}
                style={{
                  padding: "2px 8px",
                  borderRadius: 3,
                  border: `1px solid ${activeCategory === "all" ? C.accent + "50" : C.border}`,
                  background:
                    activeCategory === "all" ? "rgba(214, 182, 141,0.1)" : "transparent",
                  color: activeCategory === "all" ? C.accent : C.muted,
                  fontSize: 8.5,
                  fontWeight: activeCategory === "all" ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                Tout
              </button>
              {(Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => {
                const cfg = CATEGORY_CONFIG[cat];
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(isActive ? "all" : cat)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "2px 8px",
                      borderRadius: 3,
                      border: `1px solid ${isActive ? cfg.color + "50" : C.border}`,
                      background: isActive ? cfg.color + "12" : "transparent",
                      color: isActive ? cfg.color : C.muted,
                      fontSize: 8.5,
                      fontWeight: isActive ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: isActive ? cfg.color : C.muted }}>
                      {cfg.icon}
                    </span>
                    {cfg.label}
                  </button>
                );
              })}
            </div>

            {/* Prompt suggestions */}
            <div style={{ padding: "8px 14px 12px" }}>
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
                Questions suggérées
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {filteredPrompts.map((prompt) => {
                  const catCfg = CATEGORY_CONFIG[prompt.category];
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => handlePromptClick(prompt)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "9px 11px",
                        background: C.elevated,
                        border: `1px solid ${C.border}`,
                        borderRadius: 6,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.1s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(214, 182, 141,0.07)";
                        e.currentTarget.style.borderColor = C.accent + "40";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = C.elevated;
                        e.currentTarget.style.borderColor = C.border;
                      }}
                    >
                      <span
                        style={{
                          fontSize: 7,
                          fontWeight: 700,
                          color: catCfg.color,
                          background: catCfg.color + "12",
                          border: `1px solid ${catCfg.color}25`,
                          borderRadius: 3,
                          padding: "1px 5px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {catCfg.label.toUpperCase()}
                      </span>
                      <span style={{ fontSize: 9.5, color: C.dim, flex: 1 }}>
                        {prompt.label}
                      </span>
                      <ChevronRight size={11} color={C.muted} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Conversation view */
          <div style={{ flex: 1, overflow: "auto", minHeight: 0, padding: "10px 14px" }}>
            {/* Reset button */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
              <button
                onClick={() => setMessages([])}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "3px 8px",
                  borderRadius: 4,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.muted,
                  fontSize: 8,
                  cursor: "pointer",
                }}
              >
                <RefreshCw size={9} />
                Nouvelle conversation
              </button>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: 12,
                  display: "flex",
                  flexDirection: msg.type === "user" ? "row-reverse" : "row",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background:
                      msg.type === "user"
                        ? "rgba(214, 182, 141,0.15)"
                        : `${C.purple}22`,
                    border: `1px solid ${msg.type === "user" ? C.accent + "30" : C.purple + "30"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: 8,
                    fontWeight: 700,
                    color: msg.type === "user" ? C.accent : C.purple,
                  }}
                >
                  {msg.type === "user" ? "AK" : <Bot size={12} />}
                </div>

                {/* Bubble */}
                <div
                  style={{
                    maxWidth: "82%",
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      padding: "9px 11px",
                      background:
                        msg.type === "user"
                          ? "rgba(214, 182, 141,0.1)"
                          : C.elevated,
                      border: `1px solid ${msg.type === "user" ? C.accent + "25" : C.border}`,
                      borderRadius: msg.type === "user" ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
                    }}
                  >
                    {msg.content ? (
                      msg.content
                    ) : (
                      <p
                        style={{
                          margin: 0,
                          fontSize: 9.5,
                          color: msg.type === "user" ? C.text : C.dim,
                          lineHeight: 1.5,
                        }}
                      >
                        {msg.text}
                      </p>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 7.5,
                      color: C.muted,
                      marginTop: 3,
                      textAlign: msg.type === "user" ? "right" : "left",
                    }}
                  >
                    <Clock size={7} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                    {msg.timestamp}
                    {msg.type === "ai" && (
                      <>
                        {" · "}
                        <button
                          style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 0 }}
                        >
                          <Copy size={7} style={{ display: "inline", verticalAlign: "middle" }} />
                        </button>
                        {" "}
                        <button
                          style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 0 }}
                        >
                          <ThumbsUp size={7} style={{ display: "inline", verticalAlign: "middle" }} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: `${C.purple}22`,
                    border: `1px solid ${C.purple}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={12} color={C.purple} />
                </div>
                <div
                  style={{
                    padding: "10px 14px",
                    background: C.elevated,
                    border: `1px solid ${C.border}`,
                    borderRadius: "8px 8px 8px 2px",
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: C.purple,
                        opacity: 0.6,
                        animation: `pulse ${0.8 + i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input */}
        <div
          style={{
            padding: "10px 14px",
            borderTop: `1px solid ${C.border}`,
            background: "rgba(0, 4, 48,0.5)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 6,
              background: "rgba(0, 4, 48,0.6)",
              border: `1px solid ${C.border}`,
              borderRadius: 7,
              padding: "6px 10px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendCustom();
                }
              }}
              placeholder="Posez une question sur les marchés, une entreprise, une macro…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: C.text,
                fontSize: 9.5,
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleSendCustom}
              disabled={!inputValue.trim()}
              style={{
                width: 26,
                height: 26,
                borderRadius: 5,
                border: "none",
                background:
                  inputValue.trim()
                    ? `linear-gradient(135deg, ${C.purple} 0%, ${C.accent} 100%)`
                    : "rgba(44, 61, 127,0.2)",
                color: inputValue.trim() ? "#fff" : C.muted,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: inputValue.trim() ? "pointer" : "not-allowed",
                flexShrink: 0,
              }}
            >
              <Send size={11} />
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 5 }}>
            <span style={{ fontSize: 7.5, color: C.muted }}>
              Bloomfield AI · Assistant d'intelligence institutionnelle · Ne constitue pas un conseil en investissement
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
