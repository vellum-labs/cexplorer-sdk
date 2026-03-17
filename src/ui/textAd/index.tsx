import type { MiscBasicResponse } from "@/types/miscTypes";
import { useCallback, useRef, type FC } from "react";

/**
 * Props for the TextAd component
 */
export interface TextAdProps {
  /**
   * A text_ad item from the MiscBasic API response.
   */
  ad: MiscBasicResponse["data"]["ads"][number];

  /**
   * Label displayed before the ad text.
   * @default "Featured:"
   */
  featuredLabel?: string;

  /**
   * Additional CSS classes for the container.
   */
  className?: string;
}

/**
 * TextAd displays a subtle inline text advertisement with optional icon.
 *
 * Renders a single line with an optional icon, a "Featured:" label,
 * and HTML text content (which may contain links). Designed to blend
 * with surrounding content — used in headers, search dropdowns, and below search bars.
 *
 * @component
 * @param {TextAdProps} props - Component props
 * @returns {JSX.Element} Inline text ad element
 */
export const TextAd: FC<TextAdProps> = ({
  ad,
  featuredLabel = "Featured:",
  className,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (anchor) {
      e.preventDefault();
      e.stopPropagation();
      window.open(anchor.href, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <p className={`text-text-sm text-grayTextPrimary ${className || ""}`}>
      {ad.data.icon && (
        <img
          src={String(ad.data.icon)}
          alt=''
          width={20}
          height={20}
          className='mr-1 inline-block rounded-max align-middle'
        />
      )}
      <span className='font-semibold text-text'>{featuredLabel}</span>{" "}
      <span
        ref={textRef}
        dangerouslySetInnerHTML={{ __html: ad.data.text || "" }}
        onClick={handleClick}
        className='[&>a]:cursor-pointer [&>a]:font-semibold [&>a]:text-primary'
      />
    </p>
  );
};
