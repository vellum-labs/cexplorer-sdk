import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

/**
 * NavigationMenu is the root container for a navigation menu system.
 *
 * Built on top of Radix UI Navigation Menu, this component provides an accessible
 * navigation menu with support for nested menus, keyboard navigation, and hover interactions.
 *
 * **Common Use Cases:**
 * - Main site navigation
 * - Header navigation menus
 * - Dropdown navigation systems
 * - Multi-level navigation structures
 * - Mega menus with rich content
 *
 * @component
 * @example
 * ```tsx
 * // Basic navigation menu
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *       <NavigationMenuContent>
 *         <div>Product links...</div>
 *       </NavigationMenuContent>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 *
 * // Navigation with links
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>
 *       <NavigationMenuLink href="/about">About</NavigationMenuLink>
 *     </NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>} props - All props from Radix NavigationMenu.Root
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - NavigationMenuList and other menu components
 * @returns {JSX.Element} Root navigation menu container
 */
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

/**
 * NavigationMenuList contains the list of navigation menu items.
 *
 * This component wraps all NavigationMenuItem components and manages the layout
 * and spacing of menu items in a horizontal list.
 *
 * **Common Use Cases:**
 * - Container for menu items
 * - Horizontal navigation bars
 * - Menu item grouping
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>...</NavigationMenuItem>
 *     <NavigationMenuItem>...</NavigationMenuItem>
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>} props - All props from Radix NavigationMenu.List
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} List container for navigation menu items
 */
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "flex flex-1 list-none items-center justify-center space-x-1",
      className,
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

/**
 * NavigationMenuItem represents a single item in the navigation menu.
 *
 * This is a wrapper around Radix UI's NavigationMenu.Item component.
 * Each item can contain a trigger, content, or link.
 *
 * **Common Use Cases:**
 * - Individual menu items with dropdowns
 * - Simple navigation links
 * - Menu item with sub-navigation
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
 *   <NavigationMenuContent>...</NavigationMenuContent>
 * </NavigationMenuItem>
 * ```
 */
const NavigationMenuItem = NavigationMenuPrimitive.Item;

/**
 * Shared CSS classes for navigation menu trigger buttons.
 *
 * Uses class-variance-authority (cva) to define consistent styling
 * for all navigation menu triggers.
 *
 * @constant
 */
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 items-center justify-center px-2 py-1 text-text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
);

/**
 * NavigationMenuTrigger is the button that opens a navigation menu dropdown.
 *
 * This component triggers the display of NavigationMenuContent when clicked or hovered.
 * Includes an animated chevron icon that rotates when the menu is open.
 *
 * **Common Use Cases:**
 * - Dropdown menu triggers
 * - Navigation items with sub-menus
 * - Clickable/hoverable menu buttons
 *
 * @component
 * @example
 * ```tsx
 * // With dropdown content
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Products</NavigationMenuTrigger>
 *   <NavigationMenuContent>
 *     <div>Product list...</div>
 *   </NavigationMenuContent>
 * </NavigationMenuItem>
 *
 * // Without chevron icon
 * <NavigationMenuTrigger hideChevron>
 *   Menu
 * </NavigationMenuTrigger>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>} props - All props from Radix NavigationMenu.Trigger
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Trigger button content
 * @param {boolean} [props.hideChevron] - Hide the chevron down icon
 * @returns {JSX.Element} Navigation menu trigger button with optional chevron
 */
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(
  (
    {
      className,
      children,
      //@ts-expect-error hideChevron is not a valid prop
      hideChevron,
      ...props
    },
    ref,
  ) => (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}
      {""}

      {!hideChevron && (
        <ChevronDown
          strokeWidth={2.5}
          className='relative top-[1px] ml-1/2 h-4 w-4 transition-transform group-data-[state=open]:rotate-180'
          aria-hidden='true'
        />
      )}
    </NavigationMenuPrimitive.Trigger>
  ),
);
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

/**
 * NavigationMenuContent displays the dropdown content for a navigation menu item.
 *
 * This component appears when its associated NavigationMenuTrigger is activated.
 * Positioned absolutely below the trigger with right alignment.
 *
 * **Common Use Cases:**
 * - Dropdown menu panels
 * - Sub-navigation lists
 * - Mega menu content
 * - Rich navigation content (links, descriptions, images)
 *
 * @component
 * @example
 * ```tsx
 * // Simple dropdown
 * <NavigationMenuItem>
 *   <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
 *   <NavigationMenuContent>
 *     <ul className="p-4">
 *       <li><a href="/link1">Link 1</a></li>
 *       <li><a href="/link2">Link 2</a></li>
 *     </ul>
 *   </NavigationMenuContent>
 * </NavigationMenuItem>
 *
 * // Rich content mega menu
 * <NavigationMenuContent>
 *   <div className="grid grid-cols-3 gap-4 p-6">
 *     <div>Column 1</div>
 *     <div>Column 2</div>
 *     <div>Column 3</div>
 *   </div>
 * </NavigationMenuContent>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>} props - All props from Radix NavigationMenu.Content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} props.children - Dropdown content
 * @returns {JSX.Element} Positioned dropdown content container
 */
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn("absolute right-0 top-[calc(100%+3px)] z-10", className)}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

/**
 * NavigationMenuLink is a wrapper for navigation links within the menu.
 *
 * This is a wrapper around Radix UI's NavigationMenu.Link component.
 * Use this for simple navigation items that are just links without dropdown content.
 *
 * **Common Use Cases:**
 * - Simple navigation links
 * - Direct page navigation
 * - External links in navigation
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenuItem>
 *   <NavigationMenuLink href="/about">
 *     About Us
 *   </NavigationMenuLink>
 * </NavigationMenuItem>
 *
 * <NavigationMenuItem>
 *   <NavigationMenuLink href="/contact" className="custom-class">
 *     Contact
 *   </NavigationMenuLink>
 * </NavigationMenuItem>
 * ```
 */
const NavigationMenuLink = NavigationMenuPrimitive.Link;

/**
 * NavigationMenuIndicator shows a visual indicator for the active menu item.
 *
 * This component displays a small diamond-shaped indicator below the active
 * navigation item. Automatically positions itself based on the active item.
 *
 * **Common Use Cases:**
 * - Visual feedback for active menu
 * - Highlighting current navigation item
 * - Animated menu state indicator
 *
 * @component
 * @example
 * ```tsx
 * <NavigationMenu>
 *   <NavigationMenuList>
 *     <NavigationMenuItem>...</NavigationMenuItem>
 *     <NavigationMenuIndicator />
 *   </NavigationMenuList>
 * </NavigationMenu>
 * ```
 *
 * @param {React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>} props - All props from Radix NavigationMenu.Indicator
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Visual indicator for active menu item
 */
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full flex h-1.5 items-end justify-center overflow-hidden",
      className,
    )}
    {...props}
  >
    <div className='relative top-[60%] h-2 w-2 rotate-45 bg-slate-200 shadow-md dark:bg-slate-800' />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
};
