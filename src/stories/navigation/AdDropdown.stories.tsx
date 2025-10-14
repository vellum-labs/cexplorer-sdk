import type { Meta, StoryObj } from "@storybook/react";
import { AdDropdown } from "../../ui/adDropdown";

const meta: Meta<typeof AdDropdown> = {
  title: "Navigation/AdDropdown",
  component: AdDropdown,
  parameters: {
    layout: "fullwidth",
  },
  decorators: [
    Story => (
      <div className="flex h-[400px] w-full items-center justify-center bg-background">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the dropdown trigger",
    },
    icon: {
      control: "text",
      description: "Lucide icon name",
    },
    options: {
      control: "object",
      description: "Navigation options array",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Currency: Story = {
  args: {
    label: "ADA",
    icon: "coins",
    options: [
      { label: "ADA", onClick: () => console.log("ADA selected") },
      { label: "USD", onClick: () => console.log("USD selected") },
      { label: "EUR", onClick: () => console.log("EUR selected") },
    ],
  },
};

export const Language: Story = {
  args: {
    label: "English",
    icon: "globe",
    options: [
      { label: "English", onClick: () => console.log("English selected") },
      { label: "Czech", onClick: () => console.log("Czech selected") },
      { label: "Spanish", onClick: () => console.log("Spanish selected") },
    ],
  },
};

export const Network: Story = {
  args: {
    label: "Mainnet",
    icon: "network",
    options: [
      { label: "Mainnet", onClick: () => console.log("Mainnet selected") },
      { label: "Testnet", onClick: () => console.log("Testnet selected") },
      { label: "Preview", onClick: () => console.log("Preview selected") },
    ],
  },
};
