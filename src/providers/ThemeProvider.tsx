import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Available theme options.
 */
type Theme = "light" | "dark";

/**
 * Theme context value type.
 *
 * @interface ThemeContextType
 */
interface ThemeContextType {
  /**
   * Current active theme.
   */
  theme: Theme;
  /**
   * Function to change the theme.
   *
   * @param {Theme} theme - New theme to apply
   */
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props for ThemeProvider component.
 *
 * @interface ThemeProviderProps
 */
interface ThemeProviderProps {
  /**
   * Child components to be wrapped by the theme provider.
   */
  children: ReactNode;
  /**
   * Initial theme to use on first render.
   *
   * @default "light"
   */
  defaultTheme?: Theme;
}

/**
 * Theme provider component that manages light/dark theme state.
 *
 * Automatically applies theme to document root via `data-theme` attribute.
 * All child components can access theme state via `useThemeStore` hook.
 *
 * @component
 * @example
 * ```tsx
 * // Wrap your app with ThemeProvider
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 *
 * @example
 * ```tsx
 * // Access theme in any child component
 * function MyComponent() {
 *   const { theme, setTheme } = useThemeStore();
 *
 *   return (
 *     <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
 *       Toggle Theme (Current: {theme})
 *     </button>
 *   );
 * }
 * ```
 *
 * @param {ThemeProviderProps} props - Component props
 * @returns {JSX.Element} Theme provider wrapper
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme state and setter function.
 *
 * Must be used within a ThemeProvider component.
 *
 * @throws {Error} If used outside of ThemeProvider
 * @returns {ThemeContextType} Theme state and setter
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme } = useThemeStore();
 *
 *   return (
 *     <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
 *       {theme === "light" ? "🌙 Dark" : "☀️ Light"}
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeStore() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeStore must be used within ThemeProvider");
  }
  return context;
}
