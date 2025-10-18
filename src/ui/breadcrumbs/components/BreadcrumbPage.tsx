import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef} from "react";
import { forwardRef } from "react";

/**
 * BreadcrumbPage represents the current page in breadcrumb navigation.
 *
 * This component renders a non-interactive span element that displays the
 * current page name in the breadcrumb trail. It uses proper ARIA attributes
 * to indicate the current page for screen readers and is styled to match
 * the current theme.
 *
 * **Features:**
 * - Semantic `<span>` with `role="link"` for screen reader compatibility
 * - ARIA `aria-current="page"` to indicate current page
 * - ARIA `aria-disabled="true"` to indicate non-interactive state
 * - Theme-aware text colors (gray-600 for light, gray-200 for dark)
 * - Medium font weight for visual consistency
 * - Forward ref support for parent component access
 *
 * **Accessibility:**
 * - Screen readers announce this as the current page
 * - Non-interactive (no click events)
 * - Proper ARIA attributes for navigation context
 *
 * **Theme Colors:**
 * - **Light mode**: `text-gray-600` - Darker gray for light backgrounds
 * - **Dark mode**: `text-gray-200` - Lighter gray for dark backgrounds
 *
 * **Common Use Cases:**
 * - Displaying current page name at end of breadcrumb trail
 * - Blockchain resource pages (Transaction Details, Pool Info)
 * - Explorer detail views (Block #12345, Address abc123)
 *
 * @component
 * @example
 * ```tsx
 * <BreadcrumbList>
 *   <BreadcrumbItem>
 *     <a href="/">Home</a>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <a href="/transactions">Transactions</a>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>TX abc123...</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 *
 * @param {ComponentPropsWithoutRef<"span">} props - Standard span element props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLSpanElement>} ref - Forward ref to span element
 * @returns {JSX.Element} Current page indicator for breadcrumbs
 */
export const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => {
  const { theme } = useThemeStore();
  return (
    <span
      ref={ref}
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn(
        "text-text-sm font-medium",
        theme === "light" ? "text-gray-600" : "text-gray-200",
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbPage.displayName = "BreadcrumbPage";
