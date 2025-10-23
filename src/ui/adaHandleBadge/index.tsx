import { Tooltip } from "@/ui/tooltip";
import Dollar from "@/resources/images/dollar.svg";
import { encodeAssetName } from "@/utils/asset/encodeAssetName";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Badge } from "@/ui/badge";
import { getAssetFingerprint } from "@/utils/asset/getAssetFingerprint";

/**
 * Props for AdaHandleBadge when displaying a specific handle (hex mode)
 */
interface HexProps {
  /** Additional CSS classes for styling */
  className?: string;
  /** Hexadecimal-encoded handle name */
  hex?: string;
  /** Whether to make the handle a clickable link to asset page */
  link?: boolean;
  /** Cannot use variant when hex is provided */
  variant?: never;
  /** Policy ID for the Ada Handle asset (required with hex) */
  policyId?: string;
}

/**
 * Props for AdaHandleBadge when displaying a generic placeholder (variant mode)
 */
interface VariantProps {
  /** Additional CSS classes for styling */
  className?: string;
  /** Display variant: "long" shows full badge, "icon" shows only dollar icon */
  variant?: "long" | "icon";
  /** Cannot use hex when variant is provided */
  hex?: never;
  /** Cannot use link when variant is provided */
  link?: never;
  /** Policy ID (optional in variant mode) */
  policyId?: string;
}

/**
 * Props for the AdaHandleBadge component
 * Use either hex mode (with hex prop) or variant mode (with variant prop), not both
 */
export type AdaHandleBadgeProps = HexProps | VariantProps;

/**
 * AdaHandleBadge displays Cardano Ada Handle badges with optional linking and variants.
 *
 * Shows Ada Handle identifiers (Cardano's decentralized name service) as badges with
 * a dollar sign icon. Supports three display modes:
 * - **Hex mode**: Displays a specific handle decoded from hex with optional asset link
 * - **Long variant**: Shows a generic "handle" label badge
 * - **Icon variant**: Shows only the dollar icon
 *
 * All variants include a tooltip showing "Ada Handle" on hover.
 *
 * **Common Use Cases:**
 * - Display user Ada Handles in transaction lists
 * - Show handle ownership in address views
 * - Link to Ada Handle asset details
 * - Generic handle indicators
 *
 * @component
 * @example
 * ```tsx
 * // Specific handle with hex (decoded from hex to readable name)
 * <AdaHandleBadge
 *   hex="68656c6c6f"
 *   policyId="f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
 * />
 *
 * // Handle with clickable link to asset page
 * <AdaHandleBadge
 *   hex="68656c6c6f"
 *   policyId="f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a"
 *   link={true}
 * />
 *
 * // Generic "handle" label badge
 * <AdaHandleBadge variant="long" />
 *
 * // Icon only (compact display)
 * <AdaHandleBadge variant="icon" />
 * ```
 *
 * @param {AdaHandleBadgeProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {string} [props.hex] - Hexadecimal-encoded handle name (hex mode)
 * @param {boolean} [props.link=false] - Whether to make the handle a clickable link (hex mode only)
 * @param {"long" | "icon"} [props.variant] - Display variant (variant mode)
 * @param {string} [props.policyId] - Policy ID for the Ada Handle asset
 * @returns {JSX.Element} Ada Handle badge with tooltip
 */
export const AdaHandleBadge = ({
  className,
  hex,
  variant,
  link = false,
  policyId,
}: AdaHandleBadgeProps) => {
  let inner: ReactNode | null = null;

  if (hex) {
    const formattedHex = String(hex).replace(
      /^(000de140|0014df10|000643b0)/,
      "",
    );

    inner = (
      <Badge color='gray' rounded className={className}>
        <img src={Dollar} alt='dollar' />
        {link ? (
          <Link
            to='/asset/$fingerprint'
            params={{
              fingerprint: getAssetFingerprint(policyId + hex),
            }}
            className='hover:text-text'
          >
            {encodeAssetName(formattedHex)}
          </Link>
        ) : (
          <span>{encodeAssetName(formattedHex)}</span>
        )}
      </Badge>
    );
  } else if (variant === "long") {
    inner = (
      <Badge color='gray' rounded className={className}>
        <img src={Dollar} alt='dollar' />
        <span className='text-[14px] font-bold'>handle</span>
      </Badge>
    );
  } else {
    inner = (
      <img src={Dollar} alt='dollar' className={`h-4 w-4 ${className}`} />
    );
  }

  return (
    <Tooltip content={<div className='min-w-[90px]'>Ada Handle</div>}>
      {inner}
    </Tooltip>
  );
};
