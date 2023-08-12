/* Imports */

// react & nextjs
import { FC, ReactNode } from "react";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});
// components

// libs

// utils

// types & interfaces

// css
import "@/styles/globals.css";
import styles from "./layout.module.css";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
};

export default Layout;
