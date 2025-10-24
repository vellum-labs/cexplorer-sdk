import { useViewStore } from "@/stores/viewStore";
import { LayoutGrid, List } from "lucide-react";
import type { ReactNode } from "react";

import { useState } from "react";

/**
 * Interface for defining view switch items
 */
export interface ViewSwitchItem {
  /**
   * Unique identifier for the view option
   *
   * @example
   * { key: "grid", icon: <GridIcon />, visible: true }
   */
  key: string;

  /**
   * React icon component to display for this view option
   *
   * @example
   * { key: "grid", icon: <LayoutGrid size={20} />, visible: true }
   */
  icon: ReactNode;

  /**
   * Whether this view option should be displayed
   *
   * @example
   * { key: "grid", icon: <GridIcon />, visible: true }
   */
  visible: boolean;
}

/**
 * Available view options for the ViewSwitch component
 * - Grid view: Displays items in a grid layout
 * - List view: Displays items in a list layout
 */
const viewItems = [
  {
    key: "grid",
    icon: <LayoutGrid size={20} />,
    visible: true,
  },
  {
    key: "list",
    icon: <List size={20} />,
    visible: true,
  },
];

/**
 * ViewSwitch provides a toggle control for switching between grid and list view layouts.
 *
 * This component renders an icon-based toggle that allows users to switch between different
 * view modes (grid or list). It uses a global view store to persist the selected view across
 * the application. The active view is highlighted with a primary color, while inactive views
 * appear in default text color.
 *
 * **Key Features:**
 * - Toggle between grid and list view modes
 * - Visual feedback with icon highlighting for active view
 * - Persists view preference using global store
 * - Smooth transition animations
 * - Compact, space-efficient design
 *
 * **View Modes:**
 * - **Grid**: Card-based grid layout (LayoutGrid icon)
 * - **List**: Linear list layout (List icon)
 *
 * **Common Use Cases:**
 * - Switch between grid/list views for NFT collections
 * - Toggle display modes for transaction lists
 * - Change layout for stake pool catalogs
 * - Switch views for token listings
 * - Toggle display modes for proposal lists
 * - Any data display that supports multiple layout options
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <ViewSwitch />
 *
 * // In a toolbar with other controls
 * <div className="flex items-center gap-2">
 *   <SearchInput />
 *   <FilterDropdown />
 *   <ViewSwitch />
 * </div>
 *
 * // In a page header
 * <header className="flex justify-between items-center">
 *   <h1>NFT Collection</h1>
 *   <ViewSwitch />
 * </header>
 * ```
 *
 * @returns {JSX.Element} A view toggle switch with grid and list options
 */
export const ViewSwitch = () => {
  const { view, setView } = useViewStore();
  const [selectedItem, setSelectedItem] = useState<string>(view);

  const handleChange = (key: "grid" | "list") => {
    if (selectedItem === key) {
      return;
    }

    setSelectedItem(key);
    setView(key);
  };

  return (
    <div className='flex h-[40px] cursor-pointer items-center justify-center rounded-s border border-border text-text-sm'>
      {viewItems.map(
        ({ icon, key, visible }) =>
          visible && (
            <button
              key={key}
              className={` ${
                selectedItem === key && "text-primary"
              } duration-300" flex h-full w-9 shrink-0 items-center justify-center px-1/2 transition-all`}
              onClick={() => handleChange(key as "grid" | "list")}
            >
              {icon}
            </button>
          ),
      )}
    </div>
  );
};
