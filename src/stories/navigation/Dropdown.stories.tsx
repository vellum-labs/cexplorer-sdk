import { Dropdown } from "@/ui/dropdown";
import { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Dropdown> = {
  title: "Navigation/Dropdown",
  component: Dropdown,
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-start justify-center bg-background p-20'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Dropdown trigger label",
      control: "text",
    },
    options: {
      description: "Dropdown menu options",
      control: "object",
    },
    width: {
      description: "Dropdown menu width",
      control: "text",
    },
    hideChevron: {
      description: "Hide chevron icon",
      control: "boolean",
    },
    disableHover: {
      description: "Disable hover to open",
      control: "boolean",
    },
    closeOnSelect: {
      description: "Close dropdown on option select",
      control: "boolean",
    },
    withBorder: {
      description: "Show border around dropdown",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Dropdown menu component with support for nested options, keyboard navigation, and flexible positioning.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    id: "default-dropdown",
    label: "Blockchain",
    options: [
      { label: "Latest Blocks", onClick: () => console.log("Latest Blocks") },
      { label: "Transactions", onClick: () => console.log("Transactions") },
      { label: "Epochs", onClick: () => console.log("Epochs") },
      { label: "Stake Pools", onClick: () => console.log("Stake Pools") },
      { label: "Native Tokens", onClick: () => console.log("Native Tokens") },
      {
        label: "Smart Contracts",
        onClick: () => console.log("Smart Contracts"),
      },
    ],
  },
};

const WithLinks: Story = {
  args: {
    id: "links-dropdown",
    label: "Explorer",
    options: [
      { label: "Blocks", href: "/blocks" },
      { label: "Transactions", href: "/transactions" },
      { label: "Addresses", href: "/addresses" },
      { label: "Tokens", href: "/tokens" },
      { label: "Pools", href: "/pools" },
      { label: "Epochs", href: "/epochs" },
    ],
  },
};

const WithExternalLinks: Story = {
  args: {
    id: "external-dropdown",
    label: "Resources",
    options: [
      { label: "Cardano Docs", href: "https://docs.cardano.org" },
      { label: "CIP Standards", href: "https://cips.cardano.org" },
      { label: "Developer Portal", href: "https://developers.cardano.org" },
      { label: "Cardano Foundation", href: "https://cardanofoundation.org" },
    ],
  },
};

const WithNestedOptions: Story = {
  args: {
    id: "nested-dropdown",
    label: "Network Stats",
    width: "220px",
    options: [
      {
        label: "On-chain Metrics",
        nestedOptions: [
          { label: "Total Supply", href: "/stats/supply" },
          { label: "Active Addresses", href: "/stats/addresses" },
          { label: "Transaction Volume", href: "/stats/volume" },
          { label: "Block Production", href: "/stats/blocks" },
        ],
      },
      {
        label: "Staking",
        nestedOptions: [
          { label: "Total Staked", href: "/staking/total" },
          { label: "Active Pools", href: "/staking/pools" },
          { label: "Delegation", href: "/staking/delegation" },
        ],
      },
      {
        label: "DeFi",
        nestedOptions: [
          { label: "DEX Volume", href: "/defi/dex" },
          { label: "TVL", href: "/defi/tvl" },
          { label: "Protocols", href: "/defi/protocols" },
        ],
      },
    ],
  },
};

const WithDividers: Story = {
  args: {
    id: "dividers-dropdown",
    label: "Account",
    options: [
      {
        label: "My Wallets",
        onClick: () => console.log("My Wallets"),
        divider: true,
      },
      {
        label: "Watchlist",
        onClick: () => console.log("Watchlist"),
        divider: true,
      },
      {
        label: "Settings",
        onClick: () => console.log("Settings"),
        divider: true,
      },
      { label: "Sign Out", onClick: () => console.log("Sign Out") },
    ],
  },
};

const WithBorder: Story = {
  args: {
    id: "border-dropdown",
    label: "Network",
    withBorder: true,
    options: [
      { label: "Mainnet", onClick: () => console.log("Mainnet") },
      { label: "Preprod", onClick: () => console.log("Preprod") },
      { label: "Preview", onClick: () => console.log("Preview") },
    ],
  },
};

const CustomWidth: Story = {
  args: {
    id: "custom-width-dropdown",
    label: "Recent Blocks",
    width: "350px",
    options: [
      {
        label: "Block #10,234,567 - 2 min ago",
        onClick: () => console.log("Block 1"),
      },
      {
        label: "Block #10,234,566 - 3 min ago",
        onClick: () => console.log("Block 2"),
      },
      {
        label: "Block #10,234,565 - 5 min ago",
        onClick: () => console.log("Block 3"),
      },
    ],
  },
};

const HideChevron: Story = {
  args: {
    id: "no-chevron-dropdown",
    label: "₳ ADA",
    hideChevron: true,
    options: [
      { label: "Price Chart", onClick: () => console.log("Chart") },
      { label: "Market Cap", onClick: () => console.log("Market Cap") },
      { label: "Trading Volume", onClick: () => console.log("Volume") },
    ],
  },
};

const DisableHover: Story = {
  args: {
    id: "click-only-dropdown",
    label: "Filters",
    disableHover: true,
    options: [
      { label: "Show All", onClick: () => console.log("All") },
      {
        label: "Transactions Only",
        onClick: () => console.log("Transactions"),
      },
      { label: "Blocks Only", onClick: () => console.log("Blocks") },
    ],
  },
};

const CloseOnSelect: Story = {
  args: {
    id: "close-on-select-dropdown",
    label: "Quick Actions",
    closeOnSelect: true,
    options: [
      { label: "Search Address", onClick: () => console.log("Search") },
      { label: "Add to Watchlist", onClick: () => console.log("Watchlist") },
      { label: "Export Data", onClick: () => console.log("Export") },
    ],
  },
};

export {
  Default,
  WithLinks,
  WithExternalLinks,
  WithNestedOptions,
  WithDividers,
  WithBorder,
  CustomWidth,
  HideChevron,
  DisableHover,
  CloseOnSelect,
};
