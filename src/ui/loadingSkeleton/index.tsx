/**
 * Props for the LoadingSkeleton component.
 *
 * @interface Props
 */
type Props = {
  /**
   * Height of the skeleton element.
   *
   * @optional
   * @default "100%"
   * @example "200px"
   * @example "10rem"
   */
  height?: string;
  /**
   * Width of the skeleton element.
   *
   * @optional
   * @default "100%"
   * @example "300px"
   * @example "50%"
   */
  width?: string;
  /**
   * Maximum height of the skeleton element.
   *
   * @optional
   * @default "100%"
   * @example "500px"
   */
  maxHeight?: string;
  /**
   * Maximum width of the skeleton element.
   *
   * @optional
   * @default "100%"
   * @example "800px"
   */
  maxWidth?: string;
  /**
   * Margin around the skeleton element.
   *
   * @optional
   * @example "10px"
   * @example "1rem 2rem"
   */
  margin?: string;
  /**
   * Border radius size variant.
   *
   * @optional
   * @default "sm"
   * @example "md"
   * @example "full" // For circular skeletons
   */
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  /**
   * Additional CSS classes to apply to the skeleton.
   *
   * @optional
   * @example "mb-4"
   */
  className?: string;
};

/**
 * Loading skeleton component with shimmer animation for placeholder content.
 *
 * Used to indicate loading states while content is being fetched.
 * Features a smooth shimmer animation and customizable dimensions.
 *
 * Features:
 * - Shimmer loading animation
 * - Flexible sizing with width, height, and max constraints
 * - Multiple border radius options
 * - Responsive and accessible
 * - Works with light and dark themes
 *
 * @component
 * @example
 * ```tsx
 * // Card skeleton
 * <LoadingSkeleton
 *   height="200px"
 *   width="100%"
 *   rounded="md"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Avatar skeleton (circular)
 * <LoadingSkeleton
 *   height="40px"
 *   width="40px"
 *   rounded="full"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Text line skeleton
 * <LoadingSkeleton
 *   height="16px"
 *   width="80%"
 *   rounded="sm"
 *   className="mb-2"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Transaction list skeleton
 * <div className="space-y-4">
 *   {[1, 2, 3].map(i => (
 *     <LoadingSkeleton
 *       key={i}
 *       height="80px"
 *       width="100%"
 *       rounded="lg"
 *     />
 *   ))}
 * </div>
 * ```
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} Rendered loading skeleton with shimmer animation
 */
export const LoadingSkeleton = ({
  height = "100%",
  width = "100%",
  maxHeight = "100%",
  maxWidth = "100%",
  rounded = "sm",
  className,
}: Props) => {
  return (
    <div
      style={{
        height: height,
        width: width,
        maxHeight: maxHeight,
        maxWidth: maxWidth,
      }}
      data-testid='skeleton'
      className={`shimmer bg-gray-400/15 shrink-0 rounded-${rounded} ${className}`}
    />
  );
};
