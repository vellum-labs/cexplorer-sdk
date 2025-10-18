import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const BreadcrumbList = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-text-sm text-grayTextPrimary",
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";
