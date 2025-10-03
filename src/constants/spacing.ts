/**
 * Spacing scale values for consistent layout spacing.
 *
 * Defines standardized spacing values used across the application
 * for margins, padding, and gap properties. Based on a 0.25rem (4px)
 * increment system for predictable and harmonious spacing.
 *
 * @example
 * ```tsx
 * <div style={{ padding: spacing[4], marginBottom: spacing[8] }}>
 *   Content with consistent spacing
 * </div>
 * ```
 */
export const spacing = {
  0: "var(--spacing-0)",
  "1/4": "var(--spacing-0_25)",
  "1/2": "var(--spacing-0_5)",
  1: "var(--spacing-1)",
  1.5: "var(--spacing-1_5)",
  2: "var(--spacing-2)",
  3: "var(--spacing-3)",
  4: "var(--spacing-4)",
  5: "var(--spacing-5)",
  6: "var(--spacing-6)",
  7: "var(--spacing-7)",
  8: "var(--spacing-8)",
  9: "var(--spacing-9)",
  10: "var(--spacing-10)",
  11: "var(--spacing-11)",
  12: "var(--spacing-12)",
  13: "var(--spacing-13)",
  14: "var(--spacing-14)",
  15: "var(--spacing-15)",
  16: "var(--spacing-16)",
} as const;
