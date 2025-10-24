import type { Meta, StoryObj } from "@storybook/react";
import { ViewSwitch } from "../../ui/viewSwitch";

const meta: Meta<typeof ViewSwitch> = {
  title: "Forms & Inputs/ViewSwitch",
  component: ViewSwitch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A toggle control for switching between grid and list view layouts with icon-based UI and persistent state.",
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
 * Default view switch with grid and list options
 */
export const Default: Story = {};

/**
 * View switch in a toolbar context
 */
export const InToolbar: Story = {
  render: () => (
    <div className='flex w-full items-center justify-between rounded-lg border border-border bg-background p-4'>
      <div className='flex items-center gap-2'>
        <span className='text-sm font-medium text-text'>NFT Collection</span>
        <span className='text-xs text-grayTextSecondary'>124 items</span>
      </div>
      <div className='flex items-center gap-2'>
        <button className='rounded border border-border px-3 py-1.5 text-sm text-text hover:bg-gray-100'>
          Filter
        </button>
        <ViewSwitch />
      </div>
    </div>
  ),
};

/**
 * View switch in a page header
 */
export const InPageHeader: Story = {
  render: () => (
    <div className='flex w-full items-center justify-between border-b border-border bg-background p-4'>
      <div>
        <h2 className='text-xl font-semibold text-text'>Stake Pools</h2>
        <p className='text-sm text-grayTextSecondary'>
          Browse active stake pools
        </p>
      </div>
      <ViewSwitch />
    </div>
  ),
};

/**
 * View switch with search and filter controls
 */
export const WithSearchAndFilter: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-4 rounded-lg border border-border bg-background p-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium text-text'>Token Listings</h3>
        <ViewSwitch />
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search tokens...'
          className='flex-1 rounded border border-border px-3 py-2 text-sm'
        />
        <button className='rounded border border-border px-4 py-2 text-sm text-text'>
          All Filters
        </button>
      </div>
    </div>
  ),
};

/**
 * Multiple view switches in a dashboard
 */
export const MultipleSwitches: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3'>
        <span className='text-sm font-medium text-text'>Transactions</span>
        <ViewSwitch />
      </div>
      <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3'>
        <span className='text-sm font-medium text-text'>NFTs</span>
        <ViewSwitch />
      </div>
      <div className='flex items-center justify-between rounded-lg border border-border bg-background p-3'>
        <span className='text-sm font-medium text-text'>Proposals</span>
        <ViewSwitch />
      </div>
    </div>
  ),
};

/**
 * Compact layout with view switch
 */
export const CompactLayout: Story = {
  render: () => (
    <div className='flex w-full items-center justify-end gap-2 rounded border border-border bg-background p-2'>
      <span className='text-xs text-grayTextSecondary'>View as:</span>
      <ViewSwitch />
    </div>
  ),
};
