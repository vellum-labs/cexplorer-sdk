import type { FC } from "react";
import { Button } from "@/ui/button";
import { Modal } from "@/ui/modal";

/**
 * Props for the SafetyLinkModal component
 */
export interface SafetyLinkModalProps {
  /**
   * External URL that the user is attempting to visit
   * Displayed in the modal to show users where they will be redirected
   *
   * @example "https://example.com/external-link"
   * @example "https://pool-operator-website.io/about"
   */
  url: string;

  /**
   * Callback function triggered when the modal should close
   * Called when user clicks "Go back" button or closes the modal
   *
   * @example
   * <SafetyLinkModal
   *   url="https://example.com"
   *   onClose={() => setShowModal(false)}
   * />
   */
  onClose: () => void;
}

/**
 * SafetyLinkModal displays a safety warning before redirecting users to external URLs.
 *
 * This modal appears when users click on external links (e.g., stake pool websites,
 * social media links, or other unmoderated URLs). It shows the full URL that will be
 * visited and provides two options: go back to cancel, or proceed to visit the external site.
 * The link opens in a new tab with proper security attributes (noopener, noreferrer, nofollow).
 *
 * **Security Features:**
 * - Opens links in new tab (`target="_blank"`)
 * - Prevents access to window.opener (`rel="noopener"`)
 * - Prevents referrer information leakage (`rel="noreferrer"`)
 * - Prevents search engine link following (`rel="nofollow"`)
 * - Displays full URL for user verification
 *
 * **Common Use Cases:**
 * - Warning before visiting stake pool operator websites
 * - Confirming external social media links (Twitter, Discord, Telegram)
 * - Protecting users from unmoderated external URLs
 * - Displaying project websites or documentation links
 * - Preventing phishing by showing full URL
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * const [showWarning, setShowWarning] = useState(false);
 * const [externalUrl, setExternalUrl] = useState("");
 *
 * const handleExternalLink = (url: string) => {
 *   setExternalUrl(url);
 *   setShowWarning(true);
 * };
 *
 * {showWarning && (
 *   <SafetyLinkModal
 *     url={externalUrl}
 *     onClose={() => setShowWarning(false)}
 *   />
 * )}
 *
 * // With stake pool website
 * <SafetyLinkModal
 *   url="https://mystakepool.io"
 *   onClose={() => setShowModal(false)}
 * />
 *
 * // With social media link
 * <SafetyLinkModal
 *   url="https://twitter.com/cardano_pool"
 *   onClose={handleClose}
 * />
 * ```
 *
 * @param {SafetyLinkModalProps} props - Component props
 * @param {string} props.url - External URL to visit
 * @param {() => void} props.onClose - Callback when modal should close
 * @returns {JSX.Element} A modal dialog with external link safety warning
 */
export const SafetyLinkModal: FC<SafetyLinkModalProps> = ({ url, onClose }) => {
  return (
    <Modal
      minHeight='auto'
      minWidth='400px'
      maxWidth='600px'
      maxHeight='80vh'
      onClose={onClose}
    >
      <p className='mt-2 font-medium'>
        You are switching to an external, unmoderated url:{" "}
      </p>
      <p className='overflow-wrap-anywhere mb-2 mt-1 max-h-32 max-w-full overflow-y-auto break-all text-text-sm'>
        {url}
      </p>
      <div className='flex justify-between gap-1'>
        <Button onClick={onClose} variant='red' size='md' label='Go back' />
        <a
          onClick={onClose}
          href={url}
          target='_blank'
          rel='noreferrer noopener nofollow'
          className='box-border flex min-w-fit max-w-fit items-center justify-center rounded-[8px] border-2 border-darkBlue bg-darkBlue px-2 py-1 text-text-sm font-medium text-white duration-150 hover:scale-[101%] hover:text-white active:scale-[98%] disabled:cursor-not-allowed disabled:opacity-50'
        >
          Visit
        </a>
      </div>
    </Modal>
  );
};
