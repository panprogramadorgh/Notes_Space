"use client";

// next y react
import { useRouter } from "next/navigation";

// components
import AuthCard from "../AuthCard";
// libs
import axios from "axios";
// types & interfaces
import type { RegisterResponse } from "@/app/api/auth/register/types";
// css

export default function Register() {
  const router = useRouter();
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
          setResponseCardData({
            success: true,
            message: registerResponse.message!.text,
            closeCardCallback: () => {
              setResponseCardData(null);
            },
          });
          router.push("/auth/login");
        } catch (error) {
          if (error instanceof axios.AxiosError) {
            const registerResponse: RegisterResponse = error.response?.data;
            setResponseCardData({
              success: false,
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
