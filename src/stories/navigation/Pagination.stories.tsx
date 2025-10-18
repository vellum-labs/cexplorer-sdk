import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "@/ui/pagination";
import { useState } from "react";

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component:
          "Pagination component for navigating through multi-page data sets with smart page display and jump input.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentPage: {
      control: { type: "number", min: 1 },
      description: "Current active page number (1-indexed)",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages available",
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const PaginationWrapper = (args: { currentPage: number; totalPages: number }) => {
  const [page, setPage] = useState(args.currentPage);
  return (
    <div className="flex h-[200px] w-full items-center justify-center bg-background">
      <Pagination currentPage={page} totalPages={args.totalPages} setCurrentPage={setPage} />
    </div>
  );
};

/**
 * Default pagination on first page with 10 total pages.
 */
export const Default: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

/**
 * Pagination in the middle of a large dataset (page 50 of 100).
 */
export const MiddlePage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 50,
    totalPages: 100,
  },
};

/**
 * Pagination on the last page showing disabled Next button.
 */
export const LastPage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 20,
    totalPages: 20,
  },
};

/**
 * Pagination with only 2 pages total (minimal case).
 */
export const TwoPages: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 2,
  },
};

/**
 * Single page pagination (no navigation needed).
 */
export const SinglePage: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 1,
    totalPages: 1,
  },
};

/**
 * Large dataset pagination (1000 pages).
 */
export const LargeDataset: Story = {
  render: args => <PaginationWrapper {...args} />,
  args: {
    currentPage: 500,
    totalPages: 1000,
  },
};
