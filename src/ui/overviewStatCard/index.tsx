import type { ReactNode } from "react";

/**
 * Props for the OverviewStatCard component
 */
export interface OverviewStatCardProps {
  /**
   * Main title/label for the statistic
   * Displayed in the header section next to the icon
   *
   * @example
   * <OverviewStatCard
   *   title="Total Transactions"
   *   icon={<Icon name="arrow-right-left" size={16} />}
   *   value="1,234,567"
   * />
   */
  title: ReactNode;

  /**
   * Icon element displayed in the card header (left of title)
   * Typically an Icon component representing the statistic type
   *
   * @example
   * <OverviewStatCard
   *   title="Active Wallets"
   *   icon={<Icon name="wallet" size={16} />}
   *   value="456,789"
   * />
   */
  icon: React.ReactNode;

  /**
   * Primary value/statistic displayed prominently
   * Can be a string, number, or any React element
   *
   * @example
   * <OverviewStatCard
   *   title="Total Stake"
   *   icon={<Icon name="coins" size={16} />}
   *   value="₳ 24,589,123,456"
   * />
   */
  value: React.ReactNode;

  /**
   * Optional description text displayed below the value
   * Provides additional context or secondary information
   *
   * @example
   * <OverviewStatCard
   *   title="Market Cap"
   *   icon={<Icon name="trending-up" size={16} />}
   *   value="$12.5B"
   *   description="+5.2% from yesterday"
   * />
   */
  description?: React.ReactNode;

  /**
   * Optional CSS classes to customize card styling
   *
   * @example
   * <OverviewStatCard
   *   title="Blocks"
   *   icon={<Icon name="box" />}
   *   value="8,234,567"
   *   className="border-primary shadow-lg"
   * />
   */
  className?: string;

  /**
   * Optional CSS classes for title section styling
   * Allows customization of the title and icon container
   *
   * @example
   * <OverviewStatCard
   *   title="Epoch"
   *   icon={<Icon name="clock" />}
   *   value="478"
   *   titleClassname="bg-blue-100"
   * />
   */
  titleClassname?: string;

  /**
   * Optional subtitle displayed in the top-right corner
   * Useful for showing time periods, status, or category
   *
   * @example
   * <OverviewStatCard
   *   title="Transactions"
   *   icon={<Icon name="arrow-right-left" />}
   *   value="45,678"
   *   subTitle="Last 24h"
   * />
   */
  subTitle?: string;

  /**
   * If true, the value section expands to fill available height
   * Useful for cards with variable content or when you want vertical centering
   *
   * @example
   * <OverviewStatCard
   *   title="Status"
   *   icon={<Icon name="activity" />}
   *   value={<div className="flex items-center">Active</div>}
   *   fullContentHeight={true}
   * />
   */
  fullContentHeight?: boolean;
}

