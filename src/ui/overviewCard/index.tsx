import type { FC, ReactNode } from "react";
import { CircleHelp } from "lucide-react";
import { Tooltip } from "@/ui/tooltip";

/**
 * Single item in the overview list
 * Can be null or undefined to allow conditional rendering
 */
type OverviewListItem =
  | {
      /**
       * Label text displayed on the left
       */
      label: ReactNode;
      /**
       * Value content displayed on the right
       */
      value: ReactNode;
      /**
       * Controls visibility of this item (default: true)
       */
      visible?: boolean;
    }
  | null
  | undefined;

/**
 * Array of overview list items for label-value pairs
 * Supports null/undefined items for conditional rendering
 */
export type OverviewList = OverviewListItem[];

/**
 * Props for the OverviewCard component
 */
export interface BlockDetailOverviewProps {
  /**
   * Main title displayed at the top of the card
   *
   * @example
   * <OverviewCard
   *   title="Block Details"
   *   overviewList={[
   *     { label: "Height", value: "8,234,567" },
   *     { label: "Hash", value: "5f20df93..." }
   *   ]}
   * />
   */
  title?: ReactNode;

  /**
   * Subtitle displayed in the top-right corner next to title
   *
   * @example
   * <OverviewCard
   *   title="Transaction Details"
   *   subTitle="Confirmed"
   *   overviewList={[{ label: "Tx Hash", value: "abc123..." }]}
   * />
   */
  subTitle?: ReactNode;

  /**
   * List of label-value pairs displayed in a two-column grid
   * Each item has a label (left) and value (right)
   * Supports null/undefined items and visible flag for conditional rendering
   *
   * @example
   * <OverviewCard
   *   title="Block Info"
   *   overviewList={[
   *     { label: "Height", value: "8,234,567" },
   *     { label: "Epoch", value: "478" },
   *     { label: "Slot", value: "123456789" },
   *     // Conditional item
   *     isAdmin ? { label: "Internal ID", value: "xyz" } : null,
   *   ]}
   * />
   */
  overviewList?: OverviewList;

  /**
   * CSS classes for label (left column) styling
   *
   * @example
   * <OverviewCard
   *   title="Details"
   *   overviewList={[{ label: "Status", value: "Active" }]}
   *   labelClassname="font-bold text-blue-500"
   * />
   */
  labelClassname?: string;

  /**
   * CSS classes for the table body container
   *
   * @example
   * <OverviewCard
   *   title="Info"
   *   overviewList={[{ label: "Name", value: "Pool ABC" }]}
   *   tBodyClassname="bg-gray-50 p-2"
   * />
   */
  tBodyClassname?: string;

  /**
   * Content displayed at the start (left/top) of the card body
   * Useful for images, icons, or additional info sections
   *
   * @example
   * <OverviewCard
   *   title="Pool Details"
   *   startContent={<img src="pool-logo.png" alt="Pool" />}
   *   overviewList={[{ label: "Ticker", value: "POOL" }]}
   * />
   */
  startContent?: ReactNode;

  /**
   * Content displayed at the end (bottom) of the card body
   * Useful for actions, buttons, or additional information
   *
   * @example
   * <OverviewCard
   *   title="Transaction"
   *   overviewList={[{ label: "Amount", value: "₳ 100" }]}
   *   endContent={<button>View Details</button>}
   * />
   */
  endContent?: ReactNode;

  /**
   * CSS classes for card container styling
   *
   * @example
   * <OverviewCard
   *   title="Custom Card"
   *   overviewList={[{ label: "Data", value: "Value" }]}
   *   className="border-blue-500 shadow-xl"
   * />
   */
  className?: string;

  /**
   * If true, removes vertical padding from labels/values (sets leading to 0)
   * Useful for compact layouts
   *
   * @example
   * <OverviewCard
   *   title="Compact"
   *   overviewList={[{ label: "Item", value: "Value" }]}
   *   leading={true}
   * />
   */
  leading?: boolean;

