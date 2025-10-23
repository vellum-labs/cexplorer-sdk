import { Icon } from "@/ui/icon";
import { OverviewStatCard } from "@/ui/overviewStatCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof OverviewStatCard> = {
  title: "Data Display/OverviewStatCard",
  component: OverviewStatCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Flexible card component for displaying blockchain statistics and metrics with icon, title, prominent value, and optional description and subtitle.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Main title/label for the statistic",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    icon: {
      control: false,
      description: "Icon element displayed in the card header",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    value: {
      control: "text",
      description: "Primary value/statistic displayed prominently",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    description: {
      control: "text",
      description: "Optional description text below the value",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    subTitle: {
      control: "text",
      description: "Optional subtitle in top-right corner",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS classes for card styling",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    titleClassname: {
      control: "text",
      description: "Optional CSS classes for title section",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    fullContentHeight: {
      control: "boolean",
      description: "If true, value section fills available height",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card with basic blockchain statistic
 */
export const Default: Story = {
  args: {
    title: "Total Transactions",
    icon: <Icon name='arrow-right-left' size={16} />,
    value: "1,234,567",
  },
};

/**
 * Card with description showing percentage change
 */
export const WithDescription: Story = {
  args: {
    title: "Transaction Volume",
    icon: <Icon name='trending-up' size={16} />,
    value: "₳ 5,678,901",
    description: "+12.3% from last epoch",
  },
};

/**
 * Card with subtitle showing time period
 */
export const WithSubtitle: Story = {
  args: {
    title: "Active Transactions",
    icon: <Icon name='activity' size={16} />,
    value: "45,678",
    subTitle: "Last 24h",
    description: "+5.2% from yesterday",
  },
};

/**
 * Stake pools statistic with positive change
 */
export const StakePools: Story = {
  args: {
    title: "Active Stake Pools",
    icon: <Icon name='server' size={16} />,
    value: "3,042",
    description: "+12 this epoch",
  },
};

/**
 * Market cap with custom styling
 */
export const MarketCap: Story = {
  args: {
    title: "Market Cap",
    icon: <Icon name='dollar-sign' size={16} />,
    value: "$12.5B",
    description: "+5.2% (24h)",
    className: "border-green-500",
  },
};

/**
 * Epoch information with progress
 */
export const EpochInfo: Story = {
  args: {
    title: "Current Epoch",
    icon: <Icon name='clock' size={16} />,
    value: "478",
    description: "Day 3 of 5",
    subTitle: "65% Complete",
  },
};

/**
 * Network status with custom value element
 */
export const NetworkStatus: Story = {
  args: {
    title: "Network Status",
    icon: <Icon name='activity' size={16} />,
    value: (
      <div className='flex items-center gap-2'>
        <span className='h-3 w-3 rounded-full bg-green-500' />
        <span>Healthy</span>
      </div>
    ),
    fullContentHeight: true,
  },
};
