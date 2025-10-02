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
export const colors = {} as const;
