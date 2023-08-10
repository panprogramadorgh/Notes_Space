import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/user.model";
import { verifyAuth, UserJWTPaylaod } from "@/utils/auth";
import { UserDocument } from "@/models/user.model";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.error(err)));

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if ("userId" in verifiedToken) {
    const user: UserDocument | null = await UserModel.findOne({
      _id: verifiedToken.userId,
    });
    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    }
    return NextResponse.json(
      { error: "You seems to be on a deleted user sesion" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { error: "Error with the user sesion" },
    { status: 400 }
  );
}
