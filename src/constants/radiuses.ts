/**
 * Border radius constants using CSS custom properties.
 *
 * Provides a consistent set of border radius values that reference
 * CSS variables defined in the stylesheet.
 *
 * @constant
 * @type {Object}
 *
 * @property {string} none - No border radius (var(--radius-none))
 * @property {string} xs - Extra small border radius (var(--radius-xs))
 * @property {string} s - Small border radius (var(--radius-s))
 * @property {string} m - Medium border radius (var(--radius-m))
 * @property {string} l - Large border radius (var(--radius-l))
 * @property {string} xl - Extra large border radius (var(--radius-xl))
 * @property {string} max - Maximum border radius (var(--radius-max))
 *
 * @example
 * // Using in a component
 * const Button = styled.button`
 *   border-radius: ${radiuses.m};
 * `;
 */
export const radiuses = {
  none: "var(--radius-none)",
  xs: "var(--radius-xs)",
  s: "var(--radius-s)",
  m: "var(--radius-m)",
  l: "var(--radius-l)",
  xl: "var(--radius-xl)",
  max: "var(--radius-max)",
} as const;
