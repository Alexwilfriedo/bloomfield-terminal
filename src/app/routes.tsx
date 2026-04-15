import { Suspense, lazy, Component, type ReactNode } from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { DashboardPage } from "./pages/DashboardPage";
import { MarketsPage } from "./pages/MarketsPage";
import { PresentationPage } from "./pages/PresentationPage";

/* ─── Loading / Error fallbacks ─────────────────────────────────────────── */

function PageFallback({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "#6b96b8",
        fontSize: 13,
      }}
    >
      {label}
    </div>
  );
}

function PageError({ label, error }: { label: string; error?: unknown }) {
  const msg = error instanceof Error ? error.message : String(error ?? "");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "#f43860",
        fontSize: 12,
        gap: 6,
      }}
    >
      <div style={{ fontWeight: 700 }}>{label} — Erreur de chargement</div>
      {msg && (
        <div style={{ color: "#6b96b8", fontSize: 10, maxWidth: 480, textAlign: "center" }}>
          {msg}
        </div>
      )}
    </div>
  );
}

/* ─── Class-based error boundary to catch lazy-load / render errors ──────── */

interface EBState {
  error: unknown;
}

class PageErrorBoundary extends Component<
  { children: ReactNode; label: string },
  EBState
> {
  constructor(props: { children: ReactNode; label: string }) {
    super(props);
    this.state = { error: undefined };
  }
  static getDerivedStateFromError(error: unknown) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <PageError label={this.props.label} error={this.state.error} />;
    }
    return this.props.children;
  }
}

/* ─── Lazy page components ───────────────────────────────────────────────── */

const LazyMacroPage = lazy(() =>
  import("./pages/MacroPage").then((m) => ({ default: m.MacroPage }))
);

const LazyAnalysisPage = lazy(() =>
  import("./pages/AnalysisPage")
);

const LazyInsightsPage = lazy(() =>
  import("./pages/InsightsPage")
);

const LazyWorkspacesPage = lazy(() =>
  import("./pages/WorkspacesPage")
);

/* ─── Route wrapper components ───────────────────────────────────────────── */

function MacroPageRoute() {
  return (
    <PageErrorBoundary label="Intelligence Macro">
      <Suspense fallback={<PageFallback label="Chargement Intelligence Macro…" />}>
        <LazyMacroPage />
      </Suspense>
    </PageErrorBoundary>
  );
}

function AnalysisPageRoute() {
  return (
    <PageErrorBoundary label="Analyse Financière">
      <Suspense fallback={<PageFallback label="Chargement Analyse Financière…" />}>
        <LazyAnalysisPage />
      </Suspense>
    </PageErrorBoundary>
  );
}

function InsightsPageRoute() {
  return (
    <PageErrorBoundary label="Insights & Éducation">
      <Suspense fallback={<PageFallback label="Chargement Insights & Éducation…" />}>
        <LazyInsightsPage />
      </Suspense>
    </PageErrorBoundary>
  );
}

function WorkspacesPageRoute() {
  return (
    <PageErrorBoundary label="Workspaces">
      <Suspense fallback={<PageFallback label="Chargement Workspaces…" />}>
        <LazyWorkspacesPage />
      </Suspense>
    </PageErrorBoundary>
  );
}

/* ─── Router ─────────────────────────────────────────────────────────────── */

export const router = createBrowserRouter(
  [
    {
      path: "/presentation",
      Component: PresentationPage,
    },
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: DashboardPage },
        { path: "markets", Component: MarketsPage },
        { path: "macro", Component: MacroPageRoute },
        { path: "analysis", Component: AnalysisPageRoute },
        { path: "insights", Component: InsightsPageRoute },
        { path: "workspaces", Component: WorkspacesPageRoute },
      ],
    },
  ]
);