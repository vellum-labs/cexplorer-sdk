export type NavigationOptions = {
  label: React.ReactNode;
  href?: string;
  params?: Record<string, string>;
  onClick?: any;
  nestedOptions?: NavigationOptions;
  divider?: boolean;
}[];
