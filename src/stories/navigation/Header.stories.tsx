import { Copy } from "@/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "../../ui/header";
import CardanoIcon from "../assets/Cardano.svg";

const mockMiscBasic = {
  data: {
    data: {
      block: {
        hash: "0ta9cec52f3c396637",
        time: "2024-01-15T10:30:00Z",
        epoch_no: 450,
        block_no: 9123456,
        slot_no: 123456789,
        proto: 8,
      },
      ads: [
        {
          type: "heading_featured",
          data: {
            text: "The most decentralized Cardano NFT marketplace - <a href='https://jamonbread.com'>JamOnBread</a>",
            icon: "sparkles",
            section: "Featured",
            title: "",
            type: "heading_featured",
            link: "https://jamonbread.com",
            content: "",
          },
        },
        {
          type: "box",
          data: {
            icon: "wallet",
            section: "DeFi",
            title: "Minswap DEX",
            content: "Trade ADA and native tokens",
            link: "https://minswap.org",
            text: "",
            type: "box",
          },
        },
        {
          type: "box",
          data: {
            icon: "wallet",
            section: "DeFi",
            title: "SundaeSwap",
            content: "Decentralized exchange",
            link: "https://sundaeswap.finance",
            text: "",
            type: "box",
          },
        },
        {
          type: "box",
          data: {
            icon: "wallet",
            section: "DeFi",
            title: "WingRiders",
            content: "Fast and secure DEX",
            link: "https://wingriders.com",
            text: "",
            type: "box",
          },
        },
      ],
      version: { const: 1, rate: 1000000 },
      instance: {
        readonly: false,
        server: "prod",
        snapshot: "latest",
        time: "2024-01-15T10:30:00Z",
      },
      rate: { usd: 0.45, eur: 0.42, czk: 10.5 },
      rate_day: { usd: 0.44, eur: 0.41, czk: 10.3 },
      loads: { "1h": 1000, "24h": 50000, "7d": 300000 },
    },
    code: 200,
    tokens: 100,
    ex: 50,
    debug: false,
  },
  isLoading: false,
  isError: false,
  error: null,
} as any;

const mockUseFetchMiscSearch = () =>
  ({
    data: { data: [], code: 200 },
    isLoading: false,
  }) as any;

const meta: Meta<typeof Header> = {
  title: "Navigation/Header",
  component: Header,
  parameters: {
    layout: "fullwidth",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Main page title",
    },
    isHomepage: {
      control: "boolean",
      description: "Homepage variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DetailPage: Story = {
  args: {
    breadcrumbItems: [
      { label: "Blocks" },
      { label: "01a9cec52f....3c396637", link: "/" },
    ],
    title: (
      <span className='mt-1/2 flex w-full items-center gap-1'>
        <img src={CardanoIcon} className='h-[35px] w-[35px]' />
        <span>Title</span>
      </span>
    ),
    subTitle: (
      <div className='flex flex-col gap-0.5'>
        <div className='flex items-center gap-1.5'>
          <span className='text-text-md text-text'>
            Ident 1: addr174vzdp...eq9qn8q5vtgdea9cec52f
          </span>
          <Copy copyText='text' className='translate-y-[2px]' />
        </div>
        <div className='flex items-center gap-1.5'>
          <span className='text-text-md text-text'>
            Ident 1: addr174vzdp...eq9qn8q5vtgdea9cec52f
          </span>
          <Copy copyText='text' className='translate-y-[2px]' />
        </div>
      </div>
    ),
    miscBasic: mockMiscBasic,
    useFetchMiscSearch: mockUseFetchMiscSearch,
    locale: "en",
    homepageAd: true,
  },
};

export const ListPage: Story = {
  args: {
    breadcrumbItems: [{ label: "Blocks" }],
    title: "Blocks",
    miscBasic: mockMiscBasic,
    useFetchMiscSearch: mockUseFetchMiscSearch,
    locale: "en",
  },
};

export const WithoutBreadcrumb: Story = {
  args: {
    title: "Blocks",
    miscBasic: mockMiscBasic,
    useFetchMiscSearch: mockUseFetchMiscSearch,
    locale: "en",
  },
};

export const Homepage: Story = {
  args: {
    title: "Explore Cardano blockchain",
    isHomepage: true,
    miscBasic: mockMiscBasic,
    useFetchMiscSearch: mockUseFetchMiscSearch,
    locale: "en",
  },
};
