import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "../../ui/icon";

const meta: Meta<typeof Icon> = {
  title: "Media/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dynamic icon component using Lucide icons with lazy loading. Supports 1000+ icons with code splitting for optimal performance.",
      },
    },
  },
  argTypes: {
    name: {
      control: "select",
      options: [
        "check",
        "x",
        "arrow-right",
        "arrow-left",
        "copy",
        "download",
        "upload",
        "wallet",
        "coins",
        "database",
        "server",
        "activity",
        "info",
        "alert-circle",
        "help-circle",
      ],
      description: "Icon name from Lucide library",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "number",
      description: "Icon size in pixels",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "24" },
      },
    },
    color: {
      control: "color",
      description: "Icon color",
      table: {
        type: { summary: "string" },
      },
    },
    strokeWidth: {
      control: "number",
      description: "Stroke width for icon lines",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
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
 * Default check icon
 */
export const Default: Story = {
  args: {
    name: "check",
  },
};

/**
 * Large icon (48px)
 */
export const Large: Story = {
  args: {
    name: "wallet",
    size: 48,
  },
};

/**
 * Small icon (16px)
 */
export const Small: Story = {
  args: {
    name: "info",
    size: 16,
  },
};

/**
 * Custom color
 */
export const CustomColor: Story = {
  args: {
    name: "coins",
    size: 32,
    color: "#0094d4",
  },
};

/**
 * Thin stroke width
 */
export const ThinStroke: Story = {
  args: {
    name: "activity",
    size: 32,
    strokeWidth: 1,
  },
};

/**
 * Thick stroke width
 */
export const ThickStroke: Story = {
  args: {
    name: "database",
    size: 32,
    strokeWidth: 3,
  },
};
