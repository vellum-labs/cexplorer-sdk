import type { Meta, StoryObj } from "@storybook/react";
import { ExtraLabelBadge } from "../../ui/extraLabelBadge";

const meta: Meta<typeof ExtraLabelBadge> = {
  title: "Data Display/ExtraLabelBadge",
  component: ExtraLabelBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Styled label badge with optional custom colors, font weight, and clickable link for script labels and contract names.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "The label text to display inside the badge",
      table: {
        type: { summary: "string" },
      },
    },
    extra: {
      control: "object",
      description:
        "Optional styling and link configuration (bg, color, fw, link)",
      table: {
        type: { summary: "object | undefined" },
        defaultValue: { summary: "undefined" },
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
 * Default plain text without styling (extra is undefined)
 */
export const Default: Story = {
  args: {
    name: "Native Script",
    extra: undefined,
  },
};

/**
 * Badge with custom green theme (Plutus V2)
 */
export const GreenTheme: Story = {
  args: {
    name: "Plutus V2",
    extra: {
      bg: "#e8f5e9",
      color: "#2e7d32",
      fw: 600,
      link: null,
    },
  },
};

/**
 * Badge with blue theme styling
 */
export const BlueTheme: Story = {
  args: {
    name: "Smart Contract",
    extra: {
      bg: "#e3f2fd",
      color: "#1976d2",
      fw: 600,
      link: null,
    },
  },
};

/**
 * Badge with purple theme styling
 */
export const PurpleTheme: Story = {
  args: {
    name: "DeFi Protocol",
    extra: {
      bg: "#f3e5f5",
      color: "#7b1fa2",
      fw: 500,
      link: null,
    },
  },
};

/**
 * Badge with orange theme styling
 */
export const OrangeTheme: Story = {
  args: {
    name: "NFT Contract",
    extra: {
      bg: "#fff3e0",
      color: "#e65100",
      fw: 600,
      link: null,
    },
  },
};

/**
 * Clickable badge with link
 */
export const WithLink: Story = {
  args: {
    name: "View on Explorer",
    extra: {
      bg: "#f3e5f5",
      color: "#7b1fa2",
      fw: 500,
      link: "https://cardanoscan.io",
    },
  },
};

/**
 * All badge variants displayed together
 */
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-2'>
        <ExtraLabelBadge name='Plain Text' extra={undefined} />
        <span className='text-text-sm text-text-muted'>No styling</span>
      </div>
      <div className='flex items-center gap-2'>
        <ExtraLabelBadge
          name='Plutus V2'
          extra={{
            bg: "#e8f5e9",
            color: "#2e7d32",
            fw: 600,
            link: null,
          }}
        />
        <span className='text-text-sm text-text-muted'>Green theme</span>
      </div>
      <div className='flex items-center gap-2'>
        <ExtraLabelBadge
          name='Smart Contract'
          extra={{
            bg: "#e3f2fd",
            color: "#1976d2",
            fw: 600,
            link: null,
          }}
        />
        <span className='text-text-sm text-text-muted'>Blue theme</span>
      </div>
      <div className='flex items-center gap-2'>
        <ExtraLabelBadge
          name='DeFi Protocol'
          extra={{
            bg: "#f3e5f5",
            color: "#7b1fa2",
            fw: 500,
            link: null,
          }}
        />
        <span className='text-text-sm text-text-muted'>Purple theme</span>
      </div>
      <div className='flex items-center gap-2'>
        <ExtraLabelBadge
          name='View on Explorer'
          extra={{
            bg: "#fff3e0",
            color: "#e65100",
            fw: 600,
            link: "https://cardanoscan.io",
          }}
        />
        <span className='text-text-sm text-text-muted'>
          With link (clickable)
        </span>
      </div>
    </div>
  ),
};
