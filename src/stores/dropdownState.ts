import { handleCreateStore } from "@/lib/handleCreateStore";

/**
 * Zustand store for managing global dropdown state.
 *
 * Ensures only one dropdown is open at a time by tracking the currently open dropdown's ID.
 * When a dropdown opens, it sets its ID here, automatically closing any other open dropdown.
 *
 * @example
 * ```tsx
 * // In a Dropdown component
 * const { openId, setOpenId } = useDropdownState();
 *
 * const handleOpen = () => {
 *   setOpenId("my-dropdown-id"); // Closes other dropdowns
 * };
 *
 * const isOpen = openId === "my-dropdown-id";
 * ```
 *
 * @example
 * ```tsx
 * // Close all dropdowns
 * const { setOpenId } = useDropdownState();
 * setOpenId(null);
 * ```
 */
export const useDropdownState = handleCreateStore<
  { openId: string | null },
  { setOpenId: (openId: string | null) => void }
>("dropdown_state", { openId: null }, set => ({
  setOpenId: (openId: string | null) =>
    set(state => {
      state.openId = openId;
    }),
}));
