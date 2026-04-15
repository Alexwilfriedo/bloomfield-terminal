import { useState } from "react";
import { Globe2, TrendingUp, TrendingDown, Minus, BookOpen } from "lucide-react";
import { C, TerminalHeader, DataBadge, MiniWidget, Spk, BFDScore, BFDMacroSignal, BFDZoneVigilance, BFDOpportunite } from "./BloomfieldSignature";
import { LiveTicker } from "../terminal/LiveTicker";

const COUNTRIES = [
  { id: "civ", label: "Côte d'Ivoire", flag: "🇨🇮", score: 78 },
  { id: "sen", label: "Sénégal", flag: "🇸🇳", score: 72 },
  { id: "ben", label: "Bénin", flag: "🇧🇯", score: 68 },
  { id: "tgo", label: "Togo", flag: "🇹🇬", score: 65 },
  { id: "mli", label: "Mali", flag: "🇲🇱", score: 48 },
  { id: "bkf", label: "Burkina Faso", flag: "🇧🇫", score: 38 },
  { id: "nig", label: "Niger", flag: "🇳🇪", score: 42 },
  { id: "gbis", label: "Guinée-Bissau", flag: "🇬🇼", score: 51 },
];

const KPI_DATA: Record<string, Array<{ label: string; val: string; sub: string; dir: "up" | "down" | "flat"; color: string; trend: number[] }>> = {
  civ: [
    { label: "Croissance PIB 2026P", val: "+6.8%", sub: "+0.3pp vs 2025", dir: "up", color: C.green, trend: [5.8, 6.0, 6.2, 6.4, 6.5, 6.7, 6.8] },
    { label: "Inflation IPC Avr", val: "2.4%", sub: "−0.5pp", dir: "down", color: C.green, trend: [3.5, 3.2, 2.9, 2.8, 2.6, 2.5, 2.4] },
    { label: "Solde Budgétaire / PIB", val: "−3.2%", sub: "−0.3pp (amelioration)", dir: "up", color: C.green, trend: [-4.0, -3.8, -3.6, -3.5, -3.4, -3.3, -3.2] },
    { label: "Dette Publique / PIB", val: "52.4%", sub: "+0.8pp", dir: "down", color: C.gold, trend: [49, 50, 51, 51.5, 52, 52.2, 52.4] },
    { label: "IDE Entrants (Mds XOF)", val: "1 124", sub: "+12.3% AGA", dir: "up", color: C.accent, trend: [850, 900, 950, 970, 1020, 1080, 1124] },
    { label: "Réserves Int. (mois imp.)", val: "5.1M", sub: "+0.4 mois", dir: "up", color: C.purple, trend: [4.2, 4.4, 4.6, 4.7, 4.8, 5.0, 5.1] },
  ],
};
["sen","ben","tgo","mli","bkf","nig","gbis"].forEach((c) => { KPI_DATA[c] = KPI_DATA["civ"]; });

const FINANCE_PUBLIQUE = [
  { label: "Recettes fiscales", val: "4 184 Mds", pct: "15.8% / PIB", up: true },
  { label: "Dépenses totales", val: "5 034 Mds", pct: "19.0% / PIB", up: false },
  { label: "Service de la dette", val: "1 482 Mds", pct: "28.6% recettes", up: false },
  { label: "Solde primaire", val: "−212 Mds", pct: "−0.8% / PIB", up: true },
];

const REGIONAL = [
  { c: "CIV 🇨🇮", pib: "+6.8%", inf: "2.4%", dette: "52.4%", def: "−3.2%", score: 78, scoreColor: C.green },
  { c: "SEN 🇸🇳", pib: "+7.1%", inf: "2.6%", dette: "67.8%", def: "−3.8%", score: 72, scoreColor: C.green },
  { c: "BEN 🇧🇯", pib: "+6.2%", inf: "2.1%", dette: "48.5%", def: "−2.9%", score: 68, scoreColor: C.gold },
  { c: "TGO 🇹🇬", pib: "+5.8%", inf: "3.4%", dette: "56.2%", def: "−4.1%", score: 65, scoreColor: C.gold },
  { c: "MLI 🇲🇱", pib: "+4.5%", inf: "3.8%", dette: "58.4%", def: "−5.2%", score: 48, scoreColor: C.orange },
  { c: "BKF 🇧🇫", pib: "+3.2%", inf: "4.1%", dette: "62.8%", def: "−6.1%", score: 38, scoreColor: C.red },
];

const PUBLICATIONS = [
  { tag: "RAPPORT", title: "Perspectives Économiques UEMOA T2 2026", date: "08 Avr", color: C.purple },
  { tag: "NOTE", title: "Analyse Politique Monétaire BCEAO Q1 2026", date: "05 Avr", color: C.accent },
  { tag: "BULLETIN", title: "Flash Macro Régional — Inflation et taux de change", date: "02 Avr", color: C.gold },
  { tag: "ÉTUDE", title: "Impact choc pétrolier sur finances publiques UEMOA", date: "28 Mar", color: C.orange },
];

