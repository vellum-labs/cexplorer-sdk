import { type FC } from "react";
import { Copy } from "../copy";

/**
 * Props for TextDisplay component.
 */
export interface TextDisplayProps {
  /** Text content to display (typically hashes, addresses, or code) */
  text: string;
  /** Additional CSS classes for customization */
  className?: string;
  /** If true, shows full content without height limit or container styles */
  contents?: boolean;
  /** If true, shows copy button in bottom-right corner */
  showCopy?: boolean;
}

/**
 * TextDisplay component shows monospace text with optional copy functionality.
 *
 * This component displays text content (typically blockchain hashes, addresses,
 * or code snippets) in a monospace font with an optional copy button overlay.
 * It supports two modes: default (with scrollable container and height limit)
 * and contents mode (full-height without container styling).
 *
 * **Features:**
 * - Monospace font for technical content (hashes, addresses)
 * - Optional copy button in bottom-right corner
 * - Two display modes: contained (default) vs full content
 * - Scrollable container with thin scrollbar for long text
 * - Break-all text wrapping for long strings
 * - Theme-aware styling (background, border, text colors)
 *
 * **Display Modes:**
 * - **Default** (`contents=false`): Scrollable container with max-height 112px (7rem)
 * - **Contents** (`contents=true`): Full-height display without container styles
 *
 * **Common Use Cases:**
 * - Transaction hash displays
 * - Smart contract addresses
 * - Blockchain metadata (script hashes, policy IDs)
 * - JSON or code snippets
 * - Multi-line technical data
 *
 * @component
 * @example
 * ```tsx
 * // Transaction hash with copy button
 * <TextDisplay
 *   text="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
 *   showCopy={true}
 * />
 *
 * // Smart contract code without container
 * <TextDisplay
 *   text={contractCode}
 *   contents={true}
 *   showCopy={false}
 * />
 *
 * // Policy ID with custom styling
 * <TextDisplay
 *   text="e1a2b3c4d5..."
 *   className="mt-4"
 * />
 * ```
 *
 * @param {TextDisplayProps} props - Component props
 * @param {string} props.text - Text content to display
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.contents=false] - Full content mode without container
 * @param {boolean} [props.showCopy=true] - Show copy button overlay
 * @returns {JSX.Element} Monospace text display with optional copy button
 */
export const TextDisplay: FC<TextDisplayProps> = ({
  text,
  className,
  contents,
  showCopy = true,
}) => {
  return (
    <div className={`relative ${className}`}>
      {showCopy && (
        <div
          className={`absolute bottom-2 right-2 rounded-s border border-border bg-background p-1`}
        >
          <Copy className='' copyText={text} />
        </div>
      )}
      <p
        className={`thin-scrollbar font-mono break-all text-text-xs font-medium ${contents ? "max-h-full" : "max-h-28 w-full overflow-scroll rounded-s border border-border bg-background p-1"}`}
      >
        {text}
      </p>
    </div>
  );
};
