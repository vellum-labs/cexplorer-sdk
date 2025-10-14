import type { DOMAttributes, ReactNode } from "react";

import { Search, X } from "lucide-react";
import { Input } from "./Input";

type Props = {
  placeholder: string;
  className?: string;
  value: string;
  showSearchIcon?: boolean;
  prefixContent?: ReactNode;
  inputClassName?: string;
  wrapperClassName?: string;
  options?: React.HTMLInputTypeAttribute;
  onchange: (value: string) => void;
  onKeyDown?: DOMAttributes<HTMLInputElement>["onKeyDown"];
  onFocus?: DOMAttributes<HTMLInputElement>["onFocus"];
  onBlur?: DOMAttributes<HTMLInputElement>["onBlur"];
};

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
