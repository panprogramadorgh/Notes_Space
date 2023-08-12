import { NextResponse } from "next/server";
import { findUsers } from "@/utils/crud";
import connectDB from "@/utils/connectDB";

export async function GET() {
  // connecting to database
  if ((await connectDB()) === false) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }
  const rawUsers = await findUsers({});
  const users = rawUsers.map((rawUser) => {
    return {
      name: rawUser.name,
    };
  });
  return NextResponse.json(users);
}
