import type { Meta, StoryObj } from "@storybook/react";
import { ShareButton } from "../../ui/shareButton";

const meta: Meta<typeof ShareButton> = {
  title: "Buttons & Actions/ShareButton",
  component: ShareButton,
  parameters: {
    layout: "fullwidth",
  },
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-center justify-center bg-background'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    isHeader: {
      control: "boolean",
      description: "Use smaller header variant",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isHeader: false,
  },
};

export const Header: Story = {
  args: {
    isHeader: true,
  },
};
