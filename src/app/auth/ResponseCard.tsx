import { FC } from "react";
import { ResponseCardData } from "./types";
import { Cross } from "@/svg";
import styles from "./ResponseCard.module.css";

interface Props {
  cardData: ResponseCardData;
}

const ResponseCard: FC<Props> = ({
  cardData: { message, closeCardCallback },
}) => {
  return (
    <div className={styles.card}>
      <span className={styles.span}>{message}</span>
      <Cross className={styles.cross} onClick={closeCardCallback} />
    </div>
  );
};

export default ResponseCard;
