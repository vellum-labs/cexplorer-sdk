import type { Meta, StoryObj } from "@storybook/react";
import { SpinningLoader } from "../../ui/spinningLoader";

const meta: Meta<typeof SpinningLoader> = {
  title: "Feedback/SpinningLoader",
  component: SpinningLoader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays an animated circular loading spinner with accessible ARIA role and reduced motion support.",
      },
    },
  },
  argTypes: {
    size: {
      control: { type: "number", min: 2, max: 20, step: 1 },
      description: "Size of the spinner in Tailwind size units",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "8" },
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
 * Default spinner with medium size
 */
export const Default: Story = {
  args: {},
};

/**
 * Extra small spinner (size 4)
 */
export const ExtraSmall: Story = {
  args: {
    size: 4,
  },
};

/**
 * Small spinner (size 6)
 */
export const Small: Story = {
  args: {
    size: 6,
  },
};

/**
 * Large spinner (size 12)
 */
export const Large: Story = {
  args: {
    size: 12,
  },
};

/**
 * Extra large spinner (size 16)
 */
export const ExtraLarge: Story = {
  args: {
    size: 16,
  },
};

/**
 * Custom colored spinner using text color inheritance
 */
export const CustomColor: Story = {
  args: {
    size: 10,
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background p-10 text-blue-500'>
        <Story />
      </div>
    ),
  ],
};

/**
 * Spinner in loading state context
 */
export const InLoadingContext: Story = {
  render: () => (
    <div className='flex flex-col items-center gap-4'>
      <SpinningLoader size={8} />
      <p className='text-sm text-grayTextSecondary'>Loading data...</p>
    </div>
  ),
};
