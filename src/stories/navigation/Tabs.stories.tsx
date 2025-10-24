import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../../ui/tabs";
import { useState, type FC } from "react";

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A comprehensive tab navigation component with URL-based state persistence, responsive mobile layout with dropdown overflow, and automatic page title updates.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of tab items to display",
      table: {
        type: { summary: "Array<TabItem | undefined>" },
      },
    },
    withPadding: {
      control: "boolean",
      description: "Add horizontal padding to the tabs container",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    withMargin: {
      control: "boolean",
      description: "Add vertical margin to the tabs container",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    activeTabValue: {
      control: "text",
      description: "Controlled active tab value (by key)",
      table: {
        type: { summary: "string" },
      },
    },
    tabParam: {
      control: "text",
      description: "Custom URL parameter name for tab state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"tab"' },
      },
    },
    onClick: {
      control: false,
      description: "Callback when a tab is clicked",
      table: {
        type: { summary: "(activeTab: string) => void" },
      },
    },
    toRight: {
      control: "boolean",
      description: "Align tabs and extra content to the right",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    extraContent: {
      control: false,
      description: "Extra content to display alongside tabs",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    forceDropdownVerticalPosition: {
      control: "select",
      options: [undefined, "up", "down"],
      description: "Force dropdown position on mobile",
      table: {
        type: { summary: '"up" | "down"' },
      },
    },
    mobileItemsCount: {
      control: "number",
      description: "Number of tabs to show on mobile before collapsing",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
    wrapperClassname: {
      control: "text",
      description: "Additional CSS classes for the wrapper element",
      table: {
        type: { summary: "string" },
      },
    },
    allowScroll: {
      control: "boolean",
      description: "Allow horizontal scrolling for many tabs",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    apiLoading: {
      control: "boolean",
      description: "Whether API data is still loading",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex min-h-[400px] w-full flex-col bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    {
      key: "overview",
      label: "Overview",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Overview Content</h3>
          <p className="text-grayTextPrimary">
            This is the overview tab showing general information about the
            blockchain entity.
          </p>
        </div>
      ),
      visible: true,
      title: "Overview",
    },
    {
      key: "transactions",
      label: "Transactions",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Transactions</h3>
          <p className="text-grayTextPrimary">
            Transaction history and details are displayed here.
          </p>
        </div>
      ),
      visible: true,
      title: "Transaction History",
    },
    {
      key: "blocks",
      label: "Blocks",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Blocks</h3>
          <p className="text-grayTextPrimary">
            Block information and statistics.
          </p>
        </div>
      ),
      visible: true,
    },
    {
      key: "epochs",
      label: "Epochs",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Epochs</h3>
          <p className="text-grayTextPrimary">Epoch data and metrics.</p>
        </div>
      ),
      visible: true,
    },
  ];

  return (
    <Tabs
      items={tabs}
      activeTabValue={activeTab}
      onClick={setActiveTab}
      tabParam=""
    />
  );
};

const ScrollableTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const manyTabs = Array.from({ length: 10 }, (_, i) => ({
    key: `tab${i + 1}`,
    label: `Tab ${i + 1}`,
    content: (
      <div className="rounded-l border border-border bg-cardBg p-4">
        <h3 className="text-text-lg font-semibold">Tab {i + 1} Content</h3>
        <p className="text-grayTextPrimary">
          Content for tab number {i + 1}.
        </p>
      </div>
    ),
    visible: true,
  }));

  return (
    <Tabs
      items={manyTabs}
      activeTabValue={activeTab}
      onClick={setActiveTab}
      allowScroll={true}
      tabParam=""
    />
  );
};

const SecondaryStyleTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    {
      key: "all",
      label: "All",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <p className="text-grayTextPrimary">All transactions</p>
        </div>
      ),
      visible: true,
    },
    {
      key: "sent",
      label: "Sent",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <p className="text-grayTextPrimary">Sent transactions</p>
        </div>
      ),
      visible: true,
    },
    {
      key: "received",
      label: "Received",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <p className="text-grayTextPrimary">Received transactions</p>
        </div>
      ),
      visible: true,
    },
    {
      key: "staking",
      label: "Staking",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <p className="text-grayTextPrimary">Staking operations</p>
        </div>
      ),
      visible: true,
    },
  ];

  return (
    <Tabs
      items={tabs}
      activeTabValue={activeTab}
      onClick={setActiveTab}
      tabParam="filter"
    />
  );
};

const WithExtraContentTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState("activity");

  const tabs = [
    {
      key: "activity",
      label: "Activity",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Recent Activity</h3>
          <p className="text-grayTextPrimary">Your recent blockchain activity</p>
        </div>
      ),
      visible: true,
      extraTitle: <span className="text-text-sm text-grayTextPrimary">Last 30 days</span>,
    },
    {
      key: "analytics",
      label: "Analytics",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Analytics</h3>
          <p className="text-grayTextPrimary">Performance metrics and charts</p>
        </div>
      ),
      visible: true,
      extraTitle: <span className="text-text-sm text-grayTextPrimary">Updated hourly</span>,
    },
    {
      key: "settings",
      label: "Settings",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <h3 className="text-text-lg font-semibold">Settings</h3>
          <p className="text-grayTextPrimary">Configure your preferences</p>
        </div>
      ),
      visible: true,
      extraTitle: <span className="text-text-sm text-grayTextPrimary">Personal</span>,
    },
  ];

  return (
    <Tabs
      items={tabs}
      activeTabValue={activeTab}
      onClick={setActiveTab}
      toRight={true}
      tabParam=""
    />
  );
};

const MinimalTemplate: FC = () => {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    {
      key: "info",
      label: "Info",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <p className="text-grayTextPrimary">Basic information</p>
        </div>
      ),
      visible: true,
    },
    {
      key: "details",
      label: "Details",
      content: (
        <div className="rounded-l border border-border bg-cardBg p-4">
          <p className="text-grayTextPrimary">Detailed information</p>
        </div>
      ),
      visible: true,
    },
  ];

  return (
    <Tabs
      items={tabs}
      activeTabValue={activeTab}
      onClick={setActiveTab}
      withPadding={false}
      withMargin={false}
      tabParam=""
    />
  );
};

/**
 * Default tab navigation with 4 tabs showing different blockchain sections
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * Scrollable tabs with 10+ tabs demonstrating horizontal scroll behavior
 */
export const ScrollableTabs: Story = {
  render: () => <ScrollableTemplate />,
};

/**
 * Secondary style tabs with custom URL parameter for filtering
 */
export const SecondaryStyle: Story = {
  render: () => <SecondaryStyleTemplate />,
};

/**
 * Tabs with extra title content on the right side
 */
export const WithExtraContent: Story = {
  render: () => <WithExtraContentTemplate />,
};

/**
 * Minimal tabs without padding or margin
 */
export const Minimal: Story = {
  render: () => <MinimalTemplate />,
};
