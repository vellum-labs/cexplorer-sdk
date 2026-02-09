import type { FC } from "react";
import { Search } from "lucide-react";

/**
 * Props for the NoResultsFound component
 */
export interface NoResultsFoundProps {
  /**
   * Message displayed when no results are found
   * @default "No results found"
   */
  label?: string;
}

/**
 * NoResultsFound displays a simple feedback message when search or filter operations return no results.
 *
 * This component shows a search icon with "No results found" text, providing visual feedback
 * to users when their search query or filter criteria doesn't match any data.
 *
 * **Common Use Cases:**
 * - Display when table searches return no matches
 * - Show when filter combinations yield no results
 * - Feedback for empty search queries in lists or data grids
 * - Response to unsuccessful blockchain entity lookups
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage in a table
 * {data.length === 0 && <NoResultsFound />}
 *
 * // With custom label
 * <NoResultsFound label="Nothing to show" />
 *
 * // In a search results container
 * <div className="search-results">
 *   {results.length > 0 ? (
 *     results.map(item => <ResultItem key={item.id} {...item} />)
 *   ) : (
 *     <NoResultsFound />
 *   )}
 * </div>
 * ```
 *
 * @param {NoResultsFoundProps} props - Component props
 * @param {string} [props.label="No results found"] - Message to display
 * @returns {JSX.Element} A centered feedback component with search icon and "No results found" text
 */
export const NoResultsFound: FC<NoResultsFoundProps> = ({
  label = "No results found",
}) => {
  return (
    <div className='my-4 flex w-full flex-col items-center gap-1 text-center font-medium'>
      <div className='rounded-s border border-border p-1/2'>
        <Search size={17} style={{ color: "var(--grayTextPrimary)" }} />
      </div>
      {label}
    </div>
  );
};
