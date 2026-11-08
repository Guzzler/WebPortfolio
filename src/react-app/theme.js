import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { track } from "../analytics";

// Same key as the old useDarkMode hook so returning visitors keep their choice.
const STORAGE_KEY = "sp:dark-mode";

const readInitial = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === "true" ? "dark" : "light";
  } catch (e) {
    /* storage blocked */
  }
  return "dark";
};

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, String(theme === "dark"));
    } catch (e) {
      /* storage blocked */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      track("Dark Mode Toggle", { mode: next });
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
