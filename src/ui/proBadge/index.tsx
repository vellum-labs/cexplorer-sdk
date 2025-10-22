import { Link } from "@tanstack/react-router";

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
 * @returns {JSX.Element} A clickable badge with gradient background linking to the Pro page
 */
export const ProBadge = () => {
  return (
    <Link
      to='/pro'
      className={`text-righttext-text-xs rounded-full flex w-fit items-center gap-1 bg-gradient-to-r from-darkBlue to-purple-700 px-2 py-0.5 font-medium text-white hover:text-white`}
    >
      PRO
    </Link>
  );
};
