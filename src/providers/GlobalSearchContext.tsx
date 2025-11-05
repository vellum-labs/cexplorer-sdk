import type { MiscSearch, MiscSearchResponse } from "@/types/miscTypes";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import { useDebounce } from "@/hooks/useDebounce";
import { createContext, useContext, useEffect, useRef, useState } from "react";

import { getCategories } from "@/utils/search/getCategories";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Locales } from "@/types/commonTypes";

/**
 * Available search categories for Cardano blockchain entities.
 *
 * @typedef {string} Category
 */
export type Category =
  | "all"
  | "tx"
  | "block"
  | "pool"
  | "asset"
  | "policy"
  | "address"
  | "stake"
  | "adahandle"
  | "user"
  | "article"
  | "page"
  | "drep"
  | "gov_action_proposal";

/**
 * Detects search category based on input prefix.
 * Automatically sets category when user types recognized prefixes.
 *
 * @param {string} searchValue - The search input value
 * @returns {Category | null} Detected category or null if no match
 */
const detectCategoryFromPrefix = (searchValue: string): Category | null => {
  const lowerValue = searchValue.toLowerCase().trim();

  if (lowerValue.startsWith("addr")) return "address";
  if (lowerValue.startsWith("pool")) return "pool";
  if (lowerValue.startsWith("stake")) return "stake";
  if (lowerValue.startsWith("asset")) return "asset";
  if (lowerValue.startsWith("gov_action")) return "gov_action_proposal";
  if (lowerValue.startsWith("drep")) return "drep";

  return null;
};

/**
 * Global search context value type.
 *
 * @interface GlobalSearchContextProps
 */
interface GlobalSearchContextProps {
  focused: boolean;
  categoriesOverflow: boolean;
  search: string;
  recentSearch: string[];
  searchCategory: Category;
  activeTab: string;
  categories: ReturnType<typeof getCategories>;
  categoriesRef: React.RefObject<HTMLDivElement>;
  searchRef: React.RefObject<HTMLDivElement>;
  isLoading: boolean;
  data: MiscSearch[];
  setRecentSearch: Dispatch<SetStateAction<string[]>>;
  setSearchCategory: Dispatch<SetStateAction<Category>>;
  handleSearchChange: (value: string) => void;
  handleInput: (type: "focus" | "blur") => void;
  handleCategoryChange: (category: string) => void;
  handleSearchRecentDelete: (index: number) => void;
  scroll: (direction: "left" | "right") => void;
}

const GlobalSearchContext = createContext<GlobalSearchContextProps | null>(
  null,
);

/**
 * Props for GlobalSearchProvider component.
 *
 * @interface GlobalSearchProviderProps
 */
interface GlobalSearchProviderProps {
  /**
   * Child components that can access global search context.
   */
  children: ReactNode;
  /**
   * React Query hook for fetching search results.
   * Should return search data based on query, category, and locale.
   *
   * @param {string | undefined} query - Search query string
   * @param {string} [category] - Optional category filter
   * @param {Locales} [locale] - Locale for search results
   * @returns {UseQueryResult} React Query result with search data
   */
  useFetchMiscSearch: (
    query: string | undefined,
    category?: string,
    locale?: Locales,
  ) => UseQueryResult<
    MiscSearchResponse & {
      prevOffset: number | undefined;
    },
    unknown
  >;
  /**
   * Current locale for search results.
   *
   * @example "en"
   * @example "es"
   */
  locale: Locales;
}

/**
 * Provider component for global blockchain search functionality.
 *
 * Features:
 * - Real-time debounced search across blockchain entities
 * - Category filtering and counts
 * - Recent searches with localStorage persistence
 * - Focus/blur state management
 * - Horizontal scroll for category overflow
 * - Click-outside to close behavior
 *
 * @component
 * @example
 * ```tsx
 * import { useFetchMiscSearch } from "./api/hooks";
 *
 * <GlobalSearchProvider
 *   useFetchMiscSearch={useFetchMiscSearch}
 *   locale="en"
 * >
 *   <App />
 * </GlobalSearchProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Access search state in child component
 * function SearchComponent() {
 *   const {
 *     search,
 *     handleSearchChange,
 *     data,
 *     categories
 *   } = useGlobalSearch();
 *
 *   return (
 *     <input
 *       value={search}
 *       onChange={e => handleSearchChange(e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @param {GlobalSearchProviderProps} props - Component props
 * @returns {JSX.Element} Search provider wrapper
 */
