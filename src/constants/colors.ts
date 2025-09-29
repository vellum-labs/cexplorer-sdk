/**
 * Theme color constants that map to CSS custom properties.
 * These colors automatically adapt to light/dark themes through CSS variables.
 *
 * @example
 * ```tsx
 * import { colors } from '@/constants/colors';
 *
 * <div style={{ color: colors.primary, backgroundColor: colors.cardBg }}>
 *   Content with themed colors
 * </div>
 * ```
 *
 * @remarks
 * All color values use CSS custom properties (--variable-name) which are
 * defined in the global CSS and change based on the current theme.
 */
export const colors = {
  /** Primary text color */
  text: "var(--text)",
  /** Primary brand color */
  primary: "var(--primary)",
  /** Dark blue accent color */
  darkBlue: "var(--darkBlue)",
  /** Secondary accent color */
  secondary: "var(--secondary)",
  /** Secondary text color */
  secondaryText: "var(--secondaryText)",
  /** Secondary background color */
  secondaryBg: "var(--secondaryBg)",
  /** Darker background variant */
  darker: "var(--darker)",
  /** Main background color */
  background: "var(--background)",
  /** Border color */
  border: "var(--border)",
  /** Faded border color for subtle dividers */
  borderFaded: "var(--borderFaded)",
  /** Primary gray text color */
  grayTextPrimary: "var(--grayTextPrimary)",
  /** Secondary gray text color */
  grayTextSecondary: "var(--grayTextSecondary)",
  /** Card background color */
  cardBg: "var(--cardBg)",
  /** Purple text color for special content */
  purpleText: "var(--purpleText)",
  /** Red text color for errors and warnings */
  redText: "var(--redText)",
  /** Green text color for success states */
  greenText: "var(--greenText)",
  /** Yellow text color for warnings and highlights */
  yellowText: "var(--yellowText)",
} as const;
