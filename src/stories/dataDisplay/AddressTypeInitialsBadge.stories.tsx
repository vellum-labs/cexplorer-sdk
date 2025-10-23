import type { Meta, StoryObj } from "@storybook/react";
import { AddressTypeInitialsBadge } from "../../ui/addressTypeInitialsBadge";

const meta: Meta<typeof AddressTypeInitialsBadge> = {
  title: "Data Display/AddressTypeInitialsBadge",
  component: AddressTypeInitialsBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component displaying color-coded initials representing Cardano address types (PKH, SH, SKH, PTR, KH) with tooltips. Note: This component requires valid Cardano addresses that can be parsed. The examples below show visual representations of the badges.",
      },
    },
  },
  argTypes: {
    address: {
      control: "text",
      description:
        "The Cardano address to parse and display type information for (must be a valid Cardano address)",
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
 * All address type initials displayed with actual component using valid Cardano addresses
 */
export const AllTypes: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <AddressTypeInitialsBadge address='addr1qyfu9f7y495w09tul7zgrx6n6ktwwhqr7mu8dc8ql37skslz9gmjv2yy8f0eq5xxn6zkl9ygqgmuk4kdpm23e4zlsyxq3r964j' />
        <span className='text-text-sm text-text'>
          PKH - PaymentKeyHash (Pink)
        </span>
      </div>
      <div className='flex items-center gap-2'>
        <AddressTypeInitialsBadge address='addr1z8p79rpkcdz8x9d6tft0x0dx5mwuzac2sa4gm8cvkw5hcn83skegcg222ukkjcdhyuxq8yc95kxkwekt3dv5gkdcw33sxxf5r4' />
        <span className='text-text-sm text-text'>SH - ScriptHash (Green)</span>
      </div>
      <div className='flex items-center gap-2'>
        <AddressTypeInitialsBadge address='stake1u8pcjgmx7962w6hey5hhsd502araxp26kdtgagakhaqtq8squng76' />
        <span className='text-text-sm text-text'>
          SKH - StakeKeyHash (Blue)
        </span>
      </div>
    </div>
  ),
};

/**
 * Default story with payment key hash address
 */
export const Default: Story = {
  args: {
    address:
      "addr1z8p79rpkcdz8x9d6tft0x0dx5mwuzac2sa4gm8cvkw5hcn83skegcg222ukkjcdhyuxq8yc95kxkwekt3dv5gkdcw33sxxf5r4",
  },
};

/**
 * Address type badges in transaction outputs (using actual component)
 */
