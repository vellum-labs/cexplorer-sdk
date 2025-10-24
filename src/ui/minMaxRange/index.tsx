import type { FC } from "react";

/**
 * Props for the MinMaxRange component
 */
export interface MinMaxRangeProps {
  /**
   * Minimum value of the range
   *
   * @example
   * <MinMaxRange min={0} max={100} current={50} />
   */
  min: number;

  /**
   * Maximum value of the range
   *
   * @example
   * <MinMaxRange min={0} max={100} current={50} />
   */
  max: number;

  /**
   * Current value within the range (can be a number or formatted string)
   *
   * @example
   * // As number
   * <MinMaxRange min={0} max={100} current={75} />
   *
   * // As formatted string (e.g., "50 ADA")
   * <MinMaxRange min={0} max={100} current="75 ADA" />
   */
  current: number | string;

  /**
   * Whether to show the percentage alongside the current value
   * @default false
   *
   * @example
   * <MinMaxRange min={0} max={100} current={75} showPercentage />
   * // Displays: "75 (75.0%)"
   */
  showPercentage?: boolean;

  /**
   * Whether to show min/max labels on the progress bar
   * @default false
   *
   * @example
   * <MinMaxRange min={0} max={100} current={50} showLabels />
   * // Shows "0" and "100" at the ends of the bar
   */
  showLabels?: boolean;

  /**
   * Optional CSS class names for styling customization
   *
   * @example
   * <MinMaxRange min={0} max={100} current={50} className="my-4" />
   */
  className?: string;

  /**
   * Size variant of the progress bar
   * @default "sm"
   *
   * @example
   * <MinMaxRange min={0} max={100} current={50} size="md" />
   */
  size?: "xs" | "sm" | "md";

  /**
   * Position of the current value label
   * @default "above"
   *
   * @example
   * // Label above the bar
   * <MinMaxRange min={0} max={100} current={50} labelPosition="above" />
   *
   * // Label to the right of the bar
   * <MinMaxRange min={0} max={100} current={50} labelPosition="right" />
   */
  labelPosition?: "above" | "right";

  /**
   * Color mode for the progress bar fill
   * - "neutral": Uses consistent blue color
   * - "scaling": Uses color scale (red for low, yellow for medium, green for high)
   * @default "scaling"
   *
   * @example
   * // Scaling colors based on percentage
   * <MinMaxRange min={0} max={100} current={10} colorMode="scaling" />
   * // Red for 0-5%, yellow for 6-25%, green for 26-100%
   *
   * // Neutral blue color
   * <MinMaxRange min={0} max={100} current={50} colorMode="neutral" />
   */
  colorMode?: "neutral" | "scaling";
}

/**
 * MinMaxRange displays a value within a min-max range using a visual progress bar.
 *
 * This component visualizes numerical data within a defined range, showing the current
 * value's position relative to the minimum and maximum bounds. It's particularly useful
 * for displaying blockchain metrics like stake pool saturation, epoch progress, resource
 * utilization, or any bounded numerical data.
 *
 * The component supports color-coded visualization where the bar color changes based on
 * the percentage (red for critically low, yellow for low, green for good), or a neutral
 * blue color for non-critical metrics.
 *
 * **Common Use Cases:**
 * - Display stake pool saturation levels (e.g., 0% to 100%)
 * - Show epoch progress or countdown
 * - Visualize pledge fulfillment ratios
 * - Display resource utilization (memory, disk, CPU)
 * - Show voting power or delegation ratios
 * - Represent any bounded numerical metric
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with default settings
 * <MinMaxRange min={0} max={100} current={75} />
 *
 * // Pool saturation with percentage and labels
 * <MinMaxRange
 *   min={0}
 *   max={100}
 *   current={68.5}
 *   showPercentage
 *   showLabels
 * />
 *
 * // Formatted value with currency
 * <MinMaxRange
 *   min={0}
 *   max={1000000}
 *   current="750,000 ADA"
 *   showLabels
 * />
 *
 * // Neutral color mode for non-critical metrics
 * <MinMaxRange
 *   min={0}
 *   max={100}
 *   current={50}
 *   colorMode="neutral"
 *   size="md"
 * />
 *
 * // Label positioned to the right
 * <MinMaxRange
 *   min={0}
 *   max={100}
 *   current={25}
 *   labelPosition="right"
 * />
 * ```
 *
 * @param {MinMaxRangeProps} props - Component props
 * @param {number} props.min - Minimum value of the range
 * @param {number} props.max - Maximum value of the range
 * @param {number | string} props.current - Current value within the range
 * @param {boolean} [props.showPercentage=false] - Whether to show percentage
 * @param {boolean} [props.showLabels=false] - Whether to show min/max labels
 * @param {string} [props.className] - Optional CSS classes for styling
 * @param {"xs" | "sm" | "md"} [props.size="sm"] - Size variant of the bar
 * @param {"above" | "right"} [props.labelPosition="above"] - Position of the current value label
 * @param {"neutral" | "scaling"} [props.colorMode="scaling"] - Color mode for the bar fill
 * @returns {JSX.Element} A visual progress bar showing value within min-max range
 */
