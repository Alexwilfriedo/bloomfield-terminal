import { useBloomfieldTheme } from "../context/ThemeContext";

/** Dark palette — the original Bloomfield Terminal colors */
const DARK = {
  surface: "#000117",
  elevated: "#000117",
  accent: "#d6b68d",
  border: "rgba(44, 61, 127, 0.32)",
  borderLight: "rgba(44, 61, 127, 0.22)",
  text: "#ddeaf8",
  dim: "#6b96b8",
  muted: "#54678d",
  gold: "#f4b942",
  green: "#10c87a",
  red: "#f43860",
  orange: "#fb923c",
  purple: "#a78bfa",
  dark: "#000117",
} as const;

/** Light palette — Bloomfield Terminal light mode */
const LIGHT = {
  surface: "#f5f6fa",
  elevated: "#ffffff",
  accent: "#b8935e",
  border: "rgba(44, 61, 127, 0.15)",
  borderLight: "rgba(44, 61, 127, 0.10)",
  text: "#0f1629",
  dim: "#4a6480",
  muted: "#7d8ba0",
  gold: "#d9a030",
  green: "#0aaf6a",
  red: "#d92e50",
  orange: "#e08830",
  purple: "#7c5cc4",
  dark: "#e4e7f0",
} as const;

export type ThemeColors = typeof DARK;

/**
 * Returns the color palette for the active theme.
 * Drop-in replacement for hardcoded `const C = { ... }` blocks.
 *
 * Usage:
 *   const C = useThemeColors();
 */
export function useThemeColors(): ThemeColors {
  const { isDark } = useBloomfieldTheme();
  return isDark ? DARK : LIGHT;
}
