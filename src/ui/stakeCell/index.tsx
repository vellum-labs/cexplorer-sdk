import { lovelaceToAda } from "@/utils/lovelaceToAda";
import { formatNumber } from "@/utils/format";

/**
 * Props for the StakeCell component
 */
export interface StakeCellProps {
  /**
   * Current stake amount in Lovelace (1 ADA = 1,000,000 Lovelace)
   *
   * @example
   * <StakeCell stake={50000000000} maxStake={100000000000} />
   */
  stake: number;

  /**
   * Maximum stake amount in Lovelace used to calculate percentage
   *
   * @example
   * <StakeCell stake={75000000000} maxStake={100000000000} />
   */
  maxStake: number;

  /**
   * Text to display when stake or maxStake is not available
   *
   * @default "Unknown"
   * @example
   * <StakeCell stake={0} maxStake={0} unknownLabel="N/A" />
   */
  unknownLabel?: string;
}

/**
 * StakeCell displays Cardano stake amount in ADA with a visual progress bar showing percentage of maximum stake.
 *
 * Converts Lovelace to ADA (divides by 1,000,000), formats the number for readability,
 * and displays a two-color progress bar (green for current stake, yellow for remaining)
 * to provide visual feedback on stake utilization relative to maximum stake.
 *
 * **Common Use Cases:**
 * - Pool stake visualization
 * - Delegation amount display
 * - Total stake indicators in pool lists
 * - Stake distribution charts
 * - Wallet stake balance displays
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - 50 million ADA (50% of 100M max)
 * <StakeCell stake={50000000000000} maxStake={100000000000000} />
 *
 * // Small pool - 1 million ADA (10% of 10M max)
 * <StakeCell stake={1000000000000} maxStake={10000000000000} />
 *
 * // Large pool - 60 million ADA (75% of 80M max)
 * <StakeCell stake={60000000000000} maxStake={80000000000000} />
 * ```
 *
 * @param {StakeCellProps} props - Component props
 * @param {number} props.stake - Current stake amount in Lovelace (1 ADA = 1,000,000 Lovelace)
 * @param {number} props.maxStake - Maximum stake amount in Lovelace used to calculate percentage
 * @param {string} [props.unknownLabel="Unknown"] - Text to display when stake data is unavailable
 * @returns {JSX.Element} Stake display in ADA with percentage and visual progress bar
 */
export const StakeCell = ({
  stake,
  maxStake,
  unknownLabel = "Unknown",
}: StakeCellProps) => {
  if (!stake || !maxStake)
    return <p className='text-left'>{unknownLabel}</p>;

  const ada = lovelaceToAda(stake);
  const percent = ((stake / maxStake) * 100).toFixed(1);

  return (
    <div className='flex flex-col gap-1/2'>
      <span className='text-[12px] font-semibold text-grayTextPrimary'>
        {formatNumber(ada)}
      </span>
      <div className='relative h-2 w-full overflow-hidden rounded-[4px] bg-[#FEC84B]'>
        <span
          className='absolute bottom-0 left-0 h-2 rounded-bl-[4px] rounded-tl-[4px] bg-[#47CD89]'
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
