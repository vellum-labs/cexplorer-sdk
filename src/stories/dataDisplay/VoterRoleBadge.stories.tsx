import type { Meta, StoryObj } from "@storybook/react";
import { VoterRoleBadge } from "../../ui/voterRoleBadge";

const meta: Meta<typeof VoterRoleBadge> = {
  title: "Data Display/VoterRoleBadge",
  component: VoterRoleBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component displaying voter roles in Cardano governance with role-specific icons (DRep, SPO, CC).",
      },
    },
  },
  argTypes: {
    role: {
      control: "select",
      options: ["DRep", "SPO", "CC"],
      description:
        "The voter role type in Cardano governance (DRep, SPO, CC, or other)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "CC" },
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
 * DRep (Delegated Representative) badge with User icon
 */
export const DRep: Story = {
  args: {
    role: "DRep",
  },
};

/**
 * SPO (Stake Pool Operator) badge with Network icon
 */
export const SPO: Story = {
  args: {
    role: "SPO",
  },
};

/**
 * CC (Constitutional Committee) badge with Landmark icon
 */
export const ConstitutionalCommittee: Story = {
  args: {
    role: "CC",
  },
};

/**
 * All voter roles displayed together
 */
export const AllRoles: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <VoterRoleBadge role='DRep' />
        <span className='text-text-sm text-text'>Delegated Representative</span>
      </div>
      <div className='flex items-center gap-2'>
        <VoterRoleBadge role='SPO' />
        <span className='text-text-sm text-text'>Stake Pool Operator</span>
      </div>
      <div className='flex items-center gap-2'>
        <VoterRoleBadge role='CC' />
        <span className='text-text-sm text-text'>Constitutional Committee</span>
      </div>
    </div>
  ),
};

/**
 * Voter roles in a governance proposal vote list
 */
export const InVoteList: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Governance Proposal Votes
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between rounded border-l-4 border-green-500 bg-background p-3'>
          <div className='flex items-center gap-3'>
            <VoterRoleBadge role='DRep' />
            <span className='text-text-sm text-text'>
              drep1abc...def789
            </span>
          </div>
          <span className='text-text-sm font-medium text-green-600'>Yes</span>
        </div>
        <div className='flex items-center justify-between rounded border-l-4 border-green-500 bg-background p-3'>
          <div className='flex items-center gap-3'>
            <VoterRoleBadge role='SPO' />
            <span className='text-text-sm text-text'>
              pool1xyz...abc123
            </span>
          </div>
          <span className='text-text-sm font-medium text-green-600'>Yes</span>
        </div>
        <div className='flex items-center justify-between rounded border-l-4 border-red-500 bg-background p-3'>
          <div className='flex items-center gap-3'>
            <VoterRoleBadge role='CC' />
            <span className='text-text-sm text-text'>
              cc_member1
            </span>
          </div>
          <span className='text-text-sm font-medium text-red-600'>No</span>
        </div>
        <div className='flex items-center justify-between rounded border-l-4 border-green-500 bg-background p-3'>
          <div className='flex items-center gap-3'>
            <VoterRoleBadge role='DRep' />
            <span className='text-text-sm text-text'>
              drep1ghi...jkl456
            </span>
          </div>
          <span className='text-text-sm font-medium text-green-600'>Yes</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Voter roles in a delegation dashboard
 */
export const InDelegationDashboard: Story = {
  render: () => (
    <div className='grid grid-cols-3 gap-4'>
      <div className='rounded-lg border border-border bg-background p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <VoterRoleBadge role='DRep' />
          <span className='text-text-sm text-text-muted'>Active</span>
        </div>
        <h4 className='mb-1 font-semibold text-text'>DRep Delegation</h4>
        <p className='text-text-sm text-text-muted'>
          Delegated to: drep1abc...def
        </p>
        <p className='text-text-sm mt-2 text-text'>1,250,000 ADA</p>
      </div>
      <div className='rounded-lg border border-border bg-background p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <VoterRoleBadge role='SPO' />
          <span className='text-text-sm text-text-muted'>Active</span>
        </div>
        <h4 className='mb-1 font-semibold text-text'>Pool Delegation</h4>
        <p className='text-text-sm text-text-muted'>
          Staking with: [POOL]
        </p>
        <p className='text-text-sm mt-2 text-text'>1,250,000 ADA</p>
      </div>
      <div className='rounded-lg border border-border bg-background p-4 opacity-50'>
        <div className='mb-3 flex items-center justify-between'>
          <VoterRoleBadge role='CC' />
          <span className='text-text-sm text-text-muted'>N/A</span>
        </div>
        <h4 className='mb-1 font-semibold text-text'>CC Member</h4>
        <p className='text-text-sm text-text-muted'>
          Not a CC member
        </p>
      </div>
    </div>
  ),
};

/**
 * Voter roles in a governance activity feed
 */
export const InActivityFeed: Story = {
  render: () => (
    <div className='flex flex-col gap-3 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg mb-2 font-semibold text-text'>
        Recent Governance Activity
      </h3>
      <div className='flex items-start gap-3 border-b border-border pb-3'>
        <VoterRoleBadge role='DRep' />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>drep1abc...def</strong> voted Yes on Proposal #42
          </p>
          <p className='text-text-xs text-text-muted'>2 hours ago</p>
        </div>
      </div>
      <div className='flex items-start gap-3 border-b border-border pb-3'>
        <VoterRoleBadge role='SPO' />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>[POOL] Pool</strong> voted No on Proposal #41
          </p>
          <p className='text-text-xs text-text-muted'>5 hours ago</p>
        </div>
      </div>
      <div className='flex items-start gap-3'>
        <VoterRoleBadge role='CC' />
        <div className='flex-1'>
          <p className='text-text-sm text-text'>
            <strong>CC Member</strong> voted Yes on Proposal #40
          </p>
          <p className='text-text-xs text-text-muted'>1 day ago</p>
        </div>
      </div>
    </div>
  ),
};
