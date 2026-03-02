import { useState } from "react";
import { Button } from "../button";
import { Modal } from "../modal";
import { TextInput } from "../textInput";

/**
 * Props for the AddBookmarkModal component.
 *
 * @interface AddBookmarkModalProps
 */
export interface AddBookmarkModalProps {
  /**
   * Callback function when modal should close.
   */
  onClose: () => void;

  /**
   * Callback function when bookmark is saved.
   * Receives the personal name entered by the user.
   *
   * @param name - The personal name/tag for the bookmark
   */
  onSave: (name: string) => void;

  /**
   * Modal title text.
   * @default "Add bookmark"
   */
  title?: string;

  /**
   * Modal description text.
   * @default "Save this page to your bookmarks for quick access."
   */
  description?: string;

  /**
   * Label for the name input field.
   * @default "Personal name"
   */
  nameLabel?: string;

  /**
   * Placeholder for the name input field.
   * @default "Enter a name for this bookmark"
   */
  namePlaceholder?: string;

  /**
   * Cancel button label.
   * @default "Cancel"
   */
  cancelLabel?: string;

  /**
   * Save button label.
   * @default "Save bookmark"
   */
  saveLabel?: string;
}

/**
 * Modal for adding a new bookmark.
 *
 * Displays a form with a text input for entering a personal name/tag
 * for the bookmark. The save button is disabled until a name is entered.
 *
 * @component
 * @example
 * ```tsx
 * <AddBookmarkModal
 *   onClose={() => setIsOpen(false)}
 *   onSave={(name) => {
 *     saveToLocalStorage({ title: pageTitle, url: window.location.href, name });
 *     setIsOpen(false);
 *   }}
 * />
 * ```
 *
 * @param {AddBookmarkModalProps} props - Component props
 * @returns {JSX.Element} Add bookmark modal
 */
export const AddBookmarkModal = ({
  onClose,
  onSave,
  title = "Add bookmark",
  description = "Save this page to your bookmarks for quick access.",
  nameLabel = "Personal name",
  namePlaceholder = "Enter a name for this bookmark",
  cancelLabel = "Cancel",
  saveLabel = "Save bookmark",
}: AddBookmarkModalProps) => {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
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
            {nameLabel} <span className='text-redText'>*</span>
          </label>
          <TextInput
            value={name}
            onchange={(value) => {
              if (value.length <= 50) {
                setName(value);
              }
            }}
            placeholder={namePlaceholder}
            wrapperClassName='w-full'
            maxLength={50}
          />
          <span className='text-text-xs text-text-muted'>
            {name.length}/50
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
            disabled={!name.trim()}
          />
        </div>
      </div>
    </Modal>
  );
};
