import type { Meta, StoryObj } from "@storybook/react";
import { MintedByCard } from "../../ui/mintedByCard";

// Mock generateImageUrl function
const mockGenerateImageUrl = (
  _ident: string,
  _size: "ico" | "sm" | "md" | "lg",
  type?: "nft" | "pool" | "drep" | "token" | "cc",
) => {
  return `https://via.placeholder.com/25/0099FF/FFFFFF?text=${type?.toUpperCase() || "IMG"}`;
};

const meta: Meta<typeof MintedByCard> = {
  title: "Data Display/MintedByCard",
  component: MintedByCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays information about the stake pool that minted a block, including pool details, protocol version, and VRF key.",
      },
    },
  },
  argTypes: {
    poolInfo: {
      control: "object",
      description: "Stake pool information",
      table: {
        type: { summary: "PoolInfo" },
      },
    },
    isGenesisBlock: {
      control: "boolean",
      description: "Whether this is a genesis block",
      table: {
        type: { summary: "boolean" },
      },
    },
    vrfKey: {
      control: "text",
      description: "VRF (Verifiable Random Function) key",
      table: {
        type: { summary: "string" },
      },
    },
    protoMajor: {
      control: "number",
      description: "Protocol major version number",
      table: {
        type: { summary: "number" },
      },
    },
    protoMinor: {
      control: "number",
      description: "Protocol minor version number",
      table: {
        type: { summary: "number" },
      },
    },
    icon: {
      control: "text",
      description: "Optional custom icon URL",
      table: {
        type: { summary: "string" },
      },
    },
    miscData: {
      control: false,
      description: "Miscellaneous constants data",
      table: {
        type: { summary: "MiscConstResponseData" },
      },
    },
    generateImageUrl: {
      control: false,
      description: "Function to generate image URLs",
      table: {
        type: { summary: "Function" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-md'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default stake pool minted block with full information
 */
export const Default: Story = {
  args: {
    poolInfo: {
      id: "pool1z22x50lqsrwent6en0llzzs9e577rx7n3mv9kfw7udwa2rf42fa",
      meta: {
        name: "High Performance Stake Pool",
        ticker: "HPSP",
      },
    },
    isGenesisBlock: false,
    vrfKey: "vrf1w8a6rv7v5u5sn7qjz8f8k3pzml9x8qx2pzs7qg3qv7g8j6v4qc5s4d3f2g",
    protoMajor: 8,
    protoMinor: 0,
    miscData: undefined,
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Genesis block (no stake pool)
 */
export const GenesisBlock: Story = {
  args: {
    poolInfo: {
      id: "",
      meta: undefined,
    },
    isGenesisBlock: true,
    miscData: undefined,
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Pool with only ticker (no full name)
 */
export const PoolWithTickerOnly: Story = {
  args: {
    poolInfo: {
      id: "pool1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5",
      meta: {
        ticker: "MYSP",
      },
    },
    isGenesisBlock: false,
    vrfKey: "vrf1abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678",
    protoMajor: 9,
    protoMinor: 1,
    miscData: undefined,
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Pool without metadata (shows truncated ID)
 */
export const PoolWithoutMetadata: Story = {
  args: {
    poolInfo: {
      id: "pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt",
      meta: undefined,
    },
    isGenesisBlock: false,
    vrfKey: "vrf1xyz789abc456def123ghi890jkl567mno234pqr901stu678vwx345",
    protoMajor: 8,
    protoMinor: 7,
    miscData: undefined,
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Minimal information (no VRF, no protocol version)
 */
export const MinimalInfo: Story = {
  args: {
    poolInfo: {
      id: "pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      meta: {
        name: "Basic Pool",
        ticker: "BASIC",
      },
    },
    isGenesisBlock: false,
    miscData: undefined,
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Pool with operational certificate counter
 */
export const WithOpCounter: Story = {
  args: {
    poolInfo: {
      id: "pool1z22x50lqsrwent6en0llzzs9e577rx7n3mv9kfw7udwa2rf42fa",
      meta: {
        name: "ATAD-2 Stakepool in Austria",
        ticker: "ATAD2",
      },
    },
    isGenesisBlock: false,
    vrfKey: "vrf1w8a6rv7v5u5sn7qjz8f8k3pzml9x8qx2pzs7qg3qv7g8j6v4qc5s4d3f2g",
    protoMajor: 8,
    protoMinor: 0,
    opCounter: 3084,
    miscData: undefined,
    generateImageUrl: mockGenerateImageUrl,
  },
};
