import { Image } from "@/ui/image";
import type { Meta, StoryObj } from "@storybook/react";
import CardanoLogo from "../assets/Cardano.svg";

const meta: Meta<typeof Image> = {
  title: "Media/Image",
  component: Image,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Enhanced image component with intelligent fallback handling, loading states, and letter-based avatar generation for blockchain entities.",
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
      table: {
        type: { summary: "string" },
      },
    },
    type: {
      control: "select",
      options: ["asset", "pool", "user"],
      description: "Entity type (determines fallback strategy)",
      table: {
        type: { summary: '"asset" | "pool" | "user"' },
      },
    },
    width: {
      control: "number",
      description: "Image width in pixels",
      table: {
        type: { summary: "number" },
      },
    },
    height: {
      control: "number",
      description: "Image height in pixels",
      table: {
        type: { summary: "number" },
      },
    },
    fullWidth: {
      control: "boolean",
      description: "If true, width is 100% (responsive)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fallbackletters: {
      control: "text",
      description: "Letters for avatar generation on failure",
      table: {
        type: { summary: "string" },
      },
    },
    alt: {
      control: "text",
      description: "Alt text for accessibility",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes (supports rounded-max detection)",
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

/**
 * Basic image with valid source
 */
export const Default: Story = {
  args: {
    src: CardanoLogo,
    width: 64,
    height: 64,
    alt: "Cardano Logo",
  },
};

/**
 * Pool logo with fallback (triggers fallback since URL doesn't exist)
 */
export const PoolWithFallback: Story = {
  args: {
    src: "https://invalid-url.com/pool-logo.png",
    type: "pool",
    fallbackletters: "POOL1",
    width: 64,
    height: 64,
    alt: "Pool Logo",
    className: "rounded-m",
  },
};

/**
 * User avatar with letter-based fallback (circular)
 */
export const UserAvatarRounded: Story = {
  args: {
    src: "https://invalid-url.com/avatar.jpg",
    type: "user",
    fallbackletters: "Alice_Bob",
    width: 64,
    height: 64,
    alt: "User Avatar",
    className: "rounded-max",
  },
};

/**
 * Asset image with letter fallback only
 */
export const AssetWithLetters: Story = {
  args: {
    src: "https://invalid-url.com/token.png",
    type: "asset",
    fallbackletters: "MYTOKEN",
    width: 48,
    height: 48,
    alt: "Token",
    className: "rounded-m",
  },
};

/**
 * Large avatar with big initials (>100px shows larger text)
 */
export const LargeAvatar: Story = {
  args: {
    src: "https://invalid-url.com/profile.jpg",
    type: "user",
    fallbackletters: "John_Doe",
    width: 120,
    height: 120,
    alt: "Profile Picture",
    className: "rounded-max",
  },
};

/**
 * Small avatar (typical size for lists/tables)
 */
export const SmallAvatar: Story = {
  args: {
    src: "https://invalid-url.com/small.jpg",
    type: "user",
    fallbackletters: "TS",
    width: 32,
    height: 32,
    alt: "Small Avatar",
    className: "rounded-max",
  },
};

/**
 * DRep avatar with underscore name convention
 */
export const DRepAvatar: Story = {
  args: {
    src: "https://invalid-url.com/drep.jpg",
    type: "user",
    fallbackletters: "Sarah_Smith",
    width: 56,
    height: 56,
    alt: "DRep Avatar",
    className: "rounded-max",
  },
};
