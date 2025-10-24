import type { Meta, StoryObj } from "@storybook/react";
import { TimeDateIndicator } from "../../ui/timeDateIndicator";

const meta: Meta<typeof TimeDateIndicator> = {
  title: "Data Display/TimeDateIndicator",
  component: TimeDateIndicator,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a timestamp with both relative time format and absolute date/time with a clock icon.",
      },
    },
  },
  argTypes: {
    time: {
      control: "text",
      description: "ISO 8601 timestamp string to display",
      table: {
        type: { summary: "string | undefined" },
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
 * Recent timestamp (1 hour ago)
 */
export const RecentTime: Story = {
  args: {
    time: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
};

/**
 * Today's timestamp (5 hours ago)
 */
export const Today: Story = {
  args: {
    time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
};

/**
 * Yesterday's timestamp
 */
export const Yesterday: Story = {
  args: {
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
};

/**
 * Last week's timestamp
 */
export const LastWeek: Story = {
  args: {
    time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

/**
 * Last month's timestamp
 */
export const LastMonth: Story = {
  args: {
    time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
};

/**
 * Specific date from 2024
 */
export const SpecificDate: Story = {
  args: {
    time: "2024-01-15T14:30:00Z",
  },
};

/**
 * Transaction timestamp example
 */
export const TransactionTimestamp: Story = {
  args: {
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
};

/**
 * Block creation time example
 */
export const BlockCreationTime: Story = {
  args: {
    time: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
};

/**
 * Undefined timestamp showing fallback
 */
export const UndefinedTime: Story = {
  args: {
    time: undefined,
  },
};
