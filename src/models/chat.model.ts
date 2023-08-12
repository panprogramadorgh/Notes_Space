import { model, models, Schema, InferSchemaType } from "mongoose";

const chatSchema = new Schema({
  name: {
    type: String,
    required: [true, "chat name is required"],
    unique: false,
    min: [1, "chat name must have 1 char at least"],
    max: [30, "chat must have under 30 chars"],
  },
  messages: {
    type: [
      {
        owner: {
          type: String,
          require: [true, "the owner of th message is required"],
          unique: false,
          trim: true,
        },
        body: {
          type: String,
          require: [true, "the body of the message is rquired"],
          unique: false,
          trim: true,
        },
      },
    ],
    unique: false
  },
});

export type Chat = InferSchemaType<typeof chatSchema>;
export interface ChatDocument extends Chat {
  _id: string;
  __v: number;
}

const ChatModel = models["chat"] ?? model<Chat>("chat", chatSchema, "chats");

export default ChatModel;
