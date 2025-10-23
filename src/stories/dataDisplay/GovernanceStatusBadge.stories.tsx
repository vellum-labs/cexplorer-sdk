import type { Meta, StoryObj } from "@storybook/react";
import { GovernanceStatusBadge } from "../../ui/governanceStatusBadge";

const meta: Meta<typeof GovernanceStatusBadge> = {
  title: "Data Display/GovernanceStatusBadge",
  component: GovernanceStatusBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component displaying the status of Cardano governance actions with colored pulse indicators (Active, Ratified, Enacted, Expired).",
      },
    },
  },
  argTypes: {
    item: {
      control: "object",
      description:
        "Governance action with epoch information (ratified_epoch, enacted_epoch, expired_epoch, dropped_epoch)",
      table: {
        type: { summary: "GovernanceEpochs" },
      },
    },
    currentEpoch: {
      control: "number",
      description: "Current epoch number for status calculation",
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
 * Active status - proposal is currently open for voting (green with animated pulse)
 */
export const Active: Story = {
  args: {
    item: {
      ratified_epoch: null,
      enacted_epoch: null,
      expired_epoch: null,
      dropped_epoch: null,
    },
    currentEpoch: 450,
  },
};

/**
 * Ratified status - proposal approved, waiting for enactment (blue)
 */
export const Ratified: Story = {
  args: {
    item: {
      ratified_epoch: 448,
      enacted_epoch: 455,
      expired_epoch: null,
      dropped_epoch: null,
    },
    currentEpoch: 450,
  },
};

/**
 * Enacted status - proposal successfully executed (indigo)
 */
export const Enacted: Story = {
  args: {
    item: {
      ratified_epoch: 448,
      enacted_epoch: 450,
      expired_epoch: null,
      dropped_epoch: null,
    },
    currentEpoch: 452,
  },
};

/**
 * Expired status - proposal expired without enactment (orange)
 */
export const Expired: Story = {
  args: {
    item: {
      ratified_epoch: null,
      enacted_epoch: null,
      expired_epoch: 449,
      dropped_epoch: null,
    },
    currentEpoch: 450,
  },
};

/**
 * All status types displayed together
 */
export const AllStatuses: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <GovernanceStatusBadge
          item={{
            ratified_epoch: null,
            enacted_epoch: null,
            expired_epoch: null,
            dropped_epoch: null,
          }}
          currentEpoch={450}
        />
        <span className='text-text-sm text-text'>
          Currently open for voting
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <GovernanceStatusBadge
          item={{
            ratified_epoch: 448,
            enacted_epoch: 455,
            expired_epoch: null,
            dropped_epoch: null,
          }}
          currentEpoch={450}
        />
        <span className='text-text-sm text-text'>
          Approved, waiting for enactment
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <GovernanceStatusBadge
          item={{
            ratified_epoch: 448,
            enacted_epoch: 450,
            expired_epoch: null,
            dropped_epoch: null,
          }}
          currentEpoch={452}
        />
        <span className='text-text-sm text-text'>Successfully executed</span>
      </div>
      <div className='flex items-center gap-2'>
        <GovernanceStatusBadge
          item={{
            ratified_epoch: null,
            enacted_epoch: null,
            expired_epoch: 449,
            dropped_epoch: null,
          }}
          currentEpoch={450}
        />
        <span className='text-text-sm text-text'>
          Expired without enactment
        </span>
      </div>
    </div>
  ),
};

/**
 * Status badges in governance proposal list
 */
export const InProposalList: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Governance Proposals
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              Proposal #42: Treasury Funding Q1
            </span>
            <span className='text-text-xs text-text-muted'>
              Submitted: Epoch 445
            </span>
          </div>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: null,
              enacted_epoch: null,
              expired_epoch: null,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              Proposal #41: Protocol Parameter Update
            </span>
            <span className='text-text-xs text-text-muted'>
              Submitted: Epoch 440
            </span>
          </div>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: 448,
              enacted_epoch: 455,
              expired_epoch: null,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              Proposal #40: New Governance Framework
            </span>
            <span className='text-text-xs text-text-muted'>
              Submitted: Epoch 435
            </span>
          </div>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: 440,
              enacted_epoch: 445,
              expired_epoch: null,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-text-sm font-medium text-text'>
              Proposal #39: Stake Pool Rewards Adjustment
            </span>
            <span className='text-text-xs text-text-muted'>
              Submitted: Epoch 430
            </span>
          </div>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: null,
              enacted_epoch: null,
              expired_epoch: 440,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * Status badge in proposal detail view
 */
