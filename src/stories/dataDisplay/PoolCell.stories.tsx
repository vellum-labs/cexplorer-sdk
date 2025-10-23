import type { Meta, StoryObj } from "@storybook/react";
import { PoolCell } from "../../ui/poolCell";
import type { PoolInfo } from "../../types/poolTypes";

// Mock pool data for stories
const mockPoolWithTicker: PoolInfo = {
  id: "pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
  meta: {
    ticker: "POOL",
    name: "Example Cardano Pool",
    description: "A reliable Cardano staking pool",
    homepage: "https://example.com",
    extended: {
      twitter_handle: "cardanopool",
      telegram_handle: "cardanopool",
    },
  },
};

const mockPoolWithoutTicker: PoolInfo = {
  id: "pool1zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
  meta: {
    ticker: "",
    name: "No Ticker Pool",
    description: "Pool without ticker symbol",
    homepage: "https://example.com",
    extended: null,
  },
};

const mockPoolMinimal: PoolInfo = {
  id: "pool1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  meta: null,
};

const mockPoolWithLongName: PoolInfo = {
  id: "pool1bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  meta: {
    ticker: "LONG",
    name: "This is a Very Long Pool Name That Should Be Displayed Properly",
    description: "Pool with very long name",
    homepage: "https://example.com",
    extended: null,
  },
};

const meta: Meta<typeof PoolCell> = {
  title: "Data Display/PoolCell",
  component: PoolCell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays Cardano staking pool information with icon, ticker, name, and pool ID.",
      },
    },
  },
  argTypes: {
    poolInfo: {
      control: "object",
      description: "Pool information object containing pool details and metadata",
      table: {
        type: { summary: "PoolInfo" },
      },
    },
    poolImageUrl: {
      control: "text",
      description: "URL for the pool's icon/logo image",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    fontSize: {
      control: "text",
      description: "Font size for the pool name/ticker",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'text-sm'" },
      },
    },
    cropPoolHash: {
      control: "boolean",
      description: "Whether to crop/truncate the pool hash",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-md'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pool cell with ticker and name
 */
export const Default: Story = {
  args: {
    poolInfo: mockPoolWithTicker,
    poolImageUrl: "https://via.placeholder.com/32",
  },
};

/**
 * Pool with ticker and social media icons
 */
export const WithSocialIcons: Story = {
  args: {
    poolInfo: mockPoolWithTicker,
    poolImageUrl: "https://via.placeholder.com/32",
  },
};

/**
 * Pool without ticker (shows only name and ID)
 */
export const WithoutTicker: Story = {
  args: {
    poolInfo: mockPoolWithoutTicker,
  },
};

/**
 * Pool without image
 */
export const WithoutImage: Story = {
  args: {
    poolInfo: mockPoolWithTicker,
  },
};

/**
 * Minimal pool with only ID
 */
export const MinimalPool: Story = {
  args: {
    poolInfo: mockPoolMinimal,
  },
};

/**
 * Pool with long name
 */
export const LongName: Story = {
  args: {
    poolInfo: mockPoolWithLongName,
    poolImageUrl: "https://via.placeholder.com/32",
  },
};

/**
 * Pool with full hash (not cropped)
 */
export const FullHash: Story = {
  args: {
    poolInfo: mockPoolWithTicker,
    poolImageUrl: "https://via.placeholder.com/32",
    cropPoolHash: false,
  },
};
