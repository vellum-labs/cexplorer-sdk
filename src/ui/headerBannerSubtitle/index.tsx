import type { FC, ReactNode } from "react";

import { Copy } from "@/ui/copy";

/**
 * Props for the HeaderBannerSubtitle component
 */
export interface BlockDetailSubTitleProps {
  /**
   * The full hash value to be copied to clipboard
   *
   * @example
   * <HeaderBannerSubtitle
   *   hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
   *   hashString="5f20df93...e940ebb"
   * />
   */
  hash: string | undefined;

  /**
   * The hash string to display (can be truncated for UI, accepts JSX from formatString)
   *
   * @example
   * <HeaderBannerSubtitle
   *   hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
   *   hashString={formatString(hash, "long")}
   * />
   */
  hashString: ReactNode;

  /**
   * Optional title label that appears before the hash
   * @default "Hash"
   *
   * @example
   * <HeaderBannerSubtitle
   *   title="Transaction"
   *   hash="abc123"
   *   hashString="abc123"
   * />
   */
  title?: string;

  /**
   * Optional CSS class names for styling customization
   *
   * @example
   * <HeaderBannerSubtitle
   *   className="my-4"
   *   hash="abc123"
   *   hashString="abc123"
   * />
   */
  className?: string;
}

/**
 * HeaderBannerSubtitle displays a labeled hash value with a copy-to-clipboard button.
 *
 * This component is commonly used in header sections to display blockchain identifiers
 * like transaction hashes, block hashes, or addresses. It shows a label (e.g., "Hash:")
 * followed by the hash string and a copy button that allows users to quickly copy the
 * full hash value to their clipboard.
 *
 * **Common Use Cases:**
 * - Display transaction hash in transaction detail pages
 * - Show block hash in block explorer headers
 * - Display pool ID or stake address in pool/address details
 * - Any header section where a copyable hash/ID needs to be shown
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with default "Hash" title
 * <HeaderBannerSubtitle
 *   hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
 *   hashString="5f20df93...e940ebb"
 * />
 *
 * // With custom title
 * <HeaderBannerSubtitle
 *   title="Transaction"
 *   hash="5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb"
 *   hashString="5f20df93...e940ebb"
 * />
 *
 * // With custom styling
 * <HeaderBannerSubtitle
 *   title="Block Hash"
 *   hash="abc123def456"
 *   hashString="abc123...def456"
 *   className="my-4"
 * />
 * ```
 *
 * @param {BlockDetailSubTitleProps} props - Component props
 * @param {string | undefined} props.hash - The full hash value to copy
 * @param {string | undefined} props.hashString - The hash string to display (can be truncated)
 * @param {string} [props.title="Hash"] - Optional label that appears before the hash
 * @param {string} [props.className] - Optional CSS classes for styling
 * @returns {JSX.Element} A subtitle component with hash display and copy button
 */
export const HeaderBannerSubtitle: FC<BlockDetailSubTitleProps> = ({
  hashString,
  hash,
  title,
  className,
}) => {
  return (
    <div className={`mb-3 mt-1 flex items-center gap-1.5 ${className}`}>
      <span className='flex items-center text-grayTextPrimary'>
        {title ?? "Hash"}:&nbsp;{hashString}
      </span>
      <Copy size={13} copyText={hash ?? ""} />
    </div>
  );
};