export function S3_Macro() {
  const [activeCountry, setActiveCountry] = useState("civ");
  const cData = COUNTRIES.find((c) => c.id === activeCountry) ?? COUNTRIES[0];
  const kpis = KPI_DATA[activeCountry] ?? KPI_DATA["civ"];
  const regionData = REGIONAL.find((r) => r.c.startsWith(cData.flag)) ?? REGIONAL[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: C.dark }}>
      <TerminalHeader screenLabel="Intelligence Macro" screenIcon={<Globe2 size={13} />} screenColor={C.gold} badge="UEMOA" />
      <LiveTicker />
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* LEFT */}
        <div style={{ width: 350, flexShrink: 0, borderRight: `1px solid ${C.border}`, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9 }}>
          {/* Country selector */}
          <div style={{ padding: "10px 12px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7 }}>
            <div style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 7 }}>Focus Pays</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {COUNTRIES.map((c) => {
                const isActive = c.id === activeCountry;
                const scoreColor = c.score >= 72 ? C.green : c.score >= 55 ? C.gold : c.score >= 38 ? C.orange : C.red;
                return (
                  <button key={c.id} onClick={() => setActiveCountry(c.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 5, border: `1px solid ${isActive ? scoreColor + "50" : "rgba(44, 61, 127,0.22)"}`, background: isActive ? scoreColor + "12" : "rgba(0, 4, 48,0.5)", cursor: "pointer" }}>
                    <span style={{ fontSize: 11 }}>{c.flag}</span>
                    <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? scoreColor : C.muted }}>{c.label}</span>
                    {isActive && <span style={{ fontSize: 8, fontWeight: 800, color: scoreColor }}>{c.score}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BFD Sovereign Score */}
          <div style={{ padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7 }}>
            <BFDScore score={cData.score} label={`Score Souverain ${cData.label}`} country={`${cData.flag} ${cData.label}`} trend="up" size={68} />
            <div style={{ marginTop: 9, display: "flex", gap: 5 }}>
              {["Solidité fiscale", "Dynamique de la dette", "Croissance", "Stabilité politique"].map((d, i) => {
                const scores2 = [75, 72, 82, 60];
                const col = scores2[i] >= 70 ? C.green : scores2[i] >= 55 ? C.gold : C.red;
                return (
                  <div key={d} style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ height: 3, borderRadius: 2, background: C.border, marginBottom: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${scores2[i]}%`, background: col, borderRadius: 2 }} />
                    </div>
                    <div style={{ fontSize: 7, color: C.muted, lineHeight: 1.3 }}>{d}</div>
                    <div style={{ fontSize: 9.5, fontWeight: 700, color: col }}>{scores2[i]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key indicators */}
          <MiniWidget title={`Indicateurs Clés — ${cData.label}`} topRight={<DataBadge source="BAfD · FMI · BCEAO" time="T1 2026" />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {kpis.map((k, i) => (
                <div key={`kpi-${activeCountry}-${i}`} style={{ padding: "7px 9px", background: "rgba(0, 4, 48,0.5)", borderRadius: 5, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 8, color: C.muted, marginBottom: 1 }}>{k.label}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{k.val}</span>
                      <span style={{ fontSize: 8, color: k.color, display: "flex", alignItems: "center", gap: 1 }}>
                        {k.dir === "up" ? <TrendingUp size={7} /> : k.dir === "down" ? <TrendingDown size={7} /> : <Minus size={7} />}
                        {k.sub}
                      </span>
                    </div>
                  </div>
                  <Spk data={k.trend} color={k.color} id={`mac-${activeCountry}-${i}`} w={42} h={22} />
                </div>
              ))}
            </div>
          </MiniWidget>
        </div>

        {/* CENTER */}
        <div style={{ flex: 1, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
          {/* Finance publique */}
          <MiniWidget title={`Finances Publiques · ${cData.flag} ${cData.label} 2026P`} topRight={<DataBadge source="Ministère Finances · BAfD" time="2026P" />}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6, marginBottom: 8 }}>
              {FINANCE_PUBLIQUE.map((fp) => (
                <div key={fp.label} style={{ display: "flex", gap: 7, padding: "7px 9px", background: "rgba(0, 4, 48,0.45)", borderRadius: 5, border: `1px solid ${C.border}`, alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 8, color: C.muted, marginBottom: 2 }}>{fp.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{fp.val}</div>
                    <div style={{ fontSize: 8, color: fp.up ? C.green : C.red }}>{fp.pct}</div>
                  </div>
                  {fp.up ? <TrendingUp size={12} color={C.green} /> : <TrendingDown size={12} color={C.red} />}
                </div>
              ))}
            </div>
            {/* Debt bar */}
            <div style={{ padding: "7px 10px", background: "rgba(0, 4, 48,0.5)", borderRadius: 5, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <span style={{ fontSize: 9, color: C.dim }}>Dette / PIB</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: C.gold, marginLeft: "auto" }}>52.4%</span>
                <span style={{ fontSize: 8, color: C.muted }}>Seuil UEMOA : 70%</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: "rgba(44, 61, 127,0.25)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: "74.9%", background: `linear-gradient(90deg, ${C.green} 0%, ${C.gold} 75%, ${C.red} 100%)`, borderRadius: 4, position: "relative" }}>
                  <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 2, background: "#fff", opacity: 0.7 }} />
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                <span style={{ fontSize: 7.5, color: C.green }}>0%</span>
                <span style={{ fontSize: 7.5, color: C.gold }}>52.4% (actuel)</span>
                <span style={{ fontSize: 7.5, color: C.red }}>70% (seuil)</span>
              </div>
            </div>
          </MiniWidget>

          {/* BFD Macro Signal */}
          <BFDMacroSignal
            signal="HAUSSIER"
            zone="UEMOA – Momentum macro favorable Q2 2026"
            summary="La convergence de la désinflation, du maintien du taux BCEAO et de la consolidation budgétaire de la CIV crée un environnement macro constructif pour les actifs obligataires UEMOA."
            factors={["Inflation 2.4%", "BCEAO stable", "CIV croissance 6.8%", "Réserves solides"]}
          />

          {/* BFD Opportunity */}
          <BFDOpportunite
            title="Positionnement OAT CIV/SEN 5-7 ans — Fenêtre tactique T2 2026"
            description="Le portage offert par la courbe CIV (142bp vs BCEAO) et la trajectoire de consolidation fiscale ouvrent une opportunité d'entrée sur la partie intermédiaire."
            assets={["OAT CI 5Y", "OAT CI 7Y", "OAT SEN 5Y"]}
            potentiel="142–158bp de portage"
          />

          {/* Tableau comparatif régional */}
          <MiniWidget title="Comparaison Régionale UEMOA" topRight={<DataBadge source="FMI · BCEAO · BAfD" time="2026P" />}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr 1fr 50px", padding: "2px 4px", marginBottom: 3, borderBottom: `1px solid ${C.border}` }}>
                {["Pays", "PIB 2026", "Inflation", "Dette/PIB", "Déficit", "Score"].map((h) => (
                  <div key={h} style={{ fontSize: 7.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</div>
                ))}
              </div>
              {REGIONAL.map((r) => (
                <div key={r.c} style={{ display: "grid", gridTemplateColumns: "90px 1fr 1fr 1fr 1fr 50px", padding: "5px 4px", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, alignItems: "center", cursor: "pointer" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{r.c}</span>
                  <span style={{ fontSize: 10, color: C.green, fontVariantNumeric: "tabular-nums" }}>{r.pib}</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{r.inf}</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{r.dette}</span>
                  <span style={{ fontSize: 10, color: C.red, fontVariantNumeric: "tabular-nums" }}>{r.def}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: r.scoreColor }}>{r.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </MiniWidget>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 248, flexShrink: 0, borderLeft: `1px solid ${C.border}`, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {/* BCEAO Politique */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>Politique Monétaire BCEAO</div>
            <div style={{ padding: "8px 10px", background: "rgba(244,185,66,0.08)", border: "1px solid rgba(244,185,66,0.22)", borderRadius: 5 }}>
              <div style={{ fontSize: 8, color: C.muted, marginBottom: 3 }}>Taux directeur (08 Avr 2026)</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: C.gold }}>3.50%</span>
                <span style={{ fontSize: 9, color: C.green, fontWeight: 700 }}>INCHANGÉ</span>
              </div>
              <Spk data={[3.0, 3.0, 3.25, 3.5, 3.5, 3.5, 3.5]} color={C.gold} id="bceao-rate" w={200} h={30} />
              <div style={{ fontSize: 8, color: C.muted, marginTop: 3 }}>Prochaine réunion CMP : 30 Avr 2026</div>
            </div>
            <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
              {[["Taux d'escompte", "5.00%"], ["Taux de pension", "6.50%"], ["Inflation cible UEMOA", "<3%"]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", padding: "3px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                  <span style={{ flex: 1, fontSize: 8.5, color: C.muted }}>{l}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: C.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BFD Zone Vigilance */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <BFDZoneVigilance
              title="Mali & Burkina Faso — Fragilités cumulées"
              description="Déficits budgétaires élevés, endettement croissant et contexte sécuritaire dégradé maintiennent un profil de risque élevé."
              assets={["MLI", "BKF"]}
              level="ÉLEVÉE"
            />
          </div>

          {/* Publications */}
          <div style={{ padding: "8px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <BookOpen size={9} color={C.purple} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Publications BFD</span>
            </div>
            {PUBLICATIONS.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 7, padding: "6px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, cursor: "pointer" }}>
                <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 2, background: p.color + "14", border: `1px solid ${p.color}25`, color: p.color, fontWeight: 800, alignSelf: "flex-start", marginTop: 1 }}>{p.tag}</span>
                <div>
                  <div style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{p.title}</div>
                  <div style={{ fontSize: 7.5, color: C.muted, marginTop: 1 }}>{p.date} Avr 2026</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
