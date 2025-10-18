import { cva } from "class-variance-authority";

/**
 * Button component style variants using class-variance-authority (CVA).
 *
 * This constant defines all visual variations for button components including
 * different variants (default, destructive, outline, etc.) and sizes (sm, default, lg).
 * Uses CVA to generate class names based on variant and size props.
 *
 * **Variants:**
 * - **default**: Standard filled button with dark background (primary action)
 * - **destructive**: Red button for dangerous/destructive actions (delete, remove, etc.)
 * - **outline**: Button with border and transparent background
 * - **secondary**: Gray filled button for secondary actions
 * - **ghost**: Transparent button with hover effect (minimal emphasis)
 * - **link**: Text-only button styled as underlined link
 *
 * **Sizes:**
 * - **sm**: Small button (h-8, compact padding)
 * - **default**: Standard button size (h-9, normal padding)
 * - **lg**: Large button (h-10, generous padding)
 * - **icon**: Square button optimized for icons only (h-9 w-9)
 *
 * **Features:**
 * - Full dark mode support with automatic theme switching
 * - Focus visible styles for accessibility (keyboard navigation)
 * - Disabled state with reduced opacity and no pointer events
 * - Smooth color transitions on hover
 * - Consistent spacing and alignment
 *
 * @example
 * ```tsx
 * import { buttonVariants } from "@/constants/button";
 *
 * // Use with Button component
 * <button className={buttonVariants({ variant: "default", size: "lg" })}>
 *   Click me
 * </button>
 *
 * // Destructive action button
 * <button className={buttonVariants({ variant: "destructive" })}>
 *   Delete
 * </button>
 *
 * // Icon button
 * <button className={buttonVariants({ size: "icon" })}>
 *   <IconComponent />
 * </button>
 *
 * // Ghost button for secondary actions
 * <button className={buttonVariants({ variant: "ghost", size: "sm" })}>
 *   Cancel
 * </button>
 * ```
 *
 * @constant
 * @type {Function} CVA function that returns className string based on variants
 * @see https://cva.style/docs for CVA documentation
 */
export const buttonVariants = cva(
  // Base styles applied to all button variants
  "inline-flex items-center justify-center whitespace-nowrap rounded-s text-text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300",
  {
    variants: {
      /**
       * Visual style variants for different button purposes
       */
      variant: {
        /** Standard filled button - primary actions */
        default:
          "bg-gray-900 text-gray-50 shadow hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
        /** Red button - destructive/dangerous actions (delete, remove) */
        destructive:
          "bg-red-500 text-gray-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
        /** Bordered button - secondary emphasis */
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        /** Gray filled button - secondary actions */
        secondary:
          "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
        /** Transparent button - minimal emphasis */
        ghost:
          "hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-100 dark:hover:text-gray-800",
        /** Text button styled as link */
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
      },
      /**
       * Size variants for different button dimensions
       */
      size: {
        /** Standard size (h-9, px-4 py-2) */
        default: "h-9 px-4 py-2",
        /** Small size (h-8, compact padding) */
        sm: "h-8 rounded-md px-3text-text-xs",
        /** Large size (h-10, generous padding) */
        lg: "h-10 rounded-md px-8",
        /** Square icon button (h-9 w-9) */
        icon: "h-9 w-9",
      },
    },
    /**
     * Default values when no variant/size specified
     */
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
