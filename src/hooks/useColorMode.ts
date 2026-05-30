import { useCallback, useEffect, useState } from "react";

type ColorMode = "light" | "dark";

const STORAGE_KEY = "tuan-color-mode";

export default function useColorMode() {
  const [mode, setMode] = useState<ColorMode>("light");

  useEffect(() => {
    const storedMode = localStorage.getItem(STORAGE_KEY);
    const initialMode = storedMode === "dark" ? "dark" : "light";
    setMode(initialMode);
    document.documentElement.setAttribute("data-theme", initialMode);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  return { mode, toggleMode };
}
