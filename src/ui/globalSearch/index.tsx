import { useEffect, type FC } from "react";

import { useGlobalSearch } from "@/providers/GlobalSearchContext";
import { useThemeStore } from "@/providers/ThemeProvider";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { GlobalSearchDropdown } from "./components/GlobalSearchDropdown";
import { GlobalSearchRecent } from "./components/GlobalSearchRecent";
import { GlobalSearchCell } from "./components/GlobalSearchCell";
import { TextInput } from "../textInput";

export interface GlobalSearchProps {
  isHomepage?: boolean;
}

export const GlobalSearch: FC<GlobalSearchProps> = ({ isHomepage }) => {
  const { theme } = useThemeStore();

  const {
    activeTab,
    focused,
    categoriesOverflow,
    search,
    categories,
    categoriesRef,
    data,
    searchRef,
    handleCategoryChange,
    handleInput,
    handleSearchChange,
    scroll,
    isLoading,
  } = useGlobalSearch();

  const groupedData = data.reduce((acc, prev) => {
    if (prev?.category) {
      acc[prev.category] = acc[prev.category]
        ? [...acc[prev.category], prev]
        : [prev];
    }

    return acc;
  }, {});

  useEffect(() => {
    if (
      !isLoading &&
      !groupedData[activeTab] &&
      Object.values(groupedData).length > 0
    ) {
      handleCategoryChange("all");
    }
  }, [groupedData, search]);

  const formatTitleCategories = [
    "pool",
    "page",
    "drep",
    "article",
    "user",
    "adahandle",
    "asset",
    "gov_action_proposal",
  ];

  return (
    <search className='relative w-full' ref={searchRef}>
      {isHomepage ? (
        <div
          className={`relative h-12 w-full max-w-[750px] border border-border bg-background ${focused ? "rounded-b-none rounded-t-l" : "rounded-l"} flex items-center`}
        >
          <GlobalSearchDropdown isHomepage />
          <input
            value={search}
            onChange={e => handleSearchChange(e.currentTarget.value)}
            placeholder='Search by Address / Tx hash / Block hash / $Handle / Pool name...'
            className='h-full flex-1 bg-transparent pl-1 pr-6 text-text-sm outline-none'
            onFocus={() => handleInput("focus")}
            autoCapitalize='off'
          />
          <button className='hover:bg-primary/90 absolute right-2 flex h-9 w-9 items-center justify-center rounded-m bg-primary transition-colors'>
            <Search size={16} className='text-background' strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <TextInput
          value={search}
          onchange={handleSearchChange}
          placeholder='Search blocks, transactions, asset IDs...'
          showSearchIcon={!focused}
          prefixContent={focused ? <GlobalSearchDropdown /> : undefined}
          inputClassName={`${focused ? "rounded-b-none pl-[105px]" : ""}`}
          onFocus={() => handleInput("focus")}
          autoCapitalize='off'
        />
      )}
      {focused && (
        <>
          {categoriesOverflow && (
            <div
              className='absolute left-[1px] z-20 flex h-[34px] w-[20px] cursor-pointer items-center bg-background'
              onClick={() => scroll("left")}
            >
              <ChevronLeft size={15} className='text-grayTextPrimary' />
            </div>
          )}

          <div
            className={`absolute z-[25] flex w-full ${isHomepage ? "max-w-[750px]" : ""} select-none flex-col gap-1.5 rounded-b-m border-x border-b border-border bg-background`}
          >
            {!categories && search.length !== 0 && (
              <div className='flex h-[150px] w-full items-center justify-center'>
                <div
                  className={`loader h-[40px] w-[40px] border-[4px] ${theme === "light" ? "border-[#F2F4F7] border-t-darkBlue" : "border-[#475467] border-t-[#5EDFFA]"} border-t-[4px]`}
                ></div>
              </div>
            )}
            {!categories && search.length === 0 && <GlobalSearchRecent />}
            {categories && (
              <>
                {categories.all === 0 ? (
                  <div className='px-1.5 py-1.5 text-center text-text-sm'>
                    Not Found
                  </div>
                ) : (
                  <>
                    <div
                      className={`flex h-[35px] items-center gap-1.5 overflow-hidden ${categoriesOverflow ? "px-3" : "w-full px-1.5"}`}
                      ref={categoriesRef}
                    >
                      {categories &&
                        Object.entries(categories).map(([category, value]) => (
                          <div
                            key={category}
                            className={`relative h-full text-nowrap py-1 ${activeTab === category ? "text-primary" : "text-grayTextPrimary"}`}
                            onClick={() => handleCategoryChange(category)}
                          >
                            <span
                              className={`cursor-pointer text-text-xs font-semibold ${
                                activeTab === category
                                  ? "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:bg-primary"
                                  : ""
                              }`}
                            >
                              {category.includes("_")
                                ? category.split("_")[0][0].toUpperCase() +
                                  category.split("_")[0].slice(1)
                                : category[0].toUpperCase() +
                                  category.slice(1)}{" "}
                              ({value})
                            </span>
                          </div>
                        ))}
                    </div>
                    <div className='thin-scrollbar flex max-h-[300px] w-full flex-col overflow-auto overscroll-none px-1.5 pb-1.5'>
                      {activeTab === "all"
                        ? Object.entries(groupedData).map(
                            ([category, data]) => {
                              return (
                                <div className='flex flex-col'>
                                  {category && (
                                    <span className='border-b border-border text-text-xs text-grayTextPrimary'>
                                      {category.includes("_")
                                        ? category
                                            .split("_")[0][0]
                                            .toUpperCase() +
                                          category.split("_")[0].slice(1)
                                        : category[0].toUpperCase() +
                                          category.slice(1)}
                                    </span>
                                  )}
                                  {(data as any)
                                    .filter(item =>
                                      activeTab !== "all"
                                        ? item.category === activeTab
                                        : item,
                                    )
                                    .map((item, index, arr) => (
                                      <div
                                        key={index}
                                        className={`${index === arr.length - 1 ? "pb-1" : ""}`}
                                      >
                                        <GlobalSearchCell
                                          formatTitle={
                                            !formatTitleCategories.includes(
                                              item.category,
                                            )
                                          }
                                          item={item}
                                        />
                                      </div>
                                    ))}
                                </div>
                              );
                            },
                          )
                        : (data as any)
                            .filter(item =>
                              activeTab !== "all"
                                ? item.category === activeTab
                                : item,
                            )
                            .map(item => (
                              <GlobalSearchCell
                                formatTitle={
                                  !formatTitleCategories.includes(item.category)
                                }
                                item={item}
                              />
                            ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {categoriesOverflow && (
            <div
              className='absolute right-[1px] z-20 flex h-[34px] w-[20px] cursor-pointer items-center bg-background'
              onClick={() => scroll("right")}
            >
              <ChevronRight size={15} className='text-grayTextPrimary' />
            </div>
          )}
        </>
      )}
    </search>
  );
};