export const MinMaxRange: FC<MinMaxRangeProps> = ({
  min,
  max,
  current,
  showPercentage = false,
  showLabels = false,
  className = "",
  size = "sm",
  labelPosition = "above",
  colorMode = "scaling",
}) => {
  const calculatePercentage = (): number => {
    const numericCurrent =
      typeof current === "string"
        ? parseFloat(current.replace(/[^\d.-]/g, ""))
        : current;

    if (max === min) return 0;
    if (numericCurrent <= min) return 0;
    if (numericCurrent >= max) return 100;

    return ((numericCurrent - min) / (max - min)) * 100;
  };

  const percentage = calculatePercentage();

  const getFillColor = (): string => {
    if (colorMode === "neutral") {
      return "#0094D4";
    }

    if (percentage <= 5) {
      return "#F04438";
    } else if (percentage <= 25) {
      return "#FDB022";
    } else {
      return "#17B26A";
    }
  };

  const fillColor = getFillColor();

  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return {
          bar: "h-1 w-8",
          text: "text-text-xs",
        };
      case "sm":
        return {
          bar: "h-2 w-12",
          text: "text-text-sm",
        };
      case "md":
        return {
          bar: "h-2 w-16",
          text: "text-text-sm",
        };
      default:
        return {
          bar: "h-2 w-12",
          text: "text-text-sm",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const currentValueElement = (
    <span className={`${sizeClasses.text} text-grayTextPrimary`}>
      {current}
      {showPercentage && ` (${percentage.toFixed(1)}%)`}
    </span>
  );

  const progressBarElement = (
    <div title='Range visualization' className='flex items-center justify-end'>
      {showLabels && (
        <span className={`${sizeClasses.text} mr-1 text-grayTextSecondary`}>
          {min}
        </span>
      )}

      <div
        className={`relative ${sizeClasses.bar} overflow-hidden rounded-[4px]`}
        style={{ backgroundColor: "#D0D5DD" }}
      >
        <span
          className='absolute left-0 block h-2 rounded-bl-[4px] rounded-tl-[4px] transition-all duration-300'
          style={{
            width: `${Math.min(Math.max(percentage, 0), 100)}%`,
            backgroundColor: fillColor,
          }}
        />
      </div>

      {showLabels && (
        <span className={`${sizeClasses.text} ml-1/2 text-grayTextSecondary`}>
          {max}
        </span>
      )}
    </div>
  );

  if (labelPosition === "right") {
    return (
      <div className={`flex items-center gap-1/2 ${className}`}>
        {progressBarElement}
        {currentValueElement}
      </div>
    );
  }

  // Default: label above
  return (
    <div className={`flex flex-col gap-1/2 ${className}`}>
      <p className='text-right'>{currentValueElement}</p>
      {progressBarElement}
    </div>
  );
};
