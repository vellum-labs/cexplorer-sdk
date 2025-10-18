import { cn } from "@/utils/cn";
import { type ComponentProps } from "react";

/**
 * PaginationComponent is the root container for pagination controls.
 *
 * This component wraps all pagination elements (items, links, prev/next buttons)
 * and provides proper semantic HTML structure with navigation landmarks and
 * ARIA attributes for accessibility.
 *
 * **Features:**
 * - Semantic `<nav>` element with proper ARIA labels
 * - Centered layout with consistent spacing
 * - Flexbox container for pagination items
 * - Full width responsive design
 *
 * **Common Use Cases:**
 * - Data tables with multiple pages
 * - Search results pagination
 * - Transaction history navigation
 * - Block explorer page navigation
 *
 * @component
 * @example
 * ```tsx
 * <PaginationComponent>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious onClick={handlePrevious} />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink isActive>{currentPage}</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext onClick={handleNext} />
 *     </PaginationItem>
 *   </PaginationContent>
 * </PaginationComponent>
 * ```
 *
 * @param {ComponentProps<"nav">} props - Standard nav element props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Navigation container for pagination
 */
export const PaginationComponent = ({
  className,
  ...props
}: ComponentProps<"nav">) => (
  <nav
    role='navigation'
    aria-label='pagination'
    className={cn("flex w-full justify-center gap-1.5", className)}
    {...props}
  />
);
PaginationComponent.displayName = "Pagination";
