import type { FC } from "react";

import { Clock } from "lucide-react";

import { DateCell } from "@/ui/dateCell";

import { formatDate } from "@/utils/format";

/**
 * Props for the TimeDateIndicator component
 */
export interface TimeDateIndicatorProps {
  /**
   * ISO 8601 timestamp string to display
   * Accepts string or undefined (shows fallback if undefined)
   *
   * @example
   * <TimeDateIndicator time="2024-01-15T14:30:00Z" />
   *
   * @example
   * // With undefined value
   * <TimeDateIndicator time={undefined} />
   */
  time: string | undefined;
}

/**
 * TimeDateIndicator displays a timestamp with both absolute and relative time formats.
 *
 * This component presents time information in a user-friendly way by showing both
 * the relative time (e.g., "2 hours ago") and the formatted absolute date/time
 * (e.g., "Jan 15, 2024 2:30 PM") with a clock icon. This dual format helps users
 * understand both recent and precise timing of blockchain events.
 *
 * **Display Format:**
 * - Primary: Relative time (e.g., "2 hours ago", "3 days ago")
 * - Secondary: Absolute date/time in parentheses with clock icon
 *
 * **Key Features:**
 * - Shows both relative and absolute time formats
 * - Visual clock icon for quick recognition
 * - Responsive text wrapping for different screen sizes
 * - Handles undefined/missing timestamps gracefully
 *
 * **Common Use Cases:**
 * - Display transaction timestamps
 * - Show block creation times
 * - Display epoch transition times
 * - Show proposal submission dates
 * - Indicate when staking events occurred
 * - Any blockchain event timing display
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with ISO timestamp
 * <TimeDateIndicator time="2024-01-15T14:30:00Z" />
 * // Displays: "2 hours ago (Jan 15, 2024 2:30 PM) 🕐"
 *
 * // Transaction timestamp
 * <TimeDateIndicator time={transaction.timestamp} />
 *
 * // Block creation time
 * <TimeDateIndicator time={block.time} />
 *
 * // With undefined value
 * <TimeDateIndicator time={undefined} />
 * // Shows fallback display
 * ```
 *
 * @param {TimeDateIndicatorProps} props - Component props
 * @param {string | undefined} props.time - ISO 8601 timestamp string
 * @returns {JSX.Element} A formatted timestamp display with relative and absolute time
 */
export const TimeDateIndicator: FC<TimeDateIndicatorProps> = ({ time }) => {
  return (
    <div className='flex flex-wrap items-center gap-1/2 text-text-sm'>
      <span className='font-medium leading-none text-text'>
        <DateCell time={time} withoutConvert />
      </span>
      <div className='flex items-center'>
        <span className='text-nowrap pr-1/2 text-text-xs leading-none text-grayTextPrimary'>
          ({formatDate(time ? time : undefined)})
        </span>
        <Clock size={12} className='h-full text-grayTextPrimary' />
      </div>
    </div>
  );
};
