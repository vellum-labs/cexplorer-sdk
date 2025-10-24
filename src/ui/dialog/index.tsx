import { cn } from "@/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";

/**
 * Root component for Dialog. Manages the open/closed state of the dialog modal.
 *
 * This component provides context for all child dialog components and handles the modal state.
 * Use this as a wrapper around DialogTrigger and DialogContent.
 *
 * @component
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open Dialog</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *     </DialogHeader>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
const Dialog = DialogPrimitive.Root;

/**
 * Trigger button that opens the dialog when clicked.
 *
 * This component wraps the element that will trigger the dialog to open.
 * It handles click events and accessibility attributes automatically.
 *
 * @component
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <button>Open Modal</button>
 *   </DialogTrigger>
 *   <DialogContent>Content here</DialogContent>
 * </Dialog>
 * ```
 */
const DialogTrigger = DialogPrimitive.Trigger;

/**
 * Portal component that renders dialog content in a different part of the DOM.
 *
 * This component is used internally by DialogContent to render the modal
 * at the end of the document body, ensuring proper stacking context.
 *
 * @component
 * @example
 * ```tsx
 * <DialogPortal>
 *   <DialogOverlay />
 *   <DialogPrimitive.Content>...</DialogPrimitive.Content>
 * </DialogPortal>
 * ```
 */
const DialogPortal = DialogPrimitive.Portal;

/**
 * Close button component for dismissing the dialog.
 *
 * This component can be used anywhere inside the dialog to provide
 * a custom close button or action.
 *
 * @component
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogClose asChild>
 *     <button>Cancel</button>
 *   </DialogClose>
 * </DialogContent>
 * ```
 */
const DialogClose = DialogPrimitive.Close;

/**
 * Overlay background for the dialog modal.
 *
 * This component renders a semi-transparent backdrop behind the dialog content.
 * It includes fade-in/fade-out animations and is used internally by DialogContent.
 *
 * @component
 * @example
 * ```tsx
 * <DialogPortal>
 *   <DialogOverlay />
 *   <DialogContent>...</DialogContent>
 * </DialogPortal>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Styled overlay background with fade animations
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * Main content container for the dialog modal.
 *
 * This component renders the dialog content with animations, overlay, and a close button.
 * It's centered on the screen with smooth fade, zoom, and slide animations.
 *
 * **Features:**
 * - Centered modal positioning
 * - Smooth fade-in/fade-out animations
 * - Zoom and slide effects
 * - Built-in close button (X icon in top-right)
 * - Theme-aware styling with border and shadow
 * - Responsive design with mobile support
 *
 * @component
 * @example
 * ```tsx
 * // Basic dialog
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description here</DialogDescription>
 *     </DialogHeader>
 *     <div>Dialog content</div>
 *     <DialogFooter>
 *       <button>Save</button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 *
 * // Custom width
 * <DialogContent className="max-w-2xl">
 *   <p>Wide dialog content</p>
 * </DialogContent>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Content to display inside the dialog
 * @returns {JSX.Element} Styled dialog modal with overlay and close button
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "sm:rounded-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-2 border border-slate-200 bg-white p-3 shadow-lg duration-200 dark:border-slate-800 dark:bg-slate-950",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className='absolute right-4 top-4 rounded-xs opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400'>
        <Cross2Icon className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * Header container for dialog title and description.
 *
 * This component provides consistent spacing and layout for the dialog header section.
 * Typically contains DialogTitle and DialogDescription components.
 *
 * @component
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Delete Account</DialogTitle>
 *     <DialogDescription>
 *       This action cannot be undone. This will permanently delete your account.
 *     </DialogDescription>
 *   </DialogHeader>
 * </DialogContent>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Header container with proper spacing
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

/**
 * Footer container for dialog actions and buttons.
 *
 * This component provides consistent spacing and layout for dialog footer section.
 * Typically contains action buttons like Cancel, Save, Delete, etc.
 * On mobile, buttons stack vertically; on desktop, they align horizontally to the right.
 *
 * @component
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Confirm Action</DialogTitle>
 *   </DialogHeader>
 *   <DialogFooter>
 *     <DialogClose asChild>
 *       <button>Cancel</button>
 *     </DialogClose>
 *     <button>Confirm</button>
 *   </DialogFooter>
 * </DialogContent>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Footer container with responsive button layout
 */
const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

/**
 * Title component for the dialog.
 *
 * This component renders the main heading of the dialog with proper styling and accessibility.
 * It's automatically linked to the dialog for screen readers.
 *
 * @component
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Delete Transaction</DialogTitle>
 *     <DialogDescription>
 *       Are you sure you want to delete this transaction?
 *     </DialogDescription>
 *   </DialogHeader>
 * </DialogContent>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Title text or content
 * @returns {JSX.Element} Styled dialog title with accessibility attributes
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * Description component for the dialog.
 *
 * This component renders additional descriptive text below the dialog title.
 * It provides context and details about the dialog's purpose or action.
 * It's automatically linked to the dialog for screen readers.
 *
 * @component
 * @example
 * ```tsx
 * <DialogContent>
 *   <DialogHeader>
 *     <DialogTitle>Confirm Delegation</DialogTitle>
 *     <DialogDescription>
 *       You are about to delegate 1000 ADA to pool [POOL123].
 *       This action will take effect in the next epoch.
 *     </DialogDescription>
 *   </DialogHeader>
 * </DialogContent>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Description text or content
 * @returns {JSX.Element} Styled dialog description with muted text color
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
