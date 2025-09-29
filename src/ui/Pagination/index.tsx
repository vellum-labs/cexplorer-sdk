import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/PaginationRaw"
import { useEffect, useState } from "react";

/**
 * Navigation callback interface
 */
interface NavigationProps {
  /** Callback function called when page changes */
  onNavigate?: (page: number) => void;
}

/**
 * Props for pagination with external page state management
 */
type ExternalPaginationProps = {
  /** Current active page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Must not be provided - use onNavigate instead */
  setCurrentPage?: never;
} & NavigationProps;

/**
 * Props for pagination with internal page state management
 */
type InternalPaginationProps = {
  /** Current active page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Function to update the current page */
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
} & NavigationProps;

/**
 * Union type of all pagination props
 */
export type PaginationProps = ExternalPaginationProps | InternalPaginationProps;

/**
 * A flexible pagination component that supports both controlled and uncontrolled modes.
 * Features page jumping with input validation and keyboard navigation.
 *
 * @param props - Pagination component props
 * @returns JSX element representing the pagination controls
 *
 * @example
 * ```tsx
 * // Controlled pagination (external state)
 * <Pagination
 *   currentPage={page}
 *   totalPages={Math.ceil(totalItems / itemsPerPage)}
 *   onNavigate={(newPage) => setPage(newPage)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Uncontrolled pagination (internal state)
 * const [currentPage, setCurrentPage] = useState(1);
 * <Pagination
 *   currentPage={currentPage}
 *   setCurrentPage={setCurrentPage}
 *   totalPages={totalPages}
 * />
 * ```
 *
 * @remarks
 * - Supports direct page input with validation
 * - Automatically handles edge cases (first/last page)
 * - Shows ellipsis for large page ranges
 * - Keyboard accessible (Enter to jump to page)
 */
export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  onNavigate,
}: PaginationProps) => {

  const [pageJumpValue, setPageJumpValue] = useState("");

  useEffect(() => {
    setPageJumpValue(String(currentPage));
  }, [currentPage]);

  const handlePrevClick = () => {
    if (setCurrentPage === undefined) {
      onNavigate?.(currentPage - 1);
      return;
    }
    setCurrentPage(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (setCurrentPage === undefined) {
      onNavigate?.(currentPage + 1);
      return;
    }
    setCurrentPage(prev => prev + 1);
  };

  const handlePageClick = (page: number) => {
    if (setCurrentPage === undefined) {
      onNavigate?.(page);
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className='flex w-full flex-col items-center gap-5'>
      <PaginationComponent className='mt-4'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={handlePrevClick}
            />
          </PaginationItem>
          {currentPage !== 1 ? (
            <PaginationItem>
              <PaginationLink
                isActive={currentPage === 1}
                onClick={() => handlePageClick(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PageJump
              setCurrentPage={setCurrentPage}
              onNavigate={onNavigate}
              pageJumpValue={pageJumpValue}
              setPageJumpValue={setPageJumpValue}
              totalPages={totalPages}
            />
          )}
          {currentPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage > 1 && currentPage < totalPages && (
            <PageJump
              setCurrentPage={setCurrentPage}
              onNavigate={onNavigate}
              pageJumpValue={pageJumpValue}
              setPageJumpValue={setPageJumpValue}
              totalPages={totalPages}
            />
          )}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {totalPages > 1 && (
            <>
              {currentPage === totalPages ? (
                <PageJump
                  setCurrentPage={setCurrentPage}
                  pageJumpValue={pageJumpValue}
                  setPageJumpValue={setPageJumpValue}
                  totalPages={totalPages}
                />
              ) : (
                <PaginationItem className=''>
                  <PaginationLink
                    isActive={currentPage === totalPages}
                    onClick={() => handlePageClick(totalPages)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}
          <PaginationItem>
            <PaginationNext
              disabled={currentPage >= totalPages}
              onClick={handleNextClick}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationComponent>
    </div>
  );
};

/**
 * Props for the PageJump input component
 */
interface PageJumpProps {
  /** Optional state setter for internal pagination mode */
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  /** Optional callback for external pagination mode */
  onNavigate?: (page: number) => void;
  /** Current value in the page input field */
  pageJumpValue: string;
  /** Function to update the page input field value */
  setPageJumpValue: React.Dispatch<React.SetStateAction<string>>;
  /** Maximum page number for validation */
  totalPages: number;
}

/**
 * Internal component for direct page number input with validation.
 * Supports both keyboard (Enter) and blur events for page changes.
 *
 * @param props - PageJump component props
 * @returns JSX element representing the page input field
 *
 * @remarks
 * - Validates input to ensure it's within valid page range (1 to totalPages)
 * - Automatically corrects invalid values
 * - Updates page on Enter key or when input loses focus
 */
const PageJump = ({
  setCurrentPage,
  onNavigate,
  pageJumpValue,
  setPageJumpValue,
  totalPages,
}: PageJumpProps) => {

  const handlePageJump = (value: string) => {
    if (isNaN(Number(value))) {
      return;
    }
    if (Number(value) > totalPages) {
      setPageJumpValue(String(totalPages));
      return;
    } else if (value && Number(value) < 1) {
      setPageJumpValue("1");
      return;
    }

    setPageJumpValue(value);
  };

  const handleChange = (value: string) => {
    if (setCurrentPage) {
      setCurrentPage(Number(value));
      return;
    }

    onNavigate?.(Number(value));
  };

  return (
    <div className='flex items-center gap-2 text-sm'>
      {/* <span>Jump to:</span>{" "} */}
      <input
        className='h-8 w-16 rounded-lg border border-border bg-background p-1 text-center text-text'
        value={pageJumpValue}
        onChange={e => handlePageJump(e.target.value)}
        onBlur={e => handleChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleChange(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
};
