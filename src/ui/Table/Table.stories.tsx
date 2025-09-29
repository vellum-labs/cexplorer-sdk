import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./index";
import type { Column } from "./index";
import { useState, useRef } from "react";
import { ExternalLink, Copy, Star, TrendingUp } from "lucide-react";
import { FunnelFilter } from "../FunnelFilter";

interface MockTransaction {
  id: string;
  hash: string;
  from: string;
  to: string;
  amount: number;
  timestamp: Date;
  status: "confirmed" | "pending" | "failed";
  blockNumber: number;
}

const generateMockData = (count: number): MockTransaction[] => {
  const statuses: Array<"confirmed" | "pending" | "failed"> = [
    "confirmed",
    "pending",
    "failed",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `tx_${i + 1}`,
    hash: `0x${Math.random().toString(16).substr(2, 40)}`,
    from: `0x${Math.random().toString(16).substr(2, 40)}`,
    to: `0x${Math.random().toString(16).substr(2, 40)}`,
    amount: Math.random() * 1000,
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 30),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
  }));
};

const meta = {
  title: "Data Display/Table",
  component: Table,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTable: Story = {
  args: {
    type: "default",
    items: generateMockData(10),
    totalItems: 10,
    isLoading: false,
    columns: [
      {
        key: "hash",
        title: "Transaction Hash",
        visible: true,
        widthPx: 200,
        render: item => (
          <div className='flex items-center gap-2'>
            <code className='font-mono text-sm'>
              {item.hash.slice(0, 10)}...{item.hash.slice(-8)}
            </code>
            <ExternalLink
              size={14}
              className='cursor-pointer text-gray-400 hover:text-blue-500'
            />
          </div>
        ),
      },
      {
        key: "amount",
        title: "Amount (ETH)",
        visible: true,
        widthPx: 150,
        render: item => (
          <span className='font-semibold'>{item.amount.toFixed(4)}</span>
        ),
      },
      {
        key: "status",
        title: "Status",
        visible: true,
        widthPx: 120,
        render: item => {
          const statusStyles = {
            confirmed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800",
          };

          return (
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[item.status]}`}
            >
              {item.status}
            </span>
          );
        },
      },
      {
        key: "timestamp",
        title: "Time",
        visible: true,
        widthPx: 180,
        render: item => (
          <span className='text-sm text-gray-600'>
            {item.timestamp.toLocaleString()}
          </span>
        ),
      },
    ],
  },
};

export const WithPagination = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalItems = 50;
    const allData = generateMockData(totalItems);

    const paginatedData = allData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );

    const columns: Column<MockTransaction>[] = [
      {
        key: "id",
        title: "#",
        visible: true,
        widthPx: 80,
        render: (item: MockTransaction) => (
          <span className='font-mono'>{item.id}</span>
        ),
      },
      {
        key: "hash",
        title: "Hash",
        visible: true,
        widthPx: 180,
        render: (item: MockTransaction) => (
          <code className='text-sm'>{item.hash.slice(0, 16)}...</code>
        ),
      },
      {
        key: "amount",
        title: "Amount",
        visible: true,
        widthPx: 120,
        render: (item: MockTransaction) => `${item.amount.toFixed(2)} ETH`,
      },
      {
        key: "block",
        title: "Block",
        visible: true,
        widthPx: 100,
        render: (item: MockTransaction) => item.blockNumber.toLocaleString(),
      },
    ];

    return (
      <div className='flex flex-col items-center justify-center p-6'>
        <Table
          type='default'
          items={paginatedData}
          columns={columns}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          pagination={true}
        />
      </div>
    );
  },
};

export const WithFilters = {
  render: () => {
    const [items] = useState(generateMockData(15));
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const columns: Column<MockTransaction>[] = [
      {
        key: "hash",
        title: "Transaction",
        visible: true,
        widthPx: 200,
        render: (item: MockTransaction) => (
          <div className='flex items-center gap-2'>
            <code className='text-xs'>{item.hash.slice(0, 12)}...</code>
            <Copy
              size={12}
              className='cursor-pointer text-gray-400 hover:text-blue-500'
            />
          </div>
        ),
      },
      {
        key: "status",
        title: "Status",
        visible: true,
        widthPx: 120,
        filter: {
          filterOpen,
          activeFunnel: false,
          filterButtonDisabled: false,
          anchorRef: filterRef,
          width: "200px",
          onShow: () => setFilterOpen(!filterOpen),
          onReset: () => {
            setFilterOpen(false);
            console.log("Status filter reset");
          },
          onFilter: () => {
            setFilterOpen(false);
            console.log("Status filter applied");
          },
          filterContent: (
            <div className='space-y-2 p-3'>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Confirmed</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Pending</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Failed</span>
              </label>
            </div>
          ),
        },
        render: (item: MockTransaction) => {
          const statusStyles = {
            confirmed: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            failed: "bg-red-100 text-red-800",
          };

          return (
            <div ref={filterRef}>
              <span
                className={`rounded-full px-2 py-1 text-xs ${statusStyles[item.status]}`}
              >
                {item.status}
              </span>
            </div>
          );
        },
      },
      {
        key: "amount",
        title: "Amount",
        visible: true,
        widthPx: 150,
        render: (item: MockTransaction) => (
          <div className='flex items-center gap-1'>
            <TrendingUp size={14} className='text-green-500' />
            <span>{item.amount.toFixed(4)} ETH</span>
          </div>
        ),
      },
      {
        key: "timestamp",
        title: "Time",
        visible: true,
        widthPx: 160,
        render: (item: MockTransaction) => (
          <span className='text-sm'>{item.timestamp.toLocaleTimeString()}</span>
        ),
      },
    ];

    return (
      <div className='flex flex-col items-center justify-center p-6'>
        <Table
          type='default'
          items={items}
          columns={columns}
          totalItems={items.length}
          isLoading={false}
        />

        {filterOpen && (
          <FunnelFilter
            anchorRef={filterRef}
            onReset={() => {
              setFilterOpen(false);
              console.log("Filter reset");
            }}
            onFilter={() => {
              setFilterOpen(false);
              console.log("Filter applied");
            }}
            width='200px'
          >
            <div className='space-y-2 p-3'>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Confirmed</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Pending</span>
              </label>
              <label className='flex items-center'>
                <input type='checkbox' className='mr-2' />
                <span className='text-sm'>Failed</span>
              </label>
            </div>
          </FunnelFilter>
        )}
      </div>
    );
  },
};

export const LoadingState: Story = {
  args: {
    type: "default",
    items: [],
    totalItems: 0,
    isLoading: true,
    itemsPerPage: 10,
    columns: [
      {
        key: "hash",
        title: "Transaction Hash",
        visible: true,
        widthPx: 200,
        render: () => null,
      },
      {
        key: "amount",
        title: "Amount",
        visible: true,
        widthPx: 150,
        render: () => null,
      },
      {
        key: "status",
        title: "Status",
        visible: true,
        widthPx: 120,
        render: () => null,
      },
    ],
  },
};

export const EmptyState: Story = {
  args: {
    type: "default",
    items: [],
    totalItems: 0,
    isLoading: false,
    columns: [
      {
        key: "hash",
        title: "Transaction Hash",
        visible: true,
        widthPx: 200,
        render: () => null,
      },
      {
        key: "amount",
        title: "Amount",
        visible: true,
        widthPx: 150,
        render: () => null,
      },
    ],
  },
};

export const InfiniteScrolling = {
  render: () => {
    const [items, setItems] = useState(generateMockData(20));
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchingNext, setIsFetchingNext] = useState(false);

    const handleFetchNext = () => {
      setIsFetchingNext(true);

      setTimeout(() => {
        const newItems = generateMockData(10);
        setItems(prev => [...prev, ...newItems]);
        setIsFetchingNext(false);
      }, 1000);
    };

    const columns: Column<MockTransaction>[] = [
      {
        key: "ranking",
        title: "#",
        visible: true,
        widthPx: 60,
        standByRanking: true,
        rankingStart: "desc",
        render: () => null,
      },
      {
        key: "hash",
        title: "Hash",
        visible: true,
        widthPx: 180,
        render: (item: MockTransaction) => (
          <code className='text-xs'>{item.hash.slice(0, 16)}...</code>
        ),
      },
      {
        key: "amount",
        title: "Amount",
        visible: true,
        widthPx: 120,
        render: (item: MockTransaction) => (
          <div className='flex items-center gap-1'>
            <Star size={12} className='text-yellow-500' />
            <span>{item.amount.toFixed(2)}</span>
          </div>
        ),
      },
      {
        key: "status",
        title: "Status",
        visible: true,
        widthPx: 100,
        render: (item: MockTransaction) => (
          <span
            className={`rounded px-2 py-1 text-xs ${
              item.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : item.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }`}
          >
            {item.status}
          </span>
        ),
      },
    ];

    return (
      <div className='flex max-h-screen flex-col items-center justify-center p-6'>
        <Table
          type='infinite'
          items={items}
          columns={columns}
          totalItems={100}
          currentPage={1}
          infiniteScrolling={true}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNext}
          onFetchNextPage={handleFetchNext}
          scrollable={true}
        />
      </div>
    );
  },
};
