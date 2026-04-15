import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, FileText, ChevronDown } from "lucide-react";
import { C, TerminalHeader, DataBadge, MiniWidget, Spk, BFDRating, BFDZoneVigilance } from "./BloomfieldSignature";
import { LiveTicker } from "../terminal/LiveTicker";

const COMPANIES = [
  { id: "sonatel", name: "SONATEL", sector: "Télécommunications", country: "SEN 🇸🇳", price: "16 800", pct: "+5.21%", up: true, cap: "2 842 Mds", rating: "ACHAT" as const },
  { id: "palm", name: "PALM CI", sector: "Agriculture", country: "CIV 🇨🇮", price: "7 295", pct: "+7.35%", up: true, cap: "824 Mds", rating: "ACHAT" as const },
  { id: "sgbci", name: "SGBCI", sector: "Banques", country: "CIV 🇨🇮", price: "11 200", pct: "+0.45%", up: true, cap: "1 120 Mds", rating: "CONSERVER" as const },
  { id: "boaci", name: "BOA CI", sector: "Banques", country: "CIV 🇨🇮", price: "6 850", pct: "+1.23%", up: true, cap: "685 Mds", rating: "ACHAT" as const },
];

const KPI = [
  { label: "Chiffre d'Affaires", val: "1 384 Mds", sub: "+8.4% AGA", color: C.green },
  { label: "EBITDA", val: "529 Mds", sub: "Marge 38.2%", color: C.accent },
  { label: "Résultat Net", val: "248 Mds", sub: "+11.2% AGA", color: C.green },
  { label: "P/E Ratio", val: "14.7×", sub: "vs sect. 12.4×", color: C.gold },
  { label: "Dividende", val: "1 800 XOF", sub: "Yield 10.7%", color: C.gold },
  { label: "ROE", val: "24.1%", sub: "+2.3pp AGA", color: C.green },
];

const REVENUE_YEARS = [
  { y: "2021", ca: 1080, ebitda: 392, net: 189 },
  { y: "2022", ca: 1150, ebitda: 420, net: 210 },
  { y: "2023", ca: 1230, ebitda: 464, net: 225 },
  { y: "2024", ca: 1278, ebitda: 488, net: 223 },
  { y: "2025", ca: 1384, ebitda: 529, net: 248 },
  { y: "2026P", ca: 1490, ebitda: 572, net: 272 },
];

const RATIOS_VS_SECTOR = [
  { label: "P/E", company: 14.7, sector: 12.4, unit: "×" },
  { label: "P/B", company: 3.2, sector: 2.8, unit: "×" },
  { label: "ROE", company: 24.1, sector: 18.4, unit: "%" },
  { label: "Marge EBITDA", company: 38.2, sector: 28.6, unit: "%" },
  { label: "Div. Yield", company: 10.7, sector: 7.2, unit: "%" },
  { label: "Dette/EBITDA", company: 1.8, sector: 2.4, unit: "×" },
];

const RISK_SIGNALS = [
  { label: "Risque réglementaire", level: "MODÉRÉ", detail: "Révision cadre télécoms UEMOA 2026 en cours", color: C.gold },
  { label: "Risque de marché", level: "FAIBLE", detail: "Position dominante protège les marges", color: C.green },
  { label: "Risque pays (SEN)", level: "MODÉRÉ", detail: "Transition politique 2024 — stabilité confirmée", color: C.gold },
  { label: "Risque de liquidité", level: "FAIBLE", detail: "Trésorerie nette positive 142 Mds XOF", color: C.green },
];

const ANALYST_NOTE = "SONATEL demeure la première capitalisation de la BRVM et le titre de référence de l'espace télécom africain francophone. La forte progression du data mobile (+24% AGA) et l'expansion en RDC compensent la pression tarifaire en zone UEMOA. Nous relevons notre objectif de cours à 19 500 XOF, avec une recommandation ACHAT maintenue.";

const SECTOR_BENCHMARK = [
  { company: "SONATEL", country: "SEN", marge: "38.2%", roe: "24.1%", pe: "14.7×", rating: "ACHAT", ratingColor: C.green },
  { company: "MTN CI", country: "CIV", marge: "31.4%", roe: "19.8%", pe: "12.1×", rating: "CONSERVER", ratingColor: C.gold },
  { company: "ORANGE SN", country: "SEN", marge: "28.6%", roe: "17.2%", pe: "10.8×", rating: "CONSERVER", ratingColor: C.gold },
  { company: "MOOV Africa", country: "UEMOA", marge: "22.1%", roe: "14.5%", pe: "9.2×", rating: "CONSERVER", ratingColor: C.gold },
];

