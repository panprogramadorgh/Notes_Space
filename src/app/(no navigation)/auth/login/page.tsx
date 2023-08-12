"use client";

// react y next
import { useRouter } from "next/navigation";
// components
import AuthCard from "../AuthCard";
// libs
import axios from "axios";
// utils
import { createCookie } from "@/utils/cookies";
// types & interfaces
import type { LoginResponse } from "@/app/api/auth/login/types";

export default function Login() {
  const router = useRouter();
  return (
    <AuthCard
      type="login"
      behavior={async (e, setResponseCardData) => {
        e.preventDefault();
        const rawFormData = new FormData(e.currentTarget);
        const formData = {
          name: rawFormData.get("name"),
          password: rawFormData.get("password"),
        };

        try {
          const response = await axios.post("/api/auth/login", formData);
          const loginResponse: LoginResponse = response.data;
          if (loginResponse.message && !loginResponse.error) {
            setResponseCardData({
              success: true,
              message: loginResponse.message!.text,
              closeCardCallback: () => {
                setResponseCardData(null);
              },
            });
            createCookie({
              name: "token",
              value: loginResponse.message!.token,
              maxAge: 86400,
            });
            router.push("/");
          }
        } catch (error) {
          if (error instanceof axios.AxiosError) {
            const loginResponse: LoginResponse = error.response?.data;
            setResponseCardData({
              success: false,
              message: loginResponse.error!,
              closeCardCallback: () => {
                setResponseCardData(null);
              },
            });
            return;
          }
          console.log(error);
        }
      }}
    />
  );
}
