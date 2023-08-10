/* Imports */

// react & nextjs
import { FC, ReactNode } from "react";

// components

// libs

// utils

// types & interfaces

// css

interface Props {
  children: ReactNode;
}

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <main>
      <h1>Dashboard</h1>
      {children}
    </main>
  );
};

export default DashboardLayout;
