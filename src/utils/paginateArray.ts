/**
 * Paginates an array by returning a subset of items for the specified page.
 *
 * @template T - The type of items in the array
 * @param array - The array to paginate
 * @param currentPage - The current page number (1-based)
 * @param itemsPerPage - The number of items to show per page
 * @returns A slice of the array containing items for the current page
 *
 * @example
 * ```tsx
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 * const page1 = paginateArray(items, 1, 3); // [1, 2, 3]
 * const page2 = paginateArray(items, 2, 3); // [4, 5, 6]
 * ```
 *
 * @remarks
 * - Page numbers are 1-based (first page is 1, not 0)
 * - Returns empty array if the array is null/undefined
 * - Returns empty array if currentPage is out of range
 */
export const paginateArray = <T>(
  array: T[] | null | undefined,
  currentPage: number,
  itemsPerPage: number,
): T[] => {
  if (!array || array.length === 0) {
    return [];
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
};
