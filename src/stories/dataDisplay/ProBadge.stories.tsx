import type { Meta, StoryObj } from "@storybook/react";
import { ProBadge } from "../../ui/proBadge";

const meta: Meta<typeof ProBadge> = {
  title: "Data Display/ProBadge",
  component: ProBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Clickable 'PRO' badge with gradient styling that links to the Pro subscription page.",
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
 * Default PRO badge with gradient styling
 */
export const Default: Story = {};

/**
 * PRO badge in a feature list context
 */
export const InFeatureList: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <span className='text-text'>Basic Analytics</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-text'>Advanced Analytics</span>
        <ProBadge />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-text'>Export to CSV</span>
        <ProBadge />
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-text'>API Access</span>
        <ProBadge />
      </div>
    </div>
  ),
};

/**
 * PRO badge next to locked feature with toggle
 */
export const WithLockedFeature: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='font-medium text-text'>Premium Features</span>
          <ProBadge />
        </div>
      </div>
      <div className='flex items-center justify-between opacity-50'>
        <span className='text-text-sm'>Real-time Notifications</span>
        <div className='h-5 w-9 rounded-full bg-border' />
      </div>
      <div className='flex items-center justify-between opacity-50'>
        <span className='text-text-sm'>Priority Support</span>
        <div className='h-5 w-9 rounded-full bg-border' />
      </div>
      <div className='flex items-center justify-between opacity-50'>
        <span className='text-text-sm'>Custom Alerts</span>
        <div className='h-5 w-9 rounded-full bg-border' />
      </div>
    </div>
  ),
};

/**
 * PRO badge in header navigation
 */
export const InNavigation: Story = {
  render: () => (
    <nav className='flex items-center gap-6 rounded-lg border border-border bg-background p-4'>
      <span className='text-text hover:text-text-muted cursor-pointer'>
        Dashboard
      </span>
      <span className='text-text hover:text-text-muted cursor-pointer'>
        Transactions
      </span>
      <span className='text-text hover:text-text-muted cursor-pointer'>
        Analytics
      </span>
      <div className='ml-auto'>
        <ProBadge />
      </div>
    </nav>
  ),
};

/**
 * Multiple PRO badges in a feature comparison
 */
export const InComparison: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='rounded-lg border border-border p-4'>
        <h3 className='mb-4 text-lg font-semibold text-text'>Free Plan</h3>
        <ul className='space-y-2 text-text-sm'>
          <li>✓ Basic block explorer</li>
          <li>✓ Transaction search</li>
          <li>✓ Address lookup</li>
          <li>✗ Advanced analytics</li>
          <li>✗ Export data</li>
        </ul>
      </div>
      <div className='rounded-lg border border-purple-700 p-4'>
        <div className='mb-4 flex items-center gap-2'>
          <h3 className='text-lg font-semibold text-text'>Pro Plan</h3>
          <ProBadge />
        </div>
        <ul className='space-y-2 text-text-sm'>
          <li>✓ Everything in Free</li>
          <li>✓ Advanced analytics</li>
          <li>✓ Export to CSV/JSON</li>
          <li>✓ API access</li>
          <li>✓ Priority support</li>
        </ul>
      </div>
    </div>
  ),
};
