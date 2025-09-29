import type { Meta, StoryObj } from "@storybook/react";
import { FunnelFilter } from "./index";
import { useState, useRef } from "react";
import { Button } from "../Button";

const meta = {
  title: "Overlays/FunnelFilter",
  component: FunnelFilter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    width: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof FunnelFilter>;

export default meta;

export const BasicFilter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div className='relative p-8'>
        <Button
          ref={buttonRef}
          variant='tertiary'
          size='sm'
          label='Open Filter'
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <FunnelFilter
            anchorRef={buttonRef}
            onFilter={() => {
              console.log("Filter applied");
              setIsOpen(false);
            }}
            onReset={() => {
              console.log("Filter reset");
              setIsOpen(false);
            }}
          >
            <div className='p-4'>
              <label className='mb-2 block text-sm font-medium'>Search</label>
              <input
                type='text'
                className='w-full rounded-md border border-gray-300 px-3 py-2'
                placeholder='Enter search term...'
              />
            </div>
          </FunnelFilter>
        )}
      </div>
    );
  },
};

export const DateRangeFilter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <div className='relative p-8'>
        <Button
          ref={buttonRef}
          variant='secondary'
          size='md'
          label='Date Filter'
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <FunnelFilter
            anchorRef={buttonRef}
            width='300px'
            onFilter={() => {
              console.log("Date filter applied");
              setIsOpen(false);
            }}
            onReset={() => {
              console.log("Date filter reset");
              setIsOpen(false);
            }}
          >
            <div className='space-y-4 p-4'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  From Date
                </label>
                <input
                  type='date'
                  className='w-full rounded-md border border-gray-300 px-3 py-2'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  To Date
                </label>
                <input
                  type='date'
                  className='w-full rounded-md border border-gray-300 px-3 py-2'
                />
              </div>
            </div>
          </FunnelFilter>
        )}
      </div>
    );
  },
};

export const MultiSelectFilter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const options = ["Bitcoin", "Ethereum", "Cardano", "Solana", "Polygon"];

    const handleOptionChange = (option: string) => {
      const newSelection = selectedOptions.includes(option)
        ? selectedOptions.filter(item => item !== option)
        : [...selectedOptions, option];

      setSelectedOptions(newSelection);
      setDisabled(newSelection.length === 0);
    };

    return (
      <div className='relative p-8'>
        <Button
          ref={buttonRef}
          variant='primary'
          size='md'
          label={`Cryptocurrencies${selectedOptions.length > 0 ? ` (${selectedOptions.length})` : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <FunnelFilter
            anchorRef={buttonRef}
            width='280px'
            disabled={disabled}
            onFilter={() => {
              console.log("Selected cryptocurrencies:", selectedOptions);
              setIsOpen(false);
            }}
            onReset={() => {
              setSelectedOptions([]);
              setDisabled(true);
              console.log("Cryptocurrency filter reset");
            }}
          >
            <div className='p-4'>
              <label className='mb-3 block text-sm font-medium'>
                Select Cryptocurrencies
              </label>
              <div className='space-y-2'>
                {options.map(option => (
                  <label key={option} className='flex items-center'>
                    <input
                      type='checkbox'
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                      className='mr-2'
                    />
                    <span className='text-sm'>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </FunnelFilter>
        )}
      </div>
    );
  },
};

export const AmountRangeFilter = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [minAmount, setMinAmount] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);

    const hasValues = minAmount || maxAmount;

    return (
      <div className='relative p-8'>
        <Button
          ref={buttonRef}
          variant='tertiary'
          size='md'
          label='Amount Range'
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <FunnelFilter
            anchorRef={buttonRef}
            width='320px'
            disabled={!hasValues}
            onFilter={() => {
              console.log("Amount range:", { min: minAmount, max: maxAmount });
              setIsOpen(false);
            }}
            onReset={() => {
              setMinAmount("");
              setMaxAmount("");
              console.log("Amount range reset");
            }}
          >
            <div className='space-y-4 p-4'>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Minimum Amount
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-2.5 text-gray-500'>
                    $
                  </span>
                  <input
                    type='number'
                    value={minAmount}
                    onChange={e => setMinAmount(e.target.value)}
                    className='w-full rounded-md border border-gray-300 py-2 pl-8 pr-3'
                    placeholder='0.00'
                  />
                </div>
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium'>
                  Maximum Amount
                </label>
                <div className='relative'>
                  <span className='absolute left-3 top-2.5 text-gray-500'>
                    $
                  </span>
                  <input
                    type='number'
                    value={maxAmount}
                    onChange={e => setMaxAmount(e.target.value)}
                    className='w-full rounded-md border border-gray-300 py-2 pl-8 pr-3'
                    placeholder='1,000,000.00'
                  />
                </div>
              </div>
            </div>
          </FunnelFilter>
        )}
      </div>
    );
  },
};
