import { useEffect, useState } from "react";

/**
 * React hook that debounces a value by delaying updates.
 *
 * Useful for search inputs and other scenarios where you want to delay
 * expensive operations until the user has stopped typing.
 *
 * @template T - Type of the value to debounce
 * @param {T} value - Value to debounce
 * @param {number} [delay=400] - Delay in milliseconds before updating the debounced value
 * @returns {T} Debounced value that updates after the delay period
 *
 * @example
 * ```tsx
 * // Search input with debounced query
 * const [searchQuery, setSearchQuery] = useState("");
 * const debouncedQuery = useDebounce(searchQuery, 500);
 *
 * useEffect(() => {
 *   // API call only happens 500ms after user stops typing
 *   if (debouncedQuery) {
 *     fetchSearchResults(debouncedQuery);
 *   }
 * }, [debouncedQuery]);
 *
 * return <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
 * ```
 *
 * @example
 * ```tsx
 * // Debounced window resize handler
 * const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 * const debouncedWidth = useDebounce(windowWidth, 300);
 *
 * useEffect(() => {
 *   const handleResize = () => setWindowWidth(window.innerWidth);
 *   window.addEventListener('resize', handleResize);
 *   return () => window.removeEventListener('resize', handleResize);
 * }, []);
 *
 * // debouncedWidth only updates 300ms after resize stops
 * ```
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 400);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
