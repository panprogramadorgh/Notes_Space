import { NextResponse, NextRequest } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const verifiedToken =
    token && (await verifyAuth(token).catch((err) => console.error(err)));

  const response = NextResponse.next();

  if (verifiedToken && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!verifiedToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL(`/auth/login`, request.url));
  }

  if (request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (verifiedToken && request.nextUrl.pathname.startsWith("/auth")) {
    response.cookies.delete("token");
  }

  return response;
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard"],
};
