import type { FC } from "react";

/**
 * Props for the SizeCard component
 */
export interface BlockDetailSizeProps {
  /**
   * Maximum allowed size in bytes (used to calculate percentage)
   * Used as the denominator when calculating size utilization percentage
   *
   * @example
   * <SizeCard
   *   maxSize={90112}
   *   size={45678}
   *   title="Block Size"
   *   icon={<Icon name="box" size={16} />}
   * />
   */
  maxSize: number | undefined;

  /**
   * Current size in bytes
   * This value will be converted to kilobytes for display (divided by 1024)
   *
   * @example
   * // 45678 bytes will display as "44.61kB"
   * <SizeCard
   *   size={45678}
   *   maxSize={90112}
   *   title="Transaction Size"
   *   icon={<Icon name="file" size={16} />}
   * />
   */
  size: number | undefined;

  /**
   * Title/label displayed above the size value
   * Describes what type of size is being shown
   *
   * @example
   * <SizeCard
   *   title="Block Size"
   *   size={65536}
   *   maxSize={90112}
   *   icon={<Icon name="box" size={16} />}
   * />
   */
  title: string;

  /**
   * Icon element displayed in the card header (left of title)
   * Typically an Icon component representing the data type
   *
   * @example
   * <SizeCard
   *   title="Script Size"
   *   icon={<Icon name="file-code" size={16} />}
   *   size={12345}
   *   maxSize={65536}
   * />
   */
  icon: JSX.Element;

  /**
   * Enable transaction mode to show memory and CPU steps
   * When true, displays Mem and CPU Steps metrics below size
   *
   * @optional
   * @default false
   */
  isTx?: boolean;

  /**
   * Maximum transaction execution memory (from epoch_param.max_tx_ex_mem)
   * Used to calculate memory utilization percentage
   *
   * @optional
   * @example
   * // From epoch_param API response
   * max_tx_ex_mem={14000000}
   */
  max_tx_ex_mem?: number;

  /**
   * Maximum transaction execution steps (from epoch_param.max_tx_ex_steps)
   * Used to calculate CPU steps utilization percentage
   *
   * @optional
   * @example
   * // From epoch_param API response
   * max_tx_ex_steps={10000000000}
   */
  max_tx_ex_steps?: number;

  /**
   * Actual transaction execution memory used
   * Displayed as "Mem: X (Y%)" when isTx is true
   *
   * @optional
   * @example
   * tx_ex_mem={1185384}
   * // Displays: "Mem: 1,185,384 (8.47%)" with max_tx_ex_mem={14000000}
   */
  tx_ex_mem?: number;

  /**
   * Actual transaction execution steps (CPU steps) used
   * Displayed as "CPU Steps: X (Y%)" when isTx is true
   *
   * @optional
   * @example
   * tx_ex_steps={267476469}
   * // Displays: "CPU Steps: 267,476,469 (2.67%)" with max_tx_ex_steps={10000000000}
   */
  tx_ex_steps?: number;
}

/**
 * SizeCard displays blockchain data size metrics with visual progress indicator.
 *
 * A compact card component designed to show size information (in bytes/kilobytes) with
 * a percentage utilization bar. Commonly used for displaying block sizes, transaction sizes,
 * and script sizes in relation to their maximum allowed values. The component automatically
 * converts bytes to kilobytes and calculates the percentage of maximum size used.
 *
 * **Features:**
 * - Fixed height (110px) for consistent layouts
 * - Automatic byte to kilobyte conversion (÷ 1024)
 * - Visual progress bar showing size utilization
 * - Percentage calculation (size/maxSize × 100)
 * - Handles undefined/missing values gracefully
 * - Theme-aware styling with cardBg background
 * - Color-coded progress bar (green fill on yellow/orange background)
 *
 * **Size Calculation:**
 * - Size is displayed in kilobytes: `(size / 1024).toFixed(2)` kB
 * - Percentage: `(size / maxSize × 100).toFixed(2)` %
 * - Shows "Unknown" if size is undefined or NaN
 * - Shows "?" if percentage cannot be calculated
 *
 * **Common Use Cases:**
 * - Display block size vs. maximum block size
 * - Show transaction size utilization with memory and CPU steps
 * - Visualize script size limits
 * - Monitor data payload sizes
 * - Track smart contract size constraints
 * - Display transaction execution metrics (memory and CPU steps)
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - Block size
 * <SizeCard
 *   title="Block Size"
 *   icon={<Icon name="box" size={16} />}
 *   size={65536}
 *   maxSize={90112}
 * />
 * // Displays: "64.00kB" with 72.73% progress bar
 *
 * // Transaction size
 * <SizeCard
 *   title="Transaction Size"
 *   icon={<Icon name="arrow-right-left" size={16} />}
 *   size={4096}
 *   maxSize={16384}
 * />
 * // Displays: "4.00kB" with 25.00% progress bar
 *
 * // Script size
 * <SizeCard
 *   title="Script Size"
 *   icon={<Icon name="file-code" size={16} />}
 *   size={12345}
 *   maxSize={65536}
 * />
 * // Displays: "12.06kB" with 18.84% progress bar
 *
 * // Metadata size
 * <SizeCard
 *   title="Metadata Size"
 *   icon={<Icon name="database" size={16} />}
 *   size={2048}
 *   maxSize={16384}
 * />
 * // Displays: "2.00kB" with 12.50% progress bar
 *
 * // Transaction mode with memory and CPU steps
 * <SizeCard
 *   title="Transaction size"
 *   icon={<Icon name="arrow-right-left" size={16} />}
 *   size={1576}
 *   maxSize={16384}
 *   isTx={true}
 *   tx_ex_mem={1185384}
 *   max_tx_ex_mem={14000000}
 *   tx_ex_steps={267476469}
 *   max_tx_ex_steps={10000000000}
 * />
 * // Displays: "1.54kB" with "30%" on same line
 * //           "Mem: 1,185,384 (45%)" and "CPU Steps: 267,476,469 (25%)" below
 *
 * // Handling undefined values
 * <SizeCard
 *   title="Unknown Size"
 *   icon={<Icon name="help-circle" size={16} />}
 *   size={undefined}
 *   maxSize={undefined}
 * />
 * // Displays: "Unknown" with "?" percentage
 *
 * // Multiple cards in a grid
 * <div className="grid grid-cols-3 gap-4">
 *   <SizeCard
 *     title="Block Size"
 *     icon={<Icon name="box" />}
 *     size={65536}
 *     maxSize={90112}
 *   />
 *   <SizeCard
 *     title="Tx Size"
 *     icon={<Icon name="arrow-right-left" />}
 *     size={4096}
 *     maxSize={16384}
 *   />
 *   <SizeCard
 *     title="Script Size"
 *     icon={<Icon name="file-code" />}
 *     size={12345}
 *     maxSize={65536}
 *   />
 * </div>
 * ```
 *
 * @param {BlockDetailSizeProps} props - Component props
 * @param {number | undefined} props.maxSize - Maximum allowed size in bytes
 * @param {number | undefined} props.size - Current size in bytes
 * @param {string} props.title - Title/label for the size metric
 * @param {JSX.Element} props.icon - Icon element for visual identification
 * @returns {JSX.Element} A compact card showing size in kB with percentage bar
 */
