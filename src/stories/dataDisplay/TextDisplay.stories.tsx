import type { Meta, StoryObj } from "@storybook/react";
import { TextDisplay } from "@/ui/textDisplay";

const meta = {
  title: "Data Display/TextDisplay",
  component: TextDisplay,
  parameters: {
    docs: {
      description: {
        component:
          "TextDisplay shows monospace text with optional copy functionality for technical content like hashes and addresses.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className="flex min-h-[300px] w-full items-center justify-center bg-background p-4">
        <div className="w-full max-w-2xl">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    text: {
      control: "text",
      description: "Text content to display",
    },
    showCopy: {
      control: "boolean",
      description: "Show copy button overlay",
    },
    contents: {
      control: "boolean",
      description: "Full content mode without container",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof TextDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default display with transaction hash and copy button.
 */
export const Default: Story = {
  args: {
    text: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9",
    showCopy: true,
    contents: false,
  },
};

/**
 * Short address with copy button.
 */
export const ShortAddress: Story = {
  args: {
    text: "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh4nzcgupnc",
    showCopy: true,
    contents: false,
  },
};

/**
 * Long multi-line content with scrollable container.
 */
export const LongContent: Story = {
  args: {
    text: `{
  "policyId": "e1a2b3c4d5f6g7h8i9j0k1l2m3n4o5p6",
  "assetName": "MyNFT",
  "metadata": {
    "name": "Cardano Explorer NFT",
    "description": "A unique NFT from the blockchain",
    "image": "ipfs://QmXyz123..."
  },
  "quantity": 1
}`,
    showCopy: true,
    contents: false,
  },
};

/**
 * Full content mode without container (contents=true).
 */
export const FullContentMode: Story = {
  args: {
    text: "stake1u9xyz123abc456def789ghi012jkl345mno678pqr901stu234",
    showCopy: true,
    contents: true,
  },
};

/**
 * Display without copy button.
 */
export const NoCopyButton: Story = {
  args: {
    text: "pool1abcdefghijklmnopqrstuvwxyz0123456789",
    showCopy: false,
    contents: false,
  },
};
