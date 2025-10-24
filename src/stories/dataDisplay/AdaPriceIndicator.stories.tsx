import type { Meta, StoryObj } from "@storybook/react";
import { AdaPriceIndicator } from "../../ui/adaPriceIndicator";

const meta: Meta<typeof AdaPriceIndicator> = {
  title: "Data Display/AdaPriceIndicator",
  component: AdaPriceIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays the current ADA price with 24-hour change indicator. Color-coded badge shows positive (green), negative (red), or minimal (yellow) price changes.",
      },
    },
  },
  argTypes: {
    price: {
      control: "object",
      description: "ADA price data with 24h change information",
      table: {
        type: {
          summary:
            "{ todayValue: number, adaToSats: number, today: string, yesterday: string, percentChange: number }",
        },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[200px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Positive price change (>1%) displays in green
 */
export const PositiveChange: Story = {
  args: {
    price: {
      todayValue: 0.45,
      adaToSats: 1250,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: 5.2,
    },
  },
};

/**
 * Negative price change (<-1%) displays in red
 */
export const NegativeChange: Story = {
  args: {
    price: {
      todayValue: 0.38,
      adaToSats: 1050,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: -3.5,
    },
  },
};

/**
 * Minimal price change (-1% to 1%) displays in yellow
 */
export const MinimalChange: Story = {
  args: {
    price: {
      todayValue: 0.42,
      adaToSats: 1180,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: 0.5,
    },
  },
};

/**
 * Small negative change in yellow range
 */
export const SmallNegativeChange: Story = {
  args: {
    price: {
      todayValue: 0.41,
      adaToSats: 1160,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: -0.8,
    },
  },
};

/**
 * Large positive price movement
 */
export const LargePositiveChange: Story = {
  args: {
    price: {
      todayValue: 0.58,
      adaToSats: 1620,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: 12.5,
    },
  },
};

/**
 * Large negative price movement
 */
export const LargeNegativeChange: Story = {
  args: {
    price: {
      todayValue: 0.32,
      adaToSats: 890,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: -15.3,
    },
  },
};

/**
 * Zero change (boundary case)
 */
export const ZeroChange: Story = {
  args: {
    price: {
      todayValue: 0.43,
      adaToSats: 1200,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: 0.0,
    },
  },
};

/**
 * N/A state when price data is unavailable
 */
export const NotAvailable: Story = {
  args: {
    price: {
      todayValue: undefined,
      adaToSats: undefined,
      today: undefined,
      yesterday: undefined,
      percentChange: undefined,
    },
  },
};

/**
 * High price with many satoshis
 */
export const HighPrice: Story = {
  args: {
    price: {
      todayValue: 1.25,
      adaToSats: 3500,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: 8.7,
    },
  },
};

/**
 * Low price with few satoshis
 */
export const LowPrice: Story = {
  args: {
    price: {
      todayValue: 0.15,
      adaToSats: 420,
      today: "2024-10-24",
      yesterday: "2024-10-23",
      percentChange: -2.1,
    },
  },
};
