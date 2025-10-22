import type { ReactNode } from "react";

/**
 * Props for the InfoCard component
 */
export interface InfoCardProps {
  /**
   * Title displayed in the card header
   * Can be a string or any React node
   *
   * @example
   * <InfoCard title="Total Stake" icon={<Icon name="coins" />}>
   *   <p>₳ 1,234,567</p>
   * </InfoCard>
   */
  title: ReactNode;

  /**
   * Icon displayed in the card header (left of title)
   * Typically an Icon component
   *
   * @example
   * <InfoCard title="Active Pools" icon={<Icon name="server" size={16} />}>
   *   <p>3,042</p>
   * </InfoCard>
   */
  icon: ReactNode;

  /**
   * Content displayed in the card body
   * Can contain any React elements (text, charts, lists, etc.)
   *
   * @example
   * <InfoCard title="Stats" icon={<Icon name="bar-chart" />}>
   *   <div>
   *     <p>Transactions: 1,234</p>
   *     <p>Volume: ₳ 5,678,901</p>
   *   </div>
   * </InfoCard>
   */
  children: ReactNode;

  /**
   * Optional additional CSS classes to customize card styling
   *
   * @example
   * <InfoCard title="Custom" icon={<Icon name="info" />} className="shadow-lg">
   *   <p>Custom styled card</p>
   * </InfoCard>
   */
  className?: string;
}

/**
 * InfoCard displays blockchain statistics and metrics in a consistent card format.
 *
 * A versatile card component designed to showcase blockchain data, statistics, and metrics
 * with a consistent layout. Each card includes a header with an icon and title, followed by
 * customizable content area. The component uses theme-aware styling and adapts to dark/light modes.
 *
 * **Features:**
 * - Fixed height (230px) for consistent grid layouts
 * - Theme-aware background and borders
 * - Flexible content area (accepts any React elements)
 * - Icon + title header layout
 * - Responsive and grows to fill available space
 *
 * **Common Use Cases:**
 * - Display blockchain statistics (total stake, active pools, epoch info)
 * - Show wallet information (balance, rewards, delegations)
 * - Present transaction metrics (volume, count, fees)
 * - Dashboard overview cards
 * - Data visualization containers (charts, graphs)
 * - Pool information displays
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with blockchain stats
 * <InfoCard
 *   title="Total Stake"
 *   icon={<Icon name="coins" size={16} />}
 * >
 *   <div className="text-2xl font-bold">₳ 24,589,123,456</div>
 *   <p className="text-sm text-muted">32.5B ADA</p>
 * </InfoCard>
 *
 * // Pool statistics
 * <InfoCard
 *   title="Active Stake Pools"
 *   icon={<Icon name="server" size={16} />}
 * >
 *   <p className="text-3xl">3,042</p>
 *   <p className="text-sm">+12 this epoch</p>
 * </InfoCard>
 *
 * // Transaction metrics
 * <InfoCard
 *   title="24h Transactions"
 *   icon={<Icon name="arrow-right-left" size={16} />}
 * >
 *   <div>
 *     <p className="text-xl">45,678</p>
 *     <p className="text-sm text-green-500">+5.2% from yesterday</p>
 *   </div>
 * </InfoCard>
 *
 * // With custom styling
 * <InfoCard
 *   title="Epoch Progress"
 *   icon={<Icon name="clock" size={16} />}
 *   className="border-primary shadow-md"
 * >
 *   <div className="flex flex-col gap-2">
 *     <div className="w-full bg-gray-200 rounded h-2">
 *       <div className="bg-primary h-2 rounded" style={{ width: "65%" }} />
 *     </div>
 *     <p>Day 3 of 5</p>
 *   </div>
 * </InfoCard>
 *
 * // Multiple cards in a grid
 * <div className="grid grid-cols-3 gap-4">
 *   <InfoCard title="Blocks" icon={<Icon name="box" />}>
 *     <p>8,234,567</p>
 *   </InfoCard>
 *   <InfoCard title="Wallets" icon={<Icon name="wallet" />}>
 *     <p>4,123,456</p>
 *   </InfoCard>
 *   <InfoCard title="Assets" icon={<Icon name="coins" />}>
 *     <p>9,876,543</p>
 *   </InfoCard>
 * </div>
 * ```
 *
 * @param {InfoCardProps} props - Component props
 * @param {ReactNode} props.title - Title text or element displayed in card header
 * @param {ReactNode} props.icon - Icon element displayed before title (typically Icon component)
 * @param {ReactNode} props.children - Content displayed in card body
 * @param {string} [props.className] - Optional CSS classes for custom styling
 * @returns {JSX.Element} A themed card with icon, title header and content area
 */
export const InfoCard = ({
  title,
  icon,
  children,
  className,
}: InfoCardProps) => {
  return (
    <section
      className={`flex h-[230px] grow flex-col gap-2 rounded-l border border-border bg-cardBg px-3 py-2 ${className}`}
    >
      <div className='flex items-center gap-2'>
        <div className='rounded-m border border-border p-1/2'>{icon}</div>
        <p className='text-text-sm'>{title}</p>
      </div>
      {children}
    </section>
  );
};
