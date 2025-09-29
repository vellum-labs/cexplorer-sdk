/**
 * @fileoverview Main entry point for the Cexplorer UI Component Library
 *
 * This library provides a comprehensive set of React components with built-in
 * theme support, including tables, pagination, buttons, and utility functions.
 *
 * @example
 * ```tsx
 * import { Button, ThemeProvider, GlobalTable } from '@vellumlabs/cexplorer-sdk';
 * import '@vellumlabs/cexplorer-sdk/styles';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="light">
 *       <Button size="md" variant="primary" label="Hello World" />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */

import "./styles/globals.css";

// Theme system
export * from "./stores/theme";
export type { Theme } from "./stores/theme";

// UI Components
export * from './ui';

// Utility functions
export * from './utils/cn';
export * from './utils/createVariants';
export * from './utils/isMobileDevice';
export * from './utils/paginateArray';
export type { VariantConfig, VariantProps } from './utils/createVariants';

// Constants
export * from './constants/colors';
