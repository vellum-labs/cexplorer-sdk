import type { Meta, StoryObj } from "@storybook/react";
import { AttributeDropdown } from "../../ui/attributeDropdown";
import { Button } from "../../ui/button";
import { Icon } from "../../ui/icon";

const meta: Meta<typeof AttributeDropdown> = {
  title: "Data Display/AttributeDropdown",
  component: AttributeDropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a virtualized list of label-value pairs in a popover dropdown, optimized for large datasets.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of label-value pairs to display",
      table: {
        type: {
          summary:
            "Array<{label: ReactNode, value: ReactNode, visible?: boolean}>",
        },
      },
    },
    children: {
      control: false,
      description: "Trigger element for the dropdown",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for popover content",
      table: {
        type: { summary: "string" },
      },
    },
    itemSize: {
      control: "number",
      description: "Height of each item row in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "30" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default AttributeDropdown with NFT metadata attributes
 */
export const Default: Story = {
  args: {
    items: [
      { label: "Name", value: "Cool NFT #123" },
      { label: "Collection", value: "Cardano Apes" },
      { label: "Rarity", value: "Legendary" },
      { label: "Mint Date", value: "2024-01-15" },
      { label: "Creator", value: "artist.ada" },
    ],
    children: <Button size='md' variant='primary' label='View Attributes' />,
  },
};

/**
 * Transaction details with blockchain data
 */
export const TransactionDetails: Story = {
  args: {
    items: [
      {
        label: "Hash",
        value:
          "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
      },
      { label: "Block", value: "8234567" },
      { label: "Epoch", value: "425" },
      { label: "Slot", value: "98234567" },
      { label: "Fees", value: "0.17 ADA" },
      { label: "Size", value: "452 bytes" },
      { label: "Confirmations", value: "1,234" },
    ],
    children: <Button size='md' variant='secondary' label='Transaction Info' />,
  },
};

/**
 * Token metadata with conditional visibility
 */
export const WithConditionalVisibility: Story = {
  args: {
    items: [
      { label: "Token Name", value: "HOSKY", visible: true },
      { label: "Ticker", value: "HOSKY", visible: true },
      { label: "Total Supply", value: "1,000,000,000", visible: true },
      {
        label: "Hidden Attribute",
        value: "This should not appear",
        visible: false,
      },
      {
        label: "Policy ID",
        value: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235",
        visible: true,
      },
      { label: "Another Hidden", value: "Also hidden", visible: false },
    ],
    children: <Button size='sm' variant='tertiary' label='Token Details' />,
  },
};

/**
 * Large list with many items (virtualized for performance)
 */
export const LargeList: Story = {
  args: {
    items: Array.from({ length: 50 }, (_, i) => ({
      label: `Attribute ${i + 1}`,
      value: `Value ${i + 1}`,
    })),
    children: <Button size='md' variant='primary' label='50 Attributes' />,
  },
};

/**
 * Custom item height for taller rows
 */
export const CustomItemHeight: Story = {
  args: {
    items: [
      { label: "Name", value: "Tall Row Item" },
      { label: "Description", value: "This has more space" },
      { label: "Category", value: "Custom Height" },
      { label: "Tags", value: "tall, spacious, custom" },
    ],
    itemSize: 50,
    children: <Button size='lg' variant='primary' label='Tall Items' />,
  },
};

/**
 * With icon trigger
 */
export const WithIconTrigger: Story = {
  args: {
    items: [
      { label: "Status", value: "Active" },
      { label: "Created", value: "2024-01-15" },
      { label: "Modified", value: "2024-10-24" },
      { label: "Owner", value: "user@cardano.org" },
    ],
    children: (
      <button className='flex items-center gap-2 rounded-s border border-border bg-background px-3 py-2 hover:bg-darker'>
        <Icon name='info' size={16} />
        <span className='text-text-sm'>Info</span>
      </button>
    ),
  },
};

/**
 * Empty state with no items
 */
export const Empty: Story = {
  args: {
    items: [],
    children: <Button size='md' variant='secondary' label='No Attributes' />,
  },
};

/**
 * Smart contract properties
 */
export const SmartContractProperties: Story = {
  args: {
    items: [
      {
        label: "Contract Address",
        value: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
      },
      { label: "Plutus Version", value: "V2" },
      { label: "Script Hash", value: "abc123def456789..." },
      { label: "Total UTXOs", value: "42" },
      { label: "Total Value Locked", value: "1,234,567 ADA" },
      { label: "Interactions", value: "5,678" },
      { label: "Created", value: "Epoch 412" },
    ],
    children: <Button size='md' variant='purple' label='Contract Details' />,
  },
};
