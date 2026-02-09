import { useNavigate } from "@tanstack/react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components";

import { useInfiniteScrollingStore } from "@/stores/infiniteScrollingStore";
import { isMobileDevice } from "@/utils/isMobileDevice";
import { paginateArray } from "@/utils/paginateArray";
import type {
  InfiniteData,
  UseInfiniteQueryResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { Funnel, HelpCircle } from "lucide-react";
import type { MouseEventHandler, ReactNode, RefObject } from "react";
import React, { useEffect, useRef, useState } from "react";
import { FunnelFilter } from "../funnelFilter";
import { LoadingSkeleton } from "../loadingSkeleton";
import { NoResultsFound } from "../noResultsFound";
import { Pagination } from "../pagination";
import { Tooltip } from "../tooltip";

/**
 * Column definition for GlobalTable.
 *
 * Defines how each column should be rendered, its behavior, and optional features
 * like filtering, ranking, and drag-and-drop reordering.
 *
 * @template T - Type of data items in the table
 *
 * @example
 * ```tsx
 * const columns: Column<Transaction>[] = [
 *   {
 *     key: "hash",
 *     title: "Transaction Hash",
 *     widthPx: 300,
 *     visible: true,
 *     render: (tx) => <Copy value={tx.hash} />,
 *     helper: "Unique identifier for this transaction on the blockchain"
 *   },
 *   {
 *     key: "block",
 *     title: "Block",
 *     widthPx: 120,
 *     visible: true,
 *     render: (tx) => tx.blockHeight,
 *     helper: (
 *       <div>
 *         Block height in the blockchain.
 *         <a href="/blocks" className="text-primary">Learn more</a>
 *       </div>
 *     )
 *   }
 * ];
 * ```
 */
export type Column<T> = {
  /** Unique identifier for the column */
  key: string;
  /** Column header title (can be text or React component) */
  title: React.ReactNode;
  /** If true, shows row ranking number instead of rendered content */
  standByRanking?: boolean;
  /** Function to render cell content for each row item */
  render: (item: T) => React.ReactNode | null;
  /** Additional content to display in the column header */
  extraContent?: React.ReactNode;
  /** Fixed width in pixels for the column */
  widthPx?: number;
  /** Controls column visibility */
  visible?: boolean;
  /** Ranking order direction (ascending or descending) */
  rankingStart?: "asc" | "desc";
  /** Additional CSS classes for table cells in this column */
  className?: string;
  /** Helper text/content to display in a tooltip with question mark icon. Supports HTML and React components. */
  helper?: React.ReactNode;
  /** Filter configuration for the column */
  filter?: {
    /** Whether filter popover is currently open */
    filterOpen?: boolean;
    /** Whether filter is currently active/applied */
    activeFunnel?: boolean;
    /** Filter UI content (inputs, checkboxes, etc.) */
    filterContent?: ReactNode;
    /** Disables the filter apply button */
    filterButtonDisabled?: boolean;
    /** Ref for filter popover anchor positioning */
    anchorRef: RefObject<any>;
    /** Width of the filter popover */
    width?: string;
    /** Handler for showing the filter popover */
    onShow?: MouseEventHandler<SVGSVGElement>;
    /** Handler for resetting filter values */
    onReset?: () => void;
    /** Handler for applying filter */
    onFilter?: () => void;
    /** Custom label for the reset button (for i18n) */
    resetLabel?: string;
    /** Custom label for the filter button (for i18n) */
    filterLabel?: string;
  };
};

/**
 * Base props shared by all GlobalTable variants.
 *
 * @template T - Type of data items in the table
 */
type PropsBase<T> = {
  /** Array of data items to display in table rows */
  items: T[] | undefined;
  /** Column definitions for the table */
  columns: Column<T>[];
  /** Enables horizontal scrolling on smaller screens */
  scrollable?: boolean;
  /** Total number of items (for pagination) */
  totalItems?: number;
  /** Number of items to display per page */
  itemsPerPage?: number;
  /** Enables ranking display mode */
  standByRanking?: boolean;
  /** Callback when column order changes via drag-and-drop */
  onOrderChange?: (columns: any[]) => void;
  /** Minimum content width in pixels before horizontal scroll */
  minContentWidth?: number;
  /** Disables column drag-and-drop reordering */
  disableDrag?: boolean;
  /** Height of each table row in pixels */
  rowHeight?: number;
  /** Custom render function for display text (for i18n). Receives count and total, returns formatted string */
  renderDisplayText?: (count: number, total: number) => string;
  /** Custom label for "no items" text (for i18n) */
  noItemsLabel?: string;
};

/**
 * Props for infinite scroll query variant.
 *
 * @template T - Type of data items in the table
 */
interface InfiniteQueryProps<T> extends PropsBase<T> {
  /** Query type identifier */
  type: "infinite";
  /** TanStack Query infinite query result */
  query: UseInfiniteQueryResult<InfiniteData<any>, unknown>;
  /** Current page number */
  currentPage: number;
}

/**
 * Props for default query variant with optional pagination.
 *
 * @template T - Type of data items in the table
 */
interface QueryProps<T> extends PropsBase<T> {
  /** Query type identifier */
  type: "default";
  /** TanStack Query standard query result */
  query: UseQueryResult<any, unknown>;
  /** Enables client-side pagination */
  pagination?: boolean;
}

/**
 * Union type for all possible GlobalTable props configurations.
 *
 * @template T - Type of data items in the table
 */
type Props<T> = InfiniteQueryProps<T> | QueryProps<T>;

/**
 * GlobalTable - A feature-rich data table component for blockchain data.
 *
 * This component provides a comprehensive table solution with support for infinite scrolling,
 * pagination, column reordering, filtering, ranking, and responsive design. It's optimized
 * for displaying large datasets of blockchain information like transactions, blocks, and addresses.
 *
 * **Key Features:**
 * - **Two Query Modes**: Support for infinite scroll and paginated queries
 * - **Column Reordering**: Drag-and-drop column reordering (desktop) or click-to-swap (mobile)
 * - **Filtering**: Per-column filtering with funnel UI
 * - **Pagination**: Client-side or server-side pagination
 * - **Infinite Scrolling**: Automatic data fetching on scroll
 * - **Ranking Mode**: Display row numbers instead of data
 * - **Loading States**: Skeleton loaders during data fetch
 * - **Empty States**: User-friendly no results display
 * - **Responsive**: Horizontal scrolling on mobile
 * - **Sticky Header**: Header sticks to top during scroll (infinite mode)
 * - **Customizable**: Custom row heights, column widths, styling
 *
 * **Common Use Cases:**
 * - Transaction lists
 * - Block explorer tables
 * - Address transaction history
 * - Stake pool lists
 * - Token holder tables
 * - NFT collection displays
 *
 * @component
 * @template T - Type of data items in the table rows
 *
 * @example
 * ```tsx
 * // Basic table with pagination
 * interface Transaction {
 *   hash: string;
 *   block: number;
 *   age: string;
 *   amount: string;
 * }
 *
 * const columns: Column<Transaction>[] = [
 *   {
 *     key: "hash",
 *     title: "Transaction Hash",
 *     widthPx: 300,
 *     visible: true,
 *     render: (tx) => <Copy value={tx.hash} />
 *   },
 *   {
 *     key: "block",
 *     title: "Block",
 *     widthPx: 120,
 *     visible: true,
 *     render: (tx) => tx.block
 *   }
 * ];
 *
 * function TransactionTable() {
 *   const query = useQuery({
 *     queryKey: ['transactions'],
 *     queryFn: fetchTransactions
 *   });
 *
 *   return (
 *     <GlobalTable
 *       type="default"
 *       items={query.data?.transactions}
 *       columns={columns}
 *       query={query}
 *       totalItems={query.data?.total}
 *       itemsPerPage={20}
 *       pagination={true}
 *     />
 *   );
 * }
 *
 * // Infinite scroll table
 * function InfiniteTransactionTable() {
 *   const query = useInfiniteQuery({
 *     queryKey: ['transactions'],
 *     queryFn: ({ pageParam = 1 }) => fetchTransactions(pageParam),
 *     getNextPageParam: (lastPage) => lastPage.nextPage
 *   });
 *
 *   const items = query.data?.pages.flatMap(page => page.transactions);
 *
 *   return (
 *     <GlobalTable
 *       type="infinite"
 *       items={items}
 *       columns={columns}
 *       query={query}
 *       currentPage={1}
 *       totalItems={query.data?.pages[0]?.total || 0}
 *       itemsPerPage={20}
 *     />
 *   );
 * }
 *
 * // With column reordering
 * <GlobalTable
 *   type="default"
 *   items={data}
 *   columns={columns}
 *   query={query}
 *   onOrderChange={(newOrder) => {
 *     console.log('New column order:', newOrder);
 *     saveColumnOrder(newOrder);
 *   }}
 * />
 * ```
 *
 * @param {Props<T>} props - Component props
 * @param {T[]} props.items - Array of data items to display
 * @param {Column<T>[]} props.columns - Column definitions
 * @param {"infinite" | "default"} props.type - Query type (infinite scroll or paginated)
 * @param {UseInfiniteQueryResult | UseQueryResult} props.query - TanStack Query result
 * @param {number} [props.totalItems=0] - Total number of items for pagination
 * @param {number} [props.itemsPerPage=20] - Items per page
 * @param {boolean} [props.scrollable] - Enable horizontal scrolling
 * @param {boolean} [props.pagination] - Enable pagination (default query only)
 * @param {number} [props.currentPage] - Current page (infinite query only)
 * @param {(columns: any[]) => void} [props.onOrderChange] - Column order change callback
 * @param {number} [props.minContentWidth=1100] - Minimum width before horizontal scroll
 * @param {boolean} [props.disableDrag=false] - Disable column reordering
 * @param {number} [props.rowHeight=60] - Row height in pixels
 * @returns {JSX.Element} Feature-rich data table component
 */
export const GlobalTable = <T extends Record<string, any>>({
  items: baseItems,
  columns: initialColumns,
  scrollable,
  totalItems = 0,
  itemsPerPage = 20,
  query,
  onOrderChange,
  minContentWidth = 1100,
  disableDrag = false,
  rowHeight = 60,
  type,
  renderDisplayText,
  noItemsLabel,
  ...props
}: Props<T>) => {
  const defaultQueryPagination =
    "pagination" in props && props.pagination === true;
  const currentPage = "currentPage" in props ? props.currentPage : 1;
  const [defaultQueryCurrentPage, setDefaultQueryCurrentPage] =
    useState<number>(currentPage);

  const items =
    "pagination" in props
      ? defaultQueryPagination
        ? paginateArray(baseItems as T[], defaultQueryCurrentPage, itemsPerPage)
        : baseItems
      : baseItems;

  const { infiniteScrolling } = useInfiniteScrollingStore();
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(totalItems / itemsPerPage),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(initialColumns);
  const [scrolled, setScrolled] = useState(false);
  const isEmpty = items?.length === 0 || !items || totalItems === 0;
  const navigate = useNavigate();
  const isLoading =
    query.isLoading || (query as UseInfiniteQueryResult).isFetchingNextPage;
  const targetRef = useRef<HTMLTableElement>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);

  const [firstClickedColumnIndex, setFirstClickedColumnIndex] = useState<
    number | null
  >(null);

  const handleColumnClick = (index: number) => {
    if (!isMobileDevice()) return;
    if (disableDrag || !onOrderChange) return;
    if (firstClickedColumnIndex === null) {
      setFirstClickedColumnIndex(index);
    } else {
      const newColumns = [...columns];
      [newColumns[firstClickedColumnIndex], newColumns[index]] = [
        newColumns[index],
        newColumns[firstClickedColumnIndex],
      ];
      setColumns(newColumns);
      onOrderChange && onOrderChange(newColumns.map(({ key }) => key));
      setColumns(newColumns);
      setFirstClickedColumnIndex(null);
    }
  };

  const handleDragStart = (index: number) => {
    if (isMobileDevice() || !onOrderChange) return;
    setDraggedIndex(index);
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (isMobileDevice()) return;
    e.preventDefault();
    setIsDragging(false);
    setOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (isMobileDevice()) return;
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newColumns = [...columns];
      const draggedItem = newColumns.splice(draggedIndex, 1)[0];
      newColumns.splice(dropIndex, 0, draggedItem);
      setColumns(newColumns);
      onOrderChange && onOrderChange(newColumns.map(({ key }) => key));
    }
    setIsDragging(false);
    setOverIndex(null);
  };

  const indexToRound =
    items?.length && items.length < itemsPerPage
      ? items.length - 1
      : itemsPerPage
        ? itemsPerPage - 1
        : items !== undefined
          ? items?.length - 1
          : 0;

  useEffect(() => {
    if ("pagination" in props) {
      setTotalPages(
        Array.isArray(baseItems)
          ? Math.ceil(baseItems.length / itemsPerPage)
          : 0,
      );
    }
  }, [items]);

  useEffect(() => {
    if (!items && !isLoading) {
      setTotalPages(0);
      return;
    }

    setTotalPages(Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage, items, isLoading]);

  useEffect(() => {
    const fetchOnScroll = () => {
      if (
        targetRef.current &&
        targetRef.current.getBoundingClientRect().bottom <
          window.innerHeight + 200 &&
        !isLoading &&
        (query as UseInfiniteQueryResult).fetchNextPage
      ) {
        (query as UseInfiniteQueryResult).fetchNextPage();
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    if (infiniteScrolling) {
      addEventListener("scroll", fetchOnScroll, { signal });
    }

    return () => {
      controller.abort();
    };
  }, [infiniteScrolling, query, isLoading, currentPage, navigate]);

  useEffect(() => {
    setColumns(initialColumns);
  }, [initialColumns]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const top = headerRef.current.getBoundingClientRect().top;
        setScrolled(top <= 0);
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    window.addEventListener("scroll", handleScroll, { signal });
    return () => {
      controller.abort();
    };
  }, [headerRef]);

  useEffect(() => {
    if (!targetRef.current) return;

    const handleClick = (e: MouseEvent) => {
      if (targetRef.current?.contains(e.target as Node)) return;
      setFirstClickedColumnIndex(null);
    };

    document.addEventListener("mousedown", e => handleClick(e), {
      capture: true,
    });

    return () => {
      document.removeEventListener("mousedown", e => handleClick(e), {
        capture: true,
      });
    };
  }, [targetRef]);

  return (
    <>
      <div
        className={`thin-scrollbar relative w-full max-w-desktop rounded-l border border-border ${scrollable && `overflow-x-auto xl:overflow-visible [&>div]:w-full`}`}
        style={{
          transform: "rotateX(180deg)",
        }}
      >
        <Table
          style={{
            transform: "rotateX(180deg)",
            minWidth: `${minContentWidth}px`,
          }}
          className='thin-scrollbar border-separate border-spacing-0'
          ref={targetRef}
        >
          <TableHeader
            ref={headerRef}
            className={`${infiniteScrolling ? "sticky" : "relative"} ${scrolled && infiniteScrolling ? "shadow-md" : ""} top-0 z-10 ${isEmpty && !isLoading ? "border-none" : ""} ${disableDrag && "pointer-events-none"}`}
          >
            <tr className=''>
              {columns.map(({ title, widthPx, visible, filter, helper }, index) => (
                <React.Fragment key={index + "head"}>
                  {visible && (
                    <TableHead
                      key={index + "header"}
                      draggable
                      onDragStart={
                        onOrderChange ? () => handleDragStart(index) : undefined
                      }
                      onDragOver={
                        onOrderChange
                          ? e => handleDragOver(e, index)
                          : undefined
                      }
                      onDrop={
                        onOrderChange ? e => handleDrop(e, index) : undefined
                      }
                      onClick={() => handleColumnClick(index)}
                      style={{
                        maxWidth: `${widthPx || 200}px`,
                        width: `${widthPx}px`,
                        filter:
                          firstClickedColumnIndex !== null &&
                          firstClickedColumnIndex !== index
                            ? `hue-rotate(${index * 20}deg)`
                            : "none",
                      }}
                      className={`relative box-border rounded-t-xl ${isEmpty && !isLoading ? "first:rounded-bl-xl last:rounded-br-xl" : "border-b border-border"} bg-darker font-semibold ${isMobileDevice() || !onOrderChange ? "cursor-pointer" : "cursor-move"} last:pr-4 ${firstClickedColumnIndex !== null && firstClickedColumnIndex !== index && `bg-yellow-200/20 border border-dashed border-yellow-400`} table-cell first:pl-4 ${firstClickedColumnIndex !== null && "text-text [&>p]:text-text"} ${firstClickedColumnIndex === index || (isDragging && draggedIndex === index && "border border-dashed border-text text-grayTextPrimary [&>p]:text-grayTextPrimary")} ${overIndex === index && "bg-border"}`}
                    >
                      <div className='flex items-center gap-1/2'>
                        {title}
                        {helper && (
                          <Tooltip content={helper}>
                            <HelpCircle
                              size={15}
                              className='inline min-w-[15px] cursor-help text-grayTextPrimary hover:text-text'
                              onMouseDown={e => e.stopPropagation()}
                            />
                          </Tooltip>
                        )}
                        {filter && (
                          <Funnel
                            size={15}
                            className={`inline min-w-[20px] cursor-pointer ${filter?.activeFunnel ? "text-primary" : ""}`}
                            onClick={filter.onShow}
                            onMouseDown={e => e.stopPropagation()}
                          />
                        )}
                        {filter?.filterOpen && (
                          <FunnelFilter
                            anchorRef={filter.anchorRef}
                            onReset={filter.onReset}
                            onFilter={filter.onFilter}
                            disabled={filter.filterButtonDisabled}
                            width={filter?.width}
                            resetLabel={filter.resetLabel}
                            filterLabel={filter.filterLabel}
                          >
                            {filter.filterContent}
                          </FunnelFilter>
                        )}
                      </div>
                    </TableHead>
                  )}
                </React.Fragment>
              ))}
            </tr>
          </TableHeader>
          <TableBody className='text-grayTextPrimary'>
            {isLoading && !infiniteScrolling ? (
              <>
                {Array.from(
                  { length: itemsPerPage },
                  (_, index) =>
                    index + currentPage * itemsPerPage - itemsPerPage,
                ).map(index => (
                  <TableRow
                    style={{
                      height: `${rowHeight}px`,
                      maxHeight: `${rowHeight}px`,
                    }}
                    key={"loaderTr" + index}
                  >
                    {columns.map(({ widthPx, visible, className }, i) => (
                      <React.Fragment key={"loaderTh" + i}>
                        {visible && (
                          <TableCell
                            key={`loaderTh-${index}-${i}`}
                            style={{
                              maxWidth: `${widthPx || 100}px`,
                              width: `${widthPx || 100}px`,
                              height: `${rowHeight}px`,
                              maxHeight: `${rowHeight}px`,
                            }}
                            className={`${index % 2 !== 0 ? "bg-darker" : ""} ${indexToRound === index ? "first:rounded-bl-xl last:rounded-br-xl" : ""} table-cell py-1 text-left first:pl-4 last:pr-4 [&>a]:text-primary ${className}`}
                          >
                            <LoadingSkeleton height='20px' />
                          </TableCell>
                        )}
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                {items?.map((item, index) => (
                  <TableRow
                    style={{
                      height: `${rowHeight}px`,
                      maxHeight: `${rowHeight}px`,
                    }}
                    key={`tr${index}`}
                    className={`${index % 2 !== 0 ? "bg-darker" : ""} group duration-150`}
                  >
                    {columns.map(
                      (
                        {
                          widthPx,
                          render,
                          visible,
                          className,
                          standByRanking,
                          rankingStart,
                        },
                        i,
                      ) => (
                        <React.Fragment key={"th" + i}>
                          {visible && (
                            <TableCell
                              key={`th-${index}-${i}`}
                              style={{
                                maxWidth: `${widthPx || 100}px`,
                                width: `${widthPx || 100}px`,
                                height: `${rowHeight}px`,
                                maxHeight: `${rowHeight}px`,
                              }}
                              className={`${indexToRound === index ? "first:rounded-bl-xl last:rounded-br-xl" : ""} table-cell py-1 text-left duration-200 first:pl-4 last:pr-4 group-hover:bg-tableHover ${className}`}
                            >
                              {!standByRanking
                                ? item && render(item)
                                : rankingStart === "asc"
                                  ? (totalItems ?? 0) - index
                                  : itemsPerPage * (currentPage - 1) +
                                    index +
                                    1}
                            </TableCell>
                          )}
                        </React.Fragment>
                      ),
                    )}
                  </TableRow>
                ))}
              </>
            )}

            {isLoading && infiniteScrolling && (
              <>
                {Array.from(
                  { length: itemsPerPage },
                  (_, index) =>
                    index + currentPage * itemsPerPage - itemsPerPage,
                ).map(index => (
                  <TableRow
                    style={{
                      height: `${rowHeight}px`,
                      maxHeight: `${rowHeight}px`,
                    }}
                    className={`${index % 2 !== 0 ? "bg-darker" : ""}`}
                    key={"infiniteLoader" + index}
                  >
                    {columns.map(({ widthPx, visible }, i) => (
                      <React.Fragment key={"infiniteLoader" + index + i}>
                        {visible && (
                          <TableCell
                            key={"infiniteLoaderTd" + index + i}
                            style={{
                              maxWidth: `${widthPx || 100}px`,
                              width: `${widthPx || 100}px`,
                              height: `${rowHeight}px`,
                              maxHeight: `${rowHeight}px`,
                            }}
                            className={`${indexToRound === index ? "first:rounded-bl-xl last:rounded-br-xl" : ""} table-cell py-1 text-left first:pl-4 last:pr-4`}
                          >
                            <LoadingSkeleton height='20px' />
                          </TableCell>
                        )}
                      </React.Fragment>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {!isLoading && !items?.length && <NoResultsFound />}

      {!infiniteScrolling &&
        totalItems > itemsPerPage &&
        !defaultQueryPagination &&
        (query as UseInfiniteQueryResult).fetchNextPage && (
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        )}

      {!infiniteScrolling &&
        defaultQueryPagination &&
        totalItems > itemsPerPage &&
        (totalPages === defaultQueryCurrentPage ||
          Number(items?.length) >= itemsPerPage) && (
          <Pagination
            currentPage={defaultQueryCurrentPage}
            setCurrentPage={setDefaultQueryCurrentPage}
            totalPages={totalPages}
          />
        )}
      {(type === "default" && defaultQueryPagination && !!items?.length) ||
        (type === "infinite" && !!items?.length && (
          <span className='mt-1 flex w-full justify-center text-text-sm text-grayTextPrimary'>
            {totalItems > 0 && items?.length
              ? (renderDisplayText
                  ? renderDisplayText(items.length > totalItems ? totalItems : items.length, totalItems)
                  : `Displaying ${items.length > totalItems ? totalItems : items.length} out of ${totalItems} items`)
              : (noItemsLabel ?? "No items for displaying")}
          </span>
        ))}
    </>
  );
};
