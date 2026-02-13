import { useThemeStore } from "@/stores/themeStore";
import { Bookmark } from "lucide-react";

/**
 * Props for the BookmarksSideButton component.
 *
 * @interface BookmarksSideButtonProps
 */
export interface BookmarksSideButtonProps {
  /**
   * Callback function when button is clicked.
   * FE should handle navigation to /bookmarks page.
   */
  onClick?: () => void;

  /**
   * Top position from viewport (supports %, vh, px).
   * Use this to align with header content area.
   * @default "25vh"
   */
  top?: string;

  /**
   * Additional CSS classes for custom styling.
   */
  className?: string;

  /**
   * Custom border color for the button.
   * @example "#75DEFF" or "#0094D4"
   */
  borderColor?: string;

  /**
   * Accessible label for the button.
   * @default "View bookmarks"
   */
  ariaLabel?: string;
}

/**
 * Slide-in button fixed to the right side of the screen for accessing bookmarks.
 *
 * This component creates a fixed-position button that peeks from the right edge
 * of the viewport. On hover, it slides out to reveal the full button with a
 * bookmark icon. Clicking navigates to the bookmarks page.
 *
 * **Features:**
 * - Fixed position on right side of viewport
 * - Smooth slide-in/out animation on hover
 * - Theme-aware styling
 * - Configurable vertical position (top prop, supports %, vh, px)
 * - Optional custom border color
 *
 * **Usage:**
 * - Only render this component when user has bookmarks
 * - Place it at the root layout level (outside of page content)
 * - FE handles navigation via onClick
 *
 * @component
 * @example
 * ```tsx
 * // Only show when user has bookmarks
 * {bookmarks.length > 0 && (
 *   <BookmarksSideButton onClick={() => navigate("/bookmarks")} />
 * )}
 * ```
 *
 * @example
 * ```tsx
 * // With custom border color
 * <BookmarksSideButton
 *   onClick={handleClick}
 *   top="70vh"
 *   borderColor={theme === "dark" ? "#75DEFF" : "#0094D4"}
 * />
 * ```
 *
 * @param {BookmarksSideButtonProps} props - Component props
 * @returns {JSX.Element} Slide-in bookmark button
 */
export const BookmarksSideButton = ({
  onClick,
  top = "25vh",
  className = "",
  borderColor,
  ariaLabel = "View bookmarks",
}: BookmarksSideButtonProps) => {
  const { theme } = useThemeStore();

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`fixed right-0 z-50 flex items-center justify-center rounded-l-m transition-all duration-300 ease-in-out ${
        theme === "light" ? "bg-white" : "bg-cexdark-800"
      } ${className}`}
      style={{
        top,
        transform: "translateX(70%)",
        border: borderColor
          ? `1px solid ${borderColor}`
          : "1px solid var(--color-border)",
        borderRight: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateX(0)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateX(70%)";
      }}
    >
      <div className='flex h-[48px] w-[48px] items-center justify-center'>
        <Bookmark size={20} />
      </div>
    </button>
  );
};
