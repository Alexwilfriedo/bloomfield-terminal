import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Responsive, useContainerWidth, type Layout } from "react-grid-layout";
import { X } from "lucide-react";

import { PanelContext } from "../widgets/WidgetShell";

/* ─────────────────────────────────────────────────────────────
 * Types
 * ───────────────────────────────────────────────────────────── */

export type Breakpoint = "lg" | "md" | "sm" | "xs" | "xxs";
export type LayoutMap = Record<Breakpoint, Layout[]>;

export interface WidgetDef {
  title: string;
  element: ReactNode;
}

export interface WidgetGridProps {
  /** Unique localStorage key — must be stable per page. Bump to force reset. */
  storageKey: string;
  /** Widget registry keyed by layout `i`. */
  widgets: Record<string, WidgetDef>;
  /** Large-screen layout, used as the source for responsive stacks. */
  defaultLayout: Layout[];
  /** Breakpoint → cols. Defaults tuned for financial dashboards. */
  cols?: Record<Breakpoint, number>;
  /** Breakpoint → min width. */
  breakpoints?: Record<Breakpoint, number>;
  /** Grid row height in px. Default 40. */
  rowHeight?: number;
}

/* ─────────────────────────────────────────────────────────────
 * Defaults
 * ───────────────────────────────────────────────────────────── */

const DRAG_HANDLE_CLASS = "bt-drag-handle";
const DRAGGABLE_HANDLE_SELECTOR = `.${DRAG_HANDLE_CLASS}`;
const DRAGGABLE_CANCEL_SELECTOR = "button";
const RESIZE_HANDLES: Array<"s" | "e" | "se"> = ["s", "e", "se"];
const MARGIN: [number, number] = [8, 8];
const CONTAINER_PADDING: [number, number] = [0, 0];
const DEFAULT_ROW_HEIGHT = 40;
const BP_KEYS: Breakpoint[] = ["lg", "md", "sm", "xs", "xxs"];

const DEFAULT_BREAKPOINTS: Record<Breakpoint, number> = {
  lg: 1400,
  md: 1100,
  sm: 850,
  xs: 600,
  xxs: 0,
};

const DEFAULT_COLS: Record<Breakpoint, number> = {
  lg: 12,
  md: 12,
  sm: 8,
  xs: 4,
  xxs: 2,
};

/* ─────────────────────────────────────────────────────────────
 * Pure helpers
 * ───────────────────────────────────────────────────────────── */

function rectsCollide(a: Layout, b: Layout): boolean {
  if (a.i === b.i) return false;
  if (a.x + a.w <= b.x) return false;
  if (b.x + b.w <= a.x) return false;
  if (a.y + a.h <= b.y) return false;
  if (b.y + b.h <= a.y) return false;
  return true;
}

function clampItem(item: Layout, cols: number): Layout {
  const w = Math.min(item.w, cols);
  return {
    ...item,
    w,
    x: Math.max(0, Math.min(item.x, cols - w)),
    y: Math.max(0, item.y),
  };
}

function packAround(
  items: Layout[],
  placed: Layout[],
  cols: number
): Layout[] {
  const MAX_ROWS = 500;
  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);

  for (const raw of sorted) {
    const item = clampItem(raw, cols);
    let positioned = false;

    for (let y = 0; y < MAX_ROWS && !positioned; y++) {
      for (let x = 0; x <= cols - item.w; x++) {
        const candidate: Layout = { ...item, x, y };
        if (placed.every((p) => !rectsCollide(p, candidate))) {
          placed.push(candidate);
          positioned = true;
          break;
        }
      }
    }
    if (!positioned) placed.push(item);
  }
  return placed;
}

/**
 * 2D compaction — packs items left→right, top→bottom filling every gap.
 *
 * When `anchorId` is provided (the widget the user just dropped), that
 * item is pinned to its new position and everything else is packed
 * around it in reading order. This preserves user intent: you drop a
 * card where you want it, the others flow to fill the remaining gaps.
 *
 * Without an anchor (e.g. a pure re-compact), items are packed in
 * reading order from (0, 0).
 *
 * Idempotent, deterministic, O(n² · cols · rows).
 */
function compact2D(
  layout: Layout[],
  cols: number,
  anchorId: string | null = null
): Layout[] {
  if (!anchorId) {
    return packAround(layout, [], cols);
  }

  const anchor = layout.find((i) => i.i === anchorId);
  if (!anchor) return packAround(layout, [], cols);

  const anchorPlaced = clampItem(anchor, cols);
  const others = layout.filter((i) => i.i !== anchorId);
  return packAround(others, [anchorPlaced], cols);
}

function layoutSignature(layout: Layout[]): string {
  return layout
    .map((i) => `${i.i}:${i.x},${i.y},${i.w},${i.h}`)
    .sort()
    .join("|");
}

function sameLayout(a: Layout[] | undefined, b: Layout[] | undefined): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return layoutSignature(a) === layoutSignature(b);
}

function stackedLayout(base: Layout[], cols: number): Layout[] {
  return base.map((item, idx) => ({
    ...item,
    x: 0,
    y: idx * 7,
    w: cols,
    h: item.h,
  }));
}

function buildDefaultLayouts(
  lg: Layout[],
  cols: Record<Breakpoint, number>
): LayoutMap {
  return {
    lg,
    md: lg,
    sm: stackedLayout(lg, cols.sm),
    xs: stackedLayout(lg, cols.xs),
    xxs: stackedLayout(lg, cols.xxs),
  };
}

