import { useState } from "react";
import { LayoutGrid, TrendingUp, TrendingDown, Star, Bell, Globe2, Landmark, Calendar, CheckCircle2, Layers, Save, Plus, Zap, FileText } from "lucide-react";
import { C, DataBadge, MiniWidget, Spk, BFDScore, BFDMacroSignal, SignalDuJour } from "./BloomfieldSignature";
import { LiveTicker } from "../terminal/LiveTicker";

/* ── shared data ─────────────────────────────────────────────────────────── */
const INDICES_W = [
  { id: "wbc", name: "BRVM Composite", val: "284.12", pct: "+0.73%", up: true, data: [281.1, 282.0, 283.2, 284.0, 284.12] },
  { id: "wb10", name: "BRVM 10", val: "437.80", pct: "+0.45%", up: true, data: [435.0, 436.0, 436.8, 437.4, 437.80] },
  { id: "wbp", name: "BRVM Prestige", val: "158.34", pct: "−0.22%", up: false, data: [159.1, 158.8, 158.6, 158.4, 158.34] },
];
const WATCHLIST_W = [
  { t: "SONATEL", p: "16 800", pct: "+5.21%", up: true, sec: "Télécom" },
  { t: "PALM CI", p: "7 295", pct: "+7.35%", up: true, sec: "Agri" },
  { t: "BOA CI", p: "6 850", pct: "+1.23%", up: true, sec: "Finance" },
  { t: "BOLLORE CI", p: "3 200", pct: "+4.92%", up: true, sec: "Transport" },
  { t: "CIE", p: "1 580", pct: "−1.95%", up: false, sec: "Énergie" },
  { t: "SAPH", p: "4 195", pct: "−3.42%", up: false, sec: "Agri" },
];
const MACRO_W = [
  { label: "PIB UEMOA 2026P", val: "+6.5%", color: C.green, trend: [5.8, 6.1, 6.3, 6.5] },
  { label: "Inflation UEMOA", val: "2.8%", color: C.green, trend: [4.1, 3.5, 3.1, 2.8] },
  { label: "Taux BCEAO", val: "3.50%", color: C.gold, trend: [3.0, 3.0, 3.5, 3.5] },
  { label: "Dette / PIB", val: "54.2%", color: C.gold, trend: [50, 52, 53.5, 54.2] },
];
const YIELDS_W = [
  { c: "CIV 🇨🇮", y7: "6.89%", y10: "7.24%", sp: "+142bp", up: true },
  { c: "SEN 🇸🇳", y7: "7.05%", y10: "7.41%", sp: "+158bp", up: true },
  { c: "MLI 🇲🇱", y7: "7.52%", y10: "7.95%", sp: "+212bp", up: true },
  { c: "BKF 🇧🇫", y7: "7.89%", y10: "8.32%", sp: "+249bp", up: false },
];
const ALERTS_W = [
  { msg: "PALM CI +7.35% — seuil dépassé", color: C.red, sev: "CRITIQUE" },
  { msg: "OAT CI 7Y → 6.89% (+2bp)", color: C.gold, sev: "AVERTISS." },
  { msg: "BFD Note : SONATEL ACHAT 19 500", color: C.accent, sev: "INFO" },
  { msg: "BCEAO 3.50% — taux inchangé", color: C.green, sev: "SUCCÈS" },
];
const EVENTS_W = [
  { d: "09", day: "Jeu", label: "Résultats SGBCI FY2025", color: C.green },
  { d: "10", day: "Ven", label: "Clôture OAT CI 7Y Tranche A", color: C.gold },
  { d: "12", day: "Lun", label: "Webinaire BFD : Obligations UEMOA", color: C.purple },
  { d: "15", day: "Jeu", label: "Dividende SONATEL · 1 800 XOF", color: C.green },
  { d: "30", day: "Ven", label: "Réunion CMP BCEAO — Taux", color: C.accent },
];
const COMPARE_DATA = [
  { label: "PIB 2026", a: "+6.8%", b: "+7.1%", winner: "b" },
  { label: "Inflation", a: "2.4%", b: "2.6%", winner: "a" },
  { label: "Déficit/PIB", a: "−3.2%", b: "−3.8%", winner: "a" },
  { label: "Dette/PIB", a: "52.4%", b: "67.8%", winner: "a" },
  { label: "OAT 7Y", a: "6.89%", b: "7.05%", winner: "a" },
  { label: "BFD Score", a: "78", b: "72", winner: "a" },
];
const WORKSPACES_LIB = [
  { id: "premium", name: "Mon Workspace Premium", icon: "⭐", color: C.purple, widgets: 8, active: true, lastUsed: "Aujourd'hui" },
  { id: "trader", name: "Trader Workspace", icon: "📈", color: C.accent, widgets: 6, active: false, lastUsed: "Hier" },
  { id: "macro", name: "Macro Intelligence", icon: "🌍", color: C.green, widgets: 7, active: false, lastUsed: "06 Avr" },
  { id: "sovereign", name: "Sovereign Risk", icon: "🏛️", color: C.gold, widgets: 5, active: false, lastUsed: "05 Avr" },
  { id: "pension", name: "Gestion Pension", icon: "📊", color: C.orange, widgets: 9, active: false, lastUsed: "01 Avr" },
  { id: "ci", name: "Focus Côte d'Ivoire", icon: "🇨🇮", color: "#f97316", widgets: 6, active: false, lastUsed: "28 Mar" },
];

