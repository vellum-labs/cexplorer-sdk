import type { Meta, StoryObj } from "@storybook/react";
import { ScriptBadge } from "../../ui/scriptBadge";

const meta: Meta<typeof ScriptBadge> = {
  title: "Data Display/ScriptBadge",
  component: ScriptBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component indicating whether an address is a script (smart contract) or non-script (user wallet) address on Cardano.",
      },
    },
  },
  argTypes: {
    isScript: {
      control: "boolean",
      description:
        "Whether the address is a script address (true) or non-script address (false)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
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
 * Script address badge (yellow with Code icon)
 */
export const Script: Story = {
  args: {
    isScript: true,
  },
};

/**
 * Non-script address badge (blue with User icon)
 */
export const NonScript: Story = {
  args: {
    isScript: false,
  },
};

/**
 * Both address types displayed together
 */
export const BothTypes: Story = {
  render: () => (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2'>
        <ScriptBadge isScript={true} />
        <span className='text-text-sm text-text'>Smart contract address</span>
      </div>
      <div className='flex items-center gap-2'>
        <ScriptBadge isScript={false} />
        <span className='text-text-sm text-text'>User wallet address</span>
      </div>
    </div>
  ),
};

/**
 * Script badges in transaction outputs list
 */
export const InTransactionOutputs: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Transaction Outputs
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <ScriptBadge isScript={false} />
            <span className='text-text-sm font-mono text-text'>
              addr1qxy...abc123
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>
            1,250.50 ADA
          </span>
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <ScriptBadge isScript={true} />
            <span className='text-text-sm font-mono text-text'>
              addr1w8s...def456
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>500.00 ADA</span>
        </div>
        <div className='flex items-center justify-between border-b border-border pb-3'>
          <div className='flex items-center gap-2'>
            <ScriptBadge isScript={true} />
            <span className='text-text-sm font-mono text-text'>
              addr1z9s...ghi789
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>
            2,000.00 ADA
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <ScriptBadge isScript={false} />
            <span className='text-text-sm font-mono text-text'>
              addr1qxz...jkl012
            </span>
          </div>
          <span className='text-text-sm font-medium text-text'>750.25 ADA</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Script badge in address detail header
 */
export const InAddressDetail: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <div className='flex items-center gap-3'>
        <h2 className='text-text-xl font-bold text-text'>Address Details</h2>
        <ScriptBadge isScript={true} />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Address:</span>
          <span className='text-text-sm font-mono text-text'>
            addr1w8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz...
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Type:</span>
          <span className='text-text-sm text-text'>Smart Contract</span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Balance:</span>
          <span className='text-text-sm font-medium text-text'>
            5,432,100.50 ADA
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-text-sm text-text-muted'>Transactions:</span>
          <span className='text-text-sm text-text'>12,456</span>
        </div>
      </div>
    </div>
  ),
};

/**
 * Script badges in UTxO explorer
 */
export const InUTxOExplorer: Story = {
  render: () => (
    <div className='flex flex-col gap-4 rounded-lg border border-border p-4'>
      <h3 className='text-text-lg font-semibold text-text'>
        Unspent Transaction Outputs
      </h3>
      <div className='flex flex-col gap-3'>
        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <ScriptBadge isScript={false} />
              <span className='text-text-sm font-mono text-text'>
                UTxO #1
              </span>
            </div>
            <span className='text-text-sm font-semibold text-text'>
              100.00 ADA
            </span>
          </div>
          <p className='text-text-xs text-text-muted'>
            TX: 5f20df93...e940ebb #0
          </p>
        </div>

        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <ScriptBadge isScript={true} />
              <span className='text-text-sm font-mono text-text'>
                UTxO #2
              </span>
            </div>
            <span className='text-text-sm font-semibold text-text'>
              500.00 ADA
            </span>
          </div>
          <p className='text-text-xs text-text-muted'>
            TX: a4b3c2d1...f5e6d7c #1
          </p>
          <p className='text-text-xs mt-1 text-text-muted'>
            + Datum hash: 3a4f5b...
          </p>
        </div>

        <div className='rounded border border-border bg-background p-3'>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <ScriptBadge isScript={true} />
              <span className='text-text-sm font-mono text-text'>
                UTxO #3
              </span>
            </div>
            <span className='text-text-sm font-semibold text-text'>
              250.75 ADA
            </span>
          </div>
          <p className='text-text-xs text-text-muted'>
            TX: e6d7c8b9...a0b1c2d #2
          </p>
          <p className='text-text-xs mt-1 text-text-muted'>
            + Plutus V2 script
          </p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Script badges in address comparison
 */
export const AddressComparison: Story = {
  render: () => (
    <div className='grid grid-cols-2 gap-4'>
      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <ScriptBadge isScript={false} />
          <h4 className='font-semibold text-text'>User Wallet</h4>
        </div>
        <ul className='space-y-2 text-text-sm text-text'>
          <li>✓ Can send/receive ADA</li>
          <li>✓ Controlled by private keys</li>
          <li>✓ No script execution</li>
          <li>✓ Lower transaction fees</li>
          <li>✗ No programmable logic</li>
        </ul>
      </div>
      <div className='rounded-lg border border-border p-4'>
        <div className='mb-3 flex items-center gap-2'>
          <ScriptBadge isScript={true} />
          <h4 className='font-semibold text-text'>Smart Contract</h4>
        </div>
        <ul className='space-y-2 text-text-sm text-text'>
          <li>✓ Programmable logic</li>
          <li>✓ Automated execution</li>
          <li>✓ Plutus/Native scripts</li>
          <li>✓ DeFi/dApp integration</li>
          <li>✗ Higher complexity</li>
        </ul>
      </div>
    </div>
  ),
};
