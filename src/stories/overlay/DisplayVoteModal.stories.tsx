import type { MiscSearchResponse } from "@/types/miscTypes";
import type { Meta, StoryObj } from "@storybook/react";
import type { UseQueryResult } from "@tanstack/react-query";
import { useState, type FC } from "react";
import { DisplayVoteModal } from "../../ui/displayVoteModal";

// Mock governance action data
const mockGovernanceAction = {
  title: "Treasury Withdrawal for Cardano Development",
  ident:
    "gov_action#5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb#0",
  url: "/gov/action/5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb#0",
  extra: {
    type: "TreasuryWithdrawals",
    id: "5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb#0",
  },
};

const mockParameterChangeAction = {
  title: "Protocol Parameter Update - Block Size Increase",
  ident:
    "gov_action#abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678901abc234#1",
  url: "/gov/action/abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678901abc234#1",
  extra: {
    type: "ParameterChange",
    id: "abc123def456ghi789jkl012mno345pqr678stu901vwx234yz5678901abc234#1",
  },
};

const mockHardForkAction = {
  title: "Hard Fork Initiation - Protocol Version 10",
  ident:
    "gov_action#xyz789abc456def123ghi890jkl567mno234pqr901stu678vwx345abc678def901#2",
  url: "/gov/action/xyz789abc456def123ghi890jkl567mno234pqr901stu678vwx345abc678def901#2",
  extra: {
    type: "HardForkInitiation",
    id: "xyz789abc456def123ghi890jkl567mno234pqr901stu678vwx345abc678def901#2",
  },
};

// Mock useFetchMiscSearch hook that returns data immediately
const mockUseFetchMiscSearchWithData = () => {
  return {
    data: {
      data: [mockGovernanceAction],
      prevOffset: undefined,
    },
    isLoading: false,
    isFetching: false,
  } as unknown as UseQueryResult<
    MiscSearchResponse & { prevOffset: number | undefined },
    Error
  >;
};

// Mock hook that returns loading state
const mockUseFetchMiscSearchLoading = () => {
  return {
    data: undefined,
    isLoading: true,
    isFetching: true,
  } as unknown as UseQueryResult<
    MiscSearchResponse & { prevOffset: number | undefined },
    Error
  >;
};

// Mock hook that returns no results
const mockUseFetchMiscSearchEmpty = () => {
  return {
    data: {
      data: [],
      prevOffset: undefined,
    },
    isLoading: false,
    isFetching: false,
  } as unknown as UseQueryResult<
    MiscSearchResponse & { prevOffset: number | undefined },
    Error
  >;
};

// Mock hook for parameter change action
const mockUseFetchMiscSearchParameterChange = () => {
  return {
    data: {
      data: [mockParameterChangeAction],
      prevOffset: undefined,
    },
    isLoading: false,
    isFetching: false,
  } as unknown as UseQueryResult<
    MiscSearchResponse & { prevOffset: number | undefined },
    Error
  >;
};

// Mock hook for hard fork action
const mockUseFetchMiscSearchHardFork = () => {
  return {
    data: {
      data: [mockHardForkAction],
      prevOffset: undefined,
    },
    isLoading: false,
    isFetching: false,
  } as unknown as UseQueryResult<
    MiscSearchResponse & { prevOffset: number | undefined },
    Error
  >;
};

const meta: Meta<typeof DisplayVoteModal> = {
  title: "Overlay/DisplayVoteModal",
  component: DisplayVoteModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A modal dialog for searching and selecting Cardano governance actions by ID, with detailed information display and loading states.",
      },
    },
  },
  argTypes: {
    onClose: {
      control: false,
      description: "Callback when modal is closed",
      table: {
        type: { summary: "() => void" },
      },
    },
    onDisplay: {
      control: false,
      description: "Callback when governance action is selected",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    useFetchMiscSearch: {
      control: false,
      description: "Hook to fetch governance action search results",
      table: {
        type: { summary: "Function" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-background'>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker'
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-background'>
      <DisplayVoteModal
        onClose={() => setIsOpen(false)}
        onDisplay={id => {
          console.log("Selected governance action:", id);
          setIsOpen(false);
        }}
        useFetchMiscSearch={mockUseFetchMiscSearchWithData}
      />
    </div>
  );
};

const LoadingStateTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-background'>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker'
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-background'>
      <DisplayVoteModal
        onClose={() => setIsOpen(false)}
        onDisplay={id => console.log("Selected:", id)}
        useFetchMiscSearch={mockUseFetchMiscSearchLoading}
      />
    </div>
  );
};

const NoResultsTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-background'>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker'
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-background'>
      <DisplayVoteModal
        onClose={() => setIsOpen(false)}
        onDisplay={id => console.log("Selected:", id)}
        useFetchMiscSearch={mockUseFetchMiscSearchEmpty}
      />
    </div>
  );
};

const ParameterChangeTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-background'>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker'
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-background'>
      <DisplayVoteModal
        onClose={() => setIsOpen(false)}
        onDisplay={id => {
          console.log("Parameter change action:", id);
          setIsOpen(false);
        }}
        useFetchMiscSearch={mockUseFetchMiscSearchParameterChange}
      />
    </div>
  );
};

const HardForkTemplate: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-background'>
        <button
          onClick={() => setIsOpen(true)}
          className='rounded-m border border-border bg-cardBg px-4 py-2 text-text hover:bg-darker'
        >
          Open Modal
        </button>
      </div>
    );
  }

  return (
    <div className='h-screen w-full bg-background'>
      <DisplayVoteModal
        onClose={() => setIsOpen(false)}
        onDisplay={id => {
          console.log("Hard fork action:", id);
          setIsOpen(false);
        }}
        useFetchMiscSearch={mockUseFetchMiscSearchHardFork}
      />
    </div>
  );
};

/**
 * Default state showing treasury withdrawal governance action
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

/**
 * Loading state while searching for governance actions
 */
export const LoadingState: Story = {
  render: () => <LoadingStateTemplate />,
};

/**
 * No results found for search query
 */
export const NoResults: Story = {
  render: () => <NoResultsTemplate />,
};

/**
 * Parameter change governance action type
 */
export const ParameterChange: Story = {
  render: () => <ParameterChangeTemplate />,
};

/**
 * Hard fork initiation governance action type
 */
export const HardFork: Story = {
  render: () => <HardForkTemplate />,
};
