import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import { Search, Download, Settings, Plus, ChevronRight } from 'lucide-react';

const meta = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'purple', 'red', 'discord'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    label: 'Secondary Button',
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'md',
    label: 'Tertiary Button',
  },
};

export const Purple: Story = {
  args: {
    variant: 'purple',
    size: 'md',
    label: 'Purple Button',
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    size: 'md',
    label: 'Red Button',
  },
};

export const Discord: Story = {
  args: {
    variant: 'discord',
    size: 'md',
    label: 'Discord Button',
  },
};

export const WithLeftIcon: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Search',
    leftIcon: <Search size={16} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    label: 'Download',
    rightIcon: <Download size={16} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    variant: 'tertiary',
    size: 'md',
    label: 'Settings',
    leftIcon: <Settings size={16} />,
    rightIcon: <ChevronRight size={16} />,
  },
};

export const IconOnly: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    leftIcon: <Plus size={16} />,
  },
};

export const AllSizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="primary" size="xs" label="XS" />
      <Button variant="primary" size="sm" label="SM" />
      <Button variant="primary" size="md" label="MD" />
      <Button variant="primary" size="lg" label="LG" />
      <Button variant="primary" size="xl" label="XL" />
    </div>
  ),
};

export const AllVariants = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" size="md" label="Primary" />
      <Button variant="secondary" size="md" label="Secondary" />
      <Button variant="tertiary" size="md" label="Tertiary" />
      <Button variant="purple" size="md" label="Purple" />
      <Button variant="red" size="md" label="Red" />
      <Button variant="discord" size="md" label="Discord" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    label: 'Disabled Button',
    disabled: true,
  },
};