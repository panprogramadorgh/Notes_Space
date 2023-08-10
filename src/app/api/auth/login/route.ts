import { NextResponse } from "next/server";
import { compareSync as comparePassword } from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel, { UserDocument } from "@/models/user.model";
import connectDB from "@/utils/connectDB";
import { getSecretKey } from "@/utils/auth";
import type { LoginResponse } from "./types";

export async function POST(request: Request) {
  // connecting to database
  if ((await connectDB()) === false) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
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
  const user: UserDocument | null = await UserModel.findOne({ name });
  const passwordIsCorrect =
    user === null ? false : comparePassword(password, user.password!);
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
  const token = jwt.sign(tokenData, getSecretKey());

  const response: LoginResponse = {
    message: {
      text: "Logged successfully",
      user: user!,
      token,
    },
  };
  return NextResponse.json(response, { status: 200 });
}
