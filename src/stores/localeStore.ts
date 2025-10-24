import { handlePersistStore } from "@/lib/handlePersiststore";
import { type Locales } from "@/types/commonTypes";

export const useLocaleStore = handlePersistStore<
  { locale: Locales },
  { setLocale: (value: Locales) => void }
>("locale_store", { locale: "en" }, set => ({
  setLocale: (value: Locales) =>
    set(state => {
      state.locale = value;
    }),
}));
