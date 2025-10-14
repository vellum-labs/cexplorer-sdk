import { useThemeStore } from "@/providers/ThemeProvider";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const BreadcrumbItem = forwardRef<
  HTMLLIElement,
  ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => {
  const { theme } = useThemeStore();

  return (
    <li
      ref={ref}
      className={`inline-flex items-center gap-1 text-text-sm font-medium ${className ? className : ""} ${theme === "light" ? "text-gray-600" : "text-gray-200"}`}
      {...props}
    />
  );
});
BreadcrumbItem.displayName = "BreadcrumbItem";
