import { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
  Send,
  Lock,
  User,
  FileText,
  TrendingUp,
  TrendingDown,
  Info,
} from "lucide-react";
import { useTerminal, type OrderStatus } from "../../context/TerminalContext";

const C = {
  surface: "#000117",
  elevated: "#000117",
  dark: "#000117",
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

const ASSETS = [
  { code: "SONATEL", name: "Sonatel SA", isin: "SN0000000045", market: "BRVM", price: 16800, sector: "Télécom" },
  { code: "PALM CI", name: "Palmci CI", isin: "CI0000000089", market: "BRVM", price: 7295, sector: "Agriculture" },
  { code: "SGBCI", name: "SocGen Banques CI", isin: "CI0000000046", market: "BRVM", price: 13750, sector: "Banque" },
  { code: "ETI", name: "Ecobank Transnat.", isin: "TG0000000003", market: "BRVM", price: 18.5, sector: "Banque" },
  { code: "BOA CI", name: "Bank of Africa CI", isin: "CI0000000032", market: "BRVM", price: 6850, sector: "Banque" },
  { code: "BOLLORE CI", name: "Bolloré CI", isin: "CI0000000019", market: "BRVM", price: 3200, sector: "Transport" },
  { code: "OAT CIV 7Y", name: "OAT Côte d'Ivoire 2031", isin: "CI0000OAT031", market: "UMOA-Titres", price: 95400, sector: "Souverain" },
  { code: "OAT SEN 10Y", name: "OAT Sénégal 2036", isin: "SN0000OAT036", market: "UMOA-Titres", price: 92800, sector: "Souverain" },
];

const STATUS_STEPS: OrderStatus[] = ["draft", "submitted", "under_review", "approved", "executed"];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode; bg: string }> = {
  draft: { label: "Brouillon", color: C.muted, icon: <FileText size={12} />, bg: "rgba(84, 103, 141,0.15)" },
  submitted: { label: "Soumis", color: C.accent, icon: <Send size={12} />, bg: "rgba(214, 182, 141,0.12)" },
  under_review: { label: "En cours de validation", color: C.gold, icon: <Clock size={12} />, bg: "rgba(244,185,66,0.12)" },
  approved: { label: "Approuvé", color: C.green, icon: <CheckCircle2 size={12} />, bg: "rgba(16,200,122,0.12)" },
  rejected: { label: "Rejeté", color: C.red, icon: <X size={12} />, bg: "rgba(244,56,96,0.12)" },
  executed: { label: "Exécuté", color: "#60a5fa", icon: <TrendingUp size={12} />, bg: "rgba(96,165,250,0.12)" },
};

const DAILY_LIMIT = 50_000_000;
const DAILY_USED = 8_749_000;
const APPROVAL_THRESHOLD = 5_000_000;

