import { type FC, type ReactNode } from "react";

/**
 * Props for EmptyState component.
 */
export interface EmptyStateProps {
  /** Icon element to display (typically Lucide icon or custom SVG) */
  icon: ReactNode;
  /** Main heading text describing the empty state */
  primaryText: string;
  /** Supporting description text providing context or suggestions */
  secondaryText: string;
  /** Optional action button or link for user to take next steps */
  button?: ReactNode;
  /** Additional CSS classes for customization */
  className?: string;
}

/**
 * EmptyState component displays a friendly message when no data is available.
 *
 * This component provides a visually appealing placeholder for empty data states,
 * featuring an icon, descriptive text, and an optional call-to-action button.
 * It's designed to guide users when they encounter pages or sections with no content.
 *
 * **Features:**
 * - Icon container with border and background (48x48px)
 * - Two-tier text hierarchy (primary heading + secondary description)
 * - Optional action button for user guidance
 * - Centered layout with card-style background
 * - Theme-aware colors (background, text, borders)
 * - Responsive padding and spacing
 *
 * **Layout Structure:**
 * 1. Icon (48x48px) with 24px bottom margin
 * 2. Primary heading (text-lg, semibold)
 * 3. Secondary text (text-sm, max-width for readability)
 * 4. Optional button/action element
 *
 * **Common Use Cases:**
 * - No transactions found in search results
 * - Empty wallet with no delegations
 * - No staking pools available
 * - Search with zero results
 * - Uninitialized data tables
 *
 * @component
 * @example
 * ```tsx
 * // Basic empty state
 * <EmptyState
 *   icon={<Search className="h-6 w-6" />}
 *   primaryText="No transactions found"
 *   secondaryText="We couldn't find any transactions matching your search criteria."
 * />
 *
 * // With action button
 * <EmptyState
 *   icon={<Wallet className="h-6 w-6" />}
 *   primaryText="No delegations yet"
 *   secondaryText="Start earning rewards by delegating your ADA to a stake pool."
 *   button={<Button>Find a Pool</Button>}
 * />
 * ```
 *
 * @param {EmptyStateProps} props - Component props
 * @param {ReactNode} props.icon - Icon element to display
 * @param {string} props.primaryText - Main heading text
 * @param {string} props.secondaryText - Supporting description text
 * @param {ReactNode} [props.button] - Optional action button
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Empty state display with icon, text, and optional button
 */
export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  primaryText,
  secondaryText,
  button,
  className = "",
}) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center rounded-l border border-border bg-cardBg px-3 py-3 text-center ${className}`}
    >
      {/* Icon with 24px bottom margin */}
      <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-m border border-border bg-background p-2 text-primary'>
        {icon}
      </div>

      {/* Primary text with 4px bottom margin */}
      <h3 className='mb-1/2 text-text-lg font-semibold text-text'>
        {primaryText}
      </h3>

      {/* Secondary text */}
      <p className='mb-3 max-w-md text-text-sm text-grayTextPrimary'>
        {secondaryText}
      </p>

      {/* Optional button */}
      {button}
    </div>
  );
};
