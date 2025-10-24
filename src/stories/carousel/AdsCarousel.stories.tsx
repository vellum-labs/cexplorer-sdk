import type { Meta, StoryObj } from "@storybook/react";
import { AdsCarousel } from "../../ui/carousel/AdsCarousel";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MiscBasicResponse } from "@/types/miscTypes";

// Mock generateImageUrl function
const mockGenerateImageUrl = (
  _ident: string,
  _size: "ico" | "sm" | "md" | "lg",
  type?: "nft" | "pool" | "drep" | "token" | "cc",
) => {
  return `https://via.placeholder.com/25/0099FF/FFFFFF?text=${type?.toUpperCase() || "IMG"}`;
};

// Mock ad data
const mockAds = [
  {
    type: "promo_panel" as const,
    data: {
      type: "pool" as const,
      title: "Stake Pool Alpha",
      text: "Join our reliable stake pool with 99.9% uptime and competitive fees.",
      link: "https://cexplorer.io/pool/pool1abc",
    },
  },
  {
    type: "promo_panel" as const,
    data: {
      type: "asset" as const,
      title: "HOSKY Token",
      text: "<strong>New DeFi token!</strong> Early bird rewards available.",
      link: "https://cexplorer.io/asset/asset1xyz",
    },
  },
  {
    type: "promo_panel" as const,
    data: {
      type: "pool" as const,
      title: "Community Pool Beta",
      text: "Supporting the Cardano ecosystem with transparent operations.",
      link: "https://cexplorer.io/pool/pool2def",
    },
  },
  {
    type: "promo_panel" as const,
    data: {
      type: "asset" as const,
      title: "SUNDAE",
      text: "Governance token for the SundaeSwap DEX. Vote and earn!",
      link: "https://cexplorer.io/asset/asset2abc",
    },
  },
];

// Create mock query result
const createMockQuery = (
  isLoading: boolean,
  data?: typeof mockAds,
): UseQueryResult<
  MiscBasicResponse & { prevOffset: number | undefined },
  Error
> => {
  return {
    data: data
      ? ({
          data: {
            ads: data,
          },
          prevOffset: undefined,
        } as any)
      : undefined,
    isLoading,
    isError: false,
    error: null,
  } as any;
};

const meta: Meta<typeof AdsCarousel> = {
  title: "Carousel/AdsCarousel",
  component: AdsCarousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A responsive carousel component for displaying promotional advertisements with autoplay, filtering, and loading states.",
      },
    },
  },
  argTypes: {
    singleItem: {
      control: "boolean",
      description: "Display only one item per slide",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    maxWidth: {
      control: "boolean",
      description: "Apply max-width-desktop constraint to carousel",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    filterByType: {
      control: "select",
      options: [undefined, "pool", "asset"],
      description: "Filter advertisements by type",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the carousel container",
      table: {
        type: { summary: "string" },
      },
    },
    adCardClassname: {
      control: "text",
      description: "Additional CSS classes for individual AdCard components",
      table: {
        type: { summary: "string" },
      },
    },
    miscBasicQuery: {
      control: false,
      description: "React Query result containing ad data",
      table: {
        type: { summary: "UseQueryResult" },
      },
    },
    generateImageUrl: {
      control: false,
      description: "Function to generate image URLs",
      table: {
        type: { summary: "Function" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex min-h-[400px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default carousel with multiple ads per slide (responsive grid)
 */
export const Default: Story = {
  args: {
    miscBasicQuery: createMockQuery(false, mockAds),
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Loading state showing skeleton loaders
 */
export const Loading: Story = {
  args: {
    miscBasicQuery: createMockQuery(true),
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Single item per slide mode
 */
export const SingleItemMode: Story = {
  args: {
    singleItem: true,
    miscBasicQuery: createMockQuery(false, mockAds),
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Filtered by pool type only
 */
export const PoolsOnly: Story = {
  args: {
    filterByType: "pool",
    miscBasicQuery: createMockQuery(false, mockAds),
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Filtered by asset type only
 */
export const AssetsOnly: Story = {
  args: {
    filterByType: "asset",
    miscBasicQuery: createMockQuery(false, mockAds),
    generateImageUrl: mockGenerateImageUrl,
  },
};
