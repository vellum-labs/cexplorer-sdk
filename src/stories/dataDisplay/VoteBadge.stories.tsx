import type { Meta, StoryObj } from "@storybook/react";
import { VoteBadge } from "../../ui/voteBadge";

const meta: Meta<typeof VoteBadge> = {
  title: "Data Display/VoteBadge",
  component: VoteBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component displaying vote decisions in Cardano governance proposals with themed styling and icons (Yes, No, Abstain).",
      },
    },
  },
  argTypes: {
    vote: {
      control: "select",
      options: ["Yes", "No", "Abstain", null],
      description:
        "The vote decision type (Yes, No, Abstain, or null for not voted)",
      table: {
        type: { summary: '"Yes" | "No" | "Abstain" | null' },
        defaultValue: { summary: "null" },
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
 * Yes vote with blue theme and ChevronUp icon
 */
export const Yes: Story = {
  args: {
    vote: "Yes",
  },
};

/**
 * No vote with orange theme and ChevronDown icon
 */
export const No: Story = {
  args: {
    vote: "No",
  },
};

/**
 * Abstain vote with gray theme and Minus icon
 */
export const Abstain: Story = {
  args: {
    vote: "Abstain",
  },
};

/**
 * Not voted state (null)
 */
export const NotVoted: Story = {
  args: {
    vote: null,
  },
};

/**
 * All vote types displayed together
 */
export const AllVotes: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <VoteBadge vote='Yes' />
        <span className='text-text-sm text-text'>Affirmative vote</span>
      </div>
      <div className='flex items-center gap-2'>
        <VoteBadge vote='No' />
        <span className='text-text-sm text-text'>Negative vote</span>
      </div>
      <div className='flex items-center gap-2'>
        <VoteBadge vote='Abstain' />
        <span className='text-text-sm text-text'>Abstain from voting</span>
      </div>
      <div className='flex items-center gap-2'>
        <VoteBadge vote={null} />
        <span className='text-text-sm text-text'>No vote cast</span>
      </div>
    </div>
  ),
};

/**
 * Vote badges in a proposal vote list
 */
export const InVoteList: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Proposal #42 - Treasury Funding
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              drep1abc...def789
            </span>
            <span className='text-text-xs text-text-muted'>
              Delegated Representative
            </span>
          </div>
          <VoteBadge vote='Yes' />
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              pool1xyz...abc123
            </span>
            <span className='text-text-xs text-text-muted'>
              Stake Pool Operator
            </span>
          </div>
          <VoteBadge vote='Yes' />
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              cc_member_1
            </span>
            <span className='text-text-xs text-text-muted'>
              Constitutional Committee
            </span>
          </div>
          <VoteBadge vote='No' />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              drep1ghi...jkl456
            </span>
            <span className='text-text-xs text-text-muted'>
              Delegated Representative
            </span>
          </div>
          <VoteBadge vote='Abstain' />
        </div>
      </div>
    </div>
  ),
};

/**
 * Vote tallies in a results summary
 */
export const VotingSummary: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>Voting Results</h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <VoteBadge vote='Yes' />
            <span className='text-text-sm text-text'>Yes votes</span>
          </div>
          <span className='text-text-lg font-semibold text-text'>
            12,450,000 ADA (62%)
          </span>
        </div>
        <div className='h-2 w-full rounded-full bg-border'>
          <div className='h-full w-[62%] rounded-full bg-[#0094D4]' />
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <VoteBadge vote='No' />
            <span className='text-text-sm text-text'>No votes</span>
          </div>
          <span className='text-text-lg font-semibold text-text'>
            5,200,000 ADA (26%)
          </span>
        </div>
        <div className='h-2 w-full rounded-full bg-border'>
          <div className='h-full w-[26%] rounded-full bg-[#DC6803]' />
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <VoteBadge vote='Abstain' />
            <span className='text-text-sm text-text'>Abstain votes</span>
          </div>
          <span className='text-text-lg font-semibold text-text'>
            2,350,000 ADA (12%)
          </span>
        </div>
        <div className='h-2 w-full rounded-full bg-border'>
          <div className='h-full w-[12%] rounded-full bg-[#475467]' />
        </div>
      </div>
    </div>
  ),
};

/**
 * Vote badges in governance activity feed
 */
export const InActivityFeed: Story = {
  render: () => (
    <div className='flex flex-col gap-3 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg mb-2 font-semibold text-text'>
        Recent Governance Activity
      </h3>
      <div className='flex items-start gap-3 border-b border-border pb-3'>
        <VoteBadge vote='Yes' />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>drep1abc...def</strong> voted on Proposal #42: Treasury
            Funding for Q1
          </p>
          <p className='text-text-xs text-text-muted'>2 hours ago</p>
        </div>
      </div>
      <div className='flex items-start gap-3 border-b border-border pb-3'>
        <VoteBadge vote='No' />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>[POOL] Pool</strong> voted on Proposal #41: Protocol
            Parameter Update
          </p>
          <p className='text-text-xs text-text-muted'>5 hours ago</p>
        </div>
      </div>
      <div className='flex items-start gap-3 border-b border-border pb-3'>
        <VoteBadge vote='Abstain' />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>CC Member</strong> voted on Proposal #40: New Governance
            Framework
          </p>
          <p className='text-text-xs text-text-muted'>1 day ago</p>
        </div>
      </div>
      <div className='flex items-start gap-3'>
        <VoteBadge vote={null} />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>drep1xyz...abc</strong> has not voted on Proposal #39
          </p>
          <p className='text-text-xs text-text-muted'>2 days ago</p>
        </div>
      </div>
    </div>
  ),
};
