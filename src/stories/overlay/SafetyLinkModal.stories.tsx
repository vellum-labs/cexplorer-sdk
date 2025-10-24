import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SafetyLinkModal } from "../../ui/safetyLinkModal";
import { Button } from "../../ui/button";

const meta: Meta<typeof SafetyLinkModal> = {
  title: "Overlay/SafetyLinkModal",
  component: SafetyLinkModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Safety warning modal that appears before redirecting users to external URLs, protecting against phishing and malicious links.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    url: {
      control: "text",
      description: "External URL to visit",
      table: {
        type: { summary: "string" },
      },
    },
    onClose: {
      control: false,
      description: "Callback when modal should close",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default modal with stake pool website URL
 */
const DefaultComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Open External Link Warning"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SafetyLinkModal
          url="https://mystakepool.io"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <DefaultComponent />,
};

/**
 * Modal with Twitter/X social media link
 */
const TwitterLinkComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Open Twitter Link"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SafetyLinkModal
          url="https://twitter.com/cardano_pool_operator"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const TwitterLink: Story = {
  render: () => <TwitterLinkComponent />,
};

/**
 * Modal with Discord server invitation link
 */
const DiscordLinkComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Join Discord Server"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SafetyLinkModal
          url="https://discord.gg/cardano-community"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const DiscordLink: Story = {
  render: () => <DiscordLinkComponent />,
};

/**
 * Modal with Telegram group link
 */
const TelegramLinkComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Join Telegram Group"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SafetyLinkModal
          url="https://t.me/cardano_stake_pool"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const TelegramLink: Story = {
  render: () => <TelegramLinkComponent />,
};

/**
 * Modal with very long URL that might wrap
 */
const LongUrlComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Open Very Long URL"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SafetyLinkModal
          url="https://example-very-long-domain-name.com/path/to/some/deeply/nested/resource/with/many/segments/and/query/parameters?param1=value1&param2=value2&param3=value3&param4=value4&utm_source=cardano&utm_medium=explorer&utm_campaign=stake_pool"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const LongUrl: Story = {
  render: () => <LongUrlComponent />,
};

/**
 * Modal with suspicious-looking phishing URL (demonstration)
 */
const SuspiciousUrlComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="red"
        label="⚠️ Suspicious Link Warning"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <SafetyLinkModal
          url="https://cardano-wa11et-connect.suspicious-domain.ru/claim-rewards"
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export const SuspiciousUrl: Story = {
  render: () => <SuspiciousUrlComponent />,
};

/**
 * Interactive example with multiple external links
 */
const InteractiveExampleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const externalLinks = [
    { label: "Pool Website", url: "https://cardanopool.io" },
    { label: "Documentation", url: "https://docs.cardano.org" },
    { label: "Twitter", url: "https://twitter.com/cardano" },
    { label: "GitHub", url: "https://github.com/cardano" },
  ];

  const handleLinkClick = (url: string) => {
    setCurrentUrl(url);
    setIsOpen(true);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <h3 className="text-text-lg font-semibold">External Links</h3>
      <div className="flex flex-wrap gap-2">
        {externalLinks.map(link => (
          <Button
            key={link.url}
            size="sm"
            variant="secondary"
            label={link.label}
            onClick={() => handleLinkClick(link.url)}
          />
        ))}
      </div>
      <p className="text-text-sm text-gray-500">
        Click any link to see the safety warning
      </p>
      {isOpen && (
        <SafetyLinkModal url={currentUrl} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export const InteractiveExample: Story = {
  render: () => <InteractiveExampleComponent />,
};
