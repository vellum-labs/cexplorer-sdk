import { cn } from "@/utils/cn";

export const BreadcrumbSeparator = ({
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role='presentation'
    aria-hidden='true'
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    /
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
