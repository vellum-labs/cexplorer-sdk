import WebsiteIcon from "@/resources/images/icons/website.svg";
import type { PoolInfo } from "@/types/poolTypes";
import { Copy } from "@/ui/copy";
import { Image } from "@/ui/image";
import { SafetyLinkModal } from "@/ui/safetyLinkModal";
import { Tooltip } from "@/ui/tooltip";
import { buildSocialIcons } from "@/utils/buildSocialIcons";
import { formatString } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { CircleEllipsis } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

/**
 * Props for the PoolCell component
 */
export interface PoolCellProps {
  /**
   * Pool information object containing pool details and metadata
   *
   * @example
   * <PoolCell poolInfo={{
   *   id: "pool1abc...",
   *   meta: { ticker: "ADA", name: "My Pool" }
   * }} />
   */
  poolInfo: PoolInfo;

  /**
   * URL for the pool's icon/logo image (optional)
   * Pass the result of generateImageUrl() from the parent component
   *
   * @example
   * <PoolCell
   *   poolInfo={poolInfo}
   *   poolImageUrl={generateImageUrl(poolInfo.id, "ico", "pool")}
   * />
   */
  poolImageUrl?: string;

  /**
   * Width of the component (optional)
   */
  width?: number;

  /**
   * Additional CSS classes for styling (optional)
   */
  className?: string;

  /**
   * Font size for the pool name/ticker (optional)
   * @default "text-sm"
   */
  fontSize?: string;

  /**
   * Whether to crop/truncate the pool hash (optional)
   * @default true
   */
  cropPoolHash?: boolean;
}

/**
 * PoolCell displays Cardano staking pool information with icon, ticker, name, and pool ID.
 *
 * Shows pool details including an optional pool icon/logo, ticker symbol in brackets,
 * pool name, and the pool ID hash (with copy functionality). Also displays social media
 * icons if available in the pool's extended metadata.
 *
 * **Common Use Cases:**
 * - Pool listings and directories
 * - Delegation interfaces
 * - Pool search results
 * - Pool comparison tables
 * - Stake pool analytics dashboards
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <PoolCell poolInfo={poolInfo} />
 *
 * // With pool image
 * <PoolCell
 *   poolInfo={poolInfo}
 *   poolImageUrl={generateImageUrl(poolInfo.id, "ico", "pool")}
 * />
 *
 * // With custom styling and full pool hash
 * <PoolCell
 *   poolInfo={poolInfo}
 *   poolImageUrl={generateImageUrl(poolInfo.id, "ico", "pool")}
 *   className="my-4"
 *   fontSize="text-base"
 *   cropPoolHash={false}
 * />
 * ```
 *
 * @param {PoolCellProps} props - Component props
 * @param {PoolInfo} props.poolInfo - Pool information object containing pool details and metadata
 * @param {string} [props.poolImageUrl] - URL for the pool's icon/logo image
 * @param {number} [props.width] - Width of the component
 * @param {string} [props.className] - Additional CSS classes for styling
 * @param {string} [props.fontSize="text-sm"] - Font size for the pool name/ticker
 * @param {boolean} [props.cropPoolHash=true] - Whether to crop/truncate the pool hash
 * @returns {JSX.Element} Pool information display with icon, ticker, name, and ID
 */
export const PoolCell = ({
  poolInfo,
  poolImageUrl,
  className,
  fontSize = "text-sm",
  cropPoolHash = true,
}: PoolCellProps) => {
  const id = poolInfo?.id;
  const ticker = poolInfo?.meta?.ticker;
  const name = poolInfo?.meta?.name;
  const extended = poolInfo?.meta?.extended;
  const homepage = poolInfo?.meta?.homepage;

  const socialIcons = buildSocialIcons(extended);

  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");

  if (!id)
    return (
      <p className="className='block text-primary' w-fit max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        -
      </p>
    );

  return (
    <div
      className={`relative flex max-h-[75px] w-full items-center gap-1 ${className}`}
    >
      {ticker && poolImageUrl && (
        <Link to='/pool/$id' params={{ id: poolInfo.id }}>
          <Image
            key={poolInfo.id}
            src={poolImageUrl}
            type='pool'
            className='h-8 w-8 rounded-max'
            height={32}
            width={32}
          />
        </Link>
      )}
      <div
        className={`flex ${ticker ? "w-[calc(100%-40px)]" : "w-full"} flex-col`}
      >
        <Link
          to='/pool/$id'
          params={{ id: poolInfo.id }}
          title={poolInfo.id}
          className={`block w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[${fontSize}] leading-[1.1] text-primary hover:text-primaryHover`}
        >
          {ticker && `[${ticker}] `}
          {name && name}
        </Link>
        <div className='flex w-fit items-center gap-1'>
          {socialIcons.length > 0 && !showSafetyModal && (
            <Tooltip
              content={
                <div className='flex gap-1.5'>
                  {homepage && (
                    <button
                      onClick={e => {
                        e.preventDefault();
                        setSelectedUrl(homepage);
                        setShowSafetyModal(true);
                      }}
                      title='Website'
                      className='cursor-pointer border-none bg-transparent p-0'
                    >
                      <img src={WebsiteIcon} alt='Website' width={14} />
                    </button>
                  )}
                  {socialIcons.map((social, index) => (
                    <button
                      key={index}
                      onClick={e => {
                        e.preventDefault();
                        setSelectedUrl(social.url);
                        setShowSafetyModal(true);
                      }}
                      title={social.alt}
                      className='cursor-pointer border-none bg-transparent p-0'
                    >
                      <img src={social.icon} alt={social.alt} width={12} />
                    </button>
                  ))}
                </div>
              }
            >
              <div className='flex items-center justify-center rounded-m bg-background'>
                <CircleEllipsis size={12} className='stroke-grayText' />
              </div>
            </Tooltip>
          )}
          <span className={`overflow-hidden text-ellipsis whitespace-nowrap ${ticker ? "text-text-xs" : "text-[13px]"} text-grayText`}>
            <Link
              to='/pool/$id'
              params={{ id: poolInfo.id }}
              className='!text-inherit hover:!text-inherit'
            >
              {cropPoolHash ? formatString(poolInfo.id, "long") : poolInfo.id}
            </Link>
          </span>
          <Copy copyText={poolInfo.id} size={10} className='stroke-grayText' />
        </div>
      </div>
      {showSafetyModal &&
        createPortal(
          <SafetyLinkModal
            url={selectedUrl}
            onClose={() => setShowSafetyModal(false)}
          />,
          document.body,
        )}
    </div>
  );
};
