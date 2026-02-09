import { cn } from "@/utils/cn";
import { ChevronLeft } from "lucide-react";
import { PaginationLink } from "./PaginationLink";

/**
 * Props for PaginationPrevious component
 */
export interface PaginationPreviousProps
  extends React.ComponentProps<typeof PaginationLink> {
  /**
   * Accessible label for screen readers
   * @default "Go to previous page"
   */
  ariaLabel?: string;
}

/**
 * PaginationPrevious is a button to navigate to the previous page.
 *
 * This component renders a "Previous" button with a left chevron icon
 * for navigating to the previous page in pagination. Extends PaginationLink
 * with a preset icon and ARIA label for accessibility.
 *
 * **Features:**
 * - ChevronLeft icon from Lucide
 * - Accessible with "Go to previous page" ARIA label
 * - Inherits all PaginationLink functionality
 * - Consistent sizing and styling
 *
 * **Common Use Cases:**
 * - Navigation to previous page in data tables
 * - Transaction history pagination
 * - Block explorer page navigation
 *
 * @component
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>
 *     <PaginationPrevious
 *       onClick={handlePrevious}
 *       disabled={isFirstPage}
 *     />
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationLink isActive>1</PaginationLink>
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationNext onClick={handleNext} />
 *   </PaginationItem>
 * </PaginationContent>
 * ```
 *
 * @param {PaginationPreviousProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel="Go to previous page"] - Accessible label
 * @param {() => void} [props.onClick] - Click handler for previous page navigation
 * @param {boolean} [props.disabled] - Whether button is disabled (first page)
 * @returns {JSX.Element} Previous page button with chevron icon
 */
export const PaginationPrevious = ({
  className,
  ariaLabel = "Go to previous page",
  ...props
}: PaginationPreviousProps) => (
  <PaginationLink
    aria-label={ariaLabel}
    size='default'
    className={cn("gap-1/2", className)}
    {...props}
  >
    <ChevronLeft className='h-4 w-4' />
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";
