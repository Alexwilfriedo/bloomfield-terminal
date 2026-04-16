import { useState } from "react";
import {
  Download,
  Share2,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Target,
  Star,
  Mail,
  Printer,
  ChevronDown,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const REPORT = {
  company: "SGBCI",
  fullName: "Société Générale de Banques en Côte d'Ivoire",
  ticker: "SGBC",
  period: "FY2023",
  date: "28 Fév 2024",
  analyst: "Koné Adjoua",
  analystTitle: "Analyste Senior – Secteur Bancaire",
  recommendation: "ACHAT",
  previousRec: "ACHAT",
  target: "17 500 XOF",
  previousTarget: "16 200 XOF",
  currentPrice: "13 750 XOF",
  upside: "+27.3%",
  horizon: "12 mois",
  rating: "A– / Perspective Stable",
  ratingAgency: "Bloomfield Investment",
  sectorRanking: "1er sur 12",
};

const KPIs = [
  { label: "PNB FY2023", value: "154,6 Mds XOF", change: "+12,0%", up: true, note: "Supra-consensus +3,2%" },
  { label: "Résultat Net", value: "41,2 Mds XOF", change: "+17,4%", up: true, note: "ROE 18,3%" },
  { label: "Total Actif", value: "2 487 Mds XOF", change: "+11,1%", up: true, note: "Dépôts +14,2%" },
  { label: "Ratio CET1", value: "14,8%", change: "+0,8pp", up: true, note: "Au-dessus réglementaire" },
  { label: "Coût du Risque", value: "1,2%", change: "-0,3pp", up: true, note: "Amélioration qualité" },
  { label: "Dividende/Action", value: "820 XOF", change: "+10,8%", up: true, note: "Rendement 6,0%" },
];

const STRENGTHS = [
  "Position de leader sur le segment banque aux entreprises (35% part de marché Côte d'Ivoire)",
  "Soutien groupe Société Générale : accès refinancement international et expertise",
  "Amélioration continue du coût du risque : portefeuille créances saines optimisé",
  "Expansion régionale via le réseau BRVM (présence Sénégal, Burkina)",
];

const RISKS = [
  "Exposition au risque souverain CI (40% portefeuille d'investissement en OAT)",
  "Pression concurrentielle accrue des fintechs et mobile money sur la collecte",
  "Risque de taux sur le portefeuille obligations avec hausse potentielle des taux BCEAO",
];

const CATALYSTS = [
  { label: "Publication S1 2024", date: "Juil 2024", impact: "positive", desc: "Attente d'une croissance PNB >10%" },
  { label: "Décision BCEAO taux", date: "Mai 2024", impact: "neutral", desc: "Maintien 3,5% anticipé" },
  { label: "Dividende détachement", date: "Juin 2024", impact: "positive", desc: "820 XOF/action" },
];

const VALUATION = [
  { method: "Modèle Gordon-Shapiro (DDM)", weight: "40%", target: "17 200 XOF", signal: "ACHAT" },
  { method: "P/BV relatif pairs BRVM", weight: "35%", target: "18 100 XOF", signal: "ACHAT" },
  { method: "Comparables Afrique Sub-Sah.", weight: "25%", target: "17 650 XOF", signal: "ACHAT" },
];

function RecommBadge({ rec }: { rec: string }) {
  const C = useThemeColors();
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    ACHAT: { bg: "rgba(16,200,122,0.15)", text: C.green, border: "rgba(16,200,122,0.3)" },
    VENTE: { bg: "rgba(244,56,96,0.15)", text: C.red, border: "rgba(244,56,96,0.3)" },
    NEUTRE: { bg: "rgba(244,185,66,0.15)", text: C.gold, border: "rgba(244,185,66,0.3)" },
  };
  const s = colors[rec] ?? colors.NEUTRE;
  return (
    <span
      style={{
        padding: "3px 10px",
        borderRadius: 4,
        background: s.bg,
        border: `1px solid ${s.border}`,
        fontSize: 13,
        fontWeight: 800,
        color: s.text,
        letterSpacing: "0.08em",
      }}
    >
      {rec}
    </span>
  );
}

function SectionHeader({ title, icon }: { title: string; icon?: React.ReactNode }) {
  const C = useThemeColors();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        paddingBottom: 6,
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 10,
      }}
    >
      {icon && <span style={{ color: C.accent }}>{icon}</span>}
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: C.dim,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}

