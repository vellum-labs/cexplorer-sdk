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

interface NavigationProps {
  onNavigate?: (page: number) => void;
}

type RealPaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage?: never;
} & NavigationProps;

type FakePaginationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
} & NavigationProps;

export const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  onNavigate,
}: RealPaginationProps | FakePaginationProps) => {

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

interface PageJumpProps {
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  onNavigate?: (page: number) => void;
  pageJumpValue: string;
  setPageJumpValue: React.Dispatch<React.SetStateAction<string>>;
  totalPages: number;
}

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
