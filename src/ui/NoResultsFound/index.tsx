import { colors } from "@/constants/colors";
import { Search } from "lucide-react";

/**
 * Props for the NoResultsFound component
 */
export interface NoResultsFoundProps {
  /** Custom message to display instead of the default */
  message?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * A component that displays a "no results found" message with a search icon.
 * Used to indicate when searches, filters, or data queries return no results.
 *
 * @param props - Component props
 * @returns JSX element showing the no results state
 *
 * @example
 * ```tsx
 * // Basic usage
 * <NoResultsFound />
 *
 * // With custom message
 * <NoResultsFound message="No users found matching your criteria" />
 *
 * // With custom styling
 * <NoResultsFound
 *   message="No data available"
 *   className="my-custom-spacing"
 * />
 * ```
 */
export const NoResultsFound = ({
  message = "No results found",
  className = ""
}: NoResultsFoundProps = {}) => {
  return (
    <div className={`my-8 flex w-full flex-col items-center gap-2 text-center font-medium ${className}`}>
      <div className="rounded-md border border-border p-1">
        <Search color={colors.grayTextPrimary} size={17} />
      </div>
      {message}
    </div>
  );
};
