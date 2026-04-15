import { ReactNode, createContext, useContext } from "react";
import { RefreshCw, Maximize2, MoreHorizontal } from "lucide-react";

/**
 * PanelContext lets a host (e.g. the dashboard grid) wire the existing
 * WidgetShell header buttons — refresh, maximize, more — without each
 * widget having to know about it. All callbacks are optional; when a
 * callback is absent the corresponding button simply stays inert.
 *
 * `dragHandleClass` is appended to the header area so the host can use
 * it as the `draggableHandle` selector for react-grid-layout.
 */
interface PanelContextValue {
  onRefresh?: () => void;
  onMaximize?: () => void;
  onMore?: () => void;
  dragHandleClass?: string;
  isMaximized?: boolean;
}

export const PanelContext = createContext<PanelContextValue>({});

interface WidgetShellProps {
  title: string;
  subtitle?: string;
  lastUpdate?: string;
  actions?: ReactNode;
  children: ReactNode;
  accentColor?: string;
  noPadding?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const C = {
  surface: "#000430",
  border: "rgba(44, 61, 127,0.32)",
  accent: "#d6b68d",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
};

export function WidgetShell({
  title,
  subtitle,
  lastUpdate,
  actions,
  children,
  accentColor = C.accent,
  noPadding = false,
  style,
}: WidgetShellProps) {
  const panel = useContext(PanelContext);
  const headerClass = panel.dragHandleClass ?? "";

  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "100%",
        ...style,
      }}
    >
      {/* Header */}
      <div
        className={headerClass}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 12px",
          borderBottom: `1px solid ${C.border}`,
          flexShrink: 0,
          background: "rgba(0, 4, 48,0.4)",
          cursor: panel.dragHandleClass ? "grab" : "default",
          userSelect: "none",
        }}
        title={panel.dragHandleClass ? `Glisser pour déplacer · ${title}` : undefined}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <div
            style={{
              width: 2,
              height: 14,
              borderRadius: 2,
              background: accentColor,
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: C.text,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1.2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 9, color: C.muted, marginTop: 1, letterSpacing: "0.02em" }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {lastUpdate && (
            <span style={{ fontSize: 9, color: C.muted, letterSpacing: "0.02em" }}>
              {lastUpdate}
            </span>
          )}
          {actions}
          <IconBtn
            onClick={panel.onRefresh}
            disabled={!panel.onRefresh}
            title="Rafraîchir"
          >
            <RefreshCw size={10} />
          </IconBtn>
          <IconBtn
            onClick={panel.onMaximize}
            disabled={!panel.onMaximize}
            title={panel.isMaximized ? "Réduire" : "Agrandir"}
          >
            <Maximize2 size={10} />
          </IconBtn>
          <IconBtn
            onClick={panel.onMore}
            disabled={!panel.onMore}
            title="Options"
          >
            <MoreHorizontal size={10} />
          </IconBtn>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: noPadding ? 0 : "10px 12px",
          minHeight: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface IconBtnProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
}

function IconBtn({ children, onClick, disabled, title }: IconBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        width: 22,
        height: 22,
        borderRadius: 4,
        background: "transparent",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        color: C.muted,
        opacity: disabled ? 0.35 : 1,
        transition: "color 0.15s, background 0.15s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.color = C.accent;
        e.currentTarget.style.background = "rgba(214, 182, 141,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = C.muted;
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </button>
  );
}
