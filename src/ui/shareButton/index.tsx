import { Facebook } from "@/resources/Facebook";
import { Twitter } from "@/resources/Twitter";
import { Copy, Share2, X } from "lucide-react";
import { toast } from "sonner";
import { Dropdown } from "../dropdown";

/**
 * Props for the ShareButton component.
 *
 * @interface ShareButtonProps
 */
interface ShareButtonProps {
  /**
   * Use header variant with smaller size.
   * Header variant is optimized for navigation bars.
   *
   * @optional
   * @default false
   */
  isHeader?: boolean;
}

/**
 * Share button component with dropdown menu for sharing current page.
 *
 * Features:
 * - Copy current URL to clipboard
 * - Share on X (Twitter)
 * - Share on Facebook
 * - Toast notifications for copy success
 * - Two size variants (header and default)
 * - Icon-only button with dropdown menu
 *
 * The component automatically uses the current page URL (`window.location.href`)
 * for all sharing actions.
 *
 * @component
 * @example
 * ```tsx
 * // Default size for page content
 * <ShareButton />
 * ```
 *
 * @example
 * ```tsx
 * // Header variant for navigation bar
 * <ShareButton isHeader={true} />
 * ```
 *
 * @example
 * ```tsx
 * // In a transaction detail page header
 * <div className="flex items-center gap-2">
 *   <h1>Transaction Details</h1>
 *   <ShareButton isHeader={true} />
 * </div>
 * ```
 *
 * @example
 * ```tsx
 * // In a block detail page content
 * <div className="flex justify-between">
 *   <h2>Block Information</h2>
 *   <ShareButton />
 * </div>
 * ```
 *
 * @param {ShareButtonProps} props - Component props
 * @returns {JSX.Element} Share button with dropdown menu
 */
export const ShareButton = ({ isHeader = false }: ShareButtonProps) => {
  const options = [
    {
      label: (
        <div className='flex items-center gap-1'>
          <Copy size={15} />
          Copy URL
        </div>
      ),
      onClick: () => {
        navigator.clipboard.writeText(window.location.href);
        toast("Successfully copied", {
          action: {
            label: <X size={15} className='stroke-text' />,
            onClick: () => undefined,
          },
        });
      },
    },
    {
      label: (
        <div className='flex items-center gap-1'>
          <Twitter size={15} />
          Share on X
        </div>
      ),
      href: `https://x.com/intent/tweet?text=${window.location.href}`,
    },
    {
      label: (
        <div className='flex items-center gap-1'>
          <Facebook size={15} />
          Share on Facebook
        </div>
      ),
      href: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    },
  ];
  return (
    <Dropdown
      id='share'
      hideChevron
      closeOnSelect
      label={<Share2 size={isHeader ? 15 : 17} className='' />}
      disableHover
      options={options as any}
      triggerClassName={
        isHeader
          ? "!justify-center h-6 w-6 rounded-s border border-border bg-transparent hover:bg-darker"
          : "!justify-center h-10 w-10 rounded-s border border-border bg-transparent hover:bg-darker"
      }
      forceHorizontalPosition={isHeader ? "left" : undefined}
      wrapperClassname='z-0'
      width='200px'
    />
  );
};
