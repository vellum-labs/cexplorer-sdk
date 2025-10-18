import { Tooltip } from "@/ui/tooltip";
import type { Meta, StoryObj } from "@storybook/react/*";
import { Info } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-center justify-center bg-background p-20'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    content: {
      description: "Tooltip content",
      control: "text",
    },
    delay: {
      description: "Delay before showing/hiding",
      control: "number",
    },
    forceDirection: {
      description: "Force tooltip direction",
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    hide: {
      description: "Hide tooltip",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip component with automatic positioning and customizable directions.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    content: "Transaction hash",
    children: (
      <span className='cursor-pointer text-primary'>5f20df933584...940ebb</span>
    ),
  },
};

const AddressTooltip: Story = {
  args: {
    content: "Cardano address",
    children: (
      <span className='cursor-pointer text-primary'>addr1qxyz...stu234</span>
    ),
  },
};

const StakePoolInfo: Story = {
  args: {
    content: "Active stake pool with 95% saturation",
    children: (
      <div className='flex cursor-pointer items-center gap-1'>
        <span className='text-text-sm'>POOL1</span>
        <Info size={14} className='text-grayTextPrimary' />
      </div>
    ),
  },
};

const EpochInfo: Story = {
  args: {
    content: "Epoch ends in 2 days 5 hours",
    children: (
      <div className='flex cursor-pointer items-center gap-1'>
        <span className='text-text-sm'>Epoch 450</span>
        <Info size={14} className='text-grayTextPrimary' />
      </div>
    ),
  },
};

const FeeBreakdown: Story = {
  args: {
    content: "0.17 ADA transaction fee",
    children: <span className='cursor-pointer text-grayTextPrimary'>Fee</span>,
  },
};

const ForceTop: Story = {
  args: {
    content: "This tooltip is forced to show on top",
    forceDirection: "top",
    children: (
      <span className='cursor-pointer text-primary'>Hover me (top)</span>
    ),
  },
};

const ForceBottom: Story = {
  args: {
    content: "This tooltip is forced to show on bottom",
    forceDirection: "bottom",
    children: (
      <span className='cursor-pointer text-primary'>Hover me (bottom)</span>
    ),
  },
};

const ForceLeft: Story = {
  args: {
    content: "Left tooltip",
    forceDirection: "left",
    children: (
      <span className='cursor-pointer text-primary'>Hover me (left)</span>
    ),
  },
};

const ForceRight: Story = {
  args: {
    content: "Right tooltip",
    forceDirection: "right",
    children: (
      <span className='cursor-pointer text-primary'>Hover me (right)</span>
    ),
  },
};

const LongContent: Story = {
  args: {
    content:
      "This is a very long tooltip content that explains detailed information about the transaction including its inputs, outputs, and metadata",
    children: <span className='cursor-pointer text-primary'>Long tooltip</span>,
  },
};

export {
  Default,
  AddressTooltip,
  StakePoolInfo,
  EpochInfo,
  FeeBreakdown,
  ForceTop,
  ForceBottom,
  ForceLeft,
  ForceRight,
  LongContent,
};
