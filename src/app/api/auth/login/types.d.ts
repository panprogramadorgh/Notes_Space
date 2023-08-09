import { UserInterface } from "@/models/user.model";

export interface LoginResponse {
  error?: string;
  message?: {
    text: string;
    user: UserInterface;
    token: string;
  };
}
