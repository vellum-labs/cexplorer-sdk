import type { Meta, StoryObj } from "@storybook/react";
import { HeaderBannerSubtitle } from "../../ui/headerBannerSubtitle";

const meta: Meta<typeof HeaderBannerSubtitle> = {
  title: "Navigation/HeaderBannerSubtitle",
  component: HeaderBannerSubtitle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a labeled hash value with a copy-to-clipboard button, commonly used in header sections.",
      },
    },
  },
  argTypes: {
    hash: {
      control: "text",
      description: "The full hash value to be copied to clipboard",
      table: {
        type: { summary: "string | undefined" },
      },
    },
    hashString: {
      control: "text",
      description: "The hash string to display (can be truncated for UI)",
      table: {
        type: { summary: "string | undefined" },
      },
    },
    title: {
      control: "text",
      description: "Optional title label that appears before the hash",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Hash"' },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS class names for styling customization",
      table: {
        type: { summary: "string" },
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
 * Default state with standard "Hash" label
 */
export const Default: Story = {
  args: {
    hash: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    hashString: "5f20df93...e940ebb",
  },
};

/**
 * Transaction hash display with custom "Transaction" label
 */
export const Transaction: Story = {
  args: {
    title: "Transaction",
    hash: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    hashString: "5f20df93...e940ebb",
  },
};

/**
 * Block hash display
 */
export const BlockHash: Story = {
  args: {
    title: "Block",
    hash: "89a3f8e2c1d4b5f6a7e8d9c0b1a2f3e4d5c6b7a8e9f0a1b2c3d4e5f6a7b8c9d0",
    hashString: "89a3f8e2...a7b8c9d0",
  },
};

/**
 * Address display with custom label
 */
export const Address: Story = {
  args: {
    title: "Address",
    hash: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234vwx567yza890bcd123efg456hij789klm012nop345qrs678tuv901wxy234",
    hashString: "addr1qxyz123...tuv901wxy234",
  },
};

/**
 * Pool ID display
 */
export const PoolId: Story = {
  args: {
    title: "Pool ID",
    hash: "pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
    hashString: "pool1qqqq...qqqqqqqq",
  },
};

/**
 * Display with full untruncated hash
 */
export const FullHash: Story = {
  args: {
    title: "Full Hash",
    hash: "abc123",
    hashString: "abc123",
  },
};
