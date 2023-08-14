"use client";

import { CSSProperties, FC, ReactNode, MouseEventHandler } from "react";

interface Props {
  children: ReactNode;
  hoverMessage?: string;
  callback?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}

const Button: FC<Props> = ({ children, hoverMessage, callback, style }) => {
  return (
    <button style={style} onClick={callback}>
      {children}
    </button>
  );
};

export default Button;
