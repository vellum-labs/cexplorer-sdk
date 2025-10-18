import type { Meta, StoryObj } from "@storybook/react";
import { type FC, useState } from "react";
import { Button } from "../../ui/button";
import { Modal } from "../../ui/modal";

const meta: Meta<typeof Modal> = {
  title: "Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An overlay dialog component with backdrop, keyboard navigation, and accessibility features.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    onClose: {
      action: "closed",
      description: "Callback function triggered when the modal should close",
      table: {
        type: { summary: "() => void" },
      },
    },
    children: {
      control: false,
      description: "Content to be displayed inside the modal",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    minWidth: {
      control: "text",
      description: "Minimum width of the modal",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'95%'" },
      },
    },
    maxWidth: {
      control: "text",
      description: "Maximum width of the modal",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'400px'" },
      },
    },
    minHeight: {
      control: "text",
      description: "Minimum height of the modal",
      table: {
        type: { summary: "string" },
      },
    },
    maxHeight: {
      control: "text",
      description: "Maximum height of the modal",
      table: {
        type: { summary: "string" },
      },
    },
    hideClose: {
      control: "boolean",
      description: "Whether to hide the close (X) button",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the modal container",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface DefaultTemplateProps {
  title: string;
  description: string;
  maxHeight?: string;
  minHeight?: string;
  maxWidth?: string;
  hideClose?: boolean;
}

const DefaultTemplate: FC<DefaultTemplateProps> = ({
  description,
  title,
  maxHeight,
  minHeight,
  maxWidth,
  hideClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='flex h-screen w-full items-center justify-center bg-background p-10'>
      <Button
        size='md'
        variant='primary'
        label='Open Modal'
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
          maxHeight={maxHeight}
          minHeight={minHeight}
          maxWidth={maxWidth}
          hideClose={hideClose}
        >
          <div className='p-6'>
            <h2 className='text-xl text-foreground mb-4 font-semibold'>
              {title}
            </h2>
            <p className='text-foreground'>{description}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

/**
 * Basic modal with default settings
 */
export const Default: Story = {
  render: () => (
    <DefaultTemplate
      title='Modal Title'
      description='This is a basic modal with default settings. Click the X button,
                click outside, or press Escape to close.'
    />
  ),
};

/**
 * Large modal with custom dimensions
 */
export const LargeModal: Story = {
  render: () => (
    <DefaultTemplate
      title='Large Modal'
      description='This modal has custom dimensions with maxWidth of 800px and
                minHeight of 500px.'
      minHeight='500'
      maxWidth='800px'
    />
  ),
};

/**
 * Modal without close button
 */
export const WithoutCloseButton: Story = {
  render: () => (
    <DefaultTemplate
      title='No Close Button'
      description='This modal has no close button. You can still close it by
                clicking the backdrop or pressing Escape.'
      hideClose
    />
  ),
};
