import type { MiscBasicResponse } from "@/types/miscTypes";
import parse, { type DOMNode, Element } from "html-react-parser";
import { ChevronDown } from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Ad = MiscBasicResponse["data"]["ads"][number];

/**
 * Props for the ButtonAd component
 */
export interface ButtonAdProps {
  /**
   * Array of button-type ads from the MiscBasic API response.
   * Each ad contains data with icon, link, text, and title.
   * Ads are grouped by `data.title` (category). Each pill represents a category,
   * and the dropdown shows all ads in that category.
   */
  ads: MiscBasicResponse["data"]["ads"];

  /**
   * Maximum number of category pills to display.
   * If more categories exist, a random subset is selected.
   * @default 3
   */
  maxCount?: number;

  /**
   * Label displayed before the ad title in the dropdown.
   * @default "Featured:"
   */
  featuredLabel?: string;
}

/**
 * ButtonAd displays a row of pill-shaped category buttons with dropdown content.
 *
 * Ads are grouped by `data.title` (category name). Each pill represents one category.
 * Clicking a pill toggles a dropdown showing up to `maxDropdownItems` ads from that category.
 * If more than `maxCount` categories exist, a stable random subset of categories is selected.
 *
 * @component
 * @param {ButtonAdProps} props - Component props
 * @returns {JSX.Element} Row of category pill buttons with dropdown
 */
export const ButtonAd = ({
  ads,
  maxCount = 3,
  featuredLabel = "Featured:",
}: ButtonAdProps) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLAnchorElement>(null);

  // Group ads by title (category)
  const grouped = useMemo(() => {
    const map = new Map<string, Ad[]>();
    for (const ad of ads) {
      const key = ad.data.title || "";
      const existing = map.get(key);
      if (existing) {
        existing.push(ad);
      } else {
        map.set(key, [ad]);
      }
    }
    return map;
  }, [ads]);

  // Select which categories (pills) to display
  const displayCategories = useMemo(() => {
    let keys = Array.from(grouped.keys());
    if (keys.length > maxCount) {
      const shuffled = [...keys].sort(() => Math.random() - 0.5);
      keys = shuffled.slice(0, maxCount);
    }
    // Sort by title length so short ones group together on the same row
    return keys.sort((a, b) => a.length - b.length);
  }, [grouped, maxCount]);

  // Pick one random ad for the open category
  const dropdownAd = useMemo(() => {
    if (!openCategory) return null;
    const categoryAds = grouped.get(openCategory) || [];
    if (categoryAds.length === 0) return null;
    if (categoryAds.length === 1) return categoryAds[0];
    return categoryAds[Math.floor(Math.random() * categoryAds.length)];
  }, [openCategory, grouped]);

  const handleToggle = useCallback((category: string) => {
    setOpenCategory(prev => (prev === category ? null : category));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenCategory(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clamp dropdown to viewport bounds (same pattern as Tooltip)
  useLayoutEffect(() => {
    if (!openCategory || !dropdownRef.current) return;

    const el = dropdownRef.current;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const vw = window.innerWidth;
    const MARGIN = 8;

    if (rect.right > vw - MARGIN) {
      const overflow = rect.right - (vw - MARGIN);
      el.style.left = `${-overflow}px`;
    }
    if (rect.left < MARGIN) {
      el.style.left = `${MARGIN - rect.left}px`;
    }
  }, [openCategory]);

  return (
    <div
      ref={containerRef}
      className='mb-1.5 flex w-full flex-wrap gap-1'
    >
      {displayCategories.map(category => {
        const categoryAds = grouped.get(category) || [];
        const firstAd = categoryAds[0];
        const isOpen = openCategory === category;

        return (
          <div key={category} className='relative flex-1'>
            <button
              onClick={() => handleToggle(category)}
              title={category}
              className='flex h-[36px] w-full cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-s border border-border bg-cardBg px-1 transition-colors hover:bg-background'
            >
              {firstAd?.data.icon && (
                <img
                  src={String(firstAd.data.icon)}
                  alt=''
                  width={16}
                  height={16}
                  className='rounded-max'
                />
              )}
              <span className='text-text-xs text-text'>
                {category}
              </span>
              <ChevronDown
                size={14}
                className={`text-grayText transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && dropdownAd && (
              <a
                ref={dropdownRef}
                href={dropdownAd.data.link}
                target='_blank'
                rel='noreferrer noopener nofollow'
                className='absolute left-0 top-full z-10 mt-1 flex min-h-[60px] w-[300px] max-w-[calc(100vw-16px)] cursor-pointer flex-col gap-0.5 rounded-l border border-border bg-cardBg px-2 py-1.5 shadow-md transition-colors hover:bg-background hover:text-text'
              >
                <div className='flex items-center gap-1'>
                  {dropdownAd.data.icon && (
                    <img
                      src={String(dropdownAd.data.icon)}
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
                    {dropdownAd.data.title}
                  </span>
                </div>
                <p className='overflow-hidden text-ellipsis text-text-sm text-grayTextPrimary'>
                  {parse(dropdownAd.data.content || dropdownAd.data.text || "", {
                    replace: (domNode: DOMNode) => {
                      if (domNode instanceof Element && domNode.name === "a") {
                        domNode.attribs.target = "_blank";
                        domNode.attribs.rel = "noopener noreferrer nofollow";
                      }
                    },
                  })}
                </p>
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};
