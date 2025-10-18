import type { FC } from "react";

import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpNarrowWide,
} from "lucide-react";

/**
 * Props for SortArrow component.
 */
export interface SortArrowProps {
  /** Current sort direction: 'asc' for ascending, 'desc' for descending, undefined for unsorted */
  direction: "asc" | "desc" | undefined;
}

/**
 * SortArrow displays a visual indicator for table column sorting state.
 *
 * This component renders different arrow icons based on the current sort
 * direction of a table column. It's typically used in table headers to
 * indicate which column is being sorted and in which direction.
 *
 * **Features:**
 * - Three visual states (unsorted, ascending, descending)
 * - Lucide icons for clear sorting indicators
 * - Gray color for subtle UI integration
 * - Fixed size (15px) with consistent spacing
 * - Slight vertical adjustment for better alignment
 *
 * **Sort States:**
 * - **Undefined**: `ArrowUpDown` - Column is not sorted (neutral state)
 * - **Ascending** (`asc`): `ArrowUpNarrowWide` - Sorted A→Z, 0→9, oldest→newest
 * - **Descending** (`desc`): `ArrowDownWideNarrow` - Sorted Z→A, 9→0, newest→oldest
 *
 * **Common Use Cases:**
 * - Transaction table column headers (sort by time, amount, fee)
 * - Block explorer data tables (sort by block number, epoch)
 * - Stake pool listings (sort by saturation, ROA, pledge)
 * - Address transaction history sorting
 *
 * @component
 * @example
 * ```tsx
 * // Unsorted column header
 * <th onClick={handleSort}>
 *   Amount <SortArrow direction={undefined} />
 * </th>
 *
 * // Ascending sort
 * <th onClick={handleSort}>
 *   Time <SortArrow direction="asc" />
 * </th>
 *
 * // Descending sort
 * <th onClick={handleSort}>
 *   Block <SortArrow direction="desc" />
 * </th>
 * ```
 *
 * @param {SortArrowProps} props - Component props
 * @param {"asc" | "desc" | undefined} props.direction - Current sort direction
 * @returns {JSX.Element} Sort indicator icon based on direction
 */
export const SortArrow: FC<SortArrowProps> = ({ direction }) => {
  return direction === undefined ? (
    <p className='min-h-3 min-w-3'>
      {" "}
      <ArrowUpDown size={15} className='stroke-grayText translate-y-[1px]' />
    </p>
  ) : direction === "asc" ? (
    <p className='min-h-3 min-w-3'>
      <ArrowUpNarrowWide
        size={15}
        className='stroke-grayText translate-y-[1px]'
      />
    </p>
  ) : (
    <p className='min-h-3 min-w-3'>
      <ArrowDownWideNarrow
        size={15}
        className='stroke-grayText translate-y-[1px]'
      />
    </p>
  );
};
