/* Imports */

// react & nextjs
import { FC } from "react";
// components

// libs

// utils

// types & interfaces
import { UserCardData } from "./page";

// css
import styles from "./UserCard.module.css";

interface Props {
  userCardData: UserCardData | null;
}

const UserCard: FC<Props> = ({ userCardData }) => {
  if (!userCardData) return;
  return (
    <div className={styles.card}>
      <h4 className={styles.title}>UserCard</h4>
      <div className={styles.properties}>
        <div className={styles.id}>
          Id - <span>{userCardData.id}</span>
        </div>
        <div className={styles.name}>
          Name - <span>{userCardData.name}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