  /**
   * If true, grid container height fits content instead of filling available space
   *
   * @example
   * <OverviewCard
   *   title="Auto Height"
   *   overviewList={[{ label: "Single", value: "Item" }]}
   *   hFit={true}
   * />
   */
  hFit?: boolean;

  /**
   * If true, shows a horizontal divider line below the title
   *
   * @example
   * <OverviewCard
   *   title="Section Title"
   *   showTitleDivider={true}
   *   overviewList={[{ label: "Data", value: "123" }]}
   * />
   */
  showTitleDivider?: boolean;

  /**
   * If true, shows a horizontal divider line before endContent
   *
   * @example
   * <OverviewCard
   *   title="Card"
   *   overviewList={[{ label: "Info", value: "Value" }]}
   *   showContentDivider={true}
   *   endContent={<div>Actions</div>}
   * />
   */
  showContentDivider?: boolean;

  /**
   * Governance action approval threshold (0-1 range)
   * When provided, displays threshold percentage with tooltip
   * Used for Cardano governance voting thresholds
   *
   * @example
   * <OverviewCard
   *   title="Governance Action"
   *   overviewList={[{ label: "Type", value: "Treasury Withdrawal" }]}
   *   threshold={0.67}
   *   voterType="drep"
   * />
   */
  threshold?: number;

  /**
   * Type of voter for governance threshold tooltip
   * Either "drep" (Delegated Representatives) or "spo" (Stake Pool Operators)
   *
   * @example
   * <OverviewCard
   *   title="Proposal"
   *   overviewList={[{ label: "ID", value: "123" }]}
   *   threshold={0.51}
   *   voterType="spo"
   * />
   */
  voterType?: "drep" | "spo";

  /**
   * Gap between label and value columns in the grid (CSS value)
   * Default: "48px"
   *
   * @example
   * <OverviewCard
   *   title="Wide Gap"
   *   overviewList={[{ label: "A", value: "B" }]}
   *   columnGap="100px"
   * />
   */
  columnGap?: string;
}

