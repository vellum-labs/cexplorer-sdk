import type { Meta, StoryObj } from "@storybook/react";
import { MinMaxRange } from "../../ui/minMaxRange";

const meta: Meta<typeof MinMaxRange> = {
  title: "Data Display/MinMaxRange",
  component: MinMaxRange,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a value within a min-max range using a visual progress bar with color coding.",
      },
    },
  },
  argTypes: {
    min: {
      control: "number",
      description: "Minimum value of the range",
      table: {
        type: { summary: "number" },
      },
    },
    max: {
      control: "number",
      description: "Maximum value of the range",
      table: {
        type: { summary: "number" },
      },
    },
    current: {
      control: "text",
      description: "Current value within the range (number or formatted string)",
      table: {
        type: { summary: "number | string" },
      },
    },
    showPercentage: {
      control: "boolean",
      description: "Whether to show percentage alongside the current value",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showLabels: {
      control: "boolean",
      description: "Whether to show min/max labels on the progress bar",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS class names for styling customization",
      table: {
        type: { summary: "string" },
      },
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md"],
      description: "Size variant of the progress bar",
      table: {
        type: { summary: '"xs" | "sm" | "md"' },
        defaultValue: { summary: '"sm"' },
      },
    },
    labelPosition: {
      control: "select",
      options: ["above", "right"],
      description: "Position of the current value label",
      table: {
        type: { summary: '"above" | "right"' },
        defaultValue: { summary: '"above"' },
      },
    },
    colorMode: {
      control: "select",
      options: ["neutral", "scaling"],
      description: "Color mode for the progress bar fill",
      table: {
        type: { summary: '"neutral" | "scaling"' },
        defaultValue: { summary: '"scaling"' },
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
 * Default state with basic min-max range
 */
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    current: 75,
  },
};

/**
 * Pool saturation display with percentage and labels
 */
export const PoolSaturation: Story = {
  args: {
    min: 0,
    max: 100,
    current: 68.5,
    showPercentage: true,
    showLabels: true,
  },
};

/**
 * Low value showing red color (scaling mode)
 */
export const LowValue: Story = {
  args: {
    min: 0,
    max: 100,
    current: 3,
    showPercentage: true,
    showLabels: true,
    colorMode: "scaling",
  },
};

/**
 * Medium value showing yellow color (scaling mode)
 */
export const MediumValue: Story = {
  args: {
    min: 0,
    max: 100,
    current: 15,
    showPercentage: true,
    showLabels: true,
    colorMode: "scaling",
  },
};

/**
 * High value showing green color (scaling mode)
 */
export const HighValue: Story = {
  args: {
    min: 0,
    max: 100,
    current: 92,
    showPercentage: true,
    showLabels: true,
    colorMode: "scaling",
  },
};

/**
 * Neutral color mode for non-critical metrics
 */
export const NeutralColor: Story = {
  args: {
    min: 0,
    max: 100,
    current: 50,
    showPercentage: true,
    showLabels: true,
    colorMode: "neutral",
  },
};

/**
 * Formatted value with currency string
 */
export const FormattedValue: Story = {
  args: {
    min: 0,
    max: 1000000,
    current: "750,000 ADA",
    showLabels: true,
  },
};

/**
 * Extra small size variant
 */
export const ExtraSmall: Story = {
  args: {
    min: 0,
    max: 100,
    current: 60,
    size: "xs",
    showLabels: true,
  },
};

/**
 * Medium size variant
 */
export const Medium: Story = {
  args: {
    min: 0,
    max: 100,
    current: 75,
    size: "md",
    showLabels: true,
    showPercentage: true,
  },
};

/**
 * Label positioned to the right of the bar
 */
export const LabelRight: Story = {
  args: {
    min: 0,
    max: 100,
    current: 45,
    labelPosition: "right",
    showPercentage: true,
  },
};
