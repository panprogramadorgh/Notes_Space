import { Schema, model, models } from "mongoose";

export interface UserInterface {
  _id: string;
  name: string;
  password: string;
  __v: number;
}

const userSchema = new Schema({
  name: {
    type: String,
    requied: [true, "Name is required"],
    unique: [true, "Name already exists"],
    min: [3, "The name must have 3 characters at least"],
    max: [20, "Name must have a length between 3 and 20 chars"],
  },
  password: {
    type: String,
    requied: [true, "Password is required"],
    unique: false,
    min: [6, "The Password must have 6 characters at least"],
  },
});

const UserModel = models["user"] ?? model("user", userSchema, "users");

export default UserModel;
