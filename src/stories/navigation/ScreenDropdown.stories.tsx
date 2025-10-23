import type { Meta, StoryObj } from "@storybook/react";
import { ScreenDropdown } from "../../ui/screenDropdown";
import type { NestedNavigation } from "../../types/navigationTypes";

// Mock navigation data
const blockchainOptions: NestedNavigation = {
  Blocks: {
    label: "Blocks",
    labelHref: "/blocks" as any,
    options: [
      { label: "Latest Blocks", href: "/blocks" as any },
      { label: "Block Details", href: "/block/$id" as any },
      { label: "Block Statistics", href: "/blocks/stats" as any },
    ],
  },
  Transactions: {
    label: "Transactions",
    labelHref: "/transactions" as any,
    options: [
      { label: "Recent Transactions", href: "/transactions" as any },
      { label: "Transaction Details", href: "/transaction/$hash" as any },
      { label: "Mempool", href: "/mempool" as any },
    ],
  },
  Addresses: {
    label: "Addresses",
    options: [
      { label: "Address Search", href: "/address/$addr" as any },
      { label: "Rich List", href: "/addresses/richlist" as any },
    ],
  },
};

const stakingOptions: NestedNavigation = {
  Pools: {
    label: "Stake Pools",
    labelHref: "/pools" as any,
    options: [
      { label: "All Pools", href: "/pools" as any },
      { label: "Pool Details", href: "/pool/$id" as any },
      { label: "Pool Rankings", href: "/pools/rankings" as any },
    ],
  },
  Delegation: {
    label: "Delegation",
    options: [
      { label: "Delegators", href: "/delegators" as any },
      { label: "Stake Distribution", href: "/stake-distribution" as any },
    ],
  },
  Rewards: {
    label: "Rewards",
    options: [
      { label: "Epoch Rewards", href: "/rewards" as any },
      { label: "Reward Calculator", href: "/calculator" as any },
    ],
  },
};

const meta: Meta<typeof ScreenDropdown> = {
  title: "Navigation/ScreenDropdown",
  component: ScreenDropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Provides a full-width mega menu dropdown for complex navigation structures with grouped options.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    id: {
      control: "text",
      description: "Unique identifier for dropdown state management",
      table: {
        type: { summary: "string" },
      },
    },
    label: {
      control: "text",
      description: "Label/trigger content for the dropdown",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    options: {
      control: "object",
      description: "Nested navigation structure with grouped menu options",
      table: {
        type: { summary: "NestedNavigation" },
      },
    },
    hideChevron: {
      control: "boolean",
      description: "Hide the chevron icon next to the label",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    triggerClassName: {
      control: "text",
      description: "CSS classes for the trigger button",
      table: {
        type: { summary: "string" },
      },
    },
    wrapperClassname: {
      control: "text",
      description: "CSS classes for the wrapper div",
      table: {
        type: { summary: "string" },
      },
    },
    disableHover: {
      control: "boolean",
      description: "Disable hover open/close behavior (only allow click)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    closeOnSelect: {
      control: "boolean",
      description: "Close dropdown when any option is selected",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    card: {
      control: false,
      description: "Optional card content to display at the top",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex min-h-[500px] w-full flex-col bg-background'>
        <div className='relative flex items-center justify-center border-b border-border bg-cardBg p-4'>
          <Story />
        </div>
        <div className='flex flex-1 items-center justify-center p-10 text-center text-sm text-gray-500'>
          Click or hover over the dropdown to see the menu
          <br />
          <span className='text-xs'>(Menu appears below the trigger)</span>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default blockchain navigation menu
 */
export const Default: Story = {
  args: {
    id: "blockchain-menu",
    label: "Blockchain",
    options: blockchainOptions,
  },
};

/**
 * Staking navigation menu with multiple sections
 */
export const StakingMenu: Story = {
  args: {
    id: "staking-menu",
    label: "Staking",
    options: stakingOptions,
  },
};

/**
 * Menu without chevron icon
 */
export const WithoutChevron: Story = {
  args: {
    id: "no-chevron-menu",
    label: "Menu",
    options: blockchainOptions,
    hideChevron: true,
  },
};

/**
 * Click-only mode (hover disabled)
 */
export const ClickOnly: Story = {
  args: {
    id: "click-only-menu",
    label: "Click Only",
    options: stakingOptions,
    disableHover: true,
  },
};

/**
 * With custom trigger styling
 */
export const CustomStyling: Story = {
  args: {
    id: "custom-menu",
    label: "Custom Menu",
    options: blockchainOptions,
    triggerClassName: "text-primary font-bold px-4 py-2",
  },
};

/**
 * Close on selection mode
 */
export const CloseOnSelect: Story = {
  args: {
    id: "close-select-menu",
    label: "Auto Close",
    options: stakingOptions,
    closeOnSelect: true,
  },
};

/**
 * With featured card content
 */
export const WithCard: Story = {
  args: {
    id: "card-menu",
    label: "Featured",
    options: blockchainOptions,
    card: (
      <div className='mb-2 w-[200px] rounded-lg border border-primary bg-background p-4'>
        <h3 className='mb-2 text-sm font-bold text-primary'>Featured</h3>
        <p className='text-xs text-gray-600'>Latest blockchain updates</p>
      </div>
    ),
  },
};
