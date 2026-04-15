import { useState } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Send,
  X,
  FileText,
  TrendingUp,
  AlertTriangle,
  Shield,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useTerminal, type OrderStatus } from "../../context/TerminalContext";

const C = {
  surface: "#000430",
  elevated: "#000430",
  dark: "#000430",
  accent: "#d6b68d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  orange: "#fb923c",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  border: "rgba(44, 61, 127,0.32)",
  purple: "#a78bfa",
};

const DAILY_LIMIT = 50_000_000;
const DAILY_USED = 8_749_000;

function formatXOF(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} M XOF`;
  if (n >= 1_000) return `${(n / 1000).toFixed(0)} K XOF`;
  return `${n.toLocaleString("fr-FR")} XOF`;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  draft: { label: "Brouillon", color: C.muted, icon: <FileText size={9} />, bg: "rgba(84, 103, 141,0.15)" },
  submitted: { label: "Soumis", color: C.accent, icon: <Send size={9} />, bg: "rgba(214, 182, 141,0.12)" },
  under_review: { label: "En validation", color: C.gold, icon: <Clock size={9} />, bg: "rgba(244,185,66,0.12)" },
  approved: { label: "Approuvé", color: C.green, icon: <CheckCircle2 size={9} />, bg: "rgba(16,200,122,0.12)" },
  rejected: { label: "Rejeté", color: C.red, icon: <X size={9} />, bg: "rgba(244,56,96,0.12)" },
  executed: { label: "Exécuté", color: "#60a5fa", icon: <TrendingUp size={9} />, bg: "rgba(96,165,250,0.12)" },
};

export function OrdersTrackingWidget() {
  const { orders, openOrderPanel } = useTerminal();
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const activeOrders = orders.filter((o) => ["submitted", "under_review", "approved"].includes(o.status));
  const totalActive = activeOrders.reduce((sum, o) => sum + o.estimatedValue, 0);
  const dailyPct = Math.min(100, (DAILY_USED / DAILY_LIMIT) * 100);

  const statusCounts = {
    under_review: orders.filter((o) => o.status === "under_review").length,
    approved: orders.filter((o) => o.status === "approved").length,
    executed: orders.filter((o) => o.status === "executed").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
  };

  return (
    <div
      style={{
        height: "100%",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${C.accent} 0%, ${C.purple} 60%, transparent 100%)`,
          flexShrink: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.4)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: C.accent }} />
          <ClipboardList size={11} color={C.accent} />
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              color: C.dim,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
            }}
          >
            Suivi des Ordres
          </span>
          {activeOrders.length > 0 && (
            <span
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: C.dark,
                background: C.gold,
                borderRadius: 8,
                padding: "0 5px",
              }}
            >
              {activeOrders.length} actif{activeOrders.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={() => openOrderPanel()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 8px",
            borderRadius: 4,
            border: `1px solid ${C.accent}40`,
            background: "rgba(214, 182, 141,0.1)",
            color: C.accent,
            fontSize: 8.5,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          <Plus size={9} />
          Nouvel Ordre
        </button>
      </div>

      {/* Summary strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
        }}
      >
        {[
          { label: "En validation", value: statusCounts.under_review, color: C.gold },
          { label: "Approuvés", value: statusCounts.approved, color: C.green },
          { label: "Exécutés", value: statusCounts.executed, color: "#60a5fa" },
          { label: "Rejetés", value: statusCounts.rejected, color: C.red },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: "5px 8px",
              textAlign: "center",
              borderRight: i < 3 ? `1px solid rgba(44, 61, 127,0.2)` : "none",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: stat.color,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 7.5, color: C.muted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Daily limit bar */}
      <div
        style={{
          padding: "7px 12px",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          background: "rgba(0, 4, 48,0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Shield size={9} color={C.muted} />
            <span style={{ fontSize: 8, color: C.dim }}>Limite journalière</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                fontSize: 8.5,
                fontWeight: 700,
                color: dailyPct > 80 ? C.red : C.gold,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {formatXOF(DAILY_USED)} utilisés
            </span>
            <span style={{ fontSize: 7.5, color: C.muted }}>/ {formatXOF(DAILY_LIMIT)}</span>
          </div>
        </div>
        <div
          style={{
            height: 5,
            background: "rgba(44, 61, 127,0.2)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${dailyPct}%`,
              background:
                dailyPct > 80 ? C.red : dailyPct > 60 ? C.gold : C.green,
              borderRadius: 3,
              transition: "width 0.3s",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <span style={{ fontSize: 7.5, color: C.muted }}>
            {formatXOF(DAILY_LIMIT - DAILY_USED)} disponibles
          </span>
          <span
            style={{
              fontSize: 7.5,
              color: C.muted,
            }}
          >
            {dailyPct.toFixed(0)}% utilisé
          </span>
        </div>
      </div>

      {/* Filter */}
      <div
        style={{
          display: "flex",
          gap: 4,
          padding: "5px 10px",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          overflowX: "auto",
        }}
      >
        {[
          { key: "all", label: "Tous" },
          { key: "under_review", label: "En validation" },
          { key: "approved", label: "Approuvés" },
          { key: "submitted", label: "Soumis" },
          { key: "executed", label: "Exécutés" },
          { key: "rejected", label: "Rejetés" },
        ].map((f) => {
          const isActive = filter === f.key;
          const cfg = f.key !== "all" ? STATUS_CONFIG[f.key as OrderStatus] : null;
          const fColor = cfg?.color ?? C.accent;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as "all" | OrderStatus)}
              style={{
                padding: "2px 7px",
                borderRadius: 3,
                border: `1px solid ${isActive ? fColor + "50" : C.border}`,
                background: isActive ? fColor + "14" : "transparent",
                color: isActive ? fColor : C.muted,
                fontSize: 8,
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {f.label}
            </button>
          );
        })}
        <div style={{ flex: 1 }} />
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "2px 6px",
            borderRadius: 3,
            border: `1px solid ${C.border}`,
            background: "transparent",
            color: C.muted,
            fontSize: 8,
            cursor: "pointer",
          }}
        >
          <RefreshCw size={8} />
        </button>
      </div>

      {/* Order list */}
      <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
        {filtered.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 8,
            }}
          >
            <ClipboardList size={24} color={C.muted} />
            <span style={{ fontSize: 9.5, color: C.muted }}>Aucun ordre dans cette catégorie</span>
          </div>
        ) : (
          filtered.map((order, i) => {
            const cfg = STATUS_CONFIG[order.status];
            return (
              <div
                key={order.id}
                style={{
                  padding: "8px 12px",
                  borderBottom: i < filtered.length - 1 ? `1px solid rgba(44, 61, 127,0.12)` : "none",
                  cursor: "pointer",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(214, 182, 141,0.04)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Row 1: ID + Status + Action */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{ fontSize: 8, color: C.muted, fontVariantNumeric: "tabular-nums" }}
                  >
                    {order.id}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "1px 6px",
                      borderRadius: 3,
                      background: cfg.bg,
                      border: `1px solid ${cfg.color}28`,
                    }}
                  >
                    <span style={{ color: cfg.color }}>{cfg.icon}</span>
                    <span style={{ fontSize: 7.5, fontWeight: 700, color: cfg.color }}>
                      {cfg.label}
                    </span>
                  </div>
                  <div style={{ flex: 1 }} />
                  <span
                    style={{
                      fontSize: 8.5,
                      fontWeight: 800,
                      color:
                        order.action === "BUY" ? C.green : C.red,
                      background:
                        order.action === "BUY"
                          ? "rgba(16,200,122,0.12)"
                          : "rgba(244,56,96,0.12)",
                      border: `1px solid ${order.action === "BUY" ? C.green : C.red}28`,
                      borderRadius: 3,
                      padding: "1px 6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {order.action === "BUY" ? "ACHAT" : "VENTE"}
                  </span>
                </div>

                {/* Row 2: Asset + market */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginBottom: 3,
                  }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.text }}>
                    {order.assetCode}
                  </span>
                  <span
                    style={{
                      fontSize: 7.5,
                      color: C.muted,
                      background: "rgba(44, 61, 127,0.2)",
                      borderRadius: 2,
                      padding: "0 4px",
                    }}
                  >
                    {order.market}
                  </span>
                  <span style={{ fontSize: 7.5, color: C.muted }}>· {order.assetName}</span>
                </div>

                {/* Row 3: Qty × Price = Value */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}
                >
                  <span style={{ fontSize: 8.5, color: C.muted }}>
                    {order.quantity.toLocaleString("fr-FR")} titres
                  </span>
                  <span style={{ fontSize: 8, color: C.muted }}>×</span>
                  <span
                    style={{
                      fontSize: 8.5,
                      fontWeight: 600,
                      color: C.dim,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {order.price.toLocaleString("fr-FR")} XOF
                  </span>
                  <span style={{ fontSize: 8, color: C.muted }}>=</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: C.text,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {formatXOF(order.estimatedValue)}
                  </span>
                  <div style={{ flex: 1 }} />
                  <span
                    style={{
                      fontSize: 7.5,
                      color: C.muted,
                    }}
                  >
                    {order.orderType}
                  </span>
                </div>

                {/* Row 4: Controller + date */}
                {order.notes && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {order.status === "under_review" && (
                      <AlertTriangle size={8} color={C.gold} />
                    )}
                    <span
                      style={{ fontSize: 8, color: C.muted, fontStyle: "italic", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                      {order.notes}
                    </span>
                    <span style={{ fontSize: 7.5, color: C.muted, flexShrink: 0 }}>
                      {order.updatedAt}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "5px 12px",
          borderTop: `1px solid ${C.border}`,
          background: "rgba(0, 4, 48,0.3)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <Shield size={9} color={C.muted} />
        <span style={{ fontSize: 7.5, color: C.muted }}>
          Circuit de validation Bloomfield · Contrôleur : Diallo Mamadou · Confidentiel
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 7.5, color: C.muted }}>
          {orders.length} ordre{orders.length > 1 ? "s" : ""} total
        </span>
      </div>
    </div>
  );
}
