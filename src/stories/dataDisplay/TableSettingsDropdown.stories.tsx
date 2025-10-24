import type { Meta, StoryObj } from "@storybook/react";
import { TableSettingsDropdown } from "../../ui/tableSettingsDropdown";
import { useState, type FC } from "react";

const meta: Meta<typeof TableSettingsDropdown> = {
  title: "Data Display/TableSettingsDropdown",
  component: TableSettingsDropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A dropdown menu for managing table settings including rows per page and column visibility controls.",
      },
    },
  },
  argTypes: {
    rows: {
      control: "number",
      description: "Current number of rows to display per page",
      table: {
        type: { summary: "number" },
      },
    },
    setRows: {
      control: false,
      description: "Callback to update the number of rows",
      table: {
        type: { summary: "(rows: number) => void" },
      },
    },
    visibleRows: {
      control: "boolean",
      description: "Whether to show the rows selector",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    columnsOptions: {
      control: "object",
      description: "Array of column visibility toggle options",
      table: {
        type: { summary: "Array<{ label: ReactNode; isVisible: boolean; onClick?: any }>" },
      },
    },
    customContent: {
      control: false,
      description: "Custom content to replace the default settings icon",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    customStyles: {
      control: "object",
      description: "Custom inline styles for the dropdown panel",
      table: {
        type: { summary: "CSSProperties" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[400px] w-full items-start justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState([
    { label: "Transaction Hash", isVisible: true },
    { label: "Block", isVisible: true },
    { label: "Age", isVisible: true },
    { label: "From", isVisible: true },
    { label: "To", isVisible: false },
    { label: "Value", isVisible: true },
    { label: "Fee", isVisible: false },
  ]);

  const toggleColumn = (index: number) => {
    setColumns(prev =>
      prev.map((col, i) =>
        i === index ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const columnsWithHandlers = columns.map((col, index) => ({
    ...col,
    onClick: () => toggleColumn(index),
  }));

  return (
    <TableSettingsDropdown
      rows={rows}
      setRows={setRows}
      columnsOptions={columnsWithHandlers}
    />
  );
};

const WithoutRowsSelectorTemplate: FC = () => {
  const [rows, setRows] = useState(20);
  const [columns, setColumns] = useState([
    { label: "Pool ID", isVisible: true },
    { label: "Ticker", isVisible: true },
    { label: "Saturation", isVisible: true },
    { label: "Live Stake", isVisible: false },
  ]);

  const toggleColumn = (index: number) => {
    setColumns(prev =>
      prev.map((col, i) =>
        i === index ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const columnsWithHandlers = columns.map((col, index) => ({
    ...col,
    onClick: () => toggleColumn(index),
  }));

  return (
    <TableSettingsDropdown
      rows={rows}
      setRows={setRows}
      visibleRows={false}
      columnsOptions={columnsWithHandlers}
    />
  );
};

const ManyColumnsTemplate: FC = () => {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState([
    { label: "ID", isVisible: true },
    { label: "Hash", isVisible: true },
    { label: "Block", isVisible: true },
    { label: "Epoch", isVisible: false },
    { label: "Slot", isVisible: false },
    { label: "Timestamp", isVisible: true },
    { label: "From Address", isVisible: true },
    { label: "To Address", isVisible: true },
    { label: "Amount", isVisible: true },
    { label: "Fee", isVisible: false },
    { label: "Status", isVisible: true },
    { label: "Confirmations", isVisible: false },
  ]);

  const toggleColumn = (index: number) => {
    setColumns(prev =>
      prev.map((col, i) =>
        i === index ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const columnsWithHandlers = columns.map((col, index) => ({
    ...col,
    onClick: () => toggleColumn(index),
  }));

  return (
    <TableSettingsDropdown
      rows={rows}
      setRows={setRows}
      columnsOptions={columnsWithHandlers}
      customStyles={{ width: "200px", maxHeight: "500px" }}
    />
  );
};

const CustomTriggerTemplate: FC = () => {
  const [rows, setRows] = useState(10);
  const [columns, setColumns] = useState([
    { label: "Name", isVisible: true },
    { label: "Email", isVisible: true },
    { label: "Role", isVisible: false },
  ]);

  const toggleColumn = (index: number) => {
    setColumns(prev =>
      prev.map((col, i) =>
        i === index ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const columnsWithHandlers = columns.map((col, index) => ({
    ...col,
    onClick: () => toggleColumn(index),
  }));

  return (
    <TableSettingsDropdown
      rows={rows}
      setRows={setRows}
      columnsOptions={columnsWithHandlers}
      customContent={
        <button className="flex h-[40px] items-center gap-2 rounded-md border border-border bg-cardBg px-3 text-sm font-medium text-text hover:bg-darker">
          Table Settings
        </button>
      }
    />
  );
};

/**
 * Default table settings dropdown with rows selector and column toggles
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * Without rows selector - only column visibility controls
 */
export const WithoutRowsSelector: Story = {
  render: () => <WithoutRowsSelectorTemplate />,
};

/**
 * With many columns and custom dropdown size
 */
export const ManyColumns: Story = {
  render: () => <ManyColumnsTemplate />,
};

/**
 * With custom trigger content instead of settings icon
 */
export const CustomTrigger: Story = {
  render: () => <CustomTriggerTemplate />,
};
