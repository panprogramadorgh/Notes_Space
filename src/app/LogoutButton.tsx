"use client";
import { FC, ReactNode } from "react";
import { deleteCookie, findCookies } from "@/utils/cookies";

interface LogoutButtonProps {
  children: ReactNode;
}

const LogoutButton: FC<LogoutButtonProps> = ({ children }) => {
  if (!(findCookies() && Object.keys(findCookies()!).includes("token"))) {
    return;
  }
  const handleClick = () => {
    deleteCookie("token");
    window.location.href = "/";
  };
  return <button onClick={handleClick}>{children}</button>;
};

export default LogoutButton;
