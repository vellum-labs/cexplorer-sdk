import { type ClassValue, clsx } from "clsx";

/**
 * Utility function for merging Tailwind CSS class names with proper conflict resolution.
 *
 * ensuring that later classes override earlier ones when they conflict.
 *
 * @param {...ClassValue[]} inputs - Class values to merge (strings, objects, arrays, etc.)
 * @returns {string} Merged and deduplicated class string
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn("text-sm", "text-red-500")
 * // Returns: "text-sm text-red-500"
 * ```
 *
 * @example
 * ```tsx
 * // Conflict resolution - later classes override earlier
 * cn("p-4", "p-2")
 * // Returns: "p-2"
 * ```
 *
 * @example
 * ```tsx
 * // Conditional classes
 * cn("base-class", isActive && "active-class", { "error": hasError })
 * // Returns: "base-class active-class" (if isActive is true)
 * ```
 *
 * @example
 * ```tsx
 * // Common component pattern
 * <div className={cn("rounded-lg bg-white", className, { "border-red-500": error })} />
 * ```
 */
export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs);
};
