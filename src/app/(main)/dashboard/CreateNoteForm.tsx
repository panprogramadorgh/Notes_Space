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
  SuccessPostNoteResponse,
  FailedPostNoteResponse,
} from "@/app/api/notes/types";

// css
import styles from "./CreateNoteForm.module.css";

interface Props {}

const CreateNoteForm: FC<Props> = ({}) => {
  const [responseCardData, setResponseCardData] =
    useState<ResponseCardData | null>(null);

  const handleSubmit: MouseEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const postData = { name: formData.get("name") ?? "" };
    try {
      // posting un nuevo note
      const response = await axios.post("/api/notes", postData);
      setResponseCardData({
        success: true,
        message: (response.data as SuccessPostNoteResponse).message,
        closeCardCallback: () => {
          setResponseCardData(null);
        },
      });
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        setResponseCardData({
          success: false,
          message: (error.response?.data as FailedPostNoteResponse).error,
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
        <label className={styles.label}>Note name</label>
        <input className={styles.input} type="text" name="name" />
        <button className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default CreateNoteForm;
