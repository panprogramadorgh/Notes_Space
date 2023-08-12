import UserModel, { UserDocument } from "@/models/user.model";
import ChatModel, { ChatDocument } from "@/models/chat.model";
import { Find, FindOne, Create, Update, Validate } from "./crud.d";

export const findUser: FindOne = async (query) => {
  const user: UserDocument | null = await UserModel.findOne(query);
  return user;
};

export const updateUser: Update = async (filter, update) => {
  const user = (await UserModel.findOneAndUpdate(
    filter,
    update
  )) as UserDocument | null;
  return user;
};

export const findUsers: Find = async (query) => {
  const users: UserDocument[] = await UserModel.find(query);
  return users;
};

export const createUser: Create = async (documentData) => {
  const newUser = await UserModel.create(documentData);
  return newUser;
};

export const findChat: FindOne = async (query) => {
  const chat: ChatDocument | null = (await ChatModel.findOne(
    query
  )) as ChatDocument | null;
  return chat;
};

export const findChats: Find = async (query) => {
  const chats: ChatDocument[] = await ChatModel.find(query);
  return chats;
};

export const createChat: Create = async (documentData) => {
  const { name }: { name: string } = documentData;
  const newChat = await ChatModel.create({ name });
  return newChat;
};

export const validateChat: Validate = async (documentData) => {
  const newChat = new ChatModel(documentData);
  await newChat.validate();
};
