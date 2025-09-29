import { cn } from "./cn";

export const createVariants = <V extends Record<string, Record<string, string>>>(
  base: string,
  config: {
    variants: V;
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>;
  }
) => {
  return (props?: Partial<{ [K in keyof V]: keyof V[K] }> & { className?: string }) => {
    const classes = [base];

    for (const key in config.variants) {
      const value = props?.[key] ?? config.defaultVariants?.[key];
      if (value && config.variants[key][value as string]) {
        classes.push(config.variants[key][value as string]);
      }
    }

    if (props?.className) {
      classes.push(props.className);
    }

    return cn(...classes);
  };
};