function formatXOF(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)} M XOF`;
  if (n >= 1_000) return `${(n / 1000).toFixed(0)} K XOF`;
  return `${n.toLocaleString("fr-FR")} XOF`;
}

export function OrderTicketPanel() {
  const { isOrderPanelOpen, orderDraft, closeOrderPanel, addOrder } = useTerminal();

  const defaultAsset = ASSETS.find((a) => a.code === orderDraft?.assetCode) ?? ASSETS[0];

  const [selectedAsset, setSelectedAsset] = useState(defaultAsset);
  const [action, setAction] = useState<"BUY" | "SELL">("BUY");
  const [orderType, setOrderType] = useState<"MARKET" | "LIMIT" | "STOP">("LIMIT");
  const [quantity, setQuantity] = useState<string>("100");
  const [limitPrice, setLimitPrice] = useState<string>(String(defaultAsset.price));
  const [status, setStatus] = useState<OrderStatus>("draft");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync asset when draft changes
  useEffect(() => {
    if (orderDraft?.assetCode) {
      const found = ASSETS.find((a) => a.code === orderDraft.assetCode);
      if (found) {
        setSelectedAsset(found);
        setLimitPrice(String(found.price));
        setStatus("draft");
      }
    }
  }, [orderDraft]);

  const qty = parseInt(quantity) || 0;
  const price = parseFloat(limitPrice) || selectedAsset.price;
  const estimatedValue = qty * price;
  const dailyRemaining = DAILY_LIMIT - DAILY_USED;
  const newDailyUsed = DAILY_USED + estimatedValue;
  const dailyPct = Math.min(100, (newDailyUsed / DAILY_LIMIT) * 100);
  const requiresApproval = estimatedValue >= APPROVAL_THRESHOLD;
  const exceedsLimit = estimatedValue > dailyRemaining;

  const handleSubmit = () => {
    if (exceedsLimit || isSubmitting || status !== "draft") return;
    setIsSubmitting(true);
    const orderId = `ORD-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;

    setTimeout(() => {
      setStatus("submitted");
      addOrder({
        id: orderId,
        assetCode: selectedAsset.code,
        assetName: selectedAsset.name,
        isin: selectedAsset.isin,
        market: selectedAsset.market,
        action,
        orderType,
        quantity: qty,
        price,
        estimatedValue,
        status: "submitted",
        createdAt: new Date().toLocaleDateString("fr-FR"),
        updatedAt: new Date().toLocaleDateString("fr-FR"),
        controller: "Diallo Mamadou",
        notes,
      });

      setTimeout(() => {
        setStatus("under_review");
        setIsSubmitting(false);
      }, 2200);
    }, 1500);
  };

  const handleReset = () => {
    setStatus("draft");
    setQuantity("100");
    setLimitPrice(String(selectedAsset.price));
    setNotes("");
    setIsSubmitting(false);
  };

  if (!isOrderPanelOpen) return null;

  const isActionable = status === "draft";
  const statusCfg = STATUS_CONFIG[status];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeOrderPanel}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 1, 23,0.6)",
          zIndex: 200,
          backdropFilter: "blur(1px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: 440,
          height: "100vh",
          background: C.surface,
          borderLeft: `1px solid ${C.border}`,
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "-8px 0 48px rgba(0,0,0,0.5)",
        }}
      >
        {/* Gold top accent */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${C.gold} 0%, ${C.accent} 60%, transparent 100%)`, flexShrink: 0 }} />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 16px",
            borderBottom: `1px solid ${C.border}`,
            background: "rgba(0, 1, 23,0.5)",
            flexShrink: 0,
            gap: 10,
          }}
        >
          <div style={{ width: 3, height: 16, borderRadius: 2, background: C.gold, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.text, letterSpacing: "0.04em" }}>
              PRÉPARER UN ORDRE
            </div>
            <div style={{ fontSize: 8.5, color: C.muted, marginTop: 1 }}>
              BRVM · UMOA-Titres · Ordre institutionnel contrôlé
            </div>
          </div>

          {/* Status pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "3px 9px",
              borderRadius: 4,
              background: statusCfg.bg,
              border: `1px solid ${statusCfg.color}30`,
            }}
          >
            <span style={{ color: statusCfg.color }}>{statusCfg.icon}</span>
            <span style={{ fontSize: 8.5, fontWeight: 700, color: statusCfg.color }}>{statusCfg.label}</span>
          </div>

          <button
            onClick={closeOrderPanel}
            style={{
              width: 28,
              height: 28,
              borderRadius: 5,
              background: "transparent",
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: C.muted,
              flexShrink: 0,
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflow: "auto", minHeight: 0, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Asset selector */}
          <Section title="Instrument" icon={<TrendingUp size={11} />}>
            <div
              style={{
                background: C.elevated,
                border: `1px solid ${C.border}`,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {ASSETS.map((asset) => {
                const isSelected = asset.code === selectedAsset.code;
                return (
                  <button
                    key={asset.code}
                    onClick={() => {
                      if (!isActionable) return;
                      setSelectedAsset(asset);
                      setLimitPrice(String(asset.price));
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 10px",
                      background: isSelected ? "rgba(214, 182, 141,0.1)" : "transparent",
                      border: "none",
                      borderBottom: `1px solid rgba(44, 61, 127,0.12)`,
                      cursor: isActionable ? "pointer" : "default",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, color: isSelected ? C.accent : C.text }}>
                          {asset.code}
                        </span>
                        <span style={{ fontSize: 7.5, color: C.muted, padding: "0 4px", background: "rgba(44, 61, 127,0.2)", borderRadius: 2 }}>
                          {asset.market}
                        </span>
                        <span style={{ fontSize: 7.5, color: C.muted }}>· {asset.sector}</span>
                      </div>
                      <div style={{ fontSize: 8.5, color: C.muted, marginTop: 1 }}>{asset.isin} · {asset.name}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.text, fontVariantNumeric: "tabular-nums" }}>
                        {asset.price.toLocaleString("fr-FR")}
                      </div>
                      <div style={{ fontSize: 7.5, color: C.muted }}>XOF</div>
                    </div>
                    {isSelected && <ChevronRight size={10} color={C.accent} style={{ flexShrink: 0 }} />}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Action */}
          <Section title="Direction" icon={<TrendingUp size={11} />}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {(["BUY", "SELL"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => isActionable && setAction(a)}
                  style={{
                    padding: "10px",
                    borderRadius: 6,
                    border: `2px solid ${action === a ? (a === "BUY" ? C.green : C.red) + "60" : C.border}`,
                    background: action === a ? (a === "BUY" ? "rgba(16,200,122,0.12)" : "rgba(244,56,96,0.12)") : C.elevated,
                    color: action === a ? (a === "BUY" ? C.green : C.red) : C.muted,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: isActionable ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    letterSpacing: "0.06em",
                  }}
                >
                  {a === "BUY" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {a === "BUY" ? "ACHAT" : "VENTE"}
                </button>
              ))}
            </div>
          </Section>

          {/* Order type */}
          <Section title="Type d'Ordre">
            <div style={{ display: "flex", gap: 6 }}>
              {(["MARKET", "LIMIT", "STOP"] as const).map((t) => {
                const labels = { MARKET: "Au Marché", LIMIT: "À Cours Limité", STOP: "Stop" };
                return (
                  <button
                    key={t}
                    onClick={() => isActionable && setOrderType(t)}
                    style={{
                      flex: 1,
                      padding: "7px 8px",
                      borderRadius: 5,
                      border: `1px solid ${orderType === t ? C.accent + "50" : C.border}`,
                      background: orderType === t ? "rgba(214, 182, 141,0.1)" : C.elevated,
                      color: orderType === t ? C.accent : C.muted,
                      fontSize: 9,
                      fontWeight: orderType === t ? 700 : 500,
                      cursor: isActionable ? "pointer" : "default",
                    }}
                  >
                    {labels[t]}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* Quantity & Price */}
          <Section title="Paramètres d'Exécution">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div>
                <label style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                  Quantité (titres)
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => isActionable && setQuantity(e.target.value)}
                  disabled={!isActionable}
                  style={{
                    width: "100%",
                    height: 36,
                    background: "rgba(0, 1, 23,0.6)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 5,
                    color: C.text,
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "0 10px",
                    outline: "none",
                    fontVariantNumeric: "tabular-nums",
                    boxSizing: "border-box",
                    opacity: isActionable ? 1 : 0.6,
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: 8, fontWeight: 700, color: C.muted, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>
                  {orderType === "MARKET" ? "Cours de référence (XOF)" : "Cours limite (XOF)"}
                </label>
                <input
                  type="number"
                  value={limitPrice}
                  onChange={(e) => isActionable && setLimitPrice(e.target.value)}
                  disabled={!isActionable || orderType === "MARKET"}
                  style={{
                    width: "100%",
                    height: 36,
                    background: "rgba(0, 1, 23,0.6)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 5,
                    color: C.text,
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "0 10px",
                    outline: "none",
                    fontVariantNumeric: "tabular-nums",
                    boxSizing: "border-box",
                    opacity: (!isActionable || orderType === "MARKET") ? 0.5 : 1,
                  }}
                />
              </div>
            </div>

            {/* Estimated value */}
            <div
              style={{
                marginTop: 8,
                padding: "10px 12px",
                background: exceedsLimit ? "rgba(244,56,96,0.08)" : action === "BUY" ? "rgba(16,200,122,0.07)" : "rgba(244,56,96,0.07)",
                border: `1px solid ${exceedsLimit ? C.red : action === "BUY" ? C.green : C.red}28`,
                borderRadius: 5,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontSize: 9, color: C.muted }}>Valeur estimée de l'ordre :</span>
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: exceedsLimit ? C.red : C.text,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatXOF(estimatedValue)}
                </span>
              </div>
              <div style={{ fontSize: 8, color: C.muted, marginTop: 2 }}>
                {qty.toLocaleString("fr-FR")} titres × {price.toLocaleString("fr-FR")} XOF
              </div>
            </div>
          </Section>

          {/* Notes */}
          <Section title="Commentaire / Justification">
            <textarea
              value={notes}
              onChange={(e) => isActionable && setNotes(e.target.value)}
              disabled={!isActionable}
              placeholder="Motif stratégique, référence mandat, instructions particulières…"
              style={{
                width: "100%",
                height: 64,
                background: "rgba(0, 1, 23,0.6)",
                border: `1px solid ${C.border}`,
                borderRadius: 5,
                color: C.dim,
                fontSize: 10,
                padding: "8px 10px",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                opacity: isActionable ? 1 : 0.6,
              }}
            />
          </Section>

          {/* Compliance section */}
          <Section title="Contrôle & Conformité" icon={<ShieldCheck size={11} />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {/* Daily limit bar */}
              <div
                style={{
                  padding: "8px 10px",
                  background: C.elevated,
                  border: `1px solid ${C.border}`,
                  borderRadius: 5,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 8.5, color: C.dim }}>Limite journalière utilisée</span>
                  <span style={{ fontSize: 8.5, fontWeight: 700, color: exceedsLimit ? C.red : C.gold, fontVariantNumeric: "tabular-nums" }}>
                    {formatXOF(newDailyUsed)} / {formatXOF(DAILY_LIMIT)}
                  </span>
                </div>
                <div style={{ height: 5, background: "rgba(44, 61, 127,0.2)", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${dailyPct}%`,
                      background: dailyPct > 90 ? C.red : dailyPct > 70 ? C.orange : C.green,
                      borderRadius: 3,
                      transition: "width 0.3s",
                    }}
                  />
                </div>
                <div style={{ fontSize: 7.5, color: C.muted, marginTop: 3 }}>
                  Restant : {formatXOF(Math.max(0, dailyRemaining - estimatedValue))}
                </div>
              </div>

              {/* Compliance checks */}
              <ComplianceRow
                ok={!exceedsLimit}
                label="Limite journalière respectée"
                detail={exceedsLimit ? "Montant dépasse la limite disponible" : "Plafond non atteint"}
              />
              <ComplianceRow
                ok={qty > 0}
                label="Quantité valide"
                detail={qty > 0 ? `${qty} titres` : "Quantité invalide"}
              />
              <ComplianceRow
                ok={price > 0}
                label="Prix cohérent"
                detail={price > 0 ? `${price.toLocaleString("fr-FR")} XOF` : "Prix invalide"}
              />

              {/* Approval required */}
              {requiresApproval && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 10px",
                    background: "rgba(244,185,66,0.08)",
                    border: "1px solid rgba(244,185,66,0.25)",
                    borderRadius: 5,
                  }}
                >
                  <AlertTriangle size={12} color={C.gold} />
                  <div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: C.gold }}>Validation contrôleur requise</div>
                    <div style={{ fontSize: 8, color: C.muted }}>
                      Seuil : {formatXOF(APPROVAL_THRESHOLD)} · Contrôleur : Diallo Mamadou
                    </div>
                  </div>
                </div>
              )}

              {/* Controller */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 5 }}>
                <User size={10} color={C.muted} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 8.5, color: C.dim }}>Contrôleur désigné</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: C.text }}>Diallo Mamadou · Desk Trading BRVM</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
                  <span style={{ fontSize: 7.5, color: C.green }}>Disponible</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Status timeline (shown after submit) */}
          {status !== "draft" && (
            <Section title="Suivi de l'Ordre" icon={<Clock size={11} />}>
              <StatusTimeline status={status} orderId={`ORD-2026-${Date.now().toString().slice(-4)}`} />
            </Section>
          )}
        </div>

        {/* Footer: Actions */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: `1px solid ${C.border}`,
            background: "rgba(0, 1, 23,0.5)",
            flexShrink: 0,
          }}
        >
          {status === "draft" ? (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleReset}
                style={{
                  padding: "9px 16px",
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.dim,
                  fontSize: 10,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Réinitialiser
              </button>
              <button
                onClick={handleSubmit}
                disabled={exceedsLimit || qty <= 0 || price <= 0}
                style={{
                  flex: 1,
                  padding: "9px 16px",
                  borderRadius: 6,
                  border: "none",
                  background:
                    exceedsLimit || qty <= 0 || price <= 0
                      ? "rgba(44, 61, 127,0.2)"
                      : `linear-gradient(90deg, ${action === "BUY" ? "#10c87a" : C.red} 0%, ${action === "BUY" ? "#0aa560" : "#c42050"} 100%)`,
                  color: exceedsLimit || qty <= 0 || price <= 0 ? C.muted : "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  cursor: exceedsLimit || qty <= 0 || price <= 0 ? "not-allowed" : "pointer",
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ opacity: 0.7 }}>Envoi en cours…</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    {action === "BUY" ? "Soumettre Ordre Achat" : "Soumettre Ordre Vente"}
                    {requiresApproval && <Lock size={10} style={{ opacity: 0.7 }} />}
                  </>
                )}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: "9px 16px",
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.accent,
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Nouvel Ordre
              </button>
              <button
                onClick={closeOrderPanel}
                style={{
                  flex: 1,
                  padding: "9px 16px",
                  borderRadius: 6,
                  border: "none",
                  background: "rgba(214, 182, 141,0.12)",
                  color: C.accent,
                  fontSize: 10,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Fermer
              </button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ fontSize: 7.5, color: C.muted }}>
              <Lock size={8} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
              Ordre soumis au circuit de validation Bloomfield · Confidentiel
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
        {icon && <span style={{ color: C.accent }}>{icon}</span>}
        <span style={{ fontSize: 8.5, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function ComplianceRow({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 8px",
        background: "rgba(0, 1, 23,0.4)",
        border: `1px solid ${C.border}`,
        borderRadius: 4,
      }}
    >
      {ok ? <CheckCircle2 size={11} color={C.green} /> : <AlertTriangle size={11} color={C.red} />}
      <span style={{ fontSize: 9, color: ok ? C.dim : C.red, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 8.5, color: ok ? C.green : C.red, fontWeight: 600 }}>{detail}</span>
    </div>
  );
}

function StatusTimeline({ status, orderId }: { status: OrderStatus; orderId: string }) {
  const steps = [
    { key: "draft", label: "Brouillon" },
    { key: "submitted", label: "Soumis" },
    { key: "under_review", label: "Validation" },
    { key: "approved", label: "Approuvé" },
    { key: "executed", label: "Exécuté" },
  ];

  const currentIdx = steps.findIndex((s) => s.key === status);

  return (
    <div style={{ background: C.elevated, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
        <Info size={10} color={C.muted} />
        <span style={{ fontSize: 8, color: C.muted }}>Référence : {orderId}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {steps.map((step, i) => {
          const done = i <= currentIdx;
          const active = i === currentIdx;
          const color = done ? C.accent : C.muted;
          return (
            <div key={step.key} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <div
                  style={{
                    width: active ? 14 : 10,
                    height: active ? 14 : 10,
                    borderRadius: "50%",
                    background: done ? C.accent : "rgba(44, 61, 127,0.3)",
                    border: active ? `2px solid ${C.accent}40` : "none",
                    boxShadow: active ? `0 0 8px ${C.accent}60` : "none",
                    transition: "all 0.3s",
                  }}
                />
                <span style={{ fontSize: 7, color, whiteSpace: "nowrap", fontWeight: active ? 700 : 400 }}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: 1.5,
                    background: i < currentIdx ? C.accent : "rgba(44, 61, 127,0.2)",
                    margin: "0 3px",
                    marginBottom: 12,
                    transition: "background 0.3s",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {status === "under_review" && (
        <div style={{ marginTop: 8, padding: "6px 8px", background: "rgba(244,185,66,0.08)", border: "1px solid rgba(244,185,66,0.2)", borderRadius: 4 }}>
          <div style={{ fontSize: 8.5, color: C.gold, fontWeight: 700 }}>⏳ En cours de validation par Diallo Mamadou</div>
          <div style={{ fontSize: 8, color: C.muted }}>Délai estimé : 15–30 min · Heure limite : 16:00 GMT</div>
        </div>
      )}
    </div>
  );
}
