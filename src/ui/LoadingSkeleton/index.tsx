/**
 * Available border radius options for the skeleton
 */
export type SkeletonRounded = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Props for the LoadingSkeleton component
 */
export interface LoadingSkeletonProps {
  /** Height of the skeleton (CSS value) */
  height?: string;
  /** Width of the skeleton (CSS value) */
  width?: string;
  /** Maximum height of the skeleton (CSS value) */
  maxHeight?: string;
  /** Maximum width of the skeleton (CSS value) */
  maxWidth?: string;
  /** Margin around the skeleton (CSS value) - currently unused */
  margin?: string;
  /** Border radius size */
  rounded?: SkeletonRounded;
  /** Additional CSS classes */
  className?: string;
};

/**
 * A loading skeleton component that displays an animated placeholder while content is loading.
 * Provides a shimmer effect and customizable dimensions.
 *
 * @param props - Component props
 * @returns JSX element representing the loading skeleton
 *
 * @example
 * ```tsx
 * // Basic skeleton
 * <LoadingSkeleton />
 *
 * // Custom sized skeleton
 * <LoadingSkeleton
 *   height="40px"
 *   width="200px"
 *   rounded="lg"
 * />
 *
 * // Skeleton for specific content
 * <LoadingSkeleton
 *   height="20px"
 *   width="100%"
 *   maxWidth="300px"
 *   className="mb-4"
 * />
 * ```
 *
 * @remarks
 * - Uses CSS shimmer animation for visual feedback
 * - Supports all CSS dimension values (px, %, rem, etc.)
 * - Automatically applies `shrink-0` to prevent flex shrinking
 */
export const LoadingSkeleton = ({
  height = "100%",
  width = "100%",
  maxHeight = "100%",
  maxWidth = "100%",
  rounded = "sm",
  className = "",
}: LoadingSkeletonProps) => {
  return (
    <div
      style={{
        height,
        width,
        maxHeight,
        maxWidth,
      }}
      data-testid="skeleton"
      className={`shimmer shrink-0 bg-gray-400/15 rounded-${rounded} ${className}`}
    />
  );
};