export const GlobalSearchProvider: React.FC<GlobalSearchProviderProps> = ({
  children,
  useFetchMiscSearch,
  locale,
}) => {
  const [focused, setFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState<Category>("all");
  const [categoriesOverflow, setCategoriesOverflow] = useState(false);

  const [recentSearch, setRecentSearch] = useState<string[]>([]);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(search.toLowerCase());
  const debouncedCategoriesOverflow = useDebounce(categoriesOverflow, 300);

  const { data, isLoading, isFetching } = useFetchMiscSearch(
    debouncedSearch ? debouncedSearch.replace("$", "") : undefined,
    searchCategory !== "all" ? searchCategory : undefined,
    locale,
  );

  const categories = getCategories(data?.data);

  const handleSearchChange = (value: string) => {
    setSearch(value);

    const detectedCategory = detectCategoryFromPrefix(value);
    if (detectedCategory) {
      setSearchCategory(detectedCategory);
      setActiveTab(detectedCategory);
    } else if (value.length === 0) {
      setSearchCategory("all");
      setActiveTab("all");
    }
  };

  const handleInput = (type: "focus" | "blur") => {
    setFocused(type === "focus");
  };

  const handleCategoryChange = (category: string) => {
    setActiveTab(category);
  };

  const handleSearchRecentDelete = (index: number) => {
    const GLOBAL_SEARCH_KEY = "global_search";
    const globalSearchStorage = localStorage.getItem(GLOBAL_SEARCH_KEY);

    if (globalSearchStorage && recentSearch[index]) {
      const newArr = [...recentSearch];
      newArr.splice(index, 1);

      localStorage.setItem(GLOBAL_SEARCH_KEY, JSON.stringify(newArr));
      setRecentSearch(newArr);
    }
  };

  const scroll = (direction: "left" | "right") => {
    const container = categoriesRef.current;
    if (container) {
      const scrollAmount = 150;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (!categoriesRef.current) return;

    const container = categoriesRef.current;
    const resizeObserver = new ResizeObserver(() => {
      const threshold = 20;
      const scrollWidth = Math.floor(container.scrollWidth);
      const clientWidth = Math.floor(container.clientWidth);
      setCategoriesOverflow(scrollWidth - clientWidth > threshold);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        handleInput("blur");
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (isLoading || isFetching) {
      const GLOBAL_SEARCH_KEY = "global_search";
      const globalSearchStorage = localStorage.getItem(GLOBAL_SEARCH_KEY);

      if (!globalSearchStorage) {
        localStorage.setItem(GLOBAL_SEARCH_KEY, JSON.stringify([search]));
        return;
      }

      const recentSearches = [
        search,
        ...JSON.parse(globalSearchStorage).slice(0, 9).flat(),
      ];

      localStorage.setItem(
        GLOBAL_SEARCH_KEY,
        JSON.stringify([...new Set(recentSearches)]),
      );
    }
  }, [isLoading, isFetching]);

  const value: GlobalSearchContextProps = {
    focused,
    categoriesOverflow: debouncedCategoriesOverflow,
    search,
    searchCategory,
    recentSearch,
    activeTab,
    categories,
    categoriesRef,
    isLoading,
    searchRef,
    data: Array.isArray(data?.data)
      ? data.data
      : typeof data === "undefined"
        ? []
        : [data.data],
    setRecentSearch,
    setSearchCategory,
    handleSearchChange,
    handleInput,
    handleCategoryChange,
    handleSearchRecentDelete,
    scroll,
  };

  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
    </GlobalSearchContext.Provider>
  );
};

/**
 * Hook to access global search state and actions.
 *
 * Must be used within a GlobalSearchProvider component.
 * Provides search state, handlers, and data for building search UIs.
 *
 * @throws {Error} If used outside of GlobalSearchProvider
 * @returns {GlobalSearchContextProps} Global search context with state and handlers
 *
 * @example
 * ```tsx
 * function SearchInput() {
 *   const {
 *     search,
 *     handleSearchChange,
 *     data,
 *     isLoading,
 *     categories
 *   } = useGlobalSearch();
 *
 *   return (
 *     <div>
 *       <input
 *         value={search}
 *         onChange={e => handleSearchChange(e.target.value)}
 *       />
 *       {isLoading && <Spinner />}
 *       {categories && <CategoryTabs categories={categories} />}
 *       <ResultsList results={data} />
 *     </div>
 *   );
 * }
 * ```
 */
export const useGlobalSearch = (): GlobalSearchContextProps => {
  const context = useContext(GlobalSearchContext);
  if (!context) {
    throw new Error(
      "useGlobalSearch must be used within a GlobalSearchProvider",
    );
  }
  return context;
};
