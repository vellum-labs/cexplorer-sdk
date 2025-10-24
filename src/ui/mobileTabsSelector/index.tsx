import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { ChevronDown } from "lucide-react";
import type { FC, ReactNode } from "react";
import { useEffect, useState } from "react";
import { Dropdown } from "../dropdown";

/**
 * Represents a single tab item
 */
export type TabItem = {
  /**
   * Unique key for the tab
   */
  key: string;
  /**
   * Display label for the tab
   */
  label: ReactNode;
  /**
   * Optional content to display when tab is active
   */
  content?: ReactNode | (() => ReactNode);
  /**
   * Optional extra title content
   */
  extraTitle?: ReactNode;
  /**
   * Whether the tab is visible
   */
  visible: boolean;
  /**
   * Optional title attribute
   */
  title?: string;
};

/**
 * Props for the MobileTabsSelector component
 */
export interface MobileTabsSelectorProps {
  /**
   * Array of tab items to display
   */
  items: TabItem[];
  /**
   * Number of items to show on mobile devices initially
   */
  mobileItems: number;
  /**
   * Whether to add margin bottom to the component
   */
  withMargin?: boolean;
  /**
   * Callback function when a tab is clicked
   * @param index - Index of the selected tab
   */
  handleTabChange: (index: number) => void;
  /**
   * Index of the currently active tab
   */
  activeTab: number;
  /**
   * Array of options for the dropdown (remaining tabs)
   */
  tabOptions: { label: ReactNode; onClick: () => void }[];
  /**
   * Force dropdown position (up or down)
   */
  forceDropdownVerticalPosition?: "up" | "down";
  /**
   * Use secondary styling (smaller size, different colors)
   */
  secondary: boolean;
}

/**
 * MobileTabsSelector provides a responsive tab navigation with dropdown overflow.
 *
 * A responsive tab component that adapts to screen width by showing a limited number
 * of tabs directly and placing remaining tabs in a dropdown menu. Automatically adjusts
 * the number of visible tabs based on viewport width.
 *
 * **Common Use Cases:**
 * - Mobile-friendly navigation tabs
 * - Page sections with many tabs
 * - Responsive data table filters
 * - Category navigation on small screens
 * - Adaptive tab navigation
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * const [activeTab, setActiveTab] = useState(0);
 * const tabs = [
 *   { key: "overview", label: "Overview", visible: true },
 *   { key: "transactions", label: "Transactions", visible: true },
 *   { key: "blocks", label: "Blocks", visible: true },
 *   { key: "epochs", label: "Epochs", visible: true },
 * ];
 *
 * const tabOptions = tabs.map((tab, index) => ({
 *   label: tab.label,
 *   onClick: () => setActiveTab(index),
 * }));
 *
 * <MobileTabsSelector
 *   items={tabs}
 *   mobileItems={2}
 *   activeTab={activeTab}
 *   handleTabChange={setActiveTab}
 *   tabOptions={tabOptions}
 *   secondary={false}
 * />
 *
 * // With margin and secondary styling
 * <MobileTabsSelector
 *   items={tabs}
 *   mobileItems={3}
 *   activeTab={activeTab}
 *   handleTabChange={setActiveTab}
 *   tabOptions={tabOptions}
 *   withMargin={true}
 *   secondary={true}
 * />
 *
 * // With forced dropdown position
 * <MobileTabsSelector
 *   items={tabs}
 *   mobileItems={2}
 *   activeTab={activeTab}
 *   handleTabChange={setActiveTab}
 *   tabOptions={tabOptions}
 *   forceDropdownVerticalPosition="up"
 *   secondary={false}
 * />
 * ```
 *
 * @param {MobileTabsSelectorProps} props - Component props
 * @param {TabItem[]} props.items - Tab items array
 * @param {number} props.mobileItems - Initial mobile visible count
 * @param {number} props.activeTab - Active tab index
 * @param {Function} props.handleTabChange - Tab change handler
 * @param {Array} props.tabOptions - Dropdown options
 * @param {boolean} props.secondary - Secondary styling flag
 * @param {boolean} [props.withMargin] - Add bottom margin
 * @param {("up" | "down")} [props.forceDropdownVerticalPosition] - Dropdown position
 * @returns {JSX.Element} Responsive tab selector with dropdown overflow
 */
export const MobileTabsSelector: FC<MobileTabsSelectorProps> = ({
  withMargin,
  mobileItems,
  items,
  handleTabChange,
  activeTab,
  tabOptions,
  forceDropdownVerticalPosition,
  secondary,
}) => {
  const { width } = useWindowDimensions();

  const [visibleItems, setVisibleItems] = useState<number>(mobileItems);

  useEffect(() => {
    switch (true) {
      case width < 500:
        setVisibleItems(mobileItems || 2);
        break;
      case width < 600:
        setVisibleItems(mobileItems || 3);
        break;
      case width < 650:
        setVisibleItems(4);
        break;
      case width < 780:
        setVisibleItems(5);
        break;
      case width > 780:
        setVisibleItems(items.length);
        break;

      default:
        setVisibleItems(mobileItems);
        break;
    }
  }, [width, mobileItems, items.length]);
  return (
    <div
      className={`${withMargin ? "mb-3" : ""} flex items-center ${secondary ? "h-[32px]" : "h-[40px]"} w-fit gap-0.5 rounded-m border border-borderFaded bg-darker`}
    >
      {items?.slice(0, visibleItems).map((item, index) => (
        <button
          role='tab'
          aria-selected={activeTab === index}
          aria-controls={`panel-${index}`}
          id={`tab-${index}`}
          className={`flex items-center rounded-m border px-1.5 py-1 ${secondary ? "h-[32px]" : "h-[40px]"} text-[13px] font-semibold min-[1050px]:text-[15px] ${activeTab === index ? `z-20 border-border bg-background ${secondary ? "text-text hover:text-text" : "text-primary hover:text-primary"}` : "border-transparent text-grayTextPrimary duration-150 hover:text-text"} ${index === 0 ? "-ml-px" : ""} ${index === visibleItems - 1 ? "-mr-px" : ""}`}
          key={index}
          onClick={() => handleTabChange(index)}
        >
          <div>{item.label}</div>
        </button>
      ))}
      {visibleItems < items.length && (
        <Dropdown
          id={items[activeTab]?.key}
          width='150px'
          label={
            <ChevronDown
              color={activeTab > 1 ? "var(--primary)" : "var(--text)"}
              size={20}
            />
          }
          hideChevron
          options={tabOptions.slice(visibleItems)}
          triggerClassName={`text-primary font-medium  rounded-r-m px-1.5 py-1 ${activeTab >= visibleItems ? "bg-background" : "bg-darker"}`}
          forceVerticalPosition={forceDropdownVerticalPosition}
          closeOnSelect
        />
      )}
    </div>
  );
};
