import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "../../ui/loadingSpinner";

const meta: Meta<typeof Loading> = {
  title: "Feedback/LoadingSpinner",
  component: Loading,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Loading spinner component with theme-aware colors. Displays an animated circular loading indicator that adapts to light and dark themes. Commonly used for page loading states, async operations, and data fetching.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to customize the spinner container",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default loading spinner with standard size (60px)
 */
export const Default: Story = {
  args: {},
};

/**
 * Loading spinner in a card context
 */
export const InCard: Story = {
  render: () => (
    <div
      className='w-[400px] rounded-lg border border-border bg-background p-6'
      style={{ minHeight: "200px" }}
    >
      <Loading />
    </div>
  ),
};

/**
 * Loading spinner for full page loading state
 */
export const FullPage: Story = {
  render: () => (
    <div className='h-screen w-full bg-background'>
      <Loading />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

/**
 * Loading spinner with custom container height
 */
export const CustomHeight: Story = {
  args: {
    className: "h-[300px]",
  },
};

/**
 * Multiple loading spinners showing different contexts
 */
export const MultipleContexts: Story = {
  render: () => (
    <div className='flex w-full flex-col gap-6'>
      <div>
        <h3 className='mb-2 text-text-sm font-semibold'>
          Loading Transaction Details
        </h3>
        <div className='rounded-lg border border-border bg-background p-4'>
          <Loading className='h-[100px]' />
        </div>
      </div>

      <div>
        <h3 className='mb-2 text-text-sm font-semibold'>Loading Pool Data</h3>
        <div className='rounded-lg border border-border bg-background p-4'>
          <Loading className='h-[100px]' />
        </div>
      </div>

      <div>
        <h3 className='mb-2 text-text-sm font-semibold'>
          Loading Block Information
        </h3>
        <div className='rounded-lg border border-border bg-background p-4'>
          <Loading className='h-[100px]' />
        </div>
      </div>
    </div>
  ),
};

/**
 * Compact loading spinner for inline contexts
 */
export const CompactInline: Story = {
  render: () => (
    <div className='flex items-center gap-3'>
      <span className='text-text-sm'>Fetching blockchain data</span>
      <div className='h-[50px] w-[50px]'>
        <Loading className='h-[50px]' />
      </div>
    </div>
  ),
};

/**
 * Loading state in a table row
 */
export const InTable: Story = {
  render: () => (
    <div className='w-full overflow-hidden rounded-lg border border-border'>
      <table className='w-full'>
        <thead className='bg-background-secondary'>
          <tr>
            <th className='p-3 text-left text-text-xs font-medium'>Hash</th>
            <th className='p-3 text-left text-text-xs font-medium'>Block</th>
            <th className='p-3 text-left text-text-xs font-medium'>Age</th>
            <th className='p-3 text-left text-text-xs font-medium'>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4}>
              <Loading className='h-[150px]' />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

/**
 * Loading state for empty data states
 */
export const EmptyState: Story = {
  render: () => (
    <div className='flex w-[500px] flex-col items-center justify-center rounded-lg border border-border bg-background p-8'>
      <Loading className='h-[120px]' />
      <p className='mt-4 text-center text-text-sm text-grayTextPrimary'>
        Loading blockchain transactions...
      </p>
    </div>
  ),
};
