/**
 * BloomfieldSignature.tsx
 * Proprietary BFD (Bloomfield Financial Data) identity components.
 * Shared across all 6 presentation screens.
 */
import type { ReactNode } from "react";
import { Search, Bell, RefreshCw, ChevronDown, Shield, Zap, TrendingUp, TrendingDown, Minus, AlertTriangle, Target, Activity } from "lucide-react";

/* ─── Shared colour palette ──────────────────────────────────────────────── */
export const C = {
  dark: "#000117",
  surface: "#000117",
  elevated: "#000117",
  panel: "rgba(0, 1, 23,0.9)",
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

/* ─── Compact terminal header (44px) ─────────────────────────────────────── */
interface TerminalHeaderProps {
  screenLabel: string;
  screenIcon: ReactNode;
  screenColor?: string;
  badge?: string;
}
export function TerminalHeader({ screenLabel, screenIcon, screenColor = C.accent, badge }: TerminalHeaderProps) {
  return (
    <div style={{ height: 44, display: "flex", alignItems: "center", padding: "0 14px", gap: 10, background: C.surface, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
      {/* BT Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
        <div style={{ width: 26, height: 26, borderRadius: 5, background: "linear-gradient(135deg, #d6b68d 0%, #d6b68d 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>BT</span>
        </div>
        <div>
          <div style={{ color: C.text, fontSize: 11, fontWeight: 700, lineHeight: 1 }}>BLOOMFIELD</div>
          <div style={{ color: C.accent, fontSize: 7, fontWeight: 600, lineHeight: 1, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 1 }}>TERMINAL</div>
        </div>
      </div>
      <div style={{ width: 1, height: 20, background: C.border }} />
      {/* Screen label */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
        <span style={{ color: screenColor }}>{screenIcon}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: C.text, letterSpacing: "0.05em", textTransform: "uppercase" }}>{screenLabel}</span>
        {badge && <span style={{ fontSize: 7.5, padding: "1px 6px", borderRadius: 2, background: screenColor + "18", border: `1px solid ${screenColor}35`, color: screenColor, fontWeight: 700, letterSpacing: "0.04em" }}>{badge}</span>}
      </div>
      {/* Search */}
      <div style={{ flex: 1, maxWidth: 340, position: "relative", display: "flex", alignItems: "center", marginLeft: 4 }}>
        <Search size={11} style={{ position: "absolute", left: 9, color: C.dim, pointerEvents: "none" }} />
        <input placeholder="Rechercher marchés, titres, indicateurs, pays…" style={{ width: "100%", height: 28, background: "rgba(0, 1, 23,0.65)", border: `1px solid ${C.border}`, borderRadius: 5, paddingLeft: 27, paddingRight: 10, color: C.dim, fontSize: 10, outline: "none" }} readOnly />
      </div>
      <div style={{ flex: 1 }} />
      {/* Live + Date */}
      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, boxShadow: `0 0 5px ${C.green}`, animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: 8.5, color: C.green, fontWeight: 700, letterSpacing: "0.06em" }}>LIVE</span>
      </div>
      <span style={{ fontSize: 9, color: C.dim }}>Mer 08 Avr 2026 · 15:47 GMT</span>
      <div style={{ width: 1, height: 18, background: C.border }} />
      <button style={{ width: 26, height: 26, borderRadius: 4, background: "transparent", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.muted }}>
        <RefreshCw size={11} />
      </button>
      <button style={{ position: "relative", width: 26, height: 26, borderRadius: 4, background: "transparent", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.dim }}>
        <Bell size={12} />
        <div style={{ position: "absolute", top: 2, right: 2, width: 12, height: 12, borderRadius: "50%", background: C.red, fontSize: 7, fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px solid #000117" }}>5</div>
      </button>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#fff", cursor: "pointer", flexShrink: 0 }}>AK</div>
    </div>
  );
}

/* ─── Data provenance badge ──────────────────────────────────────────────── */
interface DataBadgeProps { source: string; time?: string; live?: boolean; delayed?: boolean }
export function DataBadge({ source, time, live, delayed }: DataBadgeProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <span style={{ fontSize: 7.5, color: C.muted }}>Source :</span>
      <span style={{ fontSize: 7.5, fontWeight: 700, color: C.dim }}>{source}</span>
      {time && <span style={{ fontSize: 7.5, color: C.muted }}>· {time}</span>}
      {live && <span style={{ fontSize: 7, padding: "0 4px", borderRadius: 2, background: "rgba(16,200,122,0.12)", border: "1px solid rgba(16,200,122,0.25)", color: C.green, fontWeight: 700 }}>EN DIRECT</span>}
      {delayed && <span style={{ fontSize: 7, padding: "0 4px", borderRadius: 2, background: "rgba(244,185,66,0.1)", border: "1px solid rgba(244,185,66,0.25)", color: C.gold, fontWeight: 700 }}>DIFFÉRÉ +15min</span>}
    </div>
  );
}

/* ─── BFD Signal du Jour ─────────────────────────────────────────────────── */
interface SignalDuJourProps { signal: "HAUSSIER" | "NEUTRE" | "BAISSIER"; title: string; body: string; assets: string[]; criticite: "FAIBLE" | "MODÉRÉE" | "ÉLEVÉE"; analyste: string }
export function SignalDuJour({ signal, title, body, assets, criticite, analyste }: SignalDuJourProps) {
  const sColor = signal === "HAUSSIER" ? C.green : signal === "BAISSIER" ? C.red : C.gold;
  const sIcon = signal === "HAUSSIER" ? <TrendingUp size={11} /> : signal === "BAISSIER" ? <TrendingDown size={11} /> : <Minus size={11} />;
  const cColor = criticite === "ÉLEVÉE" ? C.red : criticite === "MODÉRÉE" ? C.gold : C.green;
  return (
    <div style={{ padding: "9px 12px", background: sColor + "08", border: `1px solid ${sColor}30`, borderLeft: `3px solid ${sColor}`, borderRadius: 6, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "2px 7px", borderRadius: 3, background: sColor + "18", border: `1px solid ${sColor}40` }}>
          <span style={{ color: sColor }}>{sIcon}</span>
          <span style={{ fontSize: 8.5, fontWeight: 800, color: sColor, letterSpacing: "0.08em" }}>SIGNAL BFD · {signal}</span>
        </div>
        <span style={{ fontSize: 8, padding: "1px 5px", borderRadius: 2, background: cColor + "14", border: `1px solid ${cColor}30`, color: cColor, fontWeight: 700 }}>CRITICITÉ {criticite}</span>
        <span style={{ marginLeft: "auto", fontSize: 8, color: C.muted }}>{analyste}</span>
      </div>
      <div style={{ fontSize: 11, fontWeight: 800, color: C.text, marginBottom: 4, lineHeight: 1.3 }}>{title}</div>
      <p style={{ margin: "0 0 6px", fontSize: 9, color: C.dim, lineHeight: 1.5 }}>{body}</p>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        <span style={{ fontSize: 7.5, color: C.muted }}>Actifs concernés :</span>
        {assets.map((a) => <span key={a} style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: sColor + "10", border: `1px solid ${sColor}25`, color: sColor, fontWeight: 600 }}>{a}</span>)}
      </div>
    </div>
  );
}

