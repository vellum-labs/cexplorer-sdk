import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef, forwardRef } from "react";

export const BreadcrumbPage = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role='link'
    aria-disabled='true'
    aria-current='page'
    className={cn("font-regular text-text", className)}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";
