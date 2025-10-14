import { Breadcrumb } from "@/ui";
import { BreadcrumbSeparator } from "@/ui/breadcrumbs/components/BreadcrumbSeparator";
import { formatString } from "@/utils/format";
import { Meta, StoryObj } from "@storybook/react/*";

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

const WithOtherSeparator: Story = {
  args: {
    breadcrumbItems: [{ label: "Block" }],
    breadcrumbSeparator: <span className='text-text-sm'>/</span>,
  },
};

export { Default, WithoutLink, WithOtherSeparator };
