import { useThemeStore } from "@/stores/themeStore";
import type { ComponentPropsWithoutRef} from "react";
import { forwardRef } from "react";

/**
 * BreadcrumbItem wraps individual breadcrumb elements (links or current page).
 *
 * This component is a list item wrapper that provides semantic HTML structure
 * for breadcrumb links and separators. It automatically adapts text color based
 * on the current theme (light/dark mode) for optimal readability.
 *
 * **Features:**
 * - Semantic `<li>` element for list items
 * - Theme-aware text colors (gray-600 for light, gray-200 for dark)
 * - Inline flex layout with gap spacing for child elements
 * - Medium font weight for better readability
 * - Forward ref support for parent component access
 *
 * **Theme Colors:**
 * - **Light mode**: `text-gray-600` - Darker gray for light backgrounds
 * - **Dark mode**: `text-gray-200` - Lighter gray for dark backgrounds
 *
 * **Common Use Cases:**
 * - Wrapping breadcrumb links (Home, Transactions, etc.)
 * - Wrapping current page indicator
 * - Creating hierarchical navigation paths
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
 *     <a href="/blocks">Blocks</a>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>Block #12345</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 *
 * @param {ComponentPropsWithoutRef<"li">} props - Standard li element props
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.Ref<HTMLLIElement>} ref - Forward ref to li element
 * @returns {JSX.Element} List item wrapper for breadcrumb elements
 */
export const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => {
  const { theme } = useThemeStore();

  return (
    <li
      ref={ref}
      className={`inline-flex items-center gap-1 text-text-sm font-medium ${className ? className : ""} ${theme === "light" ? "text-gray-600" : "text-gray-200"}`}
      {...props}
    />
  );
});
BreadcrumbItem.displayName = "BreadcrumbItem";
