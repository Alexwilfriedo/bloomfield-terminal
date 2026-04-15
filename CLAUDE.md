# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bloomfield Terminal Dashboard — a Figma Make export. Single-page React app exported from https://www.figma.com/design/nb1RpH1E2lLvqYamzykZmL/Bloomfield-Terminal-Dashboard. UI strings are in **French**.

**Not a Next.js project.** `src/app/` is just an app folder; routing is done with `react-router` v7, bundled by Vite. Ignore any tooling hint that assumes Next.js App Router.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build via `vite build`
- No test, lint, or typecheck scripts are defined. To run a type check ad-hoc: `npx tsc --noEmit` (no `tsconfig.json` is checked in, so this may need one). Confirm with the user before adding tooling.

## Architecture

Entry: `src/main.tsx` → `src/app/App.tsx` wraps the tree in `ThemeProvider` (from `@figma/astraui`) + `TerminalProvider` (app-wide terminal state in `src/app/context/TerminalContext.tsx`) + `RouterProvider`.

Router (`src/app/routes.tsx`) uses `createBrowserRouter` with:
- `/presentation` — standalone `PresentationPage` (no shell)
- `/` — `Root` layout wrapping `DashboardPage` (index), `markets`, and lazy-loaded `macro`, `analysis`, `insights`, `workspaces`

Lazy routes are wrapped in a local `PageErrorBoundary` + `Suspense` with French fallback/error copy. When adding a new heavy page, follow the same `lazy(...) + PageErrorBoundary + Suspense` pattern.

Components are grouped by feature under `src/app/components/`: `ai`, `analysis`, `dashboard`, `figma`, `insights`, `macro`, `markets`, `orders`, `presentation`, `terminal`, `ui`, `widgets`, `workspaces`. Shared primitives live in `ui/`.

Styles: `src/styles/{index,tailwind,theme,fonts}.css`. Tailwind v4 is wired via `@tailwindcss/vite` (required by Figma Make — do not remove the plugin even if Tailwind isn't actively used). `@` is aliased to `src/`.

Design system: depends on `@figma/astraui` + `@figma/astraui-kit`. Per `guidelines/Guidelines.md`, before writing code for this project, read `setup.md` and `Guidelines.md` inside each `@figma/astraui-kit` package in `node_modules` and apply their setup instructions to this project.

## Vite specifics

`vite.config.ts` defines a custom `figmaAssetResolver` plugin that rewrites `figma:asset/<file>` imports to `src/assets/<file>`. `assetsInclude` allows raw imports of `.svg` and `.csv`; **do not add `.css`, `.tsx`, or `.ts` there** (comment in the config explicitly forbids it).

## Conventions

- UI copy, error labels, and user-facing messages: **French** (see `routes.tsx` fallbacks).
- Code, identifiers, commits: English.
- React 18, `react-router` v7 (note: import from `"react-router"`, not `"react-router-dom"`).
