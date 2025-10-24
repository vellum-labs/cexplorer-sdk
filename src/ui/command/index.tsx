import { type DialogProps } from "@radix-ui/react-dialog";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "@/utils/cn";
import { Dialog, DialogContent } from "../dialog";

/**
 * Root command menu component for building accessible command palettes.
 *
 * This component provides a flexible foundation for creating searchable command menus,
 * keyboard-driven interfaces, and action palettes. It handles keyboard navigation,
 * filtering, and selection automatically.
 *
 * **Features:**
 * - Automatic keyboard navigation (arrow keys, enter, escape)
 * - Built-in fuzzy search filtering
 * - Accessible by default (ARIA attributes)
 * - Theme-aware styling
 * - Supports nested groups and items
 *
 * @component
 * @example
 * ```tsx
 * // Basic command menu
 * <Command>
 *   <CommandInput placeholder="Search..." />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem>Calendar</CommandItem>
 *       <CommandItem>Settings</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // With custom filtering
 * <Command filter={(value, search) => {
 *   if (value.includes(search)) return 1;
 *   return 0;
 * }}>
 *   <CommandInput />
 *   <CommandList>...</CommandList>
 * </Command>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Command menu container with full functionality
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-s bg-background text-text",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

/**
 * Props for the CommandDialog component
 *
 * Extends all Dialog props from Radix UI, including open state management.
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <CommandDialog open={open} onOpenChange={setOpen}>
 *   <CommandInput placeholder="Type a command..." />
 *   <CommandList>...</CommandList>
 * </CommandDialog>
 * ```
 */
interface CommandDialogProps extends DialogProps {}

/**
 * Command menu rendered inside a modal dialog.
 *
 * This component combines Command with Dialog to create a modal command palette,
 * commonly used for global search, keyboard shortcuts, or quick actions.
 * Perfect for implementing cmd+k style interfaces.
 *
 * **Common Use Cases:**
 * - Global search functionality (cmd+k / ctrl+k)
 * - Quick action palette
 * - Keyboard shortcut menu
 * - Navigation shortcuts
 * - Command palette for blockchain actions
 *
 * @component
 * @example
 * ```tsx
 * // Basic command dialog
 * const [open, setOpen] = useState(false);
 *
 * // Keyboard shortcut to open
 * useEffect(() => {
 *   const down = (e: KeyboardEvent) => {
 *     if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
 *       e.preventDefault();
 *       setOpen(true);
 *     }
 *   };
 *   document.addEventListener("keydown", down);
 *   return () => document.removeEventListener("keydown", down);
 * }, []);
 *
 * return (
 *   <CommandDialog open={open} onOpenChange={setOpen}>
 *     <CommandInput placeholder="Search transactions..." />
 *     <CommandList>
 *       <CommandEmpty>No results found.</CommandEmpty>
 *       <CommandGroup heading="Recent Transactions">
 *         <CommandItem>View transaction abc123</CommandItem>
 *         <CommandItem>View block 8234567</CommandItem>
 *       </CommandGroup>
 *       <CommandGroup heading="Quick Actions">
 *         <CommandItem>Search address</CommandItem>
 *         <CommandItem>View latest blocks</CommandItem>
 *       </CommandGroup>
 *     </CommandList>
 *   </CommandDialog>
 * );
 * ```
 *
 * @param {React.ReactNode} children - Command menu content (CommandInput, CommandList, etc.)
 * @param {boolean} [open] - Controls dialog open state
 * @param {(open: boolean) => void} [onOpenChange] - Callback when dialog state changes
 * @returns {JSX.Element} Command menu inside a modal dialog
 */
