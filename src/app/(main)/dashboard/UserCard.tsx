"use client";

/* Imports */

// react & nextjs
import { FC, useState, useEffect } from "react";
// components

// libs
import { UserDocument } from "@/models/user.model";

// utils
import axios from "axios";

// types & interfaces

// css
import styles from "./UserCard.module.css";

interface Props {}

export interface UserCardData {
  id: string;
  name: string;
  notes: string[];
}

const fetchUserData = async (): Promise<UserCardData> => {
  const response = await axios.get("/api/dashboard");
  if ("error" in response.request) throw new Error(response.request.error);
  const userData: UserDocument = response.data.user;
  const userCardData: UserCardData = {
    name: userData.name!,
    id: userData._id,
    notes: userData.notes,
  };
  return userCardData;
};

const UserCard: FC<Props> = ({}) => {
  const [userCardData, setUserCardData] = useState<UserCardData | null>(null);

  useEffect(() => {
    fetchUserData()
      .then((newUserCardData) => {
        setUserCardData(newUserCardData);
      })
      .catch((error) => console.error(error.message));
  }, []);

  if (!userCardData) return <span>Loading user card...</span>;

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
        <div className={styles.notes}>
          Notes - <span>{JSON.stringify(userCardData.notes)}</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
