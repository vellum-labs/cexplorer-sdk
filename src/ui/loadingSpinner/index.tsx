import type { FC } from "react";

import { useThemeStore } from "@/stores/themeStore";

/**
 * Props for the Loading spinner component
 */
export interface LoadingProps {
  /**
   * Additional CSS classes to customize the spinner container.
   * Useful for adjusting height or other styling properties.
   *
   * @example
   * <Loading className="h-[200px]" />
   */
  className?: string;
}

/**
 * Loading spinner component with theme-aware colors.
 *
 * Displays an animated circular loading indicator that automatically adapts its colors
 * based on the current theme (light or dark). The spinner uses different color schemes
 * for optimal visibility in each theme mode.
 *
 * **Theme Colors:**
 * - Light mode: Light gray background (#F2F4F7) with dark blue spinner (#0094d4)
 * - Dark mode: Dark gray background (#475467) with cyan spinner (#5EDFFA)
 *
 * **Common Use Cases:**
 * - Page loading states
 * - Async data fetching operations
 * - Transaction processing indicators
 * - Blockchain data loading
 * - Table row loading states
 * - Card/panel loading overlays
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Loading />
 *
 * // Custom height
 * <Loading className="h-[300px]" />
 *
 * // In a card context
 * <div className="card">
 *   <Loading />
 * </div>
 *
 * // Full page loading
 * <div className="h-screen">
 *   <Loading />
 * </div>
 * ```
 *
 * @param {LoadingProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes for the container
 * @returns {JSX.Element} An animated loading spinner centered in its container
 */
export const Loading: FC<LoadingProps> = ({ className }) => {
  const { theme } = useThemeStore();

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div
        className={`flex h-[150px] w-full items-center justify-center ${className ? className : ""}`}
      >
        <div
          className={`loader h-[60px] w-[60px] border-[4px] ${
            theme === "light"
              ? "border-[#F2F4F7] border-t-darkBlue"
              : "border-[#475467] border-t-[#5EDFFA]"
          } border-t-[4px]`}
        ></div>
      </div>
    </div>
  );
};
