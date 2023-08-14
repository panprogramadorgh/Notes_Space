"use client";

/* Imports */

// react & nextjs
import { FC, ReactNode } from "react";

// components
import ThemeContextProvider from "@/contexts/ThemeContext";

// libs

// utils

// types & interfaces

// css
import "@/styles/globals.css";

interface Props {
  children: ReactNode;
}

const AuthPagesLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </html>
  );
};

export default AuthPagesLayout;
