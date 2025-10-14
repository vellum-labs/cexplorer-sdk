import type { ReactNode } from "react";
import { Children } from "react";
import { getNodeText } from "./getNodeText";
import { isValidElement } from "react";

/**
 * Truncates a string title with ellipsis in the middle.
 *
 * Shows first 20 and last 20 characters with ellipsis between them.
 * Useful for long blockchain hashes, addresses, and identifiers.
 *
 * @param {string} title - Text to truncate
 * @param {number} [maxLength=20] - Maximum length before truncation (currently unused in logic)
 * @returns {string} Truncated string with ellipsis or original if short enough
 *
 * @example
 * ```tsx
 * truncateTitle("addr1q9xyztabcdefghijklmnopqrstuvwxyz1234567890")
 * // Returns: "addr1q9xyztabcdefgh…7890"
 * ```
 *
 * @example
 * ```tsx
 * truncateTitle("Short")
 * // Returns: "Short"
 * ```
 */
export const truncateTitle = (
  title: string,
  maxLength: number = 20,
): string => {
  if (title.length <= maxLength) return title;
  const prefixLength = 20;
  const suffixLength = 20;
  return `${title.slice(0, prefixLength)}…${title.slice(-suffixLength)}`;
};

/**
 * Recursively checks if React children contain any image elements.
 *
 * Searches through the React component tree to find img elements
 * or components with "Image" in their type name.
 *
 * @param {ReactNode} children - React children to search
 * @returns {boolean} True if any images found
 *
 * @example
 * ```tsx
 * hasImageInChildren(<div><img src="..." /><span>Text</span></div>)
 * // Returns: true
 * ```
 *
 * @example
 * ```tsx
 * hasImageInChildren(<div><span>Text only</span></div>)
 * // Returns: false
 * ```
 */
export const hasImageInChildren = (children: ReactNode): boolean => {
  let hasImage = false;

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.type === "img" || child.type?.toString().includes("Image")) {
        hasImage = true;
      } else if (child.props?.children) {
        hasImage = hasImage || hasImageInChildren(child.props.children);
      }
    }
  });

  return hasImage;
};

/**
 * Extracts all image elements from React children recursively.
 *
 * @param {ReactNode} children - React children to search
 * @returns {ReactNode[]} Array of image elements found
 */
const extractImages = (children: ReactNode): ReactNode[] => {
  const images: ReactNode[] = [];

  Children.forEach(children, child => {
    if (isValidElement(child)) {
      if (child.type === "img" || child.type?.toString().includes("Image")) {
        images.push(child);
      } else if (child.props?.children) {
        images.push(...extractImages(child.props.children));
      }
    }
  });

  return images;
};

/**
 * Processes a React node title and returns truncation information.
 *
 * Extracts text content, determines if truncation is needed (>40 chars),
 * and extracts any images from the node tree.
 *
 * @param {ReactNode} title - React node to process
 * @returns {Object} Truncation result object
 * @returns {boolean} returns.isTruncated - Whether text was truncated
 * @returns {ReactNode} returns.displayTitle - Title to display (truncated or original)
 * @returns {string} returns.fullText - Full extracted text content
 * @returns {ReactNode[]} returns.images - Array of extracted image elements
 *
 * @example
 * ```tsx
 * getTruncatedTitle("Short title")
 * // Returns: {
 * //   isTruncated: false,
 * //   displayTitle: "Short title",
 * //   fullText: "Short title",
 * //   images: []
 * // }
 * ```
 *
 * @example
 * ```tsx
 * getTruncatedTitle("Very long blockchain transaction hash 0x123456789abcdef...")
 * // Returns: {
 * //   isTruncated: true,
 * //   displayTitle: "Very long blockchain…ef...",
 * //   fullText: "Very long blockchain transaction hash 0x123456789abcdef...",
 * //   images: []
 * // }
 * ```
 */
export const getTruncatedTitle = (
  title: ReactNode,
): {
  isTruncated: boolean;
  displayTitle: ReactNode;
  fullText: string;
  images: ReactNode[];
} => {
  const textContent = String(getNodeText(title) || "");
  const images = extractImages(title);

  if (textContent.length <= 40) {
    return {
      isTruncated: false,
      displayTitle: title,
      fullText: textContent,
      images,
    };
  }

  return {
    isTruncated: true,
    displayTitle: truncateTitle(textContent),
    fullText: textContent,
    images,
  };
};
