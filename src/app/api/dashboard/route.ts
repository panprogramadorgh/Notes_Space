import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/utils/auth";
import { findUser } from "@/utils/crud";
import { UserDocument } from "@/models/user.model";
import connectDB from "@/utils/connectDB";

export async function GET(request: NextRequest): Promise<NextResponse> {
  // connecting to database
  if ((await connectDB()) === false) {
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }

  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.error(err)));

  if (!verifiedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user: UserDocument | null = await findUser({
    _id: verifiedToken.userId,
  });
  if (user) {
    return NextResponse.json({ user }, { status: 200 });
  }
  const response = NextResponse.json({
    error: "Your session expired",
    sessionExpired: true,
  });
  response.cookies.delete("token");
  return response;
}
