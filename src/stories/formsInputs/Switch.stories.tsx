import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../ui/switch";

const meta: Meta<typeof Switch> = {
  title: "Forms & Inputs/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A toggle switch component for binary on/off states with smooth transitions.",
      },
    },
  },
  argTypes: {
    active: {
      control: "boolean",
      description: "Controls the active/inactive state of the switch",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      action: "changed",
      description:
        "Callback function triggered when the switch state changes",
      table: {
        type: { summary: "(checked: boolean) => void" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback function triggered when the switch is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the switch container",
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
 * Default switch in inactive state
 */
export const Default: Story = {
  args: {},
};

/**
 * Switch in active (on) state
 */
export const Active: Story = {
  args: {
    active: true,
  },
};

/**
 * Switch with onChange handler
 */
export const WithOnChange: Story = {
  args: {
    onChange: checked => {
      console.log("Switch state changed to:", checked);
    },
  },
};

/**
 * Switch with custom styling
 */
export const WithCustomClass: Story = {
  args: {
    className: "mx-8",
    active: true,
  },
};

/**
 * Showcase of multiple switches with different states
 */
export const MultipleStates: Story = {
  render: () => (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <span className='w-24 text-sm text-foreground'>Inactive:</span>
        <Switch />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-24 text-sm text-foreground'>Active:</span>
        <Switch active={true} />
      </div>
      <div className='flex items-center gap-4'>
        <span className='w-24 text-sm text-foreground'>With Label:</span>
        <Switch active={true} />
        <span className='text-sm text-foreground'>Enable notifications</span>
      </div>
    </div>
  ),
};
