import { useThemeStore } from "@/stores/themeStore";
import { Bookmark } from "lucide-react";

/**
 * Props for the BookmarkButton component.
 *
 * @interface BookmarkButtonProps
 */
export interface BookmarkButtonProps {
  /**
   * Use header variant with smaller size.
   * Header variant is optimized for navigation bars.
   *
   * @default false
   */
  isHeader?: boolean;

  /**
   * Callback function when button is clicked.
   * FE should handle opening the appropriate modal (add/edit/remove).
   */
  onClick?: () => void;

  /**
   * Whether the current page is already bookmarked.
   * When true, the bookmark icon will be filled.
   *
   * @default false
   */
  isBookmarked?: boolean;
}

/**
 * Bookmark button component for saving pages to local bookmarks.
 *
 * Features:
 * - Two size variants (header and default)
 * - Visual indicator when page is bookmarked (filled icon)
 * - Consistent styling with ShareButton
 *
 * The component triggers a callback when clicked. The consuming application
 * is responsible for managing bookmark state and showing appropriate modals.
 *
 * @component
 * @example
 * ```tsx
 * // Default size
 * <BookmarkButton onClick={() => setModalOpen(true)} />
 * ```
 *
 * @example
 * ```tsx
 * // Header variant with bookmarked state
 * <BookmarkButton
 *   isHeader={true}
 *   isBookmarked={true}
 *   onClick={handleBookmarkClick}
 * />
 * ```
 *
 * @param {BookmarkButtonProps} props - Component props
 * @returns {JSX.Element} Bookmark button
 */
export const BookmarkButton = ({
  isHeader = false,
  onClick,
  isBookmarked = false,
}: BookmarkButtonProps) => {
  const { theme } = useThemeStore();

  return (
    <button
      onClick={onClick}
      aria-label={isBookmarked ? "Edit bookmark" : "Add bookmark"}
      className={
        isHeader
          ? `flex h-[20px] w-[20px] items-center justify-center rounded-[4px] border border-border shadow-xs hover:bg-darker ${theme === "light" ? "bg-white" : "bg-cexdark-800"}`
          : `flex h-10 w-10 items-center justify-center rounded-s border border-border hover:bg-darker ${theme === "light" ? "bg-white" : "bg-cexdark-800"}`
      }
    >
      <Bookmark
        size={isHeader ? 10 : 16}
        className={isBookmarked ? "fill-current" : ""}
      />
    </button>
  );
};
