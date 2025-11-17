import type { Meta, StoryObj } from "@storybook/react";
import { BlockCell } from "../../ui/blockCell";

const meta: Meta<typeof BlockCell> = {
  title: "Data Display/BlockCell",
  component: BlockCell,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays Cardano block numbers as formatted, clickable links to block detail pages.",
      },
    },
  },
  argTypes: {
    hash: {
      control: "text",
      description: "Block hash for routing to block detail page",
      table: {
        type: { summary: "string" },
      },
    },
    no: {
      control: "number",
      description: "Block number to display (formatted with thousand separators)",
      table: {
        type: { summary: "number" },
      },
    },
    justify: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Horizontal alignment of the block cell content",
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
 * Default block cell with formatted number
 */
export const Default: Story = {
  args: {
    hash: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    no: 10234567,
  },
};

/**
 * Recent block with lower number
 */
export const RecentBlock: Story = {
  args: {
    hash: "a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890",
    no: 11000000,
  },
};

/**
 * Very large block number
 */
export const LargeBlockNumber: Story = {
  args: {
    hash: "abc123def456789012345678901234567890123456789012345678901234567890",
    no: 99999999,
  },
};

/**
 * Small block number (early blockchain)
 */
export const SmallBlockNumber: Story = {
  args: {
    hash: "111222333444555666777888999000aaabbbcccdddeeefff00011122233344455",
    no: 1234,
  },
};

/**
 * Example showing blocks in a transaction table
 */
export const InTransactionTable: Story = {
  render: () => {
    const transactions = [
      {
        id: 1,
        hash: "tx1a2b3c4d5e6f...",
        blockHash:
          "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
        blockNo: 10234567,
        amount: "1,234.56 ₳",
      },
      {
        id: 2,
        hash: "tx2b3c4d5e6f7a...",
        blockHash:
          "6e31ea044695933712g0h4i9d135fc9fc363gf9dfgc35e2428ed4e543f051fcc",
        blockNo: 10234566,
        amount: "567.89 ₳",
      },
      {
        id: 3,
        hash: "tx3c4d5e6f7a8b...",
        blockHash:
          "7f42fb155806a44823h1j5k0e246gd0gd474hg0eghd46f3539fe5f654g162gdd",
        blockNo: 10234565,
        amount: "2,345.67 ₳",
      },
    ];

    return (
      <div className='w-full max-w-3xl rounded-lg border border-border bg-cardBg'>
        <table className='w-full'>
          <thead className='border-b border-border bg-background'>
            <tr>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Block
              </th>
              <th className='px-4 py-2 text-left text-text-sm font-semibold text-text'>
                Transaction Hash
              </th>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className='border-b border-border last:border-0'>
                <td className='px-4 py-3'>
                  <BlockCell hash={tx.blockHash} no={tx.blockNo} />
                </td>
                <td className='px-4 py-3 font-mono text-text-sm text-text'>
                  {tx.hash}
                </td>
                <td className='px-4 py-3 text-right text-text-sm font-medium text-text'>
                  {tx.amount}
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
 * Example showing blocks in an epoch detail view
 */
export const InEpochDetail: Story = {
  render: () => {
    const blocks = [
      {
        id: 1,
        hash: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
        no: 10234567,
        txCount: 45,
        slot: 98765432,
      },
      {
        id: 2,
        hash: "6e31ea044695933712g0h4i9d135fc9fc363gf9dfgc35e2428ed4e543f051fcc",
        no: 10234566,
        txCount: 38,
        slot: 98765431,
      },
      {
        id: 3,
        hash: "7f42fb155806a44823h1j5k0e246gd0gd474hg0eghd46f3539fe5f654g162gdd",
        no: 10234565,
        txCount: 52,
        slot: 98765430,
      },
      {
        id: 4,
        hash: "8g53gc266917b55934i2k6l1f357he1he585ih1fhie57g4640gf6g765h273hee",
        no: 10234564,
        txCount: 41,
        slot: 98765429,
      },
    ];

    return (
      <div className='w-full max-w-4xl rounded-lg border border-border bg-cardBg'>
        <div className='border-b border-border bg-background px-4 py-3'>
          <h3 className='text-text-md font-semibold text-text'>
            Epoch 455 - Recent Blocks
          </h3>
        </div>
        <table className='w-full'>
          <thead className='border-b border-border bg-background-secondary'>
            <tr>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Block
              </th>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Slot
              </th>
              <th className='px-4 py-2 text-right text-text-sm font-semibold text-text'>
                Transactions
              </th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr key={block.id} className='border-b border-border last:border-0'>
                <td className='px-4 py-3'>
                  <BlockCell hash={block.hash} no={block.no} />
                </td>
                <td className='px-4 py-3 text-right text-text-sm text-text'>
                  {block.slot.toLocaleString()}
                </td>
                <td className='px-4 py-3 text-right text-text-sm text-text'>
                  {block.txCount}
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
    const blockHash =
      "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb";
    const blockNo = 10234567;

    return (
      <div className='flex w-full flex-col gap-4'>
        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-sm font-semibold text-text'>
            Right-aligned (default - for tables)
          </h4>
          <BlockCell hash={blockHash} no={blockNo} justify='end' />
        </div>

        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-sm font-semibold text-text'>
            Left-aligned
          </h4>
          <BlockCell hash={blockHash} no={blockNo} justify='start' />
        </div>

        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-sm font-semibold text-text'>
            Center-aligned
          </h4>
          <BlockCell hash={blockHash} no={blockNo} justify='center' />
        </div>
      </div>
    );
  },
};

/**
 * Example in a block explorer dashboard
 */
export const InDashboard: Story = {
  render: () => {
    return (
      <div className='w-full max-w-lg rounded-lg border border-border bg-cardBg p-6'>
        <h3 className='mb-4 text-text-lg font-semibold text-text'>
          Latest Blocks
        </h3>

        <div className='flex flex-col gap-3'>
          <div className='flex items-center justify-between rounded bg-background p-3'>
            <span className='text-text-sm text-text-muted'>
              Latest Block:
            </span>
            <BlockCell
              hash='5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb'
              no={11234567}
            />
          </div>

          <div className='flex items-center justify-between rounded bg-background p-3'>
            <span className='text-text-sm text-text-muted'>
              Previous Block:
            </span>
            <BlockCell
              hash='6e31ea044695933712g0h4i9d135fc9fc363gf9dfgc35e2428ed4e543f051fcc'
              no={11234566}
            />
          </div>

          <div className='flex items-center justify-between rounded bg-background p-3'>
            <span className='text-text-sm text-text-muted'>
              Block 2 ago:
            </span>
            <BlockCell
              hash='7f42fb155806a44823h1j5k0e246gd0gd474hg0eghd46f3539fe5f654g162gdd'
              no={11234565}
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Example showing block references in different contexts
 */
export const MultipleContexts: Story = {
  render: () => {
    const blockHash =
      "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb";

    return (
      <div className='flex flex-col gap-4'>
        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-md font-semibold text-text'>
            Transaction confirmed in block:
          </h4>
          <BlockCell hash={blockHash} no={10234567} justify='start' />
        </div>

        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-md font-semibold text-text'>
            Stake pool produced block:
          </h4>
          <BlockCell hash={blockHash} no={10234567} justify='start' />
        </div>

        <div className='rounded-lg border border-border bg-cardBg p-4'>
          <h4 className='mb-3 text-text-md font-semibold text-text'>
            Governance action proposed in block:
          </h4>
          <BlockCell hash={blockHash} no={10234567} justify='start' />
        </div>
      </div>
    );
  },
};
