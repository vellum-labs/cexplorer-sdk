import type { MiscSearch } from "@/types/miscTypes";

/**
 * Aggregates search results by category and counts occurrences.
 *
 * Processes search data to create a category count object with an "all" total.
 * Supports both single result objects and arrays of results.
 *
 * @param {MiscSearch[] | MiscSearch | undefined} data - Search result(s) to categorize
 * @returns {Object | undefined} Object with category counts including "all" total, or undefined if no data
 *
 * @example
 * ```tsx
 * // Array of search results
 * const results = [
 *   { category: "transaction", ... },
 *   { category: "transaction", ... },
 *   { category: "block", ... },
 *   { category: "address", ... }
 * ];
 * getCategories(results)
 * // Returns: { all: 4, transaction: 2, block: 1, address: 1 }
 * ```
 *
 * @example
 * ```tsx
 * // Single search result
 * const result = { category: "pool", ... };
 * getCategories(result)
 * // Returns: { all: 1, pool: 1 }
 * ```
 *
 * @example
 * ```tsx
 * // Undefined data
 * getCategories(undefined)
 * // Returns: undefined
 * ```
 */
export const getCategories = (data: MiscSearch[] | MiscSearch | undefined) => {
  if (!data) {
    return undefined;
  }

  if (Array.isArray(data)) {
    return {
      all: data.length,
      ...data.reduce((a, b) => {
        a[b.category] = a[b.category] + 1 || 1;

        return a;
      }, {}),
    };
  }

  return {
    all: 1,
    [data.category]: 1,
  };
};
