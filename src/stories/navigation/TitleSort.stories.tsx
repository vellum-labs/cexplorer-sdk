import type { Meta, StoryObj } from "@storybook/react";
import { TitleSort } from "../../ui/titleSort";
import { useState } from "react";

const meta: Meta<typeof TitleSort> = {
  title: "Navigation/TitleSort",
  component: TitleSort,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Provides a clickable table column header with sort functionality and visual indicators.",
      },
    },
  },
  argTypes: {
    order: {
      control: "text",
      description: "Current active column order/name being sorted",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    titleOrder: {
      control: "text",
      description: "The column order/name this title represents",
      table: {
        type: { summary: "string" },
      },
    },
    sort: {
      control: "select",
      options: ["asc", "desc", undefined],
      description: "Current sort direction for this column",
      table: {
        type: { summary: '"asc" | "desc"' },
        defaultValue: { summary: "undefined" },
      },
    },
    children: {
      control: "text",
      description: "The title/label to display (typically column header text)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Inactive column header (no sort applied)
 */
export const Default: Story = {
  args: {
    titleOrder: "amount",
    children: "Amount",
  },
};

/**
 * Active column with descending sort
 */
export const DescendingSort: Story = {
  args: {
    order: "timestamp",
    titleOrder: "timestamp",
    sort: "desc",
    children: "Timestamp",
  },
};

/**
 * Active column with ascending sort
 */
export const AscendingSort: Story = {
  args: {
    order: "block",
    titleOrder: "block",
    sort: "asc",
    children: "Block",
  },
};

/**
 * Inactive column when another column is being sorted
 */
export const InactiveWhileOtherSorted: Story = {
  args: {
    order: "timestamp",
    titleOrder: "amount",
    sort: "desc",
    children: "Amount",
  },
};

/**
 * Interactive table example with multiple sortable columns
 */
const InteractiveTableComponent = () => {
  const [sortState, setSortState] = useState<{
    order?: string;
    sort?: "asc" | "desc";
  }>({});

  const handleSort = (column: string) => {
    if (sortState.order === column) {
      // Cycle through: desc → asc → undefined
      if (sortState.sort === "desc") {
        setSortState({ order: column, sort: "asc" });
      } else if (sortState.sort === "asc") {
        setSortState({});
      }
    } else {
      // New column - start with desc
      setSortState({ order: column, sort: "desc" });
    }
  };

  return (
    <div className='w-full'>
      <div className='mb-4 text-sm text-gray-600 dark:text-gray-400'>
        Click on column headers to sort
      </div>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-gray-200 dark:border-gray-700'>
            <th className='p-2'>
              <div onClick={() => handleSort("timestamp")}>
                <TitleSort
                  order={sortState.order}
                  titleOrder='timestamp'
                  sort={sortState.order === "timestamp" ? sortState.sort : undefined}
                >
                  Timestamp
                </TitleSort>
              </div>
            </th>
            <th className='p-2'>
              <div onClick={() => handleSort("block")}>
                <TitleSort
                  order={sortState.order}
                  titleOrder='block'
                  sort={sortState.order === "block" ? sortState.sort : undefined}
                >
                  Block
                </TitleSort>
              </div>
            </th>
            <th className='p-2'>
              <div onClick={() => handleSort("amount")}>
                <TitleSort
                  order={sortState.order}
                  titleOrder='amount'
                  sort={sortState.order === "amount" ? sortState.sort : undefined}
                >
                  Amount
                </TitleSort>
              </div>
            </th>
            <th className='p-2'>
              <div onClick={() => handleSort("fee")}>
                <TitleSort
                  order={sortState.order}
                  titleOrder='fee'
                  sort={sortState.order === "fee" ? sortState.sort : undefined}
                >
                  Fee
                </TitleSort>
              </div>
            </th>
          </tr>
        </thead>
      </table>
      <div className='mt-4 text-xs text-gray-500'>
        Current sort: {sortState.order || "none"} {sortState.sort || ""}
      </div>
    </div>
  );
};

export const InteractiveTable: Story = {
  render: () => <InteractiveTableComponent />,
};
