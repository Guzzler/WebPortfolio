import { useCallback, useEffect, useState } from "react";
import { mixpanel } from "../../../App";

const STORAGE_KEY = "sp:dark-mode";

const readInitial = () => {
  if (typeof window === "undefined") return true;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return true;
    return stored === "true";
  } catch (e) {
    return true;
  }
};

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(readInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(darkMode));
    } catch (e) {
      /* localStorage unavailable; ignore */
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      mixpanel.track("Dark Mode Toggle", { mode: next ? "dark" : "light" });
      return next;
    });
  }, []);

  return [darkMode, toggleDarkMode, setDarkMode];
};

export default useDarkMode;
