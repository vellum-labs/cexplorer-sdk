import { useDropdownState } from "@/stores/dropdownState";
import type { NestedNavigation } from "@/types/navigationTypes";
import { generateUrlWithParams } from "@/utils/generateUrlWithParams";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

/**
 * Props for the ScreenDropdown component
 */
export interface ScreenDropdownProps {
  /**
   * Unique identifier for this dropdown instance
   * Used to manage open/close state across multiple dropdowns
   *
   * @example "blockchain-menu"
   */
  id: string;

  /**
   * Nested navigation structure with grouped menu options
   *
   * @example
   * {
   *   "Blocks": {
   *     label: "Blocks",
   *     labelHref: "/blocks",
   *     options: [
   *       { label: "Latest Blocks", href: "/blocks" },
   *       { label: "Block Details", href: "/block/$id" }
   *     ]
   *   }
   * }
   */
  options: NestedNavigation;

  /**
   * Label/trigger content for the dropdown
   *
   * @example "Menu"
   * @example <><Icon /> Blockchain</>
   */
  label: ReactNode;

  /**
   * Hide the chevron icon next to the label
   *
   * @default false
   */
  hideChevron?: boolean;

  /**
   * CSS classes for the trigger button
   *
   * @example "text-primary font-bold"
   */
  triggerClassName?: string;

  /**
   * CSS classes for the wrapper div
   *
   * @example "bg-white shadow-lg"
   */
  wrapperClassname?: string;

  /**
   * Disable hover open/close behavior (only allow click)
   *
   * @default false
   */
  disableHover?: boolean;

  /**
   * Close dropdown when any option is selected
   *
   * @default false
   */
  closeOnSelect?: boolean;

  /**
   * Optional card content to display at the top of the dropdown
   *
   * @example <div>Featured content</div>
   */
  card?: ReactNode;
}

/**
 * ScreenDropdown provides a full-width mega menu dropdown for complex navigation structures.
 *
 * This component creates a large dropdown panel that spans the full width of the screen,
 * displaying grouped navigation options in a multi-column layout. It supports both hover
 * and click interactions, optional card content, and manages its open/close state globally
 * to ensure only one dropdown is open at a time.
 *
 * **Common Use Cases:**
 * - Main navigation mega menus
 * - Blockchain explorer section navigation (Blocks, Transactions, Staking, etc.)
 * - Complex grouped navigation with multiple categories
 * - Dashboard navigation with organized subsections
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ScreenDropdown
 *   id="blockchain-menu"
 *   label="Blockchain"
 *   options={{
 *     "Blocks": {
 *       label: "Blocks",
 *       labelHref: "/blocks",
 *       options: [
 *         { label: "Latest Blocks", href: "/blocks" },
 *         { label: "Block Details", href: "/block/$id" }
 *       ]
 *     },
 *     "Transactions": {
 *       label: "Transactions",
 *       options: [
 *         { label: "Recent Txs", href: "/transactions" }
 *       ]
 *     }
 *   }}
 * />
 *
 * // With custom styling and card
 * <ScreenDropdown
 *   id="staking-menu"
 *   label="Staking"
 *   options={stakingOptions}
 *   triggerClassName="text-primary font-bold"
 *   card={<div className="p-4">Featured Pool</div>}
 *   closeOnSelect={true}
 * />
 *
 * // Click-only mode (no hover)
 * <ScreenDropdown
 *   id="settings-menu"
 *   label="Settings"
 *   options={settingsOptions}
 *   disableHover={true}
 *   hideChevron={true}
 * />
 * ```
 *
 * @param {ScreenDropdownProps} props - Component props
 * @param {string} props.id - Unique identifier for dropdown state management
 * @param {ReactNode} props.label - Label/trigger content
 * @param {NestedNavigation} props.options - Nested navigation structure
 * @param {boolean} [props.hideChevron=false] - Hide chevron icon
 * @param {string} [props.triggerClassName] - CSS classes for trigger button
 * @param {string} [props.wrapperClassname] - CSS classes for wrapper
 * @param {boolean} [props.disableHover=false] - Disable hover interactions
 * @param {boolean} [props.closeOnSelect=false] - Close on option selection
 * @param {ReactNode} [props.card] - Optional card content at top
 * @returns {JSX.Element} Full-width mega menu dropdown
 */
