import DrepFallback from "@/resources/images/fallbacks/drepFallback.svg";
import PoolFallback from "@/resources/images/fallbacks/poolFallback.svg";

import { alphabetWithNumbers } from "@/constants/alphabet";
import React, { useEffect, useState } from "react";
import { LoadingSkeleton } from "@/ui/loadingSkeleton";

/**
 * Props for the Image component
 * Extends all standard HTML img attributes
 */
export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * Type of image entity (determines fallback image)
   * - "asset": No fallback image (shows letter-based avatar)
   * - "pool": Shows pool fallback image
   * - "user": Shows user/DRep fallback image
   *
   * @example
   * <Image src="pool-logo.png" type="pool" width={64} height={64} />
   */
  type?: "asset" | "pool" | "user";

  /**
   * If true, image width will be 100% instead of fixed width
   * Useful for responsive layouts
   *
   * @example
   * <Image src="banner.png" fullWidth={true} height={200} />
   */
  fullWidth?: boolean;

  /**
   * Letters used to generate a colored avatar fallback when image fails to load
   * Creates an avatar with initials and a color based on the letters
   *
   * @example
   * // Shows "AB" avatar if image fails
   * <Image
   *   src="user.png"
   *   fallbackletters="Alice_Bob"
   *   width={48}
   *   height={48}
   * />
   */
  fallbackletters?: string;
}

/**
 * Image component with intelligent fallback handling and loading states.
 *
 * An enhanced image component designed for blockchain applications that provides graceful fallback
 * handling when images fail to load. Supports type-specific fallback images (pool logos, user avatars)
 * and generates letter-based colored avatars as a last resort. Features loading skeletons for better UX.
 *
 * **Features:**
 * - Automatic fallback handling with multiple fallback strategies
 * - Loading skeleton during image load
 * - Type-specific fallback images (pool, user/DRep, asset)
 * - Letter-based colored avatar generation using initials
 * - Color generation based on letter combinations (consistent colors per name)
 * - Supports all standard HTML img attributes
 * - Responsive width option (fullWidth)
 * - Smart initial extraction (first letter, or first + after underscore)
 *
 * **Fallback Strategy:**
 * 1. Attempts to load primary image from `src` prop
 * 2. If fails, tries type-specific fallback image (pool/user/DRep logo)
 * 3. If still fails and `fallbackletters` provided, generates colored avatar with initials
 * 4. Shows loading skeleton during image loading
 *
 * **Letter-based Avatar Generation:**
 * - Uses first 1-2 letters from `fallbackletters` as initials
 * - Color is deterministic based on letter index sum (same name = same color)
 * - Supports underscore convention: "First_Last" → "FL"
 * - Short names (≤5 chars): uses first letter only
 * - Large images (>100px): displays in larger font
 *
 * **Common Use Cases:**
 * - Stake pool logos with fallback
 * - User/DRep avatars with initials
 * - Asset/token images
 * - NFT thumbnails with graceful degradation
 * - Profile pictures with letter avatars
 * - Entity logos in tables and lists
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - Pool logo with fallback
 * <Image
 *   src="https://example.com/pool-logo.png"
 *   type="pool"
 *   width={64}
 *   height={64}
 *   alt="Pool Logo"
 * />
 *
 * // User avatar with letter fallback
 * <Image
 *   src="https://example.com/avatar.jpg"
 *   type="user"
 *   fallbackletters="Alice_Bob"
 *   width={48}
 *   height={48}
 *   alt="User Avatar"
 *   className="rounded-max"
 * />
 *
 * // Asset image with letter-based fallback only
 * <Image
 *   src="https://example.com/token.png"
 *   type="asset"
 *   fallbackletters="MYTOKEN"
 *   width={32}
 *   height={32}
 *   alt="Token"
 * />
 *
 * // DRep avatar with initials
 * <Image
 *   src="/drep-avatar.png"
 *   type="user"
 *   fallbackletters="John_Doe"
 *   width={64}
 *   height={64}
 *   className="rounded-max"
 * />
 * // If image fails, shows "JD" avatar with consistent color
 *
 * // Full width responsive image
 * <Image
 *   src="/banner.jpg"
 *   fullWidth={true}
 *   height={200}
 *   alt="Banner"
 * />
 *
 * // Pool logo in table cell
 * <Image
 *   src={`https://cdn.example.com/pool/${poolId}.png`}
 *   type="pool"
 *   fallbackletters={poolTicker}
 *   width={40}
 *   height={40}
 *   className="rounded-m"
 * />
 *
 * // Large avatar with big initials
 * <Image
 *   src="/profile.jpg"
 *   type="user"
 *   fallbackletters="Alice_Smith"
 *   width={120}
 *   height={120}
 *   className="rounded-max"
 * />
 * // Shows large "AS" if image fails (text-display-lg font)
 *
 * // NFT image with graceful fallback
 * <Image
 *   src={nftImageUrl}
 *   type="asset"
 *   fallbackletters={nftName}
 *   width={200}
 *   height={200}
 *   className="rounded-l"
 *   alt={nftName}
 * />
 *
 * // With all standard img props
 * <Image
 *   src="/logo.png"
 *   type="pool"
 *   width={64}
 *   height={64}
 *   alt="Logo"
 *   title="Pool Logo"
 *   loading="lazy"
 *   onClick={() => console.log("Clicked")}
 *   className="cursor-pointer hover:opacity-80"
 * />
 * ```
 *
 * @param {ImageProps} props - Component props
 * @param {string} [props.src] - Image source URL
 * @param {"asset" | "pool" | "user"} [props.type] - Entity type for fallback strategy
 * @param {boolean} [props.fullWidth] - If true, width is 100%
 * @param {string} [props.fallbackletters] - Letters for avatar generation on failure
 * @param {number} [props.width] - Image width in pixels
 * @param {number} [props.height] - Image height in pixels
 * @param {string} [props.alt] - Alt text for accessibility
 * @param {string} [props.className] - CSS classes (supports rounded-max detection)
 * @returns {JSX.Element} An image with intelligent fallback handling and loading state
 */
