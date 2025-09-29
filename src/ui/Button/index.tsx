import type { ReactNode, ButtonHTMLAttributes } from "react";

/**
 * Available button sizes
 */
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Available button visual variants
 */
export type ButtonVariant = "primary" | "secondary" | "tertiary" | "purple" | "red" | "discord";

/**
 * Props for the Button component
 */
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Button size affecting padding and text size */
  size: ButtonSize;
  /** Visual variant determining colors and styling */
  variant: ButtonVariant;
  /** Button text or content */
  label?: ReactNode;
  /** Icon displayed to the right of the label */
  rightIcon?: ReactNode;
  /** Icon displayed to the left of the label */
  leftIcon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler function */
  onClick?: () => void;
};

/**
 * A flexible button component with multiple sizes and variants.
 * Supports icons, custom styling, and all standard button HTML attributes.
 *
 * @param props - Button component props
 * @returns JSX element representing the button
 *
 * @example
 * ```tsx
 * // Basic button
 * <Button size="md" variant="primary" label="Click me" />
 *
 * // Button with icons
 * <Button
 *   size="lg"
 *   variant="secondary"
 *   label="Save"
 *   leftIcon={<SaveIcon />}
 *   rightIcon={<ArrowIcon />}
 * />
 *
 * // Disabled button with custom styling
 * <Button
 *   size="sm"
 *   variant="tertiary"
 *   label="Disabled"
 *   disabled
 *   className="my-custom-class"
 * />
 * ```
 */
export const Button = ({
  size,
  variant,
  label,
  rightIcon,
  leftIcon,
  className = "",
  disabled,
  onClick,
  ...restProps
}: ButtonProps) => {
  const sizeClasses = {
    xs: "py-1 px-1 text-[12px]",
    sm: "py-2 px-3 text-[13px]",
    md: "py-2 px-4 text-sm",
    lg: "py-2 px-4 text-md",
    xl: "py-3 px-5 text-lg",
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



  return (
    <button
      onClick={onClick}
      className={`${commonClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...restProps}
    >
      {leftIcon && (
        <span className={leftIcon && label ? "-ml-1 mr-2" : ""}>
          {leftIcon}
        </span>
      )}
      {label && <span>{label}</span>}
      {rightIcon && (
        <span className="ml-2">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

