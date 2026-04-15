import { Lightbulb, Play, FileText, ArrowRight, Bookmark, Clock, Star } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";

const C = {
  accent: "#d6b68d", gold: "#f4b942", green: "#10c87a",
  red: "#f43860", text: "#ddeaf8", dim: "#6b96b8",
  muted: "#54678d", border: "rgba(44, 61, 127,0.32)", purple: "#a78bfa",
};

const VIDEO_IMG = "https://images.unsplash.com/photo-1691643158804-d3f02eb456a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&q=60";

export function FlashInsightsWidget() {
  return (
    <WidgetShell title="Flash Insights" subtitle="Note du jour · Vidéo · Rapport recommandé" lastUpdate="08 Avr" accentColor={C.purple}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Today's editorial note */}
        <div style={{ padding: "10px 11px", background: "rgba(0, 1, 23,0.5)", borderRadius: 6, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #d6b68d 0%, #a78bfa 100%)" }} />
          <div style={{ paddingLeft: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
              <Lightbulb size={9} color={C.accent} />
              <span style={{ fontSize: 8, fontWeight: 700, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase" }}>Note du Jour</span>
              <span style={{ marginLeft: "auto", fontSize: 7.5, color: C.muted }}>08 Avr 2026</span>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: C.text, lineHeight: 1.3, marginBottom: 5 }}>
              BCEAO pause monétaire : la confluence de signaux favorable aux obligations UEMOA
            </div>
            <p style={{ margin: "0 0 7px", fontSize: 9.5, color: C.dim, lineHeight: 1.5 }}>
              Le maintien du taux directeur à 3,5% ouvre une fenêtre tactique pour le positionnement sur la partie 5-7 ans de la courbe souveraine. Les spreads CI et SEN offrent un couple rendement/risque attractif en comparaison des pairs régionaux.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 1 }}>
                {[1,2,3,4,5].map((i) => <Star key={i} size={8} color={C.gold} fill={i <= 4 ? C.gold : "transparent"} />)}
              </div>
              <span style={{ fontSize: 8.5, color: C.muted }}>Moussa Ouédraogo · Chef Éco.</span>
              <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 8.5, color: C.muted }}>
                <Clock size={8} />9 min
              </span>
              <button style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3, padding: "3px 9px", borderRadius: 4, background: "rgba(214, 182, 141,0.1)", border: "1px solid rgba(214, 182, 141,0.25)", color: C.accent, fontSize: 8.5, fontWeight: 700, cursor: "pointer" }}>
                Lire <ArrowRight size={8} />
              </button>
            </div>
          </div>
        </div>

        {/* Video briefing */}
        <div style={{ display: "flex", gap: 9, padding: "8px 10px", background: "rgba(0, 1, 23,0.4)", borderRadius: 6, border: `1px solid ${C.border}`, cursor: "pointer" }}>
          <div style={{ position: "relative", width: 72, height: 48, borderRadius: 4, overflow: "hidden", flexShrink: 0 }}>
            <img src={VIDEO_IMG} alt="video" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(214, 182, 141,0.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Play size={10} color="#fff" fill="#fff" style={{ marginLeft: 1 }} />
              </div>
            </div>
            <div style={{ position: "absolute", bottom: 3, right: 3, padding: "1px 4px", background: "rgba(0, 1, 23,0.85)", borderRadius: 2, fontSize: 7.5, fontWeight: 700, color: C.text }}>12:34</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
              <span style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: "rgba(244,56,96,0.12)", border: "1px solid rgba(244,56,96,0.3)", color: C.red, fontWeight: 700 }}>WEB TV</span>
              <span style={{ fontSize: 7.5, color: C.muted }}>Aujourd'hui</span>
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 3 }}>Flash Marché BRVM — Session 08 Avr · Volumes & Flux</div>
            <div style={{ fontSize: 8, color: C.muted }}>Adjoua Koné · Analyste Marchés Bloomfield</div>
          </div>
          <button style={{ width: 20, height: 20, borderRadius: 3, background: "rgba(0, 1, 23,0.5)", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted, flexShrink: 0, alignSelf: "flex-start" }}>
            <Bookmark size={8} />
          </button>
        </div>

        {/* Recommended report */}
        <div style={{ display: "flex", gap: 9, padding: "8px 10px", background: "rgba(0, 1, 23,0.4)", borderRadius: 6, border: `1px solid ${C.border}`, cursor: "pointer" }}>
          <div style={{ width: 36, height: 46, borderRadius: 4, background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.2)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 2 }}>
            <FileText size={12} color={C.purple} />
            <span style={{ fontSize: 6.5, fontWeight: 800, color: C.purple }}>PDF</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
              <span style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", color: C.purple, fontWeight: 700 }}>RAPPORT</span>
              <span style={{ fontSize: 7.5, color: C.gold, fontWeight: 700 }}>PREMIUM</span>
            </div>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 3 }}>Perspectives UEMOA T2 2026 — Rapport Trimestriel</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ fontSize: 8, color: C.muted }}>Bloomfield Intelligence · 48p</span>
              <button style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3, padding: "3px 8px", borderRadius: 4, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.25)", color: C.purple, fontSize: 8, fontWeight: 700, cursor: "pointer" }}>
                Accéder
              </button>
            </div>
          </div>
        </div>
      </div>
    </WidgetShell>
  );
}
