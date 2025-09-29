import type { VariantProps } from "./common";

import { buttonVariants } from "@/constants/buttonVariants";

export interface PaginationProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
