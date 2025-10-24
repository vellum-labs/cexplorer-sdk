import type { FC, ReactNode } from "react";

import { FixedSizeList as List } from "react-window";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

import { memo, useRef, useState } from "react";

/**
 * Internal memoized row component for virtualized list rendering.
 *
 * Renders a single attribute row with label and value, optimized for
 * performance with React.memo and react-window virtualization.
 *
 * @internal
 */
const Row = memo(({ index, style, data }: any) => {
  const { label, value } = data[index];

  return (
    <div style={style}>
      <CommandItem
        className='cursor-default bg-transparent hover:bg-transparent'
        disableHover
      >
        <div className='flex w-full items-center justify-between gap-1.5 text-text-xs text-text'>
          <div>{label}</div>
          <div>{value}</div>
        </div>
      </CommandItem>
    </div>
  );
});

/**
 * Props for the AttributeDropdown component
 */
export interface AttributeDropdownProps {
  /**
   * Array of attribute items to display in the dropdown.
   * Each item contains a label-value pair and optional visibility flag.
   *
   * @example
   * ```tsx
   * items={[
   *   { label: "Transaction Hash", value: "5f20df93...", visible: true },
   *   { label: "Block Height", value: "8234567", visible: true },
   *   { label: "Hidden Item", value: "...", visible: false }, // Will not render
   * ]}
   * ```
   */
  items: {
    /** Label for the attribute (left side) */
    label: ReactNode;
    /** Value for the attribute (right side) */
    value: ReactNode;
    /** Optional visibility flag. If false or undefined is treated as true, item is shown */
    visible?: boolean;
  }[];
  /**
   * Trigger element that opens the dropdown when clicked.
   * Typically a button, icon, or text element.
   *
   * @example
   * ```tsx
   * <AttributeDropdown items={items}>
   *   <button>View Attributes</button>
   * </AttributeDropdown>
   * ```
   */
  children: ReactNode;
  /**
   * Additional CSS classes to apply to the popover content
   */
  className?: string;
  /**
   * Height of each item row in pixels.
   * Used for react-window virtualization.
   *
   * @default 30
   */
  itemSize?: number;
}

/**
 * AttributeDropdown displays a virtualized list of label-value pairs in a popover.
 *
 * This component is optimized for displaying large lists of attributes (metadata, properties, etc.)
 * using react-window virtualization for performance. It shows attributes as label-value pairs
 * in a dropdown triggered by clicking a child element.
 *
 * **Common Use Cases:**
 * - Display NFT/token metadata attributes
 * - Show transaction details
 * - Display smart contract properties
 * - Show block attributes
 * - List asset properties
 *
 * **Features:**
 * - Virtualized list rendering for performance (handles large datasets)
 * - Conditional item visibility
 * - Customizable item height
 * - Label-value pair layout
 * - Popover-based dropdown UI
 * - Empty state handling
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with NFT attributes
 * <AttributeDropdown
 *   items={[
 *     { label: "Name", value: "Cool NFT #123" },
 *     { label: "Collection", value: "Cardano Apes" },
 *     { label: "Rarity", value: "Legendary" },
 *     { label: "Mint Date", value: "2024-01-15" },
 *   ]}
 * >
 *   <button>View Attributes</button>
 * </AttributeDropdown>
 *
 * // With transaction details
 * <AttributeDropdown
 *   items={[
 *     { label: "Hash", value: "5f20df933584822601f9e3..." },
 *     { label: "Block", value: "8234567" },
 *     { label: "Fees", value: "0.17 ADA" },
 *     { label: "Size", value: "452 bytes" },
 *   ]}
 * >
 *   <Icon name="info" />
 * </AttributeDropdown>
 *
 * // With conditional visibility
 * <AttributeDropdown
 *   items={[
 *     { label: "Public Info", value: "Visible", visible: true },
 *     { label: "Hidden Info", value: "Secret", visible: false }, // Won't show
 *     { label: "Always Visible", value: "Data" }, // visible undefined = shown
 *   ]}
 * >
 *   <button>Show Info</button>
 * </AttributeDropdown>
 *
 * // Custom item height and styling
 * <AttributeDropdown
 *   items={largeAttributeList}
 *   itemSize={40}
 *   className="w-[300px]"
 * >
 *   <button>View All Properties</button>
 * </AttributeDropdown>
 *
 * // With rich content
 * <AttributeDropdown
 *   items={[
 *     {
 *       label: <strong>Policy ID</strong>,
 *       value: <Copy value="abc123..." />
 *     },
 *     {
 *       label: "Status",
 *       value: <Badge variant="success">Active</Badge>
 *     },
 *   ]}
 * >
 *   <Icon name="list" />
 * </AttributeDropdown>
 * ```
 *
 * @param {AttributeDropdownProps} props - Component props
 * @param {Array} props.items - Array of label-value pairs to display
 * @param {ReactNode} props.children - Trigger element for the dropdown
 * @param {string} [props.className] - Additional CSS classes for popover content
 * @param {number} [props.itemSize=30] - Height of each item row in pixels
 * @returns {JSX.Element} Attribute dropdown with virtualized list
 */
export const AttributeDropdown: FC<AttributeDropdownProps> = ({
  items,
  children,
  className,
  itemSize,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter(
    item => typeof item.visible === "undefined" || item.visible,
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          ref={contentRef}
          className={`w-[220px] p-0 ${className ? className : ""}`}
        >
          <Command>
            <CommandList className='overflow-hidden'>
              <CommandEmpty>No attribute found.</CommandEmpty>
              <CommandGroup>
                <List
                  height={(itemSize ?? 30) * filteredItems.length + 10}
                  itemCount={filteredItems.length}
                  itemSize={itemSize ?? 30}
                  width='100%'
                  itemData={filteredItems}
                  className='overscroll-contain scroll-smooth'
                  overscanCount={40}
                >
                  {Row}
                </List>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
