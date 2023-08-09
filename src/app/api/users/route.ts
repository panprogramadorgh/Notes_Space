import { NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import connectDB from "@/utils/connectDB";

export async function GET() {
  // conectando a la base de datos
  if ((await connectDB()) === false)
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );

  const rawUsers = await UserModel.find();
  const users = rawUsers.map((rawUser) => {
    return {
      name: rawUser.name,
    };
  });
  return NextResponse.json(users);
}
