import type { MiscBasicResponse } from "@/types/miscTypes";
import parse, { type DOMNode, Element } from "html-react-parser";
import { useMemo } from "react";

/**
 * Props for the ButtonAd component
 */
export interface ButtonAdProps {
  /**
   * Array of button-type ads from the MiscBasic API response.
   * Each ad contains data with icon, link, text, and title.
   */
  ads: MiscBasicResponse["data"]["ads"];

  /**
   * Maximum number of button ads to display.
   * If more ads are provided, a random subset is selected.
   * @default 3
   */
  maxCount?: number;

  /**
   * Label displayed before the ad title.
   * @default "Featured:"
   */
  featuredLabel?: string;
}

/**
 * ButtonAd displays a stacked card of featured ad items with icon, title, and description.
 *
 * Each item opens the ad link in a new tab.
 * If more than `maxCount` ads are provided, a stable random subset is selected.
 *
 * @component
 * @param {ButtonAdProps} props - Component props
 * @returns {JSX.Element} Card with stacked ad items
 */
export const ButtonAd = ({
  ads,
  maxCount = 3,
  featuredLabel = "Featured:",
}: ButtonAdProps) => {
  const displayAds = useMemo(() => {
    if (ads.length <= maxCount) return ads;
    const shuffled = [...ads].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, maxCount);
  }, [ads, maxCount]);

  return (
    <div className='mb-1.5 flex w-full flex-col divide-y divide-border rounded-m border border-border bg-cardBg'>
      {displayAds.map((ad, index) => (
        <a
          key={index}
          href={ad.data.link}
          target='_blank'
          rel='noreferrer noopener nofollow'
          title={ad.data.title}
          className='flex cursor-pointer flex-col gap-0.5 px-2 py-1.5 text-left transition-colors first:rounded-t-m last:rounded-b-m hover:bg-background hover:text-text'
        >
          <div className='flex items-center gap-1'>
            {ad.data.icon && (
              <img
                src={String(ad.data.icon)}
                alt=''
                width={20}
                height={20}
                className='rounded-max'
              />
            )}
            <span className='text-text-sm font-semibold text-text'>
              {featuredLabel}
            </span>
            <span className='text-text-sm font-semibold text-primary'>
              {ad.data.title}
            </span>
          </div>
          <p className='overflow-hidden text-ellipsis text-text-sm text-grayTextPrimary'>
            {parse(ad.data.content || ad.data.text || "", {
              replace: (domNode: DOMNode) => {
                if (domNode instanceof Element && domNode.name === "a") {
                  domNode.attribs.target = "_blank";
                  domNode.attribs.rel = "noopener noreferrer nofollow";
                }
              },
            })}
          </p>
        </a>
      ))}
    </div>
  );
};
