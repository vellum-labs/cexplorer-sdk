import { Tooltip } from "@/ui/tooltip";
import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

/**
 * Truncates long strings with ellipsis for display purposes.
 *
 * Commonly used for blockchain hashes, addresses, and other long identifiers.
 *
 * @param {string | null | undefined} text - Text to format
 * @param {"short" | "long" | "shorter" | "longer"} type - Truncation length variant
 * @param {number} [startIndex=0] - Starting position for the slice
 * @returns {string | undefined} Truncated string with ellipsis, or undefined if text is falsy
 *
 * @example
 * ```tsx
 * formatString("addr1q9xyztabcdefghijklmnopqrstuvwxyz123456", "short")
 * // Returns: "addr1...23456"
 * ```
 *
 * @example
 * ```tsx
 * formatString("0a1b2c3d4e5f6789abcdefghijklmnop", "shorter")
 * // Returns: "0a1b...mnop"
 * ```
 */
export const formatString = (
  text: string | null | undefined,
  type: "short" | "long" | "shorter" | "longer",
  startIndex?: number,
) => {
  if (!text) return;

  const startFromIndex = startIndex || 0;
  if (type === "short") {
    return `${text.slice(0 + startFromIndex, 5 + startFromIndex)}...${text.slice(-5)}`;
  }

  if (type === "shorter") {
    return `${text.slice(0 + startFromIndex, 4 + startFromIndex)}...${text.slice(-4)}`;
  }

  if (type === "longer") {
    return `${text.slice(0 + startFromIndex, 11 + startFromIndex)}...${text.slice(-11)}`;
  }

  return `${text.slice(0 + startFromIndex, 8 + startFromIndex)}...${text.slice(-8)}`;
};

/**
 * Formats numbers with thousand separators (commas).
 *
 * @param {number | string | undefined} number - Number to format
 * @returns {string} Formatted number string with commas, or "-" if undefined
 *
 * @example
 * ```tsx
 * formatNumber(1234567)
 * // Returns: "1,234,567"
 * ```
 *
 * @example
 * ```tsx
 * formatNumber("1000000")
 * // Returns: "1,000,000"
 * ```
 */
