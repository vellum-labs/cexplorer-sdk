/**
 * Box shadow constants for visual elevation.
 *
 * @remarks
 * These shadow values create consistent depth perception throughout the UI.
 * Use smaller shadows (xs, sm) for subtle elevation and larger shadows (lg, xl)
 * for prominent elements like modals or popovers.
 *
 * @property {string} xs - Extra small shadow for minimal elevation
 * @property {string} sm - Small shadow for cards and buttons
 * @property {string} md - Medium shadow for dropdowns
 * @property {string} lg - Large shadow for floating panels
 * @property {string} xl - Extra large shadow for modals
 *
 * @example
 * ```tsx
 * import { shadows } from './constants/shadows';
 *
 * <Button style={{ boxShadow: shadows.sm }}>Click me</Button>
 * ```
 */
export const shadows = {
  xs: "var(--shadow-xs)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  xl: "var(--shadow-xl)",
  "2xl": "var(--shadow-2xl)",
  "3xl": "var(--shadow-3xl)",
} as const;
