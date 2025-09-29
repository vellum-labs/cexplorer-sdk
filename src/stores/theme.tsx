import { createContext, useContext, useState, useEffect, ReactNode } from "react";

/**
 * Available theme options for the application
 */
export type Theme = "light" | "dark";

/**
 * Theme context interface providing theme state and controls
 */
interface ThemeContextType {
  /** Current active theme */
  theme: Theme;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Function to set a specific theme */
  setTheme: (theme: Theme) => void;
}

/**
 * React context for managing theme state across the application
 * @internal
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook to access theme state and controls.
 * Must be used within a ThemeProvider component.
 *
 * @returns Theme context object containing current theme and control functions
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, toggleTheme, setTheme } = useThemeStore();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {theme}</p>
 *       <button onClick={toggleTheme}>Toggle Theme</button>
 *       <button onClick={() => setTheme("dark")}>Set Dark</button>
 *     </div>
 *   );
 * }
 * ```
 */
export const useThemeStore = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeStore must be used within ThemeProvider");
  }
  return context;
};

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** Child components that will have access to theme context */
  children: ReactNode;
  /** Initial theme to use if no theme is stored in localStorage */
  defaultTheme?: Theme;
}

/** Local storage key for persisting theme preference */
const CEXPLORER_SDK_THEME = "cexplorer_sdk_theme";

/**
 * Provides theme context to child components with automatic persistence.
 * Manages theme state, localStorage persistence, and DOM attribute updates.
 *
 * @param props - Component props
 * @param props.children - Child components
 * @param props.defaultTheme - Default theme if none is stored (defaults to "dark")
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="light">
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Automatically sets `data-theme` attribute on document.documentElement
 * - Persists theme preference in localStorage
 * - Restores theme from localStorage on mount
 */
export const ThemeProvider = ({ children, defaultTheme = "dark" }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(
    (() => {
      const storedTheme = localStorage.getItem(CEXPLORER_SDK_THEME) as Theme | null;

      if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
        return storedTheme;
      }

      return defaultTheme;
    })()
  );

  /**
   * Updates the theme and persists it to localStorage
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem(CEXPLORER_SDK_THEME, newTheme);
  };

  /**
   * Toggles between light and dark themes
   */
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
