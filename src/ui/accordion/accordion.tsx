import { cn } from "@/utils/cn";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

/**
 * Accordion is the root component for creating collapsible content sections.
 *
 * A wrapper around Radix UI Accordion that provides the foundation for expandable/collapsible
 * content panels. Supports both single and multiple item expansion modes.
 *
 * **Common Use Cases:**
 * - FAQs and help sections
 * - Settings panels
 * - Nested navigation menus
 * - Expandable data tables
 * - Content organization
 *
 * @component
 * @example
 * ```tsx
 * // Single item open at a time
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 *
 * // Multiple items can be open
 * <Accordion type="multiple">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>Content 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
const Accordion = AccordionPrimitive.Root;

/**
 * AccordionItem represents a single collapsible section within an Accordion.
 *
 * A container for a single accordion section that holds both the trigger and content.
 * Each item must have a unique `value` prop for identification.
 *
 * @component
 * @example
 * ```tsx
 * <AccordionItem value="item-1">
 *   <AccordionTrigger>Click to expand</AccordionTrigger>
 *   <AccordionContent>Hidden content</AccordionContent>
 * </AccordionItem>
 *
 * // With custom className
 * <AccordionItem value="item-2" className="border-b border-border">
 *   <AccordionTrigger>Custom styled item</AccordionTrigger>
 *   <AccordionContent>Content here</AccordionContent>
 * </AccordionItem>
 * ```
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

/**
 * AccordionTrigger is the clickable header that toggles accordion content visibility.
 *
 * A button-like component that expands/collapses the associated content. Features an
 * animated chevron icon that rotates on state change and hover underline effect.
 *
 * @component
 * @example
 * ```tsx
 * // Basic trigger
 * <AccordionTrigger>Click to expand</AccordionTrigger>
 *
 * // With icon or custom content
 * <AccordionTrigger>
 *   <Icon name="info" />
 *   Section Title
 * </AccordionTrigger>
 *
 * // Custom styling
 * <AccordionTrigger className="text-lg font-bold">
 *   Important Section
 * </AccordionTrigger>
 * ```
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className='flex'>
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center gap-1.5 py-1 text-text-sm font-medium transition-all hover:underline [&[data-state=open]>svg:last-of-type]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className='ml-auto h-4 w-4 shrink-0 transition-transform duration-150' />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * AccordionContent holds the expandable/collapsible content of an accordion item.
 *
 * A container for the content that appears when an accordion item is expanded.
 * Features smooth slide-down and slide-up animations controlled by data attributes.
 *
 * @component
 * @example
 * ```tsx
 * // Simple text content
 * <AccordionContent>
 *   This is the hidden content that appears when expanded.
 * </AccordionContent>
 *
 * // Rich content with components
 * <AccordionContent>
 *   <p>Detailed information here</p>
 *   <Button>Action</Button>
 * </AccordionContent>
 *
 * // Custom padding and styling
 * <AccordionContent className="pb-4 pl-6">
 *   Indented content with bottom padding
 * </AccordionContent>
 * ```
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className='overflow-hidden text-text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    {...props}
  >
    <div className={cn("pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
