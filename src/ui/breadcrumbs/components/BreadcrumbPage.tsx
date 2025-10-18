import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/utils/cn";
import type { ComponentPropsWithoutRef} from "react";
import { forwardRef } from "react";

export const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => {
  const { theme } = useThemeStore();
  return (
    <span
      ref={ref}
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn(
        "text-text-sm font-medium",
        theme === "light" ? "text-gray-600" : "text-gray-200",
        className,
      )}
      {...props}
    />
  );
});
BreadcrumbPage.displayName = "BreadcrumbPage";
