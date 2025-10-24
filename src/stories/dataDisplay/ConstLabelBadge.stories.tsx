import type { Meta, StoryObj } from "@storybook/react";
import type { MiscConstResponseData } from "../../types/miscTypes";
import { ConstLabelBadge } from "../../ui/constLabelBadge";

// Mock misc constants data with labels
const mockMiscConst: MiscConstResponseData = {
  epoch: {
    no: 425,
    start_time: "2024-01-01T00:00:00Z",
    end_time: "2024-01-06T00:00:00Z",
  },
  labels: [
    {
      type: "metadatum",
      name: 721,
      label: "CIP-25 NFT Metadata",
      data: null,
    },
    {
      type: "metadatum",
      name: 777,
      label: "CIP-27 Royalty Token",
      data: null,
    },
    {
      type: "metadatum",
      name: 1967,
      label: "CIP-68 Datum Metadata",
      data: null,
    },
    {
      type: "metadatum",
      name: 20,
      label: "Voting Metadata",
      data: null,
    },
    {
      type: "metadatum",
      name: 674,
      label: "Pool Registration",
      data: null,
    },
    {
      type: "sc",
      name: "sc1",
      label: "Plutus V2 Script",
      data: {
        scriptHash: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235",
      },
    },
    {
      type: "sc",
      name: "sc2",
      label: "Native Script",
      data: {
        scriptHash: "b1234567890abcdef1234567890abcdef1234567890abcdef123456",
      },
    },
  ],
  epoch_param: {} as any,
  epoch_stat: {} as any,
  epoch_stake_stat: {} as any,
  load: {
    load: 0.5,
  },
} as any;

const meta: Meta<typeof ConstLabelBadge> = {
  title: "Data Display/ConstLabelBadge",
  component: ConstLabelBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a label badge for metadata or smart contract constants. Shows first word in badge with full label in tooltip.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["metadatum", "sc"],
      description: "Type of label to search for",
      table: {
        type: { summary: '"metadatum" | "sc"' },
      },
    },
    name: {
      control: "text",
      description:
        "Identifier for the label (number for metadatum, string for sc)",
      table: {
        type: { summary: "number | string | undefined" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the badge",
      table: {
        type: { summary: "string" },
      },
    },
    miscConst: {
      control: false,
      description: "Misc constants data containing labels array",
      table: {
        type: { summary: "MiscConstResponseData | undefined" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[200px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * NFT Metadata label (CIP-25, metadatum key 721)
 */
export const NFTMetadata: Story = {
  args: {
    type: "metadatum",
    name: 721,
    miscConst: mockMiscConst,
  },
};

/**
 * Royalty Token metadata (CIP-27, metadatum key 777)
 */
export const RoyaltyToken: Story = {
  args: {
    type: "metadatum",
    name: 777,
    miscConst: mockMiscConst,
  },
};

/**
 * Datum Metadata (CIP-68, metadatum key 1967)
 */
export const DatumMetadata: Story = {
  args: {
    type: "metadatum",
    name: 1967,
    miscConst: mockMiscConst,
  },
};

/**
 * Voting Metadata (metadatum key 20)
 */
export const VotingMetadata: Story = {
  args: {
    type: "metadatum",
    name: 20,
    miscConst: mockMiscConst,
  },
};

/**
 * Pool Registration metadata (metadatum key 674)
 */
export const PoolRegistration: Story = {
  args: {
    type: "metadatum",
    name: 674,
    miscConst: mockMiscConst,
  },
};

/**
 * Smart contract label by script hash
 */
export const SmartContractLabel: Story = {
  args: {
    type: "sc",
    name: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235",
    miscConst: mockMiscConst,
  },
};

/**
 * Native script label
 */
export const NativeScriptLabel: Story = {
  args: {
    type: "sc",
    name: "b1234567890abcdef1234567890abcdef1234567890abcdef123456",
    miscConst: mockMiscConst,
  },
};

/**
 * Label not found - renders nothing
 */
export const NotFound: Story = {
  args: {
    type: "metadatum",
    name: 9999,
    miscConst: mockMiscConst,
  },
};

/**
 * With custom className
 */
export const WithCustomClass: Story = {
  args: {
    type: "metadatum",
    name: 721,
    miscConst: mockMiscConst,
    className: "scale-125",
  },
};

/**
 * When miscConst is undefined (loading state) - renders nothing
 */
export const LoadingState: Story = {
  args: {
    type: "metadatum",
    name: 721,
    miscConst: undefined,
  },
};

/**
 * Multiple badges in a row
 */
export const MultipleBadges: Story = {
  render: () => (
    <div className='flex items-center gap-2'>
      <ConstLabelBadge type='metadatum' name={721} miscConst={mockMiscConst} />
      <ConstLabelBadge type='metadatum' name={777} miscConst={mockMiscConst} />
      <ConstLabelBadge type='metadatum' name={1967} miscConst={mockMiscConst} />
      <ConstLabelBadge type='metadatum' name={20} miscConst={mockMiscConst} />
    </div>
  ),
};
