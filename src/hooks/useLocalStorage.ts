import { useCallback, useSyncExternalStore } from "react";

export function useLocalStorage(key: string) {
  const state = useSyncExternalStore(
    (listener) => {
      window.addEventListener("local-storage", listener);
      return () => {
        window.removeEventListener("local-storage", listener);
      };
    },
    () => {
      return localStorage.getItem(key);
    }
  );
  const setState = useCallback(
    (item: string) => {
      localStorage.setItem(key, item);
      window.dispatchEvent(new Event("local-storage"));
    },
    [key]
  );

  return [state, setState] as const;
}
