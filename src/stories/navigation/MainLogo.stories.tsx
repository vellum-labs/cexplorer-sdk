import type { Meta, StoryObj } from "@storybook/react";
import { MainLogo } from "../../ui/mainLogo";

const meta: Meta<typeof MainLogo> = {
  title: "Navigation/MainLogo",
  component: MainLogo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Main application logo with theme support, connection status monitoring, beta badge, and environment indicator. Links to the home page.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "number", min: 50, max: 300, step: 10 },
      description: "Width of the logo in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "150" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback function when logo is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the logo image",
      table: {
        type: { summary: "string" },
      },
    },
    network: {
      control: "select",
      options: ["mainnet", "preprod", "preview", "sancho"],
      description: "Cardano network name for the environment badge",
      table: {
        type: { summary: "string" },
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
 * Default logo with mainnet network
 */
export const Default: Story = {
  args: {
    network: "mainnet",
  },
};

/**
 * Logo for preprod testnet
 */
export const Preprod: Story = {
  args: {
    network: "preprod",
  },
};

/**
 * Logo for preview testnet
 */
export const Preview: Story = {
  args: {
    network: "preview",
  },
};

/**
 * Logo for sancho testnet
 */
export const Sancho: Story = {
  args: {
    network: "sancho",
  },
};

/**
 * Large logo (200px)
 */
export const Large: Story = {
  args: {
    network: "mainnet",
    size: 200,
  },
};

/**
 * Small logo (100px) suitable for mobile
 */
export const Small: Story = {
  args: {
    network: "mainnet",
    size: 100,
  },
};

/**
 * Extra large logo (250px)
 */
export const ExtraLarge: Story = {
  args: {
    network: "mainnet",
    size: 250,
  },
};

/**
 * Compact logo (80px) for tight spaces
 */
export const Compact: Story = {
  args: {
    network: "preprod",
    size: 80,
  },
};

/**
 * Logo with custom opacity
 */
export const WithOpacity: Story = {
  args: {
    network: "mainnet",
    className: "opacity-70",
  },
};

/**
 * Logo with hover effect
 */
export const WithHoverEffect: Story = {
  args: {
    network: "mainnet",
    className: "transition-opacity hover:opacity-80",
  },
};

/**
 * Logo with click handler (check Actions panel)
 */
export const WithClickHandler: Story = {
  args: {
    network: "mainnet",
    onClick: () => {
      console.log("Logo clicked!");
      alert("Logo clicked! Check the Actions panel in Storybook.");
    },
  },
};
