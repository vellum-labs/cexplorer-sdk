import type { FC } from "react";

import { Check, Copy as CopyIcon, X } from "lucide-react";

import { toast } from "sonner";

import { cn } from "@/utils/cn";
import { useState } from "react";
import { Button } from "../button";

/**
 * Props for the Copy component.
 *
 * @interface CopyComponentProps
 */
interface CopyComponentProps {
  /**
   * Size of the copy icon in pixels.
   *
   * @optional
   * @default 13
   * @example 16
   * @example 20
   */
  size?: number;
  /**
   * Text content to copy to clipboard when clicked.
   *
   * @example "addr1q9xyztxxxx..."
   * @example "0a1b2c3d4e5f..."
   * @example "pool1xxxxxxxxxx..."
   */
  copyText: string | null | undefined;
  /**
   * Additional CSS classes to apply to the icon.
   *
   * @optional
   * @example "text-primary"
   * @example "ml-2"
   */
  className?: string;
  /**
   * When provided, renders as a button with this text instead of an icon.
   *
   * @optional
   * @example "Copy Address"
   * @example "Copy Transaction Hash"
   */
  showText?: string;
}

/**
 * Copy to clipboard component with visual feedback and toast notifications.
 *
 * Features:
 * - One-click copy to clipboard
 * - Visual feedback with check icon after successful copy
 * - Toast notification on copy success/failure
 * - Two display modes: icon-only or button with text
 * - Color change after first copy to indicate it was already copied
 * - Event propagation control to prevent unwanted parent clicks
 *
 * @component
 * @example
 * ```tsx
 * // Icon mode for transaction hash
 * <Copy copyText="0a1b2c3d4e5f6789..." size={16} />
 * ```
 *
 * @example
 * ```tsx
 * // Button mode for address
 * <Copy
 *   copyText="addr1q9xyztxxxx..."
 *   showText="Copy Address"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Custom styling for pool ID
 * <Copy
 *   copyText="pool1xxxxxxxxxx..."
 *   size={18}
 *   className="text-primary ml-2"
 * />
 * ```
 *
 * @param {CopyComponentProps} props - Component props
 * @returns {JSX.Element} Rendered copy icon or button
 */
export const Copy: FC<CopyComponentProps> = ({
  size = 13,
  copyText,
  className,
  showText,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [alreadyCopied, setAlreadyCopied] = useState<boolean>(false);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(copyText || "");
      setCopied(true);
      setAlreadyCopied(true);

      toast("Successfully copied", {
        action: {
          label: <X size={15} className='stroke-text' />,
          onClick: () => undefined,
        },
        id: "copy-toast",
      });

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch {
      toast("Copying failed", {
        action: {
          label: <X size={15} className='stroke-text' />,
          onClick: () => undefined,
        },
      });
    }
  };

  if (showText) {
    return (
      <Button
        label={showText}
        size='md'
        variant='tertiary'
        leftIcon={copied ? <Check size={15} /> : <CopyIcon size={15} />}
        onClick={handleCopy}
      />
    );
  }

  return copied ? (
    <Check className={cn("shrink-0", className)} size={size} />
  ) : (
    <CopyIcon
      className={cn("shrink-0", className)}
      size={size}
      cursor='pointer'
      onClick={e => {
        e.stopPropagation();
        handleCopy();
      }}
      color={alreadyCopied ? "var(--border)" : "var(--text)"}
    />
  );
};
