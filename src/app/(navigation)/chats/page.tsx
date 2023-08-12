/* Imports */

// react & nextjs
import { FC } from "react";
// components
import CreateChatForm from "./CreateChatForm";

// libs

// utils

// types & interfaces

// css
import styles from "./page.module.css";

interface Props {}

const FunctionalComponent: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chats page</h1>
      <CreateChatForm />
    </div>
  );
};

export default FunctionalComponent;
