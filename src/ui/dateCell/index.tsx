import {
  convertUtcToLocal,
  formatDate,
  formatTimeAgo,
  formatTimeIn,
} from "@/utils/format";
import { useEffect, useState } from "react";

/**
 * Props for the DateCell component.
 *
 * @interface DateCellProps
 */
interface DateCellProps {
  /**
   * ISO 8601 timestamp string or formatted date string.
   *
   * @optional
   * @example "2024-01-15T10:30:00Z"
   * @example "2024-01-15T10:30:00"
   */
  time: string | undefined;
  /**
   * Additional CSS classes to apply to the paragraph element.
   *
   * @optional
   * @default ""
   * @example "text-sm text-gray-500"
   */
  className?: string;
  /**
   * Enable tabular-nums font feature for monospaced digits.
   * Useful for aligning numbers in tables.
   *
   * @optional
   * @default true
   */
  tabularNums?: boolean;
  /**
   * Skip UTC to local time conversion.
   * Use when time is already in local format or doesn't need conversion.
   *
   * @optional
   * @default false
   */
  withoutConvert?: boolean;
}

/**
 * Date display component showing relative time with automatic updates.
 *
 * Features:
 * - Displays relative time (e.g., "2 minutes ago", "in 5 hours")
 * - Automatically updates every second
 * - Handles both past and future dates
 * - Optional UTC to local time conversion
 * - Tabular number formatting for table alignment
 * - Graceful handling of undefined/invalid dates
 *
 * Time Formats:
 * - Past dates: "X seconds/minutes/hours/days ago"
 * - Future dates: "in X seconds/minutes/hours/days"
 * - Invalid/undefined: "-"
 *
 * @component
 * @example
 * ```tsx
 * // Recent block time
 * <DateCell
 *   time="2024-01-15T10:28:00Z"
 *   tabularNums={true}
 * />
 * // Displays: "2 minutes ago"
 * ```
 *
 * @example
 * ```tsx
 * // Future epoch time
 * <DateCell
 *   time="2024-01-15T14:00:00Z"
 * />
 * // Displays: "in 3 hours"
 * ```
 *
 * @example
 * ```tsx
 * // Without UTC conversion
 * <DateCell
 *   time="2024-01-15T10:30:00"
 *   withoutConvert={true}
 *   className="text-sm"
 * />
 * ```
 *
 * @param {DateCellProps} props - Component props
 * @returns {JSX.Element} Rendered date cell with relative time
 */
export const DateCell = ({
  time,
  className = "",
  tabularNums = true,
  withoutConvert = false,
}: DateCellProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const localTime = time
    ? withoutConvert
      ? (formatDate(time, false, true) as string)
      : convertUtcToLocal(time)
    : "";

  const date = new Date(localTime);

  return (
    <p className={` ${tabularNums ? "tabular-nums" : ""} ${className}`}>
      {time
        ? date > currentTime
          ? formatTimeIn(localTime)
          : formatTimeAgo(localTime)
        : "-"}
    </p>
  );
};
