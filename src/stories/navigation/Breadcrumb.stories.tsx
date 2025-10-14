import { Breadcrumb } from "@/ui";
import { Meta, StoryObj } from "@storybook/react/*";
import { ChevronRight } from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breakpoints",
  component: Breadcrumb,
  tags: ["autodocs"],
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
      { label: "Dashboard", link: "/dashboard" },
      { label: "Settings", link: "/settings" },
      { label: "Profile" },
    ],
  },
};

export { Default };
