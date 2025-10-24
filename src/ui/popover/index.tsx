import { cn } from "@/utils/cn";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

/**
 * Root component for Popover. Manages the open/closed state of the popover.
 *
 * This component provides context for all child popover components and handles the popover state.
 * Use this as a wrapper around PopoverTrigger and PopoverContent.
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Click me</PopoverTrigger>
 *   <PopoverContent>Popover content here</PopoverContent>
 * </Popover>
 * ```
 */
const Popover = PopoverPrimitive.Root;

/**
 * Trigger button that opens the popover when clicked.
 *
 * This component wraps the element that will trigger the popover to open.
 * It handles click events and accessibility attributes automatically.
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <button>Open</button>
 *   </PopoverTrigger>
 *   <PopoverContent>Content</PopoverContent>
 * </Popover>
 * ```
 */
const PopoverTrigger = PopoverPrimitive.Trigger;

/**
 * Anchor element for positioning the popover relative to a specific element.
 *
 * Use this when you want to position the popover relative to an element
 * other than the trigger.
 *
 * @component
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverAnchor asChild>
 *     <div>Anchor element</div>
 *   </PopoverAnchor>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>Content</PopoverContent>
 * </Popover>
 * ```
 */
const PopoverAnchor = PopoverPrimitive.Anchor;

/**
 * Content container for the popover with styling and animations.
 *
 * This component renders the actual popover content with smooth fade and zoom animations.
 * It automatically positions itself relative to the trigger or anchor element.
 *
 * **Features:**
 * - Automatic positioning with collision detection
 * - Smooth fade-in/fade-out animations
 * - Zoom-in/zoom-out effects
 * - Slide animations based on position
 * - Theme-aware styling with border and shadow
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Popover>
 *   <PopoverTrigger>Click me</PopoverTrigger>
 *   <PopoverContent>
 *     <p>This is popover content</p>
 *   </PopoverContent>
 * </Popover>
 *
 * // With custom alignment
 * <PopoverContent align="start" sideOffset={10}>
 *   <p>Aligned to start with offset</p>
 * </PopoverContent>
 *
 * // With custom styling
 * <PopoverContent className="w-96">
 *   <div>Custom width content</div>
 * </PopoverContent>
 * ```
 *
 * @param {string} [className] - Additional CSS classes to apply
 * @param {"center" | "start" | "end"} [align="center"] - Alignment of the popover relative to the trigger
 * @param {number} [sideOffset=4] - Distance in pixels from the trigger element
 * @returns {JSX.Element} Styled popover content with animations
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-s border border-border p-2 text-slate-950 shadow-md outline-none",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
