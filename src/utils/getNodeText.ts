/**
 * Recursively extracts text content from React nodes.
 *
 * Traverses through React element tree and concatenates all text content,
 * ignoring JSX structure. Useful for extracting plain text from complex
 * React components for display or processing.
 *
 * @param {any} node - React node to extract text from (string, number, array, or React element)
 * @returns {string | number | undefined} Extracted text content
 *
 * @example
 * ```tsx
 * getNodeText("Simple text")
 * // Returns: "Simple text"
 * ```
 *
 * @example
 * ```tsx
 * getNodeText(<div><span>Hello</span> <strong>World</strong></div>)
 * // Returns: "Hello World"
 * ```
 *
 * @example
 * ```tsx
 * getNodeText([<span>First</span>, " ", <span>Second</span>])
 * // Returns: "First Second"
 * ```
 *
 * @example
 * ```tsx
 * getNodeText(<div><img src="..." />Text content</div>)
 * // Returns: "Text content"
 * ```
 */
export const getNodeText = node => {
  if (["string", "number"].includes(typeof node)) {
    return node;
  }
  if (node instanceof Array) {
    return node.map(getNodeText).join("");
  }

  if (typeof node === "object" && node) {
    return getNodeText(node.props.children);
  }
};
