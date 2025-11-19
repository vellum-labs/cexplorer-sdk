import { Link } from "@tanstack/react-router";

/**
 * Props for the ProBadge component
 */
export interface ProBadgeProps {
  /**
   * When true, displays "Get PRO" text. When false, displays just "PRO".
   *
   * @default false
   * @example
   * // Short version
   * <ProBadge />
   * // Displays: "PRO"
   *
   * @example
   * // Call-to-action version
   * <ProBadge get />
   * // Displays: "Get PRO"
   */
  get?: boolean;
}

/**
 * ProBadge displays a clickable "PRO" badge with gradient styling that links to the Pro subscription page.
 *
 * This component renders a small, eye-catching badge with a blue-to-purple gradient background
 * that serves as a call-to-action for users to explore or upgrade to Pro features. The badge
 * is clickable and navigates to the `/pro` route when clicked.
 *
 * **Common Use Cases:**
 * - Display next to premium features to indicate Pro-only functionality
 * - Show in headers or navigation to promote Pro subscription
 * - Use in feature lists to distinguish Pro features from free features
 * - Place near locked content to encourage upgrades
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - displays "PRO" badge with link
 * <ProBadge />
 *
 * // Call-to-action version with "Get PRO" text
 * <ProBadge get />
 *
 * // In a feature list
 * <div className="flex items-center gap-2">
 *   <span>Advanced Analytics</span>
 *   <ProBadge />
 * </div>
 *
 * // Next to a locked feature
 * <div className="flex items-center justify-between">
 *   <span>Export to CSV</span>
 *   <ProBadge />
 * </div>
 *
 * // In a header or navigation
 * <nav className="flex items-center gap-4">
 *   <Link to="/dashboard">Dashboard</Link>
 *   <Link to="/transactions">Transactions</Link>
 *   <ProBadge />
 * </nav>
 * ```
 *
 * @param {ProBadgeProps} props - Component props
 * @param {boolean} [props.get=false] - Show "Get PRO" text instead of just "PRO"
 * @returns {JSX.Element} A clickable badge with gradient background linking to the Pro page
 */
export const ProBadge = ({ get = false }: ProBadgeProps) => {
  return (
    <Link
      to='/pro'
      className={`flex w-fit items-center gap-1 rounded-xl bg-gradient-to-r from-darkBlue to-purple-700 px-2 py-0.5 text-text-xs font-medium text-white hover:text-white`}
    >
      {get ? "Get PRO" : "PRO"}
    </Link>
  );
};
