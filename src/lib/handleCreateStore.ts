import type { StateCreator, UseBoundStore, StoreApi } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

/**
 * Factory function for creating Zustand stores with devtools and immer middleware.
 *
 * Automatically wraps stores with:
 * - Devtools middleware for Redux DevTools integration
 * - Immer middleware for immutable state updates with mutable syntax
 *
 * @template T - State object type
 * @template U - Actions object type
 * @param {string} name - Store name displayed in Redux DevTools
 * @param {T} state - Initial state object
 * @param {StateCreator<T, ..., U>} actions - Action creator function receiving `set` and `get`
 * @returns {UseBoundStore<StoreApi<T & U>>} Zustand store hook combining state and actions
 *
 * @example
 * ```tsx
 * // Create a counter store
 * export const useCounterStore = handleCreateStore<
 *   { count: number },
 *   { increment: () => void; decrement: () => void }
 * >(
 *   "counter_store",
 *   { count: 0 },
 *   set => ({
 *     increment: () => set(state => { state.count += 1; }),
 *     decrement: () => set(state => { state.count -= 1; }),
 *   })
 * );
 *
 * // Usage in component
 * const { count, increment } = useCounterStore();
 * ```
 *
 * @example
 * ```tsx
 * // Create a theme store
 * export const useThemeStore = handleCreateStore<
 *   { theme: "light" | "dark" },
 *   { setTheme: (theme: "light" | "dark") => void }
 * >(
 *   "theme_store",
 *   { theme: "light" },
 *   set => ({
 *     setTheme: (theme) => set(state => { state.theme = theme; }),
 *   })
 * );
 * ```
 */
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
