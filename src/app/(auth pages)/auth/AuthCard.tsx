"use client";

import {
  useState,
  FC,
  FormEvent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import Link from "next/link";
import ResponseCard from "../../../components/ResponseCard";
import { capitalizeString } from "@/utils/formatting";
import type { ResponseCardData } from "../../../types/ResponseCardData";
import styles from "./AuthCard.module.css";

interface Props {
  behavior: (
    e: FormEvent<HTMLFormElement>,
    setResponseCardData: Dispatch<SetStateAction<ResponseCardData | null>>
  ) => Promise<void>;
  type: "login" | "register";
}

const AuthCard: FC<Props> = ({ behavior, type }) => {
  const { theme } = useContext(ThemeContext)!;

  const [responseCardData, setResponseCardData] =
    useState<null | ResponseCardData>(null);

  const reversePath = type === "login" ? "register" : "login";

  const formattedActualPath = capitalizeString(
    type === "login" ? "log-in" : "register"
  );
  const formattedReversePath = capitalizeString(
    type !== "login" ? "log-in" : "register"
  );

  const title = formattedActualPath;
  const subtitle = `I ${type === "login" ? "don't have" : "have"} an account.`;
  const authPathToSwitch = `/auth/${reversePath}`;

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        behavior(e, setResponseCardData);
      }}
    >
      <div className={styles.titleContainer}>
        <h3 className={styles[`title-${theme}`]}>{title}</h3>
      </div>
      <div className={styles.responseContainer}>
        {responseCardData ? <ResponseCard cardData={responseCardData} /> : null}
      </div>
      <div className={styles[`inputsContainer-${theme}`]}>
        <div className={styles.inputBlock}>
          <label className={styles[`label-${theme}`]}>Username</label>
          <input className={styles[`input-${theme}`]} type="text" name="name" />
        </div>
        <div className={styles.inputBlock}>
          <label className={styles[`label-${theme}`]}>Password</label>
          <input
            className={styles[`input-${theme}`]}
            type="password"
            name="password"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles[`button-${type}`]}>
            {formattedActualPath}
          </button>
        </div>
      </div>
      <div className={styles[`switchAuthContainer-${theme}`]}>
        <p className={styles[`subtitle-${theme}`]}>{subtitle}</p>
        <Link className={styles.link} href={authPathToSwitch}>
          Go to {formattedReversePath}.
        </Link>
      </div>
    </form>
  );
};

export default AuthCard;