export const formatNumber = (number: number | string | undefined): string => {
  if (number === undefined) return "-";

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Converts UTC datetime string to local timezone format.
 *
 * @param {string} utcDateString - UTC datetime string (without Z suffix)
 * @returns {string} Local datetime in "YYYY-MM-DD HH:mm:ss" format
 *
 * @example
 * ```tsx
 * convertUtcToLocal("2024-01-15 10:30:00")
 * // Returns: "2024-01-15 13:30:00" (if local timezone is UTC+3)
 * ```
 */
export function convertUtcToLocal(utcDateString: string): string {
  const date = new Date(utcDateString + "Z");

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * Formats large numbers with suffixes (k, M, B).
 *
 * @param {number} num - Number to format
 * @param {boolean} [removeUnusedZeroes=false] - Remove decimal places for numbers < 1000
 * @param {number} [numberOfDecimals=2] - Number of decimal places
 * @returns {string} Formatted number with suffix
 *
 * @example
 * ```tsx
 * formatNumberWithSuffix(1500)
 * // Returns: "1.50k"
 * ```
 *
 * @example
 * ```tsx
 * formatNumberWithSuffix(45000000)
 * // Returns: "45.00M"
 * ```
 *
 * @example
 * ```tsx
 * formatNumberWithSuffix(5000000000)
 * // Returns: "5.00B"
 * ```
 */
export const formatNumberWithSuffix = (
  num: number,
  removeUnusedZeroes?: boolean,
  numberOfDecimals?: number,
): string => {
  switch (true) {
    case num >= 1e9:
      return (num / 1e9).toFixed(numberOfDecimals ?? 2) + "B";
    case num >= 1e6:
      return (num / 1e6).toFixed(numberOfDecimals ?? 2) + "M";
    case num >= 1e3:
      return (num / 1e3).toFixed(numberOfDecimals ?? 2) + "k";
    default:
      return num.toFixed(removeUnusedZeroes ? 0 : 2) + "";
  }
};

/**
 * Converts various input types to UTC Date object.
 *
 * Automatically adds 'Z' suffix to strings without timezone information.
 *
 * @param {string | Date | number} input - Date input (ISO string, Date object, or timestamp)
 * @returns {Date} UTC Date object
 *
 * @example
 * ```tsx
 * toUtcDate("2024-01-15T10:30:00")
 * // Returns: Date object in UTC
 * ```
 */
export const toUtcDate = (input: string | Date | number): Date => {
  if (input instanceof Date) return input;
  if (typeof input === "string") {
    const hasTZ = /[zZ]|[+-]\d{2}:\d{2}$/.test(input);
    return new Date(hasTZ ? input : input + "Z");
  }
  return new Date(input);
};

/**
 * Formats date with timezone conversion and tooltip.
 *
 * Returns either a React element with Tooltip or ISO string.
 *
 * @param {string | Date | number} [input] - Date to format
 * @param {boolean} [hideTime=false] - Hide time portion, show only date
 * @param {boolean} [returnString=false] - Return ISO string instead of JSX
 * @param {boolean} [showRelative=false] - Show relative time (e.g., "10 minutes ago") as main text
 * @param {boolean} [showSecondary=false] - Show secondary date format below main text (small, muted)
 * @returns {JSX.Element | string} Formatted date with tooltip or ISO string
 *
 * @example
 * ```tsx
 * formatDate("2024-01-15T10:30:00Z")
 * // Returns: <Tooltip>Jan 15 2024, 13:30 GMT+3</Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * formatDate("2024-01-15T10:30:00Z", true)
 * // Returns: <Tooltip>Jan 15 2024</Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Withdrawals: relative time with absolute date below
 * formatDate("2024-01-15T10:30:00Z", false, false, true, true)
 * // Returns:
 * // <div>
 * //   10 minutes ago
 * //   <small class="text-muted">15.1.2024, 10:30:45</small>
 * // </div>
 * ```
 *
 * @example
 * ```tsx
 * // Rewards: formatted date with alternative format below
 * formatDate("2024-11-03T10:30:00Z", false, false, false, true)
 * // Returns:
 * // <div>
 * //   Nov 03 2024
 * //   <small class="text-muted">3.11.2024, 10:30:45</small>
 * // </div>
 * ```
 */
export const formatDate = (
  input?: string | Date | number,
  hideTime?: boolean,
  returnString: boolean = false,
  showRelative: boolean = false,
  showSecondary: boolean = false,
) => {
  if (!input) return "";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcDate = toUtcDate(input);
  const zoned = new TZDate(utcDate, timeZone);

  if (returnString) {
    return zoned.toISOString();
  }

  const offset = format(zoned, "XXX");

  const mainText = showRelative
    ? formatTimeAgo(utcDate.toISOString())
    : format(zoned, hideTime ? "MMM dd yyyy" : "MMM dd yyyy, HH:mm zzz");

  const secondaryText = showSecondary
    ? format(zoned, "d.M.yyyy, HH:mm:ss")
    : null;

  if (showSecondary) {
    return (
      <Tooltip content={<span>Local timezone UTC {offset}</span>}>
        <div className='flex flex-col'>
          <span>{mainText}</span>
          <small className='text-text-muted text-[11px]'>{secondaryText}</small>
        </div>
      </Tooltip>
    );
  }

  return (
    <Tooltip content={<span>Local timezone UTC {offset}</span>}>
      {mainText}
    </Tooltip>
  );
};

/**
 * Formats future timestamp as relative time ("in X time").
 *
 * @param {string} timestamp - Future timestamp string
 * @returns {string} Relative time string
 *
 * @example
 * ```tsx
 * // If current time is 10:00
 * formatTimeIn("10:05:00")
 * // Returns: "in 5m"
 * ```
 *
 * @example
 * ```tsx
 * formatTimeIn("12:30:00") // 2.5 hours later
 * // Returns: "in 2h 30m"
 * ```
 */
export const formatTimeIn = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

  const years = Math.floor(diffInSeconds / 31536000);
  const months = Math.floor((diffInSeconds % 31536000) / 2592000);
  const days = Math.floor((diffInSeconds % 2592000) / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  if (years > 0) {
    return years >= 1
      ? `in ${years}y${months > 0 ? ` ${months}m` : ""}`
      : `in ${months}mo${days > 0 ? ` ${days}d` : ""}`;
  } else if (months > 0) {
    return `in ${months}mo${days > 0 ? ` ${days}d` : ""}`;
  } else if (days > 0) {
    return `in ${days}d${hours > 0 ? ` ${hours}h` : ""}`;
  } else if (hours > 0) {
    return `in ${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  } else if (minutes > 0) {
    return `in ${minutes}m${seconds > 0 ? ` ${seconds}s` : ""}`;
  } else {
    return `in ${seconds}s`;
  }
};

export const formatSecondsToTime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let timeString = "";

  if (days > 0) {
    timeString += `${days}d `;
  }
  if (hours > 0) {
    timeString += `${hours}h `;
  }
  if (minutes > 0) {
    timeString += `${minutes}m `;
  }
  if (secs > 0 || timeString === "") {
    timeString += `${secs}s`;
  }

  return timeString.trim();
};

/**
 * Formats past timestamp as relative time ("X time ago").
 *
 * @param {string} timestamp - Past timestamp string
 * @returns {string} Relative time string
 *
 * @example
 * ```tsx
 * // If current time is 10:00
 * formatTimeAgo("09:55:00")
 * // Returns: "5m ago"
 * ```
 *
 * @example
 * ```tsx
 * formatTimeAgo("08:30:00") // 1.5 hours ago
 * // Returns: "1h 30m ago"
 * ```
 *
 * @example
 * ```tsx
 * formatTimeAgo("2024-01-10T10:00:00") // 5 days ago
 * // Returns: "5d ago"
 * ```
 */
export const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const years = Math.floor(diffInSeconds / 31536000);
  const months = Math.floor((diffInSeconds % 31536000) / 2592000);
  const days = Math.floor((diffInSeconds % 2592000) / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  if (years > 0) {
    return years >= 1
      ? `${years}y${months > 0 ? ` ${months}mo` : ""} ago`
      : `${months}mo${days > 0 ? ` ${days}d` : ""} ago`;
  } else if (months > 0) {
    return `${months}mo${days > 0 ? ` ${days}d` : ""} ago`;
  } else if (days > 0) {
    return `${days}d${hours > 0 ? ` ${hours}h` : ""} ago`;
  } else if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes}m${seconds > 0 ? ` ${seconds}s` : ""} ago`;
  } else {
    return `${seconds}s ago`;
  }
};