/**
 * OverviewCard displays structured blockchain data in a label-value format with flexible layout options.
 *
 * A highly versatile card component designed for displaying detailed blockchain information such as
 * block details, transaction data, pool information, and governance actions. The component uses a
 * two-column grid layout for label-value pairs and supports extensive customization through optional
 * content sections, dividers, and styling props.
 *
 * **Features:**
 * - Two-column grid layout for label-value pairs
 * - Flexible minimum height (227px) with responsive basis (450px/400px)
 * - Optional title and subtitle in header
 * - Optional startContent and endContent sections
 * - Conditional item visibility with `visible` flag
 * - Horizontal dividers (title and content)
 * - Governance threshold display with tooltip
 * - Customizable column gap between labels and values
 * - Theme-aware styling with cardBg background
 * - Responsive flex-wrap for narrow viewports
 *
 * **Layout Structure:**
 * ```
 * ┌──────────────────────────────────────┐
 * │ Title                     Subtitle   │
 * │ ──────────────────────── (optional)  │
 * │                                      │
 * │ [startContent]  Label 1:    Value 1  │
 * │                 Label 2:    Value 2  │
 * │                 Label 3:    Value 3  │
 * │                 ...                  │
 * │                 ──────────(optional) │
 * │                 [endContent]         │
 * │                 [Threshold] (opt.)   │
 * └──────────────────────────────────────┘
 * ```
 *
 * **Common Use Cases:**
 * - Block details (height, hash, epoch, slot, size, transactions)
 * - Transaction information (hash, fee, inputs, outputs, confirmations)
 * - Stake pool details (ticker, pledge, margin, saturation, blocks)
 * - Address overview (balance, stake address, delegated pool)
 * - Epoch information (number, start/end time, blocks, transactions)
 * - Governance action details (type, status, votes, threshold)
 * - Token/Asset metadata (policy ID, name, quantity, fingerprint)
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - Block details
 * <OverviewCard
 *   title="Block Details"
 *   overviewList={[
 *     { label: "Height", value: "8,234,567" },
 *     { label: "Hash", value: "5f20df933584822601f9e3f8c024eb5eb252fe8c" },
 *     { label: "Epoch", value: "478" },
 *     { label: "Slot", value: "123456789" },
 *     { label: "Block Size", value: "64.00 KB" },
 *     { label: "Transactions", value: "42" },
 *   ]}
 * />
 *
 * // With title divider and subtitle
 * <OverviewCard
 *   title="Transaction Details"
 *   subTitle="Confirmed"
 *   showTitleDivider={true}
 *   overviewList={[
 *     { label: "Tx Hash", value: "abc123def456..." },
 *     { label: "Fee", value: "₳ 0.17" },
 *     { label: "Block", value: "8,234,567" },
 *   ]}
 * />
 *
 * // With conditional items
 * const isDetailedView = true;
 * <OverviewCard
 *   title="Pool Information"
 *   overviewList={[
 *     { label: "Ticker", value: "POOL1" },
 *     { label: "Pledge", value: "₳ 100,000" },
 *     // Only show in detailed view
 *     isDetailedView ? { label: "Margin", value: "2%" } : null,
 *     isDetailedView ? { label: "Fixed Cost", value: "₳ 340" } : null,
 *   ]}
 * />
 *
 * // With startContent (image/logo)
 * <OverviewCard
 *   title="Stake Pool"
 *   startContent={
 *     <img
 *       src="pool-logo.png"
 *       alt="Pool Logo"
 *       className="w-16 h-16 rounded"
 *     />
 *   }
 *   overviewList={[
 *     { label: "Name", value: "My Pool" },
 *     { label: "Ticker", value: "POOL1" },
 *   ]}
 * />
 *
 * // With endContent and divider
 * <OverviewCard
 *   title="Transaction"
 *   overviewList={[
 *     { label: "Amount", value: "₳ 1,000" },
 *     { label: "Status", value: "Pending" },
 *   ]}
 *   showContentDivider={true}
 *   endContent={
 *     <div className="flex gap-2 pt-2">
 *       <button>View Details</button>
 *       <button>Copy Hash</button>
 *     </div>
 *   }
 * />
 *
 * // Governance action with threshold
 * <OverviewCard
 *   title="Governance Action"
 *   subTitle="Active"
 *   overviewList={[
 *     { label: "Type", value: "Treasury Withdrawal" },
 *     { label: "Submitted", value: "2024-01-15" },
 *     { label: "Expires", value: "Epoch 485" },
 *   ]}
 *   threshold={0.67}
 *   voterType="drep"
 * />
 *
 * // With custom column gap and styling
 * <OverviewCard
 *   title="Asset Details"
 *   columnGap="100px"
 *   className="border-purple-500"
 *   labelClassname="font-bold"
 *   overviewList={[
 *     { label: "Policy ID", value: "f43a62fdc3965df486..." },
 *     { label: "Asset Name", value: "MyToken" },
 *     { label: "Quantity", value: "1,000,000" },
 *   ]}
 * />
 *
 * // Compact layout with leading
 * <OverviewCard
 *   title="Quick Info"
 *   leading={true}
 *   hFit={true}
 *   overviewList={[
 *     { label: "Status", value: "Active" },
 *     { label: "Count", value: "42" },
 *   ]}
 * />
 *
 * // Item without label (spans full width)
 * <OverviewCard
 *   title="Description"
 *   overviewList={[
 *     { label: "Name", value: "Pool XYZ" },
 *     {
 *       label: null,
 *       value: "This is a detailed description that spans the full width..."
 *     },
 *   ]}
 * />
 * ```
 *
 * @param {BlockDetailOverviewProps} props - Component props
 * @param {ReactNode} [props.title] - Main title at top of card
 * @param {ReactNode} [props.subTitle] - Subtitle in top-right corner
 * @param {OverviewList} [props.overviewList] - Array of label-value pairs
 * @param {string} [props.labelClassname] - CSS classes for labels
 * @param {string} [props.tBodyClassname] - CSS classes for table body
 * @param {ReactNode} [props.startContent] - Content at start of card body
 * @param {ReactNode} [props.endContent] - Content at end of card body
 * @param {string} [props.className] - CSS classes for card container
 * @param {boolean} [props.leading=false] - Remove vertical padding from items
 * @param {boolean} [props.hFit=false] - Grid height fits content
 * @param {boolean} [props.showTitleDivider=false] - Show divider below title
 * @param {boolean} [props.showContentDivider=false] - Show divider before endContent
 * @param {number} [props.threshold] - Governance threshold (0-1)
 * @param {"drep" | "spo"} [props.voterType="drep"] - Voter type for threshold tooltip
 * @param {string} [props.columnGap="48px"] - Gap between label and value columns
 * @returns {JSX.Element} A flexible card displaying structured data in label-value format
 */
