"use client";

/* Imports */

// react & nextjs
import { FC, ReactNode, useContext } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

// components
import { ThemeContext } from "@/contexts/ThemeContext";

// libs

// utils

// types & interfaces

// css
import styles from "./layout.module.css";

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext)!;
  return (
    <body
      style={{
        backgroundColor:
          theme === "dark"
            ? "var(--background-ultradarkcolor-dark)"
            : "var(--background-darkcolor-light)",
      }}
      className={poppins.className}
    >
      <main className={styles.main}>{children}</main>
    </body>
  );
};

export default AuthLayout;
