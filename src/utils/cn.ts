/**
 * Combines multiple class names into a single string, filtering out falsy values.
 *
 * @param classes - Array of class names that can be strings, undefined, null, or false
 * @returns A single string containing all valid class names separated by spaces
 *
 * @example
 * ```tsx
 * cn("btn", isActive && "btn-active", "text-lg") // "btn btn-active text-lg"
 * cn("card", undefined, null, false, "shadow") // "card shadow"
 * ```
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};
