// stores/themeStore.ts ------------------------------------------------------
import { create } from 'zustand';
import {
  persist,
  PersistStorage,
  StorageValue,
} from 'zustand/middleware';

interface ThemeState {
  dark: boolean;
  toggle: () => void;
}

/* ------------------------------------------------------------------------
   A minimal storage object that saves a *single* boolean as plain text.
   ------------------------------------------------------------------------ */
const boolStorage: PersistStorage<Pick<ThemeState, 'dark'>> = {
  getItem: (name): StorageValue<Pick<ThemeState, 'dark'>> | null => {
    if (typeof window === 'undefined') return null;       // SSR: nothing to load
    const raw = localStorage.getItem(name);
    const isDark = raw === 'true';

    return {
      state: { dark: isDark },                    // default to false
      version: 0,
    };
  },

  setItem: (name, value): void => {
    if (typeof window === 'undefined') return;            // SSR: no-op
    const bool = (value as StorageValue<Pick<ThemeState, 'dark'>>).state.dark;
    localStorage.setItem(name, String(bool));
  },

  removeItem: (name): void => {
    if (typeof window === 'undefined') return;            // SSR: no-op
    localStorage.removeItem(name);
  },
};

/* ------------------------------------------------------------------------
   The Zustand store
   ------------------------------------------------------------------------ */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      /* default while rendering on the server */
      dark: false,

      toggle: () => {
        const next = !get().dark;
        set({ dark: next });

        if (typeof document !== 'undefined') {
          document.body.classList.toggle('dark', next);
        }
      },
    }),
    {
      name: 'dark',            // key in localStorage
      storage: boolStorage,

      /* Persist *only* the "dark" boolean, not the function */
      partialize: (state) => ({ dark: state.dark }),

      /* After the real value is loaded in the browser, sync the <html> tag */
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== 'undefined') {
          document.body.classList.toggle('dark', state.dark);
        }
      },
    },
  ),
);