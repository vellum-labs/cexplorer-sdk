import { Trash2 } from "lucide-react";
import { Button } from "../button";
import { Modal } from "../modal";
import { TextInput } from "../textInput";

/**
 * Props for the RemoveBookmarkModal component.
 *
 * @interface RemoveBookmarkModalProps
 */
export interface RemoveBookmarkModalProps {
  /**
   * Callback function when modal should close.
   */
  onClose: () => void;

  /**
   * Callback function when bookmark removal is confirmed.
   */
  onRemove: () => void;

  /**
   * Name of the bookmark to be removed.
   * Displayed in a disabled input field.
   */
  bookmarkName: string;

  /**
   * Modal title text.
   * @default "Remove bookmark"
   */
  title?: string;

  /**
   * Modal description text.
   * @default "Remove page from your bookmarks."
   */
  description?: string;

  /**
   * Label for the name field.
   * @default "Personal name"
   */
  nameLabel?: string;

  /**
   * Cancel button label.
   * @default "Cancel"
   */
  cancelLabel?: string;

  /**
   * Remove button label.
   * @default "Remove bookmark"
   */
  removeLabel?: string;
}

/**
 * Modal for confirming bookmark removal.
 *
 * Displays the bookmark name in a disabled field and provides
 * cancel and remove buttons. The remove button is styled in red
 * with a trash icon to indicate a destructive action.
 *
 * @component
 * @example
 * ```tsx
 * <RemoveBookmarkModal
 *   bookmarkName="Binance Address"
 *   onClose={() => setIsOpen(false)}
 *   onRemove={() => {
 *     removeFromLocalStorage(bookmarkId);
 *     setIsOpen(false);
 *   }}
 * />
 * ```
 *
 * @param {RemoveBookmarkModalProps} props - Component props
 * @returns {JSX.Element} Remove bookmark modal
 */
export const RemoveBookmarkModal = ({
  onClose,
  onRemove,
  bookmarkName,
  title = "Remove bookmark",
  description = "Remove page from your bookmarks.",
  nameLabel = "Personal name",
  cancelLabel = "Cancel",
  removeLabel = "Remove bookmark",
}: RemoveBookmarkModalProps) => {
  return (
    <Modal onClose={onClose} maxWidth='450px'>
      <div className='flex flex-col gap-4 p-1 md:p-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-text-lg font-semibold text-text'>{title}</h2>
          <p className='text-text-sm text-text-muted'>{description}</p>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-text-sm font-medium text-text'>
            {nameLabel}
          </label>
          <TextInput
            value={bookmarkName}
            onchange={() => {}}
            placeholder=''
            disabled
            wrapperClassName='w-full'
          />
        </div>

        <div className='flex justify-end gap-2 pt-2'>
          <Button
            size='md'
            variant='tertiary'
            label={cancelLabel}
            onClick={onClose}
          />
          <Button
            size='md'
            variant='red'
            label={removeLabel}
            rightIcon={<Trash2 size={14} />}
            onClick={onRemove}
          />
        </div>
      </div>
    </Modal>
  );
};
