import { alphabetWithNumbers } from "@/constants/alphabet";
import type { MiscBasicResponse } from "@/types/miscTypes";
import parse from "html-react-parser";
import type { FC, ReactNode } from "react";
import { Image } from "../image";

/**
 * Props for the AdCard component
 */
type AdCardProps = {
  /**
   * Additional CSS classes for styling the card
   */
  className?: string;
  /**
   * Advertisement data containing type, title, text, and link
   */
  data: MiscBasicResponse["data"]["ads"][number]["data"];
  /**
   * Function to generate image URLs for pools and assets
   *
   * @param ident - Unique identifier (pool ID or asset name)
   * @param size - Image size variant
   * @param type - Type of entity (pool, token, etc.)
   * @returns Image URL string
   *
   * @example
   * generateImageUrl("pool1abc...", "ico", "pool") // Returns pool icon URL
   */
  generateImageUrl: (
    ident: string,
    size: "ico" | "sm" | "md" | "lg",
    type?: "nft" | "pool" | "drep" | "token" | "cc",
  ) => string;
};

/**
 * AdCard displays promotional content for pools or assets.
 *
 * A card component that renders advertisement/promotional content with dynamic images
 * for Cardano pools and assets. Supports HTML content parsing and external links.
 *
 * **Common Use Cases:**
 * - Displaying stake pool promotions
 * - Showcasing featured tokens/assets
 * - Advertisement banners in carousels
 * - Promotional panels on dashboards
 *
 * @component
 * @example
 * ```tsx
 * // Pool advertisement
 * <AdCard
 *   data={{
 *     type: "pool",
 *     title: "My Stake Pool",
 *     text: "Join our reliable stake pool with 99% uptime!",
 *     link: "https://cexplorer.io/pool/pool1abc..."
 *   }}
 *   generateImageUrl={(id, size, type) => `https://example.com/${type}/${id}.${size}.png`}
 * />
 *
 * // Asset/token advertisement
 * <AdCard
 *   data={{
 *     type: "asset",
 *     title: "MYTOKEN",
 *     text: "<strong>New</strong> governance token launch!",
 *     link: "https://cexplorer.io/asset/..."
 *   }}
 *   generateImageUrl={generateImageUrl}
 *   className="custom-shadow"
 * />
 * ```
 *
 * @param {AdCardProps} props - Component props
 * @param {MiscBasicResponse["data"]["ads"][number]["data"]} props.data - Advertisement data
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} props.generateImageUrl - Function to generate entity images
 * @returns {JSX.Element} Promotional card with image, title, and description
 */
export const AdCard: FC<AdCardProps> = ({
  data,
  className,
  generateImageUrl,
}) => {
  let img: ReactNode | null = null;
  const ident = String(data.link.split("/").pop());
  const identArr = String(ident.split(""));
  const titleArr = String(data.title.split(""));

  if (data.type === "pool") {
    img = (
      <Image
        src={generateImageUrl(ident, "ico", "pool")}
        type='pool'
        height={25}
        width={25}
        className='rounded-max'
      />
    );
  } else if (data.type === "asset" && data.text) {
    img = (
      <Image
        src={generateImageUrl(ident, "ico", "token")}
        type='asset'
        height={25}
        width={25}
        className='rounded-max'
        fallbackletters={[...titleArr, ...identArr]
          .filter(char => alphabetWithNumbers.includes(char.toLowerCase()))
          .slice(0, 3)
          .join("")}
      />
    );
  }

  return (
    <a
      href={data?.link}
      target='_blank'
      className={`z-2 relative flex h-[110px] w-full flex-col gap-1/2 rounded-l border border-border bg-cardBg px-2 py-1.5 hover:text-text ${className ? className : "shadow-md"}`}
    >
      <p className='w-fit rounded-l border border-border px-1 text-text-xs font-medium'>
        {data?.type.slice(0, 1).toUpperCase() + data?.type.slice(1)}
      </p>
      <div className='flex items-center gap-1'>
        {img}
        <p
          className={`block max-h-10 min-h-5 w-full overflow-hidden text-ellipsis whitespace-nowrap break-all ${data.text ? "text-sm" : "text-text-md"} font-bold hover:text-text`}
        >
          {data?.title}
        </p>
      </div>

      <p className='block w-full overflow-hidden text-ellipsis text-text-xs leading-tight text-grayTextPrimary'>
        {parse(data?.text)}
      </p>
    </a>
  );
};
