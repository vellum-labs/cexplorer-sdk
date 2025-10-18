import { X } from "lucide-react";
import { type FC, useEffect, useRef } from "react";

/**
 * Props for the Modal component
 */
export interface ModalProps {
  /**
   * Callback function triggered when the modal should close
   * Called when clicking backdrop, close button, or pressing Escape
   *
   * @example
   * <Modal onClose={() => setIsOpen(false)}>...</Modal>
   */
  onClose: () => void;

  /**
   * Content to be displayed inside the modal
   *
   * @example
   * <Modal onClose={handleClose}>
   *   <h2>Modal Title</h2>
   *   <p>Modal content goes here</p>
   * </Modal>
   */
  children: React.ReactNode;

  /**
   * Minimum width of the modal
   *
   * @default "95%"
   * @example
   * <Modal minWidth="300px" onClose={handleClose}>...</Modal>
   */
  minWidth?: string;

  /**
   * Maximum width of the modal
   *
   * @default "400px"
   * @example
   * <Modal maxWidth="800px" onClose={handleClose}>...</Modal>
   */
  maxWidth?: string;

  /**
   * Minimum height of the modal
   *
   * @example
   * <Modal minHeight="200px" onClose={handleClose}>...</Modal>
   */
  minHeight?: string;

  /**
   * Maximum height of the modal
   *
   * @example
   * <Modal maxHeight="90vh" onClose={handleClose}>...</Modal>
   */
  maxHeight?: string;

  /**
   * Whether to hide the close (X) button in the top-right corner
   *
   * @default false
   * @example
   * <Modal hideClose={true} onClose={handleClose}>...</Modal>
   */
  hideClose?: boolean;

  /**
   * Additional CSS classes to apply to the modal container
   *
   * @example
   * <Modal className="shadow-xl" onClose={handleClose}>...</Modal>
   */
  className?: string;
}

/**
 * Modal is an overlay dialog component that appears above page content.
 *
 * This component creates a centered dialog box with a backdrop overlay. It includes
 * built-in accessibility features like keyboard navigation (Escape to close, Tab trapping),
 * focus management, and ARIA attributes. The modal prevents body scrolling while open
 * and can be closed by clicking the backdrop, close button, or pressing Escape.
 *
 * **Features:**
 * - Backdrop overlay with blur effect
 * - Keyboard navigation support (Escape to close, Tab trapping)
 * - Auto-focus management
 * - Body scroll lock when modal is open
 * - Customizable dimensions (min/max width and height)
 * - Optional close button
 * - Accessible (ARIA attributes, role="dialog")
 *
 * **Common Use Cases:**
 * - Display confirmation dialogs
 * - Show detailed information or forms
 * - Present transaction details in blockchain explorers
 * - Display wallet connection interfaces
 * - Show settings or preferences panels
 *
 * @component
 * @example
 * ```tsx
 * // Basic modal
 * const [isOpen, setIsOpen] = useState(false);
 *
 * {isOpen && (
 *   <Modal onClose={() => setIsOpen(false)}>
 *     <h2>Modal Title</h2>
 *     <p>Modal content</p>
 *   </Modal>
 * )}
 *
 * // Custom size modal
 * <Modal
 *   onClose={handleClose}
 *   maxWidth="800px"
 *   minHeight="400px"
 * >
 *   <div>Large modal content</div>
 * </Modal>
 *
 * // Modal without close button
 * <Modal
 *   onClose={handleClose}
 *   hideClose={true}
 * >
 *   <div>Must use custom close logic</div>
 * </Modal>
 * ```
 *
 * @param {ModalProps} props - Component props
 * @param {() => void} props.onClose - Callback when modal should close
 * @param {React.ReactNode} props.children - Content displayed inside the modal
 * @param {string} [props.minWidth="95%"] - Minimum width of the modal
 * @param {string} [props.maxWidth="400px"] - Maximum width of the modal
 * @param {string} [props.minHeight] - Minimum height of the modal
 * @param {string} [props.maxHeight] - Maximum height of the modal
 * @param {boolean} [props.hideClose=false] - Whether to hide the close button
 * @param {string} [props.className] - Additional CSS classes for the modal container
 * @returns {JSX.Element} An accessible modal dialog with backdrop overlay
 */
export const Modal: FC<ModalProps> = ({
  onClose,
  children,
  minHeight,
  minWidth,
  maxHeight,
  maxWidth,
  hideClose,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "Tab" && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    const controller = new AbortController();
    const signal = controller.signal;

    document.addEventListener("keydown", handleKeyDown, { signal });
    return () => {
      controller.abort();
    };
  }, [onClose]);

  return (
    <>
      <div
        onClick={onClose}
        className='fixed inset-0 z-[51] h-full w-full backdrop-blur-[1px]'
        aria-hidden='true'
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />
      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        ref={modalRef}
        tabIndex={-1}
        style={{
          width: minWidth || "95%",
          height: minHeight,
          maxWidth: maxWidth || "400px",
          maxHeight: maxHeight,
        }}
        className={`thin-scrollbar fixed left-1/2 top-1/2 z-[52] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-l bg-background p-1 md:p-3 ${className ? className : ""}`}
        onClick={e => e.stopPropagation()}
      >
        {!hideClose && (
          <button
            aria-label='Close dialog'
            onClick={onClose}
            className='absolute right-3 top-3 cursor-pointer md:right-5 md:top-5'
          >
            <X aria-hidden='true' />
          </button>
        )}

        <div id='modal-title'>{children}</div>
      </div>
    </>
  );
};
