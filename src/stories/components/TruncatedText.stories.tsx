import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TruncatedText } from "../../ui/truncatedText";

const meta: Meta<typeof TruncatedText> = {
  title: "Components/TruncatedText",
  component: TruncatedText,
  parameters: {
    layout: "fullwidth",
  },
  decorators: [
    Story => (
      <div className="flex h-[400px] w-full items-center justify-center bg-background">
        <div className="w-[400px]">
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Text content to display and potentially truncate",
    },
    className: {
      control: "text",
      description: "Optional CSS class name",
    },
    onHasImageChange: { action: "hasImageChanged" },
  },
  args: {
    onHasImageChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LongAddress: Story = {
  args: {
    children:
      "addr1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wqtp0l8xfgfr5zs3t7xlkh2vx9k8z4m6n7p8q9r0s1t2u3v4w5x6y7z8a9b0c1d2e3",
    className: "font-mono text-primary",
  },
};

export const TransactionHash: Story = {
  args: {
    children:
      "0x4e8b9c2d1a6f3e5b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
    className: "font-mono",
  },
};

export const PoolId: Story = {
  args: {
    children:
      "pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
    className: "font-mono text-sm",
  },
};

export const ShortText: Story = {
  args: {
    children: "Short text",
  },
};
