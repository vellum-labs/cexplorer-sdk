import { type MiscBasicResponse } from "@/types/miscTypes";
import { type UseQueryResult } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { type FC } from "react";
import { LoadingSkeleton } from "../loadingSkeleton";
import { AdCard } from "./AdCard";
import { Carousel, CarouselContent, CarouselItem } from "./components/carousel";

/**
 * Props for the AdsCarousel component
 */
export interface AdsCarouselProps {
  /**
   * Display only one item per slide
   * @default false
   */
  singleItem?: boolean;
  /**
   * Additional CSS classes for the carousel container
   */
  className?: string;
  /**
   * Additional CSS classes for individual AdCard components
   */
  adCardClassname?: string;
  /**
   * Filter advertisements by type (e.g., "pool", "asset")
   * Falls back to showing all ads if filtered results are empty
   */
  filterByType?: string;
  /**
   * Apply max-width-desktop constraint to carousel
   * @default true
   */
  maxWidth?: boolean;
  /**
   * React Query result containing miscellaneous data including ads
   */
  miscBasicQuery: UseQueryResult<
    MiscBasicResponse & {
      prevOffset: number | undefined;
    },
    Error
  >;
  /**
   * Function to generate image URLs for pools and assets
   *
   * @param ident - Unique identifier (pool ID or asset name)
   * @param size - Image size variant
   * @param type - Type of entity (pool, token, etc.)
   * @returns Image URL string
   */
  generateImageUrl: (
    ident: string,
    size: "ico" | "sm" | "md" | "lg",
    type?: "nft" | "pool" | "drep" | "token" | "cc",
  ) => string;
}

/**
 * AdsCarousel displays promotional advertisements in a responsive carousel.
 *
 * A carousel component specifically designed for displaying promotional content (ads)
 * for Cardano pools and assets. Supports responsive grid layouts, autoplay, filtering
 * by type, and loading states with skeleton loaders.
 *
 * **Common Use Cases:**
 * - Homepage promotional banners
 * - Stake pool advertisement rotation
 * - Featured token/asset showcases
 * - Promotional panels on explorer pages
 * - Sponsored content carousels
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with multiple ads per slide
 * <AdsCarousel
 *   miscBasicQuery={useMiscBasicQuery()}
 *   generateImageUrl={generateImageUrl}
 * />
 *
 * // Single ad per slide (for mobile/sidebar)
 * <AdsCarousel
 *   singleItem={true}
 *   miscBasicQuery={miscQuery}
 *   generateImageUrl={generateImageUrl}
 *   className="sidebar-carousel"
 * />
 *
 * // Filter only pool advertisements
 * <AdsCarousel
 *   filterByType="pool"
 *   miscBasicQuery={miscQuery}
 *   generateImageUrl={generateImageUrl}
 *   maxWidth={false}
 * />
 *
 * // Custom styling on cards
 * <AdsCarousel
 *   miscBasicQuery={miscQuery}
 *   generateImageUrl={generateImageUrl}
 *   adCardClassname="shadow-lg hover:shadow-xl"
 * />
 * ```
 *
 * @param {AdsCarouselProps} props - Component props
 * @param {boolean} [props.singleItem=false] - Show one item per slide
 * @param {string} [props.className] - Carousel container classes
 * @param {string} [props.adCardClassname] - AdCard styling classes
 * @param {string} [props.filterByType] - Filter ads by type
 * @param {boolean} [props.maxWidth=true] - Apply max-width constraint
 * @param {UseQueryResult} props.miscBasicQuery - Query containing ad data
 * @param {Function} props.generateImageUrl - Image URL generator
 * @returns {JSX.Element | null} Responsive carousel with ads, or null if no ads
 */
export const AdsCarousel: FC<AdsCarouselProps> = ({
  singleItem = false,
  maxWidth = true,
  className,
  filterByType,
  adCardClassname,
  miscBasicQuery,
  generateImageUrl,
}) => {
  const basicAds = miscBasicQuery.data?.data.ads.filter(
    ad => ad.type === "promo_panel" && ad.data,
  );

  const filteredAds = basicAds?.filter(
    item => item?.data?.type === filterByType,
  );

  const panelAds = filterByType
    ? Array.isArray(filteredAds) && filteredAds?.length > 0
      ? filteredAds
      : basicAds
    : basicAds;

  if (panelAds?.length === 0) return null;

  return (
    <aside
      className={`flex w-full max-w-desktop flex-wrap justify-between gap-2 ${!singleItem ? "p-mobile md:p-desktop" : ""} ${className}`}
    >
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className={`w-full overflow-visible ${maxWidth ? "max-w-desktop" : ""}`}
        opts={{
          loop: true,
          duration: 30,
          align: "start",
        }}
      >
        {miscBasicQuery.isLoading ? (
          <CarouselContent className=''>
            {Array.from({ length: 3 }).map((_, index) => (
              <CarouselItem
                key={index}
                className={`basis-full ${!singleItem ? "md:basis-1/2 lg:basis-1/3 2xl:basis-1/4" : "md:basis-1/2 lg:basis-full"}`}
              >
                <LoadingSkeleton height='110px' rounded='md' />
              </CarouselItem>
            ))}
          </CarouselContent>
        ) : (
          <CarouselContent className='overflow-visible'>
            {basicAds?.map((ad, index, arr) => (
              <CarouselItem
                key={index}
                className={`basis-full overflow-visible ${!singleItem ? `md:basis-1/2 ${arr.length === 2 ? "lg:basic-1/2" : "lg:basis-1/3 2xl:basis-1/4"}` : "md:basis-1/2 lg:basis-full"}`}
              >
                <AdCard
                  data={ad.data}
                  className={adCardClassname}
                  generateImageUrl={generateImageUrl}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        )}
      </Carousel>
    </aside>
  );
};
