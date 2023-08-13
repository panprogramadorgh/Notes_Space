"use client";

/* Imports */

// react & nextjs
import { useState, CSSProperties, FC, MouseEventHandler } from "react";
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
  style?: CSSProperties;
}

const SesionButton: FC<Props> = ({ size, style }) => {
  const [showLabel, setShowLabel] = useState<string>("");

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

  const handlerMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    const tokenCookie = findCookies()?.token;
    if (tokenCookie) {
      setShowLabel("Logout");
      return;
    }
    setShowLabel("Login");
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setShowLabel("");
  };

  let styleProp = style;
  if (size) {
    styleProp = { ...styleProp, width: size, height: size };
  }

  return (
    <>
      <div
        style={styleProp ? styleProp : undefined}
        className={styles.container}
        onClick={handlerClick}
        onMouseEnter={handlerMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showLabel ? <label className={styles.label}>{showLabel}</label> : null}
        <Profile className={styles.icon} />
      </div>
    </>
  );
};

export default SesionButton;
