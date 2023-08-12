"use client";

/* Imports */

// react & nextjs
import { FC, MouseEventHandler, useState } from "react";
// components
import ResponseCard from "@/components/ResponseCard";

// libs
import axios from "axios";

// utils

// types & interfaces
import { ResponseCardData } from "@/app/(no navigation)/auth/types";
import {
  SuccessPostChatResponse,
  FailedPostChatResponse,
} from "@/app/api/chats/types";

// css
import styles from "./CreateChatForm.module.css";

interface Props {}

const CreateChatForm: FC<Props> = ({}) => {
  const [responseCardData, setResponseCardData] =
    useState<ResponseCardData | null>(null);

  const handleSubmit: MouseEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const postData = { name: formData.get("name") ?? "" };
    try {
      // posting un nuevo chat
      const response = await axios.post("/api/chats", postData);
      setResponseCardData({
        success: true,
        message: (response.data as SuccessPostChatResponse).message,
        closeCardCallback: () => {
          setResponseCardData(null);
        },
      });
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setResponseCardData({
          success: false,
          message: (error.response?.data as FailedPostChatResponse).error,
          closeCardCallback: () => {
            setResponseCardData(null);
          },
        });
      }
    }
  };
  return (
    <div className={styles.container}>
      {responseCardData ? <ResponseCard cardData={responseCardData} /> : null}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Chat name</label>
        <input className={styles.input} type="text" name="name" />
        <button className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default CreateChatForm;
