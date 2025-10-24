import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { FC, ReactNode } from "react";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { MobileTabsSelector, type TabItem } from "../mobileTabsSelector";

/**
 * Props for the Tabs component
 */
export interface TabsProps {
  /**
   * Array of tab items to display (undefined items are filtered out)
   */
  items: (TabItem | undefined)[];
  /**
   * Add horizontal padding to the tabs container
   * @default true
   */
  withPadding?: boolean;
  /**
   * Add vertical margin to the tabs container
   * @default true
   */
  withMargin?: boolean;
  /**
   * Controlled active tab value (by key)
   */
  activeTabValue?: string;
  /**
   * Custom URL parameter name for tab state
   * @default "tab"
   */
  tabParam?: string;
  /**
   * Callback when a tab is clicked
   * @param activeTab - Key of the clicked tab
   */
  onClick?: (activeTab: string) => void;
  /**
   * Align tabs and extra content to the right
   * @default false
   */
  toRight?: boolean;
  /**
   * Extra content to display alongside tabs
   */
  extraContent?: ReactNode;
  /**
   * Force dropdown position on mobile (up or down)
   */
  forceDropdownVerticalPosition?: "up" | "down";
  /**
   * Number of tabs to show on mobile before collapsing to dropdown
   * @default 2
   */
  mobileItemsCount?: number;
  /**
   * Additional CSS classes for the wrapper element
   */
  wrapperClassname?: string;
  /**
   * Allow horizontal scrolling for many tabs
   * @default false
   */
  allowScroll?: boolean;
  /**
   * Whether API data is still loading
   * @default false
   */
  apiLoading?: boolean;
}

/**
 * Tabs provides a full-featured tab navigation system with URL state management.
 *
 * A comprehensive tab component with URL-based state persistence, responsive mobile
 * layout with dropdown overflow, automatic page title updates, and support for lazy
 * content loading. Integrates with TanStack Router for navigation.
 *
 * **Common Use Cases:**
 * - Page section navigation
 * - Data table filters with URL persistence
 * - Multi-view interfaces
 * - Content organization with shareable URLs
 * - Mobile-responsive navigation
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * const tabs = [
 *   {
 *     key: "overview",
 *     label: "Overview",
 *     content: <OverviewSection />,
 *     visible: true,
 *   },
 *   {
 *     key: "transactions",
 *     label: "Transactions",
 *     content: () => <TransactionsSection />, // Lazy content
 *     visible: true,
 *     title: "Transaction History", // For page title
 *   },
 * ];
 *
 * <Tabs items={tabs} />
 *
 * // With custom configuration
 * <Tabs
 *   items={tabs}
 *   withPadding={false}
 *   withMargin={false}
 *   mobileItemsCount={3}
 *   onClick={(key) => console.log("Tab clicked:", key)}
 * />
 *
 * // With scrollable tabs
 * <Tabs
 *   items={manyTabs}
 *   allowScroll={true}
 *   mobileItemsCount={2}
 * />
 *
 * // With custom URL parameter
 * <Tabs
 *   items={tabs}
 *   tabParam="section"
 *   activeTabValue="overview"
 * />
 *
 * // Right-aligned with extra content
 * <Tabs
 *   items={tabs}
 *   toRight={true}
 *   extraContent={<Button>Action</Button>}
 * />
 * ```
 *
 * @param {TabsProps} props - Component props
 * @param {Array<TabItem | undefined>} props.items - Tab items array
 * @param {boolean} [props.withPadding=true] - Add horizontal padding
 * @param {boolean} [props.withMargin=true] - Add vertical margin
 * @param {string} [props.activeTabValue] - Controlled active tab
 * @param {string} [props.tabParam="tab"] - URL parameter name
 * @param {Function} [props.onClick] - Tab click callback
 * @param {boolean} [props.toRight=false] - Right-align tabs
 * @param {ReactNode} [props.extraContent] - Extra content
 * @param {("up" | "down")} [props.forceDropdownVerticalPosition] - Mobile dropdown position
 * @param {number} [props.mobileItemsCount=2] - Mobile visible tabs
 * @param {string} [props.wrapperClassname] - Wrapper CSS classes
 * @param {boolean} [props.allowScroll=false] - Enable horizontal scroll
 * @param {boolean} [props.apiLoading=false] - API loading state
 * @returns {JSX.Element | false} Tab navigation with content panels
 */
