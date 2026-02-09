import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";
import { PaginationLink } from "./PaginationLink";

/**
 * Props for PaginationNext component
 */
export interface PaginationNextProps
  extends React.ComponentProps<typeof PaginationLink> {
  /**
   * Accessible label for screen readers
   * @default "Go to next page"
   */
  ariaLabel?: string;
}

/**
 * PaginationNext is a button to navigate to the next page.
 *
 * This component renders a "Next" button with a right chevron icon
 * for navigating to the next page in pagination. Extends PaginationLink
 * with a preset icon and ARIA label for accessibility.
 *
 * **Features:**
 * - ChevronRight icon from Lucide
 * - Accessible with "Go to next page" ARIA label
 * - Inherits all PaginationLink functionality
 * - Consistent sizing and styling
 *
 * **Common Use Cases:**
 * - Navigation to next page in data tables
 * - Transaction history pagination
 * - Block explorer page navigation
 *
 * @component
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>
 *     <PaginationPrevious onClick={handlePrevious} />
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationLink isActive>5</PaginationLink>
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationNext
 *       onClick={handleNext}
 *       disabled={isLastPage}
 *     />
 *   </PaginationItem>
 * </PaginationContent>
 * ```
 *
 * @param {PaginationNextProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel="Go to next page"] - Accessible label
 * @param {() => void} [props.onClick] - Click handler for next page navigation
 * @param {boolean} [props.disabled] - Whether button is disabled (last page)
 * @returns {JSX.Element} Next page button with chevron icon
 */
export const PaginationNext = ({
  className,
  ariaLabel = "Go to next page",
  ...props
}: PaginationNextProps) => (
  <PaginationLink
    aria-label={ariaLabel}
    size='default'
    className={cn("gap-1/2", className)}
    {...props}
  >
    <ChevronRight className='h-4 w-4 grow-0' />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";
