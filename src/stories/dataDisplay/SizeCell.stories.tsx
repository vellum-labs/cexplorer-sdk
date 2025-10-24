import type { Meta, StoryObj } from "@storybook/react";
import { SizeCell } from "../../ui/sizeCell";

const meta: Meta<typeof SizeCell> = {
  title: "Data Display/SizeCell",
  component: SizeCell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays file or data size with a visual progress bar showing percentage of maximum size.",
      },
    },
  },
  argTypes: {
    maxSize: {
      control: "number",
      description: "Maximum size value in bytes used to calculate percentage",
      table: {
        type: { summary: "number" },
      },
    },
    size: {
      control: "number",
      description: "Current size value in bytes to display",
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
 * Default size cell showing 50% utilization
 */
export const Default: Story = {
  args: {
    maxSize: 1024000, // 1000 kB
    size: 512000, // 500 kB (50%)
  },
};

/**
 * Small file - 10% of max size
 */
export const SmallSize: Story = {
  args: {
    maxSize: 1024000, // 1000 kB
    size: 102400, // 100 kB (10%)
  },
};

/**
 * Medium file - 33% of max size
 */
export const MediumSize: Story = {
  args: {
    maxSize: 1024000, // 1000 kB
    size: 337920, // 330 kB (33%)
  },
};

/**
 * Large file - 75% of max size
 */
export const LargeSize: Story = {
  args: {
    maxSize: 1024000, // 1000 kB
    size: 768000, // 750 kB (75%)
  },
};

/**
 * Nearly full - 95% of max size
 */
export const NearlyFull: Story = {
  args: {
    maxSize: 1024000, // 1000 kB
    size: 972800, // 950 kB (95%)
  },
};

/**
 * Very small - less than 1% of max size
 */
export const VerySmall: Story = {
  args: {
    maxSize: 1024000, // 1000 kB
    size: 5120, // 5 kB (0.5%)
  },
};

/**
 * Block size example - typical Cardano block
 */
export const BlockSize: Story = {
  args: {
    maxSize: 90112, // Max block size in bytes (88 kB)
    size: 65536, // 64 kB (72.8%)
  },
};
