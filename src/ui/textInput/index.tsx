import type { DOMAttributes, ReactNode } from "react";

import { Search, X } from "lucide-react";
import { Input } from "./Input";

/**
 * Props for the TextInput component.
 *
 * @interface Props
 */
type Props = {
  /**
   * Placeholder text shown when input is empty.
   *
   * @example "Search blocks, transactions..."
   */
  placeholder: string;
  /**
   * Additional CSS classes for the wrapper div.
   * @deprecated Use wrapperClassName instead
   *
   * @optional
   */
  className?: string;
  /**
   * Current value of the input.
   *
   * @example "addr1q..."
   */
  value: string;
  /**
   * Show search icon on the left side of the input.
   *
   * @optional
   * @default false
   */
  showSearchIcon?: boolean;
  /**
   * Custom React node to display before the input field.
   * Useful for dropdowns or additional controls.
   *
   * @optional
   * @example <GlobalSearchDropdown />
   */
  prefixContent?: ReactNode;
  /**
   * Additional CSS classes for the input element itself.
   *
   * @optional
   * @example "font-bold text-lg"
   */
  inputClassName?: string;
  /**
   * Additional CSS classes for the wrapper element.
   *
   * @optional
   * @example "mb-4 w-full"
   */
  wrapperClassName?: string;
  /**
   * HTML input type attribute.
   *
   * @optional
   * @default "text"
   * @example "email"
   * @example "search"
   */
  options?: React.HTMLInputTypeAttribute;
  /**
   * Callback function called when input value changes.
   *
   * @param value - New input value
   * @example (value) => setSearchQuery(value)
   */
  onchange: (value: string) => void;
  /**
   * Callback function for keyboard events.
   *
   * @optional
   * @example (e) => { if (e.key === 'Enter') handleSearch() }
   */
  onKeyDown?: DOMAttributes<HTMLInputElement>["onKeyDown"];
  /**
   * Callback function when input receives focus.
   *
   * @optional
   * @example () => setIsFocused(true)
   */
  onFocus?: DOMAttributes<HTMLInputElement>["onFocus"];
  /**
   * Callback function when input loses focus.
   *
   * @optional
   * @example () => setIsFocused(false)
   */
  onBlur?: DOMAttributes<HTMLInputElement>["onBlur"];
};

/**
 * Text input component with optional search icon and clear button.
 *
 * Features:
 * - Optional search icon on the left
 * - Automatic clear button (X) when input has value
 * - Support for prefix content (e.g., dropdown filters)
 * - Keyboard event handling
 * - Focus/blur callbacks
 * - Disabled state support
 *
 * @component
 * @example
 * ```tsx
 * // Basic search input
 * <TextInput
 *   value={searchQuery}
 *   onchange={setSearchQuery}
 *   placeholder="Search addresses..."
 *   showSearchIcon={true}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With prefix dropdown
 * <TextInput
 *   value={query}
 *   onchange={setQuery}
 *   placeholder="Search..."
 *   prefixContent={<CategoryDropdown />}
 * />
 * ```
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered text input component
 */
export const TextInput = ({
  placeholder,
  value,
  onchange,
  inputClassName,
  wrapperClassName,
  prefixContent,
  showSearchIcon,
  onKeyDown,
  onFocus,
  onBlur,
  disabled,
  ...rest
}: Props & React.ComponentProps<"input">) => {
  return (
    <div className={`relative flex items-center ${wrapperClassName}`}>
      {prefixContent && prefixContent}
      {showSearchIcon && (
        <Search
          size={20}
          className={`absolute left-3`}
          color='var(--grayTextPrimary)'
        />
      )}
      <Input
        value={value}
        onchange={onchange}
        placeholder={placeholder}
        className={`${showSearchIcon && "pl-5"} ${value && !disabled && "pr-4"} bg-cardBg text-text-sm ${inputClassName}`}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        {...rest}
      />
      {value && !disabled && (
        <button className='absolute right-2' onClick={() => onchange("")}>
          <X size={20} color='var(--grayTextPrimary)' />
        </button>
      )}
    </div>
  );
};
