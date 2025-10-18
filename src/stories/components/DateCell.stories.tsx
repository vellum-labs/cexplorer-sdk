import { DateCell } from "@/ui/dateCell";
import type { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof DateCell> = {
  title: "Components/DateCell",
  component: DateCell,
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    time: {
      description: "ISO timestamp",
      control: "text",
    },
    tabularNums: {
      description: "Use tabular numbers for alignment",
      control: "boolean",
    },
    withoutConvert: {
      description: "Skip UTC to local conversion",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Date cell component that displays relative time (e.g., '2 minutes ago') for blockchain events.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const RecentBlock: Story = {
  render: args => {
    const time = new Date(Date.now() - 2 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const FiveMinutesAgo: Story = {
  render: args => {
    const time = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const OneHourAgo: Story = {
  render: args => {
    const time = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const OneDayAgo: Story = {
  render: args => {
    const time = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const OneWeekAgo: Story = {
  render: args => {
    const time = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const OneMonthAgo: Story = {
  render: args => {
    const time = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const TransactionTimestamp: Story = {
  render: args => {
    const time = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
    className: "text-text-sm text-grayTextPrimary",
  },
};

const EpochEndTime: Story = {
  render: args => {
    const time = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: true,
  },
};

const WithoutTabularNums: Story = {
  render: args => {
    const time = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    return <DateCell {...args} time={time} withoutConvert={true} />;
  },
  args: {
    tabularNums: false,
  },
};

const Undefined: Story = {
  args: {
    time: undefined,
    tabularNums: true,
  },
};

export {
  RecentBlock,
  FiveMinutesAgo,
  OneHourAgo,
  OneDayAgo,
  OneWeekAgo,
  OneMonthAgo,
  TransactionTimestamp,
  EpochEndTime,
  WithoutTabularNums,
  Undefined,
};
