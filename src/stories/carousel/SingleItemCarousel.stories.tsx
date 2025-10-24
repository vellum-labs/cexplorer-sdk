import type { Meta, StoryObj } from "@storybook/react";
import { SingleItemCarousel } from "../../ui/carousel/SingleItemCarousel";

// Mock card component for demonstration
const MockCard = ({ item }: { item: any }) => (
  <div className='flex h-[110px] w-full flex-col gap-2 rounded-md border border-border bg-cardBg p-4 shadow-md'>
    <h3 className='text-lg font-bold text-text'>{item.title}</h3>
    <p className='text-sm text-grayTextPrimary'>{item.description}</p>
  </div>
);

const meta: Meta<typeof SingleItemCarousel> = {
  title: "Carousel/SingleItemCarousel",
  component: SingleItemCarousel,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A carousel component that displays one item at a time with autoplay enabled. Perfect for featured content rotation.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Array of items to display in the carousel",
      table: {
        type: { summary: "unknown[]" },
      },
    },
    card: {
      control: false,
      description: "React component to render each carousel item",
      table: {
        type: { summary: "React.ComponentType<{ item: unknown }>" },
      },
    },
    isLoading: {
      control: "boolean",
      description: "Loading state - shows skeleton loaders when true",
      table: {
        type: { summary: "boolean" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes for the carousel container",
      table: {
        type: { summary: "string" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  {
    title: "Featured Pool #1",
    description: "High-performance stake pool with 99.9% uptime",
  },
  {
    title: "Featured Pool #2",
    description: "Community-driven pool supporting ecosystem growth",
  },
  {
    title: "Featured Pool #3",
    description: "Low fees and reliable rewards for all delegators",
  },
];

/**
 * Default carousel with three items rotating automatically
 */
export const Default: Story = {
  args: {
    items: mockItems,
    card: MockCard,
    isLoading: false,
  },
};

/**
 * Loading state showing skeleton loaders
 */
export const Loading: Story = {
  args: {
    items: [],
    card: MockCard,
    isLoading: true,
  },
};

/**
 * Single item carousel (no rotation effect visible)
 */
export const SingleItem: Story = {
  args: {
    items: [mockItems[0]],
    card: MockCard,
    isLoading: false,
  },
};

/**
 * Carousel with promotional content
 */
export const PromotionalContent: Story = {
  args: {
    items: [
      {
        title: "New Token Launch!",
        description: "Join the future of decentralized finance on Cardano",
      },
      {
        title: "Stake & Earn Rewards",
        description: "Delegate your ADA and start earning passive income",
      },
      {
        title: "Community Governance",
        description: "Vote on proposals and shape the ecosystem",
      },
    ],
    card: MockCard,
    isLoading: false,
  },
};
