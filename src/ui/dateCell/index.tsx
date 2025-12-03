import {
  convertUtcToLocal,
  formatDate,
  formatTimeAgo,
  formatTimeIn,
} from "@/utils/format";
import { Tooltip } from "@/ui/tooltip";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
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
  /**
   * Show tooltip with persistent/absolute time on hover.
   * Displays both absolute time (e.g., "14:43:57 Nov 27 2025")
   * and relative time (e.g., "4y 5mo ago").
   *
   * @optional
   * @default true
   */
  showTooltip?: boolean;
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
 * @example
 * ```tsx
 * // With tooltip disabled
 * <DateCell
 *   time="2024-01-15T10:30:00Z"
 *   showTooltip={false}
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
  showTooltip = true,
}: DateCellProps) => {
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

  const getTooltipContent = () => {
    if (!time) return null;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = withoutConvert ? new Date(time) : new Date(time + "Z");
    const zoned = new TZDate(utcDate, timeZone);

    return format(zoned, "HH:mm:ss MMM dd yyyy");
  };

  const content = (
    <p className={` ${tabularNums ? "tabular-nums" : ""} ${className}`}>
      {time
        ? date > currentTime
          ? formatTimeIn(localTime)
          : formatTimeAgo(localTime)
        : "-"}
    </p>
  );

  if (!showTooltip || !time) {
    return content;
  }

  return <Tooltip content={getTooltipContent()}>{content}</Tooltip>;
};
