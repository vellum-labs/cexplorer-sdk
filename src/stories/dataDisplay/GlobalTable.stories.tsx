import type { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC } from "react";
import { GlobalTable, type Column } from "../../ui/globalTable";

// Mock data type
interface Transaction {
  hash: string;
  block: number;
  age: string;
  amount: string;
  fees: string;
  size: number;
}

// Mock transaction data
const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => ({
  hash: `${i}f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb`.slice(
    0,
    64,
  ),
  block: 8234567 + i,
  age: `${Math.floor(Math.random() * 24)} hours ago`,
  amount: `${(Math.random() * 1000).toFixed(2)} ADA`,
  fees: `${(Math.random() * 1).toFixed(4)} ADA`,
  size: Math.floor(Math.random() * 1000) + 200,
}));

// Column definitions
const columns: Column<Transaction>[] = [
  {
    key: "hash",
    title: "Transaction Hash",
    widthPx: 300,
    visible: true,
    render: tx => (
      <span className='font-mono text-primary'>{tx.hash.slice(0, 16)}...</span>
    ),
  },
  {
    key: "block",
    title: "Block",
    widthPx: 120,
    visible: true,
    render: tx => (
      <span className='font-semibold'>{tx.block.toLocaleString()}</span>
    ),
  },
  {
    key: "age",
    title: "Age",
    widthPx: 150,
    visible: true,
    render: tx => <span className='text-grayTextPrimary'>{tx.age}</span>,
  },
  {
    key: "amount",
    title: "Amount",
    widthPx: 150,
    visible: true,
    render: tx => <span className='font-semibold text-text'>{tx.amount}</span>,
  },
  {
    key: "fees",
    title: "Fees",
    widthPx: 120,
    visible: true,
    render: tx => <span className='text-grayTextPrimary'>{tx.fees}</span>,
  },
  {
    key: "size",
    title: "Size",
    widthPx: 100,
    visible: true,
    render: tx => <span className='text-grayTextPrimary'>{tx.size} B</span>,
  },
];

// Mock query
const mockQuery = {
  data: mockTransactions,
  isLoading: false,
  isError: false,
  error: null,
  refetch: () => Promise.resolve({} as any),
  isFetching: false,
  status: "success" as const,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof GlobalTable> = {
  title: "Data Display/GlobalTable",
  component: GlobalTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A feature-rich data table component with pagination, infinite scroll, column reordering, and filtering. Optimized for blockchain data.",
      },
    },
  },
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <div className='flex min-h-[600px] w-full bg-background p-4'>
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

const DefaultTemplate: FC = () => {
  return (
    <GlobalTable
      type='default'
      items={mockTransactions.slice(0, 20)}
      columns={columns}
      query={mockQuery as any}
      totalItems={50}
      itemsPerPage={20}
      pagination={true}
    />
  );
};

/**
 * Default table with pagination showing 20 transactions per page
 */
export const Default = {
  render: () => <DefaultTemplate />,
};

const LoadingTemplate: FC = () => {
  const loadingQuery = {
    ...mockQuery,
    isLoading: true,
    data: undefined,
  };

  return (
    <GlobalTable
      type='default'
      items={undefined}
      columns={columns}
      query={loadingQuery as any}
      totalItems={50}
      itemsPerPage={20}
      pagination={true}
    />
  );
};

/**
 * Loading state with skeleton loaders
 */
export const Loading = {
  render: () => <LoadingTemplate />,
};

const EmptyTemplate: FC = () => {
  const emptyQuery = {
    ...mockQuery,
    data: [],
  };

  return (
    <GlobalTable
      type='default'
      items={[]}
      columns={columns}
      query={emptyQuery as any}
      totalItems={0}
      itemsPerPage={20}
      pagination={true}
    />
  );
};

/**
 * Empty state with no data
 */
export const Empty = {
  render: () => <EmptyTemplate />,
};

const CustomRowHeightTemplate: FC = () => {
  return (
    <GlobalTable
      type='default'
      items={mockTransactions.slice(0, 10)}
      columns={columns}
      query={mockQuery as any}
      totalItems={50}
      itemsPerPage={10}
      pagination={true}
      rowHeight={80}
    />
  );
};

/**
 * Custom row height (80px instead of default 60px)
 */
export const CustomRowHeight = {
  render: () => <CustomRowHeightTemplate />,
};

const ScrollableTemplate: FC = () => {
  const wideColumns: Column<Transaction>[] = [
    ...columns,
    {
      key: "extra1",
      title: "Extra Column 1",
      widthPx: 200,
      visible: true,
      render: () => <span>Extra data</span>,
    },
    {
      key: "extra2",
      title: "Extra Column 2",
      widthPx: 200,
      visible: true,
      render: () => <span>More data</span>,
    },
  ];

  return (
    <GlobalTable
      type='default'
      items={mockTransactions.slice(0, 10)}
      columns={wideColumns}
      query={mockQuery as any}
      totalItems={50}
      itemsPerPage={10}
      pagination={true}
      scrollable={true}
      minContentWidth={1400}
    />
  );
};

/**
 * Scrollable table with many columns
 */
export const Scrollable = {
  render: () => <ScrollableTemplate />,
};

const WithRankingTemplate: FC = () => {
  const rankedColumns: Column<Transaction>[] = [
    {
      key: "rank",
      title: "#",
      widthPx: 60,
      visible: true,
      standByRanking: true,
      rankingStart: "asc",
      render: () => null,
    },
    ...columns,
  ];

  return (
    <GlobalTable
      type='default'
      items={mockTransactions.slice(0, 20)}
      columns={rankedColumns}
      query={mockQuery as any}
      totalItems={50}
      itemsPerPage={20}
      pagination={true}
    />
  );
};

/**
 * Table with ranking/numbering column
 */
export const WithRanking = {
  render: () => <WithRankingTemplate />,
};

const FewItemsTemplate: FC = () => {
  return (
    <GlobalTable
      type='default'
      items={mockTransactions.slice(0, 3)}
      columns={columns}
      query={mockQuery as any}
      totalItems={3}
      itemsPerPage={20}
      pagination={false}
    />
  );
};

/**
 * Table with only a few items (no pagination needed)
 */
export const FewItems = {
  render: () => <FewItemsTemplate />,
};

const HiddenColumnsTemplate: FC = () => {
  const columnsWithHidden: Column<Transaction>[] = columns.map((col, i) => ({
    ...col,
    visible: i !== 2, // Hide "Age" column
  }));

  return (
    <GlobalTable
      type='default'
      items={mockTransactions.slice(0, 10)}
      columns={columnsWithHidden}
      query={mockQuery as any}
      totalItems={50}
      itemsPerPage={10}
      pagination={true}
    />
  );
};

/**
 * Table with some columns hidden
 */
export const HiddenColumns = {
  render: () => <HiddenColumnsTemplate />,
};