export const InTransactionOutputs: Story = {
  render: () => (
    <div className='rounded-lg flex flex-col gap-4 border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Transaction Outputs
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <AddressTypeInitialsBadge address='addr1qyfu9f7y495w09tul7zgrx6n6ktwwhqr7mu8dc8ql37skslz9gmjv2yy8f0eq5xxn6zkl9ygqgmuk4kdpm23e4zlsyxq3r964j' />
            <span className='font-mono text-text-sm text-text'>
              addr1qxy2...m5kzq
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>
            1,250.50 ADA
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <AddressTypeInitialsBadge address='addr1z8p79rpkcdz8x9d6tft0x0dx5mwuzac2sa4gm8cvkw5hcn83skegcg222ukkjcdhyuxq8yc95kxkwekt3dv5gkdcw33sxxf5r4' />
            <span className='font-mono text-text-sm text-text'>
              addr1w8s...xmsha
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>500.00 ADA</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <AddressTypeInitialsBadge address='stake1u8pcjgmx7962w6hey5hhsd502araxp26kdtgagakhaqtq8squng76' />
            <span className='font-mono text-text-sm text-text'>
              stake1u8p...ung76
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>
            2,000.00 ADA
          </span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Address type badge in address detail view (using actual component)
 */
export const InAddressDetail: Story = {
  render: () => (
    <div className='rounded-lg flex flex-col gap-4 border border-border p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-text-xl font-bold text-text'>Address Details</h2>
        <AddressTypeInitialsBadge address='addr1qyfu9f7y495w09tul7zgrx6n6ktwwhqr7mu8dc8ql37skslz9gmjv2yy8f0eq5xxn6zkl9ygqgmuk4kdpm23e4zlsyxq3r964j' />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='text-text-muted text-text-sm'>Address Type:</span>
          <span className='text-text-sm text-text'>Payment Key Hash</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-muted text-text-sm'>Address:</span>
          <span className='font-mono text-text-sm text-text'>
            addr1qxy2...m5kzq
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-muted text-text-sm'>Balance:</span>
          <span className='text-text-sm font-medium text-text'>
            5,432,100.50 ADA
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-muted text-text-sm'>Transactions:</span>
          <span className='text-text-sm text-text'>12,456</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Address type badges in address list/explorer (using actual component)
 */
export const InAddressList: Story = {
  render: () => (
    <div className='rounded-lg flex flex-col gap-4 border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>Top Addresses</h3>
      <div className='flex flex-col gap-3'>
        <div className='rounded flex items-center justify-between border border-border bg-background p-3'>
          <div className='flex items-center gap-2'>
            <span className='text-text-muted text-text-sm'>#1</span>
            <AddressTypeInitialsBadge address='addr1qyfu9f7y495w09tul7zgrx6n6ktwwhqr7mu8dc8ql37skslz9gmjv2yy8f0eq5xxn6zkl9ygqgmuk4kdpm23e4zlsyxq3r964j' />
            <span className='font-mono text-text-sm text-text'>
              addr1qxy2...m5kzq
            </span>
          </div>
          <span className='text-text-sm font-semibold text-text'>
            25,432,100 ADA
          </span>
        </div>

        <div className='rounded flex items-center justify-between border border-border bg-background p-3'>
          <div className='flex items-center gap-2'>
            <span className='text-text-muted text-text-sm'>#2</span>
            <AddressTypeInitialsBadge address='addr1z8p79rpkcdz8x9d6tft0x0dx5mwuzac2sa4gm8cvkw5hcn83skegcg222ukkjcdhyuxq8yc95kxkwekt3dv5gkdcw33sxxf5r4' />
            <span className='font-mono text-text-sm text-text'>
              addr1w8s...xmsha
            </span>
          </div>
          <span className='text-text-sm font-semibold text-text'>
            18,123,456 ADA
          </span>
        </div>

        <div className='rounded flex items-center justify-between border border-border bg-background p-3'>
          <div className='flex items-center gap-2'>
            <span className='text-text-muted text-text-sm'>#3</span>
            <AddressTypeInitialsBadge address='stake1u8pcjgmx7962w6hey5hhsd502araxp26kdtgagakhaqtq8squng76' />
            <span className='font-mono text-text-sm text-text'>
              stake1u8p...ung76
            </span>
          </div>
          <span className='text-text-sm font-semibold text-text'>
            12,987,654 ADA
          </span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Address type comparison showing different types
 */
export const TypeComparison: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <AddressTypeInitialsBadge address='addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0znl0yqahjqvqmku247wqm5we5gk5kvmj8g8vsx8a5gk8zwa0mq2h0y6sqm5kzq' />
          <h4 className='font-semibold text-text'>Payment Key Hash</h4>
        </div>
        <ul className='space-y-2 text-text-sm text-text'>
          <li>✓ Standard user wallet</li>
          <li>✓ Controlled by private keys</li>
          <li>✓ Most common address type</li>
          <li>✓ Can send/receive ADA</li>
        </ul>
      </div>

      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <AddressTypeInitialsBadge address='addr1w8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha' />
          <h4 className='font-semibold text-text'>Script Hash</h4>
        </div>
        <ul className='space-y-2 text-text-sm text-text'>
          <li>✓ Smart contract address</li>
          <li>✓ Programmable logic</li>
          <li>✓ Plutus/Native scripts</li>
          <li>✓ DeFi/dApp integration</li>
        </ul>
      </div>

      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <AddressTypeInitialsBadge address='stake1u8pcjgmx7962w6hey5hhsd502araxp26kdtgagakhaqtq8squng76' />
          <h4 className='font-semibold text-text'>Stake Key Hash</h4>
        </div>
        <ul className='space-y-2 text-text-sm text-text'>
          <li>✓ Stake address</li>
          <li>✓ Delegation control</li>
          <li>✓ Rewards distribution</li>
          <li>✓ Pool selection</li>
        </ul>
      </div>

      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <span className='flex w-fit items-center gap-1/2 rounded-xs border bg-pink-100 px-1 py-0 text-right text-[10px] font-bold text-pink-800'>
            KH
          </span>
          <h4 className='font-semibold text-text'>Key Hash (Both)</h4>
        </div>
        <ul className='space-y-2 text-text-sm text-text'>
          <li>✓ Payment & delegation</li>
          <li>✓ Both parts KeyHash</li>
          <li>✓ Unified credentials</li>
          <li>✓ Simplified display</li>
        </ul>
      </div>
    </div>
  ),
};