export const Image: React.FC<ImageProps> = props => {
  const [src, setSrc] = useState(props.src);
  const [loading, setLoading] = useState(true);
  const [fallbackElement, setFallbackElement] =
    useState<React.ReactNode | null>(null);
  const letters = props.fallbackletters ?? "";
  const fallbackLettersIndexSum =
    letters
      ?.split("")
      .reduce(
        (acc, curr) => acc + alphabetWithNumbers.indexOf(curr.toLowerCase()),
        0,
      ) || 0;

  const renderFallbackName = () => {
    if (letters?.length <= 5) {
      return letters[0];
    } else if (letters.includes("_")) {
      return letters[0] + letters[letters.indexOf("_") + 1];
    } else {
      return letters[0] + letters[1];
    }
  };

  const returnFallback = () => {
    switch (props.type) {
      case "asset":
        return null;
      case "pool":
        return PoolFallback;
      case "user":
        return DrepFallback;
      default:
        return null;
    }
  };

  useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  useEffect(() => {
    const loadImage = (url: string, fallbackUrl: string) =>
      new Promise((resolve, reject) => {
        const image = new window.Image();

        image.src = url;

        image.addEventListener("load", () => {
          resolve(image);
        });

        image.addEventListener("error", error => {
          if (!fallbackUrl || image.src === fallbackUrl) {
            reject(error);
            if (!fallbackUrl && props.fallbackletters) {
              setFallbackElement(
                <div
                  className={`flex ${props.className?.includes("rounded-max") ? "rounded-max" : "rounded-m"} shrink-0 items-center justify-center bg-primary ${props.height && Number(props.height) > 100 ? "text-display-lg" : "text-[18px]"} font-bold uppercase text-background`}
                  style={{
                    height: props.height + "px",
                    width: props.fullWidth ? "100%" : props.width + "px",
                    filter: `hue-rotate(${fallbackLettersIndexSum * 10}deg)`,
                  }}
                >
                  {renderFallbackName()}
                </div>,
              );
            }
            setLoading(false);
          } else {
            setLoading(false);
            setSrc(fallbackUrl);
          }
        });
      });

    setLoading(true);

    loadImage(props.src || "", returnFallback() || "")
      .catch(() => {
        setSrc(returnFallback() || "");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.src]);

  if (loading) {
    return (
      <LoadingSkeleton
        height={props.height + "px"}
        width={props.fullWidth ? "100%" : props.width + "px"}
        className={props.className}
        rounded={props.className?.includes("rounded-max") ? "full" : "md"}
      />
    );
  }

  if (fallbackElement) {
    return fallbackElement;
  }

  return <img key={props.src} {...props} src={src} />;
};
