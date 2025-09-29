import * as React from "react";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement> & { minwidth?: number }>(({ className, ...props }, ref) => (
  <div style={{ minWidth: props.minwidth || "auto" }} className="relative z-10 w-full overflow-visible">
    <table ref={ref} className={`w-full caption-bottom text-sm ${className ? className : ""}`} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={`[&_tr]:border-b ${className ? className : ""}`} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={`[&_tr:last-child]:border-0 ${className ? className : ""}`} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={`border-t bg-slate-100/50 font-medium dark:bg-slate-800/50 [&>tr]:last:border-b-0 ${className ? className : ""}`}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={`box-border h-[55px] max-h-[55px] min-h-[55px] border-b border-border bg-cardBg data-[state=selected]:bg-slate-100 ${
      className ? className : ""
    }`}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={`text-grayTextPrimary h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${
      className ? className : ""
    }`}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={`text-grayTextPrimary [&>p]:text-grayTextPrimary box-border h-[55px] max-h-[55px] min-h-[55px] grow-0 px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${
      className ? className : ""
    }`}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
  <caption ref={ref} className={`mt-4 text-sm text-slate-500 dark:text-slate-400 ${className ? className : ""}`} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
