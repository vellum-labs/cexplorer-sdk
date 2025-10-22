import type { Meta, StoryObj } from "@storybook/react";
import { LabelBadge } from "../../ui/labelBadge";

const meta: Meta<typeof LabelBadge> = {
  title: "Data Display/LabelBadge",
  component: LabelBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge component for displaying labeled blockchain scripts and contracts with tooltip information.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["sm", "lg", "textOnly"],
      description: "Size variant of the badge",
      table: {
        type: { summary: '"sm" | "lg" | "textOnly"' },
        defaultValue: { summary: "sm" },
      },
    },
    label: {
      control: "object",
      description:
        "Label data containing text, category, source, and blockchain information",
      table: {
        type: { summary: "Label" },
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
    extra: {
      control: "object",
      description:
        "Optional extra styling for textOnly variant (bg, color, fw, link)",
      table: {
        type: { summary: "object" },
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
 * Default small badge variant with DeFi label
 */
export const Default: Story = {
  args: {
    variant: "sm",
    label: {
      label: "Minswap",
      category: ["DeFi", "DEX"],
      source: "CardanoScan",
      data: {
        scriptHash: "e1317b152faac13426e6a83e06ff88a4d62cce3c1634ab0a5ec13309",
        contractAddress:
          "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
  },
};

/**
 * Small variant with NFT marketplace label
 */
export const SmallNFT: Story = {
  args: {
    variant: "sm",
    label: {
      label: "JPG.store",
      category: ["NFT", "Marketplace"],
      source: "Official Registry",
      data: {
        scriptHash: "a5bb0e5bb275a573d744a021f9b3bff73595468e002755b447e01559",
        contractAddress:
          "addr1wxsnz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76s",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
  },
};

/**
 * Large variant for detail views
 */
export const Large: Story = {
  args: {
    variant: "lg",
    label: {
      label: "SundaeSwap AMM",
      category: ["DeFi", "Liquidity Pool", "AMM"],
      source: "CardanoScan",
      data: {
        scriptHash: "4020e7fc2de75a0729c3cc3c2529e8ad6a0658e05c9e5ac8333888f0",
        contractAddress:
          "addr1z9snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0x",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
  },
};

/**
 * Large variant with lending protocol
 */
export const LargeLending: Story = {
  args: {
    variant: "lg",
    label: {
      label: "Liqwid Finance",
      category: ["DeFi", "Lending", "Money Market"],
      source: "Official Registry",
      data: {
        scriptHash: "b3d6e1c8e9a4f7d2c5b8a1e4f7d0c3b6a9e2f5d8c1b4a7e0f3d6c9",
        contractAddress:
          "addr1w8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79g",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
    className: "font-semibold",
  },
};

/**
 * Text-only variant without tooltip
 */
export const TextOnly: Story = {
  args: {
    variant: "textOnly",
    label: {
      label: "Plutus V2",
      category: ["Smart Contract"],
      source: "Blockchain",
      data: {
        scriptHash: "",
        contractAddress: "",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
  },
};

/**
 * Text-only variant with custom styling
 */
export const TextOnlyStyled: Story = {
  args: {
    variant: "textOnly",
    label: {
      label: "Plutus V2 Script",
      category: ["Smart Contract"],
      source: "Blockchain",
      data: {
        scriptHash: "",
        contractAddress: "",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
    extra: {
      bg: "#e8f5e9",
      color: "#2e7d32",
      fw: 600,
      link: null,
    },
  },
};

/**
 * Text-only variant with clickable link
 */
export const TextOnlyWithLink: Story = {
  args: {
    variant: "textOnly",
    label: {
      label: "View on Explorer",
      category: ["External Link"],
      source: "CardanoScan",
      data: {
        scriptHash: "",
        contractAddress: "",
      },
      extra: {
        bg: null,
        fw: null,
        link: null,
        color: null,
      },
    },
    extra: {
      bg: "#f3e5f5",
      color: "#7b1fa2",
      fw: 500,
      link: "https://cardanoscan.io",
    },
  },
};
