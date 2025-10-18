import { Breadcrumb } from "@/ui";
import { BreadcrumbSeparator } from "@/ui/breadcrumbs/components/BreadcrumbSeparator";
import { formatNumber, formatString } from "@/utils/format";
import type { Meta, StoryObj } from "@storybook/react/*";

const separatorOptions = {
  default: <BreadcrumbSeparator />,
  slash: <span className='text-text-sm'>/</span>,
  arrow: <span className='text-text-sm'>→</span>,
  dot: <span className='text-text-sm'>•</span>,
};

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  decorators: [
    Story => (
      <div className='h-full w-full bg-background p-5'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    breadcrumbItems: {
      description: 'Select a preset or use "custom" to edit manually',
      control: "object",
    },
    breadcrumbSeparator: {
      description: "Custom separator between breadcrumb items",
      options: Object.keys(separatorOptions),
      mapping: separatorOptions,
      control: {
        type: "select",
        labels: {
          default: "Default (BreadcrumbSeparator)",
          slash: "/ Slash",
          chevron: "› Chevron",
          arrow: "→ Arrow",
          dot: "• Dot",
        },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumb navigation with TanStack Router integration. Displays hierarchical page trail with customizable separators.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  args: {
    breadcrumbItems: [
      { label: "Block" },
      {
        label: formatString(
          "2290ac20e4bf1cbd085d08d4b5c54735ee60f6f441269f5335a1c7974ab9c5c3",
          "long",
        ),
        link: "/",
      },
    ],
  },
};

const WithoutLink: Story = {
  args: {
    breadcrumbItems: [{ label: "Block" }],
  },
};

const WithSlashSeparator: Story = {
  args: {
    breadcrumbItems: [
      { label: "Blocks", link: "/blocks" },
      { label: "Epoch (450)" },
    ],
    breadcrumbSeparator: <span className='text-text-sm'>/</span>,
  },
};

const WithArrowSeparator: Story = {
  args: {
    breadcrumbItems: [
      { label: "Transactions", link: "/transactions" },
      { label: formatString("a1b2c3d4e5f6", "long") },
    ],
    breadcrumbSeparator: <span className='text-text-sm'>→</span>,
  },
};

const TransactionPath: Story = {
  args: {
    breadcrumbItems: [
      { label: "Explorer", link: "/" },
      { label: "Transactions", link: "/transactions" },
      {
        label: formatString(
          "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
          "long",
        ),
      },
    ],
  },
};

const StakePoolPath: Story = {
  args: {
    breadcrumbItems: [
      { label: "Explorer", link: "/" },
      { label: "Stake Pools", link: "/pools" },
      { label: "[POOL1]", link: "/pool/pool1" },
      { label: "Delegators" },
    ],
  },
};

const AddressPath: Story = {
  args: {
    breadcrumbItems: [
      { label: "Explorer", link: "/" },
      { label: "Addresses", link: "/addresses" },
      {
        label: formatString(
          "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
          "long",
        ),
      },
    ],
  },
};

const TokenPath: Story = {
  args: {
    breadcrumbItems: [
      { label: "Explorer", link: "/" },
      { label: "Native Tokens", link: "/tokens" },
      { label: "HOSKY" },
    ],
  },
};

const EpochPath: Story = {
  args: {
    breadcrumbItems: [
      { label: "Explorer", link: "/" },
      { label: "Epochs", link: "/epochs" },
      { label: "Epoch (450)", link: "/epoch/450" },
      { label: `Slot (${formatNumber(10234567)})` },
    ],
  },
};

const DeepNestedPath: Story = {
  args: {
    breadcrumbItems: [
      { label: "Explorer", link: "/" },
      { label: "Blocks", link: "/blocks" },
      { label: `Block (${formatNumber(10234567)})`, link: "/block/10234567" },
      { label: "Transactions", link: "/block/10234567/transactions" },
      { label: formatString("tx123abc456def", "long") },
    ],
  },
};

export {
  Default,
  WithoutLink,
  WithSlashSeparator,
  WithArrowSeparator,
  TransactionPath,
  StakePoolPath,
  AddressPath,
  TokenPath,
  EpochPath,
  DeepNestedPath,
};
