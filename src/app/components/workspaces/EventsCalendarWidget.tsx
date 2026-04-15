import { Calendar, ExternalLink, ChevronRight } from "lucide-react";
import { WidgetShell } from "../widgets/WidgetShell";

const C = {
  accent: "#d6b68d", gold: "#f4b942", green: "#10c87a",
  red: "#f43860", text: "#ddeaf8", dim: "#6b96b8",
  muted: "#54678d", border: "rgba(44, 61, 127,0.32)", purple: "#a78bfa", orange: "#fb923c",
};

interface CalEvent {
  id: number;
  date: string;
  weekday: string;
  time: string;
  title: string;
  type: string;
  typeColor: string;
  country?: string;
  importance: "high" | "medium" | "low";
  isToday?: boolean;
}

const EVENTS: CalEvent[] = [
  { id: 1, date: "08", weekday: "Mer", time: "15:47", title: "Clôture séance BRVM", type: "MARCHÉ", typeColor: C.accent, country: "BRVM", importance: "medium", isToday: true },
  { id: 2, date: "09", weekday: "Jeu", time: "10:00", title: "Résultats SGBCI FY2025 — AGO 2026", type: "RÉSULTATS", typeColor: C.green, country: "CIV 🇨🇮", importance: "high" },
  { id: 3, date: "10", weekday: "Ven", time: "—", title: "Clôture souscriptions OAT CI 7Y — Tranche 2026-A", type: "OBLIGATION", typeColor: C.gold, country: "CIV 🇨🇮", importance: "high" },
  { id: 4, date: "12", weekday: "Lun", time: "14:00", title: "Webinaire Bloomfield : Stratégie Obligataire UEMOA T2", type: "WEBINAIRE", typeColor: C.purple, importance: "medium" },
  { id: 5, date: "15", weekday: "Jeu", time: "—", title: "Versement dividende SONATEL FY2025 — 1 800 XOF/action", type: "DIVIDENDE", typeColor: C.green, country: "SEN 🇸🇳", importance: "high" },
  { id: 6, date: "17", weekday: "Sam", time: "09:00", title: "BCEAO Adjudication BAT 26 semaines — CI, SN, ML", type: "BCEAO", typeColor: C.accent, importance: "high" },
  { id: 7, date: "22", weekday: "Jeu", time: "11:00", title: "Résultats PALM CI T1 2026 — Publication officielle", type: "RÉSULTATS", typeColor: C.green, country: "CIV 🇨🇮", importance: "medium" },
  { id: 8, date: "25", weekday: "Dim", time: "—", title: "FMI : Publication World Economic Outlook — Mise à jour", type: "MACRO", typeColor: C.orange, importance: "medium" },
  { id: 9, date: "30", weekday: "Ven", time: "09:00", title: "Réunion CMP BCEAO — Décision politique monétaire Q2", type: "BCEAO", typeColor: C.accent, importance: "high" },
];

const IMPORTANCE_DOT: Record<string, string> = {
  high: C.red,
  medium: C.gold,
  low: C.muted,
};

export function EventsCalendarWidget() {
  const todayEvents = EVENTS.filter((e) => e.isToday);
  const upcomingEvents = EVENTS.filter((e) => !e.isToday);

  return (
    <WidgetShell title="Agenda & Événements" subtitle="BCEAO · Obligations · Résultats · Webinaires" lastUpdate="Avr 2026" accentColor={C.purple}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Today highlight */}
        {todayEvents.length > 0 && (
          <div>
            <div style={{ fontSize: 8, fontWeight: 700, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>Aujourd'hui · 08 Avr 2026</div>
            {todayEvents.map((ev) => (
              <div key={ev.id} style={{ display: "flex", gap: 8, padding: "6px 9px", background: "rgba(214, 182, 141,0.07)", borderRadius: 5, border: "1px solid rgba(214, 182, 141,0.2)" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 30, flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: C.accent }}>{ev.time}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{ev.title}</div>
                  <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
                    <span style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: ev.typeColor + "14", border: `1px solid ${ev.typeColor}30`, color: ev.typeColor, fontWeight: 700 }}>{ev.type}</span>
                    {ev.country && <span style={{ fontSize: 7.5, color: C.muted }}>{ev.country}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Type filter legend */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[
            { label: "BCEAO", color: C.accent },
            { label: "Résultats", color: C.green },
            { label: "Obligations", color: C.gold },
            { label: "Webinaires", color: C.purple },
            { label: "Macro", color: C.orange },
          ].map((t) => (
            <span key={t.label} style={{ padding: "1px 6px", borderRadius: 10, background: t.color + "12", border: `1px solid ${t.color}25`, fontSize: 7.5, color: t.color, fontWeight: 600, cursor: "pointer" }}>
              {t.label}
            </span>
          ))}
        </div>

        {/* Events list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {upcomingEvents.map((ev) => (
            <div key={ev.id} style={{ display: "flex", gap: 8, padding: "5px 8px", borderRadius: 4, background: "rgba(0, 4, 48,0.35)", border: `1px solid rgba(44, 61, 127,0.16)`, cursor: "pointer", alignItems: "flex-start" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(214, 182, 141,0.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "rgba(0, 4, 48,0.35)"; }}>
              {/* Date block */}
              <div style={{ minWidth: 32, flexShrink: 0, textAlign: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1 }}>{ev.date}</div>
                <div style={{ fontSize: 7, color: C.muted, lineHeight: 1 }}>{ev.weekday}</div>
              </div>
              {/* Importance dot */}
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: IMPORTANCE_DOT[ev.importance], flexShrink: 0, marginTop: 5 }} />
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9.5, fontWeight: 600, color: C.text, lineHeight: 1.35 }}>{ev.title}</div>
                <div style={{ display: "flex", gap: 5, marginTop: 2, alignItems: "center" }}>
                  <span style={{ fontSize: 7.5, padding: "1px 4px", borderRadius: 2, background: ev.typeColor + "14", color: ev.typeColor, fontWeight: 700 }}>{ev.type}</span>
                  {ev.time !== "—" && <span style={{ fontSize: 7.5, color: C.muted }}>{ev.time}</span>}
                  {ev.country && <span style={{ fontSize: 7.5, color: C.muted }}>{ev.country}</span>}
                  <ExternalLink size={8} color={C.muted} style={{ marginLeft: "auto", opacity: 0.5 }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, padding: "5px 0", borderRadius: 4, background: "rgba(0, 4, 48,0.3)", border: `1px solid ${C.border}`, color: C.dim, fontSize: 9, fontWeight: 600, cursor: "pointer" }}>
          Calendrier complet <ChevronRight size={9} />
        </button>
      </div>
    </WidgetShell>
  );
}
