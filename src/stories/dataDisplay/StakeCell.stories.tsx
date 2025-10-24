import type { Meta, StoryObj } from "@storybook/react";
import { StakeCell } from "../../ui/stakeCell";

const meta: Meta<typeof StakeCell> = {
  title: "Data Display/StakeCell",
  component: StakeCell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays Cardano stake amount in ADA with a visual progress bar showing percentage of maximum stake.",
      },
    },
  },
  argTypes: {
    stake: {
      control: "number",
      description:
        "Current stake amount in Lovelace (1 ADA = 1,000,000 Lovelace)",
      table: {
        type: { summary: "number" },
      },
    },
    maxStake: {
      control: "number",
      description: "Maximum stake amount in Lovelace used to calculate percentage",
      table: {
        type: { summary: "number" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-sm'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default stake cell showing 50 million ADA (50% of 100M max)
 */
export const Default: Story = {
  args: {
    stake: 50000000000000, // 50M ADA in Lovelace
    maxStake: 100000000000000, // 100M ADA in Lovelace
  },
};

/**
 * Small stake - 5 million ADA (10% of 50M max)
 */
export const SmallStake: Story = {
  args: {
    stake: 5000000000000, // 5M ADA
    maxStake: 50000000000000, // 50M ADA
  },
};

/**
 * Medium stake - 30 million ADA (33% of 90M max)
 */
export const MediumStake: Story = {
  args: {
    stake: 30000000000000, // 30M ADA
    maxStake: 90000000000000, // 90M ADA
  },
};

/**
 * Large stake - 60 million ADA (75% of 80M max)
 */
export const LargeStake: Story = {
  args: {
    stake: 60000000000000, // 60M ADA
    maxStake: 80000000000000, // 80M ADA
  },
};

/**
 * Nearly saturated pool - 63 million ADA (95% of 66M max)
 */
export const NearlySaturated: Story = {
  args: {
    stake: 63000000000000, // 63M ADA
    maxStake: 66000000000000, // 66M ADA (typical saturation point)
  },
};

/**
 * Small pool - 1 million ADA (5% of 20M max)
 */
export const SmallPool: Story = {
  args: {
    stake: 1000000000000, // 1M ADA
    maxStake: 20000000000000, // 20M ADA
  },
};

/**
 * Minimal stake - 100k ADA (0.2% of 50M max)
 */
export const MinimalStake: Story = {
  args: {
    stake: 100000000000, // 100k ADA
    maxStake: 50000000000000, // 50M ADA
  },
};
