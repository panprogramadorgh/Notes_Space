"use client";

/* Imports */

// react & nextjs
import { FC, CSSProperties } from "react";
import { usePathname } from "next/navigation";
// components
import SesionButton from "@/components/SesionButton";

// libs

// utils

// types & interfaces
import type { NavigationData } from "./types";

// css
import styles from "./Navigation.module.css";
import Link from "next/link";

interface Props {}

const navigationData: NavigationData = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Chats",
    path: "/chats",
  },
];

const Navigation: FC<Props> = ({}) => {
  const currentPath = usePathname();
  return (
    <ul className={styles.container}>
      {navigationData.map(({ title, path }) => {
        const isAtCurrentPath: boolean = currentPath === path;
        const liStyle: CSSProperties | undefined = isAtCurrentPath
          ? {
              borderBottomColor: "var(--main-color)",
            }
          : undefined;
        return (
          <li key={title} className={styles.li} style={liStyle}>
            <Link className={styles.link} href={path}>
              {title}
            </Link>
          </li>
        );
      })}
      <SesionButton style={{
        position: 'absolute',
        right: '0',
        marginBottom: '5px',
        marginRight: '20px'
      }} />
    </ul>
  );
};

export default Navigation;