export const OverviewCard: FC<BlockDetailOverviewProps> = ({
  title,
  subTitle,
  overviewList,
  labelClassname = "",
  startContent,
  endContent,
  className,
  tBodyClassname,
  hFit = false,
  leading = false,
  showTitleDivider = false,
  showContentDivider = false,
  threshold,
  voterType = "drep",
  columnGap = "48px",
}) => {
  return (
    <div
      className={`min-h-[227px] w-full flex-1 grow basis-[450px] rounded-l border border-border bg-cardBg px-2 py-2 shadow-md lg:basis-[400px] ${className}`}
    >
      <div
        className={`flex w-full justify-between ${
          overviewList?.length ? "" : "items-center"
        }`}
      >
        <h2 className='text-text-md'>{title}</h2>
        <span>{subTitle}</span>
      </div>
      {showTitleDivider && (
        <div className='mb-1 mt-1.5 w-full border-t border-border'></div>
      )}
      <div
        className={`flex h-full ${startContent ? "items-start" : "items-stretch"} gap-1 pb-2 ${showTitleDivider ? "pt-0" : "pt-1"} ${startContent ? "flex-wrap justify-center sm:flex-nowrap" : ""}`}
      >
        {startContent}
        <div className={`flex w-full flex-col`}>
          <div className={`${tBodyClassname ? tBodyClassname : ""}`}>
            <div
              className={`grid w-full ${hFit ? "h-fit" : "h-full"}`}
              style={{
                gridTemplateColumns: "max-content 1fr",
                columnGap,
                rowGap: "8px",
              }}
            >
              {overviewList &&
                overviewList
                  .filter(item => item !== null && item !== undefined)
                  .map(
                    (item, i) =>
                      (typeof item.visible === "undefined" || item.visible) && (
                        <>
                          {item?.label && (
                            <div
                              key={`${item?.label}_${i}_label`}
                              className={`flex items-center text-left text-text-sm text-grayTextSecondary ${labelClassname ? labelClassname : ""} ${leading ? "leading-[0px]" : "py-1/2"}`}
                            >
                              {item?.label}
                            </div>
                          )}
                          <div
                            key={`${item?.label}_${i}_value`}
                            className={`overflow-hidden break-words text-text-sm text-grayTextPrimary ${leading ? "leading-[0px]" : "py-1/2"}`}
                            style={
                              !item?.label
                                ? { gridColumn: "span 2" }
                                : undefined
                            }
                          >
                            {item?.value}
                          </div>
                        </>
                      ),
                  )}
            </div>
          </div>
          {showContentDivider && endContent && (
            <div className='mt-1 w-full border-t border-border'></div>
          )}
          {threshold && (
            <div className='flex w-full items-center justify-between pt-1'>
              <Tooltip
                content={
                  <div className='flex flex-col'>
                    <span>Approval threshold of this</span>
                    <span>
                      governance action type for{" "}
                      {voterType === "drep" ? "DReps" : "SPOs"}
                    </span>
                  </div>
                }
              >
                <div className='flex items-center gap-[2px]'>
                  <CircleHelp size={11} className='text-grayTextPrimary' />
                  <span className='text-text-xs font-medium text-grayTextPrimary'>
                    Threshold:
                  </span>
                </div>
              </Tooltip>
              <span className='text-text-xs font-medium text-grayTextPrimary'>
                {(threshold * 100).toFixed(2)}%
              </span>
            </div>
          )}
          {endContent}
        </div>
      </div>
    </div>
  );
};
