import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { lazy, Suspense } from "react";

/**
 * Props for the Icon component
 * Extends all Lucide icon props except ref
 */
export interface IconProps extends Omit<LucideProps, "ref"> {
  /**
   * Name of the Lucide icon to render
   * @see https://lucide.dev/icons for available icon names
   * @example
   * <Icon name="check" />
   * <Icon name="arrow-right" />
   * <Icon name="copy" />
   */
  name: keyof typeof dynamicIconImports;
}

/**
 * Icon component for rendering Lucide icons with dynamic imports.
 *
 * This component dynamically loads icons from the lucide-react library on demand,
 * reducing initial bundle size. Icons are lazy-loaded and cached after first use.
 * Supports all Lucide icon props including size, color, strokeWidth, etc.
 *
 * **Features:**
 * - Dynamic icon loading (code splitting)
 * - Suspense with fallback for loading state
 * - Full TypeScript support with icon name autocomplete
 * - All Lucide icon props supported (size, color, strokeWidth, etc.)
 * - 1000+ icons available from Lucide library
 *
 * **Common Use Cases:**
 * - UI buttons and actions
 * - Navigation menus
 * - Status indicators
 * - Data visualization
 * - Blockchain-specific icons (wallet, transaction, etc.)
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Icon name="check" />
 *
 * // With size and color
 * <Icon name="arrow-right" size={24} color="#0094d4" />
 *
 * // Custom stroke width
 * <Icon name="copy" strokeWidth={1.5} />
 *
 * // With className for styling
 * <Icon name="wallet" className="text-primary" />
 *
 * // In a button
 * <button>
 *   <Icon name="download" size={16} />
 *   Download
 * </button>
 *
 * // Blockchain examples
 * <Icon name="wallet" />      // Wallet icon
 * <Icon name="coins" />       // ADA icon
 * <Icon name="layers" />      // Blockchain layers
 * <Icon name="database" />    // Blockchain data
 * ```
 *
 * @param {IconProps} props - Component props
 * @param {string} props.name - Icon name from Lucide library
 * @param {number} [props.size=24] - Icon size in pixels
 * @param {string} [props.color] - Icon color (CSS color value)
 * @param {number} [props.strokeWidth=2] - Stroke width for icon lines
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} A dynamically loaded Lucide icon with Suspense fallback
 */
export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  const fallback = (
    <div
      className={props.className}
      style={{
        background: "transparent",
        width: props.size || 20,
        height: props.size || 20,
      }}
    />
  );

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};
