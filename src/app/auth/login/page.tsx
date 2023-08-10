"use client";

// components
import AuthCard from "../AuthCard";
// libs
import axios from "axios";
// utils
import { createCookie } from "@/utils/cookies";
// types & interfaces
import type { LoginResponse } from "@/app/api/auth/login/types";

export default function Login() {
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
            console.log({ message: loginResponse.message!.text });
            setResponseCardData(null);
            // creando cookie con los datos de la sesion
            createCookie({
              name: "token",
              value: loginResponse.message!.token,
              maxAge: 86400,
            });
            // redireccionando a la pagina home
            window.location.href = "/";
          }
        } catch (error) {
          if (error instanceof axios.AxiosError) {
            const loginResponse: LoginResponse = error.response?.data;
            setResponseCardData({
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
