import type { FC } from "react";

import { History, X } from "lucide-react";

import { useGlobalSearch } from "@/providers/GlobalSearchContext";
import { useEffect } from "react";
import { formatString } from "@/utils/format";

/**
 * Props for the GlobalSearchRecent component
 */
export interface GlobalSearchRecentProps {
  /**
   * Label text for the "Recently searched" header
   * @default "Recently searched"
   */
  recentlySearchedLabel?: string;

  /**
   * Message displayed when there are no recent searches
   * @default "You don't have recent searches"
   */
  noRecentSearchesLabel?: string;
}

export const GlobalSearchRecent: FC<GlobalSearchRecentProps> = ({
  recentlySearchedLabel = "Recently searched",
  noRecentSearchesLabel = "You don't have recent searches",
}) => {
  const {
    handleSearchChange,
    handleSearchRecentDelete,
    setRecentSearch,
    recentSearch,
  } = useGlobalSearch();

  useEffect(() => {
    const globalSearch = localStorage.getItem("global_search");

    if (globalSearch) {
      setRecentSearch(JSON.parse(globalSearch));
    }
  }, []);

  return (
    <div
      className={`flex w-full flex-col items-center gap-1/2 overflow-hidden px-3`}
    >
      {recentSearch.length ? (
        <>
          <div className='w-full border-b py-[1px]'>
            <span className='text-text-xs font-medium text-grayTextPrimary'>
              {recentlySearchedLabel}
            </span>
          </div>
          <div className='flex w-full flex-col pb-1'>
            {recentSearch.map((value, index) => (
              <div
                key={value}
                className='flex cursor-pointer items-center justify-between gap-1/2 py-1/2 hover:bg-cardBg'
                onClick={() => handleSearchChange(value)}
              >
                <div className='flex items-center gap-1/2'>
                  <History size={15} className='text-grayTextPrimary' />
                  <span className='text-text-sm font-semibold text-grayTextPrimary'>
                    {value.length > 35 ? formatString(value, "long") : value}
                  </span>
                </div>
                <X
                  size={15}
                  className='text-grayTextPrimary'
                  onClick={e => {
                    e.stopPropagation();
                    handleSearchRecentDelete(index);
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className='py-1.5 text-text-sm font-medium text-grayTextPrimary'>
          <span>{noRecentSearchesLabel}</span>
        </div>
      )}
    </div>
  );
};
