import type { Meta, StoryObj } from "@storybook/react";
import { EpochCell } from "../../ui/epochCell";

const meta: Meta<typeof EpochCell> = {
  title: "Data Display/EpochCell",
  component: EpochCell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays Cardano epoch numbers as clickable links with optional pulse indicator for the current epoch.",
      },
    },
  },
  argTypes: {
    no: {
      control: "number",
      description: "Epoch number to display",
      table: {
        type: { summary: "number | undefined" },
      },
    },
    currentEpoch: {
      control: "number",
      description: "Current epoch number for comparison and calculations",
      table: {
        type: { summary: "number" },
      },
    },
    substractFromCurrent: {
      control: "boolean",
      description:
        "Display the difference between currentEpoch and no instead of the epoch number",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showPulseDot: {
      control: "boolean",
      description: "Show pulse dot indicator for current epoch",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    justify: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Horizontal alignment of the epoch cell content",
      table: {
        type: { summary: '"start" | "center" | "end"' },
        defaultValue: { summary: '"end"' },
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
 * Default epoch cell displaying a past epoch as a clickable link
 */
export const Default: Story = {
  args: {
    no: 450,
    currentEpoch: 455,
  },
};

/**
 * Current epoch with animated pulse dot indicator
 */
export const CurrentEpoch: Story = {
  args: {
    no: 455,
    currentEpoch: 455,
    showPulseDot: true,
  },
};

/**
 * Past epoch with pulse dot spacing (for table alignment)
 */
export const PastEpochWithPulseDot: Story = {
  args: {
    no: 450,
    currentEpoch: 455,
    showPulseDot: true,
  },
};

/**
 * Future epoch displayed as plain text (not clickable)
 */
export const FutureEpoch: Story = {
  args: {
    no: 460,
    currentEpoch: 455,
  },
};

/**
 * Display difference from current epoch (e.g., "5 epochs ago")
 */
export const SubtractedFromCurrent: Story = {
  args: {
    no: 450,
    currentEpoch: 455,
    substractFromCurrent: true,
  },
};

/**
 * Undefined epoch showing placeholder
 */
export const UndefinedEpoch: Story = {
  args: {
    no: undefined,
    currentEpoch: 455,
  },
};

/**
 * Example showing epochs in a table with pulse indicator
 */
export const InTable: Story = {
  render: () => {
    const currentEpoch = 455;
    const epochs = [
      { id: 1, no: 455, block: "10,234,567" },
      { id: 2, no: 454, block: "10,213,421" },
      { id: 3, no: 453, block: "10,192,156" },
      { id: 4, no: 452, block: "10,170,892" },
      { id: 5, no: 451, block: "10,149,628" },
    ];

    return (
      <div className='w-full max-w-md rounded-lg border border-border bg-cardBg'>
        <table className='w-full'>
          <thead className='border-b border-border bg-background'>
            <tr>
              <th className='px-4 py-2 text-left text-text-sm font-semibold text-text'>
                Epoch
              </th>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Blocks
              </th>
            </tr>
          </thead>
          <tbody>
            {epochs.map((epoch) => (
              <tr key={epoch.id} className='border-b border-border last:border-0'>
                <td className='px-4 py-3'>
                  <EpochCell
                    no={epoch.no}
                    currentEpoch={currentEpoch}
                    showPulseDot
                  />
                </td>
                <td className='px-4 py-3 text-right text-text-sm text-text'>
                  {epoch.block}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

/**
 * Example showing epoch differences in a rewards table
 */
export const InRewardsTable: Story = {
  render: () => {
    const currentEpoch = 455;
    const rewards = [
      { id: 1, epochsAgo: 0, amount: "1,234.56 ₳" },
      { id: 2, epochsAgo: 1, amount: "1,189.23 ₳" },
      { id: 3, epochsAgo: 2, amount: "1,245.78 ₳" },
      { id: 4, epochsAgo: 3, amount: "1,198.45 ₳" },
    ];

    return (
      <div className='w-full max-w-lg rounded-lg border border-border bg-cardBg'>
        <div className='border-b border-border bg-background px-4 py-3'>
          <h3 className='text-text-md font-semibold text-text'>
            Recent Rewards
          </h3>
        </div>
        <table className='w-full'>
          <thead className='border-b border-border bg-background-secondary'>
            <tr>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Epochs Ago
              </th>
              <th className='px-4 py-2 text-left text-text-sm font-semibold text-text'>
                Epoch
              </th>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Reward
              </th>
            </tr>
          </thead>
          <tbody>
            {rewards.map((reward) => (
              <tr key={reward.id} className='border-b border-border last:border-0'>
                <td className='px-4 py-3'>
                  <EpochCell
                    no={currentEpoch - reward.epochsAgo}
                    currentEpoch={currentEpoch}
                    substractFromCurrent
                  />
                </td>
                <td className='px-4 py-3 text-left'>
                  <EpochCell
                    no={currentEpoch - reward.epochsAgo}
                    currentEpoch={currentEpoch}
                  />
                </td>
                <td className='px-4 py-3 text-right text-text-sm font-medium text-text'>
                  {reward.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
};

/**
 * Examples showing different alignment options
 */
export const AlignmentOptions: Story = {
  render: () => {
    const currentEpoch = 455;

    return (
      <div className='flex w-full flex-col gap-4'>
        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-sm font-semibold text-text'>
            Right-aligned (default - for tables)
          </h4>
          <EpochCell no={450} currentEpoch={currentEpoch} justify='end' />
        </div>

        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-sm font-semibold text-text'>
            Left-aligned
          </h4>
          <EpochCell no={450} currentEpoch={currentEpoch} justify='start' />
        </div>

        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-sm font-semibold text-text'>
            Center-aligned
          </h4>
          <EpochCell no={450} currentEpoch={currentEpoch} justify='center' />
        </div>
      </div>
    );
  },
};

/**
 * Example showing mixed epoch states (past, current, future)
 */
export const AllStates: Story = {
  render: () => {
    const currentEpoch = 455;

    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-3'>
          <span className='w-32 text-text-sm text-text-muted'>
            Past Epoch:
          </span>
          <EpochCell no={450} currentEpoch={currentEpoch} showPulseDot />
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-32 text-text-sm text-text-muted'>
            Current Epoch:
          </span>
          <EpochCell no={455} currentEpoch={currentEpoch} showPulseDot />
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-32 text-text-sm text-text-muted'>
            Future Epoch:
          </span>
          <EpochCell no={460} currentEpoch={currentEpoch} showPulseDot />
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-32 text-text-sm text-text-muted'>
            Epochs Ago:
          </span>
          <EpochCell
            no={450}
            currentEpoch={currentEpoch}
            substractFromCurrent
          />
        </div>

        <div className='flex items-center gap-3'>
          <span className='w-32 text-text-sm text-text-muted'>Undefined:</span>
          <EpochCell no={undefined} currentEpoch={currentEpoch} />
        </div>
      </div>
    );
  },
};

/**
 * Example in governance proposal context
 */
export const InGovernanceProposal: Story = {
  render: () => {
    const currentEpoch = 455;

    return (
      <div className='w-full max-w-md rounded-lg border border-border bg-cardBg p-4'>
        <h3 className='mb-4 text-text-lg font-semibold text-text'>
          Governance Proposal #42
        </h3>

        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between'>
            <span className='text-text-sm text-text-muted'>
              Submitted in Epoch:
            </span>
            <EpochCell no={445} currentEpoch={currentEpoch} />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-text-sm text-text-muted'>
              Voting Ends in Epoch:
            </span>
            <EpochCell no={455} currentEpoch={currentEpoch} showPulseDot />
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-text-sm text-text-muted'>
              Enactment Epoch:
            </span>
            <EpochCell no={460} currentEpoch={currentEpoch} />
          </div>
        </div>

        <div className='mt-4 rounded bg-background p-3'>
          <p className='text-text-xs text-text-muted'>
            This proposal is currently in the voting period (Epoch{" "}
            <EpochCell no={455} currentEpoch={currentEpoch} />
            ). Voting will end at the epoch boundary.
          </p>
        </div>
      </div>
    );
  },
};
