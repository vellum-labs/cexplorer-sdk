import type { ReactNode } from "react";

/**
 * Formats small numeric values by displaying leading zeros as subscript notation.
 *
 * This function is designed to handle very small decimal numbers (like cryptocurrency
 * prices) by making them more readable. Instead of showing many leading zeros after
 * the decimal point, it displays the count of leading zeros as a subscript.
 *
 * **Formatting behavior:**
 * - Values >= threshold: Normal decimal format (e.g., "₳0.150")
 * - Values < threshold: Subscript notation (e.g., "₳0.0₂₅" for 0.00025)
 * - Zero values: Simply returns "symbol0"
 *
 * **Examples:**
 * - 0.00025 → "₳0.0₂25" (2 leading zeros shown as subscript)
 * - 0.0000012 → "₳0.0₅12" (5 leading zeros shown as subscript)
 * - 0.15 → "₳0.150" (above threshold, normal format)
 * - 0 → "₳0"
 *
 * @param {number} value - The numeric value to format
 * @param {string} symbol - Currency symbol to display (e.g., "₳ ", "₿", "$")
 * @param {number} [threshold=0.001] - Values >= this use normal format, below use subscript
 * @param {number} [decimals=3] - Number of decimal places for normal format
 * @param {number} [significantDigitsCount=2] - Number of significant digits after leading zeros
 * @returns {ReactNode} Formatted value with subscript notation for leading zeros
 *
 * @example
 * ```tsx
 * // Small value with subscript notation
 * formatSmallValueWithSub(0.00025, "₳ ", 0.001, 3, 2)
 * // Returns: <span>₳ 0.0<sub>2</sub>25</span>
 *
 * // Normal value above threshold
 * formatSmallValueWithSub(0.15, "₳ ", 0.001, 3, 2)
 * // Returns: <span>₳ 0.150</span>
 *
 * // Very small value
 * formatSmallValueWithSub(0.0000012, "₳ ", 0.001, 3, 2)
 * // Returns: <span>₳ 0.0<sub>5</sub>12</span>
 *
 * // Zero value
 * formatSmallValueWithSub(0, "₳ ", 0.001, 3, 2)
 * // Returns: <span>₳ 0</span>
 * ```
 */
export const formatSmallValueWithSub = (
  value: number,
  symbol: string,
  threshold = 0.001,
  decimals = 3,
  significantDigitsCount = 2,
): ReactNode => {
  if (value === 0) return <span>{symbol}0</span>;
  if (value >= threshold)
    return (
      <span>
        {symbol}
        {value.toFixed(decimals)}
      </span>
    );

  const str = value.toFixed(20);
  const afterDecimal = str.slice(2);

  let leadingZeros = 0;
  for (const char of afterDecimal) {
    if (char === "0") leadingZeros++;
    else break;
  }

  const remainingDigits = afterDecimal.slice(leadingZeros);
  const digitsToGet = significantDigitsCount + 1;
  const firstDigits = remainingDigits.slice(0, digitsToGet);
  const rounded = Math.round(parseInt(firstDigits) / 10);
  const significantDigits = rounded.toString().slice(0, significantDigitsCount);

  return (
    <span>
      {symbol}0.0
      <span style={{ fontSize: "0.7em", verticalAlign: "sub" }}>
        {leadingZeros}
      </span>
      {significantDigits}
    </span>
  );
};

/**
 * Formats Bitcoin values using subscript notation for small amounts.
 *
 * This is a convenience wrapper around `formatSmallValueWithSub` specifically
 * configured for Bitcoin (₿) with appropriate defaults.
 *
 * @param {number} value - The Bitcoin value to format
 * @returns {ReactNode} Formatted Bitcoin value with subscript notation
 *
 * @example
 * ```tsx
 * formatBitcoinWithSub(0.00025)
 * // Returns: <span>₿0.0<sub>2</sub>25</span>
 *
 * formatBitcoinWithSub(0.15)
 * // Returns: <span>₿0.150</span>
 * ```
 */
export const formatBitcoinWithSub = (value: number): ReactNode => {
  return formatSmallValueWithSub(value, "₿", 0.001, 3);
};
