import { Link } from "@tanstack/react-router";
import { formatNumber } from "@/utils/format";

/**
 * Props for the BlockCell component
 */
export interface BlockCellProps {
  /**
   * Block hash used for routing to block detail page.
   *
   * @example
   * <BlockCell hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb" no={10234567} />
   */
  hash: string;

  /**
   * Block number to display.
   * Will be formatted with thousand separators (e.g., "10,234,567").
   *
   * @example
   * <BlockCell hash="5f20..." no={10234567} />
   * // Displays: "10,234,567"
   */
  no: number;

  /**
   * Horizontal alignment of the block cell content.
   *
   * @default "end"
   * @example
   * // Right-aligned (default, for tables)
   * <BlockCell hash="5f20..." no={10234567} justify="end" />
   *
   * @example
   * // Left-aligned
   * <BlockCell hash="5f20..." no={10234567} justify="start" />
   *
   * @example
   * // Center-aligned
   * <BlockCell hash="5f20..." no={10234567} justify="center" />
   */
  justify?: "start" | "center" | "end";
}

/**
 * BlockCell displays a Cardano block number as a formatted, clickable link.
 *
 * This component renders block numbers with automatic thousand separators and
 * routing to block detail pages using the block hash. It's designed primarily
 * for use in tables and lists where block information is displayed.
 *
 * **Key Features:**
 * - Automatic link generation to `/block/$hash` route
 * - Number formatting with thousand separators (10,234,567)
 * - Configurable alignment (start, center, end) - right-aligned by default for tables
 * - Type-safe routing with TanStack Router
 *
 * **Common Use Cases:**
 * - Display block numbers in transaction tables
 * - Show block information in epoch detail views
 * - List recent blocks in dashboards
 * - Display block references in governance proposals
 * - Show block numbers in stake pool statistics
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <BlockCell
 *   hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
 *   no={10234567}
 * />
 * // Renders: <Link to="/block/5f20...">10,234,567</Link>
 * ```
 *
 * @example
 * ```tsx
 * // In a transaction table
 * <table>
 *   {transactions.map(tx => (
 *     <tr key={tx.hash}>
 *       <td>
 *         <BlockCell hash={tx.block_hash} no={tx.block_no} />
 *       </td>
 *       <td>{tx.hash}</td>
 *     </tr>
 *   ))}
 * </table>
 * ```
 *
 * @example
 * ```tsx
 * // Left-aligned for non-table contexts
 * <BlockCell
 *   hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
 *   no={10234567}
 *   justify="start"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // In an epoch detail view
 * <div className="epoch-info">
 *   <span>Latest Block:</span>
 *   <BlockCell hash={latestBlock.hash} no={latestBlock.no} />
 * </div>
 * ```
 *
 * @param {BlockCellProps} props - Component props
 * @param {string} props.hash - Block hash for routing
 * @param {number} props.no - Block number to display
 * @param {"start" | "center" | "end"} [props.justify="end"] - Horizontal alignment of content
 * @returns {JSX.Element} A formatted block number link
 */
export const BlockCell = ({ hash, no, justify = "end" }: BlockCellProps) => {
  return (
    <Link
      to='/block/$hash'
      params={{ hash: hash }}
      className={`flex justify-${justify} text-primary`}
    >
      {formatNumber(no ?? 0)}
    </Link>
  );
};
