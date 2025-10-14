import type { ReactNode } from "react";

import type { FileRoutesByPath } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

/**
 * Props for the Button component.
 *
 * @interface Props
 */
type Props = {
  /**
   * Size of the button, controlling padding and font size.
   *
   * @example "xs" // Extra small
   * @example "sm" // Small
   * @example "md" // Medium
   * @example "lg" // Large
   * @example "xl" // Extra large
   */
  size: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * Visual style variant of the button.
   *
   * @example "primary" // Dark blue background
   * @example "secondary" // Secondary color background
   * @example "tertiary" // Card background with border
   * @example "purple" // Purple gradient
   * @example "red" // Red background
   * @example "discord" // Discord blue color
   */
  variant: "primary" | "secondary" | "tertiary" | "purple" | "red" | "discord";
  /**
   * Text or content to display in the button.
   *
   * @optional
   * @example "Click me"
   * @example <>Submit Transaction</>
   */
  label?: ReactNode;
  /**
   * Internal route path for navigation. When provided, button renders as a Link.
   *
   * @optional
   * @example "/transaction/$hash"
   * @example "/pool/$id"
   */
  href?: FileRoutesByPath[keyof FileRoutesByPath]["path"];
  /**
   * Open link in a new tab when href is provided.
   *
   * @optional
   * @default false
   */
  targetBlank?: boolean;
  /**
   * Icon to display on the right side of the label.
   *
   * @optional
   * @example <ArrowRight size={16} />
   */
  rightIcon?: React.ReactNode;
  /**
   * Icon to display on the left side of the label.
   *
   * @optional
   * @example <Search size={16} />
   */
  leftIcon?: React.ReactNode;
  /**
   * Additional CSS classes to apply to the button.
   *
   * @optional
   * @example "w-full mt-4"
   */
  className?: string;
  /**
   * Disable the button interaction and apply disabled styling.
   *
   * @optional
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback function called when button is clicked.
   *
   * @optional
   * @example () => handleSubmit()
   */
  onClick?: () => void;
};

/**
 * Button component with multiple size and variant options, supporting both button and link modes.
 *
 * Features:
 * - 5 size options (xs, sm, md, lg, xl)
 * - 6 visual variants (primary, secondary, tertiary, purple, red, discord)
 * - Support for left and right icons
 * - Automatic Link rendering when href is provided
 * - Disabled state with visual feedback
 * - Hover and active state animations
 * - Type-safe routing with TanStack Router
 *
 * @component
 * @example
 * ```tsx
 * // Basic button
 * <Button
 *   size="md"
 *   variant="primary"
 *   label="View Transaction"
 *   onClick={() => console.log("Clicked")}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Link button with icon
 * <Button
 *   size="lg"
 *   variant="secondary"
 *   label="Explore Pool"
 *   href="/pool/$id"
 *   rightIcon={<ArrowRight size={16} />}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Icon-only button
 * <Button
 *   size="sm"
 *   variant="tertiary"
 *   leftIcon={<Search size={16} />}
 *   onClick={handleSearch}
 * />
 * ```
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered button or link component
 */
export const Button = ({
  size,
  variant,
  label,
  href,
  rightIcon,
  leftIcon,
  targetBlank,
  className,
  disabled,
  onClick,
}: Props) => {
  const sizeClasses = {
    xs: "py-1/2 px-1/2 text-[12px]",
    sm: "py-1 px-1.5 text-[13px]",
    md: "py-1 px-2 text-text-sm",
    lg: "py-1 px-2 text-text-md",
    xl: "py-1.5 px-3 text-text-lg",
  };

  const variantClasses = {
    primary: "bg-darkBlue text-white border-2 border-darkBlue hover:text-white",
    secondary:
      "bg-secondaryBg text-secondaryText border-2 border-secondaryText hover:text-secondaryText",
    tertiary: "bg-cardBg border border-border",
    purple:
      "bg-gradient-to-b hover:text-white from-purple-500 to-purple-700 text-white",
    red: "bg-redText text-white",
    discord: "bg-[#677DC9] text-white",
  };

  const commonClasses =
    "flex box-border max-w-fit justify-center min-w-fit items-center rounded-[8px] font-medium duration-150 hover:scale-[101%] active:scale-[98%] disabled:cursor-not-allowed disabled:opacity-50";

  if (href)
    return (
      <Link
        to={href}
        target={targetBlank ? "_blank" : "_self"}
        className={`${commonClasses} ${disabled && "cursor-not-allowed opacity-50"} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled}
      >
        <span className={`${leftIcon && label && "-ml-1 mr-1"}`}>
          {leftIcon}
        </span>
        {label && <span>{label}</span>}
        <span className={`${rightIcon && "ml-1"}`}>{rightIcon}</span>
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className={`${commonClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
    >
      <span className={`${leftIcon && label && "-ml-1 mr-1"}`}>{leftIcon}</span>
      {label && <span>{label}</span>}
      {rightIcon && (
        <span className={`${rightIcon && "ml-1"}`}>{rightIcon}</span>
      )}
    </button>
  );
};
