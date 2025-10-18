import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

/**
 * BreadcrumbList is an ordered list container for breadcrumb items.
 *
 * This component renders an `<ol>` element that holds all breadcrumb items
 * (links, separators, current page). It provides a flexible layout that wraps
 * items on small screens and maintains proper spacing between elements.
 *
 * **Features:**
 * - Semantic `<ol>` element for ordered list
 * - Flexbox layout with wrapping support for responsive design
 * - Consistent gap spacing (1.5 units) between items
 * - Small text size with primary gray color
 * - Forward ref support for parent component access
 *
 * **Styling:**
 * - `text-text-sm` - Small text size
 * - `text-grayTextPrimary` - Primary gray text color
 * - `flex flex-wrap` - Flexible wrapping layout
 * - `gap-1.5` - 1.5 units spacing between items
 *
 * @component
 * @example
 * ```tsx
 * <BreadcrumbRaw>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <a href="/">Home</a>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <a href="/transactions">Transactions</a>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Details</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </BreadcrumbRaw>
 * ```
 *
 * @param {ComponentPropsWithoutRef<"ol">} props - Standard ol element props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLOListElement>} ref - Forward ref to ol element
 * @returns {JSX.Element} Ordered list container for breadcrumb items
 */
export const BreadcrumbList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-text-sm text-grayTextPrimary",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";
