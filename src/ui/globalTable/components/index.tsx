import { cn } from "@/utils/cn";
import * as React from "react";

/**
 * Root table component with optional minimum width.
 *
 * This component provides the main table structure with responsive overflow handling
 * and optional minimum width constraint. It's designed for displaying blockchain data
 * like transactions, blocks, addresses, and other tabular information.
 *
 * **Features:**
 * - Optional minimum width control
 * - Responsive overflow handling
 * - Theme-aware styling
 * - Caption support
 * - Accessible by default
 *
 * @component
 * @example
 * ```tsx
 * // Basic table
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Transaction Hash</TableHead>
 *       <TableHead>Block</TableHead>
 *       <TableHead>Amount</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>5f20df93...</TableCell>
 *       <TableCell>8234567</TableCell>
 *       <TableCell>100 ADA</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 *
 * // With minimum width
 * <Table minwidth={1200}>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 *
 * // With caption
 * <Table>
 *   <TableCaption>Recent Transactions (Last 24h)</TableCaption>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {number} [minwidth] - Minimum width in pixels for the table
 * @returns {JSX.Element} Table container with styling and overflow handling
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & { minwidth?: number }
>(({ className, ...props }, ref) => (
  <div
    style={{ minWidth: props.minwidth || "auto" }}
    className={cn("relative z-10 w-full overflow-visible")}
  >
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/**
 * Table header section (thead) component.
 *
 * This component wraps the table header row(s) containing column headings.
 * It provides consistent styling for the table header with bottom border.
 *
 * @component
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Hash</TableHead>
 *       <TableHead>Block</TableHead>
 *       <TableHead>Age</TableHead>
 *       <TableHead>Fees</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - TableRow components with TableHead cells
 * @returns {JSX.Element} Styled thead element
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

/**
 * Table body section (tbody) component.
 *
 * This component wraps the main content rows of the table.
 * It removes the border from the last row for clean styling.
 *
 * @component
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>5f20df93...</TableCell>
 *       <TableCell>8234567</TableCell>
 *       <TableCell>100 ADA</TableCell>
 *     </TableRow>
 *     <TableRow>
 *       <TableCell>abc123de...</TableCell>
 *       <TableCell>8234568</TableCell>
 *       <TableCell>250 ADA</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - TableRow components with TableCell data
 * @returns {JSX.Element} Styled tbody element
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/**
 * Table footer section (tfoot) component.
 *
 * This component wraps footer rows for table summary information.
 * It has a distinct background color and top border to separate from body content.
 *
 * @component
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 *   <TableFooter>
 *     <TableRow>
 *       <TableCell colSpan={2}>Total</TableCell>
 *       <TableCell>1,000 ADA</TableCell>
 *     </TableRow>
 *   </TableFooter>
 * </Table>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - TableRow components with summary data
 * @returns {JSX.Element} Styled tfoot element with distinct background
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-slate-100/50 font-medium dark:bg-slate-800/50 [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * Table row (tr) component.
 *
 * This component represents a single row in the table with fixed height and border styling.
 * It provides consistent row height for uniform appearance across the table.
 *
 * **Features:**
 * - Fixed height of 55px for consistency
 * - Bottom border between rows
 * - Selected state styling support
 * - Theme-aware background color
 *
 * @component
 * @example
 * ```tsx
 * // In header
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Column 1</TableHead>
 *     <TableHead>Column 2</TableHead>
 *   </TableRow>
 * </TableHeader>
 *
 * // In body
 * <TableBody>
 *   <TableRow>
 *     <TableCell>Data 1</TableCell>
 *     <TableCell>Data 2</TableCell>
 *   </TableRow>
 * </TableBody>
 *
 * // With custom styling
 * <TableRow className="hover:bg-darker">
 *   <TableCell>Interactive row</TableCell>
 * </TableRow>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - TableHead or TableCell components
 * @returns {JSX.Element} Styled tr element with fixed height
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "box-border h-[55px] max-h-[55px] min-h-[55px] border-b border-border bg-cardBg data-[state=selected]:bg-slate-100",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/**
 * Table header cell (th) component.
 *
 * This component represents a single column heading in the table header.
 * It provides consistent styling for header cells with muted text color.
 *
 * **Features:**
 * - Left-aligned text by default
 * - Medium font weight
 * - Muted gray color for headers
 * - Support for checkboxes with special alignment
 * - Fixed height for consistency
 *
 * @component
 * @example
 * ```tsx
 * <TableHeader>
 *   <TableRow>
 *     <TableHead>Transaction Hash</TableHead>
 *     <TableHead>Block Height</TableHead>
 *     <TableHead>Age</TableHead>
 *     <TableHead>Amount</TableHead>
 *     <TableHead>Fees</TableHead>
 *   </TableRow>
 * </TableHeader>
 *
 * // With custom alignment
 * <TableRow>
 *   <TableHead className="text-right">Amount</TableHead>
 * </TableRow>
 *
 * // With checkbox
 * <TableRow>
 *   <TableHead>
 *     <input type="checkbox" role="checkbox" />
 *   </TableHead>
 *   <TableHead>Name</TableHead>
 * </TableRow>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Header content
 * @returns {JSX.Element} Styled th element
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-2 text-left align-middle font-medium text-grayTextPrimary [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * Table data cell (td) component.
 *
 * This component represents a single data cell in the table body.
 * It provides fixed height and consistent styling for table data.
 *
 * **Features:**
 * - Fixed height of 55px matching row height
 * - Consistent padding and alignment
 * - Support for checkboxes with special alignment
 * - Muted text color
 * - Vertical middle alignment
 *
 * @component
 * @example
 * ```tsx
 * <TableBody>
 *   <TableRow>
 *     <TableCell>5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb</TableCell>
 *     <TableCell>8234567</TableCell>
 *     <TableCell>2 hours ago</TableCell>
 *     <TableCell>100 ADA</TableCell>
 *   </TableRow>
 * </TableBody>
 *
 * // With custom alignment
 * <TableRow>
 *   <TableCell className="text-right font-bold">1000 ADA</TableCell>
 * </TableRow>
 *
 * // With colSpan
 * <TableRow>
 *   <TableCell colSpan={3}>No data available</TableCell>
 * </TableRow>
 *
 * // With rich content
 * <TableRow>
 *   <TableCell>
 *     <Copy value="addr1qxyz..." />
 *   </TableCell>
 *   <TableCell>
 *     <Badge variant="success">Confirmed</Badge>
 *   </TableCell>
 * </TableRow>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Cell content
 * @returns {JSX.Element} Styled td element with fixed height
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "box-border h-[55px] max-h-[55px] min-h-[55px] grow-0 px-2 py-1 align-middle text-grayTextPrimary [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] [&>p]:text-grayTextPrimary",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * Table caption component.
 *
 * This component provides a caption or title for the table, typically used
 * to describe the table's content or provide additional context.
 * It appears above or below the table with muted styling.
 *
 * **Common Use Cases:**
 * - Table title or description
 * - Summary of table data
 * - Timeframe information (e.g., "Last 24 hours")
 * - Data source attribution
 *
 * @component
 * @example
 * ```tsx
 * <Table>
 *   <TableCaption>Recent Transactions (Last 100)</TableCaption>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 *
 * // With custom styling
 * <Table>
 *   <TableCaption className="text-left font-bold">
 *     Block #8234567 - Transactions
 *   </TableCaption>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 *
 * // With timeframe
 * <Table>
 *   <TableCaption>
 *     Epoch 425 - Active Stake Pools (Updated: 2024-10-24)
 *   </TableCaption>
 *   <TableHeader>...</TableHeader>
 *   <TableBody>...</TableBody>
 * </Table>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Caption text or content
 * @returns {JSX.Element} Styled caption element with muted appearance
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-2 text-text-sm text-slate-500 dark:text-slate-400",
      className,
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
