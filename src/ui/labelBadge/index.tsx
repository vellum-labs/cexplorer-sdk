import { Tooltip } from "@/ui/tooltip";
import type { ScriptDetailData } from "@/types/scriptTypes";
import type { Label } from "@/types/txTypes";
import type { ReactNode } from "react";
import { Badge } from "@/ui/badge";
import { ExtraLabelBadge } from "./components/ExtraLabelBadge";

/**
 * Props for the LabelBadge component
 */
export interface LabelBadgeProps {
  /**
   * The size variant of the badge.
   * - `"sm"`: Small badge with fixed max-width (58px) and ellipsis for overflow
   * - `"lg"`: Large badge with full label text
   * - `"textOnly"`: Renders only text using ExtraLabelBadge (no Badge wrapper, no Tooltip)
   *
   * @example
   * <LabelBadge variant="sm" label={labelData} />
   */
  variant: "sm" | "lg" | "textOnly";

  /**
   * The label data object containing label text, category, source, and related information.
   * This object includes:
   * - `label`: The display text for the badge
   * - `category`: Array of category strings
   * - `source`: The source of the label data
   * - `data`: Contains scriptHash and contractAddress
   *
   * @example
   * <LabelBadge
   *   variant="lg"
   *   label={{
   *     label: "DEX Contract",
   *     category: ["DeFi", "Exchange"],
   *     source: "CardanoScan",
   *     data: { scriptHash: "abc123...", contractAddress: "addr1..." }
   *   }}
   * />
   */
  label: Label;

  /**
   * Optional CSS class name to apply custom styles to the badge.
   * This is applied to the Badge component wrapper for `sm` and `lg` variants.
   *
   * @example
   * <LabelBadge variant="sm" label={labelData} className="custom-badge-style" />
   */
  className?: string;

  /**
   * Optional extra styling and link configuration for the textOnly variant.
   * Only used when `variant="textOnly"`. Passed to ExtraLabelBadge component.
   * Contains background color, text color, font weight, and optional link.
   *
   * @example
   * <LabelBadge
   *   variant="textOnly"
   *   label={labelData}
   *   extra={{ bg: "#e3f2fd", color: "#1976d2", fw: 600, link: "https://..." }}
   * />
   */
  extra?: ScriptDetailData["label"]["extra"];
}

/**
 * LabelBadge displays a labeled badge for blockchain scripts, contracts, or transactions with tooltip information.
 *
 * This component renders a badge with the label text in three size variants. For `sm` and `lg` variants,
 * the badge is wrapped in a Tooltip that shows detailed information including the full label, category,
 * and source. The `textOnly` variant uses the ExtraLabelBadge component for styled text without tooltip.
 *
 * **Common Use Cases:**
 * - Displaying smart contract labels in transaction lists (use `variant="sm"` for compact display)
 * - Showing script labels with full information on detail pages (use `variant="lg"`)
 * - Rendering styled text labels without tooltips (use `variant="textOnly"` with `extra` styling)
 * - Identifying DeFi protocols, NFT projects, or other labeled blockchain entities
 *
 * @component
 * @example
 * ```tsx
 * // Small badge with tooltip (for lists/tables)
 * <LabelBadge
 *   variant="sm"
 *   label={{
 *     label: "Minswap",
 *     category: ["DeFi", "DEX"],
 *     source: "CardanoScan",
 *     data: {
 *       scriptHash: "e1317b152faac13426e6a83e06ff88a4d62cce3c1634ab0a5ec13309",
 *       contractAddress: "addr1..."
 *     }
 *   }}
 * />
 *
 * // Large badge with tooltip (for detail views)
 * <LabelBadge
 *   variant="lg"
 *   label={{
 *     label: "SundaeSwap AMM",
 *     category: ["DeFi", "Liquidity Pool"],
 *     source: "Official Registry",
 *     data: { scriptHash: "abc123...", contractAddress: "addr1..." }
 *   }}
 *   className="font-semibold"
 * />
 *
 * // Text-only variant with custom styling (no tooltip)
 * <LabelBadge
 *   variant="textOnly"
 *   label={{
 *     label: "Plutus V2",
 *     category: ["Smart Contract"],
 *     source: "Blockchain",
 *     data: { scriptHash: "", contractAddress: "" }
 *   }}
 *   extra={{
 *     bg: "#e8f5e9",
 *     color: "#2e7d32",
 *     fw: 600,
 *     link: null
 *   }}
 * />
 *
 * // Real-world example with transaction data
 * {tx.label && (
 *   <LabelBadge
 *     variant="sm"
 *     label={tx.label}
 *   />
 * )}
 * ```
 *
 * @param {LabelBadgeProps} props - Component props
 * @param {"sm" | "lg" | "textOnly"} props.variant - Size variant of the badge
 * @param {Label} props.label - Label data containing text, category, and source information
 * @param {string} [props.className] - Optional CSS class for custom styling
 * @param {object} [props.extra] - Optional styling for textOnly variant (bg, color, fw, link)
 * @returns {JSX.Element} A badge component with tooltip (sm/lg) or styled text (textOnly)
 */
export const LabelBadge = ({
  variant,
  label,
  className,
  extra,
}: LabelBadgeProps) => {
  let inner: ReactNode = null;
  switch (variant) {
    case "sm":
      inner = (
        <Badge
          color='blue'
          rounded
          className={`block h-6 max-w-[58px] ${className}`}
          style={{
            fontSize: "10px",
            padding: "0px 5px",
          }}
        >
          <span className='block overflow-hidden text-ellipsis whitespace-nowrap'>
            {label.label}
          </span>
        </Badge>
      );
      break;
    case "lg":
      inner = (
        <Badge color='blue' rounded className={className}>
          {label.label}
        </Badge>
      );
      break;

    case "textOnly":
      return <ExtraLabelBadge name={label.label} extra={extra} />;
  }

  return (
    <Tooltip
      content={
        <div className='flex min-w-[160px] flex-col gap-1/2 text-text-sm'>
          <p className='mb-1/2'>{label.label}</p>
          <p>
            Category:{" "}
            {label.category
              ? label.category.map(
                  (category, index) =>
                    `${index !== label.category.length - 1 ? category + ", " : category}`,
                )
              : "Not provided"}
          </p>
          <p>Source: {label.source}</p>
        </div>
      }
    >
      {inner}
    </Tooltip>
  );
};
