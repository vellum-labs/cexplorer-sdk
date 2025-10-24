import type { FC } from "react";
import { useEffect, useState } from "react";

import { Link } from "@tanstack/react-router";

import DarkLogoOffline from "@/resources/images/logo_darkmode_offline.svg";
import LightLogoOffline from "@/resources/images/logo_lightmode_offline.svg";
import DarkLogo from "@/resources/images/preloader_logo_dark.svg";
import LightLogo from "@/resources/images/preloader_logo_light.svg";

import { useThemeStore } from "@/stores/themeStore";
import { Badge } from "../badge";
import { EnvironmentBadge } from "../environmentBadge";

/**
 * Props for the MainLogo component
 */
export interface MainLogoProps {
  /**
   * Width of the logo in pixels
   *
   * @default 150
   * @example
   * ```tsx
   * <MainLogo size={200} network="mainnet" />
   * ```
   */
  size?: number;
  /**
   * Callback function when logo is clicked
   *
   * @example
   * ```tsx
   * <MainLogo
   *   network="mainnet"
   *   onClick={() => console.log("Logo clicked")}
   * />
   * ```
   */
  onClick?: () => void;
  /**
   * Additional CSS classes for the logo image
   *
   * @example
   * ```tsx
   * <MainLogo network="mainnet" className="opacity-80" />
   * ```
   */
  className?: string;
  /**
   * Cardano network name to display in the environment badge
   *
   * @example
   * ```tsx
   * <MainLogo network="mainnet" />
   * <MainLogo network="preprod" />
   * <MainLogo network="preview" />
   * ```
   */
  network: string;
}

/**
 * MainLogo displays the Cexplorer logo with theme support and connection status.
 *
 * This component shows the application logo that adapts to the current theme (light/dark)
 * and displays different visual states based on network connectivity. It includes a "beta"
 * badge and an environment badge showing the current Cardano network.
 *
 * **Features:**
 * - **Theme Support**: Automatically switches between light and dark logo variants
 * - **Connection Monitoring**: Displays offline logo when connection is lost
 * - **Auto-checking**: Checks connection every 30 seconds
 * - **Beta Badge**: Shows "beta" badge overlay
 * - **Environment Badge**: Displays current network (mainnet, preprod, preview)
 * - **Navigation**: Links to home page (/)
 * - **Customizable Size**: Adjustable logo width
 * - **Click Handler**: Optional onClick callback
 *
 * **Connection Detection:**
 * The component periodically checks connectivity by fetching favicon.ico with a 5-second timeout.
 * If the check fails, it switches to the offline logo variant.
 *
 * **Logo Variants:**
 * - Light theme + Online: Dark logo
 * - Light theme + Offline: Light offline logo
 * - Dark theme + Online: Light logo
 * - Dark theme + Offline: Dark offline logo
 *
 * **Common Use Cases:**
 * - Application header logo
 * - Navigation bar branding
 * - Homepage branding element
 * - Mobile menu logo
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage in header
 * <header>
 *   <MainLogo network="mainnet" />
 *   <Navigation />
 * </header>
 *
 * // With custom size
 * <MainLogo
 *   network="mainnet"
 *   size={200}
 * />
 *
 * // With click handler (e.g., for mobile menu)
 * <MainLogo
 *   network="preprod"
 *   onClick={() => {
 *     closeMobileMenu();
 *     navigateToHome();
 *   }}
 * />
 *
 * // Small logo for mobile
 * <MainLogo
 *   network="mainnet"
 *   size={100}
 *   className="md:hidden"
 * />
 *
 * // Different networks
 * <MainLogo network="mainnet" />  // Mainnet
 * <MainLogo network="preprod" />  // Preprod testnet
 * <MainLogo network="preview" />  // Preview testnet
 *
 * // In mobile navigation
 * <nav className="mobile-menu">
 *   <MainLogo
 *     network="mainnet"
 *     size={120}
 *     onClick={closeMobileMenu}
 *   />
 *   <MenuItems />
 * </nav>
 * ```
 *
 * @param {MainLogoProps} props - Component props
 * @param {number} [props.size=150] - Logo width in pixels
 * @param {() => void} [props.onClick] - Click handler callback
 * @param {string} [props.className] - Additional CSS classes for logo image
 * @param {string} props.network - Network name for environment badge
 * @returns {JSX.Element} Logo with beta badge and environment indicator, linking to home
 */
export const MainLogo: FC<MainLogoProps> = ({
  size = 150,
  onClick,
  className,
  network,
}) => {
  const { theme } = useThemeStore();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        await fetch(window.location.origin + "/favicon.ico", {
          method: "HEAD",
          cache: "no-cache",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        setIsOnline(true);
      } catch {
        setIsOnline(false);
      }
    };

    const intervalId = setInterval(checkConnection, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Link to='/' className='shrink-0' onClick={onClick}>
      <div className='relative'>
        {isOnline ? (
          <img
            className={className}
            src={theme === "light" ? DarkLogo : LightLogo}
            width={size}
            alt='Cexplorer logo'
          />
        ) : (
          <img
            className={className}
            src={theme === "light" ? LightLogoOffline : DarkLogoOffline}
            width={size}
            alt='Cexplorer logo'
          />
        )}
        <Badge
          color='blue'
          className='absolute left-[36px] top-[31px] h-5 w-5 !px-[6px] !py-[2px] !text-[10px] !font-bold'
        >
          beta
        </Badge>
        <EnvironmentBadge network={network} />
      </div>
    </Link>
  );
};
