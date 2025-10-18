import { Button } from "@/ui/button";
import { EmptyState } from "@/ui/emptyState";
import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, Database, FileX, Inbox, Search } from "lucide-react";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          "EmptyState displays a friendly message when no data is available, with optional action button.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className='flex min-h-[400px] w-full items-center justify-center bg-background p-4'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    icon: {
      description: "Icon element to display",
    },
    primaryText: {
      control: "text",
      description: "Main heading text",
    },
    secondaryText: {
      control: "text",
      description: "Supporting description text",
    },
    button: {
      description: "Optional action button",
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state with search icon (no results).
 */
export const Default: Story = {
  args: {
    icon: <Search className='h-6 w-6' />,
    primaryText: "No transactions found",
    secondaryText:
      "We couldn't find any transactions matching your search criteria. Try adjusting your filters.",
  },
};

/**
 * Empty state with action button to guide user.
 */
export const WithButton: Story = {
  args: {
    icon: <Inbox className='h-6 w-6' />,
    primaryText: "No delegations yet",
    secondaryText:
      "Start earning rewards by delegating your ADA to a stake pool.",
    button: <Button size='md' variant='tertiary' label='Find a Pool' />,
  },
};

/**
 * Empty database state for uninitialized data.
 */
export const EmptyDatabase: Story = {
  args: {
    icon: <Database className='h-6 w-6' />,
    primaryText: "No data available",
    secondaryText:
      "This section doesn't have any data yet. Check back later or refresh the page.",
  },
};

/**
 * File not found state for missing resources.
 */
export const FileNotFound: Story = {
  args: {
    icon: <FileX className='h-6 w-6' />,
    primaryText: "Block not found",
    secondaryText:
      "The block you're looking for doesn't exist or hasn't been minted yet.",
    button: <Button variant='tertiary' size='md' label='Go to Latest Blocks' />,
  },
};

/**
 * Error state with alert icon.
 */
export const ErrorState: Story = {
  args: {
    icon: <AlertCircle className='h-6 w-6' />,
    primaryText: "Unable to load data",
    secondaryText:
      "Something went wrong while fetching the data. Please try again later.",
    button: <Button size='md' variant='primary' label='Retry' />,
  },
};
