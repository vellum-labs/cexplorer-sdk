import * as React from "react";

import { cn } from "@/utils/cn";

/**
 * Props for the Input component
 * Extends standard HTML input attributes
 */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Callback function called when input value changes
   *
   * @param value - The new input value
   * @example
   * <Input onchange={(val) => console.log(val)} />
   */
  onchange: (value: string) => void;
}

/**
 * Input component with custom styling and change handler.
 *
 * A styled input field with theme-aware design, border, and focus states.
 * Automatically stops event propagation on change to prevent unintended bubbling.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Input
 *   value={searchTerm}
 *   onchange={setSearchTerm}
 *   placeholder="Search..."
 * />
 *
 * // With custom className
 * <Input
 *   value={value}
 *   onchange={setValue}
 *   className="w-64"
 *   type="email"
 * />
 *
 * // With ref
 * const inputRef = useRef<HTMLInputElement>(null);
 * <Input
 *   ref={inputRef}
 *   value={value}
 *   onchange={setValue}
 * />
 * ```
 *
 * @param {InputProps} props - Component props
 * @param {string} props.value - Current input value
 * @param {function} props.onchange - Change handler function
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.type] - Input type (text, email, password, etc.)
 * @returns {JSX.Element} Styled input element
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, onchange, ...props }, ref) => {
    return (
      <input
        onChange={e => {
          onchange(e.target.value);
          e.stopPropagation();
        }}
        value={value}
        type={type}
        className={cn(
          `flex h-[40px] w-full rounded-s border border-border bg-transparent px-1.5 py-1/2 text-[16px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-text disabled:cursor-not-allowed disabled:opacity-50 md:text-text-sm dark:placeholder:text-slate-400`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";
