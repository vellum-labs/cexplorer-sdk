import { useDropdownState } from "@/stores/dropdownState";
import type { NavigationOptions } from "@/types/navigationTypes";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { FC, KeyboardEvent, ReactNode } from "react";
import {
  createRef,
  Fragment,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

/**
 * Props for the Dropdown component.
 *
 * @interface DropdownProps
 */
export interface DropdownProps {
  /**
   * Unique identifier for the dropdown instance.
   * Used to manage open/close state across multiple dropdowns.
   *
   * @example "main-menu"
   */
  id: string;
  /**
   * Array of navigation options to display in the dropdown menu.
   * Can include links, click handlers, nested options, and dividers.
   *
   * @example
   * ```tsx
   * [
   *   { label: "Profile", onClick: () => navigate("/profile") },
   *   { label: "Settings", href: "/settings" },
   *   { label: "Logout", onClick: handleLogout, divider: true }
   * ]
   * ```
   */
  options: NavigationOptions;
  /**
   * Width of the dropdown menu.
   *
   * @optional
   * @default "190px"
   * @example "250px"
   */
  width?: string;
  /**
   * Content to display as the dropdown trigger/label.
   * Can be text, icon, or any React node.
   *
   * @example "Menu"
   * @example <><Icon /> Settings</>
   */
  label: ReactNode;
  /**
   * Hide the chevron icon next to the label.
   *
   * @optional
   * @default false
   */
  hideChevron?: boolean;
  /**
   * Additional CSS classes for the trigger button.
   *
   * @optional
   * @example "text-primary font-bold"
   */
  triggerClassName?: string;
  /**
   * Disable hover-to-open behavior. Dropdown will only open on click.
   *
   * @optional
   * @default false
   */
  disableHover?: boolean;
  /**
   * Automatically close the dropdown when an option is selected.
   *
   * @optional
   * @default false
   */
  closeOnSelect?: boolean;
  /**
   * Force the dropdown to open in a specific vertical direction.
   * If not set, position is calculated automatically.
   *
   * @optional
   * @example "down"
   * @example "up"
   */
  forceVerticalPosition?: "down" | "up";
  /**
   * Force the dropdown to align in a specific horizontal direction.
   * If not set, position is calculated automatically.
   *
   * @optional
   * @example "left"
   * @example "right"
   */
  forceHorizontalPosition?: "left" | "right";
  /**
   * Additional CSS classes for the dropdown popover container.
   *
   * @optional
   * @example "shadow-xl rounded-lg"
   */
  poppoverClassname?: string;
  /**
   * Additional CSS classes for the outer wrapper element.
   *
   * @optional
   * @example "ml-4"
   */
  wrapperClassname?: string;
  /**
   * Show border around the dropdown menu.
   *
   * @optional
   * @default false
   */
  withBorder?: boolean;
}

/**
 * Dropdown menu component with support for nested options, keyboard navigation, and smart positioning.
 *
 * Features:
 * - Hover and click interactions
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Automatic positioning to avoid viewport overflow
 * - Support for internal and external links
 * - Nested submenus
 * - Customizable styling
 *
 * @component
 * @example
 * ```tsx
 * // Basic dropdown
 * <Dropdown
 *   id="user-menu"
 *   label="Account"
 *   options={[
 *     { label: "Profile", onClick: () => console.log("Profile") },
 *     { label: "Settings", href: "/settings" },
 *     { label: "Logout", onClick: handleLogout }
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Dropdown with nested options
 * <Dropdown
 *   id="tools-menu"
 *   label="Tools"
 *   width="220px"
 *   options={[
 *     {
 *       label: "Development",
 *       nestedOptions: [
 *         { label: "VS Code", href: "/tools/vscode" },
 *         { label: "Git", href: "/tools/git" }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 *
 * @param {DropdownProps} props - Component props
 * @returns {JSX.Element} Rendered dropdown component
 */
export const Dropdown: FC<DropdownProps> = ({
  id,
  label,
  options,
  width = "190px",
  hideChevron = false,
  triggerClassName,
  disableHover = false,
  closeOnSelect = false,
  forceVerticalPosition,
  forceHorizontalPosition,
  poppoverClassname,
  wrapperClassname,
  withBorder = false,
}) => {
  const { openId, setOpenId } = useDropdownState();
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [disabledClick, setDisabledClick] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [verticalPosition, setVerticalPosition] = useState<"down" | "up">(
    forceVerticalPosition ?? "down",
  );
  const [horizontalPosition, setHorizontalPosition] = useState<
    "left" | "right"
  >("left");
  const wrapperRef = createRef<HTMLDivElement>();
  const contentRef = createRef<HTMLDivElement>();
  const triggerRef = createRef<HTMLButtonElement>();
  let timeout;
  let submenuTimeout;

  const calculateDropdownPosition = () => {
    if (!contentRef.current || !triggerRef.current) return;

    const dropdownRect = contentRef.current.getBoundingClientRect();
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const leftOverflow = dropdownRect.width > dropdownRect.left;
    const bottomOverflow =
      viewportHeight < triggerRect.bottom + dropdownRect.height;

    if (forceHorizontalPosition) {
      setHorizontalPosition(forceHorizontalPosition);
    } else if (leftOverflow) {
      setHorizontalPosition("right");
    } else {
      setHorizontalPosition("left");
    }

    if (bottomOverflow && !forceVerticalPosition) {
      setVerticalPosition("up");
    } else {
      setVerticalPosition("down");
    }
  };

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
    }, 250);
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

  const openSubmenu = (id: string) => {
    clearTimeout(submenuTimeout);
    setActiveSubmenu(id);
  };

  const closeSubmenu = () => {
    submenuTimeout = setTimeout(() => {
      setActiveSubmenu(null);
    }, 250);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen && options[focusedIndex]?.onClick) {
          options[focusedIndex]?.onClick();
          if (closeOnSelect) handleClose();
        } else {
          toggleDropdown();
        }
        break;
      case "Escape":
        handleClose();
        break;
      default:
        break;
    }
  };

  useLayoutEffect(() => {
    if (isOpen) {
      calculateDropdownPosition();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (closeOnSelect) {
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
      className={`relative ${isOpen ? "z-[16]" : "z-[15]"} font-medium ${wrapperClassname ? wrapperClassname : ""}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      ref={wrapperRef}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        onClick={toggleDropdown}
        className={`flex items-center justify-between gap-1/2 bg-transparent ${triggerClassName}`}
        aria-haspopup='menu'
        aria-expanded={isOpen}
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
          className={`animate-in absolute bg-cardBg ${horizontalPosition === "left" ? "right-0" : "left-0"} ${verticalPosition === "down" ? "top-[calc(100%+3px)]" : "bottom-[calc(100%+3px)]"} z-20 rounded-m bg-background p-1 text-text-sm shadow-md ${withBorder ? "border border-border" : ""} ${poppoverClassname || ""}`}
          style={{
            width: `${width}`,
          }}
        >
          {options
            .filter(option => option)
            .map((option, index) => (
              <Fragment key={index}>
                {option?.href && option.href.includes("http") ? (
                  <a
                    href={option.href}
                    target='_blank'
                    className={`first:rounded-t-lg last:rounded-b-lg z-50 border-b border-border last:border-b-0 hover:bg-darker hover:text-primary ${option.divider ? "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-border" : ""}`}
                    style={{
                      display: "block",
                      padding: "10px",
                    }}
                    role='menuitem'
                    aria-label='Menu item'
                    onClick={() => setIsOpen(false)}
                  >
                    {option.label}
                  </a>
                ) : option?.href ? (
                  <Link
                    to={option.href}
                    search={option?.params ?? undefined}
                    className={`relative rounded-m hover:bg-darker hover:text-primary ${option.divider ? "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-border" : ""}`}
                    style={{
                      display: "block",
                      padding: "10px",
                    }}
                    role='menuitem'
                    aria-label='Menu item'
                    onClick={() => setIsOpen(false)}
                  >
                    {option.label}
                  </Link>
                ) : (
                  <div
                    className={`relative flex w-full justify-between rounded-m p-1.5 ${option.divider ? "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-border" : ""} hover:bg-darker hover:text-primary`}
                    onClick={option?.onClick}
                    style={{
                      //   padding: "10px",
                      cursor: "pointer",
                    }}
                    role='menuitem'
                    aria-label='Menu item'
                  >
                    {option?.nestedOptions ? (
                      <div
                        onMouseOver={() => openSubmenu(String(option.label))}
                        onMouseLeave={closeSubmenu}
                        className='relative flex w-full items-center justify-between'
                      >
                        {option.label}
                        {option.nestedOptions && <ChevronRight size={15} />}
                        {activeSubmenu === option.label && (
                          <div
                            className={`absolute left-[110%] top-0 z-50 rounded-l border border-border bg-cardBg p-1 shadow-md`}
                            style={{
                              width: width,
                            }}
                          >
                            {option.nestedOptions.map((nestedOption, index) => (
                              <Link
                                to={nestedOption?.href as any}
                                key={index}
                                className={`relative flex w-full justify-between rounded-m text-text hover:bg-darker hover:text-primary ${option.divider ? "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-border" : ""}`}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                                role='menuitem'
                                aria-label='Menu item'
                                onClick={() => {
                                  nestedOption?.onClick &&
                                    nestedOption?.onClick();
                                  setIsOpen(false);
                                  setActiveSubmenu(null);
                                }}
                              >
                                {nestedOption?.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <>{option?.label}</>
                    )}
                  </div>
                )}
              </Fragment>
            ))}
        </div>
      )}
    </div>
  );
};