export const Tabs: FC<TabsProps> = ({
  items: initialItems,
  withPadding = true,
  withMargin = true,
  toRight = false,
  activeTabValue = "",
  tabParam = "",
  apiLoading = false,
  forceDropdownVerticalPosition,
  onClick,
  mobileItemsCount,
  wrapperClassname,
  allowScroll = false,
}) => {
  const [tabTitle, setTabTitle] = useState("");
  const items = useMemo(
    () =>
      initialItems.filter(
        (item): item is TabItem => item !== undefined && item.visible,
      ),
    [initialItems],
  );
  const { tab, ...rest } = useSearch({ strict: false });

  const initialActiveTab = useMemo(() => {
    const activeIntialTab = initialItems.findIndex(item => item?.key === tab);

    return activeIntialTab !== -1 ? activeIntialTab : 0;
  }, []);

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  useEffect(() => {
    if (
      document?.title === "Cardano Explorer" ||
      document?.title.startsWith("Cexplorer.io")
    )
      return;
    setTabTitle(
      `${document.title.includes("-") ? document.title.replace(/ - [^-]*$/, "") : document.title.replace(" | Cexplorer.io", "")} - ${items[activeTab]?.title || String(items[activeTab]?.label)} | Cexplorer.io`,
    );
  }, [activeTab, items]);

  const navigate = useNavigate();

  const mobileItems = mobileItemsCount ? mobileItemsCount : 2;

  const navigationOptions = (index: number) => {
    const allowedKeys = ["tab"];

    const baseSearch = Object.fromEntries(
      Object.entries({ tab, ...rest }).filter(([key]) =>
        allowedKeys.includes(key),
      ),
    );

    const keyToUse = tabParam || "tab";

    return {
      ...baseSearch,
      [keyToUse]: items[index]?.key,
    };
  };

  const handleTabChange = (index: number) => {
    if (onClick && items[index]?.key) {
      onClick(items[index].key);
    }

    navigate({
      search: navigationOptions(index) as any,
    });
  };

  const tabOptions = items.map((item, index) => ({
    label: (
      <span className={activeTab === index ? "text-primary" : ""}>
        {item.label}
      </span>
    ),
    onClick: () => handleTabChange(index),
  }));

  useLayoutEffect(() => {
    if (apiLoading) {
      return;
    }

    let desiredKey = activeTabValue;
    if (!desiredKey) {
      if (tabParam && rest[tabParam]) {
        desiredKey = rest[tabParam];
      } else {
        desiredKey = tab as string;
      }
    }
    const index = items.findIndex(item => item.key === desiredKey);
    if (index !== -1 && index !== activeTab) {
      setActiveTab(index);
      if (onClick) {
        onClick(items[index].key);
      }
    }
  }, [activeTabValue, rest, tab, apiLoading, items, tabParam]);

  const activeContent = useMemo(() => {
    const content = items[activeTab]?.content;
    return typeof content === "function" ? content() : content;
  }, [items, activeTab]);

  return (
    !apiLoading && (
      <section
        aria-label='Tab Navigation'
        className={`${withMargin ? "my-3" : ""} ${
          toRight ? "items-end" : ""
        } flex w-full max-w-desktop flex-col ${
          withPadding ? "px-mobile md:px-desktop" : ""
        } ${wrapperClassname ? wrapperClassname : ""}`}
      >
        <div
          className={`flex ${tabParam ? "h-[35px]" : "h-[44px]"} w-full justify-between lg:hidden`}
        >
          {items[activeTab]?.extraTitle && toRight
            ? items[activeTab]?.extraTitle
            : ""}
          <MobileTabsSelector
            items={items}
            mobileItems={mobileItems}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            tabOptions={tabOptions}
            forceDropdownVerticalPosition={forceDropdownVerticalPosition}
            withMargin={withMargin}
            secondary={!!tabParam}
          />
        </div>
        <div
          role='tablist'
          className={`${withMargin ? "mb-3" : ""} flex w-full items-center gap-1 ${
            toRight ? "justify-end" : ""
          }`}
        >
          {items[activeTab]?.extraTitle && toRight ? (
            <p className='hidden w-full lg:block'>
              {items[activeTab]?.extraTitle}
            </p>
          ) : (
            ""
          )}
          {allowScroll ? (
            <div className='thin-scrollbar hidden w-full overflow-x-auto overflow-y-hidden lg:block'>
              <div
                className={`flex ${tabParam ? "h-[35px]" : "h-[44px]"} shadow mx-1/2 w-fit items-center gap-1/4 text-nowrap rounded-m border border-borderFaded bg-darker font-medium`}
              >
                {items.map((item, index) => (
                  // @ts-expect-error link
                  <Link
                    key={index}
                    className={`flex items-center rounded-m border px-1.5 py-1 ${
                      tabParam
                        ? "h-[35px]text-text-sm font-semibold"
                        : "h-[44px] text-text-md font-semibold"
                    } ${
                      activeTab === index
                        ? `z-20 border-border bg-background ${
                            tabParam
                              ? "text-text hover:text-text"
                              : "text-primary hover:text-primary"
                          }`
                        : "border-transparent text-grayTextPrimary duration-150 hover:text-text"
                    } ${index === 0 ? "-ml-px" : ""} ${index === items.length - 1 ? "-mr-px" : ""}`}
                    onClick={() => handleTabChange(index)}
                    role='tab'
                    aria-selected={activeTab === index}
                    aria-controls={`panel-${index}`}
                    id={`tab-${index}`}
                    search={navigationOptions(index) as any}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`hidden ${tabParam ? "h-[35px]" : "h-[44px]"} w-fit items-center gap-1/4 text-nowrap rounded-m border border-borderFaded bg-darker font-medium shadow-md lg:flex`}
            >
              {items.map((item, index) => (
                // @ts-expect-error link
                <Link
                  key={index}
                  className={`flex items-center rounded-m border px-1.5 py-1 ${
                    tabParam
                      ? "h-[35px] text-text-sm font-semibold"
                      : "h-[44px] text-text-md font-semibold"
                  } ${
                    activeTab === index
                      ? `z-20 border-border bg-background ${
                          tabParam
                            ? "text-text hover:text-text"
                            : "text-primary hover:text-primary"
                        }`
                      : "border-transparent text-grayTextPrimary duration-150 hover:text-text"
                  } ${index === 0 ? "-ml-px" : ""} ${index === items.length - 1 ? "-mr-px" : ""}`}
                  onClick={() => handleTabChange(index)}
                  role='tab'
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${index}`}
                  id={`tab-${index}`}
                  search={navigationOptions(index) as any}
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}
          {items[activeTab]?.extraTitle && !toRight
            ? items[activeTab]?.extraTitle
            : ""}
        </div>
        {items[activeTab]?.content && (
          <div
            role='tabpanel'
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            aria-live='polite'
            className='w-full'
          >
            {tabTitle && (
              <Helmet>
                <title>{tabTitle}</title>
              </Helmet>
            )}
            {activeContent}
          </div>
        )}
      </section>
    )
  );
};
