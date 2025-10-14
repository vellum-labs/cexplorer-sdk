import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react";

export const BreadcrumbRaw = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"nav"> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />);
BreadcrumbRaw.displayName = "Breadcrumb";
