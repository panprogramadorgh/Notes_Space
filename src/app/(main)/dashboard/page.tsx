/* Imports */

// react & nextjs
import { FC } from "react";

// components
import UserCard from "./UserCard";
import CreateNoteForm from "./CreateNoteForm";

// libs

// utils

// types & interfaces

// css
import styles from "./page.module.css";

const Dashboard: FC<{}> = ({}) => {
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <UserCard />
      <CreateNoteForm />
    </div>
  );
};

export default Dashboard;
