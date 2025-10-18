import type { Meta, StoryObj } from "@storybook/react";
import { PulseDot } from "../../ui/pulseDot";

const meta: Meta<typeof PulseDot> = {
  title: "Feedback/PulseDot",
  component: PulseDot,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Animated pulsing dot indicator for live status and activity feedback. Supports Tailwind classes and custom CSS colors.",
      },
    },
  },
  argTypes: {
    size: {
      control: "number",
      description: "Size in Tailwind spacing units",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
    color: {
      control: "text",
      description: "Tailwind class (bg-*) or CSS color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bg-greenText" },
      },
    },
    animate: {
      control: "boolean",
      description: "Enable pulsing animation",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    overrideColor: {
      control: "text",
      description: "Override color (Tailwind class)",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default green pulsing dot
 */
export const Default: Story = {
  args: {},
};

/**
 * Static dot without animation
 */
export const Static: Story = {
  args: {
    animate: false,
  },
};

/**
 * Red dot for error/critical status
 */
export const RedColor: Story = {
  args: {
    color: "bg-red-500",
  },
};

/**
 * Custom CSS color
 */
export const CustomColor: Story = {
  args: {
    color: "#FF6B00",
  },
};

/**
 * Large size variant
 */
export const Large: Story = {
  args: {
    size: 4,
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  args: {
    size: 1,
  },
};