/* ─── BFD Sovereign Score ────────────────────────────────────────────────── */
interface BFDScoreProps { score: number; label?: string; country?: string; trend?: "up" | "down" | "flat"; size?: number }
export function BFDScore({ score, label = "Score Souverain BFD", country, trend = "flat", size = 64 }: BFDScoreProps) {
  const color = score >= 72 ? C.green : score >= 55 ? C.gold : score >= 38 ? C.orange : C.red;
  const grade = score >= 72 ? "A" : score >= 55 ? "B" : score >= 38 ? "C" : "D";
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <svg width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(44, 61, 127,0.25)" strokeWidth={5} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={5}
            strokeDasharray={`${filled} ${circ}`} strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: size * 0.22, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: size * 0.13, fontWeight: 700, color, opacity: 0.8 }}>{grade}</span>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
          <Shield size={9} color={color} />
          <span style={{ fontSize: 8, fontWeight: 700, color: C.dim, letterSpacing: "0.06em", textTransform: "uppercase" }}>BFD SCORE</span>
        </div>
        <div style={{ fontSize: 9.5, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{label}</div>
        {country && <div style={{ fontSize: 8.5, color: C.muted, marginTop: 2 }}>{country}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color }}>/100</span>
          {trend === "up" && <TrendingUp size={9} color={C.green} />}
          {trend === "down" && <TrendingDown size={9} color={C.red} />}
        </div>
      </div>
    </div>
  );
}

