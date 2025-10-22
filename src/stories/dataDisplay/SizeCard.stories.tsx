import { Icon } from "@/ui/icon";
import { SizeCard } from "@/ui/sizeCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SizeCard> = {
  title: "Data Display/SizeCard",
  component: SizeCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Compact card component for displaying blockchain data size metrics (bytes/kilobytes) with visual percentage utilization bar.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title/label describing the size metric",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "number",
      description: "Current size in bytes (converted to kB for display)",
      table: {
        type: { summary: "number | undefined" },
      },
    },
    maxSize: {
      control: "number",
      description: "Maximum allowed size in bytes (for percentage calculation)",
      table: {
        type: { summary: "number | undefined" },
      },
    },
    icon: {
      control: false,
      description: "Icon element displayed in the card header",
      table: {
        type: { summary: "JSX.Element" },
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
 * Default SizeCard showing block size utilization
 */
export const Default: Story = {
  args: {
    title: "Block Size",
    icon: <Icon name='box' size={16} />,
    size: 65536, // 64 KB
    maxSize: 90112, // ~88 KB (Cardano max block size)
  },
};

/**
 * Transaction size with lower utilization
 */
export const TransactionSize: Story = {
  args: {
    title: "Transaction Size",
    icon: <Icon name='arrow-right-left' size={16} />,
    size: 4096, // 4 KB
    maxSize: 16384, // 16 KB
  },
};

/**
 * Script size showing moderate usage
 */
export const ScriptSize: Story = {
  args: {
    title: "Script Size",
    icon: <Icon name='file-code' size={16} />,
    size: 12345,
    maxSize: 65536, // 64 KB
  },
};

/**
 * Metadata size with minimal usage
 */
export const MetadataSize: Story = {
  args: {
    title: "Metadata Size",
    icon: <Icon name='database' size={16} />,
    size: 2048, // 2 KB
    maxSize: 16384, // 16 KB
  },
};

/**
 * Plutus script with high utilization
 */
export const PlutusScript: Story = {
  args: {
    title: "Plutus Script",
    icon: <Icon name='code-2' size={16} />,
    size: 61440, // 60 KB
    maxSize: 65536, // 64 KB (high usage ~93%)
  },
};

/**
 * Very small size (under 1 KB)
 */
export const SmallPayload: Story = {
  args: {
    title: "Payload Size",
    icon: <Icon name='file' size={16} />,
    size: 512, // 0.5 KB
    maxSize: 16384,
  },
};

/**
 * Handling undefined/unknown size values
 */
export const UnknownSize: Story = {
  args: {
    title: "Unknown Size",
    icon: <Icon name='help-circle' size={16} />,
    size: undefined,
    maxSize: undefined,
  },
};
