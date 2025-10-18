import type { Meta, StoryObj } from "@storybook/react";
import { ProtocolDot } from "@/ui/protocolDot";
import type { MiscConstResponseData } from "@/types/miscTypes";

const meta = {
  title: "Feedback/ProtocolDot",
  component: ProtocolDot,
  parameters: {
    docs: {
      description: {
        component:
          "ProtocolDot displays a status indicator for protocol version compatibility with color-coded warnings.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="flex h-[150px] w-full items-center justify-center bg-background p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    protNo: {
      control: { type: "number", min: 1, max: 10, step: 0.1 },
      description: "Protocol version number to check",
    },
    miscData: {
      description: "Epoch statistics with block versions",
    },
  },
} satisfies Meta<typeof ProtocolDot>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data with multiple protocol versions
const mockMiscDataMultipleVersions: MiscConstResponseData = {
  epoch_stat: {
    daily: [
      {
        date: "2024-01-15",
        stat: {
          block_version: [
            { version: 8.0, count: 100 },
            { version: 9.0, count: 500 },
          ],
        },
      },
    ],
  },
} as MiscConstResponseData;

// Mock data with single dominant version (95%+)
const mockMiscDataSingleDominant: MiscConstResponseData = {
  epoch_stat: {
    daily: [
      {
        date: "2024-01-15",
        stat: {
          block_version: [
            { version: 8.0, count: 50 },
            { version: 9.0, count: 1000 },
          ],
        },
      },
    ],
  },
} as MiscConstResponseData;

// Mock data with only one version
const mockMiscDataSingleVersion: MiscConstResponseData = {
  epoch_stat: {
    daily: [
      {
        date: "2024-01-15",
        stat: {
          block_version: [{ version: 9.0, count: 1000 }],
        },
      },
    ],
  },
} as MiscConstResponseData;

/**
 * Green dot: Protocol version is up-to-date (9.0 >= 9.0).
 */
export const UpToDate: Story = {
  args: {
    protNo: 9.0,
    miscData: mockMiscDataMultipleVersions,
  },
};

/**
 * Yellow dot: Protocol major version matches but minor is outdated (8.5 vs 9.0).
 */
export const MinorOutdated: Story = {
  args: {
    protNo: 8.5,
    miscData: mockMiscDataMultipleVersions,
  },
};

/**
 * Red dot: Protocol version is significantly outdated (7.0 < 9.0).
 */
export const Outdated: Story = {
  args: {
    protNo: 7.0,
    miscData: mockMiscDataMultipleVersions,
  },
};

/**
 * Hidden: Single version with 95%+ adoption (consensus reached).
 */
export const HiddenConsensus: Story = {
  args: {
    protNo: 9.0,
    miscData: mockMiscDataSingleDominant,
  },
};

/**
 * Hidden: Only one version exists on network.
 */
export const HiddenSingleVersion: Story = {
  args: {
    protNo: 9.0,
    miscData: mockMiscDataSingleVersion,
  },
};