const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className='overflow-hidden p-0'>
        <Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500 dark:[&_[cmdk-group-heading]]:text-slate-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Search input for the command menu.
 *
 * This component provides a search field with a magnifying glass icon
 * that automatically filters command items as the user types.
 *
 * **Features:**
 * - Auto-focus on mount (in dialogs)
 * - Magnifying glass icon
 * - Real-time filtering
 * - Accessible placeholder text
 * - Theme-aware styling
 *
 * @component
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput placeholder="Search for transactions, blocks, addresses..." />
 *   <CommandList>...</CommandList>
 * </Command>
 *
 * // With custom styling
 * <CommandInput
 *   placeholder="Type a command..."
 *   className="border-b-2"
 * />
 * ```
 *
 * @param {string} [placeholder] - Placeholder text for the search input
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Search input with icon and filtering functionality
 */
const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className='flex items-center border-b px-1.5' cmdk-input-wrapper=''>
    <MagnifyingGlassIcon className='mr-1 h-4 w-4 shrink-0 opacity-50' />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-s bg-transparent py-1.5 text-text-sm outline-none placeholder:text-grayTextPrimary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

/**
 * Scrollable container for command groups and items.
 *
 * This component provides a scrollable list container for all command items and groups.
 * It handles overflow and displays filtered results.
 *
 * **Features:**
 * - Auto-scrolling to selected items
 * - Max height with overflow handling
 * - Smooth scrolling
 * - Keyboard navigation support
 *
 * @component
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput />
 *   <CommandList>
 *     <CommandEmpty>No results.</CommandEmpty>
 *     <CommandGroup heading="Actions">
 *       <CommandItem>Action 1</CommandItem>
 *       <CommandItem>Action 2</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // Custom max height
 * <CommandList className="max-h-[500px]">
 *   ...
 * </CommandList>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Command groups and items
 * @returns {JSX.Element} Scrollable list container
 */
const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

/**
 * Message displayed when no command items match the search query.
 *
 * This component shows a fallback message when the search filter
 * returns no results. It's automatically hidden when items are visible.
 *
 * @component
 * @example
 * ```tsx
 * <Command>
 *   <CommandInput />
 *   <CommandList>
 *     <CommandEmpty>No results found.</CommandEmpty>
 *     <CommandGroup>
 *       <CommandItem>Item 1</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 *
 * // Custom empty state
 * <CommandEmpty>
 *   <div className="text-center p-4">
 *     <p>No transactions found.</p>
 *     <p className="text-sm">Try a different search term.</p>
 *   </div>
 * </CommandEmpty>
 * ```
 *
 * @param {React.ReactNode} children - Empty state content
 * @returns {JSX.Element} Empty state message (hidden when items exist)
 */
const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className='py-3 text-center text-text-sm'
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

/**
 * Group container for organizing related command items.
 *
 * This component groups related command items together with an optional heading.
 * Groups help organize commands into logical categories.
 *
 * **Features:**
 * - Optional heading/label
 * - Automatic hiding when all items are filtered out
 * - Styled group heading
 * - Proper spacing between groups
 *
 * @component
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandGroup heading="Recent Transactions">
 *     <CommandItem>Transaction abc123</CommandItem>
 *     <CommandItem>Transaction def456</CommandItem>
 *   </CommandGroup>
 *
 *   <CommandGroup heading="Quick Actions">
 *     <CommandItem>Search Address</CommandItem>
 *     <CommandItem>View Latest Block</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 *
 * // Without heading
 * <CommandGroup>
 *   <CommandItem>Ungrouped Item</CommandItem>
 * </CommandGroup>
 * ```
 *
 * @param {string} [heading] - Optional heading for the group
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Command items in this group
 * @returns {JSX.Element} Group container with optional heading
 */
const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "[&_[cmdk-group-heading]]:text-xs overflow-hidden p-1/2 text-text [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

/**
 * Visual separator between command groups or items.
 *
 * This component renders a horizontal line to visually separate
 * different sections of the command menu.
 *
 * @component
 * @example
 * ```tsx
 * <CommandList>
 *   <CommandGroup heading="Recent">
 *     <CommandItem>Item 1</CommandItem>
 *   </CommandGroup>
 *
 *   <CommandSeparator />
 *
 *   <CommandGroup heading="Actions">
 *     <CommandItem>Action 1</CommandItem>
 *   </CommandGroup>
 * </CommandList>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @returns {JSX.Element} Horizontal separator line
 */
