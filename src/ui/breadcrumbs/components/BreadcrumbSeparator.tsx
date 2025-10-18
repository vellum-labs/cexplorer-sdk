import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";

/**
 * BreadcrumbSeparator displays a visual separator between breadcrumb items.
 *
 * This component renders a right-pointing chevron icon to visually separate
 * breadcrumb items in the navigation trail. It automatically adapts its color
 * based on the current theme (light/dark mode) and is properly hidden from
 * screen readers to avoid redundant announcements.
 *
 * **Features:**
 * - ChevronRight icon from Lucide
 * - Theme-aware colors (gray-300 for light, cexdark-500 for dark)
 * - Accessible with `aria-hidden="true"` to hide from screen readers
 * - `role="presentation"` to indicate decorative purpose
 * - Small, compact size (8px height, 4px width)
 *
 * **Theme Colors:**
 * - **Light mode**: `text-gray-300` - Light gray for subtle separation
 * - **Dark mode**: `text-cexdark-500` - Custom dark theme color
 *
 * **Accessibility:**
 * - Hidden from screen readers with `aria-hidden="true"`
 * - Purely decorative, navigation structure provided by list items
 * - Screen readers rely on list semantics, not visual separators
 *
 * **Common Use Cases:**
 * - Separating breadcrumb links in navigation trail
 * - Creating visual hierarchy (Home > Blocks > Block #123)
 * - Blockchain explorer navigation paths
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
 *     <a href="/pools">Pools</a>
 *   </BreadcrumbItem>
 *   <BreadcrumbSeparator />
 *   <BreadcrumbItem>
 *     <BreadcrumbPage>Pool ABC</BreadcrumbPage>
 *   </BreadcrumbItem>
 * </BreadcrumbList>
 * ```
 *
 * @param {React.ComponentProps<"li">} props - Standard li element props
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Chevron separator between breadcrumb items
 */
export const BreadcrumbSeparator = ({
  className,
  ...props
}: React.ComponentProps<"li">) => {
  const { theme } = useThemeStore();

  return (
    <li
      role='presentation'
      aria-hidden='true'
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      <ChevronRight
        className={`h-[8px] w-[4px] ${theme === "light" ? "text-gray-300" : "text-cexdark-500"}`}
      />
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
