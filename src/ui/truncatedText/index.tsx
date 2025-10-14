import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { getTruncatedTitle, hasImageInChildren } from "@/utils/truncatedText";
import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Props for the TruncatedText component.
 *
 * @interface TruncatedTextProps
 */
interface TruncatedTextProps {
  /**
   * Content to display and potentially truncate.
   */
  children: ReactNode;
  /**
   * Optional CSS class name for styling.
   */
  className?: string;
  /**
   * Callback fired when image presence changes in children.
   *
   * @param {boolean} hasImage - Whether children contain images
   */
  onHasImageChange?: (hasImage: boolean) => void;
}

/**
 * Text truncation component with hover animation for long content.
 *
 * Automatically truncates text longer than 40 characters with middle ellipsis
 * on desktop. On hover, displays scrolling marquee animation with full text.
 * Mobile devices always show full text without truncation.
 *
 * @component
 * @param {TruncatedTextProps} props - Component props
 * @returns {JSX.Element} Truncated text element
 *
 * @example
 * ```tsx
 * <TruncatedText>
 *   addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wqtp0l8xfgfr5zs...
 * </TruncatedText>
 * // Desktop: Shows "addr1qxy2kgdygjrsqt…fr5zs..."
 * // On hover: Scrolling full address
 * // Mobile: Full address always visible
 * ```
 *
 * @example
 * ```tsx
 * <TruncatedText className="text-primary font-mono">
 *   0x4e8b9c2d1a6f3e5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b
 * </TruncatedText>
 * ```
 *
 * @example
 * ```tsx
 * <TruncatedText onHasImageChange={(hasImage) => setShowIcon(!hasImage)}>
 *   <img src="pool-logo.png" alt="Pool" />
 *   ACME Stake Pool - pool1qqqqqqqqqqqqqqqqqqqqqqqqqqq
 * </TruncatedText>
 * ```
 */
export const TruncatedText = ({
  children,
  className = "",
  onHasImageChange,
}: TruncatedTextProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const textRef = useRef<HTMLSpanElement | null>(null);
  const { isTruncated, displayTitle, fullText, images } =
    getTruncatedTitle(children);

  useEffect(() => {
    if (onHasImageChange) {
      const hasImage = hasImageInChildren(children);
      onHasImageChange(hasImage);
    }
  }, [children, onHasImageChange]);

  useEffect(() => {
    if (textRef.current && isTruncated && !containerWidth && !isMobile) {
      setContainerWidth(textRef.current.offsetWidth);
    }
  }, [isTruncated, containerWidth, isMobile]);

  return (
    <>
      <span
        ref={textRef}
        className={className}
        style={{
          ...(isTruncated && !isMobile && containerWidth
            ? { width: `${containerWidth}px`, display: "inline-block" }
            : isTruncated && !isMobile
              ? { display: "inline-block" }
              : {}),
          ...(isTruncated && !isMobile && containerWidth
            ? { overflow: "hidden" }
            : {}),
        }}
        onMouseEnter={() => isTruncated && !isMobile && setIsHovered(true)}
        onMouseLeave={() => isTruncated && !isMobile && setIsHovered(false)}
      >
        {isTruncated && !isMobile && isHovered ? (
          <span className='mt-1/2 flex w-full items-center gap-1'>
            {images}
            <span className='flex-1 overflow-hidden break-all'>
              <span
                className='inline-block whitespace-nowrap'
                style={{
                  animation: "marquee 10s linear infinite",
                }}
              >
                {fullText}
              </span>
            </span>
          </span>
        ) : isTruncated && !isMobile ? (
          <span className='mt-1/2 flex w-full items-center gap-1'>
            {images}
            <span className='flex-1 break-all'>{displayTitle}</span>
          </span>
        ) : (
          children
        )}
      </span>
    </>
  );
};
