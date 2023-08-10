"use client";

import { CSSProperties, FC, ReactNode, MouseEventHandler } from "react";

interface Props {
  children: ReactNode;
  hoverMessage?: string;
  callback?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

const Button: FC<Props> = ({ children, hoverMessage, callback, style }) => {
  const buttonStyles: CSSProperties = Object.assign(
    {
      width: "100%",
      backgroundColor: "var(--main-color)",
      padding: "16px",
      borderRadius: "var(--border-radius)",
      color: "var(--text-color-dark)",
      border: "none",
      outline: "none",
    },
    style ?? {}
  );
  return (
    <button style={buttonStyles} onClick={callback}>
      {children}
    </button>
  );
};

export default Button;
