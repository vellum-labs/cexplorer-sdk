import type { Meta, StoryObj } from "@storybook/react";
import { AdaHandleBadge } from "../../ui/adaHandleBadge";

const meta: Meta<typeof AdaHandleBadge> = {
  title: "Data Display/AdaHandleBadge",
  component: AdaHandleBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays Cardano Ada Handle badges with optional linking and variants.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    hex: {
      control: "text",
      description: "Hexadecimal-encoded handle name (use hex OR variant, not both)",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    link: {
      control: "boolean",
      description: "Whether to make the handle a clickable link (hex mode only)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      control: "select",
      options: [undefined, "long", "icon"],
      description:
        'Display variant: "long" or "icon" (use variant OR hex, not both)',
      table: {
        type: { summary: '"long" | "icon"' },
        defaultValue: { summary: "undefined" },
      },
    },
    policyId: {
      control: "text",
      description: "Policy ID for the Ada Handle asset",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
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
 * Default Ada Handle badge with specific handle name
 */
export const Default: Story = {
  args: {
    hex: "68656c6c6f", // "hello" in hex
    policyId: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
  },
};

/**
 * Ada Handle badge with clickable link to asset page
 */
export const WithLink: Story = {
  args: {
    hex: "68656c6c6f", // "hello" in hex
    policyId: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
    link: true,
  },
};

/**
 * Generic handle badge with "handle" label (long variant)
 */
export const LongVariant: Story = {
  args: {
    variant: "long",
  },
};

/**
 * Icon only variant (compact display)
 */
export const IconVariant: Story = {
  args: {
    variant: "icon",
  },
};

/**
 * Short handle name
 */
export const ShortHandle: Story = {
  args: {
    hex: "616461", // "ada" in hex
    policyId: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
  },
};

/**
 * Longer handle name
 */
export const LongHandle: Story = {
  args: {
    hex: "6d79617765736f6d6568616e646c65", // "myawesomehandle" in hex
    policyId: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
  },
};

/**
 * Handle with custom styling
 */
export const WithCustomClass: Story = {
  args: {
    hex: "68656c6c6f",
    policyId: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
    className: "text-lg",
  },
};
