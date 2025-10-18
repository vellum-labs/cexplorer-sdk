import { cn } from "@/utils/cn";
import { type ComponentProps, forwardRef } from "react";

/**
 * PaginationContent is a list container for pagination items.
 *
 * This component renders an unordered list that holds all pagination items
 * (page numbers, previous/next buttons, ellipsis). It provides proper layout
 * and spacing for pagination controls.
 *
 * **Features:**
 * - Semantic `<ul>` element for list of pages
 * - Horizontal flexbox layout
 * - Consistent spacing between items
 * - Forward ref support for parent component access
 *
 * @component
 * @example
 * ```tsx
 * <PaginationComponent>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink>2</PaginationLink>
 *     </PaginationItem>
 *   </PaginationContent>
 * </PaginationComponent>
 * ```
 *
 * @param {ComponentProps<"ul">} props - Standard ul element props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLUListElement>} ref - Forward ref to ul element
 * @returns {JSX.Element} List container for pagination items
 */
export const PaginationContent = forwardRef<
  HTMLUListElement,
  ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1.5", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";
