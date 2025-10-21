import type { ReactNode } from "react";

/**
 * Props for the Badge component
 */
export interface BadgeProps {
  /**
   * Color variant of the badge
   *
   * Available colors:
   * - `red`: Red background with red border (errors, failed states)
   * - `yellow`: Yellow background with yellow border (warnings, pending states)
   * - `blue`: Blue background with blue border (informational, active states)
   * - `purple`: Purple background with purple border (special states)
   * - `gray`: Dark gray background (neutral, inactive states)
   * - `green`: Green background with green border (success, completed states)
   * - `light`: Light background using theme colors
   * - `none`: Transparent background with no border
   *
   * @example
   * <Badge color="green">Success</Badge>
   * <Badge color="red">Failed</Badge>
   */
  color:
    | "red"
    | "yellow"
    | "blue"
    | "purple"
    | "gray"
    | "green"
    | "light"
    | "none";

  /**
   * Content to display inside the badge
   *
   * @example
   * <Badge color="blue">Active</Badge>
   * <Badge color="green">
   *   <Icon name="check" /> Verified
   * </Badge>
   */
  children: ReactNode;

  /**
   * Whether to use fully rounded corners (pill shape) or standard rounded corners
   *
   * @default true
   *
   * @example
   * <Badge color="blue" rounded={true}>Fully Rounded</Badge>
   * <Badge color="blue" rounded={false}>Standard Rounded</Badge>
   */
  rounded?: boolean;

  /**
   * Optional CSS class name for additional styling
   *
   * @example
   * <Badge color="green" className="mr-2">Custom Style</Badge>
   */
  className?: string;

  /**
   * Whether to render a smaller, compact version of the badge
   *
   * Small badges have minimal padding and are useful for inline counters or indicators
   *
   * @default false
   *
   * @example
   * <Badge color="red" small>5</Badge>
   * <Badge color="blue" small>New</Badge>
   */
  small?: boolean;

  /**
   * Optional inline styles to apply to the badge
   *
   * @example
   * <Badge color="purple" style={{ marginLeft: '8px' }}>Custom</Badge>
   */
  style?: React.CSSProperties;
}

/**
 * Badge is a versatile component for displaying labels, statuses, and categorizations.
 *
 * The component supports multiple color variants for different semantic meanings and use cases.
 * It can be used to show transaction statuses, pool states, epoch indicators, protocol types,
 * and other categorical or status information in blockchain applications.
 *
 * **Common Use Cases:**
 * - Transaction status indicators (pending, confirmed, failed)
 * - Stake pool status badges (active, retired, saturated)
 * - Protocol or network labels (mainnet, testnet, preview)
 * - Token or asset type indicators
 * - Notification counters and indicators
 * - Epoch or era labels
 * - Governance proposal states
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with different colors
 * <Badge color="green">Confirmed</Badge>
 * <Badge color="yellow">Pending</Badge>
 * <Badge color="red">Failed</Badge>
 *
 * // Transaction status
 * <Badge color="green">Success</Badge>
 * <Badge color="blue">Processing</Badge>
 *
 * // Stake pool status
 * <Badge color="green">Active</Badge>
 * <Badge color="gray">Retired</Badge>
 * <Badge color="yellow">Saturated</Badge>
 *
 * // Small badge for counters
 * <Badge color="red" small>5</Badge>
 * <Badge color="blue" small>New</Badge>
 *
 * // Network indicators
 * <Badge color="purple">Mainnet</Badge>
 * <Badge color="blue">Testnet</Badge>
 *
 * // Custom styling
 * <Badge color="light" rounded={false} className="uppercase">
 *   Custom Label
 * </Badge>
 * ```
 *
 * @param {BadgeProps} props - Component props
 * @param {string} props.color - Color variant (red, yellow, blue, purple, gray, green, light, none)
 * @param {ReactNode} props.children - Content to display inside the badge
 * @param {boolean} [props.rounded=true] - Whether to use fully rounded corners (pill shape)
 * @param {string} [props.className] - Optional CSS class name for additional styling
 * @param {boolean} [props.small=false] - Whether to render a smaller, compact version
 * @param {React.CSSProperties} [props.style] - Optional inline styles
 * @returns {JSX.Element} A styled badge component with the specified color and content
 */
export const Badge = ({
  color,
  children,
  rounded = true,
  className,
  small,
  style,
}: BadgeProps) => {
  let colorStyles = "";

  switch (color) {
    case "yellow":
      colorStyles = "bg-yellow-100 border-yellow-800/50 text-yellow-800";
      break;
    case "blue":
      colorStyles = "bg-blue-100 border-blue-800/50 text-blue-800";
      break;
    case "purple":
      colorStyles = "bg-purple-100 border-purple-800/50 text-purple-800";
      break;
    case "red":
      colorStyles = "bg-red-100 border-red-800/50 text-red-800";
      break;
    case "green":
      colorStyles = "bg-green-100 border-green-800/50 text-green-800";
      break;
    case "light":
      colorStyles = "bg-cardBg text-text border-border";
      break;
    case "gray":
      colorStyles = "bg-darker text-text border-border";
      break;
    case "none":
      colorStyles = "border-transparent bg-transparent border-none text-text";
      break;
  }

  return (
    <span
      style={style}
      className={`flex w-fit items-center gap-1/2 ${rounded ? "rounded-max" : "rounded"} border ${small ? "min-w-[18px] shrink-0 justify-center px-1/4 text-[10px]" : "px-1.5 py-1/4 text-text-xs"} text-right font-medium ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
};
