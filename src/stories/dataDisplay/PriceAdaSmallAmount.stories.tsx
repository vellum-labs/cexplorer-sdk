import type { Meta, StoryObj } from "@storybook/react";
import { PriceAdaSmallAmount } from "../../ui/priceAdaSmallAmount";

const meta: Meta<typeof PriceAdaSmallAmount> = {
  title: "Data Display/PriceAdaSmallAmount",
  component: PriceAdaSmallAmount,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays ADA prices with subscript notation for very small amounts, automatically converting from lovelace to ADA.",
      },
    },
  },
  argTypes: {
    price: {
      control: "number",
      description:
        "Price value in lovelace (1 ADA = 1,000,000 lovelace). Accepts number, undefined, or null.",
      table: {
        type: { summary: "number | undefined | null" },
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
 * Very small price showing subscript notation (0.00025 ADA)
 */
export const VerySmallPrice: Story = {
  args: {
    price: 250,
  },
};

/**
 * Tiny price with many leading zeros (0.0000012 ADA)
 */
export const TinyPrice: Story = {
  args: {
    price: 1.2,
  },
};

/**
 * Small token price (0.0125 ADA)
 */
export const SmallTokenPrice: Story = {
  args: {
    price: 12500,
  },
};

/**
 * Price just below threshold (0.009 ADA)
 */
export const BelowThreshold: Story = {
  args: {
    price: 9000,
  },
};

/**
 * Price at threshold boundary (0.01 ADA)
 */
export const AtThreshold: Story = {
  args: {
    price: 10000,
  },
};

/**
 * Normal price above threshold (0.15 ADA)
 */
export const NormalPrice: Story = {
  args: {
    price: 150000,
  },
};

/**
 * Standard ADA amount (1.5 ADA)
 */
export const StandardAmount: Story = {
  args: {
    price: 1500000,
  },
};

/**
 * Large ADA amount (100 ADA)
 */
export const LargeAmount: Story = {
  args: {
    price: 100000000,
  },
};

/**
 * Null price showing fallback display
 */
export const NullPrice: Story = {
  args: {
    price: null,
  },
};

/**
 * Zero price
 */
export const ZeroPrice: Story = {
  args: {
    price: 0,
  },
};
