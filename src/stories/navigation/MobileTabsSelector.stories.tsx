import type { Meta, StoryObj } from "@storybook/react";
import { MobileTabsSelector } from "../../ui/mobileTabsSelector";
import { useState, type FC } from "react";

const meta: Meta<typeof MobileTabsSelector> = {
  title: "Navigation/MobileTabsSelector",
  component: MobileTabsSelector,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A responsive tab navigation component that adapts to screen width by showing limited tabs directly and placing overflow tabs in a dropdown menu.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of tab items to display",
      table: {
        type: { summary: "TabItem[]" },
      },
    },
    mobileItems: {
      control: "number",
      description: "Number of items to show on mobile initially",
      table: {
        type: { summary: "number" },
      },
    },
    activeTab: {
      control: "number",
      description: "Index of the currently active tab",
      table: {
        type: { summary: "number" },
      },
    },
    handleTabChange: {
      control: false,
      description: "Callback when a tab is clicked",
      table: {
        type: { summary: "(index: number) => void" },
      },
    },
    tabOptions: {
      control: "object",
      description: "Array of options for the dropdown",
      table: {
        type: { summary: "Array<{ label: ReactNode; onClick: () => void }>" },
      },
    },
    secondary: {
      control: "boolean",
      description: "Use secondary styling (smaller, different colors)",
      table: {
        type: { summary: "boolean" },
      },
    },
    withMargin: {
      control: "boolean",
      description: "Add margin bottom to the component",
      table: {
        type: { summary: "boolean" },
      },
    },
    forceDropdownVerticalPosition: {
      control: "select",
      options: [undefined, "up", "down"],
      description: "Force dropdown position",
      table: {
        type: { summary: '"up" | "down"' },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex min-h-[300px] w-full items-start justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { key: "overview", label: "Overview", visible: true },
    { key: "transactions", label: "Transactions", visible: true },
    { key: "blocks", label: "Blocks", visible: true },
    { key: "epochs", label: "Epochs", visible: true },
    { key: "pools", label: "Stake Pools", visible: true },
    { key: "tokens", label: "Tokens", visible: true },
  ];

  const tabOptions = tabs.map((tab, index) => ({
    label: tab.label,
    onClick: () => setActiveTab(index),
  }));

  return (
    <MobileTabsSelector
      items={tabs}
      mobileItems={2}
      activeTab={activeTab}
      handleTabChange={setActiveTab}
      tabOptions={tabOptions}
      secondary={false}
    />
  );
};

const SecondaryStyleTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { key: "all", label: "All", visible: true },
    { key: "sent", label: "Sent", visible: true },
    { key: "received", label: "Received", visible: true },
    { key: "staking", label: "Staking", visible: true },
    { key: "rewards", label: "Rewards", visible: true },
  ];

  const tabOptions = tabs.map((tab, index) => ({
    label: tab.label,
    onClick: () => setActiveTab(index),
  }));

  return (
    <MobileTabsSelector
      items={tabs}
      mobileItems={3}
      activeTab={activeTab}
      handleTabChange={setActiveTab}
      tabOptions={tabOptions}
      secondary={true}
      withMargin={true}
    />
  );
};

const ManyTabsTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { key: "tab1", label: "Tab 1", visible: true },
    { key: "tab2", label: "Tab 2", visible: true },
    { key: "tab3", label: "Tab 3", visible: true },
    { key: "tab4", label: "Tab 4", visible: true },
    { key: "tab5", label: "Tab 5", visible: true },
    { key: "tab6", label: "Tab 6", visible: true },
    { key: "tab7", label: "Tab 7", visible: true },
    { key: "tab8", label: "Tab 8", visible: true },
  ];

  const tabOptions = tabs.map((tab, index) => ({
    label: tab.label,
    onClick: () => setActiveTab(index),
  }));

  return (
    <MobileTabsSelector
      items={tabs}
      mobileItems={2}
      activeTab={activeTab}
      handleTabChange={setActiveTab}
      tabOptions={tabOptions}
      secondary={false}
    />
  );
};

const DropdownUpTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { key: "analytics", label: "Analytics", visible: true },
    { key: "reports", label: "Reports", visible: true },
    { key: "charts", label: "Charts", visible: true },
    { key: "data", label: "Data", visible: true },
    { key: "export", label: "Export", visible: true },
  ];

  const tabOptions = tabs.map((tab, index) => ({
    label: tab.label,
    onClick: () => setActiveTab(index),
  }));

  return (
    <div className="mt-40">
      <MobileTabsSelector
        items={tabs}
        mobileItems={2}
        activeTab={activeTab}
        handleTabChange={setActiveTab}
        tabOptions={tabOptions}
        forceDropdownVerticalPosition="up"
        secondary={false}
      />
    </div>
  );
};

/**
 * Default responsive tab selector with 6 tabs
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * Secondary styling with smaller size and different colors
 */
export const SecondaryStyle: Story = {
  render: () => <SecondaryStyleTemplate />,
};

/**
 * Many tabs (8 total) showing dropdown overflow behavior
 */
export const ManyTabs: Story = {
  render: () => <ManyTabsTemplate />,
};

/**
 * Dropdown positioned upward instead of down
 */
export const DropdownUp: Story = {
  render: () => <DropdownUpTemplate />,
};
