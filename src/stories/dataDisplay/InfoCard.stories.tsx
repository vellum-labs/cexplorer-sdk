import { Icon } from "@/ui/icon";
import { InfoCard } from "@/ui/infoCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InfoCard> = {
  title: "Data Display/InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card component for displaying blockchain statistics and metrics with icon, title, and content area.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title displayed in the card header",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    icon: {
      control: false,
      description: "Icon displayed in the card header (typically Icon component)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    children: {
      control: false,
      description: "Content displayed in the card body",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS classes for custom styling",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
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
 * Default InfoCard with blockchain statistics
 */
export const Default: Story = {
  args: {
    title: "Total Stake",
    icon: <Icon name='coins' size={16} />,
    children: (
      <div className='flex flex-col gap-1'>
        <p className='text-3xl font-bold'>₳ 24,589,123,456</p>
        <p className='text-sm text-gray-500'>32.5B ADA staked</p>
      </div>
    ),
  },
};

/**
 * Card showing active stake pools count
 */
export const StakePools: Story = {
  args: {
    title: "Active Stake Pools",
    icon: <Icon name='server' size={16} />,
    children: (
      <div className='flex flex-col gap-1'>
        <p className='text-3xl font-bold'>3,042</p>
        <p className='text-sm text-green-500'>+12 this epoch</p>
      </div>
    ),
  },
};

/**
 * Card displaying transaction metrics
 */
export const Transactions: Story = {
  args: {
    title: "24h Transactions",
    icon: <Icon name='arrow-right-left' size={16} />,
    children: (
      <div className='flex flex-col gap-1'>
        <p className='text-2xl font-bold'>45,678</p>
        <p className='text-sm text-green-500'>+5.2% from yesterday</p>
      </div>
    ),
  },
};

/**
 * Card with epoch progress information
 */
export const EpochProgress: Story = {
  args: {
    title: "Epoch Progress",
    icon: <Icon name='clock' size={16} />,
    children: (
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-2'>
          <p className='text-xl font-semibold'>Epoch 478</p>
          <div className='h-2 w-full rounded bg-gray-200'>
            <div className='h-2 rounded bg-primary' style={{ width: "65%" }} />
          </div>
        </div>
        <p className='text-sm text-gray-500'>Day 3 of 5 (65% complete)</p>
      </div>
    ),
  },
};

/**
 * Card showing wallet balance
 */
export const WalletBalance: Story = {
  args: {
    title: "Wallet Balance",
    icon: <Icon name='wallet' size={16} />,
    children: (
      <div className='flex flex-col gap-2'>
        <p className='text-2xl font-bold'>₳ 12,456.78</p>
        <div className='flex flex-col gap-1 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Available:</span>
            <span>₳ 10,456.78</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-500'>Rewards:</span>
            <span>₳ 2,000.00</span>
          </div>
        </div>
      </div>
    ),
  },
};

/**
 * Card with custom styling using className
 */
export const CustomStyled: Story = {
  args: {
    title: "Total Blocks",
    icon: <Icon name='box' size={16} />,
    className: "border-primary shadow-lg",
    children: (
      <div className='flex flex-col gap-1'>
        <p className='text-3xl font-bold'>8,234,567</p>
        <p className='text-sm text-gray-500'>Since genesis</p>
      </div>
    ),
  },
};

/**
 * Card with minimal content
 */
export const Minimal: Story = {
  args: {
    title: "Active Wallets",
    icon: <Icon name='users' size={16} />,
    children: <p className='text-3xl font-bold'>4,123,456</p>,
  },
};
