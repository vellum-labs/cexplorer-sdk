import type { Meta, StoryObj } from '@storybook/react';
import { NoResultsFound } from './index';

const meta = {
  title: 'Feedback/NoResultsFound',
  component: NoResultsFound,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: { type: 'text' },
    },
    className: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof NoResultsFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomMessage: Story = {
  args: {
    message: 'No users found matching your criteria',
  },
};

export const SearchResults: Story = {
  args: {
    message: 'No search results for "blockchain analytics"',
  },
};

export const FilterResults: Story = {
  args: {
    message: 'No transactions match the selected filters',
  },
};

export const EmptyData: Story = {
  args: {
    message: 'No data available at this time',
  },
};

export const WithCustomStyling: Story = {
  args: {
    message: 'Custom styled empty state',
    className: 'bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300',
  },
};

export const InContainer = {
  render: () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Transaction History</h2>
          <p className="text-sm text-gray-600">View your recent blockchain transactions</p>
        </div>
        <div className="border rounded-lg min-h-[200px] flex items-center justify-center">
          <NoResultsFound message="No transactions found" />
        </div>
      </div>
    </div>
  ),
};

export const InTable = {
  render: () => (
    <div className="w-full max-w-4xl">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={4} className="border border-gray-300 p-0">
              <NoResultsFound message="No transactions to display" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};