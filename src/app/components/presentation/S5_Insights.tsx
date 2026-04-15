import { Lightbulb, Play, FileText, Star, BookOpen, Zap, Bell, Clock, ArrowRight } from "lucide-react";
import { C, TerminalHeader, DataBadge, MiniWidget, BFDImpactBlock, BFDOpportunite } from "./BloomfieldSignature";
import { LiveTicker } from "../terminal/LiveTicker";

const FEATURED = {
  tag: "ANALYSE EXCLUSIVE",
  title: "BCEAO pause monétaire : la convergence de signaux favorable aux obligations UEMOA",
  summary: "Le maintien du taux directeur à 3,5% et la décélération de l'inflation créent un environnement de portage attractif. Les spreads CIV et SEN offrent un rapport risque/rendement supérieur aux paires régionales. Nous recommandons un surpondération tactique de la partie 5–7 ans de la courbe.",
  author: "Moussa Ouédraogo, Chef Économiste",
  date: "08 Avr 2026",
  readTime: "9 min",
  score: 98,
  color: C.accent,
};

const FLASH_NEWS = [
  { id: 1, time: "15:42", tag: "BRVM", text: "PALM CI clôture en hausse de +7.35% — volume record de la séance", urgent: true, color: C.green },
  { id: 2, time: "14:58", tag: "BCEAO", text: "Taux directeur maintenu à 3.50% — communiqué CMP publié", urgent: false, color: C.gold },
  { id: 3, time: "14:23", tag: "MACRO", text: "FMI révise à la hausse la croissance du Sénégal : +7.1% pour 2026", urgent: false, color: C.purple },
  { id: 4, time: "13:48", tag: "DETTE", text: "CIV annonce émission OAT 7Y tranche 2026-A : 150 Mds XOF", urgent: false, color: C.gold },
  { id: 5, time: "12:35", tag: "ENTREPRISE", text: "SGBCI confirme publication résultats FY2025 pour le 09 Avr 2026", urgent: false, color: C.accent },
  { id: 6, time: "11:50", tag: "CACAO", text: "Cacao ICE dépasse 8 200 USD/t — impact positif sur recettes CIV", urgent: false, color: C.orange },
  { id: 7, time: "10:22", tag: "NOTATION", text: "BFD relève la perspective de notation de la Côte d'Ivoire à STABLE+", urgent: false, color: C.green },
];

const ANALYST_NOTES = [
  {
    id: 1, type: "EQUITY", company: "SONATEL", rating: "ACHAT", target: "19 500 XOF", current: "16 800 XOF",
    title: "Révision à la hausse — expansion data mobile +24% et solidité opérationnelle",
    analyst: "M. Ouédraogo · BFD Equity", date: "08 Avr", impact: [
      { label: "SONATEL", type: "Titre" as const, impact: "+" as const },
      { label: "MTN CI", type: "Titre" as const, impact: "+" as const },
      { label: "SEN 🇸🇳", type: "Pays" as const, impact: "+" as const },
      { label: "Télécoms", type: "Secteur" as const, impact: "+" as const },
    ],
    color: C.green,
  },
  {
    id: 2, type: "SOUVERAIN", company: "OAT CIV 7Y", rating: null, target: null, current: null,
    title: "Opportunité de portage — analyse de la courbe souveraine UEMOA post-CMP BCEAO",
    analyst: "K. Diallo · BFD Fixed Income", date: "08 Avr", impact: [
      { label: "OAT CI 7Y", type: "Titre" as const, impact: "+" as const },
      { label: "OAT SEN 5Y", type: "Titre" as const, impact: "+" as const },
      { label: "CIV 🇨🇮", type: "Pays" as const, impact: "+" as const },
      { label: "Finance", type: "Secteur" as const, impact: "+" as const },
    ],
    color: C.gold,
  },
];

const AI_RECS = [
  { score: 98, tag: "ANALYSE", title: "Stratégie Obligataire UEMOA T2 2026", reason: "Basé sur votre profil Macro + Obligations", color: C.accent },
  { score: 94, tag: "NOTE", title: "PALM CI — Impact cacao sur valorisation", reason: "Lié à votre watchlist · Suivi PALM CI actif", color: C.gold },
  { score: 91, tag: "VIDÉO", title: "Flash Marché BRVM · Session 08 Avr", reason: "Votre agenda · BRVM actif aujourd'hui", color: C.red },
  { score: 87, tag: "RAPPORT", title: "Perspectives PIB UEMOA — Révision FMI 2026", reason: "Correspondance : intérêt Macro UEMOA", color: C.purple },
];

