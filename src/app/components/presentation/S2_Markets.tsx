import { TrendingUp, TrendingDown, BarChart2, Star, Bell } from "lucide-react";
import { C, TerminalHeader, DataBadge, MiniWidget, Spk, BFDRating, BFDZoneVigilance } from "./BloomfieldSignature";
import { LiveTicker } from "../terminal/LiveTicker";

const INDICES = [
  { id: "bc2", name: "BRVM Composite", val: "284.12", pct: "+0.73%", chg: "+2.06", up: true, data: [279, 280.5, 282, 281.5, 283, 283.5, 284.12], color: C.accent },
  { id: "bt2", name: "BRVM 10", val: "437.80", pct: "+0.45%", chg: "+1.96", up: true, data: [434, 435, 436, 435.5, 436.8, 437.2, 437.8], color: C.green },
  { id: "bp2", name: "BRVM Prestige", val: "158.34", pct: "−0.22%", chg: "−0.35", up: false, data: [159.2, 159.0, 158.8, 158.9, 158.6, 158.4, 158.34], color: C.red },
];
const GAINERS = [
  { t: "PALM CI", p: "7 295", pct: "+7.35%", vol: "148K", sec: "Agri" },
  { t: "SONATEL", p: "16 800", pct: "+5.21%", vol: "62K", sec: "Télécom" },
  { t: "BOLLORE CI", p: "3 200", pct: "+4.92%", vol: "205K", sec: "Transport" },
  { t: "BOA CI", p: "6 850", pct: "+1.23%", vol: "48K", sec: "Finance" },
  { t: "TRACTAFRIC", p: "3 750", pct: "+0.27%", vol: "18K", sec: "Dist." },
];
const LOSERS = [
  { t: "SAPH", p: "4 195", pct: "−3.42%", vol: "77K", sec: "Agri" },
  { t: "SOLIBRA", p: "89 000", pct: "−2.78%", vol: "9K", sec: "Boissons" },
  { t: "CIE", p: "1 580", pct: "−1.95%", vol: "31K", sec: "Énergie" },
  { t: "SETAO CI", p: "2 480", pct: "−1.10%", vol: "12K", sec: "BTP" },
  { t: "COTE D'IVOIRE SMC", p: "3 120", pct: "−0.64%", vol: "8K", sec: "Chimie" },
];
const HEATMAP = [
  { name: "Finance", val: "+1.2%", up: true, size: "large" },
  { name: "Télécom", val: "+4.8%", up: true, size: "large" },
  { name: "Agriculture", val: "+2.1%", up: true, size: "medium" },
  { name: "Énergie", val: "−1.9%", up: false, size: "medium" },
  { name: "Transport", val: "+3.4%", up: true, size: "medium" },
  { name: "Distribution", val: "+0.4%", up: true, size: "small" },
  { name: "BTP", val: "−0.8%", up: false, size: "small" },
  { name: "Boissons", val: "−2.3%", up: false, size: "small" },
  { name: "Industrie", val: "+0.1%", up: true, size: "small" },
];
const BONDS = [
  { c: "CIV 🇨🇮", y7: "6.89%", y10: "7.24%", sp: "+142bp", chg: "+2bp", up: true },
  { c: "SEN 🇸🇳", y7: "7.05%", y10: "7.41%", sp: "+158bp", chg: "+3bp", up: true },
  { c: "MLI 🇲🇱", y7: "7.52%", y10: "7.95%", sp: "+212bp", chg: "+1bp", up: true },
  { c: "BKF 🇧🇫", y7: "7.89%", y10: "8.32%", sp: "+249bp", chg: "−1bp", up: false },
  { c: "TGO 🇹🇬", y7: "6.72%", y10: "7.08%", sp: "+125bp", chg: "0bp", up: true },
  { c: "BEN 🇧🇯", y7: "6.78%", y10: "7.15%", sp: "+132bp", chg: "−2bp", up: false },
];
const WATCHLIST = [
  { t: "SONATEL", p: "16 800", pct: "+5.21%", up: true, bfd: "ACHAT" },
  { t: "PALM CI", p: "7 295", pct: "+7.35%", up: true, bfd: "ACHAT" },
  { t: "BOA CI", p: "6 850", pct: "+1.23%", up: true, bfd: "CONSERVER" },
  { t: "SGBCI", p: "11 200", pct: "+0.45%", up: true, bfd: "ACHAT" },
  { t: "CIE", p: "1 580", pct: "−1.95%", up: false, bfd: "CONSERVER" },
  { t: "SAPH", p: "4 195", pct: "−3.42%", up: false, bfd: "CONSERVER" },
];
const FX2 = [
  { p: "XOF/USD", v: "596.42", pct: "+0.12%", up: true, data: [593, 594, 595, 595.5, 596, 596.2, 596.42] },
  { p: "XOF/EUR", v: "655.96", pct: "0.00%", up: true, data: [656, 655.8, 656, 655.9, 656, 656, 655.96] },
  { p: "USD/XAF", v: "596.42", pct: "+0.12%", up: true, data: [593, 594, 595, 595.5, 596, 596.2, 596.42] },
];
const COMMO2 = [
  { n: "Cacao ICE", v: "8 245", pct: "+2.34%", up: true, data: [7900, 8000, 8050, 8100, 8150, 8200, 8245] },
  { n: "Café Robusta", v: "3 842", pct: "−0.45%", up: false, data: [3860, 3855, 3850, 3848, 3845, 3843, 3842] },
  { n: "Pétrole WTI", v: "71.84", pct: "+1.12%", up: true, data: [70.5, 71, 71.2, 71.4, 71.6, 71.7, 71.84] },
  { n: "Or COMEX", v: "2 347", pct: "+0.89%", up: true, data: [2320, 2325, 2330, 2335, 2340, 2344, 2347] },
];

