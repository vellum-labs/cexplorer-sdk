import { GlobalSearch } from "@/ui/globalSearch";
import type { Meta, StoryObj } from "@storybook/react/*";
import { GlobalSearchProvider } from "@/providers/GlobalSearchContext";

const mockSearchResults = {
  data: [
    {
      title: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
      ident: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
      category: "tx",
      url: "/tx/5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb",
      extra: {
        type: "time",
        value: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      },
    },
    {
      title: "2290ac20e4bf1cbd085d08d4b5c54735ee60f6f441269f5335a1c7974ab9c5c3",
      ident: "2290ac20e4bf1cbd085d08d4b5c54735ee60f6f441269f5335a1c7974ab9c5c3",
      category: "block",
      url: "/block/2290ac20e4bf1cbd085d08d4b5c54735ee60f6f441269f5335a1c7974ab9c5c3",
      extra: {
        type: "time",
        value: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
    },
    {
      title: "WAVE Pool",
      ident: "pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      category: "pool",
      url: "/pool/pool1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      extra: {
        type: "stake",
        value: 45000000000,
      },
    },
    {
      title: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
      ident: "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
      category: "address",
      url: "/address/addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
      extra: {
        type: "balance",
        value: 1000000000,
      },
    },
  ],
};

const mockUseFetchMiscSearch =
  (isLoading = false, isEmpty = false) =>
  () => ({
    data: isEmpty ? { data: [] } : mockSearchResults,
    isLoading: isLoading,
    isFetching: isLoading,
    error: null,
    refetch: () => Promise.resolve({ data: mockSearchResults }),
  });

const meta: Meta<typeof GlobalSearch> = {
  title: "Forms/GlobalSearch",
  component: GlobalSearch,
  tags: ["autodocs"],
  argTypes: {
    isHomepage: {
      description: "Homepage variant with different styling",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Global search component with category filtering, recent searches, and real-time results for blockchain entities.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  decorators: [
    Story => (
      <div className='flex h-[700px] w-full items-start justify-center overflow-hidden bg-background p-10'>
        <GlobalSearchProvider
          useFetchMiscSearch={mockUseFetchMiscSearch(false, false) as any}
          locale='en'
        >
          <div className='w-full max-w-[800px]'>
            <Story />
          </div>
        </GlobalSearchProvider>
      </div>
    ),
  ],
  args: {
    isHomepage: false,
  },
};

const Homepage: Story = {
  decorators: [
    Story => (
      <div className='flex h-[700px] w-full items-start justify-center overflow-hidden bg-background p-10'>
        <GlobalSearchProvider
          useFetchMiscSearch={mockUseFetchMiscSearch(false, false) as any}
          locale='en'
        >
          <div className='w-full max-w-[800px]'>
            <Story />
          </div>
        </GlobalSearchProvider>
      </div>
    ),
  ],
  args: {
    isHomepage: true,
  },
};

const NoResults: Story = {
  decorators: [
    Story => (
      <div className='flex h-[700px] w-full items-start justify-center overflow-hidden bg-background p-10'>
        <GlobalSearchProvider
          useFetchMiscSearch={mockUseFetchMiscSearch(false, true) as any}
          locale='en'
        >
          <div className='w-full max-w-[800px]'>
            <Story />
          </div>
        </GlobalSearchProvider>
      </div>
    ),
  ],
  args: {
    isHomepage: false,
  },
};

const WithManyResults: Story = {
  decorators: [
    Story => {
      const manyResults = {
        data: [
          ...mockSearchResults.data,
          {
            title: "OCEAN Pool",
            ident: "pool1xyz456abc789def012ghi345jkl678mno901pqr234stu567vwx",
            category: "pool",
            url: "/pool/pool1xyz456abc789def012ghi345jkl678mno901pqr234stu567vwx",
            extra: { type: "stake", value: 75000000000 },
          },
          {
            title: "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc535",
            ident: "f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc535",
            category: "policy",
            url: "/policy/f43a62fdc3965df486de8a0d32fe800963589c41b38946602a0dc535",
            extra: { type: "tokens", value: 1250 },
          },
          {
            title:
              "stake1u8a9qstrmj4rvc3k62k77w7rqmwx0rqrqzxz6pdx5q4zqzqqqqqqq",
            ident:
              "stake1u8a9qstrmj4rvc3k62k77w7rqmwx0rqrqzxz6pdx5q4zqzqqqqqqq",
            category: "stake",
            url: "/stake/stake1u8a9qstrmj4rvc3k62k77w7rqmwx0rqrqzxz6pdx5q4zqzqqqqqqq",
            extra: { type: "balance", value: 500000000 },
          },
          {
            title: "HOSKY",
            ident: "asset1abc123def456ghi789jkl012mno345pqr678stu901vwx234",
            category: "asset",
            url: "/asset/asset1abc123def456ghi789jkl012mno345pqr678stu901vwx234",
            extra: { type: "supply", value: 1000000000000 },
          },
        ],
      };
      const mockFetch = () => ({
        data: manyResults,
        isLoading: false,
        isFetching: false,
        error: null,
        refetch: () => Promise.resolve({ data: manyResults }),
      });
      return (
        <div className='flex h-[700px] w-full items-start justify-center overflow-hidden bg-background p-10'>
          <GlobalSearchProvider
            useFetchMiscSearch={mockFetch as any}
            locale='en'
          >
            <div className='w-full max-w-[800px]'>
              <Story />
            </div>
          </GlobalSearchProvider>
        </div>
      );
    },
  ],
  args: {
    isHomepage: false,
  },
};

export { Default, Homepage, NoResults, WithManyResults };
