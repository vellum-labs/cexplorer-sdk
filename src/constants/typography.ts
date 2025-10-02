/**
 * Typography system constants that map to CSS custom properties.
 * Provides a complete set of font sizes, weights, line heights, and letter spacing values.
 *
 * @example
 * ```tsx
 * import { typography } from '@vellumlabs/cexplorer-sdk';
 *
 * // Using font weights
 * <p style={{ fontWeight: typography["Font/Weight"].semibold }}>Semibold text</p>
 *
 * // Using font sizes with all properties
 * <h1 style={typography["Font/Size"]["Display/2xl"]}>Large heading</h1>
 * ```
 *
 * @remarks
 * All typography values use CSS custom properties (--variable-name) defined in
 * src/styles/variables/typography.css and work seamlessly with Tailwind CSS classes.
 *
 * Font Weights: regular (400), medium (500), semibold (600), bold (700)
 *
 * Display Sizes: 2xl, xl, lg, md (with -2% letter spacing), sm, xs
 * - Designed for large headings and hero sections
 *
 * Text Sizes: xl, lg, md, sm, xs
 * - Optimized for body content and UI elements
 */
export const typography = {
  "Font/Weight": {
    regular: "var(--font-weight-regular)",
    medium: "var(--font-weight-medium)",
    semibold: "var(--font-weight-semibold)",
    bold: "var(--font-weight-bold)",
  },
  "Font/Size": {
    "Display/2xl": {
      fontSize: "var(--font-size-display-2xl)",
      lineHeight: "var(--line-height-display-2xl)",
      letterSpacing: "var(--letter-spacing-display-2xl)",
    },
    "Display/xl": {
      fontSize: "var(--font-size-display-xl)",
      lineHeight: "var(--line-height-display-xl)",
      letterSpacing: "var(--letter-spacing-display-xl)",
    },
    "Display/lg": {
      fontSize: "var(--font-size-display-lg)",
      lineHeight: "var(--line-height-display-lg)",
      letterSpacing: "var(--letter-spacing-display-lg)",
    },
    "Display/md": {
      fontSize: "var(--font-size-display-md)",
      lineHeight: "var(--line-height-display-md)",
      letterSpacing: "var(--letter-spacing-display-md)",
    },
    "Display/sm": {
      fontSize: "var(--font-size-display-sm)",
      lineHeight: "var(--line-height-display-sm)",
    },
    "Display/xs": {
      fontSize: "var(--font-size-display-xs)",
      lineHeight: "var(--line-height-display-xs)",
    },
    "Text/xl": {
      fontSize: "var(--font-size-text-xl)",
      lineHeight: "var(--line-height-text-xl)",
    },
    "Text/lg": {
      fontSize: "var(--font-size-text-lg)",
      lineHeight: "var(--line-height-text-lg)",
    },
    "Text/md": {
      fontSize: "var(--font-size-text-md)",
      lineHeight: "var(--line-height-text-md)",
    },
    "Text/sm": {
      fontSize: "var(--font-size-text-sm)",
      lineHeight: "var(--line-height-text-sm)",
    },
    "Text/xs": {
      fontSize: "var(--font-size-text-xs)",
      lineHeight: "var(--line-height-text-xs)",
    },
  },
} as const;
