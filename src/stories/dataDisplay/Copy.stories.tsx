import { Copy } from "@/ui/copy";
import type { Meta, StoryObj } from "@storybook/react/*";

const meta: Meta<typeof Copy> = {
  title: "Data Display/Copy",
  component: Copy,
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    copyText: {
      description: "Text to copy to clipboard",
      control: "text",
    },
    size: {
      description: "Icon size",
      control: "number",
    },
    showText: {
      description: "Show button with text",
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Copy component for copying blockchain data to clipboard with visual feedback.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    copyText: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
    size: 16,
  },
};

const TransactionHash: Story = {
  args: {
    copyText:
      "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    size: 16,
  },
};

const BlockHash: Story = {
  args: {
    copyText:
      "2290ac20e4bf1cbd085d08d4b5c54735ee60f6f441269f5335a1c7974ab9c5c3",
    size: 16,
  },
};

const StakeAddress: Story = {
  args: {
    copyText: "stake1u8a9qstrmj4rvc3k62k77w7rqmwx0rqrqzxz6pdx5q4zqzqqqqqqq",
    size: 16,
  },
};

const PolicyId: Story = {
  args: {
    copyText: "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc535",
    size: 16,
  },
};

const SmallSize: Story = {
  args: {
    copyText: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
    size: 13,
  },
};

const LargeSize: Story = {
  args: {
    copyText: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
    size: 20,
  },
};

const WithButtonText: Story = {
  args: {
    copyText: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
    showText: "Copy Address",
  },
};

const WithButtonTextTransaction: Story = {
  args: {
    copyText:
      "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
    showText: "Copy Transaction",
  },
};

export {
  Default,
  TransactionHash,
  BlockHash,
  StakeAddress,
  PolicyId,
  SmallSize,
  LargeSize,
  WithButtonText,
  WithButtonTextTransaction,
};
