import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SensitiveContentWarning } from "../../ui/sensitiveContentWarning";

const meta: Meta<typeof SensitiveContentWarning> = {
  title: "Feedback/SensitiveContentWarning",
  component: SensitiveContentWarning,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Warning component that gates access to user-generated or sensitive content with localStorage support for remembering user preferences.",
      },
    },
  },
  argTypes: {
    onDisplay: {
      control: false,
      description: "Callback function when user clicks Display button",
      table: {
        type: { summary: "() => void" },
      },
    },
    localStorageKey: {
      control: "text",
      description: "localStorage key for saving user preference",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"showSensitiveContent"' },
      },
    },
    title: {
      control: "text",
      description: "Warning title text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"User-generated content"' },
      },
    },
    description: {
      control: "text",
      description: "Warning description text",
      table: {
        type: { summary: "string" },
        defaultValue: {
          summary:
            '"Following content is user-generated and unmoderated by the Cexplorer team."',
        },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[500px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default warning with standard text and behavior
 */
export const Default: Story = {
  args: {
    onDisplay: () => alert("Content displayed! In real usage, this would show the sensitive content."),
  },
};

/**
 * Custom title and description for NFT metadata warning
 */
export const NFTMetadata: Story = {
  args: {
    onDisplay: () => console.log("Displaying NFT metadata"),
    localStorageKey: "showNFTMetadata",
    title: "NFT Metadata Warning",
    description:
      "This NFT contains user-uploaded metadata that has not been verified by the Cexplorer team.",
  },
};

/**
 * Transaction memo warning with custom text
 */
export const TransactionMemo: Story = {
  args: {
    onDisplay: () => console.log("Displaying transaction memo"),
    localStorageKey: "showTransactionMemos",
    title: "Transaction Memo",
    description:
      "This transaction contains a user-generated memo that may include sensitive or unverified information.",
  },
};

/**
 * Pool metadata warning
 */
export const PoolMetadata: Story = {
  args: {
    onDisplay: () => console.log("Displaying pool metadata"),
    localStorageKey: "showPoolMetadata",
    title: "Stake Pool Information",
    description:
      "Pool operators can submit custom metadata. This information is not verified by Cexplorer.",
  },
};

/**
 * Interactive example showing state management and content reveal
 */
export const WithContentReveal: Story = {
  render: () => {
    const [showContent, setShowContent] = useState(false);

    // Reset state when switching stories
    const handleDisplay = () => {
      setShowContent(true);
    };

    if (!showContent) {
      return (
        <SensitiveContentWarning
          onDisplay={handleDisplay}
          localStorageKey="storybook_demo"
        />
      );
    }

    return (
      <div className='flex flex-col items-center gap-4'>
        <div className='rounded-lg border border-border bg-cardBg p-6'>
          <h3 className='mb-3 text-text-lg font-semibold text-text'>
            User-Generated Content
          </h3>
          <p className='mb-2 text-text-sm text-text'>
            This is the sensitive content that was hidden behind the warning.
          </p>
          <p className='text-text-xs text-text-muted'>
            Example: "Check out my awesome Cardano project at example.com! 🚀"
          </p>
        </div>
        <button
          onClick={() => setShowContent(false)}
          className='text-text-sm text-darkBlue underline'
        >
          Reset to show warning again
        </button>
      </div>
    );
  },
};

/**
 * Example in a card context showing typical usage pattern
 */
export const InCard: Story = {
  render: () => {
    const [showMemo, setShowMemo] = useState(false);

    return (
      <div className='w-full max-w-2xl rounded-lg border border-border bg-cardBg p-6'>
        <h2 className='mb-4 text-text-xl font-bold text-text'>
          Transaction Details
        </h2>

        <div className='mb-4 flex flex-col gap-2'>
          <div className='flex justify-between text-text-sm'>
            <span className='text-text-muted'>Transaction Hash:</span>
            <span className='font-mono text-text'>5f20df93...e940ebb</span>
          </div>
          <div className='flex justify-between text-text-sm'>
            <span className='text-text-muted'>Amount:</span>
            <span className='text-text'>1,234.56 ADA</span>
          </div>
          <div className='flex justify-between text-text-sm'>
            <span className='text-text-muted'>Fee:</span>
            <span className='text-text'>0.17 ADA</span>
          </div>
        </div>

        <div className='border-t border-border pt-4'>
          <h3 className='mb-3 text-text-md font-semibold text-text'>
            Transaction Memo
          </h3>

          {!showMemo ? (
            <SensitiveContentWarning
              onDisplay={() => setShowMemo(true)}
              localStorageKey="demo_transaction_memo"
              title="Transaction Memo"
              description="This transaction includes a user-generated memo."
            />
          ) : (
            <div className='rounded bg-background p-3'>
              <p className='text-text-sm italic text-text'>
                "Payment for services rendered. Thank you! 🙏"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  },
};

/**
 * Example showing multiple content warnings in a list
 */
export const InList: Story = {
  render: () => {
    const [visibleContent, setVisibleContent] = useState<Set<number>>(
      new Set(),
    );

    const items = [
      {
        id: 1,
        title: "Transaction #1",
        memo: "Great doing business with you!",
      },
      { id: 2, title: "Transaction #2", memo: "Monthly subscription payment" },
      { id: 3, title: "Transaction #3", memo: "Check out my website!" },
    ];

    return (
      <div className='flex w-full max-w-2xl flex-col gap-4'>
        <h2 className='text-text-lg font-bold text-text'>
          Recent Transactions with Memos
        </h2>

        {items.map((item) => (
          <div
            key={item.id}
            className='rounded-lg border border-border bg-cardBg p-4'
          >
            <h3 className='mb-2 text-text-md font-semibold text-text'>
              {item.title}
            </h3>

            {!visibleContent.has(item.id) ? (
              <SensitiveContentWarning
                onDisplay={() =>
                  setVisibleContent((prev) => new Set(prev).add(item.id))
                }
                localStorageKey={`demo_memo_${item.id}`}
                title='Transaction Memo'
                description='This transaction contains a user-generated memo.'
              />
            ) : (
              <p className='text-text-sm italic text-text-muted'>
                "{item.memo}"
              </p>
            )}
          </div>
        ))}
      </div>
    );
  },
};
