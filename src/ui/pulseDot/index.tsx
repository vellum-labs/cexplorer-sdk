import type { FC } from "react";

/**
 * Props for the PulseDot component
 */
export interface PulseDotProps {
  /**
   * Size of the dot in Tailwind spacing units (e.g., 2 = 0.5rem, 4 = 1rem)
   * @default 2
   * @example
   * <PulseDot size={4} /> // Larger dot
   */
  size?: number;

  /**
   * Color of the dot. Can be a Tailwind class (e.g., "bg-red-500") or CSS color (e.g., "#FF0000")
   * @default "bg-greenText"
   * @example
   * <PulseDot color="bg-red-500" />
   * <PulseDot color="#FF0000" />
   */
  color?: string;

  /**
   * Whether the dot should have a pulsing animation
   * @default true
   * @example
   * <PulseDot animate={false} /> // Static dot without pulse
   */
  animate?: boolean;

  /**
   * Override color with a Tailwind class, takes precedence over `color` prop
   * @example
   * <PulseDot overrideColor="bg-blue-500" />
   */
  overrideColor?: string;
}

/**
 * PulseDot component displays an animated pulsing dot indicator.
 *
 * This component is commonly used to show live status, activity indicators,
 * or to draw attention to active elements. The dot can be customized in size,
 * color, and animation. Supports both Tailwind color classes and custom CSS colors.
 *
 * **Color System:**
 * - Tailwind classes: Use `bg-*` classes (e.g., `bg-red-500`, `bg-greenText`)
 * - CSS colors: Use hex, rgb, or named colors (e.g., `#FF0000`, `rgb(255, 0, 0)`)
 * - Default: Green text color (`bg-greenText`)
 *
 * **Animation:**
 * - Enabled by default with a pulsing effect using Tailwind's `animate-ping`
 * - Can be disabled for static indicators
 *
 * **Common Use Cases:**
 * - Live blockchain status indicators (pool active, node online)
 * - Real-time activity badges (new transactions, active epochs)
 * - Status indicators (online/offline, active/inactive)
 * - Notification dots
 * - Live data streaming indicators
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage (green, animated)
 * <PulseDot />
 *
 * // Custom size and color
 * <PulseDot size={4} color="bg-red-500" />
 *
 * // Static dot without animation
 * <PulseDot animate={false} color="bg-blue-500" />
 *
 * // With custom CSS color
 * <PulseDot color="#FF6B00" />
 *
 * // Live pool status indicator
 * <div className="flex items-center gap-2">
 *   <PulseDot size={3} color="bg-greenText" />
 *   <span>Pool Active</span>
 * </div>
 *
 * // Transaction streaming indicator
 * <div className="flex items-center gap-2">
 *   <PulseDot color="bg-primary" />
 *   <span>Live Transactions</span>
 * </div>
 * ```
 *
 * @param {PulseDotProps} props - Component props
 * @param {number} [props.size=2] - Size in Tailwind spacing units
 * @param {string} [props.color="bg-greenText"] - Color (Tailwind class or CSS color)
 * @param {boolean} [props.animate=true] - Enable pulsing animation
 * @param {string} [props.overrideColor] - Override color (Tailwind class only)
 * @returns {JSX.Element} An animated or static pulsing dot indicator
 */
export const PulseDot: FC<PulseDotProps> = ({
  size = 2,
  color,
  animate = true,
  overrideColor = "",
}) => {
  const sizeClasses = {
    1: "h-1 w-1",
    2: "h-2 w-2",
    3: "h-3 w-3",
    4: "h-4 w-4",
    5: "h-5 w-5",
    6: "h-6 w-6",
  } as const;
  const isTailwindClass = color?.startsWith("bg-");
  const appliedClass = overrideColor || (isTailwindClass ? color : "");
  const appliedStyle =
    !isTailwindClass && color ? { backgroundColor: color } : {};

  return (
    <span className={`relative flex ${sizeClasses[size]}`}>
      <span
        className={`absolute inline-flex ${sizeClasses[size]} rounded-max ${appliedClass || "bg-greenText"} ${animate ? "animate-ping" : ""} opacity-75`}
        style={appliedStyle}
      />
      <span
        className={`relative inline-flex ${sizeClasses[size]} rounded-max ${appliedClass || "bg-greenText"}`}
        style={appliedStyle}
      />
    </span>
  );
};
