import { Fragment, type FC, type ReactNode } from "react";
import { Link, type FileRoutesByPath } from "@tanstack/react-router";

import { BreadcrumbRaw } from "./components/BreadcrumbRaw";
import { BreadcrumbList } from "./components/BreadcrumbList";
import { BreadcrumbItem } from "./components/BreadcrumbItem";
import { BreadcrumbPage } from "./components/BreadcrumbPage";
import { BreadcrumbSeparator } from "./components/BreadcrumbSeparator";
import { House } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";

export interface BreadCrumbItem {
  /**
   * The content to display for this breadcrumb item.
   * Can be a string, React element, or any valid React node.
   *
   * @example "Home"
   * @example <span>Products</span>
   */
  label: ReactNode;
  /**
   * Optional navigation path for the breadcrumb item.
   * When provided, the item becomes clickable and navigates to this route.
   * Uses TanStack Router's type-safe paths.
   *
   * @optional
   * @example "/products"
   * @example "/users/$userId"
   */
  link?: FileRoutesByPath[keyof FileRoutesByPath]["path"];
  /**
   * Optional route parameters for dynamic routes.
   * Required when the link contains dynamic segments (e.g., $userId).
   *
   * @optional
   * @example { userId: "123" }
   */
  params?: FileRoutesByPath[keyof FileRoutesByPath]["params"];
  /**
   * Optional identifier for accessibility and debugging purposes.
   * Used as the title attribute on the link element.
   *
   * @optional
   * @example "user-profile-breadcrumb"
   */
  ident?: string;
}

/**
 * Props for the Breadcrumb component.
 *
 * @interface BreadcrumbProps
 */
export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items to display in the navigation trail.
   * Each item represents a step in the navigation hierarchy.
   * The last item is typically the current page.
   *
   * @optional
   * @example
   * ```tsx
   * [
   *   { label: "Products", link: "/products" },
   *   { label: "Electronics", link: "/products/electronics" },
   *   { label: "Laptops" } // Current page (no link)
   * ]
   * ```
   */
  breadcrumbItems?: BreadCrumbItem[];
  /**
   * Custom separator element to display between breadcrumb items.
   * If not provided, items will appear without separators.
   *
   * @optional
   * @default undefined
   * @example <span>/</span>
   * @example <ChevronRight />
   * @example "›"
   */
  breadcrumbSeparator?: ReactNode;
}

/**
 * Breadcrumb navigation component that displays a hierarchical trail of links.
 *
 * Automatically includes a "Home" link as the first item, followed by custom breadcrumb items.
 * Integrates with TanStack Router for type-safe navigation.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Breadcrumb
 *   breadcrumbItems={[
 *     { label: "Products", link: "/products" },
 *     { label: "Laptops" }
 *   ]}
 *   breadcrumbSeparator={<span>/</span>}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With dynamic routes
 * <Breadcrumb
 *   breadcrumbItems={[
 *     { label: "Users", link: "/users" },
 *     {
 *       label: "John Doe",
 *       link: "/users/$userId",
 *       params: { userId: "123" },
 *       ident: "user-profile"
 *     }
 *   ]}
 *   breadcrumbSeparator="›"
 * />
 * ```
 *
 * @param {BreadcrumbProps} props - Component props
 * @returns {JSX.Element | null} Rendered breadcrumb navigation or null if no items provided
 */
export const Breadcrumb: FC<BreadcrumbProps> = ({
  breadcrumbItems,
  breadcrumbSeparator = <BreadcrumbSeparator />,
}) => {
  const { theme } = useThemeStore();

  return (
    breadcrumbItems && (
      <BreadcrumbRaw className='w-full'>
        <BreadcrumbList className='flex items-center'>
          <BreadcrumbItem>
            <Link to='/'>
              <House
                size={15}
                className={`${theme === "light" ? "text-gray-500" : "text-gray-200"}`}
              />
            </Link>
          </BreadcrumbItem>
          {breadcrumbSeparator}
          {(breadcrumbItems || []).map(({ label, link, ident, params }, i) => (
            <Fragment key={`${label}_${i}`}>
              <BreadcrumbItem>
                {link ? (
                  <Link
                    title={ident}
                    to={link}
                    params={params}
                    className={`font-semibold ${theme === "light" ? "text-brand-600" : "text-brand-300"}`}
                  >
                    {label}
                  </Link>
                ) : (
                  <BreadcrumbPage title={ident}>{label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {i < breadcrumbItems.length - 1 && breadcrumbSeparator}
            </Fragment>
          ))}
        </BreadcrumbList>
      </BreadcrumbRaw>
    )
  );
};

Breadcrumb.displayName = "Breadcrumb";
