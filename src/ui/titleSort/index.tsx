import type { FC, ReactNode } from "react";

import { getColumnsSortOrder } from "@/utils/getColumnsSortOrder";
import { useNavigate } from "@tanstack/react-router";
import { SortArrow } from "@/ui/sortArrow";

/**
 * Props for the TitleSort component
 */
export interface TitleSortProps {
  /**
   * Current active column order/name being sorted
   *
   * @example
   * <TitleSort order="timestamp" titleOrder="timestamp" sort="desc">Time</TitleSort>
   */
  order?: string;

  /**
   * The column order/name this title represents
   *
   * @example
   * <TitleSort titleOrder="amount" sort="asc">Amount</TitleSort>
   */
  titleOrder: string;

  /**
   * Current sort direction for this column
   *
   * @example
   * <TitleSort titleOrder="block" sort="desc">Block</TitleSort>
   */
  sort?: "asc" | "desc";

  /**
   * The title/label to display (typically column header text)
   *
   * @example
   * <TitleSort titleOrder="size">Size</TitleSort>
   */
  children: ReactNode;
}

/**
 * TitleSort provides a clickable table column header with sort functionality and visual indicators.
 *
 * This component is used in table headers to enable column sorting. It displays a title with
 * a sort arrow indicator and handles click events to cycle through sort states (no sort → desc → asc → no sort).
 * Updates the URL search parameters via TanStack Router to maintain sort state.
 *
 * **Common Use Cases:**
 * - Sortable table column headers
 * - Data grid column sorting
 * - Transaction list sorting by time, amount, block, etc.
 * - Pool list sorting by stake, fees, performance
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - inactive column
 * <TitleSort titleOrder="amount">
 *   Amount
 * </TitleSort>
 *
 * // Active column with descending sort
 * <TitleSort order="timestamp" titleOrder="timestamp" sort="desc">
 *   Time
 * </TitleSort>
 *
 * // Active column with ascending sort
 * <TitleSort order="block" titleOrder="block" sort="asc">
 *   Block
 * </TitleSort>
 *
 * // Different column is active (this one is inactive)
 * <TitleSort order="timestamp" titleOrder="amount" sort="desc">
 *   Amount
 * </TitleSort>
 * ```
 *
 * @param {TitleSortProps} props - Component props
 * @param {string} [props.order] - Current active column order/name being sorted
 * @param {string} props.titleOrder - The column order/name this title represents
 * @param {"asc" | "desc"} [props.sort] - Current sort direction for this column
 * @param {ReactNode} props.children - The title/label to display (typically column header text)
 * @returns {JSX.Element} Clickable column header with sort arrow indicator
 */
export const TitleSort: FC<TitleSortProps> = ({
  order,
  sort,
  titleOrder,
  children,
}) => {
  const navigate = useNavigate();

  const getOrder = (orderValue: string) => {
    return getColumnsSortOrder(sort) !== undefined || order !== orderValue
      ? orderValue
      : undefined;
  };

  return (
    <div className='flex w-full justify-end'>
      <div
        className='flex w-fit cursor-pointer items-center gap-1/2 text-right'
        onClick={() => {
          navigate({
            search: {
              sort: order === titleOrder ? getColumnsSortOrder(sort) : "desc",
              order: getOrder(titleOrder),
            } as any,
          });
        }}
      >
        {children}
        <SortArrow direction={order === titleOrder ? sort : undefined} />
      </div>
    </div>
  );
};
