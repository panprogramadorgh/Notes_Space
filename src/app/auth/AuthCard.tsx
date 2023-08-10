"use client";

import { FC, FormEvent, Dispatch, SetStateAction } from "react";
import styles from "./AuthCard.module.css";
import { useState } from "react";
import Link from "next/link";
import ResponseCard from "./ResponseCard";
import { capitalizeString } from "@/utils/formatting";
import type { ResponseCardData } from "./types";

interface Props {
  behavior: (
    e: FormEvent<HTMLFormElement>,
    setResponseCardData: Dispatch<SetStateAction<ResponseCardData | null>>
  ) => Promise<void>;
  type: "login" | "register";
}

const AuthCard: FC<Props> = ({ behavior, type }) => {
  const [responseCardData, setResponseCardData] =
    useState<null | ResponseCardData>(null);

  const actualPath = type;
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
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.responseContainer}>
        {responseCardData ? <ResponseCard cardData={responseCardData} /> : null}
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.inputBlock}>
          <label className={styles.label}>Username</label>
          <input className={styles.input} type="text" name="name" />
        </div>
        <div className={styles.inputBlock}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} type="password" name="password" />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button}>{formattedActualPath}</button>
        </div>
      </div>
      <div className={styles.switchAuthContainer}>
        <p className={styles.subtitle}>{subtitle}</p>
        <Link className={styles.link} href={authPathToSwitch}>
          Go to {formattedReversePath}.
        </Link>
      </div>
    </form>
  );
};

export default AuthCard;
