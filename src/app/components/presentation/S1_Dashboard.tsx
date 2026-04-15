import { LayoutDashboard, TrendingUp, TrendingDown, Calendar, Bell, Clock } from "lucide-react";
import { C, TerminalHeader, DataBadge, SignalDuJour, MiniWidget, Spk, BFDOpportunite } from "./BloomfieldSignature";
import { LiveTicker } from "../terminal/LiveTicker";

const INDICES = [
  { id: "bci", name: "BRVM Composite", val: "284.12", pct: "+0.73%", chg: "+2.06", up: true, data: [281.1, 282.0, 281.8, 283.0, 283.5, 284.0, 284.12] },
  { id: "b10", name: "BRVM 10", val: "437.80", pct: "+0.45%", chg: "+1.96", up: true, data: [435.0, 435.8, 436.2, 436.8, 437.2, 437.6, 437.80] },
  { id: "bpr", name: "BRVM Prestige", val: "158.34", pct: "−0.22%", chg: "−0.35", up: false, data: [159.1, 158.8, 158.6, 158.7, 158.5, 158.4, 158.34] },
];
const MOVERS = [
  { t: "PALM CI", p: "7 295", pct: "+7.35%", up: true, vol: "148K" },
  { t: "SONATEL", p: "16 800", pct: "+5.21%", up: true, vol: "62K" },
  { t: "BOLLORE CI", p: "3 200", pct: "+4.92%", up: true, vol: "205K" },
  { t: "CIE", p: "1 580", pct: "−1.95%", up: false, vol: "31K" },
  { t: "SAPH", p: "4 195", pct: "−3.42%", up: false, vol: "77K" },
];
const MACRO_KPI = [
  { label: "Taux BCEAO", val: "3.50%", sub: "Inchangé", color: C.gold },
  { label: "Inflation UEMOA", val: "2.8%", sub: "−0.3pp", color: C.green },
  { label: "PIB UEMOA 2026P", val: "+6.5%", sub: "+0.4pp", color: C.green },
  { label: "Dette / PIB", val: "54.2%", sub: "+1.1pp", color: C.gold },
];
const YIELDS = [
  { c: "CIV 🇨🇮", y5: "6.12", y7: "6.89", y10: "7.24", sp: "+142bp", up: true },
  { c: "SEN 🇸🇳", y5: "6.28", y7: "7.05", y10: "7.41", sp: "+158bp", up: true },
  { c: "MLI 🇲🇱", y5: "6.90", y7: "7.52", y10: "7.95", sp: "+212bp", up: true },
  { c: "BKF 🇧🇫", y5: "7.24", y7: "7.89", y10: "8.32", sp: "+249bp", up: false },
];
const FX = [
  { p: "XOF/USD", v: "596.42", pct: "+0.12%", up: true },
  { p: "XOF/EUR", v: "655.96", pct: "0.00%", up: true },
  { p: "XOF/GBP", v: "753.14", pct: "+0.08%", up: true },
];
const COMMO = [
  { name: "Cacao ICE", val: "8 245", pct: "+2.34%", up: true, unit: "USD/t" },
  { name: "Café Robusta", val: "3 842", pct: "−0.45%", up: false, unit: "USD/t" },
  { name: "Pétrole WTI", val: "71.84", pct: "+1.12%", up: true, unit: "USD/b" },
  { name: "Or COMEX", val: "2 347", pct: "+0.89%", up: true, unit: "USD/oz" },
];
const ALERTS = [
  { sev: "critique", msg: "PALM CI +7.35% — seuil dépassé", t: "14:32", color: C.red },
  { sev: "warning", msg: "OAT CI 7Y → 6.89% (+2bp)", t: "13:58", color: C.gold },
  { sev: "info", msg: "BFD Research : SONATEL ACHAT · 19 500", t: "13:45", color: C.accent },
  { sev: "info", msg: "BCEAO taux maintenu 3.50%", t: "12:30", color: C.green },
];
const EVENTS = [
  { d: "09", day: "Jeu", label: "Résultats SGBCI FY2025 — 10h00", color: C.green },
  { d: "10", day: "Ven", label: "Clôture OAT CI 7Y Tranche 2026-A", color: C.gold },
  { d: "12", day: "Lun", label: "Webinaire BFD : Obligations UEMOA", color: C.purple },
  { d: "15", day: "Jeu", label: "Dividende SONATEL · 1 800 XOF/action", color: C.green },
  { d: "30", day: "Ven", label: "Réunion CMP BCEAO — Décision taux", color: C.accent },
];

