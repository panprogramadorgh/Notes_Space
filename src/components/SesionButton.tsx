"use client";

/* Imports */

// react & nextjs
import { FC, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
// components
import { Profile } from "@/svg";

// libs

// utils
import { findCookies } from "@/utils/cookies";

// types & interfaces

// css
import styles from "@/styles/SesionButton.module.css";

interface Props {
  size?: `${number}px`;
}

const SesionButton: FC<Props> = ({ size }) => {
  const router = useRouter();
  const handlerClick: MouseEventHandler<HTMLDivElement> = () => {
    const tokenCookie = findCookies()?.token;
    if (tokenCookie) {
      if (!window.confirm("Are you sure, you want to close the session ?")) {
        return;
      }
    }
    router.push("/auth/login");
  };
  return (
    <div
      style={size && { width: size, height: size }}
      className={styles.container}
      onClick={handlerClick}
    >
      <Profile className={styles.icon} />
    </div>
  );
};

export default SesionButton;
