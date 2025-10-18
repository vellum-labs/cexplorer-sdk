import { useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components";

/**
 * Props for real pagination using TanStack Router navigation.
 *
 * Real pagination automatically updates the URL query parameters
 * when navigating between pages, enabling browser back/forward
 * navigation and shareable URLs.
 */
export type RealPaginationProps = {
  /** Current active page number (1-indexed) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** Should not be provided for real pagination */
  setCurrentPage?: never;
};

/**
 * Props for fake (controlled) pagination without router integration.
 *
 * Fake pagination uses React state management instead of URL updates,
 * useful for demos, stories, or when URL persistence is not needed.
 */
export type FakePaginationProps = {
  /** Current active page number (1-indexed) */
  currentPage: number;
  /** Total number of pages available */
  totalPages: number;
  /** State setter to update current page */
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * Pagination component for navigating through multi-page data sets.
 *
 * This component provides comprehensive pagination controls with smart page
 * number display, ellipsis for large page counts, and a page jump input field.
 * It supports two modes: real pagination (URL-based with TanStack Router) and
 * fake pagination (state-based for demos/stories).
 *
 * **Features:**
 * - Previous/Next navigation buttons with disabled states
 * - Smart page number display with ellipsis (1 ... 5 6 7 ... 100)
 * - Page jump input for direct page navigation
 * - Two modes: URL-based (real) or state-based (fake)
 * - Automatic URL query parameter updates (real mode)
 * - Keyboard support (Enter key for page jump)
 * - Validation for page jump input (1 to totalPages)
 *
 * **Pagination Logic:**
 * - Always shows first and last page numbers
 * - Shows ellipsis when pages are skipped
 * - Current page has editable input field for quick jumps
 * - Previous button disabled on page 1
 * - Next button disabled on last page
 *
 * **Real vs Fake Pagination:**
 * - **Real**: Uses TanStack Router, updates URL params, enables browser navigation
 * - **Fake**: Uses React state, no URL updates, ideal for Storybook demos
 *
 * **Common Use Cases:**
 * - Transaction lists in blockchain explorers
 * - Block listings with hundreds of pages
 * - Search results pagination
 * - Data tables with large datasets
 *
 * @component
 * @example
 * ```tsx
 * // Real pagination with router
 * <Pagination
 *   currentPage={5}
 *   totalPages={100}
 * />
 *
 * // Fake pagination for stories/demos
 * const [page, setPage] = useState(1);
 * <Pagination
 *   currentPage={page}
 *   totalPages={50}
 *   setCurrentPage={setPage}
 * />
 * ```
 *
 * @param {RealPaginationProps | FakePaginationProps} props - Pagination props
 * @param {number} props.currentPage - Current active page (1-indexed)
 * @param {number} props.totalPages - Total number of available pages
 * @param {React.Dispatch<React.SetStateAction<number>>} [props.setCurrentPage] - State setter for fake pagination
 * @returns {JSX.Element} Complete pagination control with navigation and page jump
 */
export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: RealPaginationProps | FakePaginationProps) => {
  const navigate = useNavigate();

  const { search } = useLocation();

  const [pageJumpValue, setPageJumpValue] = useState("");

  useEffect(() => {
    setPageJumpValue(String(currentPage));
  }, [currentPage]);

  const handlePrevClick = () => {
    if (setCurrentPage === undefined) {
      navigate({
        search: { ...search, page: currentPage - 1 },
      } as any);
      return;
    }
    setCurrentPage(prev => prev - 1);
  };

  const handleNextClick = () => {
    if (setCurrentPage === undefined) {
      navigate({
        search: { ...search, page: currentPage + 1 },
      } as any);
      return;
    }
    setCurrentPage(prev => prev + 1);
  };

  const handlePageClick = (page: number) => {
    if (setCurrentPage === undefined) {
      navigate({
        search: { ...search, page },
      } as any);
      return;
    }
    setCurrentPage(page);
  };

  return (
    <div className='flex w-full flex-col items-center gap-3'>
      <PaginationComponent className='mt-2'>
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

const PageJump = ({
  setCurrentPage,
  pageJumpValue,
  setPageJumpValue,
  totalPages,
}) => {
  const navigate = useNavigate();

  const { search } = useLocation();

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

    navigate({
      search: { ...search, page: Number(value) },
    } as any);
  };

  return (
    <div className='flex items-center gap-1 text-text-sm'>
      {/* <span>Jump to:</span>{" "} */}
      <input
        className='h-8 w-16 rounded-m border border-border bg-background p-1/2 text-center text-text'
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