/* ─── BFD Analyst Rating ─────────────────────────────────────────────────── */
interface BFDRatingProps { rating: "ACHAT" | "CONSERVER" | "VENDRE"; target: string; current: string; horizon: string; analyst: string; confidence?: number }
export function BFDRating({ rating, target, current, horizon, analyst, confidence = 78 }: BFDRatingProps) {
  const rColor = rating === "ACHAT" ? C.green : rating === "VENDRE" ? C.red : C.gold;
  const upside = ((parseFloat(target.replace(/\s/g, "")) - parseFloat(current.replace(/\s/g, ""))) / parseFloat(current.replace(/\s/g, ""))) * 100;
  return (
    <div style={{ padding: "9px 11px", background: rColor + "08", border: `1px solid ${rColor}28`, borderRadius: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <div style={{ padding: "3px 10px", borderRadius: 3, background: rColor, fontWeight: 800, fontSize: 11, color: "#fff", letterSpacing: "0.08em" }}>{rating}</div>
        <div>
          <div style={{ fontSize: 7.5, color: C.muted }}>Recommandation BFD</div>
          <div style={{ fontSize: 8, color: C.dim }}>{analyst}</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 8, color: C.muted }}>Confiance</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: rColor }}>{confidence}%</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        <div>
          <div style={{ fontSize: 7.5, color: C.muted }}>Cours cible</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{target}</div>
        </div>
        <div>
          <div style={{ fontSize: 7.5, color: C.muted }}>Cours actuel</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.dim }}>{current}</div>
        </div>
        <div>
          <div style={{ fontSize: 7.5, color: C.muted }}>Potentiel</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: rColor }}>{upside > 0 ? "+" : ""}{upside.toFixed(1)}%</div>
        </div>
      </div>
      <div style={{ marginTop: 6, fontSize: 8, color: C.muted }}>Horizon : {horizon}</div>
    </div>
  );
}

/* ─── BFD Macro Signal ───────────────────────────────────────────────────── */
interface BFDMacroSignalProps { signal: "HAUSSIER" | "NEUTRE" | "BAISSIER"; zone: string; summary: string; factors: string[] }
export function BFDMacroSignal({ signal, zone, summary, factors }: BFDMacroSignalProps) {
  const sColor = signal === "HAUSSIER" ? C.green : signal === "BAISSIER" ? C.red : C.gold;
  const sIcon = signal === "HAUSSIER" ? <TrendingUp size={10} /> : signal === "BAISSIER" ? <TrendingDown size={10} /> : <Minus size={10} />;
  return (
    <div style={{ padding: "9px 11px", background: "rgba(0, 1, 23,0.5)", border: `1px solid ${C.border}`, borderRadius: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
        <Activity size={9} color={C.accent} />
        <span style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Signal Macro BFD</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto", padding: "2px 8px", borderRadius: 3, background: sColor + "18", border: `1px solid ${sColor}35` }}>
          <span style={{ color: sColor }}>{sIcon}</span>
          <span style={{ fontSize: 9, fontWeight: 800, color: sColor }}>{signal}</span>
        </div>
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.text, marginBottom: 4 }}>{zone}</div>
      <p style={{ margin: "0 0 6px", fontSize: 8.5, color: C.dim, lineHeight: 1.5 }}>{summary}</p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {factors.map((f, i) => <span key={i} style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: sColor + "0e", border: `1px solid ${sColor}22`, color: sColor, fontWeight: 600 }}>{f}</span>)}
      </div>
    </div>
  );
}

/* ─── BFD Zone de Vigilance ──────────────────────────────────────────────── */
interface BFDZoneVigilanceProps { title: string; description: string; assets: string[]; level: "MODÉRÉE" | "ÉLEVÉE" | "CRITIQUE" }
export function BFDZoneVigilance({ title, description, assets, level }: BFDZoneVigilanceProps) {
  const lColor = level === "CRITIQUE" ? C.red : level === "ÉLEVÉE" ? C.orange : C.gold;
  return (
    <div style={{ padding: "8px 11px", background: lColor + "08", border: `1px solid ${lColor}28`, borderLeft: `3px solid ${lColor}`, borderRadius: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
        <AlertTriangle size={9} color={lColor} />
        <span style={{ fontSize: 8, fontWeight: 800, color: lColor, letterSpacing: "0.06em", textTransform: "uppercase" }}>Zone de Vigilance · {level}</span>
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.text, marginBottom: 3 }}>{title}</div>
      <p style={{ margin: "0 0 5px", fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{description}</p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {assets.map((a) => <span key={a} style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: lColor + "10", border: `1px solid ${lColor}25`, color: lColor, fontWeight: 600 }}>{a}</span>)}
      </div>
    </div>
  );
}

