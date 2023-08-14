import UserModel, { UserDocument } from "@/models/user.model";
import NoteModel, { NoteDocument } from "@/models/note.model";
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

export const findNote: FindOne = async (query) => {
  const note: NoteDocument | null = (await NoteModel.findOne(
    query
  )) as NoteDocument | null;
  return note;
};

export const findNotes: Find = async (query) => {
  const notes: NoteDocument[] = await NoteModel.find(query);
  return notes;
};

export const createNote: Create = async (documentData) => {
  const { name }: { name: string } = documentData;
  const newNote = await NoteModel.create({ name });
  return newNote;
};

export const validateNote: Validate = async (documentData) => {
  const newNote = new NoteModel(documentData);
  await newNote.validate();
};
