import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

export const BreadcrumbRaw = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"nav"> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />);
BreadcrumbRaw.displayName = "Breadcrumb";
