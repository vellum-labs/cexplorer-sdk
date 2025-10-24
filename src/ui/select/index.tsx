import { cn } from "@/utils/cn";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

import type { ReactNode } from "react";

/**
 * Select is the root component for a select dropdown.
 *
 * Built on top of Radix UI Select, this component provides an accessible
 * select menu with support for keyboard navigation and custom styling.
 *
 * **Common Use Cases:**
 * - Form selects
 * - Filters and sorting controls
 * - Settings dropdowns
 * - Language/currency selectors
 *
 * @component
 * @example
 * ```tsx
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="option1">Option 1</SelectItem>
 *     <SelectItem value="option2">Option 2</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
const Select = SelectPrimitive.Root;

/**
 * SelectGroup groups related select items together.
 *
 * Use this to organize select items into logical groups with optional labels.
 *
 * @component
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectLabel>Fruits</SelectLabel>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * SelectValue displays the selected value in the trigger.
 *
 * Shows the currently selected item's text or a placeholder when nothing is selected.
 *
 * @component
 * @example
 * ```tsx
 * <SelectTrigger>
 *   <SelectValue placeholder="Choose an option" />
 * </SelectTrigger>
 * ```
 */
const SelectValue = SelectPrimitive.Value;

/**
 * SelectTrigger is the button that opens the select dropdown.
 *
 * This component displays the current selection and triggers the dropdown menu
 * when clicked. Includes a caret icon that indicates the dropdown state.
 *
 * **Common Use Cases:**
 * - Form select buttons
 * - Filter dropdown triggers
 * - Custom styled select controls
 *
 * @component
 * @example
 * ```tsx
 * <SelectTrigger className="w-[200px]">
 *   <SelectValue placeholder="Select..." />
 * </SelectTrigger>
 *
 * // Custom content in trigger
 * <SelectTrigger>
 *   <div className="flex items-center gap-2">
 *     <Icon />
 *     <SelectValue />
 *   </div>
 * </SelectTrigger>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>} props - All props from Radix Select.Trigger
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Trigger content (usually SelectValue)
 * @returns {JSX.Element} Select trigger button with caret icon
 */
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-s border border-border bg-transparent px-1.5 py-1 text-text-sm shadow-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:ring-slate-300 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <CaretSortIcon className='h-4 w-4 opacity-50' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 * SelectScrollUpButton shows a button to scroll up in the select dropdown.
 *
 * Appears at the top of the dropdown when there are more items above the visible area.
 *
 * @component
 * @internal
 */
const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1/2",
      className,
    )}
    {...props}
  >
    <ChevronUpIcon />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

/**
 * SelectScrollDownButton shows a button to scroll down in the select dropdown.
 *
 * Appears at the bottom of the dropdown when there are more items below the visible area.
 *
 * @component
 * @internal
 */
const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1/2",
      className,
    )}
    {...props}
  >
    <ChevronDownIcon />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/**
 * SelectContent displays the dropdown panel with select options.
 *
 * This component contains the list of selectable items, rendered in a portal
 * for proper layering. Includes scroll buttons for long lists and supports
 * custom content at the start.
 *
 * **Common Use Cases:**
 * - Dropdown option lists
 * - Filterable select menus
 * - Grouped select options
 *
 * @component
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="1">Option 1</SelectItem>
 *   <SelectItem value="2">Option 2</SelectItem>
 * </SelectContent>
 *
 * // With groups
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectLabel>Group 1</SelectLabel>
 *     <SelectItem value="a">Item A</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 *
 * // With start content (e.g., search input)
 * <SelectContent startContent={<SearchInput />}>
 *   <SelectItem value="1">Option 1</SelectItem>
 * </SelectContent>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>} props - All props from Radix Select.Content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Select items and groups
 * @param {("popper" | "item-aligned")} [props.position="popper"] - Positioning strategy
 * @param {ReactNode} [props.startContent] - Optional content at the top (e.g., search)
 * @returns {JSX.Element} Dropdown panel with select options
 */
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    startContent?: ReactNode;
  }
>(
  (
    { className, children, position = "popper", startContent, ...props },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[90px] overflow-hidden rounded-s border border-border bg-background text-text shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        {startContent && startContent}
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1/2",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 * SelectLabel displays a label for a group of select items.
 *
 * Use within SelectGroup to label a group of related options.
 *
 * @component
 * @example
 * ```tsx
 * <SelectGroup>
 *   <SelectLabel>Fruits</SelectLabel>
 *   <SelectItem value="apple">Apple</SelectItem>
 *   <SelectItem value="banana">Banana</SelectItem>
 * </SelectGroup>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>} props - All props from Radix Select.Label
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Label for select group
 */
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-1 py-1 text-text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 * SelectItem represents a single selectable option in the select dropdown.
 *
 * This component displays an option with a checkmark indicator when selected.
 * Supports keyboard navigation and accessibility features.
 *
 * **Common Use Cases:**
 * - Individual select options
 * - List items in dropdowns
 * - Form select choices
 *
 * @component
 * @example
 * ```tsx
 * <SelectItem value="apple">Apple</SelectItem>
 * <SelectItem value="banana" disabled>Banana (Out of stock)</SelectItem>
 *
 * // With custom content
 * <SelectItem value="custom">
 *   <div className="flex items-center gap-2">
 *     <Icon />
 *     <span>Custom Option</span>
 *   </div>
 * </SelectItem>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>} props - All props from Radix Select.Item
 * @param {string} props.value - The value for this option
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Option display text/content
 * @param {boolean} [props.disabled] - Disable this option
 * @returns {JSX.Element} Selectable option with checkmark indicator
 */
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center justify-between rounded-xs py-1 pl-1 pr-4 text-text-sm outline-none focus:bg-darker data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className='absolute right-2 flex h-3.5 w-3.5 items-center justify-center'>
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className='h-4 w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

/**
 * SelectSeparator displays a horizontal line to separate groups of items.
 *
 * Use to visually separate different groups or sections in the select dropdown.
 *
 * @component
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="1">Option 1</SelectItem>
 *   <SelectSeparator />
 *   <SelectItem value="2">Option 2</SelectItem>
 * </SelectContent>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>} props - All props from Radix Select.Separator
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Horizontal separator line
 */
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1/2 h-px bg-slate-100 dark:bg-slate-800",
      className,
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