function SectorBadge({ label }: { label: string }) {
  return <span style={{ fontSize: 9, padding: "1px 4px", borderRadius: 2, background: "var(--bt-border-a20)", color: C.muted, fontWeight: 600, flexShrink: 0 }}>{label}</span>;
}

export function S6_Workspace() {
  const [activeWs, setActiveWs] = useState("premium");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: C.dark }}>
      {/* Header with workspace toolbar */}
      <div style={{ flexShrink: 0 }}>
{/* Workspace toolbar */}
        <div style={{ height: 32, display: "flex", alignItems: "center", padding: "0 14px", gap: 8, background: "var(--bt-overlay-50)", borderBottom: `1px solid ${C.border}` }}>
          <Layers size={9} color={C.purple} />
          <span style={{ fontSize: 11, color: C.muted }}>8 widgets actifs</span>
          <div style={{ width: 1, height: 14, background: C.border }} />
          <span style={{ fontSize: 11, color: C.muted }}>Sauvegardé : 14h30</span>
          <div style={{ flex: 1 }} />
          <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 4, background: "var(--bt-accent-a10)", border: "1px solid var(--bt-accent-a25)", color: C.accent, fontSize: 10.5, fontWeight: 700, cursor: "pointer" }}>
            <Plus size={9} />Ajouter Widget
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 9px", borderRadius: 4, background: "var(--bt-overlay-50)", border: `1px solid ${C.border}`, color: C.dim, fontSize: 10.5, fontWeight: 600, cursor: "pointer" }}>
            <Save size={9} />Sauvegarder
          </button>
        </div>
      </div>
      <LiveTicker />

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* MAIN CANVAS */}
        <div style={{ flex: 1, overflow: "auto", padding: 10, minWidth: 0 }}>
          {/* Signal BFD row */}
          <div style={{ marginBottom: 9 }}>
            <SignalDuJour
              signal="HAUSSIER"
              title="Pause BCEAO : fenêtre tactique obligations UEMOA 5–7 ans"
              body="Taux stable 3,5% + inflation 2,8% = environnement favorable au portage. Spreads CIV attractifs vs paires. Position recommandée : surpondérer partie intermédiaire."
              assets={["OAT CI 7Y", "OAT SEN 5Y", "SONATEL ACHAT"]}
              criticite="MODÉRÉE"
              analyste="BFD Intelligence · 08 Avr"
            />
          </div>

          {/* Row 1: 3 widgets */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 9, marginBottom: 9 }}>
            {/* Market Monitor */}
            <div style={{ height: 280 }}>
              <MiniWidget title="Moniteur de Marché" accent={C.accent} topRight={<DataBadge source="BRVM" live />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, height: "100%" }}>
                  {INDICES_W.map((idx) => (
                    <div key={idx.id} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 8px", background: "var(--bt-overlay-50)", borderRadius: 4, border: `1px solid ${C.border}` }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10.5, color: C.muted }}>{idx.name}</div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 1 }}>
                          <span style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{idx.val}</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: idx.up ? C.green : C.red }}>{idx.pct}</span>
                        </div>
                      </div>
                      <Spk data={idx.data} color={idx.up ? C.green : C.red} id={`ws-${idx.id}`} w={56} h={22} />
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 4, marginTop: 2 }}>
                    {[["Hausses", "24", C.green], ["Baisses", "11", C.red], ["Volume", "1,28M", C.gold], ["Val. éch.", "4,82 Mds", C.accent]].map(([l, v, col]) => (
                      <div key={String(l)} style={{ padding: "4px 7px", background: "var(--bt-overlay-40)", borderRadius: 3, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: String(col) }}>{v}</div>
                        <div style={{ fontSize: 9.5, color: C.muted }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </MiniWidget>
            </div>

            {/* Macro Watch */}
            <div style={{ height: 280 }}>
              <MiniWidget title="Macro Watch · UEMOA" accent={C.gold} topRight={<DataBadge source="BCEAO" time="T1 2026" />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {MACRO_W.map((m, i) => (
                    <div key={`mw-${i}`} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 8px", background: "var(--bt-overlay-45)", borderRadius: 4, border: `1px solid ${C.border}` }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: C.muted }}>{m.label}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: m.color, marginTop: 1 }}>{m.val}</div>
                      </div>
                      <Spk data={m.trend} color={m.color} id={`mw-spark-${i}`} w={44} h={22} />
                    </div>
                  ))}
                  <div style={{ padding: "5px 8px", background: "rgba(244,185,66,0.06)", borderRadius: 4, border: "1px solid rgba(244,185,66,0.18)" }}>
                    <div style={{ fontSize: 10, color: C.muted }}>Prochaine réunion CMP BCEAO</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>30 Avr 2026 · Taux stable attendu</div>
                  </div>
                </div>
              </MiniWidget>
            </div>

            {/* Sovereign Debt */}
            <div style={{ height: 280 }}>
              <MiniWidget title="Obligations Souveraines" accent={C.orange} topRight={<DataBadge source="MFP · BCEAO" time="Séance" />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 55px", gap: 0, padding: "2px 2px", borderBottom: `1px solid ${C.border}`, marginBottom: 3 }}>
                    {["Pays", "7Y", "10Y", "Spread"].map((h) => (
                      <div key={h} style={{ fontSize: 9, fontWeight: 700, color: C.muted, textTransform: "uppercase" }}>{h}</div>
                    ))}
                  </div>
                  {YIELDS_W.map((y) => (
                    <div key={y.c} style={{ display: "grid", gridTemplateColumns: "70px 1fr 1fr 55px", padding: "4px 2px", borderBottom: `1px solid var(--bt-border-a12)`, alignItems: "center" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 700, color: C.text }}>{y.c}</span>
                      <span style={{ fontSize: 11, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{y.y7}</span>
                      <span style={{ fontSize: 11, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{y.y10}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 700, color: y.up ? C.red : C.green }}>{y.sp}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 6 }}>
                    <BFDScore score={78} label="Score CIV" country="🇨🇮" size={42} />
                  </div>
                </div>
              </MiniWidget>
            </div>
          </div>

          {/* Row 2: 3 widgets */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, marginBottom: 9 }}>
            {/* Watchlist */}
            <div style={{ height: 260 }}>
              <MiniWidget title="Watchlist Personnalisée" accent={C.gold} topRight={<DataBadge source="BRVM" live />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {WATCHLIST_W.map((w) => (
                    <div key={w.t} style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 0", borderBottom: `1px solid var(--bt-border-a12)` }}>
                      <Star size={8} color={C.gold} fill={C.gold} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 11.5, fontWeight: 700, color: C.text }}>{w.t}</span>
                      <SectorBadge label={w.sec} />
                      <span style={{ fontSize: 11, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{w.p}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: w.up ? C.green : C.red, minWidth: 40, textAlign: "right" }}>{w.pct}</span>
                    </div>
                  ))}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 4, marginTop: 5 }}>
                    {[["Hausses", `${WATCHLIST_W.filter((w) => w.up).length}`, C.green], ["Baisses", `${WATCHLIST_W.filter((w) => !w.up).length}`, C.red], ["Perf. moy.", "+2.3%", C.gold]].map(([l, v, col]) => (
                      <div key={String(l)} style={{ textAlign: "center", padding: "3px 4px", background: "var(--bt-overlay-40)", borderRadius: 3 }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: String(col) }}>{v}</div>
                        <div style={{ fontSize: 9.5, color: C.muted }}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </MiniWidget>
            </div>

            {/* Alerts */}
            <div style={{ height: 260 }}>
              <MiniWidget title="Alertes Actives" accent={C.red} topRight={<span style={{ fontSize: 10, padding: "0 5px", borderRadius: 8, background: C.red + "20", color: C.red, fontWeight: 800 }}>{ALERTS_W.length} actives</span>}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {ALERTS_W.map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 7, padding: "5px 8px", borderRadius: 4, background: a.color + "0c", border: `1px solid ${a.color}22` }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: a.color, boxShadow: `0 0 4px ${a.color}`, flexShrink: 0, marginTop: 4 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10.5, color: C.dim, lineHeight: 1.4 }}>{a.msg}</div>
                        <span style={{ fontSize: 9, padding: "0 4px", borderRadius: 2, background: a.color + "18", color: a.color, fontWeight: 700 }}>{a.sev}</span>
                      </div>
                    </div>
                  ))}
                  <BFDMacroSignal
                    signal="HAUSSIER"
                    zone="Contexte marché positif malgré tensions BKF"
                    summary="BRVM en hausse avec larges volumes. Vigilance sur dette MLI/BKF."
                    factors={["BRVM +0.73%", "Cacao +2.3%", "BCEAO stable"]}
                  />
                </div>
              </MiniWidget>
            </div>

            {/* Flash Insights */}
            <div style={{ height: 260 }}>
              <MiniWidget title="Flash Insights BFD" accent={C.purple} topRight={<DataBadge source="BFD Research" time="08 Avr" />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ padding: "7px 9px", background: "rgba(167,139,250,0.07)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 5 }}>
                    <div style={{ fontSize: 9.5, color: C.purple, fontWeight: 800, marginBottom: 3 }}>📝 NOTE DU JOUR · BFD</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: C.text, lineHeight: 1.3, marginBottom: 3 }}>Pause BCEAO : portage obligataire UEMOA reste attractif</div>
                    <div style={{ fontSize: 10, color: C.muted }}>M. Ouédraogo · 9 min · BFD Research</div>
                  </div>
                  <div style={{ display: "flex", gap: 7, padding: "6px 8px", background: "var(--bt-overlay-40)", borderRadius: 5, border: `1px solid ${C.border}`, cursor: "pointer" }}>
                    <div style={{ width: 52, height: 36, borderRadius: 3, background: "rgba(244,56,96,0.1)", border: "1px solid rgba(244,56,96,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: C.red + "cc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, color: "#fff" }}>▶</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9.5, color: C.red, fontWeight: 700, marginBottom: 1 }}>WEB TV · 12:34</div>
                      <div style={{ fontSize: 10.5, color: C.dim, lineHeight: 1.3 }}>Flash BRVM · Session 08 Avr</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 7, padding: "6px 8px", background: "var(--bt-overlay-40)", borderRadius: 5, border: `1px solid ${C.border}` }}>
                    <FileText size={11} color={C.purple} style={{ flexShrink: 0, marginTop: 1 }} />
                    <div>
                      <div style={{ fontSize: 9.5, color: C.gold, fontWeight: 700, marginBottom: 1 }}>RAPPORT PREMIUM</div>
                      <div style={{ fontSize: 10.5, color: C.dim, lineHeight: 1.3 }}>Perspectives UEMOA T2 2026</div>
                    </div>
                  </div>
                </div>
              </MiniWidget>
            </div>
          </div>

          {/* Row 3: Quick Compare + Events + Workspace Library */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: 9 }}>
            {/* Quick Compare */}
            <div style={{ height: 240 }}>
              <MiniWidget title="Comparaison Rapide · CIV vs SEN" accent={C.purple}>
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px", marginBottom: 4, borderBottom: `1px solid ${C.border}`, paddingBottom: 4 }}>
                    <div />
                    <div style={{ textAlign: "center", fontSize: 10.5, fontWeight: 700, color: C.accent }}>CIV 🇨🇮</div>
                    <div style={{ textAlign: "center", fontSize: 10.5, fontWeight: 700, color: C.gold }}>SEN 🇸🇳</div>
                  </div>
                  {COMPARE_DATA.map((d, i) => (
                    <div key={`cmp-${i}`} style={{ display: "grid", gridTemplateColumns: "1fr 70px 70px", padding: "3px 0", borderBottom: `1px solid var(--bt-border-a12)` }}>
                      <span style={{ fontSize: 10.5, color: C.muted }}>{d.label}</span>
                      <div style={{ textAlign: "center", background: d.winner === "a" ? "rgba(16,200,122,0.08)" : "transparent" }}>
                        <span style={{ fontSize: 11, fontWeight: d.winner === "a" ? 700 : 400, color: d.winner === "a" ? C.green : C.dim }}>{d.a}{d.winner === "a" ? " ✓" : ""}</span>
                      </div>
                      <div style={{ textAlign: "center", background: d.winner === "b" ? "rgba(16,200,122,0.08)" : "transparent" }}>
                        <span style={{ fontSize: 11, fontWeight: d.winner === "b" ? 700 : 400, color: d.winner === "b" ? C.green : C.dim }}>{d.b}{d.winner === "b" ? " ✓" : ""}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </MiniWidget>
            </div>

            {/* Events Calendar */}
            <div style={{ height: 240 }}>
              <MiniWidget title="Agenda · Avr 2026" accent={C.purple} topRight={<Calendar size={9} color={C.purple} />}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ padding: "4px 8px", background: "var(--bt-accent-a08)", borderRadius: 4, border: "1px solid var(--bt-accent-a20)", marginBottom: 2 }}>
                    <div style={{ fontSize: 9.5, color: C.accent, fontWeight: 700 }}>AUJOURD'HUI · 08 AVR</div>
                    <div style={{ fontSize: 10.5, color: C.dim, marginTop: 1 }}>Clôture séance BRVM · 15:47 GMT</div>
                  </div>
                  {EVENTS_W.map((ev) => (
                    <div key={ev.d} style={{ display: "flex", gap: 7, padding: "3px 0", borderBottom: `1px solid var(--bt-border-a12)` }}>
                      <div style={{ minWidth: 28, textAlign: "center" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: C.text, lineHeight: 1 }}>{ev.d}</div>
                        <div style={{ fontSize: 9, color: C.muted }}>{ev.day}</div>
                      </div>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: ev.color, marginTop: 4, flexShrink: 0 }} />
                      <span style={{ fontSize: 10.5, color: C.dim, lineHeight: 1.35 }}>{ev.label}</span>
                    </div>
                  ))}
                </div>
              </MiniWidget>
            </div>

            {/* Workspace Library */}
            <div style={{ height: 240 }}>
              <MiniWidget title="Bibliothèque de Workspaces" accent={C.purple} topRight={<button style={{ display: "flex", alignItems: "center", gap: 3, padding: "2px 7px", borderRadius: 3, border: "1px solid var(--bt-accent-a25)", background: "var(--bt-accent-a08)", color: C.accent, fontSize: 10, fontWeight: 700, cursor: "pointer" }}><Plus size={8} />Nouveau</button>}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
                  {WORKSPACES_LIB.map((ws) => (
                    <div key={ws.id} onClick={() => setActiveWs(ws.id)}
                      style={{ padding: "7px 8px", borderRadius: 5, background: activeWs === ws.id ? ws.color + "12" : "var(--bt-overlay-45)", border: `1px solid ${activeWs === ws.id ? ws.color + "40" : C.border}`, cursor: "pointer", position: "relative" }}>
                      {activeWs === ws.id && <CheckCircle2 size={9} color={ws.color} style={{ position: "absolute", top: 4, right: 4 }} />}
                      <div style={{ fontSize: 16, marginBottom: 4 }}>{ws.icon}</div>
                      <div style={{ fontSize: 10.5, fontWeight: activeWs === ws.id ? 700 : 500, color: activeWs === ws.id ? ws.color : C.dim, lineHeight: 1.25, marginBottom: 2 }}>{ws.name}</div>
                      <div style={{ fontSize: 9.5, color: C.muted }}>{ws.widgets} widgets</div>
                      <div style={{ fontSize: 9, color: C.muted }}>{ws.lastUsed}</div>
                    </div>
                  ))}
                </div>
              </MiniWidget>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 240, flexShrink: 0, borderLeft: `1px solid ${C.border}`, overflow: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Alertes en Temps Réel</div>
            {[
              { msg: "PALM CI +7.35% — vol. 3× moy. 30J", color: C.red },
              { msg: "OAT CI 7Y → 6.89% (+2bp)", color: C.gold },
              { msg: "Note BFD : SONATEL ACHAT", color: C.accent },
              { msg: "Résultats SGBCI demain 10h00", color: C.green },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "4px 7px", borderRadius: 3, background: a.color + "0a", marginBottom: 3 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: a.color, marginTop: 4, flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: C.dim }}>{a.msg}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Bibliothèque Widgets</div>
            {[
              { label: "Heatmap Sectorielle", icon: <LayoutGrid size={9} />, color: C.accent, added: false },
              { label: "FX & Matières Prem.", icon: <Globe2 size={9} />, color: C.green, added: false },
              { label: "Rapports Récents", icon: <FileText size={9} />, color: C.gold, added: false },
            ].map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "5px 7px", borderRadius: 4, background: "var(--bt-overlay-35)", border: `1px solid var(--bt-border-a16)`, marginBottom: 3, cursor: "pointer" }}>
                <span style={{ color: w.color }}>{w.icon}</span>
                <span style={{ flex: 1, fontSize: 11, color: C.dim }}>{w.label}</span>
                <Plus size={8} color={C.accent} />
              </div>
            ))}
          </div>
          <div style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Paramètres</div>
            {[["Actualisation auto", true], ["Disposition verrouillée", true], ["Mode compact", false], ["Infobulles", true]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "5px 0", borderBottom: `1px solid var(--bt-border-a12)` }}>
                <span style={{ flex: 1, fontSize: 11, color: C.muted }}>{String(l)}</span>
                <div style={{ width: 26, height: 13, borderRadius: 7, background: v ? C.accent : "var(--bt-border-a40)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 1.5, left: v ? 14 : 2, width: 10, height: 10, borderRadius: "50%", background: "#fff" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
