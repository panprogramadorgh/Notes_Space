"use client";
import { FC } from "react";
import Link from "next/link";
import { findCookies } from "@/utils/cookies";

interface LogoutButtonProps {
  messages: [string, string];
}

const LogoutButton: FC<LogoutButtonProps> = ({ messages }) => {
  if (!(findCookies() && Object.keys(findCookies()!).includes("token"))) {
    // the user is not logged
    return <Link href="/auth/login">{messages[0]}</Link>;
  }
  // the user is logged
  return (
    <Link
      onClick={(e) => {
        const condition = window.confirm("Are you sure you want to log-out ?");
        if (!condition) {
          e.preventDefault();
        }
      }}
      href="/auth/login"
    >
      {messages[1]}
    </Link>
  );
};

export default LogoutButton;
