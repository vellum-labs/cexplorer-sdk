import { useState } from "react";
import { AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/ui/button";

/**
 * Props for the SensitiveContentWarning component
 */
export interface SensitiveContentWarningProps {
  /**
   * Callback function called when user clicks the Display button.
   * This should trigger showing the sensitive/user-generated content.
   *
   * @example
   * <SensitiveContentWarning onDisplay={() => setShowContent(true)} />
   */
  onDisplay: () => void;

  /**
   * Optional localStorage key for remembering user preference.
   * If not provided, defaults to "showSensitiveContent".
   *
   * @default "showSensitiveContent"
   * @example
   * <SensitiveContentWarning
   *   onDisplay={() => setShowContent(true)}
   *   localStorageKey="showUserGeneratedContent"
   * />
   */
  localStorageKey?: string;

  /**
   * Optional custom title text.
   *
   * @default "User-generated content"
   * @example
   * <SensitiveContentWarning
   *   onDisplay={() => setShowContent(true)}
   *   title="Sensitive Content Warning"
   * />
   */
  title?: string;

  /**
   * Optional custom description text.
   *
   * @default "Following content is user-generated and unmoderated by the Cexplorer team."
   * @example
   * <SensitiveContentWarning
   *   onDisplay={() => setShowContent(true)}
   *   description="This content may contain sensitive information."
   * />
   */
  description?: string;

  /**
   * Label for the "Remember this setting" checkbox
   * @default "Remember this setting"
   */
  rememberLabel?: string;

  /**
   * Label for the Display button
   * @default "Display"
   */
  displayLabel?: string;
}

/**
 * SensitiveContentWarning displays a warning message before showing user-generated or sensitive content.
 *
 * This component acts as a content gate, warning users about potentially sensitive or unmoderated
 * content. Users can choose to display the content immediately or check "Remember this setting"
 * to automatically show similar content in the future via localStorage.
 *
 * **Key Features:**
 * - Warning icon with clear messaging about content type
 * - "Remember this setting" checkbox for localStorage persistence
 * - "Display" button with eye icon to reveal content
 * - Customizable title, description, and localStorage key
 * - Follows GDPR-friendly approach by requiring explicit user consent
 *
 * **localStorage Behavior:**
 * - When checkbox is checked and user clicks Display, preference is saved to localStorage
 * - Parent component should check localStorage on mount to skip showing this warning
 * - Uses localStorage key "showSensitiveContent" by default (customizable via props)
 *
 * **Common Use Cases:**
 * - Warn before showing user-generated blockchain metadata
 * - Gate access to unmoderated community content
 * - Display warning for potentially sensitive transaction memos
 * - Show notice before displaying external/untrusted data
 * - Content moderation in NFT metadata display
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with state management
 * const [showContent, setShowContent] = useState(() => {
 *   return localStorage.getItem("showSensitiveContent") === "true";
 * });
 *
 * if (!showContent) {
 *   return <SensitiveContentWarning onDisplay={() => setShowContent(true)} />;
 * }
 *
 * return <div>{sensitiveContent}</div>;
 * ```
 *
 * @example
 * ```tsx
 * // With custom text and localStorage key
 * <SensitiveContentWarning
 *   onDisplay={() => setShowContent(true)}
 *   localStorageKey="showNFTMetadata"
 *   title="NFT Metadata Warning"
 *   description="This NFT contains user-uploaded metadata that may not be verified."
 * />
 * ```
 *
 * @example
 * ```tsx
 * // In a transaction detail view
 * const TransactionMemo = ({ memo }: { memo: string }) => {
 *   const [showMemo, setShowMemo] = useState(() => {
 *     return localStorage.getItem("showTransactionMemos") === "true";
 *   });
 *
 *   if (!showMemo) {
 *     return (
 *       <SensitiveContentWarning
 *         onDisplay={() => setShowMemo(true)}
 *         localStorageKey="showTransactionMemos"
 *         title="Transaction Memo"
 *         description="This transaction contains a user-generated memo."
 *       />
 *     );
 *   }
 *
 *   return <p className="text-text-sm">{memo}</p>;
 * };
 * ```
 *
 * @param {SensitiveContentWarningProps} props - Component props
 * @param {() => void} props.onDisplay - Callback when Display button is clicked
 * @param {string} [props.localStorageKey="showSensitiveContent"] - localStorage key for user preference
 * @param {string} [props.title="User-generated content"] - Warning title text
 * @param {string} [props.description] - Warning description text
 * @returns {JSX.Element} A centered warning component with icon, text, checkbox, and display button
 */
export const SensitiveContentWarning = ({
  onDisplay,
  localStorageKey = "showSensitiveContent",
  title = "User-generated content",
  description = "Following content is user-generated and unmoderated by the Cexplorer team.",
  rememberLabel = "Remember this setting",
  displayLabel = "Display",
}: SensitiveContentWarningProps) => {
  const [rememberChoice, setRememberChoice] = useState(false);

  const handleDisplay = () => {
    if (rememberChoice) {
      localStorage.setItem(localStorageKey, "true");
    }
    onDisplay();
  };

  return (
    <div className='my-4 flex w-full flex-col items-center gap-2 rounded-xl border border-border py-2 text-center'>
      <div className='rounded-s border border-orange-300 bg-orange-50 p-1.5 dark:border-orange-700 dark:bg-orange-950'>
        <AlertTriangle
          size={20}
          className='text-orange-600 dark:text-orange-400'
        />
      </div>

      <h3 className='text-text-lg font-semibold text-text'>{title}</h3>

      <p className='text-text-muted max-w-md text-text-sm'>{description}</p>

      <label className='flex cursor-pointer items-center gap-2 text-text-sm text-text'>
        <input
          type='checkbox'
          checked={rememberChoice}
          onChange={e => setRememberChoice(e.target.checked)}
          className='rounded h-4 w-4 cursor-pointer border-border bg-background accent-darkBlue'
        />
        {rememberLabel}
      </label>

      <Button
        size='md'
        variant='primary'
        label={displayLabel}
        leftIcon={<Eye size={16} />}
        onClick={handleDisplay}
      />
    </div>
  );
};
