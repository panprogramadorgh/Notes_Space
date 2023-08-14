import { InferSchemaType, Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    requied: [true, "name is required"],
    unique: [true, "name already exists"],
    min: [3, "the name must have 3 characters at least"],
    max: [20, "name must have a length between 3 and 20 chars"],
  },
  password: {
    type: String,
    requied: [true, "password is required"],
    unique: false,
    min: [6, "the Password must have 6 characters at least"],
  },
  notes: {
    type: [String],
    required: [true, "user must have notes property"],
  },
});

export type UserSchema = InferSchemaType<typeof userSchema>;
export interface UserDocument extends UserSchema {
  _id: string;
  __v: number;
}

const UserModel =
  models["user"] ?? model<UserSchema>("user", userSchema, "users");

export default UserModel;
