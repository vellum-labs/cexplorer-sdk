import { cn } from "@/utils/cn";
import { type ComponentProps, forwardRef } from "react";

/**
 * PaginationItem wraps individual pagination elements (links, buttons, ellipsis).
 *
 * This component is a simple list item wrapper that provides semantic HTML
 * structure for pagination controls. It wraps PaginationLink, PaginationNext,
 * PaginationPrevious, or PaginationEllipsis components.
 *
 * **Features:**
 * - Semantic `<li>` element for list items
 * - Forward ref support for parent component access
 * - Minimal styling (container only)
 * - Works with all pagination sub-components
 *
 * @component
 * @example
 * ```tsx
 * <PaginationContent>
 *   <PaginationItem>
 *     <PaginationLink isActive>1</PaginationLink>
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationLink>2</PaginationLink>
 *   </PaginationItem>
 *   <PaginationItem>
 *     <PaginationEllipsis />
 *   </PaginationItem>
 * </PaginationContent>
 * ```
 *
 * @param {ComponentProps<"li">} props - Standard li element props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLLIElement>} ref - Forward ref to li element
 * @returns {JSX.Element} List item wrapper for pagination elements
 */
export const PaginationItem = forwardRef<HTMLLIElement, ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
  ),
);

PaginationItem.displayName = "PaginationItem";
