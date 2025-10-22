import type { ScriptDetailData } from "@/types/scriptTypes";

/**
 * Props for the ExtraLabelBadge component
 */
export interface ExtraLabelBadgeProps {
  /**
   * The label text to display inside the badge
   *
   * @example
   * <ExtraLabelBadge name="Smart Contract" extra={extraData} />
   */
  name: string;

  /**
   * Optional extra styling and link configuration for the badge.
   * Contains background color (bg), text color (color), font weight (fw), and optional link (link).
   * If undefined, renders as plain text without styling.
   *
   * @example
   * // With styling
   * <ExtraLabelBadge
   *   name="Plutus V2"
   *   extra={{ bg: "#e3f2fd", color: "#1976d2", fw: 600 }}
   * />
   *
   * @example
   * // With link
   * <ExtraLabelBadge
   *   name="View Script"
   *   extra={{ link: "https://example.com", bg: "#fff3e0", color: "#e65100" }}
   * />
   */
  extra: ScriptDetailData["label"]["extra"] | undefined;
}

/**
 * ExtraLabelBadge displays a styled label badge with optional custom colors, font weight, and clickable link.
 *
 * This component is designed for displaying script labels, contract names, or other blockchain-related
 * identifiers with custom styling. When the `extra` prop contains a link, the badge becomes clickable
 * and opens the link in a new tab. Without the `extra` prop, it renders as plain text.
 *
 * **Common Use Cases:**
 * - Displaying smart contract types (Plutus V1, Plutus V2, Native Scripts)
 * - Showing script labels with custom branding colors
 * - Creating clickable badges that link to external script details
 * - Rendering plain text labels when no extra styling is needed
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - renders as plain text
 * <ExtraLabelBadge name="Native Script" extra={undefined} />
 *
 * // With custom styling
 * <ExtraLabelBadge
 *   name="Plutus V2"
 *   extra={{
 *     bg: "#e8f5e9",
 *     color: "#2e7d32",
 *     fw: 600
 *   }}
 * />
 *
 * // With link (clickable badge)
 * <ExtraLabelBadge
 *   name="View on Explorer"
 *   extra={{
 *     link: "https://cardanoscan.io/script/abc123",
 *     bg: "#f3e5f5",
 *     color: "#7b1fa2",
 *     fw: 500
 *   }}
 * />
 *
 * // Real-world example with blockchain data
 * <ExtraLabelBadge
 *   name={scriptData.label.name}
 *   extra={scriptData.label.extra}
 * />
 * ```
 *
 * @param {ExtraLabelBadgeProps} props - Component props
 * @param {string} props.name - The label text to display
 * @param {object} [props.extra] - Optional styling and link configuration
 * @param {string} [props.extra.bg] - Background color (hex or CSS color)
 * @param {string} [props.extra.color] - Text color (hex or CSS color)
 * @param {number} [props.extra.fw] - Font weight (100-900)
 * @param {string} [props.extra.link] - Optional URL to make the badge clickable
 * @returns {JSX.Element} A styled badge component, clickable anchor if link provided, or plain text if no extra data
 */
export const ExtraLabelBadge = ({ extra, name }: ExtraLabelBadgeProps) => {
  if (!extra) return <span>{name}</span>;

  return (
    <>
      {extra?.link ? (
        <a
          href={extra.link}
          target='_blank'
          rel='noopener noreferrer'
          className='rounded-max px-1 py-1/2'
          style={{
            backgroundColor: extra.bg || "transparent",
            color: extra.color || "text-text",
            fontWeight: extra.fw || 500,
          }}
        >
          {name}
        </a>
      ) : (
        <div
          className='rounded-max px-1 py-1/4'
          style={{
            backgroundColor: extra.bg || "transparent",
            color: extra.color || "text-text",
            fontWeight: extra.fw || 500,
          }}
        >
          {name}
        </div>
      )}
    </>
  );
};
