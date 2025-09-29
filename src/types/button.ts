import type { VariantProps } from "./common";

import { buttonVariants } from "@/constants/buttonVariants";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
