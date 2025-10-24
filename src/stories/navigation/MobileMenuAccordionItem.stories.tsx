import type { Meta, StoryObj } from "@storybook/react";
import { useState, type FC } from "react";
import { Accordion } from "../../ui/accordion/accordion";
import { MobileMenuAccordionItem } from "../../ui/mobileMenuAccordionItem";

const meta: Meta<typeof MobileMenuAccordionItem> = {
  title: "Navigation/MobileMenuAccordionItem",
  component: MobileMenuAccordionItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An accordion-based navigation component for mobile menus with icons, expandable sub-items, and automatic menu closing on navigation.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Display label for the accordion trigger",
      table: {
        type: { summary: "string" },
      },
    },
    icon: {
      control: "text",
      description: "Lucide icon name",
      table: {
        type: { summary: "keyof typeof dynamicIconImports" },
      },
    },
    items: {
      control: "object",
      description: "Navigation sub-items",
      table: {
        type: { summary: "NavigationOptions" },
      },
    },
    setIsOpen: {
      control: false,
      description: "Menu state setter function",
      table: {
        type: { summary: "Dispatch<SetStateAction<boolean>>" },
      },
    },
    href: {
      control: "text",
      description: "Optional href to make trigger clickable",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex min-h-[400px] w-full flex-col bg-background p-4'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const blockchainItems = {
    blocks: { label: "Blocks", href: "/blocks" as any },
    epochs: { label: "Epochs", href: "/epochs" as any },
    transactions: { label: "Transactions", href: "/tx" as any },
    slots: { label: "Slots", href: "/slots" as any },
  };

  return (
    <div className='w-full max-w-md'>
      <Accordion type='single' collapsible>
        <MobileMenuAccordionItem
          label='Blockchain'
          icon='blocks'
          items={blockchainItems as any}
          setIsOpen={setIsOpen}
        />
      </Accordion>
      {!isOpen && (
        <p className='mt-4 text-text-sm text-grayTextPrimary'>
          Menu closed by clicking a link
        </p>
      )}
    </div>
  );
};

const WithClickableTriggerTemplate: FC = () => {
  const [, setIsOpen] = useState(true);

  const governanceItems = {
    proposals: { label: "Proposals", href: "/gov/proposals" as any },
    dreps: { label: "DReps", href: "/gov/dreps" as any },
    committees: { label: "Committees", href: "/gov/committees" as any },
  };

  return (
    <div className='w-full max-w-md'>
      <Accordion type='single' collapsible>
        <MobileMenuAccordionItem
          label='Governance'
          icon='vote'
          href={"/governance" as any}
          items={governanceItems as any}
          setIsOpen={setIsOpen}
        />
      </Accordion>
      <p className='mt-2 text-text-sm text-grayTextPrimary'>
        The "Governance" label is clickable and links to /governance
      </p>
    </div>
  );
};

const WithButtonActionsTemplate: FC = () => {
  const [, setIsOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");

  const settingsItems = {
    theme: {
      label: `Toggle Theme (Current: ${theme})`,
      onClick: () => setTheme(theme === "light" ? "dark" : "light"),
    },
    language: {
      label: `Change Language (Current: ${language})`,
      onClick: () => setLanguage(language === "en" ? "ru" : "en"),
    },
  };

  return (
    <div className='w-full max-w-md'>
      <Accordion type='single' collapsible>
        <MobileMenuAccordionItem
          label='Settings'
          icon='settings'
          items={settingsItems as any}
          setIsOpen={setIsOpen}
        />
      </Accordion>
      <p className='mt-2 text-text-sm text-grayTextPrimary'>
        Click the settings items to trigger actions (no navigation)
      </p>
    </div>
  );
};

const MultipleItemsTemplate: FC = () => {
  const [, setIsOpen] = useState(true);

  const blockchainItems = {
    blocks: { label: "Blocks", href: "/blocks" as any },
    epochs: { label: "Epochs", href: "/epochs" as any },
    transactions: { label: "Transactions", href: "/tx" as any },
  };

  const stakingItems = {
    pools: { label: "Stake Pools", href: "/pools" as any },
    rewards: { label: "Rewards", href: "/rewards" as any },
    delegators: { label: "Delegators", href: "/delegators" as any },
  };

  const governanceItems = {
    proposals: { label: "Proposals", href: "/gov/proposals" as any },
    dreps: { label: "DReps", href: "/gov/dreps" as any },
  };

  return (
    <div className='w-full max-w-md'>
      <Accordion type='single' collapsible>
        <MobileMenuAccordionItem
          label='Blockchain'
          icon='blocks'
          items={blockchainItems as any}
          setIsOpen={setIsOpen}
        />
        <MobileMenuAccordionItem
          label='Staking'
          icon='coins'
          href={"/staking" as any}
          items={stakingItems as any}
          setIsOpen={setIsOpen}
        />
        <MobileMenuAccordionItem
          label='Governance'
          icon='vote'
          items={governanceItems as any}
          setIsOpen={setIsOpen}
        />
      </Accordion>
      <p className='mt-2 text-text-sm text-grayTextPrimary'>
        Multiple accordion items (only one can be open at a time)
      </p>
    </div>
  );
};

const ManySubItemsTemplate: FC = () => {
  const [, setIsOpen] = useState(true);

  const tokensItems = {
    native: { label: "Native Tokens", href: "/tokens/native" as any },
    nfts: { label: "NFTs", href: "/tokens/nfts" as any },
    metadata: { label: "Token Metadata", href: "/tokens/metadata" as any },
    registry: { label: "Token Registry", href: "/tokens/registry" as any },
    policies: { label: "Minting Policies", href: "/tokens/policies" as any },
    top: { label: "Top Tokens", href: "/tokens/top" as any },
    trending: { label: "Trending", href: "/tokens/trending" as any },
    recent: { label: "Recently Minted", href: "/tokens/recent" as any },
  };

  return (
    <div className='w-full max-w-md'>
      <Accordion type='single' collapsible>
        <MobileMenuAccordionItem
          label='Tokens & NFTs'
          icon='coins'
          items={tokensItems as any}
          setIsOpen={setIsOpen}
        />
      </Accordion>
      <p className='mt-2 text-text-sm text-grayTextPrimary'>
        Accordion with many sub-items (8 items)
      </p>
    </div>
  );
};

/**
 * Default mobile menu accordion item with blockchain navigation
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * Accordion with clickable trigger label that links to a page
 */
export const WithClickableTrigger: Story = {
  render: () => <WithClickableTriggerTemplate />,
};

/**
 * Accordion with button actions instead of links
 */
export const WithButtonActions: Story = {
  render: () => <WithButtonActionsTemplate />,
};

/**
 * Multiple accordion items in a single menu
 */
export const MultipleItems: Story = {
  render: () => <MultipleItemsTemplate />,
};

/**
 * Accordion with many sub-items (8 items)
 */
export const ManySubItems: Story = {
  render: () => <ManySubItemsTemplate />,
};
