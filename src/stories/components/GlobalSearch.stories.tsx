import { GlobalSearch } from "@/ui/globalSearch";
import { Meta, StoryObj } from "@storybook/react/*";
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

const mockUseFetchMiscSearch = () => ({
  data: mockSearchResults,
  isLoading: false,
  isFetching: false,
  error: null,
  refetch: () => Promise.resolve({ data: mockSearchResults }),
});

const meta: Meta<typeof GlobalSearch> = {
  title: "Forms/GlobalSearch",
  component: GlobalSearch,
  decorators: [
    Story => (
      <div className='flex h-[700px] w-full items-start justify-center overflow-hidden bg-background p-10'>
        <GlobalSearchProvider
          useFetchMiscSearch={mockUseFetchMiscSearch as any}
          locale='en'
        >
          <div className='w-full max-w-[800px]'>
            <Story />
          </div>
        </GlobalSearchProvider>
      </div>
    ),
  ],
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
  args: {
    isHomepage: false,
  },
};

const Homepage: Story = {
  args: {
    isHomepage: true,
  },
};

export { Default, Homepage };
