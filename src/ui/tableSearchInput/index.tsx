import { formatString } from "@/utils/format";
import { Search, X } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "@/ui/tableSearchInput/components/input";

/**
 * Prefix configuration for search input filtering
 */
interface Prefix {
  /** Unique key identifier for the prefix */
  key: string;
  /** Display name for the prefix */
  name: string;
  /** Whether to show this prefix in dropdown */
  show: boolean;
}

/**
 * Props for the TableSearchInput component
 */
export type TableSearchInputProps = {
  /**
   * Placeholder text for the input
   * @example "Search transactions..."
   */
  placeholder: string;

  /** Additional CSS classes for the component */
  className?: string;

  /**
   * Current input value
   * @example "addr1qxyz..."
   */
  value: string;

  /**
   * Callback when input value changes
   * @param value - New input value
   */
  onchange: (value: string) => void;

  /**
   * Show search icon when input is empty
   * @default false
   */
  showSearchIcon?: boolean;

  /** CSS classes for the input element */
  inputClassName?: string;

  /** CSS classes for the wrapper div */
  wrapperClassName?: string;

  /**
   * Available prefix options for filtering
   * @example [{ key: "addr", name: "Address", show: true }]
   */
  prefixes?: Prefix[];

  /**
   * Currently active search prefix
   * @example "addr"
   */
  searchPrefix?: string;

  /**
   * Callback to set the active prefix
   * @param prefix - Prefix key to activate
   */
  setSearchPrefix?: (prefix: string) => void;

  /** Input type attribute */
  options?: React.HTMLInputTypeAttribute;

  /**
   * Show prefix suggestion popup
   * @default true
   */
  showPrefixPopup?: boolean;

  /**
   * Stretch prefix to full input height
   * @default false
   */
  stretchPrefix?: boolean;

  /** CSS classes for the prefix element */
  prefixClassname?: string;
};

/**
 * TableSearchInput provides an enhanced search input with prefix filtering and suggestions.
 *
 * A powerful search input component with support for prefix-based filtering (e.g., "addr:", "tx:").
 * Displays a dropdown of available prefixes when focused, automatically detects prefix usage,
 * and shows clear/search icons based on input state.
 *
 * **Common Use Cases:**
 * - Blockchain explorer search (addresses, transactions, blocks)
 * - Table filtering with type-specific searches
 * - Advanced search with categorized filters
 * - Multi-type entity searches
 *
 * @component
 * @example
 * ```tsx
 * // Basic search input
 * <TableSearchInput
 *   placeholder="Search..."
 *   value={search}
 *   onchange={setSearch}
 *   showSearchIcon={true}
 * />
 *
 * // With prefix filtering
 * const [search, setSearch] = useState("");
 * const [prefix, setPrefix] = useState("");
 * <TableSearchInput
 *   placeholder="Search transactions, addresses..."
 *   value={search}
 *   onchange={setSearch}
 *   searchPrefix={prefix}
 *   setSearchPrefix={setPrefix}
 *   prefixes={[
 *     { key: "addr", name: "Address", show: true },
 *     { key: "tx", name: "Transaction", show: true },
 *     { key: "block", name: "Block", show: true }
 *   ]}
 * />
 *
 * // With stretched prefix
 * <TableSearchInput
 *   placeholder="Search..."
 *   value={search}
 *   onchange={setSearch}
 *   searchPrefix="addr"
 *   stretchPrefix={true}
 * />
 * ```
 *
 * @param {TableSearchInputProps} props - Component props
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Current input value
 * @param {function} props.onchange - Change handler
 * @param {Prefix[]} [props.prefixes] - Available prefix options
 * @param {string} [props.searchPrefix] - Active search prefix
 * @param {function} [props.setSearchPrefix] - Prefix setter
 * @param {boolean} [props.showSearchIcon=false] - Show search icon when empty
 * @param {boolean} [props.showPrefixPopup=true] - Show prefix dropdown
 * @param {boolean} [props.stretchPrefix=false] - Stretch prefix to full height
 * @returns {JSX.Element} Enhanced search input with prefix support
 */
