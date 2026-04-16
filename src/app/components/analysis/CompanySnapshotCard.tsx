import { TrendingUp, CheckCircle2, Star, ExternalLink, Building2, Globe2 } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

const COMPANY = {
  name: "Société Générale de Banques en Côte d'Ivoire",
  shortName: "SGBCI",
  isin: "CI0000000046",
  ticker: "SGBC",
  sector: "Banques & Services Financiers",
  subsector: "Banque Commerciale",
  market: "BRVM",
  country: "Côte d'Ivoire",
  flag: "🇨🇮",
  marketCap: "487.3 Mds XOF",
  marketCapUSD: "~USD 806M",
  lastPrice: "13 750 XOF",
  priceChange: "+2.4%",
  priceChangeVal: 2.4,
  lastPublication: "Résultats FY2023",
  publicationDate: "28 Fév 2024",
  status: "Publié",
  rating: "A– / Perspective Stable",
  ratingSource: "Bloomfield Investment",
  employees: "1 847",
  founded: "1962",
  listed: "1997",
  parent: "Société Générale Group (France)",
  website: "www.sgci.com",
};

const HIGHLIGHTS = [
  { label: "PNB 2023", value: "154.6 Mds", change: "+12.0%", up: true },
  { label: "Résultat Net", value: "41.2 Mds", change: "+17.4%", up: true },
  { label: "Total Actif", value: "2 487 Mds", change: "+11.1%", up: true },
  { label: "ROE", value: "18.3%", change: "+1.4pp", up: true },
];

export function CompanySnapshotCard() {
  const C = useThemeColors();
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Gold accent top bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${C.gold} 0%, transparent 60%)` }} />

      <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
        {/* Left: Logo + Identity */}
        <div
          style={{
            padding: "14px 18px",
            borderRight: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 240,
            flexShrink: 0,
            background: "var(--bt-overlay-30)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              {/* Company logo placeholder */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #1a4a7a 0%, #000117 100%)",
                  border: `1px solid var(--bt-accent-a25)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  fontWeight: 800,
                  color: C.accent,
                  letterSpacing: "-0.5px",
                  flexShrink: 0,
                }}
              >
                SG
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: "-0.3px" }}>
                    {COMPANY.shortName}
                  </span>
                  <Star size={11} color={C.gold} fill={C.gold} />
                </div>
                <div style={{ fontSize: 11.5, color: C.dim, marginTop: 1 }}>
                  {COMPANY.name}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              <Tag color={C.accent}>{COMPANY.isin}</Tag>
              <Tag color={C.gold}>{COMPANY.market}</Tag>
              <Tag color={C.purple}>{COMPANY.ticker}</Tag>
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
              <Building2 size={9} color={C.muted} />
              <span style={{ fontSize: 10.5, color: C.muted }}>{COMPANY.sector}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Globe2 size={9} color={C.muted} />
              <span style={{ fontSize: 10.5, color: C.muted }}>{COMPANY.flag} {COMPANY.country}</span>
            </div>
          </div>
        </div>

        {/* Middle: Key metrics */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "12px 18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
            {/* Market Cap */}
            <MetricCell label="Capitalisation Boursière" value={COMPANY.marketCap} sub={COMPANY.marketCapUSD} />
            {/* Price */}
            <MetricCell label="Dernier Cours" value={COMPANY.lastPrice} sub={`${COMPANY.priceChange} · 08 Avr 2026`} subColor={C.green} />
            {/* Last publication */}
            <MetricCell label="Dernière Publication" value={COMPANY.lastPublication} sub={COMPANY.publicationDate} />
            {/* Rating */}
            <MetricCell label="Notation Bloomfield" value={COMPANY.rating} sub={COMPANY.ratingSource} subColor={C.gold} />
          </div>

          {/* Financial highlights strip */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.label}
                style={{
                  flex: 1,
                  background: "var(--bt-overlay-40)",
                  border: `1px solid ${C.border}`,
                  borderRadius: 6,
                  padding: "6px 10px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <span style={{ fontSize: 10, color: C.muted, fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                  {h.label}
                </span>
                <span style={{ fontSize: 15, fontWeight: 800, color: C.text, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                  {h.value}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <TrendingUp size={9} color={h.up ? C.green : C.red} />
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: h.up ? C.green : C.red }}>
                    {h.change}
                  </span>
                  <span style={{ fontSize: 9.5, color: C.muted }}>vs. FY2022</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Status & quick info */}
        <div
          style={{
            width: 200,
            borderLeft: `1px solid ${C.border}`,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            background: "var(--bt-overlay-20)",
            flexShrink: 0,
          }}
        >
          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 10px",
              borderRadius: 6,
              background: "rgba(16,200,122,0.08)",
              border: "1px solid rgba(16,200,122,0.22)",
            }}
          >
            <CheckCircle2 size={12} color={C.green} />
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: C.green }}>Publié · Conforme</div>
              <div style={{ fontSize: 9.5, color: C.muted }}>BRVM — Règlement CREPMF</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <InfoRow label="Fondée" value={COMPANY.founded} />
            <InfoRow label="Cotée" value={COMPANY.listed} />
            <InfoRow label="Effectifs" value={COMPANY.employees} />
            <InfoRow label="Groupe" value="Société Générale" />
          </div>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              padding: "5px 10px",
              background: "var(--bt-accent-a08)",
              border: "1px solid rgba(214, 182, 141,0.22)",
              borderRadius: 5,
              color: C.accent,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "auto",
            }}
          >
            <ExternalLink size={10} />
            Fiche Complète SGBCI
          </button>
        </div>
      </div>
    </div>
  );
}

function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color,
        background: color + "14",
        border: `1px solid ${color}30`,
        borderRadius: 3,
        padding: "1px 6px",
        letterSpacing: "0.04em",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {children}
    </span>
  );
}

function MetricCell({ label, value, sub, subColor }: { label: string; value: string; sub?: string; subColor?: string }) {
  const C = useThemeColors();
  return (
    <div>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 3 }}>
        {label}
      </div>
      <div style={{ fontSize: 15, fontWeight: 800, color: C.text, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 10, color: subColor ?? C.muted, marginTop: 2 }}>{sub}</div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  const C = useThemeColors();
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 10.5, color: C.muted }}>{label}</span>
      <span style={{ fontSize: 10.5, fontWeight: 600, color: C.dim }}>{value}</span>
    </div>
  );
}
