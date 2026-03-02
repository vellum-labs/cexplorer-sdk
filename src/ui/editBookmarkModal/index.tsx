import { useState } from "react";
import { Button } from "../button";
import { Modal } from "../modal";
import { TextInput } from "../textInput";

/**
 * Props for the EditBookmarkModal component.
 *
 * @interface EditBookmarkModalProps
 */
export interface EditBookmarkModalProps {
  /**
   * Callback function when modal should close.
   */
  onClose: () => void;

  /**
   * Callback function when bookmark is updated.
   * Receives the new name entered by the user.
   *
   * @param newName - The new personal name/tag for the bookmark
   */
  onSave: (newName: string) => void;

  /**
   * Current name of the bookmark.
   * Displayed in a disabled input field.
   */
  currentName: string;

  /**
   * Modal title text.
   * @default "Edit bookmark"
   */
  title?: string;

  /**
   * Modal description text.
   * @default "Change the name of your bookmark."
   */
  description?: string;

  /**
   * Label for the current name field.
   * @default "Current name"
   */
  currentNameLabel?: string;

  /**
   * Label for the new name input field.
   * @default "New name"
   */
  newNameLabel?: string;

  /**
   * Placeholder for the new name input field.
   * @default "Enter a new name"
   */
  newNamePlaceholder?: string;

  /**
   * Cancel button label.
   * @default "Cancel"
   */
  cancelLabel?: string;

  /**
   * Save button label.
   * @default "Edit bookmark"
   */
  saveLabel?: string;
}

/**
 * Modal for editing an existing bookmark.
 *
 * Displays the current bookmark name in a disabled field and provides
 * an input for entering a new name. The save button is disabled until
 * a new name is entered.
 *
 * @component
 * @example
 * ```tsx
 * <EditBookmarkModal
 *   currentName="Binance Address"
 *   onClose={() => setIsOpen(false)}
 *   onSave={(newName) => {
 *     updateBookmark(bookmarkId, newName);
 *     setIsOpen(false);
 *   }}
 * />
 * ```
 *
 * @param {EditBookmarkModalProps} props - Component props
 * @returns {JSX.Element} Edit bookmark modal
 */
export const EditBookmarkModal = ({
  onClose,
  onSave,
  currentName,
  title = "Edit bookmark",
  description = "Change the name of your bookmark.",
  currentNameLabel = "Current name",
  newNameLabel = "New name",
  newNamePlaceholder = "Enter a new name",
  cancelLabel = "Cancel",
  saveLabel = "Edit bookmark",
}: EditBookmarkModalProps) => {
  const [newName, setNewName] = useState(currentName);

  const handleSave = () => {
    if (newName.trim() && newName.trim() !== currentName) {
      onSave(newName.trim());
    }
  };

  return (
    <Modal onClose={onClose} maxWidth='450px'>
      <div className='flex flex-col gap-4 p-1 md:p-2'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-text-lg font-semibold text-text'>{title}</h2>
          <p className='text-text-sm text-text-muted'>{description}</p>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-text-sm font-medium text-text'>
            {currentNameLabel}
          </label>
          <TextInput
            value={currentName}
            onchange={() => {}}
            placeholder=''
            disabled
            wrapperClassName='w-full'
          />
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='text-text-sm font-medium text-text'>
            {newNameLabel} <span className='text-redText'>*</span>
          </label>
          <TextInput
            value={newName}
            onchange={(value) => {
              if (value.length <= 50) {
                setNewName(value);
              }
            }}
            placeholder={newNamePlaceholder}
            wrapperClassName='w-full'
            maxLength={50}
          />
          <span className='text-text-xs text-text-muted'>
            {newName.length}/50
          </span>
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
            variant='primary'
            label={saveLabel}
            onClick={handleSave}
            disabled={!newName.trim() || newName.trim() === currentName}
          />
        </div>
      </div>
    </Modal>
  );
};
