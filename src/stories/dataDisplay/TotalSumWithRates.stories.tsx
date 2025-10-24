import type { Meta, StoryObj } from "@storybook/react";
import { TotalSumWithRates } from "../../ui/totalSumWithRates";

const meta: Meta<typeof TotalSumWithRates> = {
  title: "Data Display/TotalSumWithRates",
  component: TotalSumWithRates,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays an ADA amount with exchange rate conversions to fiat currency and Bitcoin, with tooltips showing full precision values.",
      },
    },
  },
  argTypes: {
    sum: {
      control: "object",
      description:
        "Array containing conversion data: [label, fiat_value, btc_value, unused]",
      table: {
        type: { summary: "[string, number, number, number]" },
      },
    },
    ada: {
      control: "number",
      description: "Amount in lovelace (1 ADA = 1,000,000 lovelace)",
      table: {
        type: { summary: "number" },
      },
    },
    currency: {
      control: "select",
      options: ["usd", "eur", "gbp", "jpy"],
      description: "Currency code for fiat conversion display",
      table: {
        type: { summary: "Currencies" },
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
 * Default display with USD conversion
 */
export const Default: Story = {
  args: {
    sum: ["total", 1234.56, 0.00025, 0],
    ada: 500000000,
    currency: "usd",
  },
};

/**
 * Transaction total with moderate values
 */
export const TransactionTotal: Story = {
  args: {
    sum: ["total", 850.25, 0.00015, 0],
    ada: 340000000,
    currency: "usd",
  },
};

/**
 * Large amount with significant conversions
 */
export const LargeAmount: Story = {
  args: {
    sum: ["total", 125000.789, 0.125, 0],
    ada: 50000000000,
    currency: "usd",
  },
};

/**
 * Small transaction with tiny BTC value
 */
export const SmallTransaction: Story = {
  args: {
    sum: ["total", 12.5, 0.0000025, 0],
    ada: 5000000,
    currency: "usd",
  },
};

/**
 * Block reward example
 */
export const BlockReward: Story = {
  args: {
    sum: ["reward", 450.0, 0.00009, 0],
    ada: 180000000,
    currency: "usd",
  },
};

/**
 * EUR currency conversion
 */
export const EuroCurrency: Story = {
  args: {
    sum: ["total", 1150.75, 0.00022, 0],
    ada: 500000000,
    currency: "eur",
  },
};

/**
 * GBP currency conversion
 */
export const PoundCurrency: Story = {
  args: {
    sum: ["total", 980.5, 0.00019, 0],
    ada: 500000000,
    currency: "gbp",
  },
};

/**
 * Very large amount (treasury or pool value)
 */
export const TreasuryAmount: Story = {
  args: {
    sum: ["total", 2500000.0, 25.5, 0],
    ada: 1000000000000,
    currency: "usd",
  },
};

/**
 * Minimal value with very small BTC amount
 */
export const MinimalValue: Story = {
  args: {
    sum: ["total", 0.5, 0.00000001, 0],
    ada: 200000,
    currency: "usd",
  },
};

/**
 * Staking reward example
 */
export const StakingReward: Story = {
  args: {
    sum: ["reward", 15.75, 0.000003, 0],
    ada: 6300000,
    currency: "usd",
  },
};
