import {
  currencySigns,
  currencyPosition,
  currencySpace,
} from "@/constants/currencies";
import { formatNumber } from "@/utils/format";

/**
 * Formats a numeric value as a currency string with proper symbol, position, and spacing.
 *
 * This function handles currency formatting for multiple currencies, automatically
 * applying the correct currency symbol, positioning (prefix or suffix), and spacing
 * based on currency conventions. It supports both number formatting (with thousands
 * separators) and raw formatting.
 *
 * **Currency Formatting Rules:**
 * - Symbol: Uses currency-specific symbols (e.g., $, €, £) or falls back to uppercase code
 * - Position: Prefix (e.g., $100) or suffix (e.g., 100 EUR) based on currency
 * - Spacing: Adds space between value and symbol when appropriate (e.g., "100 €")
 * - Number Format: Applies thousand separators and decimal formatting when enabled
 *
 * **Supported Features:**
 * - Accepts both number and string values
 * - Optional number formatting with thousands separators
 * - Currency-specific symbol positioning
 * - Currency-specific spacing rules
 * - Fallback to uppercase currency code if symbol not found
 *
 * @param {number | string} value - The numeric value to format
 * @param {string} currency - Currency code (e.g., "usd", "eur", "btc")
 * @param {object} [options] - Optional formatting configuration
 * @param {boolean} [options.applyNumberFormatting=true] - Whether to apply number formatting (thousands separators)
 * @returns {string} Formatted currency string
 *
 * @example
 * ```ts
 * // US Dollar (prefix, no space)
 * formatCurrency(1234.56, "usd")
 * // Returns: "$1,234.56"
 *
 * // Euro (suffix with space)
 * formatCurrency(1234.56, "eur")
 * // Returns: "1,234.56 €"
 *
 * // Without number formatting
 * formatCurrency(1234.56, "usd", { applyNumberFormatting: false })
 * // Returns: "$1234.56"
 *
 * // Bitcoin
 * formatCurrency(0.5, "btc")
 * // Returns: "₿0.5"
 *
 * // String value
 * formatCurrency("1234.56", "usd")
 * // Returns: "$1,234.56"
 *
 * // Unknown currency (fallback to uppercase)
 * formatCurrency(100, "xyz")
 * // Returns: "XYZ100" or "100 XYZ" (depends on defaults)
 * ```
 */
export const formatCurrency = (
  value: number | string,
  currency: string,
  options?: {
    applyNumberFormatting?: boolean;
  },
): string => {
  const { applyNumberFormatting = true } = options || {};

  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  const formattedValue = applyNumberFormatting
    ? formatNumber(numericValue)
    : numericValue.toLocaleString();

  const symbol = currencySigns[currency] || currency.toUpperCase();
  const isSuffix = currencyPosition[currency] ?? false;
  const hasSpace = currencySpace[currency] ?? false;

  const space = hasSpace ? " " : "";

  if (isSuffix) {
    return `${formattedValue}${space}${symbol}`;
  }

  return `${symbol}${space}${formattedValue}`;
};
