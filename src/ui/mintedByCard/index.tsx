import type { FC } from "react";

import { CircleHelp, GitCompareArrows } from "lucide-react";

import { type MiscConstResponseData } from "@/types/miscTypes";
import type { PoolInfo } from "@/types/poolTypes";
import { formatNumberWithSuffix, formatString } from "@/utils/format";
import { Link } from "@tanstack/react-router";
import { Copy } from "../copy";
import { Image } from "../image";
import { ProtocolDot } from "../protocolDot";
import { Tooltip } from "../tooltip";

/**
 * Props for the MintedByCard component
 */
export interface BlockDetailMintedProps {
  /**
   * Optional icon URL to display
   */
  icon?: string;
  /**
   * VRF (Verifiable Random Function) key for the block
   */
  vrfKey?: string;
  /**
   * Protocol major version number
   */
  protoMajor?: number;
  /**
   * Protocol minor version number
   */
  protoMinor?: number;
  /**
   * Optional operational certificate counter
   */
  opCounter?: number;
  /**
   * Stake pool information
   */
  poolInfo: PoolInfo;
  /**
   * Whether this is a genesis block
   */
  isGenesisBlock: boolean;
  /**
   * Miscellaneous constants data for protocol information
   */
  miscData: MiscConstResponseData | undefined;
  /**
   * Function to generate image URLs for pool icons
   *
   * @param ident - Pool identifier
   * @param size - Image size variant
   * @param type - Entity type (pool, token, etc.)
   * @returns Image URL string
   */
  generateImageUrl: (
    ident: string,
    size: "ico" | "sm" | "md" | "lg",
    type?: "nft" | "pool" | "drep" | "token" | "cc",
  ) => string;
}

/**
 * MintedByCard displays information about the stake pool that minted a block.
 *
 * A card component showing the stake pool details that produced a specific block,
 * including pool name, ticker, protocol version, and VRF key. Handles both regular
 * blocks and genesis blocks with special display.
 *
 * **Common Use Cases:**
 * - Block detail pages
 * - Block explorer information cards
 * - Stake pool attribution display
 * - Protocol version tracking
 * - VRF key information display
 *
 * @component
 * @example
 * ```tsx
 * // Regular block minted by stake pool
 * <MintedByCard
 *   poolInfo={{
 *     id: "pool1abc...",
 *     meta: {
 *       name: "My Stake Pool",
 *       ticker: "MSP"
 *     }
 *   }}
 *   isGenesisBlock={false}
 *   vrfKey="vrf1xyz..."
 *   protoMajor={8}
 *   protoMinor={0}
 *   miscData={miscData}
 *   generateImageUrl={generateImageUrl}
 * />
 *
 * // Genesis block (special case)
 * <MintedByCard
 *   poolInfo={emptyPoolInfo}
 *   isGenesisBlock={true}
 *   miscData={miscData}
 *   generateImageUrl={generateImageUrl}
 * />
 *
 * // With custom icon
 * <MintedByCard
 *   poolInfo={poolInfo}
 *   isGenesisBlock={false}
 *   icon="https://example.com/icon.png"
 *   vrfKey="vrf1..."
 *   protoMajor={9}
 *   protoMinor={1}
 *   miscData={miscData}
 *   generateImageUrl={generateImageUrl}
 * />
 * ```
 *
 * @param {BlockDetailMintedProps} props - Component props
 * @param {PoolInfo} props.poolInfo - Stake pool information
 * @param {boolean} props.isGenesisBlock - Genesis block flag
 * @param {MiscConstResponseData} [props.miscData] - Protocol constants data
 * @param {Function} props.generateImageUrl - Image URL generator
 * @param {string} [props.icon] - Optional custom icon
 * @param {string} [props.vrfKey] - VRF key
 * @param {number} [props.protoMajor] - Protocol major version
 * @param {number} [props.protoMinor] - Protocol minor version
 * @param {number} [props.opCounter] - Operational certificate counter
 * @returns {JSX.Element} Card displaying block minting information
 */
export const MintedByCard: FC<BlockDetailMintedProps> = ({
  icon,
  vrfKey,
  protoMajor,
  protoMinor,
  opCounter,
  poolInfo,
  isGenesisBlock = false,
  miscData,
  generateImageUrl,
}) => {
  return (
    <div
      className={`flex ${opCounter !== undefined ? "max-h-[130px] min-h-[130px]" : "max-h-[110px] min-h-[110px]"} w-full flex-col gap-1/2 rounded-l border border-border bg-cardBg px-2 py-1.5 shadow-md`}
    >
      <div className='flex w-full items-center gap-1'>
        <div className='rounded-m border border-border p-1/2'>
          <GitCompareArrows size={20} className='text-primary' />
        </div>
        <span className='text-text-sm text-grayTextPrimary'>Minted by</span>
      </div>
      <div className='flex w-full items-center gap-1.5'>
        {icon && <img src={icon} alt='Cexplorer' width={28} height={28} />}
        {/* <PoolCell fontSize='18px' poolInfo={poolInfo} /> */}
        {isGenesisBlock ? (
          <p className='block max-h-10 min-h-5 w-full overflow-hidden text-ellipsis whitespace-nowrap break-all text-text-md font-bold'>
            Genesis block
          </p>
        ) : (
          <Link
            to='/pool/$id'
            params={{ id: poolInfo.id }}
            className='flex w-full items-center gap-1'
          >
            <Image
              src={generateImageUrl(poolInfo.id, "ico", "pool")}
              type='pool'
              height={25}
              width={25}
              className='rounded-max'
            />
            <p
              className={`block max-h-10 min-h-5 w-full overflow-hidden text-ellipsis whitespace-nowrap break-all text-text-md font-bold hover:text-text`}
            >
              {poolInfo.meta?.name
                ? `[${poolInfo.meta.ticker}] ${poolInfo.meta?.name}`
                : formatString(poolInfo.id, "long")}
            </p>
          </Link>
        )}
      </div>
      {vrfKey && (
        <div className='flex w-full flex-col gap-1/2'>
          {protoMajor && (
            <div className='flex items-center gap-1'>
              <span className='flex items-center gap-1 text-text-sm text-grayTextPrimary'>
                Protocol version
                <ProtocolDot
                  miscData={miscData}
                  protNo={Number(`${protoMajor}.${protoMinor}`)}
                />
                {protoMajor}
                {protoMinor ? `.${protoMinor}` : ""}, VRF Key
              </span>
              <Tooltip
                content={
                  <div className='inline-block w-[200px] max-w-xs md:w-full xl:flex xl:max-w-full xl:items-center xl:gap-2'>
                    <span className='break-words pr-1 xl:break-normal xl:pr-0'>
                      {vrfKey}
                    </span>
                    <Copy copyText={vrfKey} className='inline' />
                  </div>
                }
              >
                <CircleHelp size={12} className='h-full text-grayTextPrimary' />
              </Tooltip>
            </div>
          )}
          {opCounter !== undefined && (
            <span className='flex items-center gap-1 text-text-sm text-grayTextPrimary'>
              Op Counter:{" "}
              <Tooltip content={opCounter.toLocaleString()}>
                <span>{formatNumberWithSuffix(opCounter, true, 2)}</span>
              </Tooltip>
            </span>
          )}
        </div>
      )}
    </div>
  );
};
