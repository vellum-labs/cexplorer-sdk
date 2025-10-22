import { OverviewCard } from "@/ui/overviewCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof OverviewCard> = {
  title: "Data Display/OverviewCard",
  component: OverviewCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Versatile card component for displaying structured blockchain data in label-value format with extensive customization options.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Main title displayed at the top of the card",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    subTitle: {
      control: "text",
      description: "Subtitle displayed in the top-right corner",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    overviewList: {
      control: "object",
      description: "Array of label-value pairs for the two-column grid",
      table: {
        type: { summary: "OverviewList" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS classes for card styling",
      table: {
        type: { summary: "string" },
      },
    },
    labelClassname: {
      control: "text",
      description: "CSS classes for label (left column) styling",
      table: {
        type: { summary: "string" },
      },
    },
    tBodyClassname: {
      control: "text",
      description: "CSS classes for table body container",
      table: {
        type: { summary: "string" },
      },
    },
    startContent: {
      control: false,
      description: "Content displayed at start of card body",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    endContent: {
      control: false,
      description: "Content displayed at end of card body",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    leading: {
      control: "boolean",
      description: "Remove vertical padding from items",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hFit: {
      control: "boolean",
      description: "Grid height fits content",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showTitleDivider: {
      control: "boolean",
      description: "Show horizontal divider below title",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showContentDivider: {
      control: "boolean",
      description: "Show horizontal divider before endContent",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    threshold: {
      control: "number",
      description: "Governance threshold (0-1 range)",
      table: {
        type: { summary: "number" },
      },
    },
    voterType: {
      control: "select",
      options: ["drep", "spo"],
      description: "Voter type for threshold tooltip",
      table: {
        type: { summary: '"drep" | "spo"' },
        defaultValue: { summary: '"drep"' },
      },
    },
    columnGap: {
      control: "text",
      description: "Gap between label and value columns",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"48px"' },
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
 * Default card with block details
 */
export const Default: Story = {
  args: {
    title: "Block Details",
    overviewList: [
      { label: "Height", value: "8,234,567" },
      { label: "Hash", value: "5f20df933584822601f9e3f8c024eb5eb252fe8c" },
      { label: "Epoch", value: "478" },
      { label: "Slot", value: "123456789" },
      { label: "Block Size", value: "64.00 KB" },
      { label: "Transactions", value: "42" },
    ],
  },
};

/**
 * Transaction details with subtitle
 */
export const TransactionDetails: Story = {
  args: {
    title: "Transaction Details",
    subTitle: "Confirmed",
    overviewList: [
      { label: "Tx Hash", value: "abc123def456789..." },
      { label: "Fee", value: "₳ 0.17" },
      { label: "Block", value: "8,234,567" },
      { label: "Confirmations", value: "1,245" },
      { label: "Timestamp", value: "2024-01-15 14:23:45 UTC" },
    ],
  },
};

/**
 * Card with title divider
 */
export const WithTitleDivider: Story = {
  args: {
    title: "Stake Pool Information",
    showTitleDivider: true,
    overviewList: [
      { label: "Ticker", value: "POOL1" },
      { label: "Pledge", value: "₳ 100,000" },
      { label: "Margin", value: "2%" },
      { label: "Fixed Cost", value: "₳ 340" },
      { label: "Saturation", value: "45.2%" },
    ],
  },
};

/**
 * Governance action with threshold
 */
export const GovernanceAction: Story = {
  args: {
    title: "Governance Action",
    subTitle: "Active",
    showTitleDivider: true,
    overviewList: [
      { label: "Type", value: "Treasury Withdrawal" },
      { label: "Amount", value: "₳ 1,000,000" },
      { label: "Submitted", value: "2024-01-15" },
      { label: "Expires", value: "Epoch 485" },
      { label: "Yes Votes", value: "67.5%" },
      { label: "No Votes", value: "32.5%" },
    ],
    threshold: 0.67,
    voterType: "drep",
  },
};

/**
 * Card with endContent section
 */
export const WithEndContent: Story = {
  args: {
    title: "Address Overview",
    overviewList: [
      { label: "Address", value: "addr1qxyz123..." },
      { label: "Balance", value: "₳ 1,234.56" },
      { label: "Stake Address", value: "stake1u8a9..." },
      { label: "Delegated To", value: "POOL1" },
    ],
    showContentDivider: true,
    endContent: (
      <div className='flex gap-2 pt-2'>
        <button className='rounded bg-blue-500 px-3 py-1 text-sm text-white'>
          View Transactions
        </button>
      </div>
    ),
  },
};

/**
 * Compact layout with leading
 */
export const CompactLayout: Story = {
  args: {
    title: "Quick Stats",
    leading: true,
    hFit: true,
    overviewList: [
      { label: "Status", value: "Active" },
      { label: "Count", value: "42" },
      { label: "Updated", value: "Just now" },
    ],
  },
};

/**
 * Custom column gap and styling
 */
export const CustomStyling: Story = {
  args: {
    title: "Asset Details",
    columnGap: "80px",
    className: "border-purple-500",
    labelClassname: "font-bold",
    overviewList: [
      { label: "Policy ID", value: "f43a62fdc3965df486..." },
      { label: "Asset Name", value: "MyToken" },
      { label: "Quantity", value: "1,000,000" },
      { label: "Decimals", value: "6" },
    ],
  },
};