/* ─── BFD Opportunité Détectée ───────────────────────────────────────────── */
interface BFDOpportuniteProps { title: string; description: string; assets: string[]; potentiel: string }
export function BFDOpportunite({ title, description, assets, potentiel }: BFDOpportuniteProps) {
  return (
    <div style={{ padding: "8px 11px", background: C.green + "07", border: `1px solid ${C.green}28`, borderLeft: `3px solid ${C.green}`, borderRadius: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
        <Target size={9} color={C.green} />
        <span style={{ fontSize: 8, fontWeight: 800, color: C.green, letterSpacing: "0.06em" }}>OPPORTUNITÉ DÉTECTÉE · BFD</span>
        <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 800, color: C.green }}>+{potentiel}</span>
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: C.text, marginBottom: 3 }}>{title}</div>
      <p style={{ margin: "0 0 5px", fontSize: 8.5, color: C.dim, lineHeight: 1.4 }}>{description}</p>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {assets.map((a) => <span key={a} style={{ fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: C.green + "10", border: `1px solid ${C.green}25`, color: C.green, fontWeight: 600 }}>{a}</span>)}
      </div>
    </div>
  );
}

/* ─── BFD Impact Block (Insights) ────────────────────────────────────────── */
interface ImpactItem { label: string; type: "Titre" | "Pays" | "Secteur"; impact: "+" | "-" | "=" }
interface BFDImpactBlockProps { items: ImpactItem[]; criticite: "FAIBLE" | "MODÉRÉE" | "ÉLEVÉE"; impactType: string }
export function BFDImpactBlock({ items, criticite, impactType }: BFDImpactBlockProps) {
  const cColor = criticite === "ÉLEVÉE" ? C.red : criticite === "MODÉRÉE" ? C.gold : C.green;
  return (
    <div style={{ padding: "8px 10px", background: "rgba(0, 1, 23,0.4)", border: `1px solid ${C.border}`, borderRadius: 5 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 6 }}>
        <Zap size={9} color={C.accent} />
        <span style={{ fontSize: 8, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Impact Marché BFD</span>
        <span style={{ marginLeft: "auto", fontSize: 7.5, padding: "1px 5px", borderRadius: 2, background: cColor + "14", border: `1px solid ${cColor}30`, color: cColor, fontWeight: 700 }}>{criticite}</span>
      </div>
      <div style={{ fontSize: 8.5, color: C.dim, marginBottom: 5 }}>{impactType}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "3px 7px", borderRadius: 3, background: "rgba(0, 1, 23,0.35)" }}>
            <span style={{ fontSize: 7.5, color: item.type === "Titre" ? C.accent : item.type === "Pays" ? C.gold : C.purple, fontWeight: 700, minWidth: 40 }}>{item.type}</span>
            <span style={{ flex: 1, fontSize: 9, color: C.text }}>{item.label}</span>
            <span style={{ fontSize: 11, fontWeight: 800, color: item.impact === "+" ? C.green : item.impact === "-" ? C.red : C.gold }}>{item.impact === "+" ? "▲" : item.impact === "-" ? "▼" : "→"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Mini widget shell ──────────────────────────────────────────────────── */
interface MiniWidgetProps { title: string; accent?: string; topRight?: ReactNode; children: ReactNode; noPad?: boolean }
export function MiniWidget({ title, accent = C.accent, topRight, children, noPad }: MiniWidgetProps) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 7, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "7px 11px", borderBottom: `1px solid ${C.border}`, background: "rgba(0, 1, 23,0.45)", flexShrink: 0, gap: 7 }}>
        <div style={{ width: 2, height: 12, borderRadius: 2, background: accent, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: C.text, textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</span>
        <div style={{ flex: 1 }} />
        {topRight}
      </div>
      <div style={{ flex: 1, overflow: "hidden", padding: noPad ? 0 : "9px 11px", minHeight: 0 }}>{children}</div>
    </div>
  );
}

/* ─── Tiny sparkline (SVG, no deps) ─────────────────────────────────────── */
interface SpkProps { data: number[]; color: string; w?: number; h?: number; id: string }
export function Spk({ data, color, w = 72, h = 26, id }: SpkProps) {
  if (data.length < 2) return null;
  const min = Math.min(...data), max = Math.max(...data), range = max - min || 1;
  const pts = data.map((v, i) => [+(i / (data.length - 1) * w).toFixed(1), +(h - 2 - ((v - min) / range) * (h - 4)).toFixed(1)] as [number, number]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"} ${x},${y}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <defs><linearGradient id={`spk-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
      <path d={area} fill={`url(#spk-${id})`} />
      <path d={line} stroke={color} strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Vertical divider ───────────────────────────────────────────────────── */
export function VDiv({ h = 18 }: { h?: number }) {
  return <div style={{ width: 1, height: h, background: C.border, flexShrink: 0, margin: "0 2px" }} />;
}
