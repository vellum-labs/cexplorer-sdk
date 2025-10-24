/**
 * Cycles through column sort order states: undefined → desc → asc → undefined.
 *
 * This utility function is commonly used in table column headers to toggle between
 * sorting states. The cycle pattern follows: no sort → descending → ascending → no sort.
 *
 * @param sort - Current sort order ("asc", "desc", or undefined)
 * @returns Next sort order in the cycle
 *
 * @example
 * ```tsx
 * // No sort → descending
 * getColumnsSortOrder(undefined)
 * // Returns: "desc"
 *
 * // Descending → ascending
 * getColumnsSortOrder("desc")
 * // Returns: "asc"
 *
 * // Ascending → no sort
 * getColumnsSortOrder("asc")
 * // Returns: undefined
 * ```
 */
export const getColumnsSortOrder = (sort: "asc" | "desc" | undefined) =>
  typeof sort === "undefined" ? "desc" : sort === "desc" ? "asc" : undefined;