const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-slate-200 dark:bg-slate-800", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

/**
 * Individual selectable item in the command menu.
 *
 * This component represents a single action or option in the command menu.
 * It handles selection, keyboard navigation, hover states, and click events.
 *
 * **Features:**
 * - Keyboard navigation (arrow keys, enter)
 * - Hover and focus states
 * - Custom value for filtering
 * - Optional disabled state
 * - Optional hover disable (for non-interactive items)
 * - Click/select callbacks
 *
 * @component
 * @example
 * ```tsx
 * // Basic item
 * <CommandGroup>
 *   <CommandItem onSelect={() => console.log("Selected!")}>
 *     Search Transactions
 *   </CommandItem>
 * </CommandGroup>
 *
 * // With keyboard shortcut
 * <CommandItem onSelect={openSearch}>
 *   <span>Search</span>
 *   <CommandShortcut>⌘K</CommandShortcut>
 * </CommandItem>
 *
 * // With icon
 * <CommandItem>
 *   <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
 *   <span>Search Address</span>
 * </CommandItem>
 *
 * // Disabled item
 * <CommandItem disabled>
 *   Coming Soon
 * </CommandItem>
 *
 * // Custom filter value
 * <CommandItem value="search transactions tx blockchain">
 *   Search Transactions
 * </CommandItem>
 *
 * // Disable hover (for display-only items)
 * <CommandItem disableHover>
 *   Information only
 * </CommandItem>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [disableHover] - Disables hover background effect
 * @param {string} [value] - Custom value for search filtering
 * @param {boolean} [disabled] - Disables the item
 * @param {() => void} [onSelect] - Callback when item is selected
 * @param {React.ReactNode} children - Item content
 * @returns {JSX.Element} Selectable command item
 */
const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
    disableHover?: boolean;
  }
>(({ className, disableHover, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-xs px-1 py-1 text-text-sm outline-none",
      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      "data-[selected=true]:bg-darker data-[selected=true]:text-primary",
      "dark:data-[selected=true]:bg-slate-800 dark:data-[selected=true]:text-slate-50",
      disableHover
        ? "!data-[selected=true]:bg-transparent! !bg-transparent hover:bg-transparent"
        : "",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

/**
 * Keyboard shortcut indicator for command items.
 *
 * This component displays keyboard shortcuts aligned to the right of a command item.
 * Typically shows key combinations like "⌘K", "Ctrl+S", "Esc", etc.
 *
 * **Common Shortcuts:**
 * - macOS: ⌘ (cmd), ⌥ (option), ⇧ (shift), ⌃ (control)
 * - Windows/Linux: Ctrl, Alt, Shift
 * - Special: Enter, Esc, Tab, ↑ ↓ ← →
 *
 * @component
 * @example
 * ```tsx
 * // macOS style
 * <CommandItem>
 *   <span>Search</span>
 *   <CommandShortcut>⌘K</CommandShortcut>
 * </CommandItem>
 *
 * // Cross-platform
 * <CommandItem>
 *   <span>Save</span>
 *   <CommandShortcut>Ctrl+S</CommandShortcut>
 * </CommandItem>
 *
 * // Multiple shortcuts
 * <CommandItem>
 *   <span>Quick Search</span>
 *   <CommandShortcut>⌘K or Ctrl+K</CommandShortcut>
 * </CommandItem>
 *
 * // Arrow keys
 * <CommandItem>
 *   <span>Navigate</span>
 *   <CommandShortcut>↑↓</CommandShortcut>
 * </CommandItem>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Shortcut text (e.g., "⌘K", "Ctrl+S")
 * @returns {JSX.Element} Right-aligned shortcut indicator with muted styling
 */
const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-text-xs tracking-widest text-slate-500 dark:text-slate-400",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
