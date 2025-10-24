import { Cardano } from "@/resources/icons/Cardano";
import { useCurrencyStore } from "@/stores/currencyStore";
import { Link } from "@tanstack/react-router";

import { formatCurrency } from "@/utils/formatCurrency";
import type { FC } from "react";
import { Tooltip } from "../tooltip";

/**
 * Props for the AdaPriceIndicator component
 *
 * Accepts either undefined price data (for N/A state) or complete price information.
 */
export interface AdaPriceIndicatorProps {
  /**
   * ADA price data for the indicator.
   *
   * Can be one of two states:
   * - All fields undefined: Shows "N/A" state when price data is unavailable
   * - Complete price data: Shows current price, 24h change, and satoshi value
   *
   * @example
   * ```tsx
   * // With price data
   * <AdaPriceIndicator
   *   price={{
   *     todayValue: 0.45,
   *     adaToSats: 1250,
   *     today: "2024-10-24",
   *     yesterday: "2024-10-23",
   *     percentChange: 5.2
   *   }}
   * />
   *
   * // N/A state (price unavailable)
   * <AdaPriceIndicator
   *   price={{
   *     todayValue: undefined,
   *     adaToSats: undefined,
   *     today: undefined,
   *     yesterday: undefined,
   *     percentChange: undefined
   *   }}
   * />
   * ```
   */
  price:
    | {
        /** Current ADA value (undefined for N/A state) */
        todayValue?: undefined;
        /** ADA to Satoshi conversion rate (undefined for N/A state) */
        adaToSats?: undefined;
        /** Today's date string (undefined for N/A state) */
        today?: undefined;
        /** Yesterday's date string (undefined for N/A state) */
        yesterday?: undefined;
        /** 24-hour percentage change (undefined for N/A state) */
        percentChange?: undefined;
      }
    | {
        /** Current ADA value in selected currency */
        todayValue: number;
        /** ADA to Satoshi conversion rate */
        adaToSats: number;
        /** Today's date string (ISO format) */
        today: string;
        /** Yesterday's date string (ISO format) */
        yesterday: string;
        /** 24-hour percentage change (positive or negative) */
        percentChange: number;
      };
}

/**
 * AdaPriceIndicator displays the current ADA price with 24-hour change indicator.
 *
 * This component shows the current ADA price in the user's selected currency,
 * the 24-hour percentage change with color-coded badge, and the equivalent value in satoshis.
 * It's typically displayed in the header or navigation bar of the application.
 *
 * **Features:**
 * - Displays current ADA price in user's selected currency
 * - Color-coded 24h change badge:
 *   - Green: positive change (>1%)
 *   - Yellow: minimal change (-1% to 1%)
 *   - Red: negative change (<-1%)
 * - Shows ADA to Satoshi conversion
 * - Links to detailed price page
 * - Tooltip with "24h difference" label
 * - N/A state when price data unavailable
 * - Cardano logo icon
 * - Responsive formatting
 *
 * **Common Use Cases:**
 * - Header price indicator
 * - Navigation bar display
 * - Dashboard price widget
 * - Quick price reference
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with positive change
 * <AdaPriceIndicator
 *   price={{
 *     todayValue: 0.45,
 *     adaToSats: 1250,
 *     today: "2024-10-24",
 *     yesterday: "2024-10-23",
 *     percentChange: 5.2
 *   }}
 * />
 * // Result: "ADA: $0.45 +5.2% (1250 sats)" in green
 *
 * // With negative change
 * <AdaPriceIndicator
 *   price={{
 *     todayValue: 0.38,
 *     adaToSats: 1050,
 *     today: "2024-10-24",
 *     yesterday: "2024-10-23",
 *     percentChange: -3.5
 *   }}
 * />
 * // Result: "ADA: $0.38 -3.5% (1050 sats)" in red
 *
 * // With minimal change (yellow)
 * <AdaPriceIndicator
 *   price={{
 *     todayValue: 0.42,
 *     adaToSats: 1180,
 *     today: "2024-10-24",
 *     yesterday: "2024-10-23",
 *     percentChange: 0.5
 *   }}
 * />
 * // Result: "ADA: $0.42 +0.5% (1180 sats)" in yellow
 *
 * // N/A state (price unavailable)
 * <AdaPriceIndicator
 *   price={{
 *     todayValue: undefined,
 *     adaToSats: undefined,
 *     today: undefined,
 *     yesterday: undefined,
 *     percentChange: undefined
 *   }}
 * />
 * // Result: "ADA: N/A" in red
 *
 * // In header navigation
 * <header>
 *   <nav>
 *     <Logo />
 *     <AdaPriceIndicator price={priceData} />
 *     <UserMenu />
 *   </nav>
 * </header>
 * ```
 *
 * @param {AdaPriceIndicatorProps} props - Component props
 * @param {object} props.price - ADA price data or undefined values
 * @param {number} [props.price.todayValue] - Current ADA price
 * @param {number} [props.price.adaToSats] - Satoshi conversion rate
 * @param {string} [props.price.today] - Today's date
 * @param {string} [props.price.yesterday] - Yesterday's date
 * @param {number} [props.price.percentChange] - 24h percentage change
 * @returns {JSX.Element} Price indicator with change badge and satoshi value
 */
export const AdaPriceIndicator: FC<AdaPriceIndicatorProps> = ({ price }) => {
  const { currency } = useCurrencyStore();

  if (price.percentChange === undefined) {
    return (
      <>
        <div className='flex items-center gap-1/2 text-text-xs font-medium'>
          <Cardano size={18} color='var(--text)' />
          <span className='text-grayTextPrimary'>ADA:</span>
          <span
            className={`ml-0.5 flex items-center rounded-max border border-red-500/40 bg-red-500/5 px-1/2 py-1/4 text-[11px] font-medium text-redText`}
          >
            N/A
          </span>
        </div>
      </>
    );
  }

  return (
    <Tooltip content={<div className='w-[100px]'>24h difference</div>}>
      <Link to='/ada-price'>
        <div className='flex items-center gap-1/2 text-text-xs font-medium'>
          <Cardano size={18} color='var(--text)' />
          <span className='text-grayTextPrimary'>
            ADA:{" "}
            {formatCurrency(Number(price.todayValue.toFixed(2)), currency, {
              applyNumberFormatting: false,
            })}
          </span>
          <span
            className={`ml-0.5 flex items-center rounded-max px-1/2 py-1/4 text-[11px] font-medium ${price.percentChange < 1 && price.percentChange > -1 ? "text-yellowText" : price.percentChange > 0 ? "text-greenText" : "text-redText"}`}
            style={{
              border: `1px solid ${
                price.percentChange < 1 && price.percentChange > -1
                  ? "rgba(234, 179, 8, 0.4)"
                  : price.percentChange > 0
                    ? "rgba(34, 197, 94, 0.4)"
                    : "rgba(239, 68, 68, 0.4)"
              }`,
              backgroundColor:
                price.percentChange < 1 && price.percentChange > -1
                  ? "rgba(234, 179, 8, 0.05)"
                  : price.percentChange > 0
                    ? "rgba(34, 197, 94, 0.05)"
                    : "rgba(239, 68, 68, 0.05)",
            }}
          >
            {price.percentChange > 0 && "+"}
            {price.percentChange?.toFixed(1)}%
          </span>
        </div>
        <div className='-mt-0.5 ml-[21px] flex items-center gap-1/2 text-[10px] text-grayTextSecondary'>
          ({Math.round(price.adaToSats)} sats)
        </div>
      </Link>
    </Tooltip>
  );
};
