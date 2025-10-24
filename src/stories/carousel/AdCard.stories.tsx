import type { Meta, StoryObj } from "@storybook/react";
import { AdCard } from "../../ui/carousel/AdCard";

// Mock generateImageUrl function
const mockGenerateImageUrl = (
  _ident: string,
  _size: "ico" | "sm" | "md" | "lg",
  type?: "nft" | "pool" | "drep" | "token" | "cc",
) => {
  return `https://via.placeholder.com/25/0099FF/FFFFFF?text=${type?.toUpperCase() || "IMG"}`;
};

const meta: Meta<typeof AdCard> = {
  title: "Carousel/AdCard",
  component: AdCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays promotional content for Cardano pools or assets with dynamic images and HTML content support.",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      description: "Advertisement data containing type, title, text, and link",
      table: {
        type: { summary: "AdCardData" },
      },
    },
    generateImageUrl: {
      control: false,
      description: "Function to generate image URLs for pools and assets",
      table: {
        type: { summary: "Function" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for styling the card",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <div className='w-full max-w-md'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pool advertisement card
 */
export const PoolAd: Story = {
  args: {
    data: {
      type: "pool",
      title: "High Performance Stake Pool",
      text: "Join our pool for reliable rewards with 99.9% uptime and low fees.",
      link: "https://cexplorer.io/pool/pool1z22x50lqsrwent6en0llzzs9e577rx7n3mv9kfw7udwa2rf42fa",
    },
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Asset/token advertisement card
 */
export const AssetAd: Story = {
  args: {
    data: {
      type: "asset",
      title: "HOSKY",
      text: "<strong>New governance token!</strong> Participate in DAO voting and earn rewards.",
      link: "https://cexplorer.io/asset/1d7f33bd23d85e1a25d87d86fac4f199c3197a2f7afeb662a0f34e1e776f726c646d6f62696c65746f6b656e",
    },
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Pool ad with long description
 */
export const LongDescription: Story = {
  args: {
    data: {
      type: "pool",
      title: "Community Driven Stake Pool for Everyone",
      text: "We are a community-focused stake pool dedicated to supporting the Cardano ecosystem with reliable performance, transparent operations, and active community engagement. Delegate today!",
      link: "https://cexplorer.io/pool/pool1abc",
    },
    generateImageUrl: mockGenerateImageUrl,
  },
};

/**
 * Asset ad with HTML formatting
 */
export const WithHTMLContent: Story = {
  args: {
    data: {
      type: "asset",
      title: "SUNDAE",
      text: "<em>Limited time offer!</em> <strong>Early adopters</strong> get bonus rewards. Join now!",
      link: "https://cexplorer.io/asset/abc123",
    },
    generateImageUrl: mockGenerateImageUrl,
  },
};
