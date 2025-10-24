/**
 * Props for the SpinningLoader component
 */
export interface SpinningLoaderProps {
  /**
   * Size of the spinner (Tailwind size units)
   * @default 8
   *
   * @example
   * // Small spinner
   * <SpinningLoader size={4} />
   *
   * // Medium spinner (default)
   * <SpinningLoader size={8} />
   *
   * // Large spinner
   * <SpinningLoader size={12} />
   */
  size?: number;
}

/**
 * SpinningLoader displays an animated circular loading spinner.
 *
 * This component provides a simple, accessible loading indicator with a smooth spinning
 * animation. The spinner respects user motion preferences and will slow down for users
 * who prefer reduced motion. It inherits the text color from its parent, making it easy
 * to integrate into different themes and contexts.
 *
 * **Key Features:**
 * - Smooth circular spinning animation
 * - Respects prefers-reduced-motion settings (slower animation)
 * - Inherits color from parent text color
 * - Accessible with proper ARIA role
 * - Configurable size
 *
 * **Common Use Cases:**
 * - Show loading state during data fetching
 * - Indicate processing or computation in progress
 * - Display during async operations (transactions, API calls)
 * - Show while waiting for blockchain confirmations
 * - Loading indicator in buttons or cards
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with default size
 * <SpinningLoader />
 *
 * // Small spinner
 * <SpinningLoader size={4} />
 *
 * // Large spinner
 * <SpinningLoader size={12} />
 *
 * // In a loading state
 * {isLoading ? <SpinningLoader size={6} /> : <Content />}
 *
 * // With custom color (inherits text color)
 * <div className="text-blue-500">
 *   <SpinningLoader size={8} />
 * </div>
 * ```
 *
 * @param {SpinningLoaderProps} props - Component props
 * @param {number} [props.size=8] - Size of the spinner in Tailwind size units
 * @returns {JSX.Element} An animated circular loading spinner
 */
export const SpinningLoader = ({ size = 8 }: SpinningLoaderProps) => {
  return (
    <div
      className={`flex shrink-0 grow-0 h-${size} w-${size} rounded-full animate-spin border-4 border-solid border-current border-e-transparent align-[-0.125em] text-text motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role='status'
    ></div>
  );
};
