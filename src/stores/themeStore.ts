import { handlePersistStore } from "../lib/handlePersistStore";

export const useThemeStore = handlePersistStore<{ theme: "light" | "dark" }, { toggleTheme: () => void }>(
  "cexplorer_sdk_theme_store",
  { theme: "dark" },
  (set) => ({
    toggleTheme: () =>
      set((state) => {
        state.theme = state.theme === "light" ? "dark" : "light";
      }),
  })
);
