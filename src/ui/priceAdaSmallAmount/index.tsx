import { Tooltip } from "@/ui/tooltip";
import { Copy } from "@/ui/copy";
import { formatSmallValueWithSub } from "@/utils/formatSmallValueWithSub";

/**
 * Props for the PriceAdaSmallAmount component
 */
export interface PriceAdaSmallAmountProps {
  /**
   * Price value in lovelace (1 ADA = 1,000,000 lovelace)
   * Accepts number, undefined, or null (shows "-" for undefined/null)
   *
   * @example
   * // Small price (0.00025 ADA = 250 lovelace)
   * <PriceAdaSmallAmount price={250} />
   *
   * // Normal price (1.5 ADA = 1,500,000 lovelace)
   * <PriceAdaSmallAmount price={1500000} />
   *
   * // No price
   * <PriceAdaSmallAmount price={null} />
   * // Displays: "-"
   */
  price: number | undefined | null;
}

/**
 * PriceAdaSmallAmount displays ADA prices with subscript notation for very small amounts.
 *
 * This component is specifically designed for displaying cryptocurrency prices in ADA,
 * automatically converting from lovelace (the smallest unit) to ADA. For very small
 * prices, it uses subscript notation to make leading zeros more readable. A tooltip
 * shows the full precision price with a copy button.
 *
 * **Key Features:**
 * - Automatically converts lovelace to ADA (divides by 1,000,000)
 * - Uses subscript notation for values < 0.01 ADA
 * - Shows full precision price in tooltip with copy functionality
 * - Displays "-" for null/undefined values
 *
 * **Formatting Examples:**
 * - 250 lovelace (0.00025 ADA) → "₳ 0.0₂₂₅₀₀"
 * - 1,500,000 lovelace (1.5 ADA) → "₳ 1.500000"
 * - null → "-"
 *
 * **Common Use Cases:**
 * - Display token prices in ADA
 * - Show transaction fees
 * - Display NFT prices
 * - Show DeFi pool prices or swap rates
 * - Any small ADA amount that needs clear formatting
 *
 * @component
 * @example
 * ```tsx
 * // Very small price with subscript notation
 * <PriceAdaSmallAmount price={250} />
 * // Displays: ₳ 0.0₂₂₅₀₀
 * // Tooltip shows full: ₳ 0.00025 with copy button
 *
 * // Normal price
 * <PriceAdaSmallAmount price={1500000} />
 * // Displays: ₳ 1.500000
 *
 * // Token price
 * <PriceAdaSmallAmount price={12500} />
 * // Displays: ₳ 0.0₁₂₅₀₀ (0.0125 ADA)
 *
 * // No price available
 * <PriceAdaSmallAmount price={null} />
 * // Displays: -
 * ```
 *
 * @param {PriceAdaSmallAmountProps} props - Component props
 * @param {number | undefined | null} props.price - Price in lovelace
 * @returns {JSX.Element} Formatted ADA price with tooltip
 */
export const PriceAdaSmallAmount = ({ price }: PriceAdaSmallAmountProps) => {
  if (!price) {
    return <span>-</span>;
  }

  const priceInAda = price / 1e6;
  const fullPrice = priceInAda.toFixed(20).replace(/\.?0+$/, "");

  return (
    <Tooltip
      content={
        <div className='flex items-center gap-1/2'>
          <span>₳ {fullPrice}</span>
          <Copy copyText={fullPrice} />
        </div>
      }
    >
      <div className='text-text-sm text-grayTextPrimary'>
        {formatSmallValueWithSub(priceInAda, "₳ ", 0.01, 6, 4)}
      </div>
    </Tooltip>
  );
};
