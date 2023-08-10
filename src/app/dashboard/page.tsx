"use client";

// TODO: Arreglar suspense con fallback

/* Imports */

// react & nextjs
import { FC, useState, useEffect, Suspense, lazy } from "react";

// components
import UserCard from "./UserCard";

// libs

// utils

// types & interfaces
import { UserDocument } from "@/models/user.model";

// css
import styles from "./page.module.css";

export interface UserCardData {
  id: string;
  name: string;
}

const fetchUserData = async (): Promise<UserCardData> => {
  const response = await fetch("/api/dashboard");
  const userData: UserDocument = (await response.json()).user;
  const userCardData: UserCardData = {
    name: userData.name!,
    id: userData._id,
  };
  return userCardData;
};

const Fallback: FC<{}> = ({}) => {
  return <span>loading...</span>;
};

const Dashboard: FC<{}> = ({}) => {
  const [userCardData, setUserCardData] = useState<UserCardData | null>(null);

  useEffect(() => {
    fetchUserData()
      .then((newUserCardData) => {
        setUserCardData(newUserCardData);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Suspense fallback={<Fallback />}>
      <UserCard userCardData={userCardData} />
    </Suspense>
  );
};

export default Dashboard;
