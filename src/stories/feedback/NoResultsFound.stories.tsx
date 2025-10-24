import type { Meta, StoryObj } from "@storybook/react";
import { NoResultsFound } from "../../ui/noResultsFound";

const meta: Meta<typeof NoResultsFound> = {
  title: "Feedback/NoResultsFound",
  component: NoResultsFound,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Simple feedback component that displays when search or filter operations return no results.",
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
 * Default display with search icon and "No results found" text
 */
export const Default: Story = {};

/**
 * In a table context - shows how it appears when table search yields no results
 */
export const InTableContext: Story = {
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full flex-col bg-background p-4'>
        <div className='mb-4 text-sm text-grayTextSecondary'>
          Searched for: "nonexistent transaction"
        </div>
        <div className='rounded-lg border border-border'>
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * In a search results container - typical usage in search interfaces
 */
export const InSearchResults: Story = {
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full flex-col gap-4 bg-background p-6'>
        <h2 className='text-xl font-semibold'>Search Results</h2>
        <div className='flex flex-1 flex-col rounded-lg border border-border p-4'>
          <Story />
        </div>
      </div>
    ),
  ],
};

/**
 * Full width display - shows component behavior in a wide container
 */
export const FullWidth: Story = {
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background'>
        <Story />
      </div>
    ),
  ],
};
