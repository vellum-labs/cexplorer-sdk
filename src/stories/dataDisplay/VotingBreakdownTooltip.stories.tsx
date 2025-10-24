import type { Meta, StoryObj } from "@storybook/react";
import { VotingBreakdownTooltip } from "../../ui/votingBreakdownTooltip";

const meta: Meta<typeof VotingBreakdownTooltip> = {
  title: "Data Display/VotingBreakdownTooltip",
  component: VotingBreakdownTooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays detailed voting breakdown information in a tooltip with an info icon, including voters, delegators, and stake distribution.",
      },
    },
  },
  argTypes: {
    voters: {
      control: "number",
      description: "Number of voters who cast this vote",
      table: {
        type: { summary: "number" },
      },
    },
    delegators: {
      control: "number",
      description: "Number of delegators or stake pools represented",
      table: {
        type: { summary: "number" },
      },
    },
    autoStake: {
      control: "number",
      description: "Automatic abstention stake (Abstain only)",
      table: {
        type: { summary: "number" },
      },
    },
    manualStake: {
      control: "number",
      description: "Manual abstention stake (Abstain only)",
      table: {
        type: { summary: "number" },
      },
    },
    type: {
      control: "select",
      options: ["Abstain", "No confidence", "Yes", "No", "Not voted"],
      description: "Type of vote this breakdown represents",
      table: {
        type: {
          summary: '"Abstain" | "No confidence" | "Yes" | "No" | "Not voted"',
        },
      },
    },
    voterType: {
      control: "select",
      options: ["drep", "spo"],
      description: "Type of voter (DRep or SPO)",
      table: {
        type: { summary: '"drep" | "spo"' },
        defaultValue: { summary: '"drep"' },
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
 * Basic DRep "Yes" vote breakdown
 */
export const YesVote: Story = {
  args: {
    voters: 125,
    delegators: 3500,
    type: "Yes",
    voterType: "drep",
  },
};

/**
 * DRep "No" vote breakdown
 */
export const NoVote: Story = {
  args: {
    voters: 45,
    delegators: 1200,
    type: "No",
    voterType: "drep",
  },
};

/**
 * "Abstain" vote with auto and manual stake breakdown
 */
export const AbstainVote: Story = {
  args: {
    voters: 50,
    delegators: 1200,
    type: "Abstain",
    autoStake: 1500000,
    manualStake: 500000,
    voterType: "drep",
  },
};

/**
 * "No confidence" vote breakdown
 */
export const NoConfidenceVote: Story = {
  args: {
    voters: 30,
    delegators: 800,
    type: "No confidence",
    voterType: "drep",
  },
};

/**
 * SPO voting breakdown (shows "stake pools" instead of "delegators")
 */
export const SPOVoting: Story = {
  args: {
    voters: 30,
    delegators: 45,
    type: "Yes",
    voterType: "spo",
  },
};

/**
 * Single voter (demonstrates singular form)
 */
export const SingleVoter: Story = {
  args: {
    voters: 1,
    delegators: 15,
    type: "Yes",
    voterType: "drep",
  },
};

/**
 * Single delegator (demonstrates singular form)
 */
export const SingleDelegator: Story = {
  args: {
    voters: 5,
    delegators: 1,
    type: "No",
    voterType: "drep",
  },
};

/**
 * Large numbers example
 */
export const LargeNumbers: Story = {
  args: {
    voters: 5280,
    delegators: 125000,
    type: "Yes",
    voterType: "drep",
  },
};

/**
 * In context: voting results display
 */
export const InVotingResults: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-3 rounded-lg border border-border bg-background p-4'>
      <h3 className='text-lg font-semibold text-text'>
        Proposal #123 - Voting Results
      </h3>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between rounded border border-border p-3'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-green-600'>Yes</span>
            <VotingBreakdownTooltip
              voters={125}
              delegators={3500}
              type='Yes'
            />
          </div>
          <span className='text-sm text-grayTextSecondary'>125 votes</span>
        </div>
        <div className='flex items-center justify-between rounded border border-border p-3'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-red-600'>No</span>
            <VotingBreakdownTooltip voters={45} delegators={1200} type='No' />
          </div>
          <span className='text-sm text-grayTextSecondary'>45 votes</span>
        </div>
        <div className='flex items-center justify-between rounded border border-border p-3'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-gray-600'>Abstain</span>
            <VotingBreakdownTooltip
              voters={50}
              delegators={1200}
              type='Abstain'
              autoStake={1500000}
              manualStake={500000}
            />
          </div>
          <span className='text-sm text-grayTextSecondary'>50 votes</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * SPO voting results context
 */
export const SPOVotingContext: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-3 rounded-lg border border-border bg-background p-4'>
      <h3 className='text-lg font-semibold text-text'>
        SPO Voting - Parameter Change
      </h3>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between rounded border border-border p-3'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-green-600'>Approve</span>
            <VotingBreakdownTooltip
              voters={30}
              delegators={45}
              type='Yes'
              voterType='spo'
            />
          </div>
          <span className='text-sm text-grayTextSecondary'>
            30 pool operators
          </span>
        </div>
        <div className='flex items-center justify-between rounded border border-border p-3'>
          <div className='flex items-center gap-2'>
            <span className='font-medium text-red-600'>Reject</span>
            <VotingBreakdownTooltip
              voters={12}
              delegators={18}
              type='No'
              voterType='spo'
            />
          </div>
          <span className='text-sm text-grayTextSecondary'>
            12 pool operators
          </span>
        </div>
      </div>
    </div>
  ),
};
