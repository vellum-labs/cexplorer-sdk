import type { Meta, StoryObj } from "@storybook/react";
import { ExportTableModal } from "../../ui/exportTableModal";
import { useState, type FC } from "react";

// Mock table columns for transactions
const mockTransactionColumns = [
  { key: "hash", label: "Transaction Hash", exportable: true },
  { key: "block", label: "Block", exportable: true },
  { key: "timestamp", label: "Time", exportable: true },
  { key: "amount", label: "Amount", exportable: true },
  { key: "fee", label: "Fee", exportable: true },
];

// Mock transaction data
const mockTransactions = [
  {
    hash: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    block: 8234567,
    timestamp: "2024-01-15 14:32:10",
    amount: "1,250.50 ADA",
    fee: "0.17 ADA",
  },
  {
    hash: "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678901abc234",
    block: 8234566,
    timestamp: "2024-01-15 14:30:45",
    amount: "500.00 ADA",
    fee: "0.17 ADA",
  },
  {
    hash: "xyz789abc456def123ghi890jkl567mno234pqr901stu678vwx345abc678def",
    block: 8234565,
    timestamp: "2024-01-15 14:28:20",
    amount: "2,100.75 ADA",
    fee: "0.17 ADA",
  },
];

// Mock columns for stake pools
const mockPoolColumns = [
  { key: "ticker", label: "Ticker", exportable: true },
  { key: "name", label: "Pool Name", exportable: true },
  { key: "stake", label: "Live Stake", exportable: true },
  { key: "margin", label: "Margin", exportable: true },
  { key: "pledge", label: "Pledge", exportable: true },
];

// Mock pool data
const mockPools = [
  {
    ticker: "HAPPY",
    name: "Happy Stake Pool",
    stake: "64,500,000 ADA",
    margin: "2.0%",
    pledge: "100,000 ADA",
  },
  {
    ticker: "TITAN",
    name: "Titan Staking",
    stake: "52,300,000 ADA",
    margin: "1.5%",
    pledge: "250,000 ADA",
  },
  {
    ticker: "OCEAN",
    name: "Ocean Pool",
    stake: "45,800,000 ADA",
    margin: "3.0%",
    pledge: "50,000 ADA",
  },
];

// Mock columns with many fields
const mockDetailedColumns = [
  { key: "id", label: "ID", exportable: true },
  { key: "hash", label: "Hash", exportable: true },
  { key: "block", label: "Block", exportable: true },
  { key: "epoch", label: "Epoch", exportable: true },
  { key: "slot", label: "Slot", exportable: true },
  { key: "timestamp", label: "Timestamp", exportable: true },
  { key: "size", label: "Size", exportable: true },
  { key: "amount", label: "Amount", exportable: true },
  { key: "fee", label: "Fee", exportable: true },
  { key: "inputs", label: "Inputs", exportable: true },
  { key: "outputs", label: "Outputs", exportable: true },
];

const meta: Meta<typeof ExportTableModal> = {
  title: "Overlay/ExportTableModal",
  component: ExportTableModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A modal dialog for exporting table data in CSV or JSON format with format selection and automatic download.",
      },
    },
  },
  argTypes: {
    onClose: {
      control: false,
      description: "Callback when modal is closed",
      table: {
        type: { summary: "() => void" },
      },
    },
    columns: {
      control: "object",
      description: "Table columns configuration",
      table: {
        type: { summary: "TableColumns<any>" },
      },
    },
    items: {
      control: "object",
      description: "Array of table data items",
      table: {
        type: { summary: "any[]" },
      },
    },
    currentPage: {
      control: "number",
      description: "Current page number",
      table: {
        type: { summary: "number" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker"
        >
          Open Export Modal
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background">
      <ExportTableModal
        onClose={() => setIsOpen(false)}
        columns={mockTransactionColumns as any}
        items={mockTransactions}
        currentPage={1}
      />
    </div>
  );
};

const StakePoolsTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker"
        >
          Open Export Modal
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background">
      <ExportTableModal
        onClose={() => setIsOpen(false)}
        columns={mockPoolColumns as any}
        items={mockPools}
        currentPage={1}
      />
    </div>
  );
};

const EmptyDataTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker"
        >
          Open Export Modal
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background">
      <ExportTableModal
        onClose={() => setIsOpen(false)}
        columns={mockTransactionColumns as any}
        items={[]}
        currentPage={1}
      />
    </div>
  );
};

const LargeDatasetTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Generate large dataset
  const largeDataset = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    hash: `hash_${i}_${Math.random().toString(36).substring(7)}`,
    block: 8234567 + i,
    epoch: 425 + Math.floor(i / 21600),
    slot: 123456789 + i,
    timestamp: new Date(Date.now() - i * 20000).toISOString(),
    size: Math.floor(Math.random() * 10000) + 500,
    amount: `${(Math.random() * 10000).toFixed(2)} ADA`,
    fee: `${(Math.random() * 2).toFixed(2)} ADA`,
    inputs: Math.floor(Math.random() * 5) + 1,
    outputs: Math.floor(Math.random() * 5) + 1,
  }));

  if (!isOpen) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker"
        >
          Open Export Modal (100 items)
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background">
      <ExportTableModal
        onClose={() => setIsOpen(false)}
        columns={mockDetailedColumns as any}
        items={largeDataset}
        currentPage={2}
      />
    </div>
  );
};

/**
 * Default export modal with transaction data
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * Export modal with stake pool data
 */
export const StakePools: Story = {
  render: () => <StakePoolsTemplate />,
};

/**
 * Export modal with empty data array
 */
export const EmptyData: Story = {
  render: () => <EmptyDataTemplate />,
};

/**
 * Export modal with large dataset (100 items)
 */
export const LargeDataset: Story = {
  render: () => <LargeDatasetTemplate />,
};