export function ReportSummaryWidget() {
  const C = useThemeColors();
  const [expandedSection, setExpandedSection] = useState<string | null>("valuation");

  const toggle = (s: string) => setExpandedSection(expandedSection === s ? null : s);

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
      {/* Gold accent top bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${C.gold} 0%, ${C.accent} 50%, transparent 80%)`, flexShrink: 0 }} />

      {/* Report header */}
      <div
        style={{
          padding: "10px 14px",
          borderBottom: `1px solid ${C.border}`,
          background: "var(--bt-overlay-40)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          {/* Identity */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <FileText size={12} color={C.gold} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: C.gold, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                BILAN DE RAPPORT — NOTE ANALYSTE
              </span>
              <span style={{ fontSize: 9.5, color: C.muted }}>· {REPORT.period} · {REPORT.date}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #1a4a7a 0%, #000117 100%)",
                  border: "1px solid var(--bt-accent-a25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: C.accent,
                  flexShrink: 0,
                }}
              >
                SG
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: C.text }}>{REPORT.company}</div>
                <div style={{ fontSize: 10.5, color: C.muted }}>{REPORT.fullName}</div>
              </div>
            </div>
          </div>

          {/* Recommendation box */}
          <div
            style={{
              background: "rgba(16,200,122,0.06)",
              border: "1px solid rgba(16,200,122,0.2)",
              borderRadius: 7,
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              flexShrink: 0,
              minWidth: 140,
            }}
          >
            <RecommBadge rec={REPORT.recommendation} />
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 10, color: C.muted }}>Objectif</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                {REPORT.target}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={10} color={C.green} />
              <span style={{ fontSize: 12.5, fontWeight: 700, color: C.green }}>
                Potentiel {REPORT.upside}
              </span>
            </div>
            <div style={{ fontSize: 9.5, color: C.muted }}>Horizon {REPORT.horizon}</div>
          </div>
        </div>

        {/* Analyst + rating strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9.5,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            AK
          </div>
          <span style={{ fontSize: 11, color: C.dim }}>{REPORT.analyst} · {REPORT.analystTitle}</span>
          <div style={{ width: 1, height: 14, background: C.border }} />
          <Star size={10} color={C.gold} fill={C.gold} />
          <span style={{ fontSize: 11, color: C.gold, fontWeight: 600 }}>{REPORT.rating}</span>
          <span style={{ fontSize: 10, color: C.muted }}>· {REPORT.ratingAgency}</span>
          <span style={{ fontSize: 10, color: C.muted }}>· Classement sectoriel: {REPORT.sectorRanking}</span>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* KPI Grid */}
        <div>
          <SectionHeader title="Indicateurs Clés FY2023" icon={<BarChart3 size={12} />} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {KPIs.map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  background: C.elevated,
                  border: `1px solid ${C.border}`,
                  borderRadius: 6,
                  padding: "7px 9px",
                }}
              >
                <div style={{ fontSize: 9.5, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 2 }}>
                  {kpi.label}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                  {kpi.value}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                  {kpi.up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                  <span style={{ fontSize: 11, fontWeight: 700, color: kpi.up ? C.green : C.red }}>
                    {kpi.change}
                  </span>
                  <span style={{ fontSize: 9.5, color: C.muted }}>{kpi.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Valorisation */}
        <div>
          <div
            onClick={() => toggle("valuation")}
            style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 6, borderBottom: `1px solid ${C.border}`, marginBottom: expandedSection === "valuation" ? 10 : 0 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Target size={12} color={C.accent} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: C.dim, letterSpacing: "0.07em", textTransform: "uppercase" }}>
                Méthodes de Valorisation
              </span>
            </div>
            {expandedSection === "valuation" ? <ChevronDown size={12} color={C.muted} /> : <ChevronRight size={12} color={C.muted} />}
          </div>
          {expandedSection === "valuation" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {VALUATION.map((v) => (
                <div
                  key={v.method}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 9px",
                    background: C.elevated,
                    border: `1px solid ${C.border}`,
                    borderRadius: 5,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: C.text }}>{v.method}</div>
                    <div style={{ fontSize: 9.5, color: C.muted }}>Pondération: {v.weight}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.gold, fontVariantNumeric: "tabular-nums" }}>
                      {v.target}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.green,
                        background: "rgba(16,200,122,0.12)",
                        border: "1px solid rgba(16,200,122,0.25)",
                        borderRadius: 3,
                        padding: "1px 5px",
                      }}
                    >
                      {v.signal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Strengths & Risks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {/* Strengths */}
          <div>
            <SectionHeader title="Atouts" icon={<CheckCircle2 size={12} />} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {STRENGTHS.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, marginTop: 4, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: C.dim, lineHeight: 1.45 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          <div>
            <SectionHeader title="Facteurs de Risque" icon={<AlertTriangle size={12} />} />
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {RISKS.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.orange, marginTop: 4, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: C.dim, lineHeight: 1.45 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Catalysts */}
        <div>
          <SectionHeader title="Catalyseurs & Événements Clés" />
          <div style={{ display: "flex", gap: 8 }}>
            {CATALYSTS.map((cat) => {
              const impactColor = cat.impact === "positive" ? C.green : cat.impact === "negative" ? C.red : C.gold;
              return (
                <div
                  key={cat.label}
                  style={{
                    flex: 1,
                    background: C.elevated,
                    border: `1px solid ${C.border}`,
                    borderLeft: `2px solid ${impactColor}`,
                    borderRadius: 5,
                    padding: "7px 9px",
                  }}
                >
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: C.text, marginBottom: 3 }}>{cat.label}</div>
                  <div style={{ fontSize: 9.5, color: impactColor, fontWeight: 600, marginBottom: 2 }}>{cat.date}</div>
                  <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.4 }}>{cat.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer: Download / Share actions */}
      <div
        style={{
          padding: "8px 14px",
          borderTop: `1px solid ${C.border}`,
          background: "var(--bt-overlay-40)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 10, color: C.muted }}>Rapport complet disponible :</span>
        {[
          { icon: <Download size={11} />, label: "Télécharger PDF", accent: true },
          { icon: <Mail size={11} />, label: "Envoyer par mail", accent: false },
          { icon: <Printer size={11} />, label: "Imprimer", accent: false },
          { icon: <Share2 size={11} />, label: "Partager", accent: false },
        ].map((btn) => (
          <button
            key={btn.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 4,
              border: `1px solid ${btn.accent ? "rgba(244,185,66,0.4)" : C.border}`,
              background: btn.accent ? "rgba(244,185,66,0.12)" : "var(--bt-overlay-40)",
              color: btn.accent ? C.gold : C.dim,
              fontSize: 11,
              fontWeight: btn.accent ? 700 : 500,
              cursor: "pointer",
            }}
          >
            {btn.icon}
            {btn.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 9.5, color: C.muted }}>
          Bloomfield Intelligence · Note d'Analyse Propriétaire · {REPORT.date}
        </span>
      </div>
    </div>
  );
}
