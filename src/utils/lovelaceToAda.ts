import { formatNumberWithSuffix } from "./format";

/**
 * Converts lovelace (smallest Cardano unit) to ADA with formatting and symbol.
 *
 * Cardano's native currency ADA is divided into 1,000,000 lovelace.
 * This function converts lovelace to ADA and formats it with the ₳ symbol.
 *
 * @param {number} lovelace - Amount in lovelace (1 ADA = 1,000,000 lovelace)
 * @returns {string} Formatted ADA amount with ₳ symbol
 *
 * @example
 * ```tsx
 * lovelaceToAda(1000000)
 * // Returns: "₳ 1"
 * ```
 *
 * @example
 * ```tsx
 * lovelaceToAda(45000000)
 * // Returns: "₳ 45"
 * ```
 *
 * @example
 * ```tsx
 * lovelaceToAda(1500000000)
 * // Returns: "₳ 1.5K" (formatted with suffix)
 * ```
 *
 * @example
 * ```tsx
 * lovelaceToAda(5000000000000)
 * // Returns: "₳ 5M" (formatted with suffix)
 * ```
 */
export const lovelaceToAda = (lovelace: number): string => {
  const ada = lovelace / 1e6;

  return `₳ ${formatNumberWithSuffix(ada)}`;
};