export const InProposalDetail: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-text-xl font-bold text-text'>
          Proposal #42: Treasury Funding Q1
        </h2>
        <GovernanceStatusBadge
          item={{
            ratified_epoch: 448,
            enacted_epoch: 455,
            expired_epoch: null,
            dropped_epoch: null,
          }}
          currentEpoch={450}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Proposal ID:</span>
          <span className='text-text-sm text-text'>#42</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Submitted:</span>
          <span className='text-text-sm text-text'>Epoch 445</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Ratified:</span>
          <span className='text-text-sm text-text'>Epoch 448</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>
            Enactment Scheduled:
          </span>
          <span className='text-text-sm text-text'>Epoch 455</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Current Epoch:</span>
          <span className='text-text-sm font-medium text-text'>450</span>
        </div>
      </div>
      <div className='mt-2 rounded bg-background-secondary p-3'>
        <p className='text-text-sm text-text'>
          This proposal has been ratified by the community and is awaiting
          enactment in epoch 455. Once the enactment epoch is reached, the
          treasury funds will be released according to the approved budget.
        </p>
      </div>
    </div>
  ),
};

/**
 * Status badges in governance dashboard timeline
 */
export const InDashboardTimeline: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Proposal Lifecycle
      </h3>
      <div className='relative flex flex-col gap-4'>
        <div className='flex items-start gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-800'>
            1
          </div>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-text-sm font-medium text-text'>
                Submission
              </span>
            </div>
            <p className='text-text-xs text-text-muted'>Epoch 445</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-800'>
            2
          </div>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-text-sm font-medium text-text'>
                Voting Period
              </span>
              <GovernanceStatusBadge
                item={{
                  ratified_epoch: null,
                  enacted_epoch: null,
                  expired_epoch: null,
                  dropped_epoch: null,
                }}
                currentEpoch={450}
              />
            </div>
            <p className='text-text-xs text-text-muted'>
              Epochs 445-450 (Current)
            </p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-800'>
            3
          </div>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-text-sm font-medium text-text-muted'>
                Ratification
              </span>
            </div>
            <p className='text-text-xs text-text-muted'>Expected: Epoch 451</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-800'>
            4
          </div>
          <div className='flex-1'>
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-text-sm font-medium text-text-muted'>
                Enactment
              </span>
            </div>
            <p className='text-text-xs text-text-muted'>Expected: Epoch 455</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Status badges in governance statistics summary
 */
export const InStatsSummary: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h4 className='font-semibold text-text'>Active Proposals</h4>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: null,
              enacted_epoch: null,
              expired_epoch: null,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <p className='text-text-2xl font-bold text-text'>12</p>
        <p className='text-text-xs text-text-muted'>Currently in voting</p>
      </div>

      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h4 className='font-semibold text-text'>Ratified</h4>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: 448,
              enacted_epoch: 455,
              expired_epoch: null,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <p className='text-text-2xl font-bold text-text'>8</p>
        <p className='text-text-xs text-text-muted'>Awaiting enactment</p>
      </div>

      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h4 className='font-semibold text-text'>Enacted</h4>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: 440,
              enacted_epoch: 445,
              expired_epoch: null,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <p className='text-text-2xl font-bold text-text'>156</p>
        <p className='text-text-xs text-text-muted'>Successfully completed</p>
      </div>

      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h4 className='font-semibold text-text'>Expired</h4>
          <GovernanceStatusBadge
            item={{
              ratified_epoch: null,
              enacted_epoch: null,
              expired_epoch: 440,
              dropped_epoch: null,
            }}
            currentEpoch={450}
          />
        </div>
        <p className='text-text-2xl font-bold text-text'>23</p>
        <p className='text-text-xs text-text-muted'>Not enacted</p>
      </div>
    </div>
  ),
};
