import type { Meta, StoryObj } from "@storybook/react";
import { ActivityBadge } from "../../ui/activityBadge";

const meta: Meta<typeof ActivityBadge> = {
  title: "Data Display/ActivityBadge",
  component: ActivityBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A color-coded badge component displaying activity percentages with automatic theme-aware styling based on activity level thresholds.",
      },
    },
  },
  argTypes: {
    percentage: {
      control: { type: "range", min: 0, max: 100, step: 0.1 },
      description:
        "Activity percentage value (0-100). Determines color: 0-49% = red (low), 50-89% = yellow (medium), 90-100% = green (high)",
      table: {
        type: { summary: "number" },
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
 * Default badge with medium activity level
 */
export const Default: Story = {
  args: {
    percentage: 67.5,
  },
};

/**
 * Low activity level (0-49%) - displays with red styling
 */
export const LowActivity: Story = {
  args: {
    percentage: 25.5,
  },
};

/**
 * Medium activity level (50-89%) - displays with yellow/amber styling
 */
export const MediumActivity: Story = {
  args: {
    percentage: 75.2,
  },
};

/**
 * High activity level (90-100%) - displays with green styling
 */
export const HighActivity: Story = {
  args: {
    percentage: 95.8,
  },
};

/**
 * Showcase of all activity levels at threshold boundaries
 */
export const ActivityLevels: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Zero (0%):</span>
        <ActivityBadge percentage={0} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Low (25%):</span>
        <ActivityBadge percentage={25} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Threshold (49%):</span>
        <ActivityBadge percentage={49} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Medium (50%):</span>
        <ActivityBadge percentage={50} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Medium (75%):</span>
        <ActivityBadge percentage={75} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Threshold (89%):</span>
        <ActivityBadge percentage={89} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>High (90%):</span>
        <ActivityBadge percentage={90} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-32 text-sm text-foreground'>Perfect (100%):</span>
        <ActivityBadge percentage={100} />
      </div>
    </div>
  ),
};

/**
 * Real-world blockchain use cases with realistic percentages
 */
export const BlockchainUseCases: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <span className='w-48 text-sm text-foreground'>Pool Performance:</span>
        <ActivityBadge percentage={92.45} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-48 text-sm text-foreground'>DRep Voting Rate:</span>
        <ActivityBadge percentage={67.89} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-48 text-sm text-foreground'>Proposal Engagement:</span>
        <ActivityBadge percentage={43.2} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-48 text-sm text-foreground'>Block Production:</span>
        <ActivityBadge percentage={98.75} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-48 text-sm text-foreground'>Validator Uptime:</span>
        <ActivityBadge percentage={99.99} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-48 text-sm text-foreground'>Network Participation:</span>
        <ActivityBadge percentage={54.67} />
      </div>
    </div>
  ),
};

/**
 * Stake pool activity examples
 */
export const StakePoolActivity: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <span className='w-40 text-sm text-foreground'>Excellent Pool:</span>
        <ActivityBadge percentage={96.5} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-40 text-sm text-foreground'>Good Pool:</span>
        <ActivityBadge percentage={78.3} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-40 text-sm text-foreground'>Concerning Pool:</span>
        <ActivityBadge percentage={35.8} />
      </div>
      <div className='flex items-center gap-3'>
        <span className='w-40 text-sm text-foreground'>Inactive Pool:</span>
        <ActivityBadge percentage={12.1} />
      </div>
    </div>
  ),
};

/**
 * Precise decimal values
 */
export const DecimalPrecision: Story = {
  render: () => (
    <div className='flex flex-wrap gap-3'>
      <ActivityBadge percentage={99.99} />
      <ActivityBadge percentage={87.654} />
      <ActivityBadge percentage={50.001} />
      <ActivityBadge percentage={49.999} />
      <ActivityBadge percentage={12.345} />
      <ActivityBadge percentage={0.01} />
    </div>
  ),
};
