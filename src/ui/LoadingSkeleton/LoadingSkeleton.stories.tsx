import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSkeleton } from './index';

const meta = {
  title: 'Feedback/LoadingSkeleton',
  component: LoadingSkeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: { type: 'text' },
    },
    width: {
      control: { type: 'text' },
    },
    maxHeight: {
      control: { type: 'text' },
    },
    maxWidth: {
      control: { type: 'text' },
    },
    rounded: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof LoadingSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    height: '20px',
    width: '200px',
  },
};

export const Rectangle: Story = {
  args: {
    height: '100px',
    width: '200px',
    rounded: 'md',
  },
};

export const Square: Story = {
  args: {
    height: '80px',
    width: '80px',
    rounded: 'lg',
  },
};

export const Circle: Story = {
  args: {
    height: '60px',
    width: '60px',
    rounded: 'full',
  },
};

export const TextLine: Story = {
  args: {
    height: '16px',
    width: '300px',
    rounded: 'sm',
  },
};

export const Button: Story = {
  args: {
    height: '40px',
    width: '120px',
    rounded: 'md',
  },
};

export const Card: Story = {
  args: {
    height: '200px',
    width: '300px',
    rounded: 'lg',
  },
};

export const AllRounded = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <LoadingSkeleton height="50px" width="100px" rounded="sm" />
        <LoadingSkeleton height="50px" width="100px" rounded="md" />
        <LoadingSkeleton height="50px" width="100px" rounded="lg" />
        <LoadingSkeleton height="50px" width="100px" rounded="xl" />
        <LoadingSkeleton height="50px" width="50px" rounded="full" />
      </div>
      <div className="text-center text-sm text-gray-600">
        SM - MD - LG - XL - Full
      </div>
    </div>
  ),
};

export const ContentPlaceholder = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton height="50px" width="50px" rounded="full" />
        <div className="space-y-2 flex-1">
          <LoadingSkeleton height="16px" width="60%" />
          <LoadingSkeleton height="12px" width="40%" />
        </div>
      </div>
      <div className="space-y-2">
        <LoadingSkeleton height="12px" width="100%" />
        <LoadingSkeleton height="12px" width="90%" />
        <LoadingSkeleton height="12px" width="75%" />
      </div>
      <LoadingSkeleton height="200px" width="100%" rounded="lg" />
    </div>
  ),
};

export const TableRows = {
  render: () => (
    <div className="w-full max-w-2xl space-y-2">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex items-center space-x-4 p-3 border rounded">
          <LoadingSkeleton height="16px" width="120px" />
          <LoadingSkeleton height="16px" width="200px" />
          <LoadingSkeleton height="16px" width="80px" />
          <LoadingSkeleton height="16px" width="60px" />
        </div>
      ))}
    </div>
  ),
};