/**
 * OverviewStatCard displays key blockchain statistics and metrics in a flexible card format.
 *
 * A versatile card component designed for dashboard overviews and statistics panels. It features
 * a header with icon and title, a prominent value display, and optional description and subtitle.
 * The card is responsive and adapts to various content types, making it ideal for showcasing
 * blockchain metrics, network stats, and financial data.
 *
 * **Features:**
 * - Flexible sizing (min height 100px, grows with content)
 * - Responsive layout (shrink/grow with basis 280px)
 * - Theme-aware styling with cardBg background
 * - Optional subtitle in top-right corner
 * - Optional description below value
 * - Customizable title section styling
 * - Full content height option for vertical centering
 * - Shadow and border for visual depth
 *
 * **Layout Structure:**
 * ```
 * ┌─────────────────────────────────┐
 * │ [Icon] Title          Subtitle  │
 * │                                 │
 * │ VALUE (large, bold)             │
 * │                                 │
 * │ Description (optional)          │
 * └─────────────────────────────────┘
 * ```
 *
 * **Common Use Cases:**
 * - Dashboard overview statistics (total transactions, active wallets, blocks)
 * - Network metrics (stake pools, delegators, epoch info)
 * - Financial data (market cap, trading volume, total stake)
 * - Token statistics (supply, holders, transfers)
 * - Performance indicators (TPS, network load, fees)
 * - Pool statistics (pledge, saturation, rewards)
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with blockchain statistic
 * <OverviewStatCard
 *   title="Total Transactions"
 *   icon={<Icon name="arrow-right-left" size={16} />}
 *   value="1,234,567"
 * />
 *
 * // With description and time period
 * <OverviewStatCard
 *   title="Transaction Volume"
 *   icon={<Icon name="trending-up" size={16} />}
 *   value="₳ 5,678,901"
 *   description="+12.3% from last epoch"
 *   subTitle="24h"
 * />
 *
 * // Active stake pools with change indicator
 * <OverviewStatCard
 *   title="Active Stake Pools"
 *   icon={<Icon name="server" size={16} />}
 *   value="3,042"
 *   description={<span className="text-green-500">+12 this epoch</span>}
 * />
 *
 * // Market cap with custom styling
 * <OverviewStatCard
 *   title="Market Cap"
 *   icon={<Icon name="dollar-sign" size={16} />}
 *   value="$12.5B"
 *   description="+5.2% (24h)"
 *   className="border-green-500"
 * />
 *
 * // Epoch information
 * <OverviewStatCard
 *   title="Current Epoch"
 *   icon={<Icon name="clock" size={16} />}
 *   value="478"
 *   description="Day 3 of 5"
 *   subTitle="Progress: 65%"
 * />
 *
 * // With fullContentHeight for centered content
 * <OverviewStatCard
 *   title="Network Status"
 *   icon={<Icon name="activity" size={16} />}
 *   value={
 *     <div className="flex items-center gap-2">
 *       <span className="h-3 w-3 bg-green-500 rounded-full" />
 *       <span>Healthy</span>
 *     </div>
 *   }
 *   fullContentHeight={true}
 * />
 *
 * // Complex value with custom React element
 * <OverviewStatCard
 *   title="Total Stake"
 *   icon={<Icon name="coins" size={16} />}
 *   value={
 *     <div>
 *       <div className="text-2xl">₳ 24.5B</div>
 *       <div className="text-sm text-gray-500">71.2% of circulating</div>
 *     </div>
 *   }
 *   subTitle="Live"
 * />
 *
 * // Dashboard grid layout
 * <div className="grid grid-cols-3 gap-4">
 *   <OverviewStatCard
 *     title="Blocks"
 *     icon={<Icon name="box" />}
 *     value="8,234,567"
 *   />
 *   <OverviewStatCard
 *     title="Transactions"
 *     icon={<Icon name="arrow-right-left" />}
 *     value="45,678,901"
 *   />
 *   <OverviewStatCard
 *     title="Wallets"
 *     icon={<Icon name="wallet" />}
 *     value="4,123,456"
 *   />
 * </div>
 * ```
 *
 * @param {OverviewStatCardProps} props - Component props
 * @param {ReactNode} props.title - Main title/label for the statistic
 * @param {React.ReactNode} props.icon - Icon element displayed in the header
 * @param {React.ReactNode} props.value - Primary value/statistic (displayed prominently)
 * @param {React.ReactNode} [props.description] - Optional description below value
 * @param {string} [props.className] - Optional CSS classes for card styling
 * @param {string} [props.titleClassname] - Optional CSS classes for title section
 * @param {string} [props.subTitle] - Optional subtitle in top-right corner
 * @param {boolean} [props.fullContentHeight] - If true, value section fills available height
 * @returns {JSX.Element} A flexible card displaying a statistic with icon, title, value, and optional metadata
 */
export const OverviewStatCard = ({
  title,
  icon,
  value,
  description,
  className,
  titleClassname,
  subTitle,
  fullContentHeight,
}: OverviewStatCardProps) => {
  return (
    <div
      className={`flex min-h-[100px] shrink grow basis-[280px] flex-col gap-1.5 rounded-l border border-border bg-cardBg px-2 py-1.5 shadow-md ${className}`}
    >
      <div className='flex items-center justify-between'>
        <div
          className={`flex items-center justify-start gap-1 ${titleClassname ? titleClassname : ""}`}
        >
          {icon && (
            <div className='rounded-m border border-border p-1/2'>{icon}</div>
          )}
          <p className='text-text-sm text-grayTextPrimary'>{title}</p>
        </div>
        {subTitle && (
          <p className='text-text-xs text-grayTextPrimary'>{subTitle}</p>
        )}
      </div>
      <div
        className={`text-lg font-semibold ${fullContentHeight ? "h-full" : ""}`}
      >
        {value}
      </div>
      {description && (
        <p className='text-grayText text-text-sm'>{description}</p>
      )}
    </div>
  );
};
