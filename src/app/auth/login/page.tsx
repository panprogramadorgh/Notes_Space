"use client";
import axios from "axios";
import { LoginResponse } from "@/app/api/auth/login/types";
import { createCookie, deleteCookie } from "@/utils/cookies";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.card}>
      <form
        onSubmit={async (e) => {
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
              console.log(loginResponse.message.text);
              // creando cookie con los datos de la sesion
              createCookie({
                name: "token",
                value: loginResponse.message.token,
                maxAge: 86400,
              });
              // redireccionando a la pagina home
              window.location.href = "/";
            }
          } catch (error) {
            if (error instanceof axios.AxiosError) {
              const loginResponse: LoginResponse = error.response?.data;
              console.log(loginResponse.error);
              return;
            }
            console.log(error);
          }
        }}
      >
        <input type="text" placeholder="Enter the name" name="name" />
        <input
          type="password"
          placeholder="Enter the password"
          name="password"
        />
        <button>Send</button>
      </form>
    </div>
  );
}
