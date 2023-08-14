import { FC, useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { ResponseCardData } from "@/types/ResponseCardData";
import { Cross } from "@/svg";
import styles from "@/styles/ResponseCard.module.css";

interface Props {
  cardData: ResponseCardData;
}

const ResponseCard: FC<Props> = ({
  cardData: { message, closeCardCallback, success },
}) => {
  const { theme } = useContext(ThemeContext)!;
  return (
    <div
      className={styles[`card-${theme}`]}
      style={
        success
          ? {
              backgroundColor:
                theme === "light"
                  ? "var(--correct-color-light)"
                  : "var(--correct-darkcolor-dark)",
              outlineColor:
                theme === "light"
                  ? "var(--correct-darkcolor-light)"
                  : "var(--correct-color-dark)",
            }
          : undefined
      }
    >
      <span className={styles.span}>{message}</span>
      <Cross
        style={
          success
            ? {
                color:
                  theme === "light"
                    ? "var(--correct-darkcolor-light)"
                    : "var(--text-color-dark)",
              }
            : undefined
        }
        className={styles[`cross-${theme}`]}
        onClick={closeCardCallback}
      />
    </div>
  );
};

export default ResponseCard;
