import { useState, useEffect } from "react";

/**
 * Window dimensions object containing width and height.
 *
 * @interface WindowDimensions
 */
interface WindowDimensions {
  /**
   * Window width in pixels.
   */
  width: number;
  /**
   * Window height in pixels.
   */
  height: number;
}

/**
 * Gets current window dimensions with SSR fallback.
 *
 * Returns default dimensions (1200x800) during server-side rendering
 * when window object is not available.
 *
 * @returns {WindowDimensions} Current window width and height
 *
 * @example
 * ```tsx
 * const dimensions = getWindowDimensions()
 * // Returns: { width: 1920, height: 1080 }
 * ```
 */
function getWindowDimensions(): WindowDimensions {
  if (typeof window === "undefined") {
    return {
      width: 1200,
      height: 800,
    };
  }
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * React hook that tracks window dimensions with automatic updates on resize.
 *
 * Provides current window width and height with real-time updates when the
 * browser window is resized. Safe for server-side rendering with default
 * fallback dimensions.
 *
 * @returns {WindowDimensions} Current window dimensions object
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const { width, height } = useWindowDimensions()
 *
 *   return (
 *     <div>
 *       <p>Window size: {width}x{height}px</p>
 *       {width < 768 && <MobileNav />}
 *       {width >= 768 && <DesktopNav />}
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * function TransactionTable() {
 *   const { width } = useWindowDimensions()
 *   const isMobile = width < 768
 *
 *   return (
 *     <table>
 *       <thead>
 *         <tr>
 *           <th>Hash</th>
 *           <th>Amount</th>
 *           {!isMobile && <th>Time</th>}
 *           {!isMobile && <th>Block</th>}
 *         </tr>
 *       </thead>
 *       <tbody>
 *         {transactions.map(tx => (
 *           <tr key={tx.hash}>
 *             <td>{tx.hash}</td>
 *             <td>{tx.amount}</td>
 *             {!isMobile && <td>{tx.time}</td>}
 *             {!isMobile && <td>{tx.block}</td>}
 *           </tr>
 *         ))}
 *       </tbody>
 *     </table>
 *   )
 * }
 * ```
 *
 * @example
 * ```tsx
 * function PoolDashboard() {
 *   const { width, height } = useWindowDimensions()
 *   const chartHeight = height - 200 // Reserve space for header/footer
 *
 *   return (
 *     <div>
 *       <h1>Stake Pool Performance</h1>
 *       <Chart
 *         width={width}
 *         height={chartHeight}
 *         data={poolData}
 *       />
 *     </div>
 *   )
 * }
 * ```
 */
export function useWindowDimensions(): WindowDimensions {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    const controller = new AbortController();
    const signal = controller.signal;

    window.addEventListener("resize", handleResize, { signal });
    return () => {
      controller.abort();
    };
  }, []);

  return windowDimensions;
}