export const ScreenDropdown: React.FC<ScreenDropdownProps> = ({
  id,
  label,
  options,
  hideChevron = false,
  triggerClassName,
  wrapperClassname,
  disableHover = false,
  closeOnSelect = false,
  card,
}) => {
  const { openId, setOpenId } = useDropdownState();
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [disabledClick, setDisabledClick] = useState(false);
  const wrapperRef = React.createRef<HTMLDivElement>();
  const contentRef = React.createRef<HTMLDivElement>();
  const triggerRef = React.createRef<HTMLButtonElement>();
  let timeout;

  const toggleDropdown = () => {
    if (disabledClick) return;
    if (!isOpen) {
      setIsClicked(!isClicked);
    }

    setIsOpen(!isOpen);

    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  const handleClose = () => {
    if (disableHover) return;
    if (isClicked) return;

    timeout = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleOpen = () => {
    if (disableHover) return;
    clearTimeout(timeout);
    setDisabledClick(true);
    setTimeout(() => {
      setDisabledClick(false);
    }, 300);
    setIsOpen(true);

    if (openId !== id) {
      setOpenId(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (closeOnSelect) {
        if (event.button !== 0) return;
        setTimeout(() => {
          setIsOpen(false);
          setIsClicked(false);
        }, 150);
      } else if (
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        if (
          !triggerRef?.current?.contains(event.target) &&
          !wrapperRef?.current?.contains(event.target) &&
          !contentRef?.current?.contains(event.target)
        ) {
          setIsOpen(false);
          setIsClicked(false);
        }
      }
    };
    const controller = new AbortController();
    const signal = controller.signal;

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside, { signal });
    }

    return () => {
      controller.abort();
    };
  }, [isOpen, contentRef, triggerRef, wrapperRef, closeOnSelect]);

  useEffect(() => {
    if (openId && openId !== id) {
      setIsOpen(false);
    }
  }, [openId, id]);

  return (
    <div
      className={`z-50 ${wrapperClassname ? wrapperClassname : ""} ${isOpen ? "flex h-full items-center" : ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      ref={wrapperRef}
      aria-haspopup
      aria-expanded={isOpen}
    >
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className={`flex items-center gap-1/2 font-medium ${triggerClassName}`}
      >
        <span className={`text-text-sm`}>{label}</span>
        {!hideChevron && (
          <span>
            <ChevronDown
              size={16}
              strokeWidth={2.5}
              className={`translate-y-[1px] duration-150 ${isOpen && "rotate-180"}`}
            />
          </span>
        )}
      </button>
      {isOpen && (
        <div
          ref={contentRef}
          className={`absolute left-1/2 top-[75px] z-20 flex w-full max-w-[1410px] -translate-x-1/2 rounded-b-l border border-border border-t-primary bg-cardBg p-2 text-text-sm shadow-lg`}
        >
          {card}
          <section className='flex w-[max(800px,95%)] justify-around gap-1'>
            {Object.keys(options).map(key => (
              <div
                key={key}
                className='flex flex-col items-start gap-1 font-medium'
                role='menuitem'
                aria-label='Menu item'
              >
                <div className='flex min-h-[1.5rem] items-start pb-1'>
                  {options[key].labelHref ? (
                    <Link
                      to={options[key].labelHref}
                      className='text-primary hover:underline'
                    >
                      {options[key].label}
                    </Link>
                  ) : (
                    <p className='text-primary'>{options[key].label}</p>
                  )}
                </div>
                {options[key].options.map(option => (
                  <Link
                    key={String(option?.href) + option?.params?.tab}
                    to={generateUrlWithParams(option.href, option.params)}
                    className='text-text-sm'
                  >
                    {option.label}
                  </Link>
                ))}
              </div>
            ))}
          </section>
        </div>
      )}
    </div>
  );
};
