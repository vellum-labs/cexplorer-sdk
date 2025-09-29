import type { ButtonProps } from "@/types/button";

import { Slot } from "@radix-ui/react-slot";

import { buttonVariants } from "@/constants/buttonVariants";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = "Button";
