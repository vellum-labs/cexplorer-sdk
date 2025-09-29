/**
 * Detects if the current device is a mobile device based on the user agent string.
 *
 * @returns `true` if the device is identified as mobile, `false` otherwise
 *
 * @example
 * ```tsx
 * if (isMobileDevice()) {
 *   // Show mobile-specific UI
 * }
 * ```
 *
 * @remarks
 * This function checks for common mobile device identifiers in the user agent string.
 * It includes phones, tablets, and other mobile devices from major manufacturers.
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};