function IntraChart({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const w = 200, h = 52, pts = data.map((v, i) => `${(i / (data.length - 1) * w).toFixed(1)},${(h - 2 - ((v - min) / range) * (h - 6)).toFixed(1)}`);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p}`).join(" ");
  const area = `${line} L${w},${h} L0,${h}Z`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs><linearGradient id={`ic-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.25} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <path d={area} fill={`url(#ic-${color.replace("#","")})`} />
      <path d={line} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" />
    </svg>
  );
}

const ratingColor = (r: string) => r === "ACHAT" ? C.green : r === "VENDRE" ? C.red : C.gold;

export function S2_Markets() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", background: C.dark }}>
      <TerminalHeader screenLabel="Marchés" screenIcon={<TrendingUp size={13} />} screenColor={C.green} badge="LIVE BRVM" />
      <LiveTicker />
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* LEFT */}
        <div style={{ width: 350, flexShrink: 0, borderRight: `1px solid ${C.border}`, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9 }}>
          {/* Indices with intraday shape */}
          <MiniWidget title="Indices BRVM · Intrajournalier" topRight={<DataBadge source="BRVM" time="15:47 GMT" live />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {INDICES.map((idx) => (
                <div key={idx.id} style={{ padding: "7px 9px", background: "rgba(0, 1, 23,0.5)", borderRadius: 5, border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, color: C.muted }}>{idx.name}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginTop: 1 }}>
                        <span style={{ fontSize: 15, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums" }}>{idx.val}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: idx.up ? C.green : C.red }}>{idx.pct}</span>
                        <span style={{ fontSize: 9, color: idx.up ? C.green : C.red, opacity: 0.7 }}>({idx.chg})</span>
                      </div>
                    </div>
                    <Spk data={idx.data} color={idx.color} id={`mkt-${idx.id}`} w={60} h={24} />
                  </div>
                  <IntraChart data={idx.data} color={idx.color} />
                </div>
              ))}
            </div>
          </MiniWidget>

          {/* Heatmap sectorielle */}
          <MiniWidget title="Heatmap Sectorielle BRVM" topRight={<DataBadge source="BRVM" live />}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
              {HEATMAP.map((h) => {
                const intensity = Math.min(Math.abs(parseFloat(h.val)) / 5, 1);
                const bg = h.up ? `rgba(16,200,122,${0.07 + intensity * 0.2})` : `rgba(244,56,96,${0.07 + intensity * 0.2})`;
                return (
                  <div key={h.name} style={{ padding: "6px 7px", borderRadius: 5, background: bg, border: `1px solid ${h.up ? C.green : C.red}22`, cursor: "pointer" }}>
                    <div style={{ fontSize: 8.5, color: C.dim, marginBottom: 2 }}>{h.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: h.up ? C.green : C.red, fontVariantNumeric: "tabular-nums" }}>{h.val}</div>
                  </div>
                );
              })}
            </div>
          </MiniWidget>
        </div>

        {/* CENTER */}
        <div style={{ flex: 1, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 9, minWidth: 0 }}>
          {/* Hausses / Baisses */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <MiniWidget title="Meilleures Hausses" accent={C.green} topRight={<DataBadge source="BRVM" live />}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {GAINERS.map((g) => (
                  <div key={g.t} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 5px", borderRadius: 3, cursor: "pointer" }}>
                    <TrendingUp size={8} color={C.green} />
                    <span style={{ flex: 1, fontSize: 9.5, fontWeight: 700, color: C.text }}>{g.t}</span>
                    <span style={{ fontSize: 8.5, color: C.dim }}>{g.p}</span>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: C.green, minWidth: 44, textAlign: "right" }}>{g.pct}</span>
                  </div>
                ))}
              </div>
            </MiniWidget>
            <MiniWidget title="Principales Baisses" accent={C.red} topRight={<DataBadge source="BRVM" live />}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {LOSERS.map((l) => (
                  <div key={l.t} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 5px", borderRadius: 3, cursor: "pointer" }}>
                    <TrendingDown size={8} color={C.red} />
                    <span style={{ flex: 1, fontSize: 9.5, fontWeight: 700, color: C.text }}>{l.t}</span>
                    <span style={{ fontSize: 8.5, color: C.dim }}>{l.p}</span>
                    <span style={{ fontSize: 9.5, fontWeight: 700, color: C.red, minWidth: 44, textAlign: "right" }}>{l.pct}</span>
                  </div>
                ))}
              </div>
            </MiniWidget>
          </div>

          {/* Obligations souveraines */}
          <MiniWidget title="Obligations Souveraines UEMOA" topRight={<DataBadge source="BCEAO · MFP" time="Séance" />}>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "85px 1fr 1fr 1fr 60px", padding: "2px 4px", marginBottom: 3, borderBottom: `1px solid ${C.border}` }}>
                {["Émetteur", "7 ans", "10 ans", "Spread", "Var."].map((h) => (
                  <div key={h} style={{ fontSize: 7.5, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
                ))}
              </div>
              {BONDS.map((b) => (
                <div key={b.c} style={{ display: "grid", gridTemplateColumns: "85px 1fr 1fr 1fr 60px", padding: "5px 4px", borderBottom: `1px solid rgba(44, 61, 127,0.1)`, alignItems: "center", cursor: "pointer" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.text }}>{b.c}</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{b.y7}</span>
                  <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{b.y10}</span>
                  <span style={{ fontSize: 9.5, fontWeight: 600, color: C.red }}>{b.sp}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: b.up ? C.red : C.green }}>{b.chg}</span>
                </div>
              ))}
            </div>
          </MiniWidget>

          {/* BFD Zone Vigilance */}
          <BFDZoneVigilance
            title="Spreads obligataires Burkina Faso — Tension persistante"
            description="Les rendements BKF 7Y à 7.89% reflètent une prime de risque élevée liée au contexte sécuritaire. Spread +249bp vs BCEAO. Surveillance active."
            assets={["OAT BKF 5Y", "OAT BKF 7Y"]}
            level="ÉLEVÉE"
          />

          {/* BFD Analyst rating */}
          <BFDRating rating="ACHAT" target="19 500" current="16 800" horizon="12 mois" analyst="M. Ouédraogo · BFD Equity Research" confidence={82} />
        </div>

        {/* RIGHT PANEL */}
        <div style={{ width: 248, flexShrink: 0, borderLeft: `1px solid ${C.border}`, overflow: "auto", display: "flex", flexDirection: "column" }}>
          {/* Watchlist */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
              <Star size={9} color={C.gold} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Watchlist</span>
              <span style={{ marginLeft: "auto", fontSize: 8.5, color: C.accent, cursor: "pointer" }}>Modifier</span>
            </div>
            {WATCHLIST.map((w) => (
              <div key={w.t} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                <Star size={8} color={C.gold} fill={C.gold} />
                <span style={{ flex: 1, fontSize: 9.5, fontWeight: 700, color: C.text }}>{w.t}</span>
                <span style={{ fontSize: 9, color: C.dim, fontVariantNumeric: "tabular-nums" }}>{w.p}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: w.up ? C.green : C.red, minWidth: 40, textAlign: "right" }}>{w.pct}</span>
                <span style={{ fontSize: 7, padding: "1px 4px", borderRadius: 2, background: ratingColor(w.bfd) + "15", color: ratingColor(w.bfd), fontWeight: 800 }}>{w.bfd}</span>
              </div>
            ))}
          </div>

          {/* FX */}
          <div style={{ padding: "8px 10px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Taux de Change</div>
            {FX2.map((f) => (
              <div key={f.p} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                <span style={{ flex: 1, fontSize: 9, color: C.dim }}>{f.p}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{f.v}</span>
                <span style={{ fontSize: 8.5, fontWeight: 600, color: f.up ? C.green : C.red }}>{f.pct}</span>
              </div>
            ))}
          </div>

          {/* Commodités */}
          <div style={{ padding: "8px 10px" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Matières Premières</div>
            {COMMO2.map((c) => (
              <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: C.dim }}>{c.n}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 1 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>{c.v}</span>
                    <span style={{ fontSize: 8.5, fontWeight: 600, color: c.up ? C.green : C.red }}>{c.pct}</span>
                  </div>
                </div>
                <Spk data={c.data} color={c.up ? C.green : C.red} id={`c2-${c.n}`} w={50} h={22} />
              </div>
            ))}
          </div>

          {/* Alertes marché */}
          <div style={{ padding: "8px 10px", background: "rgba(0, 1, 23,0.5)", borderTop: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
              <Bell size={9} color={C.red} />
              <span style={{ fontSize: 9, fontWeight: 700, color: C.dim, textTransform: "uppercase", letterSpacing: "0.06em" }}>Alertes Marché</span>
            </div>
            {[
              { msg: "PALM CI — Volume 3× moyenne 30J", color: C.gold },
              { msg: "SONATEL — Nouveau sommet 52 semaines", color: C.green },
              { msg: "SOLIBRA — Signal vendeur RSI > 70", color: C.red },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 6, padding: "4px 0", borderBottom: `1px solid rgba(44, 61, 127,0.1)` }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: a.color, marginTop: 4, flexShrink: 0 }} />
                <span style={{ fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{a.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
