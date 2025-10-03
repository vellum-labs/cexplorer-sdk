/**
 * Responsive breakpoint constants matching Tailwind's default mobile-first breakpoints.
 *
 * These values define the minimum viewport widths at which layout changes occur.
 * Tailwind uses a mobile-first approach, meaning styles apply upward from each breakpoint.
 *
 * @constant
 * @type {Object}
 *
 * @property {string} sm - Small devices (640px) - Large phones in landscape, small tablets
 * @property {string} md - Medium devices (768px) - Tablets in portrait
 * @property {string} lg - Large devices (1024px) - Tablets in landscape, small laptops
 * @property {string} xl - Extra large devices (1280px) - Desktop monitors
 * @property {string} 2xl - 2X large devices (1536px) - Large desktop monitors
 *
 * @example
 * // Using in Tailwind classes (mobile-first approach)
 * <div className="w-full md:w-1/2 lg:w-1/3">
 *   Content is full width on mobile, half on tablets, third on laptops
 * </div>
 *
 * @example
 * // Using in custom media queries
 * const mobileQuery = `@media (min-width: ${breakpoints.sm})`;
 */
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
