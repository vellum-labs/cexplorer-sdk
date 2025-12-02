import { useThemeStore } from "@/stores/themeStore";

/**
 * Props for the ActivityBadge component
 */
export interface ActivityBadgeProps {
  /**
   * Activity percentage value (0-100)
   *
   * The percentage determines the activity level and visual styling:
   * - `0-49%`: Low activity (red styling)
   * - `50-89%`: Medium activity (yellow/amber styling)
   * - `90-100%`: High activity (green styling)
   *
   * @example
   * <ActivityBadge percentage={25.5} />  // Low - Red
   * <ActivityBadge percentage={75.2} />  // Medium - Yellow
   * <ActivityBadge percentage={95.8} />  // High - Green
   */
  percentage: number;
}

/**
 * ActivityBadge displays an activity percentage with color-coded visual indicators.
 *
 * The component automatically determines the activity level based on the percentage value
 * and applies appropriate styling (red for low, yellow for medium, green for high).
 * It adapts to the current theme (light/dark mode) for optimal visibility.
 *
 * **Activity Level Thresholds:**
 * - **Low (Red)**: 0% - 49% - Indicates minimal or concerning activity levels
 * - **Medium (Yellow)**: 50% - 89% - Indicates moderate or acceptable activity levels
 * - **High (Green)**: 90% - 100% - Indicates strong or excellent activity levels
 *
 * **Common Use Cases:**
 * - Stake pool activity/performance metrics
 * - DRep voting participation rates
 * - Governance proposal engagement levels
 * - Block production efficiency indicators
 * - Network participation metrics
 * - Validator uptime percentages
 * - Transaction throughput rates
 *
 * @component
 * @example
 * ```tsx
 * // Low activity (red)
 * <ActivityBadge percentage={25.5} />
 *
 * // Medium activity (yellow/amber)
 * <ActivityBadge percentage={67.89} />
 *
 * // High activity (green)
 * <ActivityBadge percentage={95.5} />
 *
 * // Stake pool performance
 * <ActivityBadge percentage={poolActivity} />
 *
 * // DRep voting participation
 * <ActivityBadge percentage={votingRate} />
 *
 * // Perfect score
 * <ActivityBadge percentage={100} />
 * ```
 *
 * @param {ActivityBadgeProps} props - Component props
 * @param {number} props.percentage - Activity percentage value (0-100)
 * @returns {JSX.Element} A color-coded badge displaying the percentage with theme-aware styling
 */
export const ActivityBadge = ({ percentage }: ActivityBadgeProps) => {
  const { theme } = useThemeStore();

  const getActivityLevel = (percent: number) => {
    if (percent >= 90) return "high";
    if (percent >= 50) return "medium";
    return "low";
  };

  const activityLevel = getActivityLevel(percentage);

  const styles = {
    low: {
      dark: {
        border: "border-[#F04438]",
        bg: "bg-[#3A1F1F]",
        text: "text-white",
      },
      light: {
        border: "border-[#F04438]",
        bg: "bg-[#FEF2F2]",
        text: "text-[#DC2626]",
      },
    },
    medium: {
      dark: {
        border: "border-[#F59E0B]",
        bg: "bg-[#3A2F1F]",
        text: "text-white",
      },
      light: {
        border: "border-[#F59E0B]",
        bg: "bg-[#FFFBEB]",
        text: "text-[#D97706]",
      },
    },
    high: {
      dark: {
        border: "border-[#10B981]",
        bg: "bg-[#1F2937]",
        text: "text-white",
      },
      light: {
        border: "border-[#10B981]",
        bg: "bg-[#F0FDF4]",
        text: "text-[#059669]",
      },
    },
  };

  const currentStyle = styles[activityLevel][theme];

  return (
    <div
      className={`flex h-[24px] w-fit items-center rounded-xl border px-[8px] py-[2px] ${currentStyle.border} ${currentStyle.bg}`}
    >
      <span
        className={`whitespace-nowrap text-text-xs font-medium ${currentStyle.text}`}
      >
        {percentage.toFixed(2)}%
      </span>
    </div>
  );
};
