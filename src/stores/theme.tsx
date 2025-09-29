import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeStore = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeStore must be used within ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

const CEXPLORER_SDK_THEME = "cexplorer_sdk_theme";

export const ThemeProvider = ({ children, defaultTheme = "dark" }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(
    (() => {
      const defaultFromStorage = localStorage.getItem(CEXPLORER_SDK_THEME) as Theme | undefined;

      if (defaultFromStorage) {
        return defaultFromStorage;
      }

      return defaultTheme;
    })()
  );

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem(CEXPLORER_SDK_THEME, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