function BarChartSimple() {
  const maxCA = Math.max(...REVENUE_YEARS.map((r) => r.ca));
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80, padding: "0 4px" }}>
      {REVENUE_YEARS.map((r) => (
        <div key={r.y} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <div style={{ width: "100%", height: Math.round((r.net / maxCA) * 60), background: C.accent + "40", borderRadius: "2px 2px 0 0" }} />
            <div style={{ width: "100%", marginTop: -Math.round((r.net / maxCA) * 60), height: Math.round((r.ebitda / maxCA) * 60), background: C.gold + "50", borderRadius: "2px 2px 0 0" }} />
            <div style={{ width: "100%", marginTop: -Math.round((r.ebitda / maxCA) * 60), height: Math.round((r.ca / maxCA) * 60), background: C.accent + "22", borderRadius: "2px 2px 0 0", border: `1px solid ${C.accent}40` }} />
          </div>
          <span style={{ fontSize: 8, color: r.y === "2026P" ? C.gold : C.muted, fontWeight: r.y === "2026P" ? 700 : 400 }}>{r.y}</span>
        </div>
      ))}
    </div>
  );
}

export function S4_Analysis() {
  const [activeCompany, setActiveCompany] = useState("sonatel");
  const company = COMPANIES.find((c) => c.id === activeCompany) ?? COMPANIES[0];
  const rColor = company.rating === "ACHAT" ? C.green : company.rating === "VENDRE" ? C.red : C.gold;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: C.dark }}>
      <TerminalHeader screenLabel="Analyse Financière & Risque" screenIcon={<BarChart3 size={13} />} screenColor={C.purple} badge="BRVM" />
      <LiveTicker />
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* LEFT */}
        <div style={{ width: 350, flexShrink: 0, borderRight: `1px solid ${C.border}`, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9 }}>
          {/* Company selector */}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {COMPANIES.map((c) => {
              const isActive = c.id === activeCompany;
              const rc = c.rating === "ACHAT" ? C.green : c.rating === "VENDRE" ? C.red : C.gold;
              return (
                <button key={c.id} onClick={() => setActiveCompany(c.id)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 9px", borderRadius: 5, border: `1px solid ${isActive ? rc + "50" : "rgba(44, 61, 127,0.22)"}`, background: isActive ? rc + "12" : "rgba(0, 1, 23,0.5)", cursor: "pointer" }}>
                  <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? rc : C.muted }}>{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Company snapshot */}
          <div style={{ padding: "12px 14px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: rColor + "18", border: `1px solid ${rColor}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: rColor, flexShrink: 0 }}>{company.name.slice(0, 2)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{company.name}</div>
                <div style={{ fontSize: 9, color: C.dim }}>{company.sector} · {company.country}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{company.price} XOF</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: company.up ? C.green : C.red }}>{company.pct}</span>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 7.5, color: C.muted }}>Cap. Boursière</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>{company.cap} XOF</div>
              </div>
            </div>
            <Spk data={[15200, 15600, 15900, 15800, 16200, 16500, 16800]} color={C.green} id="sonatel-price" w={300} h={38} />
            <DataBadge source="BRVM · 15:47 GMT" live />
          </div>

          {/* BFD Analyst Rating */}
          <BFDRating rating="ACHAT" target="19 500" current="16 800" horizon="12 mois" analyst="M. Ouédraogo · BFD Equity Research" confidence={82} />

          {/* KPI Grid */}
          <MiniWidget title="Indicateurs Financiers Clés" topRight={<DataBadge source="Rapport Annuel 2025" />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {KPI.map((k) => (
                <div key={k.label} style={{ padding: "6px 8px", background: "rgba(0, 1, 23,0.5)", borderRadius: 4, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 8, color: C.muted, marginBottom: 2 }}>{k.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: k.color, fontVariantNumeric: "tabular-nums" }}>{k.val}</div>
                  <div style={{ fontSize: 7.5, color: k.color, opacity: 0.8 }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </MiniWidget>
        </div>

        {/* CENTER */}
        <div style={{ flex: 1, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
          {/* Multi-year financials */}
          <MiniWidget title="Historique Financier Pluriannuel · SONATEL (Mds XOF)" topRight={<DataBadge source="Rapports Annuels BFD" time="2021–2026P" />}>
            <div style={{ marginBottom: 6 }}>
              <BarChartSimple />
              <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 5 }}>
                {[{ c: C.accent + "22", label: "CA" }, { c: C.gold + "50", label: "EBITDA" }, { c: C.accent + "40", label: "Rés. Net" }].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 10, height: 8, background: l.c, borderRadius: 1 }} />
                    <span style={{ fontSize: 8, color: C.muted }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "50px repeat(6, 1fr)", gap: 0, padding: "2px 4px", borderBottom: `1px solid ${C.border}`, marginBottom: 3 }}>
              {["", ...REVENUE_YEARS.map((r) => r.y)].map((h, i) => (
                <div key={`yh-${i}`} style={{ fontSize: 7.5, fontWeight: 700, color: i === REVENUE_YEARS.length ? C.gold : C.muted, textAlign: "right", paddingRight: 4 }}>{h}</div>
              ))}
            </div>
            {[
              { label: "CA", key: "ca" as keyof typeof REVENUE_YEARS[0] },
              { label: "EBITDA", key: "ebitda" as keyof typeof REVENUE_YEARS[0] },
              { label: "Rés. Net", key: "net" as keyof typeof REVENUE_YEARS[0] },
            ].map((row) => (
              <div key={row.label} style={{ display: "grid", gridTemplateColumns: "50px repeat(6, 1fr)", padding: "3px 4px", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                <span style={{ fontSize: 8.5, color: C.muted }}>{row.label}</span>
                {REVENUE_YEARS.map((r, i) => (
                  <span key={`${row.label}-${i}`} style={{ fontSize: 9, color: r.y === "2026P" ? C.gold : C.dim, textAlign: "right", paddingRight: 4, fontVariantNumeric: "tabular-nums", fontWeight: r.y === "2026P" ? 700 : 400 }}>
                    {String(r[row.key])}
                  </span>
                ))}
              </div>
            ))}
          </MiniWidget>

          {/* Ratios vs Secteur */}
          <MiniWidget title="Ratios Clés vs Secteur Télécom BRVM" topRight={<DataBadge source="BFD Research" />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {RATIOS_VS_SECTOR.map((r) => {
                const better = r.label === "Dette/EBITDA" ? r.company < r.sector : r.company > r.sector;
                const barW = Math.min((r.company / (Math.max(r.company, r.sector) * 1.2)) * 100, 100);
                return (
                  <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 8.5, color: C.muted, minWidth: 80 }}>{r.label}</span>
                    <div style={{ flex: 1, height: 6, background: "rgba(44, 61, 127,0.2)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${barW}%`, background: better ? C.green : C.red, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: better ? C.green : C.red, minWidth: 38, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.company}{r.unit}</span>
                    <span style={{ fontSize: 8.5, color: C.muted, minWidth: 10 }}>vs</span>
                    <span style={{ fontSize: 9, color: C.muted, minWidth: 34, textAlign: "right" }}>{r.sector}{r.unit}</span>
                  </div>
                );
              })}
            </div>
          </MiniWidget>

          {/* Benchmark sectoriel */}
          <MiniWidget title="Benchmark Sectoriel · Télécoms UEMOA" topRight={<DataBadge source="BFD Equity" />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 60px 55px 70px", gap: 0, padding: "2px 4px", marginBottom: 3, borderBottom: `1px solid ${C.border}` }}>
              {["Société", "Marge EBITDA", "ROE", "P/E", "BFD Rating"].map((h) => (
                <div key={h} style={{ fontSize: 7.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</div>
              ))}
            </div>
            {SECTOR_BENCHMARK.map((s) => (
              <div key={s.company} style={{ display: "grid", gridTemplateColumns: "1fr 70px 60px 55px 70px", padding: "5px 4px", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: s.company === "SONATEL" ? C.accent : C.text }}>{s.company}</div>
                  <div style={{ fontSize: 7.5, color: C.muted }}>{s.country}</div>
                </div>
                <span style={{ fontSize: 10, color: C.dim }}>{s.marge}</span>
                <span style={{ fontSize: 10, color: C.dim }}>{s.roe}</span>
                <span style={{ fontSize: 10, color: C.dim }}>{s.pe}</span>
                <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 2, background: s.ratingColor + "14", border: `1px solid ${s.ratingColor}25`, color: s.ratingColor, fontWeight: 800, textAlign: "center" }}>{s.rating}</span>
              </div>
            ))}
          </MiniWidget>
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 248, flexShrink: 0, borderLeft: `1px solid ${C.border}`, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {/* Note analyste */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <FileText size={9} color={C.purple} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Note Analyste BFD</span>
            </div>
            <div style={{ padding: "8px 10px", background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 5 }}>
              <div style={{ display: "flex", gap: 1, marginBottom: 5 }}>
                {[1,2,3,4,5].map((i) => <span key={i} style={{ fontSize: 10 }}>{i <= 4 ? "★" : "☆"}</span>)}
                <span style={{ fontSize: 8, color: C.muted, marginLeft: 4 }}>4/5 · Conviction Forte</span>
              </div>
              <p style={{ margin: "0 0 6px", fontSize: 8.5, color: C.dim, lineHeight: 1.5 }}>{ANALYST_NOTE}</p>
              <div style={{ fontSize: 7.5, color: C.muted }}>Moussa Ouédraogo · BFD Equity Research · 08 Avr 2026</div>
            </div>
          </div>

          {/* Signaux de risque */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <AlertTriangle size={9} color={C.gold} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Signaux de Risque</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {RISK_SIGNALS.map((r) => (
                <div key={r.label} style={{ padding: "5px 8px", borderRadius: 4, background: r.color + "08", border: `1px solid ${r.color}22` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 8, fontWeight: 700, color: r.color }}>{r.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 7, padding: "0 4px", borderRadius: 2, background: r.color + "18", color: r.color, fontWeight: 800 }}>{r.level}</span>
                  </div>
                  <div style={{ fontSize: 7.5, color: C.muted, lineHeight: 1.4 }}>{r.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de vigilance */}
          <div style={{ padding: "8px 10px" }}>
            <BFDZoneVigilance
              title="Pression sur les dividendes si investissements 5G s'accélèrent"
              description="L'extension réseau 5G prévue 2026–2027 pourrait peser sur le free cash-flow disponible pour distribution."
              assets={["SONATEL", "Div. 2027P"]}
              level="MODÉRÉE"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
