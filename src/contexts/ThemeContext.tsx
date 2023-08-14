'use client'

import { FC, useState, createContext, ReactNode } from "react";
import {
  Theme,
  ThemeContext as ThemeContextInterface,
} from "@/types/ThemeContext";

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

interface Props {
  children: ReactNode;
}

const ThemeContextProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    (window.localStorage.getItem("theme") as Theme | null) ?? "light"
  );
  const value = {
    theme,
    changeThemeTo(newTheme: Theme) {
      if (newTheme !== theme) {
        setTheme(newTheme);
        window.localStorage.setItem("theme", newTheme);
      }
    },
    switchTheme() {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      window.localStorage.setItem("theme", newTheme);
    },
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
