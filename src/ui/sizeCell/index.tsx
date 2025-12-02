/**
 * Props for the SizeCell component
 */
export interface SizeCellProps {
  /**
   * Maximum size value in bytes used to calculate percentage
   *
   * @example
   * <SizeCell maxSize={1000000} size={500000} />
   */
  maxSize: number;

  /**
   * Current size value in bytes to display
   *
   * @example
   * <SizeCell maxSize={1000000} size={750000} />
   */
  size: number;
}

/**
 * SizeCell displays file or data size with a visual progress bar showing percentage of maximum size.
 *
 * Converts bytes to kilobytes and displays both the size in kB and the percentage relative
 * to the maximum size. Shows a two-color progress bar (green for used, yellow for remaining)
 * to provide visual feedback on size utilization.
 *
 * **Common Use Cases:**
 * - Block size visualization in blockchain explorers
 * - Transaction size display
 * - File size indicators
 * - Storage utilization displays
 * - Data usage meters
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - 50% filled
 * <SizeCell maxSize={1000000} size={500000} />
 *
 * // Nearly full (75%)
 * <SizeCell maxSize={1024000} size={768000} />
 *
 * // Small usage (10%)
 * <SizeCell maxSize={100000} size={10000} />
 * ```
 *
 * @param {SizeCellProps} props - Component props
 * @param {number} props.maxSize - Maximum size value in bytes used to calculate percentage
 * @param {number} props.size - Current size value in bytes to display
 * @returns {JSX.Element} Size display with kilobytes, percentage, and visual progress bar
 */
export const SizeCell = ({ maxSize, size }: SizeCellProps) => {
  const sizeInKb = (size / 1024).toFixed(1);
  const percent = ((size / maxSize) * 100).toFixed(1);

  if (!size || !maxSize) return <p className='text-right'>Unknown</p>;

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between gap-1/2'>
        <span className='text-[12px] font-semibold text-grayTextPrimary'>
          {sizeInKb}kB{" "}
        </span>
        <span className='text-[11px] font-medium text-grayTextPrimary'>
          ({percent}%)
        </span>
      </div>
      <div className='relative h-2 w-full overflow-hidden rounded-[4px] bg-[#FEC84B]'>
        <span
          className='absolute bottom-0 left-0 block h-2 rounded-bl-[4px] rounded-tl-[4px] bg-[#47CD89]'
          style={{ width: `${percent}%` }}
        ></span>
      </div>
    </div>
  );
};
