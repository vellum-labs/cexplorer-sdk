import type { FC } from "react";

import { Check, Copy as CopyIcon, X } from "lucide-react";

import { toast } from "sonner";

import { cn } from "@/utils/cn";
import { useState } from "react";
import { Button } from "../button";

interface CopyComponentProps {
  size?: number;
  copyText: string | null | undefined;
  className?: string;
  showText?: string;
}

export const Copy: FC<CopyComponentProps> = ({
  size = 13,
  copyText,
  className,
  showText,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [alreadyCopied, setAlreadyCopied] = useState<boolean>(false);

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(copyText || "");
      setCopied(true);
      setAlreadyCopied(true);

      toast("Successfully copied", {
        action: {
          label: <X size={15} className='stroke-text' />,
          onClick: () => undefined,
        },
        id: "copy-toast",
      });

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch {
      toast("Copying failed", {
        action: {
          label: <X size={15} className='stroke-text' />,
          onClick: () => undefined,
        },
      });
    }
  };

  if (showText) {
    return (
      <Button
        label={showText}
        size='md'
        variant='tertiary'
        leftIcon={copied ? <Check size={15} /> : <CopyIcon size={15} />}
        onClick={handleCopy}
      />
    );
  }

  return copied ? (
    <Check className={cn("shrink-0", className)} size={size} />
  ) : (
    <CopyIcon
      className={cn("shrink-0", className)}
      size={size}
      cursor='pointer'
      onClick={e => {
        e.stopPropagation();
        handleCopy();
      }}
      color={alreadyCopied ? "var(--border)" : "var(--text)"}
    />
  );
};
