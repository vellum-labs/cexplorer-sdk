import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import * as React from "react";

import { cn } from "@/utils/cn";

/**
 * Carousel API type from Embla Carousel
 */
type CarouselApi = UseEmblaCarouselType[1];

/**
 * Parameters type for useEmblaCarousel hook
 */
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

/**
 * Configuration options for Embla Carousel
 */
type CarouselOptions = UseCarouselParameters[0];

/**
 * Plugins type for Embla Carousel (e.g., Autoplay)
 */
type CarouselPlugin = UseCarouselParameters[1];

/**
 * Props for the Carousel component
 */
type CarouselProps = {
  /**
   * Embla Carousel configuration options
   * @example
   * opts={{ loop: true, align: "start" }}
   */
  opts?: CarouselOptions;
  /**
   * Embla Carousel plugins (e.g., Autoplay)
   * @example
   * plugins={[Autoplay({ delay: 3000 })]}
   */
  plugins?: CarouselPlugin;
  /**
   * Carousel scroll orientation
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Callback to set the Carousel API instance
   * @param api - Embla Carousel API instance
   */
  setApi?: (api: CarouselApi) => void;
};

/**
 * Context props for the Carousel provider
 */
type CarouselContextProps = {
  /**
   * Ref for the Embla Carousel container
   */
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  /**
   * Embla Carousel API instance
   */
  api: ReturnType<typeof useEmblaCarousel>[1];
  /**
   * Function to scroll to previous slide
   */
  scrollPrev: () => void;
  /**
   * Function to scroll to next slide
   */
  scrollNext: () => void;
  /**
   * Whether the carousel can scroll to previous slide
   */
  canScrollPrev: boolean;
  /**
   * Whether the carousel can scroll to next slide
   */
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

/**
 * Hook to access Carousel context
 *
 * @throws {Error} If used outside of Carousel component
 * @returns {CarouselContextProps} Carousel context containing API, refs, and control functions
 *
 * @example
 * ```tsx
 * function CustomCarouselButton() {
 *   const { scrollNext, canScrollNext } = useCarousel();
 *   return <button onClick={scrollNext} disabled={!canScrollNext}>Next</button>;
 * }
 * ```
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

/**
 * Carousel component built on top of Embla Carousel.
 *
 * A flexible and accessible carousel component with support for horizontal/vertical scrolling,
 * keyboard navigation, autoplay, and custom plugins.
 *
 * **Common Use Cases:**
 * - Image galleries and slideshows
 * - Featured content rotation
 * - Product showcases
 * - Testimonials and reviews
 * - Promotional banners and advertisements
 *
 * @component
 * @example
 * ```tsx
 * // Basic carousel
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *     <CarouselItem>Slide 3</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 *
 * // With autoplay
 * <Carousel plugins={[Autoplay({ delay: 3000 })]}>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 *
 * // Vertical orientation with loop
 * <Carousel orientation="vertical" opts={{ loop: true }}>
 *   <CarouselContent>
 *     <CarouselItem>Slide 1</CarouselItem>
 *     <CarouselItem>Slide 2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 *
 * @param {CarouselProps & React.HTMLAttributes<HTMLDivElement>} props - Component props
 * @param {("horizontal" | "vertical")} [props.orientation="horizontal"] - Scroll direction
 * @param {CarouselOptions} [props.opts] - Embla Carousel options
 * @param {CarouselPlugin} [props.plugins] - Embla Carousel plugins
 * @param {(api: CarouselApi) => void} [props.setApi] - Callback to receive API instance
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Carousel container with context provider
 */
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role='region'
          aria-roledescription='carousel'
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

/**
 * CarouselContent is the container for carousel items.
 *
 * This component wraps all CarouselItem components and manages the scroll container
 * for the carousel. It automatically adjusts layout based on the carousel orientation.
 *
 * **Common Use Cases:**
 * - Direct child of Carousel component
 * - Contains multiple CarouselItem components
 * - Automatically handles horizontal/vertical layout
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>Item 1</CarouselItem>
 *     <CarouselItem>Item 2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 *
 * // With custom styling
 * <Carousel>
 *   <CarouselContent className="gap-4">
 *     <CarouselItem>Item 1</CarouselItem>
 *     <CarouselItem>Item 2</CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div HTML attributes
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Scroll container for carousel items
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='-mx-1 -my-2 overflow-hidden p-1'>
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-2" : "-mt-1 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

/**
 * CarouselItem represents a single slide within the carousel.
 *
 * This component wraps individual carousel content items and provides proper
 * accessibility attributes and responsive sizing.
 *
 * **Common Use Cases:**
 * - Wrapping cards, images, or content in a carousel
 * - Creating responsive grid layouts within carousel
 * - Displaying multiple items per slide
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem>
 *       <img src="image1.jpg" alt="Slide 1" />
 *     </CarouselItem>
 *     <CarouselItem>
 *       <img src="image2.jpg" alt="Slide 2" />
 *     </CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 *
 * // With responsive sizing (show multiple items)
 * <Carousel>
 *   <CarouselContent>
 *     <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
 *       <Card>Item 1</Card>
 *     </CarouselItem>
 *     <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
 *       <Card>Item 2</Card>
 *     </CarouselItem>
 *   </CarouselContent>
 * </Carousel>
 * ```
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div HTML attributes
 * @param {string} [props.className] - Additional CSS classes for sizing and styling
 * @returns {JSX.Element} Carousel slide container
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        "basis min-w-0 shrink-0 grow-0",
        orientation === "horizontal" ? "pl-2" : "pt-2",
        className,
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselContent, CarouselItem, type CarouselApi };
