"use client";

// components
import AuthCard from "../AuthCard";
// libs
import axios from "axios";
// types & interfaces
import type { RegisterResponse } from "@/app/api/auth/register/types";

export default function Register() {
  return (
    <AuthCard
      type="register"
      behavior={async (e, setResponseCardData) => {
        e.preventDefault();
        const rawFormData = new FormData(e.currentTarget);
        const formData = {
          name: rawFormData.get("name"),
          password: rawFormData.get("password"),
        };

        try {
          const response = await axios.post("/api/auth/register", formData);
          const registerResponse: RegisterResponse = response.data;
          console.log(registerResponse.message!.text);
          window.location.href = "/auth/login";
        } catch (error) {
          if (error instanceof axios.AxiosError) {
            const registerResponse: RegisterResponse = error.response?.data;
            setResponseCardData({
              message: registerResponse.error!,
              closeCardCallback: () => {
                setResponseCardData(null);
              },
            });
          }
        }
      }}
    />
  );
}
