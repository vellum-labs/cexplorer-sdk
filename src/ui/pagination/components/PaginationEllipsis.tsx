import { cn } from "@/utils/cn";
import { MoreHorizontal } from "lucide-react";
import { type ComponentProps } from "react";

/**
 * PaginationEllipsis displays "..." indicator for skipped pages.
 *
 * This component shows an ellipsis (three dots) icon to indicate
 * that there are more pages between visible page numbers. It's used
 * when pagination has many pages and not all can be displayed.
 *
 * **Features:**
 * - MoreHorizontal icon from Lucide
 * - Accessible with sr-only text for screen readers
 * - aria-hidden to prevent duplicate announcements
 * - Fixed 9x9 size matching pagination buttons
 *
 * **Common Use Cases:**
 * - Long pagination sequences (e.g., 1 ... 5 6 7 ... 100)
 * - Blockchain transaction lists with many pages
 * - Search results with extensive pagination
 *
 * @component
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>
 *     <PaginationLink>1</PaginationLink>
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationEllipsis />
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationLink isActive>50</PaginationLink>
 *   </PaginationItem>
 * </PaginationContent>
 * ```
 *
 * @param {ComponentProps<"span">} props - Standard span element props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Ellipsis indicator for skipped pages
 */
export const PaginationEllipsis = ({
  className,
  ...props
}: ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
