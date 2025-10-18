import { buttonVariants } from "@/constants/button";
import { type PaginationProps } from "@/types/pagination";
import { cn } from "@/utils/cn";

/**
 * Props for PaginationLink component
 */
type PaginationLinkProps = {
  /**
   * Whether this page link is the current active page
   * @default false
   */
  isActive?: boolean;
} & Pick<PaginationProps, "size"> &
  React.ComponentProps<"button">;

/**
 * PaginationLink is a clickable button for individual page numbers.
 *
 * This component renders a button representing a specific page number.
 * It supports active state styling to highlight the current page and
 * uses button variants for consistent appearance.
 *
 * **Features:**
 * - Active/inactive state styling (outline vs ghost variant)
 * - ARIA `aria-current="page"` for active state
 * - Button variants from CVA for consistent styling
 * - Transparent background with minimal padding
 * - Accessible button semantics
 *
 * **States:**
 * - **Active**: Outlined style indicating current page
 * - **Inactive**: Ghost style for clickable pages
 *
 * @component
 * @example
 * ```tsx
 * // Active page
 * <PaginationItem>
 *   <PaginationLink isActive onClick={() => goToPage(1)}>
 *     1
 *   </PaginationLink>
 * </PaginationItem>
 *
 * // Inactive page
 * <PaginationItem>
 *   <PaginationLink onClick={() => goToPage(2)}>
 *     2
 *   </PaginationLink>
 * </PaginationItem>
 * ```
 *
 * @param {PaginationLinkProps} props - Component props
 * @param {boolean} [props.isActive=false] - Whether this is the active page
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Clickable page number button
 */
export const PaginationLink = ({
  className,
  isActive,
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
      }),
      "min-w-fit bg-transparent px-2",
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";
