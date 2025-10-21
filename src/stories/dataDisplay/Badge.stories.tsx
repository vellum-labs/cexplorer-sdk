import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../../ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A versatile component for displaying labels, statuses, and categorizations with multiple color variants.",
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["red", "yellow", "blue", "purple", "gray", "green", "light", "none"],
      description: "Color variant of the badge",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "blue" },
      },
    },
    children: {
      control: "text",
      description: "Content to display inside the badge",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    rounded: {
      control: "boolean",
      description: "Whether to use fully rounded corners (pill shape)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    small: {
      control: "boolean",
      description: "Whether to render a smaller, compact version",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS class name for additional styling",
      table: {
        type: { summary: "string" },
      },
    },
    style: {
      control: "object",
      description: "Optional inline styles",
      table: {
        type: { summary: "React.CSSProperties" },
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
 * Default badge with blue color
 */
export const Default: Story = {
  args: {
    color: "blue",
    children: "Default",
  },
};

/**
 * All color variants showcased together
 */
export const AllColors: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge color="red">Red</Badge>
      <Badge color="yellow">Yellow</Badge>
      <Badge color="blue">Blue</Badge>
      <Badge color="purple">Purple</Badge>
      <Badge color="gray">Gray</Badge>
      <Badge color="green">Green</Badge>
      <Badge color="light">Light</Badge>
      <Badge color="none">None</Badge>
    </div>
  ),
};

/**
 * Transaction status badges
 */
export const TransactionStatus: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge color="green">Confirmed</Badge>
      <Badge color="yellow">Pending</Badge>
      <Badge color="blue">Processing</Badge>
      <Badge color="red">Failed</Badge>
    </div>
  ),
};

/**
 * Stake pool status indicators
 */
export const PoolStatus: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge color="green">Active</Badge>
      <Badge color="gray">Retired</Badge>
      <Badge color="yellow">Saturated</Badge>
      <Badge color="blue">Available</Badge>
    </div>
  ),
};

/**
 * Small badges for counters and compact indicators
 */
export const SmallBadges: Story = {
  render: () => (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-1'>
        <span className='text-foreground'>Notifications</span>
        <Badge color="red" small>
          5
        </Badge>
      </div>
      <div className='flex items-center gap-1'>
        <span className='text-foreground'>Messages</span>
        <Badge color="blue" small>
          12
        </Badge>
      </div>
      <div className='flex items-center gap-1'>
        <span className='text-foreground'>Updates</span>
        <Badge color="green" small>
          3
        </Badge>
      </div>
    </div>
  ),
};

/**
 * Network and protocol labels
 */
export const NetworkLabels: Story = {
  render: () => (
    <div className='flex flex-wrap gap-2'>
      <Badge color="purple">Mainnet</Badge>
      <Badge color="blue">Testnet</Badge>
      <Badge color="yellow">Preview</Badge>
      <Badge color="gray">Pre-Production</Badge>
    </div>
  ),
};

/**
 * Badges with different rounded settings
 */
export const RoundedVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <span className='w-32 text-sm text-foreground'>Fully rounded:</span>
        <Badge color="blue" rounded={true}>
          Pill Shape
        </Badge>
      </div>
      <div className='flex items-center gap-2'>
        <span className='w-32 text-sm text-foreground'>Standard rounded:</span>
        <Badge color="blue" rounded={false}>
          Standard
        </Badge>
      </div>
    </div>
  ),
};
