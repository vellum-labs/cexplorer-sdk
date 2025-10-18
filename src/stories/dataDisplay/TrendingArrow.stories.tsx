import { TrendingArrow } from "@/ui/trendingArrow";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Data Display/TrendingArrow",
  component: TrendingArrow,
  parameters: {
    docs: {
      description: {
        component:
          "TrendingArrow displays a visual indicator for percentage changes with color-coded up/down arrows.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    Story => (
      <div className='flex min-h-[150px] w-full items-center justify-center bg-background p-4'>
        <div className='rounded-m border border-border bg-cardBg p-4'>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    percentage: {
      control: { type: "number", min: -100, max: 100, step: 0.1 },
      description: "Percentage change value",
    },
    size: {
      control: { type: "number", min: 12, max: 48, step: 2 },
      description: "Icon size in pixels",
    },
  },
} satisfies Meta<typeof TrendingArrow>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Example with price display context.
 */
export const WithPriceContext: Story = {
  render: () => (
    <div className='space-y-4'>
      <div className='flex items-center gap-2'>
        <span className='text-text-lg font-semibold text-text'>₳0.45</span>
        <div className='flex items-center gap-1'>
          <span className='text-text-sm text-greenText'>+5.2%</span>
          <TrendingArrow percentage={5.2} size={18} />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-text-lg font-semibold text-text'>₳0.42</span>
        <div className='flex items-center gap-1'>
          <span className='text-text-sm text-redText'>-3.8%</span>
          <TrendingArrow percentage={-3.8} size={18} />
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <span className='text-text-lg font-semibold text-text'>₳0.44</span>
        <div className='flex items-center gap-1'>
          <span className='text-grayText text-text-sm'>0.0%</span>
          <TrendingArrow percentage={0} size={18} />
        </div>
      </div>
    </div>
  ),
  args: {
    percentage: 5.2,
  },
};
