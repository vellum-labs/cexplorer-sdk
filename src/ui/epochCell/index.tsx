import { Link } from "@tanstack/react-router";
import { PulseDot } from "@/ui/pulseDot";

/**
 * Props for the EpochCell component
 */
export interface EpochCellProps {
  /**
   * Epoch number to display.
   * If undefined, displays "-" placeholder.
   *
   * @example
   * <EpochCell no={450} currentEpoch={455} />
   */
  no: number | undefined;

  /**
   * Current epoch number for comparison and calculations.
   * Used to determine if epoch is current and for subtraction logic.
   *
   * @optional
   * @example
   * <EpochCell no={450} currentEpoch={455} />
   */
  currentEpoch?: number;

  /**
   * When true, displays the difference between currentEpoch and no instead of the epoch number.
   * Requires currentEpoch to be provided.
   *
   * @default false
   * @example
   * // Shows "5" as a link (if currentEpoch is 455 and no is 450)
   * <EpochCell no={450} currentEpoch={455} substractFromCurrent />
   */
  substractFromCurrent?: boolean;

  /**
   * When true, shows a pulse dot next to the current epoch number.
   * Shows an empty space for past epochs to maintain alignment.
   *
   * @default false
   * @example
   * <EpochCell no={455} currentEpoch={455} showPulseDot />
   */
  showPulseDot?: boolean;

  /**
   * Horizontal alignment of the epoch cell content.
   *
   * @default "end"
   * @example
   * // Right-aligned (default, for tables)
   * <EpochCell no={450} currentEpoch={455} justify="end" />
   *
   * @example
   * // Left-aligned
   * <EpochCell no={450} currentEpoch={455} justify="start" />
   *
   * @example
   * // Center-aligned
   * <EpochCell no={450} currentEpoch={455} justify="center" />
   */
  justify?: "start" | "center" | "end";
}

/**
 * EpochCell displays a Cardano epoch number as a clickable link with optional pulse indicator.
 *
 * This component renders epoch numbers with automatic routing to epoch detail pages.
 * It supports showing a pulse dot for the current epoch, displaying epoch differences,
 * and handling future/past epochs differently.
 *
 * **Key Features:**
 * - Automatic link generation to `/epoch/$no` route
 * - Pulse dot indicator for current epoch
 * - Option to display epoch difference (currentEpoch - no)
 * - Handles undefined/null epochs gracefully
 * - Future epochs displayed as plain text (not clickable)
 * - Configurable alignment (start, center, end) - right-aligned by default for tables
 *
 * **Epoch Display Logic:**
 * 1. If `no` is undefined → displays "-"
 * 2. If `no` > `currentEpoch` → displays as plain text (future epoch)
 * 3. If `substractFromCurrent` → displays difference as link
 * 4. Otherwise → displays epoch number as link
 * 5. If `showPulseDot` and is current epoch → shows animated pulse dot
 *
 * **Common Use Cases:**
 * - Display epoch numbers in block/transaction tables
 * - Show current epoch with pulse indicator in dashboards
 * - Display relative epochs (e.g., "5 epochs ago" as just "5")
 * - Epoch listings in governance proposals
 * - Stake snapshot epoch displays
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <EpochCell no={450} currentEpoch={455} />
 * // Renders: <Link to="/epoch/450">450</Link>
 * ```
 *
 * @example
 * ```tsx
 * // Current epoch with pulse dot
 * <EpochCell no={455} currentEpoch={455} showPulseDot />
 * // Renders: <PulseDot /> <Link to="/epoch/455">455</Link>
 * ```
 *
 * @example
 * ```tsx
 * // Show difference from current epoch
 * <EpochCell no={450} currentEpoch={455} substractFromCurrent />
 * // Renders: <Link to="/epoch/5">5</Link> (455 - 450)
 * ```
 *
 * @example
 * ```tsx
 * // Future epoch (not clickable)
 * <EpochCell no={460} currentEpoch={455} />
 * // Renders: <span>460</span>
 * ```
 *
 * @example
 * ```tsx
 * // Left-aligned epoch (for non-table contexts)
 * <EpochCell no={450} currentEpoch={455} justify="start" />
 * ```
 *
 * @example
 * ```tsx
 * // Center-aligned epoch
 * <EpochCell no={450} currentEpoch={455} justify="center" />
 * ```
 *
 * @example
 * ```tsx
 * // In a table with current epoch indicator
 * <table>
 *   {epochs.map(epoch => (
 *     <tr key={epoch.no}>
 *       <td>
 *         <EpochCell
 *           no={epoch.no}
 *           currentEpoch={currentEpoch}
 *           showPulseDot
 *         />
 *       </td>
 *     </tr>
 *   ))}
 * </table>
 * ```
 *
 * @param {EpochCellProps} props - Component props
 * @param {number | undefined} props.no - Epoch number to display
 * @param {number} [props.currentEpoch] - Current epoch for comparison
 * @param {boolean} [props.substractFromCurrent=false] - Display difference instead of epoch number
 * @param {boolean} [props.showPulseDot=false] - Show pulse dot for current epoch
 * @param {"start" | "center" | "end"} [props.justify="end"] - Horizontal alignment of content
 * @returns {JSX.Element} An epoch link or text with optional pulse indicator
 */
export const EpochCell = ({
  no,
  currentEpoch,
  substractFromCurrent,
  showPulseDot,
  justify = "end",
}: EpochCellProps) => {
  const isCurrentEpoch = currentEpoch !== undefined && currentEpoch === no;

  if (no === undefined) {
    return <span className={`flex justify-${justify}`}>-</span>;
  }

  if (currentEpoch !== undefined && no > currentEpoch) {
    return <span className={`flex justify-${justify}`}>{no}</span>;
  }

  if (substractFromCurrent && currentEpoch !== undefined) {
    return (
      <Link
        to='/epoch/$no'
        params={{ no: String(currentEpoch - no) }}
        className={`flex justify-${justify} text-primary`}
      >
        {currentEpoch - no}
      </Link>
    );
  }

  const content = (
    <Link
      to='/epoch/$no'
      params={{ no: String(no) }}
      className={`flex justify-${justify} text-primary`}
    >
      {no}
    </Link>
  );

  if (showPulseDot && isCurrentEpoch) {
    return (
      <div className={`flex items-center justify-${justify} gap-1.5`}>
        <PulseDot />
        {content}
      </div>
    );
  }

  if (showPulseDot) {
    return (
      <div className={`flex items-center justify-${justify} gap-1.5`}>
        <div className='h-2 w-2' />
        {content}
      </div>
    );
  }

  return content;
};
