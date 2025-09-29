export type VariantProps<T extends (...args: any) => any> = T extends (props?: infer P) => any
  ? P extends { className?: string }
    ? Omit<P, "className">
    : P
  : never;
