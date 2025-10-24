import type { FileRoutesByPath } from "@tanstack/react-router";

/**
 * Navigation menu options configuration for dropdowns and navigation components.
 *
 * Array of option objects that can include links, click handlers, nested menus, and dividers.
 *
 * @typedef {Array<NavigationOption>} NavigationOptions
 *
 * @example
 * ```tsx
 * const menuOptions: NavigationOptions = [
 *   {
 *     label: "Dashboard",
 *     href: "/dashboard"
 *   },
 *   {
 *     label: "Settings",
 *     nestedOptions: [
 *       { label: "Profile", href: "/settings/profile" },
 *       { label: "Security", href: "/settings/security" }
 *     ]
 *   },
 *   {
 *     label: "Logout",
 *     onClick: handleLogout,
 *     divider: true
 *   }
 * ];
 * ```
 */
export type NavigationOptions = {
  /**
   * Display label for the navigation item.
   *
   * @example "Dashboard"
   * @example <><Icon /> Settings</>
   */
  label: React.ReactNode;
  /**
   * URL path for navigation.
   *
   * @optional
   * @example "/dashboard"
   * @example "/transaction/$hash"
   */
  href?: string;
  /**
   * URL query parameters.
   *
   * @optional
   * @example { tab: "overview", sort: "desc" }
   */
  params?: Record<string, string>;
  /**
   * Click handler function.
   *
   * @optional
   * @example () => console.log("Clicked")
   */
  onClick?: any;
  /**
   * Nested submenu options.
   *
   * @optional
   */
  nestedOptions?: NavigationOptions;
  /**
   * Show divider line below this item.
   *
   * @optional
   * @default false
   */
  divider?: boolean;
}[];

export type NestedNavigation = {
  [key: string]: {
    label: string;
    labelHref?: FileRoutesByPath[keyof FileRoutesByPath]["path"];
    options: NavigationOptions;
  };
};
