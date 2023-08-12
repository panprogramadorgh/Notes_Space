import { ChatDocument } from "@/models/chat.model";
import { UserDocument } from "@/models/user.model";

export interface SuccessPostChatResponse {
  message: string;
  chat: ChatDocument;
  user: UserDocument;
}

export interface FailedPostChatResponse {
  error: string;
}