function SeverityDot({ color }: { color: string }) {
  return <div style={{ width: 5, height: 5, borderRadius: "50%", background: color, boxShadow: `0 0 4px ${color}`, flexShrink: 0 }} />;
}

export function S1_Dashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: C.dark }}>
      <TerminalHeader screenLabel="Tableau de Bord" screenIcon={<LayoutDashboard size={13} />} />
      <LiveTicker />

      {/* Main 3-column layout */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
        <div style={{ width: 350, flexShrink: 0, borderRight: `1px solid ${C.border}`, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9 }}>
          {/* Signal du Jour */}
          <SignalDuJour
            signal="HAUSSIER"
            title="Pause BCEAO : fenêtre tactique sur la courbe CIV 5–7 ans"
            body="Le maintien du taux directeur à 3,5% et la décélération de l'inflation sous 3% créent des conditions favorables pour un positionnement obligataire en zone UEMOA."
            assets={["OAT CI 5Y", "OAT CI 7Y", "SEN 5Y"]}
            criticite="MODÉRÉE"
            analyste="M. Ouédraogo · BFD"
          />

          {/* BRVM Indices */}
          <MiniWidget title="Indices BRVM" topRight={<DataBadge source="BRVM" time="15:47 GMT" live />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {INDICES.map((idx) => (
                <div key={idx.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 9px", background: "rgba(0, 4, 48,0.5)", borderRadius: 5, border: `1px solid ${C.border}` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 9, color: C.dim }}>{idx.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 1 }}>
                      <span style={{ fontSize: 15, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{idx.val}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: idx.up ? C.green : C.red }}>{idx.pct}</span>
                    </div>
                  </div>
                  <Spk data={idx.data} color={idx.up ? C.green : C.red} id={idx.id} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4, marginTop: 2 }}>
                {[["Cap. Boursière", "7 843 Mds"], ["Volume", "1,28M titres"], ["Val. éch.", "4,82 Mds XOF"]].map(([l, v]) => (
                  <div key={l} style={{ textAlign: "center", padding: "4px 6px", background: "rgba(0, 4, 48,0.5)", borderRadius: 4, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.gold }}>{v}</div>
                    <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </MiniWidget>

          {/* Top Mouvements */}
          <MiniWidget title="Principaux Mouvements" topRight={<DataBadge source="BRVM" live />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {MOVERS.map((m) => (
                <div key={m.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 6px", borderRadius: 4, cursor: "pointer", background: "rgba(0, 4, 48,0.3)" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 3, background: m.up ? "rgba(16,200,122,0.15)" : "rgba(244,56,96,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {m.up ? <TrendingUp size={8} color={C.green} /> : <TrendingDown size={8} color={C.red} />}
                  </div>
                  <span style={{ flex: 1, fontSize: 10, fontWeight: 700, color: C.text }}>{m.t}</span>
                  <span style={{ fontSize: 9, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{m.p} XOF</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: m.up ? C.green : C.red, minWidth: 46, textAlign: "right" }}>{m.pct}</span>
                  <span style={{ fontSize: 7.5, color: C.muted, minWidth: 28, textAlign: "right" }}>{m.vol}</span>
                </div>
              ))}
            </div>
          </MiniWidget>
        </div>

        {/* ── CENTER COLUMN ───────────────────────────────────────────── */}
        <div style={{ flex: 1, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
          {/* Macro Snapshot */}
          <MiniWidget title="Instantané Macro · UEMOA" topRight={<DataBadge source="BCEAO · FMI" time="T1 2026" />}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
              {MACRO_KPI.map((kpi) => (
                <div key={kpi.label} style={{ padding: "8px 10px", background: "rgba(0, 4, 48,0.5)", borderRadius: 5, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 8.5, color: C.muted, marginBottom: 3 }}>{kpi.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: kpi.color, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{kpi.val}</div>
                  <div style={{ fontSize: 8, color: kpi.color, marginTop: 2, opacity: 0.8 }}>{kpi.sub}</div>
                </div>
              ))}
            </div>
          </MiniWidget>

          {/* Sovereign Yields */}
          <MiniWidget title="Rendements Souverains UEMOA" topRight={<DataBadge source="BCEAO · MFP" time="Séance" />}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr 60px", gap: 0, padding: "2px 4px", marginBottom: 3, borderBottom: `1px solid ${C.border}` }}>
                {["Pays", "5 ans", "7 ans", "10 ans", "Spread"].map((h) => (
                  <div key={h} style={{ fontSize: 7.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
                ))}
              </div>
              {YIELDS.map((y) => (
                <div key={y.c} style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr 1fr 60px", gap: 0, padding: "5px 4px", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, alignItems: "center", cursor: "pointer" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{y.c}</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{y.y5}%</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{y.y7}%</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{y.y10}%</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: y.up ? C.red : C.green }}>{y.sp}</span>
                </div>
              ))}
            </div>
          </MiniWidget>

          {/* FX & Commodités */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <MiniWidget title="Taux de Change" topRight={<DataBadge source="BCT · BCEAO" live />}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {FX.map((f) => (
                  <div key={f.p} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", background: "rgba(0, 4, 48,0.4)", borderRadius: 4 }}>
                    <span style={{ flex: 1, fontSize: 9.5, color: C.dim }}>{f.p}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{f.v}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: f.up ? C.green : C.red }}>{f.pct}</span>
                  </div>
                ))}
              </div>
            </MiniWidget>

            <MiniWidget title="Matières Premières" topRight={<DataBadge source="ICE · COMEX" live />}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {COMMO.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 8px", background: "rgba(0, 4, 48,0.4)", borderRadius: 4 }}>
                    <span style={{ flex: 1, fontSize: 9, color: C.dim }}>{c.name}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{c.val}</span>
                    <span style={{ fontSize: 9, fontWeight: 600, color: c.up ? C.green : C.red }}>{c.pct}</span>
                  </div>
                ))}
              </div>
            </MiniWidget>
          </div>

          {/* Opportunité BFD */}
          <BFDOpportunite
            title="OAT CI 7Y — Portage attractif vs. pair UEMOA"
            description="Rendement 6.89% pour un émetteur noté B+, spread de +142bp vs BCEAO. Contexte macroéconomique CIV favorable : croissance 6.8%, inflation 2.4%."
            assets={["OAT CI 7Y 2031", "OAT CI 5Y 2029"]}
            potentiel="142bp de portage"
          />
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
        <div style={{ width: 248, flexShrink: 0, borderLeft: `1px solid ${C.border}`, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {/* Alertes */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <Bell size={9} color={C.red} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Alertes Actives</span>
              <span style={{ marginLeft: "auto", fontSize: 8, padding: "0 5px", borderRadius: 8, background: C.red + "20", color: C.red, fontWeight: 800 }}>{ALERTS.length}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {ALERTS.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 7, padding: "5px 8px", borderRadius: 4, background: a.color + "0c", border: `1px solid ${a.color}22` }}>
                  <SeverityDot color={a.color} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{a.msg}</div>
                    <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1, display: "flex", alignItems: "center", gap: 3 }}>
                      <Clock size={7} />{a.t}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <Calendar size={9} color={C.purple} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Prochains Événements</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {EVENTS.map((ev) => (
                <div key={ev.d} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                  <div style={{ textAlign: "center", minWidth: 28, flexShrink: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.text, lineHeight: 1 }}>{ev.d}</div>
                    <div style={{ fontSize: 7, color: C.muted }}>{ev.day}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: ev.color, marginBottom: 2 }} />
                    <span style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.35 }}>{ev.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flash Insights */}
          <div style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Flash Insights BFD</div>
            {[
              { tag: "ANALYSE", title: "Stratégie Obligataire UEMOA T2 2026", src: "Bloomfield Research", color: C.purple },
              { tag: "NOTE", title: "PALM CI — Révision à la hausse suite à rapport de cacao +18%", src: "BFD Equity", color: C.gold },
              { tag: "VIDÉO", title: "Flash Marché BRVM · Session 08 Avr", src: "BFD Web TV", color: C.red },
            ].map((ins, i) => (
              <div key={i} style={{ display: "flex", gap: 7, padding: "6px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, cursor: "pointer" }}>
                <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 2, background: ins.color + "14", border: `1px solid ${ins.color}28`, color: ins.color, fontWeight: 800, alignSelf: "flex-start", marginTop: 1 }}>{ins.tag}</span>
                <div>
                  <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{ins.title}</div>
                  <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{ins.src}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
