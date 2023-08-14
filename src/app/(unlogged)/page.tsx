"use client";

/* Imports */

// react & nextjs
import { FC, useContext } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});
import { ThemeContext } from "@/contexts/ThemeContext";
// components

// libs

// utils

// types & interfaces

// css
import styles from "./page.module.css";

interface Props {}

const Home: FC<Props> = ({}) => {
  const { theme, switchTheme } = useContext(ThemeContext)!;
  return (
    <body
      style={{
        backgroundColor:
          theme === "dark"
            ? "var(--background-darkcolor-dark)"
            : "var(--background-darkcolor-light)",
      }}
      className={poppins.className}
    >
      <header className={styles[`header-${theme}`]}>
        <div className={styles.titleContainer}>
          <h1 className={styles[`title-${theme}`]}>Welcome to Notes Space</h1>
          <h2 className={styles[`subtitle-${theme}`]}>
            A simple workbench for your notes
          </h2>
        </div>
        <div className={styles.dashboardExample}>
          <h1 className={styles[`dashboardExample-${theme}`]}>
            Dashboad example component
          </h1>
        </div>
        <Link href="/dashboard">Let's start once</Link>
        <button onClick={switchTheme}>Switch Theme</button>
      </header>
      <main>
        <section>
          <h1>Section title</h1>
        </section>
      </main>
    </body>
  );
};

export default Home;
