import { cn } from "@/utils/cn";
import { MoreHorizontal } from "lucide-react";
import { type ComponentProps } from "react";

/**
 * Props for PaginationEllipsis component
 */
export interface PaginationEllipsisProps extends ComponentProps<"span"> {
  /**
   * Screen reader text for accessibility
   * @default "More pages"
   */
  srLabel?: string;
}

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
 * @param {PaginationEllipsisProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.srLabel="More pages"] - Screen reader label
 * @returns {JSX.Element} Ellipsis indicator for skipped pages
 */
export const PaginationEllipsis = ({
  className,
  srLabel = "More pages",
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>{srLabel}</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
