import UserModel, { UserInterface } from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { compareSync as comparePassword } from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginResponse } from "./types";

const SECRET = process.env.SECRET;
if (!SECRET) throw new Error("SECRET enviroment variable is required");

export async function POST(request: Request) {
  // database connection checking
  if ((await connectDB()) === false) {
    const response: LoginResponse = { error: "Error connecting to database" };
    return NextResponse.json(response, { status: 500 });
  }
  // checking fields and specially password
  const { name, password } = await request.json();
  if (!name) {
    const response: LoginResponse = { error: "Name is required" };
    return NextResponse.json(response, { status: 400 });
  } else if (!password) {
    const response: LoginResponse = { error: "Password is required" };
    return NextResponse.json(response, { status: 400 });
  }
  const user: UserInterface | null = await UserModel.findOne({ name });
  const passwordIsCorrect =
    user === null ? false : comparePassword(password, user.password);
  if (!passwordIsCorrect) {
    const response: LoginResponse = {
      error: "Name or password are invalid",
    };
    return NextResponse.json(response, { status: 401 });
  }

  // en este punto el usuario se valido correctamente
  const tokenData = {
    userId: user!._id,
  };
  const token = jwt.sign(tokenData, SECRET as string);

  const response: LoginResponse = {
    message: {
      text: "Logged successfully",
      user: user!,
      token,
    },
  };
  return NextResponse.json(response, { status: 200 });
}