export const TableSearchInput = ({
  placeholder,
  value,
  onchange,
  inputClassName,
  wrapperClassName,
  searchPrefix,
  setSearchPrefix,
  showSearchIcon,
  prefixes,
  showPrefixPopup = true,
  stretchPrefix = false,
  prefixClassname,
}: TableSearchInputProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefixRef = useRef<HTMLSpanElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const [showPrefixes, setShowPrefixes] = useState(false);
  const activePrefix = prefixes?.find(
    prefix =>
      value.startsWith(`${prefix.name}:`) || value.startsWith(`${prefix.key}:`),
  );

  const hasPrefix = prefixes?.some(prefix =>
    value.startsWith(`${prefix.name}:`),
  );
  const [afterPrefixValue, setAfterPrefixValue] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    setShowPrefixes(false);
    if (event.key === "Backspace") {
      if (searchPrefix && (!value || value === `${searchPrefix}:`)) {
        onchange("");

        if (setSearchPrefix) {
          setSearchPrefix("");
        }
      }
    }

    if (!searchPrefix) {
      setShowPrefixes(true);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (activePrefix && setSearchPrefix && searchPrefix !== activePrefix.key) {
      setSearchPrefix(activePrefix.key);
    }
  }, [activePrefix, setSearchPrefix, searchPrefix]);

  useLayoutEffect(() => {
    if (value && searchPrefix && activePrefix) {
      setAfterPrefixValue(value.slice(value.indexOf(":") + 1));
    } else setAfterPrefixValue(value);
  }, [value, searchPrefix, activePrefix]);

  useLayoutEffect(() => {
    if (inputRef.current) {
      setDropdownWidth(inputRef.current.offsetWidth);
      setDropdownHeight(inputRef.current.offsetHeight);
    }
  }, [inputRef.current?.offsetWidth]);

  return (
    <div
      ref={wrapperRef}
      className={`relative flex items-center ${wrapperClassName}`}
    >
      {searchPrefix && (
        <span
          ref={prefixRef}
          className={`absolute bg-darker p-1/2 text-text-sm font-medium ${stretchPrefix ? "flex h-full items-center pl-2" : "left-3"} ${prefixClassname ? prefixClassname : ""}`}
        >
          {searchPrefix}
          {stretchPrefix ? "" : ":"}
        </span>
      )}
      <Input
        ref={inputRef}
        value={afterPrefixValue}
        onchange={onchange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        style={
          searchPrefix
            ? {
                paddingLeft: (prefixRef.current?.offsetWidth || 0) + 15 + "px",
              }
            : {}
        }
        className={`relative h-10 pr-4 ${hasPrefix && ""} ${inputClassName}`}
        onFocus={() => {
          !searchPrefix && setShowPrefixes(true);
        }}
        onClick={() => {
          !searchPrefix && setShowPrefixes(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowPrefixes(false);
          }, 150);
        }}
      />
      {value || searchPrefix ? (
        <button
          className='absolute right-2'
          onClick={() => {
            onchange("");
            if (setSearchPrefix) {
              setSearchPrefix("");
            }
          }}
        >
          <X size={20} style={{ color: "var(--grayTextPrimary)" }} />
        </button>
      ) : showSearchIcon ? (
        <Search
          size={20}
          style={{ color: "var(--grayTextPrimary)" }}
          className='absolute right-2'
        />
      ) : (
        <></>
      )}
      {showPrefixes &&
        showPrefixPopup &&
        (prefixes?.filter(prefix => prefix.show).length ?? 0) > 0 && (
          <div
            style={{
              width: dropdownWidth + "px",
              top: dropdownHeight + 1 + "px",
            }}
            className={`absolute right-0 z-30 min-h-[36px] rounded-s border border-border bg-background`}
          >
            {prefixes
              ?.filter(prefix => prefix.show)
              .map((prefix, index) => (
                <button
                  key={index}
                  className='last:rounded-bl-md last:rounded-br-md flex w-full items-center overflow-hidden text-ellipsis border-b border-border px-1.5 py-1 text-text-sm last:border-b-0 hover:bg-darker'
                  onClick={() => {
                    onchange(`${prefix.name}:${value}`);
                    inputRef.current?.focus();
                  }}
                >
                  <span className='text-text-sm font-medium'>
                    {prefix.name}:
                  </span>
                  <span className='ml-1/2'>
                    {value.length > 19 ? formatString(value, "long") : value}
                  </span>
                </button>
              ))}
          </div>
        )}
    </div>
  );
};
