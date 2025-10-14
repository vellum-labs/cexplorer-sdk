import { formatNumber } from "@/utils/format";
import type { FC } from "react";
import { Tooltip } from "../tooltip";

import { lovelaceToAda } from "@/utils/lovelaceToAda";
import { Copy } from "../copy";

/**
 * Props for the AdaWithTooltip component.
 *
 * @interface AdaWithTooltipProps
 */
interface AdaWithTooltipProps {
  /**
   * Amount in lovelace (1 ADA = 1,000,000 lovelace).
   * Will be converted to ADA for display.
   *
   * @example 1000000 // 1 ADA
   * @example 45000000 // 45 ADA
   */
  data: number;
  /**
   * Additional CSS classes for the trigger element.
   *
   * @optional
   * @example "font-bold text-lg"
   */
  triggerClassName?: string;
  /**
   * Enable tooltip showing exact lovelace amount with copy functionality.
   * When disabled, only shows the ADA amount without tooltip.
   *
   * @optional
   * @default true
   */
  tooltip?: boolean;
}

/**
 * Component for displaying ADA amounts with optional tooltip showing exact lovelace value.
 *
 * Automatically converts lovelace to ADA for display. When tooltip is enabled,
 * hovering shows the exact lovelace amount with a copy button.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with tooltip
 * <AdaWithTooltip data={1000000} />
 * // Displays: "1 ₳" with tooltip showing "1,000,000" lovelace
 * ```
 *
 * @example
 * ```tsx
 * // Without tooltip
 * <AdaWithTooltip data={45000000} tooltip={false} />
 * // Displays: "45 ₳" without tooltip
 * ```
 *
 * @param {AdaWithTooltipProps} props - Component props
 * @returns {JSX.Element} Rendered ADA amount with optional tooltip
 */
export const AdaWithTooltip: FC<AdaWithTooltipProps> = ({
  data,
  triggerClassName,
  tooltip = true,
}) => {
  return tooltip ? (
    <Tooltip
      content={
        <p className='flex items-center gap-1/2 text-text'>
          <span className='text-text-sm'>{formatNumber(data ?? 0)}</span>
          <Copy copyText={String(data)} />
        </p>
      }
    >
      <span className={`text-sm text-grayTextPrimary ${triggerClassName}`}>
        {lovelaceToAda(data ?? 0)}
      </span>
    </Tooltip>
  ) : (
    <span className={`text-sm text-grayTextPrimary ${triggerClassName}`}>
      {lovelaceToAda(data ?? 0)}
    </span>
  );
};
