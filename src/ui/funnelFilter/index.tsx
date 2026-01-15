import type { ReactNode, RefObject } from "react";

import { createPortal } from "react-dom";

import { useLayoutEffect, useState } from "react";
import { Button } from "../button";

/**
 * Props for the FunnelFilter component
 */
export interface FunnelFilterProps {
  /**
   * Reference to the anchor element that the filter will position relative to
   * The filter will appear below and slightly offset from this element
   *
   * @example
   * const buttonRef = useRef<HTMLButtonElement>(null);
   * <FunnelFilter anchorRef={buttonRef}>...</FunnelFilter>
   */
  anchorRef: RefObject<HTMLElement>;
  /**
   * Disables the "Filter" button when true
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback function triggered when the "Filter" button is clicked
   */
  onFilter?: () => void;
  /**
   * Callback function triggered when the "Reset" button is clicked
   */
  onReset?: () => void;
  /**
   * Filter content - typically form inputs, checkboxes, or other filter controls
   */
  children: ReactNode;
  /**
   * Width of the filter dropdown panel
   * @default "250px"
   */
  width?: string;
  /**
   * Reset button label
   * @default "Reset"
   */
  resetLabel?: string;
  /**
   * Filter button label
   * @default "Filter"
   */
  filterLabel?: string;
}

/**
 * FunnelFilter displays a positioned dropdown panel for filtering content.
 *
 * A portal-based filter component that positions itself relative to an anchor element,
 * providing a dropdown interface with custom filter controls and action buttons (Reset/Filter).
 * Automatically updates position on scroll and resize.
 *
 * **Common Use Cases:**
 * - Table column filtering
 * - Search result filtering
 * - Data grid advanced filters
 * - Transaction/block filtering in blockchain explorers
 * - Multi-criteria filtering interfaces
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with checkboxes
 * const filterRef = useRef<HTMLButtonElement>(null);
 * const [showFilter, setShowFilter] = useState(false);
 *
 * <button ref={filterRef} onClick={() => setShowFilter(!showFilter)}>
 *   Filter
 * </button>
 *
 * {showFilter && (
 *   <FunnelFilter
 *     anchorRef={filterRef}
 *     onFilter={() => {
 *       applyFilters();
 *       setShowFilter(false);
 *     }}
 *     onReset={() => {
 *       resetFilters();
 *       setShowFilter(false);
 *     }}
 *   >
 *     <div className="p-3">
 *       <label><input type="checkbox" /> Option 1</label>
 *       <label><input type="checkbox" /> Option 2</label>
 *     </div>
 *   </FunnelFilter>
 * )}
 *
 * // With custom width and inputs
 * <FunnelFilter
 *   anchorRef={anchorRef}
 *   width="350px"
 *   disabled={!hasChanges}
 *   onFilter={handleApplyFilters}
 *   onReset={handleResetFilters}
 * >
 *   <div className="p-4 space-y-3">
 *     <input type="text" placeholder="Search..." />
 *     <select><option>All Types</option></select>
 *   </div>
 * </FunnelFilter>
 * ```
 *
 * @param {FunnelFilterProps} props - Component props
 * @param {RefObject<HTMLElement>} props.anchorRef - Anchor element reference for positioning
 * @param {boolean} [props.disabled=false] - Disable the Filter button
 * @param {Function} [props.onFilter] - Filter button click handler
 * @param {Function} [props.onReset] - Reset button click handler
 * @param {ReactNode} props.children - Filter content (inputs, checkboxes, etc.)
 * @param {string} [props.width="250px"] - Panel width
 * @returns {JSX.Element} Positioned filter dropdown panel rendered as portal
 */
export const FunnelFilter = ({
  anchorRef,
  children,
  disabled = false,
  width = "250px",
  onFilter,
  onReset,
  resetLabel = "Reset",
  filterLabel = "Filter",
}: FunnelFilterProps) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (!anchorRef?.current) {
      return;
    }

    const rect = anchorRef.current?.getBoundingClientRect();
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
      className='absolute z-50 rounded-m border border-border bg-background'
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
      <div className='flex h-[40px] w-full items-center justify-between px-3 py-1.5'>
        <Button
          size='xs'
          className='cursor-pointer px-1'
          variant='tertiary'
          label={resetLabel}
          onClick={onReset}
        />
        <Button
          size='xs'
          className='cursor-pointer px-1'
          variant='primary'
          label={filterLabel}
          disabled={disabled}
          onClick={onFilter}
        />
      </div>
    </div>,
    document.body,
  );
};
