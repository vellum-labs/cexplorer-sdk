import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/utils/cn";
import { ChevronRight } from "lucide-react";

export const BreadcrumbSeparator = ({
  className,
  ...props
}: React.ComponentProps<"li">) => {
  const { theme } = useThemeStore();

  return (
    <li
      role='presentation'
      aria-hidden='true'
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      <ChevronRight
        className={`h-[8px] w-[4px] ${theme === "light" ? "text-gray-300" : "text-cexdark-500"}`}
      />
    </li>
  );
};
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
