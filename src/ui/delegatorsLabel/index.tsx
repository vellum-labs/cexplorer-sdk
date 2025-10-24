import type { FC } from "react";
import { Tooltip } from "@/ui/tooltip";
import { Info } from "lucide-react";

/**
 * Props for the DelegatorsLabel component
 */
export interface DelegatorsLabelProps {
  /**
   * Minimum delegation amount in ADA required to be counted
   * This threshold filters out very small delegations from the count
   *
   * @example "10"
   * @example "100"
   * @example "1000"
   */
  minDelegationAda: string;
}

/**
 * DelegatorsLabel displays a "Delegators" label with an info tooltip explaining the minimum delegation threshold.
 *
 * This component is used in stake pool tables and statistics to label the delegators count column.
 * It includes an info icon with a tooltip that explains only delegations above a certain ADA amount
 * are counted, helping users understand why the delegator count might differ from what they expect.
 * This is important for filtering out dust delegations and providing meaningful metrics.
 *
 * **Common Use Cases:**
 * - Stake pool delegator count column headers
 * - Pool statistics tables
 * - Delegation analytics dashboards
 * - Pool comparison views
 * - Filtering out dust delegations (very small amounts)
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with 10 ADA minimum
 * <DelegatorsLabel minDelegationAda="10" />
 *
 * // Higher threshold for premium pools
 * <DelegatorsLabel minDelegationAda="1000" />
 *
 * // In a table header
 * <th>
 *   <DelegatorsLabel minDelegationAda="100" />
 * </th>
 *
 * // Custom threshold
 * const minThreshold = "500";
 * <DelegatorsLabel minDelegationAda={minThreshold} />
 * ```
 *
 * @param {DelegatorsLabelProps} props - Component props
 * @param {string} props.minDelegationAda - Minimum delegation amount in ADA
 * @returns {JSX.Element} Label with "Delegators" text and info tooltip
 */
export const DelegatorsLabel: FC<DelegatorsLabelProps> = ({ minDelegationAda }) => {
  return (
    <span className='flex items-center gap-1'>
      Delegators
      <Tooltip
        content={`Only delegations above ${minDelegationAda} ADA are counted.`}
      >
        <Info size={14} className='text-grayTextPrimary' />
      </Tooltip>
    </span>
  );
};
