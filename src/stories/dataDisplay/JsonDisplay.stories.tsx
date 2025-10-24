import type { Meta, StoryObj } from "@storybook/react";
import { JsonDisplay } from "../../ui/jsonDisplay";
import { useState, type FC } from "react";

// Mock blockchain transaction data
const mockTransactionData = {
  hash: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
  block: 8234567,
  block_time: "2024-01-15T14:32:10Z",
  slot: 123456789,
  epoch: 425,
  size: 512,
  fee: 170000,
  amount: 1250500000,
  inputs: [
    {
      address:
        "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz8",
      value: 1250670000,
      tx_hash:
        "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678901abc234",
      output_index: 0,
    },
  ],
  outputs: [
    {
      address:
        "addr1q987zyx654wvu321tsr210qpo987nml654kji321hgf098edc765",
      value: 1250500000,
      assets: [],
    },
  ],
};

// Mock stake pool metadata
const mockPoolMetadata = {
  pool_id: "pool1z22x50lqsrwent6en0llzzs9e577rx7n3mv9kfw7udwa2rf42fa",
  ticker: "HAPPY",
  name: "Happy Stake Pool",
  description: "A community-focused stake pool committed to decentralization",
  homepage: "https://happystakepool.io",
  live_stake: "64500000000000",
  active_stake: "64500000000000",
  saturated: false,
  blocks_minted: 1234,
  pledge: "100000000000",
  margin: 0.02,
  fixed_cost: "340000000",
  reward_account: "stake1u9xyz123abc456def789ghi012jkl345mno678pqr901stu234",
  owners: [
    "stake1u9abc123def456ghi789jkl012mno345pqr678stu901vwx234",
    "stake1u9def456ghi789jkl012mno345pqr678stu901vwx234yz5678",
  ],
  registration: [
    {
      tx_hash:
        "xyz789abc456def123ghi890jkl567mno234pqr901stu678vwx345abc678def",
      cert_index: 0,
      action: "registered",
    },
  ],
};

// Mock smart contract datum
const mockDatumData = {
  constructor: 0,
  fields: [
    {
      bytes:
        "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    },
    {
      int: 1250500000,
    },
    {
      list: [
        { bytes: "abc123" },
        { bytes: "def456" },
        { bytes: "ghi789" },
      ],
    },
    {
      map: [
        {
          k: { bytes: "key1" },
          v: { int: 100 },
        },
        {
          k: { bytes: "key2" },
          v: { int: 200 },
        },
      ],
    },
  ],
};

// Mock simple data
const mockSimpleData = {
  status: "success",
  message: "Transaction confirmed",
  confirmations: 42,
  timestamp: 1705329130,
};

const meta: Meta<typeof JsonDisplay> = {
  title: "Data Display/JsonDisplay",
  component: JsonDisplay,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A comprehensive JSON viewer with syntax highlighting, search functionality, copy to clipboard, and theme support.",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      description: "JSON data to display",
      table: {
        type: { summary: "any" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Loading state",
      table: {
        type: { summary: "boolean" },
      },
    },
    isError: {
      control: "boolean",
      description: "Error state",
      table: {
        type: { summary: "boolean" },
      },
    },
    search: {
      control: "boolean",
      description: "Enable search functionality",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    iconsRight: {
      control: "text",
      description: "Right position offset for icons",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"24px"' },
      },
    },
    onClose: {
      control: false,
      description: "Close callback",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
  decorators: [
    Story => (
      <div className="flex min-h-[500px] w-full items-start justify-center bg-background p-4">
        <div className="h-[500px] w-full max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  return (
    <JsonDisplay
      data={{ data: mockTransactionData }}
      isLoading={false}
      isError={false}
    />
  );
};

const WithSearchTemplate: FC = () => {
  return (
    <JsonDisplay
      data={{ data: mockTransactionData }}
      isLoading={false}
      isError={false}
      search={true}
    />
  );
};

const WithCloseButtonTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker"
        >
          Show JSON
        </button>
      </div>
    );
  }

  return (
    <JsonDisplay
      data={{ data: mockPoolMetadata }}
      isLoading={false}
      isError={false}
      search={true}
      onClose={() => setIsOpen(false)}
    />
  );
};

const LoadingStateTemplate: FC = () => {
  return <JsonDisplay data={null} isLoading={true} isError={false} />;
};

const ErrorStateTemplate: FC = () => {
  return <JsonDisplay data={null} isLoading={false} isError={true} />;
};

const SmartContractDatumTemplate: FC = () => {
  return (
    <JsonDisplay
      data={{ data: mockDatumData }}
      isLoading={false}
      isError={false}
      search={true}
    />
  );
};

const SimpleDataTemplate: FC = () => {
  return (
    <JsonDisplay
      data={{ data: mockSimpleData }}
      isLoading={false}
      isError={false}
    />
  );
};

/**
 * Default JSON display with transaction data
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * JSON display with search functionality enabled
 */
export const WithSearch: Story = {
  render: () => <WithSearchTemplate />,
};

/**
 * JSON display with close button
 */
export const WithCloseButton: Story = {
  render: () => <WithCloseButtonTemplate />,
};

/**
 * Loading state while fetching data
 */
export const LoadingState: Story = {
  render: () => <LoadingStateTemplate />,
};

/**
 * Error state when data fetch fails
 */
export const ErrorState: Story = {
  render: () => <ErrorStateTemplate />,
};

/**
 * Smart contract datum with complex nested structure
 */
export const SmartContractDatum: Story = {
  render: () => <SmartContractDatumTemplate />,
};

/**
 * Simple JSON data with few fields
 */
export const SimpleData: Story = {
  render: () => <SimpleDataTemplate />,
};