const SAVED = [
  { tag: "PDF", title: "Rapport Semestriel BRVM H2 2025", saved: "02 Avr", color: C.accent },
  { tag: "NOTE", title: "Note SGBCI — FY2025 pre-publication", saved: "05 Avr", color: C.green },
  { tag: "VIDÉO", title: "Webinaire BFD : Sovereign Risk UEMOA", saved: "06 Avr", color: C.orange },
];

export function S5_Insights() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: C.dark }}>
      <TerminalHeader screenLabel="Insights & Éducation" screenIcon={<Lightbulb size={13} />} screenColor={C.purple} badge="ÉDITORIAL" />
      <LiveTicker />
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* LEFT */}
        <div style={{ width: 360, flexShrink: 0, borderRight: `1px solid ${C.border}`, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9 }}>
          {/* Featured analysis */}
          <div style={{ padding: "14px 14px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.accent}`, borderRadius: 7, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: "radial-gradient(circle, rgba(214, 182, 141,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
              <span style={{ fontSize: 7.5, padding: "2px 7px", borderRadius: 2, background: C.accent + "18", border: `1px solid ${C.accent}35`, color: C.accent, fontWeight: 800, letterSpacing: "0.06em" }}>{FEATURED.tag}</span>
              <span style={{ marginLeft: "auto", fontSize: 9, padding: "1px 6px", borderRadius: 8, background: C.accent + "14", color: C.accent, fontWeight: 700 }}>BFD Score {FEATURED.score}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, lineHeight: 1.35, marginBottom: 8 }}>{FEATURED.title}</div>
            <p style={{ margin: "0 0 10px", fontSize: 9.5, color: C.dim, lineHeight: 1.6 }}>{FEATURED.summary}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 1 }}>{[1,2,3,4,5].map((i) => <span key={i} style={{ fontSize: 10, color: i <= 5 ? C.gold : C.muted }}>★</span>)}</div>
              <span style={{ fontSize: 8.5, color: C.muted }}>{FEATURED.author}</span>
              <span style={{ fontSize: 8.5, color: C.muted, display: "flex", alignItems: "center", gap: 2 }}><Clock size={8} />{FEATURED.readTime}</span>
              <button style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 4, background: C.accent + "14", border: `1px solid ${C.accent}30`, color: C.accent, fontSize: 8.5, fontWeight: 700, cursor: "pointer" }}>
                Lire <ArrowRight size={8} />
              </button>
            </div>
          </div>

          {/* Flash News */}
          <MiniWidget title="Fil Flash · BFD News" accent={C.red} topRight={<DataBadge source="BFD Newsroom" live />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {FLASH_NEWS.map((n) => (
                <div key={n.id} style={{ display: "flex", gap: 6, padding: "5px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, cursor: "pointer", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 7.5, fontWeight: 700, color: C.muted, minWidth: 36, flexShrink: 0, marginTop: 1 }}>{n.time}</span>
                  <span style={{ fontSize: 7.5, padding: "1px 4px", borderRadius: 2, background: n.color + "14", color: n.color, fontWeight: 700, flexShrink: 0, alignSelf: "flex-start" }}>{n.tag}</span>
                  <span style={{ fontSize: 8.5, color: n.urgent ? C.text : C.dim, lineHeight: 1.4, fontWeight: n.urgent ? 600 : 400 }}>{n.text}</span>
                </div>
              ))}
            </div>
          </MiniWidget>

          {/* Video section */}
          <MiniWidget title="BFD Web TV · Dernières Diffusions" accent={C.red}>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 80, height: 52, borderRadius: 5, background: "rgba(214, 182, 141,0.1)", border: `1px solid ${C.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative", overflow: "hidden" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: C.red + "cc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Play size={10} color="#fff" fill="#fff" style={{ marginLeft: 1 }} />
                </div>
                <div style={{ position: "absolute", bottom: 3, right: 3, fontSize: 7.5, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.7)", borderRadius: 2, padding: "0 3px" }}>12:34</div>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 7.5, color: C.red, fontWeight: 700 }}>WEB TV · EN DIRECT</span>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text, lineHeight: 1.3, marginTop: 2 }}>Flash Marché BRVM — Session 08 Avr · Volumes & Flux institutionnels</div>
                <div style={{ fontSize: 8, color: C.muted, marginTop: 3 }}>Adjoua Koné · Analyste Marchés BFD</div>
              </div>
            </div>
          </MiniWidget>
        </div>

        {/* CENTER */}
        <div style={{ flex: 1, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
          {/* Analyst notes with impact */}
          {ANALYST_NOTES.map((note) => (
            <div key={note.id} style={{ padding: "11px 13px", background: C.surface, border: `1px solid ${C.border}`, borderLeft: `3px solid ${note.color}`, borderRadius: 7 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
                <span style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: note.color + "18", border: `1px solid ${note.color}30`, color: note.color, fontWeight: 800 }}>{note.type}</span>
                {note.rating && (
                  <span style={{ fontSize: 8, padding: "2px 8px", borderRadius: 3, background: C.green, color: "#fff", fontWeight: 800 }}>{note.rating}</span>
                )}
                {note.target && <span style={{ fontSize: 9, color: C.text }}>Cible : <strong style={{ color: C.green }}>{note.target}</strong></span>}
                <span style={{ marginLeft: "auto", fontSize: 8, color: C.muted }}>{note.date} Avr 2026</span>
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 6 }}>{note.title}</div>
              <div style={{ fontSize: 8, color: C.muted, marginBottom: 8 }}>{note.analyst}</div>

              {/* Impact block */}
              <BFDImpactBlock
                items={note.impact}
                criticite="MODÉRÉE"
                impactType={`Impact anticipé sur les actifs liés · ${note.company}`}
              />
            </div>
          ))}

          {/* BFD Opportunity */}
          <BFDOpportunite
            title="Cacao CI — Récolte intermédiaire 2026 : impact positif attendu sur PALM CI"
            description="Les volumes d'exportation de cacao CI dépassent les estimations de +18% en ce T1 2026. Impact direct sur les revenues de PALM CI et les recettes fiscales de l'État."
            assets={["PALM CI", "AGRI BRVM", "CIV Recettes Fiscales"]}
            potentiel="+12–15% de upside estimé"
          />
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 248, flexShrink: 0, borderLeft: `1px solid ${C.border}`, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {/* BFD IA Recommendations */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <Zap size={9} color={C.accent} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>BFD Intelligence · Recommandations</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {AI_RECS.map((r) => (
                <div key={r.title} style={{ display: "flex", gap: 7, padding: "6px 8px", borderRadius: 4, background: "rgba(0, 4, 48,0.4)", border: `1px solid rgba(44, 61, 127,0.18)`, cursor: "pointer" }}>
                  <div style={{ minWidth: 26, height: 20, borderRadius: 3, background: r.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: r.color }}>{r.score}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 2 }}>
                      <span style={{ fontSize: 7, padding: "0 4px", borderRadius: 2, background: r.color + "14", color: r.color, fontWeight: 700 }}>{r.tag}</span>
                    </div>
                    <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.35 }}>{r.title}</div>
                    <div style={{ fontSize: 7.5, color: C.muted, marginTop: 2 }}>{r.reason}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Saved content */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <BookOpen size={9} color={C.gold} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Contenu Sauvegardé</span>
            </div>
            {SAVED.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 7, padding: "5px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, cursor: "pointer" }}>
                <span style={{ fontSize: 7.5, padding: "1px 4px", borderRadius: 2, background: s.color + "14", border: `1px solid ${s.color}25`, color: s.color, fontWeight: 800, alignSelf: "flex-start", marginTop: 1 }}>{s.tag}</span>
                <div>
                  <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.35 }}>{s.title}</div>
                  <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>Sauvegardé le {s.saved} Avr</div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Alerts */}
          <div style={{ padding: "8px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <Bell size={9} color={C.red} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Alertes Publications</span>
            </div>
            {[
              { msg: "Nouveau rapport BFD : PALM CI", time: "14:00", color: C.green },
              { msg: "Note Flash : BCEAO décision taux", time: "12:30", color: C.gold },
              { msg: "Vidéo disponible : Flash BRVM 08 Avr", time: "15:50", color: C.accent },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "4px 7px", borderRadius: 3, background: a.color + "08", border: `1px solid ${a.color}18`, marginBottom: 4, cursor: "pointer" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: a.color, marginTop: 4, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 8.5, color: C.dim }}>{a.msg}</div>
                  <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1, display: "flex", gap: 2, alignItems: "center" }}>
                    <Clock size={7} />{a.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
