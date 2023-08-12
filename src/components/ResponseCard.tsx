import { FC, CSSProperties } from "react";
import { ResponseCardData } from "../app/(no navigation)/auth/types";
import { Cross } from "@/svg";
import styles from "@/styles/ResponseCard.module.css";

interface Props {
  cardData: ResponseCardData;
}

const ResponseCard: FC<Props> = ({
  cardData: { message, closeCardCallback, success },
}) => {
  return (
    <div
      className={styles.card}
      style={
        success
          ? {
              backgroundColor: "#e5ffe0",
              outlineColor: "#55b844",
            }
          : undefined
      }
    >
      <span className={styles.span}>{message}</span>
      <Cross
        style={
          success
            ? {
                color: "#55b844",
              }
            : undefined
        }
        className={styles.cross}
        onClick={closeCardCallback}
      />
    </div>
  );
};

export default ResponseCard;
