import { UserDocument } from "@/models/user.model";

export interface LoginResponse {
  error?: string;
  message?: {
    text: string;
    user: UserDocument;
    token: string;
  };
}
