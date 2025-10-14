import type { StateCreator, UseBoundStore, StoreApi } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export function handleCreateStore<T extends object, U extends object>(
  name: string,
  state: T,
  actions: StateCreator<
    T,
    [["zustand/devtools", never], ["zustand/immer", never]],
    [["zustand/immer", never], ["zustand/devtools", never]],
    U
  >,
): UseBoundStore<StoreApi<T & U>> {
  const store = create<T & U>()(
    devtools(
      immer((...a) => Object.assign({}, state, (actions as any)(...a))),
      { name },
    ),
  );
  return store as unknown as UseBoundStore<StoreApi<T & U>>;
}
