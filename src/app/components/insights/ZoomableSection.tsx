import { useEffect, useState, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";

/**
 * Lightweight zoom wrapper for Insights sections that are NOT managed
 * by <WidgetGrid>. Adds a floating "Agrandir" button that appears in
 * the top-right corner on hover and opens the section in a fullscreen
 * modal overlay (ESC to close). Reuses the same visual language as
 * WidgetGrid's ZoomOverlay so the UX stays consistent across pages.
 */

const C = {
  accent: "#d6b68d",
  text: "#ddeaf8",
  dim: "#6b96b8",
  border: "rgba(44, 61, 127, 0.55)",
};

interface ZoomableSectionProps {
  title: string;
  children: ReactNode;
}

export function ZoomableSection({ title, children }: ZoomableSectionProps) {
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
            background: "rgba(0, 1, 23, 0.85)",
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
            e.currentTarget.style.background = "rgba(214, 182, 141, 0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 1, 23, 0.85)";
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
            background: "rgba(0, 1, 23, 0.92)",
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
                fontSize: 11,
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
                background: "rgba(214, 182, 141, 0.1)",
                border: `1px solid ${C.accent}`,
                borderRadius: 4,
                color: C.accent,
                fontSize: 10,
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
