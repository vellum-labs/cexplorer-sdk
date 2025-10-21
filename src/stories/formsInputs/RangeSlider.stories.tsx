import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useState } from "react";
import { RangeSlider } from "../../ui/rangeSlider";

const meta: Meta<typeof RangeSlider> = {
  title: "Forms & Inputs/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A customizable slider component for selecting numeric values within a range, with visual progress indicator.",
      },
    },
  },
  argTypes: {
    min: {
      control: "number",
      description: "Minimum value of the slider",
      table: {
        type: { summary: "number" },
      },
    },
    max: {
      control: "number",
      description: "Maximum value of the slider",
      table: {
        type: { summary: "number" },
      },
    },
    step: {
      control: "number",
      description: "Step increment for the slider values",
      table: {
        type: { summary: "number" },
      },
    },
    value: {
      control: "number",
      description: "Current value of the slider",
      table: {
        type: { summary: "number" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback function invoked when the slider value changes",
      table: {
        type: { summary: "(value: number) => void" },
      },
    },
    className: {
      control: "text",
      description: "Optional CSS class name for additional styling",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
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

interface SliderTemplateProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  className?: string;
}

const SliderTemplate: FC<SliderTemplateProps> = ({
  min,
  max,
  step,
  initialValue,
  className,
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <RangeSlider
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={setValue}
      className={className}
    />
  );
};

interface SliderWithLabelProps {
  min: number;
  max: number;
  step: number;
  initialValue: number;
  label: string;
  formatValue?: (value: number) => string;
  className?: string;
}

const SliderWithLabel: FC<SliderWithLabelProps> = ({
  min,
  max,
  step,
  initialValue,
  label,
  formatValue,
  className,
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div className='space-y-2'>
      <div className='text-sm font-medium text-foreground'>
        {label}: {formatValue ? formatValue(value) : value}
      </div>
      <RangeSlider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={setValue}
        className={className}
      />
    </div>
  );
};

/**
 * Default slider with basic range from 0 to 100
 */
export const Default: Story = {
  render: () => <SliderTemplate min={0} max={100} step={1} initialValue={50} />,
};

/**
 * Epoch selector slider for blockchain epoch ranges (200-500)
 */
export const EpochSelector: Story = {
  render: () => (
    <SliderWithLabel
      min={200}
      max={500}
      step={1}
      initialValue={350}
      label='Epoch'
    />
  ),
};

/**
 * ADA amount filter with larger steps (100 ADA increments)
 */
export const AdaAmountFilter: Story = {
  render: () => (
    <SliderWithLabel
      min={0}
      max={10000}
      step={100}
      initialValue={5000}
      label='Amount'
      formatValue={value => `${value.toLocaleString()} ADA`}
    />
  ),
};

/**
 * Block height selector with fine-grained control
 */
export const BlockHeightSelector: Story = {
  render: () => (
    <SliderWithLabel
      min={8000000}
      max={9000000}
      step={1000}
      initialValue={8500000}
      label='Block Height'
      formatValue={value => value.toLocaleString()}
    />
  ),
};

/**
 * Percentage selector (0-100%)
 */
export const PercentageSelector: Story = {
  render: () => (
    <SliderWithLabel
      min={0}
      max={100}
      step={5}
      initialValue={75}
      label='Saturation'
      formatValue={value => `${value}%`}
    />
  ),
};

/**
 * Small range with decimal steps
 */
export const DecimalSteps: Story = {
  render: () => (
    <SliderWithLabel
      min={0}
      max={5}
      step={0.1}
      initialValue={2.5}
      label='Value'
      formatValue={value => value.toFixed(1)}
    />
  ),
};

/**
 * Custom width slider
 */
export const CustomWidth: Story = {
  render: () => (
    <SliderTemplate
      min={0}
      max={100}
      step={1}
      initialValue={50}
      className='w-[200px]'
    />
  ),
};
