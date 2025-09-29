import * as React from "react";

/**
 * Props for Table component extending standard HTML table attributes
 */
export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Minimum width for the table in pixels */
  minwidth?: number;
}

/**
 * The main table wrapper component that provides scrolling and positioning.
 * Wraps the HTML table element with responsive behavior.
 *
 * @param props - Table component props
 * @param ref - React ref for the table element
 * @returns JSX element representing the table
 *
 * @example
 * ```tsx
 * <Table minwidth={800}>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
const Table = React.forwardRef<HTMLTableElement, TableProps>(({ className = "", minwidth, ...props }, ref) => (
  <div style={{ minWidth: minwidth || "auto" }} className="relative z-10 w-full overflow-visible">
    <table ref={ref} className={`w-full caption-bottom text-sm ${className}`} {...props} />
  </div>
));
Table.displayName = "Table";

/**
 * Table header component (thead element) with consistent styling.
 * Automatically applies border styles to child rows.
 */
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className = "", ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className}`} {...props} />
));
TableHeader.displayName = "TableHeader";

/**
 * Table body component (tbody element) that contains data rows.
 * Removes border from the last row for clean appearance.
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className = "", ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
));
TableBody.displayName = "TableBody";

/**
 * Table footer component (tfoot element) with themed background.
 * Includes top border and theme-aware background colors.
 */
const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className = "", ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`border-t bg-slate-100/50 font-medium dark:bg-slate-800/50 [&>tr]:last:border-b-0 ${className}`}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * Table row component (tr element) with fixed height and theming.
 * Supports selection states and consistent spacing.
 */
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className = "", ...props }, ref) => (
  <tr
    ref={ref}
    className={`box-border h-[55px] max-h-[55px] min-h-[55px] border-b border-border bg-cardBg data-[state=selected]:bg-slate-100 ${className}`}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/**
 * Table header cell component (th element) for column headers.
 * Includes special handling for checkbox columns.
 */
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className = "", ...props }, ref) => (
  <th
    ref={ref}
    className={`text-grayTextPrimary h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className}`}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * Table data cell component (td element) for displaying content.
 * Maintains consistent height and handles checkbox alignment.
 */
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className = "", ...props }, ref) => (
  <td
    ref={ref}
    className={`text-grayTextPrimary [&>p]:text-grayTextPrimary box-border h-[55px] max-h-[55px] min-h-[55px] grow-0 px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className}`}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * Table caption component for table titles and descriptions.
 * Provides accessible labeling for screen readers.
 */
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className = "", ...props }, ref) => (
  <caption ref={ref} className={`mt-4 text-sm text-slate-500 dark:text-slate-400 ${className}`} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
