import type { FC } from "react";

import { Tooltip } from "@/ui/tooltip";

import { formatBitcoinWithSub } from "@/utils/formatSmallValueWithSub";
import { formatCurrency } from "@/utils/formatCurrency";
import { AdaWithTooltip } from "@/ui/adaWithTooltip";
import { Currencies } from "@/types/currencyTypes";

/**
 * Props for the TotalSumWithRates component
 */
export interface BlockDetailTransactionsOverviewTotalProps {
  /**
   * Array containing conversion data: [label, fiat_value, btc_value, unused]
   * - sum[0]: Label (unused in display)
   * - sum[1]: Fiat currency value (e.g., USD value)
   * - sum[2]: Bitcoin (BTC) value
   * - sum[3]: Reserved/unused
   *
   * @example
   * <TotalSumWithRates
   *   sum={["total", 1234.56, 0.00025, 0]}
   *   ada={500000000}
   *   currency="usd"
   * />
   */
  sum: [string, number, number, number];

  /**
   * Amount in lovelace (1 ADA = 1,000,000 lovelace)
   *
   * @example
   * // 500 ADA
   * <TotalSumWithRates
   *   sum={["total", 1234.56, 0.00025, 0]}
   *   ada={500000000}
   *   currency="usd"
   * />
   */
  ada: number;

  /**
   * Currency code for fiat conversion display
   *
   * @example
   * <TotalSumWithRates
   *   sum={["total", 1234.56, 0.00025, 0]}
   *   ada={500000000}
   *   currency="usd"
   * />
   */
  currency: Currencies;
}

/**
 * TotalSumWithRates displays an ADA amount with exchange rate conversions to fiat and Bitcoin.
 *
 * This component shows a primary ADA value along with its equivalent values in a fiat
 * currency (e.g., USD, EUR) and Bitcoin (BTC). The fiat and BTC values are shown in
 * parentheses with tooltips displaying full precision amounts. This is particularly
 * useful for displaying transaction totals, block rewards, or any ADA amount where
 * users benefit from seeing equivalent values in other currencies.
 *
 * **Display Format:**
 * - Primary: ADA amount with tooltip showing full precision
 * - Secondary: (Fiat Value | BTC Value) with individual tooltips
 *
 * **Key Features:**
 * - Shows ADA amount prominently with full precision tooltip
 * - Displays rounded fiat amount with full precision tooltip
 * - Shows BTC amount using subscript notation for small values
 * - Handles NaN values gracefully (returns null)
 * - Responsive text wrapping for different screen sizes
 *
 * **Common Use Cases:**
 * - Display transaction totals with exchange rates
 * - Show block reward values across currencies
 * - Display treasury amounts with conversions
 * - Show staking rewards in multiple currencies
 * - Display pool fees or margins with rate conversions
 * - Any ADA amount where multi-currency context is helpful
 *
 * @component
 * @example
 * ```tsx
 * // Transaction total with USD and BTC rates
 * <TotalSumWithRates
 *   sum={["total", 1234.56, 0.00025, 0]}
 *   ada={500000000}
 *   currency="usd"
 * />
 * // Displays: "500 ₳ ($1,234.56 | ₿0.0₂25)"
 *
 * // Block reward with EUR conversion
 * <TotalSumWithRates
 *   sum={["reward", 850.25, 0.00015, 0]}
 *   ada={340000000}
 *   currency="eur"
 * />
 * // Displays: "340 ₳ (850.25 € | ₿0.0₃15)"
 *
 * // Large amount with full precision tooltips
 * <TotalSumWithRates
 *   sum={["total", 125000.789, 0.125, 0]}
 *   ada={50000000000}
 *   currency="usd"
 * />
 * // Primary shows: "50,000 ₳"
 * // Fiat tooltip shows: "$125,000.789"
 * // BTC shows: "₿0.125"
 * ```
 *
 * @param {BlockDetailTransactionsOverviewTotalProps} props - Component props
 * @param {[string, number, number, number]} props.sum - Conversion data array with fiat and BTC values
 * @param {number} props.ada - Amount in lovelace (1 ADA = 1,000,000 lovelace)
 * @param {Currencies} props.currency - Currency code for fiat conversion (e.g., "usd", "eur")
 * @returns {JSX.Element | null} Formatted sum with exchange rates, or null if values are invalid
 */
export const TotalSumWithRates: FC<
  BlockDetailTransactionsOverviewTotalProps
> = ({ sum, ada, currency }) => {
  if (sum.includes(NaN)) return null;

  return (
    <div className='flex flex-wrap items-center gap-1/2 text-text-sm'>
      <span className='text-nowrap font-medium leading-none text-text'>
        <AdaWithTooltip data={ada} />
      </span>
      <span className='h-[20px] translate-y-[2px] pr-1/2 leading-none text-grayTextPrimary'>
        (
        <Tooltip
          content={formatCurrency(sum[1], currency, {
            applyNumberFormatting: true,
          })}
        >
          <span>
            {formatCurrency((+sum[1]).toFixed(2), currency, {
              applyNumberFormatting: false,
            })}
          </span>
        </Tooltip>{" "}
        |{" "}
        <Tooltip content={<>₿{sum[2].toFixed(15)}</>}>
          {formatBitcoinWithSub(+sum[2])}
        </Tooltip>
        )
      </span>
    </div>
  );
};
