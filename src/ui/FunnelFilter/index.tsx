import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import { useLayoutEffect, useState } from "react";
import Button from "../Button";

/**
 * Props for the FunnelFilter component
 */
export interface FunnelFilterProps {
  /** Reference to the element that the filter dropdown should be positioned relative to */
  anchorRef: RefObject<HTMLElement>;
  /** Whether the filter button should be disabled */
  disabled?: boolean;
  /** Callback function called when the filter is applied */
  onFilter?: () => void;
  /** Callback function called when the filter is reset */
  onReset?: () => void;
  /** Content to display in the filter dropdown */
  children: ReactNode;
  /** Width of the filter dropdown */
  width?: string;
}

/**
 * A positioned dropdown filter component that renders as a portal.
 * Automatically positions itself relative to an anchor element and includes
 * reset and apply buttons.
 *
 * @param props - Component props
 * @returns JSX element representing the filter dropdown
 *
 * @example
 * ```tsx
 * const filterRef = useRef<HTMLButtonElement>(null);
 * const [filterOpen, setFilterOpen] = useState(false);
 *
 * return (
 *   <div>
 *     <button ref={filterRef} onClick={() => setFilterOpen(!filterOpen)}>
 *       Filter
 *     </button>
 *     {filterOpen && (
 *       <FunnelFilter
 *         anchorRef={filterRef}
 *         onFilter={() => {
 *           console.log('Apply filter');
 *           setFilterOpen(false);
 *         }}
 *         onReset={() => {
 *           console.log('Reset filter');
 *           setFilterOpen(false);
 *         }}
 *         width="300px"
 *       >
 *         <div className="p-4">
 *           <input placeholder="Search..." />
 *         </div>
 *       </FunnelFilter>
 *     )}
 *   </div>
 * );
 * ```
 *
 * @remarks
 * - Renders using React Portal for proper layering
 * - Automatically repositions on scroll and resize
 * - Prevents click events from bubbling up
 * - Fixed positioning relative to anchor element
 */
export const FunnelFilter = ({
  anchorRef,
  children,
  disabled = false,
  width = "250px",
  onFilter,
  onReset,
}: FunnelFilterProps) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  /**
   * Updates the position of the filter dropdown based on the anchor element
   */
  const updatePosition = () => {
    if (!anchorRef?.current) {
      return;
    }

    const rect = anchorRef.current.getBoundingClientRect();
    if (rect) {
      setPosition({
        top: rect.bottom + window.scrollY - 45,
        left: rect.left + window.scrollX - 80,
      });
    }
  };

  useLayoutEffect(() => {
    updatePosition();

    const scrollListener = () => updatePosition();
    window.addEventListener("scroll", scrollListener, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", scrollListener, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return createPortal(
    <div
      className='absolute z-50 rounded-lg border border-border bg-background'
      style={{
        bottom: window.innerHeight - position.top,
        left: position.left,
        width,
      }}
      onMouseDown={e => e.stopPropagation()}
      onClick={e => e.stopPropagation()}
    >
      <div className='min-h-[50px] w-full border-b border-border'>
        {children}
      </div>
      <div className='flex h-[40px] w-full items-center justify-between px-6 py-3'>
        <Button
          size='xs'
          className='cursor-pointer px-2'
          variant='tertiary'
          label='Reset'
          onClick={onReset}
        />
        <Button
          size='xs'
          className='cursor-pointer px-2'
          variant='primary'
          label='Filter'
          disabled={disabled}
          onClick={onFilter}
        />
      </div>
    </div>,
    document.body,
  );
};
