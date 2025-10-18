import { TrendingDown, TrendingUp } from "lucide-react";
import type { FC } from "react";

/**
 * Props for TrendingArrow component.
 */
export interface TrendingArrowProps {
  /** Percentage change value (positive for increase, negative for decrease, 0 for no change) */
  percentage: number;
  /** Icon size in pixels */
  size?: number;
}

/**
 * TrendingArrow displays a visual indicator for percentage changes.
 *
 * This component renders trending arrows based on positive or negative
 * percentage changes. It's commonly used to show price movements, statistics
 * trends, or any metric changes over time. Returns null when percentage is zero.
 *
 * **Features:**
 * - Color-coded trend indicators (green for up, red for down)
 * - Customizable icon size
 * - Automatic hiding when no change (percentage = 0)
 * - Uses CSS variables for theme-aware colors
 * - Lucide icons for consistent design
 *
 * **Trend States:**
 * - **Positive** (`percentage > 0`): Green `TrendingUp` arrow (increase)
 * - **Negative** (`percentage < 0`): Red `TrendingDown` arrow (decrease)
 * - **Zero** (`percentage = 0`): Returns `null` (hidden)
 *
 * **Color Scheme:**
 * - **Green** (`var(--text-greenText)`): Positive trend (gains, increases)
 * - **Red** (`var(--text-redText)`): Negative trend (losses, decreases)
 *
 * **Common Use Cases:**
 * - ADA price change indicators
 * - Pool performance statistics (ROA changes)
 * - Network metrics trends (transaction volume, active stake)
 * - Epoch-to-epoch comparison displays
 * - Token price movements
 *
 * @component
 * @example
 * ```tsx
 * // Positive trend (price increase)
 * <div className="flex items-center gap-1">
 *   <span>+5.2%</span>
 *   <TrendingArrow percentage={5.2} />
 * </div>
 *
 * // Negative trend (price decrease)
 * <div className="flex items-center gap-1">
 *   <span>-3.1%</span>
 *   <TrendingArrow percentage={-3.1} />
 * </div>
 *
 * // Custom size
 * <TrendingArrow percentage={12.5} size={24} />
 * ```
 *
 * @param {TrendingArrowProps} props - Component props
 * @param {number} props.percentage - Percentage change value
 * @param {number} [props.size=20] - Icon size in pixels
 * @returns {JSX.Element | null} Trending arrow icon or null if zero
 */
export const TrendingArrow: FC<TrendingArrowProps> = ({
  percentage,
  size = 20,
}) => {
  if (percentage === 0) return null;
  else if (percentage > 0)
    return <TrendingUp color='var(--text-greenText)' size={size} />;
  else return <TrendingDown color='var(--text-redText)' size={size} />;
};
