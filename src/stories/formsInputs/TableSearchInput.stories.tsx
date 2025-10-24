import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TableSearchInput } from "../../ui/tableSearchInput";

const meta: Meta<typeof TableSearchInput> = {
  title: "Forms & Inputs/TableSearchInput",
  component: TableSearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Enhanced search input with prefix filtering and suggestions for blockchain explorer searches.",
      },
    },
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: "text",
      description: "Current input value",
      table: {
        type: { summary: "string" },
      },
    },
    onchange: {
      control: false,
      description: "Callback when input value changes",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    showSearchIcon: {
      control: "boolean",
      description: "Show search icon when input is empty",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showPrefixPopup: {
      control: "boolean",
      description: "Show prefix suggestion popup",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    stretchPrefix: {
      control: "boolean",
      description: "Stretch prefix to full input height",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    prefixes: {
      control: "object",
      description: "Available prefix options for filtering",
      table: {
        type: { summary: "Prefix[]" },
      },
    },
    searchPrefix: {
      control: "text",
      description: "Currently active search prefix",
      table: {
        type: { summary: "string" },
      },
    },
    inputClassName: {
      control: "text",
      description: "CSS classes for the input element",
      table: {
        type: { summary: "string" },
      },
    },
    wrapperClassName: {
      control: "text",
      description: "CSS classes for the wrapper div",
      table: {
        type: { summary: "string" },
      },
    },
    prefixClassname: {
      control: "text",
      description: "CSS classes for the prefix element",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className="w-full max-w-[600px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic search input without any prefix filtering
 */
export const Default: Story = {
  args: {
    placeholder: "Search...",
    value: "",
    onchange: () => {},
    showSearchIcon: false,
  },
};

/**
 * Search input with search icon displayed when empty
 */
export const WithSearchIcon: Story = {
  args: {
    placeholder: "Search transactions, addresses...",
    value: "",
    onchange: () => {},
    showSearchIcon: true,
  },
};

/**
 * Search input with prefix filtering options
 */
const InteractivePrefixComponent = () => {
  const [search, setSearch] = useState("");
  const [prefix, setPrefix] = useState("");

  return (
    <TableSearchInput
      placeholder="Search transactions, addresses, blocks..."
      value={search}
      onchange={setSearch}
      searchPrefix={prefix}
      setSearchPrefix={setPrefix}
      showSearchIcon={true}
      prefixes={[
        { key: "addr", name: "Address", show: true },
        { key: "tx", name: "Transaction", show: true },
        { key: "block", name: "Block", show: true },
        { key: "pool", name: "Pool", show: true },
      ]}
    />
  );
};

export const WithPrefixes: Story = {
  render: () => <InteractivePrefixComponent />,
};

/**
 * Search input with active prefix and value
 */
const PrefixActiveComponent = () => {
  const [search, setSearch] = useState("Address:addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234");
  const [prefix, setPrefix] = useState("addr");

  return (
    <TableSearchInput
      placeholder="Search..."
      value={search}
      onchange={setSearch}
      searchPrefix={prefix}
      setSearchPrefix={setPrefix}
      prefixes={[
        { key: "addr", name: "Address", show: true },
        { key: "tx", name: "Transaction", show: true },
        { key: "block", name: "Block", show: true },
      ]}
    />
  );
};

export const WithActivePrefix: Story = {
  render: () => <PrefixActiveComponent />,
};

/**
 * Search input with stretched prefix style
 */
const StretchedPrefixComponent = () => {
  const [search, setSearch] = useState("Transaction:5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb");
  const [prefix, setPrefix] = useState("tx");

  return (
    <TableSearchInput
      placeholder="Search..."
      value={search}
      onchange={setSearch}
      searchPrefix={prefix}
      setSearchPrefix={setPrefix}
      stretchPrefix={true}
      prefixes={[
        { key: "addr", name: "Address", show: true },
        { key: "tx", name: "Transaction", show: true },
      ]}
      prefixClassname="bg-primary text-white rounded-l-s"
    />
  );
};

export const StretchedPrefix: Story = {
  render: () => <StretchedPrefixComponent />,
};

/**
 * Search input without prefix popup
 */
const NoPrefixPopupComponent = () => {
  const [search, setSearch] = useState("");
  const [prefix, setPrefix] = useState("");

  return (
    <TableSearchInput
      placeholder="Search..."
      value={search}
      onchange={setSearch}
      searchPrefix={prefix}
      setSearchPrefix={setPrefix}
      showPrefixPopup={false}
      prefixes={[
        { key: "addr", name: "Address", show: true },
        { key: "tx", name: "Transaction", show: true },
      ]}
    />
  );
};

export const WithoutPrefixPopup: Story = {
  render: () => <NoPrefixPopupComponent />,
};

/**
 * Search input with custom styling
 */
const CustomStyledComponent = () => {
  const [search, setSearch] = useState("");
  const [prefix, setPrefix] = useState("");

  return (
    <TableSearchInput
      placeholder="Custom styled search..."
      value={search}
      onchange={setSearch}
      searchPrefix={prefix}
      setSearchPrefix={setPrefix}
      showSearchIcon={true}
      inputClassName="border-primary"
      wrapperClassName="w-full"
      prefixes={[
        { key: "addr", name: "Address", show: true },
        { key: "tx", name: "Transaction", show: true },
        { key: "block", name: "Block", show: true },
      ]}
    />
  );
};

export const CustomStyling: Story = {
  render: () => <CustomStyledComponent />,
};

/**
 * Interactive example showing full functionality
 */
const InteractiveExampleComponent = () => {
  const [search, setSearch] = useState("");
  const [prefix, setPrefix] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <TableSearchInput
        placeholder="Try typing or click to see prefixes..."
        value={search}
        onchange={setSearch}
        searchPrefix={prefix}
        setSearchPrefix={setPrefix}
        showSearchIcon={true}
        prefixes={[
          { key: "addr", name: "Address", show: true },
          { key: "tx", name: "Transaction", show: true },
          { key: "block", name: "Block", show: true },
          { key: "pool", name: "Pool", show: true },
          { key: "epoch", name: "Epoch", show: true },
        ]}
      />
      <div className="text-text-sm text-text">
        <p>Current value: {search || "(empty)"}</p>
        <p>Active prefix: {prefix || "(none)"}</p>
      </div>
    </div>
  );
};

export const InteractiveExample: Story = {
  render: () => <InteractiveExampleComponent />,
};
