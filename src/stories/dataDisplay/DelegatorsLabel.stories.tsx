import type { Meta, StoryObj } from "@storybook/react";
import { DelegatorsLabel } from "../../ui/delegatorsLabel";

const meta: Meta<typeof DelegatorsLabel> = {
  title: "Data Display/DelegatorsLabel",
  component: DelegatorsLabel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Label with tooltip for delegators count, explaining the minimum delegation threshold.",
      },
    },
  },
  argTypes: {
    minDelegationAda: {
      control: "text",
      description: "Minimum delegation amount in ADA required to be counted",
      table: {
        type: { summary: "string" },
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
 * Default with 10 ADA minimum threshold
 */
export const Default: Story = {
  args: {
    minDelegationAda: "10",
  },
};

/**
 * Low threshold - 1 ADA minimum
 */
export const LowThreshold: Story = {
  args: {
    minDelegationAda: "1",
  },
};

/**
 * Standard threshold - 100 ADA minimum
 */
export const StandardThreshold: Story = {
  args: {
    minDelegationAda: "100",
  },
};

/**
 * High threshold - 1000 ADA minimum
 */
export const HighThreshold: Story = {
  args: {
    minDelegationAda: "1000",
  },
};

/**
 * Very high threshold - 10000 ADA minimum
 */
export const VeryHighThreshold: Story = {
  args: {
    minDelegationAda: "10000",
  },
};

/**
 * In table header context
 */
export const InTableHeader: Story = {
  args: {
    minDelegationAda: "50",
  },
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-[800px] overflow-x-auto rounded-l border border-border'>
          <table className='w-full'>
            <thead className='border-b border-border bg-cardBg'>
              <tr>
                <th className='p-2 text-left text-text-sm font-semibold'>
                  Pool Name
                </th>
                <th className='p-2 text-left text-text-sm font-semibold'>
                  <Story />
                </th>
                <th className='p-2 text-left text-text-sm font-semibold'>
                  Live Stake
                </th>
                <th className='p-2 text-left text-text-sm font-semibold'>
                  ROA
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-border'>
                <td className='p-2 text-text-sm'>APEX Pool</td>
                <td className='p-2 text-text-sm'>1,234</td>
                <td className='p-2 text-text-sm'>45.2M ₳</td>
                <td className='p-2 text-text-sm'>4.8%</td>
              </tr>
              <tr className='border-b border-border'>
                <td className='p-2 text-text-sm'>WAVE Pool</td>
                <td className='p-2 text-text-sm'>892</td>
                <td className='p-2 text-text-sm'>32.1M ₳</td>
                <td className='p-2 text-text-sm'>5.1%</td>
              </tr>
              <tr>
                <td className='p-2 text-text-sm'>PEAK Pool</td>
                <td className='p-2 text-text-sm'>567</td>
                <td className='p-2 text-text-sm'>28.9M ₳</td>
                <td className='p-2 text-text-sm'>4.9%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  ],
};

/**
 * Multiple thresholds comparison
 */
export const ThresholdsComparison: Story = {
  render: () => (
    <div className='flex h-[400px] w-full items-center justify-center bg-background p-10'>
      <div className='flex flex-col gap-4 rounded-l border border-border bg-cardBg p-4'>
        <h3 className='text-text-lg font-semibold'>
          Delegator Count Thresholds
        </h3>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <span className='w-32 text-text-sm text-gray-500'>
              Minimal filter:
            </span>
            <DelegatorsLabel minDelegationAda="1" />
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-32 text-text-sm text-gray-500'>
              Light filter:
            </span>
            <DelegatorsLabel minDelegationAda="10" />
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-32 text-text-sm text-gray-500'>
              Standard filter:
            </span>
            <DelegatorsLabel minDelegationAda="100" />
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-32 text-text-sm text-gray-500'>
              Heavy filter:
            </span>
            <DelegatorsLabel minDelegationAda="1000" />
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-32 text-text-sm text-gray-500'>
              Whale filter:
            </span>
            <DelegatorsLabel minDelegationAda="100000" />
          </div>
        </div>
        <p className='mt-2 text-xs text-gray-500'>
          Hover over the info icon to see the threshold explanation
        </p>
      </div>
    </div>
  ),
};
