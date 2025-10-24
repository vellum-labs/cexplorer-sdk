import { handlePersistStore } from "@/lib/handlePersiststore";
import { type Currencies } from "@/types/commonTypes";

export const useCurrencyStore = handlePersistStore<
  { currency: Currencies },
  { setCurrency: (value: Currencies) => void }
>("currency_store", { currency: "usd" }, set => ({
  setCurrency: (value: Currencies) =>
    set(state => {
      state.currency = value;
    }),
}));
