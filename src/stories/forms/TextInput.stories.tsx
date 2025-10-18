import { TextInput } from "@/ui/textInput";
import type { Meta, StoryObj } from "@storybook/react/*";
import { useState } from "react";

const meta: Meta<typeof TextInput> = {
  title: "Forms & Inputs/TextInput",
  component: TextInput,
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-[500px]'>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: "Input placeholder text",
      control: "text",
    },
    showSearchIcon: {
      description: "Show search icon",
      control: "boolean",
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
          "Text input component with optional search icon and clear button.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const TextInputWrapper = (args: any) => {
  const [value, setValue] = useState("");
  return <TextInput {...args} value={value} onchange={setValue} />;
};

const Default: Story = {
  render: TextInputWrapper,
  args: {
    placeholder: "Enter address or transaction hash...",
  },
};

const WithSearchIcon: Story = {
  render: TextInputWrapper,
  args: {
    placeholder: "Search blocks, transactions...",
    showSearchIcon: true,
  },
};

const AddressSearch: Story = {
  render: TextInputWrapper,
  args: {
    placeholder: "Enter Cardano address...",
    showSearchIcon: true,
  },
};

const TransactionSearch: Story = {
  render: TextInputWrapper,
  args: {
    placeholder: "Enter transaction hash...",
    showSearchIcon: true,
  },
};

const PoolSearch: Story = {
  render: TextInputWrapper,
  args: {
    placeholder: "Search stake pools...",
    showSearchIcon: true,
  },
};

const AssetSearch: Story = {
  render: TextInputWrapper,
  args: {
    placeholder: "Search native tokens...",
    showSearchIcon: true,
  },
};

const Disabled: Story = {
  render: (args: any) => {
    const [value] = useState("addr1q...");
    return <TextInput {...args} value={value} onchange={() => {}} />;
  },
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export {
  Default,
  WithSearchIcon,
  AddressSearch,
  TransactionSearch,
  PoolSearch,
  AssetSearch,
  Disabled,
};