/* ─────────────────────────────────────────────────────────────
 * Persistence
 * ───────────────────────────────────────────────────────────── */

function loadLayouts(storageKey: string, fallback: LayoutMap): LayoutMap {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<LayoutMap>;
    return {
      lg: parsed.lg ?? fallback.lg,
      md: parsed.md ?? fallback.md,
      sm: parsed.sm ?? fallback.sm,
      xs: parsed.xs ?? fallback.xs,
      xxs: parsed.xxs ?? fallback.xxs,
    };
  } catch {
    return fallback;
  }
}

function saveLayouts(storageKey: string, layouts: LayoutMap) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(layouts));
  } catch {
    // quota / private mode — ignore
  }
}

export function resetWidgetGridLayout(storageKey: string) {
  try {
    localStorage.removeItem(storageKey);
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") window.location.reload();
}

/* ─────────────────────────────────────────────────────────────
 * Component
 * ───────────────────────────────────────────────────────────── */

export function WidgetGrid({
  storageKey,
  widgets,
  defaultLayout,
  cols = DEFAULT_COLS,
  breakpoints = DEFAULT_BREAKPOINTS,
  rowHeight = DEFAULT_ROW_HEIGHT,
}: WidgetGridProps) {
  const { width, containerRef, mounted } = useContainerWidth();

  const fallbackLayouts = useMemo(
    () => buildDefaultLayouts(defaultLayout, cols),
    [defaultLayout, cols]
  );

  const [layouts, setLayouts] = useState<LayoutMap>(() =>
    loadLayouts(storageKey, fallbackLayouts)
  );
  const [zoomedKey, setZoomedKey] = useState<string | null>(null);

  const currentBreakpointRef = useRef<Breakpoint>("lg");

  useEffect(() => {
    saveLayouts(storageKey, layouts);
  }, [layouts, storageKey]);

  const onBreakpointChange = useCallback((bp: string) => {
    currentBreakpointRef.current = bp as Breakpoint;
  }, []);

  const commitLayout = useCallback(
    (layout: Layout[], anchorId: string | null) => {
      const bp = currentBreakpointRef.current;
      const compacted = compact2D(layout, cols[bp], anchorId);
      setLayouts((prev) => {
        if (sameLayout(prev[bp], compacted)) return prev;
        return { ...prev, [bp]: compacted };
      });
    },
    [cols]
  );

  /**
   * RGL signature: (layout, oldItem, newItem, placeholder, event, node)
   * We only care about `layout` (final positions) and `newItem.i`
   * (the id of the dragged/resized widget, used as anchor).
   */
  const onDragStop = useCallback(
    (layout: Layout[], _old: Layout, newItem: Layout) => {
      commitLayout(layout, newItem?.i ?? null);
    },
    [commitLayout]
  );

  const onResizeStop = useCallback(
    (layout: Layout[], _old: Layout, newItem: Layout) => {
      commitLayout(layout, newItem?.i ?? null);
    },
    [commitLayout]
  );

  // ESC to exit fullscreen
  useEffect(() => {
    if (!zoomedKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomedKey]);

  const children = useMemo(
    () =>
      Object.entries(widgets).map(([key, { element }]) => (
        <div key={key}>
          <PanelContext.Provider
            value={{
              dragHandleClass: DRAG_HANDLE_CLASS,
              onMaximize: () => setZoomedKey(key),
              isMaximized: false,
            }}
          >
            {element}
          </PanelContext.Provider>
        </div>
      )),
    [widgets]
  );

  return (
    <>
      <div ref={containerRef} style={{ flex: 1, minHeight: 0, width: "100%" }}>
        {mounted && width > 0 && (
          <Responsive
            width={width}
            layouts={layouts}
            breakpoints={breakpoints}
            cols={cols}
            rowHeight={rowHeight}
            margin={MARGIN}
            containerPadding={CONTAINER_PADDING}
            draggableHandle={DRAGGABLE_HANDLE_SELECTOR}
            draggableCancel={DRAGGABLE_CANCEL_SELECTOR}
            resizeHandles={RESIZE_HANDLES}
            compactType={null}
            preventCollision={false}
            onBreakpointChange={onBreakpointChange}
            onDragStop={onDragStop}
            onResizeStop={onResizeStop}
          >
            {children}
          </Responsive>
        )}
      </div>

      {zoomedKey && widgets[zoomedKey] && (
        <ZoomOverlay
          title={widgets[zoomedKey].title}
          onClose={() => setZoomedKey(null)}
        >
          <PanelContext.Provider
            value={{
              onMaximize: () => setZoomedKey(null),
              isMaximized: true,
            }}
          >
            {widgets[zoomedKey].element}
          </PanelContext.Provider>
        </ZoomOverlay>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Zoom overlay
 * ───────────────────────────────────────────────────────────── */

function ZoomOverlay({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const accent = "#d6b68d";
  const text = "#ddeaf8";
  const dim = "#6b96b8";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — plein écran`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 1, 23,0.92)",
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
          color: text,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: dim,
          }}
        >
          {title} · Plein écran
        </div>
        <button
          type="button"
          onClick={onClose}
          title="Fermer (Échap)"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            background: "rgba(214, 182, 141,0.08)",
            border: `1px solid ${accent}`,
            borderRadius: 4,
            color: accent,
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
      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        <div style={{ flex: 1, minWidth: 0, minHeight: 0 }}>{children}</div>
      </div>
    </div>
  );
}
