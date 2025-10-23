import type { Meta, StoryObj } from "@storybook/react";
import { EnvironmentBadge } from "../../ui/environmentBadge";

const meta: Meta<typeof EnvironmentBadge> = {
  title: "Feedback/EnvironmentBadge",
  component: EnvironmentBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays the Cardano network environment badge (testnet, preview, preprod, etc.). Automatically hides on mainnet.",
      },
    },
  },
  argTypes: {
    network: {
      control: "select",
      options: ["testnet", "preview", "preprod", "sancho", "mainnet"],
      description:
        "Network name to display (mainnet will render nothing - badge is hidden)",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className='relative h-[200px] w-[400px] rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'>
          <Story />
          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm text-gray-500'>
            Application Content Area
            <br />
            <span className='text-xs'>(Badge appears at top-left)</span>
          </div>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Testnet environment badge
 */
export const Testnet: Story = {
  args: {
    network: "testnet",
  },
};

/**
 * Preview network environment badge
 */
export const Preview: Story = {
  args: {
    network: "preview",
  },
};

/**
 * Preprod network environment badge
 */
export const Preprod: Story = {
  args: {
    network: "preprod",
  },
};

/**
 * Sancho network environment badge (governance testnet)
 */
export const Sancho: Story = {
  args: {
    network: "sancho",
  },
};

/**
 * Mainnet - no badge is displayed (returns null)
 */
export const Mainnet: Story = {
  args: {
    network: "mainnet",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When network is 'mainnet', the badge does not render (returns null). This is intentional as mainnet is the default environment.",
      },
    },
  },
};

/**
 * Custom network name
 */
export const CustomNetwork: Story = {
  args: {
    network: "custom-testnet",
  },
};
