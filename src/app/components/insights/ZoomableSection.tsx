import { useEffect, useState, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";
import { useThemeColors } from "../../hooks/useThemeColors";

/**
 * Lightweight zoom wrapper for Insights sections that are NOT managed
 * by <WidgetGrid>. Adds a floating "Agrandir" button that appears in
 * the top-right corner on hover and opens the section in a fullscreen
 * modal overlay (ESC to close). Reuses the same visual language as
 * WidgetGrid's ZoomOverlay so the UX stays consistent across pages.
 */

interface ZoomableSectionProps {
  title: string;
  children: ReactNode;
}

export function ZoomableSection({ title, children }: ZoomableSectionProps) {
  const C = useThemeColors();
  const [zoomed, setZoomed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomed]);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: "relative" }}
      >
        <button
          type="button"
          onClick={() => setZoomed(true)}
          title={`Agrandir · ${title}`}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 20,
            width: 30,
            height: 30,
            borderRadius: 6,
            background: "var(--bt-overlay-85)",
            border: `1px solid ${C.border}`,
            color: C.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-4px)",
            transition: "opacity 0.15s ease, transform 0.15s ease, background 0.15s ease",
            backdropFilter: "blur(8px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bt-accent-a18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bt-overlay-85)";
          }}
        >
          <Maximize2 size={14} strokeWidth={2} />
        </button>
        {children}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} — plein écran`}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "var(--bt-overlay-92)",
            backdropFilter: "blur(6px)",
            padding: 24,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
              color: C.text,
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: C.dim,
              }}
            >
              {title} · Plein écran
            </div>
            <button
              type="button"
              onClick={() => setZoomed(false)}
              title="Fermer (Échap)"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 10px",
                background: "var(--bt-accent-a10)",
                border: `1px solid ${C.accent}`,
                borderRadius: 4,
                color: C.accent,
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              <X size={12} />
              Fermer · Échap
            </button>
          </div>
          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}
