import Autoplay from "embla-carousel-autoplay";
import { type FC } from "react";
import { LoadingSkeleton } from "../loadingSkeleton";
import { Carousel, CarouselContent, CarouselItem } from "./components/carousel";

/**
 * Props for the SingleItemCarousel component
 */
export interface SingleItemCarouselProps {
  /**
   * Array of items to display in the carousel
   *
   * @example
   * items={[{ id: 1, title: "Item 1" }, { id: 2, title: "Item 2" }]}
   */
  items: unknown[];
  /**
   * React component to render each carousel item
   * Must accept an `item` prop of type `unknown`
   *
   * @example
   * card={({ item }) => <div>{item.title}</div>}
   */
  card: React.ComponentType<{ item: unknown }>;
  /**
   * Loading state - shows skeleton loaders when true
   */
  isLoading: boolean;
  /**
   * Additional CSS classes for the carousel container
   */
  className?: string;
}

/**
 * SingleItemCarousel displays one item at a time with automatic rotation.
 *
 * A carousel component that shows a single item per slide with autoplay enabled by default.
 * Includes loading state with skeleton loaders and supports infinite looping.
 *
 * **Common Use Cases:**
 * - Featured content rotation on homepage
 * - Promotional banner carousel
 * - Testimonials or reviews showcase
 * - News or announcement highlights
 * - Single-item product showcases
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with card component
 * const PromoCard = ({ item }) => (
 *   <div className="p-4 bg-card rounded">
 *     <h3>{item.title}</h3>
 *     <p>{item.description}</p>
 *   </div>
 * );
 *
 * <SingleItemCarousel
 *   items={promoItems}
 *   card={PromoCard}
 *   isLoading={false}
 * />
 *
 * // With custom styling
 * <SingleItemCarousel
 *   items={testimonials}
 *   card={TestimonialCard}
 *   isLoading={isLoadingTestimonials}
 *   className="max-w-4xl mx-auto"
 * />
 *
 * // Loading state (shows 3 skeleton loaders)
 * <SingleItemCarousel
 *   items={[]}
 *   card={CardComponent}
 *   isLoading={true}
 * />
 * ```
 *
 * @param {SingleItemCarouselProps} props - Component props
 * @param {unknown[]} props.items - Array of items to display
 * @param {React.ComponentType<{ item: unknown }>} props.card - Component to render each item
 * @param {boolean} props.isLoading - Whether to show loading skeletons
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Autoplay carousel showing one item at a time
 */
export const SingleItemCarousel: FC<SingleItemCarouselProps> = ({
  items,
  card: Card,
  isLoading,
  className,
}) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className={`flex w-full overflow-visible ${className}`}
      opts={{
        loop: true,
        duration: 30,
        align: "start",
      }}
    >
      {isLoading ? (
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index} className={`basis-full`}>
              <LoadingSkeleton height='110px' rounded='md' />
            </CarouselItem>
          ))}
        </CarouselContent>
      ) : (
        <CarouselContent className='overflow-visible'>
          {items?.map((item, index) => (
            <CarouselItem key={index} className={`basis-full overflow-visible`}>
              <Card item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      )}
    </Carousel>
  );
};
