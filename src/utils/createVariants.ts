import { cn } from "./cn";

/**
 * Configuration object for creating component variants
 */
export interface VariantConfig<V extends Record<string, Record<string, string>>> {
  /** Variant definitions mapping variant names to their possible values and corresponding classes */
  variants: V;
  /** Default values for variants */
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>;
}

/**
 * Props type for variant functions, allowing selection of variants plus custom className
 */
export type VariantProps<V extends Record<string, Record<string, string>>> =
  Partial<{ [K in keyof V]: keyof V[K] }> & { className?: string };

/**
 * Creates a variant function for styling components with different visual variants.
 * Similar to class-variance-authority but lightweight and dependency-free.
 *
 * @template V - The variants record type
 * @param base - Base CSS classes that are always applied
 * @param config - Configuration object containing variants and default values
 * @returns A function that takes variant props and returns combined class names
 *
 * @example
 * ```tsx
 * const buttonVariants = createVariants("btn rounded", {
 *   variants: {
 *     variant: {
 *       primary: "bg-blue-500 text-white",
 *       secondary: "bg-gray-500 text-white",
 *     },
 *     size: {
 *       sm: "px-3 py-1 text-sm",
 *       md: "px-4 py-2 text-base",
 *       lg: "px-6 py-3 text-lg",
 *     }
 *   },
 *   defaultVariants: {
 *     variant: "primary",
 *     size: "md"
 *   }
 * });
 *
 * // Usage:
 * buttonVariants({ variant: "secondary", size: "lg" })
 * // Returns: "btn rounded bg-gray-500 text-white px-6 py-3 text-lg"
 * ```
 */
export const createVariants = <V extends Record<string, Record<string, string>>>(
  base: string,
  config: VariantConfig<V>
) => {
  return (props?: VariantProps<V>) => {
    const classes = [base];

    for (const key in config.variants) {
      const variantKey = key as keyof V;
      const value = props?.[variantKey] ?? config.defaultVariants?.[variantKey];

      if (value && config.variants[variantKey][value as keyof V[keyof V]]) {
        classes.push(config.variants[variantKey][value as keyof V[keyof V]]);
      }
    }

    if (props?.className) {
      classes.push(props.className);
    }

    return cn(...classes);
  };
};
