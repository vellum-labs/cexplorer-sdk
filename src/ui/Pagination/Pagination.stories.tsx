import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './index';
import { useState } from 'react';

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 100 },
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onNavigate: (page: number) => console.log('Navigate to page:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onNavigate: (page: number) => console.log('Navigate to page:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onNavigate: (page: number) => console.log('Navigate to page:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 25,
    totalPages: 100,
    onNavigate: (page: number) => console.log('Navigate to page:', page),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    onNavigate: (page: number) => console.log('Navigate to page:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onNavigate: (page: number) => console.log('Navigate to page:', page),
  },
};

export const Controlled = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 20;

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  },
};

export const WithCallback = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 15;

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
      console.log('Page changed to:', page);
    };

    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Current page: {currentPage} / {totalPages}
          </p>
          <p className="text-xs text-gray-500">
            Check console for navigation callbacks
          </p>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNavigate={handlePageChange}
        />
      </div>
    );
  },
};