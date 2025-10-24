import type { Meta, StoryObj } from "@storybook/react";
import { FunnelFilter } from "../../ui/funnelFilter";
import { useRef, useState, type FC } from "react";

const meta: Meta<typeof FunnelFilter> = {
  title: "Forms & Inputs/FunnelFilter",
  component: FunnelFilter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A positioned dropdown panel for filtering content with custom filter controls and Reset/Filter action buttons.",
      },
    },
  },
  argTypes: {
    anchorRef: {
      control: false,
      description: "Reference to the anchor element for positioning",
      table: {
        type: { summary: "RefObject<HTMLElement>" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the Filter button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onFilter: {
      control: false,
      description: "Callback when Filter button is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
    onReset: {
      control: false,
      description: "Callback when Reset button is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
    children: {
      control: false,
      description: "Filter content (inputs, checkboxes, etc.)",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    width: {
      control: "text",
      description: "Width of the filter dropdown panel",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'250px'" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[500px] w-full items-start justify-center bg-background p-10'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Template components
const DefaultTemplate: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div>
      <button
        ref={buttonRef}
        className="rounded-md border border-border bg-cardBg px-4 py-2 text-sm font-medium text-text hover:bg-border"
        onClick={() => setShowFilter(!showFilter)}
      >
        Open Filter
      </button>
      {showFilter && (
        <FunnelFilter
          anchorRef={buttonRef}
          onFilter={() => {
            console.log("Filtered:", selected);
            setShowFilter(false);
          }}
          onReset={() => {
            setSelected([]);
            setShowFilter(false);
          }}
        >
          <div className="flex flex-col gap-2 p-3">
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={selected.includes("pools")}
                onChange={e => {
                  if (e.target.checked) {
                    setSelected([...selected, "pools"]);
                  } else {
                    setSelected(selected.filter(x => x !== "pools"));
                  }
                }}
              />
              Stake Pools
            </label>
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={selected.includes("tokens")}
                onChange={e => {
                  if (e.target.checked) {
                    setSelected([...selected, "tokens"]);
                  } else {
                    setSelected(selected.filter(x => x !== "tokens"));
                  }
                }}
              />
              Tokens
            </label>
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={selected.includes("nfts")}
                onChange={e => {
                  if (e.target.checked) {
                    setSelected([...selected, "nfts"]);
                  } else {
                    setSelected(selected.filter(x => x !== "nfts"));
                  }
                }}
              />
              NFTs
            </label>
          </div>
        </FunnelFilter>
      )}
    </div>
  );
};

/**
 * Default filter with checkboxes
 */
export const Default: Story = {
  render: () => <DefaultTemplate />,
};

const WithTextInputTemplate: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <button
        ref={buttonRef}
        className="rounded-md border border-border bg-cardBg px-4 py-2 text-sm font-medium text-text hover:bg-border"
        onClick={() => setShowFilter(!showFilter)}
      >
        Search Filter
      </button>
      {showFilter && (
        <FunnelFilter
          anchorRef={buttonRef}
          disabled={!searchTerm}
          onFilter={() => {
            console.log("Search:", searchTerm);
            setShowFilter(false);
          }}
          onReset={() => {
            setSearchTerm("");
          }}
        >
          <div className="p-3">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-text"
            />
          </div>
        </FunnelFilter>
      )}
    </div>
  );
};

/**
 * Filter with text input
 */
export const WithTextInput: Story = {
  render: () => <WithTextInputTemplate />,
};

const WideFilterTemplate: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    minAmount: "",
    maxAmount: "",
  });

  return (
    <div>
      <button
        ref={buttonRef}
        className="rounded-md border border-border bg-cardBg px-4 py-2 text-sm font-medium text-text hover:bg-border"
        onClick={() => setShowFilter(!showFilter)}
      >
        Advanced Filter
      </button>
      {showFilter && (
        <FunnelFilter
          anchorRef={buttonRef}
          width="350px"
          onFilter={() => {
            console.log("Filters:", filters);
            setShowFilter(false);
          }}
          onReset={() => {
            setFilters({ type: "all", minAmount: "", maxAmount: "" });
          }}
        >
          <div className="flex flex-col gap-3 p-4">
            <div>
              <label className="mb-1 block text-xs text-grayTextPrimary">
                Transaction Type
              </label>
              <select
                value={filters.type}
                onChange={e =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full rounded border border-border bg-background px-2 py-1 text-sm text-text"
              >
                <option value="all">All Types</option>
                <option value="send">Send</option>
                <option value="receive">Receive</option>
                <option value="stake">Stake</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-grayTextPrimary">
                Amount Range (ADA)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.minAmount}
                  onChange={e =>
                    setFilters({ ...filters, minAmount: e.target.value })
                  }
                  placeholder="Min"
                  className="w-1/2 rounded border border-border bg-background px-2 py-1 text-sm text-text"
                />
                <input
                  type="number"
                  value={filters.maxAmount}
                  onChange={e =>
                    setFilters({ ...filters, maxAmount: e.target.value })
                  }
                  placeholder="Max"
                  className="w-1/2 rounded border border-border bg-background px-2 py-1 text-sm text-text"
                />
              </div>
            </div>
          </div>
        </FunnelFilter>
      )}
    </div>
  );
};

/**
 * Wide filter with multiple controls
 */
export const WideFilter: Story = {
  render: () => <WideFilterTemplate />,
};

const DisabledFilterTemplate: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState(true);

  return (
    <div>
      <button
        ref={buttonRef}
        className="rounded-md border border-border bg-cardBg px-4 py-2 text-sm font-medium text-text hover:bg-border"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filter (Disabled)
      </button>
      {showFilter && (
        <FunnelFilter
          anchorRef={buttonRef}
          disabled={true}
          onFilter={() => {
            console.log("Filter clicked");
          }}
          onReset={() => {
            console.log("Reset clicked");
          }}
        >
          <div className="p-3">
            <p className="text-sm text-grayTextPrimary">
              No filters selected. The Filter button is disabled.
            </p>
          </div>
        </FunnelFilter>
      )}
    </div>
  );
};

/**
 * Disabled filter button state
 */
export const DisabledFilter: Story = {
  render: () => <DisabledFilterTemplate />,
};