export const SizeCard: FC<BlockDetailSizeProps> = ({
  maxSize,
  size,
  title,
  icon,
  isTx = false,
  max_tx_ex_mem,
  max_tx_ex_steps,
  tx_ex_mem,
  tx_ex_steps,
}) => {
  const sizeInKB = size ? (size / 1024).toFixed(2) : undefined;
  const percent =
    size && maxSize ? ((size / maxSize) * 100).toFixed(0) : undefined;

  const memPercent =
    tx_ex_mem && max_tx_ex_mem
      ? ((tx_ex_mem / max_tx_ex_mem) * 100).toFixed(0)
      : undefined;
  const stepsPercent =
    tx_ex_steps && max_tx_ex_steps
      ? ((tx_ex_steps / max_tx_ex_steps) * 100).toFixed(0)
      : undefined;

  const formatNumber = (num: number | undefined): string => {
    if (!num) return "?";
    return num.toLocaleString("en-US");
  };

  return (
    <div className='max-h-[110px] min-h-[110px] rounded-l border border-border bg-cardBg shadow-md'>
      <div className='flex max-h-[110px] min-h-[110px] flex-col gap-1.5 rounded-l px-2 py-1.5'>
        <div className='flex w-full items-center gap-1'>
          <div className='rounded-m border border-border p-1/2'>{icon}</div>
          <span className='text-text-sm text-grayTextPrimary'>{title}</span>
        </div>

        {isTx ? (
          <>
            <div className='flex items-center gap-2'>
              {!isNaN(Number(sizeInKB)) ? (
                <span className='font-semibold text-text'>{sizeInKB}kB</span>
              ) : (
                <span className='font-semibold text-text'>Unknown</span>
              )}

              <div className='relative h-[8px] flex-1 overflow-hidden rounded-[4px] bg-[#FEC84B]'>
                <div
                  className='absolute left-0 top-0 h-[8px] rounded-bl-[4px] rounded-tl-[4px] bg-[#47CD89]'
                  style={{ width: `${percent ?? 0}%` }}
                />
              </div>

              <span className='text-text-sm font-medium text-grayTextPrimary'>
                {!isNaN(Number(percent)) ? percent : "?"}%
              </span>
            </div>

            <div className='-mt-1 flex items-center justify-between text-text-xs'>
              <span className='text-text'>
                Mem: {formatNumber(tx_ex_mem)}{" "}
                <span className='text-brand-600'>
                  ({!isNaN(Number(memPercent)) ? memPercent : "?"}%)
                </span>
              </span>
              <span className='text-text'>
                CPU Steps: {formatNumber(tx_ex_steps)}{" "}
                <span className='text-brand-600'>
                  ({!isNaN(Number(stepsPercent)) ? stepsPercent : "?"}%)
                </span>
              </span>
            </div>
          </>
        ) : (
          <>
            {!isNaN(Number(sizeInKB)) ? (
              <span className='font-semibold text-text'>{sizeInKB}kB</span>
            ) : (
              <span className='font-semibold text-text'>Unknown</span>
            )}
            <div className='flex items-center gap-1.5'>
              <div className='relative h-2 w-2/3 overflow-hidden rounded-[4px] bg-[#FEC84B]'>
                <span
                  className='absolute left-0 block h-2 rounded-bl-[4px] rounded-tl-[4px] bg-[#47CD89]'
                  style={{ width: `${percent ?? 0}%` }}
                ></span>
              </div>
              <span className='text-text-sm font-medium text-grayTextPrimary'>
                {!isNaN(Number(percent)) ? percent : "?"}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
