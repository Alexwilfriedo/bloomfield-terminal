import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const C = {
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  surface: "rgba(0, 4, 48,0.5)",
};

const metrics = [
  {
    label: "BRVM Composite",
    value: "284.12",
    change: "+2.06",
    pct: "+0.73%",
    up: true,
    sub: "Indice principal",
    color: C.accent,
  },
  {
    label: "Capitalisation BRVM",
    value: "7 843,2",
    change: "+124,4",
    pct: "+1.61%",
    up: true,
    sub: "Mds FCFA",
    color: C.gold,
  },
  {
    label: "Volume séance",
    value: "1 284 750",
    change: "+312 400",
    pct: "+32.2%",
    up: true,
    sub: "Titres échangés",
    color: C.green,
  },
  {
    label: "Taux BCEAO",
    value: "3.50%",
    change: "0.00",
    pct: "Inchangé",
    up: null,
    sub: "Taux directeur",
    color: "#a78bfa",
  },
  {
    label: "XOF / USD",
    value: "596.42",
    change: "+0.71",
    pct: "+0.12%",
    up: true,
    sub: "Marché des changes",
    color: "#fb923c",
  },
];

export function MetricsBar() {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        padding: "10px 16px",
        borderBottom: `1px solid ${C.border}`,
        flexShrink: 0,
        background: "rgba(0, 4, 48,0.5)",
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderTop: `2px solid ${m.color}`,
            borderRadius: "0 0 6px 6px",
            padding: "8px 12px",
            cursor: "pointer",
            transition: "background 0.1s",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 40,
              background: `linear-gradient(180deg, ${m.color}08 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />

          <div style={{ fontSize: 9, color: C.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 3 }}>
            {m.label}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: C.text,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {m.value}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 4 }}>
            {m.up !== null ? (
              <>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    fontSize: 11,
                    fontWeight: 700,
                    color: m.up ? C.green : C.red,
                  }}
                >
                  {m.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {m.pct}
                </span>
                <span style={{ fontSize: 10, color: C.dim, fontVariantNumeric: "tabular-nums" }}>
                  ({m.change})
                </span>
              </>
            ) : (
              <span style={{ display: "flex", alignItems: "center", gap: 2, fontSize: 11, fontWeight: 600, color: "#a78bfa" }}>
                <Activity size={11} />
                {m.pct}
              </span>
            )}
          </div>
          <div style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>{m.sub}</div>
        </div>
      ))}
    </div>
  );
}
