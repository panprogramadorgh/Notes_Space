import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  let verifiedToken =
    token &&
    ((await verifyAuth(token).catch((err) => console.error(err))) ?? null);

  if (!verifiedToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
