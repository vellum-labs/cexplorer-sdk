import { cn } from "@/utils/cn";
import type { FC, ReactNode } from "react";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Offset configuration for tooltip positioning.
 *
 * @interface Offset
 */
interface Offset {
  /**
   * Horizontal offset in pixels.
   *
   * @optional
   * @example 10
   */
  x?: number;
  /**
   * Vertical offset in pixels.
   *
   * @optional
   * @example 10
   */
  y?: number;
}

/**
 * Props for the Tooltip component.
 *
 * @interface TooltipProps
 */
interface TooltipProps {
  /**
   * Trigger element that shows the tooltip on hover.
   *
   * @example <span>Hover me</span>
   * @example <Button label="Info" />
   */
  children: ReactNode;
  /**
   * Content to display inside the tooltip.
   *
   * @example "Transaction hash"
   * @example <div>Pool ID: pool1xxx...</div>
   */
  content: ReactNode;
  /**
   * Delay in milliseconds before hiding the tooltip after mouse leaves.
   *
   * @optional
   * @default 150
   * @example 300
   */
  delay?: number;
  /**
   * Force the tooltip to appear in a specific direction.
   * If not set, direction is calculated automatically based on available space.
   *
   * @optional
   * @example "top"
   * @example "bottom"
   * @example "left"
   * @example "right"
   */
  forceDirection?: "top" | "bottom" | "left" | "right";
  /**
   * Prevent the tooltip from displaying.
   *
   * @optional
   * @default false
   */
  hide?: boolean;
  /**
   * Reference to an element whose width should be used for the tooltip width.
   *
   * @optional
   * @example useRef<HTMLDivElement>(null)
   */
  widthRef?: React.RefObject<HTMLElement>;
  /**
   * Distance in pixels between the trigger and tooltip.
   * Can be a number (applied to both x and y) or an object with separate x and y values.
   *
   * @optional
   * @default 8
   * @example 12
   * @example { x: 10, y: 5 }
   */
  offset?: number | Offset;
}

/**
 * Tooltip component with smart positioning and customizable appearance.
 *
 * Features:
 * - Automatic positioning to avoid viewport overflow
 * - Manual direction control with forceDirection prop
 * - Customizable offset distance
 * - Hover and touch support
 * - Portal rendering for correct z-index stacking
 * - Delayed hide for better UX
 * - Dynamic width matching via widthRef
 * - Empty content auto-hiding
 *
 * Positioning Logic:
 * 1. Prefers top position if space available (60px)
 * 2. Falls back to bottom, right, or left based on space
 * 3. Can be forced to specific direction via forceDirection prop
 *
 * @component
 * @example
 * ```tsx
 * // Basic tooltip with address
 * <Tooltip content="Copy address to clipboard">
 *   <Copy copyText="addr1q9xyz..." />
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip with forced bottom position
 * <Tooltip
 *   content="Pool details"
 *   forceDirection="bottom"
 *   delay={300}
 * >
 *   <span>ACME Pool</span>
 * </Tooltip>
 * ```
 *
 * @example
 * ```tsx
 * // Tooltip with custom offset
 * <Tooltip
 *   content="Transaction hash: 0x123..."
 *   offset={{ x: 15, y: 10 }}
 * >
 *   <InfoIcon size={16} />
 * </Tooltip>
 * ```
 *
 * @param {TooltipProps} props - Component props
 * @returns {JSX.Element} Rendered tooltip wrapper with trigger element
 */
export const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  delay = 150,
  forceDirection,
  hide = false,
  widthRef,
  offset = 8,
}) => {
  const timeoutRef = useRef<number>();
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right"
  >(forceDirection || "top");
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  }>({ top: 0, left: 0, width: 0, height: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getOffset = (): { x: number; y: number } => {
    if (typeof offset === "number") return { x: offset, y: offset };
    return { x: offset.x ?? 0, y: offset.y ?? 0 };
  };

  const { x: offsetX, y: offsetY } = getOffset();

  const clearExistingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  };

  const showTooltip = () => {
    if (hide) return;
    clearExistingTimeout();
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setVisible(true);
  };

  const hideTooltip = () => {
    clearExistingTimeout();
    timeoutRef.current = window.setTimeout(() => setVisible(false), delay);
  };

  useEffect(() => () => clearExistingTimeout(), []);

  useLayoutEffect(() => {
    if (!visible || !wrapperRef.current) return;

    if (forceDirection) {
      setDirection(forceDirection);
      return;
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const { top, left, width, height } = coords;
    const space = {
      top,
      bottom: vh - (top + height),
      left,
      right: vw - (left + width),
    };

    const fitsTop = space.top >= 60;
    const fitsBottom = space.bottom >= 60;
    const fitsLeft = space.left >= 120;
    const fitsRight = space.right >= 120;

    if (fitsTop) setDirection("top");
    else if (fitsBottom) setDirection("bottom");
    else if (fitsRight) setDirection("right");
    else if (fitsLeft) setDirection("left");
  }, [visible, coords, forceDirection]);

  const getFixedPosition = () => {
    const { top, left, width, height } = coords;

    switch (direction) {
      case "top":
        return {
          top: top - offsetY,
          left: left + width / 2,
          transform: "translate(-50%, -100%)",
        };
      case "bottom":
        return {
          top: top + height + offsetY,
          left: left + width / 2,
          transform: "translate(-50%, 0)",
        };
      case "left":
        return {
          top: top + height / 2,
          left: left - offsetX,
          transform: "translate(-100%, -50%)",
        };
      case "right":
      default:
        return {
          top: top + height / 2,
          left: left + width + offsetX,
          transform: "translate(0, -50%)",
        };
    }
  };

  const fixedPos = getFixedPosition();

  const tooltipNode = visible
    ? createPortal(
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            width: widthRef?.current?.offsetWidth || "auto",
            ...fixedPos,
            zIndex: 9999,
          }}
          className={cn(
            "rounded-l border border-border bg-background px-2 py-1 text-text-sm shadow-md transition-opacity duration-150 empty:hidden",
            visible ? "opacity-100" : "opacity-0",
          )}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {content}
        </div>,
        document.body,
      )
    : null;

  return (
    <div
      ref={wrapperRef}
      className='relative inline-block'
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onTouchStart={showTooltip}
      onTouchEnd={hideTooltip}
    >
      {children}
      {tooltipNode}
    </div>
  );
};
