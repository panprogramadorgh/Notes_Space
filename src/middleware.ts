import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.error(err)));

  if (!verifiedToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (verifiedToken && request.nextUrl.pathname.startsWith("/auth")) {
    response.cookies.delete("token");
  }

  return response;
}

export const config = {
  matcher: ["/api/auth/:path*", "/auth/:path*", "/dashboard/:path*"],
};
