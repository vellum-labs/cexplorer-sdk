import { SortArrow } from "@/ui/sortArrow";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Data Display/SortArrow",
  component: SortArrow,
  parameters: {
    docs: {
      description: {
        component:
          "SortArrow displays a visual indicator for table column sorting state with three states: unsorted, ascending, and descending.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className='flex min-h-[150px] w-full items-center justify-center bg-background p-4'>
        <div className='rounded-m border border-border bg-cardBg p-4'>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    direction: {
      control: "select",
      options: [undefined, "asc", "desc"],
      description: "Current sort direction",
    },
  },
} satisfies Meta<typeof SortArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Unsorted state (neutral arrow).
 */
export const Unsorted: Story = {
  args: {
    direction: undefined,
  },
};

/**
 * Ascending sort (A→Z, 0→9, oldest→newest).
 */
export const Ascending: Story = {
  args: {
    direction: "asc",
  },
};

/**
 * Descending sort (Z→A, 9→0, newest→oldest).
 */
export const Descending: Story = {
  args: {
    direction: "desc",
  },
};

/**
 * Example in table header context.
 */
export const InTableHeader: Story = {
  render: () => (
    <table className='w-full border-collapse'>
      <thead>
        <tr className='border-b border-border'>
          <th className='cursor-pointer p-2 text-left text-text-sm font-semibold text-text'>
            <div className='flex items-center gap-1'>
              Block Number
              <SortArrow direction='desc' />
            </div>
          </th>
          <th className='cursor-pointer p-2 text-left text-text-sm font-semibold text-text'>
            <div className='flex items-center gap-1'>
              Time
              <SortArrow direction={undefined} />
            </div>
          </th>
          <th className='cursor-pointer p-2 text-left text-text-sm font-semibold text-text'>
            <div className='flex items-center gap-1'>
              Transactions
              <SortArrow direction='asc' />
            </div>
          </th>
        </tr>
      </thead>
    </table>
  ),
  args: {
    direction: "asc",
  },
};
