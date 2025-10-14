import { Button } from "@/ui/button";
import { Meta, StoryObj } from "@storybook/react/*";
import { ArrowRight, Plus, ExternalLink } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    size: {
      description: "Button size",
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    variant: {
      description: "Button variant",
      control: "select",
      options: ["primary", "secondary", "tertiary", "purple", "red", "discord"],
    },
    label: {
      description: "Button label",
      control: "text",
    },
    disabled: {
      description: "Disabled state",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Button component with multiple sizes, variants, and support for icons.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    size: "md",
    variant: "primary",
    label: "View Transaction",
    onClick: () => console.log("Button clicked"),
  },
};

const Secondary: Story = {
  args: {
    size: "md",
    variant: "secondary",
    label: "Export Data",
    onClick: () => console.log("Export clicked"),
  },
};

const Tertiary: Story = {
  args: {
    size: "md",
    variant: "tertiary",
    label: "Filter",
    onClick: () => console.log("Filter clicked"),
  },
};

const Purple: Story = {
  args: {
    size: "md",
    variant: "purple",
    label: "Delegate Stake",
    onClick: () => console.log("Delegate clicked"),
  },
};

const WithLeftIcon: Story = {
  args: {
    size: "md",
    variant: "primary",
    label: "Add to Watchlist",
    leftIcon: <Plus size={16} />,
    onClick: () => console.log("Add clicked"),
  },
};

const WithRightIcon: Story = {
  args: {
    size: "md",
    variant: "primary",
    label: "View Details",
    rightIcon: <ArrowRight size={16} />,
    onClick: () => console.log("View clicked"),
  },
};

const WithBothIcons: Story = {
  args: {
    size: "md",
    variant: "secondary",
    label: "Open Explorer",
    leftIcon: <ExternalLink size={16} />,
    rightIcon: <ArrowRight size={16} />,
    onClick: () => console.log("Open clicked"),
  },
};

const SmallSize: Story = {
  args: {
    size: "sm",
    variant: "primary",
    label: "Stake",
    onClick: () => console.log("Stake clicked"),
  },
};

const LargeSize: Story = {
  args: {
    size: "lg",
    variant: "primary",
    label: "Connect Wallet",
    onClick: () => console.log("Connect clicked"),
  },
};

const Disabled: Story = {
  args: {
    size: "md",
    variant: "primary",
    label: "Transaction Pending",
    disabled: true,
    onClick: () => console.log("This should not fire"),
  },
};

export {
  Primary,
  Secondary,
  Tertiary,
  Purple,
  WithLeftIcon,
  WithRightIcon,
  WithBothIcons,
  SmallSize,
  LargeSize,
  Disabled,
};
