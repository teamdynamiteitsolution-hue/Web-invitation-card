import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedPath = pathname.startsWith("/create") || pathname.startsWith("/dashboard") || pathname.startsWith("/checkout");

  if (isProtectedPath) {
    if (!token) {
      const registerUrl = new URL("/register", req.url);
      registerUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(registerUrl);
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_secret");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      const registerUrl = new URL("/register", req.url);
      registerUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(registerUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/create/:path*", "/create", "/dashboard/:path*", "/dashboard", "/checkout/:path*"],
};
