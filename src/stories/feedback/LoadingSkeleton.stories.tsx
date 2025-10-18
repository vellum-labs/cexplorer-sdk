import type { Meta, StoryObj } from "@storybook/react";
import { LoadingSkeleton } from "../../ui/loadingSkeleton";

const meta: Meta<typeof LoadingSkeleton> = {
  title: "Feedback/LoadingSkeleton",
  component: LoadingSkeleton,
  parameters: {
    layout: "fullwidth",
    docs: {
      description: {
        component:
          "Loading skeleton component with shimmer animation for placeholder content. Used to indicate loading states while blockchain data is being fetched.",
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background'>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: "text",
      description: "Height of the skeleton element",
      table: {
        defaultValue: { summary: "100%" },
      },
    },
    width: {
      control: "text",
      description: "Width of the skeleton element",
      table: {
        defaultValue: { summary: "100%" },
      },
    },
    maxHeight: {
      control: "text",
      description: "Maximum height constraint",
      table: {
        defaultValue: { summary: "100%" },
      },
    },
    maxWidth: {
      control: "text",
      description: "Maximum width constraint",
      table: {
        defaultValue: { summary: "100%" },
      },
    },
    rounded: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Border radius size",
      table: {
        defaultValue: { summary: "sm" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: "100px",
    width: "300px",
    rounded: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Default skeleton with medium border radius.",
      },
    },
  },
};

export const TransactionCard: Story = {
  render: () => (
    <div className='rounded-lg w-[600px] space-y-4 border border-border bg-background p-4'>
      <div className='flex items-center gap-3'>
        <LoadingSkeleton height='40px' width='40px' rounded='full' />
        <div className='flex-1 space-y-2'>
          <LoadingSkeleton height='16px' width='60%' rounded='sm' />
          <LoadingSkeleton height='12px' width='40%' rounded='sm' />
        </div>
      </div>
      <div className='space-y-2'>
        <LoadingSkeleton height='14px' width='100%' rounded='sm' />
        <LoadingSkeleton height='14px' width='80%' rounded='sm' />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton placeholder for a transaction card with avatar, title, and details.",
      },
    },
  },
};

export const PoolList: Story = {
  render: () => (
    <div className='rounded-lg w-[700px] space-y-3 border border-border bg-background p-4'>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className='rounded-md flex items-center justify-between border border-border p-3'
        >
          <div className='flex items-center gap-3'>
            <LoadingSkeleton height='48px' width='48px' rounded='md' />
            <div className='space-y-2'>
              <LoadingSkeleton height='16px' width='150px' rounded='sm' />
              <LoadingSkeleton height='12px' width='100px' rounded='sm' />
            </div>
          </div>
          <div className='space-y-2 text-right'>
            <LoadingSkeleton height='16px' width='80px' rounded='sm' />
            <LoadingSkeleton height='12px' width='60px' rounded='sm' />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton placeholders for a list of stake pool cards while loading.",
      },
    },
  },
};

export const BlockDetails: Story = {
  render: () => (
    <div className='rounded-lg w-[800px] space-y-6 border border-border bg-background p-6'>
      <div className='space-y-3'>
        <LoadingSkeleton height='32px' width='200px' rounded='md' />
        <LoadingSkeleton height='16px' width='60%' rounded='sm' />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className='space-y-2'>
            <LoadingSkeleton height='12px' width='80px' rounded='sm' />
            <LoadingSkeleton height='20px' width='100%' rounded='sm' />
          </div>
        ))}
      </div>

      <LoadingSkeleton height='200px' width='100%' rounded='lg' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton for block details page showing header, stats grid, and data section.",
      },
    },
  },
};

export const Avatar: Story = {
  args: {
    height: "40px",
    width: "40px",
    rounded: "full",
  },
  parameters: {
    docs: {
      description: {
        story: "Circular skeleton for user avatars or pool icons.",
      },
    },
  },
};

export const TextLines: Story = {
  render: () => (
    <div className='w-[500px] space-y-2'>
      <LoadingSkeleton height='16px' width='100%' rounded='sm' />
      <LoadingSkeleton height='16px' width='95%' rounded='sm' />
      <LoadingSkeleton height='16px' width='90%' rounded='sm' />
      <LoadingSkeleton height='16px' width='85%' rounded='sm' />
      <LoadingSkeleton height='16px' width='70%' rounded='sm' />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple text line skeletons for paragraph content loading.",
      },
    },
  },
};

export const AddressCard: Story = {
  render: () => (
    <div className='rounded-lg w-[600px] border border-border bg-background p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <LoadingSkeleton height='24px' width='150px' rounded='md' />
        <LoadingSkeleton height='32px' width='100px' rounded='md' />
      </div>

      <div className='mb-4 space-y-2'>
        <LoadingSkeleton height='14px' width='100%' rounded='sm' />
        <LoadingSkeleton height='14px' width='80%' rounded='sm' />
      </div>

      <div className='grid grid-cols-3 gap-3'>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className='rounded-md space-y-2 border border-border p-3'
          >
            <LoadingSkeleton height='12px' width='60px' rounded='sm' />
            <LoadingSkeleton height='20px' width='80px' rounded='sm' />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton for Cardano address card with balance, transactions, and stats.",
      },
    },
  },
};

export const TableRow: Story = {
  render: () => (
    <div className='w-[900px]'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-border'>
            <th className='p-3 text-left'>
              <LoadingSkeleton height='12px' width='60px' rounded='sm' />
            </th>
            <th className='p-3 text-left'>
              <LoadingSkeleton height='12px' width='80px' rounded='sm' />
            </th>
            <th className='p-3 text-left'>
              <LoadingSkeleton height='12px' width='70px' rounded='sm' />
            </th>
            <th className='p-3 text-left'>
              <LoadingSkeleton height='12px' width='50px' rounded='sm' />
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4].map(i => (
            <tr key={i} className='border-b border-border'>
              <td className='p-3'>
                <LoadingSkeleton height='16px' width='100%' rounded='sm' />
              </td>
              <td className='p-3'>
                <LoadingSkeleton height='16px' width='100%' rounded='sm' />
              </td>
              <td className='p-3'>
                <LoadingSkeleton height='16px' width='100%' rounded='sm' />
              </td>
              <td className='p-3'>
                <LoadingSkeleton height='16px' width='60px' rounded='sm' />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton table rows for transaction or block list loading states.",
      },
    },
  },
};

export const StatCards: Story = {
  render: () => (
    <div className='grid w-[800px] grid-cols-4 gap-4'>
      {[1, 2, 3, 4].map(i => (
        <div
          key={i}
          className='rounded-lg border border-border bg-background p-4'
        >
          <LoadingSkeleton
            height='14px'
            width='80px'
            rounded='sm'
            className='mb-3'
          />
          <LoadingSkeleton height='28px' width='100px' rounded='md' />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid of stat card skeletons for dashboard metrics.",
      },
    },
  },
};

export const SearchResult: Story = {
  render: () => (
    <div className='rounded-lg w-[600px] space-y-2 border border-border bg-background p-3'>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          className='rounded-md flex items-center gap-3 p-2 hover:bg-darker'
        >
          <LoadingSkeleton height='32px' width='32px' rounded='md' />
          <div className='flex-1 space-y-1'>
            <LoadingSkeleton height='14px' width='70%' rounded='sm' />
            <LoadingSkeleton height='12px' width='40%' rounded='sm' />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeleton for search results dropdown while fetching blockchain data.",
      },
    },
  },
};
