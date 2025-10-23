import type { Meta, StoryObj } from "@storybook/react";
import { PurposeBadge } from "../../ui/purposeBadge";

const meta: Meta<typeof PurposeBadge> = {
  title: "Data Display/PurposeBadge",
  component: PurposeBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component displaying redeemer purpose types in Cardano transactions with unique color-coded styling for each purpose (spent, mint, cert, reward, vote, propose).",
      },
    },
  },
  argTypes: {
    purpose: {
      control: "select",
      options: ["spent", "mint", "cert", "reward", "vote", "propose"],
      description:
        "The redeemer purpose type (spent, mint, cert, reward, vote, propose)",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS class for custom styling",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
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
 * Spent purpose - spending UTxOs (purple base color)
 */
export const Spent: Story = {
  args: {
    purpose: "spent",
  },
};

/**
 * Mint purpose - minting/burning tokens
 */
export const Mint: Story = {
  args: {
    purpose: "mint",
  },
};

/**
 * Cert purpose - certificate operations
 */
export const Cert: Story = {
  args: {
    purpose: "cert",
  },
};

/**
 * Reward purpose - reward withdrawals
 */
export const Reward: Story = {
  args: {
    purpose: "reward",
  },
};

/**
 * Vote purpose - governance voting
 */
export const Vote: Story = {
  args: {
    purpose: "vote",
  },
};

/**
 * Propose purpose - governance proposals
 */
export const Propose: Story = {
  args: {
    purpose: "propose",
  },
};

/**
 * All purpose types displayed together
 */
export const AllPurposes: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <PurposeBadge purpose='spent' />
        <span className='text-text-sm text-text'>Spending UTxOs</span>
      </div>
      <div className='flex items-center gap-2'>
        <PurposeBadge purpose='mint' />
        <span className='text-text-sm text-text'>Minting/burning tokens</span>
      </div>
      <div className='flex items-center gap-2'>
        <PurposeBadge purpose='cert' />
        <span className='text-text-sm text-text'>Certificate operations</span>
      </div>
      <div className='flex items-center gap-2'>
        <PurposeBadge purpose='reward' />
        <span className='text-text-sm text-text'>Reward withdrawals</span>
      </div>
      <div className='flex items-center gap-2'>
        <PurposeBadge purpose='vote' />
        <span className='text-text-sm text-text'>Governance voting</span>
      </div>
      <div className='flex items-center gap-2'>
        <PurposeBadge purpose='propose' />
        <span className='text-text-sm text-text'>Governance proposals</span>
      </div>
    </div>
  ),
};

/**
 * Purpose badges in transaction redeemer list
 */
export const InRedeemerList: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Transaction Redeemers
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <PurposeBadge purpose='spent' />
            <span className='text-text-sm font-mono text-text'>
              e1317b15...ec13309
            </span>
          </div>
          <span className='text-text-xs text-text-muted'>Index: 0</span>
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <PurposeBadge purpose='mint' />
            <span className='text-text-sm font-mono text-text'>
              a5bb0e5b...e01559
            </span>
          </div>
          <span className='text-text-xs text-text-muted'>Index: 1</span>
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <PurposeBadge purpose='cert' />
            <span className='text-text-sm font-mono text-text'>
              4020e7fc...888f0
            </span>
          </div>
          <span className='text-text-xs text-text-muted'>Index: 2</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <PurposeBadge purpose='reward' />
            <span className='text-text-sm font-mono text-text'>
              b3d6e1c8...f3d6c9
            </span>
          </div>
          <span className='text-text-xs text-text-muted'>Index: 3</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Purpose badges in Plutus script execution details
 */
export const InScriptExecution: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Script Execution Details
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Purpose:</span>
          <PurposeBadge purpose='spent' />
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Script Hash:</span>
          <span className='text-text-sm font-mono text-text'>
            e1317b152faac13426e6a83e06ff88a4d62cce3c1634ab0a5ec13309
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Redeemer Data:</span>
          <span className='text-text-sm text-text'>Constructor 0 []</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Execution Units:</span>
          <span className='text-text-sm text-text'>
            Mem: 1,200,000 | CPU: 500,000,000
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Status:</span>
          <span className='text-text-sm font-medium text-green-600'>
            Success
          </span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Purpose badges in smart contract transaction breakdown
 */
export const InTransactionBreakdown: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Smart Contract Transaction
      </h3>
      <div className='flex flex-col gap-4'>
        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <PurposeBadge purpose='spent' />
              <span className='text-text-sm font-semibold text-text'>
                Spending
              </span>
            </div>
            <span className='text-text-xs text-text-muted'>2 inputs</span>
          </div>
          <p className='text-text-xs text-text-muted'>
            Consuming UTxOs from script address
          </p>
        </div>

        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <PurposeBadge purpose='mint' />
              <span className='text-text-sm font-semibold text-text'>
                Minting
              </span>
            </div>
            <span className='text-text-xs text-text-muted'>1 asset</span>
          </div>
          <p className='text-text-xs text-text-muted'>
            Minting 1,000 tokens: MyToken
          </p>
        </div>

        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <PurposeBadge purpose='cert' />
              <span className='text-text-sm font-semibold text-text'>
                Certificate
              </span>
            </div>
            <span className='text-text-xs text-text-muted'>
              Stake registration
            </span>
          </div>
          <p className='text-text-xs text-text-muted'>
            Registering stake address
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Purpose badges in governance transaction
 */
export const InGovernanceTransaction: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Governance Transaction
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center gap-2'>
            <PurposeBadge purpose='vote' />
            <span className='text-text-sm font-semibold text-text'>
              Governance Vote
            </span>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-text-xs text-text-muted'>Proposal ID:</span>
              <span className='text-text-xs font-mono text-text'>
                #42
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-text-xs text-text-muted'>Voter:</span>
              <span className='text-text-xs text-text'>drep1abc...def</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-text-xs text-text-muted'>Decision:</span>
              <span className='text-text-xs font-medium text-green-600'>
                Yes
              </span>
            </div>
          </div>
        </div>

        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center gap-2'>
            <PurposeBadge purpose='propose' />
            <span className='text-text-sm font-semibold text-text'>
              New Proposal
            </span>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <span className='text-text-xs text-text-muted'>Type:</span>
              <span className='text-text-xs text-text'>
                Treasury Withdrawal
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-text-xs text-text-muted'>Amount:</span>
              <span className='text-text-xs text-text'>100,000 ADA</span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-text-xs text-text-muted'>Proposer:</span>
              <span className='text-text-xs text-text'>drep1xyz...abc</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
