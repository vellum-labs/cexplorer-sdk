import { type buttonVariants } from "@/constants/button";
import { type VariantProps } from "class-variance-authority";

export interface PaginationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
