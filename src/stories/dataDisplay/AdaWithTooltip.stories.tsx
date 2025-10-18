import { AdaWithTooltip } from "@/ui/adaWithTooltip";
import type { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof AdaWithTooltip> = {
  title: "Data Display/AdaWithTooltip",
  component: AdaWithTooltip,
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Amount in lovelace",
      control: "number",
    },
    tooltip: {
      description: "Show tooltip with exact value",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Component for displaying ADA amounts with tooltip showing exact lovelace value and copy functionality.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const SmallAmount: Story = {
  args: {
    data: 1000000,
    tooltip: true,
  },
};

const MediumAmount: Story = {
  args: {
    data: 50000000,
    tooltip: true,
  },
};

const LargeAmount: Story = {
  args: {
    data: 1000000000,
    tooltip: true,
  },
};

const VeryLargeAmount: Story = {
  args: {
    data: 45000000000000,
    tooltip: true,
  },
};

const TransactionFee: Story = {
  args: {
    data: 170000,
    tooltip: true,
  },
};

const StakingReward: Story = {
  args: {
    data: 2500000,
    tooltip: true,
  },
};

const PoolDeposit: Story = {
  args: {
    data: 500000000,
    tooltip: true,
  },
};

const TreasuryAmount: Story = {
  args: {
    data: 750000000000,
    tooltip: true,
  },
};

const WithoutTooltip: Story = {
  args: {
    data: 25000000,
    tooltip: false,
  },
};

const ZeroAmount: Story = {
  args: {
    data: 0,
    tooltip: true,
  },
};

export {
  SmallAmount,
  MediumAmount,
  LargeAmount,
  VeryLargeAmount,
  TransactionFee,
  StakingReward,
  PoolDeposit,
  TreasuryAmount,
  WithoutTooltip,
  ZeroAmount,
};
